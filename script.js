window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SC94SRRF5S');



// ── Language System ────────────────────────────────────────────────
var LANG = {
  th: {
    appName:'คะแนนของฉัน', addTerm:'＋ เพิ่มเทอมใหม่',
    renameTerm:'✏️ แก้ชื่อเทอมนี้', dashboard:'📊 Dashboard รวม',
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
    renameTerm:'✏️ Rename This Term', dashboard:'📊 Dashboard',
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
  if (dv && dv.style.display !== 'none') renderDashboard();
  if (hv && hv.style.display !== 'none') renderHistory();
}

function applyLang() {
  function set(id, text) { var el = document.getElementById(id); if(el) el.textContent = text; }
  function setPH(id, ph) { var el = document.getElementById(id); if(el) el.placeholder = ph; }
  set('brand-name', tr('appName'));
  set('btn-addterm', tr('addTerm'));
  set('btn-renameterm', tr('renameTerm'));
  set('dash-btn', tr('dashboard'));
  set('history-btn', tr('history'));
  set('sidebar-subjects-label', tr('subjects'));
  set('btn-newsubject', tr('addSubject'));
  set('btn-backup', tr('backup'));
  set('btn-import', tr('importBtn'));
  set('empty-text', tr('emptyState'));
  set('lbl-raw', tr('statRaw'));
  set('lbl-weighted', tr('statWeighted'));
  set('lbl-need', tr('statNeed'));
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

// ── Mobile Sheet Functions ─────────────────────────────────────────
function closeAllSheets() {
  ['subject-sheet','settings-sheet'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var ov = document.getElementById('sheet-overlay');
  if (ov) ov.style.display = 'none';
}

function toggleSubjectSheet() {
  var sheet = document.getElementById('subject-sheet');
  var ov = document.getElementById('sheet-overlay');
  if (!sheet) return;
  if (sheet.style.display === 'block') { closeAllSheets(); return; }
  closeAllSheets();
  // Populate subjects
  var container = document.getElementById('subject-sheet-list');
  if (container) {
    container.innerHTML = '';
    getSubjects().forEach(function(s) {
      var r = calcSubject(s);
      var g = scoreToGrade(r.weightedScore, s);
      var btn = document.createElement('button');
      btn.style.cssText = 'width:100%;padding:12px 14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:white;font-family:var(--body);font-size:13px;text-align:left;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;cursor:pointer';
      btn.innerHTML = '<span>' + s.name + '</span><span style="font-family:var(--mono);font-size:11px;color:' + (g ? GRADE_COLORS[g.letter] : 'rgba(255,255,255,0.3)') + '">' + (g ? g.letter : '—') + '</span>';
      btn.onclick = function() { selectSubject(s.id); closeAllSheets(); };
      container.appendChild(btn);
    });
  }
  sheet.style.display = 'block';
  if (ov) ov.style.display = 'block';
}

function toggleSettingsSheet() {
  var sheet = document.getElementById('settings-sheet');
  var ov = document.getElementById('sheet-overlay');
  if (!sheet) return;
  if (sheet.style.display === 'block') { closeAllSheets(); return; }
  closeAllSheets();
  // Populate term select
  var sel = document.getElementById('settings-term-select');
  if (sel) {
    sel.innerHTML = data.terms.map(function(t) {
      return '<option value="' + t.id + '"' + (t.id === currentTermId ? ' selected' : '') + '>' + t.name + '</option>';
    }).join('');
  }
  // Update lang buttons
  applyLang();
  sheet.style.display = 'block';
  if (ov) ov.style.display = 'block';
}

// ── Mobile renderItems with card layout ───────────────────────────
function renderItemsMobile(cid) {
  var s = getSubject();
  if (!s) return;
  var c = s.categories.find(function(x) { return x.id === cid; });
  if (!c) return;
  var container = document.getElementById('items-' + cid);
  if (!container) return;
  container.querySelectorAll('.item-row-mobile').forEach(function(r) { r.remove(); });

  c.items.forEach(function(item) {
    var pct = (item.score !== '' && !isNaN(item.score))
      ? ((parseFloat(item.score) / (parseFloat(item.maxScore) || 100)) * 100).toFixed(1)
      : null;
    var pctColor = pct === null ? 'var(--ink3)'
      : parseFloat(pct) >= 80 ? 'var(--green)'
      : parseFloat(pct) >= 60 ? 'var(--yellow)' : 'var(--red)';
    var locked = item.locked === true;

    var row = document.createElement('div');
    row.className = 'item-row-mobile';
    row.style.cssText = 'display:flex;flex-direction:column;gap:6px;padding:10px 12px;' +
      'border-radius:10px;border:1px solid var(--border);margin-bottom:8px;' +
      'background:var(--card);opacity:' + (locked ? '1' : '0.65');

    // --- Line 1: name | lock | pct | delete ---
    var line1 = document.createElement('div');
    line1.style.cssText = 'display:flex;align-items:center;gap:8px';

    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = tr('itemNamePlaceholder');
    nameInput.value = item.name || '';
    nameInput.readOnly = locked;
    nameInput.style.cssText = 'flex:1;background:none;border:none;font-family:var(--body);' +
      'font-size:13px;font-weight:600;outline:none;min-width:0;color:' +
      (locked ? 'var(--ink)' : 'var(--ink3)');
    nameInput.addEventListener('input', (function(c2, i2) {
      return function() { updateItem(c2, i2, 'name', this.value); };
    })(cid, item.id));

    var lockBtn = document.createElement('button');
    lockBtn.className = 'btn-lock' + (locked ? ' locked' : '');
    lockBtn.textContent = locked ? '🔒' : '🔓';
    lockBtn.addEventListener('click', (function(c2, i2) {
      return function() { toggleLock(c2, i2); };
    })(cid, item.id));

    var pctDiv = document.createElement('div');
    pctDiv.style.cssText = 'font-family:var(--mono);font-size:12px;min-width:40px;text-align:right;color:' +
      (locked ? pctColor : 'var(--ink3)');
    pctDiv.textContent = pct !== null ? pct + '%' : '—';

    var delBtn = document.createElement('button');
    delBtn.className = 'btn-del-sm';
    delBtn.textContent = '×';
    delBtn.addEventListener('click', (function(c2, i2) {
      return function() { removeItem(c2, i2); };
    })(cid, item.id));

    line1.appendChild(nameInput);
    line1.appendChild(lockBtn);
    line1.appendChild(pctDiv);
    line1.appendChild(delBtn);

    // --- Line 2: score inputs ---
    var line2 = document.createElement('div');
    line2.style.cssText = 'display:flex;align-items:center;gap:8px';

    var fromLabel = document.createElement('span');
    fromLabel.style.cssText = 'font-size:11px;color:var(--ink3);min-width:28px';
    fromLabel.textContent = tr('scoreFrom');

    var scoreInput = document.createElement('input');
    scoreInput.type = 'number';
    scoreInput.placeholder = '0';
    scoreInput.step = 'any';
    scoreInput.min = '0';
    scoreInput.value = (item.score !== undefined && item.score !== '') ? item.score : '';
    scoreInput.readOnly = locked;
    scoreInput.style.cssText = 'flex:1;background:var(--bg);border:1px solid var(--border);' +
      'border-radius:7px;padding:6px 10px;font-family:var(--mono);font-size:13px;' +
      'color:var(--ink);outline:none;text-align:center';
    scoreInput.addEventListener('input', (function(c2, i2) {
      return function() { updateItem(c2, i2, 'score', this.value); };
    })(cid, item.id));

    var toLabel = document.createElement('span');
    toLabel.style.cssText = 'font-size:11px;color:var(--ink3)';
    toLabel.textContent = tr('scoreTo');

    var maxInput = document.createElement('input');
    maxInput.type = 'number';
    maxInput.placeholder = '100';
    maxInput.step = 'any';
    maxInput.min = '1';
    maxInput.value = (item.maxScore !== undefined && item.maxScore !== '') ? item.maxScore : '';
    maxInput.readOnly = locked;
    maxInput.style.cssText = 'flex:1;background:var(--bg);border:1px solid var(--border);' +
      'border-radius:7px;padding:6px 10px;font-family:var(--mono);font-size:13px;' +
      'color:var(--ink);outline:none;text-align:center';
    maxInput.addEventListener('input', (function(c2, i2) {
      return function() { updateItem(c2, i2, 'maxScore', this.value); };
    })(cid, item.id));

    line2.appendChild(fromLabel);
    line2.appendChild(scoreInput);
    line2.appendChild(toLabel);
    line2.appendChild(maxInput);

    row.appendChild(line1);
    row.appendChild(line2);
    container.appendChild(row);
  });
}

// ── Constants ──────────────────────────────────────────────────────
const DEFAULT_BOUNDARY = { A:80, 'B+':75, B:70, 'C+':65, C:60, 'D+':55, D:50, F:0 };
const GRADE_LIST = ['A','B+','B','C+','C','D+','D','F'];
const GP_MAP = { A:4.0,'B+':3.5,B:3.0,'C+':2.5,C:2.0,'D+':1.5,D:1.0,F:0.0 };
const GRADE_COLORS = { A:'#1a7a4a','B+':'#2563c4',B:'#2563c4','C+':'#b8860b',C:'#b8860b','D+':'#d4521a',D:'#d4521a',F:'#c0392b' };
const SEG_COLORS = { F:'#c0392b','D':'#c0392b','D+':'#d4521a','C':'#b8860b','C+':'#c9960d',B:'#2563c4','B+':'#3d7ae8',A:'#1a7a4a' };

// ── State ──────────────────────────────────────────────────────────
let data = JSON.parse(localStorage.getItem('scoretracker_v2') || 'null') || {
  terms: [{ id: 1, name: 'เทอม 1/2568', subjects: [] }],
  currentTermId: 1
};
let currentTermId = data.currentTermId;
let currentSubjectId = null;
let idCounter = (function() {
  const stored = parseInt(localStorage.getItem('scoretracker_idcounter') || '0');
  return Math.max(stored, Date.now());
})();
function nextId() {
  // Use max of existing IDs, current counter, and timestamp to prevent collisions
  let max = Math.max(idCounter, Date.now());
  data.terms.forEach(t => t.subjects.forEach(s => {
    max = Math.max(max, s.id);
    s.categories.forEach(c => {
      max = Math.max(max, c.id);
      c.items.forEach(i => max = Math.max(max, i.id));
    });
  }));
  idCounter = max + 1;
  localStorage.setItem('scoretracker_idcounter', String(idCounter));
  return idCounter;
}

function save() {
  data.currentTermId = currentTermId;
  localStorage.setItem('scoretracker_v2', JSON.stringify(data));
  localStorage.setItem('scoretracker_updated', Date.now().toString());
  if (typeof syncToCloud === 'function') syncToCloud();
}

let _saveTimer = null;
function debounceSave() {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => save(), 1000);
}

// บังคับให้หาเทอมด้วยตัวเลขเสมอ ป้องกันบั๊กข้อมูลไม่ตรงกัน
function currentTerm() { return data.terms.find(t => t.id === parseInt(currentTermId)); }
function getSubjects() { return currentTerm()?.subjects || []; }
function getSubject() { return getSubjects().find(s => s.id === parseInt(currentSubjectId)); }

// ... (ข้ามฟังก์ชัน getGrades, addTerm, renameTerm ไป) ...


function toggleTermDropdown() {
  const btn = document.getElementById('term-dropdown-btn');
  const list = document.getElementById('term-dropdown-list');
  if (!btn || !list) return;
  const isOpen = list.classList.contains('open');
  if (isOpen) { closeTermDropdown(); }
  else { list.classList.add('open'); btn.classList.add('open'); }
}
function closeTermDropdown() {
  const btn = document.getElementById('term-dropdown-btn');
  const list = document.getElementById('term-dropdown-list');
  if (btn) btn.classList.remove('open');
  if (list) list.classList.remove('open');
}

function switchTerm(id) {
  const newId = parseInt(id);
  if (isNaN(newId)) return;
  
  currentTermId = newId;
  currentSubjectId = null;
  save(); 
  
  // เคลียร์หน้าจอวิชาเดิมทิ้ง ป้องกันข้อมูลค้าง
  document.getElementById('subject-view').style.display = 'none';
  document.getElementById('subject-name-input').value = '';
  document.getElementById('categories-container').innerHTML = '';
  
  // บังคับวาด Sidebar และ Dashboard ใหม่ทั้งหมด
  renderAll();
  showDashboard();
  
  // อัปเดต Dropdown ในหน้าจอมือถือให้ตรงกัน
  const mobSel = document.getElementById('settings-term-select');
  if(mobSel) mobSel.value = currentTermId;
}

function getGrades(s) {
  const b = s.boundary || DEFAULT_BOUNDARY;
  return GRADE_LIST.map(g => ({ letter:g, gp:GP_MAP[g], min:b[g] }))
    .sort((a,b) => b.min - a.min);
}

// ── Term CRUD ──────────────────────────────────────────────────────
function addTerm() {
  const name = prompt(tr('termPrompt'), `${tr('termDefault')} ${data.terms.length + 1}`);
  if (!name) return;
  const trimmed = name.trim();
  if (!trimmed) return;
  if (data.terms.some(t => t.name.trim() === trimmed)) {
    alert(`"${trimmed}" มีอยู่แล้วค่ะ`);
    return;
  }
  const id = nextId();
  data.terms.push({ id, name: trimmed, subjects: [] });
  save();
  switchTerm(id);
}

function renameTerm() {
  const t = currentTerm(); if (!t) return;
  const name = prompt(tr('renamePrompt'), t.name);
  if (!name) return;
  const trimmed = name.trim();
  if (!trimmed || trimmed === t.name) return;
  if (data.terms.some(x => x.id !== t.id && x.name.trim() === trimmed)) {
    alert(`"${trimmed}" มีอยู่แล้วค่ะ`);
    return;
  }
  t.name = trimmed; save(); renderAll();
  document.getElementById('brand-term-label').textContent = trimmed;
  // Update custom dropdown label
  const dropLabel = document.getElementById('term-dropdown-label');
  if (dropLabel) dropLabel.textContent = trimmed;
}


// ── Subject CRUD ───────────────────────────────────────────────────
function addSubject() {
  const t = currentTerm();
  const id = nextId();
  t.subjects.push({
    id, name:`วิชาใหม่ ${t.subjects.length+1}`,
    credits: 3,
    finalWeight:30, categories:[], note:'',
    boundary: {...DEFAULT_BOUNDARY},
    quickMode: false, quickGrade: null
  });
  save();
  renderSidebar();
  selectSubject(id);
  addCategory('การบ้าน / งาน', 20);
  addCategory('สอบกลางภาค', 30);
  addCategory('เก็บคะแนน', 20);
}

function selectSubject(id) {
  currentSubjectId = id;
  document.getElementById('dash-btn').classList.remove('active');
  document.getElementById('history-btn').classList.remove('active');
  document.getElementById('dashboard-view').style.display = 'none';
  document.getElementById('history-view').style.display = 'none';
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('subject-view').style.display = 'block';
  renderSidebar();
  renderSubjectView();
}

function deleteSubject() {
  if (!confirm(tr('confirmDelete'))) return;
  const t = currentTerm();
  t.subjects = t.subjects.filter(s => s.id !== currentSubjectId);
  currentSubjectId = null;
  save();
  renderSidebar();
  document.getElementById('subject-view').style.display = 'none';
  if (t.subjects.length) { selectSubject(t.subjects[0].id); }
  else { document.getElementById('empty-state').style.display = 'block'; }
}

function renameSubject(name) {
  const s = getSubject(); if (!s) return;
  s.name = name; save(); renderSidebar();
}

function saveNote(val) {
  const s = getSubject(); if (!s) return;
  s.note = val; save();
}

// ── Category CRUD ──────────────────────────────────────────────────
function addCategory(name='หมวดใหม่', weight=10) {
  const s = getSubject(); if (!s) return;
  s.categories.push({ id:nextId(), name, weight, items:[] });
  save(); renderSubjectView();
}

function removeCategory(cid) {
  const s = getSubject(); if (!s) return;
  s.categories = s.categories.filter(c => c.id !== cid);
  save(); renderSubjectView();
}

function updateCategory(cid, field, val) {
  const s = getSubject();
  const c = s.categories.find(c => c.id === cid); if (!c) return;
  c[field] = field==='weight' ? (val==='' ? '' : parseFloat(val)) : val;
  debounceSave(); calculate();
}

// ── Item CRUD ──────────────────────────────────────────────────────
function addItem(cid) {
  const s = getSubject();
  const c = s.categories.find(c => c.id === cid); if (!c) return;
  c.items.push({ id:nextId(), name:'', score:'', maxScore:100 });
  save(); renderItems(cid); calculate();
}

function removeItem(cid, iid) {
  const s = getSubject();
  const c = s.categories.find(c => c.id === cid);
  c.items = c.items.filter(i => i.id !== iid);
  save(); renderItems(cid); calculate();
}

function toggleLock(cid, iid) {
  const s = getSubject();
  const c = s.categories.find(c => c.id===cid);
  const item = c.items.find(i => i.id===iid); if (!item) return;
  item.locked = !item.locked;
  save();
  renderItems(cid);
  updateCategoryStats(cid);
  calculateStats();
}

function updateItem(cid, iid, field, val) {
  const s = getSubject();
  const c = s.categories.find(c => c.id === cid);
  const item = c.items.find(i => i.id === iid); if (!item) return;
  item[field] = field==='name' ? val : (val==='' ? '' : parseFloat(val));
  debounceSave();
  updateItemPct(cid, iid);
  updateCategoryStats(cid);
  calculateStats();
}

// ── Light update helpers (no DOM rebuild) ─────────────────────────
function updateItemPct(cid, iid) {
  const s = getSubject();
  const c = s.categories.find(c => c.id===cid); if (!c) return;
  const item = c.items.find(i => i.id===iid); if (!item) return;
  // find the pct cell in that row - rows are in order
  const container = document.getElementById(`items-${cid}`);
  if (!container) return;
  const rows = container.querySelectorAll('.item-row');
  const idx = c.items.indexOf(item);
  const row = rows[idx]; if (!row) return;
  const pctEl = row.querySelector('.item-pct');
  if (!pctEl) return;
  const pct = item.locked && item.score!==''&&item.score!==null&&!isNaN(item.score)
    ? ((parseFloat(item.score)/(parseFloat(item.maxScore)||100))*100).toFixed(1)
    : null;
  pctEl.textContent = pct!==null ? pct+'%' : '—';
  pctEl.style.color = pct===null?'var(--ink3)':parseFloat(pct)>=80?'var(--green)':parseFloat(pct)>=60?'var(--yellow)':'var(--red)';
}

function updateCategoryStats(cid) {
  const s = getSubject();
  const c = s.categories.find(c => c.id===cid); if (!c) return;
  const card = document.getElementById(`cat-${cid}`); if (!card) return;
  const scored = c.items.filter(i => i.locked === true);
  const avg = scored.length ? scored.reduce((sum,i)=>sum+(parseFloat(i.score)/(parseFloat(i.maxScore)||100))*100,0)/scored.length : null;
  const stats = card.querySelectorAll('.cat-stat strong');
  if(stats[0]) stats[0].textContent = avg!==null?avg.toFixed(1)+'%':'—';
  if(stats[1]) stats[1].textContent = `${scored.length}/${c.items.length}`;
  if(stats[2]) stats[2].textContent = avg!==null?(avg*(parseFloat(c.weight)||0)/100).toFixed(1):'—';
  const fill = card.querySelector('.cat-progress-fill');
  if(fill) fill.style.width=`${avg||0}%`;
}

function calculateStats() {
  // recalculate all stats without rebuilding any DOM
  calculate();
}

// ── Calculation ────────────────────────────────────────────────────
function calcSubject(s) {
  if (!s) return { weightedScore:null, totalWeightUsed:0, rawScore:null, bestCaseScore:null, totalAllWeight:0 };
  // Quick mode shortcut at top
  if (s.quickMode && s.quickGrade) {
    const boundary = s.boundary || DEFAULT_BOUNDARY;
    const minScore = boundary[s.quickGrade] || 0;
    const synScore = s.quickGrade === 'F' ? 25 : minScore + 2;
    return { weightedScore: synScore, totalWeightUsed: 100, rawScore: synScore, bestCaseScore: synScore, totalAllWeight: 100 };
  }
  let totalWeighted = 0, totalWeightUsed = 0;
  let bestCaseWeighted = 0, totalAllWeight = 0;

  (s.categories||[]).forEach(c => {
    const w = parseFloat(c.weight)||0;
    if (w === 0) return;
    // Only count items that are locked as confirmed scores
    const scored = c.items.filter(i => i.locked === true);
    const unscored = c.items.filter(i => i.locked !== true);

    // Always count this category's weight toward total possible
    totalAllWeight += w;

    if (scored.length > 0) {
      // Has some scores — use them for current calculation
      const avg = scored.reduce((sum,i) => sum + (parseFloat(i.score)/(parseFloat(i.maxScore)||100))*100, 0) / scored.length;
      totalWeighted += avg * (w/100);
      totalWeightUsed += w;
      // Best case: scored keep score, unscored assume 100%
      const scoredSum = scored.reduce((sum,i) => sum + (parseFloat(i.score)/(parseFloat(i.maxScore)||100))*100, 0);
      const totalItems = scored.length + unscored.length;
      const bestAvg = (scoredSum + unscored.length * 100) / totalItems;
      bestCaseWeighted += bestAvg * (w/100);
    } else {
      // No scores at all in this category (empty items OR all unscored)
      // Best case: assume 100% for entire category weight
      bestCaseWeighted += 100 * (w/100);
    }
  });

  const weightedScore = totalWeightUsed > 0 ? totalWeighted : null;
  const rawScore = totalWeightUsed > 0 ? (totalWeighted/totalWeightUsed)*100 : null;
  const bestCaseScore = totalAllWeight > 0 ? bestCaseWeighted : null;
  return { weightedScore, totalWeightUsed, rawScore, bestCaseScore, totalAllWeight };
}

function scoreToGrade(score, s) {
  if (s?.quickMode && s?.quickGrade) {
    return { letter: s.quickGrade, gp: GP_MAP[s.quickGrade], min: 0 };
  }
  if (score === null) return null;
  const grades = getGrades(s);
  return grades.find(g => score >= g.min) || grades[grades.length-1];
}

function s_finalWeight(val) {
  const s = getSubject(); if (!s) return;
  s.finalWeight = parseFloat(val)||0;
  debounceSave();
  calculate();
}

function calculate() {
  const s = getSubject(); if (!s) return;
  const fw = parseFloat(document.getElementById('final-weight-input').value)||0;
  s.finalWeight = fw;

  const r = calcSubject(s);
  const score = r.weightedScore;
  const grades = getGrades(s);

  // Stats
  if (score !== null) {
    document.getElementById('stat-raw').textContent = r.rawScore.toFixed(1);
    document.getElementById('stat-raw-sub').textContent = `จาก ${r.totalWeightUsed.toFixed(0)}% ที่มีคะแนน`;
    document.getElementById('stat-weighted').textContent = score.toFixed(1);
    document.getElementById('stat-weighted-sub').textContent = `คะแนนสะสม ไม่รวม final`;

    const needEl = document.getElementById('stat-need');
    const needSub = document.getElementById('stat-need-sub');
    // Check if all items are locked (no more unlocked items across all categories)
    const totalItems = s.categories.reduce((sum,c)=>sum+c.items.length,0);
    const lockedItems = s.categories.reduce((sum,c)=>sum+c.items.filter(i=>i.locked).length,0);
    const allLocked = totalItems > 0 && lockedItems === totalItems;
    // Best possible grade: bestCase + full final
    const bestWithFinal = Math.min((r.bestCaseScore||0) + fw, 100);
    const bestGrade = scoreToGrade(bestWithFinal, s);
    if (allLocked) {
      // All scores confirmed — show real result
      const finalNeeded = fw>0 ? ((60-score)/fw)*100 : null;
      if (finalNeeded===null||finalNeeded<=0) { needEl.textContent='ผ่านแล้ว!'; needEl.style.color='var(--green)'; needSub.textContent='ไม่ต้องพึ่ง Final ก็ผ่าน'; }
      else if (finalNeeded>100) { needEl.textContent='ไม่ผ่านแล้ว'; needEl.style.color='var(--red)'; needSub.textContent='คะแนนไม่พอแม้ Final เต็ม'; }
      else { needEl.textContent=finalNeeded.toFixed(1); needEl.style.color=finalNeeded>80?'var(--red)':finalNeeded>60?'var(--yellow)':'var(--green)'; needSub.textContent=`ต้องได้ใน Final (${fw}%)`; }
    } else if (bestGrade && bestGrade.letter !== 'F') {
      needEl.textContent = bestGrade.letter;
      needEl.style.color = GRADE_COLORS[bestGrade.letter];
      needSub.textContent = `โอกาสถ้าทำทุกอย่างได้เต็ม 💪`;
    } else {
      needEl.textContent = 'F';
      needEl.style.color = GRADE_COLORS['F'];
      needSub.textContent = 'แม้ทำเต็มหมดก็ยังได้ F';
    }

    // Current grade from locked scores only
    const curGrade = scoreToGrade(score, s);
    const gradEl = document.getElementById('stat-grade');
    gradEl.textContent = curGrade ? curGrade.letter : '—';
    gradEl.style.color = curGrade ? GRADE_COLORS[curGrade.letter] : 'var(--ink3)';
    document.getElementById('stat-grade-sub').textContent = `จากคะแนนที่ล็อคแล้ว ${score.toFixed(1)} pts`;

    const pill = document.getElementById('grade-pill');
    const cg = scoreToGrade(score, s);
    if (cg) { pill.textContent=cg.letter; pill.style.color=GRADE_COLORS[cg.letter]; pill.style.borderColor=GRADE_COLORS[cg.letter]; pill.style.background=GRADE_COLORS[cg.letter]+'18'; }
    else { pill.textContent='—'; pill.style.color='var(--ink3)'; pill.style.borderColor='var(--border)'; pill.style.background='none'; }

    document.getElementById('score-detail-line').textContent = `คะแนนสะสม ${score.toFixed(2)} / ${r.totalWeightUsed.toFixed(0)}% | เหลือ final ${fw}%`;

    renderBoundaryBar(score, s, r.bestCaseScore, fw);
  } else {
    ['stat-raw','stat-weighted','stat-need','stat-grade'].forEach(id => { document.getElementById(id).textContent='—'; document.getElementById(id).style.color='var(--ink)'; });
    document.getElementById('score-detail-line').textContent = tr('enterScore');
    document.getElementById('grade-pill').textContent='—';
    renderBoundaryBar(null, s, null, 0);
  }

  renderFinalGrid(score, fw, s, r.bestCaseScore);

  // Weight warning
  const totalW = (s.categories||[]).reduce((sum,c)=>sum+(parseFloat(c.weight)||0),0)+fw;
  const ww = document.getElementById('weight-warn');
  const totalWRounded = Math.round(totalW * 100) / 100;
  if (Math.abs(totalWRounded - 100) < 0.01) { ww.className='weight-warn ok show'; ww.textContent=`✓ น้ำหนักรวม ${totalWRounded.toFixed(1)}% — ครบ 100% แล้ว`; }
  else if (totalWRounded > 100) { ww.className='weight-warn over show'; ww.textContent=`⚠ น้ำหนักรวม ${totalWRounded.toFixed(1)}% — เกิน 100%`; }
  else { ww.className='weight-warn under show'; ww.textContent=`⚠ น้ำหนักรวม ${totalWRounded.toFixed(1)}% — ขาดอีก ${(100 - totalWRounded).toFixed(1)}%`; }

  renderSidebar();
}

// ── Boundary Bar ───────────────────────────────────────────────────
function renderBoundaryBar(score, s, bestCase, fw) {
  const bar = document.getElementById('boundary-bar');
  const marker = document.getElementById('boundary-marker');
  bar.querySelectorAll('.boundary-segment').forEach(e => e.remove());
  bar.querySelectorAll('.boundary-marker-best').forEach(e => e.remove());

  const b = s.boundary || DEFAULT_BOUNDARY;
  const segs = [
    {from:0,      to:b.D,      label:'F',  color:'#7b1010'},
    {from:b.D,    to:b['D+'],  label:'D',  color:'#c0392b'},
    {from:b['D+'],to:b.C,      label:'D+', color:'#d4521a'},
    {from:b.C,    to:b['C+'],  label:'C',  color:'#b8860b'},
    {from:b['C+'],to:b.B,      label:'C+', color:'#c9960d'},
    {from:b.B,    to:b['B+'],  label:'B',  color:'#2563c4'},
    {from:b['B+'],to:b.A,      label:'B+', color:'#3d7ae8'},
    {from:b.A,    to:100,      label:'A',  color:'#1a7a4a'},
  ];

  segs.forEach(seg => {
    const div = document.createElement('div');
    div.className = 'boundary-segment';
    div.style.left = `${seg.from}%`;
    div.style.width = `${seg.to-seg.from}%`;
    div.style.background = seg.color;
    div.textContent = seg.label;
    bar.appendChild(div);
  });

  const labels = document.getElementById('boundary-labels');
  labels.style.position = 'relative';
  labels.style.height = '16px';
  const labelVals = [0, b.D, b['D+'], b.C, b['C+'], b.B, b['B+'], b.A, 100];
  labels.innerHTML = labelVals.map(v => {
    const pct = v; // value IS the percentage position on bar
    const align = v === 0 ? 'left' : v === 100 ? 'right' : 'center';
    const transform = v === 0 ? 'translateX(0)' : v === 100 ? 'translateX(0)' : 'translateX(-50%)';
    const leftOrRight = v === 100 ? 'auto' : `${pct}%`;
    const right = v === 100 ? '0' : 'auto';
    return `<span style="position:absolute;left:${leftOrRight};right:${right};transform:${transform};font-family:var(--mono);font-size:9px;color:var(--ink3);white-space:nowrap">${v}</span>`;
  }).join('');

  if (score !== null) {
    marker.style.left = `${Math.min(Math.max(score,0),100)}%`;
    marker.setAttribute('data-score', score.toFixed(1));
    marker.style.display = 'block';
  } else { marker.style.display = 'none'; }

  // Second marker: best case (all unlocked = 100% + final)
  if (bestCase !== null && fw !== undefined) {
    const bestTotal = Math.min(bestCase + (fw||0), 100);
    const existing = bar.querySelector('.boundary-marker-best');
    const m2 = existing || document.createElement('div');
    m2.className = 'boundary-marker-best';
    m2.style.cssText = `position:absolute;top:-4px;width:3px;height:calc(100% + 8px);background:rgba(255,255,255,0.4);border-radius:99px;z-index:2;transition:left 0.4s cubic-bezier(.4,0,.2,1);left:${bestTotal}%`;
    m2.title = `Best case: ${bestTotal.toFixed(1)}`;
    if (!existing) bar.appendChild(m2);
    else m2.style.left = `${bestTotal}%`;
  }
}

// ── Final Grid ─────────────────────────────────────────────────────
function renderFinalGrid(score, fw, s, bestCase) {
  const grid = document.getElementById('final-grid');
  grid.innerHTML = '';
  const grades = getGrades(s).slice().reverse();
  const r = calcSubject(s);

  grades.forEach(g => {
    const card = document.createElement('div');
    card.className = 'fcard';
    let needText, needClass='';
    if (score===null && bestCase===null) { needText='กรอกคะแนนก่อน'; needClass=''; }
    else if (fw<=0) {
      // no final — use bestCase to see what's still achievable
      const curScore = score||0;
      const best = bestCase||0;
      if (g.letter==='F') { needText='—'; }
      else if (curScore >= g.min) { needText='ผ่านแล้ว ✓'; needClass='easy'; card.classList.add('achievable'); }
      else if (best >= g.min) { needText='ยังทำได้'; needClass='easy'; card.classList.add('achievable'); }
      else { needText='ไม่ได้แล้ว'; needClass='imp'; }
      const cg=scoreToGrade(curScore,s); if(cg&&cg.letter===g.letter) card.classList.add('current-grade');
    }
    else {
      // Use bestCase (all remaining scored = 100%) + final to determine if achievable
      const currentLocked = score||0;   // already-scored portion
      const best = bestCase||0;         // best possible from non-final categories

      const neededFromFinal = ((g.min - best) / fw) * 100; // if all unscored = 100%
      const neededFromFinalCurrent = ((g.min - currentLocked) / fw) * 100; // if nothing changes

      // Check if this is the current grade based on locked scores
      const curGrade = scoreToGrade(currentLocked, s);
      const isCurrentGrade = curGrade && curGrade.letter === g.letter;

      if (g.letter === 'F') { needText='—'; needClass=''; }
      else if (neededFromFinalCurrent <= 0) {
        needText='ผ่านแล้ว ✓'; needClass='easy'; card.classList.add('achievable');
      }
      else if (neededFromFinal > 100) {
        needText='ไม่ได้แล้ว'; needClass='imp';
      }
      else {
        const needed = neededFromFinalCurrent;
        needText = needed.toFixed(1);
        needClass = needed > 80 ? 'hard' : 'easy';
        card.classList.add('achievable');
      }

      if (isCurrentGrade) card.classList.add('current-grade');
    }
    card.innerHTML = `<div class="fl" style="color:${GRADE_COLORS[g.letter]}">${g.letter}</div><div class="fn ${needClass}">${needText}</div>`;
    grid.appendChild(card);
  });

  // Summary: best achievable grade + what grade you get if you score 100 on final
  const summary = document.getElementById('final-summary');
  if (summary && fw > 0) {
    const best = r.bestCaseScore;
    const cur = score||0;
    // Best case: all unscored = 100% + final = 100%
    const bestWithFull = best !== null ? best + fw : null;
    const gradeIfBest = bestWithFull !== null ? scoreToGrade(bestWithFull, s) : null;
    // Current case: current scores + final = 100%
    const gradeIfFull = score !== null ? scoreToGrade(cur + fw, s) : null;
    // Worst case: current scores + final = 0%
    const gradeIfZero = score !== null ? scoreToGrade(cur, s) : null;

    let parts = [];
    if (gradeIfBest && gradeIfBest.letter !== (gradeIfFull?.letter)) {
      parts.push(`ถ้าทำครบทุกอย่าง + Final เต็ม → <strong style="color:${GRADE_COLORS[gradeIfBest.letter]}">${gradeIfBest.letter}</strong>`);
    }
    if (gradeIfFull) {
      parts.push(`ถ้า Final ได้เต็ม 100% → <strong style="color:${GRADE_COLORS[gradeIfFull.letter]}">${gradeIfFull.letter}</strong>`);
    }
    if (gradeIfZero) {
      parts.push(`ถ้า Final ได้ 0% → <strong style="color:${GRADE_COLORS[gradeIfZero.letter]}">${gradeIfZero.letter}</strong>`);
    }
    summary.innerHTML = parts.join('&nbsp;&nbsp;|&nbsp;&nbsp;');
  } else if (summary) {
    summary.innerHTML = '';
  }
}

// ── Render Sidebar ─────────────────────────────────────────────────
function renderSidebar() {
  const t = currentTerm();
  document.getElementById('brand-term-label').textContent = t?.name || '—';

  // Custom term dropdown (replaces native <select>)
  const dropLabel = document.getElementById('term-dropdown-label');
  const dropList = document.getElementById('term-dropdown-list');
  if (dropLabel) dropLabel.textContent = currentTerm()?.name || '—';
  if (dropList) {
    dropList.innerHTML = data.terms.map(t =>
      `<div class="term-dropdown-item${t.id===currentTermId?' active':''}" onclick="switchTerm('${t.id}');closeTermDropdown()">${t.name}</div>`
    ).join('');
  }

  const list = document.getElementById('subject-list');
  list.innerHTML = '';
  getSubjects().forEach(s => {
    const r = calcSubject(s);
    const g = scoreToGrade(r.weightedScore, s);
    const div = document.createElement('div');
    div.className = 'subject-item' + (s.id===currentSubjectId?' active':'');
    div.onclick = () => selectSubject(s.id);
    div.innerHTML = `<span class="subject-item-name">${s.name}</span><span class="subject-item-grade" style="display:flex;gap:4px;align-items:center">${g?g.letter:'—'}<span style="font-size:9px;opacity:0.6">${s.credits||3}cr</span></span>`;
    list.appendChild(div);
  });
}

// ── Render Subject View ────────────────────────────────────────────
function renderSubjectView() {
  const s = getSubject();
  // Guard: if subject not found in current term, go to dashboard
  if (!s) { currentSubjectId = null; showDashboard(); return; }
  document.getElementById('subject-name-input').value = s.name;
  document.getElementById('final-weight-input').value = s.finalWeight||30;
  document.getElementById('credits-input').value = s.credits||3;
  document.getElementById('subject-note').value = s.note||'';
  if (s.quickMode) {
    renderQuickPanel(s);
    updateQuickStats(s);
  } else {
    renderQuickPanel(s);
    renderCategories();
    calculate();
  }
}

function renderCategories() {
  const s = getSubject();
  const container = document.getElementById('categories-container');
  container.innerHTML = '';
  s.categories.forEach(c => {
    const scored = c.items.filter(i => i.locked === true);
    const avg = scored.length ? scored.reduce((sum,i)=>sum+(parseFloat(i.score)/(parseFloat(i.maxScore)||100))*100,0)/scored.length : null;
    const card = document.createElement('div');
    card.className = 'category-card anim';
    card.id = `cat-${c.id}`;
    card.innerHTML = `
      <div class="category-header">
        <div>
          <input class="cat-name-input" value="${c.name}" oninput="updateCategory(${c.id},'name',this.value)">
          <div class="cat-progress"><div class="cat-progress-fill" style="width:${avg||0}%"></div></div>
        </div>
        <div class="cat-stat"><strong>${avg!==null?avg.toFixed(1)+'%':'—'}</strong>เฉลี่ย</div>
        <div class="cat-stat"><strong>${scored.length}/${c.items.length}</strong>ล็อคแล้ว</div>
        <div style="display:flex;align-items:center;gap:3px">
          <input class="weight-input" type="number" step="any" value="${c.weight}" min="0" max="100" oninput="updateCategory(${c.id},'weight',this.value)">
          <span style="font-family:var(--mono);font-size:11px;color:var(--ink3)">%</span>
        </div>
        <div class="cat-stat"><strong style="color:var(--accent2)">${avg!==null?(avg*c.weight/100).toFixed(1):'—'}</strong>ถ่วงน้ำหนัก</div>
        <button class="btn-del-sm" onclick="removeCategory(${c.id})">×</button>
      </div>
    <div class="items-list" id="items-${c.id}">
        <div class="col-header-row hide-mob" style="grid-template-columns:1fr 90px 90px 28px 80px 32px">
          <div class="col-hdr">ชื่องาน/สอบ</div>
          <div class="col-hdr">คะแนนที่ได้</div>
          <div class="col-hdr">คะแนนเต็ม</div>
          <div class="col-hdr" title="ล็อค = นับคะแนนนี้แน่ๆ">🔒</div>
          <div class="col-hdr">%</div>
          <div></div>
        </div>
      </div>
      <button class="btn-add-item" onclick="addItem(${c.id})">+ เพิ่มรายการ</button>`;
    container.appendChild(card);
    renderItems(c.id);
  });
}

function renderItems(cid) {
  const s = getSubject();
  const c = s.categories.find(c => c.id===cid);
  const container = document.getElementById(`items-${cid}`);
  if (!container) return;
  container.querySelectorAll('.item-row').forEach(r => r.remove());

  c.items.forEach(item => {
    const pct = item.score!==''&&!isNaN(item.score) ? ((parseFloat(item.score)/(parseFloat(item.maxScore)||100))*100).toFixed(1) : null;
    const pctColor = pct===null?'var(--ink3)':parseFloat(pct)>=80?'var(--green)':parseFloat(pct)>=60?'var(--yellow)':'var(--red)';
    const locked = item.locked === true;
    const row = document.createElement('div');
    row.className = 'item-row hide-mob';
    row.style.opacity = locked ? '1' : '0.6';
    row.innerHTML = `
      <input type="text" placeholder="เช่น HW1, Midterm..." value="${item.name}" oninput="updateItem(${cid},${item.id},'name',this.value)"
        ${locked?'readonly':''} style="color:${locked?'var(--ink)':'var(--ink3)'};cursor:${locked?'default':'text'}">
      <input type="number" placeholder="0" step="any" value="${item.score}" oninput="updateItem(${cid},${item.id},'score',this.value)" min="0"
        ${locked?'readonly':''} style="color:${locked?'var(--ink)':'var(--ink3)'};cursor:${locked?'default':'text'}">
      <input type="number" placeholder="100" step="any" value="${item.maxScore}" oninput="updateItem(${cid},${item.id},'maxScore',this.value)" min="1"
        ${locked?'readonly':''} style="color:${locked?'var(--ink)':'var(--ink3)'};cursor:${locked?'default':'text'}">
      <button class="btn-lock ${locked?'locked':''}" onclick="toggleLock(${cid},${item.id})" title="${locked?'ล็อคแล้ว — คลิกเพื่อปลดล็อค':'ยังไม่ล็อค — คลิกเพื่อนับคะแนนนี้'}">${locked?'🔒':'🔓'}</button>
      <div class="item-pct" style="color:${locked?pctColor:'var(--ink3)'}">${pct!==null?pct+'%':'—'}</div>
      <button class="btn-del-sm" onclick="removeItem(${cid},${item.id})">×</button>`;
    container.appendChild(row);
  });

  // Mobile: also render card layout
  if (window.innerWidth <= 640) renderItemsMobile(cid);

  // update header stats
  const card = document.getElementById(`cat-${cid}`);
  if (card) {
    const scored = c.items.filter(i=>i.score!==''&&!isNaN(i.score));
    const avg = scored.length ? scored.reduce((sum,i)=>sum+(parseFloat(i.score)/(parseFloat(i.maxScore)||100))*100,0)/scored.length : null;
    const stats = card.querySelectorAll('.cat-stat strong');
    if(stats[0]) stats[0].textContent = avg!==null?avg.toFixed(1)+'%':'—';
    if(stats[1]) stats[1].textContent = `${scored.length}/${c.items.length}`;
    if(stats[2]) stats[2].textContent = avg!==null?(avg*c.weight/100).toFixed(1):'—';
    const fill = card.querySelector('.cat-progress-fill');
    if(fill) fill.style.width=`${avg||0}%`;
  }
}

// ── Grade Boundary Modal ───────────────────────────────────────────
function openBoundaryModal() {
  const s = getSubject(); if (!s) return;
  const b = s.boundary || DEFAULT_BOUNDARY;
  const form = document.getElementById('boundary-form');
  form.innerHTML = GRADE_LIST.filter(g=>g!=='F').map(g => `
    <div class="modal-field">
      <label>${g} ขั้นต่ำ</label>
      <input type="number" id="b_${g.replace('+','p')}" value="${b[g]||0}" min="0" max="100">
    </div>`).join('');
  document.getElementById('boundary-modal').classList.add('open');
}

function closeBoundaryModal() { document.getElementById('boundary-modal').classList.remove('open'); }

function saveBoundary() {
  const s = getSubject(); if (!s) return;
  if (!s.boundary) s.boundary = {...DEFAULT_BOUNDARY};
  GRADE_LIST.filter(g=>g!=='F').forEach(g => {
    const el = document.getElementById(`b_${g.replace('+','p')}`);
    if (el) s.boundary[g] = parseFloat(el.value)||0;
  });
  s.boundary.F = 0;
  save(); closeBoundaryModal(); calculate();
}

function resetBoundary() {
  const s = getSubject(); if (!s) return;
  s.boundary = {...DEFAULT_BOUNDARY};
  save(); closeBoundaryModal(); calculate();
}

// ── Dashboard ──────────────────────────────────────────────────────
function showDashboard() {
  currentSubjectId = null;
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('subject-view').style.display = 'none';
  document.getElementById('history-view').style.display = 'none';
  document.getElementById('dashboard-view').style.display = 'block';
  document.getElementById('dash-btn').classList.add('active');
  document.getElementById('history-btn').classList.remove('active');
  document.querySelectorAll('.subject-item').forEach(e => e.classList.remove('active'));
  renderDashboard();
}

let chartInstances = {};
function destroyChart(id) { if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; } }

function renderDashboard() {
  const dv = document.getElementById('dashboard-view');
  const subjects = getSubjects();

  if (!subjects.length) {
    dv.innerHTML = '<div class="dash-empty"><div style="font-size:32px;margin-bottom:12px">📊</div><div>เพิ่มวิชาก่อนเพื่อดู Dashboard</div></div>';
    return;
  }

  const rows = subjects.map(s => {
    const r = calcSubject(s);
    const g = scoreToGrade(r.weightedScore, s);
    const fw = s.finalWeight||30;
    const needC = (r.weightedScore!==null&&fw>0&&!s.quickMode) ? ((50-r.weightedScore)/fw)*100 : null;
    return { s, score:r.weightedScore, grade:g, needC, fw };
  });

  const graded = rows.filter(r=>r.grade);
  const totalCredits = graded.reduce((sum,r)=>sum+(parseFloat(r.s.credits)||3),0);
  const avgGPA = graded.length && totalCredits>0
    ? Math.floor(graded.reduce((sum,r)=>sum+r.grade.gp*(parseFloat(r.s.credits)||3),0)/totalCredits * 100) / 100
    : null;
  const atRisk = rows.filter(r=>r.grade&&r.grade.gp<1.0&&!r.s.quickMode);
  const needFinal = rows.filter(r=>r.needC!==null&&r.needC>0&&r.needC<=100);
  const passCount = rows.filter(r=>r.grade&&r.grade.gp>=1.0).length;
  const hasScore = rows.filter(r=>r.score!==null).length;
  const gpaColor = avgGPA===null?'rgba(255,255,255,0.5)':avgGPA>=3.0?'#4af7a0':avgGPA>=2.0?'#f7c94a':'#f76a6a';

  const alertsHtml = atRisk.map(r =>
    `<div class="dash-alert">⚠ <strong>${r.s.name}</strong> — คะแนนปัจจุบัน ${r.score!==null?r.score.toFixed(1):'—'} (เกรด ${r.grade.letter}) อาจไม่ผ่าน</div>`
  ).join('');

 const tableRows = rows.map(r => {
    const gc = r.grade ? GRADE_COLORS[r.grade.letter] : 'var(--ink3)';
    const pct = r.score!==null ? Math.min(r.score,100) : 0;
    const needText = r.needC===null?'—':r.needC<=0?'ผ่านแล้ว ✓':r.needC>100?'ไม่ผ่านแล้ว':r.needC.toFixed(1);
    const needColor = r.needC===null?'var(--ink3)':r.needC<=0?'var(--green)':r.needC>100?'var(--red)':r.needC>80?'var(--red)':'var(--ink2)';
    
    return `<div class="dash-row" onclick="selectSubject(${r.s.id})">
      <div class="dash-row-name">${r.s.name}</div>
      <div class="dash-row-val hide-mob">${r.s.credits||3}</div>
      <div class="dash-row-val">${r.score!==null?r.score.toFixed(1):'—'}</div>
      <div class="hide-mob"><div class="dash-progress-bar"><div class="dash-progress-fill" style="width:${pct}%;background:${gc}"></div></div></div>
      <div><div class="dash-grade-badge" style="color:${gc};border-color:${gc}20;background:${gc}15">${r.grade?r.grade.letter:'—'}</div></div>
      <div class="dash-row-val hide-mob">${r.grade?r.grade.gp.toFixed(1):'—'}</div>
      <div class="dash-row-val hide-mob" style="color:${needColor}">${needText}</div>
    </div>`;
  }).join('');

  dv.innerHTML = `
    <div class="dash-hero">
      <div>
        <div class="dash-hero-label">GPA เทอมนี้</div>
        <div class="dash-hero-gpa" style="color:${gpaColor}">${avgGPA!==null?avgGPA.toFixed(2):'—'}</div>
        <div class="dash-hero-sub">${currentTerm().name}</div>
      </div>
      <div style="text-align:right">
        <div style="font-family:var(--mono);font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:3px">วิชาทั้งหมด</div>
        <div style="font-family:var(--mono);font-size:32px;color:white">${subjects.length}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:6px">มีคะแนน ${hasScore} วิชา</div>
      </div>
    </div>
    ${alertsHtml}
    <div class="dash-stats">
      <div class="dash-stat"><div class="dash-stat-label">วิชาที่ผ่าน (≥D)</div><div class="dash-stat-value" style="color:var(--green)">${passCount}<span style="font-size:15px;color:var(--ink3)"> / ${subjects.length}</span></div><div class="dash-stat-sub">เกรด D ขึ้นไป</div></div>
      <div class="dash-stat"><div class="dash-stat-label">วิชาที่เสี่ยง</div><div class="dash-stat-value" style="color:${atRisk.length?'var(--red)':'var(--green)'}">${atRisk.length}</div><div class="dash-stat-sub">ต่ำกว่าเกรด D</div></div>
      <div class="dash-stat"><div class="dash-stat-label">ต้องสู้ Final</div><div class="dash-stat-value" style="color:var(--accent)">${needFinal.length}</div><div class="dash-stat-sub">วิชาที่ยังต้องทำ final</div></div>
      <div class="dash-stat"><div class="dash-stat-label">หน่วยกิตรวม</div><div class="dash-stat-value" style="color:var(--accent2)">${totalCredits}</div><div class="dash-stat-sub">credit ที่มีเกรดแล้ว</div></div>
    </div>
    <div class="charts-grid">
      <div class="chart-box"><div class="section-label">คะแนนแต่ละวิชา</div><canvas id="scoreChart"></canvas></div>
      <div class="chart-box"><div class="section-label">การกระจายเกรด</div><canvas id="gradeChart"></canvas></div>
    </div>
    <div class="dash-table-wrap">
      <div class="dash-table-header"><div>วิชา</div><div style="text-align:center">คะแนนสะสม</div><div>ความคืบหน้า</div><div style="text-align:center">เกรด</div><div style="text-align:center">เกรดพอยต์</div><div style="text-align:center">Final ที่ต้องได้</div></div>
      ${tableRows}
    </div>
    <div style="text-align:right;margin-top:8px">
      <button class="btn btn-outline" onclick="exportAllCSV()" style="font-size:12px">⬇ Export CSV ทั้งหมด</button>
    </div>`;

  // Charts
  destroyChart('scoreChart'); destroyChart('gradeChart');
  const isDark = document.documentElement.getAttribute('data-theme')==='dark';
  const textColor = isDark ? '#9e9690' : '#6b6560';
  const gridColor = isDark ? '#2e2b28' : '#e8e2d9';

  const scoreCtx = document.getElementById('scoreChart');
  if (scoreCtx) {
    chartInstances['scoreChart'] = new Chart(scoreCtx, {
      type:'bar',
      data:{
        labels: rows.map(r=>r.s.name.substring(0,12)),
        datasets:[{
          label:'คะแนนสะสม',
          data: rows.map(r=>r.score!==null?parseFloat(r.score.toFixed(1)):0),
          backgroundColor: rows.map(r=>r.grade?GRADE_COLORS[r.grade.letter]+'99':'#b0a89e66'),
          borderColor: rows.map(r=>r.grade?GRADE_COLORS[r.grade.letter]:'#b0a89e'),
          borderWidth:1.5, borderRadius:6
        }]
      },
      options:{ responsive:true, plugins:{legend:{display:false}}, scales:{
        x:{ticks:{color:textColor,font:{size:10}},grid:{color:gridColor}},
        y:{min:0,max:100,ticks:{color:textColor,font:{size:10}},grid:{color:gridColor}}
      }}
    });
  }

  const gradeCounts = {};
  GRADE_LIST.forEach(g=>gradeCounts[g]=0);
  rows.forEach(r=>{ if(r.grade) gradeCounts[r.grade.letter]++; });
  const gradeCtx = document.getElementById('gradeChart');
  if (gradeCtx) {
    chartInstances['gradeChart'] = new Chart(gradeCtx, {
      type:'doughnut',
      data:{
        labels: GRADE_LIST.filter(g=>gradeCounts[g]>0),
        datasets:[{ data: GRADE_LIST.filter(g=>gradeCounts[g]>0).map(g=>gradeCounts[g]), backgroundColor: GRADE_LIST.filter(g=>gradeCounts[g]>0).map(g=>GRADE_COLORS[g]+'cc'), borderWidth:0 }]
      },
      options:{ responsive:true, plugins:{ legend:{ position:'right', labels:{color:textColor,font:{size:11},padding:12} } } }
    });
  }
}

// ── History View ───────────────────────────────────────────────────
function showHistory() {
  currentSubjectId = null;
  document.getElementById('empty-state').style.display='none';
  document.getElementById('subject-view').style.display='none';
  document.getElementById('dashboard-view').style.display='none';
  document.getElementById('history-view').style.display='block';
  document.getElementById('dash-btn').classList.remove('active');
  document.getElementById('history-btn').classList.add('active');
  document.querySelectorAll('.subject-item').forEach(e=>e.classList.remove('active'));
  renderHistory();
}

function renderHistory() {
  const hv = document.getElementById('history-view');
  const termData = data.terms.map(t => {
    const subjects = t.subjects;
    const gradedPairs = subjects.map(s => { const r=calcSubject(s); const g=scoreToGrade(r.weightedScore,s); return g?{g,credits:s.credits||3}:null; }).filter(Boolean);
    const totCr = gradedPairs.reduce((sum,p)=>sum+p.credits,0);
    const gpa = gradedPairs.length && totCr>0 ? Math.floor(gradedPairs.reduce((sum,p)=>sum+p.g.gp*p.credits,0)/totCr * 100) / 100 : null;
    return { name:t.name, gpa, count:subjects.length, passCount:gradedPairs.filter(p=>p.g.gp>=1).length };
  });

  const tableRows = termData.map(t => {
    const gpaColor = t.gpa===null?'var(--ink3)':t.gpa>=3?'var(--green)':t.gpa>=2?'var(--yellow)':'var(--red)';
    return `<tr>
      <td>${t.name}</td>
      <td>${t.count} วิชา</td>
      <td>${t.passCount} / ${t.count}</td>
      <td style="font-family:var(--mono);font-size:16px;font-weight:500;color:${gpaColor}">${t.gpa!==null?t.gpa.toFixed(2):'—'}</td>
    </tr>`;
  }).join('');

  const allGradedPairs = data.terms.flatMap(t=>t.subjects.map(s=>{const r=calcSubject(s);const g=scoreToGrade(r.weightedScore,s);return g?{g,credits:s.credits||3}:null;})).filter(Boolean);
  const allCredits = allGradedPairs.reduce((sum,p)=>sum+p.credits,0);
  const cumGPA = allGradedPairs.length && allCredits>0 ? Math.floor(allGradedPairs.reduce((sum,p)=>sum+p.g.gp*p.credits,0)/allCredits * 100) / 100 : null;
  const cumColor = cumGPA===null?'rgba(255,255,255,0.5)':cumGPA>=3?'#4af7a0':cumGPA>=2?'#f7c94a':'#f76a6a';

  hv.innerHTML = `
    <div class="dash-hero">
      <div>
        <div class="dash-hero-label">GPA สะสมทุกเทอม (Cumulative GPA)</div>
        <div class="dash-hero-gpa" style="color:${cumColor}">${cumGPA!==null?cumGPA.toFixed(2):'—'}</div>
        <div class="dash-hero-sub">จาก ${data.terms.length} เทอม | ${allGradedPairs.length} วิชา</div>
      </div>
    </div>
    <div class="chart-box" style="margin-bottom:18px">
      <div class="section-label">GPA แต่ละเทอม</div>
      <canvas id="termChart" style="max-height:220px"></canvas>
    </div>
    <div class="dash-table-wrap">
      <div style="padding:12px 18px;background:var(--card);border-bottom:1px solid var(--border)">
        <span style="font-family:var(--mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--ink3)">ประวัติแต่ละเทอม</span>
      </div>
      <table class="term-history-table" style="width:100%">
        <thead><tr><th>เทอม</th><th>วิชาทั้งหมด</th><th>วิชาที่ผ่าน</th><th>GPA</th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>`;

  setTimeout(() => {
  destroyChart('termChart');
  const isDark = document.documentElement.getAttribute('data-theme')==='dark';
  const textColor = isDark?'#9e9690':'#6b6560';
  const gridColor = isDark?'#2e2b28':'#e8e2d9';
  const ctx = document.getElementById('termChart');
  if (ctx && termData.length) {
    chartInstances['termChart'] = new Chart(ctx, {
      type:'line',
      data:{
        labels: termData.map(t=>t.name),
        datasets:[{ label:'GPA', data:termData.map(t=>t.gpa), borderColor:GRADE_COLORS['B+'], backgroundColor:GRADE_COLORS['B+']+'22', tension:0.4, fill:true, pointBackgroundColor:GRADE_COLORS['B+'], pointRadius:5 }]
      },
      options:{ responsive:true, plugins:{legend:{display:false}}, scales:{
        x:{ticks:{color:textColor,font:{size:11}},grid:{color:gridColor}},
        y:{min:0,max:4,ticks:{color:textColor,font:{size:11},stepSize:1},grid:{color:gridColor}}
      }}
    });
  }
  }, 50);
}

// ── Export / Import ────────────────────────────────────────────────
function exportJSON() {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `scoretracker_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

function importJSON(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      // Validate structure
      if (!parsed || !Array.isArray(parsed.terms) || parsed.terms.length === 0) {
        alert(tr('invalidFile')); return;
      }
      // Ensure each term has required fields
      for (const term of parsed.terms) {
        if (!term.id || !Array.isArray(term.subjects)) {
          alert(tr('invalidFile')); return;
        }
        // Ensure each subject has categories array
        for (const sub of term.subjects) {
          if (!Array.isArray(sub.categories)) sub.categories = [];
        }
      }
      if (!confirm(tr('confirmImport'))) return;
      data = parsed;
      currentTermId = data.currentTermId || data.terms[0]?.id;
      currentSubjectId = null;
      save(); renderAll(); showDashboard();
    } catch(err) { alert(tr('invalidJSON')); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function exportSubjectCSV() {
  const s = getSubject(); if (!s) return;
  const r = calcSubject(s);
  const g = scoreToGrade(r.weightedScore, s);
  let csv = `วิชา,${s.name}\nคะแนนสะสม,${r.weightedScore!==null?r.weightedScore.toFixed(2):'—'}\nเกรด,${g?g.letter:'—'}\n\n`;
  csv += 'หมวด,น้ำหนัก%,ชื่อรายการ,คะแนนที่ได้,คะแนนเต็ม,%\n';
  s.categories.forEach(c => {
    c.items.forEach(item => {
      const pct = item.score!==''&&!isNaN(item.score)?((parseFloat(item.score)/(parseFloat(item.maxScore)||100))*100).toFixed(1):'—';
      csv += `${c.name},${c.weight}%,${item.name},${item.score},${item.maxScore},${pct}%\n`;
    });
  });
  const blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download=`${s.name}_scores.csv`; a.click();
}

function exportAllCSV() {
  let csv = 'เทอม,วิชา,คะแนนสะสม,เกรด,เกรดพอยต์\n';
  data.terms.forEach(t => {
    t.subjects.forEach(s => {
      const r = calcSubject(s);
      const g = scoreToGrade(r.weightedScore, s);
      csv += `${t.name},${s.name},${r.weightedScore!==null?r.weightedScore.toFixed(2):'—'},${g?g.letter:'—'},${g?g.gp:'—'}\n`;
    });
  });
  const blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download=`scoretracker_all_${new Date().toISOString().slice(0,10)}.csv`; a.click();
}

// ── Dark Mode ──────────────────────────────────────────────────────
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme')==='dark';
  const newTheme = isDark?'light':'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  document.getElementById('theme-btn').textContent = isDark?'🌙 Dark':'☀️ Light';
  localStorage.setItem('scoretracker_theme', newTheme);
  // re-render charts
  if (document.getElementById('dashboard-view').style.display!=='none') renderDashboard();
  if (document.getElementById('history-view').style.display!=='none') renderHistory();
}

// ── Credits ───────────────────────────────────────────────────────
function updateCredits(val) {
  const s = getSubject(); if (!s) return;
  const parsed = parseFloat(val);
  s.credits = (!isNaN(parsed) && parsed >= 0) ? parsed : 0;
  debounceSave();
}

// ── Quick Mode ────────────────────────────────────────────────────
function toggleQuickMode() {
  const s = getSubject(); if (!s) return;
  const goingQuick = !s.quickMode;

  // Warn if switching TO quick mode but already has scored items
  if (goingQuick) {
    const hasScores = s.categories.some(c =>
      c.items.some(i => i.score !== '' && i.score !== undefined)
    );
    if (hasScores) {
      const ok = confirm('มีคะแนนที่กรอกไว้อยู่แล้ว\nถ้าสลับเป็นโหมดเทอมเก่า คะแนนจะถูกซ่อน (ไม่ได้ถูกลบ)\nต้องการดำเนินการต่อไหม?');
      if (!ok) return;
    }
  }

  // Warn if switching BACK to normal mode but has a quick grade set
  if (!goingQuick && s.quickGrade) {
    const ok = confirm('สลับกลับโหมดกรอกคะแนน?\nเกรดที่เลือกไว้ใน Quick Mode จะถูกล้าง แต่คะแนนเดิมยังอยู่ครบค่ะ');
    if (!ok) return;
  }

  s.quickMode = goingQuick;
  if (!s.quickMode) s.quickGrade = null;
  save();
  renderSubjectView();
}

function setQuickGrade(letter) {
  const s = getSubject(); if (!s) return;
  s.quickGrade = s.quickGrade === letter ? null : letter;
  save();
  renderSidebar();
  renderQuickPanel(s);
  updateQuickStats(s);
}

function renderQuickPanel(s) {
  const panel = document.getElementById('quick-mode-panel');
  const btn = document.getElementById('quick-mode-btn');
  const catSection = document.getElementById('categories-container');
  const addCatBtn = document.querySelector('.btn-add-category');
  const noteSection = document.querySelector('#subject-note')?.closest('.section-box');
  const boundarySection = document.querySelector('.boundary-section') || document.querySelector('[id="boundary-bar"]')?.closest('.section-box');

  if (!s.quickMode) {
    panel.style.display = 'none';
    btn.textContent = '📋 โหมดเทอมเก่า';
    btn.style.borderColor = '';
    btn.style.color = '';
    if (catSection) catSection.style.display = '';
    if (addCatBtn) addCatBtn.style.display = '';
    return;
  }

  panel.style.display = 'block';
  btn.textContent = '✏️ โหมดกรอกคะแนน';
  btn.style.borderColor = 'var(--accent)';
  btn.style.color = 'var(--accent)';
  if (catSection) catSection.style.display = 'none';
  if (addCatBtn) addCatBtn.style.display = 'none';

  const btns = document.getElementById('quick-grade-buttons');
  btns.innerHTML = GRADE_LIST.map(g => {
    const selected = s.quickGrade === g;
    const color = GRADE_COLORS[g];
    return `<button class="quick-grade-btn ${selected?'selected':''}"
      style="${selected?`background:${color};border-color:${color}`:`border-color:${color}30;color:${color}`}"
      onclick="setQuickGrade('${g}')">${g}</button>`;
  }).join('');
}

function updateQuickStats(s) {
  if (!s.quickMode || !s.quickGrade) return;
  const g = GRADE_LIST.find(gl => gl === s.quickGrade);
  const gp = GP_MAP[g];
  const color = GRADE_COLORS[g];

  // Update pill
  const pill = document.getElementById('grade-pill');
  pill.textContent = g; pill.style.color = color;
  pill.style.borderColor = color; pill.style.background = color+'18';

  // Update stat cards
  document.getElementById('stat-raw').textContent = g;
  document.getElementById('stat-raw').style.color = color;
  document.getElementById('stat-raw-sub').textContent = `เกรดพอยต์ ${gp.toFixed(1)}`;
  document.getElementById('stat-weighted').textContent = gp.toFixed(1);
  document.getElementById('stat-weighted-sub').textContent = 'เกรดพอยต์';
  document.getElementById('stat-need').textContent = '—';
  document.getElementById('stat-need-sub').textContent = 'บันทึกเกรดสำเร็จ';
  document.getElementById('stat-grade').textContent = g;
  document.getElementById('stat-grade').style.color = color;
  document.getElementById('stat-grade-sub').textContent = 'เกรดที่บันทึกไว้';
  document.getElementById('score-detail-line').textContent = `เทอมเก่า — เกรด ${g} (${gp.toFixed(1)} เกรดพอยต์)`;
}

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
if (getSubjects().length > 0) {
  showDashboard();
} else {
  document.getElementById('empty-state').style.display = 'block';
}

// ══════════════════════════════════════════════════════════════════
// CLOUD SYNC — Supabase
// ══════════════════════════════════════════════════════════════════
const SUPABASE_URL = 'https://axbviopnyuhievypqerq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_f5SUg0uW_IieQNAxnwEF_Q_9IW7o69p';

let supabaseClient = null;
let currentUser = null;
let syncTimeout = null;

// Init Supabase
async function initSupabase() {
  if (typeof window.supabase === 'undefined') return;
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // Check existing session
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    currentUser = session.user;
    onSignedIn();
  }

  // Listen for auth changes
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      currentUser = session.user;
      onSignedIn();
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
      onSignedOut();
    }
  });
}

async function onSignedIn() {
  updateSyncUI(true);
  await loadFromCloud();
}

function onSignedOut() {
  updateSyncUI(false);
}

// Sign in with Google
async function signInGoogle() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { 
      // เปลี่ยนบรรทัดนี้ เพื่อให้รันได้ทั้งตอนเทสต์ (127.0.0.1) และตอนขึ้นเว็บจริง (github.io)
      redirectTo: window.location.origin + window.location.pathname 
    }
  });
}

// Sign out
async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('scoretracker')) {
      localStorage.removeItem(key);
    }
  });
  window.location.reload(); 
}

// Save to cloud (debounced)
// Save to cloud (แบบ Upsert ป้องกันข้อมูลเบิ้ล 100%)
function syncToCloud() {
  if (!currentUser || !supabaseClient) return;
  clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      const { error } = await supabaseClient
        .from('user_data')
        .upsert({ 
          user_id: currentUser.id, 
          data: data, 
          updated_at: new Date().toISOString() 
        }, { onConflict: 'user_id' }); // บังคับว่าถ้า user_id ซ้ำให้ Update ตัวเดิมทันที

      if (!error) {
        showSyncStatus('☁️ ซิงค์แล้ว', 'var(--green)');
        // เก็บเวลาที่ซิงค์สำเร็จล่าสุดลงเครื่องด้วย
        localStorage.setItem('scoretracker_updated', Date.now().toString());
      } else {
        showSyncStatus('⚠️ ซิงค์ไม่สำเร็จ', 'var(--red)');
      }
    } catch(e) {
      showSyncStatus('⚠️ ซิงค์ไม่สำเร็จ', 'var(--red)');
    }
  }, 1500);
}

// Load from cloud
// Load from cloud (อัปเดตใหม่ ป้องกันข้อมูลว่างเปล่าไปทับ Cloud)
// Load from cloud (อัปเดตใหม่ บังคับรีเฟรชหน้าจอเมื่อดึงข้อมูลเสร็จ)
// Load from cloud (อัปเดตใหม่ ป้องกันการรีเฟรชวนลูป และบังคับอัปเดตหน้าจอ 100%)
// Load from cloud (ฉบับปรับปรุง: บังคับโหลดข้อมูลเก่าและรีเฟรชหน้าจอ)
async function loadFromCloud() {
  if (!currentUser || !supabaseClient) return;
  try {
    showSyncStatus('⏳ กำลังดึงข้อมูลจาก Cloud...', 'var(--ink3)');
    const { data: rows, error } = await supabaseClient
      .from('user_data')
      .select('data, updated_at')
      .eq('user_id', currentUser.id)
      .maybeSingle();

    // ถ้าไม่มีข้อมูลบน Cloud เลย ให้ส่งข้อมูลในเครื่องนี้ขึ้นไปแทน
    if (error || !rows || !rows.data) {
      syncToCloud();
      showSyncStatus('☁️ ซิงค์แล้ว (เริ่มข้อมูลใหม่)', 'var(--green)');
      return;
    }

    const cloudDataString = JSON.stringify(rows.data);
    const localDataString = localStorage.getItem('scoretracker_v2') || '';
    
    const cloudTime = new Date(rows.updated_at).getTime();
    const localTime = parseInt(localStorage.getItem('scoretracker_updated') || '0');

    // เช็คว่าเครื่องนี้ "ว่างเปล่า" หรือไม่
    const isLocalEmpty = data.terms.length === 1 && data.terms[0].subjects.length === 0;

    // 🚀 เงื่อนไขสำคัญ: ถ้าข้อมูลไม่เหมือนกัน และ (เครื่องว่าง หรือ Cloud ใหม่กว่า) ให้ดึงลงมา!
    if (cloudDataString !== localDataString && (isLocalEmpty || cloudTime > localTime)) {
      
      // 1. บังคับบันทึกข้อมูลจาก Cloud ลงเครื่องทันที
      localStorage.setItem('scoretracker_v2', cloudDataString);
      localStorage.setItem('scoretracker_updated', Date.now().toString());
      
      // 2. 🌟 บังคับโหลดหน้าเว็บใหม่ เพื่อให้ JavaScript โหลดข้อมูลชุดนี้ขึ้นมาแสดง
      window.location.reload();
      
    } else {
      showSyncStatus('☁️ ข้อมูลปัจจุบันซิงค์แล้ว', 'var(--green)');
    }
  } catch(e) {
    console.error("Cloud Load Error:", e);
    showSyncStatus('⚠️ โหลดไม่สำเร็จ', 'var(--red)');
  }
}

// UI helpers
function showSyncStatus(msg, color) {
  // ทำให้มันอัปเดตสถานะทั้งบน PC และ มือถือ
  document.querySelectorAll('#sync-status, .sync-status-text').forEach(el => {
    el.textContent = msg; 
    el.style.color = color;
  });
}

function updateSyncUI(signedIn) {
  // ทำให้ปุ่มล็อกอิน ซ่อน/แสดง พร้อมกันทั้ง 2 ที่
  document.querySelectorAll('#btn-signin, .btn-signin-action').forEach(el => el.style.display = signedIn ? 'none' : 'flex');
  document.querySelectorAll('#btn-signout, .btn-signout-action').forEach(el => el.style.display = signedIn ? 'block' : 'none');
  document.querySelectorAll('#sync-user, .sync-user-text').forEach(el => el.textContent = signedIn ? (currentUser?.email || '') : '');
}


// Start
initSupabase();