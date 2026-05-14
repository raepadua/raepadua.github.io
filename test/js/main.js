// ============================================================
// main.js
// Entry point — imports and initialises all modules.
// ============================================================

import { initLoader  } from './loader.js';
import { initNav     } from './nav.js';
import { initHero    } from './hero.js';
import { initFilters } from './filters.js';
import { initOverlay } from './overlay.js';

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  initHero();
  initFilters();
  initOverlay();
});
