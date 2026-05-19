"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { CASE_STUDIES, type MockupKey } from "@/content/portfolio";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

type SpineItem = {
  id: string;
  short: string;
  num?: string;
  accent: string;
  brand?: MockupKey;
  bookend?: "top" | "bottom";
};

/** Through-line blue from the design tokens. */
const THROUGH_LINE = "#0085ff";

const ITEMS: SpineItem[] = [
  { id: "intro", short: "", accent: THROUGH_LINE, bookend: "top" },
  ...CASE_STUDIES.map((cs) => ({
    id: cs.id,
    short: cs.shortName,
    num: cs.num,
    accent: cs.accent,
    brand: cs.id as MockupKey,
  })),
  { id: "contact", short: "Contact", accent: THROUGH_LINE, bookend: "bottom" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState<string>("intro");
  const [onLight, setOnLight] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Active section + light/dark tone swap (existing IntersectionObserver)
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            const el = e.target as HTMLElement;
            const projectId = el.id.replace(/-(hero|body)$/, "");
            setActiveId(projectId);
            const tone = el.dataset.heroTone ?? el.dataset.tone;
            setOnLight(tone === "light");
          }
        }
      },
      { threshold: [0.4, 0.6] },
    );
    const selector = '#intro, #contact, [id$="-hero"], [id$="-body"]';
    document.querySelectorAll(selector).forEach((s) => ob.observe(s));
    return () => ob.disconnect();
  }, []);

  // Smooth scroll-progress fill
  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(pct);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const activeItem = ITEMS.find((i) => i.id === activeId) ?? ITEMS[0];

  const navStyle: CSSVars = {
    "--spine-fill-from": THROUGH_LINE,
    "--spine-fill-to": activeItem.accent,
  };

  const hrefFor = (item: SpineItem) =>
    item.bookend ? "#" + item.id : "#" + item.id + "-hero";

  return (
    <nav
      className={"spine" + (onLight ? " on-light" : "")}
      style={navStyle}
      aria-label="Progress through the work"
    >
      <div className="spine-track" aria-hidden="true" />
      <div
        className="spine-fill"
        aria-hidden="true"
        style={{ height: `calc(${progress * 100}% - 6px)` }}
      />

      <ol className="spine-items">
        {ITEMS.map((item) => {
          const isActive = activeId === item.id;
          const itemStyle: CSSVars = {
            "--spine-accent": item.accent,
          };
          return (
            <li
              key={item.id}
              className={
                "spine-item" +
                (isActive ? " active" : "") +
                (item.bookend ? " bookend bookend-" + item.bookend : "")
              }
              style={itemStyle}
            >
              <span className="spine-text">
                {/* {item.num && (
                    <span className="spine-num">{item.num}</span>
                    )} */}
                <span className="spine-short">{item.short}</span>
              </span>
              <a href={hrefFor(item)} className="spine-link">
                <span className="spine-node" aria-hidden="true">
                  {item.brand ? (
                    <img
                      src={`/assets/logos/${item.brand}.svg`}
                      alt=""
                      className="spine-logo"
                      width={24}
                    />
                  ) : item.bookend === "top" ? (
                    <svg viewBox="0 0 12 12" width="10" height="10">
                      <circle cx="6" cy="6" r="3" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 12 12" width="10" height="10">
                      <path
                        d="M2 4 L6 8 L10 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
