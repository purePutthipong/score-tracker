// ══════════════════════════════════════════════════════
//  Enhanced Dashboard — ScoreTracker
// ══════════════════════════════════════════════════════

// ── GPA Ring SVG ──────────────────────────────────────
function makeGPARingSVG(gpa, color, size = 80) {
  const r = 32, cx = 40, cy = 40;
  const circumference = 2 * Math.PI * r;
  const pct = gpa !== null ? Math.min(gpa / 4.0, 1) : 0;
  const dash = pct * circumference;
  const gap = circumference - dash;
  return `<svg width="${size}" height="${size}" viewBox="0 0 80 80" class="gpa-ring-svg">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border)" stroke-width="6"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="6"
      stroke-linecap="round"
      stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}"
      stroke-dashoffset="${circumference * 0.25}"
      style="transition:stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1);"/>
  </svg>`;
}

// ── Subject Cards Grid ────────────────────────────────
function renderSubjectCards(rows) {
  if (!rows.length) return '';
  return `<div class="subject-cards-grid">
    ${rows.map(r => {
      const gc = r.grade ? getGradeColor(r.grade.letter) : 'var(--ink3)';
      const pct = r.score !== null ? Math.min(r.score, 100) : 0;
      const needText = r.needC === null ? '' :
        r.needC <= 0 ? '<span style="color:var(--green);font-size:10px">✓ ผ่านแล้ว</span>' :
        r.needC > 100 ? '<span style="color:var(--red);font-size:10px">⚠ เสี่ยง</span>' :
        `<span style="color:var(--ink3);font-size:10px">Final ≥ ${r.needC.toFixed(0)}</span>`;

      return `<div class="subject-card" onclick="selectSubject(${r.s.id})">
        <div class="subject-card-name" title="${r.s.name}">${r.s.name}</div>
        <div class="subject-card-score-row">
          <div class="subject-card-score" style="color:${gc}">${r.score !== null ? r.score.toFixed(1) : '—'}</div>
          <div class="subject-card-grade" style="color:${gc};border-color:${gc}30;background:${gc}12">
            ${r.grade ? r.grade.letter : '—'}
          </div>
        </div>
        <div class="subject-card-bar">
          <div class="subject-card-bar-fill" style="width:${pct}%;background:${gc}"></div>
        </div>
        <div class="subject-card-meta">
          <span>${r.s.credits || 3} cr</span>
          ${needText}
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ── Deadline Panel ────────────────────────────────────
function getDeadlines() {
  try { return JSON.parse(localStorage.getItem('scoretracker_deadlines') || '[]'); }
  catch(e) { return []; }
}
function saveDeadlines(arr) {
  localStorage.setItem('scoretracker_deadlines', JSON.stringify(arr));
}

function renderDeadlinePanel() {
  const deadlines = getDeadlines().filter(d => {
    const days = Math.ceil((new Date(d.date) - new Date()) / 86400000);
    return days >= -1; // show until 1 day after
  });
  deadlines.sort((a, b) => new Date(a.date) - new Date(b.date));

  const items = deadlines.map(d => {
    const days = Math.ceil((new Date(d.date) - new Date()) / 86400000);
    const cls = days <= 2 ? 'urgent' : days <= 7 ? 'soon' : 'ok';
    const dayText = days <= 0 ? 'วันนี้!' : days === 1 ? 'พรุ่งนี้' : `${days} วัน`;
    const color = cls === 'urgent' ? 'var(--red)' : cls === 'soon' ? 'var(--yellow)' : 'var(--green)';
    return `<div class="deadline-item">
      <div class="deadline-dot" style="background:${color}"></div>
      <div class="deadline-name" title="${d.name}">${d.name}</div>
      <div class="deadline-days ${cls}">${dayText}</div>
      <button class="deadline-del" onclick="removeDeadline('${d.id}');event.stopPropagation()">×</button>
    </div>`;
  });

  const emptyHtml = `<div class="deadline-empty">📅 ยังไม่มีกำหนดสอบ/ส่งงาน<br><span style="font-size:11px">กดปุ่ม + เพื่อเพิ่ม</span></div>`;

  return `<div class="deadline-panel">
    <div class="deadline-header">
      <div class="deadline-title">📅 กำหนดสอบ / ส่งงาน</div>
      <button class="deadline-add-btn" onclick="openDeadlineModal()">＋ เพิ่ม</button>
    </div>
    <div class="deadline-list" id="deadline-list">
      ${items.length ? items.join('') : emptyHtml}
    </div>
  </div>`;
}

function removeDeadline(id) {
  const deadlines = getDeadlines().filter(d => d.id !== id);
  saveDeadlines(deadlines);
  const el = document.getElementById('deadline-list');
  if (el) {
    const deadlines2 = getDeadlines().filter(d => {
      const days = Math.ceil((new Date(d.date) - new Date()) / 86400000);
      return days >= -1;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    const items = deadlines2.map(d => {
      const days = Math.ceil((new Date(d.date) - new Date()) / 86400000);
      const cls = days <= 2 ? 'urgent' : days <= 7 ? 'soon' : 'ok';
      const dayText = days <= 0 ? 'วันนี้!' : days === 1 ? 'พรุ่งนี้' : `${days} วัน`;
      const color = cls === 'urgent' ? 'var(--red)' : cls === 'soon' ? 'var(--yellow)' : 'var(--green)';
      return `<div class="deadline-item">
        <div class="deadline-dot" style="background:${color}"></div>
        <div class="deadline-name">${d.name}</div>
        <div class="deadline-days ${cls}">${dayText}</div>
        <button class="deadline-del" onclick="removeDeadline('${d.id}');event.stopPropagation()">×</button>
      </div>`;
    });
    el.innerHTML = items.length ? items.join('') : `<div class="deadline-empty">📅 ยังไม่มีกำหนดสอบ/ส่งงาน</div>`;
  }
}

// ── Deadline Modal ────────────────────────────────────
window.openDeadlineModal = function() {
  const modal = document.getElementById('deadline-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    modal.querySelector('.deadline-modal-box').style.transform = 'translateY(0)';
  });
  const dateInput = document.getElementById('deadline-date-input');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
};

window.closeDeadlineModal = function() {
  const modal = document.getElementById('deadline-modal');
  if (!modal) return;
  modal.style.opacity = '0';
  modal.querySelector('.deadline-modal-box').style.transform = 'translateY(16px)';
  setTimeout(() => { modal.style.display = 'none'; }, 250);
};

window.saveDeadlineFromModal = function() {
  const nameEl = document.getElementById('deadline-name-input');
  const dateEl = document.getElementById('deadline-date-input');
  const typeEl = document.getElementById('deadline-type-select');
  if (!nameEl || !dateEl) return;
  const name = nameEl.value.trim();
  if (!name) { nameEl.focus(); return; }
  const date = dateEl.value;
  if (!date) { dateEl.focus(); return; }
  const type = typeEl ? typeEl.value : 'สอบ';
  const deadlines = getDeadlines();
  deadlines.push({
    id: Date.now().toString(),
    name: `${type}: ${name}`,
    date: date
  });
  saveDeadlines(deadlines);
  nameEl.value = '';
  closeDeadlineModal();
  // Re-render deadline panel if dashboard visible
  const dv = document.getElementById('dashboard-view');
  if (dv && dv.style.display !== 'none') renderDashboard();
  showToast('✅', `เพิ่มกำหนด "${name}" แล้ว`, 'success');
};

// ── Toast Notification System ─────────────────────────
function ensureToastContainer() {
  let c = document.getElementById('toast-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toast-container';
    document.body.appendChild(c);
  }
  return c;
}

window.showToast = function(icon, text, type = 'info', duration = 3500) {
  const c = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-text">${text}</span><span class="toast-close">×</span>`;
  toast.querySelector('.toast-close').onclick = () => removeToast(toast);
  toast.onclick = () => removeToast(toast);
  c.appendChild(toast);
  setTimeout(() => removeToast(toast), duration);
};

function removeToast(toast) {
  if (toast.classList.contains('removing')) return;
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}

// ── Check Deadlines on load ───────────────────────────
function checkUpcomingDeadlines() {
  const deadlines = getDeadlines();
  const urgent = deadlines.filter(d => {
    const days = Math.ceil((new Date(d.date) - new Date()) / 86400000);
    return days >= 0 && days <= 2;
  });
  if (urgent.length > 0) {
    setTimeout(() => {
      urgent.slice(0, 2).forEach(d => {
        const days = Math.ceil((new Date(d.date) - new Date()) / 86400000);
        const text = days === 0 ? `<strong>${d.name}</strong> — วันนี้!` :
                     days === 1 ? `<strong>${d.name}</strong> — พรุ่งนี้` :
                     `<strong>${d.name}</strong> — อีก ${days} วัน`;
        showToast('⏰', text, 'warn', 5000);
      });
    }, 1200);
  }
}

// ── GPA Progress with History Bars (replaces table) ───
function renderTermBars(termData) {
  return termData.map(t => {
    const gpaColor = t.gpa === null ? 'var(--ink3)' :
      t.gpa >= 3 ? 'var(--green)' : t.gpa >= 2 ? 'var(--yellow)' : 'var(--red)';
    const pct = t.gpa !== null ? (t.gpa / 4) * 100 : 0;
    return `<div class="term-gpa-bar">
      <div class="term-gpa-name">${t.name}</div>
      <div class="term-gpa-track">
        <div class="term-gpa-fill" style="width:${pct}%;background:${gpaColor}"></div>
      </div>
      <div class="term-gpa-val" style="color:${gpaColor}">${t.gpa !== null ? t.gpa.toFixed(2) : '—'}</div>
    </div>`;
  }).join('');
}

// ── Mobile Stats Bar ──────────────────────────────────
function renderMobileStatsBar(avgGPA, passCount, subjects, atRisk) {
  const gpaColor = avgGPA === null ? 'rgba(255,255,255,0.4)' :
    avgGPA >= 3 ? '#4af7a0' : avgGPA >= 2 ? '#f7c94a' : '#f76a6a';
  return `<div class="mobile-stats-bar">
    <div class="mobile-stats-bar-inner">
      <div class="mobile-stat-item">
        <div class="mobile-stat-val" style="color:${gpaColor}">${avgGPA !== null ? avgGPA.toFixed(2) : '—'}</div>
        <div class="mobile-stat-lbl">GPA</div>
      </div>
      <div class="mobile-stat-item">
        <div class="mobile-stat-val" style="color:var(--green)">${passCount}</div>
        <div class="mobile-stat-lbl">ผ่าน</div>
      </div>
      <div class="mobile-stat-item">
        <div class="mobile-stat-val" style="color:${atRisk.length ? 'var(--red)' : 'rgba(255,255,255,0.5)'}">${atRisk.length}</div>
        <div class="mobile-stat-lbl">เสี่ยง</div>
      </div>
      <div class="mobile-stat-item">
        <div class="mobile-stat-val" style="color:rgba(255,255,255,0.8)">${subjects.length}</div>
        <div class="mobile-stat-lbl">วิชา</div>
      </div>
    </div>
  </div>`;
}

// ── Override renderDashboard with enhanced version ─────
const _originalRenderDashboard = typeof renderDashboard !== 'undefined' ? renderDashboard : null;

window.renderDashboard = function() {
  const dv = document.getElementById('dashboard-view');
  const subjects = getSubjects();

  if (!subjects.length) {
    dv.innerHTML = `
      <div class="empty-hero">
        <div class="empty-illustration">
          <div class="empty-circle c1"></div><div class="empty-circle c2"></div><div class="empty-circle c3"></div>
          <div class="empty-emoji">📊</div>
        </div>
        <div class="empty-tag">${tr('dashboard')}</div>
        <h2 class="empty-title">${tr('addEmptyDash')}</h2>
        <p class="empty-desc">เพิ่มวิชาและกรอกคะแนน<br>แล้ว Dashboard จะแสดงสถิติทั้งหมดให้</p>
        <button class="empty-cta" onclick="addSubject()"><span>＋</span> เพิ่มวิชาแรก</button>
      </div>`;
    return;
  }

  const rows = subjects.map(s => {
    const r = calcSubject(s);
    const g = scoreToGrade(r.weightedScore, s);
    const fw = s.finalWeight || 30;
    const needC = (r.weightedScore !== null && fw > 0 && !s.quickMode) ? ((50 - r.weightedScore) / fw) * 100 : null;
    return { s, score: r.weightedScore, grade: g, needC, fw };
  });

  const graded = rows.filter(r => r.grade && r.grade.gp !== null);
  const totalCredits = graded.reduce((sum, r) => sum + (parseFloat(r.s.credits) || 3), 0);
  const avgGPA = graded.length && totalCredits > 0
    ? Math.floor(graded.reduce((sum, r) => sum + r.grade.gp * (parseFloat(r.s.credits) || 3), 0) / totalCredits * 100) / 100
    : null;

  const GP_LABELS = { 1.0: 'D', 1.5: 'D+', 2.0: 'C', 2.5: 'C+', 3.0: 'B', 3.5: 'B+', 4.0: 'A' };
  const savedThreshold = parseFloat(localStorage.getItem('scoretracker_pass_threshold') || '1.0');
  const passThreshold = isNaN(savedThreshold) ? 1.0 : savedThreshold;
  const passThresholdLabel = GP_LABELS[passThreshold] || 'D';

  const atRisk = rows.filter(r => r.grade && !r.grade.passFail && r.grade.gp < passThreshold && !r.s.quickMode);
  const needFinal = rows.filter(r => r.needC !== null && r.needC > 0 && r.needC <= 100);
  const passCount = rows.filter(r => r.grade && (r.grade.passFail ? r.grade.letter === 'P' : r.grade.gp >= passThreshold)).length;
  const hasScore = rows.filter(r => r.score !== null).length;
  const gpaColor = avgGPA === null ? 'rgba(255,255,255,0.5)' : avgGPA >= 3.0 ? '#4af7a0' : avgGPA >= 2.0 ? '#f7c94a' : '#f76a6a';

  const alertsHtml = atRisk.map(r =>
    `<div class="dash-alert">⚠ <strong>${r.s.name}</strong> — คะแนนปัจจุบัน ${r.score !== null ? r.score.toFixed(1) : '—'} (เกรด ${r.grade.letter}) อาจไม่ผ่าน</div>`
  ).join('');

  const tableRows = rows.map(r => {
    const gc = r.grade ? getGradeColor(r.grade.letter) : 'var(--ink3)';
    const pct = r.score !== null ? Math.min(r.score, 100) : 0;
    const needText = r.needC === null ? '—' : r.needC <= 0 ? 'ผ่านแล้ว ✓' : r.needC > 100 ? 'ไม่ผ่านแล้ว' : r.needC.toFixed(1);
    const needColor = r.needC === null ? 'var(--ink3)' : r.needC <= 0 ? 'var(--green)' : r.needC > 100 ? 'var(--red)' : r.needC > 80 ? 'var(--red)' : 'var(--ink2)';
    return `<div class="dash-row" onclick="selectSubject(${r.s.id})">
      <div class="dash-row-name">${r.s.name}</div>
      <div class="dash-row-val hide-mob">${r.s.credits || 3}</div>
      <div class="dash-row-val">${r.score !== null ? r.score.toFixed(1) : '—'}</div>
      <div class="hide-mob"><div class="dash-progress-bar"><div class="dash-progress-fill" style="width:${pct}%;background:${gc}"></div></div></div>
      <div><div class="dash-grade-badge" style="color:${gc};border-color:${gc}20;background:${gc}15">${r.grade ? r.grade.letter : '—'}</div></div>
      <div class="dash-row-val hide-mob">${r.grade ? (r.grade.gp !== null ? r.grade.gp.toFixed(1) : 'P/F') : '—'}</div>
      <div class="dash-row-val hide-mob" style="color:${needColor}">${needText}</div>
    </div>`;
  }).join('');

  dv.innerHTML = `
    ${renderMobileStatsBar(avgGPA, passCount, subjects, atRisk)}

    <div class="dash-hero">
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
        ${makeGPARingSVG(avgGPA, gpaColor, 60)}
        <div style="min-width:0;">
          <div class="dash-hero-label">GPA เทอมนี้</div>
          <div class="dash-hero-gpa" style="color:${gpaColor}">${avgGPA !== null ? avgGPA.toFixed(2) : '—'}</div>
          <div class="dash-hero-sub">${currentTerm().name}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0;">
        <div style="text-align:right">
          <div style="font-family:var(--mono);font-size:10px;color:rgba(255,255,255,0.35)">วิชาทั้งหมด</div>
          <div style="font-family:var(--mono);font-size:26px;color:white;line-height:1.1">${subjects.length}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:2px">คะแนน ${hasScore} วิชา</div>
        </div>
        <div style="display:flex;gap:5px;">
          <button onclick="openGoalModal()" style="display:flex;align-items:center;gap:4px;padding:6px 10px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:9px;color:rgba(237,233,227,0.7);font-family:var(--body);font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap;">🎯 ตั้งเป้า</button>
          <button onclick="openShareModal()" style="display:flex;align-items:center;gap:4px;padding:6px 10px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:9px;color:rgba(237,233,227,0.7);font-family:var(--body);font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap;">📤 แชร์</button>
        </div>
      </div>
    </div>

    ${alertsHtml}

    <div class="dash-stats">
      <div class="dash-stat" onclick="changePassThreshold()" title="คลิกเพื่อเปลี่ยนเกณฑ์" style="cursor:pointer">
        <div class="dash-stat-label">วิชาที่ผ่าน</div>
        <div class="dash-stat-value" style="color:var(--green)">${passCount}<span style="font-size:15px;color:var(--ink3)"> / ${subjects.length}</span></div>
        <div class="dash-stat-sub">เกรด ${passThresholdLabel} ขึ้นไป <span style="color:var(--accent);font-size:10px">✎</span></div>
      </div>
      <div class="dash-stat">
        <div class="dash-stat-label">วิชาที่เสี่ยง</div>
        <div class="dash-stat-value" style="color:${atRisk.length ? 'var(--red)' : 'var(--green)'}">${atRisk.length}</div>
        <div class="dash-stat-sub">ต่ำกว่าเกรด ${passThresholdLabel}</div>
      </div>
      <div class="dash-stat">
        <div class="dash-stat-label">ต้องสู้ Final</div>
        <div class="dash-stat-value" style="color:var(--accent)">${needFinal.length}</div>
        <div class="dash-stat-sub">วิชาที่ยังต้องทำ final</div>
      </div>
      <div class="dash-stat">
        <div class="dash-stat-label">หน่วยกิตรวม</div>
        <div class="dash-stat-value" style="color:var(--accent2)">${totalCredits}</div>
        <div class="dash-stat-sub">credit ที่มีเกรดแล้ว</div>
      </div>
    </div>

    ${renderDeadlinePanel()}

    <!-- จอใหญ่: Card Grid -->
    <div class="dash-subjects-desktop">
      ${renderSubjectCards(rows)}
    </div>

    <!-- มือถือ: ตารางกระชับ -->
    <div class="dash-subjects-mobile">
      <div class="section-label" style="margin-bottom:10px;">รายวิชา</div>
      ${rows.map(r => {
        const gc = r.grade ? getGradeColor(r.grade.letter) : 'var(--ink3)';
        const needText = r.needC === null ? '' : r.needC <= 0 ? '✓ ผ่าน' : r.needC > 100 ? '⚠ เสี่ยง' : `Final ≥ ${r.needC.toFixed(0)}`;
        const needColor = r.needC === null ? '' : r.needC <= 0 ? 'var(--green)' : r.needC > 100 ? 'var(--red)' : 'var(--ink3)';
        return `<div class="mob-subject-row" onclick="selectSubject(${r.s.id})">
          <div class="mob-subject-name">${r.s.name}</div>
          <div class="mob-subject-right">
            ${needText ? `<span class="mob-subject-need" style="color:${needColor}">${needText}</span>` : ''}
            <span class="mob-subject-score" style="color:${gc}">${r.score !== null ? r.score.toFixed(1) : '—'}</span>
            <span class="mob-subject-grade" style="color:${gc};border-color:${gc}30;background:${gc}12">${r.grade ? r.grade.letter : '—'}</span>
          </div>
        </div>`;
      }).join('')}
    </div>

    <div class="charts-grid">
      <div class="chart-box"><div class="section-label">คะแนนแต่ละวิชา</div><canvas id="scoreChart"></canvas></div>
      <div class="chart-box"><div class="section-label">การกระจายเกรด</div><canvas id="gradeChart"></canvas></div>
    </div>

    <div style="text-align:right;margin-top:8px">
      <button class="btn btn-outline" onclick="exportAllCSV()" style="font-size:12px">⬇ Export CSV ทั้งหมด</button>
    </div>`;

  // Charts
  destroyChart('scoreChart'); destroyChart('gradeChart');
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#9e9690' : '#6b6560';
  const gridColor = isDark ? '#2e2b28' : '#e8e2d9';

  const scoreCtx = document.getElementById('scoreChart');
  if (scoreCtx) {
    chartInstances['scoreChart'] = new Chart(scoreCtx, {
      type: 'bar',
      data: {
        labels: rows.map(r => r.s.name.substring(0, 14)),
        datasets: [{
          label: 'คะแนนสะสม',
          data: rows.map(r => r.score !== null ? parseFloat(r.score.toFixed(1)) : 0),
          backgroundColor: rows.map(r => r.grade ? getGradeColor(r.grade.letter) + '99' : '#b0a89e66'),
          borderColor: rows.map(r => r.grade ? getGradeColor(r.grade.letter) : '#b0a89e'),
          borderWidth: 1.5, borderRadius: 8
        }]
      },
      options: {
        responsive: true, animation: { duration: 600 },
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor } },
          y: { min: 0, max: 100, ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor } }
        }
      }
    });
  }

  const isK12term = currentTerm().gradeMode === 'k12';
  const allGradeLetters = isK12term
    ? ['4', '3.5', '3', '2.5', '2', '1.5', '1', '0']
    : [...GRADE_LIST, 'P'];
  const gradeCounts = {};
  allGradeLetters.forEach(g => gradeCounts[g] = 0);
  rows.forEach(r => { if (r.grade && r.grade.letter) gradeCounts[r.grade.letter] = (gradeCounts[r.grade.letter] || 0) + 1; });
  const gradeKeys = allGradeLetters.filter(g => gradeCounts[g] > 0);
  const gradeCtx = document.getElementById('gradeChart');
  if (gradeCtx) {
    if (gradeKeys.length) {
      chartInstances['gradeChart'] = new Chart(gradeCtx, {
        type: 'doughnut',
        data: {
          labels: gradeKeys,
          datasets: [{ data: gradeKeys.map(g => gradeCounts[g]), backgroundColor: gradeKeys.map(g => getGradeColor(g) + 'cc'), borderWidth: 0, hoverOffset: 6 }]
        },
        options: {
          responsive: true, animation: { duration: 600 },
          plugins: { legend: { position: 'right', labels: { color: textColor, font: { size: 11 }, padding: 12 } } }
        }
      });
    } else {
      // ยังไม่มีเกรด — แสดง placeholder
      gradeCtx.parentElement.innerHTML += '<div style="text-align:center;color:var(--ink3);font-size:12px;margin-top:20px;">ยังไม่มีข้อมูลเกรด</div>';
    }
  }
};

