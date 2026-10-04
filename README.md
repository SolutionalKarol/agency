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

## Avatar, agents and VR media

The avatar diagram and gold/turquoise agent portrait are illustrative generated
assets (`avatar-flow.webp` and `ai-agent.webp`). VR media uses an illustrative
headset rendering and example arachnophobia environment, not a capture from a
completed application. CSS handles the headset zoom and crossfade; the visitor
can pause it, and reduced motion shows a static environment.

Upload **`google.ara.mp4`** at the repository root, beside `index.html`, to use real
VR footage. The homepage VR cards check for this file. If available and decodable,
they show their description first and switch to the muted inline video after
three seconds in view. Native controls and a back-to-description button remain
available. If autoplay is blocked, the native play control can start it. Missing
or undecodable footage keeps the illustrated preview. Reduced motion exposes a
manual player without automatic playback. For broad browser compatibility,
export MP4 with H.264 video. The repository now includes local video files.

Portfolio includes `kosmos.mp4` with a local extracted poster, native controls and full-screen playback. Video downloads start on demand.

## Content and contact

NCNI.Media is not shown until a public portal is available. Anonymous service examples are explicitly described as example scopes, not verified client results. The production domain is https://kiszlo.studio. Contact form prepares an email in the visitor’s mail application; it does not send or store submissions on a server. Collaborator photos are optional and use initials when absent.

## Homepage and offer

The Polish homepage includes the full offer in six sections: VR, websites with AI, AI agents, AI avatars, electronics and prototyping, and visual production. The old oferta.html address redirects to the homepage offer. The production layout combines film, two illustrative studio images and rozmowa.mp4. Inline films are muted and play once after a delay in view. The privacy page remains a clearly marked draft pending hosting and retention details.
