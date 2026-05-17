import { lander } from "@/content/portfolio";

export default function Lander() {
  return (
    <section
      className="section lander"
      id="intro"
      data-screen-label="01 Lander"
    >
      <div className="lander-bg" />
      <div className="section-inner">
        <header className="lander-top reveal in">
          <div className="lander-mark">
            adrianbarn<em>.</em>es
          </div>
          <nav className="lander-nav">
            <a href="#oracle">Work</a>
            <a href="#contact">Contact</a>
            <a
              href="https://linkedin.com/in/adrian-barnes-software-engineer"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        </header>

        <div className="lander-mid">
          <div className="lander-mid-left">
            <div className="kicker reveal in d1">{lander.kicker}</div>
            <h1 className="lander-name reveal in d2">
              Adrian Barn<span>.</span>es
            </h1>
          </div>
          <p
            className="lander-blurb reveal in d3"
            dangerouslySetInnerHTML={{ __html: lander.blurb }}
          />
        </div>

        <footer className="lander-bottom reveal in d4">
          {lander.meta.map((m) => (
            <div key={m.label}>
              <span className="label">{m.label}</span>
              <span className="value">{m.value}</span>
            </div>
          ))}
        </footer>

        <div className="scroll-hint">Scroll</div>
      </div>
    </section>
  );
}
