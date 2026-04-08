// ============================================================
// nav.js
// Single sticky nav: transparent over hero, solid after.
// Hamburger menu for mobile. Scroll-to-top button.
// ============================================================

export function initNav() {
  const nav        = document.getElementById('nav');
  const hamburger  = document.querySelector('.nav-hamburger');
  const drawer     = document.getElementById('nav-drawer');
  const scrollTop  = document.getElementById('scroll-top');
  const hero       = document.getElementById('hero');

  if (!nav || !hero) return;

  // ── Nav style on scroll ──────────────────────────────────

  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        nav.classList.add('nav-hero');
        nav.classList.remove('nav-solid');
      } else {
        nav.classList.remove('nav-hero');
        nav.classList.add('nav-solid');
      }
    },
    { threshold: 0.1 }
  );

  heroObserver.observe(hero);
  nav.classList.add('nav-hero'); // default on load

  // ── Scroll-to-top button ─────────────────────────────────

  if (scrollTop) {
    const showObserver = new IntersectionObserver(
      ([entry]) => {
        scrollTop.classList.toggle('visible', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    showObserver.observe(hero);

    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Hamburger / drawer ───────────────────────────────────

  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close drawer when a link inside it is clicked
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Close drawer on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}
