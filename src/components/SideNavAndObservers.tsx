"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/content/portfolio";

export default function SideNavAndObservers() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const revealOb = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("in");
        }
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealOb.observe(el));

    const sectionOb = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            setActive((e.target as HTMLElement).id);
          }
        }
      },
      { threshold: [0.4, 0.6] }
    );
    document.querySelectorAll(".section").forEach((s) => sectionOb.observe(s));

    return () => {
      revealOb.disconnect();
      sectionOb.disconnect();
    };
  }, []);

  const activeItem = SECTIONS.find((i) => i.id === active) ?? SECTIONS[0];

  return (
    <nav className={"side-nav" + (activeItem.light ? " on-light" : "")}>
      {SECTIONS.map((item) => (
        <a
          key={item.id}
          href={"#" + item.id}
          className={active === item.id ? "active" : ""}
        >
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
