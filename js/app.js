/**
 * TalesWeaver Companion Guide - Core Application Logic
 * Navigation, Profile Management, Stat Simulator, Checklists, and Calculators
 */

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==================== 1. TAB SWITCHING ====================
function switchBossPanel(panelId, btnEl) {
  document.querySelectorAll('.boss-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.boss-sub-btn').forEach(b => b.classList.remove('active'));
  const p = document.getElementById(panelId);
  if (p) p.classList.add('active');
  if (btnEl) btnEl.classList.add('active');
}

function toggleTaskPattern(ev, boxId) {
  if (ev) {
    if (ev.preventDefault) ev.preventDefault();
    if (ev.stopPropagation) ev.stopPropagation();
  }
  const box = document.getElementById(boxId);
  const btn = ev ? ev.currentTarget : null;
  if (!box) return;
  const isOpen = box.classList.toggle('open');
  if (btn) btn.textContent = isOpen ? '📖 상세 패턴 · 공략 접기 ▴' : '📖 상세 패턴 · 공략 펼치기 ▾';
}

function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById(tabId);
  if (panel) panel.classList.add('active');
  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (targetBtn) targetBtn.classList.add('active');
  }
  if (tabId === 'tab-dressroom' && typeof initShowroom === 'function') {
    initShowroom();
  }
}

function switchGrowthSection(secId, btnEl) {
  document.querySelectorAll('.growth-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.growth-sub-btn').forEach(b => b.classList.remove('active'));
  if (secId === 'growth-all') {
    document.querySelectorAll('.growth-section').forEach(s => s.classList.add('active'));
  } else {
    const el = document.getElementById(secId);
    if (el) el.classList.add('active');
  }
  if (btnEl) btnEl.classList.add('active');
}

// ==================== 2. BUFF SELECTOR & SPEC SIMULATOR ====================
let inputMode = 'nobuff'; // 'nobuff' = user enters village stats, 'buff' = user enters already-buffed stats

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

// ==================== 1-1. CHARACTER & ARCHETYPE CONFIGURATION ====================
let selectedCharacterId = 'anais';
let selectedBranchId = 'anais_biho';
let selectedArchetype = 'magic_def';

function getCurrentArchetype() {
  return (typeof archetypeConfigs !== 'undefined' && archetypeConfigs[selectedArchetype]) || archetypeConfigs.magic_def;
}

function initCharacterSelectors() {
  const charSel = document.getElementById('char-select');
  if (!charSel || typeof TW_CHARACTERS === 'undefined') return;

  charSel.innerHTML = TW_CHARACTERS.map(c => 
    `<option value="${c.id}" ${c.id === selectedCharacterId ? 'selected' : ''}>${c.name}</option>`
  ).join('');

  updateArchetypeDropdownForChar(selectedCharacterId, selectedBranchId || selectedArchetype);
}

function updateArchetypeDropdownForChar(charId, preferredBranchOrArch) {
  const charObj = (typeof TW_CHARACTERS !== 'undefined' && TW_CHARACTERS.find(c => c.id === charId)) || (typeof TW_CHARACTERS !== 'undefined' ? TW_CHARACTERS[0] : null);
  if (!charObj) return;
  selectedCharacterId = charObj.id;

  const archSel = document.getElementById('char-archetype-select');
  if (!archSel) return;

  archSel.innerHTML = charObj.types.map(t => {
    const isSelected = (t.branchId === preferredBranchOrArch) || (t.id === preferredBranchOrArch) || (t.archId === preferredBranchOrArch);
    return `<option value="${t.branchId}" data-arch="${t.archId || t.id}" ${isSelected ? 'selected' : ''}>${t.name}</option>`;
  }).join('');

  let matched = charObj.types.find(t => (t.branchId === preferredBranchOrArch) || (t.id === preferredBranchOrArch) || (t.archId === preferredBranchOrArch));
  if (!matched) {
    matched = charObj.types.find(t => t.branchId === charObj.defaultBranch) || charObj.types[0];
  }

  selectedBranchId = matched.branchId;
  selectedArchetype = matched.archId || matched.id;
  archSel.value = selectedBranchId;

  const syncTypeSelect = document.getElementById('sync-tab1-type');
  if (syncTypeSelect) syncTypeSelect.value = selectedArchetype;
}

function onCharacterSelectChange(charId) {
  selectedCharacterId = charId;
  try {
    localStorage.setItem('tw_selected_character', charId);
  } catch (e) {}

  const charObj = TW_CHARACTERS.find(c => c.id === charId) || TW_CHARACTERS[0];
  const defBranch = charObj.defaultBranch || (charObj.types[0] && charObj.types[0].branchId);
  updateArchetypeDropdownForChar(charId, defBranch);
  onCharArchetypeChange(selectedBranchId);
}

function onCharArchetypeChange(branchOrArchId) {
  const charObj = (typeof TW_CHARACTERS !== 'undefined' && TW_CHARACTERS.find(c => c.id === selectedCharacterId)) || (typeof TW_CHARACTERS !== 'undefined' ? TW_CHARACTERS[0] : null);
  let branch = null;
  if (charObj) {
    branch = charObj.types.find(t => t.branchId === branchOrArchId || t.id === branchOrArchId || t.archId === branchOrArchId) || charObj.types[0];
  }

  if (branch) {
    selectedBranchId = branch.branchId;
    selectedArchetype = branch.archId || branch.id;
  } else {
    selectedArchetype = branchOrArchId || 'magic_def';
  }

  try {
    localStorage.setItem('tw_selected_branch', selectedBranchId);
    localStorage.setItem('tw_selected_archetype', selectedArchetype);
  } catch (e) {}

  const syncTypeSelect = document.getElementById('sync-tab1-type');
  if (syncTypeSelect) syncTypeSelect.value = selectedArchetype;

  const titleEl = document.getElementById('card-mainstat-title');
  if (titleEl) {
    const statLabels = {
      magic_def: '1. 노도핑 MR (마법방어)',
      stab: '1. 노도핑 STAB (찌르기)',
      hack: '1. 노도핑 HACK (베기)',
      magic_atk: '1. 노도핑 INT (마법공격)',
      composite: '1. 노도핑 STAB / HACK (물리복합)',
      magic_slash: '1. 노도핑 HACK / INT (마법베기)'
    };
    titleEl.textContent = statLabels[selectedArchetype] || '1. 노도핑 MR (마법방어)';
  }

  const elemTitleEl = document.getElementById('card-elem-title');
  if (elemTitleEl) {
    if (selectedCharacterId === 'anais') elemTitleEl.textContent = '🌪️ 주력 속성 (비호: 풍속성)';
    else if (selectedCharacterId === 'tichiel') elemTitleEl.textContent = '✨ 주력 속성 (백법: 성속성 / 흑법: 원소)';
    else if (selectedCharacterId === 'boris') elemTitleEl.textContent = '❄️ 주력 속성 (빙한 수속성 / 암속성)';
    else if (selectedCharacterId === 'ispin') elemTitleEl.textContent = '🔥 주력 속성 (화속성 / 무속성)';
    else elemTitleEl.textContent = '🔮 주력 속성 (풍·화·수·암·성 등)';
  }

  evaluateStats();

  if (charObj && branch) {
    applyCharacterRecommendedGear(charObj, branch);
  }

  const autoChk = document.getElementById('coeff-tab1-auto-sync');
  if (autoChk && autoChk.checked) {
    applyTab1ToCoeff(false, selectedArchetype);
  }
}

function applyCharacterRecommendedGear(charObj, branch) {
  if (!branch) return;
  const prof = getActiveCoeffProfile();
  if (prof && prof.slots) {
    if (branch.defaultWeapon && itemBaseDb.weapon.some(w => w.id === branch.defaultWeapon)) {
      if (!prof.slots.weapon) prof.slots.weapon = {};
      prof.slots.weapon.baseId = branch.defaultWeapon;
    }
    if (branch.defaultArmor && itemBaseDb.armor.some(a => a.id === branch.defaultArmor)) {
      if (!prof.slots.armor) prof.slots.armor = {};
      prof.slots.armor.baseId = branch.defaultArmor;
    }
    const targetType = branch.archId || branch.id || 'stab';
    if (prof.type !== targetType && typeof coeffFormulas !== 'undefined' && coeffFormulas[targetType]) {
      prof.type = targetType;
      document.querySelectorAll('.coeff-type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === targetType);
      });
      if (typeof updateCoeffLabels === 'function') updateCoeffLabels();
    }
    saveCoeffProfiles();
    renderCoeffSlots();
    calculateCoefficients();
  }
}

function getDopingBonusForArch(archId, bonus) {
  if (!bonus) return 0;
  if (archId === 'magic_def') return bonus.mdef || 0;
  if (archId === 'stab' || archId === 'hack') return Math.round((bonus.acc || 0) * 0.7);
  if (archId === 'magic_atk') return Math.round((bonus.mdef || 0) * 0.5);
  if (archId === 'composite' || archId === 'magic_slash') return Math.round((bonus.acc || 0) * 0.5);
  return 0;
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
      <td><b>🔮 주력 속성</b></td>
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
  updateConflictLocks();
  renderExtraActiveDopingChips();
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
  updateConflictLocks();
  renderExtraActiveDopingChips();
}

