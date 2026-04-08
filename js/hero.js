// ============================================================
// hero.js
// Hero video switcher: hover thumbnail → switch reel.
// Click thumbnail → navigate to specialty page.
// Dims video on scroll, pauses when out of view.
// Auto-cycles reels every CYCLE_MS if user hasn't interacted.
// ============================================================

const CYCLE_MS     = 8000;  // ms before auto-advancing to next reel
const DIM_START    = 0.15;  // scroll fraction at which dimming begins
const DIM_END      = 0.55;  // scroll fraction at which video is fully dim

export function initHero() {
  const hero      = document.getElementById('hero');
  const videos    = document.querySelectorAll('.hero-video');
  const thumbs    = document.querySelectorAll('.reel-thumb');

  if (!hero || videos.length === 0) return;

  let currentIndex   = 0;
  let cycleTimer     = null;
  let userInteracted = false;

  // ── Switch reel ──────────────────────────────────────────

  function switchTo(index, fromUser = false) {
    if (index === currentIndex && fromUser) return;

    if (fromUser) {
      userInteracted = true;
      clearInterval(cycleTimer);
    }

    // Update videos
    videos.forEach((v, i) => {
      v.classList.toggle('active', i === index);
      v.classList.toggle('inactive', i !== index);
      if (i === index) {
        v.currentTime = 0;
        v.play().catch(() => {}); // autoplay may be blocked; fail silently
      } else {
        v.pause();
      }
    });

    // Update thumbs
    thumbs.forEach((t, i) => t.classList.toggle('active', i === index));

    currentIndex = index;
  }

  // ── Thumbnail interactions ───────────────────────────────

  thumbs.forEach((thumb, i) => {
    // Hover: preview that reel
    thumb.addEventListener('mouseenter', () => switchTo(i, true));

    // Click: navigate to specialty page
    thumb.addEventListener('click', () => {
      const href = thumb.dataset.href;
      if (href) window.location.href = href;
    });
  });

  // ── Auto-cycle (stops once user interacts) ───────────────

  function startCycle() {
    cycleTimer = setInterval(() => {
      if (!userInteracted) {
        switchTo((currentIndex + 1) % videos.length);
      }
    }, CYCLE_MS);
  }

  // ── Scroll: dim + pause ──────────────────────────────────

  function onScroll() {
    const rect     = hero.getBoundingClientRect();
    const vh       = window.innerHeight;
    const progress = 1 - (rect.bottom / vh); // 0 at top, 1 when hero scrolled away

    // Dim
    const clamp = Math.max(0, Math.min(1, (progress - DIM_START) / (DIM_END - DIM_START)));
    const active = videos[currentIndex];
    if (active) active.style.opacity = 1 - clamp;

    // Pause / resume
    const isVisible = rect.bottom > 0 && rect.top < vh;
    videos.forEach((v, i) => {
      if (i === currentIndex) {
        if (isVisible) { v.play().catch(() => {}); }
        else           { v.pause(); }
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Init ─────────────────────────────────────────────────

  switchTo(0);
  startCycle();
}
