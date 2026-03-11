// ── Language System ────────────────────────────────────────────────
var LANG = {
  th: {
    appName:'คะแนนของฉัน', addTerm:'＋ เพิ่มเทอมใหม่',
    renameTerm:'✏️ แก้ชื่อเทอมนี้', deleteTerm:'🗑️ ลบเทอมนี้', dashboard:'📊 Dashboard รวม',
    history:'📈 ประวัติ GPA', subjects:'วิชาในเทอมนี้',
    addSubject:'+ เพิ่มวิชาใหม่', backup:'💾 Backup', importBtn:'📂 Import',
    emptyState:'กด "+ เพิ่มวิชาใหม่" เพื่อเริ่มต้น',
    statRaw:'คะแนนสะสม', statWeighted:'คะแนนถ่วงน้ำหนัก',
    statNeed:'Final ที่ต้องได้ (C)', statGrade:'เกรดตอนนี้',
    boundaryTitle:'Grade Boundary — คุณอยู่ตรงไหน',
    finalTitle:'ต้องสอบ Final ได้เท่าไหร่',
    noteTitle:'โน้ต / หมายเหตุ', notePlaceholder:'จดอะไรก็ได้...',
    modalTitle:'⚙ กำหนด Grade Boundary',
    modalSub:'กำหนดเกณฑ์คะแนนขั้นต่ำของแต่ละเกรดสำหรับวิชานี้',
    btnReset:'รีเซ็ต', btnCancel:'ยกเลิก', btnSave:'บันทึก',
    confirmDelete:'ลบวิชานี้?',
    confirmImport:'นำเข้าข้อมูล? ข้อมูลปัจจุบันจะถูกแทนที่',
    invalidFile:'ไฟล์ไม่ถูกต้อง', invalidJSON:'ไฟล์ JSON ไม่ถูกต้อง',
    termPrompt:'ชื่อเทอม:', termDefault:'เทอม', renamePrompt:'แก้ชื่อเทอม:',
    enterScore:'กรอกคะแนนเพื่อเริ่มคำนวณ',
    addEmptyDash:'เพิ่มวิชาก่อนเพื่อดู Dashboard',
    itemName:'ชื่องาน/สอบ', itemScore:'คะแนนที่ได้', itemMax:'คะแนนเต็ม',
    addItem:'+ เพิ่มรายการ', addCategory:'+ เพิ่มหมวดคะแนน',
    avgLabel:'เฉลี่ย', lockedLabel:'ล็อคแล้ว', weightedLabel:'ถ่วงน้ำหนัก',
    gpaLabel:'GPA เทอมนี้', allSubjects:'วิชาทั้งหมด', hasScore:'มีคะแนน',
    passLabel:'วิชาที่ผ่าน (≥D)', riskLabel:'วิชาที่เสี่ยง',
    finalFightLabel:'ต้องสู้ Final', creditTotal:'หน่วยกิตรวม',
    gradeD:'เกรด D ขึ้นไป', belowD:'ต่ำกว่าเกรด D',
    needFinalSub:'วิชาที่ยังต้องทำ final', creditSub:'credit ที่มีเกรดแล้ว',
    exportAll:'⬇ Export CSV ทั้งหมด',
    cumGPA:'GPA สะสมทุกเทอม (Cumulative GPA)',
    termHistory:'ประวัติแต่ละเทอม', termCol:'เทอม',
    navDashboard:'Dashboard', navGPA:'GPA', navSubjects:'วิชา',
    navSettings:'Settings', atRisk:'อาจไม่ผ่าน',
    subjectPlaceholder:'ชื่อวิชา...', itemNamePlaceholder:'เช่น HW1, Midterm...',
    scoreFrom:'ได้', scoreTo:'จาก',
    sheetAddSubject:'＋ เพิ่มวิชาใหม่', settingsTermLabel:'เทอม',
    settingsAddTerm:'＋ เพิ่มเทอม', settingsRenameTerm:'✏️ แก้ชื่อเทอม',
    settingsBackup:'💾 Backup',
  },
  en: {
    appName:'My Scores', addTerm:'＋ Add New Term',
    renameTerm:'✏️ Rename This Term', deleteTerm:'🗑️ Delete This Term', dashboard:'📊 Dashboard',
    history:'📈 GPA History', subjects:'Subjects This Term',
    addSubject:'+ Add New Subject', backup:'💾 Backup', importBtn:'📂 Import',
    emptyState:'Click "+ Add New Subject" to get started',
    statRaw:'Raw Score', statWeighted:'Weighted Score',
    statNeed:'Final Needed (C)', statGrade:'Current Grade',
    boundaryTitle:'Grade Boundary — Where You Stand',
    finalTitle:'Final Score Needed',
    noteTitle:'Notes', notePlaceholder:'Write anything...',
    modalTitle:'⚙ Set Grade Boundary',
    modalSub:'Set minimum score for each grade for this subject',
    btnReset:'Reset', btnCancel:'Cancel', btnSave:'Save',
    confirmDelete:'Delete this subject?',
    confirmImport:'Import data? Current data will be replaced.',
    invalidFile:'Invalid file', invalidJSON:'Invalid JSON file',
    termPrompt:'Term name:', termDefault:'Term', renamePrompt:'Rename term:',
    enterScore:'Enter scores to start calculating',
    addEmptyDash:'Add a subject to see Dashboard',
    itemName:'Assignment/Exam', itemScore:'Score', itemMax:'Max Score',
    addItem:'+ Add Item', addCategory:'+ Add Category',
    avgLabel:'Avg', lockedLabel:'Locked', weightedLabel:'Weighted',
    gpaLabel:'GPA This Term', allSubjects:'Total Subjects', hasScore:'With scores',
    passLabel:'Passed (>=D)', riskLabel:'At Risk',
    finalFightLabel:'Need Final', creditTotal:'Total Credits',
    gradeD:'Grade D or above', belowD:'Below Grade D',
    needFinalSub:'subjects need final', creditSub:'credits with grades',
    exportAll:'Export All CSV',
    cumGPA:'Cumulative GPA (All Terms)',
    termHistory:'Term History', termCol:'Term',
    navDashboard:'Dashboard', navGPA:'GPA', navSubjects:'Subjects',
    navSettings:'Settings', atRisk:'may not pass',
    subjectPlaceholder:'Subject name...', itemNamePlaceholder:'e.g. HW1, Midterm...',
    scoreFrom:'Got', scoreTo:'out of',
    sheetAddSubject:'＋ Add New Subject', settingsTermLabel:'Term',
    settingsAddTerm:'＋ Add Term', settingsRenameTerm:'✏️ Rename Term',
    settingsBackup:'💾 Backup',
  }
};

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
  set('lbl-need', _isK12 ? 'Final ที่ต้องได้ (2)' : tr('statNeed'));
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
  // Lang button highlights (sidebar)
  ['th','en'].forEach(function(l) {
    var b = document.getElementById('lang-' + l);
    if (b) {
      b.style.background = l===currentLang ? 'rgba(212,82,26,0.35)' : 'rgba(255,255,255,0.05)';
      b.style.borderColor = l===currentLang ? 'var(--accent)' : 'rgba(255,255,255,0.1)';
      b.style.color = l===currentLang ? 'white' : 'rgba(255,255,255,0.5)';
    }
    // Settings sheet lang buttons
    var sb = document.getElementById('slang-' + l);
    if (sb) {
      sb.style.background = l===currentLang ? 'rgba(212,82,26,0.35)' : 'rgba(255,255,255,0.05)';
      sb.style.borderColor = l===currentLang ? 'var(--accent)' : 'rgba(255,255,255,0.1)';
      sb.style.color = l===currentLang ? 'white' : 'rgba(255,255,255,0.5)';
    }
  });
}