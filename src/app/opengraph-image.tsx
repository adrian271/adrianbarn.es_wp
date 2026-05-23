import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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
  // Load portrait at build time and embed as a data URL so satori can
  // composite it as a darkened background. Mirrors the lander treatment:
  // dark overlay over portrait, text reads cleanly on top.
  const portraitBuffer = await readFile(
    join(
      process.cwd(),
      "public/Adrian_Barnes_headphones_microphone_stream_desk_compressed.png",
    ),
  );
  const portraitDataUrl = `data:image/png;base64,${portraitBuffer.toString("base64")}`;

  return new ImageResponse(
    // OUTER: relative positioning with EXPLICIT pixel dimensions. Satori
    // doesn't reliably compute percentage widths on absolutely-positioned
    // children, so every layered element below uses fixed pixel sizes.
    <div
      style={{
        position: "relative",
        width: 1200,
        height: 630,
        display: "flex",
        backgroundColor: INK,
        color: PAPER,
        overflow: "hidden",
      }}
    >
      {/* LAYER 1 — portrait, transformable.
          Image is rendered taller than the 630px card (1800px) so we have
          headroom to translateY upward and reveal different vertical slices.
          Tweak `transform` to fine-tune framing:
            - translateY(-Npx)  → shift face UP within the card
            - translateY(Npx)   → shift face DOWN
            - translateX(±Npx)  → shift left/right
            - scale(N)          → zoom in (>1) or out (<1)
          Multiple transforms compose left-to-right. */}
      <img
        src={portraitDataUrl}
        width={1200}
        height={1800 * 2.2}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 1200 * 0.52,
          height: 1800 * 0.52,
          objectFit: "cover",
          transform: "translateY(-200px) scale(1)",
          filter: "saturate(0) brightness(0.25)",
        }}
      />

      {/* LAYER 2 — darkening gradient overlay (fixed-size box, not inset). */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: "flex",
          background:
            "linear-gradient(180deg, rgba(10,10,11,0.78) 0%, rgba(10,10,11,0.7) 50%, rgba(10,10,11,0.92) 100%)",
        }}
      />

      {/* LAYER 3 — text content, sits on top via document order. */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 1200,
          height: 630,
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
          {" "}
          <span
            style={{
              color: ACCENT,
            }}
          >
            https://
          </span>
          <span>adrianbarn</span>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 7,
              background: ACCENT,
              margin: "0 -2px",
              transform: "translate(-3px,3px)",
            }}
          />
          <span>es</span>
        </div>

        {/* Middle: kicker + name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
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
        {/* <div
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
        </div> */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 28,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: 28,
          }}
        >
          Principal Software Engineer · 10+ Years
        </div>
      </div>
    </div>,
    { ...size },
  );
}
