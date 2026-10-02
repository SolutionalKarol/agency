/* Shared navigation, progressive animation. */
(() => {
    'use strict';
    const root = document.documentElement;
    root.classList.remove('no-js');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nav = document.querySelector('nav');
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    let menuOpen = false;
    const mobileQuery = window.matchMedia(document.body.hasAttribute('data-services') ? '(max-width: 767px)' : '(max-width: 980px)');
    if (toggle && menu) {
        toggle.setAttribute('aria-controls', menu.id);
        function setMenu(open, returnFocus = false) {
            menuOpen = open && mobileQuery.matches;
            toggle.classList.toggle('open', menuOpen);
            menu.classList.toggle('open', menuOpen);
            toggle.setAttribute('aria-expanded', String(menuOpen));
            menu.inert = mobileQuery.matches && !menuOpen;
            document.body.style.overflow = menuOpen ? 'hidden' : '';
            if (nav) nav.style.transform = 'translateY(0)';
            if (returnFocus) toggle.focus();
        }
        setMenu(false);
        toggle.addEventListener('click', () => {
            setMenu(!menuOpen);
            if (menuOpen) menu.querySelector('a, button')?.focus();
        });
        menu.addEventListener('click', event => {
            if (event.target === menu || event.target.closest('a')) setMenu(false);
        });
        mobileQuery.addEventListener('change', () => setMenu(false));
        document.addEventListener('keydown', event => {
            if (!menuOpen) return;
            if (event.key === 'Escape') setMenu(false, true);
            if (event.key === 'Tab') {
                const items = [toggle, ...menu.querySelectorAll('a, button')];
                const first = items[0], last = items.at(-1);
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
        });
    }
    if (nav) {
        let previous = window.scrollY;
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            nav.style.transform = !menuOpen && !nav.contains(document.activeElement) && current > 100 && current > previous ? 'translateY(-100%)' : 'translateY(0)';
            previous = current;
        }, {passive: true});
        nav.addEventListener('focusin', () => { nav.style.transform = 'translateY(0)'; });
    }
    const themeButton = document.getElementById('theme-toggle');
    if (themeButton) themeButton.addEventListener('click', () => {
        const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = theme;
        try { localStorage.setItem('theme', theme); } catch (_) { /* Storage is optional. */ }
    });
    // Upload mk.jpg / w.jpg at the repository root; keep the placeholder on failure.
    document.querySelectorAll('[data-portrait]').forEach(media => {
        const photo = new Image();
        photo.alt = media.dataset.portraitAlt;
        photo.className = 'network-optional-photo';
        photo.addEventListener('load', () => {
            media.classList.add('has-photo');
            media.querySelector('.network-placeholder')?.setAttribute('aria-hidden', 'true');
        });
        photo.addEventListener('error', () => photo.remove(), {once: true});
        media.append(photo);
        photo.src = media.dataset.portrait;
    });
    const previewObserver = window.IntersectionObserver ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('is-playing', entry.isIntersecting && !reducedMotion.matches);
        });
    }, {threshold: .15}) : null;
    document.querySelectorAll('[data-vr-preview]').forEach(preview => {
        const button = preview.querySelector('.vr-preview-toggle');
        previewObserver?.observe(preview);
        if (!previewObserver && !reducedMotion.matches) preview.classList.add('is-playing');
        button.addEventListener('click', () => {
            const paused = preview.classList.toggle('is-paused');
            button.textContent = paused ? button.dataset.play : button.dataset.pause;
            button.setAttribute('aria-pressed', String(paused));
        });
        reducedMotion.addEventListener('change', event => {
            if (event.matches) preview.classList.remove('is-playing');
            else previewObserver?.unobserve(preview), previewObserver?.observe(preview);
        });
    });
    // Optional real footage: place google.ara.mp4 beside index.html.
    // Missing footage keeps the existing illustrated preview.
    let footageAvailable;
    document.querySelectorAll('.bento-item [data-vr-preview]').forEach(preview => {
        const card = preview.closest('.bento-item');
        card.classList.add('vr-video-card');
        let inView = false, timer, video, overlay, dismissed = false, ready = false;
        const language = root.lang.split('-')[0];
        const text = {pl: ['02 · Arachnofobia — trening VR · NCNI', 'Wróć do opisu'], en: ['02 · Arachnophobia VR training · NCNI', 'Back to description'], de: ['02 · Arachnophobie-Training in VR · NCNI', 'Zur Beschreibung']}[language] || ['02 · Arachnophobia VR training · NCNI', 'Back to description'];
        function schedule() {
            clearTimeout(timer);
            if (!inView || !video || !ready || dismissed || reducedMotion.matches) return;
            timer = setTimeout(() => {
                if (!inView) return;
                overlay.inert = false;
                card.classList.add('show-vr-film');
                video.play().catch(() => { /* Native controls allow tap-to-play. */ });
            }, 3000);
        }
        const observer = new IntersectionObserver(entries => {
            inView = entries[0].isIntersecting;
            if (!inView) {
                clearTimeout(timer);
                video?.pause();
                card.classList.remove('show-vr-film');
                if (overlay) overlay.inert = true;
            } else if (ready && reducedMotion.matches) {
                overlay.inert = false;
                card.classList.add('show-vr-film');
            } else schedule();
        }, {threshold: .35});
        observer.observe(card);
        footageAvailable ||= fetch('google.ara.mp4', {method: 'HEAD'}).then(response => response.ok).catch(() => false);
        footageAvailable.then(available => {
            if (!available) return;
            overlay = document.createElement('div');
            overlay.className = 'vr-film-overlay';
            overlay.inert = true;
            video = document.createElement('video');
            video.controls = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'metadata';
            video.setAttribute('aria-label', text[0]);
            const footer = document.createElement('div');
            footer.className = 'vr-film-footer';
            const label = document.createElement('span');
            label.textContent = text[0];
            const back = document.createElement('button');
            back.type = 'button';
            back.textContent = text[1];
            back.addEventListener('click', () => {
                dismissed = true;
                video.pause();
                card.classList.remove('show-vr-film');
                overlay.inert = true;
                card.setAttribute('tabindex', '-1');
                card.focus({preventScroll: true});
            });
            footer.append(label, back);
            overlay.append(video, footer);
            card.append(overlay);
            video.addEventListener('loadedmetadata', () => {
                ready = true;
                card.classList.add('has-vr-film');
                if (reducedMotion.matches) {
                    // Keep a visible manual player without automatic transitions.
                    overlay.inert = false;
                    card.classList.add('show-vr-film');
                } else schedule();
            }, {once: true});
            video.addEventListener('error', () => {
                clearTimeout(timer);
                card.classList.remove('has-vr-film', 'show-vr-film');
                overlay.remove();
            }, {once: true});
            video.src = 'google.ara.mp4';
        });
    });
    window.addEventListener('load', () => {
        if (!window.gsap || !window.ScrollTrigger || reducedMotion.matches) return;
        gsap.registerPlugin(ScrollTrigger);
        root.classList.add('animations-ready');
        gsap.fromTo('.hero-title-line, .reveal-text-inner', {y: 24, opacity: 0}, {y: 0, opacity: 1, duration: 1.2, stagger: .12, ease: 'power4.out'});
        gsap.to('.hero-text, .hero-side, .reveal-fade', {opacity: 1, duration: 1, delay: .3});
        gsap.utils.toArray('.fade-up, .fade-in').forEach(element => {
            gsap.to(element, {opacity: 1, y: 0, duration: .85, ease: 'power3.out', scrollTrigger: {trigger: element, start: 'top 86%', once: true}});
        });
        reducedMotion.addEventListener('change', event => {
            if (event.matches) {
                root.classList.remove('animations-ready');
                gsap.globalTimeline.timeScale(1000);
            }
        });
    });
})();

