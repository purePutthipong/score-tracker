// ── Language System ────────────────────────────────────────────────
var LANG = {
  th: {
    // App
    appName:'คะแนนของฉัน',
    // Sidebar / Term
    addTerm:'＋ เพิ่มเทอมใหม่', renameTerm:'✏️ แก้ชื่อเทอมนี้', deleteTerm:'🗑️ ลบเทอมนี้',
    dashboard:'📊 Dashboard รวม', history:'📈 ประวัติ GPA', subjects:'วิชาในเทอมนี้',
    addSubject:'+ เพิ่มวิชาใหม่', backup:'💾 Backup', importBtn:'📂 Import',
    // Empty state
    emptyState:'กด "+ เพิ่มวิชาใหม่" เพื่อเริ่มต้น',
    emptyTitle:'ยังไม่มีวิชาในเทอมนี้',
    emptyDesc:'เพิ่มวิชาแรกเพื่อเริ่มติดตามคะแนน<br>และคำนวณเกรดอัตโนมัติ',
    emptyStep1:'เพิ่มวิชา', emptyStep2:'กรอกคะแนน', emptyStep3:'ดู GPA',
    // Stats
    statRaw:'คะแนนสะสม', statWeighted:'คะแนนถ่วงน้ำหนัก',
    statNeed:'Final ที่ต้องได้ (C)', statGrade:'เกรดตอนนี้',
    statNeedK12:'Final ที่ต้องได้ (2)',
    // Subject view
    boundaryTitle:'Grade Boundary — คุณอยู่ตรงไหน',
    finalTitle:'ต้องสอบ Final ได้เท่าไหร่',
    noteTitle:'โน้ต / หมายเหตุ', notePlaceholder:'จดอะไรก็ได้...',
    quickModeLabel:'บันทึกเกรดโดยตรง (Quick Mode)',
    deleteSubject:'ลบวิชา', gradeSettings:'⚙️ เกรด',
    // Grade Boundary Modal
    modalTitle:'⚙ กำหนด Grade Boundary',
    modalSub:'กำหนดเกณฑ์คะแนนขั้นต่ำของแต่ละเกรดสำหรับวิชานี้',
    btnReset:'รีเซ็ต', btnCancel:'ยกเลิก', btnSave:'บันทึก',
    gradeMin:'ขั้นต่ำ',
    alertBoundaryErr:'เกณฑ์ไม่ถูกต้อง: {g1} ({v1}) ต้องมากกว่า {g2} ({v2})',
    // Confirms / Alerts
    confirmDelete:'ลบวิชานี้?',
    confirmImport:'นำเข้าข้อมูล? ข้อมูลปัจจุบันจะถูกแทนที่',
    confirmDeleteTerm:'ลบเทอม "{name}"{subs}?\nไม่สามารถย้อนกลับได้',
    confirmDeleteTermSubs:' และวิชาทั้งหมด {n} วิชา',
    confirmToQuick:'มีคะแนนที่กรอกไว้อยู่แล้ว\nถ้าสลับเป็นโหมดเทอมเก่า คะแนนจะถูกซ่อน (ไม่ได้ถูกลบ)\nต้องการดำเนินการต่อไหม?',
    confirmFromQuick:'สลับกลับโหมดกรอกคะแนน?\nเกรดที่เลือกไว้ใน Quick Mode จะถูกล้าง แต่คะแนนเดิมยังอยู่ครบค่ะ',
    alertDuplicate:'"{name}" มีอยู่แล้วค่ะ',
    invalidFile:'ไฟล์ไม่ถูกต้อง', invalidJSON:'ไฟล์ JSON ไม่ถูกต้อง',
    // Term prompts
    termPrompt:'ชื่อเทอม:', termDefault:'เทอม', renamePrompt:'แก้ชื่อเทอม:',
    newTermTitle:'เพิ่มเทอมใหม่', newTermSettings:'ตั้งค่าเทอม',
    newTermNameLabel:'ชื่อเทอม', newTermGradeSystem:'ระบบเกรด',
    newTermUni:'มหาวิทยาลัย', newTermUniSub:'A, B+, B, C+...',
    newTermK12:'ประถม/มัธยม', newTermK12Sub:'4, 3.5, 3, 2.5...',
    newTermCreate:'สร้างเทอม →', newTermCancel:'ยกเลิก',
    // Items / Categories
    enterScore:'กรอกคะแนนเพื่อเริ่มคำนวณ',
    addEmptyDash:'เพิ่มวิชาก่อนเพื่อดู Dashboard',
    itemName:'ชื่องาน/สอบ', itemScore:'คะแนนที่ได้', itemMax:'คะแนนเต็ม',
    addItem:'+ เพิ่มรายการ', addCategory:'+ เพิ่มหมวดคะแนน',
    avgLabel:'เฉลี่ย', lockedLabel:'ล็อคแล้ว', weightedLabel:'ถ่วงน้ำหนัก',
    lockTooltip:'ล็อค = นับคะแนนนี้แน่ๆ',
    lockUnlockTip:'ล็อคแล้ว — คลิกเพื่อปลดล็อค',
    lockLockTip:'ยังไม่ล็อค — คลิกเพื่อนับคะแนนนี้',
    itemNamePH:'เช่น HW1, Midterm...',
    catDefaultHW:'การบ้าน / งาน', catDefaultMid:'สอบกลางภาค', catDefaultQuiz:'เก็บคะแนน',
    newCatName:'หมวดใหม่', newSubjectName:'วิชาใหม่',
    // Quick mode
    quickModeSelectK12:'🎯 เลือกเกรด', quickModeLegacy:'📋 โหมดเทอมเก่า',
    detailModeK12:'✏️ กรอกคะแนนละเอียด', detailModeLegacy:'✏️ โหมดกรอกคะแนน',
    oldTermNoGrade:'เทอมเก่า — ยังไม่เลือกเกรด',
    passFail:'ผ่าน (Pass/Fail)', notCountGPA:'ไม่นับ GPA',
    savedOk:'บันทึกสำเร็จ', passText:'ผ่าน',
    oldTermPass:'เทอมเก่า — ผ่าน (Pass)',
    gradePointLabel:'เกรดพอยต์', gradeSaved:'บันทึกเกรดสำเร็จ',
    recordedGrade:'เกรดที่บันทึกไว้',
    // Dashboard
    dashGPALabel:'GPA เทอมนี้', dashAllSubjects:'วิชาทั้งหมด',
    dashHasScore:'มีคะแนน {n} วิชา',
    dashSetGoal:'ตั้งเป้า', dashShare:'แชร์',
    dashPassClick:'คลิกเพื่อเปลี่ยนเกณฑ์',
    dashPassedLabel:'วิชาที่ผ่าน', dashAboveGrade:'เกรด {g} ขึ้นไป',
    dashAtRisk:'วิชาที่เสี่ยง', dashBelowGrade:'ต่ำกว่าเกรด {g}',
    dashNeedFinal:'ต้องสู้ Final', dashSubjNeedFinal:'วิชาที่ยังต้องทำ final',
    dashTotalCredits:'หน่วยกิตรวม', dashCreditGraded:'credit ที่มีเกรดแล้ว',
    dashEmptyDesc:'เพิ่มวิชาและกรอกคะแนน<br>แล้ว Dashboard จะแสดงสถิติทั้งหมดให้',
    dashAddFirst:'＋ เพิ่มวิชาแรก',
    atRiskMsg:'⚠ {name} — คะแนนปัจจุบัน {score} (เกรด {grade}) อาจไม่ผ่าน',
    chartScores:'คะแนนแต่ละวิชา', chartGradeDist:'การกระจายเกรด',
    tableColSubject:'วิชา', tableColScore:'คะแนนสะสม',
    tableColProgress:'ความคืบหน้า', tableColGrade:'เกรด',
    tableColGP:'เกรดพอยต์', tableColFinal:'Final ที่ต้องได้',
    passedCheck:'ผ่านแล้ว ✓', failingNow:'ไม่ผ่านแล้ว',
    exportAll:'⬇ Export CSV ทั้งหมด',
    // History
    cumGPA:'GPA สะสมทุกเทอม (Cumulative GPA)',
    histFromTerms:'จาก {n} เทอม | {m} วิชา',
    histTermGPAChart:'GPA แต่ละเทอม',
    termHistory:'ประวัติแต่ละเทอม', termCol:'เทอม',
    histColAllSubj:'วิชาทั้งหมด', histColPassed:'วิชาที่ผ่าน',
    // Pass threshold prompt
    passThresholdPrompt:'เลือกเกณฑ์ "วิชาที่ผ่าน":\n\n{labels}\n\nพิมพ์หมายเลข 1-{n}',
    thresholdD:'D (1.0) — ผ่านขั้นต่ำ', thresholdDp:'D+ (1.5)',
    thresholdC:'C (2.0)', thresholdCp:'C+ (2.5)',
    thresholdB:'B (3.0) — เกียรตินิยมอันดับ 2', thresholdBp:'B+ (3.5) — เกียรตินิยมอันดับ 1',
    // Nav
    gpaLabel:'GPA เทอมนี้', allSubjects:'วิชาทั้งหมด', hasScore:'มีคะแนน',
    passLabel:'วิชาที่ผ่าน (≥D)', riskLabel:'วิชาที่เสี่ยง',
    finalFightLabel:'ต้องสู้ Final', creditTotal:'หน่วยกิตรวม',
    gradeD:'เกรด D ขึ้นไป', belowD:'ต่ำกว่าเกรด D',
    needFinalSub:'วิชาที่ยังต้องทำ final', creditSub:'credit ที่มีเกรดแล้ว',
    navDashboard:'Dashboard', navGPA:'GPA', navSubjects:'วิชา',
    navSettings:'Settings', atRisk:'อาจไม่ผ่าน',
    subjectPlaceholder:'ชื่อวิชา...', itemNamePlaceholder:'เช่น HW1, Midterm...',
    scoreFrom:'ได้', scoreTo:'จาก',
    sheetAddSubject:'＋ เพิ่มวิชาใหม่', settingsTermLabel:'เทอม',
    settingsAddTerm:'＋ เพิ่มเทอม', settingsRenameTerm:'✏️ แก้ชื่อเทอม',
    settingsBackup:'💾 Backup',
    darkMode:'🌙 Dark', lightMode:'☀️ Light',
    // Theme
    themeToggle:'Dark / Light',
  },
  en: {
    // App
    appName:'My Scores',
    // Sidebar / Term
    addTerm:'＋ Add New Term', renameTerm:'✏️ Rename This Term', deleteTerm:'🗑️ Delete This Term',
    dashboard:'📊 Dashboard', history:'📈 GPA History', subjects:'Subjects This Term',
    addSubject:'+ Add New Subject', backup:'💾 Backup', importBtn:'📂 Import',
    // Empty state
    emptyState:'Click "+ Add New Subject" to get started',
    emptyTitle:'No subjects yet',
    emptyDesc:'Add your first subject to start tracking scores<br>and calculating your grade automatically',
    emptyStep1:'Add subject', emptyStep2:'Enter scores', emptyStep3:'View GPA',
    // Stats
    statRaw:'Raw Score', statWeighted:'Weighted Score',
    statNeed:'Final Needed (C)', statGrade:'Current Grade',
    statNeedK12:'Final Needed (2)',
    // Subject view
    boundaryTitle:'Grade Boundary — Where You Stand',
    finalTitle:'Final Score Needed',
    noteTitle:'Notes', notePlaceholder:'Write anything...',
    quickModeLabel:'Direct Grade Entry (Quick Mode)',
    deleteSubject:'Delete Subject', gradeSettings:'⚙️ Grade',
    // Grade Boundary Modal
    modalTitle:'⚙ Set Grade Boundary',
    modalSub:'Set minimum score for each grade for this subject',
    btnReset:'Reset', btnCancel:'Cancel', btnSave:'Save',
    gradeMin:'minimum',
    alertBoundaryErr:'Invalid: {g1} ({v1}) must be greater than {g2} ({v2})',
    // Confirms / Alerts
    confirmDelete:'Delete this subject?',
    confirmImport:'Import data? Current data will be replaced.',
    confirmDeleteTerm:'Delete term "{name}"{subs}?\nThis cannot be undone.',
    confirmDeleteTermSubs:' and all {n} subjects',
    confirmToQuick:'You have existing scores.\nSwitching to Legacy mode will hide them (not deleted).\nContinue?',
    confirmFromQuick:'Switch back to score entry?\nThe Quick Mode grade will be cleared, but your scores remain intact.',
    alertDuplicate:'"{name}" already exists',
    invalidFile:'Invalid file', invalidJSON:'Invalid JSON file',
    // Term prompts
    termPrompt:'Term name:', termDefault:'Term', renamePrompt:'Rename term:',
    newTermTitle:'Add New Term', newTermSettings:'Term Settings',
    newTermNameLabel:'Term Name', newTermGradeSystem:'Grade System',
    newTermUni:'University', newTermUniSub:'A, B+, B, C+...',
    newTermK12:'K-12', newTermK12Sub:'4, 3.5, 3, 2.5...',
    newTermCreate:'Create Term →', newTermCancel:'Cancel',
    // Items / Categories
    enterScore:'Enter scores to start calculating',
    addEmptyDash:'Add a subject to see Dashboard',
    itemName:'Assignment/Exam', itemScore:'Score', itemMax:'Max Score',
    addItem:'+ Add Item', addCategory:'+ Add Category',
    avgLabel:'Avg', lockedLabel:'Locked', weightedLabel:'Weighted',
    lockTooltip:'Lock = Count this score for sure',
    lockUnlockTip:'Locked — Click to unlock',
    lockLockTip:'Not locked — Click to count this score',
    itemNamePH:'e.g. HW1, Midterm...',
    catDefaultHW:'Homework / Work', catDefaultMid:'Midterm Exam', catDefaultQuiz:'Quizzes',
    newCatName:'New Category', newSubjectName:'New Subject',
    // Quick mode
    quickModeSelectK12:'🎯 Select Grade', quickModeLegacy:'📋 Legacy Mode',
    detailModeK12:'✏️ Detailed Score Entry', detailModeLegacy:'✏️ Score Entry Mode',
    oldTermNoGrade:'Legacy — No grade selected',
    passFail:'Pass (Pass/Fail)', notCountGPA:'Not counted in GPA',
    savedOk:'Saved', passText:'Pass',
    oldTermPass:'Legacy — Pass (Pass/Fail)',
    gradePointLabel:'Grade Point', gradeSaved:'Grade saved',
    recordedGrade:'Recorded grade',
    // Dashboard
    dashGPALabel:'GPA This Term', dashAllSubjects:'Total Subjects',
    dashHasScore:'{n} with scores',
    dashSetGoal:'Set Goal', dashShare:'Share',
    dashPassClick:'Click to change threshold',
    dashPassedLabel:'Passed Subjects', dashAboveGrade:'Grade {g} or above',
    dashAtRisk:'At Risk', dashBelowGrade:'Below grade {g}',
    dashNeedFinal:'Need Final', dashSubjNeedFinal:'subjects need final',
    dashTotalCredits:'Total Credits', dashCreditGraded:'credits with grades',
    dashEmptyDesc:'Add subjects and enter scores<br>to see your full stats here',
    dashAddFirst:'＋ Add First Subject',
    atRiskMsg:'⚠ {name} — current score {score} (grade {grade}) may not pass',
    chartScores:'Scores by Subject', chartGradeDist:'Grade Distribution',
    tableColSubject:'Subject', tableColScore:'Accumulated Score',
    tableColProgress:'Progress', tableColGrade:'Grade',
    tableColGP:'Grade Point', tableColFinal:'Final Needed',
    passedCheck:'Passing ✓', failingNow:'Cannot pass',
    exportAll:'Export All CSV',
    // History
    cumGPA:'Cumulative GPA (All Terms)',
    histFromTerms:'From {n} terms | {m} subjects',
    histTermGPAChart:'GPA Per Term',
    termHistory:'Term History', termCol:'Term',
    histColAllSubj:'Total Subjects', histColPassed:'Passed',
    // Pass threshold prompt
    passThresholdPrompt:'Select "Passing" threshold:\n\n{labels}\n\nEnter number 1-{n}',
    thresholdD:'D (1.0) — Minimum pass', thresholdDp:'D+ (1.5)',
    thresholdC:'C (2.0)', thresholdCp:'C+ (2.5)',
    thresholdB:'B (3.0) — Second Class Honors', thresholdBp:'B+ (3.5) — First Class Honors',
    // Nav
    gpaLabel:'GPA This Term', allSubjects:'Total Subjects', hasScore:'With scores',
    passLabel:'Passed (>=D)', riskLabel:'At Risk',
    finalFightLabel:'Need Final', creditTotal:'Total Credits',
    gradeD:'Grade D or above', belowD:'Below Grade D',
    needFinalSub:'subjects need final', creditSub:'credits with grades',
    navDashboard:'Dashboard', navGPA:'GPA', navSubjects:'Subjects',
    navSettings:'Settings', atRisk:'may not pass',
    subjectPlaceholder:'Subject name...', itemNamePlaceholder:'e.g. HW1, Midterm...',
    scoreFrom:'Got', scoreTo:'out of',
    sheetAddSubject:'＋ Add New Subject', settingsTermLabel:'Term',
    settingsAddTerm:'＋ Add Term', settingsRenameTerm:'✏️ Rename Term',
    settingsBackup:'💾 Backup',
    darkMode:'🌙 Dark', lightMode:'☀️ Light',
    themeToggle:'Dark / Light',
  }
};

