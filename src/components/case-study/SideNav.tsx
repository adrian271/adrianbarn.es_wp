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
  { id: "intro", short: "Yo!", accent: THROUGH_LINE, bookend: "top" },
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

  // Scroll-driven active section + progress fill.
  //
  // Active detection uses a deterministic "reading line" ~40% down the
  // viewport: the active section is the last observed section whose top edge
  // has scrolled above that line. This is monotonic with scroll position, so
  // it can't flip-flop the way the previous IntersectionObserver did when
  // multiple sections were simultaneously past a ratio threshold.
  useEffect(() => {
    const selector = '#intro, #contact, [id$="-hero"], [id$="-body"]';
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    );

    const compute = () => {
      // Progress fill
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);

      // Active section via reading line
      const line = window.innerHeight * 0.4;
      let current: HTMLElement | undefined = sections[0];
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s;
      }
      if (!current) return;
      setActiveId(current.id.replace(/-(hero|body)$/, ""));
      const tone = current.dataset.heroTone ?? current.dataset.tone;
      setOnLight(tone === "light");
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
      // className={"spine" + (onLight ? " on-light" : "")}
      className="spine"
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
                    // <svg viewBox="0 0 12 12" width="10" height="10">
                    //   <circle cx="6" cy="6" r="3" fill="currentColor" />
                    // </svg>
                    <span>👋</span>
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
