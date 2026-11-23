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

// ==================== 1-1. CHARACTER ARCHETYPE CONFIGURATION ====================
let selectedArchetype = 'magic_def';

function getCurrentArchetype() {
  return (typeof archetypeConfigs !== 'undefined' && archetypeConfigs[selectedArchetype]) || archetypeConfigs.magic_def;
}

function getDopingBonusForArch(archId, bonus) {
  if (!bonus) return 0;
  if (archId === 'magic_def') return bonus.mdef || 0;
  if (archId === 'stab' || archId === 'hack') return Math.round((bonus.acc || 0) * 0.7);
  if (archId === 'magic_atk') return Math.round((bonus.mdef || 0) * 0.5);
  if (archId === 'composite' || archId === 'magic_slash') return Math.round((bonus.acc || 0) * 0.5);
  return 0;
}

function onCharArchetypeChange(archId) {
  selectedArchetype = archId;
  try {
    localStorage.setItem('tw_selected_archetype', archId);
  } catch (e) {}

  const syncTypeSelect = document.getElementById('sync-tab1-type');
  if (syncTypeSelect) syncTypeSelect.value = archId;

  evaluateStats();

  const autoChk = document.getElementById('coeff-tab1-auto-sync');
  if (autoChk && autoChk.checked) {
    applyTab1ToCoeff(false, archId);
  }
}

