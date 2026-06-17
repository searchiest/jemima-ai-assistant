/* jemima consent.js — build 2026-06-17g — charcoal Accept (primary), text-link Reject */
/* Jemima cookie consent — blocks Google Tag Manager until the visitor accepts.
   No Google request is made and no analytics cookies are set before consent.
   Choice is stored in localStorage (not a cookie), so storing it needs no consent.
   Minimal compliant bar in the site style: light/frosted, readable, equal Accept/Reject. */
(function () {
  var GTM_ID = 'GTM-P8CCJV29';
  var STORAGE_KEY = 'jemima_cookie_consent'; // 'granted' | 'denied'
  var PRIVACY_URL = '/privacy.html';
  var gtmLoaded = false;

  function readConsent() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }
  function writeConsent(v) { try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {} }

  function loadGTM() {
    if (gtmLoaded) return;
    gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var first = document.getElementsByTagName('script')[0];
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    first.parentNode.insertBefore(s, first);
  }

  function injectStyles() {
    if (document.getElementById('jemima-cc-style')) return;
    var css =
      '#jemima-cc{position:fixed;left:0;right:0;bottom:0;z-index:2147483600;display:flex;flex-wrap:nowrap;align-items:center;gap:12px;padding:10px 16px;background:rgba(255,255,255,.82);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-top:1px solid #e2e8f0;box-shadow:0 -6px 24px rgba(15,23,42,.06);font:500 13px/1.4 "Plus Jakarta Sans",system-ui,-apple-system,sans-serif;color:#475569}' +
      '#jemima-cc p{margin:0;flex:1 1 auto;min-width:0}' +
      '#jemima-cc a{color:#475569;text-decoration:underline;font-weight:700}' +
      '#jemima-cc .jemima-cc-actions{display:flex;align-items:center;gap:14px;flex:0 0 auto;margin-left:auto}' +
      '#jemima-cc .jemima-cc-accept{cursor:pointer;border-radius:5px;padding:9px 20px;font:800 11px/1 inherit;letter-spacing:.06em;text-transform:uppercase;border:1px solid #1e293b;background:#1e293b;color:#fff}' +
      '#jemima-cc .jemima-cc-accept:hover{background:#0f172a;border-color:#0f172a}' +
      '#jemima-cc .jemima-cc-reject{cursor:pointer;background:none;border:0;padding:6px 2px;font:700 11px/1 inherit;letter-spacing:.06em;text-transform:uppercase;color:#64748b;text-decoration:underline;text-underline-offset:2px}' +
      '#jemima-cc .jemima-cc-reject:hover{color:#0f172a}';
    var st = document.createElement('style');
    st.id = 'jemima-cc-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function showBanner() {
    injectStyles();
    var existing = document.getElementById('jemima-cc');
    if (existing) existing.remove();
    var bar = document.createElement('div');
    bar.id = 'jemima-cc';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<p>We use cookies. <a href="' + PRIVACY_URL + '">Privacy</a></p>' +
      '<div class="jemima-cc-actions">' +
        '<button type="button" class="jemima-cc-reject">Reject</button>' +
        '<button type="button" class="jemima-cc-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);
    bar.querySelector('.jemima-cc-accept').addEventListener('click', function () { writeConsent('granted'); loadGTM(); bar.remove(); });
    bar.querySelector('.jemima-cc-reject').addEventListener('click', function () { writeConsent('denied'); bar.remove(); });
  }

  /* Re-open from a footer link:
     <a href="#" onclick="jemimaCookieSettings();return false;">Cookie settings</a> */
  window.jemimaCookieSettings = function () { if (document.body) showBanner(); };

  function init() {
    var c = readConsent();
    if (c === 'granted') { loadGTM(); return; }
    if (c === 'denied') { return; }
    if (document.body) showBanner();
    else document.addEventListener('DOMContentLoaded', showBanner);
  }
  init();
})();
