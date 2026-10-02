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
    window.addEventListener('load', () => {
        if (!window.gsap || !window.ScrollTrigger || reducedMotion.matches) return;
        gsap.registerPlugin(ScrollTrigger);
        root.classList.add('animations-ready');
        gsap.to('.hero-title-line, .reveal-text-inner', {y: 0, duration: 1.2, stagger: .12, ease: 'power4.out'});
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
