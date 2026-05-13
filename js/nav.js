// ============================================================
// nav.js
// Single sticky nav: transparent over hero, solid after.
// Hamburger menu for mobile. Scroll-to-top button.
// Dark pages (audio, etc) get nav-solid immediately.
// ============================================================

export function initNav() {
  const nav       = document.getElementById('nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer    = document.getElementById('nav-drawer');
  const scrollTop = document.getElementById('scroll-top');
  const hero      = document.getElementById('hero');

  if (!nav) return;

  // ── Dark background pages — force solid nav immediately ──
  const isDarkPage = document.body.classList.contains('page-audio')
    || document.body.classList.contains('page-dark');

  if (isDarkPage || !hero) {
    nav.classList.remove('nav-hero');
    nav.classList.add('nav-solid');
  } else {
    // ── Nav style driven by hero visibility ────────────────
    nav.classList.add('nav-hero');

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
  }

  // ── Scroll-to-top ────────────────────────────────────────

  if (scrollTop && hero) {
    const showObserver = new IntersectionObserver(
      ([entry]) => {
        scrollTop.classList.toggle('visible', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    showObserver.observe(hero);
  } else if (scrollTop) {
    // No hero — show scroll-top after a bit of scrolling
    window.addEventListener('scroll', () => {
      scrollTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }

  scrollTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Specialties trigger — click scrolls to #specialty ───

  const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', () => {
      const target = document.querySelector('#specialty');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── Hamburger / drawer ───────────────────────────────────

  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}