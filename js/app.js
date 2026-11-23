/**
 * TalesWeaver Companion Guide - Core Application Logic
 * Navigation, Profile Management, Stat Simulator, Checklists, and Calculators
 */

// ==================== 1. TAB SWITCHING ====================
function switchBossPanel(panelId, btnEl) {
  document.querySelectorAll('.boss-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.boss-sub-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(panelId).classList.add('active');
  btnEl.classList.add('active');
}

function toggleTaskPattern(ev, boxId) {
  ev.preventDefault();
  ev.stopPropagation();
  const box = document.getElementById(boxId);
  const btn = ev.currentTarget;
  if (!box) return;
  const isOpen = box.classList.toggle('open');
  btn.textContent = isOpen ? '📖 상세 패턴 · 공략 접기 ▴' : '📖 상세 패턴 · 공략 펼치기 ▾';
}

function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  btnEl.classList.add('active');
}

// ==================== 2. BUFF SELECTOR & SPEC SIMULATOR ====================
let inputMode = 'nobuff'; // 'nobuff' = user enters village stats, 'buff' = user enters already-buffed stats

// [Extracted to js/data.js]

function getSelectedBuffBonus() {
  let bonus = { mdef: 0, acc: 0, elem: 0, count: 0 };
  document.querySelectorAll('.buff-chk').forEach(chk => {
    const chip = chk.closest('.buff-chip');
    if (chk.checked) {
      chip.classList.add('checked');
      bonus.mdef += Number(chk.dataset.mdef || 0);
      bonus.acc  += Number(chk.dataset.acc || 0);
      bonus.elem += Number(chk.dataset.elem || 0);
      bonus.count++;
    } else {
      chip.classList.remove('checked');
    }
  });
  return bonus;
}

function setBuffMode(mode) {
  inputMode = mode;
  const btnNoBuff = document.getElementById('btn-nobuff');
  const btnBuff = document.getElementById('btn-buff');

  if (mode === 'nobuff') {
    btnNoBuff.className = 'toggle-btn active';
    btnBuff.className = 'toggle-btn';
  } else {
    btnNoBuff.className = 'toggle-btn';
    btnBuff.className = 'toggle-btn buff-active';
    // When switching to 'buff' input mode, uncheck individual additive buffs so they aren't double-counted
    document.querySelectorAll('.buff-chk').forEach(chk => chk.checked = false);
  }
  evaluateStats();
}

function onBuffToggle() {
  const bonus = getSelectedBuffBonus();
  if (bonus.count > 0 && inputMode === 'buff') {
    // Switch to nobuff base input mode automatically so selected buffs add on top of base stats
    inputMode = 'nobuff';
    document.getElementById('btn-nobuff').className = 'toggle-btn active';
    document.getElementById('btn-buff').className = 'toggle-btn';
  }
  evaluateStats();
}

function toggleAllBuffs(state) {
  document.querySelectorAll('.buff-chk').forEach(chk => chk.checked = state);
  if (state) {
    inputMode = 'nobuff';
    document.getElementById('btn-nobuff').className = 'toggle-btn active';
    document.getElementById('btn-buff').className = 'toggle-btn';
  }
  evaluateStats();
}

function renderMinSpecTable(effectiveBuffMode) {
  const data = thresholds[effectiveBuffMode];
  const selectedKey = document.getElementById('target-dungeon').value;
  const tbody = document.getElementById('min-spec-tbody');
  const label = document.getElementById('table-mode-label');

  if (effectiveBuffMode === 'buff') {
    label.textContent = '실전 버프·도핑 적용 기준';
    label.style.color = '#34d399';
  } else {
    label.textContent = '마을 노버프 기준';
    label.style.color = '#38bdf8';
  }

  const keys = ['shinjo', 'abyss_normal', 'abyss_hell', 'obang_hell', 'rokagos', 'eclipse_high', 'obang_abyss'];
  const bgStyle = (k) => k === selectedKey ? 'style="background: rgba(56, 189, 248, 0.14);"' : '';

  tbody.innerHTML = `
    <tr>
      <td><b>권장 장비</b></td>
      ${keys.map(k => `<td ${bgStyle(k)}>${data[k].equip}</td>`).join('')}
    </tr>
    <tr>
      <td><b>🛡️ 마법방어력</b></td>
      ${keys.map(k => `<td ${bgStyle(k)}><b>${data[k].mdef.toLocaleString()}</b>+</td>`).join('')}
    </tr>
    <tr>
      <td><b>🎯 명중률</b></td>
      ${keys.map(k => `<td ${bgStyle(k)}><b>${data[k].acc.toLocaleString()}</b>+</td>`).join('')}
    </tr>
    <tr>
      <td><b>🌪️ 풍속성</b></td>
      ${keys.map(k => `<td ${bgStyle(k)}><b>${data[k].elem}</b>+</td>`).join('')}
    </tr>
    <tr>
      <td><b>✨ 에타 (ETA)</b></td>
      ${keys.map(k => `<td ${bgStyle(k)}><b>${data[k].eta}레벨</b>+</td>`).join('')}
    </tr>
  `;
}


// ==================== ADVANCED DOPING & CONFLICT MANAGEMENT ====================
// [Extracted to js/data.js]

// [Extracted to js/data.js]

function switchDopingNav(panelId, btnEl) {
  document.querySelectorAll('.doping-nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.doping-cat-panel').forEach(p => p.classList.remove('active'));
  btnEl.classList.add('active');
  const target = document.getElementById(panelId);
  if (target) target.classList.add('active');
}


