// ============================================================
// filters.js
// Segmented type filter + pill program filter.
// Empty state when no cards match.
// Clear button appears only when non-default filter is active.
// Software strip logos trigger program filter.
// ============================================================

export function initFilters() {
  const cards      = document.querySelectorAll('.project-card');
  const segBtns    = document.querySelectorAll('.filter-seg-btn[data-type]');
  const pillBtns   = document.querySelectorAll('.filter-pill[data-prog]');
  const clearBtn   = document.getElementById('clear-filters');
  const emptyState = document.getElementById('work-empty');
  const workGrid   = document.querySelector('.work-grid');

  if (!cards.length) return;

  let activeType = 'all';
  let activeProg = 'all';

  // ── Apply current filters ────────────────────────────────

  function applyFilters() {
    let visible = 0;

    cards.forEach(card => {
      const types = (card.dataset.types || '')
        .split(',').map(s => s.trim().toLowerCase());
      const progs = (card.dataset.progs || '')
        .split(',').map(s => s.trim().toLowerCase());

      const typeMatch = activeType === 'all' || types.includes(activeType);
      const progMatch = activeProg === 'all' || progs.includes(activeProg);
      const show = typeMatch && progMatch;

      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    // Empty state
    if (emptyState) emptyState.classList.toggle('visible', visible === 0);

    // Clear button — only visible when at least one filter is non-default
    const isFiltered = activeType !== 'all' || activeProg !== 'all';
    if (clearBtn) clearBtn.classList.toggle('visible', isFiltered);
  }

  // ── Clear all ─────────────────────────────────────────────

  function clearAll() {
    activeType = 'all';
    activeProg = 'all';
    segBtns.forEach(b => b.classList.toggle('active', b.dataset.type === 'all'));
    pillBtns.forEach(b => b.classList.toggle('active', b.dataset.prog === 'all'));
    syncLogoState();
    applyFilters();
  }

  // ── Segmented type buttons ───────────────────────────────

  segBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.type.toLowerCase();
      segBtns.forEach(b => b.classList.toggle('active', b === btn));
      applyFilters();
    });
  });

  // ── Pill program buttons ─────────────────────────────────

  pillBtns.forEach(btn => {
    // Skip the clear button — it has no data-prog
    if (btn.id === 'clear-filters') return;
    btn.addEventListener('click', () => {
      activeProg = btn.dataset.prog.toLowerCase();
      pillBtns.forEach(b => b.classList.toggle('active', b === btn));
      syncLogoState();
      applyFilters();
    });
  });

  // ── Clear button ─────────────────────────────────────────

  if (clearBtn) clearBtn.addEventListener('click', clearAll);

  // ── Software strip logos ─────────────────────────────────

  document.querySelectorAll('.software-logo[data-prog]').forEach(logo => {
    logo.addEventListener('click', () => {
      const prog = logo.dataset.prog.toLowerCase();
      // Toggle off if already active
      activeProg = activeProg === prog ? 'all' : prog;
      pillBtns.forEach(b => {
        if (b.id === 'clear-filters') return;
        b.classList.toggle('active', b.dataset.prog?.toLowerCase() === activeProg);
      });
      syncLogoState();
      applyFilters();
      // Scroll to work section
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  function syncLogoState() {
    document.querySelectorAll('.software-logo[data-prog]').forEach(logo => {
      logo.classList.toggle('active', logo.dataset.prog.toLowerCase() === activeProg);
    });
  }

  // Init
  applyFilters();
}