function renderMinSpecTable(effectiveBuffMode) {
  const currentArch = getCurrentArchetype();
  const data = currentArch.thresholds[effectiveBuffMode];
  const selectedKey = document.getElementById('target-dungeon').value;
  const tbody = document.getElementById('min-spec-tbody');
  const label = document.getElementById('table-mode-label');

  if (effectiveBuffMode === 'buff') {
    label.textContent = `실전 버프·도핑 적용 기준 (${currentArch.shortName})`;
    label.style.color = '#34d399';
  } else {
    label.textContent = `마을 노버프 기준 (${currentArch.shortName})`;
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
      <td><b>${currentArch.icon} ${currentArch.statName}</b></td>
      ${keys.map(k => `<td ${bgStyle(k)}><b>${data[k].reqMain.toLocaleString()}</b>+</td>`).join('')}
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
  const currentArch = getCurrentArchetype();
  const targetKey = document.getElementById('target-dungeon') ? document.getElementById('target-dungeon').value : 'rokagos';
  const bonus = getSelectedBuffBonus();

  // Determine whether we evaluate against 'buff' threshold or 'nobuff' threshold
  const effectiveMode = (inputMode === 'buff' || bonus.count > 0) ? 'buff' : 'nobuff';
  const req = currentArch.thresholds[effectiveMode][targetKey];
  
  // Update Card 1 UI
  const cardMainTitle = document.getElementById('card-mainstat-title');
  if (cardMainTitle) cardMainTitle.textContent = `${currentArch.icon} ${currentArch.statName} (${currentArch.statCode})`;
  
  const inMdef = document.getElementById('in-mdef');
  if (inMdef && inMdef.getAttribute('data-arch') !== currentArch.id) {
    inMdef.setAttribute('data-arch', currentArch.id);
    inMdef.placeholder = currentArch.placeholder;
  }

  // Render Minimum Spec Table (최저 수치 정리표 실시간 렌더링)
  renderMinSpecTable(effectiveMode);

  // Update target chips (최저 수치 기준 칩 실시간 갱신)
  const modeTag = effectiveMode === 'buff' ? '실전 기준' : '마을 기준';
  if (document.getElementById('req-mdef')) document.getElementById('req-mdef').textContent = `${modeTag}: ${req.reqMain.toLocaleString()}+`;
  if (document.getElementById('req-acc'))  document.getElementById('req-acc').textContent  = `${modeTag}: ${req.acc.toLocaleString()}+`;
  if (document.getElementById('req-elem')) document.getElementById('req-elem').textContent = `${modeTag}: ${req.elem}+`;
  if (document.getElementById('req-eta'))  document.getElementById('req-eta').textContent  = `기준: ${req.eta}+`;

  const addMain = getDopingBonusForArch(currentArch.id, bonus);
  const fields = [
    { id: 'mdef', raw: document.getElementById('in-mdef').value, add: addMain,   min: req.reqMain, unit: '', name: currentArch.statName },
    { id: 'acc',  raw: document.getElementById('in-acc').value,  add: bonus.acc, min: req.acc,     unit: '', name: '명중률' },
    { id: 'elem', raw: document.getElementById('in-elem').value, add: bonus.elem,min: req.elem,    unit: '', name: '속성' },
    { id: 'eta',  raw: document.getElementById('in-eta').value,  add: 0,         min: req.eta,     unit: 'Lv', name: '에타' }
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
      resEl.innerHTML = `<span>부족 (${diff.toLocaleString()})</span><span>미달</span>`;
      missItems.push(`${f.name} ${Math.abs(diff)} 부족`);
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
        <span style="font-size:1.05rem;">🎉 <b>[${req.name}]</b> [${currentArch.shortName}] 진입 스펙 충족 완료! (올힛 / 1인분 클리어 가능)</span>
        <span style="font-size:0.85rem; color:#a7f3d0; margin-top:2px;">모든 최소 컷(${currentArch.statName}·명중·속성·에타)을 안정적으로 통과했습니다.</span>
      `;
    } else {
      ovEl.className = 'overall-banner res-fail';
      ovEl.innerHTML = `
        <span style="font-size:1.05rem;">⚠️ <b>[${req.name}]</b> [${currentArch.shortName}] 진입 주의: <b>${missItems.join(' · ')}</b></span>
        <span style="font-size:0.85rem; color:#fecaca; margin-top:2px;">명중 부족 시 보스 타격 시 미스가 발생하며, ${currentArch.statName} 부족 시 공략 시간이 길어지거나 급사 위험이 있습니다.</span>
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

  // Update Tab 1 -> Tab 4 Realtime Sync Preview
  if (typeof updateTab1SyncPreview === 'function') {
    updateTab1SyncPreview(effectiveMode, bonus);
  }
}

function loadSavedStats() {
  try {
    const saved = JSON.parse(localStorage.getItem('tw_anais_stat_sim_v2') || '{}');
    const savedArch = localStorage.getItem('tw_selected_archetype') || saved.archetype || 'magic_def';
    selectedArchetype = savedArch;
    const archSelect = document.getElementById('char-archetype-select');
    if (archSelect) archSelect.value = savedArch;

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

  if (p.archetype) {
    selectedArchetype = p.archetype;
    const archSelect = document.getElementById('char-archetype-select');
    if (archSelect) archSelect.value = p.archetype;
  }

  evaluateStats();
  updateWeeklyProgress();
}

function saveCurrentStateToProfile() {
  const p = profiles.find(x => x.id === currentProfileId);
  if (!p) return;

  p.archetype = selectedArchetype;
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

  const currentArch = getCurrentArchetype();
  const rawMain = Number(document.getElementById('in-mdef').value) || 0;
  const rawAcc  = Number(document.getElementById('in-acc').value)  || 0;
  const rawEta  = Number(document.getElementById('in-eta').value)  || 0;

  const addMain = getDopingBonusForArch(currentArch.id, bonus);
  const curMain = rawMain + addMain;
  const curAcc  = rawAcc + bonus.acc;

  const dKeys = ['shinjo', 'abyss_normal', 'abyss_hell', 'obang_hell', 'rokagos', 'eclipse_high', 'obang_abyss'];
  const tSet = currentArch.thresholds[effectiveMode];

  grid.innerHTML = dKeys.map(k => {
    const req = tSet[k];
    const diffAcc = curAcc - req.acc;
    const diffMain = curMain - req.reqMain;
    const diffEta = rawEta - req.eta;

    let badgeClass = 'badge-pass';
    let badgeText = '🟢 올힛·가능';

    if (diffAcc < -50 || diffMain < -100 || diffEta < 0) {
      badgeClass = 'badge-fail';
      badgeText = '🔴 미달·미스';
    } else if (diffAcc < 0 || diffMain < 0) {
      badgeClass = 'badge-warn';
      badgeText = '🟡 주의 필요';
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
          <span>요구 ${currentArch.statCode}: <b>${req.reqMain.toLocaleString()}</b></span>
          <span style="color:${diffMain >= 0 ? '#34d399' : '#f87171'}; font-weight:700;">
            ${diffMain >= 0 ? '+' + diffMain : diffMain}
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
  initCoeffCalculator();
}

// ==================== 8. COEFFICIENT & ACCURACY CALCULATOR LOGIC ====================
// 출처: 구글 스프레드시트(텔쥐 계수계산기) & 디시인사이드 144536, 216109
const COEFF_STORAGE_KEY = 'tw_coeff_calculator_profiles_v3';
let coeffProfiles = [];
let activeCoeffProfileId = 'preset_screenshot';
let coeffEquipMode = 'override'; // 'override' = matches user screenshot 1400/770/891, 'slots' = dynamic sum

function loadCoeffProfiles() {
  try {
    const raw = localStorage.getItem(COEFF_STORAGE_KEY);
    if (raw) {
      coeffProfiles = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load coeff profiles', e);
  }
  if (!coeffProfiles || !coeffProfiles.length) {
    coeffProfiles = JSON.parse(JSON.stringify(defaultCoeffProfiles));
  }
  activeCoeffProfileId = coeffProfiles[0].id;
}

function saveCoeffProfiles() {
  try {
    localStorage.setItem(COEFF_STORAGE_KEY, JSON.stringify(coeffProfiles));
  } catch (e) {
    console.error('Failed to save coeff profiles', e);
  }
}

function getActiveCoeffProfile() {
  let prof = coeffProfiles.find(p => p.id === activeCoeffProfileId);
  if (!prof) {
    prof = coeffProfiles[0];
    activeCoeffProfileId = prof.id;
  }
  return prof;
}

function renderCoeffPresetSelect() {
  const select = document.getElementById('coeff-profile-select');
  if (!select) return;
  select.innerHTML = '';
  coeffProfiles.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    if (p.id === activeCoeffProfileId) opt.selected = true;
    select.appendChild(opt);
  });
}

function getSlotPreview(slotKey, baseId, typeKey) {
  const formula = coeffFormulas[typeKey] || coeffFormulas.stab;
  const dbList = itemBaseDb[slotKey] || [];
  const currItem = dbList.find(i => i.id === baseId) || dbList[0] || {};
  const mainVal = currItem[formula.mainStat.toLowerCase()] || 0;
  const subVal = currItem[formula.subStat.toLowerCase()] || 0;
  const dexVal = currItem.dex || 0;
  return `[주] ${formula.mainStat} ${mainVal} / [부] ${formula.subStat} ${subVal} (DEX ${dexVal})`;
}

function switchCoeffType(typeKey) {
  const prof = getActiveCoeffProfile();
  prof.type = typeKey;
  saveCoeffProfiles();

  document.querySelectorAll('.coeff-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === typeKey);
  });

  updateCoeffLabels();
  renderCoeffSlots();
  syncCoeffInputsFromProfile();
  calculateCoefficients();
}

function updateCoeffLabels() {
  const prof = getActiveCoeffProfile();
  const formula = coeffFormulas[prof.type] || coeffFormulas.stab;
  
  // Update bonus table headers
  const labelMain = document.getElementById('coeff-label-main');
  const labelSub  = document.getElementById('coeff-label-sub');
  if (labelMain) labelMain.textContent = formula.mainStat;
  if (labelSub)  labelSub.textContent  = formula.subStat;

  // Highlight and badge base stat rows
  ['stab', 'hack', 'int', 'mr'].forEach(st => {
    const row = document.getElementById(`coeff-base-row-${st}`);
    const badge = document.getElementById(`coeff-base-badge-${st}`);
    if (st === formula.mainStat.toLowerCase()) {
      if (row) row.classList.add('main-stat-highlight');
      if (badge) {
        badge.textContent = '⭐ 주스탯';
        badge.style.display = 'inline-block';
        badge.style.color = '#38bdf8';
      }
    } else if (st === formula.subStat.toLowerCase()) {
      if (row) row.classList.remove('main-stat-highlight');
      if (badge) {
        badge.textContent = '🔹 보조스탯';
        badge.style.display = 'inline-block';
        badge.style.color = '#a78bfa';
      }
    } else {
      if (row) row.classList.remove('main-stat-highlight');
      if (badge) {
        badge.style.display = 'none';
      }
    }
  });

  // Dynamic Override Labels
  const ovEquipMainLbl = document.getElementById('coeff-ov-equip-main-lbl');
  const ovEquipSubLbl  = document.getElementById('coeff-ov-equip-sub-lbl');
  const ovEnfMainLbl   = document.getElementById('coeff-ov-enf-main-lbl');
  const ovEnfSubLbl    = document.getElementById('coeff-ov-enf-sub-lbl');

  if (ovEquipMainLbl) ovEquipMainLbl.textContent = `장비 ${formula.mainStat} (주)`;
  if (ovEquipSubLbl)  ovEquipSubLbl.textContent  = `장비 ${formula.subStat} (부)`;
  if (ovEnfMainLbl)   ovEnfMainLbl.textContent   = `강화 ${formula.mainStat} (주)`;
  if (ovEnfSubLbl)    ovEnfSubLbl.textContent    = `강화 ${formula.subStat} (부)`;
}

function renderCoeffSlots() {
  const container = document.getElementById('coeff-equip-grid');
  if (!container) return;
  const prof = getActiveCoeffProfile();
  const formula = coeffFormulas[prof.type] || coeffFormulas.stab;

  const slotMeta = [
    { key: 'helm',     name: '투구' },
    { key: 'armor',    name: '갑옷' },
    { key: 'weapon',   name: '무기' },
    { key: 'wrist',    name: '손목' },
    { key: 'head',     name: '머리' },
    { key: 'wings',    name: '몸' },
    { key: 'hands',    name: '손' },
    { key: 'boots',    name: '다리' },
    { key: 'cuff',     name: '커프' },
    { key: 'effect',   name: '효과' },
    { key: 'artifact', name: '아티팩트' },
    { key: 'relic',    name: '렐릭' }
  ];

  let html = '';
  slotMeta.forEach(s => {
    const slotData = (prof.slots && prof.slots[s.key]) || { baseId: '', enfVal: 0, enfStat: formula.mainStat, abilMain: 0, abilSub: 0, abilDex: 0 };
    if (!slotData.enfStat) slotData.enfStat = formula.mainStat;
    const dbList = itemBaseDb[s.key] || [];
    const preview = getSlotPreview(s.key, slotData.baseId, prof.type);

    html += `
      <div class="coeff-slot-card" data-slot="${s.key}">
        <div class="coeff-slot-header">
          <span class="coeff-slot-name">${s.name}</span>
          <span class="coeff-slot-preview" id="slot-preview-${s.key}">${preview}</span>
        </div>
        <select class="coeff-slot-select" onchange="onSlotBaseChange('${s.key}', this.value)">
          ${dbList.map(item => `<option value="${item.id}" ${item.id === slotData.baseId ? 'selected' : ''}>${item.name}</option>`).join('')}
        </select>
        <div class="coeff-slot-row">
          <span class="coeff-slot-tag">강화</span>
          <input type="number" class="coeff-slot-input-sm" value="${slotData.enfVal || 0}" onchange="onSlotEnfChange('${s.key}', this.value)" min="0" max="1000">
          <select class="coeff-slot-select" style="width: auto; margin-bottom: 0; padding: 0.2rem 0.4rem;" onchange="onSlotEnfStatChange('${s.key}', this.value)">
            <option value="${formula.mainStat}" ${slotData.enfStat === formula.mainStat ? 'selected' : ''}>${formula.mainStat} (주)</option>
            <option value="${formula.subStat}"  ${slotData.enfStat === formula.subStat ? 'selected' : ''}>${formula.subStat} (부)</option>
            <option value="STAB" ${slotData.enfStat === 'STAB' && slotData.enfStat !== formula.mainStat && slotData.enfStat !== formula.subStat ? 'selected' : ''}>STAB</option>
            <option value="HACK" ${slotData.enfStat === 'HACK' && slotData.enfStat !== formula.mainStat && slotData.enfStat !== formula.subStat ? 'selected' : ''}>HACK</option>
            <option value="INT"  ${slotData.enfStat === 'INT'  && slotData.enfStat !== formula.mainStat && slotData.enfStat !== formula.subStat ? 'selected' : ''}>INT</option>
            <option value="MR"   ${slotData.enfStat === 'MR'   && slotData.enfStat !== formula.mainStat && slotData.enfStat !== formula.subStat ? 'selected' : ''}>MR</option>
          </select>
        </div>
        <div class="coeff-slot-row">
          <span class="coeff-slot-tag">어빌</span>
          <input type="number" class="coeff-slot-input-sm" placeholder="${formula.mainStat}" value="${slotData.abilMain || 0}" onchange="onSlotAbilChange('${s.key}', 'abilMain', this.value)" title="${formula.mainStat} 어빌">
          <input type="number" class="coeff-slot-input-sm" placeholder="DEX" value="${slotData.abilDex || 0}" onchange="onSlotAbilChange('${s.key}', 'abilDex', this.value)" title="DEX 어빌">
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function syncCoeffInputsFromProfile() {
  const prof = getActiveCoeffProfile();
  const formula = coeffFormulas[prof.type] || coeffFormulas.stab;
  
  // Type tabs
  document.querySelectorAll('.coeff-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === prof.type);
  });
  updateCoeffLabels();

  // Doping preset
  const dopSelect = document.getElementById('coeff-doping-select');
  if (dopSelect) dopSelect.value = prof.dopingPreset || 'none';
  const dopChk = document.getElementById('coeff-apply-doping-chk');
  if (dopChk) dopChk.checked = !!prof.applyDoping;

  // Base stats
  const statStab = document.getElementById('coeff-base-stab');
  const statHack = document.getElementById('coeff-base-hack');
  const statInt  = document.getElementById('coeff-base-int');
  const statMr   = document.getElementById('coeff-base-mr');
  const statDex  = document.getElementById('coeff-base-dex');

  if (statStab) statStab.value = (prof.baseStats && prof.baseStats.stab) || 0;
  if (statHack) statHack.value = (prof.baseStats && prof.baseStats.hack) || 0;
  if (statInt)  statInt.value  = (prof.baseStats && prof.baseStats.int)  || 0;
  if (statMr)   statMr.value   = (prof.baseStats && prof.baseStats.mr)   || 0;
  if (statDex)  statDex.value  = (prof.baseStats && prof.baseStats.dex)  || 0;

  // Avatar bonus
  const avStab = document.getElementById('coeff-avatar-stab');
  const avHack = document.getElementById('coeff-avatar-hack');
  const avDex  = document.getElementById('coeff-avatar-dex');
  if (avStab) avStab.value = (prof.bonusStats && prof.bonusStats.avatar && prof.bonusStats.avatar.stab) || 10;
  if (avHack) avHack.value = (prof.bonusStats && prof.bonusStats.avatar && prof.bonusStats.avatar.hack) || 10;
  if (avDex)  avDex.value  = (prof.bonusStats && prof.bonusStats.avatar && prof.bonusStats.avatar.dex)  || 10;

  // Core
  const coreInput = document.getElementById('coeff-core-input');
  if (coreInput) coreInput.value = prof.core || 0;

  // Dynamic Override fields based on active formula
  const mainKey = formula.mainStat.toLowerCase();
  const subKey  = formula.subStat.toLowerCase();

  const ovEquipMainInput = document.getElementById('coeff-ov-equip-main');
  const ovEquipSubInput  = document.getElementById('coeff-ov-equip-sub');
  const ovEquipDexInput  = document.getElementById('coeff-ov-equip-dex');
  const ovEnfMainInput   = document.getElementById('coeff-ov-enf-main');
  const ovEnfSubInput    = document.getElementById('coeff-ov-enf-sub');

  if (ovEquipMainInput) ovEquipMainInput.value = (prof.overrideEquip && prof.overrideEquip[mainKey]) || 0;
  if (ovEquipSubInput)  ovEquipSubInput.value  = (prof.overrideEquip && prof.overrideEquip[subKey]) || 0;
  if (ovEquipDexInput)  ovEquipDexInput.value  = (prof.overrideEquip && prof.overrideEquip.dex) || 0;
  if (ovEnfMainInput)   ovEnfMainInput.value   = (prof.overrideEnf && prof.overrideEnf[mainKey]) || 0;
  if (ovEnfSubInput)    ovEnfSubInput.value    = (prof.overrideEnf && prof.overrideEnf[subKey]) || 0;

  // Mode badge
  const modeBtn = document.getElementById('coeff-mode-toggle-btn');
  if (modeBtn) {
    modeBtn.textContent = coeffEquipMode === 'override' ? '⚡ 수동 총합 고정 모드 (스크린샷 일치)' : '⚙️ 장비 슬롯 실시간 자동 합산 모드';
  }
}

function onOverrideDynamicChange(cat, role, val) {
  const prof = getActiveCoeffProfile();
  const formula = coeffFormulas[prof.type] || coeffFormulas.stab;
  const mainKey = formula.mainStat.toLowerCase();
  const subKey  = formula.subStat.toLowerCase();
  const num = Number(val) || 0;

  if (cat === 'equip') {
    if (!prof.overrideEquip) prof.overrideEquip = {};
    if (role === 'main') prof.overrideEquip[mainKey] = num;
    else if (role === 'sub') prof.overrideEquip[subKey] = num;
    else if (role === 'dex') prof.overrideEquip.dex = num;
  } else if (cat === 'enf') {
    if (!prof.overrideEnf) prof.overrideEnf = {};
    if (role === 'main') prof.overrideEnf[mainKey] = num;
    else if (role === 'sub') prof.overrideEnf[subKey] = num;
  }

  saveCoeffProfiles();
  calculateCoefficients();
}

function fillStandardStatsForType() {
  const prof = getActiveCoeffProfile();
  const formula = coeffFormulas[prof.type] || coeffFormulas.stab;
  const archetype = defaultCoeffProfiles.find(p => p.type === prof.type) || defaultCoeffProfiles[0];

  prof.baseStats = JSON.parse(JSON.stringify(archetype.baseStats));
  prof.bonusStats = JSON.parse(JSON.stringify(archetype.bonusStats));
  prof.core = archetype.core;
  prof.overrideEquip = JSON.parse(JSON.stringify(archetype.overrideEquip));
  prof.overrideEnf = JSON.parse(JSON.stringify(archetype.overrideEnf));
  if (archetype.slots) {
    prof.slots = JSON.parse(JSON.stringify(archetype.slots));
  }

  saveCoeffProfiles();
  syncCoeffInputsFromProfile();
  renderCoeffSlots();
  calculateCoefficients();
  alert(`✅ [${formula.name}] 구글 스프레드시트 표준 스탯과 장비 세팅이 자동 반영되었습니다!`);
}

function activateTab1BasicDoping() {
  const basicBuffKeys = [
    'awakening_potion',
    'trust_potion',
    'isabelle_fixed',
    'isabelle_percent',
    'isabelle_damage',
    'purified_ampoule',
    'haste_potion'
  ];

  basicBuffKeys.forEach(k => {
    const chk = document.querySelector(`.buff-chk[data-key="${k}"]`);
    if (chk) chk.checked = true;
  });

  inputMode = 'nobuff';
  const btnNoBuff = document.getElementById('btn-nobuff');
  const btnBuff = document.getElementById('btn-buff');
  if (btnNoBuff) btnNoBuff.className = 'toggle-btn active';
  if (btnBuff)   btnBuff.className = 'toggle-btn';

  evaluateStats();

  const prof = getActiveCoeffProfile();
  prof.dopingPreset = 'tab1_link';
  prof.applyDoping = true;
  saveCoeffProfiles();

  const dopSelect = document.getElementById('coeff-doping-select');
  if (dopSelect) dopSelect.value = 'tab1_link';
  const dopChk = document.getElementById('coeff-apply-doping-chk');
  if (dopChk) dopChk.checked = true;

  calculateCoefficients();
}

function onSlotBaseChange(slotKey, baseId) {
  const prof = getActiveCoeffProfile();
  if (!prof.slots) prof.slots = {};
  if (!prof.slots[slotKey]) prof.slots[slotKey] = {};
  prof.slots[slotKey].baseId = baseId;

  const previewEl = document.getElementById(`slot-preview-${slotKey}`);
  if (previewEl) {
    previewEl.textContent = getSlotPreview(slotKey, baseId, prof.type);
  }
  saveCoeffProfiles();
  calculateCoefficients();
}

function onSlotEnfChange(slotKey, val) {
  const prof = getActiveCoeffProfile();
  if (!prof.slots) prof.slots = {};
  if (!prof.slots[slotKey]) prof.slots[slotKey] = {};
  prof.slots[slotKey].enfVal = Number(val) || 0;
  saveCoeffProfiles();
  calculateCoefficients();
}

function onSlotEnfStatChange(slotKey, val) {
  const prof = getActiveCoeffProfile();
  if (!prof.slots) prof.slots = {};
  if (!prof.slots[slotKey]) prof.slots[slotKey] = {};
  prof.slots[slotKey].enfStat = val;
  saveCoeffProfiles();
  calculateCoefficients();
}

function onSlotAbilChange(slotKey, field, val) {
  const prof = getActiveCoeffProfile();
  if (!prof.slots) prof.slots = {};
  if (!prof.slots[slotKey]) prof.slots[slotKey] = {};
  prof.slots[slotKey][field] = Number(val) || 0;
  saveCoeffProfiles();
  calculateCoefficients();
}

function onBaseStatChange(statKey, val) {
  const prof = getActiveCoeffProfile();
  if (!prof.baseStats) prof.baseStats = {};
  prof.baseStats[statKey] = Number(val) || 0;
  saveCoeffProfiles();
  calculateCoefficients();
}

function onBonusStatChange(cat, statKey, val) {
  const prof = getActiveCoeffProfile();
  if (!prof.bonusStats) prof.bonusStats = {};
  if (!prof.bonusStats[cat]) prof.bonusStats[cat] = {};
  prof.bonusStats[cat][statKey] = Number(val) || 0;
  saveCoeffProfiles();
  calculateCoefficients();
}

function onCoreChange(val) {
  const prof = getActiveCoeffProfile();
  prof.core = Number(val) || 0;
  saveCoeffProfiles();
  calculateCoefficients();
}

function onOverrideChange(type, statKey, val) {
  const prof = getActiveCoeffProfile();
  if (type === 'equip') {
    if (!prof.overrideEquip) prof.overrideEquip = {};
    prof.overrideEquip[statKey] = Number(val) || 0;
  } else if (type === 'enf') {
    if (!prof.overrideEnf) prof.overrideEnf = {};
    prof.overrideEnf[statKey] = Number(val) || 0;
  }
  saveCoeffProfiles();
  calculateCoefficients();
}

function toggleCoeffEquipMode() {
  coeffEquipMode = coeffEquipMode === 'override' ? 'slots' : 'override';
  const modeBtn = document.getElementById('coeff-mode-toggle-btn');
  if (modeBtn) {
    modeBtn.textContent = coeffEquipMode === 'override' ? '⚡ 수동 총합 고정 모드 (스크린샷 일치)' : '⚙️ 장비 슬롯 실시간 자동 합산 모드';
  }
  calculateCoefficients();
}

function onCoeffDopingPresetChange(val) {
  const prof = getActiveCoeffProfile();
  prof.dopingPreset = val;
  saveCoeffProfiles();
  calculateCoefficients();
}

function toggleCoeffDopingApply(checked) {
  const prof = getActiveCoeffProfile();
  prof.applyDoping = !!checked;
  saveCoeffProfiles();
  calculateCoefficients();
}

function onCoeffProfileSelectChange(id) {
  activeCoeffProfileId = id;
  renderCoeffSlots();
  syncCoeffInputsFromProfile();
  calculateCoefficients();
}

function calculateCoefficients() {
  const prof = getActiveCoeffProfile();
  const typeKey = prof.type || 'stab';
  const formula = coeffFormulas[typeKey] || coeffFormulas.stab;

  // Doping Bonus Calculation
  let doping = { stab: 0, hack: 0, int: 0, mr: 0, dex: 0 };
  let dopingNote = '';
  if (prof.applyDoping) {
    if (prof.dopingPreset === 'tab1_link') {
      const selBonus = getSelectedBuffBonus();
      doping.dex = selBonus.acc || 0;
      doping.mr = selBonus.mdef || 0;
      doping.stab = Math.round((selBonus.acc || 0) * 0.7);
      doping.hack = Math.round((selBonus.acc || 0) * 0.7);
      doping.int = Math.round((selBonus.mdef || 0) * 0.5);
      dopingNote = `Tab 1 실시간 연동 (명중+${doping.dex}, 마방+${doping.mr})`;
    } else {
      const preset = coeffDopingPresets[prof.dopingPreset] || coeffDopingPresets.none;
      doping = { ...preset };
      dopingNote = `${preset.name} (+DEX ${doping.dex})`;
    }
  }

  const dopNoteEl = document.getElementById('coeff-doping-status-text');
  if (dopNoteEl) {
    dopNoteEl.textContent = prof.applyDoping ? `✅ 도핑 적용 중: ${dopingNote}` : '도핑 미적용 (순수 스탯)';
    dopNoteEl.style.color = prof.applyDoping ? '#34d399' : '#94a3b8';
  }

  // Base Stats
  const charStats = {
    stab: (Number(prof.baseStats.stab) || 0) + (doping.stab || 0),
    hack: (Number(prof.baseStats.hack) || 0) + (doping.hack || 0),
    int:  (Number(prof.baseStats.int)  || 0) + (doping.int || 0),
    mr:   (Number(prof.baseStats.mr)   || 0) + (doping.mr || 0),
    dex:  (Number(prof.baseStats.dex)  || 0) + (doping.dex || 0)
  };

  // Additional Bonus
  const avatar = prof.bonusStats.avatar || { stab: 10, hack: 10, dex: 10, int: 0, mr: 0 };
  const title  = prof.bonusStats.title  || { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 };
  const card   = prof.bonusStats.card   || { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 };

  const bonusSum = {
    stab: (avatar.stab || 0) + (title.stab || 0) + (card.stab || 0),
    hack: (avatar.hack || 0) + (title.hack || 0) + (card.hack || 0),
    int:  (avatar.int  || 0) + (title.int  || 0) + (card.int  || 0),
    mr:   (avatar.mr   || 0) + (title.mr   || 0) + (card.mr   || 0),
    dex:  (avatar.dex  || 0) + (title.dex  || 0) + (card.dex  || 0)
  };

  // Equipment & Reinforcement Sum
  let equipSum = { stab: 0, hack: 0, int: 0, mr: 0, dex: 0 };
  let enfSum = { stab: 0, hack: 0, int: 0, mr: 0 };

  if (coeffEquipMode === 'override' && prof.overrideEquip) {
    equipSum.stab = Number(prof.overrideEquip.stab) || 0;
    equipSum.hack = Number(prof.overrideEquip.hack) || 0;
    equipSum.int  = Number(prof.overrideEquip.int)  || 0;
    equipSum.mr   = Number(prof.overrideEquip.mr)   || 0;
    equipSum.dex  = Number(prof.overrideEquip.dex)  || 0;

    enfSum.stab = Number(prof.overrideEnf.stab) || 0;
    enfSum.hack = Number(prof.overrideEnf.hack) || 0;
    enfSum.int  = Number(prof.overrideEnf.int)  || 0;
    enfSum.mr   = Number(prof.overrideEnf.mr)   || 0;
  } else {
    // Sum from slot items
    Object.keys(prof.slots).forEach(slotKey => {
      const slot = prof.slots[slotKey];
      const dbList = itemBaseDb[slotKey] || [];
      const item = dbList.find(i => i.id === slot.baseId) || dbList[0] || {};

      equipSum.stab += (item.stab || 0);
      equipSum.hack += (item.hack || 0);
      equipSum.int  += (item.int  || 0);
      equipSum.mr   += (item.mr   || 0);
      equipSum.dex  += (item.dex  || 0) + (Number(slot.abilDex) || 0);

      // Abil main added to active mainStat
      const currentMainKey = (coeffFormulas[prof.type] || coeffFormulas.stab).mainStat.toLowerCase();
      equipSum[currentMainKey] += (Number(slot.abilMain) || 0);

      const enfVal = Number(slot.enfVal) || 0;
      if (slot.enfStat === 'STAB') enfSum.stab += enfVal;
      else if (slot.enfStat === 'HACK') enfSum.hack += enfVal;
      else if (slot.enfStat === 'INT') enfSum.int += enfVal;
      else if (slot.enfStat === 'MR') enfSum.mr += enfVal;
    });

    equipSum.stab += bonusSum.stab;
    equipSum.hack += bonusSum.hack;
    equipSum.int  += bonusSum.int;
    equipSum.mr   += bonusSum.mr;
    equipSum.dex  += bonusSum.dex;
  }

  const mainKey = formula.mainStat.toLowerCase();
  const subKey  = formula.subStat.toLowerCase();

  const charMain = charStats[mainKey] || 0;
  const charSub  = charStats[subKey]  || 0;
  const charDex  = charStats.dex      || 0;

  const equipMain = equipSum[mainKey] || 0;
  const equipSub  = equipSum[subKey]  || 0;
  const equipDex  = equipSum.dex      || 0;

  const enfMain = enfSum[mainKey] || 0;
  const enfSub  = enfSum[subKey]  || 0;

  const totalMain = charMain + equipMain + enfMain;
  const totalSub  = charSub + equipSub + enfSub;
  const totalDex  = charDex + equipDex;

  const core = Number(prof.core) || 0;

  // Formula Parts
  const equipPart = equipMain * formula.equipMainMult + equipSub * formula.equipSubMult;
  const enfPart   = enfMain * formula.enfMainMult + enfSub * formula.enfSubMult;
  const charPart  = charMain * formula.charMainMult + charSub * formula.charSubMult;
  const corePart  = core * formula.coreMult;

  const totalCoeff = equipPart + enfPart + charPart + corePart;

  // Update Summary Table DOM
  const tdMainName = document.getElementById('sum-row-main-name');
  const tdSubName  = document.getElementById('sum-row-sub-name');

  if (tdMainName) tdMainName.textContent = formula.mainStat;
  if (tdSubName)  tdSubName.textContent  = formula.subStat;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = typeof val === 'number' ? val.toLocaleString() : val;
  };

  setVal('sum-char-main', charMain);
  setVal('sum-char-sub',  charSub);
  setVal('sum-char-dex',  charDex);

  setVal('sum-equip-main', equipMain);
  setVal('sum-equip-sub',  equipSub);
  setVal('sum-equip-dex',  equipDex);

  setVal('sum-enf-main', enfMain);
  setVal('sum-enf-sub',  enfSub);
  setVal('sum-enf-dex',  '-');

  setVal('sum-tot-main', totalMain);
  setVal('sum-tot-sub',  totalSub);
  setVal('sum-tot-dex',  totalDex);

  // Update Formula Text Banner
  const formulaEl = document.getElementById('coeff-formula-display');
  if (formulaEl) {
    formulaEl.innerHTML = `<b>계수 계산식:</b> 장비(${formula.mainStat}*${formula.equipMainMult} + ${formula.subStat}*${formula.equipSubMult}) + 강화(${formula.mainStat}*${formula.enfMainMult} + ${formula.subStat}*${formula.enfSubMult}) + 캐릭터(${formula.mainStat}*${formula.charMainMult} + ${formula.subStat}*${formula.charSubMult}) + 코어*${formula.coreMult}`;
  }

  // Update Big KPI Cards
  const kpiTitleEl = document.getElementById('coeff-kpi-title');
  const kpiValEl   = document.getElementById('coeff-kpi-value');
  const kpiDexEl   = document.getElementById('coeff-kpi-dex');

  if (kpiTitleEl) kpiTitleEl.textContent = `${formula.name} 종합 계수`;
  if (kpiValEl)   kpiValEl.textContent = totalCoeff.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (kpiDexEl)   kpiDexEl.textContent = totalDex.toLocaleString();

  // Update Content Guide
  renderBossContentGuide(totalCoeff, totalDex);
}

function renderBossContentGuide(currentCoeff, currentDex) {
  const container = document.getElementById('coeff-boss-grid');
  if (!container) return;

  let html = '';
  bossContentGuide.forEach(bg => {
    const pct = Math.min(100, Math.round((currentCoeff / bg.reqCoeff) * 100));
    const dexDiff = currentDex - bg.reqDex;

    let badgeClass = 'fail';
    let badgeText  = '불가능';

    if (currentCoeff >= bg.reqCoeff && dexDiff >= 0) {
      badgeClass = 'smooth';
      badgeText  = '원활';
    } else if (currentCoeff >= bg.reqCoeff * 0.8 && dexDiff >= -50) {
      badgeClass = 'viable';
      badgeText  = '가능';
    } else if (currentCoeff >= bg.reqCoeff * 0.6 && dexDiff >= -150) {
      badgeClass = 'hard';
      badgeText  = '힘듬';
    } else {
      badgeClass = 'fail';
      badgeText  = dexDiff < -200 ? '불가능' : '힘듬';
    }

    const accText = dexDiff >= 0
      ? `<span style="color:#34d399; font-weight:700;">✅ DEX +${dexDiff} 여유 (100% 명중)</span>`
      : `<span style="color:#f87171; font-weight:700;">⚠️ DEX ${Math.abs(dexDiff)} 부족 (MISS!)</span>`;

    html += `
      <div class="coeff-boss-item">
        <div class="coeff-boss-top">
          <span class="coeff-boss-name">${bg.name}</span>
          <span class="coeff-boss-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="coeff-boss-reqs">
          <span>목표: ${bg.reqCoeff.toLocaleString()}</span>
          <span>현재: ${Math.round(currentCoeff).toLocaleString()} (${pct}%)</span>
        </div>
        <div class="coeff-boss-prog-track">
          <div class="coeff-boss-prog-bar" style="width: ${pct}%;"></div>
        </div>
        <div class="coeff-boss-acc-info">
          <span>필요 DEX: <b>${bg.reqDex}</b></span>
          ${accText}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function addCoeffPreset() {
  const name = prompt('새 계산기 프리셋 이름을 입력하세요:', '내 캐릭터 세팅');
  if (!name || !name.trim()) return;
  const current = getActiveCoeffProfile();
  const newProfile = JSON.parse(JSON.stringify(current));
  newProfile.id = 'prof_' + Date.now();
  newProfile.name = name.trim();
  coeffProfiles.push(newProfile);
  activeCoeffProfileId = newProfile.id;
  saveCoeffProfiles();
  renderCoeffPresetSelect();
  syncCoeffInputsFromProfile();
  calculateCoefficients();
}

function renameCoeffPreset() {
  const prof = getActiveCoeffProfile();
  const newName = prompt('프리셋 이름 수정:', prof.name);
  if (!newName || !newName.trim()) return;
  prof.name = newName.trim();
  saveCoeffProfiles();
  renderCoeffPresetSelect();
}

function deleteCoeffPreset() {
  if (coeffProfiles.length <= 1) {
    alert('최소 1개의 프리셋은 유지되어야 합니다.');
    return;
  }
  const prof = getActiveCoeffProfile();
  if (!confirm(`'${prof.name}' 프리셋을 삭제하시겠습니까?`)) return;
  coeffProfiles = coeffProfiles.filter(p => p.id !== prof.id);
  activeCoeffProfileId = coeffProfiles[0].id;
  saveCoeffProfiles();
  renderCoeffPresetSelect();
  syncCoeffInputsFromProfile();
  calculateCoefficients();
}

function onCoeffProfileSelectChange(id) {
  activeCoeffProfileId = id;
  syncCoeffInputsFromProfile();
  calculateCoefficients();
}

// ==================== TAB 1 <-> TAB 4 SPEC REUSE & SYNC LOGIC ====================

function updateTab1SyncPreview(effectiveMode, bonus) {
  const inAcc = document.getElementById('in-acc');
  const inMdef = document.getElementById('in-mdef');
  if (!inAcc || !inMdef) return;

  const rawAcc = Number(inAcc.value) || 0;
  const rawMdef = Number(inMdef.value) || 0;
  const curBonus = bonus || getSelectedBuffBonus();
  const effAcc = inputMode === 'nobuff' ? (rawAcc + (curBonus.acc || 0)) : rawAcc;
  const effMdef = inputMode === 'nobuff' ? (rawMdef + (curBonus.mdef || 0)) : rawMdef;

  // Update Tab 1 card badges
  const syncAccEl = document.getElementById('sync-val-acc');
  const syncMdefEl = document.getElementById('sync-val-mdef');
  const syncDopEl = document.getElementById('sync-val-dop');

  if (syncAccEl)  syncAccEl.textContent  = effAcc.toLocaleString();
  if (syncMdefEl) syncMdefEl.textContent = effMdef.toLocaleString();
  if (syncDopEl)  syncDopEl.textContent  = `${curBonus.count}개`;

  // Update Tab 4 status badge
  const tab4StatusEl = document.getElementById('coeff-tab1-sync-status');
  if (tab4StatusEl) {
    tab4StatusEl.innerHTML = `명중: <b style="color:#facc15;">${effAcc.toLocaleString()}</b> · 마방: <b style="color:#38bdf8;">${effMdef.toLocaleString()}</b> · 도핑: <b style="color:#34d399;">${curBonus.count}개</b>`;
  }

  // Check if auto sync is enabled
  const autoChk = document.getElementById('coeff-tab1-auto-sync');
  if (autoChk && autoChk.checked) {
    applyTab1ToCoeff(false);
  }
}

function transferTab1ToCoeff() {
  const typeSelect = document.getElementById('sync-tab1-type') || document.getElementById('char-archetype-select');
  const atkInput   = document.getElementById('sync-tab1-atk');
  const targetType = typeSelect ? typeSelect.value : selectedArchetype;
  const inMdefVal  = Number(document.getElementById('in-mdef').value) || 0;
  const targetAtk  = (atkInput && atkInput.value.trim()) ? Number(atkInput.value) : (inMdefVal > 0 ? inMdefVal : null);

  applyTab1ToCoeff(true, targetType, targetAtk);

  // Switch to Tab 4
  const coeffTabBtn = document.querySelector('[data-tab="tab-coeff"]');
  if (coeffTabBtn) {
    switchTab('tab-coeff', coeffTabBtn);
  }
}

function importFromTab1ToCoeff() {
  applyTab1ToCoeff(true);
}

function applyTab1ToCoeff(showAlert, forceType, forceAtk) {
  const inAcc = document.getElementById('in-acc');
  const inMdef = document.getElementById('in-mdef');
  if (!inAcc || !inMdef) return;

  const rawAcc = Number(inAcc.value) || 0;
  const rawMdef = Number(inMdef.value) || 0;
  const curBonus = getSelectedBuffBonus();
  const effAcc = inputMode === 'nobuff' ? (rawAcc + (curBonus.acc || 0)) : rawAcc;
  const effMdef = inputMode === 'nobuff' ? (rawMdef + (curBonus.mdef || 0)) : rawMdef;

  const prof = getActiveCoeffProfile();
  if (!prof) return;

  if (forceType) {
    prof.type = forceType;
  }

  // Always link Tab 1 doping
  prof.dopingPreset = 'tab1_link';
  prof.applyDoping = true;

  const formula = coeffFormulas[prof.type] || coeffFormulas.stab;
  const baseDex = (prof.baseStats && prof.baseStats.dex) || 0;
  const dopDex  = curBonus.acc || 0;

  // Set DEX in override mode
  if (!prof.overrideEquip) prof.overrideEquip = {};
  if (!prof.overrideEnf) prof.overrideEnf = {};

  if (effAcc > 0) {
    prof.overrideEquip.dex = Math.max(0, effAcc - baseDex - dopDex);
  }

  // If Magic Defense class, sync MDEF -> MR
  if (prof.type === 'magic_def' && effMdef > 0) {
    const baseMr = (prof.baseStats && prof.baseStats.mr) || 0;
    const enfMr  = (prof.overrideEnf && prof.overrideEnf.mr) || 0;
    const dopMr  = curBonus.mdef || 0;
    prof.overrideEquip.mr = Math.max(0, effMdef - baseMr - enfMr - dopMr);
  } else if (prof.type !== 'magic_def') {
    // For Attack classes (STAB / HACK / INT), sync main attack stat
    const mainKey = formula.mainStat.toLowerCase();
    const curAtk = (forceAtk !== null && forceAtk !== undefined && !isNaN(forceAtk)) ? Number(forceAtk) : rawMdef;
    if (curAtk > 0) {
      const baseMain = (prof.baseStats && prof.baseStats[mainKey]) || 0;
      const enfMain  = (prof.overrideEnf && prof.overrideEnf[mainKey]) || 0;
      const dopMain  = getDopingBonusForArch(prof.type, curBonus);
      prof.overrideEquip[mainKey] = Math.max(0, curAtk - baseMain - enfMain - dopMain);
    }
  }

  saveCoeffProfiles();
  syncCoeffInputsFromProfile();
  renderCoeffSlots();
  calculateCoefficients();

  if (showAlert) {
    const currentArch = getCurrentArchetype();
    alert(`✅ 1번 [${currentArch.name}] 스펙이 4번 계산기에 성공적으로 연동되었습니다!\n• ${currentArch.statName}: ${(prof.type === 'magic_def' ? effMdef : rawMdef).toLocaleString()}\n• 명중률(DEX): ${effAcc.toLocaleString()}\n• 도핑: ${curBonus.count}종 실시간 합산 반영`);
  }
}

function toggleTab1AutoSync(checked) {
  try {
    localStorage.setItem('tw_coeff_tab1_auto_sync', checked ? 'true' : 'false');
  } catch (e) {}

  if (checked) {
    applyTab1ToCoeff(false);
  }
}

function initTab1AutoSyncPref() {
  try {
    const isAuto = localStorage.getItem('tw_coeff_tab1_auto_sync') === 'true';
    const chk = document.getElementById('coeff-tab1-auto-sync');
    if (chk) chk.checked = isAuto;
  } catch (e) {}
}

function initCoeffCalculator() {
  loadCoeffProfiles();
  renderCoeffPresetSelect();
  renderCoeffSlots();
  syncCoeffInputsFromProfile();
  calculateCoefficients();
  initTab1AutoSyncPref();
}



if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootCompanion);
} else {
  bootCompanion();
}
