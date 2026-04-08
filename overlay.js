// ============================================================
// overlay.js
// Project detail popup. Reads data attributes from card.
// Supports multiple awards, multiple links.
// ============================================================

export function initOverlay() {
  const overlay = document.getElementById('overlay');
  const panel   = document.querySelector('.overlay-panel');
  const closeBtn= document.getElementById('overlay-close');
  const cards   = document.querySelectorAll('.project-card');

  if (!overlay) return;

  // Fields
  const elTitle  = document.getElementById('ov-title');
  const elYear   = document.getElementById('ov-year');
  const elRoles  = document.getElementById('ov-roles');
  const elDesc   = document.getElementById('ov-desc');
  const elTools  = document.getElementById('ov-tools');
  const elAwards = document.getElementById('ov-awards');
  const elLinks  = document.getElementById('ov-links');
  const elMedia  = document.getElementById('ov-media');

  // ── Open ─────────────────────────────────────────────────

  function open(card) {
    const d = card.dataset;

    // Title / year / roles
    elTitle.textContent = d.title   || '';
    elYear.textContent  = d.year    || '';
    elRoles.textContent = d.roles   || '';
    elDesc.textContent  = d.desc    || '';

    // Media (first image)
    elMedia.innerHTML = '';
    if (d.thumb) {
      const img = document.createElement('img');
      img.src = d.thumb;
      img.alt = d.title || '';
      elMedia.appendChild(img);
    } else {
      // Placeholder — shows the expected filename
      elMedia.innerHTML = `
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;
                    background:var(--azure-pale);flex-direction:column;gap:6px;">
          <span style="font-size:0.65rem;color:var(--azure-mid);letter-spacing:0.08em;text-transform:uppercase;">
            <!-- REPLACE FILE: ${d.thumbFile || 'images/projects/' + slugify(d.title || '') + '.jpg'} -->
            image placeholder
          </span>
          <span style="font-size:0.6rem;color:var(--muted);">${d.thumbFile || ''}</span>
        </div>`;
    }

    // Tools
    elTools.innerHTML = '';
    if (d.tools) {
      d.tools.split(',').forEach(t => {
        const span = document.createElement('span');
        span.className = 'overlay-tool';
        span.textContent = t.trim();
        elTools.appendChild(span);
      });
    }

    // Awards (pipe-separated pairs: "Label|URL|Label2|URL2")
    elAwards.innerHTML = '';
    if (d.awards) {
      const pairs = d.awards.split('|');
      for (let i = 0; i < pairs.length; i += 2) {
        const label = pairs[i]?.trim();
        const url   = pairs[i + 1]?.trim();
        if (!label) continue;
        const a = document.createElement('a');
        a.className = 'overlay-award';
        a.textContent = label;
        if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
        elAwards.appendChild(a);
      }
    }

    // External links (pipe-separated: "Label|URL|Label2|URL2")
    elLinks.innerHTML = '';
    if (d.links) {
      const pairs = d.links.split('|');
      for (let i = 0; i < pairs.length; i += 2) {
        const label = pairs[i]?.trim();
        const url   = pairs[i + 1]?.trim();
        if (!label || !url) continue;
        const a = document.createElement('a');
        a.className = 'overlay-link';
        a.textContent = label;
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
        elLinks.appendChild(a);
      }
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (panel) panel.scrollTop = 0;
  }

  // ── Close ─────────────────────────────────────────────────

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── Events ───────────────────────────────────────────────

  cards.forEach(card => card.addEventListener('click', () => open(card)));
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// Utility
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
