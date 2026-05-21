import type { CSSProperties, ReactNode } from "react";
import type { Bullet, CaseStudy, Metric } from "@/content/portfolio";
import MediaCarousel from "./MediaCarousel";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

export type NextLink = {
  href: string;
  label: string;
  num: string;
  year: string;
};

function Phase({
  num,
  name,
  prose,
  bullets,
  children,
}: {
  num: string;
  name: string;
  prose: string;
  bullets?: Bullet[];
  children?: ReactNode;
}) {
  return (
    <div className="cs-phase">
      <div className="cs-phase-marker">
        <div className="cs-phase-num">{num}</div>
        <h3
          className="cs-phase-name"
          dangerouslySetInnerHTML={{ __html: name }}
        />
      </div>
      <div className="cs-phase-content">
        <p className="cs-prose reveal">{prose}</p>
        {children}
        {bullets && (
          <ul className="cs-bullets reveal d1">
            {bullets.map(([label, text], i) => (
              <li key={i}>
                <span className="b-label">{label}</span>
                <span
                  className="b-text"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function MetricsRow({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="cs-metrics reveal d1">
      {metrics.map((m, i) => (
        <div className="cs-metric" key={i}>
          <div className="value">{m.value}</div>
          <div className="label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function CaseStudyBody({
  data,
  nextLink,
}: {
  data: CaseStudy;
  nextLink: NextLink;
}) {
  const style: CSSVars = {
    "--cs-bg": data.bg,
    "--cs-ink": data.ink,
    "--cs-rule": data.rule,
    "--cs-accent": data.accent,
  };

  return (
    <section
      className="cs-section cs-body"
      id={data.id + "-body"}
      data-screen-label={`${data.num} ${data.shortName} · Detail`}
      data-tone={data.bodyTone}
      style={style}
    >
      <div className="cs-body-inner">
        {/* {data.gallery && data.gallery.length > 0 && (
          <div className="cs-gallery-top">
            <MediaCarousel items={data.gallery} accent={data.accent} />
          </div>
        )} */}

        <Phase
          num={data.problem.num}
          name={data.problem.name}
          prose={data.problem.prose}
          bullets={data.problem.bullets}
        />

        {data.approach && (
          <Phase
            num={data.approach.num}
            name={data.approach.name}
            prose={data.approach.prose}
            bullets={data.approach.bullets}
          />
        )}

        {data.built && (
          <Phase
            num={data.built.num}
            name={data.built.name}
            prose={data.built.prose}
            bullets={data.built.bullets}
          />
        )}
        {/* 
        <Phase
          num="04: Outcome"
          name="What it shipped into."
          prose={data.outcome.prose}
        >
          <MetricsRow metrics={data.outcome.metrics} />
        </Phase> */}

        {data.gallery && data.gallery.length > 0 && (
          <div className="cs-gallery-top">
            <MediaCarousel items={data.gallery} accent={data.accent} />
          </div>
        )}

        <div className="cs-stack">
          <span className="cs-stack-label">Stack & Tools</span>
          <div className="cs-stack-pills">
            {data.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>

        {/* <div className="cs-next">
          <a href={nextLink.href} className="cs-next-link">
            Next → <em style={{ fontStyle: "italic" }}>{nextLink.label}</em>
          </a>
          <div className="cs-next-meta">
            Case Study {nextLink.num}
            <br />
            <span style={{ opacity: 0.7 }}>{nextLink.year}</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
