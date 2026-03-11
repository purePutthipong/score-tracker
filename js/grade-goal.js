// Grade Goal — Score Tracker
// ตั้งเป้า GPA ทั้งเทอม + เป้าเกรดรายวิชา

(function () {

  // ── Open modal ─────────────────────────────────────────
  window.openGoalModal = function () {
    var modal = document.getElementById('goal-modal');
    if (!modal) return;
    renderGoalModal();
    modal.style.display = 'flex';
    requestAnimationFrame(function () {
      modal.style.opacity = '1';
      modal.querySelector('.goal-modal-box').style.transform = 'translateY(0)';
    });
  };

  window.closeGoalModal = function () {
    var modal = document.getElementById('goal-modal');
    if (!modal) return;
    modal.style.opacity = '0';
    modal.querySelector('.goal-modal-box').style.transform = 'translateY(16px)';
    setTimeout(function () { modal.style.display = 'none'; }, 250);
  };

  // ── Render modal content ───────────────────────────────
  function renderGoalModal() {
    var subjects   = window.getSubjects ? getSubjects() : [];
    var savedGoal  = getGoalData();

    // ── Section 1: GPA Goal ──
    var gpaGoalHtml = `
      <div class="gg-section">
        <div class="gg-section-label">🎯 เป้า GPA ทั้งเทอม</div>
        <div class="gg-gpa-row">
          <div class="gg-gpa-presets">
            ${[2.00, 2.50, 3.00, 3.50, 4.00].map(function(g) {
              var active = savedGoal.targetGPA === g ? 'active' : '';
              return `<button class="gg-preset ${active}" onclick="setGPAGoal(${g})">${g.toFixed(2)}</button>`;
            }).join('')}
          </div>
          <div class="gg-gpa-custom">
            <input type="number" id="gg-gpa-input" class="gg-input" min="0" max="4" step="0.01"
              placeholder="กำหนดเอง" value="${savedGoal.targetGPA || ''}"
              oninput="onGPAInputChange(this.value)">
            <span class="gg-input-unit">/ 4.00</span>
          </div>
        </div>
        <div id="gg-gpa-result" class="gg-gpa-result"></div>
      </div>`;

    // ── Section 2: Per-subject grade goals ──
    var subjectRows = subjects.length ? subjects.map(function(s) {
      var r    = window.calcSubject ? calcSubject(s) : {};
      var cur  = window.scoreToGrade ? scoreToGrade(r.weightedScore, s) : null;
      var goal = savedGoal.subjectGoals[s.id] || null;
      var fw   = s.finalWeight || 30;

      // Calculate needed final for goal grade
      var neededFinal = null;
      if (goal && r.weightedScore !== null && fw > 0 && !s.quickMode) {
        var b = s.boundary || window.DEFAULT_BOUNDARY;
        var targetMin = b[goal] || 0;
        neededFinal = ((targetMin - r.weightedScore) / fw) * 100;
      }

      var gc = window.GRADE_COLORS || {};
      var curColor  = cur  ? (gc[cur.letter]  || 'var(--ink3)') : 'var(--ink3)';
      var goalColor = goal ? (gc[goal] || 'var(--accent)')      : 'var(--ink3)';

      var needHtml = '';
      if (goal && r.weightedScore !== null) {
        if (s.quickMode) {
          needHtml = `<span class="gg-need-text" style="color:var(--ink3)">Quick mode</span>`;
        } else if (neededFinal <= 0) {
          needHtml = `<span class="gg-need-text" style="color:var(--green)">✓ ถึงเป้าแล้ว!</span>`;
        } else if (neededFinal > 100) {
          needHtml = `<span class="gg-need-text" style="color:var(--red)">ไม่ถึงแล้ว</span>`;
        } else {
          var needColor = neededFinal > 80 ? 'var(--red)' : neededFinal > 60 ? 'var(--yellow)' : 'var(--green)';
          needHtml = `<span class="gg-need-text" style="color:${needColor}">Final ≥ ${neededFinal.toFixed(1)}</span>`;
        }
      } else if (goal && r.weightedScore === null) {
        needHtml = `<span class="gg-need-text" style="color:var(--ink3)">กรอกคะแนนก่อน</span>`;
      }

      var gradeButtons = ['A','B+','B','C+','C','D'].map(function(g) {
        var isActive = goal === g;
        var col = gc[g] || '#fff';
        return `<button class="gg-grade-btn ${isActive ? 'active' : ''}"
          style="${isActive ? 'background:'+col+'22;border-color:'+col+';color:'+col : ''}"
          onclick="setSubjectGoal(${s.id}, '${g}')">${g}</button>`;
      }).join('');

      return `
        <div class="gg-subject-row" id="gg-row-${s.id}">
          <div class="gg-subject-info">
            <div class="gg-subject-name">${s.name}</div>
            <div class="gg-subject-meta">
              <span style="color:${curColor}">${cur ? cur.letter : '—'}</span>
              <span style="color:var(--ink3)">→</span>
              <span style="color:${goalColor};font-weight:700">${goal || 'ยังไม่ตั้ง'}</span>
              ${needHtml}
            </div>
          </div>
          <div class="gg-grade-btns">${gradeButtons}</div>
        </div>`;
    }).join('') : `<div class="gg-empty">เพิ่มวิชาก่อนเพื่อตั้งเป้าเกรดรายวิชา</div>`;

    var subjectHtml = `
      <div class="gg-section">
        <div class="gg-section-label">📚 เป้าเกรดรายวิชา</div>
        <div class="gg-subjects">${subjectRows}</div>
      </div>`;

    document.getElementById('goal-modal-body').innerHTML = gpaGoalHtml + subjectHtml;

    // Render GPA result after DOM ready
    setTimeout(renderGPAResult, 50);
  }

  // ── GPA Goal logic ─────────────────────────────────────
  window.setGPAGoal = function (val) {
    var d    = getGoalData();
    d.targetGPA = val;
    saveGoalData(d);
    // Update preset buttons
    document.querySelectorAll('.gg-preset').forEach(function (btn) {
      btn.classList.toggle('active', parseFloat(btn.textContent) === val);
    });
    var inp = document.getElementById('gg-gpa-input');
    if (inp) inp.value = val.toFixed(2);
    renderGPAResult();
  };

  window.onGPAInputChange = function (val) {
    var n = parseFloat(val);
    if (isNaN(n) || n < 0 || n > 4) return;
    var d = getGoalData();
    d.targetGPA = Math.round(n * 100) / 100;
    saveGoalData(d);
    document.querySelectorAll('.gg-preset').forEach(function (btn) {
      btn.classList.toggle('active', parseFloat(btn.textContent) === d.targetGPA);
    });
    renderGPAResult();
  };

  function renderGPAResult() {
    var el = document.getElementById('gg-gpa-result');
    if (!el) return;

    var d        = getGoalData();
    var target   = d.targetGPA;
    if (!target) { el.innerHTML = ''; return; }

    var subjects = window.getSubjects ? getSubjects() : [];
    var rows      = subjects.map(function (s) {
      var r = window.calcSubject ? calcSubject(s) : {};
      var g = window.scoreToGrade ? scoreToGrade(r.weightedScore, s) : null;
      return { s: s, grade: g, score: r.weightedScore };
    });

    var locked   = rows.filter(function (r) { return r.grade && r.s.quickMode; });
    var unlocked = rows.filter(function (r) { return !r.s.quickMode; });

    // Current weighted GPA from locked subjects
    var lockedCredits = locked.reduce(function (sum, r) { return sum + (parseFloat(r.s.credits)||3); }, 0);
    var lockedGP      = locked.reduce(function (sum, r) { return sum + r.grade.gp * (parseFloat(r.s.credits)||3); }, 0);

    var totalCredits  = rows.reduce(function (sum, r) { return sum + (parseFloat(r.s.credits)||3); }, 0);
    if (totalCredits === 0) { el.innerHTML = ''; return; }

    // Need remaining GP
    var neededTotal   = target * totalCredits;
    var neededRemain  = neededTotal - lockedGP;
    var remainCredits = totalCredits - lockedCredits;

    var feasible = remainCredits > 0 ? neededRemain / remainCredits : null;

    var statusHtml = '';
    if (feasible === null) {
      statusHtml = '<span style="color:var(--ink3)">ยังไม่มีวิชาที่คำนวณได้</span>';
    } else if (feasible > 4.0) {
      statusHtml = '<span style="color:var(--red)">⚠ เป้านี้เกินไป ไม่สามารถทำถึงได้แล้ว</span>';
    } else if (feasible <= 0) {
      statusHtml = '<span style="color:var(--green)">✓ ถึงเป้าแล้ว!</span>';
    } else {
      var avgNeeded = Math.round(feasible * 100) / 100;
      var col = feasible >= 3.5 ? 'var(--yellow)' : feasible >= 2.5 ? 'var(--green)' : 'var(--green)';
      statusHtml = `วิชาที่เหลือต้องได้เฉลี่ย <span style="font-family:var(--mono);font-size:16px;font-weight:700;color:${col}">${avgNeeded.toFixed(2)}</span> GPA`;
    }

    el.innerHTML = `<div class="gg-gpa-status">${statusHtml}</div>`;
  }

  // ── Per-subject goal ───────────────────────────────────
  window.setSubjectGoal = function (subjectId, grade) {
    var d = getGoalData();
    // Toggle off if same
    if (d.subjectGoals[subjectId] === grade) {
      delete d.subjectGoals[subjectId];
    } else {
      d.subjectGoals[subjectId] = grade;
    }
    saveGoalData(d);
    // Re-render just that row
    var subjects = window.getSubjects ? getSubjects() : [];
    var s = subjects.find(function (s) { return s.id === subjectId; });
    if (!s) return;
    renderGoalModal();
  };

  // ── Storage ────────────────────────────────────────────
  function getGoalData() {
    try {
      var raw = localStorage.getItem('scoretracker_goals');
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return { targetGPA: null, subjectGoals: {} };
  }

  function saveGoalData(d) {
    localStorage.setItem('scoretracker_goals', JSON.stringify(d));
  }

  // ── Expose getter for dashboard badge ─────────────────
  window.getGoalData = getGoalData;

})();