// ── Helper: parameterized translation ─────────────────────────────
function trf(key, params) {
  var s = tr(key);
  if (params) Object.keys(params).forEach(function(k) {
    s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
  });
  return s;
}

var currentLang = (function() {
  var saved = localStorage.getItem('scoretracker_lang');
  if (saved && LANG[saved]) return saved;
  var bl = (navigator.language || 'en').toLowerCase();
  return bl.startsWith('th') ? 'th' : 'en';
})();

function tr(key) {
  var l = LANG[currentLang];
  if (l && l[key] !== undefined) return l[key];
  if (LANG.en && LANG.en[key] !== undefined) return LANG.en[key];
  return key;
}

function switchLang(lang) {
  if (!LANG[lang]) return;
  currentLang = lang;
  localStorage.setItem('scoretracker_lang', lang);
  applyLang();
  renderAll();
  var dv = document.getElementById('dashboard-view');
  var hv = document.getElementById('history-view');
  var sv = document.getElementById('subject-view');
  if (dv && dv.style.display !== 'none') renderDashboard();
  if (hv && hv.style.display !== 'none') renderHistory();
  if (sv && sv.style.display !== 'none' && currentSubjectId) renderSubjectView();
}

function applyLang() {
  function set(id, text) { var el = document.getElementById(id); if(el) el.textContent = text; }
  function setPH(id, ph) { var el = document.getElementById(id); if(el) el.placeholder = ph; }

  // Auto-apply data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    el.textContent = tr(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
    el.innerHTML = tr(el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
    el.placeholder = tr(el.getAttribute('data-i18n-ph'));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
    el.title = tr(el.getAttribute('data-i18n-title'));
  });

  // Explicit ID-based updates (for elements without data-i18n)
  set('brand-name', tr('appName'));
  set('btn-addterm', tr('addTerm'));
  set('btn-renameterm', tr('renameTerm'));
  set('btn-deleteterm', tr('deleteTerm'));
  set('dash-btn', tr('dashboard'));
  set('history-btn', tr('history'));
  set('sidebar-subjects-label', tr('subjects'));
  set('btn-newsubject', tr('addSubject'));
  set('btn-backup', tr('backup'));
  set('btn-import', tr('importBtn'));
  set('empty-text', tr('emptyState'));
  set('lbl-raw', tr('statRaw'));
  set('lbl-weighted', tr('statWeighted'));
  const _term = currentTerm && currentTerm();
  const _isK12 = _term && _term.gradeMode === 'k12';
  set('lbl-need', _isK12 ? tr('statNeedK12') : tr('statNeed'));
  set('lbl-grade', tr('statGrade'));
  set('lbl-boundary', tr('boundaryTitle'));
  set('lbl-final', tr('finalTitle'));
  set('lbl-note', tr('noteTitle'));
  set('modal-title', tr('modalTitle'));
  set('modal-sub', tr('modalSub'));
  set('btn-reset', tr('btnReset'));
  set('btn-cancel', tr('btnCancel'));
  set('btn-save', tr('btnSave'));
  set('bnav-dash-label', tr('navDashboard'));
  set('bnav-gpa-label', tr('navGPA'));
  set('bnav-subjects-label', tr('navSubjects'));
  set('bnav-settings-label', tr('navSettings'));
  set('sheet-subjects-label', tr('subjects'));
  set('sheet-add-label', tr('sheetAddSubject'));
  set('settings-term-label', tr('settingsTermLabel'));
  set('settings-addterm-label', tr('settingsAddTerm'));
  set('settings-renameterm-label', tr('settingsRenameTerm'));
  set('settings-backup-label', tr('settingsBackup'));
  setPH('subject-note', tr('notePlaceholder'));

  // Theme button
  var themBtn = document.getElementById('theme-btn');
  if (themBtn) {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themBtn.textContent = isDark ? tr('lightMode') : tr('darkMode');
  }

  // Lang button highlights (sidebar + settings sheet)
  ['th','en'].forEach(function(l) {
    ['lang-','slang-'].forEach(function(prefix) {
      var b = document.getElementById(prefix + l);
      if (b) {
        b.style.background = l===currentLang ? 'rgba(212,82,26,0.35)' : 'rgba(255,255,255,0.05)';
        b.style.borderColor = l===currentLang ? 'var(--accent)' : 'rgba(255,255,255,0.1)';
        b.style.color = l===currentLang ? 'white' : 'rgba(255,255,255,0.5)';
      }
    });
  });
}
