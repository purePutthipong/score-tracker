// Share GPA Card — Score Tracker

(function () {

  // ── Get all data needed for the card ──────────────────
  function getShareData() {
    var term = currentTerm();
    var subjects = getSubjects();

    var rows = subjects.map(function (s) {
      var r = calcSubject(s);
      var g = scoreToGrade(r.weightedScore, s);
      return { s: s, score: r.weightedScore, grade: g };
    });

    var graded = rows.filter(function (r) { return r.grade; });
    var totalCredits = graded.reduce(function (sum, r) { return sum + (parseFloat(r.s.credits) || 3); }, 0);
    var termGPA = graded.length && totalCredits > 0
      ? Math.floor(graded.reduce(function (sum, r) { return sum + r.grade.gp * (parseFloat(r.s.credits) || 3); }, 0) / totalCredits * 100) / 100
      : null;

    // Cumulative GPA
    var allPairs = (window.data ? window.data.terms : []).flatMap(function (t) {
      return t.subjects.map(function (s) {
        var r = calcSubject(s);
        var g = scoreToGrade(r.weightedScore, s);
        return g ? { g: g, credits: parseFloat(s.credits) || 3 } : null;
      }).filter(Boolean);
    });
    var allCredits = allPairs.reduce(function (sum, p) { return sum + p.credits; }, 0);
    var cumGPA = allPairs.length && allCredits > 0
      ? Math.floor(allPairs.reduce(function (sum, p) { return sum + p.g.gp * p.credits; }, 0) / allCredits * 100) / 100
      : null;

    var passCount = rows.filter(function (r) { return r.grade && r.grade.gp >= 1.0; }).length;

    return {
      termName: term ? term.name : 'เทอมนี้',
      termGPA: termGPA,
      cumGPA: cumGPA,
      subjectCount: subjects.length,
      passCount: passCount,
      subjects: rows.slice(0, 6) // max 6 subjects on card
    };
  }

  // ── Draw card on canvas ────────────────────────────────
  function drawCard(canvas, d) {
    var W = 800, H = 480;
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');

    // ── Background ──
    var bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0f0e0d');
    bg.addColorStop(1, '#1c1814');
    ctx.fillStyle = bg;
    roundRect(ctx, 0, 0, W, H, 24);
    ctx.fill();

    // ── Glow ──
    var glow = ctx.createRadialGradient(W * 0.15, H * 0.3, 0, W * 0.15, H * 0.3, 280);
    glow.addColorStop(0, 'rgba(212,82,26,0.18)');
    glow.addColorStop(1, 'rgba(212,82,26,0)');
    ctx.fillStyle = glow;
    roundRect(ctx, 0, 0, W, H, 24);
    ctx.fill();

    var glow2 = ctx.createRadialGradient(W * 0.85, H * 0.7, 0, W * 0.85, H * 0.7, 200);
    glow2.addColorStop(0, 'rgba(37,99,196,0.12)');
    glow2.addColorStop(1, 'rgba(37,99,196,0)');
    ctx.fillStyle = glow2;
    roundRect(ctx, 0, 0, W, H, 24);
    ctx.fill();

    // ── Left panel ──
    var panelW = 280;

    // App tag
    ctx.font = '500 11px monospace';
    ctx.fillStyle = '#d4521a';
    ctx.letterSpacing = '3px';
    ctx.fillText('SCORE TRACKER', 40, 54);
    ctx.letterSpacing = '0px';

    // Term name
    ctx.font = '400 14px sans-serif';
    ctx.fillStyle = 'rgba(237,233,227,0.4)';
    ctx.fillText(d.termName, 40, 80);

    // GPA big number
    var gpaText = d.termGPA !== null ? d.termGPA.toFixed(2) : '—';
    var gpaColor = d.termGPA === null ? 'rgba(237,233,227,0.4)'
      : d.termGPA >= 3.0 ? '#4af7a0'
      : d.termGPA >= 2.0 ? '#f7c94a' : '#f76a6a';

    ctx.font = 'bold 88px sans-serif';
    ctx.fillStyle = gpaColor;
    ctx.fillText(gpaText, 36, 190);

    ctx.font = '400 13px monospace';
    ctx.fillStyle = 'rgba(237,233,227,0.3)';
    ctx.fillText('GPA เทอมนี้', 40, 215);

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 238);
    ctx.lineTo(panelW, 238);
    ctx.stroke();

    // Stats row
    var stats = [
      { label: 'Cumulative', val: d.cumGPA !== null ? d.cumGPA.toFixed(2) : '—' },
      { label: 'วิชา', val: String(d.subjectCount) },
      { label: 'ผ่าน', val: String(d.passCount) }
    ];
    stats.forEach(function (st, i) {
      var x = 40 + i * 82;
      ctx.font = 'bold 22px monospace';
      ctx.fillStyle = '#ede9e3';
      ctx.fillText(st.val, x, 278);
      ctx.font = '400 10px sans-serif';
      ctx.fillStyle = 'rgba(237,233,227,0.35)';
      ctx.fillText(st.label, x, 296);
    });

    // Vertical divider
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(panelW + 20, 40);
    ctx.lineTo(panelW + 20, H - 40);
    ctx.stroke();

    // ── Right panel — subject list ──
    var rx = panelW + 48;
    var ry = 50;

    ctx.font = '500 11px monospace';
    ctx.fillStyle = 'rgba(237,233,227,0.25)';
    ctx.letterSpacing = '2px';
    ctx.fillText('รายวิชา', rx, ry);
    ctx.letterSpacing = '0px';

    var GRADE_COLORS_MAP = {
      'A': '#4af7a0', 'B+': '#60d4f7', 'B': '#4285f4',
      'C+': '#f7c94a', 'C': '#f7a94a', 'D+': '#f78c4a',
      'D': '#f76a4a', 'F': '#f76a6a'
    };

    var rowH = 52;
    d.subjects.forEach(function (r, i) {
      var y = ry + 20 + i * rowH;
      var gc = r.grade ? (GRADE_COLORS_MAP[r.grade.letter] || '#ede9e3') : 'rgba(237,233,227,0.2)';
      var gradeLetter = r.grade ? r.grade.letter : '—';
      var scoreText = r.score !== null ? r.score.toFixed(1) : '—';

      // Row bg
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent';
      roundRect(ctx, rx - 8, y - 16, W - rx - 16, rowH - 4, 8);
      ctx.fill();

      // Subject name
      var name = r.s.name.length > 22 ? r.s.name.slice(0, 22) + '…' : r.s.name;
      ctx.font = '600 13px sans-serif';
      ctx.fillStyle = 'rgba(237,233,227,0.85)';
      ctx.fillText(name, rx, y);

      // Score
      ctx.font = '400 12px monospace';
      ctx.fillStyle = 'rgba(237,233,227,0.4)';
      ctx.fillText(scoreText, rx, y + 18);

      // Grade badge
      var bx = W - 68;
      ctx.fillStyle = gc + '22';
      roundRect(ctx, bx, y - 14, 44, 26, 6);
      ctx.fill();
      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = gc;
      ctx.textAlign = 'center';
      ctx.fillText(gradeLetter, bx + 22, y + 4);
      ctx.textAlign = 'left';

      // Progress bar
      var barW = 120;
      var barX = W - 68 - barW - 12;
      var pct = r.score !== null ? Math.min(r.score / 100, 1) : 0;
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      roundRect(ctx, barX, y - 3, barW, 5, 3);
      ctx.fill();
      if (pct > 0) {
        ctx.fillStyle = gc;
        roundRect(ctx, barX, y - 3, barW * pct, 5, 3);
        ctx.fill();
      }
    });

    // ── Watermark ──
    ctx.font = '400 11px monospace';
    ctx.fillStyle = 'rgba(237,233,227,0.15)';
    ctx.textAlign = 'right';
    ctx.fillText('score-tracker', W - 32, H - 20);
    ctx.textAlign = 'left';
  }

  // ── Helper: rounded rect ───────────────────────────────
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // ── Show modal ─────────────────────────────────────────
  window.openShareModal = function () {
    var modal = document.getElementById('share-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    modal.style.opacity = '0';

    var d = getShareData();
    var canvas = document.getElementById('share-canvas');
    drawCard(canvas, d);

    requestAnimationFrame(function () {
      modal.style.transition = 'opacity 0.25s ease';
      modal.style.opacity = '1';
    });
  };

  window.closeShareModal = function () {
    var modal = document.getElementById('share-modal');
    if (!modal) return;
    modal.style.opacity = '0';
    setTimeout(function () { modal.style.display = 'none'; }, 250);
  };

  // ── Download ───────────────────────────────────────────
  window.downloadShareCard = function () {
    var canvas = document.getElementById('share-canvas');
    var link = document.createElement('a');
    link.download = 'GPA-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // ── Share via Web Share API ────────────────────────────
  window.shareCard = async function () {
    var canvas = document.getElementById('share-canvas');
    canvas.toBlob(async function (blob) {
      var file = new File([blob], 'GPA-card.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: 'GPA ของฉัน — Score Tracker' });
        } catch (e) {
          if (e.name !== 'AbortError') downloadShareCard();
        }
      } else {
        downloadShareCard();
      }
    }, 'image/png');
  };

})();