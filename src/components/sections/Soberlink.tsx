import { soberlink } from "@/content/portfolio";

export default function Soberlink() {
  return (
    <section
      className="section soberlink"
      id={soberlink.id}
      data-screen-label="04 Soberlink"
    >
      <div className="section-inner">
        <div className="section-meta">
          <span className="role">{soberlink.title}</span>
          <span style={{ textAlign: "center", opacity: 0.5 }}>{soberlink.role}</span>
          <span>{soberlink.years}</span>
        </div>

        <div className="soberlink-grid">
          <div className="reveal">
            <h2
              className="headline"
              dangerouslySetInnerHTML={{ __html: soberlink.headline }}
            />
            <p
              className="copy"
              dangerouslySetInnerHTML={{ __html: soberlink.copy }}
            />
            <ul className="bullets" style={{ marginTop: 24 }}>
              {soberlink.bullets?.map((b, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
              ))}
            </ul>

            <a className="soberlink-cta">Get Started →</a>

            <div className="soberlink-press">
              <strong>As featured in</strong>
              <span>Forbes</span>
              <span>BBC</span>
              <span>Psychology Today</span>
              <span>USA Today</span>
            </div>
          </div>

          <div className="soberlink-hero reveal d2">
            <div className="soberlink-device" />
            <div className="soberlink-alert">
              <h4>Compliant Test Alert</h4>
              <div className="row">
                <div className="check">✓</div>
                <div className="name">
                  Compliant<span>Test</span>
                </div>
                <div className="time">
                  8:32 AM<span>Jordan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
