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