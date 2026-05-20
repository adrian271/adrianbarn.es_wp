import type { CSSProperties } from "react";
import type { CaseStudy } from "@/content/portfolio";
import HeroVisual from "./HeroVisual";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

export default function CaseStudyHero({ data }: { data: CaseStudy }) {
  const heroFg = data.heroTone === "dark" ? "#ffffff" : "#1a1a1a";
  const style: CSSVars = {
    "--cs-bg": data.bg,
    "--cs-accent": data.accent,
    "--cs-hero-fg": heroFg,
  };

  return (
    <section
      className="cs-section cs-hero"
      id={data.id + "-hero"}
      data-screen-label={`${data.num} ${data.shortName} · Hero`}
      data-hero-tone={data.heroTone}
      style={style}
    >
      <div className="cs-hero-bg">
        <HeroVisual kind={data.heroVisual} />
      </div>

      <div className="cs-hero-inner">
        <div className="cs-hero-top reveal in">
          <div className="case-tag">
            <span>Case Study</span>
            <span style={{ margin: "0 12px", opacity: 0.4 }}>·</span>
            <span>{data.num}</span>
          </div>
        </div>

        <div className="cs-hero-mid">
          <div className="cs-hero-kicker reveal in d1">{data.company}</div>
          <h1
            className="cs-hero-title reveal in d2"
            dangerouslySetInnerHTML={{ __html: data.titleHtml }}
          />
          <p className="cs-hero-summary reveal in d3">{data.summary}</p>
        </div>

        {/* <div className="cs-hero-meta reveal in d4">
          <div>
            <span className="label">Role</span>
            <span className="value">{data.role}</span>
          </div>
          <div>
            <span className="label">Duration</span>
            <span className="value">{data.duration}</span>
          </div>
          <div>
            <span className="label">Team</span>
            <span className="value">{data.team}</span>
          </div>
          <div>
            <span className="label">Years</span>
            <span className="value">{data.year}</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
