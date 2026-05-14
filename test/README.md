# raepadua.github.io — File Guide

## Folder structure

```
raepadua.github.io/
├── index.html              ← Home page
├── layout.html             ← Layout specialty page (build next)
├── modelling.html          ← Modelling specialty page (build next)
│
├── css/
│   ├── tokens.css          ← Colours, fonts, spacing — edit here to retheme
│   ├── loader.css          ← Loading screen
│   ├── nav.css             ← Navigation bar
│   ├── hero.css            ← Hero video section
│   └── sections.css        ← Everything else
│
├── js/
│   ├── main.js             ← Entry point (imports all modules)
│   ├── loader.js           ← Loading bar logic
│   ├── nav.js              ← Nav style + hamburger + scroll-to-top
│   ├── hero.js             ← Video switcher + scroll dim + pause
│   ├── filters.js          ← Work grid filters
│   └── overlay.js          ← Project popup
│
├── images/
│   ├── LoadingAnim.gif     ← REPLACE: your custom loading GIF
│   ├── photo.jpg           ← REPLACE: your headshot (square crop)
│   │
│   ├── thumbs/             ← Hero section thumbnails (still frames, ~400x225px)
│   │   ├── thumb-generalist.jpg   ← REPLACE
│   │   ├── thumb-layout.jpg       ← REPLACE
│   │   └── thumb-modelling.jpg    ← REPLACE
│   │
│   ├── projects/           ← Work grid thumbnails (square, min 800x800px)
│   │   ├── cbr.jpg                ← Centre Block Rehabilitation
│   │   ├── parliament.jpg         ← Parliament VR
│   │   ├── backyard-beans.jpg     ← Backyard Beans
│   │   ├── black-drum.jpg         ← The Black Drum
│   │   ├── stone-facade.jpg       ← Stone Facade
│   │   ├── dragoons.jpg           ← Dragoons Medallion
│   │   ├── venus-mill.jpg         ← Venus Mill
│   │   └── familiar-fate.jpg      ← A Familiar Fate
│   │
│   └── logos/              ← Software logos (72x72px .webp, full colour — CSS greyscales them)
│       ├── maya.webp
│       ├── houdini.webp
│       ├── unreal.webp
│       ├── unity.webp
│       ├── blender.webp
│       ├── 3dsmax.webp
│       ├── substance-painter.webp
│       ├── after-effects.webp
│       ├── premiere.webp
│       ├── audition.webp
│       └── vicon.webp
│
└── videos/
    ├── hero-generalist.mp4    ← REPLACE: short looping clip (~10-20s, muted)
    ├── hero-layout.mp4        ← REPLACE: short looping clip
    ├── hero-modelling.mp4     ← REPLACE: short looping clip
    ├── specialty-layout.mp4   ← REPLACE: clip for specialty section card
    ├── specialty-modelling.mp4← REPLACE: clip for specialty section card
    └── specialty-rigging.mp4  ← REPLACE: clip for specialty section card
```

## Switching between hero layout versions

In `index.html`, find the comments:

```
<!-- VERSION 1: Title top-center, thumbnails bottom-center -->
<!-- VERSION 2: Name + thumbnails bottom-left (truecolorfilms style) -->
```

To try Version 2: comment out the Version 1 block and uncomment the Version 2 block.

## Adding a new project card

Copy one of the existing `.project-card` divs in `index.html`.
Update these data attributes:
- `data-types`    — comma-separated from: animation, modelling, rigging, layout, vr
- `data-progs`    — comma-separated from: maya, houdini, unreal, unity, blender
- `data-title`    — project name
- `data-year`     — year
- `data-roles`    — your roles (dot-separated)
- `data-desc`     — full description for the popup
- `data-tools`    — tools used (comma-separated, shown as pills in popup)
- `data-thumb`    — path to thumbnail image
- `data-thumb-file` — same path (shown in placeholder while you find the image)
- `data-awards`   — "Label|URL|Label2|URL2" (pipe-separated pairs, or leave empty "")
- `data-links`    — "Label|URL" (pipe-separated, or leave empty "")

## Adding a new software logo

Add a new `.software-logo` div in the software strip section of `index.html`.
If you want it to trigger a filter, add `class="software-logo has-filter"` and `data-prog="yourprog"`.
Make sure a matching `<button class="filter-btn" data-prog="yourprog">` exists in the filter bar.

## Uploading to GitHub Pages

1. Go to github.com and create a free account
2. Create a new repository named exactly: `raepadua.github.io`
3. Make it Public
4. Upload all files maintaining the folder structure
5. Go to Settings > Pages > Source: set to main branch
6. Your site will be live at https://raepadua.github.io within ~1 minute

## Editing files after upload

Option A (quick edits): Click the file on GitHub, press the pencil icon, edit, commit.
Option B (bigger edits): Change github.com to github.dev in the URL for a browser editor.
Option C (best for images/videos): Use GitHub Desktop app — drag files into folder, sync.
