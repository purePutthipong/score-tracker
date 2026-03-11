// PWA Install Prompt — Score Tracker

(function () {
  var DISMISS_KEY  = 'pwa_dismissed_until';
  var INSTALL_KEY  = 'pwa_installed';
  var VISIT_KEY    = 'pwa_visit_count';
  var deferredPrompt = null;

  // ── Detect environment ─────────────────────────────
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var isStandalone = window.matchMedia('(display-mode: standalone)').matches
                  || window.navigator.standalone === true;

  // ── Track visit count ──────────────────────────────
  function getVisitCount() {
    return parseInt(localStorage.getItem(VISIT_KEY) || '0', 10);
  }

  function incrementVisit() {
    var n = getVisitCount() + 1;
    localStorage.setItem(VISIT_KEY, n);
    return n;
  }

  // ── Should we show the prompt? ─────────────────────
  function shouldShow() {
    if (isStandalone) return false;
    if (localStorage.getItem(INSTALL_KEY)) return false;

    var dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) return false;

    return true;
  }

  // ── Show banner (Android / Desktop) ───────────────
  function showBanner() {
    var el = document.getElementById('pwa-banner');
    if (!el) return;
    el.style.display = 'block';
  }

  // ── Show iOS hint ──────────────────────────────────
  function showIOSHint() {
    var el = document.getElementById('pwa-ios-hint');
    if (!el) return;
    el.style.display = 'flex';
  }

  // ── Dismiss: snooze 3 days ─────────────────────────
  window.pwaDismiss = function () {
    var el = document.getElementById('pwa-banner');
    if (!el) return;
    el.classList.add('dismissing');
    setTimeout(function () { el.style.display = 'none'; el.classList.remove('dismissing'); }, 260);
    // Snooze 3 days
    localStorage.setItem(DISMISS_KEY, Date.now() + 3 * 24 * 60 * 60 * 1000);
  };

  window.pwaIosDismiss = function () {
    var el = document.getElementById('pwa-ios-hint');
    if (el) el.style.display = 'none';
    localStorage.setItem(DISMISS_KEY, Date.now() + 3 * 24 * 60 * 60 * 1000);
  };

  // ── Trigger native install ─────────────────────────
  window.pwaTriggerInstall = function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function (result) {
      if (result.outcome === 'accepted') {
        localStorage.setItem(INSTALL_KEY, '1');
      }
      deferredPrompt = null;
      var el = document.getElementById('pwa-banner');
      if (el) el.style.display = 'none';
    });
  };

  // ── Listen for install prompt (Chrome / Android) ──
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;

    if (!shouldShow()) return;

    var visits = incrementVisit();

    // Show on 2nd+ visit, or after 30s on first visit
    if (visits >= 2) {
      setTimeout(showBanner, 3000); // 3s delay so user settles in
    } else {
      setTimeout(showBanner, 30000); // 30s on first visit
    }
  });

  // ── iOS Safari logic ───────────────────────────────
  if (isIOS && isSafari && !isStandalone) {
    if (shouldShow()) {
      var visits = incrementVisit();
      if (visits >= 2) {
        setTimeout(showIOSHint, 5000);
      } else {
        setTimeout(showIOSHint, 45000);
      }
    }
  }

  // ── Mark as installed if opened standalone later ───
  if (isStandalone) {
    localStorage.setItem(INSTALL_KEY, '1');
  }

})();
// ── Auto-update: รับสัญญาณจาก Service Worker ─────────
if ('serviceWorker' in navigator) {
  // ฟัง message จาก SW เมื่อมี version ใหม่
  navigator.serviceWorker.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SW_UPDATED') {
      showUpdateBanner();
    }
  });

  // เช็ค SW ที่รอ activate อยู่ (กรณีเปิดแอปอยู่แล้วมี update)
  navigator.serviceWorker.ready.then(function(reg) {
    reg.addEventListener('updatefound', function() {
      const newWorker = reg.installing;
      if (!newWorker) return;
      newWorker.addEventListener('statechange', function() {
        if (newWorker.state === 'activated') {
          showUpdateBanner();
        }
      });
    });

    // เช็ค update ทุก 30 นาที (สำหรับแอปที่เปิดทิ้งไว้นาน)
    setInterval(function() { reg.update(); }, 30 * 60 * 1000);
  });
}

function showUpdateBanner() {
  // ไม่ให้โชว์ซ้ำถ้าโชว์อยู่แล้ว
  if (document.getElementById('sw-update-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'sw-update-banner';
  banner.style.cssText = [
    'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);',
    'z-index:9000;background:#1a1714;border:1px solid rgba(212,82,26,0.5);',
    'border-radius:14px;padding:12px 18px;',
    'display:flex;align-items:center;gap:12px;',
    'box-shadow:0 8px 32px rgba(0,0,0,0.4);',
    'font-family:var(--body);font-size:13px;color:#ede9e3;',
    'animation:toastIn 0.3s ease;white-space:nowrap;'
  ].join('');
  banner.innerHTML = `
    <span style="font-size:18px;">🔄</span>
    <span>มีเวอร์ชันใหม่พร้อมใช้งาน</span>
    <button onclick="window.location.reload()" style="
      padding:6px 14px;background:var(--accent);border:none;border-radius:8px;
      color:white;font-family:var(--body);font-size:12px;font-weight:700;
      cursor:pointer;white-space:nowrap;">
      อัปเดตเลย
    </button>
    <button onclick="this.parentElement.remove()" style="
      background:none;border:none;color:rgba(237,233,227,0.4);
      font-size:16px;cursor:pointer;padding:0 4px;">✕</button>
  `;
  document.body.appendChild(banner);
}