// ==================== DYNAMIC CONFLICT LOCKING & FILTERING ====================
let currentStackFilter = 'all';

function filterStackType(type, btnEl) {
  currentStackFilter = type;
  document.querySelectorAll('.stack-filter-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  document.querySelectorAll('.doping-card').forEach(card => {
    const stack = card.dataset.stack;
    if (type === 'all') {
      card.style.display = '';
    } else if (type === 'ok') {
      card.style.display = stack === 'ok' ? '' : 'none';
    } else if (type === 'limit') {
      card.style.display = stack === 'limit' ? '' : 'none';
    }
  });
}

function updateConflictLocks() {
  // Clear existing locks
  document.querySelectorAll('.doping-card').forEach(c => {
    c.classList.remove('conflict-locked');
    const chk = c.querySelector('.buff-chk');
    if (chk) chk.disabled = false;
    const lockMsg = c.querySelector('.lock-warning-tag');
    if (lockMsg) lockMsg.remove();
  });

  // Find all currently checked keys
  const checkedKeys = [];
  document.querySelectorAll('.buff-chk:checked').forEach(chk => {
    checkedKeys.push(chk.dataset.key);
  });

  // Apply locks for conflicting items
  checkedKeys.forEach(key => {
    if (conflictMap[key]) {
      const conflicts = conflictMap[key].conflicts;
      const srcName = conflictMap[key].name;
      conflicts.forEach(cKey => {
        const cCard = document.getElementById('card-' + cKey);
        const cChk = document.querySelector(`.buff-chk[data-key="${cKey}"]`);
        if (cCard && cChk && !cChk.checked) {
          cCard.classList.add('conflict-locked');
          cChk.disabled = true;
          if (!cCard.querySelector('.lock-warning-tag')) {
            const warn = document.createElement('div');
            warn.className = 'lock-warning-tag';
            warn.innerHTML = `🚫 <b>[${srcName}]</b> 적용 중으로 중첩 불가`;
            cCard.appendChild(warn);
          }
        }
      });
    }
  });
}



function onDopingToggle(key) {
  const chk = document.querySelector(`.buff-chk[data-key="${key}"]`);
  const card = document.getElementById('card-' + key);
  
  if (chk && chk.checked) {
    if (card) card.classList.add('checked');
    
    // Check conflicts
    if (conflictMap[key]) {
      const conflicts = conflictMap[key].conflicts;
      let uncheckNames = [];
      conflicts.forEach(cKey => {
        const cChk = document.querySelector(`.buff-chk[data-key="${cKey}"]`);
        if (cChk && cChk.checked) {
          cChk.checked = false;
          const cCard = document.getElementById('card-' + cKey);
          if (cCard) cCard.classList.remove('checked');
          uncheckNames.push(conflictMap[cKey] ? conflictMap[cKey].name : cKey);
        }
      });
      if (uncheckNames.length > 0) {
        showConflictToast(`⚠️ [${conflictMap[key].name}] 선택으로 인해 중복 불가인 [${uncheckNames.join(', ')}]이(가) 자동 해제되었습니다.`);
      }
    }
  } else if (card) {
    card.classList.remove('checked');
  }
  
  evaluateStats();
}

