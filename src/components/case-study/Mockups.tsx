"use client";

import { useState } from "react";
import type { MockupKey } from "@/content/portfolio";

function OracleMockup() {
  const lineXs = [20, 60, 100, 140, 180, 220, 260, 300, 340, 380];
  const lineYs = [90, 85, 80, 72, 82, 88, 85, 30, 15, 55];
  const points = lineXs.map((x, i) => `${x},${lineYs[i]}`).join(" ");
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
  return (
    <div className="oracle-dashboard">
      <div className="oracle-dash-header">
        <h3 className="oracle-dash-title">Inventory Growth and Changes</h3>
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
          <h4 className="oracle-chart-title">Resources Created by Month</h4>
          <svg viewBox="0 0 400 120" className="oracle-line-chart">
            <g stroke="#ececec" strokeWidth={1}>
              <line x1={0} y1={20} x2={400} y2={20} />
              <line x1={0} y1={50} x2={400} y2={50} />
              <line x1={0} y1={80} x2={400} y2={80} />
              <line x1={0} y1={110} x2={400} y2={110} />
            </g>
            <polyline
              points={points}
              fill="none"
              stroke="#a4262c"
              strokeWidth={2}
            />
            {lineXs.map((x, i) => (
              <circle key={i} cx={x} cy={lineYs[i]} r={3} fill="#a4262c" />
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
            <h4 className="oracle-chart-title">Resources Created by Week</h4>
            <svg viewBox="0 0 200 90">
              {[40, 75, 55, 65, 68, 20].map((h, i) => (
                <rect
                  key={i}
                  x={10 + i * 32}
                  y={90 - h}
                  width={22}
                  height={h}
                  fill="#a4262c"
                />
              ))}
            </svg>
          </div>
          <div>
            <h4 className="oracle-chart-title">
              Resources Terminated by Week
            </h4>
            <svg viewBox="0 0 200 90">
              {[28, 55, 18, 62, 22, 20].map((h, i) => (
                <rect
                  key={i}
                  x={10 + i * 32}
                  y={90 - h}
                  width={22}
                  height={h}
                  fill="#a4262c"
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
  );
}

function StairsIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5b6e8c"
      strokeWidth={2}
      width={size}
      height={size}
    >
      <path d="M4 20 L4 16 L8 16 L8 12 L12 12 L12 8 L16 8 L16 4 L20 4" />
    </svg>
  );
}

function TenantMockup() {
  const [selected, setSelected] = useState("office");
  return (
    <div className="floorplan">
      <div className="floorplan-canvas">
        <div className="floor-zoom">
          <button>+</button>
          <button>−</button>
          <button>⊡</button>
        </div>
        <div
          className="unit"
          style={{ left: "22%", top: "12%", width: 130, height: 110 }}
          onClick={() => setSelected("office")}
        >
          Office
          {selected === "office" && (
            <div className="unit-handles">
              <i className="bl" />
              <i className="br" />
            </div>
          )}
        </div>
        <div
          className="unit"
          style={{ left: "50%", top: "30%", width: 80, height: 34 }}
          onClick={() => setSelected("u2")}
        >
          2
        </div>
        <div
          className="unit"
          style={{ left: "30%", top: "42%", width: 50, height: 30 }}
          onClick={() => setSelected("u3")}
        >
          3
        </div>
        <div
          className="unit"
          style={{
            left: "38%",
            top: "55%",
            width: 46,
            height: 46,
            padding: 6,
          }}
          onClick={() => setSelected("stairs")}
        >
          <StairsIcon />
          {selected === "stairs" && (
            <>
              <div className="unit-handles">
                <i className="bl" />
                <i className="br" />
              </div>
              <div className="unit-toolbar">
                <button title="Rotate left">↺</button>
                <button title="Rotate right">↻</button>
                <button title="Delete">🗑</button>
              </div>
            </>
          )}
        </div>
        <div
          className="unit"
          style={{
            left: "55%",
            top: "60%",
            width: 40,
            height: 40,
            padding: 6,
          }}
        >
          <StairsIcon size={20} />
        </div>
        <div
          className="unit"
          style={{ left: "42%", top: "76%", width: 50, height: 34 }}
        >
          A
        </div>
      </div>
      <div className="floor-side">
        <div className="floor-side-header">
          <span>☰ &nbsp; 1</span>
          <span className="reset">Reset Floor</span>
        </div>
        <div className="floor-tabs">
          <span>Spaces</span>
          <span className="active">Objects</span>
        </div>
        <div className="floor-objects">
          <div
            className="floor-object"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 18,
                border: "1px solid #888",
              }}
            />
            Office
          </div>
          <div
            className="floor-object"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#444"
              strokeWidth={2}
              width={18}
              height={18}
            >
              <path d="M4 20 L4 16 L8 16 L8 12 L12 12 L12 8 L16 8 L16 4 L20 4" />
            </svg>
            Stairs
          </div>
        </div>
      </div>
    </div>
  );
}

function SoberlinkMockup() {
  return (
    <div className="soberlink-hero" style={{ aspectRatio: "1.6 / 1" }}>
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
  );
}

function BlastMockup() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}
    >
      <div className="blast-phone" style={{ transform: "rotate(0deg)" }}>
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            🍄
          </div>
          <div className="blast-card-game">SUPER MARIO BROS</div>
          <div className="blast-card-title">$1 + 500xp</div>
          <div className="blast-card-cta">LOG IN TO PLAY</div>
        </div>
      </div>
    </div>
  );
}

