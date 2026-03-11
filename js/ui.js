// ── Render Sidebar ─────────────────────────────────────────────────
function renderSidebar() {
  const t = currentTerm();
  document.getElementById('brand-term-label').textContent = t?.name || '—';

  const _dropLabel = document.getElementById('term-dropdown-label');
  const _dropList = document.getElementById('term-dropdown-list');
  if (_dropLabel) _dropLabel.textContent = currentTerm()?.name || '—';
  if (_dropList) {
    _dropList.innerHTML = data.terms.map(t => {
      const badge = t.gradeMode === 'k12' ? ' <span style="font-size:9px;background:rgba(37,99,196,0.25);color:#60a5fa;border-radius:4px;padding:1px 5px;font-family:var(--mono);">ป/ม</span>' : '';
      return `<div class="term-dropdown-item${t.id===currentTermId?' active':''}" onclick="switchTerm('${t.id}');closeTermDropdown()">${t.name}${badge}</div>`;
    }).join('');
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
          <input class="cat-name-input" maxlength="30" value="${c.name}" oninput="updateCategory(${c.id},'name',this.value)">
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
      <input type="text" maxlength="30" placeholder="เช่น HW1, Midterm..." value="${item.name}" oninput="updateItem(${cid},${item.id},'name',this.value)"
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
  const term = currentTerm();
  const isK12 = term && term.gradeMode === 'k12';
  const gradeList = isK12 ? K12_GRADE_LIST : GRADE_LIST;
  const defaultB = isK12 ? K12_DEFAULT_BOUNDARY : DEFAULT_BOUNDARY;
  const b = s.boundary || defaultB;
  const form = document.getElementById('boundary-form');
  form.innerHTML = gradeList.filter(g => g !== 'F' && g !== '0').map(g => `
    <div class="modal-field">
      <label>${g} ขั้นต่ำ</label>
      <input type="number" id="b_${g.replace('+','p').replace('.','d')}" value="${b[g]||0}" min="0" max="100">
    </div>`).join('');
  document.getElementById('boundary-modal').classList.add('open');
}

function closeBoundaryModal() { document.getElementById('boundary-modal').classList.remove('open'); }

function saveBoundary() {
  const s = getSubject(); if (!s) return;
  const term = currentTerm();
  const isK12 = term && term.gradeMode === 'k12';
  const gradeList = isK12 ? K12_GRADE_LIST : GRADE_LIST;
  const defaultB = isK12 ? K12_DEFAULT_BOUNDARY : DEFAULT_BOUNDARY;
  if (!s.boundary) s.boundary = {...defaultB};

  const newB = {};
  gradeList.filter(g => g !== 'F' && g !== '0').forEach(g => {
    const el = document.getElementById(`b_${g.replace('+','p').replace('.','d')}`);
    newB[g] = el ? (parseFloat(el.value)||0) : 0;
  });
  if (isK12) newB['0'] = 0; else newB.F = 0;

  const order = isK12 ? ['4','3.5','3','2.5','2','1.5','1'] : ['A','B+','B','C+','C','D+','D'];
  for (let i = 0; i < order.length - 1; i++) {
    if (newB[order[i]] <= newB[order[i+1]]) {
      alert(`เกณฑ์ไม่ถูกต้อง: ${order[i]} (${newB[order[i]]}) ต้องมากกว่า ${order[i+1]} (${newB[order[i+1]]})`);
      return;
    }
  }

  s.boundary = newB;
  save(); closeBoundaryModal(); calculate();
}

function resetBoundary() {
  const s = getSubject(); if (!s) return;
  const term = currentTerm();
  const isK12 = term && term.gradeMode === 'k12';
  s.boundary = isK12 ? {...K12_DEFAULT_BOUNDARY} : {...DEFAULT_BOUNDARY};
  save(); closeBoundaryModal(); calculate();
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
function togglePassFail() {
  const s = getSubject(); if (!s) return;
  s.passFail = !s.passFail;
  if (s.passFail) {
    // Disable quickMode if switching to passFail
    s.quickMode = false;
    s.quickGrade = null;
  }
  save();
  renderSubjectView();
}

function setPassFailResult(result) {
  // result: 'P' or 'F'
  const s = getSubject(); if (!s) return;
  s.passFailResult = s.passFailResult === result ? null : result;
  save();
  renderSubjectView();
  renderSidebar();
}
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
  if (!s.quickMode) {
    s.quickGrade = null;
    // K12: สร้าง categories อัตโนมัติถ้ายังไม่มีเลย
    const term = currentTerm();
    if (term && term.gradeMode === 'k12' && (!s.categories || s.categories.length === 0)) {
      s.categories = [
        { id: nextId(), name: 'การบ้าน / งาน', weight: 20, items: [] },
        { id: nextId(), name: 'สอบกลางภาค',    weight: 30, items: [] },
        { id: nextId(), name: 'เก็บคะแนน',     weight: 20, items: [] },
      ];
    }
  }
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
  // อัปเดต dashboard ถ้าเปิดอยู่
  const dv = document.getElementById('dashboard-view');
  if (dv && dv.style.display !== 'none') renderDashboard();
}

function renderQuickPanel(s) {
  const panel = document.getElementById('quick-mode-panel');
  const btn = document.getElementById('quick-mode-btn');
  const catSection = document.getElementById('categories-container');
  const addCatBtn = document.querySelector('.btn-add-category');
  const boundarySection = document.getElementById('boundary-section');

  if (!s.quickMode) {
    panel.style.display = 'none';
    const term = currentTerm();
    const isK12 = term && term.gradeMode === 'k12';
    btn.textContent = isK12 ? '🎯 เลือกเกรด' : '📋 โหมดเทอมเก่า';
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.style.color = '';
    if (catSection) catSection.style.display = '';
    if (addCatBtn) addCatBtn.style.display = '';
    if (boundarySection) boundarySection.style.display = '';
    return;
  }

  panel.style.display = 'block';
  const termNow = currentTerm();
  const isK12Now = termNow && termNow.gradeMode === 'k12';
  btn.textContent = isK12Now ? '✏️ กรอกคะแนนละเอียด' : '✏️ โหมดกรอกคะแนน';
  btn.style.background = 'var(--accent)';
  btn.style.borderColor = 'var(--accent)';
  btn.style.color = '#ffffff';  // ขาวบนส้มเข้ม มองเห็นชัดทั้ง light/dark
  if (catSection) catSection.style.display = 'none';
  if (addCatBtn) addCatBtn.style.display = 'none';
  if (boundarySection) boundarySection.style.display = 'none';  // ซ่อน boundary

  const btns = document.getElementById('quick-grade-buttons');
  const term = currentTerm();
  const isK12 = term && term.gradeMode === 'k12';
  const gradeList = isK12 ? K12_GRADE_LIST : GRADE_LIST;
  const gradeColors = isK12 ? K12_GRADE_COLORS : GRADE_COLORS;

  const normalGrades = gradeList.map(g => {
    const selected = s.quickGrade === g;
    const color = gradeColors[g] || 'var(--ink3)';
    return `<button class="quick-grade-btn ${selected?'selected':''}"
      style="${selected?`background:${color};border-color:${color}`:`border-color:${color}30;color:${color}`}"
      onclick="setQuickGrade('${g}')">${g}</button>`;
  });

  const pSelected = s.quickGrade === 'P';
  const pBtn = `<div style="width:1px;background:rgba(255,255,255,0.15);margin:0 4px;align-self:stretch"></div>
    <button class="quick-grade-btn ${pSelected?'selected':''}"
      style="${pSelected?'background:var(--green);border-color:var(--green);color:#fff':'border-color:rgba(74,247,160,0.3);color:var(--green)'}"
      onclick="setQuickGrade('P')">P</button>`;

  btns.innerHTML = normalGrades.join('') + pBtn;
}

function updateQuickStats(s) {
  if (!s.quickMode) return;

  // [เพิ่มส่วนนี้] ถ้าไม่ได้เลือกเกรด (หรือกดยกเลิก) ให้เคลียร์ค่าบนหน้าจอให้ว่างเปล่า
  if (!s.quickGrade) {
    const pill = document.getElementById('grade-pill');
    if(pill) { pill.textContent = '—'; pill.style.color = 'var(--ink3)'; pill.style.borderColor = 'var(--border)'; pill.style.background = 'none'; }
    
    ['stat-raw', 'stat-weighted', 'stat-need', 'stat-grade'].forEach(id => {
      const el = document.getElementById(id);
      if(el) { el.textContent = '—'; el.style.color = 'var(--ink)'; }
    });
    ['stat-raw-sub', 'stat-weighted-sub', 'stat-need-sub', 'stat-grade-sub'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.textContent = '';
    });
    
    const detail = document.getElementById('score-detail-line');
    if(detail) detail.textContent = 'เทอมเก่า — ยังไม่เลือกเกรด';
    return;
  }

  // Handle P (Pass) grade specially
  if (s.quickGrade === 'P') {
    const color = 'var(--green)';
    const pill = document.getElementById('grade-pill');
    pill.textContent = 'P'; pill.style.color = color;
    pill.style.borderColor = color; pill.style.background = 'rgba(26,122,74,0.12)';
    document.getElementById('stat-raw').textContent = 'P';
    document.getElementById('stat-raw').style.color = color;
    document.getElementById('stat-raw-sub').textContent = 'ผ่าน (Pass/Fail)';
    document.getElementById('stat-weighted').textContent = 'P';
    document.getElementById('stat-weighted-sub').textContent = 'ไม่นับ GPA';
    document.getElementById('stat-need').textContent = '—';
    document.getElementById('stat-need-sub').textContent = 'บันทึกสำเร็จ';
    document.getElementById('stat-grade').textContent = 'P';
    document.getElementById('stat-grade').style.color = color;
    document.getElementById('stat-grade-sub').textContent = 'ผ่าน';
    document.getElementById('score-detail-line').textContent = 'เทอมเก่า — ผ่าน (Pass)';
    return;
  }

  const term = currentTerm();
  const isK12 = term && term.gradeMode === 'k12';
  const gradeList = isK12 ? K12_GRADE_LIST : GRADE_LIST;
  const gpMap = isK12 ? K12_GP_MAP : GP_MAP;
  const g = gradeList.find(gl => gl === s.quickGrade);
  const gp = gpMap[g];
  const color = getGradeColor(g);

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