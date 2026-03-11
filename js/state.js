// ── State ──────────────────────────────────────────────────────────
let data = JSON.parse(localStorage.getItem('scoretracker_v2') || 'null') || {
  terms: [{ id: 1, name: 'เทอม 1/2568', subjects: [], gradeMode: 'uni' }],
  currentTermId: 1
};
// Migration: ensure all terms have gradeMode, then save back
let _needsMigration = false;
data.terms.forEach(t => { if (!t.gradeMode) { t.gradeMode = 'uni'; _needsMigration = true; } });
if (_needsMigration) {
  localStorage.setItem('scoretracker_v2', JSON.stringify(data));
}
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
  if (list.classList.contains('open')) { closeTermDropdown(); }
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
  const term = currentTerm();
  if (term && term.gradeMode === 'k12') {
    const kb = s.boundary || K12_DEFAULT_BOUNDARY;
    return K12_GRADE_LIST.map(g => ({ letter:g, gp:K12_GP_MAP[g], min:kb[g] }))
      .filter(g => g.min !== undefined)
      .sort((a,b) => b.min - a.min);
  }
  const b = s.boundary || DEFAULT_BOUNDARY;
  return GRADE_LIST.map(g => ({ letter:g, gp:GP_MAP[g], min:b[g] }))
    .sort((a,b) => b.min - a.min);
}