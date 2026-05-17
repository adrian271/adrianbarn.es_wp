import { blast } from "@/content/portfolio";

export default function Blast() {
  return (
    <section className="section blast" id={blast.id} data-screen-label="05 Blast">
      <div className="section-inner">
        <div className="section-meta">
          <span className="role">{blast.title}</span>
          <span style={{ textAlign: "center", opacity: 0.5 }}>{blast.role}</span>
          <span>{blast.years}</span>
        </div>

        <div className="blast-grid">
          <div className="reveal">
            <div className="kicker" style={{ color: "#3effd0" }}>
              {blast.kicker}
            </div>
            <h2
              className="headline"
              dangerouslySetInnerHTML={{ __html: blast.headline }}
            />
            <p
              className="copy"
              dangerouslySetInnerHTML={{ __html: blast.copy }}
            />
            <ul className="bullets" style={{ marginTop: 24 }}>
              {blast.bullets?.map((b, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
              ))}
            </ul>
            <form
              className="blast-input"
              action="mailto:hello@adrianbarn.es"
              method="get"
            >
              <input
                name="subject"
                placeholder="your@email"
                aria-label="Your email"
              />
              <button type="submit" aria-label="Submit">
                →
              </button>
            </form>
          </div>

          <div className="reveal d2">
            <div className="blast-phone">
              <div className="blast-phone-tabs">
                <span>≡</span>
                <span className="active">FAVORITES</span>
                <span>MISSIONS</span>
                <span>$</span>
              </div>
              <div className="blast-balance">
                <div className="label">Account Balance</div>
                <div className="amt">$367.83</div>
                <div className="delta">+ $42.27 (12.96%)</div>
              </div>
              <svg viewBox="0 0 200 28" className="blast-mini-chart">
                <path
                  d="M0 22 Q 30 18 50 14 T 100 8 Q 130 12 160 6 T 200 4"
                  stroke="#3effd0"
                  strokeWidth={1.5}
                  fill="none"
                />
                <path
                  d="M0 22 Q 30 18 50 14 T 100 8 Q 130 12 160 6 T 200 4 L 200 28 L 0 28 Z"
                  fill="rgba(62,255,208,0.12)"
                />
              </svg>
              <div className="blast-card">
                <div className="blast-card-emoji" aria-hidden>
                  🍄
                </div>
                <div className="blast-card-game">SUPER MARIO BROS</div>
                <div className="blast-card-title">$1 + 500xp</div>
                <div className="blast-card-cta">LOG IN TO PLAY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
