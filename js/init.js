// ── Init ───────────────────────────────────────────────────────────
function renderAll() {
  renderSidebar();
}

// Load theme
const savedTheme = localStorage.getItem('scoretracker_theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-btn').textContent = savedTheme==='dark'?'☀️ Light':'🌙 Dark';
}

applyLang();
renderAll();
// หน่วงเล็กน้อยเพื่อให้ enhancements.js override renderDashboard() ก่อน
setTimeout(() => {
  if (getSubjects().length > 0) {
    showDashboard();
  } else {
    document.getElementById('empty-state').style.display = 'block';
  }
}, 0);

// ── ตรวจสอบว่าเทอมปัจจุบันเคยเลือก gradeMode แล้วหรือยัง ──────────
(function checkGradeModeSetup() {
  const t = currentTerm();
  if (!t) return;
  // แสดง modal เฉพาะเมื่อ: ยังไม่เคยยืนยัน AND ไม่มีวิชาเลย (ผู้ใช้ใหม่จริงๆ)
  const hasSubjects = data.terms.some(term => term.subjects.length > 0);
  if (!t.gradeModeConfirmed && !hasSubjects) {
    setTimeout(() => showGradeModeModal(t), 600);
  } else if (!t.gradeModeConfirmed && hasSubjects) {
    // มีข้อมูลอยู่แล้ว → ถือว่า confirm ไปแล้ว ไม่ต้องถามอีก
    t.gradeModeConfirmed = true;
    save();
  }
})();

function showGradeModeModal(term) {
  const existing = document.getElementById('grademode-setup-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'grademode-setup-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML = `
    <div style="background:#1a1714;border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px;width:100%;max-width:400px;box-shadow:0 24px 80px rgba(0,0,0,0.5);">
      <div style="font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--accent);text-transform:uppercase;margin-bottom:6px;">ตั้งค่าครั้งแรก</div>
      <div style="font-family:var(--body);font-size:18px;font-weight:700;color:#ede9e3;margin-bottom:6px;">เรียนระดับไหนอยู่?</div>
      <div style="font-family:var(--body);font-size:13px;color:rgba(237,233,227,0.45);margin-bottom:20px;">เลือกเพื่อให้ระบบเกรดตรงกับการเรียนของคุณ</div>

      <div style="display:flex;gap:10px;margin-bottom:24px;">
        <button id="gms-uni" onclick="selectGradeModeSetup('uni')"
          style="flex:1;padding:16px 10px;border-radius:12px;border:2px solid var(--accent);background:rgba(212,82,26,0.15);color:#ede9e3;font-family:var(--body);font-size:13px;font-weight:700;cursor:pointer;text-align:center;">
          🎓<br><span style="font-size:13px;font-weight:700;display:block;margin-top:6px;">มหาวิทยาลัย</span>
          <span style="font-size:10px;color:rgba(255,255,255,0.4);font-weight:400;">A, B+, B, C+, C...</span>
        </button>
        <button id="gms-k12" onclick="selectGradeModeSetup('k12')"
          style="flex:1;padding:16px 10px;border-radius:12px;border:2px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(237,233,227,0.5);font-family:var(--body);font-size:13px;font-weight:700;cursor:pointer;text-align:center;">
          🏫<br><span style="font-size:13px;font-weight:700;display:block;margin-top:6px;">ประถม/มัธยม</span>
          <span style="font-size:10px;color:rgba(255,255,255,0.4);font-weight:400;">4, 3.5, 3, 2.5, 2...</span>
        </button>
      </div>

      <button onclick="confirmGradeModeSetup()"
        style="width:100%;padding:13px;background:var(--accent);border:none;border-radius:12px;color:white;font-family:var(--body);font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(212,82,26,0.3);">
        ยืนยัน →
      </button>
    </div>
  `;
  document.body.appendChild(modal);
  window._gradeModeSetupSelected = term.gradeMode || 'uni';
}

window.selectGradeModeSetup = function(mode) {
  window._gradeModeSetupSelected = mode;
  const uni = document.getElementById('gms-uni');
  const k12 = document.getElementById('gms-k12');
  if (!uni || !k12) return;
  if (mode === 'uni') {
    uni.style.border = '2px solid var(--accent)';
    uni.style.background = 'rgba(212,82,26,0.15)';
    uni.style.color = '#ede9e3';
    k12.style.border = '2px solid rgba(255,255,255,0.1)';
    k12.style.background = 'rgba(255,255,255,0.04)';
    k12.style.color = 'rgba(237,233,227,0.5)';
  } else {
    k12.style.border = '2px solid #2563c4';
    k12.style.background = 'rgba(37,99,196,0.15)';
    k12.style.color = '#ede9e3';
    uni.style.border = '2px solid rgba(255,255,255,0.1)';
    uni.style.background = 'rgba(255,255,255,0.04)';
    uni.style.color = 'rgba(237,233,227,0.5)';
  }
};

window.confirmGradeModeSetup = function() {
  const mode = window._gradeModeSetupSelected || 'uni';
  const t = currentTerm();
  if (t) {
    t.gradeMode = mode;
    t.gradeModeConfirmed = true;
    save();
  }
  const modal = document.getElementById('grademode-setup-modal');
  if (modal) modal.remove();
};

// ══════════════════════════════════════════════════════════════════
// CLOUD SYNC — Supabase
// ══════════════════════════════════════════════════════════════════
// gtag
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SC94SRRF5S');