// ── Override renderHistory with enhanced bars ─────────
const _origRenderHistory = typeof renderHistory !== 'undefined' ? renderHistory : null;
window.renderHistory = function() {
  if (typeof setNavActive === 'function') setNavActive('gpa');
  const hv = document.getElementById('history-view');
  const termData = data.terms.map(t => {
    const subjects = t.subjects;
    const gradedPairs = subjects.map(s => {
      const r = calcSubject(s); const g = scoreToGrade(r.weightedScore, s);
      return g ? { g, credits: s.credits || 3 } : null;
    }).filter(Boolean);
    const totCr = gradedPairs.reduce((sum, p) => sum + p.credits, 0);
    const gpa = gradedPairs.length && totCr > 0
      ? Math.floor(gradedPairs.reduce((sum, p) => sum + p.g.gp * p.credits, 0) / totCr * 100) / 100 : null;
    return { name: t.name, gpa, count: subjects.length, passCount: gradedPairs.filter(p => p.g.gp >= 1).length };
  });

  const allGradedPairs = data.terms.flatMap(t => t.subjects.map(s => {
    const r = calcSubject(s); const g = scoreToGrade(r.weightedScore, s);
    return g ? { g, credits: s.credits || 3 } : null;
  })).filter(Boolean);
  const allCredits = allGradedPairs.reduce((sum, p) => sum + p.credits, 0);
  const cumGPA = allGradedPairs.length && allCredits > 0
    ? Math.floor(allGradedPairs.reduce((sum, p) => sum + p.g.gp * p.credits, 0) / allCredits * 100) / 100 : null;
  const cumColor = cumGPA === null ? 'rgba(255,255,255,0.5)' : cumGPA >= 3 ? '#4af7a0' : cumGPA >= 2 ? '#f7c94a' : '#f76a6a';

  hv.innerHTML = `
    <div class="dash-hero">
      <div>
        <div style="display:flex;align-items:center;gap:16px;">
          ${makeGPARingSVG(cumGPA, cumColor, 70)}
          <div>
            <div class="dash-hero-label">GPA สะสม (Cumulative GPA)</div>
            <div class="dash-hero-gpa" style="color:${cumColor}">${cumGPA !== null ? cumGPA.toFixed(2) : '—'}</div>
            <div class="dash-hero-sub">จาก ${data.terms.length} เทอม · ${allGradedPairs.length} วิชา</div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-box" style="margin-bottom:18px">
      <div class="section-label">GPA แต่ละเทอม</div>
      <canvas id="termChart" style="max-height:220px"></canvas>
    </div>

    <div class="dash-table-wrap">
      <div style="padding:12px 18px;background:var(--card);border-bottom:1px solid var(--border)">
        <span style="font-family:var(--mono);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--ink3)">ความก้าวหน้าแต่ละเทอม</span>
      </div>
      <div style="padding:14px 18px;">
        ${renderTermBars(termData)}
      </div>
    </div>`;

  setTimeout(() => {
    destroyChart('termChart');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#9e9690' : '#6b6560';
    const gridColor = isDark ? '#2e2b28' : '#e8e2d9';
    const ctx = document.getElementById('termChart');
    if (ctx && termData.length) {
      chartInstances['termChart'] = new Chart(ctx, {
        type: 'line',
        data: {
          labels: termData.map(t => t.name),
          datasets: [{
            label: 'GPA', data: termData.map(t => t.gpa),
            borderColor: getGradeColor('B+'),
            backgroundColor: getGradeColor('B+') + '22',
            tension: 0.4, fill: true,
            pointBackgroundColor: termData.map(t => {
              if (t.gpa === null) return 'transparent';
              return t.gpa >= 3 ? '#1a7a4a' : t.gpa >= 2 ? '#b8860b' : '#c0392b';
            }),
            pointRadius: 6, pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true, animation: { duration: 600 },
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } },
            y: { min: 0, max: 4, ticks: { color: textColor, font: { size: 11 }, stepSize: 1 }, grid: { color: gridColor } }
          }
        }
      });
    }
  }, 50);
};

