import { billabong } from "@/content/portfolio";

export default function Billabong() {
  return (
    <section
      className="section billabong"
      id={billabong.id}
      data-screen-label="06 Billabong"
    >
      <div className="billabong-banner" />
      <div className="section-inner">
        <div
          className="section-meta"
          style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
        >
          <span className="role">{billabong.title}</span>
          <span style={{ textAlign: "center", opacity: 0.7 }}>{billabong.role}</span>
          <span>{billabong.years}</span>
        </div>

        <div
          className="reveal"
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <div className="kicker" style={{ color: "white", opacity: 0.85 }}>
            {billabong.kicker}
          </div>
          <h2 className="billabong-headline">
            Performance
            <br />
            Boardshorts.
          </h2>
          <p className="billabong-sub">{billabong.copy}</p>
          <a className="billabong-shop">Shop the case study</a>

          <div style={{ flex: 1 }} />

          <div className="billabong-brands">
            {billabong.brands.map((b) => (
              <div
                key={b.name}
                className="billabong-brand"
                data-active={b.active ? "true" : undefined}
              >
                {b.name}
                <span className="role">{b.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
