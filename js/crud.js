// ── Term CRUD ──────────────────────────────────────────────────────
function addTerm() {
  showAddTermModal();
}

function showAddTermModal() {
  // Remove existing modal if any
  const existing = document.getElementById('add-term-modal');
  if (existing) existing.remove();

  const termNum = data.terms.length + 1;
  const modal = document.createElement('div');
  modal.id = 'add-term-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML = `
    <div style="background:#1a1714;border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px;width:100%;max-width:400px;box-shadow:0 24px 80px rgba(0,0,0,0.5);">
      <div style="font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--accent);text-transform:uppercase;margin-bottom:6px;">${tr('newTermTitle')}</div>
      <div style="font-family:var(--body);font-size:18px;font-weight:700;color:#ede9e3;margin-bottom:20px;">${tr('newTermSettings')}</div>

      <div style="margin-bottom:16px;">
        <div style="font-size:12px;color:rgba(255,255,255,0.4);font-family:var(--mono);margin-bottom:8px;">${tr('newTermNameLabel')}</div>
        <input id="add-term-name" type="text" value="${tr('termDefault')} ${termNum}"
          style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#ede9e3;font-family:var(--body);font-size:14px;padding:10px 14px;outline:none;">
      </div>

      <div style="margin-bottom:24px;">
        <div style="font-size:12px;color:rgba(255,255,255,0.4);font-family:var(--mono);margin-bottom:10px;">${tr('newTermGradeSystem')}</div>
        <div style="display:flex;gap:10px;">
          <button id="mode-uni" onclick="selectTermMode('uni')"
            style="flex:1;padding:14px 10px;border-radius:12px;border:2px solid var(--accent);background:rgba(212,82,26,0.15);color:#ede9e3;font-family:var(--body);font-size:13px;font-weight:700;cursor:pointer;transition:all 0.18s;text-align:center;">
            🎓<br><span style="font-size:12px;font-weight:700;">${tr('newTermUni')}</span><br>
            <span style="font-size:10px;color:rgba(255,255,255,0.4);font-weight:400;">${tr('newTermUniSub')}</span>
          </button>
          <button id="mode-k12" onclick="selectTermMode('k12')"
            style="flex:1;padding:14px 10px;border-radius:12px;border:2px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(237,233,227,0.5);font-family:var(--body);font-size:13px;font-weight:700;cursor:pointer;transition:all 0.18s;text-align:center;">
            🏫<br><span style="font-size:12px;font-weight:700;">${tr('newTermK12')}</span><br>
            <span style="font-size:10px;color:rgba(255,255,255,0.4);font-weight:400;">${tr('newTermK12Sub')}</span>
          </button>
        </div>
      </div>

      <div style="display:flex;gap:10px;">
        <button onclick="document.getElementById('add-term-modal').remove()"
          style="flex:1;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;color:rgba(237,233,227,0.6);font-family:var(--body);font-size:14px;cursor:pointer;">
          ${tr('newTermCancel')}
        </button>
        <button onclick="confirmAddTerm()"
          style="flex:2;padding:12px;background:var(--accent);border:none;border-radius:12px;color:white;font-family:var(--body);font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(212,82,26,0.3);">
          ${tr('newTermCreate')}
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  window._addTermMode = 'uni';
  setTimeout(() => { const inp = document.getElementById('add-term-name'); if(inp){ inp.focus(); inp.select(); }}, 100);
}

window.selectTermMode = function(mode) {
  window._addTermMode = mode;
  const uni = document.getElementById('mode-uni');
  const k12 = document.getElementById('mode-k12');
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

window.confirmAddTerm = function() {
  const nameEl = document.getElementById('add-term-name');
  if (!nameEl) return;
  const trimmed = nameEl.value.trim();
  if (!trimmed) { nameEl.focus(); return; }
  if (data.terms.some(t => t.name.trim() === trimmed)) {
    alert(trf('alertDuplicate', {name: trimmed})); return;
  }
  const id = nextId();
  const gradeMode = window._addTermMode || 'uni';
  data.terms.push({ id, name: trimmed, subjects: [], gradeMode });
  save();
  document.getElementById('add-term-modal').remove();
  switchTerm(id);
};

function renameTerm() {
  const t = currentTerm(); if (!t) return;
  const name = prompt(tr('renamePrompt'), t.name);
  if (!name) return;
  const trimmed = name.trim();
  if (!trimmed || trimmed === t.name) return;
  if (data.terms.some(x => x.id !== t.id && x.name.trim() === trimmed)) {
    alert(trf('alertDuplicate', {name: trimmed}));
    return;
  }
  t.name = trimmed; save(); renderAll();
  document.getElementById('brand-term-label').textContent = trimmed;
  const _dl = document.getElementById('term-dropdown-label');
  if (_dl) _dl.textContent = trimmed;
}


function deleteTerm() {
  const t = currentTerm();
  if (!t) return;
  const confirmed = confirm(trf('confirmDeleteTerm', {name: t.name, subs: t.subjects.length > 0 ? trf('confirmDeleteTermSubs', {n: t.subjects.length}) : ''}));
  if (!confirmed) return;
  const idx = data.terms.findIndex(x => x.id === t.id);
  data.terms.splice(idx, 1);

  // If no terms left, create a fresh one automatically
  if (data.terms.length === 0) {
    const newId = nextId();
    data.terms.push({ id: newId, name: tr('termDefault') + ' 1', subjects: [] });
    save();
    switchTerm(newId);
  } else {
    const next = data.terms[Math.min(idx, data.terms.length - 1)];
    save();
    switchTerm(next.id);
  }
}

// ── Subject CRUD ───────────────────────────────────────────────────
function addSubject() {
  const t = currentTerm();
  const id = nextId();
  const isK12 = t.gradeMode === 'k12';
  t.subjects.push({
    id, name:tr('newSubjectName') + ' ' + (t.subjects.length+1),
    credits: isK12 ? 1 : 3,
    finalWeight: 30, categories: [], note: '',
    boundary: isK12 ? {...K12_DEFAULT_BOUNDARY} : {...DEFAULT_BOUNDARY},
    quickMode: false, quickGrade: null, passFail: false
  });
  save();
  renderSidebar();
  selectSubject(id);
  // สร้างหมวดคะแนนให้ทั้ง uni และ k12
  if (isK12) {
    addCategory(tr('catDefaultHW'), 30);
    addCategory(tr('catDefaultMid'), 30);
    addCategory(tr('catDefaultQuiz'), 10);
  } else {
    addCategory(tr('catDefaultHW'), 20);
    addCategory(tr('catDefaultMid'), 30);
    addCategory(tr('catDefaultQuiz'), 20);
  }
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
  const subjectName = getSubjects().find(s => s.id === id)?.name || 'วิชา';
  document.title = `${subjectName} | Score Tracker`;
  if(typeof gtag === 'function') gtag('event', 'page_view', { page_title: `${subjectName} | Score Tracker`, page_path: '/subject' });
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