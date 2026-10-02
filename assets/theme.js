(() => {
    let theme;
    try { theme = localStorage.getItem('theme'); } catch (_) { /* Keep working without storage. */ }
    if (theme !== 'dark' && theme !== 'light') theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
})();