// Avatar footage stays within the original illustration footprint.
document.querySelectorAll('[data-avatar-film], [data-inline-film]').forEach(figure => {
    const source = figure.dataset.inlineFilm || 'awatar.flow.mp4';
    const image = figure.querySelector('img');
    const stage = document.createElement('div');
    stage.className = 'avatar-film-stage';
    image.before(stage); stage.append(image);
    const video = document.createElement('video');
    video.controls = true; video.playsInline = true; video.muted = true;
    video.loop = true; video.preload = 'none'; video.inert = true;
    video.setAttribute('aria-label', source === 'klisza.mp4' ? 'Wideo i postprodukcja, animowana klisza' : 'Awatar AI, przykład prezentacji wideo');
    stage.append(video);
    const button = document.createElement('button'); button.type = 'button';
    button.className = 'avatar-film-toggle';
    const lang = document.documentElement.lang.slice(0, 2);
    const labels = {pl: ['Odtwórz film', 'Wróć do grafiki'], en: ['Play video', 'Back to image'], de: ['Video abspielen', 'Zur Grafik']}[lang] || ['Play video', 'Back to image'];
    button.textContent = labels[0]; stage.append(button);
    let timer, visible = false, dismissed = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    function stop() { clearTimeout(timer); video.pause(); video.inert = true; figure.classList.remove('is-film-visible'); button.textContent = labels[0]; }
    function play() { clearTimeout(timer); if (!video.getAttribute('src')) video.src = source; video.inert = false; figure.classList.add('is-film-visible'); button.textContent = labels[1]; video.play().catch(() => {}); }
    function schedule() { clearTimeout(timer); if (visible && !dismissed && !document.hidden && !reduced.matches && !navigator.connection?.saveData) timer = setTimeout(play, 2000); }
    button.addEventListener('click', () => { dismissed = true; if (figure.classList.contains('is-film-visible')) stop(); else play(); });
    video.addEventListener('error', () => { dismissed = true; stop(); button.hidden = true; });
    if (window.IntersectionObserver) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) schedule(); else stop(); }, {threshold: .5}).observe(figure);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else schedule(); });
    reduced.addEventListener('change', () => { if (reduced.matches) stop(); else schedule(); });
});
