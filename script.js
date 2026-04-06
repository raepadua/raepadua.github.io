// ─── REEL TABS ─────────────────────────────────────────────────────────────

const reels = {
  generalist: 'ujmQUXGUZwc',   // layout reel (your current YouTube upload)
  layout:     'ujmQUXGUZwc',   // same for now — replace with separate ID when ready
  modelling:  'ujmQUXGUZwc',   // placeholder — replace when you have a modelling reel
};

let activeReel = 'generalist';

document.querySelectorAll('.reel-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.reel-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeReel = tab.dataset.reel;
  });
});

// ─── PLAY BUTTON / VIDEO MODAL ─────────────────────────────────────────────

const videoModal = document.getElementById('video-modal');
const videoFrame = document.getElementById('video-frame');

document.getElementById('play-btn').addEventListener('click', openReel);

function openReel() {
  const id = reels[activeReel] || reels.generalist;
  videoFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  videoModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoFrame.src = '';
  videoModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('video-modal-close').addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', e => { if (e.target === videoModal) closeVideoModal(); });

// ─── PROJECT OVERLAY ───────────────────────────────────────────────────────

const overlay = document.getElementById('overlay');
const overlayTitle    = document.getElementById('overlay-title');
const overlayYear     = document.getElementById('overlay-year');
const overlayRoles    = document.getElementById('overlay-roles');
const overlayDesc     = document.getElementById('overlay-desc');
const overlayTools    = document.getElementById('overlay-tools');
const overlayMedia    = document.getElementById('overlay-media');
const overlayBadge    = document.getElementById('overlay-badge');
const overlayLinkWrap = document.getElementById('overlay-link-wrap');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openOverlay(card.dataset));
});

function openOverlay(d) {
  overlayTitle.textContent   = d.title;
  overlayYear.textContent    = d.year;
  overlayRoles.textContent   = d.roles;
  overlayDesc.textContent    = d.desc;

  // tools
  overlayTools.innerHTML = '';
  if (d.tools) {
    d.tools.split(',').forEach(t => {
      const span = document.createElement('span');
      span.className = 'overlay-tool';
      span.textContent = t.trim();
      overlayTools.appendChild(span);
    });
  }

  // media
  overlayMedia.className = 'overlay-media';
  if (d.thumb && d.thumb !== '') {
    overlayMedia.style.backgroundImage = '';
    overlayMedia.innerHTML = `<img src="${d.thumb}" alt="${d.title}" style="width:100%;height:100%;object-fit:cover;border-radius:12px 12px 0 0;display:block;">`;
  } else {
    overlayMedia.classList.add('placeholder');
    overlayMedia.innerHTML = `<span>image coming soon</span>`;
  }

  // award badge
  if (d.award) {
    overlayBadge.textContent = d.award;
    overlayBadge.style.display = 'inline-block';
  } else {
    overlayBadge.style.display = 'none';
  }

  // external link
  if (d.link) {
    overlayLinkWrap.innerHTML = `<a href="${d.link}" target="_blank" rel="noopener" class="overlay-link">View project &rarr;</a>`;
    overlayLinkWrap.style.display = 'block';
  } else {
    overlayLinkWrap.style.display = 'none';
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // scroll panel back to top
  overlay.querySelector('.overlay-panel').scrollTop = 0;
}

function closeOverlay() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('overlay-close').addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });

// close both modals on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeOverlay();
    closeVideoModal();
  }
});

// ─── STICKY NAV ────────────────────────────────────────────────────────────

const mainNav   = document.getElementById('main-nav');
const splash    = document.getElementById('splash');

const navObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) {
    mainNav.classList.add('visible');
  } else {
    mainNav.classList.remove('visible');
  }
}, { threshold: 0 });

navObserver.observe(splash);
