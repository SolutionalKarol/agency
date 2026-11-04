// Google Analytics 4 behind a consent banner. Nothing is loaded from Google
// until the visitor accepts. With an empty GA_ID the file does nothing.
(() => {
 const GA_ID = 'G-CC0P4BFJKW';
 if (!/^G-[A-Z0-9]+$/.test(GA_ID)) return;

 const KEY = 'analytics-consent';
 const lang = (document.documentElement.lang || 'pl').slice(0, 2);
 const text = {
  pl: {msg: 'Używamy Google Analytics, aby sprawdzać, jak odwiedzający korzystają ze strony. Statystyki włączymy tylko za Twoją zgodą.', yes: 'Zgadzam się', no: 'Odrzuć', more: 'Polityka prywatności', settings: 'Ustawienia cookies'},
  en: {msg: 'We use Google Analytics to see how visitors use this site. Statistics are enabled only with your consent.', yes: 'Accept', no: 'Decline', more: 'Privacy policy (PL)', settings: 'Cookie settings'},
  de: {msg: 'Wir nutzen Google Analytics, um zu sehen, wie Besucher diese Website nutzen. Statistiken werden nur mit Ihrer Einwilligung aktiviert.', yes: 'Zustimmen', no: 'Ablehnen', more: 'Datenschutz (PL)', settings: 'Cookie-Einstellungen'}
 };
 const t = text[lang] || text.pl;

 const read = () => { try { return localStorage.getItem(KEY); } catch (_) { return null; } };
 const save = value => { try { localStorage.setItem(KEY, value); } catch (_) { /* Choice lasts for this page only. */ } };

 let loaded = false;
 const load = () => {
  if (loaded) return; loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted'});
  gtag('js', new Date());
  gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
 };

 const clearCookies = () => {
  document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(n => /^_ga/.test(n)).forEach(n => {
   [location.hostname, '.' + location.hostname.replace(/^www\./, '')].forEach(d => {
    document.cookie = n + '=; Max-Age=0; path=/; domain=' + d;
   });
   document.cookie = n + '=; Max-Age=0; path=/';
  });
 };

 const style = document.createElement('style');
 style.textContent = '.consent-bar{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:640px;margin:0 auto;padding:18px 20px;border:1px solid #00f3ff55;border-radius:16px;background:#0b1316f2;color:#e8ecee;font:14px/1.6 system-ui,sans-serif;box-shadow:0 18px 45px #0009}.consent-bar p{margin:0 0 12px}.consent-bar a{color:#00f3ff}.consent-actions{display:flex;flex-wrap:wrap;gap:10px}.consent-actions button{font:inherit;cursor:pointer;border-radius:999px;padding:8px 18px;border:1px solid #00f3ff;background:transparent;color:#e8ecee}.consent-actions button[data-consent="yes"]{background:#00f3ff;color:#061014}@media(max-width:760px){.consent-bar{bottom:84px}}';
 document.head.appendChild(style);

 const show = () => {
  if (document.querySelector('.consent-bar')) return;
  const bar = document.createElement('div');
  bar.className = 'consent-bar'; bar.setAttribute('role', 'dialog'); bar.setAttribute('aria-label', t.settings);
  bar.innerHTML = '<p>' + t.msg + ' <a href="prywatnosc.html">' + t.more + '</a></p><div class="consent-actions"><button type="button" data-consent="yes">' + t.yes + '</button><button type="button" data-consent="no">' + t.no + '</button></div>';
  bar.addEventListener('click', event => {
   const choice = event.target.getAttribute && event.target.getAttribute('data-consent');
   if (!choice) return;
   save(choice === 'yes' ? 'granted' : 'denied');
   bar.remove();
   if (choice === 'yes') load();
   else if (loaded) { clearCookies(); location.reload(); }
   else clearCookies();
  });
  document.body.appendChild(bar);
 };

 const start = () => {
  document.querySelectorAll('[data-cookie-settings]').forEach(link => {
   link.hidden = false; link.textContent = t.settings;
   link.addEventListener('click', event => { event.preventDefault(); show(); });
  });
  const choice = read();
  if (choice === 'granted') load();
  else if (choice !== 'denied') show();
 };
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
