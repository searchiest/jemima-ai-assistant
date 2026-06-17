/* Jemima cookie consent — blocks Google Tag Manager until the visitor accepts.
   No Google request is made and no analytics cookies are set before consent.
   Choice is stored in localStorage (not a cookie), so storing it needs no consent.
   Minimal compliant bar: identical on all devices, Accept and Reject equally prominent. */
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
      '#jemima-cc{position:fixed;left:0;right:0;bottom:0;z-index:2147483600;display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;padding:10px 16px;background:#0f172a;color:#e2e8f0;font:500 13px/1.45 "Plus Jakarta Sans",system-ui,-apple-system,sans-serif;box-shadow:0 -4px 16px rgba(15,23,42,.18)}' +
      '#jemima-cc p{margin:0;flex:1 1 240px}' +
      '#jemima-cc a{color:#f9a8d4;text-decoration:underline}' +
      '#jemima-cc .jemima-cc-actions{display:flex;gap:8px;flex:0 0 auto;margin-left:auto}' +
      '#jemima-cc button{border:1px solid transparent;cursor:pointer;border-radius:5px;padding:8px 16px;font:800 11px/1 inherit;letter-spacing:.05em;text-transform:uppercase}' +
      '#jemima-cc .jemima-cc-accept{background:#c2155a;color:#fff;border-color:#c2155a}' +
      '#jemima-cc .jemima-cc-accept:hover{background:#a0124a;border-color:#a0124a}' +
      '#jemima-cc .jemima-cc-reject{background:transparent;color:#e2e8f0;border-color:#475569}' +
      '#jemima-cc .jemima-cc-reject:hover{border-color:#94a3b8;background:rgba(148,163,184,.12)}';
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
      '<p>We use cookies to measure traffic. <a href="' + PRIVACY_URL + '">Privacy</a></p>' +
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
