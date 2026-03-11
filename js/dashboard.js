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
  if(typeof setNavActive === 'function') setNavActive('dash');
  document.title = 'Dashboard | Score Tracker';
  if(typeof gtag === 'function') gtag('event', 'page_view', { page_title: 'Dashboard | Score Tracker', page_path: '/dashboard' });
  renderDashboard();
}

let chartInstances = {};
function changePassThreshold() {
  const options = [
    { gp: 1.0, label: 'D (1.0) — ผ่านขั้นต่ำ' },
    { gp: 1.5, label: 'D+ (1.5)' },
    { gp: 2.0, label: 'C (2.0)' },
    { gp: 2.5, label: 'C+ (2.5)' },
    { gp: 3.0, label: 'B (3.0) — เกียรตินิยมอันดับ 2' },
    { gp: 3.5, label: 'B+ (3.5) — เกียรตินิยมอันดับ 1' },
  ];
  const current = parseFloat(localStorage.getItem('scoretracker_pass_threshold') || '1.0');
  const labels = options.map((o,i) => `${i+1}. ${o.label}${o.gp===current?' ✓':''}`).join('\n');
  const choice = prompt(`เลือกเกณฑ์ "วิชาที่ผ่าน":\n\n${labels}\n\nพิมพ์หมายเลข 1-${options.length}`);
  const idx = parseInt(choice) - 1;
  if (isNaN(idx) || idx < 0 || idx >= options.length) return;
  localStorage.setItem('scoretracker_pass_threshold', options[idx].gp);
  renderDashboard();
}

function destroyChart(id) { if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; } }

