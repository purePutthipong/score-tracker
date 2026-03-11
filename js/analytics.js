// ══════════════════════════════════════════════════════
//  GA4 Custom Events — Score Tracker Analytics
//  วัดการใช้งานจริงของผู้ใช้ (ไม่ใช่แค่ pageview)
// ══════════════════════════════════════════════════════

function stTrack(eventName, params = {}) {
  if (typeof gtag !== 'function') return;
  gtag('event', eventName, params);
}

window.addEventListener('load', function () {

  // ── 1. เพิ่มวิชาใหม่ ──────────────────────────────
  const origAddSubject = window.addSubject;
  if (typeof origAddSubject === 'function') {
    window.addSubject = function (...args) {
      stTrack('add_subject', { term: currentTerm?.()?.name || 'unknown' });
      return origAddSubject.apply(this, args);
    };
  }

  // ── 2. เพิ่มเทอมใหม่ ──────────────────────────────
  const origAddTerm = window.addTerm;
  if (typeof origAddTerm === 'function') {
    window.addTerm = function (...args) {
      stTrack('add_term');
      return origAddTerm.apply(this, args);
    };
  }

  // ── 3. คำนวณคะแนน (debounce — นับเมื่อหยุดพิมพ์) ──
  let calcTimer = null;
  let calcFired = false;
  const origCalculate = window.calculate;
  if (typeof origCalculate === 'function') {
    window.calculate = function (...args) {
      clearTimeout(calcTimer);
      calcTimer = setTimeout(() => {
        if (!calcFired) {
          stTrack('calculate_score', { subject_id: window.currentSubjectId || 'unknown' });
          calcFired = true;
          setTimeout(() => { calcFired = false; }, 30000);
        }
      }, 1500);
      return origCalculate.apply(this, args);
    };
  }

  // ── 4. เปิด Share Modal ────────────────────────────
  const origOpenShare = window.openShareModal;
  if (typeof origOpenShare === 'function') {
    window.openShareModal = function (...args) {
      stTrack('open_share_modal', { term: currentTerm?.()?.name || 'unknown' });
      return origOpenShare.apply(this, args);
    };
  }

  // ── 5. แชร์ GPA Card ──────────────────────────────
  const origShareCard = window.shareCard;
  if (typeof origShareCard === 'function') {
    window.shareCard = function (...args) {
      stTrack('share_gpa_card', { method: 'native_share' });
      return origShareCard.apply(this, args);
    };
  }

  // ── 6. ดาวน์โหลด GPA Card ─────────────────────────
  const origDownloadShare = window.downloadShareCard;
  if (typeof origDownloadShare === 'function') {
    window.downloadShareCard = function (...args) {
      stTrack('share_gpa_card', { method: 'download_image' });
      return origDownloadShare.apply(this, args);
    };
  }

  // ── 7. Sign in Google ──────────────────────────────
  const origSignIn = window.signInGoogle;
  if (typeof origSignIn === 'function') {
    window.signInGoogle = function (...args) {
      stTrack('login_attempt', { method: 'google' });
      return origSignIn.apply(this, args);
    };
  }

  // ── 8. Export JSON (Backup) ────────────────────────
  const origExport = window.exportJSON;
  if (typeof origExport === 'function') {
    window.exportJSON = function (...args) {
      stTrack('export_data', { format: 'json' });
      return origExport.apply(this, args);
    };
  }

  // ── 9. ติดตั้ง PWA ────────────────────────────────
  const origPwaInstall = window.pwaTriggerInstall;
  if (typeof origPwaInstall === 'function') {
    window.pwaTriggerInstall = function (...args) {
      stTrack('pwa_install_trigger');
      return origPwaInstall.apply(this, args);
    };
  }

  // ── 10. จบ Onboarding ─────────────────────────────
  const origFinishOnboarding = window.finishOnboarding;
  if (typeof origFinishOnboarding === 'function') {
    window.finishOnboarding = function (...args) {
      stTrack('onboarding_complete');
      return origFinishOnboarding.apply(this, args);
    };
  }

  // ── 11. ตั้งเป้าเกรด ──────────────────────────────
  const origOpenGoal = window.openGoalModal;
  if (typeof origOpenGoal === 'function') {
    window.openGoalModal = function (...args) {
      stTrack('open_grade_goal');
      return origOpenGoal.apply(this, args);
    };
  }

  // ── 12. เพิ่ม Deadline ────────────────────────────
  const origSaveDeadline = window.saveDeadlineFromModal;
  if (typeof origSaveDeadline === 'function') {
    window.saveDeadlineFromModal = function (...args) {
      stTrack('add_deadline');
      return origSaveDeadline.apply(this, args);
    };
  }

  // ── 13. เปลี่ยนภาษา ───────────────────────────────
  const origSwitchLang = window.switchLang;
  if (typeof origSwitchLang === 'function') {
    window.switchLang = function (lang, ...args) {
      stTrack('switch_language', { language: lang });
      return origSwitchLang.apply(this, [lang, ...args]);
    };
  }

  // ── 14. Track เวลาใช้งาน ──────────────────────────
  let sessionStart = Date.now();
  window.addEventListener('beforeunload', function () {
    const duration = Math.round((Date.now() - sessionStart) / 1000);
    if (duration > 5) stTrack('session_duration', { seconds: duration });
  });

});