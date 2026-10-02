# Kiszlo.Studio

Static website. The public pages are `index.html`, `onas.html`, `oferta.html`,
`portfolio.html`, `eng.html`, `de.html` and `services.html`.

## Local preview

Run `python3 -m http.server 8000` in this directory and open
`http://localhost:8000`. No build or package installation is required.
Upload the HTML files, the whole `assets/` directory and the portrait JPG files
when deploying. Relative links require preserving this structure.

## Images and shared behavior

- `kk.jpg`, `k2.jpg` and `sk.jpg` are the supplied portraits.
- `assets/video.webp`, `vr.webp`, `ai.webp` and `strategy.webp` are custom
  AI-generated conceptual brand illustrations. They do not document completed
  client projects. They replace the external stock images and unavailable video.
- `assets/brand-banner.svg` reproduces the website's existing typographic brand.
- `assets/site.js` owns navigation, animation, portrait switching and the local
  service-information helper. It renders user input as text, never HTML.
- The helper offers basic service information and a `mailto:` link. It does not
  call an AI API, send messages, or store enquiries.
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
Check the contact helper and email draft link. Repeat with animation scripts
blocked, JavaScript disabled, reduced motion, and browser storage disabled.
All local file links, fragment identifiers and structured-data JSON must resolve.
