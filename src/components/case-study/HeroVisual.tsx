import type { HeroVisualKind } from "@/content/portfolio";

const billabongWaveBg =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' preserveAspectRatio='none'><path d='M0 600 Q 400 300 800 500 T 1600 400 V 900 H 0 Z' fill='rgba(255,255,255,0.12)'/><path d='M0 700 Q 400 500 800 650 T 1600 600 V 900 H 0 Z' fill='rgba(255,255,255,0.22)'/><path d='M0 780 Q 400 700 800 760 T 1600 740 V 900 H 0 Z' fill='rgba(255,255,255,0.35)'/></svg>\")";

const blastStars = `radial-gradient(1px 1px at 20% 30%, white, transparent),
                    radial-gradient(1px 1px at 60% 70%, white, transparent),
                    radial-gradient(1px 1px at 80% 20%, white, transparent),
                    radial-gradient(2px 2px at 40% 80%, white, transparent),
                    radial-gradient(1px 1px at 90% 50%, white, transparent),
                    radial-gradient(2px 2px at 75% 35%, white, transparent),
                    radial-gradient(1px 1px at 50% 15%, white, transparent),
                    radial-gradient(1px 1px at 33% 90%, white, transparent),
                    radial-gradient(1px 1px at 88% 88%, white, transparent)`;

export default function HeroVisual({ kind }: { kind: HeroVisualKind }) {
  switch (kind) {
    case "oracle":
      return (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #4a0d10 0%, #7a1d22 50%, #a4262c 100%)",
          }}
        >
          <svg
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.18,
            }}
          >
            <polyline
              points="0,600 100,580 200,560 300,500 400,540 500,520 600,420 700,460 800,300 900,340 1000,200 1100,240 1200,180"
              fill="none"
              stroke="white"
              strokeWidth={2}
            />
            {Array.from({ length: 20 }, (_, i) => (
              <rect
                key={i}
                x={i * 60 + 30}
                y={650 - i * 8}
                width={36}
                height={i * 8 + 30}
                fill="white"
                opacity={0.3 - i * 0.01}
              />
            ))}
          </svg>
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "8%",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,180,160,0.25) 0%, transparent 70%)",
            }}
          />
        </div>
      );

    case "tenant":
      return (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            background:
              "linear-gradient(160deg, #0a2e34 0%, #0e4a52 50%, #1a6e75 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(44,177,188,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(44,177,188,0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <svg
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.5,
            }}
          >
            <rect
              x={200}
              y={140}
              width={320}
              height={280}
              fill="none"
              stroke="rgba(44,177,188,0.6)"
              strokeWidth={2}
            />
            <rect
              x={240}
              y={180}
              width={120}
              height={100}
              fill="rgba(44,177,188,0.18)"
              stroke="rgba(44,177,188,0.6)"
              strokeWidth={1}
            />
            <rect
              x={380}
              y={180}
              width={80}
              height={60}
              fill="rgba(44,177,188,0.12)"
              stroke="rgba(44,177,188,0.6)"
              strokeWidth={1}
            />
            <rect
              x={380}
              y={260}
              width={80}
              height={60}
              fill="rgba(44,177,188,0.12)"
              stroke="rgba(44,177,188,0.6)"
              strokeWidth={1}
            />
            <rect
              x={240}
              y={300}
              width={60}
              height={60}
              fill="rgba(44,177,188,0.12)"
              stroke="rgba(44,177,188,0.6)"
              strokeWidth={1}
            />
            <rect
              x={320}
              y={320}
              width={80}
              height={60}
              fill="rgba(44,177,188,0.12)"
              stroke="rgba(44,177,188,0.6)"
              strokeWidth={1}
            />
            <rect
              x={700}
              y={200}
              width={280}
              height={320}
              fill="none"
              stroke="rgba(44,177,188,0.5)"
              strokeWidth={2}
            />
            <rect
              x={740}
              y={240}
              width={80}
              height={60}
              fill="rgba(44,177,188,0.1)"
              stroke="rgba(44,177,188,0.5)"
              strokeWidth={1}
            />
            <rect
              x={840}
              y={240}
              width={100}
              height={80}
              fill="rgba(44,177,188,0.1)"
              stroke="rgba(44,177,188,0.5)"
              strokeWidth={1}
            />
          </svg>
        </div>
      );

    case "soberlink":
      return (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            background:
              "linear-gradient(160deg, #0d3d6e 0%, #1668b2 50%, #5a96d4 100%)",
          }}
        >
          <svg
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.5,
            }}
          >
            {Array.from({ length: 30 }, (_, i) => {
              const x = 100 + (i * 37) % 1000;
              const y = 100 + (i * 73) % 600;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={4} fill="white" />
                  {i > 0 && (
                    <line
                      x1={x}
                      y1={y}
                      x2={100 + ((i - 1) * 37) % 1000}
                      y2={100 + ((i - 1) * 73) % 600}
                      stroke="white"
                      strokeWidth={0.5}
                      opacity={0.4}
                    />
                  )}
                </g>
              );
            })}
          </svg>
          <div
            style={{
              position: "absolute",
              right: "15%",
              top: "30%",
              width: 120,
              height: 280,
              background: "linear-gradient(180deg, #2a2a2e, #1a1a1d)",
              borderRadius: "20px 20px 28px 28px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              transform: "rotate(-8deg)",
            }}
          />
        </div>
      );

    case "blast":
      return (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            background:
              "radial-gradient(ellipse at 30% 20%, #2a1058 0%, #0a0418 60%, #050010 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: blastStars,
              backgroundSize: "250px 250px",
              opacity: 0.8,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "120%",
              aspectRatio: "1",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #d63eff 0%, #7a1fb8 30%, #2a0c4a 60%, transparent 80%)",
              opacity: 0.55,
              filter: "blur(20px)",
            }}
          />
        </div>
      );

    case "billabong":
      return (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #1e3a4a 0%, #2c5e6e 30%, #4ba48a 60%, #c8d8c0 90%)",
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
        </div>
      );

    case "futures":
      return (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            background:
              "linear-gradient(180deg, #003a52 0%, #00638a 40%, #87b8d0 80%, #d8c0a0 100%)",
          }}
        >
          <svg
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <rect
              x={200}
              y={540}
              width={800}
              height={60}
              fill="rgba(255,255,255,0.8)"
              rx={4}
            />
            <polygon
              points="350,540 420,340 380,540"
              fill="rgba(0,0,0,0.65)"
            />
            <polygon
              points="600,540 670,300 630,540"
              fill="rgba(0,0,0,0.65)"
            />
            <polygon
              points="850,540 920,360 880,540"
              fill="rgba(0,0,0,0.65)"
            />
            <ellipse
              cx={600}
              cy={608}
              rx={400}
              ry={14}
              fill="rgba(0,0,0,0.25)"
            />
          </svg>
        </div>
      );

    default:
      return null;
  }
}
