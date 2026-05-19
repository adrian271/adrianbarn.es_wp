"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { MediaItem } from "@/content/portfolio";
import Mockup from "./Mockups";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

function MediaSlide({
  item,
  isActive,
}: {
  item: MediaItem;
  isActive: boolean;
}) {
  switch (item.type) {
    case "image":
      return (
        <img
          src={item.src}
          alt={item.alt ?? ""}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      );

    case "youtube":
      return (
        <iframe
          src={
            isActive
              ? `https://www.youtube.com/embed/${item.id}?rel=0&modestbranding=1`
              : "about:blank"
          }
          title={item.caption ?? "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />
      );

    case "vimeo":
      return (
        <iframe
          src={
            isActive
              ? `https://player.vimeo.com/video/${item.id}?title=0&byline=0`
              : "about:blank"
          }
          title={item.caption ?? "Vimeo video"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />
      );

    case "video":
      return (
        <video
          src={item.src}
          poster={item.poster}
          controls
          autoPlay={!!item.autoplay && isActive}
          loop={!!item.loop}
          muted={!!item.autoplay}
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            background: "#000",
          }}
        />
      );

    case "iframe":
      return (
        <iframe
          src={isActive ? item.src : "about:blank"}
          title={item.caption ?? "Embedded content"}
          allow={item.allow ?? ""}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
            background: "#fff",
          }}
        />
      );

    case "embed":
      return (
        <div
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          dangerouslySetInnerHTML={{ __html: item.html }}
        />
      );

    case "mockup":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: item.background ?? "#f4f4f4",
            overflow: "auto",
          }}
        >
          <div style={{ maxWidth: "100%", width: "100%" }}>
            <Mockup kind={item.component} />
          </div>
        </div>
      );

    case "placeholder":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 12,
            background:
              "repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 12px, rgba(0,0,0,0.08) 12px 24px), var(--carousel-placeholder, #1f1f24)",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textAlign: "center",
            padding: 24,
          }}
        >
          <span style={{ fontSize: 32, opacity: 0.4 }}>⊞</span>
          <span>{item.label}</span>
          {item.caption && (
            <span
              style={{
                fontSize: 9,
                opacity: 0.55,
                maxWidth: "60ch",
                letterSpacing: "0.1em",
              }}
            >
              {item.caption}
            </span>
          )}
        </div>
      );
  }
}

export default function MediaCarousel({
  items,
  accent,
}: {
  items: MediaItem[];
  accent?: string;
}) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const safeItems: MediaItem[] =
    items && items.length
      ? items
      : [{ type: "placeholder", label: "No media yet" }];
  const count = safeItems.length;
  const go = (n: number) => setIdx(((n % count) + count) % count);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.matches(":focus-within") && document.activeElement !== el)
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(idx + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(idx - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, count]);

  const current = safeItems[idx];
  const style: CSSVars = {
    "--carousel-accent": accent ?? "var(--cs-accent, var(--accent))",
  };

  return (
    <div
      className="carousel"
      ref={ref}
      tabIndex={0}
      style={style}
      aria-roledescription="carousel"
    >
      <div className="carousel-stage">
        {safeItems.map((item, i) => (
          <div
            key={i}
            className={"carousel-slide " + (i === idx ? "active" : "")}
            aria-hidden={i !== idx}
          >
            <MediaSlide item={item} isActive={i === idx} />
          </div>
        ))}

        <button
          className="carousel-nav prev"
          onClick={() => go(idx - 1)}
          aria-label="Previous slide"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M15 18 L9 12 L15 6" />
          </svg>
        </button>
        <button
          className="carousel-nav next"
          onClick={() => go(idx + 1)}
          aria-label="Next slide"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M9 6 L15 12 L9 18" />
          </svg>
        </button>

        <div className="carousel-counter">
          <span className="carousel-counter-current">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span className="carousel-counter-sep"> / </span>
          <span className="carousel-counter-total">
            {String(count).padStart(2, "0")}
          </span>
        </div>

        <div className="carousel-type-tag">{current.type.toUpperCase()}</div>
      </div>

      <div className="carousel-footer">
        <div className="carousel-caption">{current.caption ?? ""}</div>
        <div className="carousel-dots" role="tablist">
          {safeItems.map((_, i) => (
            <button
              key={i}
              className={"carousel-dot " + (i === idx ? "active" : "")}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Go to slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
