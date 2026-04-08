// ============================================================
// loader.js
// Realistic loading bar that tracks actual asset load progress.
// The loading GIF plays for at least MIN_DURATION ms regardless.
// ============================================================

const MIN_DURATION = 3000; // 3 seconds = ~2 loops of a 1.5s gif

export function initLoader() {
  const loader  = document.getElementById('loader');
  const bar     = document.getElementById('loader-bar');
  const pct     = document.getElementById('loader-pct');

  if (!loader) return;

  const startTime = Date.now();
  let loadProgress = 0;

  // Count all resources that need loading
  const resources = Array.from(
    document.querySelectorAll('img[src], video[src], source[src]')
  );

  if (resources.length === 0) {
    // No resources — just run the timer
    runTimer();
    return;
  }

  let loaded = 0;

  function onLoad() {
    loaded++;
    loadProgress = loaded / resources.length;
    updateBar(loadProgress * 100);
    if (loaded >= resources.length) maybeFinish();
  }

  resources.forEach(el => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'img') {
      if (el.complete) { onLoad(); }
      else { el.addEventListener('load', onLoad); el.addEventListener('error', onLoad); }
    } else {
      // video / source — consider loaded immediately for progress purposes
      onLoad();
    }
  });

  function runTimer() {
    // Animate bar smoothly even with no real resources
    let fake = 0;
    const interval = setInterval(() => {
      fake = Math.min(fake + Math.random() * 8 + 2, 92);
      updateBar(fake);
      if (fake >= 92) clearInterval(interval);
    }, 120);
    setTimeout(() => {
      updateBar(100);
      setTimeout(hide, 400);
    }, MIN_DURATION);
  }

  function maybeFinish() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DURATION - elapsed);
    updateBar(100);
    setTimeout(hide, remaining + 300);
  }

  function updateBar(value) {
    const clamped = Math.min(100, Math.max(0, Math.round(value)));
    bar.style.width = clamped + '%';
    if (pct) pct.textContent = clamped + '%';
  }

  function hide() {
    loader.classList.add('hidden');
    // Remove from DOM after transition completes
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }
}
