# Todo

## Done

1. ~~In carousel, make video pause when the carousel has selected another media item~~ ✅
2. ~~Hide Carousel navigation (left and right) when there is only 1 item in carousel~~ ✅ — also hides dots row + counter at count 1
3. ~~Optional hyperlinks on carousel items~~ ✅ — `href` + optional `external` on `MediaItem`. Non-interactive slides (image, mockup, placeholder) wrap the whole slide in `<a>`; interactive slides (video, iframe, embed, youtube, vimeo) get a clickable caption with a link-out icon. External is auto-inferred from `http(s)://` and overridable.

## Parked — waiting on Cloudflare decision

4. Auto-advance carousel when a video ends.
5. Larger centered custom play button on videos.

Both depend on whether videos stay native `<video>` or move to a Cloudflare Stream iframe — Stream's player has its own controls and exposes end-of-playback over `postMessage` rather than `onEnded`, so the implementation differs meaningfully between the two paths.
