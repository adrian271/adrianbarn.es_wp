# Todo

## Done

1. ~~In carousel, make video pause when the carousel has selected another media item~~ ✅
2. ~~Hide Carousel navigation (left and right) when there is only 1 item in carousel~~ ✅ — also hides dots row + counter at count 1
3. ~~Optional hyperlinks on carousel items~~ ✅ — `href` + optional `external` on `MediaItem`. Non-interactive slides (image, mockup, placeholder) wrap the whole slide in `<a>`; interactive slides (video, iframe, embed, youtube, vimeo) get a clickable caption with a link-out icon. External is auto-inferred from `http(s)://` and overridable.

## Parked — waiting on Cloudflare decision

4. Auto-advance carousel when a video ends.
5. Larger centered custom play button on videos.

Both depend on whether videos stay native `<video>` or move to a Cloudflare Stream iframe — Stream's player has its own controls and exposes end-of-playback over `postMessage` rather than `onEnded`, so the implementation differs meaningfully between the two paths.

## Parked — design decision

6. **Ambient video mode** — opt-in `ambient: true` on video slides for silent decorative loops (think Stripe.com homepage motion). When set:
   - Drops `controls` entirely (no scrubber, no mute icon — both are meaningless on silent looping motion).
   - Forces `loop: true` and `muted: true` (autoplay already implies muted, but ambient should be explicit about looping).
   - Keeps the in-view IntersectionObserver gating from item 1 — a 30MB silent video below the fold is still 30MB of wasted bandwidth.
   - Coexists with `autoplay: true` as a distinct mode: use plain `autoplay` on videos that have real audio someone might want to unmute (e.g. the CloudWorld keynote); use `ambient` on silent screen-captures and decorative motion.

   Why parked: I like the cleaner UX but want to inventory which of the actual gallery videos are genuinely silent-decorative vs. audio-bearing before committing to the second mode. If only 1–2 videos qualify, it may not justify the extra type field — could just drop controls case-by-case via a one-off prop.

## Feedback from Ariel

1. "It took me a minute to realize that you were showing the work before getting into the case study, and there is a lot going on visually, so it also took me a second to figure out which company I was looking out because the eyebrows are very small and subtle."
2. "It's a lot to scroll through, I know you have the navigation on the side with logos, and I atually like that. but maybe they could be collapsible?"
3. "give some other visual indication that you are going to the next job"
4. "I think there is also some color choices I would maybe change just to make things easier to read too"
5. Play with Copy first, then carousel after

## Feedback from Kevin

### ux notes:

• consider changing header image to a video reel in the background or add parallax to existing image. alternatively, you can add slideshow of a couple more images
• consider having a sticky nav at top, i know some people may not use side nav and may be annoyed to scroll up a bunch if they wanted to read intro or something
• add another text treatment within the case studies, for example a block quote to highlight some data or a sentence that is important. this will help by adding good contrast for reader
• refine gradients for each section to blend better (like how blast is)

### content notes:

• remove the Futures Fins section, just cuz some of the web visual design is a bit outdated
• speed up the video on Blast by 3x so the scrolling is faster
• add more imagery to support Soberlink, if struggling to find assets even some branded stuff from their website or product imagery