const billabongWaveBg =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' preserveAspectRatio='none'><path d='M0 600 Q 400 300 800 500 T 1600 400 V 900 H 0 Z' fill='rgba(255,255,255,0.15)'/><path d='M0 700 Q 400 500 800 650 T 1600 600 V 900 H 0 Z' fill='rgba(255,255,255,0.25)'/><path d='M0 780 Q 400 700 800 760 T 1600 740 V 900 H 0 Z' fill='rgba(255,255,255,0.4)'/></svg>\")";

function BillabongMockup() {
  const brands = [
    { name: "Billabong", role: "Lead rebuild", active: true },
    { name: "RVCA", role: "Site rebuild", active: false },
    { name: "Element", role: "UI updates", active: false },
    { name: "Von Zipper", role: "UI updates", active: false },
  ];
  return (
    <div
      style={{
        position: "relative",
        minHeight: 320,
        borderRadius: 4,
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #1e3a4a 0%, #2c5e6e 30%, #4ba48a 60%, #c8d8c0 90%)",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: billabongWaveBg,
          backgroundSize: "cover",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            marginBottom: 12,
          }}
        >
          RVCA · Direct-to-Consumer
        </div>
        <div
          style={{
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: 800,
            fontSize: "clamp(36px, 5vw, 64px)",
            color: "white",
            textTransform: "uppercase",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            textShadow: "0 4px 24px rgba(0,0,0,0.25)",
          }}
        >
          Anything But
          <br />
          Average.
        </div>
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          background: "rgba(255,255,255,0.92)",
          borderRadius: 2,
          overflow: "hidden",
          marginTop: 24,
        }}
      >
        {brands.map((b, i) => (
          <div
            key={b.name}
            style={{
              flex: 1,
              padding: "18px 12px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid #e3e3e3" : "none",
              background: b.active ? "#1a1a1a" : "transparent",
              color: b.active ? "white" : "#1a1a1a",
              fontFamily: "serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {b.name}
            <div
              style={{
                fontFamily: "var(--mono)",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 8,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: b.active ? "#aaa" : "#888",
                marginTop: 4,
              }}
            >
              {b.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FuturesMockup() {
  const fins = [
    { name: "MB2", mat: "Honeycomb / Carbon", color: "#1a1a1a", accent: "#d8e858" },
    { name: "Jordy", mat: "Honeycomb", color: "#1a1a1a", accent: "#5ec85e" },
    { name: "F4", mat: "Techflex", color: "#1a1a1a", accent: "#d8e858" },
    { name: "John John", mat: "Techflex", color: "#1a1a1a", accent: "#3a8fd0" },
  ];
  return (
    <div
      style={{
        background: "#ededed",
        border: "1px solid #ccc",
        borderRadius: 2,
        overflow: "hidden",
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div style={{ display: "flex", background: "#2a2a2a", color: "white" }}>
        <div
          style={{
            background: "#00a3e0",
            padding: "16px 22px",
            fontWeight: 700,
            fontSize: 24,
            fontStyle: "italic",
          }}
        >
          futures.
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            padding: "0 20px",
            gap: 24,
          }}
        >
          {["FINS", "FIN SCHOOL", "TEAM", "RETAIL"].map((l) => (
            <span
              key={l}
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#00a3e0",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            paddingBottom: 6,
            borderBottom: "1px solid #ccc",
          }}
        >
          Featured Fins
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            background: "white",
            border: "1px solid #ccc",
          }}
        >
          {fins.map((fin, i) => (
            <div
              key={fin.name}
              style={{
                padding: "20px 12px",
                textAlign: "center",
                borderRight: i < 3 ? "1px solid #ececec" : "none",
              }}
            >
              <svg
                viewBox="0 0 80 100"
                style={{ height: 70, margin: "0 auto 12px", display: "block" }}
              >
                <path
                  d="M 25 95 Q 30 50 60 8 L 70 12 Q 55 60 50 95 Z"
                  fill={fin.color}
                />
                <path
                  d="M 50 95 Q 55 55 70 12 L 75 18 Q 65 60 60 95 Z"
                  fill={fin.accent}
                />
                <ellipse
                  cx={48}
                  cy={92}
                  rx={22}
                  ry={2}
                  fill="rgba(0,0,0,0.15)"
                />
              </svg>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  fontStyle: "italic",
                  color: "#333",
                }}
              >
                {fin.name}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "#00a3e0",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                {fin.mat}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const MOCKUPS: Record<MockupKey, React.ComponentType> = {
  oracle: OracleMockup,
  tenant: TenantMockup,
  soberlink: SoberlinkMockup,
  blast: BlastMockup,
  billabong: BillabongMockup,
  futures: FuturesMockup,
};

export default function Mockup({ kind }: { kind: MockupKey }) {
  const C = MOCKUPS[kind];
  return <C />;
}
