"use client";

import { useEffect, useState } from "react";
import { CASE_STUDIES } from "@/content/portfolio";

const NAV: Array<{ id: string; label: string }> = [
  { id: "intro", label: "Intro" },
  ...CASE_STUDIES.map((cs) => ({ id: cs.id, label: cs.shortName })),
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState<string>("intro");
  const [onLight, setOnLight] = useState<boolean>(false);

  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            const el = e.target as HTMLElement;
            const id = el.id;
            const projectId = id.replace(/-(hero|body)$/, "");
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

  return (
    <nav className={"side-nav" + (onLight ? " on-light" : "")}>
      {NAV.map((item) => {
        const href =
          item.id === "intro" || item.id === "contact"
            ? "#" + item.id
            : "#" + item.id + "-hero";
        return (
          <a
            key={item.id}
            href={href}
            className={activeId === item.id ? "active" : ""}
          >
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
