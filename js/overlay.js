// ============================================================
// overlay.js
// Rich project popup. Each project has a <template data-project="id">
// in the HTML containing arbitrary content (images, videos, embeds).
// The overlay renders that template content directly.
// ============================================================

export function initOverlay() {
  const overlay  = document.getElementById('overlay');
  const panel    = document.querySelector('.overlay-panel');
  const closeBtn = document.getElementById('overlay-close');
  const cards    = document.querySelectorAll('.project-card');

  if (!overlay) return;

  const elTitle  = document.getElementById('ov-title');
  const elYear   = document.getElementById('ov-year');
  const elRoles  = document.getElementById('ov-roles');
  const elTools  = document.getElementById('ov-tools');
  const elAwards = document.getElementById('ov-awards');
  const elLinks  = document.getElementById('ov-links');
  const elBody   = document.getElementById('ov-body');

  function open(card) {
    // Hero image at top of overlay
    const elHeroImg = document.getElementById('ov-hero-img');
    if (elHeroImg) {
      if (d.thumb) {
        elHeroImg.innerHTML = `<img src="${d.thumb}" alt="${d.title || ''}">`;
        elHeroImg.style.display = 'block';
      } else {
        elHeroImg.style.display = 'none';
      }
    }
    const d         = card.dataset;
    const projectId = d.project;
    const tmpl      = projectId
      ? document.querySelector(`template[data-project="${projectId}"]`)
      : null;

    elTitle.textContent = d.title || '';
    elYear.textContent  = d.year  || '';
    elRoles.textContent = d.roles || '';

    elTools.innerHTML = '';
    if (d.tools) {
      d.tools.split(',').forEach(t => {
        const span = document.createElement('span');
        span.className   = 'overlay-tool';
        span.textContent = t.trim();
        elTools.appendChild(span);
      });
    }

    elAwards.innerHTML = '';
    if (d.awards) {
      const pairs = d.awards.split('|');
      for (let i = 0; i < pairs.length; i += 2) {
        const label = pairs[i]?.trim();
        const url   = pairs[i + 1]?.trim();
        if (!label) continue;
        const a = document.createElement('a');
        a.className   = 'overlay-award';
        a.textContent = label;
        if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
        elAwards.appendChild(a);
      }
    }

    elLinks.innerHTML = '';
    if (d.links) {
      const pairs = d.links.split('|');
      for (let i = 0; i < pairs.length; i += 2) {
        const label = pairs[i]?.trim();
        const url   = pairs[i + 1]?.trim();
        if (!label || !url) continue;
        const a = document.createElement('a');
        a.className   = 'overlay-link';
        a.textContent = label;
        a.href        = url;
        a.target      = '_blank';
        a.rel         = 'noopener';
        elLinks.appendChild(a);
      }
    }

    elBody.innerHTML = '';
    if (tmpl) {
      elBody.appendChild(tmpl.content.cloneNode(true));
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (panel) panel.scrollTop = 0;
  }

  function close() {
    overlay.querySelectorAll('iframe').forEach(f => { f.src = f.src; });
    overlay.querySelectorAll('video').forEach(v => v.pause());
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  cards.forEach(card => card.addEventListener('click', () => open(card)));
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}