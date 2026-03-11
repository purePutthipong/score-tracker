// ── Constants ──────────────────────────────────────────────────────
const DEFAULT_BOUNDARY = { A:80, 'B+':75, B:70, 'C+':65, C:60, 'D+':55, D:50, F:0 };
const GRADE_LIST = ['A','B+','B','C+','C','D+','D','F'];
const GP_MAP = { A:4.0,'B+':3.5,B:3.0,'C+':2.5,C:2.0,'D+':1.5,D:1.0,F:0.0 };

// ── K-12 Grade System (ประถม/มัธยม) ────────────────────────────────
const K12_GRADE_LIST = ['4','3.5','3','2.5','2','1.5','1','0'];
const K12_GP_MAP = { '4':4.0,'3.5':3.5,'3':3.0,'2.5':2.5,'2':2.0,'1.5':1.5,'1':1.0,'0':0.0 };
const K12_DEFAULT_BOUNDARY = { '4':80,'3.5':75,'3':70,'2.5':65,'2':60,'1.5':55,'1':50,'0':0 };
const K12_GRADE_COLORS = { '4':'#1a7a4a','3.5':'#2563c4','3':'#2563c4','2.5':'#b8860b','2':'#b8860b','1.5':'#d4521a','1':'#d4521a','0':'#c0392b' };

function getGradeColor(letter) {
  const term = currentTerm && currentTerm();
  if (term && term.gradeMode === 'k12') return K12_GRADE_COLORS[letter] || 'var(--ink3)';
  return GRADE_COLORS[letter] || 'var(--ink3)';
}
const GRADE_COLORS = { A:'#1a7a4a','B+':'#2563c4',B:'#2563c4','C+':'#b8860b',C:'#b8860b','D+':'#d4521a',D:'#d4521a',F:'#c0392b',P:'#1a7a4a' };
const SEG_COLORS = { F:'#c0392b','D':'#c0392b','D+':'#d4521a','C':'#b8860b','C+':'#c9960d',B:'#2563c4','B+':'#3d7ae8',A:'#1a7a4a' };