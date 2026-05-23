import { ImageResponse } from "next/og";

// Social-share preview (1200×630) — used by iMessage, Discord, LinkedIn,
// Facebook, Slack, Twitter/X, Bluesky, etc. Generated at build time from
// the same design tokens as the lander so it stays in sync.
//
// To preview locally during dev: visit
//   http://localhost:3000/opengraph-image
// In Next.js this file auto-wires both og:image and twitter:image (when
// no separate twitter-image file exists), thanks to the Metadata file
// conventions: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

export const alt = "Adrian Barnes — Principal Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#0085ff";
const INK = "#0a0a0b";
const PAPER = "#f6f4ee";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        background: INK,
        color: PAPER,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
      }}
    >
      {/* Top: wordmark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: 22,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        <span>adrianbarn</span>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: ACCENT,
            margin: "0 14px",
          }}
        />
        <span>es</span>
      </div>

      {/* Middle: kicker + name */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: 28,
          }}
        >
          Principal Software Engineer · 10+ Years
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Georgia, serif",
            fontSize: 148,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          <span>Adrian</span>
          <div style={{ display: "flex" }}>
            <span>Barnes</span>
          </div>
        </div>
      </div>

      {/* Bottom: brand roster */}
      <div
        style={{
          display: "flex",
          fontFamily: "monospace",
          fontSize: 14,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(246, 244, 238, 0.65)",
        }}
      >
        <span>
          Oracle · Tenant · Soberlink · Blast · Billabong · Futures Fins
        </span>
      </div>
    </div>,
    { ...size },
  );
}
