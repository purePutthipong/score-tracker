// ── Calculation ────────────────────────────────────────────────────
function calcSubject(s) {
  if (!s) return { weightedScore:null, totalWeightUsed:0, rawScore:null, bestCaseScore:null, totalAllWeight:0 };
  
  // Quick mode shortcut at top
  if (s.passFail) {
    const result = s.passFailResult;
    if (!result) return { weightedScore: null, totalWeightUsed: 0, rawScore: null, bestCaseScore: null, totalAllWeight: 0 };
    const synScore = result === 'P' ? 75 : 20;
    return { weightedScore: synScore, totalWeightUsed: 100, rawScore: synScore, bestCaseScore: synScore, totalAllWeight: 100 };
  }

  // [แก้ส่วนนี้] ดักโหมดเทอมเก่า คืนค่าเป็นรูปแบบโครงสร้างคะแนน (ตัวเลข)
  if (s.quickMode) {
    if (s.quickGrade) {
      const boundary = s.boundary || DEFAULT_BOUNDARY;
      const minScore = boundary[s.quickGrade] || 0;
      const synScore = s.quickGrade === 'F' ? 25 : minScore + 2;
      return { weightedScore: synScore, totalWeightUsed: 100, rawScore: synScore, bestCaseScore: synScore, totalAllWeight: 100 };
    } else {
      // ถ้าไม่ได้เลือกเกรด คืนค่าว่างไปเลย Dashboard จะได้ไม่งง
      return { weightedScore: null, totalWeightUsed: 0, rawScore: null, bestCaseScore: null, totalAllWeight: 0 };
    }
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
  if (s?.passFail) {
    if (!s.passFailResult) return null;
    return s.passFailResult === 'P'
      ? { letter: 'P', gp: null, min: 0, passFail: true }
      : { letter: 'F', gp: 0, min: 0, passFail: true };
  }
  
  // [แก้ส่วนนี้] ให้จบในบล็อกนี้ถ้าเปิดโหมดเทอมเก่า
  if (s?.quickMode) {
    const term = currentTerm();
    const isK12 = term && term.gradeMode === 'k12';
    if (s.quickGrade === 'P') return { letter: 'P', gp: null, min: 0, passFail: true };
    if (s.quickGrade) {
      const gp = isK12 ? K12_GP_MAP[s.quickGrade] : GP_MAP[s.quickGrade];
      return { letter: s.quickGrade, gp: gp !== undefined ? gp : 0, min: 0 };
    }
    return null;
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
      const term = currentTerm();
      const isK12 = term && term.gradeMode === 'k12';
      const b = s.boundary || (isK12 ? K12_DEFAULT_BOUNDARY : DEFAULT_BOUNDARY);
      const passMin = isK12 ? (b['2'] || 60) : (b.C || 60);
      const passLabel = isK12 ? '2' : 'C';
      const finalNeeded = fw>0 ? ((passMin-score)/fw)*100 : null;
      if (finalNeeded===null||finalNeeded<=0) { needEl.textContent='ผ่านแล้ว!'; needEl.style.color='var(--green)'; needSub.textContent='ไม่ต้องพึ่ง Final ก็ผ่าน'; }
      else if (finalNeeded>100) { needEl.textContent='ไม่ผ่านแล้ว'; needEl.style.color='var(--red)'; needSub.textContent='คะแนนไม่พอแม้ Final เต็ม'; }
      else { needEl.textContent=finalNeeded.toFixed(1); needEl.style.color=finalNeeded>80?'var(--red)':finalNeeded>60?'var(--yellow)':'var(--green)'; needSub.textContent=`ต้องได้ใน Final (${fw}%)`; }
    } else if (bestGrade && bestGrade.letter !== 'F') {
      needEl.textContent = bestGrade.letter;
      needEl.style.color = getGradeColor(bestGrade.letter);
      needSub.textContent = `โอกาสถ้าทำทุกอย่างได้เต็ม 💪`;
    } else {
      needEl.textContent = 'F';
      needEl.style.color = getGradeColor('F');
      needSub.textContent = 'แม้ทำเต็มหมดก็ยังได้ F';
    }

    // Current grade from locked scores only
    const curGrade = scoreToGrade(score, s);
    const gradEl = document.getElementById('stat-grade');
    gradEl.textContent = curGrade ? curGrade.letter : '—';
    gradEl.style.color = curGrade ? getGradeColor(curGrade.letter) : 'var(--ink3)';
    document.getElementById('stat-grade-sub').textContent = `จากคะแนนที่ล็อคแล้ว ${score.toFixed(1)} pts`;

    const pill = document.getElementById('grade-pill');
    const cg = scoreToGrade(score, s);
    if (cg) { pill.textContent=cg.letter; pill.style.color=getGradeColor(cg.letter); pill.style.borderColor=getGradeColor(cg.letter); pill.style.background=getGradeColor(cg.letter)+'18'; }
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

  const term = currentTerm();
  const isK12 = term && term.gradeMode === 'k12';
  const b = s.boundary || (isK12 ? K12_DEFAULT_BOUNDARY : DEFAULT_BOUNDARY);

  let segs;
  if (isK12) {
    segs = [
      {from:0,        to:b['1'],    label:'0',   color:'#7b1010'},
      {from:b['1'],   to:b['1.5'],  label:'1',   color:'#c0392b'},
      {from:b['1.5'], to:b['2'],    label:'1.5', color:'#d4521a'},
      {from:b['2'],   to:b['2.5'],  label:'2',   color:'#b8860b'},
      {from:b['2.5'], to:b['3'],    label:'2.5', color:'#c9960d'},
      {from:b['3'],   to:b['3.5'],  label:'3',   color:'#2563c4'},
      {from:b['3.5'], to:b['4'],    label:'3.5', color:'#3d7ae8'},
      {from:b['4'],   to:100,       label:'4',   color:'#1a7a4a'},
    ];
  } else {
    segs = [
      {from:0,         to:b.D,       label:'F',  color:'#7b1010'},
      {from:b.D,       to:b['D+'],   label:'D',  color:'#c0392b'},
      {from:b['D+'],   to:b.C,       label:'D+', color:'#d4521a'},
      {from:b.C,       to:b['C+'],   label:'C',  color:'#b8860b'},
      {from:b['C+'],   to:b.B,       label:'C+', color:'#c9960d'},
      {from:b.B,       to:b['B+'],   label:'B',  color:'#2563c4'},
      {from:b['B+'],   to:b.A,       label:'B+', color:'#3d7ae8'},
      {from:b.A,       to:100,       label:'A',  color:'#1a7a4a'},
    ];
  }

  segs.forEach(seg => {
    const div = document.createElement('div');
    div.className = 'boundary-segment';
    div.style.left = `${seg.from}%`;
    div.style.width = `${Math.max(0, seg.to-seg.from)}%`;
    div.style.background = seg.color;
    div.textContent = seg.label;
    bar.appendChild(div);
  });

  const labels = document.getElementById('boundary-labels');
  labels.style.position = 'relative';
  labels.style.height = '16px';
  const labelVals = isK12
    ? [0, b['1'], b['1.5'], b['2'], b['2.5'], b['3'], b['3.5'], b['4'], 100]
    : [0, b.D, b['D+'], b.C, b['C+'], b.B, b['B+'], b.A, 100];
  labels.innerHTML = labelVals.map(v => {
    const pct = v;
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
    card.innerHTML = `<div class="fl" style="color:${getGradeColor(g.letter)}">${g.letter}</div><div class="fn ${needClass}">${needText}</div>`;
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
      parts.push(`ถ้าทำครบทุกอย่าง + Final เต็ม → <strong style="color:${getGradeColor(gradeIfBest.letter)}">${gradeIfBest.letter}</strong>`);
    }
    if (gradeIfFull) {
      parts.push(`ถ้า Final ได้เต็ม 100% → <strong style="color:${getGradeColor(gradeIfFull.letter)}">${gradeIfFull.letter}</strong>`);
    }
    if (gradeIfZero) {
      parts.push(`ถ้า Final ได้ 0% → <strong style="color:${getGradeColor(gradeIfZero.letter)}">${gradeIfZero.letter}</strong>`);
    }
    summary.innerHTML = parts.join('&nbsp;&nbsp;|&nbsp;&nbsp;');
  } else if (summary) {
    summary.innerHTML = '';
  }
}