// ── Enhanced Mobile Sheet (subject cards) ─────────────
window.toggleSubjectSheet = function() {
  const sheet = document.getElementById('subject-sheet');
  const ov = document.getElementById('sheet-overlay');
  if (!sheet) return;
  if (sheet.style.display === 'block') { closeAllSheets(); return; }
  closeAllSheets();
  const container = document.getElementById('subject-sheet-list');
  if (container) {
    container.innerHTML = '';
    getSubjects().forEach(s => {
      const r = calcSubject(s);
      const g = scoreToGrade(r.weightedScore, s);
      const gc = g ? getGradeColor(g.letter) : 'rgba(255,255,255,0.3)';
      const card = document.createElement('div');
      card.className = 'sheet-subject-card';
      card.innerHTML = `
        <div class="sheet-subject-dot" style="background:${gc}"></div>
        <div class="sheet-subject-name">${s.name}</div>
        <div class="sheet-subject-info">
          <div class="sheet-subject-grade" style="color:${gc}">${g ? g.letter : '—'}</div>
          <div class="sheet-subject-score">${r.weightedScore !== null ? r.weightedScore.toFixed(1) : '—'}</div>
        </div>`;
      card.onclick = () => { selectSubject(s.id); closeAllSheets(); };
      container.appendChild(card);
    });
  }
  sheet.style.display = 'block';
  if (ov) ov.style.display = 'block';
};

// ── Init enhanced features ────────────────────────────
(function initEnhancements() {
  // Add progress bar
  const ptr = document.createElement('div');
  ptr.className = 'ptr-indicator';
  document.body.appendChild(ptr);

  // Check deadlines after load
  window.addEventListener('load', () => {
    checkUpcomingDeadlines();
  });

  // Keyboard shortcut: N = new subject, D = dashboard
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'n' || e.key === 'N') addSubject();
    if (e.key === 'd' || e.key === 'D') showDashboard();
    if (e.key === 'g' || e.key === 'G') showHistory();
  });
})();