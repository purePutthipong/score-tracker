// ── Mobile Sheet Functions ─────────────────────────────────────────
function closeAllSheets() {
  ['subject-sheet','settings-sheet'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var ov = document.getElementById('sheet-overlay');
  if (ov) ov.style.display = 'none';
}


// ── Bottom Nav Active State ────────────────────────────
function setNavActive(tab) {
  ['dash','gpa','subjects','settings'].forEach(function(t) {
    var btn = document.getElementById('bnav-btn-' + t);
    if (btn) btn.classList.toggle('nav-active', t === tab);
  });
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
      btn.innerHTML = '<span>' + s.name + '</span><span style="font-family:var(--mono);font-size:11px;color:' + (g ? getGradeColor(g.letter) : 'rgba(255,255,255,0.3)') + '">' + (g ? g.letter : '—') + '</span>';
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
      'background:var(--card);opacity:1;' + (locked ? '' : 'border-style:dashed;');

    // --- Line 1: name | lock | pct | delete ---
    var line1 = document.createElement('div');
    line1.style.cssText = 'display:flex;align-items:center;gap:8px';

    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = tr('itemNamePlaceholder');
    nameInput.maxLength = 30;
    nameInput.value = item.name || '';
    nameInput.readOnly = locked;
    nameInput.style.cssText = 'flex:1;background:none;border:none;font-family:var(--body);' +
      'font-size:13px;font-weight:600;outline:none;min-width:0;color:var(--ink);' +
      (locked ? '' : 'opacity:0.7;');
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
    pctDiv.style.cssText = 'font-family:var(--mono);font-size:12px;min-width:40px;text-align:right;font-weight:600;color:' +
      (pct !== null ? pctColor : 'var(--ink3)');
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
    line2.style.cssText = 'display:flex;align-items:center;gap:6px;min-width:0;overflow:hidden';

    var fromLabel = document.createElement('span');
    fromLabel.style.cssText = 'font-size:11px;color:var(--ink3);flex-shrink:0';
    fromLabel.textContent = tr('scoreFrom');

    var scoreInput = document.createElement('input');
    scoreInput.type = 'number';
    scoreInput.placeholder = '0';
    scoreInput.step = 'any';
    scoreInput.min = '0';
    scoreInput.value = (item.score !== undefined && item.score !== '') ? item.score : '';
    scoreInput.readOnly = locked;
    scoreInput.style.cssText = 'flex:1;min-width:0;max-width:45%;background:var(--bg);border:1px solid var(--border);' +
      'border-radius:7px;padding:6px 8px;font-family:var(--mono);font-size:13px;' +
      'color:var(--ink);outline:none;text-align:center';
    scoreInput.addEventListener('input', (function(c2, i2) {
      return function() { updateItem(c2, i2, 'score', this.value); };
    })(cid, item.id));

    var toLabel = document.createElement('span');
    toLabel.style.cssText = 'font-size:11px;color:var(--ink3);flex-shrink:0';
    toLabel.textContent = tr('scoreTo');

    var maxInput = document.createElement('input');
    maxInput.type = 'number';
    maxInput.placeholder = '100';
    maxInput.step = 'any';
    maxInput.min = '1';
    maxInput.value = (item.maxScore !== undefined && item.maxScore !== '') ? item.maxScore : '';
    maxInput.readOnly = locked;
    maxInput.style.cssText = 'flex:1;min-width:0;max-width:45%;background:var(--bg);border:1px solid var(--border);' +
      'border-radius:7px;padding:6px 8px;font-family:var(--mono);font-size:13px;' +
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