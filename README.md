# Kiszlo.Studio

Static website. The public pages are `index.html`, `onas.html`, `oferta.html`,
`portfolio.html`, `eng.html`, `de.html` and `services.html`.

## Local preview

Run `python3 -m http.server 8000` in this directory and open
`http://localhost:8000`. No build or package installation is required.
Upload the HTML files, the whole `assets/` directory and the portrait JPG files
when deploying. Relative links require preserving this structure.

## Images and shared behavior

- `k2.jpg` is the sole displayed Karol portrait; `sk.jpg` is Sebastian.
- Upload `mk.jpg` (Mikołaj) and `w.jpg` (Wiktor) at the repository root. The
  matching profile automatically shows the photo when it loads, with a designed
  initials placeholder retained if the file is missing. No portrait rotation.
- `assets/video.webp`, `vr.webp`, `ai.webp` and `strategy.webp` are custom
  AI-generated conceptual brand illustrations. They do not document completed
  client projects. They replace the external stock images and unavailable video.
- `assets/brand-banner.svg` reproduces the website's existing typographic brand.
- `assets/site.js` owns navigation, animation and optional collaborator portraits.
- The chat widget has been removed. Contact is by email or phone.
- `assets/ncni-site.png` is an actual browser capture of `https://www.ncni.pl/`,
  used for the linked NCNI website portfolio entry.
- Page-specific backgrounds combine conceptual artwork, cyan grids and soft
  glows. Each Polish service card includes an accompanying image.
- `assets/theme.js` restores the optional saved theme on pages with a theme
  switch. Blocked browser storage does not prevent the page from working.
- `assets/services.css` contains the local styles for the English services page;
  it replaces the runtime Tailwind CDN dependency.

GSAP and ScrollTrigger are optional enhancements loaded from cdnjs. Content and
navigation remain usable if those scripts fail, JavaScript is disabled, or the
visitor requests reduced motion. Google Fonts are optional, with fallback fonts.

## Verification

Check all seven pages on desktop and at 320 px and 390 px widths. Check the menu
with mouse and keyboard, Escape to close, and resizing while the menu is open.
Check email/phone links and the NCNI portfolio link. Check both missing and
uploaded collaborator photos. Repeat with animation scripts
blocked, JavaScript disabled, reduced motion, and browser storage disabled.
All local file links, fragment identifiers and structured-data JSON must resolve.
