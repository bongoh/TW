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
    if (archSelect) archSelect.value = p.branchId || p.archetype;
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
    p.characterId = meta.charId;
    p.branchId = meta.branchId;
    p.archetype = meta.arch;
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
  renderBossContentGuide(totalCoeff, totalDex);
  if (typeof updateCombatSimulation === 'function') {
    updateCombatSimulation(totalCoeff, totalDex);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootCompanion);
} else {
  bootCompanion();
}
