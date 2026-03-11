const SUPABASE_URL = 'https://axbviopnyuhievypqerq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_f5SUg0uW_IieQNAxnwEF_Q_9IW7o69p';

let supabaseClient = null;
let currentUser = null;
let syncTimeout = null;

// Init Supabase
async function initSupabase() {
  if (typeof window.supabase === 'undefined') return;
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // Check existing session
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    currentUser = session.user;
    onSignedIn();
  }

  // Listen for auth changes
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      currentUser = session.user;
      onSignedIn();
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
      onSignedOut();
    }
  });
}

async function onSignedIn() {
  updateSyncUI(true);
  await loadFromCloud();
}

function onSignedOut() {
  updateSyncUI(false);
}

// Sign in with Google
async function signInGoogle() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { 
      // เปลี่ยนบรรทัดนี้ เพื่อให้รันได้ทั้งตอนเทสต์ (127.0.0.1) และตอนขึ้นเว็บจริง (github.io)
      redirectTo: window.location.origin + window.location.pathname 
    }
  });
}

// Sign out
async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('scoretracker')) {
      localStorage.removeItem(key);
    }
  });
  localStorage.removeItem('scoretracker_merge_resolved');
  window.location.reload(); 
}

// Save to cloud (debounced)
let isSyncConflict = false; // ตัวแปรล็อคไม่ให้ Auto-save ทำงานซ้อนกันเวลาเด้ง Popup

// ── Save to cloud (ระบบเช็คการเซฟทับ) ──────────────────────────────
function syncToCloud(forceOverwrite = false) {
  if (!currentUser || !supabaseClient) return;
  
  // ถ้าติด Conflict อยู่และไม่ได้สั่ง Force ให้หยุด Auto-save ทันที
  if (isSyncConflict && !forceOverwrite) return; 

  clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      // 1. เช็คเวลาบน Cloud ก่อนว่าใหม่กว่าเครื่องเราไหม (ถ้าไม่ได้บังคับเซฟทับ)
      if (!forceOverwrite) {
        showSyncStatus('⏳ เช็คเวอร์ชัน...', 'var(--ink3)');
        const { data: cloudRow, error: fetchErr } = await supabaseClient
          .from('user_data')
          .select('updated_at')
          .eq('user_id', currentUser.id)
          .maybeSingle();

        if (cloudRow && cloudRow.updated_at) {
          const cloudTime = new Date(cloudRow.updated_at).getTime();
          const localTime = parseInt(localStorage.getItem('scoretracker_updated') || '0');

          // ถ้าบน Cloud ใหม่กว่าเครื่องนี้เกิน 2 วินาที (เผื่อเวลาประมวลผล)
          if (cloudTime > localTime + 2000) {
            isSyncConflict = true;
            showSyncStatus('⚠️ ข้อมูลขัดแย้งกัน', 'var(--red)');
            
            // เด้ง Popup แจ้งเตือนผู้ใช้ (ใช้วิธี confirm แบบ Classic)
            const userChoice = confirm(
              "⚠️ พบข้อมูลที่ถูกอัปเดตใหม่กว่าบน Cloud (อาจมาจากอุปกรณ์อื่น)\n\n" +
              "👉 กด [OK] เพื่อดึงข้อมูลจาก Cloud มาแทนที่หน้าจอนี้\n" +
              "👉 กด [Cancel] เพื่อบังคับเซฟข้อมูลหน้าจอนี้ทับขึ้น Cloud"
            );

            if (userChoice) {
              // ผู้ใช้เลือกโหลดจาก Cloud
              isSyncConflict = false;
              await loadFromCloud(true); // สั่งดึงข้อมูลแบบบังคับ (Force Load)
            } else {
              // ผู้ใช้เลือกเอาข้อมูลเครื่องนี้เป็นหลัก
              isSyncConflict = false;
              syncToCloud(true); // สั่งเซฟแบบบังคับ (Force Overwrite)
            }
            return; // หยุดการทำงานรอบนี้ เพื่อรอ user ตัดสินใจ
          }
        }
      }

      // 2. ดำเนินการ Save ลง Cloud
      showSyncStatus('⏳ กำลังซิงค์...', 'var(--ink3)');
      const nowISO = new Date().toISOString();
      
      const { error } = await supabaseClient
        .from('user_data')
        .upsert({ 
          user_id: currentUser.id, 
          data: data, 
          updated_at: nowISO 
        }, { onConflict: 'user_id' });

      if (!error) {
        showSyncStatus('☁️ ซิงค์แล้ว', 'var(--green)');
        // เก็บเวลาล่าสุดลง LocalStorage เพื่อใช้เทียบรอบหน้า
        localStorage.setItem('scoretracker_updated', new Date(nowISO).getTime().toString());
      } else {
        showSyncStatus('⚠️ ซิงค์ไม่สำเร็จ', 'var(--red)');
      }
    } catch(e) {
      showSyncStatus('⚠️ ซิงค์ไม่สำเร็จ', 'var(--red)');
    }
  }, 1500);
}

