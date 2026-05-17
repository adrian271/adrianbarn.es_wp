import { oracle } from "@/content/portfolio";

const months = [
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
];
const lineXs = [20, 60, 100, 140, 180, 220, 260, 300, 340, 380];
const lineYs = [90, 85, 80, 72, 82, 88, 85, 30, 15, 55];
const linePoints = lineXs.map((x, i) => `${x},${lineYs[i]}`).join(" ");
const createdWeekly = [40, 75, 55, 65, 68, 20];
const terminatedWeekly = [28, 55, 18, 62, 22, 20];

export default function Oracle() {
  return (
    <section
      className="section oracle"
      id={oracle.id}
      data-screen-label="02 Oracle"
    >
      <div className="section-inner">
        <div className="section-meta">
          <span className="role">
            <img src={oracle.icon} alt={oracle.title} />
          </span>
          <span className="role">{oracle.title}</span>
          <span style={{ textAlign: "center", opacity: 0.5 }}>
            {oracle.role}
          </span>
          <span>{oracle.years}</span>
        </div>

        <div className="oracle-grid">
          <div className="oracle-content reveal">
            <h2
              className="headline"
              dangerouslySetInnerHTML={{ __html: oracle.headline }}
            />
            <p
              className="copy"
              dangerouslySetInnerHTML={{ __html: oracle.copy }}
            />
            <ul className="bullets" style={{ marginTop: 24 }}>
              {oracle.bullets?.map((b, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
              ))}
            </ul>
            <div className="oracle-tags">
              {oracle.tags?.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="oracle-dashboard reveal d2">
            <div className="oracle-dash-header">
              <h3 className="oracle-dash-title">
                Inventory Growth and Changes
              </h3>
              <p className="oracle-dash-sub">
                Optimize resources, boost performance, and cut cloud costs
              </p>
            </div>
            <div className="oracle-filterbar">
              <span>Compartment ID · All</span>
              <span>Region · All</span>
              <span>Resource Type · All</span>
              <span>Lifecycle · All</span>
              <span>Time Created · Full Range</span>
            </div>
            <div className="oracle-charts">
              <div>
                <h4 className="oracle-chart-title">
                  Resources Created by Month
                </h4>
                <svg viewBox="0 0 400 120" className="oracle-line-chart">
                  <g stroke="#ececec" strokeWidth={1}>
                    <line x1={0} y1={20} x2={400} y2={20} />
                    <line x1={0} y1={50} x2={400} y2={50} />
                    <line x1={0} y1={80} x2={400} y2={80} />
                    <line x1={0} y1={110} x2={400} y2={110} />
                  </g>
                  <polyline
                    points={linePoints}
                    fill="none"
                    stroke="#2c5e6e"
                    strokeWidth={2}
                  />
                  {lineXs.map((x, i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={lineYs[i]}
                      r={3}
                      fill="#2c5e6e"
                    />
                  ))}
                  <g fontSize={8} fill="#888" fontFamily="sans-serif">
                    {months.map((m, i) => (
                      <text key={m} x={20 + i * 40} y={118} textAnchor="middle">
                        {m}
                      </text>
                    ))}
                  </g>
                </svg>
              </div>
              <div className="oracle-bar-charts">
                <div>
                  <h4 className="oracle-chart-title">
                    Resources Created by Week
                  </h4>
                  <svg viewBox="0 0 200 90">
                    {createdWeekly.map((h, i) => (
                      <rect
                        key={i}
                        x={10 + i * 32}
                        y={90 - h}
                        width={22}
                        height={h}
                        fill="#2c5e6e"
                      />
                    ))}
                  </svg>
                </div>
                <div>
                  <h4 className="oracle-chart-title">
                    Resources Terminated by Week
                  </h4>
                  <svg viewBox="0 0 200 90">
                    {terminatedWeekly.map((h, i) => (
                      <rect
                        key={i}
                        x={10 + i * 32}
                        y={90 - h}
                        width={22}
                        height={h}
                        fill="#2c5e6e"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
            <div className="oracle-tabs">
              <span className="active">Home</span>
              <span>Resource Inventory</span>
              <span>Resource Drilldown</span>
              <span>Accounts</span>
              <span>Tags</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
