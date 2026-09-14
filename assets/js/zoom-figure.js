// Zoom for publication thumbnails (the previews in the venue column).
//
// Three jobs:
//  - keep the zoomed figure clear of the fixed navbar. The navbar is
//    z-index 1030 and medium-zoom's opened image is 999, so a tall figure
//    using the full viewport height slid *underneath* it and had to be
//    scrolled. medium-zoom's `container` accepts a rect, and subtracts its
//    top/bottom before applying the margin, so offsetting the top by the
//    navbar's measured height reserves that strip.
//  - reserve 9% of the shorter viewport edge on every side, so a zoomed figure
//    sits at roughly 82% of the space left below the navbar.
//  - point the zoom at the full-resolution original. The thumbnail is served
//    through a <picture> srcset, so without data-zoom-src medium-zoom would
//    enlarge the ~480px webp variant instead of the source image.
document.addEventListener("DOMContentLoaded", () => {
  if (typeof mediumZoom !== "function") {
    return;
  }

  const targets = document.querySelectorAll("[data-zoom-figure], img.preview");
  if (!targets.length) {
    return;
  }

  // medium-zoom scales from the thumbnail element's rect and then swaps in
  // data-zoom-src, so the two must share an aspect ratio -- a differently
  // shaped source is scaled against the wrong box. The file is therefore the
  // same one the thumbnail uses; data-zoom-src only pins it to the full PNG
  // rather than the ~480px webp the srcset picked.
  targets.forEach((img) => {
    if (!img.dataset.zoomSrc) {
      img.dataset.zoomSrc = img.src;
    }
  });

  // measured, not hardcoded: the navbar shrinks at narrow breakpoints
  const navHeight = () => {
    const nav = document.querySelector("nav.fixed-top");
    return nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
  };
  const margin = () => Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.09);
  const options = () => ({ margin: margin(), container: { top: navHeight() } });

  const zoom = mediumZoom(targets, {
    ...options(),
    background: `${getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color")}ee`,
  });
  window.addEventListener("resize", () => zoom.update(options()));
});