// ── Load from cloud ────────────────────────────────────────────────
async function loadFromCloud(force = false) {
  if (!currentUser || !supabaseClient) return;
  try {
    showSyncStatus('⏳ กำลังดึงข้อมูลจาก Cloud...', 'var(--ink3)');
    const { data: rows, error } = await supabaseClient
      .from('user_data')
      .select('data, updated_at')
      .eq('user_id', currentUser.id)
      .maybeSingle();

    // ไม่มีข้อมูลบน Cloud เลย → อัปโหลดข้อมูลในเครื่องขึ้นไป
    if (error || !rows || !rows.data) {
      syncToCloud(true);
      showSyncStatus('☁️ ซิงค์แล้ว (เริ่มข้อมูลใหม่)', 'var(--green)');
      return;
    }

    const cloudDataString = JSON.stringify(rows.data);
    const localDataString = JSON.stringify(data);
    const cloudTime = new Date(rows.updated_at).getTime();
    const localTime = parseInt(localStorage.getItem('scoretracker_updated') || '0');

    // ข้อมูลเหมือนกันทุกประการ → ไม่ต้องทำอะไร
    if (cloudDataString === localDataString) {
      showSyncStatus('☁️ ข้อมูลซิงค์แล้ว', 'var(--green)');
      return;
    }

    const isLocalEmpty = data.terms.length === 1 && data.terms[0].subjects.length === 0;
    const isCloudEmpty = rows.data.terms?.length === 1 && rows.data.terms[0].subjects?.length === 0;

    // Local ว่างเปล่า → โหลด Cloud ได้เลยไม่ต้องถาม
    if (isLocalEmpty) {
      applyCloudData(cloudDataString, cloudTime);
      showSyncStatus('☁️ โหลดข้อมูลจาก Cloud แล้ว', 'var(--green)');
      return;
    }

    // Cloud ว่างเปล่า → อัปโหลด Local ขึ้นไปได้เลย
    if (isCloudEmpty) {
      syncToCloud(true);
      showSyncStatus('☁️ ซิงค์ข้อมูลขึ้น Cloud แล้ว', 'var(--green)');
      return;
    }

    // ทั้งสองฝั่งมีข้อมูล → ถามผู้ใช้ (เฉพาะครั้งแรก ถ้าเคยตัดสินใจแล้วไม่ถามซ้ำ)
    if (localStorage.getItem('scoretracker_merge_resolved') === '1') {
      // sync ตามเวลาปกติ — cloud ใหม่กว่าโหลด, ไม่งั้นอัปโหลด
      if (cloudTime > parseInt(localStorage.getItem('scoretracker_updated') || '0') + 2000) {
        applyCloudData(cloudDataString, cloudTime);
        showSyncStatus('☁️ อัปเดตจาก Cloud แล้ว', 'var(--green)');
      } else {
        showSyncStatus('☁️ ข้อมูลซิงค์แล้ว', 'var(--green)');
      }
      return;
    }
    showMergeDialog(cloudDataString, cloudTime, rows.data);

  } catch(e) {
    console.error("Cloud Load Error:", e);
    showSyncStatus('⚠️ โหลดไม่สำเร็จ', 'var(--red)');
  }
}

