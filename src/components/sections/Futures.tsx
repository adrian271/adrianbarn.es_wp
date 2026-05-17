import { futures } from "@/content/portfolio";

export default function Futures() {
  return (
    <section className="section futures" id={futures.id} data-screen-label="07 Futures">
      <div className="section-inner">
        <div className="futures-header">
          <div className="futures-logo">futures.</div>
          <div className="futures-nav">
            <div className="futures-nav-item">
              FINS<span>FIND YOUR SETUP</span>
            </div>
            <div className="futures-nav-item">
              FIN SCHOOL<span>SURF EDUCATION</span>
            </div>
            <div className="futures-nav-item">
              TEAM<span>FUTURES FAMILY</span>
            </div>
            <div className="futures-nav-item">
              RETAIL STORES<span>LOCATE</span>
            </div>
            <div className="futures-nav-item">
              ABOUT US<span>THE FUTURES STORY</span>
            </div>
          </div>
        </div>

        <div className="futures-body">
          <div className="futures-hero reveal">
            <div className="futures-stamp">
              <div>2004</div>
              <div className="big">FIRST</div>
              <div>WEB DEV ROLE</div>
              <div className="small">SAN CLEMENTE · CA</div>
            </div>
            <div className="futures-hero-text">
              <div className="h">Twelve Years.</div>
              <div className="h" style={{ opacity: 0.85 }}>
                One Surf Co.
              </div>
              <div className="sub">
                Generalist → Web Developer · Magento + PHP storefront
              </div>
            </div>
          </div>

          <div className="futures-section-title">Featured Fins</div>
          <div className="futures-fins">
            {futures.fins.map((fin) => (
              <div className="futures-fin" key={fin.name}>
                <svg viewBox="0 0 80 100">
                  <path d="M 25 95 Q 30 50 60 8 L 70 12 Q 55 60 50 95 Z" fill={fin.color1} />
                  <path d="M 50 95 Q 55 55 70 12 L 75 18 Q 65 60 60 95 Z" fill={fin.accent} />
                  <ellipse cx={48} cy={92} rx={22} ry={2} fill="rgba(0,0,0,0.15)" />
                </svg>
                <div className="name">{fin.name}</div>
                <div className="mat">{fin.mat}</div>
              </div>
            ))}
          </div>

          <div className="futures-credit">
            <div dangerouslySetInnerHTML={{ __html: futures.copy }} />
            <div className="futures-credit-meta">
              {futures.years}
              <br />
              <span style={{ color: "#999" }}>WHERE IT ALL BEGAN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