function renderDashboard() {
  const dv = document.getElementById('dashboard-view');
  const subjects = getSubjects();

  if (!subjects.length) {
    dv.innerHTML = `
      <div class="empty-hero">
        <div class="empty-illustration">
          <div class="empty-circle c1"></div>
          <div class="empty-circle c2"></div>
          <div class="empty-circle c3"></div>
          <div class="empty-emoji">📊</div>
        </div>
        <div class="empty-tag">${tr('dashboard')}</div>
        <h2 class="empty-title">${tr('addEmptyDash')}</h2>
        <p class="empty-desc">เพิ่มวิชาและกรอกคะแนน<br>แล้ว Dashboard จะแสดงสถิติทั้งหมดให้</p>
        <button class="empty-cta" onclick="addSubject()">
          <span>＋</span> เพิ่มวิชาแรก
        </button>
      </div>`;
    return;
  }

  const rows = subjects.map(s => {
    const r = calcSubject(s);
    const g = scoreToGrade(r.weightedScore, s);
    const fw = s.finalWeight||30;
    const needC = (r.weightedScore!==null&&fw>0&&!s.quickMode) ? ((50-r.weightedScore)/fw)*100 : null;
    return { s, score:r.weightedScore, grade:g, needC, fw };
  });

  const graded = rows.filter(r=>r.grade && r.grade.gp !== null);
  const totalCredits = graded.reduce((sum,r)=>sum+(parseFloat(r.s.credits)||3),0);
  const avgGPA = graded.length && totalCredits>0
    ? Math.floor(graded.reduce((sum,r)=>sum+r.grade.gp*(parseFloat(r.s.credits)||3),0)/totalCredits * 100) / 100
    : null;
  // Pass threshold: saved in localStorage, default gp >= 1.0 (D)
  const GP_LABELS = { 1.0:'D', 1.5:'D+', 2.0:'C', 2.5:'C+', 3.0:'B', 3.5:'B+', 4.0:'A' };
  const savedThreshold = parseFloat(localStorage.getItem('scoretracker_pass_threshold') || '1.0');
  const passThreshold = isNaN(savedThreshold) ? 1.0 : savedThreshold;
  const passThresholdLabel = GP_LABELS[passThreshold] || 'D';

  const atRisk = rows.filter(r=>r.grade&&!r.grade.passFail&&r.grade.gp<passThreshold&&!r.s.quickMode);
  const needFinal = rows.filter(r=>r.needC!==null&&r.needC>0&&r.needC<=100);
  const passCount = rows.filter(r=>r.grade&&(r.grade.passFail ? r.grade.letter==='P' : r.grade.gp>=passThreshold)).length;
  const hasScore = rows.filter(r=>r.score!==null).length;
  const gpaColor = avgGPA===null?'rgba(255,255,255,0.5)':avgGPA>=3.0?'#4af7a0':avgGPA>=2.0?'#f7c94a':'#f76a6a';

  const alertsHtml = atRisk.map(r =>
    `<div class="dash-alert">⚠ <strong>${r.s.name}</strong> — คะแนนปัจจุบัน ${r.score!==null?r.score.toFixed(1):'—'} (เกรด ${r.grade.letter}) อาจไม่ผ่าน</div>`
  ).join('');

 const tableRows = rows.map(r => {
    const gc = r.grade ? getGradeColor(r.grade.letter) : 'var(--ink3)';
    const pct = r.score!==null ? Math.min(r.score,100) : 0;
    const needText = r.needC===null?'—':r.needC<=0?'ผ่านแล้ว ✓':r.needC>100?'ไม่ผ่านแล้ว':r.needC.toFixed(1);
    const needColor = r.needC===null?'var(--ink3)':r.needC<=0?'var(--green)':r.needC>100?'var(--red)':r.needC>80?'var(--red)':'var(--ink2)';
    
    return `<div class="dash-row" onclick="selectSubject(${r.s.id})">
      <div class="dash-row-name">${r.s.name}</div>
      <div class="dash-row-val hide-mob">${r.s.credits||3}</div>
      <div class="dash-row-val">${r.score!==null?r.score.toFixed(1):'—'}</div>
      <div class="hide-mob"><div class="dash-progress-bar"><div class="dash-progress-fill" style="width:${pct}%;background:${gc}"></div></div></div>
      <div><div class="dash-grade-badge" style="color:${gc};border-color:${gc}20;background:${gc}15">${r.grade?r.grade.letter:'—'}</div></div>
      <div class="dash-row-val hide-mob">${r.grade?(r.grade.gp!==null?r.grade.gp.toFixed(1):'P/F'):'—'}</div>
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
      <div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
        <div>
          <div style="font-family:var(--mono);font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:3px">วิชาทั้งหมด</div>
          <div style="font-family:var(--mono);font-size:32px;color:white">${subjects.length}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:6px">มีคะแนน ${hasScore} วิชา</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button onclick="openGoalModal()" style="display:flex;align-items:center;gap:6px;padding:8px 14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:10px;color:rgba(237,233,227,0.7);font-family:var(--body);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.18s;white-space:nowrap;">
            <span>🎯</span> ตั้งเป้า
          </button>
          <button onclick="openShareModal()" style="display:flex;align-items:center;gap:6px;padding:8px 14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:10px;color:rgba(237,233,227,0.7);font-family:var(--body);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.18s;white-space:nowrap;">
            <span>📤</span> แชร์
          </button>
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
      <div class="dash-stat"><div class="dash-stat-label">วิชาที่เสี่ยง</div><div class="dash-stat-value" style="color:${atRisk.length?'var(--red)':'var(--green)'}">${atRisk.length}</div><div class="dash-stat-sub">ต่ำกว่าเกรด ${passThresholdLabel}</div></div>
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
          backgroundColor: rows.map(r=>r.grade?getGradeColor(r.grade.letter)+'99':'#b0a89e66'),
          borderColor: rows.map(r=>r.grade?getGradeColor(r.grade.letter):'#b0a89e'),
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
  [...GRADE_LIST, 'P'].forEach(g=>gradeCounts[g]=0);
  rows.forEach(r=>{ if(r.grade) gradeCounts[r.grade.letter]++; });
  const gradeKeys = [...GRADE_LIST, 'P'].filter(g=>gradeCounts[g]>0);
  const gradeCtx = document.getElementById('gradeChart');
  if (gradeCtx) {
    chartInstances['gradeChart'] = new Chart(gradeCtx, {
      type:'doughnut',
      data:{
        labels: gradeKeys,
        datasets:[{ data: gradeKeys.map(g=>gradeCounts[g]), backgroundColor: gradeKeys.map(g=>getGradeColor(g)+'cc'), borderWidth:0 }]
      },
      options:{ responsive:true, plugins:{ legend:{ position:'right', labels:{color:textColor,font:{size:11},padding:12} } } }
    });
  }
}

// ── History View ───────────────────────────────────────────────────
function showHistory() {
  if(typeof setNavActive === 'function') setNavActive('gpa');
  currentSubjectId = null;
  document.getElementById('empty-state').style.display='none';
  document.getElementById('subject-view').style.display='none';
  document.getElementById('dashboard-view').style.display='none';
  document.getElementById('history-view').style.display='block';
  document.getElementById('dash-btn').classList.remove('active');
  document.getElementById('history-btn').classList.add('active');
  document.querySelectorAll('.subject-item').forEach(e=>e.classList.remove('active'));
  document.title = 'ประวัติ GPA | Score Tracker';
  if(typeof gtag === 'function') gtag('event', 'page_view', { page_title: 'ประวัติ GPA | Score Tracker', page_path: '/history' });
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
        datasets:[{ label:'GPA', data:termData.map(t=>t.gpa), borderColor:getGradeColor('B+'), backgroundColor:getGradeColor('B+')+'22', tension:0.4, fill:true, pointBackgroundColor:getGradeColor('B+'), pointRadius:5 }]
      },
      options:{ responsive:true, plugins:{legend:{display:false}}, scales:{
        x:{ticks:{color:textColor,font:{size:11}},grid:{color:gridColor}},
        y:{min:0,max:4,ticks:{color:textColor,font:{size:11},stepSize:1},grid:{color:gridColor}}
      }}
    });
  }
  }, 50);
}