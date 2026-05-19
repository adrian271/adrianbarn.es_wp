"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { MediaItem } from "@/content/portfolio";
import Mockup from "./Mockups";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

/** Non-interactive slide types — safe to wrap the whole slide in an `<a>`. */
const INTERACTIVE_TYPES = new Set<MediaItem["type"]>([
  "video",
  "iframe",
  "embed",
  "youtube",
  "vimeo",
]);

function isExternal(item: MediaItem): boolean {
  if (!item.href) return false;
  if (item.external !== undefined) return item.external;
  return /^https?:\/\//i.test(item.href);
}

function LinkOutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={11}
      height={11}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M7 17 L17 7" />
      <path d="M8 7 H17 V16" />
    </svg>
  );
}

function VideoSlide({
  item,
  isActive,
}: {
  item: Extract<MediaItem, { type: "video" }>;
  isActive: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  // Only autoplay videos need viewport tracking — skip the observer otherwise
  // so non-autoplay slides don't pay the cost or get re-paused on scroll.
  useEffect(() => {
    if (!item.autoplay) return;
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [item.autoplay]);

  // Imperative play/pause. The HTML `autoplay` attribute fires on mount
  // regardless of scroll position, which would fetch + decode every autoplay
  // video on the page at load time. Driving it from a combined state instead
  // means below-the-fold videos stay parked until the user scrolls to them.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!item.autoplay) {
      // Non-autoplay videos: only pause when the carousel hides them. Don't
      // touch playback based on scroll — that would yank the rug from under
      // a user who manually started playback and then scrolled briefly.
      if (!isActive) el.pause();
      return;
    }
    if (isActive && inView) {
      const p = el.play();
      // play() rejects if e.g. autoplay policy blocks it. Swallow — the
      // native controls are still there for the user.
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      el.pause();
    }
  }, [item.autoplay, isActive, inView]);

  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      controls
      loop={!!item.loop}
      muted={!!item.autoplay}
      playsInline
      preload="metadata"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        background: "#000",
      }}
    />
  );
}

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
      return <VideoSlide item={item} isActive={isActive} />;

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

/** Wrap non-interactive slide content in an `<a>` when the item has an href. */
function SlideWrapper({
  item,
  children,
}: {
  item: MediaItem;
  children: ReactNode;
}) {
  const canWrap = item.href && !INTERACTIVE_TYPES.has(item.type);
  if (!canWrap) return <>{children}</>;
  const external = isExternal(item);
  return (
    <a
      href={item.href}
      className="carousel-slide-link"
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
    >
      {children}
    </a>
  );
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
  const hasMany = count > 1;
  const go = (n: number) => setIdx(((n % count) + count) % count);

  useEffect(() => {
    if (count <= 1) return;
    const el = ref.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.matches(":focus-within") && document.activeElement !== el)
        return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setIdx((i) => (i + 1) % count);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIdx((i) => (i - 1 + count) % count);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  const current = safeItems[idx];
  const currentExternal = isExternal(current);
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
            <SlideWrapper item={item}>
              <MediaSlide item={item} isActive={i === idx} />
            </SlideWrapper>
          </div>
        ))}

        {hasMany && (
          <>
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
          </>
        )}

        <div className="carousel-type-tag">{current.type.toUpperCase()}</div>
      </div>

      <div className="carousel-footer">
        <div className="carousel-caption">
          {current.href ? (
            <a
              href={current.href}
              className="carousel-caption-link"
              target={currentExternal ? "_blank" : undefined}
              rel={currentExternal ? "noreferrer noopener" : undefined}
            >
              <span>{current.caption ?? "Open link"}</span>
              <LinkOutIcon />
            </a>
          ) : (
            (current.caption ?? "")
          )}
        </div>
        {hasMany && (
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
        )}
      </div>
    </div>
  );
}