function showConflictToast(msg) {
  const toast = document.getElementById('conflict-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);
}

function applyDopingPreset(presetKey) {
  const keys = dopingPresets[presetKey] || [];
  
  // Uncheck all first
  document.querySelectorAll('.buff-chk').forEach(chk => {
    chk.checked = false;
    const card = document.getElementById('card-' + chk.dataset.key);
    if (card) card.classList.remove('checked');
  });

  // Check preset keys
  keys.forEach(k => {
    const chk = document.querySelector(`.buff-chk[data-key="${k}"]`);
    if (chk) {
      chk.checked = true;
      const card = document.getElementById('card-' + k);
      if (card) card.classList.add('checked');
    }
  });

  const toast = document.getElementById('conflict-toast');
  if (toast) toast.classList.remove('show');

  evaluateStats();
}

function filterDopingTable(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll('.doping-row').forEach(row => {
    const text = (row.dataset.search || '').toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

// Override getSelectedBuffBonus
function getSelectedBuffBonus() {
  let bonus = { mdef: 0, acc: 0, elem: 0, dmg: 0, dmgred: 0, exp: 0, rare: 0, count: 0 };
  document.querySelectorAll('.buff-chk').forEach(chk => {
    const card = document.getElementById('card-' + chk.dataset.key);
    if (chk.checked) {
      if (card) card.classList.add('checked');
      bonus.mdef   += Number(chk.dataset.mdef || 0);
      bonus.acc    += Number(chk.dataset.acc || 0);
      bonus.elem   += Number(chk.dataset.elem || 0);
      bonus.dmg    += Number(chk.dataset.dmg || 0);
      bonus.dmgred += Number(chk.dataset.dmgred || 0);
      bonus.exp    += Number(chk.dataset.exp || 0);
      bonus.rare   += Number(chk.dataset.rare || 0);
      bonus.count++;
    } else if (card) {
      card.classList.remove('checked');
    }
  });

  // Update summary dashboard metrics
  const cntEl = document.getElementById('doping-active-count');
  if (cntEl) cntEl.textContent = `${bonus.count}개 선택됨`;

  if (document.getElementById('metric-mdef'))   document.getElementById('metric-mdef').textContent   = `+${bonus.mdef}`;
  if (document.getElementById('metric-acc'))    document.getElementById('metric-acc').textContent    = `+${bonus.acc}`;
  if (document.getElementById('metric-elem'))   document.getElementById('metric-elem').textContent   = `+${bonus.elem}`;
  if (document.getElementById('metric-dmg'))    document.getElementById('metric-dmg').textContent    = `+${bonus.dmg}%`;
  if (document.getElementById('metric-dmgred')) document.getElementById('metric-dmgred').textContent = `+${bonus.dmgred}%`;
  if (document.getElementById('metric-exp'))    document.getElementById('metric-exp').textContent    = `+${bonus.exp}%`;
  if (document.getElementById('metric-rare'))   document.getElementById('metric-rare').textContent   = `+${bonus.rare}%`;

  return bonus;
}


function evaluateStats() {
  const targetKey = document.getElementById('target-dungeon') ? document.getElementById('target-dungeon').value : 'rokagos';
  const bonus = getSelectedBuffBonus();

  // Determine whether we evaluate against 'buff' threshold or 'nobuff' threshold
  const effectiveMode = (inputMode === 'buff' || bonus.count > 0) ? 'buff' : 'nobuff';
  const req = thresholds[effectiveMode][targetKey];
  
  // Render Minimum Spec Table (최저 수치 정리표 실시간 렌더링)
  renderMinSpecTable(effectiveMode);

  // Update target chips (최저 수치 기준 칩 실시간 갱신)
  const modeTag = effectiveMode === 'buff' ? '실전 기준' : '마을 기준';
  if (document.getElementById('req-mdef')) document.getElementById('req-mdef').textContent = `${modeTag}: ${req.mdef.toLocaleString()}+`;
  if (document.getElementById('req-acc'))  document.getElementById('req-acc').textContent  = `${modeTag}: ${req.acc.toLocaleString()}+`;
  if (document.getElementById('req-elem')) document.getElementById('req-elem').textContent = `${modeTag}: ${req.elem}+`;
  if (document.getElementById('req-eta'))  document.getElementById('req-eta').textContent  = `기준: ${req.eta}+`;

  const fields = [
    { id: 'mdef', raw: document.getElementById('in-mdef').value, add: bonus.mdef, min: req.mdef, unit: '' },
    { id: 'acc',  raw: document.getElementById('in-acc').value,  add: bonus.acc,  min: req.acc,  unit: '' },
    { id: 'elem', raw: document.getElementById('in-elem').value, add: bonus.elem, min: req.elem, unit: '' },
    { id: 'eta',  raw: document.getElementById('in-eta').value,  add: 0,          min: req.eta,  unit: 'Lv' }
  ];

  let enteredCount = 0;
  let passCount = 0;
  let missItems = [];

  fields.forEach(f => {
    const resEl = document.getElementById('res-' + f.id);
    const prevEl = document.getElementById('prev-' + f.id);
    if (!resEl || !prevEl) return;

    if (f.raw === '' || isNaN(Number(f.raw))) {
      resEl.className = 'result-pill res-empty';
      resEl.innerHTML = '<span>수치를 입력하세요</span><span>-</span>';
      if (f.id !== 'eta') {
        prevEl.textContent = f.add > 0 ? `버프 보너스 +${f.add} 대기 중` : '마을 또는 버프 수치 입력';
      }
      return;
    }

    enteredCount++;
    const baseNum = Number(f.raw);
    const totalNum = baseNum + f.add;
    const diff = totalNum - f.min;

    if (f.id !== 'eta') {
      if (f.add > 0) {
        prevEl.innerHTML = `기본 ${baseNum.toLocaleString()} + 버프 ${f.add} = <b style="color:#38bdf8;">총 ${totalNum.toLocaleString()}</b>`;
      } else {
        prevEl.textContent = inputMode === 'buff' ? `실전 적용 수치: ${totalNum.toLocaleString()}` : `마을 노버프 수치: ${totalNum.toLocaleString()}`;
      }
    }

    if (diff >= 0) {
      passCount++;
      resEl.className = 'result-pill res-pass';
      resEl.innerHTML = `<span>달성 (+${diff.toLocaleString()})</span><span>OK</span>`;
    } else {
      resEl.className = 'result-pill res-fail';
      const labelName = f.id === 'mdef' ? '마방' : (f.id === 'acc' ? '명중' : (f.id === 'elem' ? '속성' : '에타'));
      resEl.innerHTML = `<span>부족 (${diff.toLocaleString()})</span><span>미달</span>`;
      missItems.push(`${labelName} ${Math.abs(diff)} 부족`);
    }
  });

  // Overall Result Banner
  const ovEl = document.getElementById('overall-result');
  if (ovEl) {
    if (enteredCount === 0) {
      ovEl.className = 'overall-banner res-empty';
      ovEl.innerHTML = `<span>📋 종합 진단 결과: 위 칸에 내 스탯을 입력하고 버프를 선택하면 진입 가능 여부를 판정해 드립니다.</span>`;
    } else if (passCount === 4) {
      ovEl.className = 'overall-banner res-pass';
      ovEl.innerHTML = `
        <span style="font-size:1.05rem;">🎉 <b>[${req.name}]</b> 진입 스펙 충족 완료! (올힛 / 1인분 클리어 가능)</span>
        <span style="font-size:0.85rem; color:#a7f3d0; margin-top:2px;">모든 최소 컷(마방·명중·속성·에타)을 안정적으로 통과했습니다.</span>
      `;
    } else {
      ovEl.className = 'overall-banner res-fail';
      ovEl.innerHTML = `
        <span style="font-size:1.05rem;">⚠️ <b>[${req.name}]</b> 진입 주의: <b>${missItems.join(' · ')}</b></span>
        <span style="font-size:0.85rem; color:#fecaca; margin-top:2px;">명중 부족 시 보스 타격 시 미스가 발생하며, 마방 부족 시 급사 위험이 있습니다. 버프 추가 또는 장비 보강을 권장합니다.</span>
      `;
    }
  }

  // Render Dungeon Readiness Matrix
  renderDungeonMatrix(effectiveMode, bonus);

  // Update conflict locks
  if (typeof updateConflictLocks === 'function') {
    updateConflictLocks();
  }

  // Save to active profile
  if (typeof saveCurrentStateToProfile === 'function') {
    saveCurrentStateToProfile();
  }
}

function loadSavedStats() {
  try {
    const saved = JSON.parse(localStorage.getItem('tw_anais_stat_sim_v2') || '{}');
    if (saved.mdef) document.getElementById('in-mdef').value = saved.mdef;
    if (saved.acc) document.getElementById('in-acc').value = saved.acc;
    if (saved.elem) document.getElementById('in-elem').value = saved.elem;
    if (saved.eta) document.getElementById('in-eta').value = saved.eta;
    if (saved.target) document.getElementById('target-dungeon').value = saved.target;
    if (saved.inputMode) inputMode = saved.inputMode;
    if (Array.isArray(saved.buffs)) {
      document.querySelectorAll('.buff-chk').forEach(chk => {
        chk.checked = saved.buffs.includes(chk.dataset.key);
      });
    }
    document.getElementById('btn-nobuff').className = inputMode === 'nobuff' ? 'toggle-btn active' : 'toggle-btn';
    document.getElementById('btn-buff').className   = inputMode === 'buff'   ? 'toggle-btn buff-active' : 'toggle-btn';
  } catch (e) {}
  evaluateStats();
}

// ==================== 3. WEEKLY CHECKLIST ====================
// [Extracted to js/data.js]

function updateWeeklyProgress() {
  const checkboxes = document.querySelectorAll('.weekly-chk');
  const total = checkboxes.length;
  let checkedCount = 0;
  const state = {};

  checkboxes.forEach(chk => {
    const item = chk.closest('.task-item');
    const key = chk.dataset.id || chk.dataset.task;
    if (chk.checked) {
      checkedCount++;
      if (item) item.classList.add('done');
      if (key) state[key] = true;
    } else {
      if (item) item.classList.remove('done');
    }
  });

  const pct = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
  const pBar = document.getElementById('weekly-progress-bar');
  if (pBar) pBar.style.width = `${pct}%`;
  const pText = document.getElementById('weekly-progress-text');
  if (pText) pText.textContent = `${checkedCount} / ${total} 완료 (${pct}%)`;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {}
}

function loadWeeklyTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    document.querySelectorAll('.weekly-chk').forEach(chk => {
      const key = chk.dataset.id || chk.dataset.task;
      if (key && saved[key]) {
        chk.checked = true;
      }
      chk.addEventListener('change', updateWeeklyProgress);
    });
  } catch (e) {}
  updateWeeklyProgress();
}

function resetWeeklyTasks() {
  document.querySelectorAll('.weekly-chk').forEach(chk => {
    chk.checked = false;
  });
  updateWeeklyProgress();
}


// ==================== 4. TALESRUNE-STYLE CALCULATORS ====================
function switchSubCalc(subId, btnEl) {
  document.querySelectorAll('.sub-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(subId).classList.add('active');
  btnEl.classList.add('active');
}

// --- 4-1. Waste Paper Calculator (폐지 계산기) ---
let wasteNpcMode = 'normal'; // 'normal' = 우즈, 'bonus' = 플링 & 팔색조 (1.125x)

// [Extracted to js/data.js]

let wasteQtyMap = {};

function setWasteNpc(mode) {
  wasteNpcMode = mode;
  document.getElementById('btn-npc-normal').className = mode === 'normal' ? 'toggle-btn active' : 'toggle-btn';
  document.getElementById('btn-npc-bonus').className  = mode === 'bonus'  ? 'toggle-btn buff-active' : 'toggle-btn';
  renderWasteTable();
}

function updateWasteQty(id, val) {
  const n = Math.max(0, Math.floor(Number(val) || 0));
  wasteQtyMap[id] = n;
  const item = wasteItems.find(x => x.id === id);
  if (item) {
    const unit = wasteNpcMode === 'normal' ? item.normal : item.bonus;
    const cell = document.getElementById('wsub-' + id);
    if (cell) cell.textContent = (unit * n).toLocaleString() + ' 시드';
  }
  recalcWasteTotals();
}

function recalcWasteTotals() {
  let sumNormal = 0;
  let sumBonus = 0;
  wasteItems.forEach(item => {
    const q = wasteQtyMap[item.id] || 0;
    sumNormal += item.normal * q;
    sumBonus  += item.bonus * q;
  });
  const activeTotal = wasteNpcMode === 'normal' ? sumNormal : sumBonus;
  document.getElementById('waste-total-seed').textContent = activeTotal.toLocaleString() + ' 시드';
  document.getElementById('waste-sum-normal').textContent = sumNormal.toLocaleString();
  document.getElementById('waste-sum-bonus').textContent  = sumBonus.toLocaleString();
}

function renderWasteTable() {
  const kw = (document.getElementById('waste-search').value || '').trim().toLowerCase();
  const tbody = document.getElementById('waste-tbody');
  const filtered = wasteItems.filter(it => it.name.toLowerCase().includes(kw));

  tbody.innerHTML = filtered.map(it => {
    const q = wasteQtyMap[it.id] || '';
    const unit = wasteNpcMode === 'normal' ? it.normal : it.bonus;
    const sub = (Number(q) || 0) * unit;
    return `
      <tr>
        <td><b>${it.name}</b></td>
        <td style="text-align:right; color:${wasteNpcMode === 'normal' ? '#38bdf8' : '#94a3b8'};">${it.normal.toLocaleString()}</td>
        <td style="text-align:right; color:${wasteNpcMode === 'bonus' ? '#34d399' : '#94a3b8'};">${it.bonus.toLocaleString()}</td>
        <td style="text-align:right;">
          <input type="number" min="0" class="num-input-sm" value="${q}" placeholder="0"
                 oninput="updateWasteQty('${it.id}', this.value)">
        </td>
        <td id="wsub-${it.id}" style="text-align:right; font-weight:700; color:#fcd34d;">${sub.toLocaleString()} 시드</td>
      </tr>
    `;
  }).join('');
  recalcWasteTotals();
}

function resetWasteInputs() {
  wasteQtyMap = {};
  renderWasteTable();
}

// --- 4-2. Abendon Road Magic Stone Calculator (어밴던로드 마정석 계산기) ---
// [Extracted to js/data.js]
let abendonCustomQty = {}; // key: "stage_run", value: number

function updateAbendonRun(stage, runIdx, val) {
  const key = `${stage}_${runIdx}`;
  if (val === '' || val === null) {
    delete abendonCustomQty[key];
  } else {
    abendonCustomQty[key] = Math.max(0, Math.floor(Number(val) || 0));
  }
  renderAbendonTable();
}

function renderAbendonTable() {
  const stage = Number(document.getElementById('abendon-stage').value);
  const cfg = abendonConfig[stage];
  document.getElementById('abendon-stone-price').textContent = cfg.stoneVal.toLocaleString() + ' 시드';

  const tbody = document.getElementById('abendon-tbody');
  let rowsHtml = '';
  let totalFee = 0;
  let totalGross = 0;
  let totalNet = 0;

  for (let i = 1; i <= 10; i++) {
    const fee = cfg.baseFee * i;
    const minNet = cfg.minStones * cfg.stoneVal - fee;
    const maxNet = cfg.maxStones * cfg.stoneVal - fee;
    const key = `${stage}_${i}`;
    const hasCustom = Object.prototype.hasOwnProperty.call(abendonCustomQty, key);
    const actualStones = hasCustom ? abendonCustomQty[key] : cfg.minStones;
    const gross = actualStones * cfg.stoneVal;
    const net = gross - fee;

    if (hasCustom) {
      totalFee += fee;
      totalGross += gross;
      totalNet += net;
    }

    const fmtNet = (v) => `<span class="${v >= 0 ? 'profit-pos' : 'profit-neg'}">${v >= 0 ? '+' : ''}${v.toLocaleString()} 시드</span>`;

    rowsHtml += `
      <tr ${hasCustom ? 'style="background: rgba(56, 189, 248, 0.1);"' : ''}>
        <td><b>${i}회차</b></td>
        <td style="text-align:right;">${fee.toLocaleString()} 시드</td>
        <td style="text-align:center;">${cfg.minStones}개 ~ ${cfg.maxStones}개</td>
        <td style="text-align:right;">${fmtNet(minNet)}</td>
        <td style="text-align:right;">${fmtNet(maxNet)}</td>
        <td style="text-align:right;">
          <input type="number" min="0" class="num-input-sm" value="${hasCustom ? actualStones : ''}" placeholder="${cfg.minStones}"
                 oninput="updateAbendonRun(${stage}, ${i}, this.value)">
        </td>
        <td style="text-align:right;">${fmtNet(net)}</td>
      </tr>
    `;
  }

  tbody.innerHTML = rowsHtml;

  // If no custom runs entered yet, show default 1~8 profitable runs summary hint or 0
  const hasAnyCustom = Object.keys(abendonCustomQty).some(k => k.startsWith(stage + '_'));
  if (!hasAnyCustom) {
    document.getElementById('abendon-total-profit').innerHTML = `<span style="color:#94a3b8; font-size:1rem;">우측 실제 획득 수량을 입력하면 누적 순이익이 합산됩니다</span>`;
    document.getElementById('abendon-total-fee').textContent = '0';
    document.getElementById('abendon-total-gross').textContent = '0';
  } else {
    document.getElementById('abendon-total-profit').innerHTML =
      `<span class="${totalNet >= 0 ? 'profit-pos' : 'profit-neg'}">${totalNet >= 0 ? '+' : ''}${totalNet.toLocaleString()} 시드</span>`;
    document.getElementById('abendon-total-fee').textContent = totalFee.toLocaleString();
    document.getElementById('abendon-total-gross').textContent = totalGross.toLocaleString();
  }
}

function resetAbendonInputs() {
  abendonCustomQty = {};
  renderAbendonTable();
}

// --- 4-3. Equipment Crafting Material Calculator (장비 제작 재료 계산기) ---
// [Extracted to js/data.js]

let equipUnitPrices = {};

function updateEquipPrice(key, val) {
  equipUnitPrices[key] = Math.max(0, Math.floor(Number(val) || 0));
  updateEquipTotalsOnly();
}

function updateEquipTotalsOnly() {
  const tier = document.getElementById('equip-tier-select').value;
  const recipe = equipRecipes[tier];
  recipe.parts.forEach((p, idx) => {
    let total = 0;
    p.mats.forEach(m => {
      total += (equipUnitPrices[m.key] || 0) * m.qty;
    });
    const el = document.getElementById(`eq-total-${tier}-${idx}`);
    if (el) el.textContent = `총 ${total.toLocaleString()} Seed`;
  });
}

function renderEquipCalc() {
  const tier = document.getElementById('equip-tier-select').value;
  const recipe = equipRecipes[tier];

  const priceGrid = document.getElementById('equip-price-grid');
  priceGrid.innerHTML = recipe.sharedPrices.map(sp => {
    const val = equipUnitPrices[sp.key] || '';
    return `
      <div style="background: rgba(30,41,59,0.75); border: 1px solid var(--card-border); border-radius: 8px; padding: 0.55rem 0.75rem; display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
        <span style="font-size:0.84rem; font-weight:700; color:#e2e8f0;">${sp.name}</span>
        <input type="number" min="0" class="num-input-price" value="${val}" placeholder="단가 입력"
               oninput="updateEquipPrice('${sp.key}', this.value)">
      </div>
    `;
  }).join('');

  const cardsGrid = document.getElementById('equip-cards-grid');
  cardsGrid.innerHTML = recipe.parts.map((p, idx) => {
    let total = 0;
    const matLines = p.mats.map(m => {
      const unit = equipUnitPrices[m.key] || 0;
      total += unit * m.qty;
      return `
        <div class="mat-row">
          <span>${m.label} <b>(${m.qty}개)</b></span>
          <span style="color:#94a3b8;">${(unit * m.qty).toLocaleString()}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="equip-card">
        <div class="equip-card-header">
          <span class="equip-card-title">${p.part}</span>
          <span class="equip-base-tag">재료 장비: ${p.base}</span>
        </div>
        <div>${matLines}</div>
        <div class="equip-card-footer">
          <span>예상 제작 비용</span>
          <span id="eq-total-${tier}-${idx}">총 ${total.toLocaleString()} Seed</span>
        </div>
      </div>
    `;
  }).join('');
}

function resetEquipPrices() {
  equipUnitPrices = {};
  renderEquipCalc();
}


// ==================== MULTI-CHARACTER PROFILE & GLOBAL STATE ====================
let gweRate = 44000000;
let profiles = [];
let currentProfileId = 'char_1';

// [Extracted to js/data.js]

function initProfiles() {
  try {
    const saved = localStorage.getItem('tw_companion_profiles_v3');
    profiles = saved ? JSON.parse(saved) : defaultProfiles;
    const lastActive = localStorage.getItem('tw_companion_active_id');
    if (lastActive && profiles.some(p => p.id === lastActive)) {
      currentProfileId = lastActive;
    } else {
      currentProfileId = profiles[0].id;
    }
    const savedGwe = localStorage.getItem('tw_companion_gwe_rate');
    if (savedGwe) {
      gweRate = Number(savedGwe);
      const el = document.getElementById('global-gwe-rate');
      if (el) el.value = gweRate;
    }
    if (localStorage.getItem('tw_compact_mode') === '1') {
      document.body.classList.add('compact-mode');
      const btn = document.getElementById('btn-compact');
      if (btn) btn.textContent = '🖥️ 기본 뷰';
    }
  } catch (e) {
    profiles = defaultProfiles;
    currentProfileId = 'char_1';
  }
  renderProfileSelect();
  applyProfile(currentProfileId);
}

function renderProfileSelect() {
  const sel = document.getElementById('profile-select');
  if (!sel) return;
  sel.innerHTML = profiles.map(p => 
    `<option value="${p.id}" ${p.id === currentProfileId ? 'selected' : ''}>${p.name}</option>`
  ).join('');

  const cur = profiles.find(p => p.id === currentProfileId);
  const badgeEl = document.getElementById('profile-job-badge');
  if (badgeEl && cur) {
    const jobNames = {
      anais_biho: '비호정령(마방)',
      roamini: '로아미니(디버퍼)',
      yepnen: '예프넨(딜러)',
      tichiel_white: '백법(서포터)',
      cloe: '클로에(마딜)',
      other: '기타'
    };
    badgeEl.textContent = jobNames[cur.job] || cur.job;
  }
}

function switchProfile(newId) {
  saveCurrentStateToProfile();
  currentProfileId = newId;
  localStorage.setItem('tw_companion_active_id', newId);
  applyProfile(newId);
  renderProfileSelect();
}

function applyProfile(id) {
  const p = profiles.find(x => x.id === id);
  if (!p) return;

  if (document.getElementById('in-mdef')) document.getElementById('in-mdef').value = p.mdef || '';
  if (document.getElementById('in-acc'))  document.getElementById('in-acc').value  = p.acc  || '';
  if (document.getElementById('in-elem')) document.getElementById('in-elem').value = p.elem || '';
  if (document.getElementById('in-eta'))  document.getElementById('in-eta').value  = p.eta  || '';
  if (document.getElementById('target-dungeon')) document.getElementById('target-dungeon').value = p.target || 'rokagos';
  
  inputMode = p.inputMode || 'nobuff';
  document.getElementById('btn-nobuff').className = inputMode === 'nobuff' ? 'toggle-btn active' : 'toggle-btn';
  document.getElementById('btn-buff').className   = inputMode === 'buff'   ? 'toggle-btn buff-active' : 'toggle-btn';

  document.querySelectorAll('.buff-chk').forEach(chk => {
    chk.checked = Array.isArray(p.buffs) && p.buffs.includes(chk.dataset.key);
  });

  // Apply weekly tasks
  document.querySelectorAll('.weekly-chk').forEach(chk => {
    const tKey = chk.dataset.task || chk.dataset.id;
    chk.checked = !!(p.tasks && p.tasks[tKey]);
  });

  evaluateStats();
  updateWeeklyProgress();
}

function saveCurrentStateToProfile() {
  const p = profiles.find(x => x.id === currentProfileId);
  if (!p) return;

  p.mdef = Number(document.getElementById('in-mdef').value) || 0;
  p.acc  = Number(document.getElementById('in-acc').value)  || 0;
  p.elem = Number(document.getElementById('in-elem').value) || 0;
  p.eta  = Number(document.getElementById('in-eta').value)  || 0;
  p.target = document.getElementById('target-dungeon').value;
  p.inputMode = inputMode;

  const buffs = [];
  document.querySelectorAll('.buff-chk:checked').forEach(chk => buffs.push(chk.dataset.key));
  p.buffs = buffs;

  const tasks = {};
  document.querySelectorAll('.weekly-chk').forEach(chk => {
    if (chk.checked) tasks[chk.dataset.task] = true;
  });
  p.tasks = tasks;

  try {
    localStorage.setItem('tw_companion_profiles_v3', JSON.stringify(profiles));
  } catch (e) {}
}

function openProfileModal(mode) {
  const modal = document.getElementById('profile-modal');
  modal.classList.add('active');
  const title = document.getElementById('modal-title');
  const idInput = document.getElementById('modal-profile-id');
  const nameInput = document.getElementById('modal-char-name');
  const jobInput = document.getElementById('modal-char-job');
  const memoInput = document.getElementById('modal-char-memo');

  if (mode === 'create') {
    title.textContent = '➕ 새 캐릭터 프로필 등록';
    idInput.value = 'char_' + Date.now();
    nameInput.value = '';
    jobInput.value = 'anais_biho';
    memoInput.value = '';
  } else {
    const cur = profiles.find(p => p.id === currentProfileId);
    title.textContent = '✏️ 캐릭터 프로필 설정';
    idInput.value = cur.id;
    nameInput.value = cur.name;
    jobInput.value = cur.job || 'anais_biho';
    memoInput.value = cur.memo || '';
  }
}

function closeProfileModal() {
  document.getElementById('profile-modal').classList.remove('active');
}

function saveProfileFromModal() {
  const id = document.getElementById('modal-profile-id').value;
  const name = document.getElementById('modal-char-name').value.trim() || '새 캐릭터';
  const job = document.getElementById('modal-char-job').value;
  const memo = document.getElementById('modal-char-memo').value.trim();

  let p = profiles.find(x => x.id === id);
  if (!p) {
    p = {
      id: id,
      name: name,
      job: job,
      memo: memo,
      mdef: 1400,
      acc: 1300,
      elem: 165,
      eta: 1,
      target: 'shinjo',
      inputMode: 'nobuff',
      buffs: ['buff_trust'],
      tasks: {}
    };
    profiles.push(p);
  } else {
    p.name = name;
    p.job = job;
    p.memo = memo;
  }

  currentProfileId = id;
  localStorage.setItem('tw_companion_profiles_v3', JSON.stringify(profiles));
  localStorage.setItem('tw_companion_active_id', id);
  closeProfileModal();
  renderProfileSelect();
  applyProfile(id);
}

function deleteCurrentProfile() {
  if (profiles.length <= 1) {
    alert('최소 1개의 캐릭터 프로필은 유지되어야 합니다.');
    return;
  }
  const cur = profiles.find(p => p.id === currentProfileId);
  if (!confirm(`'${cur.name}' 프로필을 정말 삭제하시겠습니까?`)) return;

  profiles = profiles.filter(p => p.id !== currentProfileId);
  currentProfileId = profiles[0].id;
  localStorage.setItem('tw_companion_profiles_v3', JSON.stringify(profiles));
  localStorage.setItem('tw_companion_active_id', currentProfileId);
  renderProfileSelect();
  applyProfile(currentProfileId);
}

function toggleCompactMode() {
  const isCompact = document.body.classList.toggle('compact-mode');
  const btn = document.getElementById('btn-compact');
  btn.textContent = isCompact ? '🖥️ 기본 뷰' : '📱 컴팩트 모드';
  try {
    localStorage.setItem('tw_compact_mode', isCompact ? '1' : '0');
  } catch (e) {}
}

function onGweRateChange(val) {
  const num = Number(val) || 44000000;
  gweRate = num;
  localStorage.setItem('tw_companion_gwe_rate', num.toString());
  recalcWasteTotals();
  updateAbendonRun(5);
  renderEquipCalc();
}

// ==================== DUNGEON READINESS MATRIX ====================
function renderDungeonMatrix(effectiveMode, bonus) {
  const grid = document.getElementById('dungeon-matrix-grid');
  if (!grid) return;

  const rawMdef = Number(document.getElementById('in-mdef').value) || 0;
  const rawAcc  = Number(document.getElementById('in-acc').value)  || 0;
  const rawEta  = Number(document.getElementById('in-eta').value)  || 0;

  const curMdef = rawMdef + bonus.mdef;
  const curAcc  = rawAcc + bonus.acc;

  const dKeys = ['shinjo', 'abyss_normal', 'abyss_hell', 'obang_hell', 'rokagos', 'eclipse_high', 'obang_abyss'];
  const tSet = thresholds[effectiveMode];

  grid.innerHTML = dKeys.map(k => {
    const req = tSet[k];
    const diffAcc = curAcc - req.acc;
    const diffMdef = curMdef - req.mdef;
    const diffEta = rawEta - req.eta;

    let badgeClass = 'badge-pass';
    let badgeText = '🟢 올힛·가능';

    if (diffAcc < -50 || diffMdef < -100 || diffEta < 0) {
      badgeClass = 'badge-fail';
      badgeText = '🔴 미달·미스';
    } else if (diffAcc < 0 || diffMdef < 0) {
      badgeClass = 'badge-warn';
      badgeText = '🟡 명중 주의';
    }

    return `
      <div class="matrix-card" onclick="selectDungeonFromMatrix('${k}')">
        <div class="matrix-card-top">
          <span class="matrix-dungeon-name">${req.name}</span>
          <span class="matrix-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="matrix-stat-row">
          <span>요구 명중: <b>${req.acc.toLocaleString()}</b></span>
          <span style="color:${diffAcc >= 0 ? '#34d399' : '#f87171'}; font-weight:700;">
            ${diffAcc >= 0 ? '+' + diffAcc : diffAcc}
          </span>
        </div>
        <div class="matrix-stat-row">
          <span>요구 마방: <b>${req.mdef.toLocaleString()}</b></span>
          <span style="color:${diffMdef >= 0 ? '#34d399' : '#f87171'}; font-weight:700;">
            ${diffMdef >= 0 ? '+' + diffMdef : diffMdef}
          </span>
        </div>
        <div class="matrix-stat-row" style="border-top:1px dashed #334155; padding-top:4px; margin-top:5px;">
          <span>에타 기준: <b>${req.eta}Lv+</b></span>
          <span style="color:#94a3b8;">${req.equip}</span>
        </div>
      </div>
    `;
  }).join('');
}

function selectDungeonFromMatrix(key) {
  const sel = document.getElementById('target-dungeon');
  if (sel) {
    sel.value = key;
    evaluateStats();
    const targetEl = document.getElementById('overall-result');
    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ==================== THURSDAY COUNTDOWN & SEED REVENUE ====================
function updateThursdayCountdown() {
  const el = document.getElementById('thursday-countdown');
  if (!el) return;

  const now = new Date();
  const kstOffset = 9 * 60;
  const localOffset = now.getTimezoneOffset();
  const utc = now.getTime() + (localOffset * 60000);
  const kstNow = new Date(utc + (kstOffset * 60000));

  let daysUntil = (4 - kstNow.getDay() + 7) % 7;
  if (daysUntil === 0 && (kstNow.getHours() >= 6)) {
    daysUntil = 7;
  }

  const target = new Date(kstNow);
  target.setDate(kstNow.getDate() + daysUntil);
  target.setHours(6, 0, 0, 0);

  const diffMs = target - kstNow;
  if (diffMs <= 0) {
    el.textContent = 'D-0 00:00:00';
    return;
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diffMs / (1000 * 60)) % 60);
  const secs = Math.floor((diffMs / 1000) % 60);

  el.textContent = `D-${days} ${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}



// Enhanced updateWeeklyProgress
const originalUpdateWeeklyProgress = updateWeeklyProgress;
updateWeeklyProgress = function() {
  originalUpdateWeeklyProgress();

  const checkboxes = document.querySelectorAll('.weekly-chk');
  let totalTasks = checkboxes.length;
  let doneTasks = 0;
  let earnedSeed = 0;
  let totalPossibleSeed = 0;

  checkboxes.forEach(chk => {
    const s = Number(chk.dataset.seed) || 0;
    totalPossibleSeed += s;
    if (chk.checked) {
      doneTasks++;
      earnedSeed += s;
    }
  });

  const ratioEl = document.getElementById('weekly-task-ratio');
  const seedTextEl = document.getElementById('weekly-seed-text');
  const fillEl = document.getElementById('weekly-seed-fill');

  const pct = totalPossibleSeed > 0 ? Math.round((earnedSeed / totalPossibleSeed) * 100) : 0;

  if (ratioEl) ratioEl.textContent = `${doneTasks} / ${totalTasks} 완료 (${pct}%)`;
  if (seedTextEl) seedTextEl.textContent = `${(earnedSeed / 100000000).toFixed(2)}억 Seed (${pct}%)`;
  if (fillEl) fillEl.style.width = pct + '%';

  saveCurrentStateToProfile();
};

function bootCompanion() {
  initProfiles();
  setInterval(updateThursdayCountdown, 1000);
  updateThursdayCountdown();
  renderWasteTable();
  renderAbendonTable();
  renderEquipCalc();
  evaluateStats();
  updateWeeklyProgress();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootCompanion);
} else {
  bootCompanion();
}
