"use client";

import { LANDER } from "@/content/portfolio";
import { useState, useEffect } from "react";

export default function CaseStudyLander() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      className="section cs-lander"
      id="intro"
      data-screen-label="00 Lander"
    >
      <div className="cs-lander-bg" />
      <div className="cs-lander-vignette" />
      <div className="section-inner cs-lander-inner">
        <header className="cs-lander-top reveal in">
          <div className="cs-lander-mark">
            adrianbarn
            <span className={isMounted ? "mounted dot" : "dot"}>.</span>es
          </div>
          <nav className="cs-lander-nav">
            {LANDER.nav.map((n) => {
              const external = "external" in n && n.external;
              return external ? (
                <a key={n.label} href={n.href} target="_blank" rel="noreferrer">
                  {n.label}
                </a>
              ) : (
                <a key={n.label} href={n.href}>
                  {n.label}
                </a>
              );
            })}
          </nav>
        </header>

        <div className="cs-lander-mid">
          <div className="cs-lander-left">
            <div className="cs-lander-kicker reveal in d1">{LANDER.kicker}</div>
            <h1 className="cs-lander-name reveal in d2">
              Adrian
              <br />
              Barnes
            </h1>
          </div>
          <div className="cs-lander-right reveal in d3">
            <p
              className="cs-lander-blurb"
              dangerouslySetInnerHTML={{ __html: LANDER.blurb }}
            />
          </div>
        </div>

        <footer className="cs-lander-bottom reveal in d4">
          <div>
            <span className="label">{LANDER.bottom[0].label}</span>
            <span className="value">{LANDER.bottom[0].value}</span>
          </div>
          <div>
            <span className="label">{LANDER.bottom[1].label}</span>
            <span className="value">{LANDER.bottom[1].value}</span>
          </div>
          {/* <div className="cs-lander-bottom-mid">
            <div className="cs-lander-scroll">SCROLL</div>
          </div> */}
          <div>
            <span className="label">{LANDER.bottom[2].label}</span>
            <span className="value">{LANDER.bottom[2].value}</span>
          </div>
          <div>
            <span className="label">{LANDER.bottom[3].label}</span>
            <span className="value">{LANDER.bottom[3].value}</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