function filterDopingTable(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll('.doping-row').forEach(row => {
    const text = (row.dataset.search || '').toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

// ==================== DOPING MODAL & ACCORDION SYSTEM ====================
const CORE_DOPING_KEYS = [
  'snowman_potion', 'awakening_potion', 'trust_potion',
  'isabelle_fixed', 'isabelle_percent', 'isabelle_damage',
  'super_ham', 'purified_ampoule'
];

function openDopingModal() {
  const m = document.getElementById('doping-modal');
  if (m) {
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateModalSelectedCount();
  }
}

function closeDopingModal() {
  const m = document.getElementById('doping-modal');
  if (m) {
    m.classList.remove('active');
    document.body.style.overflow = '';
  }
  renderExtraActiveDopingChips();
}

function filterModalDoping(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll('#doping-modal .doping-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
}

function switchModalDopingCat(catId, btnEl) {
  document.querySelectorAll('.modal-cat-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  document.querySelectorAll('#doping-modal .modal-doping-group').forEach(group => {
    if (catId === 'all' || group.dataset.cat === catId) {
      group.style.display = '';
    } else {
      group.style.display = 'none';
    }
  });
}

function clearModalDoping() {
  document.querySelectorAll('#doping-modal .buff-chk').forEach(chk => {
    if (chk.checked) {
      chk.checked = false;
      const card = document.getElementById('card-' + chk.dataset.key);
      if (card) card.classList.remove('checked');
    }
  });
  updateConflictLocks();
  evaluateStats();
  updateModalSelectedCount();
  renderExtraActiveDopingChips();
}

function updateModalSelectedCount() {
  const countEl = document.getElementById('modal-selected-count');
  if (!countEl) return;
  const count = document.querySelectorAll('#doping-modal .buff-chk:checked').length;
  countEl.textContent = `${count}개`;
}

function renderExtraActiveDopingChips() {
  const wrap = document.getElementById('doping-extra-chips-list');
  const badgeEl = document.getElementById('extra-doping-count-badge');
  if (!wrap) return;

  const extraChecked = [];
  document.querySelectorAll('#doping-modal .buff-chk:checked').forEach(chk => {
    const k = chk.dataset.key;
    const card = document.getElementById('card-' + k);
    const nameEl = card ? card.querySelector('.doping-name') : null;
    const name = nameEl ? nameEl.textContent.trim() : k;
    extraChecked.push({ key: k, name: name });
  });

  if (extraChecked.length === 0) {
    wrap.innerHTML = '<span style="font-size:0.78rem; color:#64748b;">(현재 추가 선택된 보조 버프가 없습니다. 필요 시 우측 [추가 버프 선택] 버튼을 이용하세요)</span>';
  } else {
    wrap.innerHTML = extraChecked.map(item => `
      <span class="extra-doping-chip">
        ${escapeHtml(item.name)}
        <button type="button" class="chip-del-btn" onclick="removeExtraDoping('${item.key}')" title="제거">&times;</button>
      </span>
    `).join('');
  }

  if (badgeEl) {
    badgeEl.textContent = extraChecked.length > 0 ? `+${extraChecked.length}` : '';
    badgeEl.style.display = extraChecked.length > 0 ? 'inline-block' : 'none';
  }
  updateModalSelectedCount();
}

function removeExtraDoping(key) {
  const chk = document.querySelector(`.buff-chk[data-key="${key}"]`);
  if (chk) {
    chk.checked = false;
    onDopingToggle(key);
  }
}

function toggleSpecAccordion(id, btnEl) {
  const el = document.getElementById(id);
  if (!el) return;
  const isHidden = (el.style.display === 'none' || !el.style.display);
  el.style.display = isHidden ? 'block' : 'none';
  if (btnEl) {
    const arrow = btnEl.querySelector('.acc-arrow');
    if (arrow) arrow.textContent = isHidden ? '▲' : '▼';
    if (isHidden) btnEl.classList.add('open');
    else btnEl.classList.remove('open');
  }
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
  const bonus = getSelectedBuffBonus();

  // Determine whether we evaluate against 'buff' threshold or 'nobuff' threshold
  const effectiveMode = (inputMode === 'buff' || bonus.count > 0) ? 'buff' : 'nobuff';
  const dungeonEl = document.getElementById('target-dungeon');
  const dVal = dungeonEl ? dungeonEl.value : 'rokagos';
  const targetKey = (currentArch.thresholds && currentArch.thresholds[effectiveMode] && currentArch.thresholds[effectiveMode][dVal])
    ? dVal
    : 'rokagos';
  const req = (currentArch.thresholds && currentArch.thresholds[effectiveMode] && currentArch.thresholds[effectiveMode][targetKey])
    || { reqMain: 1550, acc: 1450, elem: 200, eta: 15 };
  
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
    const savedChar = localStorage.getItem('tw_selected_character') || saved.characterId || 'anais';
    selectedCharacterId = savedChar;
    const savedBranch = localStorage.getItem('tw_selected_branch') || saved.branchId || '';
    const savedArch = localStorage.getItem('tw_selected_archetype') || saved.archetype || 'magic_def';
    selectedArchetype = savedArch;

    initCharacterSelectors();
    const charSelect = document.getElementById('char-select');
    if (charSelect) charSelect.value = selectedCharacterId;
    updateArchetypeDropdownForChar(selectedCharacterId, savedBranch || savedArch);

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
  document.querySelectorAll('.weekly-chk').forEach(chk => {
    chk.removeEventListener('change', updateWeeklyProgress);
    chk.addEventListener('change', updateWeeklyProgress);
  });
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
  const el = document.getElementById(subId);
  if (el) el.classList.add('active');
  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const btn = document.querySelector(`.sub-tab-btn[onclick*="${subId}"]`);
    if (btn) btn.classList.add('active');
  }
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
  const searchEl = document.getElementById('waste-search');
  const kw = searchEl ? searchEl.value.trim().toLowerCase() : '';
  const tbody = document.getElementById('waste-tbody');
  if (!tbody) return;
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
  const stageEl = document.getElementById('abendon-stage');
  if (!stageEl) return;
  const stage = Number(stageEl.value) || 4;
  const cfg = abendonConfig[stage];
  if (!cfg) return;
  const priceEl = document.getElementById('abendon-stone-price');
  if (priceEl) priceEl.textContent = cfg.stoneVal.toLocaleString() + ' 시드';

  const tbody = document.getElementById('abendon-tbody');
  if (!tbody) return;
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

let selectedEquipParts = {
  aquilus: [0, 1, 2, 3, 4, 5, 6, 7],
  abyss: [0, 1, 2, 3, 4, 5, 6, 7],
  eclipse: [0, 1, 2, 3, 4, 5, 6, 7]
};
let ownedEquipMats = {};

function toggleEquipPart(partIdx, isChecked) {
  const tierEl = document.getElementById('equip-tier-select');
  const tier = tierEl ? tierEl.value : 'abyss';
  if (!selectedEquipParts[tier]) selectedEquipParts[tier] = [];

  partIdx = Number(partIdx);
  if (isChecked) {
    if (!selectedEquipParts[tier].includes(partIdx)) {
      selectedEquipParts[tier].push(partIdx);
    }
  } else {
    selectedEquipParts[tier] = selectedEquipParts[tier].filter(i => i !== partIdx);
  }
  updateEquipTotalsOnly();
}

function setEquipPartPreset(presetName) {
  const tierEl = document.getElementById('equip-tier-select');
  const tier = tierEl ? tierEl.value : 'abyss';

  if (presetName === 'all') {
    selectedEquipParts[tier] = [0, 1, 2, 3, 4, 5, 6, 7];
  } else if (presetName === 'armor') {
    selectedEquipParts[tier] = [1, 2, 3, 5, 7]; // 투구, 갑옷, 머리, 손, 신발
  } else if (presetName === 'weapon_wrist') {
    selectedEquipParts[tier] = [0, 4]; // 무기, 손목
  } else if (presetName === 'clear') {
    selectedEquipParts[tier] = [];
  }
  renderEquipCalc();
}

function updateOwnedEquipMat(matKey, val) {
  ownedEquipMats[matKey] = Math.max(0, Number(val) || 0);
  updateEquipTotalsOnly();
}

function updateEquipTotalsOnly() {
  const tierEl = document.getElementById('equip-tier-select');
  if (!tierEl) return;
  const tier = tierEl.value || 'abyss';
  const recipe = equipRecipes[tier];
  if (!recipe || !recipe.parts) return;

  const activeIndices = selectedEquipParts[tier] || [];

  // 1. Update individual part cards
  recipe.parts.forEach((p, idx) => {
    let partCost = 0;
    p.mats.forEach(m => {
      partCost += (Number(equipUnitPrices[m.key]) || 0) * m.qty;
    });
    const el = document.getElementById(`eq-total-${tier}-${idx}`);
    if (el) el.textContent = `총 ${partCost.toLocaleString()} Seed`;

    const cardEl = document.getElementById(`eq-card-${tier}-${idx}`);
    if (cardEl) {
      if (activeIndices.includes(idx)) {
        cardEl.classList.remove('dimmed');
      } else {
        cardEl.classList.add('dimmed');
      }
    }
  });

  // 2. Aggregate required materials across all selected parts
  const aggregated = {};
  recipe.sharedPrices.forEach(sp => {
    aggregated[sp.key] = {
      key: sp.key,
      name: sp.name,
      totalQty: 0
    };
  });

  activeIndices.forEach(idx => {
    const p = recipe.parts[idx];
    if (p && p.mats) {
      p.mats.forEach(m => {
        if (!aggregated[m.key]) {
          aggregated[m.key] = { key: m.key, name: m.label || m.key, totalQty: 0 };
        }
        aggregated[m.key].totalQty += m.qty;
      });
    }
  });

  // 3. Render Aggregated Material Table & Grand Seed
  let grandTotalSeed = 0;
  let totalShortageItems = 0;

  const tbody = document.getElementById('equip-aggregated-tbody');
  if (tbody) {
    tbody.innerHTML = Object.values(aggregated).map(item => {
      const unitPrice = Number(equipUnitPrices[item.key]) || 0;
      const owned = Number(ownedEquipMats[item.key]) || 0;
      const shortage = Math.max(0, item.totalQty - owned);
      const cost = shortage * unitPrice;
      grandTotalSeed += cost;
      if (shortage > 0) totalShortageItems++;

      return `
        <tr>
          <td style="font-weight:700; color:#e2e8f0;">${item.name}</td>
          <td style="text-align:center; font-weight:800; color:#38bdf8;">${item.totalQty.toLocaleString()}개</td>
          <td style="text-align:center;">
            <input type="number" min="0" class="num-input-price" style="width:75px; text-align:center; padding:0.2rem;"
                   value="${owned > 0 ? owned : ''}" placeholder="0"
                   oninput="updateOwnedEquipMat('${item.key}', this.value)">
          </td>
          <td style="text-align:center; font-weight:800; color:${shortage > 0 ? '#f87171' : '#34d399'};">
            ${shortage.toLocaleString()}개
          </td>
          <td style="text-align:right; color:#cbd5e1;">${unitPrice.toLocaleString()} Seed</td>
          <td style="text-align:right; font-weight:800; color:#fbbf24;">${cost.toLocaleString()} Seed</td>
        </tr>
      `;
    }).join('');
  }

  const grandSeedEl = document.getElementById('equip-grand-total-seed');
  if (grandSeedEl) {
    grandSeedEl.textContent = `${(grandTotalSeed / 100000000).toFixed(2)}억 Seed (${grandTotalSeed.toLocaleString()} Seed)`;
  }

  const partsCountEl = document.getElementById('equip-selected-parts-count');
  if (partsCountEl) {
    partsCountEl.textContent = `${activeIndices.length} / 8부위 선택됨`;
  }
}

function renderEquipCalc() {
  const tierEl = document.getElementById('equip-tier-select');
  if (!tierEl) return;
  const tier = tierEl.value || 'abyss';
  const recipe = equipRecipes[tier];
  if (!recipe) return;

  if (!selectedEquipParts[tier]) {
    selectedEquipParts[tier] = [0, 1, 2, 3, 4, 5, 6, 7];
  }
  const activeIndices = selectedEquipParts[tier];

  // 1. Render Part Selector Checkboxes
  const partCheckboxesEl = document.getElementById('equip-part-checkboxes');
  if (partCheckboxesEl) {
    partCheckboxesEl.innerHTML = recipe.parts.map((p, idx) => {
      const isChecked = activeIndices.includes(idx);
      return `
        <label class="equip-part-check-item ${isChecked ? 'active' : ''}">
          <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleEquipPart(${idx}, this.checked)">
          <span>${p.part.replace('아퀼루스 ', '').replace('어비스 ', '').replace('이클립스 ', '')}</span>
        </label>
      `;
    }).join('');
  }

  // 2. Render Shared Unit Prices Grid
  const priceGrid = document.getElementById('equip-price-grid');
  if (priceGrid) {
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
  }

  // 3. Render Individual Equipment Parts Grid
  const cardsGrid = document.getElementById('equip-cards-grid');
  if (cardsGrid) {
    cardsGrid.innerHTML = recipe.parts.map((p, idx) => {
      let total = 0;
      const isSelected = activeIndices.includes(idx);
      const matLines = p.mats.map(m => {
        const unit = Number(equipUnitPrices[m.key]) || 0;
        total += unit * m.qty;
        return `
          <div class="mat-row">
            <span>${m.label} <b>(${m.qty}개)</b></span>
            <span style="color:#94a3b8;">${(unit * m.qty).toLocaleString()}</span>
          </div>
        `;
      }).join('');

      return `
        <div id="eq-card-${tier}-${idx}" class="equip-card ${isSelected ? '' : 'dimmed'}">
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

  updateEquipTotalsOnly();
}

function resetEquipPrices() {
  equipUnitPrices = {};
  ownedEquipMats = {};
  renderEquipCalc();
}

function openOfficialEtaRanking() {
  const serverEl = document.getElementById('eta-server-select');
  const nameEl = document.getElementById('eta-char-name-input');
  const sc = serverEl ? serverEl.value : '7';
  const name = nameEl ? nameEl.value.trim() : '';

  let url = `https://tales.nexon.com/Community/Ranking/EtaRank?sc=${sc}`;
  if (name) {
    url += `&sn=${encodeURIComponent(name)}`;
  }
  window.open(url, '_blank');
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
      anais_bear: '곰나이스(물복)',
      roamini: '로아미니(디버퍼)',
      yepnen: '예프넨(딜러)',
      tichiel_white: '백법(서포터)',
      cloe: '클로에(마딜)',
      naya: '나야(물복/찌르기)',
      benya: '벤야(햄벤/낫벤)',
      isolet: '이솔렛(티엘라/찬트)',
      lucian: '루시안(찌르기/베기)',
      boris: '보리스(베기/대검물복)',
      siblyn: '시벨린(창/봉물복)',
      other: '기타'
    };
    badgeEl.textContent = jobNames[cur.job] || cur.job;
  }

  const gearBadgeEl = document.getElementById('profile-gear-badge');
  if (gearBadgeEl && cur) {
    let gearText = "🛡️ 10강 국템 세팅";
    if (cur.twEquipState && cur.twEquipState.arms && cur.twEquipState.arms.name) {
      gearText = "🛡️ " + cur.twEquipState.arms.name;
    } else if (cur.gearPreset === 'eclipse_all_limit') {
      gearText = "👑 11강 이클립스 종결";
    } else if (cur.gearPreset === 'eclipse_3_abyss_5') {
      gearText = "⭐ 이클3 + 어비스5";
    } else if (cur.gearPreset === 'aquilus_all') {
      gearText = "🛡️ 8강 아퀼루스 풀셋";
    }
    gearBadgeEl.textContent = gearText;
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

  if (p.characterId) {
    selectedCharacterId = p.characterId;
  } else if (p.job === 'roamini') {
    selectedCharacterId = 'roamini';
  } else if (p.job === 'yepnen') {
    selectedCharacterId = 'yepnen';
  } else if (p.job === 'tichiel_white') {
    selectedCharacterId = 'tichiel';
  } else if (p.job === 'cloe') {
    selectedCharacterId = 'cloe';
  } else if (p.job === 'naya') {
    selectedCharacterId = 'naya';
  } else if (p.job === 'benya') {
    selectedCharacterId = 'benya';
  } else if (p.job === 'isolet') {
    selectedCharacterId = 'isolet';
  } else if (p.job === 'lucian') {
    selectedCharacterId = 'lucian';
  } else if (p.job === 'boris') {
    selectedCharacterId = 'boris';
  } else if (p.job === 'siblyn') {
    selectedCharacterId = 'siblyn';
  } else if (p.job === 'anais_bear') {
    selectedCharacterId = 'anais';
    if (!p.branchId) p.branchId = 'anais_bear';
  } else {
    selectedCharacterId = 'anais';
  }

  const charSelect = document.getElementById('char-select');
  if (charSelect) charSelect.value = selectedCharacterId;
  updateArchetypeDropdownForChar(selectedCharacterId, p.branchId || p.archetype || 'magic_def');

  const effMain = (p.baseStats && p.baseStats.mr) || p.mdef || 1400;
  const effAcc = (p.baseStats && p.baseStats.dex) || p.acc || 1300;
  if (document.getElementById('in-mdef')) document.getElementById('in-mdef').value = effMain;
  if (document.getElementById('in-acc'))  document.getElementById('in-acc').value  = effAcc;
  if (document.getElementById('in-elem')) document.getElementById('in-elem').value = p.elem || 165;
  if (document.getElementById('in-eta'))  document.getElementById('in-eta').value  = p.eta  || 1;
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
    if (archSelect) archSelect.value = p.branchId || p.archetype;
  }

  // Cascade to Tab 6 (Coeff Calculator) if profile has base stats
  if (p.baseStats && typeof getActiveCoeffProfile === 'function') {
    const coeffProf = getActiveCoeffProfile();
    if (coeffProf) {
      if (coeffProf.baseStats) {
        coeffProf.baseStats = { ...coeffProf.baseStats, ...p.baseStats };
      }
      if (p.titlePet && coeffProf.bonusStats) {
        if (coeffProf.bonusStats.title) {
          coeffProf.bonusStats.title.dex = p.titlePet.titleDex || 80;
          coeffProf.bonusStats.title.mr = p.titlePet.titleMain || 80;
        }
      }
    }
  }

  // Cascade to Upgrade Comparator
  if (typeof updateSpecupComparison === 'function') {
    updateSpecupComparison();
  }
  if (p.twEquipState && typeof asIsEquipState !== 'undefined') {
    asIsEquipState = JSON.parse(JSON.stringify(p.twEquipState));
    toBeEquipState = JSON.parse(JSON.stringify(asIsEquipState));
    if (document.getElementById('tw-equip-window-asis')) {
      renderInGameEquipWindow('asis', asIsEquipState, false);
      renderInGameEquipWindow('tobe', toBeEquipState, true);
      updateDualEquipWindowDiff();
    }
  }

  evaluateStats();
  updateWeeklyProgress();
  loadWeeklyLootData();
  renderAllTaskLootBadges();
  updateTotalLootSeed();
}

function saveCurrentStateToProfile() {
  const p = profiles.find(x => x.id === currentProfileId);
  if (!p) return;

  p.characterId = selectedCharacterId;
  p.branchId = selectedBranchId;
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

function switchProfileModalTab(tabKey, btnEl) {
  document.querySelectorAll('.profile-modal-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const tabBasic = document.getElementById('prof-tab-basic');
  const tabStats = document.getElementById('prof-tab-stats');
  const tabGear  = document.getElementById('prof-tab-gear');
  const tabBonus = document.getElementById('prof-tab-bonus');

  if (tabBasic) tabBasic.style.display = tabKey === 'basic' ? 'block' : 'none';
  if (tabStats) tabStats.style.display = tabKey === 'stats' ? 'block' : 'none';
  if (tabGear)  tabGear.style.display  = tabKey === 'gear'  ? 'block' : 'none';
  if (tabBonus) tabBonus.style.display = tabKey === 'bonus' ? 'block' : 'none';

  if (tabKey === 'gear') {
    if (!modalGearState) {
      const cur = (typeof profiles !== 'undefined' && profiles.find(x => x.id === currentProfileId)) || (typeof profiles !== 'undefined' ? profiles[0] : null);
      modalGearState = JSON.parse(JSON.stringify(cur?.twEquipState || asIsEquipState || TW_DEFAULT_EQUIP_STATE));
    }
    renderInGameEquipWindow('modal', modalGearState, true);
    updateModalGearKpiBanner(modalGearState);
    renderModalGearQuickChips(modalGearState);
    if (typeof renderModalGearGrid === 'function') {
      renderModalGearGrid(modalGearState);
    }
  }
}

let modalGearState = null;

function renderModalGearQuickChips(state) {
  const container = document.getElementById('modal-gear-quick-chips');
  if (!container || !state) return;

  const quickSlots = [
    { key: 'arms', label: '⚔️ 무기' },
    { key: 'armor', label: '🥋 갑옷' },
    { key: 'subArms', label: '🛡️ 손목' },
    { key: 'showSubArms', label: '💍 커프' },
    { key: 'head', label: '👑 투구' },
    { key: 'face', label: '📿 얼굴' },
    { key: 'back', label: '🪶 날개' },
    { key: 'hand', label: '🧤 손' },
    { key: 'foot', label: '👢 발' },
    { key: 'effect', label: '🌟 효과' },
    { key: 'artifact', label: '🔮 아티팩트' },
    { key: 'relicRight', label: '☀️ 신조렐릭' },
    { key: 'relicLeft', label: '💎 태양렐릭' }
  ];

  container.innerHTML = quickSlots.map(s => {
    const it = state[s.key] || {};
    const name = it.name || s.label;
    const shortName = name.replace(/\[넥슨30주년\]\s*/, '').replace(/\(100\/100\)|\(52\/52\)/g, '').trim();
    return `
      <button type="button" class="modal-gear-quick-chip" onclick="openSlotTunerModal('${s.key}', 'modal')" title="${name} 클릭하여 튜닝">
        <span style="font-weight:700; color:#38bdf8;">${s.label}:</span>
        <span style="color:#e2e8f0;">${shortName}</span>
      </button>
    `;
  }).join('');
}

function renderModalGearGrid(state) {
  const gridEl = document.getElementById('modal-gear-item-grid');
  if (!gridEl || !state || typeof TW_INGAME_EQUIP_LAYOUT === 'undefined') return;

  const slotItems = [
    { key: "arms", label: "무기 (REAL ARMS)", icon: "⚔️" },
    { key: "armor", label: "갑옷 (REAL ARMOR)", icon: "🥋" },
    { key: "subArms", label: "손목 (REAL SUB ARMS)", icon: "🛡️" },
    { key: "showSubArms", label: "라이도 커프 (SHOW SUB)", icon: "💍" },
    { key: "head", label: "투구 (REAL HEAD)", icon: "👑" },
    { key: "face", label: "아뮬렛 (REAL FACE)", icon: "📿" },
    { key: "back", label: "날개 (REAL BACK)", icon: "🪶" },
    { key: "hand", label: "건틀렛 (HAND)", icon: "🧤" },
    { key: "foot", label: "부츠 (REAL FOOT)", icon: "👢" },
    { key: "effect", label: "효과 (REAL EFFECT)", icon: "🌟" },
    { key: "artifact", label: "아티팩트 (ARTIFACT)", icon: "🔮" },
    { key: "relicRight", label: "성소 렐릭 (RELIC)", icon: "☀️" }
  ];

  gridEl.innerHTML = slotItems.map(itemDef => {
    const it = state[itemDef.key] || {};
    const tierStyle = (typeof TW_TIER_STYLES !== 'undefined' && TW_TIER_STYLES[it.tier]) || { class: 'tw-rarity-abyss' };
    const name = it.name || "미착용";
    const qName = it.quality === 'hyper_limit' ? '초한계(+35)' : (it.quality === 'limit' ? '한계작(+30)' : (it.quality === 'budget' ? '떡작(+3)' : '국민작(+15)'));
    const qClass = (it.quality === 'hyper_limit' || it.quality === 'limit') ? 'limit' : '';
    const abText = it.ability === 'superior' ? '최상급(3%)' : (it.ability === 'normal' ? '상급(2%)' : '');
    const optText = (it.optDmg ? `딜+${it.optDmg}%` : '') + (it.optAcc ? ` 명+${it.optAcc}` : '');

    return `
      <div class="modal-gear-card" onclick="openSlotTunerModal('${itemDef.key}', 'modal')" title="클릭하여 ${itemDef.label} 정밀 튜닝">
        <div class="modal-gear-card-icon">${itemDef.icon}</div>
        <div class="modal-gear-card-body">
          <div class="modal-gear-card-top">
            <span>${itemDef.label}</span>
            <span style="color:#60a5fa; font-size:0.65rem;">정밀 튜닝 ⚙️</span>
          </div>
          <div class="modal-gear-card-name ${tierStyle.class}">
            ${name}
          </div>
          <div class="modal-gear-card-sub">
            ${it.enhance !== undefined ? `<span class="badge-pill">${it.enhance}강</span>` : ''}
            <span class="badge-pill ${qClass}">${qName}</span>
            ${abText ? `<span class="badge-pill">${abText}</span>` : ''}
            ${optText ? `<span class="badge-pill">${optText}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateModalGearKpiBanner(state) {
  const bannerEl = document.getElementById('modal-gear-kpi-banner');
  if (!bannerEl || !state || typeof calculateEquipStateMetrics !== 'function') return;

  const m = calculateEquipStateMetrics(state);
  bannerEl.innerHTML = `
    <div class="modal-gear-kpi-item">
      <span class="lbl">착용 장비 종합 계수</span>
      <span class="val" style="color:#fde68a;">+${m.totalCoeff.toLocaleString()}</span>
    </div>
    <div class="modal-gear-kpi-item">
      <span class="lbl">착용 장비 총합 명중(DEX)</span>
      <span class="val" style="color:#38bdf8;">+${m.totalDex}</span>
    </div>
    <div class="modal-gear-kpi-item">
      <span class="lbl">부가 옵션 피해량 증폭</span>
      <span class="val" style="color:#f472b6;">+${m.extraDmgPct}%</span>
    </div>
  `;
}

function updateModalStatLiveSummary() {
  const sumEl = document.getElementById('modal-stat-live-summary');
  if (!sumEl) return;

  const inMR = Number(document.getElementById('modal-stat-mr') ? document.getElementById('modal-stat-mr').value : 1400) || 0;
  const inDEX = Number(document.getElementById('modal-stat-dex') ? document.getElementById('modal-stat-dex').value : 1300) || 0;
  const petConc = document.getElementById('modal-chk-pet-concentration') ? document.getElementById('modal-chk-pet-concentration').checked : true;
  const petDex = petConc ? 150 : 0;

  const m = (modalGearState && typeof calculateEquipStateMetrics === 'function') 
    ? calculateEquipStateMetrics(modalGearState) 
    : { totalCoeff: 45000, totalDex: 500, regularMainSum: 500, enhanceMainSum: 200, regularDexSum: 200, enhanceDexSum: 80 };

  const totalMain = inMR + (m.regularMainSum || 0) + (m.enhanceMainSum || 0);
  const totalDex = inDEX + (m.regularDexSum || 0) + (m.enhanceDexSum || 0) + petDex;

  sumEl.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.35rem;">
      <span style="font-weight:800; font-size:0.83rem; color:#fde68a;">🛡️ 순수 스탯 + 착용 장비 합산 실전 능력치</span>
      <span style="font-size:0.72rem; color:#38bdf8;">(프로필 저장 시 6번 탭 전투 시험장 자동 반영)</span>
    </div>
    <div style="display:flex; gap:0.45rem; flex-wrap:wrap; font-size:0.76rem;">
      <span style="background:rgba(245, 158, 11, 0.15); border:1px solid rgba(245, 158, 11, 0.35); padding:2px 7px; border-radius:4px; color:#fde68a;">
        실전 최종 주스탯: <b>${totalMain.toLocaleString()}</b> (순수 ${inMR} + 장비 ${m.regularMainSum + m.enhanceMainSum})
      </span>
      <span style="background:rgba(56, 189, 248, 0.15); border:1px solid rgba(56, 189, 248, 0.35); padding:2px 7px; border-radius:4px; color:#38bdf8;">
        실전 최종 명중(DEX): <b>${totalDex.toLocaleString()}</b> (순수 ${inDEX} + 장비 ${m.regularDexSum + m.enhanceDexSum} + 펫 ${petDex})
      </span>
      <span style="background:rgba(52, 211, 153, 0.15); border:1px solid rgba(52, 211, 153, 0.35); padding:2px 7px; border-radius:4px; color:#6ee7b7;">
        종합 전투 계수: <b>${m.totalCoeff.toLocaleString()}</b>
      </span>
    </div>
  `;
}

function jumpToDualEquipWindowFromModal(slotKey) {
  closeProfileModal();
  switchTab('tab-coeff', document.querySelector('.tab-btn[data-tab="tab-coeff"]'));
  switchComparatorMode('equip_window', document.querySelector('.specup-mode-tab[data-mode="equip_window"]'));
  if (slotKey && typeof openSlotTunerModal === 'function') {
    setTimeout(() => {
      openSlotTunerModal(slotKey);
    }, 150);
  }
  const el = document.getElementById('specup-tw-dual-grid');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function onModalGearPresetChange(val) {
  if (!modalGearState) {
    modalGearState = JSON.parse(JSON.stringify(TW_DEFAULT_EQUIP_STATE));
  }

  const realSlots = ['arms', 'subArms', 'armor', 'head', 'face', 'back', 'hand', 'foot'];
  const sMap = { arms: "무기", subArms: "리스트", armor: "로브", head: "헬름", face: "아뮬렛", back: "윙", hand: "건틀렛", foot: "부츠" };

  if (val === 'abyss_10_std') {
    realSlots.forEach(k => {
      modalGearState[k] = {
        key: k, tier: 'abyss', enhance: 10, quality: 'standard', ability: 'superior',
        optDmg: k === 'arms' ? 3 : 0, optAcc: 15, optElem: 10,
        name: `+10 어비스 ${sMap[k]}`, dur: "(52/52)", isOn: true
      };
    });
    if (modalGearState.showSubArms) {
      modalGearState.showSubArms = { key: "showSubArms", tier: "gold", name: "라이도 심볼릭 커프 (140)", stat: 140, dex: 35, dur: "(100/100)", isOn: true };
    }
    if (modalGearState.effect) {
      modalGearState.effect = { key: "effect", tier: "gold", name: "[넥슨30주년] 빛나는 효과 (60마방)", stat: 60, dex: 35, dur: "(55/55)", isOn: true };
    }
  } else if (val === 'aquilus_all') {
    realSlots.forEach(k => {
      modalGearState[k] = {
        key: k, tier: 'aquilus', enhance: 8, quality: 'standard', ability: 'normal',
        optDmg: k === 'arms' ? 2 : 0, optAcc: 10, optElem: 5,
        name: `+8 眞 아퀼루스 ${sMap[k]}`, dur: "(48/52)", isOn: true
      };
    });
    if (modalGearState.showSubArms) {
      modalGearState.showSubArms = { key: "showSubArms", tier: "gold", name: "라이도 심볼릭 커프 (80)", stat: 80, dex: 20, dur: "(100/100)", isOn: true };
    }
    if (modalGearState.effect) {
      modalGearState.effect = { key: "effect", tier: "gold", name: "30 마방 효과", stat: 30, dex: 15, dur: "(55/55)", isOn: true };
    }
  } else if (val === 'eclipse_3_abyss_5') {
    ['arms', 'back'].forEach(k => {
      modalGearState[k] = {
        key: k, tier: 'eclipse', enhance: 10, quality: 'standard', ability: 'superior',
        optDmg: k === 'arms' ? 5 : 0, optAcc: 15, optElem: 10,
        name: `+10 이클립스 ${sMap[k]}`, dur: "(65/65)", isOn: true
      };
    });
    ['subArms', 'armor', 'head', 'face', 'hand', 'foot'].forEach(k => {
      modalGearState[k] = {
        key: k, tier: 'abyss', enhance: 10, quality: 'standard', ability: 'superior',
        optDmg: 0, optAcc: 15, optElem: 10,
        name: `+10 어비스 ${sMap[k]}`, dur: "(52/52)", isOn: true
      };
    });
    if (modalGearState.artifact) {
      modalGearState.artifact = { key: "artifact", tier: "eclipse", name: "이클립스 아티팩트", stat: 120, dex: 40, dur: "(40/40)", isOn: true };
    }
    if (modalGearState.showSubArms) {
      modalGearState.showSubArms = { key: "showSubArms", tier: "gold", name: "라이도 심볼릭 커프 (140)", stat: 140, dex: 35, dur: "(100/100)", isOn: true };
    }
    if (modalGearState.effect) {
      modalGearState.effect = { key: "effect", tier: "gold", name: "[넥슨30주년] 빛나는 효과 (60마방)", stat: 60, dex: 35, dur: "(55/55)", isOn: true };
    }
  } else if (val === 'eclipse_all_limit') {
    realSlots.forEach(k => {
      modalGearState[k] = {
        key: k, tier: 'eclipse', enhance: 11, quality: 'limit', ability: 'superior',
        optDmg: k === 'arms' ? 5 : 0, optAcc: 25, optElem: 15,
        name: `+11 이클립스 ${sMap[k]}`, dur: "(65/65)", isOn: true
      };
    });
    if (modalGearState.showSubArms) {
      modalGearState.showSubArms = { key: "showSubArms", tier: "eclipse", name: "라이도 심볼릭 커프 (200)", stat: 200, dex: 50, dur: "(100/100)", isOn: true };
    }
    if (modalGearState.effect) {
      modalGearState.effect = { key: "effect", tier: "eclipse", name: "[넥슨30주년] 찬란한 효과 (100마방)", stat: 100, dex: 50, dur: "(55/55)", isOn: true };
    }
    if (modalGearState.artifact) {
      modalGearState.artifact = { key: "artifact", tier: "eclipse", name: "이클립스 아티팩트", stat: 120, dex: 40, dur: "(40/40)", isOn: true };
    }
  }

  renderInGameEquipWindow('modal', modalGearState, true);
  updateModalGearKpiBanner(modalGearState);
  updateModalStatLiveSummary();
  renderModalGearQuickChips(modalGearState);
  if (typeof renderModalGearGrid === 'function') {
    renderModalGearGrid(modalGearState);
  }
}

function applyPresetToModal(val) {
  const presetSel = document.getElementById('modal-gear-preset');
  if (presetSel) {
    presetSel.value = val;
  }
  onModalGearPresetChange(val);
}

function applyKoreanStandardToModal() {
  applyPresetToModal('abyss_10_std');
  const job = document.getElementById('modal-char-job') ? document.getElementById('modal-char-job').value : 'anais_biho';
  const isMagicDef = job === 'anais_biho' || job === 'tichiel_white';
  const isHack = job === 'yepnen' || job === 'boris' || job === 'benya';
  const isStab = job === 'lucian' || job === 'siblyn';
  
  if (document.getElementById('modal-stat-mr')) document.getElementById('modal-stat-mr').value = isMagicDef ? 1400 : 200;
  if (document.getElementById('modal-stat-hack')) document.getElementById('modal-stat-hack').value = isHack ? 750 : 0;
  if (document.getElementById('modal-stat-stab')) document.getElementById('modal-stat-stab').value = isStab ? 750 : 0;
  if (document.getElementById('modal-stat-int')) document.getElementById('modal-stat-int').value = (!isMagicDef && !isHack && !isStab) ? 800 : 0;
  if (document.getElementById('modal-stat-dex')) document.getElementById('modal-stat-dex').value = 1300;
  if (document.getElementById('modal-stat-def')) document.getElementById('modal-stat-def').value = 450;
  if (document.getElementById('modal-stat-eta')) document.getElementById('modal-stat-eta').value = 5;

  if (document.getElementById('modal-chk-weapon-yeonma')) document.getElementById('modal-chk-weapon-yeonma').checked = true;
  if (document.getElementById('modal-chk-armor-yeonma')) document.getElementById('modal-chk-armor-yeonma').checked = true;
  if (document.getElementById('modal-chk-elem-yeonma')) document.getElementById('modal-chk-elem-yeonma').checked = true;
  if (document.getElementById('modal-chk-third-sien')) document.getElementById('modal-chk-third-sien').checked = true;
  if (document.getElementById('modal-chk-pet-concentration')) document.getElementById('modal-chk-pet-concentration').checked = true;
  if (document.getElementById('modal-chk-avatar-set')) document.getElementById('modal-chk-avatar-set').checked = true;

  updateModalStatLiveSummary();
}

function openProfileModal(mode) {
  const modal = document.getElementById('profile-modal');
  modal.classList.add('active');
  switchProfileModalTab('basic', document.querySelector('.profile-modal-tab[data-tab="basic"]'));
  
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
    modalGearState = JSON.parse(JSON.stringify(TW_DEFAULT_EQUIP_STATE));
    applyKoreanStandardToModal();
  } else {
    const cur = profiles.find(p => p.id === currentProfileId) || profiles[0];
    title.textContent = '✏️ 캐릭터 프로필 설정 (' + cur.name + ')';
    idInput.value = cur.id;
    nameInput.value = cur.name;
    jobInput.value = cur.job || 'anais_biho';
    memoInput.value = cur.memo || '';

    // Load stats
    const bStats = cur.baseStats || { stab: 0, hack: 0, int: 0, mr: cur.mdef || 1400, dex: cur.acc || 1300, def: 0 };
    if (document.getElementById('modal-stat-stab')) document.getElementById('modal-stat-stab').value = bStats.stab || 0;
    if (document.getElementById('modal-stat-hack')) document.getElementById('modal-stat-hack').value = bStats.hack || 0;
    if (document.getElementById('modal-stat-int')) document.getElementById('modal-stat-int').value = bStats.int || 0;
    if (document.getElementById('modal-stat-mr')) document.getElementById('modal-stat-mr').value = bStats.mr || cur.mdef || 1400;
    if (document.getElementById('modal-stat-dex')) document.getElementById('modal-stat-dex').value = bStats.dex || cur.acc || 1300;
    if (document.getElementById('modal-stat-def')) document.getElementById('modal-stat-def').value = bStats.def || 0;
    if (document.getElementById('modal-stat-eta')) document.getElementById('modal-stat-eta').value = cur.eta || 1;

    // Load yeonma
    const ym = cur.yeonma || { weapon: true, armor: true, elem: true, thirdSien: true };
    if (document.getElementById('modal-chk-weapon-yeonma')) document.getElementById('modal-chk-weapon-yeonma').checked = !!ym.weapon;
    if (document.getElementById('modal-chk-armor-yeonma')) document.getElementById('modal-chk-armor-yeonma').checked = !!ym.armor;
    if (document.getElementById('modal-chk-elem-yeonma')) document.getElementById('modal-chk-elem-yeonma').checked = !!ym.elem;
    if (document.getElementById('modal-chk-third-sien')) document.getElementById('modal-chk-third-sien').checked = !!ym.thirdSien;

    // Load title/pet
    const tp = cur.titlePet || { title: '시련의 서약자 (DEX +80, 주스탯 +80)', titleMain: 80, titleDex: 80, petConc: true, avatarSet: true };
    if (document.getElementById('modal-bonus-title-name')) document.getElementById('modal-bonus-title-name').value = tp.title || '';
    if (document.getElementById('modal-bonus-title-main')) document.getElementById('modal-bonus-title-main').value = tp.titleMain || 80;
    if (document.getElementById('modal-bonus-title-dex')) document.getElementById('modal-bonus-title-dex').value = tp.titleDex || 80;
    if (document.getElementById('modal-chk-pet-concentration')) document.getElementById('modal-chk-pet-concentration').checked = !!tp.petConc;
    if (document.getElementById('modal-chk-avatar-set')) document.getElementById('modal-chk-avatar-set').checked = !!tp.avatarSet;

    // Load equipment state
    modalGearState = JSON.parse(JSON.stringify(cur.twEquipState || asIsEquipState || TW_DEFAULT_EQUIP_STATE));
    cur.twEquipState = JSON.parse(JSON.stringify(modalGearState));
    const preset = cur.gearPreset || 'custom';
    if (document.getElementById('modal-gear-preset')) {
      document.getElementById('modal-gear-preset').value = preset;
    }
    renderInGameEquipWindow('modal', modalGearState, true);
    updateModalGearKpiBanner(modalGearState);
    updateModalStatLiveSummary();
    renderModalGearQuickChips(modalGearState);
    if (typeof renderModalGearGrid === 'function') {
      renderModalGearGrid(modalGearState);
    }
  }

  // Cross-bind stats inputs to live summary
  const statInputs = ['modal-stat-mr', 'modal-stat-dex', 'modal-stat-stab', 'modal-stat-hack', 'modal-stat-int', 'modal-chk-pet-concentration'];
  statInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.oninput = updateModalStatLiveSummary;
  });
}

function closeProfileModal() {
  document.getElementById('profile-modal').classList.remove('active');
}

function saveProfileFromModal() {
  const id = document.getElementById('modal-profile-id').value;
  const name = document.getElementById('modal-char-name').value.trim() || '새 캐릭터';
  const job = document.getElementById('modal-char-job').value;
  const memo = document.getElementById('modal-char-memo').value.trim();

  const jobMap = {
    anais_biho: { charId: 'anais', branchId: 'anais_biho', arch: 'magic_def' },
    anais_bear: { charId: 'anais', branchId: 'anais_bear', arch: 'composite' },
    roamini:    { charId: 'roamini', branchId: 'roamini_magic', arch: 'magic_atk' },
    yepnen:     { charId: 'yepnen', branchId: 'yepnen_hack', arch: 'hack' },
    tichiel_white: { charId: 'tichiel', branchId: 'tichiel_white', arch: 'magic_def' },
    cloe:       { charId: 'cloe', branchId: 'cloe_magic', arch: 'magic_atk' },
    naya:       { charId: 'naya', branchId: 'naya_comp', arch: 'composite' },
    benya:      { charId: 'benya', branchId: 'benya_scythe', arch: 'hack' },
    isolet:     { charId: 'isolet', branchId: 'isolet_tiella', arch: 'composite' },
    lucian:     { charId: 'lucian', branchId: 'lucian_stab', arch: 'stab' },
    boris:      { charId: 'boris', branchId: 'boris_hack', arch: 'hack' },
    siblyn:     { charId: 'siblyn', branchId: 'siblyn_spear', arch: 'stab' },
    other:      { charId: 'anais', branchId: 'anais_biho', arch: 'magic_def' }
  };
  const meta = jobMap[job] || jobMap.other;

  const baseStats = {
    stab: Number(document.getElementById('modal-stat-stab').value) || 0,
    hack: Number(document.getElementById('modal-stat-hack').value) || 0,
    int:  Number(document.getElementById('modal-stat-int').value)  || 0,
    mr:   Number(document.getElementById('modal-stat-mr').value)   || 0,
    dex:  Number(document.getElementById('modal-stat-dex').value)  || 0,
    def:  Number(document.getElementById('modal-stat-def').value)  || 0
  };

  const yeonma = {
    weapon: document.getElementById('modal-chk-weapon-yeonma') ? document.getElementById('modal-chk-weapon-yeonma').checked : true,
    armor:  document.getElementById('modal-chk-armor-yeonma') ? document.getElementById('modal-chk-armor-yeonma').checked : true,
    elem:   document.getElementById('modal-chk-elem-yeonma') ? document.getElementById('modal-chk-elem-yeonma').checked : true,
    thirdSien: document.getElementById('modal-chk-third-sien') ? document.getElementById('modal-chk-third-sien').checked : true
  };

  const gearPreset = document.getElementById('modal-gear-preset') ? document.getElementById('modal-gear-preset').value : 'custom';
  const etaLevel = Number(document.getElementById('modal-stat-eta').value) || 1;

  const titlePet = {
    title: document.getElementById('modal-bonus-title-name') ? document.getElementById('modal-bonus-title-name').value : '',
    titleMain: Number(document.getElementById('modal-bonus-title-main').value) || 0,
    titleDex: Number(document.getElementById('modal-bonus-title-dex').value) || 0,
    petConc: document.getElementById('modal-chk-pet-concentration') ? document.getElementById('modal-chk-pet-concentration').checked : true,
    avatarSet: document.getElementById('modal-chk-avatar-set') ? document.getElementById('modal-chk-avatar-set').checked : true
  };

  let p = profiles.find(x => x.id === id);
  if (!p) {
    p = {
      id: id,
      name: name,
      job: job,
      characterId: meta.charId,
      branchId: meta.branchId,
      archetype: meta.arch,
      memo: memo,
      mdef: baseStats.mr || 1400,
      acc: baseStats.dex || 1300,
      elem: 165,
      eta: etaLevel,
      target: 'shinjo',
      inputMode: 'nobuff',
      buffs: ['buff_trust'],
      tasks: {},
      baseStats: baseStats,
      yeonma: yeonma,
      gearPreset: gearPreset,
      titlePet: titlePet,
      gearBase: {},
      twEquipState: modalGearState ? JSON.parse(JSON.stringify(modalGearState)) : JSON.parse(JSON.stringify(TW_DEFAULT_EQUIP_STATE))
    };
    profiles.push(p);
  } else {
    p.name = name;
    p.job = job;
    p.memo = memo;
    p.characterId = meta.charId;
    p.branchId = meta.branchId;
    p.archetype = meta.arch;
    p.baseStats = baseStats;
    p.mdef = baseStats.mr;
    p.acc = baseStats.dex;
    p.eta = etaLevel;
    p.yeonma = yeonma;
    p.gearPreset = gearPreset;
    p.titlePet = titlePet;
    if (modalGearState) {
      p.twEquipState = JSON.parse(JSON.stringify(modalGearState));
    }
  }

  if (p.twEquipState) {
    asIsEquipState = JSON.parse(JSON.stringify(p.twEquipState));
    toBeEquipState = JSON.parse(JSON.stringify(p.twEquipState));
    if (typeof calculateEquipStateMetrics === 'function') {
      const m = calculateEquipStateMetrics(p.twEquipState);
      p.totalCoeff = m.totalCoeff;
      p.totalDex = m.totalDex;
    }
    if (document.getElementById('tw-equip-window-asis')) {
      renderInGameEquipWindow('asis', asIsEquipState, false);
      renderInGameEquipWindow('tobe', toBeEquipState, true);
      if (typeof updateDualEquipWindowDiff === 'function') updateDualEquipWindowDiff();
    }
  }

  currentProfileId = id;
  try {
    localStorage.setItem('tw_companion_profiles_v3', JSON.stringify(profiles));
    localStorage.setItem('tw_companion_active_id', id);
  } catch (e) {}

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
  if (!document.body) return;
  const isCompact = document.body.classList.toggle('compact-mode');
  const btn = document.getElementById('btn-compact');
  if (btn) btn.textContent = isCompact ? '🖥️ 기본 뷰' : '📱 컴팩트 모드';
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

  const uncompleted = totalTasks - doneTasks;
  const uncompletedEl = document.getElementById('uncompleted-count');
  if (uncompletedEl) {
    uncompletedEl.textContent = uncompleted;
  }
  if (hideCompletedTasks) {
    applyWeeklyFilterDisplay();
  }

  updateTotalLootSeed(earnedSeed);

  saveCurrentStateToProfile();
};

// ==================== TAB 3 QUICK JUMP, SMART FILTER & ACCORDION UX ====================
let currentWeeklyCatFilter = 'all';
let hideCompletedTasks = false;
let allCategoriesExpanded = true;

function scrollToSection(secId) {
  const el = document.getElementById(secId);
  if (!el) return;
  const yOffset = -70;
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function filterWeeklyTasks(cat, btnEl) {
  currentWeeklyCatFilter = cat;
  const group = document.querySelector('#sec-task-filter .task-filter-group');
  if (group) {
    group.querySelectorAll('.task-filter-btn').forEach(b => b.classList.remove('active'));
  }
  if (btnEl) btnEl.classList.add('active');
  applyWeeklyFilterDisplay();
}

function toggleUncompletedFilter() {
  hideCompletedTasks = !hideCompletedTasks;
  const btn = document.getElementById('btn-uncompleted-filter');
  if (btn) {
    if (hideCompletedTasks) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
  applyWeeklyFilterDisplay();
}

function applyWeeklyFilterDisplay() {
  const catBlocks = document.querySelectorAll('#tab-weekly .cat-block[data-category]');
  catBlocks.forEach(block => {
    const blockCat = block.dataset.category;
    const isCatMatch = (currentWeeklyCatFilter === 'all' || blockCat === currentWeeklyCatFilter);
    if (!isCatMatch) {
      block.style.display = 'none';
      return;
    }
    block.style.display = '';

    const taskItems = block.querySelectorAll('.task-item');
    taskItems.forEach(item => {
      const chk = item.querySelector('.weekly-chk');
      const isDone = chk && chk.checked;
      if (hideCompletedTasks && isDone) {
        item.style.display = 'none';
      } else {
        item.style.display = '';
      }
    });
  });
}

function toggleTaskCategory(gridId, iconEl) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const isHidden = window.getComputedStyle(grid).display === 'none' || grid.style.display === 'none';
  grid.style.display = isHidden ? 'grid' : 'none';
  if (iconEl) {
    iconEl.textContent = isHidden ? '▾' : '▸';
  }
}

function toggleAllTaskCategories() {
  allCategoriesExpanded = !allCategoriesExpanded;
  const targetDisplay = allCategoriesExpanded ? 'grid' : 'none';
  const targetIcon = allCategoriesExpanded ? '▾' : '▸';

  ['grid-daily', 'grid-special', 'grid-bosses', 'grid-routine'].forEach(id => {
    const grid = document.getElementById(id);
    if (grid) grid.style.display = targetDisplay;
  });

  document.querySelectorAll('.cat-toggle-icon').forEach(icon => {
    icon.textContent = targetIcon;
  });

  const toggleTextEl = document.getElementById('all-boxes-toggle-text');
  if (toggleTextEl) {
    toggleTextEl.textContent = allCategoriesExpanded ? '▴ 모두 접기' : '▾ 모두 펼치기';
  }
}

function scrollToPageTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initBackToTopButton() {
  const btn = document.getElementById('btn-back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 320) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  }, { passive: true });
}

function initGrowthMilestones() {
  try {
    const saved = JSON.parse(localStorage.getItem('tw_growth_milestones') || '{}');
    document.querySelectorAll('.milestone-item input[type="checkbox"]').forEach(chk => {
      const key = chk.getAttribute('data-milestone');
      if (key && saved[key]) {
        chk.checked = true;
      }
      chk.addEventListener('change', () => {
        try {
          const cur = JSON.parse(localStorage.getItem('tw_growth_milestones') || '{}');
          cur[key] = chk.checked;
          localStorage.setItem('tw_growth_milestones', JSON.stringify(cur));
        } catch (e) {}
      });
    });
  } catch (e) {}
}

function bootCompanion() {
  initCharacterSelectors();
  initProfiles();
  setInterval(updateThursdayCountdown, 1000);
  setInterval(updatePartyCountdown, 1000);
  updateThursdayCountdown();
  renderWasteTable();
  renderAbendonTable();
  renderEquipCalc();
  evaluateStats();
  renderExtraActiveDopingChips();
  updateConflictLocks();
  loadWeeklyTasks();
  initCoeffCalculator();
  initGrowthMilestones();
  initPartyHub();
  initBackToTopButton();
  renderGlossaryCards();
  initWeeklyTaskLootTracker();
  initRuneCollectionTracker();
  initEncryptCalculator();
  initCombatSimulator();
  initRoadmapRecommender();
  initSpecupComparator();
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
    if (coeffProfiles && coeffProfiles.length > 0) {
      prof = coeffProfiles[0];
      activeCoeffProfileId = prof.id;
    } else {
      loadCoeffProfiles();
      prof = coeffProfiles && coeffProfiles.length > 0 ? coeffProfiles[0] : null;
      if (prof) activeCoeffProfileId = prof.id;
    }
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
  if (typeof populateCombatSkillSelector === 'function') {
    populateCombatSkillSelector(typeKey);
  }
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

  // Dynamic Override fields based on active formula
  const mainKey = formula.mainStat.toLowerCase();
  const subKey  = formula.subStat.toLowerCase();

  // Avatar / Pet / Etc bonus inputs
  const avatar = (prof.bonusStats && prof.bonusStats.avatar) || {};
  const pet    = (prof.bonusStats && prof.bonusStats.pet) || {};
  const etc    = (prof.bonusStats && prof.bonusStats.etc) || (prof.bonusStats && prof.bonusStats.title) || {};

  const setBonusInputs = (prefix, obj) => {
    const elMain = document.getElementById(`coeff-${prefix}-main`);
    const elSub  = document.getElementById(`coeff-${prefix}-sub`);
    const elDex  = document.getElementById(`coeff-${prefix}-dex`);
    if (elMain) elMain.value = obj[mainKey] || 0;
    if (elSub)  elSub.value  = obj[subKey] || 0;
    if (elDex)  elDex.value  = obj.dex || 0;
  };

  setBonusInputs('avatar', avatar);
  setBonusInputs('pet', pet);
  setBonusInputs('etc', etc);

  // Core
  const coreInput = document.getElementById('coeff-core-input');
  if (coreInput) coreInput.value = prof.core || 0;

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

function onBonusDynamicChange(cat, role, val) {
  const prof = getActiveCoeffProfile();
  const formula = coeffFormulas[prof.type] || coeffFormulas.stab;
  const num = Number(val) || 0;

  if (!prof.bonusStats) prof.bonusStats = {};
  if (!prof.bonusStats[cat]) prof.bonusStats[cat] = {};

  if (role === 'main') {
    const mainKey = formula.mainStat.toLowerCase();
    prof.bonusStats[cat][mainKey] = num;
  } else if (role === 'sub') {
    const subKey = formula.subStat.toLowerCase();
    prof.bonusStats[cat][subKey] = num;
  } else if (role === 'dex') {
    prof.bonusStats[cat].dex = num;
  }

  saveCoeffProfiles();
  calculateCoefficients();
}

function applyPetQuickPreset(presetType) {
  const prof = getActiveCoeffProfile();
  const formula = coeffFormulas[prof.type] || coeffFormulas.stab;
  const mainKey = formula.mainStat.toLowerCase();
  const subKey  = formula.subStat.toLowerCase();

  if (!prof.bonusStats) prof.bonusStats = {};
  if (!prof.bonusStats.pet) prof.bonusStats.pet = {};

  let mainVal = 0;
  let dexVal = 0;

  if (presetType === 'basic') {
    mainVal = 20;
    dexVal = 20;
  } else if (presetType === 'standard') {
    mainVal = 40;
    dexVal = 30; // standard S-skill Lv.4 + 집중
  } else if (presetType === 'max') {
    mainVal = 60;
    dexVal = 60; // max amplified S-skill
  } else if (presetType === 'zero') {
    mainVal = 0;
    dexVal = 0;
  }

  prof.bonusStats.pet[mainKey] = mainVal;
  prof.bonusStats.pet[subKey] = 0;
  prof.bonusStats.pet.dex = dexVal;

  saveCoeffProfiles();
  syncCoeffInputsFromProfile();
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

  // Additional Bonus Sum (Avatar, Pet, Etc)
  const avatar = (prof.bonusStats && prof.bonusStats.avatar) || { stab: 10, hack: 10, dex: 10, int: 0, mr: 0 };
  const pet    = (prof.bonusStats && prof.bonusStats.pet)    || { stab: 0,  hack: 0,  dex: 0,  int: 0, mr: 0 };
  const etc    = (prof.bonusStats && prof.bonusStats.etc)    || (prof.bonusStats && prof.bonusStats.title) || { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 };

  const bonusSum = {
    stab: (avatar.stab || 0) + (pet.stab || 0) + (etc.stab || 0),
    hack: (avatar.hack || 0) + (pet.hack || 0) + (etc.hack || 0),
    int:  (avatar.int  || 0) + (pet.int  || 0) + (etc.int  || 0),
    mr:   (avatar.mr   || 0) + (pet.mr   || 0) + (etc.mr   || 0),
    dex:  (avatar.dex  || 0) + (pet.dex  || 0) + (etc.dex  || 0)
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

  // Update Content Guide & Combat Simulation
  lastCalculatedCoeff = totalCoeff;
  lastCalculatedDex = totalDex;
  renderBossContentGuide(totalCoeff, totalDex);
  if (typeof updateCombatSimulation === 'function') {
    updateCombatSimulation(totalCoeff, totalDex);
  }
  if (typeof updateSpecupComparison === 'function') {
    updateSpecupComparison();
  }
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

// ==================== COMBAT TEST BENCH & 1-SHOT SIMULATOR LOGIC ====================
let combatActiveMonsterId = null;
let combatCurrentMonsterHp = 0;
let combatCurrentMonsterMaxHp = 0;
let combatLastCalculatedMetrics = null;

function initCombatSimulator() {
  populateCombatMonsterSelector();
  const prof = typeof getActiveCoeffProfile === 'function' ? getActiveCoeffProfile() : null;
  const typeKey = (prof && prof.type) || 'stab';
  populateCombatSkillSelector(typeKey);

  const monsterSel = document.getElementById('combat-monster-select');
  const skillSel = document.getElementById('combat-skill-select');
  const critChk = document.getElementById('combat-crit-chk');
  const thirdChk = document.getElementById('combat-third-sien-chk');
  const petChk = document.getElementById('combat-pet-conc-chk');

  if (monsterSel) {
    monsterSel.addEventListener('change', function() {
      combatActiveMonsterId = this.value;
      const target = (typeof TARGET_MONSTERS_DATA !== 'undefined' ? TARGET_MONSTERS_DATA : []).find(m => m.id === this.value);
      if (target) {
        combatCurrentMonsterHp = target.hp;
        combatCurrentMonsterMaxHp = target.hp;
      }
      if (typeof calculateCoefficients === 'function') calculateCoefficients();
    });
  }

  [skillSel, critChk, thirdChk, petChk].forEach(el => {
    if (el) {
      el.addEventListener('change', function() {
        if (typeof calculateCoefficients === 'function') calculateCoefficients();
      });
    }
  });

  // Initial trigger
  const initialTarget = (typeof TARGET_MONSTERS_DATA !== 'undefined' ? TARGET_MONSTERS_DATA : []).find(m => m.id === (monsterSel ? monsterSel.value : '')) || (typeof TARGET_MONSTERS_DATA !== 'undefined' && TARGET_MONSTERS_DATA[4]);
  if (initialTarget) {
    combatActiveMonsterId = initialTarget.id;
    combatCurrentMonsterHp = initialTarget.hp;
    combatCurrentMonsterMaxHp = initialTarget.hp;
  }
}

function populateCombatMonsterSelector() {
  const sel = document.getElementById('combat-monster-select');
  if (!sel || typeof TARGET_MONSTERS_DATA === 'undefined') return;

  const categories = [
    { key: "farming", label: "🌾 일반 사냥터 잡몹 (1방 컷 검증 특화)" },
    { key: "raid", label: "⚔️ 주간 레이드 보스 (실대미지 & 적중도 검증)" },
    { key: "dummy", label: "🎯 훈련용 허수아비 (순수 데미지 측정)" }
  ];

  sel.innerHTML = categories.map(cat => {
    const monsters = TARGET_MONSTERS_DATA.filter(m => m.category === cat.key);
    const options = monsters.map(m => {
      const isSelected = m.id === 'mob_apple' ? 'selected' : '';
      const hpLabel = m.hp >= 100000000 ? (m.hp / 100000000) + '억' : (m.hp / 10000) + '만';
      return `<option value="${m.id}" ${isSelected}>${m.name} (${m.dungeon}) - HP ${hpLabel}</option>`;
    }).join('');
    return `<optgroup label="${cat.label}">${options}</optgroup>`;
  }).join('');
}

function populateCombatSkillSelector(typeKey) {
  const sel = document.getElementById('combat-skill-select');
  if (!sel || typeof CHARACTER_SKILLS_DATA === 'undefined') return;

  const skills = CHARACTER_SKILLS_DATA[typeKey] || CHARACTER_SKILLS_DATA.stab || [];
  sel.innerHTML = skills.map((sk, idx) => {
    return `<option value="${sk.id}" ${idx === 0 ? 'selected' : ''}>${sk.name} [${sk.hits}타 / ${sk.mult}% 계수]</option>`;
  }).join('');
}

function updateCombatSimulation(currentCoeff, currentDex) {
  const monsterSel = document.getElementById('combat-monster-select');
  const skillSel = document.getElementById('combat-skill-select');
  if (!monsterSel || !skillSel || typeof TARGET_MONSTERS_DATA === 'undefined') return;

  const prof = typeof getActiveCoeffProfile === 'function' ? getActiveCoeffProfile() : null;
  const typeKey = (prof && prof.type) || 'stab';

  const monsterId = monsterSel.value || 'mob_apple';
  const target = TARGET_MONSTERS_DATA.find(m => m.id === monsterId) || TARGET_MONSTERS_DATA[4];

  if (!combatActiveMonsterId || combatActiveMonsterId !== target.id) {
    combatActiveMonsterId = target.id;
    combatCurrentMonsterHp = target.hp;
    combatCurrentMonsterMaxHp = target.hp;
  }

  const skills = CHARACTER_SKILLS_DATA[typeKey] || CHARACTER_SKILLS_DATA.stab || [];
  const skillId = skillSel.value;
  const skill = skills.find(s => s.id === skillId) || skills[0] || { name: "기본 공격", hits: 10, mult: 2000 };

  const isCrit = document.getElementById('combat-crit-chk') ? document.getElementById('combat-crit-chk').checked : true;
  const isThirdSien = document.getElementById('combat-third-sien-chk') ? document.getElementById('combat-third-sien-chk').checked : false;
  const isPetConc = document.getElementById('combat-pet-conc-chk') ? document.getElementById('combat-pet-conc-chk').checked : true;

  // 1. Hit Rate (적중도)
  const effDex = (Number(currentDex) || 1500) + (isPetConc ? 150 : 0);
  const dexDiff = effDex - target.eva;
  let hitRate = 100;
  let hitText = '100% 올힛';
  let hitColor = '#34d399';

  if (dexDiff >= 0) {
    hitRate = 100;
    hitText = '🟢 100% 올힛 (All-Hit)';
    hitColor = '#34d399';
  } else {
    hitRate = Math.max(5, Math.min(99, Math.round(100 + (dexDiff * 0.15))));
    if (hitRate >= 80) {
      hitText = `🟡 ${hitRate}% (부분 미스: ${100 - hitRate}% MISS)`;
      hitColor = '#facc15';
    } else {
      hitText = `🔴 ${hitRate}% (MISS 심각: -${Math.abs(dexDiff)})`;
      hitColor = '#f87171';
    }
  }

  // 2. Damage per Hit & Total
  const effMult = (skill.mult || 2000) + (isThirdSien ? 200 : 0);
  const effHits = (skill.hits || 10) + (isThirdSien ? 1 : 0);
  const isMagical = (typeKey === 'magic_def' || typeKey === 'magic_atk' || typeKey === 'magic_slash');
  const targetDef = isMagical ? target.mdef : target.pdef;
  const dopingBuffPct = (prof && prof.applyDoping) ? 30 : 0;

  const rawHit = ((currentCoeff || 45000) * (effMult / 100) * (1 + dopingBuffPct / 100) * 18) / effHits;
  let hitDmg = Math.max(1000, Math.round(rawHit - (targetDef * 12)));
  if (isCrit) {
    hitDmg = Math.round(hitDmg * 1.65);
  }
  const totalDmg = hitDmg * effHits;

  // Cache for interactive attack simulation
  combatLastCalculatedMetrics = {
    target,
    skill,
    hitRate,
    hitDmg,
    totalDmg,
    effHits,
    isCrit
  };

  // 3. 1-Shot Kill Verdict
  const verdictBanner = document.getElementById('combat-verdict-banner');
  const verdictTitle = document.getElementById('combat-verdict-title');
  const verdictDesc = document.getElementById('combat-verdict-desc');

  if (verdictBanner && verdictTitle && verdictDesc) {
    if (target.is1ShotTarget) {
      if (totalDmg >= target.hp) {
        const overkill = Math.round(((totalDmg - target.hp) / target.hp) * 100);
        verdictBanner.className = 'combat-verdict-banner success';
        verdictTitle.innerHTML = '<span>🎉</span><span>【1방 컷 (원샷 원킬) 달성!】</span>';
        verdictDesc.innerHTML = `스킬 1회 시전 총 대미지(<b>${totalDmg.toLocaleString()}</b>)가 몬스터 체력(<b>${target.hp.toLocaleString()}</b>)을 초과하여 1방에 완벽히 격파합니다! (오버킬 <b>+${overkill}%</b>)`;
      } else {
        const remain = target.hp - totalDmg;
        const remainPct = Math.round((remain / target.hp) * 100);
        const reqHits = Math.ceil(target.hp / totalDmg);
        verdictBanner.className = 'combat-verdict-banner fail';
        verdictTitle.innerHTML = '<span>⚠️</span><span>【1방 컷 부족 (추가 타격 필요)】</span>';
        verdictDesc.innerHTML = `스킬 1회 시전 시 몬스터 체력이 <b>${remainPct}% (${remain.toLocaleString()})</b> 남습니다. 처치하려면 <b>최소 ${reqHits}회</b> 시전이 필요합니다. (도핑/장비 보강 권장)`;
      }
    } else {
      // Raid Boss
      const bossDmgPct = ((totalDmg / target.hp) * 100).toFixed(2);
      const estHits = Math.ceil(target.hp / totalDmg);
      verdictBanner.className = 'combat-verdict-banner boss';
      verdictTitle.innerHTML = '<span>👑</span><span>【주간 레이드 보스 딜 점유율】</span>';
      verdictDesc.innerHTML = `스킬 1회 시전당 보스 Max HP의 <b>${bossDmgPct}% (${totalDmg.toLocaleString()})</b>를 차감합니다. (처치 예상 시전 횟수: 약 <b>${estHits.toLocaleString()}회</b>)`;
    }
  }

  // 4. Update UI Elements
  const mName = document.getElementById('combat-m-name');
  const mDungeon = document.getElementById('combat-m-dungeon');
  const mCat = document.getElementById('combat-m-category');
  const mPdef = document.getElementById('combat-m-pdef');
  const mMdef = document.getElementById('combat-m-mdef');
  const mEva = document.getElementById('combat-m-eva');

  if (mName) mName.textContent = target.name;
  if (mDungeon) mDungeon.textContent = target.dungeon;
  if (mCat) mCat.textContent = target.categoryName;
  if (mPdef) mPdef.textContent = target.pdef.toLocaleString();
  if (mMdef) mMdef.textContent = target.mdef.toLocaleString();
  if (mEva) mEva.textContent = target.eva.toLocaleString();

  const kpiHit = document.getElementById('combat-kpi-hit');
  const kpiPerhit = document.getElementById('combat-kpi-perhit');
  const kpiTotal = document.getElementById('combat-kpi-total');

  if (kpiHit) {
    kpiHit.textContent = hitText;
    kpiHit.style.color = hitColor;
  }
  if (kpiPerhit) kpiPerhit.textContent = `${hitDmg.toLocaleString()} ${isCrit ? '(크리)' : ''}`;
  if (kpiTotal) kpiTotal.textContent = `${totalDmg.toLocaleString()}`;

  updateCombatMonsterHpBar();
}

function updateCombatMonsterHpBar() {
  const hpText = document.getElementById('combat-m-hp-text');
  const hpBar = document.getElementById('combat-m-hp-bar');
  if (!hpText || !hpBar || !combatCurrentMonsterMaxHp) return;

  const pct = Math.max(0, Math.min(100, Math.round((combatCurrentMonsterHp / combatCurrentMonsterMaxHp) * 100)));
  hpText.textContent = `${combatCurrentMonsterHp.toLocaleString()} / ${combatCurrentMonsterMaxHp.toLocaleString()} (${pct}%)`;
  hpBar.style.width = `${pct}%`;

  if (pct === 0) {
    hpBar.classList.add('dead');
  } else {
    hpBar.classList.remove('dead');
  }
}

function runCombatAttackSimulation() {
  if (!combatLastCalculatedMetrics) {
    if (typeof calculateCoefficients === 'function') calculateCoefficients();
  }
  if (!combatLastCalculatedMetrics) return;

  const m = combatLastCalculatedMetrics;
  const card = document.getElementById('combat-monster-card');
  const logEl = document.getElementById('combat-battle-log');

  if (card) {
    card.classList.remove('hit-animation');
    void card.offsetWidth; // trigger reflow
    card.classList.add('hit-animation');
  }

  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];

  // If already dead, reset HP first
  if (combatCurrentMonsterHp <= 0) {
    combatCurrentMonsterHp = combatCurrentMonsterMaxHp;
    if (logEl) {
      logEl.innerHTML += `<div class="combat-log-line reset">[${timeStr}] 🔄 몬스터가 리스폰되었습니다 (체력 100% 복구).</div>`;
    }
  }

  // Hit or Miss check
  const isHit = Math.random() * 100 <= m.hitRate;
  if (!isHit) {
    if (logEl) {
      logEl.innerHTML += `<div class="combat-log-line miss">[${timeStr}] 💨 ${m.skill.name} 시전 ➔ 몬스터 회피(EVA)로 MISS 발생! (적중 실패)</div>`;
      logEl.scrollTop = logEl.scrollHeight;
    }
    return;
  }

  // Deduct HP
  combatCurrentMonsterHp = Math.max(0, combatCurrentMonsterHp - m.totalDmg);
  updateCombatMonsterHpBar();

  if (logEl) {
    const critTag = m.isCrit ? '💥 [CRITICAL]' : '🗡️ [NORMAL]';
    if (combatCurrentMonsterHp === 0) {
      logEl.innerHTML += `<div class="combat-log-line kill">[${timeStr}] ${critTag} ${m.skill.name} (${m.effHits}타) ➔ 총 ${m.totalDmg.toLocaleString()} 대미지! 💀 【${m.target.name}】 처치 완료!</div>`;
    } else {
      const pct = Math.round((combatCurrentMonsterHp / combatCurrentMonsterMaxHp) * 100);
      logEl.innerHTML += `<div class="combat-log-line ${m.isCrit ? 'crit' : 'hit'}">[${timeStr}] ${critTag} ${m.skill.name} (${m.effHits}타) ➔ ${m.totalDmg.toLocaleString()} 대미지 (타당 ${m.hitDmg.toLocaleString()}) | 잔여 HP: ${pct}%</div>`;
    }
    logEl.scrollTop = logEl.scrollHeight;
  }
}

function resetCombatMonsterHp() {
  combatCurrentMonsterHp = combatCurrentMonsterMaxHp;
  updateCombatMonsterHpBar();
  const logEl = document.getElementById('combat-battle-log');
  if (logEl) {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    logEl.innerHTML += `<div class="combat-log-line reset">[${timeStr}] 🔄 몬스터 체력이 100%로 초기화되었습니다.</div>`;
    logEl.scrollTop = logEl.scrollHeight;
  }
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




// ==================== 10. SERVERLESS PARTY RECRUITMENT & ALARM HUB ====================
const PARTY_STORAGE_KEY = 'tw_party_hub_data_v2';
const DEFAULT_PARTY_ROLES = [
  '비호정령 (버퍼/서폿)',
  '찌르기 딜러 (루시안/이스핀 등)',
  '베기 딜러 (보리스/막시민/나야 등)',
  '마법공격 딜러 (티치엘/클로에/조슈아 등)',
  '물리복합 딜러 (시벨린/나야/막시민 등)',
  '디버퍼/서포터 (리체/로아미니 등)',
  '자유 포지션 (모집 중)'
];

const DUNGEON_CAPACITY_MAP = {
  '이클립스 6보스 토벌': 5,
  '심연의 어비스 5단 파티': 5,
  '신조의 둥지 지옥 난이도': 5,
  '아페티리아 일반 파티': 2,
  '베스티지 보급품·별동대': 4,
  '오클리 방어전': 4,
  '시오칸하임 주간 파티': 5
};

let partyAudioCtx = null;
function getPartyAudioContext() {
  if (!partyAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      partyAudioCtx = new AudioContextClass();
    }
  }
  if (partyAudioCtx && partyAudioCtx.state === 'suspended') {
    partyAudioCtx.resume();
  }
  return partyAudioCtx;
}

function playPartySynthTone(freq, duration, type, startTimeOffset, gainLevel) {
  try {
    const soundToggle = document.getElementById('party-sound-toggle');
    if (soundToggle && !soundToggle.checked) return;

    const ctx = getPartyAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    const st = ctx.currentTime + (startTimeOffset || 0);
    osc.frequency.setValueAtTime(freq, st);

    gain.gain.setValueAtTime(0.001, st);
    gain.gain.exponentialRampToValueAtTime(gainLevel || 0.15, st + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, st + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(st);
    osc.stop(st + duration + 0.05);
  } catch (e) {
    console.warn('Audio synthesis notice:', e);
  }
}

function playPartyFullChime() {
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  notes.forEach((freq, idx) => {
    playPartySynthTone(freq, 0.35, 'triangle', idx * 0.11, 0.22);
  });
}

function playPartyWarningChime(minutes) {
  const f1 = minutes === 10 ? 880 : 987.77;
  const f2 = minutes === 10 ? 1174.66 : 1318.51;
  playPartySynthTone(f1, 0.4, 'sine', 0, 0.22);
  playPartySynthTone(f2, 0.6, 'sine', 0.18, 0.25);
}

function playPartyDepartureAlarm() {
  const sequence = [
    { freq: 523.25, dur: 0.2, time: 0 },
    { freq: 659.25, dur: 0.2, time: 0.16 },
    { freq: 783.99, dur: 0.25, time: 0.32 },
    { freq: 1046.50, dur: 0.65, time: 0.52 },
    { freq: 1318.51, dur: 0.85, time: 0.78 }
  ];
  sequence.forEach(n => {
    playPartySynthTone(n.freq, n.dur, 'triangle', n.time, 0.25);
  });
}

function testPartySound() {
  playPartyDepartureAlarm();
  showPartyToast('🔊 사운드 테스트 실행', 'Web Audio API 기반 팡파레 알람 사운드가 재생되었습니다.');
}

function requestBrowserNotificationPermission() {
  if (!('Notification' in window)) {
    showPartyToast('⚠️ 브라우저 알림 미지원', '사용 중인 웹 브라우저가 데스크톱 팝업 알림을 지원하지 않습니다.');
    return;
  }
  if (Notification.permission === 'granted') {
    showPartyToast('🔔 알림 활성화 완료', '이미 브라우저 데스크톱 알림이 허용되어 있습니다.');
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      showPartyToast('✅ 알림 허용 완료', '백그라운드에서도 파티 충원 및 레이드 출발 알람을 팝업으로 수신합니다.');
      sendDesktopNotification('테일즈위버 파티 알림 활성화', '파티 충원 및 레이드 출발 알람이 데스크톱 팝업으로 전달됩니다.');
    } else {
      showPartyToast('⚠️ 알림 권한 거부됨', '브라우저 주소창 설정에서 알림 권한을 허용해 주세요.');
    }
  });
}

function sendDesktopNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body: body,
        icon: 'favicon.ico',
        tag: 'tw-party-alert'
      });
    } catch (e) {
      console.warn('Desktop notification notice:', e);
    }
  }
  showPartyToast(title, body);
}

function showPartyToast(title, body, durationMs = 4500) {
  const toast = document.getElementById('party-toast');
  if (!toast) return;
  toast.innerHTML = `<div style="font-weight:700; color:#38bdf8; margin-bottom:3px;">${escapeHtml(title)}</div><div>${escapeHtml(body)}</div>`;
  toast.style.display = 'block';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.display = 'none';
  }, durationMs);
}

function dismissPartyInviteBanner() {
  const banner = document.getElementById('party-invite-banner');
  if (banner) banner.style.display = 'none';
}

function buildDefaultMembers(count) {
  const members = [];
  for (let i = 1; i <= count; i++) {
    const isLeader = i === 1;
    const defaultRole = isLeader ? '비호정령 (버퍼/서폿)' : DEFAULT_PARTY_ROLES[Math.min(i - 1, DEFAULT_PARTY_ROLES.length - 1)];
    members.push({
      id: i,
      name: isLeader ? '파티장 (본인)' : '',
      role: defaultRole,
      spec: isLeader ? '신조 5셋 / 마방 3800' : '',
      ready: isLeader
    });
  }
  return members;
}

let partyState = {
  dungeon: '이클립스 6보스 토벌',
  customTitle: '',
  departTime: '',
  maxMembers: 5,
  minSpec: '합인챈 350+ / 주력 속성 160+ / 마방 3500+',
  soundEnabled: true,
  members: buildDefaultMembers(5),
  webhookUrl: '',
  alarmsTriggered: {
    full: false,
    m10: false,
    m5: false,
    depart: false
  }
};

function savePartyState() {
  try {
    localStorage.setItem(PARTY_STORAGE_KEY, JSON.stringify(partyState));
  } catch (e) {
    console.error('Failed to save party state', e);
  }
}

function loadPartyState() {
  try {
    const raw = localStorage.getItem(PARTY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      partyState = Object.assign(partyState, parsed);
      if (!partyState.maxMembers || partyState.maxMembers < 1) partyState.maxMembers = 5;
      if (!Array.isArray(partyState.members) || partyState.members.length === 0) {
        partyState.members = buildDefaultMembers(partyState.maxMembers);
      }
    }
  } catch (e) {
    console.error('Failed to load party state', e);
  }
}

function initPartyHub() {
  loadPartyState();
  checkPartyHashImport();
  syncPartyInputsFromState();
  renderPartySlots();
  updatePartyProgressAndStatus();
  updatePartyCountdown();
}

function setPartyMaxMembers(num) {
  const cap = Math.max(1, Math.min(8, Number(num) || 5));
  partyState.maxMembers = cap;

  while (partyState.members.length < cap) {
    const nextId = partyState.members.length + 1;
    const defaultRole = DEFAULT_PARTY_ROLES[Math.min(nextId - 1, DEFAULT_PARTY_ROLES.length - 1)];
    partyState.members.push({
      id: nextId,
      name: '',
      role: defaultRole,
      spec: '',
      ready: false
    });
  }
  if (partyState.members.length > cap) {
    partyState.members = partyState.members.slice(0, cap);
  }

  savePartyState();
  syncPartyInputsFromState();
  renderPartySlots();
  updatePartyProgressAndStatus();
}

function adjustPartyMaxMembers(delta) {
  const cur = partyState.maxMembers || 5;
  setPartyMaxMembers(cur + delta);
}

function syncPartyInputsFromState() {
  const dSel = document.getElementById('party-dungeon-select');
  const cInp = document.getElementById('party-custom-title');
  const tInp = document.getElementById('party-depart-time');
  const mInp = document.getElementById('party-min-spec');
  const sChk = document.getElementById('party-sound-toggle');
  const wInp = document.getElementById('party-webhook-url');
  const capDisp = document.getElementById('party-capacity-display');
  const wStatus = document.getElementById('party-discord-status-badge');

  if (dSel) {
    dSel.value = partyState.dungeon || '이클립스 6보스 토벌';
    if (dSel.value === 'custom' || (!['이클립스 6보스 토벌', '심연의 어비스 5단 파티', '신조의 둥지 지옥 난이도', '오클리 방어전', '베스티지 보급품·별동대', '아페티리아 일반 파티', '시오칸하임 주간 파티'].includes(partyState.dungeon))) {
      dSel.value = 'custom';
      if (cInp) {
        cInp.style.display = 'block';
        cInp.value = partyState.customTitle || partyState.dungeon;
      }
    } else {
      if (cInp) cInp.style.display = 'none';
    }
  }

  if (capDisp) {
    capDisp.textContent = `${partyState.maxMembers}명`;
  }
  document.querySelectorAll('.party-capacity-btn[data-cap]').forEach(btn => {
    const capVal = Number(btn.dataset.cap);
    if (capVal === partyState.maxMembers) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (tInp && partyState.departTime) {
    tInp.value = partyState.departTime;
  }
  if (mInp && partyState.minSpec) {
    mInp.value = partyState.minSpec;
  }
  if (sChk && typeof partyState.soundEnabled === 'boolean') {
    sChk.checked = partyState.soundEnabled;
  }
  if (wInp && partyState.webhookUrl) {
    wInp.value = partyState.webhookUrl;
  }
  if (wStatus) {
    if (partyState.webhookUrl) {
      wStatus.innerHTML = '<span style="color:#34d399;">🟢 웹훅 연동 완료 (자동 알림 대기 중)</span>';
    } else {
      wStatus.innerHTML = '<span style="color:#94a3b8;">⚪ 미연동 (웹훅 URL 입력 필요)</span>';
    }
  }
}

function onPartyDungeonChange() {
  const dSel = document.getElementById('party-dungeon-select');
  const cInp = document.getElementById('party-custom-title');
  if (!dSel) return;
  if (dSel.value === 'custom') {
    if (cInp) {
      cInp.style.display = 'block';
      cInp.focus();
    }
    partyState.dungeon = cInp && cInp.value ? cInp.value : '커스텀 파티';
  } else {
    if (cInp) cInp.style.display = 'none';
    partyState.dungeon = dSel.value;
    if (DUNGEON_CAPACITY_MAP[dSel.value]) {
      setPartyMaxMembers(DUNGEON_CAPACITY_MAP[dSel.value]);
    }
  }
  savePartyState();
}

function onPartyTimeChange() {
  const tInp = document.getElementById('party-depart-time');
  if (tInp) {
    partyState.departTime = tInp.value;
    partyState.alarmsTriggered.m10 = false;
    partyState.alarmsTriggered.m5 = false;
    partyState.alarmsTriggered.depart = false;
    savePartyState();
    updatePartyCountdown();
  }
}

function setPartyTimeOffset(minutes) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const str = `${year}-${month}-${day}T${hours}:${mins}`;

  const tInp = document.getElementById('party-depart-time');
  if (tInp) {
    tInp.value = str;
    onPartyTimeChange();
  }
}

function setPartyTimePreset(hour, minute) {
  const now = new Date();
  now.setHours(hour, minute, 0, 0);
  if (now.getTime() < Date.now()) {
    now.setDate(now.getDate() + 1);
  }
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const str = `${year}-${month}-${day}T${hours}:${mins}`;

  const tInp = document.getElementById('party-depart-time');
  if (tInp) {
    tInp.value = str;
    onPartyTimeChange();
  }
}

function onPartyDataChange() {
  const cInp = document.getElementById('party-custom-title');
  const mInp = document.getElementById('party-min-spec');
  const sChk = document.getElementById('party-sound-toggle');
  const dSel = document.getElementById('party-dungeon-select');

  if (dSel && dSel.value === 'custom' && cInp) {
    partyState.customTitle = cInp.value;
    partyState.dungeon = cInp.value || '커스텀 파티';
  }
  if (mInp) partyState.minSpec = mInp.value;
  if (sChk) partyState.soundEnabled = sChk.checked;

  savePartyState();
}

function renderPartySlots() {
  const container = document.getElementById('party-slots-container');
  if (!container) return;

  container.innerHTML = partyState.members.map((m, idx) => {
    const isFilled = m.name && m.name.trim() !== '';
    const isReady = m.ready;
    const cardClass = `party-slot-card ${isFilled ? 'filled' : ''} ${isReady ? 'ready' : ''}`;
    const slotLabel = idx === 0 ? '👑 파티장' : `슬롯 ${idx + 1}`;

    const roleOptions = DEFAULT_PARTY_ROLES.map(r => {
      const selected = m.role === r ? 'selected' : '';
      return `<option value="${escapeHtml(r)}" ${selected}>${escapeHtml(r)}</option>`;
    }).join('');

    return `
      <div class="${cardClass}">
        <div class="party-slot-top">
          <span>${slotLabel}</span>
          <div style="display:flex; align-items:center; gap:6px;">
            <label style="display:flex; align-items:center; gap:3px; cursor:pointer; font-size:0.75rem; color:${isReady ? '#34d399' : '#94a3b8'};">
              <input type="checkbox" ${isReady ? 'checked' : ''} onchange="updatePartyMemberReady(${m.id}, this.checked)">
              <span>준비</span>
            </label>
            ${isFilled ? `<button type="button" style="background:none; border:none; color:#f87171; cursor:pointer; font-size:0.75rem; padding:0 2px;" onclick="vacatePartySlot(${m.id})" title="참가 취소">✕</button>` : ''}
          </div>
        </div>
        <div>
          <input type="text" class="party-slot-input" placeholder="캐릭터명 / 닉네임 입력" value="${escapeHtml(m.name || '')}" onchange="updatePartyMemberName(${m.id}, this.value)">
        </div>
        <div>
          <select class="party-slot-select" onchange="updatePartyMemberRole(${m.id}, this.value)">
            ${roleOptions}
          </select>
        </div>
        <div>
          <input type="text" class="party-slot-input" placeholder="스펙 / 메모 (선택)" value="${escapeHtml(m.spec || '')}" onchange="updatePartyMemberSpec(${m.id}, this.value)" style="font-size:0.75rem; color:#94a3b8;">
        </div>
        ${!isFilled ? `
        <div style="margin-top:2px;">
          <button type="button" class="party-join-btn" onclick="joinPartySlot(${m.id})">
            ✋ 내 캐릭터로 참가
          </button>
        </div>` : ''}
      </div>
    `;
  }).join('');
}

function updatePartyMemberName(id, val) {
  const member = partyState.members.find(m => m.id === id);
  if (member) {
    const prevCount = partyState.members.filter(m => m.name && m.name.trim() !== '').length;
    member.name = val.trim();
    savePartyState();
    updatePartyProgressAndStatus();
    renderPartySlots();

    const newCount = partyState.members.filter(m => m.name && m.name.trim() !== '').length;
    if (newCount === partyState.maxMembers && prevCount < partyState.maxMembers) {
      triggerPartyFullAlarm();
    }
  }
}

function updatePartyMemberRole(id, val) {
  const member = partyState.members.find(m => m.id === id);
  if (member) {
    member.role = val;
    savePartyState();
  }
}

function updatePartyMemberSpec(id, val) {
  const member = partyState.members.find(m => m.id === id);
  if (member) {
    member.spec = val.trim();
    savePartyState();
  }
}

function updatePartyMemberReady(id, val) {
  const member = partyState.members.find(m => m.id === id);
  if (member) {
    member.ready = !!val;
    savePartyState();
    renderPartySlots();
  }
}

function joinPartySlot(slotId) {
  const member = partyState.members.find(m => m.id === slotId);
  if (!member) return;

  const curProf = (typeof profiles !== 'undefined' && Array.isArray(profiles))
    ? (profiles.find(p => p.id === currentProfileId) || profiles[0])
    : null;
  const myName = (curProf && curProf.name) ? curProf.name : '모험가';
  const myArch = (typeof getCurrentArchetype === 'function') ? getCurrentArchetype() : null;

  member.name = myName;
  if (myArch) {
    if (myArch.id === 'magic_def') member.role = '비호정령 (버퍼/서폿)';
    else if (myArch.id === 'stab') member.role = '찌르기 딜러 (루시안/이스핀 등)';
    else if (myArch.id === 'hack') member.role = '베기 딜러 (보리스/막시민/나야 등)';
    else if (myArch.id === 'magic_atk') member.role = '마법공격 딜러 (티치엘/클로에/조슈아 등)';
    else if (myArch.id === 'composite') member.role = '물리복합 딜러 (시벨린/나야/막시민 등)';
  }
  member.ready = true;
  savePartyState();
  updatePartyProgressAndStatus();
  renderPartySlots();

  showPartyToast('🎉 파티 참가 완료', `[${myName}]님이 ${slotId}번 슬롯에 참가했습니다! '초대 링크 복사'를 눌러 파티원들에게 공유하세요.`);

  const filled = partyState.members.filter(m => m.name && m.name.trim() !== '').length;
  const total = partyState.maxMembers || partyState.members.length;

  if (partyState.webhookUrl) {
    sendDiscordWebhook('📢 새 파티원 참가 알림', `**${myName}**님이 **${member.role}**(으)로 파티에 참가했습니다!`, [
      { name: '🎯 던전', value: partyState.dungeon, inline: true },
      { name: '👥 현재 인원', value: `${filled} / ${total}명`, inline: true }
    ]);
  }

  if (filled === total) {
    triggerPartyFullAlarm();
  }
}

function vacatePartySlot(slotId) {
  const member = partyState.members.find(m => m.id === slotId);
  if (!member) return;
  const oldName = member.name || '해당 파티원';
  if (!confirm(`'${oldName}' 님의 참가를 취소하시겠습니까?`)) return;
  member.name = '';
  member.ready = false;
  savePartyState();
  updatePartyProgressAndStatus();
  renderPartySlots();
  showPartyToast('참가 취소', `${oldName} 님의 참가가 취소되었습니다.`);
}

function updatePartyProgressAndStatus() {
  const total = partyState.maxMembers || partyState.members.length;
  const filled = partyState.members.filter(m => m.name && m.name.trim() !== '').length;

  const ratioText = document.getElementById('party-ratio-text');
  if (ratioText) ratioText.textContent = `${filled} / ${total}`;

  const fillBar = document.getElementById('party-progress-fill');
  if (fillBar) fillBar.style.width = `${Math.min(100, Math.round((filled / total) * 100))}%`;

  const badge = document.getElementById('party-status-badge');
  if (badge) {
    if (filled === total) {
      badge.className = 'party-status-badge party-status-full';
      badge.innerHTML = `🟢 모집 완료 (${total}/${total} 풀파티)`;
    } else {
      badge.className = 'party-status-badge party-status-recruiting';
      badge.innerHTML = `🟡 모집 중 (${filled}/${total})`;
    }
  }
}

function triggerPartyFullAlarm() {
  if (partyState.alarmsTriggered.full) return;
  partyState.alarmsTriggered.full = true;
  savePartyState();

  playPartyFullChime();
  const partyTitle = partyState.dungeon || '테일즈위버 레이드';
  const total = partyState.maxMembers || partyState.members.length;
  const msg = `[${partyTitle}] 파티원 ${total}명 전원 충원이 완료되었습니다! 출발 준비를 시작하세요.`;
  sendDesktopNotification(`🎉 파티원 ${total}명 충원 완료!`, msg);

  if (partyState.webhookUrl) {
    sendDiscordWebhook(`🎉 파티원 ${total}명 충원 완료 알림`, `@everyone ${msg}`, [
      { name: '🎯 던전', value: partyState.dungeon, inline: true },
      { name: '⏰ 출발 예정', value: partyState.departTime ? partyState.departTime.replace('T', ' ') : '즉시 출발 대기', inline: true }
    ]);
  }
}

function updatePartyCountdown() {
  const disp = document.getElementById('party-countdown-display');
  if (!disp) return;

  if (!partyState.departTime) {
    disp.textContent = '출발 시간: 미설정';
    disp.style.color = '#94a3b8';
    return;
  }

  const target = new Date(partyState.departTime).getTime();
  if (isNaN(target)) {
    disp.textContent = '시간 형식 오류';
    return;
  }

  const now = Date.now();
  const diffSec = Math.floor((target - now) / 1000);

  if (diffSec > 0) {
    const hours = Math.floor(diffSec / 3600);
    const mins = Math.floor((diffSec % 3600) / 60);
    const secs = diffSec % 60;
    disp.textContent = `⏰ 출발 D-${hours > 0 ? hours + 'h ' : ''}${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
    disp.style.color = diffSec <= 300 ? '#f87171' : (diffSec <= 600 ? '#fcd34d' : '#38bdf8');

    if (diffSec <= 600 && diffSec > 540 && !partyState.alarmsTriggered.m10) {
      partyState.alarmsTriggered.m10 = true;
      savePartyState();
      playPartyWarningChime(10);
      sendDesktopNotification('⏰ 출발 10분 전 알림', `[${partyState.dungeon}] 출발까지 10분 남았습니다. 버프 및 소모품을 점검해 주세요!`);
    }

    if (diffSec <= 300 && diffSec > 240 && !partyState.alarmsTriggered.m5) {
      partyState.alarmsTriggered.m5 = true;
      savePartyState();
      playPartyWarningChime(5);
      sendDesktopNotification('⚠️ 출발 5분 전 최종 알림', `[${partyState.dungeon}] 출발 5분 전입니다! 집결지로 이동해 파티에 합류하세요.`);
    }
  } else {
    disp.textContent = '🚀 출발 시간 도달 (집결 완료)';
    disp.style.color = '#34d399';

    if (!partyState.alarmsTriggered.depart) {
      partyState.alarmsTriggered.depart = true;
      savePartyState();
      playPartyDepartureAlarm();
      const msg = `[${partyState.dungeon}] 약속된 출발 시간입니다! 던전으로 입장하세요.`;
      sendDesktopNotification('🚀 레이드 출발 시간입니다!', msg);
      if (partyState.webhookUrl) {
        sendDiscordWebhook('🚀 레이드 출발 정시 알림', msg, [
          { name: '🎯 콘텐츠', value: partyState.dungeon, inline: true }
        ]);
      }
    }
  }
}

function copyToClipboardFallback(text, title, msg) {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showPartyToast(title, msg);
    }).catch(() => {
      execFallbackCopy(text, title, msg);
    });
  } else {
    execFallbackCopy(text, title, msg);
  }
}

function execFallbackCopy(text, title, msg) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showPartyToast(title, msg);
  } catch (e) {
    showPartyToast('⚠️ 복사 실패', '수동으로 텍스트를 선택하여 복사해 주세요.');
  }
}

function safeBtoa(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    return encodeURIComponent(str);
  }
}

function safeAtob(str) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    return decodeURIComponent(str);
  }
}

function copyPartyRecruitmentText() {
  const dName = partyState.dungeon || '테일즈위버 숙제/레이드';
  const filled = partyState.members.filter(m => m.name && m.name.trim() !== '').length;
  const total = partyState.maxMembers || partyState.members.length;
  const timeStr = partyState.departTime ? partyState.departTime.replace('T', ' ') : '인원 모집 즉시 출발';

  const slotStatus = partyState.members.map((m, idx) => {
    const isFilled = m.name && m.name.trim() !== '';
    return `[${idx + 1}] ${m.role}: ${isFilled ? m.name : '모집 중'}`;
  }).join(' | ');

  const text = `[테일즈위버 파티 모집] ⚔️ ${dName} (${filled}/${total}명)\n⏰ 출발 시간: ${timeStr}\n📋 최소 스펙: ${partyState.minSpec || '자유 스펙'}\n👥 구성: ${slotStatus}\n※ 함께 하실 분 귓속말이나 댓글 주세요!`;

  copyToClipboardFallback(text, '📋 인게임 양식 복사 완료', '게임 내 확성기나 채팅창, 디스코드에 붙여넣기(Ctrl+V) 하세요.');
}

function copyPartyShareUrl() {
  try {
    const payload = {
      d: partyState.dungeon,
      t: partyState.departTime,
      s: partyState.minSpec,
      c: partyState.maxMembers,
      m: partyState.members.map(m => ({ i: m.id, n: m.name, r: m.role, s: m.spec, y: m.ready }))
    };
    const jsonStr = JSON.stringify(payload);
    const encoded = encodeURIComponent(safeBtoa(jsonStr));
    const origin = (window.location && window.location.origin) ? window.location.origin : '';
    const path = (window.location && window.location.pathname) ? window.location.pathname : '';
    const url = `${origin}${path}#party=${encoded}`;

    copyToClipboardFallback(url, '🔗 무서버 초대 링크 복사 완료', '이 링크를 파티원들에게 공유하면 별도 서버 없이도 동일한 파티 현황을 함께 확인하고 슬롯에 직접 참가할 수 있습니다.');
  } catch (e) {
    console.warn('Share URL error', e);
    showPartyToast('⚠️ 오류', '초대 링크를 생성하지 못했습니다.');
  }
}

function checkPartyHashImport() {
  try {
    const hash = (window.location && window.location.hash) ? window.location.hash : '';
    if (hash && hash.includes('party=')) {
      const match = hash.match(/party=([^&]+)/);
      if (match && match[1]) {
        const decodedStr = safeAtob(decodeURIComponent(match[1]));
        const data = JSON.parse(decodedStr);
        if (data && data.m) {
          partyState.dungeon = data.d || partyState.dungeon;
          partyState.departTime = data.t || partyState.departTime;
          partyState.minSpec = data.s || partyState.minSpec;
          partyState.maxMembers = data.c || data.m.length || 5;
          partyState.members = data.m.map(item => ({
            id: item.i,
            name: item.n || '',
            role: item.r || '',
            spec: item.s || '',
            ready: !!item.y
          }));
          savePartyState();

          const banner = document.getElementById('party-invite-banner');
          if (banner) banner.style.display = 'flex';

          showPartyToast('📥 공유받은 파티 정보 로드 완료', `[${partyState.dungeon}] 파티 설정이 실시간 동기화되었습니다. 빈 슬롯에 참가하세요.`);
        }
      }
    }
  } catch (e) {
    console.warn('Hash import error:', e);
  }
}

function togglePartyDiscordModal() {
  const panel = document.getElementById('party-discord-panel');
  if (!panel) return;
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function saveAndTestDiscordWebhook() {
  const inp = document.getElementById('party-webhook-url');
  if (!inp) return;
  const url = inp.value.trim();
  if (!url || !url.startsWith('https://discord.com/api/webhooks/')) {
    showPartyToast('⚠️ 유효하지 않은 웹훅', '올바른 디스코드 웹훅 URL (https://discord.com/api/webhooks/...)을 입력하세요.');
    return;
  }
  partyState.webhookUrl = url;
  savePartyState();
  syncPartyInputsFromState();

  sendDiscordWebhook('테스트 알림: 테일즈위버 파티 센터', '디스코드 웹훅 연동이 성공적으로 활성화되었습니다! 파티원 충원 및 출발 시간에 알람이 자동 발송됩니다.', [
    { name: '상태', value: '정상 작동 중', inline: true }
  ]);
  showPartyToast('✅ 웹훅 저장 및 테스트 완료', '디스코드 채널로 테스트 알림 메시지를 전송했습니다.');
}

function broadcastPartyToDiscord() {
  if (!partyState.webhookUrl) {
    togglePartyDiscordModal();
    showPartyToast('⚠️ 디스코드 웹훅 필요', '웹훅 URL을 입력하고 저장해 주세요.');
    const inp = document.getElementById('party-webhook-url');
    if (inp) inp.focus();
    return;
  }

  const dName = partyState.dungeon || '테일즈위버 숙제/레이드';
  const filled = partyState.members.filter(m => m.name && m.name.trim() !== '').length;
  const total = partyState.maxMembers || partyState.members.length;
  const timeStr = partyState.departTime ? partyState.departTime.replace('T', ' ') : '인원 모집 즉시 출발';

  const slotList = partyState.members.map((m, idx) => {
    const status = (m.name && m.name.trim()) ? `✅ ${m.name}` : `🟡 모집 중`;
    return `**[${idx + 1}] ${m.role}**: ${status}`;
  }).join('\n');

  const payload = {
    d: partyState.dungeon,
    t: partyState.departTime,
    s: partyState.minSpec,
    c: partyState.maxMembers,
    m: partyState.members.map(m => ({ i: m.id, n: m.name, r: m.role, s: m.spec, y: m.ready }))
  };
  const jsonStr = JSON.stringify(payload);
  const encoded = encodeURIComponent(safeBtoa(jsonStr));
  const origin = (window.location && window.location.origin) ? window.location.origin : '';
  const path = (window.location && window.location.pathname) ? window.location.pathname : '';
  const shareUrl = `${origin}${path}#party=${encoded}`;

  sendDiscordWebhook(
    `⚔️ [파티원 모집 공지] ${dName} (${filled}/${total}명)`,
    `**${partyState.minSpec || '자유 스펙'}**\n\n[👉 여기를 클릭해 실시간 파티 슬롯에 참가하기](${shareUrl})`,
    [
      { name: '⏰ 출발 예정 시간', value: timeStr, inline: true },
      { name: '👥 모집 현황', value: `${filled} / ${total}명`, inline: true },
      { name: '📋 포지션 슬롯 현황', value: slotList, inline: false }
    ]
  );

  showPartyToast('📢 디스코드 공지 발송 완료', '디스코드 채널로 파티 모집 안내 임베드가 성공적으로 전송되었습니다!');
}

function sendDiscordWebhook(title, description, fields) {
  if (!partyState.webhookUrl) return;
  const payload = {
    username: '테일즈위버 레이드 알리미',
    avatar_url: 'https://cdn-icons-png.flaticon.com/512/864/864685.png',
    embeds: [
      {
        title: title,
        description: description,
        color: 3722232,
        fields: fields || [],
        footer: {
          text: '테일즈위버 비호정령 가이드 · 무서버 알람 엔진'
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  fetch(partyState.webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(err => {
    console.warn('Discord webhook notice:', err);
  });
}

function resetPartyHub() {
  if (!confirm('현재 파티 모집 정보와 명단을 초기화하시겠습니까?')) return;
  partyState.dungeon = '이클립스 6보스 토벌';
  partyState.customTitle = '';
  partyState.departTime = '';
  partyState.maxMembers = 5;
  partyState.minSpec = '합인챈 350+ / 주력 속성 160+ / 마방 3500+';
  partyState.members = buildDefaultMembers(5);
  partyState.alarmsTriggered = { full: false, m10: false, m5: false, depart: false };
  savePartyState();
  syncPartyInputsFromState();
  renderPartySlots();
  updatePartyProgressAndStatus();
  updatePartyCountdown();
  showPartyToast('🔄 파티 초기화 완료', '새로운 파티를 모집할 준비가 완료되었습니다.');
}



// ==================== 12. GLOSSARY LOGIC ====================
let activeGlossaryCategory = 'all';
let glossarySearchQuery = '';

function renderGlossaryCards(filterCat, query) {
  if (filterCat !== undefined) activeGlossaryCategory = filterCat;
  if (query !== undefined) glossarySearchQuery = query;

  const container = document.getElementById('glossary-cards-container');
  if (!container) return;

  const q = (glossarySearchQuery || '').trim().toLowerCase();
  const cat = activeGlossaryCategory || 'all';

  const countAllEl = document.getElementById('glossary-count-all');
  if (countAllEl && typeof GLOSSARY_DATA !== 'undefined') {
    countAllEl.textContent = GLOSSARY_DATA.length;
  }

  if (typeof GLOSSARY_DATA === 'undefined' || !Array.isArray(GLOSSARY_DATA)) {
    container.innerHTML = '<div style="color:#94a3b8; padding:2rem; text-align:center;">용어 데이터를 불러오는 중입니다...</div>';
    return;
  }

  const filtered = GLOSSARY_DATA.filter(item => {
    const matchCat = (cat === 'all' || item.category === cat);
    if (!matchCat) return false;

    if (!q) return true;

    const inTerm = item.term.toLowerCase().includes(q);
    const inOfficial = (item.officialName || '').toLowerCase().includes(q);
    const inSummary = (item.summary || '').toLowerCase().includes(q);
    const inExample = (item.example || '').toLowerCase().includes(q);
    const inTags = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(q));

    return inTerm || inOfficial || inSummary || inExample || inTags;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:3rem 1rem; color:#94a3b8; background:rgba(15,23,42,0.6); border-radius:10px; border:1px dashed rgba(51,65,85,0.7);">
        <div style="font-size:1.6rem; margin-bottom:0.5rem;">🔍</div>
        <div style="font-size:1rem; font-weight:700; color:#cbd5e1; margin-bottom:0.3rem;">일치하는 테일즈위버 용어를 찾을 수 없습니다.</div>
        <div style="font-size:0.84rem; color:#64748b;">다른 검색어나 초성을 입력하시거나 상단 카테고리 칩을 변경해 보세요.</div>
      </div>
    `;
    return;
  }

  const categoryNames = {
    raid: '⚔️ 던전·레이드 약어',
    spec: '✨ 스펙·시스템 용어',
    equip: '🛡️ 장비·티어 약어',
    economy: '🧪 도핑·재화·경제',
    skill: '🧙 비호·전투 스킬',
    tips: '💡 실수 방지 꿀팁'
  };

  container.innerHTML = filtered.map(item => {
    const catLabel = categoryNames[item.category] || '기타';
    const tagHtml = Array.isArray(item.tags)
      ? item.tags.map(t => `<span class="glossary-tag-pill">#${escapeHtml(t)}</span>`).join('')
      : '';

    return `
      <div class="glossary-card">
        <div>
          <div class="glossary-card-top">
            <span class="glossary-term-badge">${escapeHtml(item.term)}</span>
            <span class="glossary-cat-badge">${escapeHtml(catLabel)}</span>
          </div>
          <div class="glossary-official-name">${escapeHtml(item.officialName)}</div>
          <div class="glossary-summary">${escapeHtml(item.summary)}</div>
          ${item.example ? `<div class="glossary-example-box">${escapeHtml(item.example)}</div>` : ''}
        </div>
        <div class="glossary-tags">${tagHtml}</div>
      </div>
    `;
  }).join('');
}

function handleGlossarySearch(val) {
  glossarySearchQuery = val;
  renderGlossaryCards(activeGlossaryCategory, glossarySearchQuery);
}

function filterGlossaryCategory(cat, btnEl) {
  activeGlossaryCategory = cat;
  const chips = document.querySelectorAll('#glossary-category-chips .glossary-chip');
  chips.forEach(c => c.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderGlossaryCards(activeGlossaryCategory, glossarySearchQuery);
}

function clearGlossarySearch() {
  glossarySearchQuery = '';
  const input = document.getElementById('glossary-search-input');
  if (input) input.value = '';
  renderGlossaryCards(activeGlossaryCategory, '');
}


// ==================== 13. CRAFTING & COMBINATION LOGIC ====================
function switchCraftSubTab(subId, btnEl) {
  document.querySelectorAll('.craft-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.craft-sub-btn').forEach(b => b.classList.remove('active'));

  const el = document.getElementById(subId);
  if (el) el.classList.add('active');
  if (btnEl) btnEl.classList.add('active');
}


// ==================== 14. WEEKLY TASK LOOT TRACKER LOGIC ====================
let weeklyLootData = {};

function getLootStorageKey() {
  return 'tw_weekly_loot_' + (typeof currentProfileId !== 'undefined' && currentProfileId ? currentProfileId : 'default');
}

function loadWeeklyLootData() {
  try {
    const raw = localStorage.getItem(getLootStorageKey());
    weeklyLootData = raw ? JSON.parse(raw) : {};
  } catch (e) {
    weeklyLootData = {};
  }
}

function saveWeeklyLootData() {
  try {
    localStorage.setItem(getLootStorageKey(), JSON.stringify(weeklyLootData));
  } catch (e) {}
  updateTotalLootSeed();
}

function initWeeklyTaskLootTracker() {
  loadWeeklyLootData();

  const taskItems = document.querySelectorAll('#tab-weekly .task-item');
  taskItems.forEach(item => {
    const chk = item.querySelector('.weekly-chk');
    if (!chk) return;
    const taskId = chk.dataset.id || chk.dataset.task;
    if (!taskId) return;

    const body = item.querySelector('.task-body');
    if (!body) return;

    if (body.querySelector('.task-loot-section')) return;

    const presets = (typeof LOOT_PRESETS !== 'undefined' && LOOT_PRESETS[taskId])
      ? LOOT_PRESETS[taskId]
      : (typeof LOOT_PRESETS !== 'undefined' && LOOT_PRESETS['default'] ? LOOT_PRESETS['default'] : []);

    const chipsHtml = presets.map(p => {
      const seedLabel = (p.defaultSeed >= 100000000)
        ? (p.defaultSeed / 100000000).toFixed(1) + '억'
        : (p.defaultSeed / 10000).toLocaleString() + '만';
      return `<button type="button" class="loot-preset-chip" onclick="addPresetLoot(event, '${taskId}', '${escapeHtml(p.name)}', ${p.defaultSeed})">+ ${escapeHtml(p.name)} (${seedLabel})</button>`;
    }).join('');

    const lootSection = document.createElement('div');
    lootSection.className = 'task-loot-section';
    lootSection.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem;">
        <button type="button" class="loot-toggle-btn" onclick="toggleTaskLootDrawer(event, '${taskId}')">
          🎁 득템 기록하기 ▾
        </button>
        <span id="loot-task-sum-${taskId}" style="font-size:0.75rem; font-weight:700; color:#34d399;"></span>
      </div>

      <!-- Loot Badges List -->
      <div class="loot-badges-container" id="loot-badges-${taskId}"></div>

      <!-- Expandable Loot Input Drawer -->
      <div class="loot-drawer" id="loot-drawer-${taskId}" onclick="event.stopPropagation()">
        <div style="font-size:0.75rem; font-weight:700; color:#a7f3d0; margin-bottom:0.35rem;">
          ✨ 대표 드랍템 1클릭 추가:
        </div>
        <div class="loot-chips-wrap">
          ${chipsHtml}
        </div>
        <div class="loot-custom-row">
          <input type="text" id="loot-custom-name-${taskId}" class="loot-input-name" placeholder="직접 아이템명 입력 (예: 희귀 완제)" onclick="event.stopPropagation()">
          <input type="number" id="loot-custom-seed-${taskId}" class="loot-input-seed" placeholder="만 Seed 단위 (예: 5000)" onclick="event.stopPropagation()">
          <button type="button" class="loot-add-btn" onclick="addCustomLoot(event, '${taskId}')">➕ 기록</button>
        </div>
      </div>
    `;

    body.appendChild(lootSection);
    renderTaskLootBadges(taskId);
  });

  updateTotalLootSeed();
}

function toggleTaskLootDrawer(e, taskId) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  const drawer = document.getElementById(`loot-drawer-${taskId}`);
  if (!drawer) return;
  drawer.classList.toggle('open');
}

function addPresetLoot(e, taskId, name, seed) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  if (!weeklyLootData[taskId]) weeklyLootData[taskId] = [];
  weeklyLootData[taskId].push({
    id: Date.now() + Math.random(),
    name: name,
    seed: Number(seed) || 0
  });
  saveWeeklyLootData();
  renderTaskLootBadges(taskId);
}

function addCustomLoot(e, taskId) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  const nameInput = document.getElementById(`loot-custom-name-${taskId}`);
  const seedInput = document.getElementById(`loot-custom-seed-${taskId}`);
  if (!nameInput) return;

  const name = nameInput.value.trim();
  if (!name) {
    alert('아이템명을 입력해 주세요.');
    return;
  }
  const seedValMan = Number(seedInput ? seedInput.value : 0) || 0;
  const seed = seedValMan * 10000;

  if (!weeklyLootData[taskId]) weeklyLootData[taskId] = [];
  weeklyLootData[taskId].push({
    id: Date.now() + Math.random(),
    name: name,
    seed: seed
  });

  nameInput.value = '';
  if (seedInput) seedInput.value = '';

  saveWeeklyLootData();
  renderTaskLootBadges(taskId);
}

function deleteLootItem(e, taskId, lootId) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  if (!weeklyLootData[taskId]) return;
  weeklyLootData[taskId] = weeklyLootData[taskId].filter(x => x.id !== lootId);
  saveWeeklyLootData();
  renderTaskLootBadges(taskId);
}

function renderTaskLootBadges(taskId) {
  const container = document.getElementById(`loot-badges-${taskId}`);
  const sumEl = document.getElementById(`loot-task-sum-${taskId}`);
  if (!container) return;

  const items = weeklyLootData[taskId] || [];
  if (items.length === 0) {
    container.innerHTML = '';
    if (sumEl) sumEl.textContent = '';
    return;
  }

  let taskTotalSeed = 0;
  container.innerHTML = items.map(item => {
    taskTotalSeed += Number(item.seed) || 0;
    const seedText = (item.seed >= 100000000)
      ? (item.seed / 100000000).toFixed(2) + '억'
      : (item.seed / 10000).toLocaleString() + '만';

    return `
      <span class="loot-item-badge">
        🏷️ ${escapeHtml(item.name)} (+${seedText})
        <span class="loot-item-del" onclick="deleteLootItem(event, '${taskId}', ${item.id})" title="삭제">✕</span>
      </span>
    `;
  }).join('');

  if (sumEl) {
    sumEl.textContent = `득템합: +${(taskTotalSeed / 100000000).toFixed(2)}억 Seed`;
  }
}

function renderAllTaskLootBadges() {
  const taskItems = document.querySelectorAll('#tab-weekly .task-item');
  taskItems.forEach(item => {
    const chk = item.querySelector('.weekly-chk');
    if (!chk) return;
    const taskId = chk.dataset.id || chk.dataset.task;
    if (taskId) renderTaskLootBadges(taskId);
  });
}

function updateTotalLootSeed(earnedGuaranteedSeed) {
  let totalLoot = 0;
  let totalCount = 0;

  Object.values(weeklyLootData).forEach(list => {
    if (Array.isArray(list)) {
      list.forEach(item => {
        totalLoot += Number(item.seed) || 0;
        totalCount++;
      });
    }
  });

  const lootTotalEl = document.getElementById('weekly-total-loot-seed');
  if (lootTotalEl) {
    lootTotalEl.textContent = `+${(totalLoot / 100000000).toFixed(2)}억 Seed`;
  }

  const countEl = document.getElementById('weekly-loot-count');
  if (countEl) {
    countEl.textContent = `${totalCount}건`;
  }

  if (typeof earnedGuaranteedSeed !== 'number') {
    let earned = 0;
    document.querySelectorAll('.weekly-chk').forEach(chk => {
      if (chk.checked) earned += Number(chk.dataset.seed) || 0;
    });
    earnedGuaranteedSeed = earned;
  }

  const combinedTotal = (Number(earnedGuaranteedSeed) || 0) + totalLoot;
  const combinedEl = document.getElementById('weekly-combined-total-seed');
  if (combinedEl) {
    combinedEl.textContent = `${(combinedTotal / 100000000).toFixed(2)}억 Seed`;
  }
}


// ==================== 15. RUNE COLLECTION & GATHERING TRACKER LOGIC ====================
const RUNE_COLLECTION_STORAGE_KEY = 'tw_rune_collection_v1';
let runeCollectionState = {};

function loadRuneCollectionState() {
  try {
    const raw = localStorage.getItem(RUNE_COLLECTION_STORAGE_KEY);
    runeCollectionState = raw ? JSON.parse(raw) : {};
  } catch (e) {
    runeCollectionState = {};
  }
}

function saveRuneCollectionState() {
  try {
    localStorage.setItem(RUNE_COLLECTION_STORAGE_KEY, JSON.stringify(runeCollectionState));
  } catch (e) {}
}

function toggleRuneCollectionItem(itemId, isChecked) {
  if (isChecked) {
    runeCollectionState[itemId] = true;
  } else {
    delete runeCollectionState[itemId];
  }
  saveRuneCollectionState();
  updateRuneCollectionCardUI(itemId, isChecked);
  updateRuneCollectionProgress();
}

function updateRuneCollectionCardUI(itemId, isChecked) {
  const card = document.getElementById(`rune-card-${itemId}`);
  if (card) {
    if (isChecked) {
      card.classList.add('checked');
    } else {
      card.classList.remove('checked');
    }
  }
  const chk = document.getElementById(`rune-chk-${itemId}`);
  if (chk && chk.checked !== isChecked) {
    chk.checked = isChecked;
  }
}

function setAllRuneCollection(isChecked) {
  if (typeof RUNE_COLLECTION_DATA === 'undefined' || !RUNE_COLLECTION_DATA) return;
  const allItems = [...RUNE_COLLECTION_DATA.brooms, ...RUNE_COLLECTION_DATA.wings];
  allItems.forEach(item => {
    if (isChecked) {
      runeCollectionState[item.id] = true;
    } else {
      delete runeCollectionState[item.id];
    }
    updateRuneCollectionCardUI(item.id, isChecked);
  });
  saveRuneCollectionState();
  updateRuneCollectionProgress();
}

function updateRuneCollectionProgress() {
  if (typeof RUNE_COLLECTION_DATA === 'undefined' || !RUNE_COLLECTION_DATA) return;
  const totalItems = RUNE_COLLECTION_DATA.brooms.length + RUNE_COLLECTION_DATA.wings.length;
  let collectedCount = 0;

  const allItems = [...RUNE_COLLECTION_DATA.brooms, ...RUNE_COLLECTION_DATA.wings];
  allItems.forEach(item => {
    if (runeCollectionState[item.id]) {
      collectedCount++;
    }
  });

  const percent = totalItems > 0 ? Math.round((collectedCount / totalItems) * 100) : 0;

  const countEl = document.getElementById('rune-progress-count');
  if (countEl) countEl.textContent = `${collectedCount} / ${totalItems}`;

  const percentEl = document.getElementById('rune-progress-percent');
  if (percentEl) percentEl.textContent = `${percent}%`;

  const barEl = document.getElementById('rune-progress-bar-fill');
  if (barEl) barEl.style.width = `${percent}%`;

  const badgeEl = document.getElementById('rune-progress-status-badge');
  if (badgeEl) {
    if (percent === 100) {
      badgeEl.className = 'rune-status-badge complete';
      badgeEl.textContent = '🎉 16종 전종 수집 완료! 룬 스킬포인트 최대 획득';
    } else if (percent > 0) {
      badgeEl.className = 'rune-status-badge progress';
      badgeEl.textContent = `⚡ ${collectedCount}종 등록 완료 (${percent}%) - 진행 중`;
    } else {
      badgeEl.className = 'rune-status-badge empty';
      badgeEl.textContent = '⏳ 아직 등록된 아이템이 없습니다. 파밍을 시작해보세요!';
    }
  }
}

function renderRuneCollectionCards() {
  if (typeof RUNE_COLLECTION_DATA === 'undefined' || !RUNE_COLLECTION_DATA) return;

  const broomsContainer = document.getElementById('rune-brooms-list');
  if (broomsContainer) {
    broomsContainer.innerHTML = RUNE_COLLECTION_DATA.brooms.map(item => {
      const isChecked = !!runeCollectionState[item.id];
      return `
        <div id="rune-card-${item.id}" class="rune-item-card ${isChecked ? 'checked' : ''}">
          <div class="rune-item-top">
            <label class="rune-chk-label">
              <input type="checkbox" id="rune-chk-${item.id}" ${isChecked ? 'checked' : ''} onchange="toggleRuneCollectionItem('${item.id}', this.checked)">
              <span class="rune-item-icon">🧹</span>
              <span class="rune-item-name">${item.name}</span>
            </label>
            <span class="rune-loc-badge">📍 ${item.location}</span>
          </div>
          <div class="rune-item-desc">
            <span class="rune-mob-tag">👾 ${item.mobType}</span>
            <span class="rune-tip-text">${item.tip}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  const wingsContainer = document.getElementById('rune-wings-list');
  if (wingsContainer) {
    wingsContainer.innerHTML = RUNE_COLLECTION_DATA.wings.map(item => {
      const isChecked = !!runeCollectionState[item.id];
      return `
        <div id="rune-card-${item.id}" class="rune-item-card ${isChecked ? 'checked' : ''}">
          <div class="rune-item-top">
            <label class="rune-chk-label">
              <input type="checkbox" id="rune-chk-${item.id}" ${isChecked ? 'checked' : ''} onchange="toggleRuneCollectionItem('${item.id}', this.checked)">
              <span class="rune-item-icon">🪽</span>
              <span class="rune-item-name">${item.name}</span>
            </label>
            <span class="rune-loc-badge wing">📍 ${item.location}</span>
          </div>
          <div class="rune-item-desc">
            <span class="rune-mob-tag wing">🎁 ${item.mobType}</span>
            <span class="rune-tip-text">${item.tip}</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

function initRuneCollectionTracker() {
  loadRuneCollectionState();
  renderRuneCollectionCards();
  updateRuneCollectionProgress();
}

function jumpToRuneCollection() {
  const craftTabBtn = document.querySelector('.tab-btn[data-tab="tab-craft"]');
  if (craftTabBtn) switchTab('tab-craft', craftTabBtn);

  const runeSubBtn = document.querySelector('.craft-sub-btn[onclick*="craft-rune-book"]');
  if (runeSubBtn) switchCraftSubTab('craft-rune-book', runeSubBtn);

  const targetEl = document.getElementById('craft-rune-book');
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ==================== 17. ENCRYPT PROBABILITY CALCULATOR LOGIC (인벤 1120) ====================
function initEncryptCalculator() {
  const scrollSelect = document.getElementById('encrypt-scroll-select');
  const protectRange = document.getElementById('encrypt-protect-range');
  const protectNum = document.getElementById('encrypt-protect-num');
  const vianuStepSelect = document.getElementById('encrypt-vianu-step');

  if (!scrollSelect) return;

  scrollSelect.addEventListener('change', onEncryptScrollChange);

  if (protectRange && protectNum) {
    protectRange.addEventListener('input', function() {
      protectNum.value = this.value;
      updateEncryptCalculator();
    });
    protectNum.addEventListener('input', function() {
      let val = parseInt(this.value) || 0;
      const max = parseInt(protectRange.max) || 60;
      if (val < 0) val = 0;
      if (val > max) val = max;
      this.value = val;
      protectRange.value = val;
      updateEncryptCalculator();
    });
  }

  if (vianuStepSelect) {
    vianuStepSelect.addEventListener('change', updateEncryptCalculator);
  }

  onEncryptScrollChange();
}

function onEncryptScrollChange() {
  const scrollSelect = document.getElementById('encrypt-scroll-select');
  if (!scrollSelect) return;
  const scrollType = scrollSelect.value;
  const protectControls = document.getElementById('encrypt-protect-controls');
  const vianuControls = document.getElementById('encrypt-vianu-controls');
  const protectRange = document.getElementById('encrypt-protect-range');
  const protectNum = document.getElementById('encrypt-protect-num');
  const maxLabel = document.getElementById('encrypt-protect-max-label');
  const descEl = document.getElementById('encrypt-scroll-desc');

  let maxProtects = 30;
  let descText = '';

  if (scrollType === 'vianu') {
    if (protectControls) protectControls.style.display = 'none';
    if (vianuControls) vianuControls.style.display = 'block';
    descText = '🛡️ 비아누의 인크립트는 실패해도 장비가 절대 파괴되지 않는 노파괴 스크롤입니다! (파괴 확률 0%)';
  } else {
    if (protectControls) protectControls.style.display = 'block';
    if (vianuControls) vianuControls.style.display = 'none';

    if (scrollType === 'royal') {
      maxProtects = 30;
      descText = '왕실 인크립트: 기본 성공률 36% (실패율 64%). 파괴 보호 주문서를 최대 30장까지 적용 가능합니다.';
    } else if (scrollType === 'blessed') {
      maxProtects = 40;
      descText = '축복받은 인크립트: 기본 성공률 31% (실패율 69%). 파괴 보호 주문서를 최대 40장까지 적용 가능합니다.';
    } else if (scrollType === 'divine') {
      maxProtects = 50;
      descText = '가호의 인크립트: 기본 성공률 26% (실패율 74%). 파괴 보호 주문서를 최대 50장까지 적용 가능합니다.';
    } else if (scrollType === 'lord') {
      maxProtects = 60;
      descText = '로드 인크립트: 기본 성공률 21% (실패율 79%). 파괴 보호 주문서를 최대 60장까지 적용 가능합니다.';
    }

    if (protectRange) {
      protectRange.max = maxProtects;
      if (parseInt(protectRange.value) > maxProtects) {
        protectRange.value = maxProtects;
      }
    }
    if (protectNum) {
      protectNum.max = maxProtects;
      if (parseInt(protectNum.value) > maxProtects) {
        protectNum.value = maxProtects;
      }
    }
    if (maxLabel) maxLabel.textContent = `(최대 ${maxProtects}장)`;
  }

  if (descEl) descEl.textContent = descText;
  updateEncryptCalculator();
}

function updateEncryptCalculator() {
  const scrollSelect = document.getElementById('encrypt-scroll-select');
  if (!scrollSelect) return;
  const scrollType = scrollSelect.value;

  const successEl = document.getElementById('encrypt-success-pct');
  const safefailEl = document.getElementById('encrypt-safefail-pct');
  const destroyEl = document.getElementById('encrypt-destroy-pct');
  const barSuccess = document.getElementById('encrypt-bar-success');
  const barSafefail = document.getElementById('encrypt-bar-safefail');
  const barDestroy = document.getElementById('encrypt-bar-destroy');
  const tipEl = document.getElementById('encrypt-calc-tip');

  let successRate = 0;
  let safeFailRate = 0;
  let destroyRate = 0;
  let tipText = '';

  if (scrollType === 'vianu') {
    const vianuRates = [80, 65, 50, 40, 30, 20, 15, 10, 5, 3];
    const stepSelect = document.getElementById('encrypt-vianu-step');
    const stepIdx = stepSelect ? parseInt(stepSelect.value) || 0 : 0;
    successRate = vianuRates[stepIdx] || 50;
    safeFailRate = 100 - successRate;
    destroyRate = 0;
    tipText = `비아누 주문서는 실패하더라도 장비가 파괴되지 않고 그대로 보존됩니다! (안전 실패: ${safeFailRate}%)`;
  } else {
    let baseRate = 36;
    let maxProtects = 30;
    if (scrollType === 'royal') { baseRate = 36; maxProtects = 30; }
    else if (scrollType === 'blessed') { baseRate = 31; maxProtects = 40; }
    else if (scrollType === 'divine') { baseRate = 26; maxProtects = 50; }
    else if (scrollType === 'lord') { baseRate = 21; maxProtects = 60; }

    const protectNum = document.getElementById('encrypt-protect-num');
    const protectCount = Math.min(maxProtects, Math.max(0, parseInt(protectNum ? protectNum.value : 0) || 0));

    successRate = baseRate;
    safeFailRate = protectCount;
    const baseFail = 100 - baseRate;
    destroyRate = Math.max(0, baseFail - protectCount);

    if (destroyRate === 0) {
      tipText = `파괴 보호 주문서가 완벽히 적용되어 실패 시 장비 파괴 위험이 0%입니다!`;
    } else {
      tipText = `주의: 실패 시 ${destroyRate}%의 확률로 장비가 영구 파괴됩니다. 보호 주문서를 최대(${maxProtects}장)로 채우는 것을 권장합니다.`;
    }
  }

  if (successEl) successEl.textContent = `${successRate}%`;
  if (safefailEl) safefailEl.textContent = `${safeFailRate}%`;
  if (destroyEl) destroyEl.textContent = `${destroyRate}%`;

  if (barSuccess) barSuccess.style.width = `${successRate}%`;
  if (barSafefail) barSafefail.style.width = `${safeFailRate}%`;
  if (barDestroy) barDestroy.style.width = `${destroyRate}%`;

  if (tipEl) tipEl.textContent = tipText;
}

// ==================== 25. PROGRESSION ROADMAP & UPGRADE RECOMMENDER ====================
// 출처: 디시인사이드 262032 (5각 아일단 이후 뭐해야해요? 실전 가이드)

function initRoadmapRecommender() {
  const ids = [
    'roadmap-sel-awk', 'roadmap-sel-gear', 'roadmap-sel-eta',
    'roadmap-sel-relic', 'roadmap-sel-abyss-core', 'roadmap-sel-merc-core',
    'roadmap-sel-ecl-core', 'roadmap-sel-cuff'
  ];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', updateRoadmapRecommendation);
    }
  });

  updateRoadmapRecommendation();
}

function updateRoadmapRecommendation() {
  const awkEl = document.getElementById('roadmap-sel-awk');
  const gearEl = document.getElementById('roadmap-sel-gear');
  const etaEl = document.getElementById('roadmap-sel-eta');
  const relicEl = document.getElementById('roadmap-sel-relic');
  const abyssCoreEl = document.getElementById('roadmap-sel-abyss-core');
  const mercCoreEl = document.getElementById('roadmap-sel-merc-core');
  const eclCoreEl = document.getElementById('roadmap-sel-ecl-core');
  const cuffEl = document.getElementById('roadmap-sel-cuff');

  if (!awkEl || !gearEl || !etaEl) return;

  const awk = awkEl.value; // '4' or '5'
  const gear = gearEl.value; // 'infernal', 'aquilus', 'abyss', 'eclipse_part', 'eclipse_full'
  const eta = parseInt(etaEl.value, 10) || 5;
  const relic = relicEl ? relicEl.value : 'under10_nodouble'; // 'none', 'under10_nodouble', 'under10_double', 'done10'
  const abyssCore = abyssCoreEl ? abyssCoreEl.value : 'no'; // 'no', 'yes'
  const mercCore = mercCoreEl ? mercCoreEl.value : 'no'; // 'no', 'yes'
  const eclCore = eclCoreEl ? eclCoreEl.value : 'none'; // 'none', 'step1', 'step2_4', 'step3', 'master'
  const cuff = cuffEl ? cuffEl.value : 'none'; // 'none', 'under140', 'cuff200'

  let prio1 = { title: "", badge: "", desc: "", tip: "", profit: "", cost: "" };
  let prio2 = { title: "", badge: "", desc: "", tip: "" };
  let prio3 = { title: "", badge: "", desc: "", tip: "" };
  let goldenTip = "";
  let weeklySeedGain = 0;
  let nextContent = "";

  // 1. Determine Priority 1 (최우선 과제)
  if (awk === '4') {
    prio1 = {
      badge: "🚨 최우선 필수",
      title: "⚡ 5차 각성 완료 (대미지 상한 200만 돌파 & 아일단 진입)",
      desc: "4차 각성 상태에서는 대미지 상한이 막혀 상위 던전 파티 참여와 코어 마스터 진행이 불가능합니다. 버닝 보상 및 개별 조합으로 5차 각성을 최우선 완료하세요.",
      tip: "심장 10종 및 조합 재료는 1개씩 개별 조합해야 조합 실패 시 재료 증발을 방지할 수 있습니다.",
      profit: "기본 공격력/마방 상한선 200만 대폭 돌파",
      cost: "재료 개별 조합"
    };
    prio2 = {
      badge: "2순위 권장",
      title: "어비스 8부위 풀세트(아일단) 장착",
      desc: "5차 각성 후 인퍼널/아퀼루스에서 어비스 세트로 전환하여 기초 방어력과 명중률을 확보하세요.",
      tip: "세트 효과로 인한 주스탯 상승량이 매우 큽니다."
    };
    prio3 = {
      badge: "3순위 목표",
      title: "에타의 의지 Lv.5 진입 & 기초 룬 연마",
      desc: "고체의·고방·연강 연마와 에타 5를 달성하여 1단계 기초 내실 체계를 준비하세요.",
      tip: "대장간 파밍으로 에타 5는 빠르게 달성 가능합니다."
    };
    goldenTip = "💡 5차 각성 재료 조합 시 절대로 10개를 한 번에 조합창에 올리지 마시고, 반드시 <b>1개씩 개별 조합</b>하세요!";
  } else if (gear === 'infernal' || gear === 'aquilus') {
    prio1 = {
      badge: "🛡️ 장비 최우선",
      title: "어비스 8부위 풀세트(아일단) 전환",
      desc: "현재 장비 티어로는 상위 코어마스터 던전과 주간 보스 파티 진입이 어렵습니다. 어비스 8세트(아일단)를 완성하여 기초 스펙을 완성하세요.",
      tip: "아퀼루스에서 어비스로의 승급 재료를 계산기 탭에서 확인하고 차근차근 맞추세요.",
      profit: "마방/명중/속성 급상승, 코어마스터 진입 가능",
      cost: "어비스 8부위 제작/구매"
    };
    prio2 = {
      badge: "2순위 권장",
      title: "고대 렐릭의 성소 10단 더블리워드 가동",
      desc: "성소는 매주 시간이 걸리는 장기 내실이므로 지금 즉시 더블리워드를 켜고 시작해야 합니다.",
      tip: "더블리워드 미사용 시 1년이 소요됩니다."
    };
    prio3 = {
      badge: "3순위 목표",
      title: "머코마 & 어코마 2주 파밍 준비",
      desc: "어비스 세트 완료 즉시 코어마스터 던전을 돌아 주간 13억 확정 시드를 확보하세요.",
      tip: "TP 입장권으로 주 14회 집중 파밍합니다."
    };
    goldenTip = "💡 어비스 장비 직작 시 [Tab 7 시드·재료 계산기]를 활용하면 현재 보유 재료를 뺀 순수 부족 시드만 실시간 계산할 수 있습니다!";
  } else if (relic === 'none' || relic === 'under10_nodouble') {
    prio1 = {
      badge: "⚠️ 기간 6개월 단축 필수",
      title: "☀️ 고대 렐릭의 성소: '더블 리워드 쿠폰(주간 4,200 TP)' 즉시 사용!",
      desc: "성소는 나중에 돈이 아무리 많아도 하루아침에 올릴 수 없는 절대적 시간 투자형 내실입니다. 더블리워드를 쓰지 않으면 10강까지 무려 1년이 걸립니다! 더블리워드를 쓰면 5~6개월로 절반 단축됩니다.",
      tip: "★ 경고: 나중에 스펙이 아무리 높아져도 렐릭 10강이 없으면 상위 성소 13단 진입이 불가능해져 발목을 잡힙니다. 다른 데 쓸 TP를 아껴서라도 무조건 4,200 TP는 성소에 고정 투자하세요!",
      profit: "성소 13단 진입 자격 획득 & 렐릭 올스탯 극대화",
      cost: "주간 4,200 TP (필수 고정 내실비)"
    };
    if (abyssCore === 'no') {
      prio2 = {
        badge: "2순위 확정수익",
        title: "👑 어비스 코어 마스터 (어코마) 2주 집중 파밍",
        desc: "코어마스터 던전 주 14회(500 TP x 14 = 7,000 TP)로 2주 만에 가루/결정을 모두 모을 수 있습니다.",
        tip: "강화는 패스 보상 엘소(주 60만)로 진행하세요."
      };
      weeklySeedGain += 700000000;
      nextContent = "어비스 코어마스터 던전";
    } else if (mercCore === 'no') {
      prio2 = {
        badge: "2순위 확정수익",
        title: "🔮 머큐리얼 코어 마스터 (머코마) 1주 파밍",
        desc: "명중/회피 부스탯 기준 7회(1,400 TP)로 단 1주일이면 가루와 결정이 모두 모여 완성됩니다.",
        tip: "주간 약 6억 시드와 경심/레심을 안정적으로 수급합니다."
      };
      weeklySeedGain += 600000000;
      nextContent = "머큐리얼 코어마스터 던전";
    } else {
      prio2 = {
        badge: "2순위 콘텐츠 해금",
        title: "⚡ 에타 10 & 이클립스 코어 120 (훈련소·오딘 해금)",
        desc: "에타 10과 이클코어 120을 달성하여 훈련소(주 2.45억+정수 17개)와 오딘(라피스)을 해금하세요.",
        tip: "코어진화권 2단계로 2진 4강에서 멈춰 최종뎀 1%를 챙기세요."
      };
      weeklySeedGain += 245000000;
      nextContent = "훈련소 & 오딘";
    }
    prio3 = {
      badge: "3순위 도약",
      title: "신규 채굴장(커프 200작) 진입 준비 (에타 20 + 3~4신기)",
      desc: "기초 내실 완료 후 모이는 시드로 이클립스 3~4신기를 준비하여 설계자의 채굴장(에타 20)에 진입하세요.",
      tip: "채굴장 컷 달성 시 토벌전도 4~5분대로 쾌속 주파됩니다."
    };
    goldenTip = "💡 <b>성소 더블리워드 쿠폰(주 4,200 TP)</b>은 선택이 아닌 필수입니다! 나중에 스펙이 올라도 렐릭 10강이 안 되어 성소 13단을 못 가는 모험가분들이 매우 많으니 꼭 미리 켜두세요.";
  } else if (abyssCore === 'no') {
    prio1 = {
      badge: "🪙 주 7억 확정 수익",
      title: "👑 어비스 코어 마스터 (어코마) 2주 집중 파밍",
      desc: "어코마는 2주면 완성이 가능합니다! 코어마스터 던전 주 14회(500 TP x 14 = 7,000 TP)를 2주간 돌면 가루와 결정이 100% 모입니다. 억까를 당하더라도 3주 차 1~2판이면 졸업합니다.",
      tip: "강화는 패스 보상 엘소(주 60만)로 진행하고, 급하면 시드를 사용하세요. 어헬보다 득템 체감률이 훨씬 우수합니다.",
      profit: "매주 확정 약 7억 Seed + 어비스 재료 득템 파이 확장",
      cost: "2주간 총 7,000 TP"
    };
    weeklySeedGain += 700000000;
    nextContent = "어비스 코어마스터 던전";
    if (mercCore === 'no') {
      prio2 = {
        badge: "2순위 확정수익",
        title: "🔮 머큐리얼 코어 마스터 (머코마) 1주 파밍",
        desc: "명중/회피 부스탯 기준 7회(1,400 TP)면 단 1주일 만에 가루/결정을 모아 매주 6억 시드를 추가 확보합니다.",
        tip: "어코마와 병행하여 3주 안에 주간 13억 확정 수익 체계를 완성하세요."
      };
    } else {
      prio2 = {
        badge: "2순위 콘텐츠 해금",
        title: "⚡ 에타 10 & 이클립스 코어 120 (훈련소·오딘 해금)",
        desc: "대장간 파밍으로 에타 10을 찍고, 이클코어 120을 달성하여 훈련소와 오딘을 열어주세요.",
        tip: "이클립스 코어진화권 2단계로 2진 4강(최종뎀 1%)을 맞추는 것이 핵심 가성비입니다."
      };
    }
    prio3 = {
      badge: "3순위 도약",
      title: "신규 채굴장(커프 200작) 진입 목표 (에타 20 + 3~4신기)",
      desc: "기초 내실로 모이는 주간 15억+ 시드를 모아 이클립스 3~4신기를 준비하세요.",
      tip: "채굴장 컷 도달 시 토벌전 클리어 타임이 4~5분대로 획기적으로 줄어듭니다."
    };
    goldenTip = "💡 어코마는 매주 약 <b>7억 시드의 확정 수익</b>을 안겨주므로, 어설프게 고가 장비를 사기 전에 가장 먼저 2주 투자로 끝내는 것이 최대 가성비입니다!";
  } else if (mercCore === 'no') {
    prio1 = {
      badge: "🪙 주 6억 확정 수익",
      title: "🔮 머큐리얼 코어 마스터 (머코마) 1주 파밍",
      desc: "머코마는 단 1주일이면 완성됩니다! 주 7회(200 TP x 7 = 1,400 TP)만 투자하면 명중/회피/민첩 부스탯 코어 가루와 결정이 모두 모입니다.",
      tip: "주간 약 6억 시드와 함께 고가의 경험의 심장(경심), 레어의 심장(레심)을 파밍할 수 있습니다.",
      profit: "매주 확정 약 6억 Seed + 경심/레심 득템",
      cost: "1주간 총 1,400 TP"
    };
    weeklySeedGain += 600000000;
    nextContent = "머큐리얼 코어마스터 던전";
    prio2 = {
      badge: "2순위 콘텐츠 해금",
      title: "⚡ 에타 10 & 이클립스 코어 120 (훈련소·오딘 해금)",
      desc: "대장간 파밍으로 에타 10을 달성하고, 이클코어 120을 맞춰 훈련소(주 2.45억+정수)와 오딘을 해금하세요.",
      tip: "코어진화권 2단계 사용 시 2진 4강에서 멈춰 최종뎀 1%를 챙기세요."
    };
    prio3 = {
      badge: "3순위 도약",
      title: "신규 채굴장(커프 200작) 진입 준비 (에타 20 + 3~4신기)",
      desc: "주간 시드 수익(어코마 7억 + 머코마 6억 = 주 13억+)으로 이클립스 3~4신기를 준비하세요.",
      tip: "채굴장 컷 달성 시 토벌전도 4~5분대로 쾌속 주파됩니다."
    };
    goldenTip = "💡 머코마는 단 1,400 TP로 1주 만에 졸업할 수 있는 최고 가성비 내실입니다. 빠르게 끝내고 매주 6억 시드를 챙기세요!";
  } else if (eta < 10 || eclCore === 'none' || eclCore === 'step1') {
    prio1 = {
      badge: "🔓 핵심 던전 해금",
      title: "⚡ 에타 Lv.10 & 이클립스 코어 Lv.120 (훈련소 & 오딘 해금)",
      desc: "에타 10을 빨리 찍어야 하는 결정적 이유는 <b>훈련소와 오딘</b>이 열리기 때문입니다! 훈련소는 주 7회 완주 시 경험치 50억, 정수 17개, <b>시드 2.45억</b>을 주며, 오딘은 고가의 라피스 득템 기회를 제공합니다.",
      tip: "★ 코어 120 가성비 공식: 1진 0강(가루) ➔ 2진 0강(진화권 1단계) ➔ <b>2진 4강(진화권 2단계)</b>에서 멈추기! 3진 0강으로 넘기지 말고 2진 4강에서 멈춰야 최종 피해량 +1%를 알뜰하게 챙길 수 있습니다.",
      profit: "훈련소 주 2.45억 Seed + 정수 17개 + 오딘 라피스 파이 오픈",
      cost: "대장간 에타 파밍 + 코어 진화권 1~2단계"
    };
    weeklySeedGain += 245000000;
    nextContent = "훈련소 & 오딘 보스전";
    prio2 = {
      badge: "2순위 상시 내실",
      title: "고대 렐릭의 성소 10단 더블리워드 상시 유지",
      desc: "매주 4,200 TP를 투자하여 렐릭 10단을 꾸준히 진행하세요.",
      tip: "펜던트 5~6개월, 브슬 5개월 완성을 목표로 합니다."
    };
    prio3 = {
      badge: "3순위 차기 목표",
      title: "이클립스 3신기 / 4신기 + 100효과 세팅 준비",
      desc: "훈련소와 코마던에서 모은 자금으로 이클 3~4신기를 구매하여 채굴장(에타 20) 입장 컷을 준비하세요.",
      tip: "마방캐는 4신기, 단일딜러는 3신기가 채굴장 입장 표준선입니다."
    };
    goldenTip = "💡 코어 진화권 2단계 사용 시 3진 0강을 누르지 마시고, <b>2진 4강</b> 상태를 유지하세요! 최종 피해량 1%를 공짜로 얻는 실전 꿀팁입니다.";
  } else if (gear === 'abyss') {
    prio1 = {
      badge: "💎 스펙업 핵심 도약",
      title: "이클립스 3신기 / 4신기 + 100효과 세팅",
      desc: "이제 4대 기초 내실이 탄탄하게 갖춰졌습니다! 다음 종결 내실인 <b>신규 채굴장(라이도 커프 200작)</b>에 입장하기 위해 이클립스 신기 장비를 맞출 차례입니다.",
      tip: "• 마방 캐릭터(비호 등): 이클 4신기 + 렐릭 8~9단 + 100효과 권장<br>• 단일 공격 캐릭터: 이클 3신기 + 렐릭 8~9단 + 100효과 권장",
      profit: "채굴장 입장 주스탯 확보 & 이클 토벌전 4~5분 쾌속 주파",
      cost: "주간 누적 시드로 신기 순차 장만"
    };
    prio2 = {
      badge: "2순위 레벨링",
      title: "에타의 의지 Lv.20 달성 (채굴장 입장 컷)",
      desc: "훈련소 주간 50억 경험치와 대장간 사냥으로 에타 20을 향해 꾸준히 레벨업하세요.",
      tip: "에타 20이 되어야 설계자의 채굴장 문이 열립니다."
    };
    prio3 = {
      badge: "3순위 심화 내실",
      title: "렐릭 10단 완성 후 성소 13단 진입 준비",
      desc: "더블리워드로 렐릭 10단을 채우면 즉시 성소 13단계로 도약합니다.",
      tip: "성소 13단은 상위 렐릭 스탯을 대폭 제공합니다."
    };
    goldenTip = "💡 이클립스 3~4신기를 착용하고 채굴장 입장 컷을 맞추면, 이클립스 6보스 토벌전이 <b>1판당 4~5분대</b>로 끝나 일일/주간 숙제 시간이 절반 이하로 줄어듭니다!";
  } else if (eta < 20) {
    prio1 = {
      badge: "⛏️ 채굴장 진입 임박",
      title: "에타의 의지 Lv.20 달성 ➔ 신규 채굴장(커프 200작) 진입!",
      desc: "장비 세팅(3~4신기)이 준비되었다면 에타 20을 찍고 <b>설계자의 채굴장</b>으로 진입하세요! 커프 140~200 종결 내실을 열어 캐릭터 스탯을 비약적으로 끌어올릴 수 있습니다.",
      tip: "훈련소 매주 7회 완주(경험치 50억)와 에타 경험치 버프를 활용하여 에타 20을 집중 돌파하세요.",
      profit: "신규 채굴장 오픈 & 라이도 커프 주스탯 200 종결 작업 개시",
      cost: "에타 레벨업 경험치 파밍"
    };
    nextContent = "설계자의 채굴장 (커프 200)";
    prio2 = {
      badge: "2순위 상시 내실",
      title: "고대 렐릭의 성소 10단 완성 (성소 13단 해금)",
      desc: "더블리워드를 꾸준히 유지하여 10강 졸업을 완료하세요.",
      tip: "10강 달성 즉시 성소 13단계 진입이 열립니다."
    };
    prio3 = {
      badge: "3순위 종결 도약",
      title: "이클립스 코어 마스터 (이클코마 4진화)",
      desc: "가루, 결정, 엘소를 모아 이클코어를 4진화 마스터 단계로 올리세요.",
      tip: "최상위 피해량 증가와 방어력을 완성합니다."
    };
    goldenTip = "💡 에타 20 달성 시 열리는 <b>신규 채굴장</b>은 라이도 커프 주스탯을 200까지 올려주는 현존 최고의 핵심 내실 던전입니다!";
  } else if (cuff !== 'cuff200') {
    prio1 = {
      badge: "💍 종결 커프 완성",
      title: "신규 채굴장 파밍 ➔ 라이도 커프 주스탯 200 종결 달성",
      desc: "채굴장(설계자의 채굴장) 일일 파밍을 통해 라이도 커프의 주스탯(마방캐: MR 200, 딜러: 주공격력 200)을 200 만수치로 졸업시키세요.",
      tip: "주스탯 200 완성 후 여유가 생기면 명중률(DEX)과 크리티컬 부스탯 작업으로 확장합니다.",
      profit: "단일 부위 주스탯 +200 확보로 엔드 보스 진입 스펙 완성",
      cost: "채굴장 조각 파밍"
    };
    prio2 = {
      badge: "2순위 코어 종결",
      title: "이클립스 코어 마스터 (이클코마 4진화 완성)",
      desc: "채굴장 파밍과 병행하여 이클립스 코어를 4진화 마스터까지 강화하세요.",
      tip: "가루, 결정, 엘소를 집중 투입합니다."
    };
    prio3 = {
      badge: "3순위 다캐릭 확장",
      title: "👥 부캐릭터 5각 육성 ➔ 이클코마던 투입 체제 가동",
      desc: "본캐가 안정권에 접어들면 5각 부캐를 키워 이클코마던에 투입, 매주 득템 파이를 복리로 증식시키세요.",
      tip: "다캐릭 체제가 완성되면 매주 수십억 시드가 안정적으로 축적됩니다."
    };
    goldenTip = "💡 커프 200작과 렐릭 10단이 제대로 갖춰지지 않으면 추후 최상위 던전(주화단/골고다) 진입 시 수백억 시드의 고가 장비나 고수치 효과를 강요받게 됩니다. 내실을 단단히 다지세요!";
  } else if (eclCore !== 'master') {
    prio1 = {
      badge: "👑 코어 최종 종결",
      title: "이클립스 코어 마스터 (4진화 코어 강화 완료)",
      desc: "가루, 결정, 모아둔 엘소를 집중 투입하여 이클립스 코어 마스터를 달성하세요! 최상위 던전에서의 생존력과 최종 딜량이 완성됩니다.",
      tip: "4진화부터는 진화권이 아닌 가루/결정/엘소로 강화하는 것이 정석입니다.",
      profit: "이클립스 코어 최종 피해량 및 생존율 종결",
      cost: "가루, 결정, 엘소/시드"
    };
    prio2 = {
      badge: "2순위 엔드 파밍",
      title: "성소 13단계 파밍 & 이클 한계작 1부위씩 업그레이드",
      desc: "성소 13단에서 상위 렐릭 스탯을 파밍하고, 남는 시드로 이클 한계작 부위나 라피스를 챙기세요.",
      tip: "세크리드 장비 맞춤 자금을 모으는 단계입니다."
    };
    prio3 = {
      badge: "3순위 다캐릭 복리",
      title: "👥 부캐릭터 5각 육성 ➔ 이클코마던 투입",
      desc: "본캐 종결 내실 완료 후 부캐릭을 늘려 주간 확정 수익을 2배, 3배로 증폭시키세요.",
      tip: "부캐 1개당 주간 수억~십수억 시드의 득템 파이가 추가됩니다."
    };
    goldenTip = "💡 본캐 이클코마가 완성되는 순간, 부캐릭터를 5각으로 올려 이클코마던에 투입하는 것이 장기적으로 가장 빠르고 거대한 시드 증식 공식입니다!";
  } else {
    prio1 = {
      badge: "👑 엔드 모험가 명예",
      title: "👥 부캐릭터 5각 육성 & 이클코마던 다캐릭 배급 체제 구축",
      desc: "모험가님의 본캐릭터는 이미 [토벌전 쾌속 + 채굴장 커프 200 + 이클코마 종결] 체제를 완벽히 갖추셨습니다! 이제 부캐릭터를 5각으로 육성하여 이클코마던에 투입, 매주 득템 및 시드 파이를 복리로 극대화하세요.",
      tip: "남는 자금으로는 라피스 섭취, 이클 한계작 교체, 세크리드(Sacred) 장비 자금 축적, 최종 주화단 진입을 목표로 즐겁게 플레이하시면 됩니다.",
      profit: "부캐릭 1개당 주간 수억~십수억 시드 복리 증식",
      cost: "부캐 육성"
    };
    prio2 = {
      badge: "2순위 엔드 목표",
      title: "세크리드(Sacred) 장비 & 최상위 주화단 도전",
      desc: "현존 최상위 장비인 세크리드 세팅과 주화단 스펙업에 도전하세요.",
      tip: "에타 21+ 및 종결 스펙을 천천히 맞춰나갑니다."
    };
    prio3 = {
      badge: "3순위 커프 완벽 종결",
      title: "라이도 커프 명중률(DEX) & 크리티컬 200 풀작",
      desc: "주스탯에 이어 명중과 크리티컬까지 채굴장 조각으로 완벽히 마스터합니다.",
      tip: "올스탯 종결 커프를 완성합니다."
    };
    goldenTip = "💡 진정한 엔드 모험가 단계에 도달하셨습니다! 조급해하지 마시고 다캐릭 파밍과 함께 최종 콘텐츠를 여유롭게 즐기세요.";
  }

  // Render to DOM
  const outPrio1El = document.getElementById('roadmap-res-prio1');
  const outPrio2El = document.getElementById('roadmap-res-prio2');
  const outPrio3El = document.getElementById('roadmap-res-prio3');
  const outGainEl = document.getElementById('roadmap-res-gain');
  const outTipEl = document.getElementById('roadmap-res-goldentip');

  if (outPrio1El) {
    outPrio1El.innerHTML = `
      <div class="roadmap-prio-card prio1">
        <div class="roadmap-prio-header">
          <span class="roadmap-badge gold">${prio1.badge}</span>
          <h4 class="roadmap-prio-title">${prio1.title}</h4>
        </div>
        <div class="roadmap-prio-desc">${prio1.desc}</div>
        <div class="roadmap-prio-meta">
          ${prio1.profit ? `<span class="roadmap-meta-chip profit">🎁 기대 효과: <b>${prio1.profit}</b></span>` : ''}
          ${prio1.cost ? `<span class="roadmap-meta-chip cost">⏱️ 투자/비용: <b>${prio1.cost}</b></span>` : ''}
        </div>
        ${prio1.tip ? `<div class="roadmap-prio-tip">${prio1.tip}</div>` : ''}
      </div>
    `;
  }

  if (outPrio2El) {
    outPrio2El.innerHTML = `
      <div class="roadmap-prio-card prio2">
        <div class="roadmap-prio-header">
          <span class="roadmap-badge silver">${prio2.badge}</span>
          <h4 class="roadmap-prio-title">${prio2.title}</h4>
        </div>
        <div class="roadmap-prio-desc">${prio2.desc}</div>
        ${prio2.tip ? `<div class="roadmap-prio-tip">${prio2.tip}</div>` : ''}
      </div>
    `;
  }

  if (outPrio3El) {
    outPrio3El.innerHTML = `
      <div class="roadmap-prio-card prio3">
        <div class="roadmap-prio-header">
          <span class="roadmap-badge bronze">${prio3.badge}</span>
          <h4 class="roadmap-prio-title">${prio3.title}</h4>
        </div>
        <div class="roadmap-prio-desc">${prio3.desc}</div>
        ${prio3.tip ? `<div class="roadmap-prio-tip">${prio3.tip}</div>` : ''}
      </div>
    `;
  }

  if (outGainEl) {
    if (weeklySeedGain > 0 || nextContent) {
      outGainEl.style.display = 'block';
      let gainText = weeklySeedGain > 0 ? `+약 ${(weeklySeedGain / 100000000).toFixed(2)}억 Seed` : '';
      let contentText = nextContent ? `🔓 신규 해금: <b>${nextContent}</b>` : '';
      outGainEl.innerHTML = `
        <div class="roadmap-roi-banner">
          <span class="roi-icon">💰</span>
          <div>
            <div style="font-weight:800; font-size:0.95rem; color:#fde68a;">
              이 추천 과제를 달성하면 주간 확정 시드가 ${gainText} 증가합니다!
            </div>
            ${contentText ? `<div style="font-size:0.8rem; color:#cbd5e1; margin-top:2px;">${contentText}</div>` : ''}
          </div>
        </div>
      `;
    } else {
      outGainEl.style.display = 'none';
    }
  }

  if (outTipEl) {
    outTipEl.innerHTML = goldenTip || '';
  }
}

function applyRoadmapPreset(key) {
  const awkEl = document.getElementById('roadmap-sel-awk');
  const gearEl = document.getElementById('roadmap-sel-gear');
  const etaEl = document.getElementById('roadmap-sel-eta');
  const relicEl = document.getElementById('roadmap-sel-relic');
  const abyssCoreEl = document.getElementById('roadmap-sel-abyss-core');
  const mercCoreEl = document.getElementById('roadmap-sel-merc-core');
  const eclCoreEl = document.getElementById('roadmap-sel-ecl-core');
  const cuffEl = document.getElementById('roadmap-sel-cuff');

  if (!awkEl) return;

  if (key === 'fresh_5awk') {
    awkEl.value = '5';
    gearEl.value = 'abyss';
    etaEl.value = '5';
    if (relicEl) relicEl.value = 'under10_nodouble';
    if (abyssCoreEl) abyssCoreEl.value = 'no';
    if (mercCoreEl) mercCoreEl.value = 'no';
    if (eclCoreEl) eclCoreEl.value = 'none';
    if (cuffEl) cuffEl.value = 'none';
  } else if (key === 'mid_core') {
    awkEl.value = '5';
    gearEl.value = 'abyss';
    etaEl.value = '5';
    if (relicEl) relicEl.value = 'under10_double';
    if (abyssCoreEl) abyssCoreEl.value = 'yes';
    if (mercCoreEl) mercCoreEl.value = 'yes';
    if (eclCoreEl) eclCoreEl.value = 'step1';
    if (cuffEl) cuffEl.value = 'none';
  } else if (key === 'prep_mine') {
    awkEl.value = '5';
    gearEl.value = 'abyss';
    etaEl.value = '10';
    if (relicEl) relicEl.value = 'under10_double';
    if (abyssCoreEl) abyssCoreEl.value = 'yes';
    if (mercCoreEl) mercCoreEl.value = 'yes';
    if (eclCoreEl) eclCoreEl.value = 'step2_4';
    if (cuffEl) cuffEl.value = 'under140';
  } else if (key === 'end_game') {
    awkEl.value = '5';
    gearEl.value = 'eclipse_part';
    etaEl.value = '20';
    if (relicEl) relicEl.value = 'done10';
    if (abyssCoreEl) abyssCoreEl.value = 'yes';
    if (mercCoreEl) mercCoreEl.value = 'yes';
    if (eclCoreEl) eclCoreEl.value = 'master';
    if (cuffEl) cuffEl.value = 'cuff200';
  }

  updateRoadmapRecommendation();
}

function syncProfileToRoadmap() {
  const currentProfile = (typeof profiles !== 'undefined' && Array.isArray(profiles))
    ? profiles.find(p => p.id === currentProfileId)
    : null;
  if (!currentProfile) return;

  const etaEl = document.getElementById('roadmap-sel-eta');
  if (etaEl && currentProfile.stats && currentProfile.stats.eta) {
    const pEta = parseInt(currentProfile.stats.eta, 10);
    if (pEta >= 21) etaEl.value = '21';
    else if (pEta >= 20) etaEl.value = '20';
    else if (pEta >= 11) etaEl.value = '11';
    else if (pEta >= 10) etaEl.value = '10';
    else if (pEta >= 6) etaEl.value = '6';
    else if (pEta >= 5) etaEl.value = '5';
    else etaEl.value = '1';
  }

  updateRoadmapRecommendation();
}

// ==================== 26. EQUIPMENT UPGRADE COMPARATOR LOGIC ====================
let lastCalculatedCoeff = 45200;
let lastCalculatedDex = 1680;
let specupCompareMode = 'equip_window'; // 'equip_window', 'bundle', 'part', 'ranking'
let activeSlotKey = 'wings';
let activeQualityKey = 'standard';
let customStatBonus = { main: 130, dex: 50 };
let customEnhanceLevel = 10;
let customAbilityKey = 'superior';
let customRandomOpts = { dmg: 3, acc: 15, elem: 10 };

// In-Game Equip Window State Definitions
var TW_DEFAULT_EQUIP_STATE = (typeof window !== 'undefined' && window.TW_DEFAULT_EQUIP_STATE) || {
  head: { key: "head", label: "REAL HEAD", name: "어비스 헬름", tier: "abyss", enhance: 10, quality: "standard", ability: "superior", optDmg: 0, optAcc: 15, optElem: 10, dur: "(52/52)", isOn: true, stat: 80, dex: 20 },
  showHead: { key: "showHead", label: "SHOW HEAD", name: "별빛 요정 리본", tier: "avatar", dur: "(100/100)", isOn: true },
  armor: { key: "armor", label: "REAL ARMOR", name: "+10 예리한 아노마라드 로브", tier: "abyss", enhance: 10, quality: "standard", ability: "superior", optDmg: 0, optAcc: 15, optElem: 10, dur: "(84/84)", isOn: true, stat: 80, dex: 20 },
  showArmor: { key: "showArmor", label: "SHOW ARMOR", name: "리체 수영복 (화이트)", tier: "avatar", dur: "(100/100)", isOn: true },
  arms: { key: "arms", label: "REAL ARMS", name: "+10 어비스 아밍소드", tier: "abyss", enhance: 10, quality: "standard", ability: "superior", optDmg: 3, optAcc: 15, optElem: 10, dur: "(87/98)", isOn: true, stat: 240, dex: 40 },
  showArms: { key: "showArms", label: "SHOW ARMS", name: "빈 슬롯", tier: "empty", dur: "", isOn: false },
  subArms: { key: "subArms", label: "REAL SUB ARMS", name: "아퀼루스 펜듈럼", tier: "aquilus", enhance: 10, quality: "standard", ability: "superior", optDmg: 0, optAcc: 15, optElem: 10, dur: "(48/52)", isOn: true, stat: 50, dex: 20 },
  showSubArms: { key: "showSubArms", label: "SHOW SUB ARMS", name: "라이도 심볼릭 커프 (140)", tier: "gold", dur: "(100/100)", isOn: true, stat: 140, dex: 35 },
  face: { key: "face", label: "REAL FACE", name: "어비스 아뮬렛", tier: "abyss", enhance: 10, quality: "standard", ability: "superior", optDmg: 0, optAcc: 15, optElem: 10, dur: "(30/30)", isOn: true, stat: 80, dex: 20 },
  showFace: { key: "showFace", label: "SHOW FACE", name: "테트라의 넥타이", tier: "avatar", dur: "(100/100)", isOn: true },
  back: { key: "back", label: "REAL BACK", name: "어비스 윙", tier: "abyss", enhance: 10, quality: "standard", ability: "superior", optDmg: 0, optAcc: 15, optElem: 10, dur: "(48/48)", isOn: false, stat: 80, dex: 20 },
  showBack: { key: "showBack", label: "SHOW BACK", name: "별빛 유리 날개", tier: "avatar", dur: "(100/100)", isOn: false },
  hand: { key: "hand", label: "HAND", name: "어비스 건틀렛", tier: "abyss", enhance: 10, quality: "standard", ability: "superior", optDmg: 0, optAcc: 15, optElem: 10, dur: "(48/48)", isOn: true, stat: 80, dex: 20 },
  foot: { key: "foot", label: "REAL FOOT", name: "어비스 부츠", tier: "abyss", enhance: 10, quality: "standard", ability: "superior", optDmg: 0, optAcc: 15, optElem: 10, dur: "(52/52)", isOn: true, stat: 80, dex: 20 },
  showFoot: { key: "showFoot", label: "SHOW FOOT", name: "밀키웨이 발자국", tier: "avatar", dur: "(100/100)", isOn: true },
  effect: { key: "effect", label: "REAL EFFECT", name: "[넥슨30주년] 빛나는 효과 (60마방)", tier: "gold", dur: "(55/55)", isOn: true, stat: 60, dex: 35 },
  showEffect: { key: "showEffect", label: "SHOW EFFECT", name: "시오칸하임 마법진", tier: "avatar", dur: "(100/100)", isOn: true },
  artifact: { key: "artifact", label: "ARTIFACT", name: "아크론의 참력 - 디바인", tier: "purple", dur: "(40/40)", isOn: true, stat: 75, dex: 25 },
  relicRight: { key: "relicRight", label: "RELIC (RIGHT)", name: "신조의 펜던트 (+4)", tier: "relic", dur: "(100/100)", isOn: true, stat: 40, dex: 20 },
  relicLeft: { key: "relicLeft", label: "RELIC (LEFT)", name: "태양의 브레이슬릿 (+4)", tier: "relic", dur: "(100/100)", isOn: true, stat: 40, dex: 20 },
  vehicle: { key: "vehicle", label: "VEHICLE", name: "빈 슬롯 (탈것 미착용)", tier: "empty", dur: "", isOn: false }
};

const TW_CHARACTER_ROSTER = [
  { key: 'boris', name: '보리스', fullName: '보리스 진네만', icon: '🗡️', type: '물리복합 / 베기', sub: '월하의 검사', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_boris.png' },
  { key: 'lucian', name: '루시안', fullName: '루시안 칼츠', icon: '⚔️', type: '물리 찌르기', sub: '쾌활한 모험가', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_lucian.png' },
  { key: 'roamini', name: '로아미니', fullName: '로아미니', icon: '📿', type: '마법방어형 (MR)', sub: '기억을 잃은 주술사', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_roamini.png' },
  { key: 'clarice', name: '리체', fullName: '리체 아브릴', icon: '🧵', type: '마법방어형 (MR)', sub: '바느질하는 재봉사', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_clarice.png' },
  { key: 'tichiel', name: '티치엘', fullName: '티치엘 쥬스피앙', icon: '🪄', type: '마법방어 / 백마법', sub: '순수한 마법소녀', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_tichiel.png' },
  { key: 'mila', name: '밀라', fullName: '밀라 네브리스', icon: '🪓', type: '물리 베기', sub: '붉은 사수 해적선장', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_mila.png' },
  { key: 'ispin', name: '이스핀', fullName: '이스핀 샤를', icon: '🤺', type: '물리 찌르기', sub: '비운의 왕녀', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_ispin.png' },
  { key: 'maximin', name: '막시민', fullName: '막시민 리프크네', icon: '🗡️', type: '마법베기 (INT+HACK)', sub: '시니컬한 탐정', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_maximin.png' },
  { key: 'sivelin', name: '시벨린', fullName: '시벨린 우', icon: '🔱', type: '물리 찌르기 / 복합', sub: '진홍의 사신', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_sivelin.png' },
  { key: 'nayatrei', name: '나야트레이', fullName: '나야트레이', icon: '🗡️', type: '물리 찌르기 / 복합', sub: '묘족의 마지막 생존자', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_nayatrei.png' },
  { key: 'josua', name: '조슈아', fullName: '조슈아 폰 아르님', icon: '🔮', type: '마법공격 (INT)', sub: '아르님 가문의 소공작', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_josua.png' },
  { key: 'lanziee', name: '란지에', fullName: '란지에 로젠크란츠', icon: '🔫', type: '마법총 / 물리총', sub: '냉철한 혁명가', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_lanziee.png' },
  { key: 'issac', name: '이자크', fullName: '이자크 듀카스텔', icon: '🥊', type: '물리 찌르기 / 베기', sub: '하이아칸의 의적', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_issac.png' },
  { key: 'anais', name: '아나이스', fullName: '아나이스 델 카릴', icon: '🧸', type: '마법방어 (소환수)', sub: '이중인격 마도사', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_anais.png' },
  { key: 'benya', name: '벤야', fullName: '벤야', icon: '👻', type: '마법방어 / 마법베기', sub: '영혼의 유령소녀', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_benya.png' },
  { key: 'isolet', name: '이솔렛', fullName: '이솔렛', icon: '🗡️', type: '물리/마법 찬트', sub: '달의 섬 신녀', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_isolet.png' },
  { key: 'nocturne', name: '녹턴', fullName: '녹턴 드 브릴랑', icon: '💥', type: '마법공격 (INT)', sub: '천재 기계공학자', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_nocturne.png' },
  { key: 'yevgnen', name: '예프넨', fullName: '예프넨 진네만', icon: '⚔️', type: '물리복합 5형태', sub: '방랑하는 은빛 검사', img: 'https://ssl.nexon.com/s2/game/tales/renewal_2018/character/img_char_header_yevgnen.png' }
];

function getCharacterVisualInfo(profileId) {
  const cur = (typeof profiles !== 'undefined' && profiles.find(x => x.id === (profileId || currentProfileId))) || (typeof profiles !== 'undefined' ? profiles[0] : null);
  const name = cur ? cur.name : "테일즈위버 모험가";
  const charType = cur ? (cur.charType || cur.job || "모험가") : "모험가";
  const level = cur ? (cur.level || 310) : 310;
  
  let matched = TW_CHARACTER_ROSTER.find(c => name.includes(c.name) || charType.includes(c.name));
  if (!matched) {
    matched = TW_CHARACTER_ROSTER[2]; // Default: roamini
  }

  return {
    name,
    charType,
    level,
    icon: matched.icon,
    charKey: matched.key,
    sub: matched.sub,
    imgUrl: matched.img
  };
}

function countActiveAvatarPieces(equipState) {
  if (!equipState) return 0;
  const avatarSlots = ['showHead', 'showArmor', 'showFace', 'showBack', 'showFoot', 'showEffect'];
  let count = 0;
  avatarSlots.forEach(slotKey => {
    const it = equipState[slotKey];
    if (it && it.name && it.isOn !== false && !it.name.includes('미착용') && !it.name.includes('없음') && !it.name.includes('빈 슬롯')) {
      count++;
    }
  });
  return count;
}

let asIsEquipState = JSON.parse(JSON.stringify(TW_DEFAULT_EQUIP_STATE));
let toBeEquipState = JSON.parse(JSON.stringify(TW_DEFAULT_EQUIP_STATE));
let popoverSlotKey = 'arms';
let popoverTarget = 'tobe';
let popoverTier = 'abyss';
let popoverPrefix = 'sharp';
let popoverEnhance = 10;
let popoverQuality = 'standard';
let popoverCustomStat = 15;
let popoverCustomDex = 10;
let popoverAbilityType = 'destruct';
let popoverAbility = 'superior';
let popoverOpt1 = { type: 'dmg', val: 3 };
let popoverOpt2 = { type: 'dex_acc', val: 15 };
let popoverOpt3 = { type: 'element', val: 10 };
let popoverRandomOpts = { dmg: 3, acc: 15, elem: 10 };

function initInGameEquipWindows() {
  const p = typeof profiles !== 'undefined' ? profiles.find(x => x.id === currentProfileId) : null;
  if (p && p.twEquipState) {
    asIsEquipState = JSON.parse(JSON.stringify(p.twEquipState));
  } else {
    asIsEquipState = JSON.parse(JSON.stringify(TW_DEFAULT_EQUIP_STATE));
  }
  toBeEquipState = JSON.parse(JSON.stringify(asIsEquipState));

  renderInGameEquipWindow('asis', asIsEquipState, false);
  renderInGameEquipWindow('tobe', toBeEquipState, true);
  updateDualEquipWindowDiff();
}

function isSlotUpgraded(slotKey) {
  const asIs = asIsEquipState[slotKey];
  const toBe = toBeEquipState[slotKey];
  if (!asIs || !toBe) return false;
  return (
    asIs.name !== toBe.name ||
    asIs.isOn !== toBe.isOn ||
    asIs.tier !== toBe.tier ||
    asIs.prefix !== toBe.prefix ||
    asIs.enhance !== toBe.enhance ||
    asIs.quality !== toBe.quality ||
    asIs.customStat !== toBe.customStat ||
    asIs.customDex !== toBe.customDex ||
    asIs.ability !== toBe.ability ||
    asIs.optDmg !== toBe.optDmg ||
    asIs.optAcc !== toBe.optAcc ||
    asIs.optElem !== toBe.optElem ||
    asIs.stat !== toBe.stat
  );
}

function renderInGameEquipWindow(target, equipState, isEditable) {
  const container = document.getElementById(`tw-equip-window-${target}`);
  if (!container || typeof TW_INGAME_EQUIP_LAYOUT === 'undefined') return;

  const charInfo = getCharacterVisualInfo();
  const avatarCount = countActiveAvatarPieces(equipState);
  const is5Set = avatarCount >= 5;

  const chipLayers = [
    { key: 'showHead', label: '투구', icon: '👑' },
    { key: 'showArmor', label: '의상', icon: '👗' },
    { key: 'showBack', label: '날개', icon: '🪽' },
    { key: 'showEffect', label: '효과', icon: '✨' },
    { key: 'showFoot', label: '발자국', icon: '👣' },
    { key: 'showFace', label: '얼굴', icon: '👓' }
  ];

  let chipsHtml = '';
  chipLayers.forEach(layer => {
    const it = equipState[layer.key];
    const hasItem = it && it.name && it.isOn !== false && !it.name.includes('미착용') && !it.name.includes('없음') && !it.name.includes('빈 슬롯');
    const chipText = hasItem ? it.name : `${layer.label} 없음`;
    const clickAttr = isEditable ? `onclick="openAvatarDressroomModal('${layer.key}', '${target}')" title="클릭하여 ${layer.label} 아바타 변경 (드레스룸)"` : `title="${chipText}"`;
    chipsHtml += `
      <span class="tw-avatar-mini-chip ${hasItem ? 'active' : ''}" ${clickAttr}>
        ${layer.icon} ${chipText}
      </span>
    `;
  });

  const standeeHtml = `
    <div class="tw-char-standee-box">
      <div class="tw-char-portrait-box">
        <img src="${charInfo.imgUrl}" alt="${charInfo.name}" class="tw-char-portrait-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';">
        <span class="tw-char-portrait-icon" style="display:none;">${charInfo.icon}</span>
      </div>
      <div class="tw-char-standee-info">
        <div class="tw-char-standee-name-row">
          <span class="tw-char-standee-name" title="${charInfo.name} (${charInfo.charType})">${charInfo.name}</span>
          <span class="tw-char-standee-lv">Lv.${charInfo.level}</span>
        </div>
        <div class="tw-avatar-layer-chips">
          ${chipsHtml}
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px;">
          <div class="tw-5set-indicator ${is5Set ? 'active' : 'inactive'}" title="${is5Set ? '화려한 아바타 5세트 활성화 (올스탯 +10, 이동속도 +3, HP +2000)' : '화려한 아바타 5부위 이상 착용 시 올스탯 +10 세트효과 적용'}">
            ${is5Set ? '⭐ 아바타 5세트 ON (+10스탯)' : `아바타 세트: ${avatarCount}/5`}
          </div>
          <button type="button" class="btn-sm btn-outline" style="font-size:0.62rem; padding:1px 6px;" onclick="switchTab('tab-dressroom')">👗 드레스룸 가기</button>
        </div>
      </div>
    </div>
  `;

  let rowsHtml = '';
  TW_INGAME_EQUIP_LAYOUT.forEach(rowDef => {
    if (rowDef.isSingle) {
      const itemKey = rowDef.real.key;
      const item = equipState[itemKey] || rowDef.real;
      const isUpgraded = target === 'tobe' && isSlotUpgraded(itemKey);
      const tierStyle = (typeof TW_TIER_STYLES !== 'undefined' && TW_TIER_STYLES[item.tier || rowDef.real.rarity]) || { class: 'tw-rarity-abyss' };
      const dur = item.dur || rowDef.real.defaultDur || '';
      const isTunable = isEditable && itemKey !== 'vehicle';

      rowsHtml += `
        <div class="tw-slot-row-group">
          <div class="tw-slot-subrow ${isTunable ? 'tunable' : ''} ${isUpgraded ? 'slot-upgraded' : ''}" 
               ${isTunable ? `onclick="onInGameSlotClick('${itemKey}', '${target}')"` : ''}
               title="${isTunable ? '클릭하여 장비 변경 및 정밀 튜닝' : ''}">
            <div class="tw-slot-icon-box">${rowDef.real.icon || '📦'}</div>
            <div class="tw-slot-info-box">
              <div class="tw-slot-line-top">
                <span class="tw-slot-tag">${rowDef.real.label}</span>
                ${isUpgraded ? '<span class="tw-up-badge">⭐ UP</span>' : ''}
              </div>
              <div class="tw-slot-line-bottom">
                <span class="tw-slot-name ${tierStyle.class}">${item.name || rowDef.real.defaultName}</span>
                ${dur ? `<span class="tw-slot-dur">${dur}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      const realKey = rowDef.real.key;
      const showKey = rowDef.show.key;
      const realItem = equipState[realKey] || rowDef.real;
      const showItem = equipState[showKey] || rowDef.show;
      const realUpgraded = target === 'tobe' && isSlotUpgraded(realKey);
      const showUpgraded = target === 'tobe' && isSlotUpgraded(showKey);
      const realTier = (typeof TW_TIER_STYLES !== 'undefined' && TW_TIER_STYLES[realItem.tier || rowDef.real.rarity]) || { class: 'tw-rarity-abyss' };
      const showTier = (typeof TW_TIER_STYLES !== 'undefined' && TW_TIER_STYLES[showItem.tier || rowDef.show.rarity]) || { class: 'tw-rarity-avatar' };
      const realDur = realItem.dur || rowDef.real.defaultDur || '';
      const showDur = showItem.dur || rowDef.show.defaultDur || '';

      const isRealTunable = isEditable;
      const isShowTunable = isEditable && (showKey === 'showSubArms' || showKey === 'relicLeft');
      const isShowAvatar = ['showHead', 'showArmor', 'showFace', 'showBack', 'showFoot', 'showEffect', 'showArms'].includes(showKey);

      const realOn = realItem.isOn !== undefined ? realItem.isOn : (rowDef.real.defaultOn !== undefined ? rowDef.real.defaultOn : null);
      const showOn = showItem.isOn !== undefined ? showItem.isOn : (rowDef.show.defaultOn !== undefined ? rowDef.show.defaultOn : null);

      let showOnClick = '';
      let showTitle = '';
      if (isShowTunable) {
        showOnClick = `onclick="onInGameSlotClick('${showKey}', '${target}')"`;
        showTitle = '클릭하여 라이도 커프 / 렐릭 튜닝';
      } else if (isShowAvatar && isEditable) {
        showOnClick = `onclick="openAvatarDressroomModal('${showKey}', '${target}')"`;
        showTitle = '클릭하여 아바타 외형 검색 및 착용 (드레스룸)';
      }

      const isShowClickable = isShowTunable || (isShowAvatar && isEditable);

      rowsHtml += `
        <div class="tw-slot-row-group">
          <!-- Real Item Subrow -->
          <div class="tw-slot-subrow ${isRealTunable ? 'tunable' : ''} ${realUpgraded ? 'slot-upgraded' : ''}"
               ${isRealTunable ? `onclick="onInGameSlotClick('${realKey}', '${target}')"` : ''}
               title="${isRealTunable ? '클릭하여 장비 변경 및 정밀 튜닝' : ''}">
            <div class="tw-slot-icon-box">${rowDef.real.icon || '⚔️'}</div>
            <div class="tw-slot-info-box">
              <div class="tw-slot-line-top">
                <span class="tw-slot-tag">${rowDef.real.label}</span>
                <div style="display:flex; align-items:center; gap:4px;">
                  ${realUpgraded ? '<span class="tw-up-badge">⭐ UP</span>' : ''}
                  ${realOn !== null ? `<span class="tw-on-badge ${realOn ? 'on' : 'off'}" onclick="toggleSlotOnOff('${realKey}', '${target}', event)">${realOn ? 'ON' : 'OFF'}</span>` : ''}
                </div>
              </div>
              <div class="tw-slot-line-bottom">
                <span class="tw-slot-name ${realTier.class}">${realItem.name || rowDef.real.defaultName}</span>
                ${realDur ? `<span class="tw-slot-dur">${realDur}</span>` : ''}
              </div>
            </div>
          </div>

          <!-- Show Item Subrow -->
          <div class="tw-slot-subrow ${isShowClickable ? 'tunable' : ''} ${showUpgraded ? 'slot-upgraded' : ''}"
               ${showOnClick}
               title="${showTitle}">
            <div class="tw-slot-icon-box">${rowDef.show.icon || '🎀'}</div>
            <div class="tw-slot-info-box">
              <div class="tw-slot-line-top">
                <span class="tw-slot-tag show">${rowDef.show.label}</span>
                <div style="display:flex; align-items:center; gap:4px;">
                  ${showUpgraded ? '<span class="tw-up-badge">⭐ UP</span>' : ''}
                  ${showOn !== null ? `<span class="tw-on-badge ${showOn ? 'on' : 'off'}" onclick="toggleSlotOnOff('${showKey}', '${target}', event)">${showOn ? 'ON' : 'OFF'}</span>` : ''}
                </div>
              </div>
              <div class="tw-slot-line-bottom">
                <span class="tw-slot-name ${showTier.class}">${showItem.name || rowDef.show.defaultName}</span>
                ${showDur ? `<span class="tw-slot-dur">${showDur}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });

  container.innerHTML = `
    <div class="tw-window-header">
      <div class="tw-win-title">Equip</div>
      <div class="tw-win-controls">
        <span class="tw-win-btn plus" title="확장">+</span>
        <span class="tw-win-btn up" title="최소화">▲</span>
        <span class="tw-win-btn close" title="닫기">&times;</span>
      </div>
    </div>
    <div class="tw-window-body">
      ${standeeHtml}
      ${rowsHtml}
    </div>
  `;
}

function onInGameSlotClick(slotKey, target) {
  if (target === 'asis') {
    return;
  }
  openSlotTunerModal(slotKey, target);
}

function openSlotTunerModal(slotKey, target = 'tobe') {
  popoverSlotKey = slotKey;
  popoverTarget = target || 'tobe';
  const state = popoverTarget === 'modal' ? (modalGearState || TW_DEFAULT_EQUIP_STATE) : toBeEquipState;
  const item = (state && state[slotKey]) ? state[slotKey] : {};

  popoverTier = item.tier || 'abyss';
  popoverPrefix = item.prefix || 'sharp';
  popoverEnhance = item.enhance !== undefined ? item.enhance : 10;
  popoverQuality = item.quality || 'standard';

  const defaultQ = (typeof ENCHANT_TIER_TABLE !== 'undefined' && ENCHANT_TIER_TABLE[popoverQuality]) || { mainBonus: 15, dexBonus: 10 };
  popoverCustomStat = item.customStat !== undefined ? item.customStat : (defaultQ.mainBonus || 15);
  popoverCustomDex = item.customDex !== undefined ? item.customDex : (defaultQ.dexBonus || 10);

  popoverAbilityType = item.abilityType || (item.ability === 'none' ? 'none' : 'destruct');
  popoverAbility = item.ability || 'superior';

  popoverOpt1 = item.opt1 || { type: 'dmg', val: item.optDmg !== undefined ? item.optDmg : 3 };
  popoverOpt2 = item.opt2 || { type: 'dex_acc', val: item.optAcc !== undefined ? item.optAcc : 15 };
  popoverOpt3 = item.opt3 || { type: 'element', val: item.optElem !== undefined ? item.optElem : 10 };

  const titleEl = document.getElementById('popover-slot-title');
  const iconEl = document.getElementById('popover-slot-icon');
  const tierSelect = document.getElementById('popover-tier-select');
  const confirmBtn = document.getElementById('popover-confirm-btn');

  if (confirmBtn) {
    confirmBtn.textContent = (popoverTarget === 'modal' ? '💾 프로필 장비에 적용' : '⭐ To-Be 템창에 적용');
  }

  const slotLabels = {
    arms: { name: "무기 (REAL ARMS)", icon: "⚔️" },
    subArms: { name: "손목/서브 (REAL SUB ARMS)", icon: "🛡️" },
    showSubArms: { name: "라이도 커프 (SHOW SUB ARMS)", icon: "💍" },
    armor: { name: "갑옷 (REAL ARMOR)", icon: "🥋" },
    head: { name: "투구 (REAL HEAD)", icon: "👑" },
    face: { name: "얼굴/아뮬렛 (REAL FACE)", icon: "📿" },
    back: { name: "날개 (REAL BACK)", icon: "🪶" },
    hand: { name: "건틀렛 (HAND)", icon: "🧤" },
    foot: { name: "부츠 (REAL FOOT)", icon: "👢" },
    effect: { name: "효과 (REAL EFFECT)", icon: "🌟" },
    artifact: { name: "아티팩트 (ARTIFACT)", icon: "🔮" },
    relicRight: { name: "신조 렐릭 (RELIC RIGHT)", icon: "☀️" },
    relicLeft: { name: "태양 렐릭 (RELIC LEFT)", icon: "💎" }
  };
  const slotInfo = slotLabels[slotKey] || { name: "장비 슬롯", icon: "⚔️" };
  if (titleEl) titleEl.textContent = `${slotInfo.name} 정밀 튜닝`;
  if (iconEl) iconEl.textContent = slotInfo.icon;

  if (tierSelect) {
    if (slotKey === 'showSubArms') {
      tierSelect.innerHTML = `
        <option value="cuff80">라이도 심볼릭 커프 (80작)</option>
        <option value="cuff140" selected>라이도 심볼릭 커프 (140작 국템)</option>
        <option value="cuff200">라이도 심볼릭 커프 (200작 종결)</option>
      `;
      if (item.stat === 80) tierSelect.value = 'cuff80';
      else if (item.stat === 200) tierSelect.value = 'cuff200';
      else tierSelect.value = 'cuff140';
    } else if (slotKey === 'effect') {
      tierSelect.innerHTML = `
        <option value="eff30">30 마방 효과 (아일단 기본)</option>
        <option value="eff60" selected>[넥슨30주년] 빛나는 효과 (60마방 국템)</option>
        <option value="eff100">100 올스탯 효과 (종결)</option>
      `;
      if (item.stat === 30) tierSelect.value = 'eff30';
      else if (item.stat === 100) tierSelect.value = 'eff100';
      else tierSelect.value = 'eff60';
    } else if (slotKey === 'artifact') {
      tierSelect.innerHTML = `
        <option value="art40">아크론 혈투 아티팩트</option>
        <option value="art75" selected>아크론의 참력 - 디바인 (국템)</option>
        <option value="art120">이클립스 아티팩트 (한계 종결)</option>
      `;
      if (item.stat === 40) tierSelect.value = 'art40';
      else if (item.stat === 120) tierSelect.value = 'art120';
      else tierSelect.value = 'art75';
    } else if (slotKey === 'relicRight' || slotKey === 'relicLeft') {
      tierSelect.innerHTML = `
        <option value="relic4">+4 성소 렐릭</option>
        <option value="relic8" selected>+8 성소 렐릭 (실전 국민)</option>
        <option value="relic10">+10 성소 렐릭 (최상위 종결)</option>
      `;
      if (item.stat === 40) tierSelect.value = 'relic4';
      else if (item.stat === 100) tierSelect.value = 'relic10';
      else tierSelect.value = 'relic8';
    } else {
      tierSelect.innerHTML = `
        <option value="abyss" ${popoverTier === 'abyss' ? 'selected' : ''}>어비스 장비 (실전 국민 세팅)</option>
        <option value="eclipse" ${popoverTier === 'eclipse' ? 'selected' : ''}>이클립스 장비 (상위 종결 세팅)</option>
        <option value="aquilus" ${popoverTier === 'aquilus' ? 'selected' : ''}>眞 아퀼루스 장비 (가성비 입문)</option>
      `;
    }
  }

  // Populate input values
  const pfxSel = document.getElementById('popover-prefix-select');
  if (pfxSel) pfxSel.value = popoverPrefix;
  const abTypeSel = document.getElementById('popover-ability-type');
  if (abTypeSel) abTypeSel.value = popoverAbilityType;
  const statIn = document.getElementById('popover-stat-custom-val');
  if (statIn) statIn.value = popoverCustomStat;
  const dexIn = document.getElementById('popover-dex-custom-val');
  if (dexIn) dexIn.value = popoverCustomDex;

  const s1 = document.getElementById('popover-opt1-type');
  const s2 = document.getElementById('popover-opt2-type');
  const s3 = document.getElementById('popover-opt3-type');
  if (s1) s1.value = popoverOpt1.type;
  if (s2) s2.value = popoverOpt2.type;
  if (s3) s3.value = popoverOpt3.type;

  renderPopoverOptChips(1, popoverOpt1.type, popoverOpt1.val);
  renderPopoverOptChips(2, popoverOpt2.type, popoverOpt2.val);
  renderPopoverOptChips(3, popoverOpt3.type, popoverOpt3.val);

  syncPopoverModalUI();
  const modal = document.getElementById('tw-slot-popover-modal');
  if (modal) modal.classList.add('active');
}

function closeSlotTunerModal() {
  const modal = document.getElementById('tw-slot-popover-modal');
  if (modal) modal.classList.remove('active');
}

function syncPopoverModalUI() {
  document.querySelectorAll('#popover-enhance-bar .tw-enh-btn').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.enhance) === popoverEnhance);
  });
  const enhSumEl = document.getElementById('popover-enhance-summary');
  if (enhSumEl && typeof ENHANCE_STAT_TABLE !== 'undefined') {
    const isWpn = popoverSlotKey === 'arms';
    const t = isWpn ? ENHANCE_STAT_TABLE.weapon : ENHANCE_STAT_TABLE.armor;
    const d = (t && t[popoverEnhance]) || { stat: 45, dex: 10 };
    enhSumEl.textContent = `${popoverEnhance}강 (+${d.stat}, DEX +${d.dex}, 공식 계수 x32.5)`;
  }
  document.querySelectorAll('#popover-quality-bar .tw-q-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.quality === popoverQuality);
  });
  document.querySelectorAll('#popover-ability-chips .tw-chip-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === popoverAbility);
  });
}

function setPopoverEnhance(level, btn) {
  popoverEnhance = Number(level);
  syncPopoverModalUI();
}

function setPopoverQuality(quality, btn) {
  popoverQuality = quality;
  const qData = (typeof ENCHANT_TIER_TABLE !== 'undefined' && ENCHANT_TIER_TABLE[quality]) || { mainBonus: 15, dexBonus: 10 };
  popoverCustomStat = qData.mainBonus || 15;
  popoverCustomDex = qData.dexBonus || 10;
  const statIn = document.getElementById('popover-stat-custom-val');
  const dexIn = document.getElementById('popover-dex-custom-val');
  if (statIn) statIn.value = popoverCustomStat;
  if (dexIn) dexIn.value = popoverCustomDex;
  syncPopoverModalUI();
}

function onPopoverCustomStatChange() {
  const el = document.getElementById('popover-stat-custom-val');
  if (el) popoverCustomStat = Math.max(0, Number(el.value) || 0);
}

function onPopoverCustomDexChange() {
  const el = document.getElementById('popover-dex-custom-val');
  if (el) popoverCustomDex = Math.max(0, Number(el.value) || 0);
}

function onPopoverPrefixChange(newPrefix) {
  popoverPrefix = newPrefix;
}

function onPopoverAbilityTypeChange(newType) {
  popoverAbilityType = newType;
  if (newType === 'none') {
    popoverAbility = 'none';
  } else if (popoverAbility === 'none') {
    popoverAbility = 'superior';
  }
  syncPopoverModalUI();
}

function setPopoverAbility(val, btn) {
  popoverAbility = val;
  syncPopoverModalUI();
}

function renderPopoverOptChips(slotNum, optType, selectedVal) {
  const container = document.getElementById(`popover-opt${slotNum}-chips`);
  if (!container) return;
  const optList = (typeof EQUIP_OPTIONS_DB !== 'undefined' && EQUIP_OPTIONS_DB.randomOptions && EQUIP_OPTIONS_DB.randomOptions[optType])
    || [{ id: 'none', name: '0', val: 0 }];

  let html = '';
  optList.forEach(opt => {
    const isAct = Number(opt.val) === Number(selectedVal);
    html += `<button type="button" class="tw-chip-btn ${isAct ? 'active' : ''}" data-val="${opt.val}" onclick="setPopoverOptVal(${slotNum}, ${opt.val}, this)">${opt.name}</button>`;
  });
  container.innerHTML = html;
}

function onPopoverOptTypeChange(slotNum, newType) {
  const optList = (typeof EQUIP_OPTIONS_DB !== 'undefined' && EQUIP_OPTIONS_DB.randomOptions && EQUIP_OPTIONS_DB.randomOptions[newType]) || [];
  const defaultVal = optList.length > 1 ? optList[1].val : 0;
  if (slotNum === 1) popoverOpt1 = { type: newType, val: defaultVal };
  else if (slotNum === 2) popoverOpt2 = { type: newType, val: defaultVal };
  else if (slotNum === 3) popoverOpt3 = { type: newType, val: defaultVal };
  renderPopoverOptChips(slotNum, newType, defaultVal);
}

function setPopoverOptVal(slotNum, val, btn) {
  const numVal = Number(val);
  if (slotNum === 1) popoverOpt1.val = numVal;
  else if (slotNum === 2) popoverOpt2.val = numVal;
  else if (slotNum === 3) popoverOpt3.val = numVal;

  const chips = document.querySelectorAll(`#popover-opt${slotNum}-chips .tw-chip-btn`);
  chips.forEach(c => {
    c.classList.toggle('active', Number(c.dataset.val) === numVal);
  });
}

function setPopoverRandomOpt(type, val, btn) {
  popoverRandomOpts[type] = Number(val);
  syncPopoverModalUI();
}

function onPopoverTierChange(tierVal) {
  popoverTier = tierVal;
}

function applyQuickOptPreset(presetType) {
  if (presetType === 'std') {
    popoverOpt1 = { type: 'dmg', val: 3 };
    popoverOpt2 = { type: 'dex_acc', val: 15 };
    popoverOpt3 = { type: 'element', val: 10 };
  } else if (presetType === 'boss') {
    popoverOpt1 = { type: 'dmg', val: 5 };
    popoverOpt2 = { type: 'boss_dmg', val: 5 };
    popoverOpt3 = { type: 'crit_dmg', val: 5 };
  } else if (presetType === 'delay') {
    popoverOpt1 = { type: 'delay_fix', val: 1 };
    popoverOpt2 = { type: 'dmg', val: 3 };
    popoverOpt3 = { type: 'dex_acc', val: 15 };
  }
  const s1 = document.getElementById('popover-opt1-type');
  const s2 = document.getElementById('popover-opt2-type');
  const s3 = document.getElementById('popover-opt3-type');
  if (s1) s1.value = popoverOpt1.type;
  if (s2) s2.value = popoverOpt2.type;
  if (s3) s3.value = popoverOpt3.type;
  renderPopoverOptChips(1, popoverOpt1.type, popoverOpt1.val);
  renderPopoverOptChips(2, popoverOpt2.type, popoverOpt2.val);
  renderPopoverOptChips(3, popoverOpt3.type, popoverOpt3.val);
}

function applyQuickPresetToPopover(presetKey) {
  document.querySelectorAll('.tw-quick-grid-4 .tw-quick-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.tw-quick-grid-4 .tw-quick-btn[onclick*="${presetKey}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  const isAccessory = ['showSubArms', 'effect', 'artifact', 'relicRight', 'relicLeft'].includes(popoverSlotKey);

  if (presetKey === 'budget') {
    popoverEnhance = 5;
    popoverQuality = 'budget';
    popoverPrefix = 'none';
    popoverCustomStat = 3;
    popoverCustomDex = 3;
    popoverAbilityType = 'none';
    popoverAbility = 'none';
    popoverOpt1 = { type: 'dmg', val: 0 };
    popoverOpt2 = { type: 'dex_acc', val: 0 };
    popoverOpt3 = { type: 'element', val: 0 };
    if (!isAccessory) {
      popoverTier = 'aquilus';
      const tierSel = document.getElementById('popover-tier-select');
      if (tierSel) tierSel.value = 'aquilus';
    }
  } else if (presetKey === 'standard') {
    popoverEnhance = 10;
    popoverQuality = 'standard';
    popoverPrefix = 'sharp';
    popoverCustomStat = 15;
    popoverCustomDex = 10;
    popoverAbilityType = 'destruct';
    popoverAbility = 'superior';
    popoverOpt1 = { type: 'dmg', val: 3 };
    popoverOpt2 = { type: 'dex_acc', val: 15 };
    popoverOpt3 = { type: 'element', val: 10 };
    if (!isAccessory) {
      popoverTier = 'abyss';
      const tierSel = document.getElementById('popover-tier-select');
      if (tierSel) tierSel.value = 'abyss';
    }
  } else if (presetKey === 'limit') {
    popoverEnhance = 11;
    popoverQuality = 'limit';
    popoverPrefix = 'sharp';
    popoverCustomStat = 30;
    popoverCustomDex = 20;
    popoverAbilityType = 'destruct';
    popoverAbility = 'superior';
    popoverOpt1 = { type: 'dmg', val: 5 };
    popoverOpt2 = { type: 'dex_acc', val: 25 };
    popoverOpt3 = { type: 'element', val: 15 };
    if (!isAccessory) {
      popoverTier = 'eclipse';
      const tierSel = document.getElementById('popover-tier-select');
      if (tierSel) tierSel.value = 'eclipse';
    }
  } else if (presetKey === 'hyper') {
    popoverEnhance = 12;
    popoverQuality = 'hyper_limit';
    popoverPrefix = 'sharp';
    popoverCustomStat = 35;
    popoverCustomDex = 25;
    popoverAbilityType = 'destruct';
    popoverAbility = 'superior';
    popoverOpt1 = { type: 'dmg', val: 6 };
    popoverOpt2 = { type: 'dex_acc', val: 35 };
    popoverOpt3 = { type: 'element', val: 20 };
    if (!isAccessory) {
      popoverTier = 'eclipse';
      const tierSel = document.getElementById('popover-tier-select');
      if (tierSel) tierSel.value = 'eclipse';
    }
  }

  const pfxSel = document.getElementById('popover-prefix-select');
  if (pfxSel) pfxSel.value = popoverPrefix;
  const abTypeSel = document.getElementById('popover-ability-type');
  if (abTypeSel) abTypeSel.value = popoverAbilityType;
  const statIn = document.getElementById('popover-stat-custom-val');
  if (statIn) statIn.value = popoverCustomStat;
  const dexIn = document.getElementById('popover-dex-custom-val');
  if (dexIn) dexIn.value = popoverCustomDex;

  const s1 = document.getElementById('popover-opt1-type');
  const s2 = document.getElementById('popover-opt2-type');
  const s3 = document.getElementById('popover-opt3-type');
  if (s1) s1.value = popoverOpt1.type;
  if (s2) s2.value = popoverOpt2.type;
  if (s3) s3.value = popoverOpt3.type;
  renderPopoverOptChips(1, popoverOpt1.type, popoverOpt1.val);
  renderPopoverOptChips(2, popoverOpt2.type, popoverOpt2.val);
  renderPopoverOptChips(3, popoverOpt3.type, popoverOpt3.val);

  syncPopoverModalUI();
}

function saveSlotTunerModal() {
  const targetState = popoverTarget === 'modal' 
    ? (modalGearState = modalGearState || JSON.parse(JSON.stringify(TW_DEFAULT_EQUIP_STATE))) 
    : toBeEquipState;
  const cur = targetState[popoverSlotKey] || {};

  cur.tier = popoverTier;
  cur.prefix = popoverPrefix;
  cur.enhance = popoverEnhance;
  cur.quality = popoverQuality;
  cur.customStat = popoverCustomStat;
  cur.customDex = popoverCustomDex;
  cur.abilityType = popoverAbilityType;
  cur.ability = popoverAbility;
  cur.opt1 = JSON.parse(JSON.stringify(popoverOpt1));
  cur.opt2 = JSON.parse(JSON.stringify(popoverOpt2));
  cur.opt3 = JSON.parse(JSON.stringify(popoverOpt3));

  let optDmg = 0;
  let optAcc = 0;
  let optElem = 0;
  [popoverOpt1, popoverOpt2, popoverOpt3].forEach(opt => {
    if (!opt) return;
    if (opt.type === 'dmg' || opt.type === 'boss_dmg' || opt.type === 'crit_dmg') optDmg += Number(opt.val) || 0;
    else if (opt.type === 'dex_acc' || opt.type === 'acc') optAcc += Number(opt.val) || 0;
    else if (opt.type === 'element' || opt.type === 'elem') optElem += Number(opt.val) || 0;
  });
  cur.optDmg = optDmg;
  cur.optAcc = optAcc;
  cur.optElem = optElem;

  if (popoverSlotKey === 'showSubArms') {
    if (popoverTier === 'cuff80') { cur.name = "라이도 심볼릭 커프 (80)"; cur.stat = 80; cur.dex = 20; cur.tier = "gold"; }
    else if (popoverTier === 'cuff200') { cur.name = "라이도 심볼릭 커프 (200)"; cur.stat = 200; cur.dex = 50; cur.tier = "eclipse"; }
    else { cur.name = "라이도 심볼릭 커프 (140)"; cur.stat = 140; cur.dex = 35; cur.tier = "gold"; }
  } else if (popoverSlotKey === 'effect') {
    if (popoverTier === 'eff30') { cur.name = "30 마방 효과"; cur.stat = 30; cur.dex = 15; cur.tier = "gold"; }
    else if (popoverTier === 'eff100') { cur.name = "[넥슨30주년] 찬란한 효과 (100마방)"; cur.stat = 100; cur.dex = 50; cur.tier = "eclipse"; }
    else { cur.name = "[넥슨30주년] 빛나는 효과 (60마방)"; cur.stat = 60; cur.dex = 35; cur.tier = "gold"; }
  } else if (popoverSlotKey === 'artifact') {
    if (popoverTier === 'art40') { cur.name = "아크론 혈투 아티팩트"; cur.stat = 40; cur.dex = 15; cur.tier = "purple"; }
    else if (popoverTier === 'art120') { cur.name = "이클립스 아티팩트"; cur.stat = 120; cur.dex = 40; cur.tier = "eclipse"; }
    else { cur.name = "아크론의 참력 - 디바인"; cur.stat = 75; cur.dex = 25; cur.tier = "purple"; }
  } else if (popoverSlotKey === 'relicRight') {
    if (popoverTier === 'relic4') { cur.name = "신조의 펜던트 (+4)"; cur.stat = 40; cur.dex = 20; cur.tier = "relic"; }
    else if (popoverTier === 'relic10') { cur.name = "신조의 펜던트 (+10)"; cur.stat = 100; cur.dex = 40; cur.tier = "relic"; }
    else { cur.name = "신조의 펜던트 (+8)"; cur.stat = 80; cur.dex = 30; cur.tier = "relic"; }
  } else if (popoverSlotKey === 'relicLeft') {
    if (popoverTier === 'relic4') { cur.name = "태양의 브레이슬릿 (+4)"; cur.stat = 40; cur.dex = 20; cur.tier = "relic"; }
    else if (popoverTier === 'relic10') { cur.name = "태양의 브레이슬릿 (+10)"; cur.stat = 100; cur.dex = 40; cur.tier = "relic"; }
    else { cur.name = "태양의 브레이슬릿 (+8)"; cur.stat = 80; cur.dex = 30; cur.tier = "relic"; }
  } else {
    const tierName = popoverTier === 'eclipse' ? '이클립스' : (popoverTier === 'aquilus' ? '眞 아퀼루스' : '어비스');
    const slotNames = {
      arms: "무기",
      subArms: "리스트 / 펜듈럼",
      armor: "메일 / 로브",
      head: "헬름",
      face: "아뮬렛",
      back: "윙",
      hand: "건틀렛",
      foot: "부츠"
    };
    const sName = slotNames[popoverSlotKey] || "장비";
    const prefixInfo = (typeof EQUIP_OPTIONS_DB !== 'undefined' && EQUIP_OPTIONS_DB.prefixes && EQUIP_OPTIONS_DB.prefixes[popoverPrefix]) || null;
    const prefixLabel = (prefixInfo && prefixInfo.label) ? `${prefixInfo.label} ` : '';
    cur.name = `+${popoverEnhance} ${prefixLabel}${tierName} ${sName}`;
    const baseDurs = { aquilus: "(48/52)", abyss: "(52/52)", eclipse: "(65/65)" };
    cur.dur = baseDurs[popoverTier] || "(52/52)";
  }

  if (popoverTarget === 'modal') {
    modalGearState[popoverSlotKey] = cur;
    const presetSel = document.getElementById('modal-gear-preset');
    if (presetSel) presetSel.value = 'custom';
    closeSlotTunerModal();
    renderInGameEquipWindow('modal', modalGearState, true);
    updateModalGearKpiBanner(modalGearState);
    updateModalStatLiveSummary();
    renderModalGearQuickChips(modalGearState);
    if (typeof renderModalGearGrid === 'function') renderModalGearGrid(modalGearState);
  } else {
    toBeEquipState[popoverSlotKey] = cur;
    closeSlotTunerModal();
    renderInGameEquipWindow('tobe', toBeEquipState, true);
    updateDualEquipWindowDiff();
  }
}

function toggleSlotOnOff(slotKey, target, event) {
  if (event) event.stopPropagation();
  const state = target === 'asis' ? asIsEquipState : (target === 'modal' ? modalGearState : toBeEquipState);
  if (!state) return;
  if (!state[slotKey]) {
    state[slotKey] = { key: slotKey, name: "아이템", isOn: true };
  }
  state[slotKey].isOn = !state[slotKey].isOn;
  renderInGameEquipWindow(target, state, target !== 'asis');
  if (target === 'modal') {
    updateModalGearKpiBanner(modalGearState);
    updateModalStatLiveSummary();
    renderModalGearQuickChips(modalGearState);
  } else {
    updateDualEquipWindowDiff();
  }
}

function cycleAvatarSlot(slotKey, target) {
  if (target === 'asis') return;
  openAvatarDressroomModal(slotKey, target);
}

// ==================== AVATAR DRESSROOM & ENCYCLOPEDIA LOGIC ====================
let currentDressroomSlot = 'showHead';
let currentDressroomTarget = 'tobe';
let dressroomSearchQuery = '';
let dressroomRoundFilter = '';
let dressroomQuickFilter = '';

function openAvatarDressroomModal(slotKey, target = 'tobe') {
  currentDressroomSlot = slotKey;
  currentDressroomTarget = target;
  dressroomSearchQuery = '';
  dressroomRoundFilter = '';
  dressroomQuickFilter = '';

  const modal = document.getElementById('tw-avatar-dressroom-modal');
  if (!modal) return;

  const searchInput = document.getElementById('dressroom-search-input');
  if (searchInput) searchInput.value = '';

  const slotLabels = {
    showHead: { name: "투구/모자 (SHOW HEAD)", icon: "👑" },
    showArmor: { name: "몸/의상 (SHOW ARMOR)", icon: "👗" },
    showFace: { name: "얼굴/안경 (SHOW FACE)", icon: "👓" },
    showBack: { name: "등/날개 (SHOW BACK)", icon: "🪽" },
    showFoot: { name: "발/발자국 (SHOW FOOT)", icon: "👣" },
    showEffect: { name: "효과/마법진 (SHOW EFFECT)", icon: "✨" },
    showArms: { name: "무기 확장 (SHOW ARMS)", icon: "⚔️" },
    showSubArms: { name: "방패 확장 (SHOW SUB ARMS)", icon: "🛡️" }
  };

  const info = slotLabels[slotKey] || { name: `아바타 (${slotKey})`, icon: "🎀" };
  const titleEl = document.getElementById('dressroom-slot-title');
  const iconEl = document.getElementById('dressroom-slot-icon');
  const subtitleEl = document.getElementById('dressroom-slot-subtitle');

  if (titleEl) titleEl.textContent = `${info.name} 아바타 드레스룸`;
  if (iconEl) iconEl.textContent = info.icon;
  if (subtitleEl) subtitleEl.textContent = `호랑구님의 1~83회차 및 월간 확장 아이템 전수 DB에서 원하는 외형을 검색하고 1클릭으로 착용하세요.`;

  // Populate round dropdown
  const roundSelect = document.getElementById('dressroom-round-select');
  if (roundSelect && typeof TW_AVATAR_DB !== 'undefined') {
    const rounds = TW_AVATAR_DB.getRounds();
    let optionsHtml = '<option value="">전체 회차 (1~83회차)</option>';
    rounds.forEach(r => {
      optionsHtml += `<option value="${r}">${r}</option>`;
    });
    roundSelect.innerHTML = optionsHtml;
    roundSelect.value = '';
  }

  renderDressroomItems();
  modal.classList.add('active');
}

function closeAvatarDressroomModal() {
  const modal = document.getElementById('tw-avatar-dressroom-modal');
  if (modal) modal.classList.remove('active');
}

function onDressroomSearchInput() {
  const input = document.getElementById('dressroom-search-input');
  dressroomSearchQuery = input ? input.value.trim() : '';
  renderDressroomItems();
}

function onDressroomRoundChange(val) {
  dressroomRoundFilter = val;
  renderDressroomItems();
}

function setDressroomQuickFilter(filterType) {
  dressroomQuickFilter = filterType;
  renderDressroomItems();
}

function renderDressroomItems() {
  const grid = document.getElementById('dressroom-item-grid');
  const countEl = document.getElementById('dressroom-item-count');
  const status5Set = document.getElementById('dressroom-5set-status');
  if (!grid || typeof TW_AVATAR_DB === 'undefined') return;

  const targetState = currentDressroomTarget === 'modal' ? modalGearState : (currentDressroomTarget === 'asis' ? asIsEquipState : toBeEquipState);
  const currentEquipped = targetState && targetState[currentDressroomSlot] ? targetState[currentDressroomSlot].name : '';

  // Get search results
  let items = TW_AVATAR_DB.search(dressroomSearchQuery, currentDressroomSlot, dressroomRoundFilter);

  // Apply quick filters
  if (dressroomQuickFilter === 'monthly') {
    items = items.filter(it => it.isMonthly || (it.round && it.round.includes('월')));
  } else if (dressroomQuickFilter === 'special') {
    items = items.filter(it => it.isSpecial || (it.round && (it.round.includes('스페셜') || it.round.includes('80') || it.round.includes('81') || it.round.includes('82') || it.round.includes('83'))));
  }

  if (countEl) countEl.textContent = `총 ${items.length.toLocaleString()}개 아이템`;

  // Update 5-set status
  if (status5Set) {
    const activeCount = countActiveAvatarPieces(targetState);
    if (activeCount >= 5) {
      status5Set.className = "tw-5set-indicator active";
      status5Set.textContent = `⭐ 아바타 5세트: 활성화 (${activeCount}/5 - 올스탯 +10, 이속 +3, HP +2000)`;
    } else {
      status5Set.className = "tw-5set-indicator inactive";
      status5Set.textContent = `아바타 5세트: 미달성 (${activeCount}/5)`;
    }
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: #94a3b8; font-size: 0.85rem;">
        🔍 조건에 일치하는 아바타 아이템이 없습니다.<br>
        <span style="font-size:0.75rem; color:#64748b;">검색어나 회차 필터를 변경해보세요.</span>
      </div>
    `;
    return;
  }

  // Render up to 120 items for snappy performance
  const displayLimit = 120;
  const displayItems = items.slice(0, displayLimit);

  let html = '';
  displayItems.forEach(item => {
    const isEquipped = currentEquipped === item.name;
    const monthlyTag = item.isMonthly ? '<span class="tw-avatar-monthly-tag">月</span>' : '';
    const roundTag = item.round ? `<span class="tw-avatar-round-tag">${item.round}</span>` : '';
    const origSlotTag = item.originalSlot ? `<span class="tw-avatar-round-tag" style="color:#38bdf8;">${item.originalSlot}</span>` : '';

    html += `
      <div class="tw-avatar-card ${isEquipped ? 'active' : ''}" onclick="equipAvatarItem('${item.id.replace(/'/g, "\\'")}')">
        <div class="tw-avatar-card-info">
          <div class="tw-avatar-card-name" title="${item.name}">${isEquipped ? '✨ ' : ''}${item.name}</div>
          <div class="tw-avatar-card-meta">
            ${roundTag}
            ${monthlyTag}
            ${origSlotTag}
          </div>
        </div>
        <button type="button" class="btn-sm ${isEquipped ? 'btn-primary' : 'btn-outline'}" style="font-size:0.68rem; padding:2px 8px;">
          ${isEquipped ? '착용중' : '착용'}
        </button>
      </div>
    `;
  });

  if (items.length > displayLimit) {
    html += `
      <div style="grid-column: 1 / -1; padding: 0.75rem; text-align: center; color: #64748b; font-size: 0.75rem; background: #080c16; border-radius: 6px;">
        외 ${items.length - displayLimit}개의 아이템이 더 있습니다. 더 자세한 검색어로 찾아보세요!
      </div>
    `;
  }

  grid.innerHTML = html;
}

function equipAvatarItem(avatarId) {
  const targetState = currentDressroomTarget === 'modal' ? modalGearState : (currentDressroomTarget === 'asis' ? asIsEquipState : toBeEquipState);
  if (!targetState) return;

  if (avatarId === null) {
    targetState[currentDressroomSlot] = {
      key: currentDressroomSlot,
      name: "외형 미착용",
      dur: "",
      tier: "avatar",
      isOn: false
    };
  } else {
    const avatar = typeof TW_AVATAR_DB !== 'undefined' ? TW_AVATAR_DB.getById(avatarId) : null;
    if (!avatar) return;

    targetState[currentDressroomSlot] = {
      key: currentDressroomSlot,
      name: avatar.name,
      dur: "(100/100)",
      tier: "avatar",
      isOn: true,
      round: avatar.round,
      isMonthly: avatar.isMonthly
    };
  }

  closeAvatarDressroomModal();

  if (currentDressroomTarget === 'modal') {
    renderInGameEquipWindow('modal', modalGearState, true);
    updateModalGearKpiBanner(modalGearState);
    updateModalStatLiveSummary();
    renderModalGearQuickChips(modalGearState);
  } else {
    renderInGameEquipWindow('tobe', toBeEquipState, true);
    updateDualEquipWindowDiff();
  }
}

function calculateEquipStateMetrics(state) {
  let regularMainSum = 0;
  let enhanceMainSum = 0;
  let regularDexSum = 0;
  let enhanceDexSum = 0;
  let extraDmgPct = 0;

  let baseCharCoeff = 3800;
  let baseCharDex = 920;

  const realSlots = ['arms', 'subArms', 'armor', 'head', 'face', 'back', 'hand', 'foot'];
  realSlots.forEach(sKey => {
    const it = state[sKey];
    if (!it) return;
    const isWpn = sKey === 'arms';
    const tier = it.tier || 'abyss';
    const enh = it.enhance !== undefined ? it.enhance : 10;
    const qKey = it.quality || 'standard';
    const abKey = it.ability || 'superior';
    const pfxKey = it.prefix || 'none';

    let tierMain = 80;
    let tierDex = 20;
    if (isWpn) {
      tierMain = tier === 'eclipse' ? 320 : (tier === 'aquilus' ? 180 : 240);
      tierDex = tier === 'eclipse' ? 55 : (tier === 'aquilus' ? 30 : 40);
    } else {
      tierMain = tier === 'eclipse' ? 130 : (tier === 'aquilus' ? 50 : 80);
      tierDex = tier === 'eclipse' ? 30 : (tier === 'aquilus' ? 15 : 20);
    }

    const qData = (typeof ENCHANT_TIER_TABLE !== 'undefined' && ENCHANT_TIER_TABLE[qKey]) || { mainBonus: 15, dexBonus: 10 };
    let qMain = it.customStat !== undefined ? Number(it.customStat) : (qData.mainBonus || 15);
    let qDex = it.customDex !== undefined ? Number(it.customDex) : (qData.dexBonus || 10);

    const pfxData = (typeof EQUIP_OPTIONS_DB !== 'undefined' && EQUIP_OPTIONS_DB.prefixes && EQUIP_OPTIONS_DB.prefixes[pfxKey]) || { statBonus: 0, dexBonus: 0, dmgBonus: 0 };
    const pfxMain = pfxData.statBonus || 0;
    const pfxDex = pfxData.dexBonus || 0;
    extraDmgPct += (pfxData.dmgBonus || 0);

    const abData = (typeof EQUIP_OPTIONS_DB !== 'undefined' && EQUIP_OPTIONS_DB.abilities && EQUIP_OPTIONS_DB.abilities[abKey]) || { stat: 25, dex: 12, dmg: 3 };
    const abMain = abData.stat || 0;
    const abDex = abData.dex || 0;
    extraDmgPct += (abData.dmg || 0);

    let optDmg = 0;
    let optAcc = 0;
    if (it.opt1 || it.opt2 || it.opt3) {
      [it.opt1, it.opt2, it.opt3].forEach(opt => {
        if (!opt) return;
        if (opt.type === 'dmg' || opt.type === 'boss_dmg' || opt.type === 'crit_dmg') optDmg += Number(opt.val) || 0;
        else if (opt.type === 'dex_acc' || opt.type === 'acc') optAcc += Number(opt.val) || 0;
        else if (opt.type === 'main_stat') qMain += Number(opt.val) || 0;
      });
    } else {
      optDmg = Number(it.optDmg) || 0;
      optAcc = Number(it.optAcc) || 0;
    }
    extraDmgPct += optDmg;

    const enhTable = isWpn 
      ? (typeof ENHANCE_STAT_TABLE !== 'undefined' ? ENHANCE_STAT_TABLE.weapon : null)
      : (typeof ENHANCE_STAT_TABLE !== 'undefined' ? ENHANCE_STAT_TABLE.armor : null);
    const enhData = (enhTable && enhTable[enh]) || { stat: isWpn ? 64 : 45, dex: isWpn ? 18 : 10 };

    regularMainSum += (tierMain + qMain + pfxMain + abMain);
    regularDexSum += (tierDex + qDex + pfxDex + abDex + optAcc);
    enhanceMainSum += enhData.stat;
    enhanceDexSum += enhData.dex;
  });

  const cuff = state['showSubArms'];
  if (cuff) {
    regularMainSum += (cuff.stat || 140);
    regularDexSum += (cuff.dex || 35);
  }

  const eff = state['effect'];
  if (eff) {
    regularMainSum += (eff.stat || 60);
    regularDexSum += (eff.dex || 35);
  }

  const art = state['artifact'];
  if (art) {
    regularMainSum += (art.stat || 75);
    regularDexSum += (art.dex || 25);
  }

  ['relicRight', 'relicLeft'].forEach(rKey => {
    const r = state[rKey];
    if (r) {
      regularMainSum += (r.stat || 40);
      regularDexSum += (r.dex || 20);
    }
  });

  // Avatar 5-Set Effect (+10 all stats, +3 ms, +2000 HP)
  const avatarCount = countActiveAvatarPieces(state);
  const isAvatar5SetActive = avatarCount >= 5;
  if (isAvatar5SetActive) {
    regularMainSum += 10;
    regularDexSum += 10;
  }

  // TalesWeaver Official Formula: Regular stats x20.5 + 0~12 Enhancement stats x32.5
  const regularCoeff = Math.round(regularMainSum * 20.5);
  const enhanceCoeff = Math.round(enhanceMainSum * 32.5);
  const totalCoeff = baseCharCoeff + regularCoeff + enhanceCoeff;
  const totalDex = baseCharDex + regularDexSum + enhanceDexSum;

  return {
    regularMainSum,
    enhanceMainSum,
    regularCoeff,
    enhanceCoeff,
    totalCoeff,
    totalDex,
    extraDmgPct,
    avatarCount,
    isAvatar5SetActive
  };
}

function updateDualEquipWindowDiff() {
  const asIsMetrics = calculateEquipStateMetrics(asIsEquipState);
  const toBeMetrics = calculateEquipStateMetrics(toBeEquipState);

  const monsterSel = document.getElementById('combat-monster-select');
  const skillSel = document.getElementById('combat-skill-select');
  const monsterId = monsterSel ? monsterSel.value : 'mob_apple';
  const target = (typeof TARGET_MONSTERS_DATA !== 'undefined' ? TARGET_MONSTERS_DATA.find(m => m.id === monsterId) : null) || {
    name: "사과의 섬 숲 경비 몬스터",
    dungeon: "사과의 섬 (Lv.300)",
    hp: 45000000,
    pdef: 2400,
    mdef: 2400,
    eva: 1350,
    is1ShotTarget: true
  };

  const prof = typeof getActiveCoeffProfile === 'function' ? getActiveCoeffProfile() : null;
  const typeKey = (prof && prof.type) || 'stab';
  const skills = (typeof CHARACTER_SKILLS_DATA !== 'undefined' && CHARACTER_SKILLS_DATA[typeKey]) ? CHARACTER_SKILLS_DATA[typeKey] : [];
  const skillId = skillSel ? skillSel.value : null;
  const skill = skills.find(s => s.id === skillId) || skills[0] || { name: "주력 스킬", hits: 10, mult: 2000 };

  const isCrit = document.getElementById('combat-crit-chk') ? document.getElementById('combat-crit-chk').checked : true;
  const isThirdSien = document.getElementById('combat-third-sien-chk') ? document.getElementById('combat-third-sien-chk').checked : false;
  const isPetConc = document.getElementById('combat-pet-conc-chk') ? document.getElementById('combat-pet-conc-chk').checked : true;
  const dopingBuffPct = (prof && prof.applyDoping) ? 30 : 0;

  const asIsCombat = calculateCombatMetricsHelper(
    asIsMetrics.totalCoeff, asIsMetrics.totalDex, target, skill,
    isCrit, isThirdSien, isPetConc, dopingBuffPct, typeKey, asIsMetrics.extraDmgPct
  );
  const toBeCombat = calculateCombatMetricsHelper(
    toBeMetrics.totalCoeff, toBeMetrics.totalDex, target, skill,
    isCrit, isThirdSien, isPetConc, dopingBuffPct, typeKey, toBeMetrics.extraDmgPct
  );

  const hitDmgDiff = toBeCombat.hitDmg - asIsCombat.hitDmg;
  const hitDmgPct = asIsCombat.hitDmg > 0 ? ((hitDmgDiff / asIsCombat.hitDmg) * 100).toFixed(1) : '0';
  const totalDmgDiff = toBeCombat.totalDmg - asIsCombat.totalDmg;
  const hitRateDiff = toBeCombat.hitRate - asIsCombat.hitRate;
  const coeffDiff = toBeMetrics.totalCoeff - asIsMetrics.totalCoeff;
  const dexDiff = toBeMetrics.totalDex - asIsMetrics.totalDex;

  const changedSlots = [];
  const slotNameMap = {
    arms: "무기", subArms: "서브", showSubArms: "라이도 커프",
    armor: "갑옷", head: "투구", face: "아뮬렛",
    back: "날개", hand: "건틀렛", foot: "부츠",
    effect: "효과", artifact: "아티팩트", relicRight: "신조 렐릭", relicLeft: "태양 렐릭",
    showHead: "아바타 투구", showArmor: "아바타 의상", showFace: "아바타 얼굴",
    showBack: "아바타 날개", showFoot: "아바타 발자국", showEffect: "아바타 마법진", showArms: "아바타 무기"
  };
  Object.keys(slotNameMap).forEach(k => {
    if (isSlotUpgraded(k)) {
      const tb = toBeEquipState[k];
      if (tb) {
        changedSlots.push(`<b>${slotNameMap[k]}</b>: ${tb.name || tb.tier}`);
      }
    }
  });

  let killText = "";
  if (!asIsCombat.is1Shot && toBeCombat.is1Shot) {
    killText = `<span class="specup-diff-pill success">🎉 1방 컷 달성 (원샷 원킬)!</span>`;
  } else if (asIsCombat.shotsNeeded > toBeCombat.shotsNeeded) {
    killText = `<span class="specup-diff-pill success">스킬 시전 ${asIsCombat.shotsNeeded}회 ➔ ${toBeCombat.shotsNeeded}회 단축</span>`;
  } else {
    killText = `<span class="specup-diff-pill info">오버킬 극대화</span>`;
  }

  const centerDiffEl = document.getElementById('tw-center-diff-content');
  if (centerDiffEl) {
    centerDiffEl.innerHTML = `
      <div class="specup-highlight-banner" style="margin:0;">
        <div style="font-size:1.05rem; font-weight:800; color:#fde68a; margin-bottom:0.35rem; display:flex; justify-content:space-between; align-items:center;">
          <span>⚡ [실시간 전투력 & 스펙업 변화]</span>
          <span style="font-size:0.75rem; color:#94a3b8;">${target.name} 대상</span>
        </div>

        <div class="specup-diff-main-row" style="margin-bottom:0.75rem;">
          <div class="specup-diff-kpi">
            <span class="lbl">타당 대미지 변화</span>
            <span class="val" style="color:#6ee7b7;">
              ${hitDmgDiff >= 0 ? '+' : ''}${hitDmgDiff.toLocaleString()}
              <small style="font-size:0.74rem; color:#fde68a;">(${hitDmgDiff >= 0 ? '+' : ''}${hitDmgPct}%)</small>
            </span>
          </div>
          <div class="specup-diff-kpi">
            <span class="lbl">스킬 1회 총 대미지</span>
            <span class="val" style="color:#f472b6;">
              ${totalDmgDiff >= 0 ? '+' : ''}${totalDmgDiff.toLocaleString()}
            </span>
          </div>
          <div class="specup-diff-kpi">
            <span class="lbl">보스 명중 적중률</span>
            <span class="val" style="color:${hitRateDiff > 0 ? '#34d399' : '#38bdf8'};">
              ${hitRateDiff > 0 ? `+${hitRateDiff}%p 올힛 상승` : `${toBeCombat.hitRate}% 유지`}
            </span>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:0.4rem; flex-wrap:wrap; margin-bottom:0.75rem;">
          <span class="specup-diff-pill">계수 ${coeffDiff >= 0 ? '+' : ''}${coeffDiff.toLocaleString()}</span>
          <span class="specup-diff-pill">DEX ${dexDiff >= 0 ? '+' : ''}${dexDiff}</span>
          ${toBeMetrics.isAvatar5SetActive ? '<span class="specup-diff-pill gold">⭐ 아바타 5세트 ON (+10스탯)</span>' : ''}
          ${killText}
        </div>

        <!-- Comparative Quick Table -->
        <div style="background:#1e293b; border:1px solid #334155; border-radius:6px; padding:0.6rem 0.8rem; font-size:0.78rem;">
          <div style="display:flex; justify-content:space-between; border-bottom:1px solid #334155; padding-bottom:0.3rem; margin-bottom:0.3rem; font-weight:800;">
            <span style="color:#94a3b8;">지표 항목</span>
            <span style="color:#38bdf8;">[As-Is] 현재</span>
            <span style="color:#fde68a;">➔ [To-Be] 변경 후</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:2px 0;">
            <span style="color:#cbd5e1;">종합 계수:</span>
            <span style="color:#94a3b8;">${asIsMetrics.totalCoeff.toLocaleString()}</span>
            <span style="color:#fde68a; font-weight:700;">${toBeMetrics.totalCoeff.toLocaleString()}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:2px 0;">
            <span style="color:#cbd5e1;">최종 DEX (명중):</span>
            <span style="color:#94a3b8;">${asIsMetrics.totalDex}</span>
            <span style="color:#facc15; font-weight:700;">${toBeMetrics.totalDex}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:2px 0;">
            <span style="color:#cbd5e1;">타당 실대미지:</span>
            <span style="color:#94a3b8;">${asIsCombat.hitDmg.toLocaleString()}</span>
            <span style="color:#34d399; font-weight:800;">${toBeCombat.hitDmg.toLocaleString()}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:2px 0;">
            <span style="color:#cbd5e1;">보스 처치 소요:</span>
            <span style="color:${asIsCombat.is1Shot ? '#34d399' : '#f87171'};">${asIsCombat.is1Shot ? '1방 컷' : `스킬 ${asIsCombat.shotsNeeded}회`}</span>
            <span style="color:${toBeCombat.is1Shot ? '#34d399' : '#fde68a'}; font-weight:800;">${toBeCombat.is1Shot ? '🎉 1방 컷 달성!' : `스킬 ${toBeCombat.shotsNeeded}회`}</span>
          </div>
        </div>

        <!-- Changed Slots Pill List -->
        <div style="margin-top:0.6rem; padding-top:0.5rem; border-top:1px dashed #334155; font-size:0.75rem;">
          <div style="color:#94a3b8; font-weight:700; margin-bottom:0.3rem;">
            🎯 교체 튜닝된 장비 및 아바타 (${changedSlots.length}부위):
          </div>
          ${changedSlots.length > 0 
            ? `<div style="display:flex; gap:0.35rem; flex-wrap:wrap;">${changedSlots.map(s => `<span class="specup-badge-pill gold" style="font-size:0.72rem;">${s}</span>`).join('')}</div>`
            : `<span style="color:#64748b; font-style:italic;">오른쪽 [To-Be] 장비창의 슬롯을 클릭하여 다음 장비(예: 11강 이클립스) 또는 아바타를 바꿔보세요!</span>`
          }
        </div>
      </div>
    `;
  }

  const adviceEl = document.getElementById('tw-senior-advice-box');
  if (adviceEl) {
    let adviceTitle = "선배 모험가의 실전 가성비 조언";
    let adviceContent = "";

    if (isSlotUpgraded('arms')) {
      adviceContent = "무기 강화는 공식 계수 <b>x32.5</b>가 적용되어 10강(+64, 계수 +2,080) 및 11강(+102, 계수 +3,315) 업그레이드 시 타당 대미지 상한선을 확실하게 뚫어냅니다.";
    } else if (isSlotUpgraded('showHead') || isSlotUpgraded('showArmor') || isSlotUpgraded('showFace') || isSlotUpgraded('showBack') || isSlotUpgraded('showFoot') || isSlotUpgraded('showEffect')) {
      if (toBeMetrics.isAvatar5SetActive) {
        adviceContent = "축하합니다! <b>화려한 아바타 5세트</b>를 활성화하여 전 능력치 <b>올스탯 +10, 이동속도 +3, HP +2000</b> 세트 효과가 전투 계수에 실시간 반영되었습니다!";
      } else {
        adviceContent = "화려한 아바타 부위를 5개 이상 활성화하면 테일즈위버 공식 5세트 효과(<b>올스탯 +10, 이동속도 +3, HP +2000</b>)가 추가 발동됩니다.";
      }
    } else if (isSlotUpgraded('back') || isSlotUpgraded('artifact')) {
      adviceContent = "날개와 아티팩트는 이클립스 3신기의 핵심으로, 기본 마방과 계수 상승폭이 매우 커 가장 1순위로 추천되는 고효율 부위입니다.";
    } else if (isSlotUpgraded('showSubArms')) {
      adviceContent = "라이도 심볼릭 커프(발굴지 140작)는 시드 소모 없이 1~2주 파밍만으로 대미지와 명중을 대폭 챙길 수 있는 필수 가성비 부위입니다.";
    } else {
      adviceContent = "현재 세팅은 테일즈위버 실전 표준 국템(어비스 10강 국민작) 기준이며, 어비스 코어마스터 파티 진입 및 주간 7억 시드 파밍이 안정적으로 가능합니다.";
    }

    adviceEl.innerHTML = `
      <div class="senior-advice-card">
        <div class="senior-advice-header">
          <span class="icon">🧙‍♂️</span>
          <span class="title">${adviceTitle}</span>
        </div>
        <div class="senior-advice-body">
          ${adviceContent}
        </div>
      </div>
    `;
  }
}

function resetToBeToAsIs() {
  toBeEquipState = JSON.parse(JSON.stringify(asIsEquipState));
  renderInGameEquipWindow('tobe', toBeEquipState, true);
  updateDualEquipWindowDiff();
  alert("To-Be 템창이 현재 [As-Is] 장비 상태와 동일하게 복구되었습니다.");
}

function applyKoreanStandardToToBe() {
  const realSlots = ['arms', 'subArms', 'armor', 'head', 'face', 'back', 'hand', 'foot'];
  realSlots.forEach(k => {
    if (toBeEquipState[k]) {
      toBeEquipState[k].tier = 'abyss';
      toBeEquipState[k].enhance = 10;
      toBeEquipState[k].quality = 'standard';
      toBeEquipState[k].ability = 'superior';
      toBeEquipState[k].optDmg = k === 'arms' ? 3 : 0;
      toBeEquipState[k].optAcc = 15;
      toBeEquipState[k].optElem = 10;
      const sMap = { arms: "무기", subArms: "리스트", armor: "로브", head: "헬름", face: "아뮬렛", back: "윙", hand: "건틀렛", foot: "부츠" };
      toBeEquipState[k].name = `+10 어비스 ${sMap[k] || '장비'}`;
    }
  });
  if (toBeEquipState['showSubArms']) {
    toBeEquipState['showSubArms'].stat = 140;
    toBeEquipState['showSubArms'].dex = 35;
    toBeEquipState['showSubArms'].name = "라이도 심볼릭 커프 (140)";
  }
  if (toBeEquipState['effect']) {
    toBeEquipState['effect'].stat = 60;
    toBeEquipState['effect'].dex = 35;
    toBeEquipState['effect'].name = "[넥슨30주년] 빛나는 효과 (60마방)";
  }
  renderInGameEquipWindow('tobe', toBeEquipState, true);
  updateDualEquipWindowDiff();
  alert("To-Be 템창에 10강 국민작 실전 국템 표준 세팅이 일괄 적용되었습니다!");
}

function saveToBeToProfile() {
  const p = typeof profiles !== 'undefined' ? profiles.find(x => x.id === currentProfileId) : null;
  if (!p) return;
  p.twEquipState = JSON.parse(JSON.stringify(toBeEquipState));
  asIsEquipState = JSON.parse(JSON.stringify(toBeEquipState));
  p.gearPreset = 'custom';
  if (typeof calculateEquipStateMetrics === 'function') {
    const m = calculateEquipStateMetrics(p.twEquipState);
    p.totalCoeff = m.totalCoeff;
    p.totalDex = m.totalDex;
  }
  try {
    localStorage.setItem('tw_companion_profiles_v3', JSON.stringify(profiles));
    renderInGameEquipWindow('asis', asIsEquipState, false);
    renderInGameEquipWindow('tobe', toBeEquipState, true);
    updateDualEquipWindowDiff();
    renderProfileSelect();
    alert(`'${p.name}' 캐릭터 프로필에 To-Be 템창 세팅이 영구 저장되었으며, 현재 [As-Is] 장비로 확정되었습니다!\n상단 [✏️ 프로필 설정]의 [착용 장비] 탭에서도 12부위 상세 정보를 실시간으로 확인하실 수 있습니다.`);
  } catch (e) {}
}

function initSpecupComparator() {
  const curSel = document.getElementById('specup-cur-gear-select');
  const curPartSel = document.getElementById('specup-part-cur-gear-select');
  const recSel = document.getElementById('specup-rec-gear-select');

  if (curSel && typeof CURRENT_GEAR_PRESETS !== 'undefined') {
    const opts = CURRENT_GEAR_PRESETS.map(p => 
      `<option value="${p.id}">${p.name}</option>`
    ).join('');
    curSel.innerHTML = opts;
    if (curPartSel) curPartSel.innerHTML = opts;
  }

  if (recSel && typeof EQUIP_UPGRADE_RECOMMENDATIONS !== 'undefined') {
    recSel.innerHTML = EQUIP_UPGRADE_RECOMMENDATIONS.map(r => 
      `<option value="${r.id}">${r.name}</option>`
    ).join('');
  }

  if (curSel) curSel.addEventListener('change', updateSpecupComparison);
  if (curPartSel) curPartSel.addEventListener('change', (e) => {
    if (curSel) curSel.value = e.target.value;
    updateSpecupComparison();
  });
  if (recSel) recSel.addEventListener('change', updateSpecupComparison);

  // Cross-bind with combat test bench controls
  const combatInputs = [
    'combat-monster-select', 'combat-skill-select',
    'combat-crit-chk', 'combat-third-sien-chk', 'combat-pet-conc-chk'
  ];
  combatInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => {
      if (specupCompareMode === 'equip_window') {
        updateDualEquipWindowDiff();
      } else {
        updateSpecupComparison();
      }
    });
  });

  // Init custom sliders and inputs
  calculateSlotStatBreakdown();
  renderSlotEfficiencyRankingTable();
  initInGameEquipWindows();
  switchComparatorMode('equip_window', document.querySelector('.specup-mode-tab[data-mode="equip_window"]'));
}

function switchComparatorMode(mode, btnEl) {
  specupCompareMode = mode;
  document.querySelectorAll('.specup-mode-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const dualGrid = document.getElementById('specup-tw-dual-grid');
  const bundleCtrl = document.getElementById('specup-bundle-controls');
  const partCtrl = document.getElementById('specup-part-controls');
  const rankingPanel = document.getElementById('specup-ranking-panel');
  const compareGrid = document.querySelector('.specup-compare-grid');
  const adviceCard = document.getElementById('specup-advice-card');

  if (mode === 'equip_window') {
    if (dualGrid) dualGrid.style.display = 'grid';
    if (bundleCtrl) bundleCtrl.style.display = 'none';
    if (partCtrl) partCtrl.style.display = 'none';
    if (rankingPanel) rankingPanel.style.display = 'none';
    if (compareGrid) compareGrid.style.display = 'none';
    if (adviceCard) adviceCard.style.display = 'none';
    renderInGameEquipWindow('asis', asIsEquipState, false);
    renderInGameEquipWindow('tobe', toBeEquipState, true);
    updateDualEquipWindowDiff();
    return;
  }

  if (dualGrid) dualGrid.style.display = 'none';

  if (mode === 'bundle') {
    if (bundleCtrl) bundleCtrl.style.display = 'flex';
    if (partCtrl) partCtrl.style.display = 'none';
    if (rankingPanel) rankingPanel.style.display = 'none';
    if (compareGrid) compareGrid.style.display = 'grid';
    if (adviceCard) adviceCard.style.display = 'block';
  } else if (mode === 'part') {
    if (bundleCtrl) bundleCtrl.style.display = 'none';
    if (partCtrl) partCtrl.style.display = 'block';
    if (rankingPanel) rankingPanel.style.display = 'none';
    if (compareGrid) compareGrid.style.display = 'grid';
    if (adviceCard) adviceCard.style.display = 'block';
  } else if (mode === 'ranking') {
    if (bundleCtrl) bundleCtrl.style.display = 'none';
    if (partCtrl) partCtrl.style.display = 'none';
    if (rankingPanel) rankingPanel.style.display = 'block';
    if (compareGrid) compareGrid.style.display = 'none';
    if (adviceCard) adviceCard.style.display = 'none';
    renderSlotEfficiencyRankingTable();
  }

  updateSpecupComparison();
}

function selectComparatorSlot(slotKey, btnEl) {
  activeSlotKey = slotKey;
  document.querySelectorAll('.specup-slot-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  calculateSlotStatBreakdown();
  updateSpecupComparison();
}

function selectComparatorEnhance(level, btnEl) {
  customEnhanceLevel = parseInt(level, 10) || 0;
  document.querySelectorAll('.specup-enhance-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  calculateSlotStatBreakdown();
  updateSpecupComparison();
}

function selectComparatorQuality(qualityKey, btnEl) {
  activeQualityKey = qualityKey;
  document.querySelectorAll('.specup-quality-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  calculateSlotStatBreakdown();
  updateSpecupComparison();
}

function selectComparatorAbility(abilityKey, btnEl) {
  customAbilityKey = abilityKey;
  document.querySelectorAll('#specup-ability-chips .specup-chip-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  calculateSlotStatBreakdown();
  updateSpecupComparison();
}

function selectComparatorRandomOpt(type, val, btnEl) {
  customRandomOpts[type] = Number(val) || 0;
  const chipContainer = document.getElementById(`specup-opt-${type}-chips`);
  if (chipContainer) {
    chipContainer.querySelectorAll('.specup-chip-btn').forEach(b => b.classList.remove('active'));
  }
  if (btnEl) btnEl.classList.add('active');

  calculateSlotStatBreakdown();
  updateSpecupComparison();
}

function calculateSlotStatBreakdown() {
  const isWeapon = activeSlotKey === 'weapon';
  const enhTable = isWeapon 
    ? (typeof ENHANCE_STAT_TABLE !== 'undefined' ? ENHANCE_STAT_TABLE.weapon : null)
    : (typeof ENHANCE_STAT_TABLE !== 'undefined' ? ENHANCE_STAT_TABLE.armor : null);
  const enhData = (enhTable && enhTable[customEnhanceLevel]) || { stat: isWeapon ? 64 : 45, dex: isWeapon ? 18 : 10 };
  
  const encData = (typeof ENCHANT_TIER_TABLE !== 'undefined' && ENCHANT_TIER_TABLE[activeQualityKey]) 
    || { mainBonus: 15, dexBonus: 10, name: "국민작" };
  
  const slot = (typeof SLOT_UPGRADE_DATA !== 'undefined' && SLOT_UPGRADE_DATA[activeSlotKey]) 
    || { slotName: "장비", mainStatGain: 60, dexGain: 20 };
  const baseMain = slot.mainStatGain || 60;
  const baseDex = slot.dexGain || 20;

  const abilData = (typeof EQUIP_OPTIONS_DB !== 'undefined' && EQUIP_OPTIONS_DB.abilities[customAbilityKey]) 
    || { stat: 25, dex: 12, dmg: 3, name: "최상급 (+3%)" };
  
  const optDmg = Number(customRandomOpts.dmg) || 0;
  const optAcc = Number(customRandomOpts.acc) || 0;
  const optElem = Number(customRandomOpts.elem) || 0;

  // Regular equipment stats subject to 20.5 coefficient
  const regularMain = baseMain + encData.mainBonus + abilData.stat;
  const regularCoeff = Math.round(regularMain * 20.5);

  // 0~11 Enhancement stats subject to 32.5 coefficient multiplier (official TalesWeaver formula)
  const enhanceMain = enhData.stat;
  const enhanceCoeff = Math.round(enhanceMain * 32.5);

  const totalMain = regularMain + enhanceMain;
  const totalDex = baseDex + encData.dexBonus + enhData.dex + abilData.dex + optAcc;
  const totalCoeffGain = regularCoeff + enhanceCoeff;

  customStatBonus.main = totalMain;
  customStatBonus.dex = totalDex;

  // Update inputs and sliders
  const sMain = document.getElementById('specup-stat-slider-main');
  const iMain = document.getElementById('specup-stat-input-main');
  const sDex = document.getElementById('specup-stat-slider-dex');
  const iDex = document.getElementById('specup-stat-input-dex');
  if (sMain) sMain.value = totalMain;
  if (iMain) iMain.value = totalMain;
  if (sDex) sDex.value = totalDex;
  if (iDex) iDex.value = totalDex;

  // Update summary badge
  const enhBadge = document.getElementById('specup-enhance-summary-badge');
  if (enhBadge) {
    enhBadge.textContent = `${customEnhanceLevel}강 (+${enhanceMain}, DEX +${enhData.dex}, 계수 x32.5)`;
  }

  // Render Formula Breakdown Card
  const breakdownCard = document.getElementById('specup-breakdown-card');
  if (breakdownCard) {
    breakdownCard.innerHTML = `
      <div class="breakdown-header">
        <div class="breakdown-title">
          <span>📐 테일즈위버 공식 스탯 & 계수 기여도 정밀 분해</span>
        </div>
        <div class="breakdown-total-kpi">
          총합 계수 가산: <span style="color:#38bdf8;">+${totalCoeffGain.toLocaleString()}</span> (주스탯 +${totalMain} · DEX +${totalDex})
        </div>
      </div>
      <div class="breakdown-formula-flow">
        <span class="breakdown-badge">
          베이스+인챈트 <b>+${baseMain + encData.mainBonus}</b> (x20.5 = +${Math.round((baseMain + encData.mainBonus) * 20.5).toLocaleString()})
        </span>
        <span>+</span>
        <span class="breakdown-badge enhance">
          🔨 <b>${customEnhanceLevel}강 강화</b> +${enhanceMain} (x32.5 = <b>+${enhanceCoeff.toLocaleString()}</b>)
        </span>
        <span>+</span>
        <span class="breakdown-badge option">
          🔮 부가옵: <b>어빌 딜+${abilData.dmg}%</b>, <b>1옵 딜+${optDmg}%</b>, <b>2옵 명중+${optAcc}</b>, <b>3옵 속성+${optElem}</b>
        </span>
      </div>
      <div class="breakdown-note">
        ※ <b>공식 반영:</b> 강화 스탯은 장비 기본치(x20.5)보다 높은 <b>32.5배 가중치</b>가 적용되며, 10강 국템 기준 무기 +64(계수 +2,080), 방어구 +45(계수 +1,462.5)가 정밀 가산됩니다.
      </div>
    `;
  }

  return {
    regularMain,
    regularCoeff,
    enhanceMain,
    enhanceCoeff,
    totalMain,
    totalDex,
    totalCoeffGain,
    optDmg: abilData.dmg + optDmg,
    optAcc,
    optElem
  };
}

function resetComparatorToProfile() {
  const p = profiles.find(x => x.id === currentProfileId);
  if (p && p.gearBase && p.gearBase[activeSlotKey]) {
    const g = p.gearBase[activeSlotKey];
    customEnhanceLevel = g.enhance !== undefined ? g.enhance : 10;
    activeQualityKey = g.quality || 'standard';
    customAbilityKey = g.ability || 'superior';
    customRandomOpts = {
      dmg: g.optDmg !== undefined ? g.optDmg : 3,
      acc: g.optAcc !== undefined ? g.optAcc : 15,
      elem: g.optElem !== undefined ? g.optElem : 10
    };
  } else {
    customEnhanceLevel = 10;
    activeQualityKey = 'standard';
    customAbilityKey = 'superior';
    customRandomOpts = { dmg: 3, acc: 15, elem: 10 };
  }
  syncComparatorControlUI();
  calculateSlotStatBreakdown();
  updateSpecupComparison();
  alert(`'${p ? p.name : '내 캐릭터'}' 프로필의 ${activeSlotKey} 세팅값으로 복구되었습니다.`);
}

function applyStandardTemplateToComparator() {
  customEnhanceLevel = 10;
  activeQualityKey = 'standard';
  customAbilityKey = 'superior';
  customRandomOpts = { dmg: 3, acc: 15, elem: 10 };
  syncComparatorControlUI();
  calculateSlotStatBreakdown();
  updateSpecupComparison();
}

function saveComparatorGearToProfile() {
  const p = profiles.find(x => x.id === currentProfileId);
  if (!p) return;
  if (!p.gearBase) p.gearBase = {};
  p.gearBase[activeSlotKey] = {
    enhance: customEnhanceLevel,
    quality: activeQualityKey,
    ability: customAbilityKey,
    optDmg: customRandomOpts.dmg,
    optAcc: customRandomOpts.acc,
    optElem: customRandomOpts.elem,
    mainStat: customStatBonus.main,
    dex: customStatBonus.dex
  };
  try {
    localStorage.setItem('tw_companion_profiles_v3', JSON.stringify(profiles));
    alert(`'${p.name}' 프로필에 ${activeSlotKey} (${customEnhanceLevel}강 / ${activeQualityKey} / 국템) 세팅이 저장되었습니다!`);
  } catch (e) {}
}

function syncComparatorControlUI() {
  document.querySelectorAll('.specup-enhance-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.enhance, 10) === customEnhanceLevel);
  });
  document.querySelectorAll('.specup-quality-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.quality === activeQualityKey);
  });
  document.querySelectorAll('#specup-ability-chips .specup-chip-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === customAbilityKey);
  });
  document.querySelectorAll('#specup-opt-dmg-chips .specup-chip-btn').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.val) === customRandomOpts.dmg);
  });
  document.querySelectorAll('#specup-opt-acc-chips .specup-chip-btn').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.val) === customRandomOpts.acc);
  });
  document.querySelectorAll('#specup-opt-elem-chips .specup-chip-btn').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.val) === customRandomOpts.elem);
  });
}

function syncQualityStatsToSliders() {
  calculateSlotStatBreakdown();
}

function onCustomStatSliderChange(statType, val) {
  const numVal = parseInt(val, 10) || 0;
  customStatBonus[statType] = numVal;

  if (statType === 'main') {
    const s = document.getElementById('specup-stat-slider-main');
    const i = document.getElementById('specup-stat-input-main');
    if (s && s.value != numVal) s.value = numVal;
    if (i && i.value != numVal) i.value = numVal;
  } else if (statType === 'dex') {
    const s = document.getElementById('specup-stat-slider-dex');
    const i = document.getElementById('specup-stat-input-dex');
    if (s && s.value != numVal) s.value = numVal;
    if (i && i.value != numVal) i.value = numVal;
  }

  updateSpecupComparison();
}

function renderSlotEfficiencyRankingTable() {
  const tbody = document.getElementById('specup-ranking-tbody');
  if (!tbody || typeof SLOT_EFFICIENCY_RANKING === 'undefined') return;

  tbody.innerHTML = SLOT_EFFICIENCY_RANKING.map(r => `
    <tr>
      <td style="font-weight:800; color:#fde68a; text-align:center;">#${r.rank}</td>
      <td style="font-weight:700; color:#f8fafc;">${r.slot}</td>
      <td style="color:#6ee7b7; font-weight:700;">${r.gainDmg}</td>
      <td style="color:#facc15; font-weight:700;">${r.gainDex}</td>
      <td style="color:#38bdf8;">${r.cost}</td>
      <td><span class="specup-badge-pill gold">${r.roi}</span></td>
      <td style="color:#cbd5e1; font-size:0.8rem;">${r.note}</td>
    </tr>
  `).join('');
}

function calculateCombatMetricsHelper(coeff, dex, target, skill, isCrit, isThirdSien, isPetConc, dopingBuffPct, typeKey, extraDmgPct = 0) {
  const effDex = (Number(dex) || 1500) + (isPetConc ? 150 : 0);
  const dexDiff = effDex - target.eva;
  let hitRate = 100;
  let hitText = '100% 올힛';
  let hitColor = '#34d399';

  if (dexDiff >= 0) {
    hitRate = 100;
    hitText = '🟢 100% 올힛 (All-Hit)';
    hitColor = '#34d399';
  } else {
    hitRate = Math.max(5, Math.min(99, Math.round(100 + (dexDiff * 0.15))));
    if (hitRate >= 80) {
      hitText = `🟡 ${hitRate}% (부분 미스: -${100 - hitRate}%)`;
      hitColor = '#facc15';
    } else {
      hitText = `🔴 ${hitRate}% (MISS 심각: -${Math.abs(dexDiff)})`;
      hitColor = '#f87171';
    }
  }

  const effMult = (skill.mult || 2000) + (isThirdSien ? 200 : 0);
  const effHits = (skill.hits || 10) + (isThirdSien ? 1 : 0);
  const isMagical = (typeKey === 'magic_def' || typeKey === 'magic_atk' || typeKey === 'magic_slash');
  const targetDef = isMagical ? target.mdef : target.pdef;

  const rawHit = ((coeff * (effMult / 100) * (1 + dopingBuffPct / 100) * (1 + (extraDmgPct || 0) / 100) * 18) / effHits);
  let hitDmg = Math.max(1000, Math.round(rawHit - (targetDef * 12)));
  if (isCrit) {
    hitDmg = Math.round(hitDmg * 1.65);
  }
  const totalDmg = hitDmg * effHits;
  const is1Shot = totalDmg >= target.hp;
  const shotsNeeded = Math.ceil(target.hp / totalDmg);

  return {
    effDex,
    dexDiff,
    hitRate,
    hitText,
    hitColor,
    hitDmg,
    totalDmg,
    effHits,
    is1Shot,
    shotsNeeded
  };
}

function updateSpecupComparison() {
  if (specupCompareMode === 'ranking') {
    renderSlotEfficiencyRankingTable();
    return;
  }

  const curSel = specupCompareMode === 'part' 
    ? (document.getElementById('specup-part-cur-gear-select') || document.getElementById('specup-cur-gear-select'))
    : document.getElementById('specup-cur-gear-select');
  const recSel = document.getElementById('specup-rec-gear-select');
  if (!curSel) return;

  const curId = curSel.value || 'use_active';

  // Determine current baseline Coeff & DEX
  let curCoeff = lastCalculatedCoeff || 45200;
  let curDex = lastCalculatedDex || 1680;
  let curGearName = "⚡ 현재 계산기 세팅 장비";
  let curGearDesc = "상단 12부위 슬롯에 장착된 장비 및 도핑 실시간 연동";

  if (curId !== 'use_active' && typeof CURRENT_GEAR_PRESETS !== 'undefined') {
    const p = CURRENT_GEAR_PRESETS.find(x => x.id === curId);
    if (p) {
      curCoeff = p.baseCoeff;
      curDex = p.baseDex;
      curGearName = p.name;
      curGearDesc = p.desc;
    }
  }

  let recCoeff = curCoeff;
  let recDex = curDex;
  let recTitle = "";
  let recDesc = "";
  let recBadge = "";
  let recBadgeColor = "gold";
  let recTip = "";
  let recCostDesc = "";
  let extraDmgPct = 0;

  if (specupCompareMode === 'part') {
    const bd = calculateSlotStatBreakdown();
    recCoeff = curCoeff + bd.totalCoeffGain;
    recDex = curDex + bd.totalDex;
    extraDmgPct = bd.optDmg;

    const slot = (typeof SLOT_UPGRADE_DATA !== 'undefined' && SLOT_UPGRADE_DATA[activeSlotKey]) || { slotName: "장비" };
    const qName = activeQualityKey === 'limit' ? '👑 종결 한계작' : (activeQualityKey === 'budget' ? '📉 떡락작/노작' : '⚖️ 국민작 국템');
    recTitle = `${slot.slotName} ➔ ${customEnhanceLevel}강 ${qName}`;
    recDesc = `장비 강화: <b>${customEnhanceLevel}강</b> · 인챈트: <b>${activeQualityKey === 'limit' ? '한계작(+30)' : (activeQualityKey === 'budget' ? '떡작(+3)' : '국민작(+15)')}</b> · 어빌: <b>${customAbilityKey === 'superior' ? '최상급(+3%)' : (customAbilityKey === 'normal' ? '상급(+2%)' : '노어빌')}</b> · 부가옵(딜+${customRandomOpts.dmg}%, 명중+${customRandomOpts.acc}, 속성+${customRandomOpts.elem})`;
    recBadge = activeQualityKey === 'limit' ? '👑 종결 한계작' : (activeQualityKey === 'budget' ? '📉 떡락/노작' : '⚖️ 국민작 국템');
    recBadgeColor = activeQualityKey === 'limit' ? 'rose' : (activeQualityKey === 'budget' ? 'amber' : 'sky');
    recTip = `<b>[${customEnhanceLevel}강 ${qName} 특징]</b> 공식 계수 가산(+${bd.enhanceCoeff.toLocaleString()}) 및 인챈트/어빌/랜덤옵션 대미지 증폭 <b>+${bd.optDmg}%</b>가 적용되었습니다.<br>💡 <b>실전 가성비 팁:</b> 10강 국민작 국템은 모든 상위 던전 파티 권장 기준이며, 11강 한계작은 극딜 종결을 노릴 때 교체합니다.`;
    recCostDesc = activeQualityKey === 'limit' ? '예상 시세: <b>150~220억 Seed</b>' : (activeQualityKey === 'budget' ? '예상 시세: <b>15~30억 Seed</b>' : '예상 시세: <b>50~80억 Seed</b>');
  } else {
    const recId = recSel ? recSel.value : 'up_abyss_to_ecl3';
    const rec = (typeof EQUIP_UPGRADE_RECOMMENDATIONS !== 'undefined' ? EQUIP_UPGRADE_RECOMMENDATIONS.find(r => r.id === recId) : null) || {
      name: "추천 세팅",
      desc: "추천 세팅 설명",
      coeffGain: 12500,
      dexGain: 310,
      badge: "추천",
      badgeColor: "sky",
      tip: "가성비 우수",
      costDesc: "시드 파밍"
    };
    recCoeff = curCoeff + (rec.coeffGain || 0);
    recDex = curDex + (rec.dexGain || 0);
    recTitle = rec.name;
    recDesc = rec.desc;
    recBadge = rec.badge;
    recBadgeColor = rec.badgeColor;
    recTip = rec.tip;
    recCostDesc = rec.costDesc;
  }

  // Get active combat target and skill
  const monsterSel = document.getElementById('combat-monster-select');
  const skillSel = document.getElementById('combat-skill-select');
  const monsterId = monsterSel ? monsterSel.value : 'mob_apple';
  const target = (typeof TARGET_MONSTERS_DATA !== 'undefined' ? TARGET_MONSTERS_DATA.find(m => m.id === monsterId) : null) || {
    name: "사과의 섬 숲 경비 몬스터",
    dungeon: "사과의 섬 (Lv.300)",
    hp: 45000000,
    pdef: 2400,
    mdef: 2400,
    eva: 1350,
    is1ShotTarget: true
  };

  const prof = typeof getActiveCoeffProfile === 'function' ? getActiveCoeffProfile() : null;
  const typeKey = (prof && prof.type) || 'stab';
  const skills = (typeof CHARACTER_SKILLS_DATA !== 'undefined' && CHARACTER_SKILLS_DATA[typeKey]) ? CHARACTER_SKILLS_DATA[typeKey] : [];
  const skillId = skillSel ? skillSel.value : null;
  const skill = skills.find(s => s.id === skillId) || skills[0] || { name: "주력 스킬", hits: 10, mult: 2000 };

  const isCrit = document.getElementById('combat-crit-chk') ? document.getElementById('combat-crit-chk').checked : true;
  const isThirdSien = document.getElementById('combat-third-sien-chk') ? document.getElementById('combat-third-sien-chk').checked : false;
  const isPetConc = document.getElementById('combat-pet-conc-chk') ? document.getElementById('combat-pet-conc-chk').checked : true;
  const dopingBuffPct = (prof && prof.applyDoping) ? 30 : 0;

  // Compute metrics
  const curMetrics = calculateCombatMetricsHelper(curCoeff, curDex, target, skill, isCrit, isThirdSien, isPetConc, dopingBuffPct, typeKey, 0);
  const recMetrics = calculateCombatMetricsHelper(recCoeff, recDex, target, skill, isCrit, isThirdSien, isPetConc, dopingBuffPct, typeKey, extraDmgPct);

  // Compute Diffs
  const hitDmgDiff = recMetrics.hitDmg - curMetrics.hitDmg;
  const hitDmgDiffPct = curMetrics.hitDmg > 0 ? ((hitDmgDiff / curMetrics.hitDmg) * 100).toFixed(1) : '0';
  const totalDmgDiff = recMetrics.totalDmg - curMetrics.totalDmg;
  const hitRateDiff = recMetrics.hitRate - curMetrics.hitRate;
  const coeffDiff = recCoeff - curCoeff;
  const dexDiff = recDex - curDex;

  // Render Current Gear Card
  const curCardEl = document.getElementById('specup-cur-card');
  if (curCardEl) {
    curCardEl.innerHTML = `
      <div class="specup-compare-card current">
        <div class="specup-card-badge current">현재 장비 세팅</div>
        <div class="specup-card-title">${curGearName}</div>
        <div class="specup-card-desc">${curGearDesc}</div>
        
        <div class="specup-metric-grid">
          <div class="specup-metric-item">
            <span class="lbl">종합 계수</span>
            <span class="val">${curCoeff.toLocaleString()}</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">최종 DEX (명중)</span>
            <span class="val" style="color:#facc15;">${curDex.toLocaleString()}</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">타당 실대미지</span>
            <span class="val" style="color:#38bdf8;">${curMetrics.hitDmg.toLocaleString()}</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">스킬 1회 총 대미지</span>
            <span class="val" style="color:#ec4899;">${curMetrics.totalDmg.toLocaleString()}</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">🎯 보스 적중률</span>
            <span class="val" style="color:${curMetrics.hitColor};">${curMetrics.hitText}</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">⚡ 처치 소요</span>
            <span class="val" style="color:${curMetrics.is1Shot ? '#34d399' : '#f87171'};">
              ${curMetrics.is1Shot ? '🎉 1방 컷 (원샷)' : `스킬 ${curMetrics.shotsNeeded}회 시전 필요`}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  // Render Center Diff / Highlight Banner
  const diffBannerEl = document.getElementById('specup-diff-banner');
  if (diffBannerEl) {
    let killDiffText = "";
    if (!curMetrics.is1Shot && recMetrics.is1Shot) {
      killDiffText = `<span class="specup-diff-pill success">🎉 1방 컷 달성!</span>`;
    } else if (curMetrics.shotsNeeded > recMetrics.shotsNeeded) {
      killDiffText = `<span class="specup-diff-pill success">소요 스킬 ${curMetrics.shotsNeeded}회 ➔ ${recMetrics.shotsNeeded}회 단축</span>`;
    } else {
      killDiffText = `<span class="specup-diff-pill info">오버킬 극대화</span>`;
    }

    diffBannerEl.innerHTML = `
      <div class="specup-highlight-banner">
        <div style="font-size:1.1rem; font-weight:800; color:#fde68a; margin-bottom:0.25rem;">
          📈 업그레이드 시 기대 상승 효과
        </div>
        <div class="specup-diff-main-row">
          <div class="specup-diff-kpi">
            <span class="lbl">타당 대미지 증가</span>
            <span class="val">+${hitDmgDiff.toLocaleString()} <small style="font-size:0.75rem; color:#fde68a;">(+${hitDmgDiffPct}%)</small></span>
          </div>
          <div class="specup-diff-kpi">
            <span class="lbl">스킬 총합 대미지</span>
            <span class="val">+${totalDmgDiff.toLocaleString()}</span>
          </div>
          <div class="specup-diff-kpi">
            <span class="lbl">적중률(명중) 보정</span>
            <span class="val" style="color:${hitRateDiff > 0 ? '#34d399' : '#94a3b8'};">
              ${hitRateDiff > 0 ? `+${hitRateDiff}%p 올힛 상승` : '100% 유지'}
            </span>
          </div>
        </div>
        <div style="display:flex; justify-content:center; gap:0.5rem; flex-wrap:wrap; margin-top:0.4rem;">
          <span class="specup-diff-pill">계수 +${coeffDiff.toLocaleString()}</span>
          <span class="specup-diff-pill">DEX +${dexDiff}</span>
          ${killDiffText}
        </div>
      </div>
    `;
  }

  // Render Recommended Gear Card
  const recCardEl = document.getElementById('specup-rec-card');
  if (recCardEl) {
    recCardEl.innerHTML = `
      <div class="specup-compare-card recommended">
        <div class="specup-card-badge recommended">⭐ 추천 업그레이드 (${specupCompareMode === 'part' ? '부위별 세팅' : '로드맵'})</div>
        <div class="specup-card-title">${recTitle}</div>
        <div class="specup-card-desc">${recDesc}</div>
        
        <div class="specup-metric-grid">
          <div class="specup-metric-item">
            <span class="lbl">종합 계수</span>
            <span class="val" style="color:#fde68a;">${recCoeff.toLocaleString()} (+${coeffDiff.toLocaleString()})</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">최종 DEX (명중)</span>
            <span class="val" style="color:#facc15;">${recDex.toLocaleString()} (+${dexDiff})</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">타당 실대미지</span>
            <span class="val" style="color:#38bdf8;">${recMetrics.hitDmg.toLocaleString()} (+${hitDmgDiffPct}%)</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">스킬 1회 총 대미지</span>
            <span class="val" style="color:#ec4899;">${recMetrics.totalDmg.toLocaleString()}</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">🎯 보스 적중률</span>
            <span class="val" style="color:${recMetrics.hitColor};">${recMetrics.hitText}</span>
          </div>
          <div class="specup-metric-item">
            <span class="lbl">⚡ 처치 소요</span>
            <span class="val" style="color:${recMetrics.is1Shot ? '#34d399' : '#f87171'};">
              ${recMetrics.is1Shot ? '🎉 1방 컷 (원샷 달성!)' : `스킬 ${recMetrics.shotsNeeded}회 시전 필요`}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  // Render Advice & Cost Efficiency Box
  const adviceEl = document.getElementById('specup-advice-card');
  if (adviceEl) {
    adviceEl.innerHTML = `
      <div class="specup-advice-inner">
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem; flex-wrap:wrap;">
          <span class="specup-badge-pill ${recBadgeColor}">${recBadge}</span>
          <span style="font-weight:700; color:#f8fafc; font-size:0.95rem;">💡 선배 모험가의 실전 가성비 & 떡락/한계작 분석:</span>
        </div>
        <div style="font-size:0.86rem; color:#cbd5e1; line-height:1.6; margin-bottom:0.5rem;">
          ${recTip}
        </div>
        <div style="font-size:0.81rem; color:#94a3b8; border-top:1px dashed #334155; padding-top:0.4rem;">
          ⏱️ <b>소요 자금 및 파밍 효율:</b> ${recCostDesc}
        </div>
      </div>
    `;
  }
}

function jumpToSpecupComparator(prefillGearKey, prefillRecKey) {
  switchTab('tab-coeff', document.querySelector('.tab-btn[data-tab="tab-coeff"]'));
  if (prefillGearKey) {
    const curSel = document.getElementById('specup-cur-gear-select');
    if (curSel) curSel.value = prefillGearKey;
  }
  if (prefillRecKey) {
    const recSel = document.getElementById('specup-rec-gear-select');
    if (recSel) recSel.value = prefillRecKey;
  }
  updateSpecupComparison();
  const el = document.getElementById('equip-upgrade-comparator');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ==================== TAB 8: DEDICATED AVATAR SHOWROOM & DRESSROOM ====================
let showroomSelectedChar = 'nayatrei';
let showroomCurrentSlotTab = 'showArmor';
let showroomSearchQuery = '';
let showroomRoundFilter = '';
let showroomQuickFilter = '';
let showroomOutfit = null;

let equipViewState = {
  currentCharKey: 'nayatrei',
  currentAngleIndex: 0,
  angles: ["정면 (Isometric Front)", "우측면 (Right 45°)", "배면 (Back View)", "좌측면 (Left 45°)"],
  selectedItem: null
};

function initShowroom() {
  if (!showroomOutfit) {
    const cur = (typeof profiles !== 'undefined' && profiles.find(x => x.id === currentProfileId)) || (typeof profiles !== 'undefined' ? profiles[0] : null);
    showroomOutfit = JSON.parse(JSON.stringify(cur?.twEquipState || toBeEquipState || TW_DEFAULT_EQUIP_STATE));
    
    // Ensure default demo items from screenshot are pre-equipped if slots are empty
    if (!showroomOutfit.showArmor || showroomOutfit.showArmor.name.includes('미착용')) {
      showroomOutfit.showArmor = {
        key: 'showArmor',
        name: '벚꽃비 의복 - 환 (나야)',
        dur: '(100/100)',
        tier: 'avatar',
        isOn: true,
        round: '갑옷 확장'
      };
    }
    if (!showroomOutfit.showSubArms || showroomOutfit.showSubArms.name.includes('미착용')) {
      showroomOutfit.showSubArms = {
        key: 'showSubArms',
        name: '라이도 심볼릭 커프',
        dur: '(100/100)',
        tier: 'avatar',
        isOn: true,
        round: '월템'
      };
    }
  }
  
  // Set default inspected item in Equip View
  if (!equipViewState.selectedItem) {
    equipViewState.selectedItem = typeof TW_AVATAR_RESOURCES !== 'undefined' ? TW_AVATAR_RESOURCES.itemDetails['av_sakura_naya'] : null;
  }

  // Match showroomSelectedChar to current profile, defaulting to verified dot characters
  const validDotChars = ['nayatrei', 'boris', 'lucian', 'tichiel', 'mila', 'lanziee', 'sivelin', 'issac', 'anais'];
  const curProf = typeof profiles !== 'undefined' ? profiles.find(x => x.id === currentProfileId) : null;
  if (curProf && curProf.name) {
    const match = TW_CHARACTER_ROSTER.find(c => curProf.name.includes(c.name) || (curProf.charType && curProf.charType.includes(c.name)));
    if (match && validDotChars.includes(match.key)) {
      showroomSelectedChar = match.key;
      equipViewState.currentCharKey = match.key;
    } else {
      showroomSelectedChar = 'nayatrei';
      equipViewState.currentCharKey = 'nayatrei';
    }
  } else {
    showroomSelectedChar = 'nayatrei';
    equipViewState.currentCharKey = 'nayatrei';
  }
  equipViewState.currentAngleIndex = 0; // Always start Front!

  renderShowroomCharPills();
  
  // Populate round dropdown if empty
  const roundSel = document.getElementById('showroom-round-select');
  if (roundSel && roundSel.options.length <= 1 && typeof TW_AVATAR_DB !== 'undefined') {
    const rounds = TW_AVATAR_DB.getRounds();
    let opts = '<option value="">전체 회차 (1~83회차)</option>';
    rounds.forEach(r => {
      opts += `<option value="${r}">${r}</option>`;
    });
    roundSel.innerHTML = opts;
  }

  renderEquipView();
  renderInGameEquipSlots();
  renderShowroomWardrobeItems();
  if (typeof renderDyeStudio === 'function') renderDyeStudio();
}

function renderShowroomCharPills() {
  const container = document.getElementById('showroom-char-pills');
  if (!container) return;

  container.innerHTML = TW_CHARACTER_ROSTER.map(c => {
    const hasDot = typeof TW_AVATAR_RESOURCES !== 'undefined' && TW_AVATAR_RESOURCES.characterDots[c.key] && TW_AVATAR_RESOURCES.characterDots[c.key].dotImg.startsWith('assets/');
    const dotBadge = hasDot ? '<span style="font-size:0.58rem; background:#0284c7; color:#fff; padding:1px 3px; border-radius:3px; margin-left:3px;">도트</span>' : '';
    return `
      <button type="button" class="tw-char-pill ${showroomSelectedChar === c.key ? 'active' : ''}" onclick="selectShowroomChar('${c.key}')" title="${c.fullName} (${c.type})">
        <span>${c.icon}</span>
        <span>${c.name}</span>
        ${dotBadge}
      </button>
    `;
  }).join('');
}

function selectShowroomChar(charKey) {
  const validDotChars = ['nayatrei', 'boris', 'lucian', 'tichiel', 'mila', 'lanziee', 'sivelin', 'issac', 'anais'];
  if (!validDotChars.includes(charKey)) {
    const cObj = TW_CHARACTER_ROSTER.find(x => x.key === charKey);
    alert(`💡 '${cObj ? cObj.fullName : charKey}' 캐릭터의 도트 스프라이트는 현재 순차 추출 중입니다.\n현재 100% 투명 도트가 지원되는 9개 캐릭터(나야트레이, 보리스, 루시안, 티치엘, 밀라, 란지에, 시벨린, 이자크, 아나이스)를 우선 체험하실 수 있습니다.`);
    return;
  }
  showroomSelectedChar = charKey;
  equipViewState.currentCharKey = charKey;
  equipViewState.currentAngleIndex = 0; // Always reset to Front!

  // Check character default item
  if (typeof TW_AVATAR_RESOURCES !== 'undefined' && TW_AVATAR_RESOURCES.characterDots[charKey]) {
    const charDot = TW_AVATAR_RESOURCES.characterDots[charKey];
    if (charDot.defaultItem) {
      inspectEquipViewItem(charDot.defaultItem);
    }
  }

  renderShowroomCharPills();
  renderEquipView();
  renderInGameEquipSlots();
  if (typeof renderDyeStudio === 'function') renderDyeStudio();
}

// ============================================================================
// DYEING & PAPER-DOLL AVATAR SYSTEM
// ============================================================================
var currentShowroomSubMode = 'avatar'; // 'avatar' | 'dye'
var currentDyeState = {
  selectedPartKey: 'hair',
  dyes: {}, // { [charKey]: { [partKey]: hexColor } }
  stageEffects: {
    circle: true,
    title: true
  }
};
var twCachedCharImgs = {};

function switchShowroomSubMode(mode) {
  currentShowroomSubMode = mode;
  const btnAv = document.getElementById('tw-btn-mode-avatar');
  const btnDye = document.getElementById('tw-btn-mode-dye');
  const viewAv = document.getElementById('showroom-view-avatar');
  const viewDye = document.getElementById('showroom-view-dye');

  if (mode === 'avatar') {
    if (btnAv) { btnAv.classList.add('btn-primary', 'active'); btnAv.classList.remove('btn-outline'); }
    if (btnDye) { btnDye.classList.remove('btn-primary', 'active'); btnDye.classList.add('btn-outline'); }
    if (viewAv) viewAv.style.display = '';
    if (viewDye) viewDye.style.display = 'none';
  } else {
    if (btnAv) { btnAv.classList.remove('btn-primary', 'active'); btnAv.classList.add('btn-outline'); }
    if (btnDye) { btnDye.classList.add('btn-primary', 'active'); btnDye.classList.remove('btn-outline'); }
    if (viewAv) viewAv.style.display = 'none';
    if (viewDye) viewDye.style.display = '';
    renderDyeStudio();
  }
  renderEquipView();
}

function renderDyeStudio() {
  renderDyeParts();
  renderEltiboDyePalette();
  updateDyeCostSummary();
}

function renderDyeParts() {
  const container = document.getElementById('tw-dye-part-pills');
  const descEl = document.getElementById('dye-selected-part-desc');
  if (!container || typeof TW_DYE_DB === 'undefined') return;

  const parts = TW_DYE_DB.getDefaultParts(showroomSelectedChar);
  const charDyes = currentDyeState.dyes[showroomSelectedChar] || {};

  if (!parts.some(p => p.key === currentDyeState.selectedPartKey)) {
    currentDyeState.selectedPartKey = parts[0]?.key || 'hair';
  }

  const selectedPart = parts.find(p => p.key === currentDyeState.selectedPartKey);
  if (descEl && selectedPart) {
    descEl.textContent = selectedPart.desc || selectedPart.name;
  }

  container.innerHTML = parts.map(p => {
    const isSel = p.key === currentDyeState.selectedPartKey;
    const curColor = charDyes[p.key] || p.defaultHex;
    return `
      <button type="button" class="tw-dye-part-pill ${isSel ? 'active' : ''}" onclick="selectDyePart('${p.key}')">
        <span>${p.icon || '🎨'}</span>
        <span>${p.name}</span>
        <span class="tw-dye-color-dot" style="background:${curColor};"></span>
      </button>
    `;
  }).join('');
}

function selectDyePart(partKey) {
  currentDyeState.selectedPartKey = partKey;
  renderDyeParts();
  
  const charDyes = currentDyeState.dyes[showroomSelectedChar] || {};
  const parts = typeof TW_DYE_DB !== 'undefined' ? TW_DYE_DB.getDefaultParts(showroomSelectedChar) : [];
  const part = parts.find(p => p.key === partKey);
  const curColor = charDyes[partKey] || part?.defaultHex || '#FF7E00';
  syncRgbPickerUI(curColor);
}

function renderEltiboDyePalette() {
  const container = document.getElementById('tw-dye-palette-grid');
  if (!container || typeof TW_DYE_DB === 'undefined') return;

  const charDyes = currentDyeState.dyes[showroomSelectedChar] || {};
  const activeColor = charDyes[currentDyeState.selectedPartKey] || '';

  container.innerHTML = TW_DYE_DB.potions.map(pot => {
    const isAct = activeColor.toLowerCase() === pot.hex.toLowerCase();
    const badgeHtml = pot.badge ? `<span style="font-size:0.58rem; background:#0284c7; color:#fff; padding:0 3px; border-radius:2px; margin-left:auto;">${pot.badge}</span>` : '';
    return `
      <button type="button" class="tw-dye-color-btn ${isAct ? 'active' : ''}" onclick="applyPotionDye('${pot.id}')" title="${pot.name} (${pot.price} · ${pot.origin})">
        <span class="tw-dye-swatch" style="background:${pot.hex};"></span>
        <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${pot.name}</span>
        ${badgeHtml}
      </button>
    `;
  }).join('');
}

function applyPotionDye(potionId) {
  if (typeof TW_DYE_DB === 'undefined') return;
  const pot = TW_DYE_DB.potions.find(p => p.id === potionId);
  if (!pot) return;

  if (!currentDyeState.dyes[showroomSelectedChar]) {
    currentDyeState.dyes[showroomSelectedChar] = {};
  }
  currentDyeState.dyes[showroomSelectedChar][currentDyeState.selectedPartKey] = pot.hex;

  renderDyeParts();
  renderEltiboDyePalette();
  syncRgbPickerUI(pot.hex);
  updateDyeCostSummary();
  renderEquipView();
}

function onCustomColorPick(hex) {
  if (!currentDyeState.dyes[showroomSelectedChar]) {
    currentDyeState.dyes[showroomSelectedChar] = {};
  }
  currentDyeState.dyes[showroomSelectedChar][currentDyeState.selectedPartKey] = hex;

  syncRgbPickerUI(hex);
  renderDyeParts();
  renderEltiboDyePalette();
  updateDyeCostSummary();
  renderEquipView();
}

function syncRgbPickerUI(hex) {
  const picker = document.getElementById('dye-color-picker');
  const rInput = document.getElementById('dye-rgb-r');
  const gInput = document.getElementById('dye-rgb-g');
  const bInput = document.getElementById('dye-rgb-b');

  if (picker) picker.value = hex;
  const rgb = hexToRgb(hex);
  if (rgb) {
    if (rInput) rInput.value = rgb.r;
    if (gInput) gInput.value = rgb.g;
    if (bInput) bInput.value = rgb.b;
  }
}

function onRgbNumberInput() {
  const r = parseInt(document.getElementById('dye-rgb-r')?.value || '0', 10);
  const g = parseInt(document.getElementById('dye-rgb-g')?.value || '0', 10);
  const b = parseInt(document.getElementById('dye-rgb-b')?.value || '0', 10);
  const hex = rgbToHex(Math.min(255, Math.max(0, r)), Math.min(255, Math.max(0, g)), Math.min(255, Math.max(0, b)));
  
  const picker = document.getElementById('dye-color-picker');
  if (picker) picker.value = hex;
}

function applyCustomRgbDye() {
  const picker = document.getElementById('dye-color-picker');
  if (picker) onCustomColorPick(picker.value);
}

function resetAllDyes() {
  if (currentDyeState.dyes[showroomSelectedChar]) {
    delete currentDyeState.dyes[showroomSelectedChar];
  }
  renderDyeParts();
  renderEltiboDyePalette();
  updateDyeCostSummary();
  renderEquipView();
}

function updateDyeCostSummary() {
  const costEl = document.getElementById('dye-total-cost-text');
  if (!costEl) return;
  const charDyes = currentDyeState.dyes[showroomSelectedChar] || {};
  const count = Object.keys(charDyes).length;
  const costSeed = count * 15000000;
  costEl.textContent = count > 0 ? `${costSeed.toLocaleString()} SEED (${count}개 부위 염색)` : '0 SEED (기본 색상)';
}

function hexToRgb(hex) {
  if (!hex) return null;
  const c = hex.replace('#', '');
  if (c.length === 6) {
    return {
      r: parseInt(c.substring(0, 2), 16),
      g: parseInt(c.substring(2, 4), 16),
      b: parseInt(c.substring(4, 6), 16)
    };
  }
  return null;
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const s = x.toString(16);
    return s.length === 1 ? '0' + s : s;
  }).join('').toUpperCase();
}

function downloadCurrentPaperDollPNG() {
  const charImg = document.getElementById('pd-char-img');
  if (!charImg) return;

  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = 160;
  exportCanvas.height = 200;
  const ctx = exportCanvas.getContext('2d');

  ctx.save();
  if (equipViewState.currentAngleIndex === 1 || equipViewState.currentAngleIndex === 3) {
    ctx.translate(exportCanvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(charImg, 25, 20, 110, 150);
  ctx.restore();

  const dataUrl = exportCanvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `talesweaver_${showroomSelectedChar}_paperdoll.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function renderEquipView() {
  const validDotChars = ['nayatrei', 'boris', 'lucian', 'tichiel', 'mila', 'lanziee', 'sivelin', 'issac', 'anais'];
  if (!validDotChars.includes(showroomSelectedChar)) {
    showroomSelectedChar = 'nayatrei';
    equipViewState.currentCharKey = 'nayatrei';
  }

  const charDef = TW_CHARACTER_ROSTER.find(c => c.key === showroomSelectedChar) || TW_CHARACTER_ROSTER[9]; // default Naya
  const headerNameEl = document.getElementById('ev-header-char-name');
  const angleTag = document.getElementById('ev-angle-tag');
  const charImg = document.getElementById('pd-char-img');

  if (headerNameEl) headerNameEl.textContent = `${charDef.fullName} (${charDef.name})`;
  if (angleTag) angleTag.textContent = equipViewState.angles[equipViewState.currentAngleIndex];

  // Resolve base dot sprite
  let dotSrc = `assets/avatar/${showroomSelectedChar}_transparent.png`;

  // Check if character has an active Eltibo potion dye
  const charDyes = currentDyeState.dyes[showroomSelectedChar] || {};
  const activeColor = charDyes[currentDyeState.selectedPartKey];
  if (activeColor && typeof TW_DYE_DB !== 'undefined') {
    const matchedPot = TW_DYE_DB.potions.find(p => p.hex.toLowerCase() === activeColor.toLowerCase());
    if (matchedPot) {
      dotSrc = `assets/avatar/${showroomSelectedChar}_dye_${matchedPot.id}.png`;
    }
  }

  // Check if Show Armor (Costume) is equipped
  const outfit = showroomOutfit || toBeEquipState || TW_DEFAULT_EQUIP_STATE;
  const showArmor = outfit.showArmor;
  const isArmorOn = showArmor && showArmor.isOn !== false && !showArmor.name.includes('미착용') && !showArmor.name.includes('없음');
  if (isArmorOn && showroomSelectedChar === 'nayatrei' && showArmor.name.includes('벚꽃비') && !activeColor) {
    dotSrc = 'assets/avatar/naya_sakura_dot.png';
  }

  if (charImg) {
    charImg.src = dotSrc;
    charImg.alt = charDef.name;

    // Apply rotation class
    charImg.classList.remove('rotated-right', 'rotated-back');
    if (equipViewState.currentAngleIndex === 1) charImg.classList.add('rotated-right');
    else if (equipViewState.currentAngleIndex === 2) charImg.classList.add('rotated-back');
    else if (equipViewState.currentAngleIndex === 3) charImg.classList.add('rotated-right');
  }

  // Render Tooltip / Status details
  const item = equipViewState.selectedItem || {
    name: "벚꽃비 의복 - 환 (나야)",
    fullName: "벚꽃비 의복 - 환 (나야) - 갑옷(갑옷 확장)",
    slot: "showArmor",
    reqChar: "나야트레이"
  };

  const titleEl = document.getElementById('ev-item-title');
  const reqCharEl = document.getElementById('ev-item-reqchar');
  const statusEl = document.getElementById('ev-action-status');

  if (titleEl) {
    if (currentShowroomSubMode === 'dye') {
      const count = Object.keys(charDyes).length;
      titleEl.textContent = count > 0 
        ? `🎨 ${charDef.name} 염색 적용 중 (${count}개 부위)`
        : `✨ ${charDef.name} 기본 외형 (순수 투명 누끼 도트)`;
    } else {
      titleEl.textContent = item.fullName || `${item.name} - ${TW_AVATAR_DB?.slots[item.slot]?.label || "아바타"}`;
    }
  }
  if (reqCharEl) reqCharEl.textContent = charDef.name;

  if (statusEl) {
    if (currentShowroomSubMode === 'dye') {
      statusEl.textContent = "실시간 도트 염색 활성";
      statusEl.style.color = "#38bdf8";
    } else {
      statusEl.textContent = isArmorOn ? "착용 중 (Equipped)" : "미착용";
      statusEl.style.color = isArmorOn ? "#6ee7b7" : "#94a3b8";
    }
  }
}

function rotateEquipView(dir) {
  equipViewState.currentAngleIndex = (equipViewState.currentAngleIndex + dir + 4) % 4;
  const angleTag = document.getElementById('ev-angle-tag');
  if (angleTag) angleTag.textContent = equipViewState.angles[equipViewState.currentAngleIndex];
  renderEquipView();
}

function inspectEquipViewItem(nameOrId) {
  let res = typeof TW_AVATAR_RESOURCES !== 'undefined' ? TW_AVATAR_RESOURCES.getItemResource(nameOrId) : null;
  if (!res && typeof TW_AVATAR_DB !== 'undefined') {
    const raw = TW_AVATAR_DB.getById(nameOrId) || TW_AVATAR_DB.items.find(x => x.name === nameOrId);
    if (raw) {
      res = {
        id: raw.id,
        name: raw.name,
        fullName: `${raw.name} - ${raw.category || "아바타"}`,
        slot: raw.slot,
        category: raw.category,
        round: raw.round,
        durability: "100/100",
        hardness: 100,
        inscript: "합성 횟수 MAX",
        reqChar: raw.name.includes("나야") ? "나야트레이" : raw.name.includes("보리스") ? "보리스" : raw.name.includes("루시안") ? "루시안" : "전체 캐릭터",
        desc: `${raw.round || "화려한 아바타"} 구성 아이템으로, 캐릭터의 멋진 코디 외형을 완성합니다.`,
        isUntradable: true,
        iconUrl: null
      };
    }
  }

  if (res) {
    equipViewState.selectedItem = res;
    renderEquipView();
  }
}

function previewCurrentEvItem() {
  const dotImg = document.getElementById('ev-char-dot-img');
  if (dotImg) {
    dotImg.style.transform = 'scale(1.1)';
    setTimeout(() => {
      dotImg.style.transform = '';
    }, 200);
  }
}

function equipCurrentEvItem() {
  if (!equipViewState.selectedItem) return;
  tryOnAvatarItem(equipViewState.selectedItem.id || equipViewState.selectedItem.name, equipViewState.selectedItem.slot);
}

function renderInGameEquipSlots() {
  const container = document.getElementById('tw-eq-slots-body');
  if (!container) return;

  const outfit = showroomOutfit || toBeEquipState || TW_DEFAULT_EQUIP_STATE;

  const slotPairs = [
    {
      realLabel: "REAL HEAD",
      realName: "10강 어비스 헬름 (국민작 +15)",
      showKey: "showHead",
      showLabel: "SHOW HEAD",
      icon: "👑"
    },
    {
      realLabel: "REAL ARMOR",
      realName: "+12 예리한 아노마... (78/84)",
      showKey: "showArmor",
      showLabel: "SHOW ARMOR",
      icon: "👗",
      customIcon: "assets/avatar/icon_sakura_robe.png"
    },
    {
      realLabel: "REAL ARMS",
      realName: "10강 어비스 무기 (국민작 +15)",
      showKey: "showSubArms",
      showLabel: "SHOW SUB ARMS",
      icon: "🗡️",
      customIcon: "assets/avatar/icon_curff.png"
    },
    {
      realLabel: "REAL FACE",
      realName: "어비스 아뮬렛 (+10마방)",
      showKey: "showFace",
      showLabel: "SHOW FACE",
      icon: "👓"
    },
    {
      realLabel: "REAL BACK",
      realName: "10강 어비스 윙 (국민작 +15)",
      showKey: "showBack",
      showLabel: "SHOW BACK",
      icon: "🪽"
    },
    {
      realLabel: "REAL FOOT",
      realName: "10강 어비스 부츠 (국민작 +15)",
      showKey: "showFoot",
      showLabel: "SHOW FOOT",
      icon: "👣"
    },
    {
      realLabel: "REAL EFFECT",
      realName: "60마방 룬 마법진 효과",
      showKey: "showEffect",
      showLabel: "SHOW EFFECT",
      icon: "✨"
    },
    {
      realLabel: "RELIC (RIGHT)",
      realName: "태양의 펜던트(+10) (100/100)",
      showKey: "showRelic",
      showLabel: "RELIC (LEFT)",
      icon: "💎",
      realName2: "태양의 브레이슬릿... (100/100)"
    }
  ];

  let html = '';
  slotPairs.forEach(p => {
    const showItem = outfit[p.showKey];
    const isShowEquipped = showItem && showItem.name && showItem.isOn !== false && !showItem.name.includes('미착용') && !showItem.name.includes('없음');
    const showName = isShowEquipped ? `${showItem.name} ${showItem.dur || "(100/100)"}` : (p.realName2 || "외형 미착용");
    
    // Icon resolution
    let iconSrc = null;
    if (isShowEquipped) {
      if (showItem.name.includes("벚꽃비 의복") || showItem.name.includes("사쿠라")) {
        iconSrc = "assets/avatar/icon_sakura_robe.png";
      } else if (showItem.name.includes("커프") || showItem.name.includes("라이도")) {
        iconSrc = "assets/avatar/icon_curff.png";
      } else if (p.customIcon) {
        iconSrc = p.customIcon;
      }
    }

    const iconHtml = iconSrc 
      ? `<img src="${iconSrc}" class="tw-eq-icon-img" alt="아이콘">` 
      : `<span style="font-size:0.9rem;">${p.icon}</span>`;

    html += `
      <div class="tw-eq-slot-row">
        <!-- Real Slot Icon -->
        <div class="tw-eq-icon-slot">
          <span style="font-size:0.75rem; color:#94a3b8;">🛡️</span>
        </div>
        <!-- Real Slot Text -->
        <div class="tw-eq-slot-info">
          <div class="tw-eq-slot-lbl">${p.realLabel} <span class="tw-eq-on-badge">ON</span></div>
          <div class="tw-eq-slot-item" title="${p.realName}">${p.realName}</div>
        </div>

        <!-- Show Slot Icon -->
        <div class="tw-eq-icon-slot" onclick="inspectEquipViewItem('${isShowEquipped ? showItem.name : ""}')" style="cursor:pointer;" title="${p.showLabel} 클릭하여 Equip View 확인">
          ${iconHtml}
        </div>
        <!-- Show Slot Text -->
        <div class="tw-eq-slot-info">
          <div class="tw-eq-slot-lbl">
            <span>${p.showLabel}</span>
            <span class="tw-eq-on-badge ${isShowEquipped ? '' : 'off'}" onclick="toggleShowSlotOn('${p.showKey}')">${isShowEquipped ? 'ON' : 'OFF'}</span>
          </div>
          <div class="tw-eq-slot-item ${isShowEquipped ? 'show-equipped' : ''}" title="${showName}" onclick="inspectEquipViewItem('${isShowEquipped ? showItem.name : ""}')" style="cursor:pointer;">
            ${showName}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Update 5-Set Effect & Combat Contribution Box
  const activeCount = countActiveAvatarPieces(outfit);
  const is5Set = activeCount >= 5;

  const badge5Set = document.getElementById('showroom-5set-badge');
  const pieceCountText = document.getElementById('showroom-piece-count-text');
  const coeffEl = document.getElementById('showroom-stat-coeff');
  const dexEl = document.getElementById('showroom-stat-dex');
  const speedEl = document.getElementById('showroom-stat-speed');

  if (badge5Set) {
    badge5Set.className = `tw-5set-indicator ${is5Set ? 'active' : 'inactive'}`;
    badge5Set.textContent = is5Set ? '⭐ 아바타 5세트 ON (+10스탯)' : `아바타 세트: ${activeCount}/5 (미달성)`;
  }

  if (pieceCountText) {
    pieceCountText.textContent = `착용 부위: ${activeCount} / 6`;
    pieceCountText.style.color = is5Set ? '#6ee7b7' : '#94a3b8';
  }

  if (coeffEl) coeffEl.textContent = is5Set ? '+205 계수 (공식 x20.5)' : '+0 계수';
  if (dexEl) dexEl.textContent = is5Set ? '+10 DEX' : '+0 DEX';
  if (speedEl) speedEl.textContent = is5Set ? '이속 +3 / HP +2,000' : '효과 미적용';
}

function toggleShowSlotOn(slotKey) {
  if (!showroomOutfit) return;
  if (showroomOutfit[slotKey]) {
    showroomOutfit[slotKey].isOn = !showroomOutfit[slotKey].isOn;
    renderInGameEquipSlots();
    renderEquipView();
  }
}

function setShowroomSlotTab(slotKey, btnEl) {
  showroomCurrentSlotTab = slotKey;
  const tabs = document.querySelectorAll('.tw-wtab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    const slotIdx = ['showHead', 'showArmor', 'showBack', 'showFace', 'showEffect', 'showFoot', 'showArms'].indexOf(slotKey);
    if (slotIdx >= 0 && tabs[slotIdx]) tabs[slotIdx].classList.add('active');
  }
  renderShowroomWardrobeItems();
}

function onShowroomSearchInput() {
  const input = document.getElementById('showroom-search-input');
  showroomSearchQuery = input ? input.value.trim() : '';
  renderShowroomWardrobeItems();
}

function onShowroomRoundChange(val) {
  showroomRoundFilter = val;
  renderShowroomWardrobeItems();
}

function setShowroomQuickFilter(type, btnEl) {
  showroomQuickFilter = type;
  ['btn-sf-all', 'btn-sf-monthly', 'btn-sf-special'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.classList.remove('active');
  });
  if (btnEl) btnEl.classList.add('active');
  renderShowroomWardrobeItems();
}

function renderShowroomWardrobeItems() {
  const grid = document.getElementById('showroom-wardrobe-grid');
  const counter = document.getElementById('showroom-item-counter');
  if (!grid || typeof TW_AVATAR_DB === 'undefined') return;

  const outfit = showroomOutfit || toBeEquipState || TW_DEFAULT_EQUIP_STATE;
  const currentEquippedName = outfit[showroomCurrentSlotTab] ? outfit[showroomCurrentSlotTab].name : '';

  let items = TW_AVATAR_DB.search(showroomSearchQuery, showroomCurrentSlotTab, showroomRoundFilter);

  if (showroomQuickFilter === 'monthly') {
    items = items.filter(it => it.isMonthly || (it.round && it.round.includes('월')));
  } else if (showroomQuickFilter === 'special') {
    items = items.filter(it => it.isSpecial || (it.round && (it.round.includes('스페셜') || it.round.includes('80') || it.round.includes('81') || it.round.includes('82') || it.round.includes('83'))));
  }

  if (counter) counter.textContent = `총 ${items.length.toLocaleString()}개 아이템`;

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: #94a3b8; font-size: 0.88rem;">
        🔍 검색 조건에 일치하는 아바타 아이템이 없습니다.<br>
        <span style="font-size:0.75rem; color:#64748b;">검색어나 회차 필터를 변경해보세요.</span>
      </div>
    `;
    return;
  }

  const limit = 120;
  const displayItems = items.slice(0, limit);

  let html = `
    <div class="tw-wardrobe-item-card" style="border-style:dashed; border-color:#475569;" onclick="unequipShowroomSlot('${showroomCurrentSlotTab}')">
      <div class="tw-wardrobe-card-info">
        <div class="tw-wardrobe-card-name" style="color:#94a3b8;">🚫 외형 미착용 (이 부위 벗기)</div>
        <div class="tw-wardrobe-card-meta">
          <span class="tw-avatar-round-tag">외형 해제</span>
        </div>
      </div>
      <button type="button" class="btn-sm btn-outline" style="font-size:0.68rem; padding:2px 8px;">해제</button>
    </div>
  `;

  displayItems.forEach(item => {
    const isEquipped = currentEquippedName === item.name;
    const monthlyTag = item.isMonthly ? '<span class="tw-avatar-monthly-tag">月</span>' : '';
    const roundTag = item.round ? `<span class="tw-avatar-round-tag">${item.round}</span>` : '';
    const origSlotTag = item.originalSlot ? `<span class="tw-avatar-round-tag" style="color:#38bdf8;">${item.originalSlot}</span>` : '';

    html += `
      <div class="tw-wardrobe-item-card ${isEquipped ? 'active' : ''}" onclick="tryOnAvatarItem('${item.id.replace(/'/g, "\\'")}', '${showroomCurrentSlotTab}')">
        <div class="tw-wardrobe-card-info">
          <div class="tw-wardrobe-card-name" title="${item.name}">${isEquipped ? '✨ ' : ''}${item.name}</div>
          <div class="tw-wardrobe-card-meta">
            ${roundTag}
            ${monthlyTag}
            ${origSlotTag}
          </div>
        </div>
        <div style="display:flex; gap:4px; align-items:center;">
          <button type="button" class="btn-sm btn-outline" style="font-size:0.68rem; padding:2px 6px; color:#38bdf8;" onclick="event.stopPropagation(); inspectEquipViewItem('${item.id.replace(/'/g, "\\'")}')" title="Equip View에서 상세 확인">
            보기
          </button>
          <button type="button" class="btn-sm ${isEquipped ? 'btn-primary' : 'btn-outline'}" style="font-size:0.68rem; padding:2px 8px;">
            ${isEquipped ? '착용중' : '입어보기'}
          </button>
        </div>
      </div>
    `;
  });

  if (items.length > limit) {
    html += `
      <div style="grid-column: 1 / -1; padding: 0.75rem; text-align: center; color: #64748b; font-size: 0.75rem; background: #080c16; border-radius: 6px;">
        외 ${items.length - limit}개의 아이템이 더 있습니다. 검색창을 이용해 빠르게 찾아보세요!
      </div>
    `;
  }

  grid.innerHTML = html;
}

function tryOnAvatarItem(avatarId, slotKey) {
  if (!showroomOutfit) {
    showroomOutfit = JSON.parse(JSON.stringify(toBeEquipState || TW_DEFAULT_EQUIP_STATE));
  }
  const avatar = typeof TW_AVATAR_DB !== 'undefined' ? (TW_AVATAR_DB.getById(avatarId) || TW_AVATAR_DB.items.find(x => x.name === avatarId)) : null;
  if (!avatar) return;

  showroomOutfit[slotKey] = {
    key: slotKey,
    name: avatar.name,
    dur: "(100/100)",
    tier: "avatar",
    isOn: true,
    round: avatar.round,
    isMonthly: avatar.isMonthly
  };

  toBeEquipState[slotKey] = JSON.parse(JSON.stringify(showroomOutfit[slotKey]));

  inspectEquipViewItem(avatar.name);
  renderEquipView();
  renderInGameEquipSlots();
  renderShowroomWardrobeItems();

  if (document.getElementById('tw-equip-window-tobe')) {
    renderInGameEquipWindow('tobe', toBeEquipState, true);
    if (typeof updateDualEquipWindowDiff === 'function') updateDualEquipWindowDiff();
  }
}

function unequipShowroomSlot(slotKey) {
  if (!showroomOutfit) {
    showroomOutfit = JSON.parse(JSON.stringify(toBeEquipState || TW_DEFAULT_EQUIP_STATE));
  }
  showroomOutfit[slotKey] = {
    key: slotKey,
    name: "외형 미착용",
    dur: "",
    tier: "avatar",
    isOn: false
  };

  toBeEquipState[slotKey] = JSON.parse(JSON.stringify(showroomOutfit[slotKey]));

  renderEquipView();
  renderInGameEquipSlots();
  renderShowroomWardrobeItems();

  if (document.getElementById('tw-equip-window-tobe')) {
    renderInGameEquipWindow('tobe', toBeEquipState, true);
    if (typeof updateDualEquipWindowDiff === 'function') updateDualEquipWindowDiff();
  }
}

function saveShowroomToProfile() {
  if (!showroomOutfit) return;
  const showSlots = ['showHead', 'showArmor', 'showFace', 'showBack', 'showFoot', 'showEffect', 'showArms', 'showSubArms'];
  
  showSlots.forEach(s => {
    if (showroomOutfit[s]) {
      toBeEquipState[s] = JSON.parse(JSON.stringify(showroomOutfit[s]));
      asIsEquipState[s] = JSON.parse(JSON.stringify(showroomOutfit[s]));
    }
  });

  const p = typeof profiles !== 'undefined' ? profiles.find(x => x.id === currentProfileId) : null;
  if (p) {
    if (!p.twEquipState) p.twEquipState = JSON.parse(JSON.stringify(asIsEquipState));
    showSlots.forEach(s => {
      if (showroomOutfit[s]) {
        p.twEquipState[s] = JSON.parse(JSON.stringify(showroomOutfit[s]));
      }
    });
    const m = calculateEquipStateMetrics(p.twEquipState);
    p.totalCoeff = m.totalCoeff;
    p.totalDex = m.totalDex;
    try {
      localStorage.setItem('tw_companion_profiles_v3', JSON.stringify(profiles));
    } catch(e) {}
  }

  renderInGameEquipWindow('asis', asIsEquipState, false);
  renderInGameEquipWindow('tobe', toBeEquipState, true);
  if (typeof updateDualEquipWindowDiff === 'function') updateDualEquipWindowDiff();
  renderEquipView();
  renderInGameEquipSlots();

  alert(`🎉 '${p ? p.name : "캐릭터"}' 프로필에 아바타 세팅이 확정 저장되었습니다!\n6번 탭 [계수·전투 시험장]과 캐릭터 프로필에 공식 5세트 효과가 실시간 반영되었습니다.`);
}

function resetShowroomOutfit() {
  const p = typeof profiles !== 'undefined' ? profiles.find(x => x.id === currentProfileId) : null;
  showroomOutfit = JSON.parse(JSON.stringify(p?.twEquipState || asIsEquipState || TW_DEFAULT_EQUIP_STATE));
  toBeEquipState = JSON.parse(JSON.stringify(showroomOutfit));

  renderEquipView();
  renderInGameEquipSlots();
  renderShowroomWardrobeItems();

  if (document.getElementById('tw-equip-window-tobe')) {
    renderInGameEquipWindow('tobe', toBeEquipState, true);
    if (typeof updateDualEquipWindowDiff === 'function') updateDualEquipWindowDiff();
  }
}



if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootCompanion);
} else {
  bootCompanion();
}
