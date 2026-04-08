// ============================================================
// filters.js
// Dual filter system: work type (buttons) + program (buttons).
// Both filters apply simultaneously (AND logic within groups,
// OR logic across same-group selections).
// Software strip logos trigger the program filter.
// ============================================================

export function initFilters() {
  const cards        = document.querySelectorAll('.project-card');
  const typeButtons  = document.querySelectorAll('.filter-btn[data-type]');
  const progButtons  = document.querySelectorAll('.filter-btn[data-prog]');
  const logoButtons  = document.querySelectorAll('.software-logo[data-prog]');

  if (!cards.length) return;

  let activeType = 'all';
  let activeProg = 'all';

  // ── Apply current filters ────────────────────────────────

  function applyFilters() {
    cards.forEach(card => {
      const cardTypes  = (card.dataset.types || '').split(',').map(s => s.trim().toLowerCase());
      const cardProgs  = (card.dataset.progs  || '').split(',').map(s => s.trim().toLowerCase());

      const typeMatch = activeType === 'all' || cardTypes.includes(activeType);
      const progMatch = activeProg === 'all' || cardProgs.includes(activeProg);

      card.classList.toggle('hidden', !(typeMatch && progMatch));
    });
  }

  // ── Type filter buttons ──────────────────────────────────

  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.type.toLowerCase();
      typeButtons.forEach(b => b.classList.toggle('active', b === btn));
      applyFilters();
    });
  });

  // ── Program filter buttons ───────────────────────────────

  progButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeProg = btn.dataset.prog.toLowerCase();
      progButtons.forEach(b => b.classList.toggle('active', b === btn));
      syncLogoState();
      applyFilters();
    });
  });

  // ── Software logo strip ───────────────────────────────────
  // Clicking a logo scrolls to work section and sets that prog filter.

  logoButtons.forEach(logo => {
    logo.addEventListener('click', () => {
      const prog = logo.dataset.prog.toLowerCase();

      // Toggle off if already active
      if (activeProg === prog) {
        activeProg = 'all';
      } else {
        activeProg = prog;
      }

      // Sync prog filter buttons
      progButtons.forEach(b => b.classList.toggle('active', b.dataset.prog.toLowerCase() === activeProg));
      syncLogoState();
      applyFilters();

      // Scroll to work section
      const work = document.getElementById('work');
      if (work) work.scrollIntoView({ behavior: 'smooth' });
    });
  });

  function syncLogoState() {
    logoButtons.forEach(logo => {
      logo.classList.toggle('active', logo.dataset.prog.toLowerCase() === activeProg);
    });
  }

  // Init
  applyFilters();
}