// ── แสดง Dialog เลือก Cloud หรือ Local ───────────────────────────
function showMergeDialog(cloudDataString, cloudTime, cloudData) {
  const existing = document.getElementById('merge-dialog');
  if (existing) existing.remove();

  const cloudTerms = cloudData.terms?.length || 0;
  const cloudSubjects = cloudData.terms?.reduce((n, t) => n + t.subjects.length, 0) || 0;
  const localTerms = data.terms?.length || 0;
  const localSubjects = data.terms?.reduce((n, t) => n + t.subjects.length, 0) || 0;

  const cloudDate = new Date(cloudTime).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' });
  const localDate = new Date(parseInt(localStorage.getItem('scoretracker_updated') || '0')).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' });

  const dialog = document.createElement('div');
  dialog.id = 'merge-dialog';
  dialog.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;';
  dialog.innerHTML = `
    <div style="background:#1a1714;border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px;width:100%;max-width:420px;box-shadow:0 24px 80px rgba(0,0,0,0.6);">
      <div style="font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--accent);text-transform:uppercase;margin-bottom:6px;">พบข้อมูลสองแหล่ง</div>
      <div style="font-family:var(--body);font-size:17px;font-weight:700;color:#ede9e3;margin-bottom:6px;">จะใช้ข้อมูลไหนดี?</div>
      <div style="font-family:var(--body);font-size:12px;color:rgba(237,233,227,0.4);margin-bottom:20px;">พบข้อมูลทั้งในเครื่องและบน Cloud กรุณาเลือกว่าจะใช้อันไหนเป็นหลัก</div>

      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">

        <!-- Cloud Option -->
        <button onclick="chooseMerge('cloud')" style="text-align:left;padding:14px 16px;background:rgba(37,99,196,0.1);border:2px solid rgba(37,99,196,0.4);border-radius:12px;cursor:pointer;transition:all 0.18s;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:18px;">☁️</span>
            <span style="font-family:var(--body);font-size:13px;font-weight:700;color:#ede9e3;">ใช้ข้อมูลจาก Cloud</span>
          </div>
          <div style="font-family:var(--mono);font-size:10px;color:rgba(237,233,227,0.45);">${cloudTerms} เทอม · ${cloudSubjects} วิชา · อัปเดต ${cloudDate}</div>
        </button>

        <!-- Local Option -->
        <button onclick="chooseMerge('local')" style="text-align:left;padding:14px 16px;background:rgba(212,82,26,0.1);border:2px solid rgba(212,82,26,0.35);border-radius:12px;cursor:pointer;transition:all 0.18s;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:18px;">📱</span>
            <span style="font-family:var(--body);font-size:13px;font-weight:700;color:#ede9e3;">ใช้ข้อมูลในเครื่องนี้</span>
          </div>
          <div style="font-family:var(--mono);font-size:10px;color:rgba(237,233,227,0.45);">${localTerms} เทอม · ${localSubjects} วิชา · อัปเดต ${localDate}</div>
        </button>

      </div>
      <div style="font-family:var(--mono);font-size:10px;color:rgba(237,233,227,0.25);text-align:center;">ข้อมูลที่ไม่ได้เลือกจะถูกแทนที่</div>
    </div>
  `;

  // เก็บ cloud data ไว้ใช้ตอน user เลือก
  window._pendingCloudData = { cloudDataString, cloudTime };
  document.body.appendChild(dialog);
}

window.chooseMerge = function(choice) {
  const dialog = document.getElementById('merge-dialog');
  if (dialog) dialog.remove();

  if (choice === 'cloud' && window._pendingCloudData) {
    applyCloudData(window._pendingCloudData.cloudDataString, window._pendingCloudData.cloudTime);
    showSyncStatus('☁️ โหลดข้อมูลจาก Cloud แล้ว', 'var(--green)');
  } else {
    syncToCloud(true);
    showSyncStatus('☁️ ซิงค์ข้อมูลเครื่องนี้ขึ้น Cloud แล้ว', 'var(--green)');
  }
  // mark ว่าตัดสินใจแล้ว ไม่ให้โผล่อีกจนกว่าจะ sign out
  localStorage.setItem('scoretracker_merge_resolved', '1');
  window._pendingCloudData = null;
};

function applyCloudData(cloudDataString, cloudTime) {
  localStorage.setItem('scoretracker_v2', cloudDataString);
  localStorage.setItem('scoretracker_updated', cloudTime.toString());
  const _parsed = JSON.parse(cloudDataString);
  if (_parsed && _parsed.terms) {
    data = _parsed;
    data.terms.forEach(t => { if (!t.gradeMode) t.gradeMode = 'uni'; });
    currentTermId = data.currentTermId || data.terms[0].id;
    const _termOk = data.terms.some(t => t.id === currentTermId);
    if (!_termOk && data.terms.length > 0) currentTermId = data.terms[data.terms.length - 1].id;
    currentSubjectId = null;
    renderAll();
    showDashboard();
  }
}

// UI helpers
function showSyncStatus(msg, color) {
  document.querySelectorAll('#sync-status, .sync-status-text').forEach(el => {
    el.textContent = msg; 
    el.style.color = color;
  });
}

function updateSyncUI(signedIn) {
  document.querySelectorAll('#btn-signin, .btn-signin-action').forEach(el => el.style.display = signedIn ? 'none' : 'flex');
  document.querySelectorAll('#btn-signout, .btn-signout-action').forEach(el => el.style.display = signedIn ? 'block' : 'none');
  document.querySelectorAll('#sync-user, .sync-user-text').forEach(el => el.textContent = signedIn ? (currentUser?.email || '') : '');
}

// Start
initSupabase();