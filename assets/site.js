/* Shared navigation, progressive animation and local contact helper. */
(() => {
    'use strict';
    const root = document.documentElement;
    root.classList.remove('no-js');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lang = root.lang.split('-')[0];
    const labels = {
        pl: {open: 'Otwórz pomoc i kontakt', close: 'Zamknij', input: 'Pytanie lub opis projektu', title: 'Pomoc i kontakt', greeting: 'Informacje o ofercie Kiszlo.Studio. Wpisz temat: AI, VR, wideo lub strategia. Możesz też przygotować e-mail z opisem projektu.', email: 'Przygotuj e-mail', contact: 'Porozmawiajmy o Twoim projekcie. Wiadomość nie została wysłana — poniższy link otworzy Twój program pocztowy.', ai: 'Studio projektuje strony i oprogramowanie oraz integracje AI, automatyzacje, chatboty i cyfrowe awatary.', vr: 'Współpracujemy przy rozwiązaniach VR/XR i symulacjach, w tym projektach MedTech wymagających zaplecza naukowego.', video: 'Oferta obejmuje produkcję wideo, montaż, postprodukcję i materiały wizualne.', strategy: 'Łączymy strategię marki, komunikację i dobór technologii do potrzeb biznesu.', subject: 'Zapytanie o współpracę — Kiszlo.Studio'},
        en: {open: 'Open help and contact', close: 'Close', input: 'Question or project description', title: 'Help & contact', greeting: 'Kiszlo.Studio service information. Enter a topic: AI, VR, video or strategy. You can also prepare an email describing your project.', email: 'Prepare email', contact: 'Let’s discuss your project. Your message has not been sent — the link below opens your email app.', ai: 'The studio develops websites and software, AI integrations, automation, chatbots and digital avatars.', vr: 'We collaborate on VR/XR experiences and simulations, including MedTech projects requiring scientific expertise.', video: 'Services include video production, editing, post-production and visual content.', strategy: 'We combine brand strategy, communication and technology selected for business needs.', subject: 'Collaboration enquiry — Kiszlo.Studio'},
        de: {open: 'Hilfe und Kontakt öffnen', close: 'Schließen', input: 'Frage oder Projektbeschreibung', title: 'Hilfe & Kontakt', greeting: 'Informationen zu Kiszlo.Studio. Gib ein Thema ein: KI, VR, Video oder Strategie. Du kannst auch eine E-Mail zu deinem Projekt vorbereiten.', email: 'E-Mail vorbereiten', contact: 'Sprechen wir über dein Projekt. Die Nachricht wurde nicht gesendet — der Link öffnet dein E-Mail-Programm.', ai: 'Das Studio entwickelt Websites, Software, KI-Integrationen, Automatisierungen, Chatbots und digitale Avatare.', vr: 'Wir arbeiten an VR/XR-Erlebnissen und Simulationen, auch an MedTech-Projekten mit wissenschaftlicher Expertise.', video: 'Das Angebot umfasst Videoproduktion, Schnitt, Postproduktion und visuelle Inhalte.', strategy: 'Wir verbinden Markenstrategie, Kommunikation und passende Technologien für Unternehmen.', subject: 'Anfrage zur Zusammenarbeit — Kiszlo.Studio'}
    };
    const copy = labels[lang] || labels.en;
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
    const portrait = document.querySelector('.network-karol .profile-media');
    if (portrait && !reducedMotion.matches) {
        const timer = setInterval(() => {
            const photos = [...portrait.querySelectorAll('img')];
            if (!document.hidden && !reducedMotion.matches && photos.every(image => image.complete && image.naturalWidth)) portrait.classList.toggle('is-second-photo-visible');
        }, 2000);
        window.addEventListener('pagehide', () => clearInterval(timer), {once: true});
    }
    const chatButton = document.getElementById('ai-chat-button');
    const chat = document.getElementById('ai-chat-window');
    if (chatButton && chat) {
        const input = document.getElementById('chat-input-field');
        const messages = document.getElementById('chat-messages');
        const close = document.getElementById('close-chat');
        const send = document.getElementById('send-msg');
        chatButton.setAttribute('aria-label', copy.open);
        chatButton.setAttribute('aria-controls', chat.id);
        chatButton.setAttribute('aria-expanded', 'false');
        chat.setAttribute('role', 'dialog');
        chat.setAttribute('aria-label', copy.title);
        close.setAttribute('aria-label', copy.close);
        input.setAttribute('aria-label', copy.input);
        input.maxLength = 2000;
        messages.setAttribute('role', 'log');
        messages.setAttribute('aria-live', 'polite');
        messages.querySelector('.msg-ai').textContent = copy.greeting;
        chat.querySelector('.chat-header span').textContent = copy.title;
        function setChat(open) {
            chat.style.display = open ? 'flex' : 'none';
            chatButton.setAttribute('aria-expanded', String(open));
            (open ? input : chatButton).focus();
        }
        chatButton.addEventListener('click', () => setChat(chat.style.display !== 'flex'));
        close.addEventListener('click', () => setChat(false));
        chat.addEventListener('keydown', event => { if (event.key === 'Escape') setChat(false); });
        function append(text, type) {
            const message = document.createElement('div');
            message.className = `msg msg-${type}`;
            message.textContent = text;
            messages.append(message);
            return message;
        }
        function sendMessage() {
            const text = input.value.trim();
            if (!text) return;
            append(text, 'user');
            input.value = '';
            let answer = copy.contact;
            if (/\b(ai|ki|chatbot|llm|web)\b|automat|awatar|avatar/i.test(text)) answer = copy.ai;
            else if (/\b(vr|xr|medtech)\b|symul|simul/i.test(text)) answer = copy.vr;
            else if (/wideo|video|film|monta|produkc|production/i.test(text)) answer = copy.video;
            else if (/strateg|consult|marka|brand/i.test(text)) answer = copy.strategy;
            const reply = append(answer, 'ai');
            const link = document.createElement('a');
            link.textContent = copy.email + ' ↗';
            link.href = `mailto:kiszlo.studio@gmail.com?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(text)}`;
            link.className = 'contact-email-link';
            reply.append(document.createElement('br'), link);
            messages.scrollTop = messages.scrollHeight;
            input.focus();
        }
        send.addEventListener('click', sendMessage);
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); sendMessage(); }
        });
    }
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
