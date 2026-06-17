/* Jemima cookie consent — blocks Google Tag Manager until the visitor accepts.
   No Google request is made and no analytics cookies are set before consent.
   Choice is stored in localStorage (not a cookie), so storing it needs no consent. */
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
      '#jemima-cc{position:fixed;left:0;right:0;bottom:0;z-index:2147483600;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px 22px;padding:16px 20px;background:#fff;border-top:1px solid #e2e8f0;box-shadow:0 -8px 30px rgba(15,23,42,.12);font-family:"Plus Jakarta Sans",system-ui,-apple-system,sans-serif}' +
      '#jemima-cc p{margin:0;flex:1 1 380px;min-width:240px;color:#475569;font-size:14px;line-height:1.55;font-weight:500}' +
      '#jemima-cc a{color:#c2155a;text-decoration:underline;font-weight:700}' +
      '#jemima-cc .jemima-cc-actions{display:flex;gap:10px;flex:0 0 auto}' +
      '#jemima-cc button{border:0;cursor:pointer;padding:11px 22px;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;font-family:inherit}' +
      '#jemima-cc .jemima-cc-accept{background:#c2155a;color:#fff}' +
      '#jemima-cc .jemima-cc-accept:hover{background:#a0124a}' +
      '#jemima-cc .jemima-cc-reject{background:#f1f5f9;color:#475569}' +
      '#jemima-cc .jemima-cc-reject:hover{background:#e2e8f0}' +
      '@media(max-width:640px){#jemima-cc{flex-direction:column;align-items:stretch;text-align:center}#jemima-cc .jemima-cc-actions{flex-direction:column-reverse}#jemima-cc button{width:100%}}';
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
      '<p>We use cookies to measure how this site performs. We only set them if you accept. See our <a href="' + PRIVACY_URL + '">Privacy Policy</a>.</p>' +
      '<div class="jemima-cc-actions">' +
        '<button type="button" class="jemima-cc-reject">Reject</button>' +
        '<button type="button" class="jemima-cc-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);
    bar.querySelector('.jemima-cc-accept').addEventListener('click', function () { writeConsent('granted'); loadGTM(); bar.remove(); });
    bar.querySelector('.jemima-cc-reject').addEventListener('click', function () { writeConsent('denied'); bar.remove(); });
  }

  /* Re-open the banner from a footer link:
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
