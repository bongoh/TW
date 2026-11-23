/**
 * TalesWeaver Companion Guide - Data & Configurations
 * Thresholds, Doping items, Recipes, Waste Items, and Default Profiles
 */

const STORAGE_KEY = 'tw_anais_weekly_tasks_v1';

// 1. Minimum Dungeon Cutoffs (Thresholds)
const thresholds = {
  nobuff: {
    shinjo:       { name: "신조의 둥지(일반)", mdef: 1200, acc: 1100, elem: 165, eta: 1,  equip: "인퍼널~아퀼루스 셋" },
    abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", mdef: 1250, acc: 1150, elem: 170, eta: 1,  equip: "아퀼루스 혼합~풀셋" },
    abyss_hell:   { name: "어비스 헬",         mdef: 1350, acc: 1250, elem: 180, eta: 1,  equip: "아퀼루스 풀셋" },
    obang_hell:   { name: "오방 헬",           mdef: 1450, acc: 1350, elem: 190, eta: 5,  equip: "아퀼루스 풀~어비스 부위" },
    rokagos:      { name: "로카고스(이클)",    mdef: 1550, acc: 1450, elem: 200, eta: 15, equip: "어비스 4~5셋 (10~12강)" },
    eclipse_high: { name: "이클 중상위",       mdef: 1750, acc: 1500, elem: 205, eta: 21, equip: "어비스 한계작 / 이클 로브" },
    obang_abyss:  { name: "오방 어비스(5각)",   mdef: 1850, acc: 2050, elem: 210, eta: 21, equip: "5각 + 어비스·이클 고스펙" }
  },
  buff: {
    shinjo:       { name: "신조의 둥지(일반)", mdef: 1400, acc: 1250, elem: 180, eta: 1,  equip: "자버프 + 기본 물약" },
    abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", mdef: 1450, acc: 1300, elem: 185, eta: 1,  equip: "자버프 + 기본 도핑" },
    abyss_hell:   { name: "어비스 헬",         mdef: 1550, acc: 1400, elem: 195, eta: 1,  equip: "자버프 + 비약/물약" },
    obang_hell:   { name: "오방 헬",           mdef: 1700, acc: 1500, elem: 205, eta: 5,  equip: "실전 버프 + 노란 장판" },
    rokagos:      { name: "로카고스(이클)",    mdef: 1800, acc: 1600, elem: 210, eta: 15, equip: "실전 풀버프 + 비약·묘약" },
    eclipse_high: { name: "이클 중상위",       mdef: 2000, acc: 1650, elem: 215, eta: 21, equip: "실전 풀버프 + 어스 프로텍션" },
    obang_abyss:  { name: "오방 어비스(5각)",   mdef: 2100, acc: 2250, elem: 220, eta: 21, equip: "실전 풀버프 (막보 명중 2,250)" }
  }
};

// 2. Doping Conflict Rules & Item Names
const conflictMap = {
  club_type_e2: { conflicts: ['master_token', 'warm_eos'], name: '클럽 상점 버프 Type E-2' },
  master_token: { conflicts: ['club_type_e2'], name: '스승의 증표' },
  warm_eos: { conflicts: ['club_type_e2', 'snowman_potion'], name: '따뜻한 에오스의 파편' },
  snowman_potion: { conflicts: ['warm_eos'], name: '눈사람 포션' },

  exp_heart: { conflicts: ['exp_sweet_potato'], name: '경험의 심장' },
  exp_sweet_potato: { conflicts: ['exp_heart'], name: '경험의 군고구마' },

  quest_stamp_exp: { conflicts: ['good_job_exp'], name: '도전 과제 도장(경험치)' },
  good_job_exp: { conflicts: ['quest_stamp_exp'], name: '참 잘했어요(경험치)' },

  rare_heart: { conflicts: ['rare_chestnut'], name: '레어의 심장' },
  rare_chestnut: { conflicts: ['rare_heart'], name: '레어의 밤고구마' },

  quest_stamp_rare: { conflicts: ['good_job_rare'], name: '도전 과제 도장(레어)' },
  good_job_rare: { conflicts: ['quest_stamp_rare'], name: '참 잘했어요(레어)' }
};

// 3. One-Click Doping Presets
const dopingPresets = {
  hunt: ['snowman_potion', 'awakening_potion', 'trust_potion', 'isabelle_fixed', 'purified_ampoule', 'haste_potion'],
  raid: [
    'snowman_potion', 'awakening_potion', 'trust_potion', 'isabelle_fixed', 'isabelle_percent', 'isabelle_damage',
    'purified_ampoule', 'isabelle_sp_fixed', 'isabelle_sp_percent', 'isabelle_sp_damage', 'samiseon_dish',
    'club_type_p', 'skill_light', 'skill_over', 'skill_earth', 'soul_range', 'soul_superarmor'
  ],
  acc: [
    'trust_potion', 'awakening_potion', 'isabelle_fixed', 'isabelle_acc', 'isabelle_sp_acc', 'focus_elixir',
    'samiseon_dish', 'skill_over'
  ],
  exp: ['club_type_e2', 'exp_heart', 'quest_stamp_exp', 'isabelle_exp', 'cash_trio', 'nenyaple_cat1', 'rune_tp_boost', 'helmet_rune_opt'],
  rare: ['roto_amulet', 'rare_heart', 'four_leaf_clover', 'club_type_r2', 'quest_stamp_rare', 'soul_rare_buff', 'nenyaple_cat_x', 'pet_treasure'],
  clear: []
};

// 4. Waste Paper Pricing Table (폐지 계산기 데이터)
const wasteItems = [
  { id: "wp1",  name: "정령의신전(파편)(일반)", normal: 2220,     bonus: 2497 },
  { id: "wp2",  name: "사념의 조각",           normal: 2472,     bonus: 2781 },
  { id: "wp3",  name: "정령의신전(파편)(어려움)", normal: 2472,   bonus: 2781 },
  { id: "wp4",  name: "고대 골렘의 심장",       normal: 7200,     bonus: 8100 },
  { id: "wp5",  name: "무스펠 파편",           normal: 7200,     bonus: 8100 },
  { id: "wp6",  name: "악마의 흔적",           normal: 7200,     bonus: 8100 },
  { id: "wp7",  name: "카타콤 석화 조각",       normal: 7200,     bonus: 8100 },
  { id: "wp8",  name: "달빛 가루",             normal: 7800,     bonus: 8775 },
  { id: "wp9",  name: "신조의 가루",           normal: 7800,     bonus: 8775 },
  { id: "wp10", name: "페어리 피타 스톤",       normal: 7800,     bonus: 8775 },
  { id: "wp11", name: "프시키의 잔해",         normal: 7800,     bonus: 8775 },
  { id: "wp12", name: "괴물 쥐의 가죽",         normal: 30000,    bonus: 33750 },
  { id: "wp13", name: "저주받은 언데드의 심장", normal: 30000,    bonus: 33750 },
  { id: "wp14", name: "일회용 인챈트",         normal: 300000,   bonus: 337500 },
  { id: "wp15", name: "신비한 보석",           normal: 350000,   bonus: 393750 },
  { id: "wp16", name: "봉인된 페어리 피타 장비", normal: 420000, bonus: 472500 },
  { id: "wp17", name: "아크론 요새의 잔해",     normal: 1000000,  bonus: 1125000 },
  { id: "wp18", name: "키메라의 잔해",         normal: 1000000,  bonus: 1125000 },
  { id: "wp19", name: "아카드 아티팩트",       normal: 1260000,  bonus: 1417500 },
  { id: "wp20", name: "심연의 보물창고 열쇠",   normal: 2000000,  bonus: 2250000 },
  { id: "wp21", name: "엔키라 장비",           normal: 2310000,  bonus: 2598750 },
  { id: "wp22", name: "엔키라 칼라그 장비",     normal: 3150000,  bonus: 3543750 },
  { id: "wp23", name: "문스톤 나침반",         normal: 3200000,  bonus: 3600000 },
  { id: "wp24", name: "능력조각 변환장치",     normal: 10000000, bonus: 11250000 },
  { id: "wp25", name: "능력치 제한 확장 광물", normal: 10000000, bonus: 11250000 },
  { id: "wp26", name: "마력 결정 조각",         normal: 10000000, bonus: 11250000 },
  { id: "wp27", name: "신조의 기운",           normal: 10000000, bonus: 11250000 },
  { id: "wp28", name: "조제법: 改-에너지 포션(대)", normal: 20000000, bonus: 22500000 },
  { id: "wp29", name: "조제법: 改-활력 포션(대)",   normal: 20000000, bonus: 22500000 }
];

// 5. Abandon Road Difficulty Configurations
const abendonConfig = {
  1: { baseFee: 400000,  stoneVal: 500000,  minStones: 7, maxStones: 8 },
  2: { baseFee: 800000,  stoneVal: 1000000, minStones: 7, maxStones: 8 },
  3: { baseFee: 1600000, stoneVal: 2000000, minStones: 7, maxStones: 8 },
  4: { baseFee: 3200000, stoneVal: 4000000, minStones: 7, maxStones: 8 },
  5: { baseFee: 640000, stoneVal: 8000000, minStones: 7, maxStones: 8 }
};

// 6. Equipment Crafting Recipes (제작 계산기 레시피)
const equipRecipes = {
  aquilus: {
    sharedPrices: [
      { key: "citrine", name: "시트린 (공통)", defaultPrice: 0 },
      { key: "taecheong", name: "태청금액신단 (공통)", defaultPrice: 0 },
      { key: "psiki_frag", name: "프시키의 파편 (부위별)", defaultPrice: 0 }
    ],
    parts: [
      { part: "아퀼루스 무기", base: "인퍼널 무기", mats: [{ key: "psiki_frag", label: "프시키의 파편 - 파괴", qty: 4 }, { key: "citrine", label: "시트린", qty: 10 }, { key: "taecheong", label: "태청금액신단", qty: 6 }] },
      { part: "아퀼루스 투구", base: "인퍼널 투구", mats: [{ key: "psiki_frag", label: "프시키의 파편 - 분리", qty: 4 }, { key: "citrine", label: "시트린", qty: 10 }, { key: "taecheong", label: "태청금액신단", qty: 6 }] },
      { part: "아퀼루스 갑옷", base: "인퍼널 갑옷", mats: [{ key: "psiki_frag", label: "프시키의 파편 - 단절", qty: 4 }, { key: "citrine", label: "시트린", qty: 10 }, { key: "taecheong", label: "태청금액신단", qty: 6 }] },
      { part: "아퀼루스 머리", base: "인퍼널 머리", mats: [{ key: "psiki_frag", label: "프시키의 파편 - 형성", qty: 4 }, { key: "citrine", label: "시트린", qty: 10 }, { key: "taecheong", label: "태청금액신단", qty: 6 }] },
      { part: "아퀼루스 손목", base: "인퍼널 손목", mats: [{ key: "psiki_frag", label: "프시키의 파편 - 인도", qty: 4 }, { key: "citrine", label: "시트린", qty: 10 }, { key: "taecheong", label: "태청금액신단", qty: 6 }] },
      { part: "아퀼루스 손",   base: "인퍼널 손",   mats: [{ key: "psiki_frag", label: "프시키의 파편 - 고정", qty: 4 }, { key: "citrine", label: "시트린", qty: 10 }, { key: "taecheong", label: "태청금액신단", qty: 6 }] },
      { part: "아퀼루스 날개", base: "인퍼널 날개", mats: [{ key: "psiki_frag", label: "프시키의 파편 - 안정", qty: 4 }, { key: "citrine", label: "시트린", qty: 10 }, { key: "taecheong", label: "태청금액신단", qty: 6 }] },
      { part: "아퀼루스 신발", base: "인퍼널 신발", mats: [{ key: "psiki_frag", label: "프시키의 파편 - 구원", qty: 4 }, { key: "citrine", label: "시트린", qty: 10 }, { key: "taecheong", label: "태청금액신단", qty: 6 }] }
    ]
  },
  abyss: {
    sharedPrices: [
      { key: "akron_mark", name: "아크론 혈투의 증표", defaultPrice: 0 },
      { key: "abyss_mat",  name: "어비스 부위별 핵심 재료", defaultPrice: 0 },
      { key: "abyss_core_mat", name: "심연의 결정 / 보조 재료", defaultPrice: 0 }
    ],
    parts: [
      { part: "어비스 무기", base: "아퀼루스 무기", mats: [{ key: "akron_mark", label: "아크론 혈투의 증표", qty: 100 }, { key: "abyss_mat", label: "어비스 무기 재료", qty: 5 }, { key: "abyss_core_mat", label: "심연의 결정", qty: 20 }] },
      { part: "어비스 투구", base: "아퀼루스 투구", mats: [{ key: "akron_mark", label: "아크론 혈투의 증표", qty: 50 },  { key: "abyss_mat", label: "어비스 투구 재료", qty: 3 }, { key: "abyss_core_mat", label: "심연의 결정", qty: 10 }] },
      { part: "어비스 갑옷", base: "아퀼루스 갑옷", mats: [{ key: "akron_mark", label: "아크론 혈투의 증표", qty: 50 },  { key: "abyss_mat", label: "어비스 갑옷 재료", qty: 3 }, { key: "abyss_core_mat", label: "심연의 결정", qty: 10 }] },
      { part: "어비스 머리", base: "아퀼루스 머리", mats: [{ key: "akron_mark", label: "아크론 혈투의 증표", qty: 50 },  { key: "abyss_mat", label: "어비스 머리 재료", qty: 3 }, { key: "abyss_core_mat", label: "심연의 결정", qty: 10 }] },
      { part: "어비스 손목", base: "아퀼루스 손목", mats: [{ key: "akron_mark", label: "아크론 혈투의 증표", qty: 50 },  { key: "abyss_mat", label: "어비스 손목 재료", qty: 3 }, { key: "abyss_core_mat", label: "심연의 결정", qty: 10 }] },
      { part: "어비스 손",   base: "아퀼루스 손",   mats: [{ key: "akron_mark", label: "아크론 혈투의 증표", qty: 50 },  { key: "abyss_mat", label: "어비스 손 재료",   qty: 3 }, { key: "abyss_core_mat", label: "심연의 결정", qty: 10 }] },
      { part: "어비스 날개", base: "아퀼루스 날개", mats: [{ key: "akron_mark", label: "아크론 혈투의 증표", qty: 50 },  { key: "abyss_mat", label: "어비스 날개 재료", qty: 3 }, { key: "abyss_core_mat", label: "심연의 결정", qty: 10 }] },
      { part: "어비스 신발", base: "아퀼루스 신발", mats: [{ key: "akron_mark", label: "아크론 혈투의 증표", qty: 50 },  { key: "abyss_mat", label: "어비스 신발 재료", qty: 3 }, { key: "abyss_core_mat", label: "심연의 결정", qty: 10 }] }
    ]
  },
  eclipse: {
    sharedPrices: [
      { key: "queen_frag", name: "가짜 달여왕 군단 부위 파편", defaultPrice: 0 },
      { key: "queen_seal", name: "가짜 달여왕 군단의 인장", defaultPrice: 0 },
      { key: "rune_ore",   name: "룬의 원석", defaultPrice: 0 },
      { key: "moon_herb",  name: "달의 약초", defaultPrice: 0 }
    ],
    parts: [
      { part: "이클립스 무기", base: "어비스 무기", mats: [{ key: "queen_frag", label: "가짜 달여왕 군단의 무기 파편", qty: 3 }, { key: "queen_seal", label: "가짜 달여왕 군단의 인장", qty: 6 }, { key: "rune_ore", label: "룬의 원석", qty: 20 }, { key: "moon_herb", label: "달의 약초", qty: 100 }] },
      { part: "이클립스 투구", base: "어비스 투구", mats: [{ key: "queen_frag", label: "가짜 달여왕 군단의 투구 장식", qty: 3 }, { key: "queen_seal", label: "가짜 달여왕 군단의 인장", qty: 6 }, { key: "rune_ore", label: "룬의 원석", qty: 20 }, { key: "moon_herb", label: "달의 약초", qty: 100 }] },
      { part: "이클립스 갑옷", base: "어비스 갑옷", mats: [{ key: "queen_frag", label: "가짜 달여왕 군단의 갑옷 파편", qty: 3 }, { key: "queen_seal", label: "가짜 달여왕 군단의 인장", qty: 6 }, { key: "rune_ore", label: "룬의 원석", qty: 20 }, { key: "moon_herb", label: "달의 약초", qty: 100 }] },
      { part: "이클립스 머리", base: "어비스 머리", mats: [{ key: "queen_frag", label: "가짜 달여왕 군단의 펜던트 파편", qty: 3 }, { key: "queen_seal", label: "가짜 달여왕 군단의 인장", qty: 6 }, { key: "rune_ore", label: "룬의 원석", qty: 20 }, { key: "moon_herb", label: "달의 약초", qty: 100 }] },
      { part: "이클립스 손목", base: "어비스 손목", mats: [{ key: "queen_frag", label: "가짜 달여왕 군단의 방패 조각", qty: 3 }, { key: "queen_seal", label: "가짜 달여왕 군단의 인장", qty: 6 }, { key: "rune_ore", label: "룬의 원석", qty: 20 }, { key: "moon_herb", label: "달의 약초", qty: 100 }] },
      { part: "이클립스 손",   base: "어비스 손",   mats: [{ key: "queen_frag", label: "가짜 달여왕 군단의 건틀렛 파편", qty: 3 }, { key: "queen_seal", label: "가짜 달여왕 군단의 인장", qty: 6 }, { key: "rune_ore", label: "룬의 원석", qty: 20 }, { key: "moon_herb", label: "달의 약초", qty: 100 }] },
      { part: "이클립스 날개", base: "어비스 날개", mats: [{ key: "queen_frag", label: "가짜 달여왕 군단의 휘장 장식", qty: 3 }, { key: "queen_seal", label: "가짜 달여왕 군단의 인장", qty: 6 }, { key: "rune_ore", label: "룬의 원석", qty: 20 }, { key: "moon_herb", label: "달의 약초", qty: 100 }] },
      { part: "이클립스 신발", base: "어비스 신발", mats: [{ key: "queen_frag", label: "가짜 달여왕 군단의 각갑 파편", qty: 3 }, { key: "queen_seal", label: "가짜 달여왕 군단의 인장", qty: 6 }, { key: "rune_ore", label: "룬의 원석", qty: 20 }, { key: "moon_herb", label: "달의 약초", qty: 100 }] }
    ]
  }
};

// 7. Default Multi-Character Profiles
const defaultProfiles = [
  {
    id: 'char_1',
    name: '비호정령 (본캐)',
    job: 'anais_biho',
    memo: '어비스 4셋 목표, 에타 21 달성',
    mdef: 1650,
    acc: 1620,
    elem: 180,
    eta: 21,
    target: 'rokagos',
    inputMode: 'nobuff',
    buffs: ['snowman_potion', 'awakening_potion', 'trust_potion', 'isabelle_fixed', 'purified_ampoule', 'skill_light', 'skill_over'],
    tasks: {}
  },
  {
    id: 'char_2',
    name: '로아미니 (부캐)',
    job: 'roamini',
    memo: '신어헬 파밍 중, 디버퍼',
    mdef: 1450,
    acc: 1520,
    elem: 160,
    eta: 15,
    target: 'abyss_hell',
    inputMode: 'nobuff',
    buffs: ['snowman_potion', 'awakening_potion', 'trust_potion', 'isabelle_fixed', 'purified_ampoule'],
    tasks: {}
  }
];

// ==================== 8. COEFFICIENT & HIT CALCULATOR DATA ====================
// 출처 1: 텔쥐 계수계산기 (구글 스프레드시트)
// 출처 2: 일텔 계수 공식 (TaleWiki / DC Inside no.144536)
// 출처 3: 컨텐츠 명중컷 총정리 (DC Inside no.216109)

const coeffFormulas = {
  stab: {
    id: 'stab',
    name: '찌르기',
    mainStat: 'STAB',
    subStat: 'HACK',
    formulaText: '장비(STAB*23.75 + HACK*3.75) + 강화(STAB*32.5 + HACK*18.75) + 캐릭터(STAB*2.1 + HACK*1.08) + 코어*32.5',
    equipMainMult: 23.75,
    equipSubMult: 3.75,
    enfMainMult: 32.5,
    enfSubMult: 18.75,
    charMainMult: 2.1,
    charSubMult: 1.08,
    coreMult: 32.5
  },
  hack: {
    id: 'hack',
    name: '베기',
    mainStat: 'HACK',
    subStat: 'STAB',
    formulaText: '장비(HACK*23.75 + STAB*3.75) + 강화(HACK*32.5 + STAB*18.75) + 캐릭터(HACK*2.1 + STAB*1.08) + 코어*32.5',
    equipMainMult: 23.75,
    equipSubMult: 3.75,
    enfMainMult: 32.5,
    enfSubMult: 18.75,
    charMainMult: 2.1,
    charSubMult: 1.08,
    coreMult: 32.5
  },
  composite: {
    id: 'composite',
    name: '물리복합',
    mainStat: 'STAB',
    subStat: 'HACK',
    formulaText: '장비(STAB*14.5 + HACK*14.5) + 강화(STAB*28.75 + HACK*28.75) + 캐릭터(STAB*1.8 + HACK*1.8) + 코어*28.75',
    equipMainMult: 14.5,
    equipSubMult: 14.5,
    enfMainMult: 28.75,
    enfSubMult: 28.75,
    charMainMult: 1.8,
    charSubMult: 1.8,
    coreMult: 28.75
  },
  magic_atk: {
    id: 'magic_atk',
    name: '마법공격',
    mainStat: 'INT',
    subStat: 'MR',
    formulaText: '장비(INT*23.75 + MR*2.5) + 강화(INT*32.5 + MR*18.25) + 캐릭터(INT*2.4 + MR*0.6) + 코어*32.5',
    equipMainMult: 23.75,
    equipSubMult: 2.5,
    enfMainMult: 32.5,
    enfSubMult: 18.25,
    charMainMult: 2.4,
    charSubMult: 0.6,
    coreMult: 32.5
  },
  magic_slash: {
    id: 'magic_slash',
    name: '마법베기',
    mainStat: 'HACK',
    subStat: 'INT',
    formulaText: '장비(HACK*14.5 + INT*14.5) + 강화(HACK*28.75 + INT*28.75) + 캐릭터(HACK*1.8 + INT*1.8) + 코어*28.75',
    equipMainMult: 14.5,
    equipSubMult: 14.5,
    enfMainMult: 28.75,
    enfSubMult: 28.75,
    charMainMult: 1.8,
    charSubMult: 1.8,
    coreMult: 28.75
  },
  magic_def: {
    id: 'magic_def',
    name: '마법방어',
    mainStat: 'MR',
    subStat: 'INT',
    formulaText: '장비(MR*20.5 + INT*2.5) + 강화(MR*32.5 + INT*16.75) + 캐릭터(MR*2.55 + INT*0.45) + 코어*32.5',
    equipMainMult: 20.5,
    equipSubMult: 2.5,
    enfMainMult: 32.5,
    enfSubMult: 16.75,
    charMainMult: 2.55,
    charSubMult: 0.45,
    coreMult: 32.5
  }
};

const itemBaseDb = {
  helm: [
    { id: 'abyss_helm', name: '어비스 헬름', stab: 102, hack: 102, int: 102, mr: 102, dex: 92 },
    { id: 'eclipse_helm', name: '이클립스 헬름', stab: 112, hack: 112, int: 112, mr: 112, dex: 105 },
    { id: 'aquilus_helm', name: '아퀼루스 헬름', stab: 85, hack: 85, int: 85, mr: 81, dex: 75 },
    { id: 'infernal_helm', name: '인퍼널 헬름', stab: 70, hack: 70, int: 70, mr: 65, dex: 60 },
    { id: 'custom_helm', name: '직접 입력', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  armor: [
    { id: 'anomarad_mail', name: '매서운 아노마라드 왕국의 메일', stab: 50, hack: 0, int: 0, mr: 0, dex: 80 },
    { id: 'anomarad_robe', name: '총명한 아노마라드 왕국의 로브', stab: 0, hack: 0, int: 50, mr: 50, dex: 80 },
    { id: 'nenyaple_mail', name: '예리한 네냐플 학원의 메일', stab: 50, hack: 50, int: 0, mr: 0, dex: 70 },
    { id: 'eclipse_robe', name: '이클립스 로브', stab: 0, hack: 0, int: 140, mr: 447, dex: 110 },
    { id: 'abyss_armor', name: '어비스 아머', stab: 120, hack: 120, int: 120, mr: 120, dex: 95 },
    { id: 'aquilus_armor', name: '아퀼루스 아머', stab: 95, hack: 95, int: 95, mr: 95, dex: 80 },
    { id: 'custom_armor', name: '직접 입력', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  weapon: [
    { id: 'fairy_rapier', name: '페어리 피타 레이피어', stab: 280, hack: 0, int: 0, mr: 0, dex: 25 },
    { id: 'abyss_rapier', name: '어비스 레이피어', stab: 374, hack: 130, int: 0, mr: 0, dex: 35 },
    { id: 'eclipse_sword', name: '이클립스 소드셰이프', stab: 474, hack: 170, int: 0, mr: 0, dex: 50 },
    { id: 'fairy_staff', name: '페어리 피타 스태프', stab: 0, hack: 0, int: 309, mr: 0, dex: 25 },
    { id: 'abyss_bell', name: '어비스 핸드벨', stab: 0, hack: 0, int: 130, mr: 354, dex: 35 },
    { id: 'eclipse_wand', name: '이클립스 완드', stab: 0, hack: 0, int: 474, mr: 170, dex: 50 },
    { id: 'custom_weapon', name: '직접 입력', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  wrist: [
    { id: 'abyss_wrist', name: '어비스 리스트', stab: 150, hack: 150, int: 150, mr: 150, dex: 65 },
    { id: 'aquilus_wrist', name: '아퀼루스 암릿', stab: 130, hack: 119, int: 119, mr: 130, dex: 55 },
    { id: 'eclipse_wrist', name: '이클립스 리스트', stab: 250, hack: 250, int: 250, mr: 250, dex: 85 },
    { id: 'abyss_armlet', name: '어비스 암릿 (마방/마공)', stab: 0, hack: 0, int: 155, mr: 163, dex: 65 },
    { id: 'custom_wrist', name: '직접 입력', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  head: [
    { id: 'abyss_amulet', name: '어비스 아뮬렛', stab: 102, hack: 102, int: 102, mr: 102, dex: 92 },
    { id: 'aquilus_amulet', name: '아퀼루스 아뮬렛', stab: 83, hack: 94, int: 94, mr: 94, dex: 75 },
    { id: 'eclipse_amulet', name: '이클립스 아뮬렛', stab: 112, hack: 112, int: 112, mr: 112, dex: 105 },
    { id: 'custom_head', name: '직접 입력', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  wings: [
    { id: 'abyss_wings', name: '어비스 윙', stab: 124, hack: 124, int: 124, mr: 124, dex: 92 },
    { id: 'aquilus_wings', name: '아퀼루스 윙', stab: 86, hack: 88, int: 88, mr: 88, dex: 75 },
    { id: 'eclipse_wings', name: '이클립스 윙', stab: 220, hack: 220, int: 220, mr: 220, dex: 115 },
    { id: 'custom_wings', name: '직접 입력', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  hands: [
    { id: 'abyss_gauntlets', name: '어비스 건틀렛', stab: 114, hack: 102, int: 102, mr: 102, dex: 92 },
    { id: 'aquilus_gauntlets', name: '아퀼루스 건틀렛', stab: 92, hack: 82, int: 82, mr: 82, dex: 75 },
    { id: 'eclipse_gauntlets', name: '이클립스 건틀렛', stab: 124, hack: 112, int: 112, mr: 112, dex: 105 },
    { id: 'custom_hands', name: '직접 입력', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  boots: [
    { id: 'abyss_boots', name: '어비스 부츠', stab: 102, hack: 102, int: 102, mr: 102, dex: 92 },
    { id: 'aquilus_boots', name: '아퀼루스 부츠', stab: 82, hack: 82, int: 82, mr: 82, dex: 75 },
    { id: 'eclipse_boots', name: '이클립스 부츠', stab: 112, hack: 112, int: 112, mr: 112, dex: 105 },
    { id: 'custom_boots', name: '직접 입력', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  cuff: [
    { id: 'raido_cuff', name: '라이도 심볼릭 커프', stab: 140, hack: 140, int: 140, mr: 140, dex: 140 },
    { id: 'berka_cuff', name: '베르카 심볼릭 커프', stab: 110, hack: 110, int: 110, mr: 110, dex: 110 },
    { id: 'none_cuff', name: '미착용 (0)', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  effect: [
    { id: 'zodiac_green', name: '조디악 사인 - 그린', stab: 30, hack: 5, int: 0, mr: 0, dex: 30 },
    { id: 'beast_cerberus', name: '환수 케르베로스', stab: 20, hack: 5, int: 0, mr: 0, dex: 20 },
    { id: 'beast_unicorn', name: '환수 유니콘', stab: 0, hack: 0, int: 5, mr: 20, dex: 20 },
    { id: 'beast_leviathan', name: '환수 리바이어던', stab: 0, hack: 0, int: 20, mr: 5, dex: 20 },
    { id: 'none_effect', name: '미착용 (0)', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  artifact: [
    { id: 'akron_defensio', name: '아크론의 자력 디펜시오', stab: 130, hack: 30, int: 0, mr: 0, dex: 45 },
    { id: 'eclipse_defensio', name: '이클립스의 참력 디펜시오', stab: 190, hack: 30, int: 0, mr: 0, dex: 60 },
    { id: 'akron_divine', name: '아크론의 신성 디펜시오', stab: 0, hack: 0, int: 30, mr: 130, dex: 45 },
    { id: 'akron_magic', name: '아크론의 마력', stab: 0, hack: 0, int: 120, mr: 20, dex: 45 },
    { id: 'none_artifact', name: '미착용 (0)', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  relic: [
    { id: 'shinjo_relic', name: '신조의 펜던트, 브레이슬릿', stab: 50, hack: 50, int: 50, mr: 50, dex: 50 },
    { id: 'lunaria_relic', name: '루나리아 펜던트, 브레이슬릿', stab: 200, hack: 200, int: 200, mr: 200, dex: 200 },
    { id: 'sun_relic', name: '태양의 펜던트, 브레이슬릿', stab: 17, hack: 17, int: 17, mr: 17, dex: 17 },
    { id: 'none_relic', name: '미착용 (0)', stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ]
};

// 10대 주요 콘텐츠 및 보스별 계수 & 명중 컷 (DC Inside 216109 & 텔쥐 계수계산기 종합)
const bossContentGuide = [
  { id: 'final_battle', name: '최후의 결전', reqCoeff: 95000, reqDex: 2500, desc: '엔드 극딜·초고난도 (DEX 2,500 미만 시 MISS 발생)' },
  { id: 'golgotha_leader', name: '골고다 선봉대 부대장', reqCoeff: 90000, reqDex: 2450, desc: '골고다 협곡 정예 부대장 (DEX 2,450 컷)' },
  { id: 'apetiria_hard', name: '아페테리아 (어려움/EX)', reqCoeff: 85000, reqDex: 2400, desc: '아페 어려움·채굴장·색을 잃은 땅 (DEX 2,400 컷)' },
  { id: 'golgotha_mob', name: '골고다 잡몹 / 오를리 지옥', reqCoeff: 78000, reqDex: 2200, desc: '골고다 잡몹군 및 오를리 방어전 지옥 난이도' },
  { id: 'vestige', name: '베스티지 (Vestige)', reqCoeff: 75000, reqDex: 1800, desc: '주간 베스티지 전용 레이드 토벌' },
  { id: 'eclipse_6boss', name: '이클립스 6보스 토벌전', reqCoeff: 70000, reqDex: 1650, desc: '로카고스·에토스·체리아·마티아 등 6종 보스전' },
  { id: 'odin_war', name: '오딘 전면전', reqCoeff: 65000, reqDex: 1550, desc: '오딘 요새 전면전 및 대규모 공방' },
  { id: 'abyss_hell', name: '어비스 지옥 (Hell)', reqCoeff: 55000, reqDex: 1350, desc: '심연 3층 어비스 헬 토벌전' },
  { id: 'shinjo_hard', name: '신조의 둥지 (어려움)', reqCoeff: 50000, reqDex: 1300, desc: '신조 하드 파티 레이드' },
  { id: 'mercurial_norm', name: '머큐리얼 / 신조·어비스 일반', reqCoeff: 35000, reqDex: 800, desc: '루미너스·신조일반·어비스 1~2층 일반 난이도' }
];

// 도핑 프리셋 정의 (계수 및 명중 계산기 연동용)
const coeffDopingPresets = {
  none: {
    name: '도핑 없음',
    stab: 0, hack: 0, int: 0, mr: 0, dex: 0,
    desc: '순수 노도핑 상태의 기본 능력치'
  },
  basic: {
    name: '기본 도핑 (스펙 가이드 표준 8종)',
    stab: 25, hack: 25, int: 25, mr: 25, dex: 35,
    desc: '눈사람+改각성+改신뢰+이자벨 고정/비율/대미지+정제앰플+신속포션'
  },
  full: {
    name: '상급 레이드 풀도핑 (이자벨 특선/비약/Type P)',
    stab: 85, hack: 85, int: 85, mr: 85, dex: 110,
    desc: '이자벨 특선 3종+비약 3종+사미선령+괴력햄+클럽Type P+소울링크'
  },
  tab1_link: {
    name: 'Tab 1 버프 시뮬레이터 실시간 연동',
    stab: 0, hack: 0, int: 0, mr: 0, dex: 0,
    desc: 'Tab 1에서 현재 체크된 도핑 항목들의 스탯을 실시간 자동 합산'
  }
};

// 계산기 기본 프리셋 (스크린샷 기반)
const defaultCoeffProfiles = [
  {
    id: 'preset_screenshot',
    name: '펄스핀 이클 6보스 원활',
    type: 'stab',
    dopingPreset: 'none',
    applyDoping: false,
    baseStats: {
      stab: 658,
      hack: 66,
      int: 0,
      mr: 0,
      dex: 708
    },
    bonusStats: {
      avatar: { stab: 10, hack: 10, dex: 10, int: 0, mr: 0 },
      title: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 },
      card: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 }
    },
    core: 0,
    slots: {
      helm:    { baseId: 'abyss_helm',     enfVal: 20, enfStat: 'HACK', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      armor:   { baseId: 'anomarad_mail',  enfVal: 0,  enfStat: 'STAB', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      weapon:  { baseId: 'fairy_rapier',   enfVal: 61, enfStat: 'HACK', abilMain: 21, abilSub: 0,  abilDex: 17 },
      wrist:   { baseId: 'abyss_wrist',    enfVal: 40, enfStat: 'HACK', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      head:    { baseId: 'abyss_amulet',   enfVal: 20, enfStat: 'HACK', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      wings:   { baseId: 'abyss_wings',    enfVal: 30, enfStat: 'HACK', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      hands:   { baseId: 'abyss_gauntlets',enfVal: 20, enfStat: 'HACK', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      boots:   { baseId: 'abyss_boots',    enfVal: 20, enfStat: 'HACK', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      cuff:    { baseId: 'none_cuff',      enfVal: 0,  enfStat: 'STAB', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      effect:  { baseId: 'none_effect',    enfVal: 0,  enfStat: 'STAB', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      artifact:{ baseId: 'none_artifact',  enfVal: 0,  enfStat: 'STAB', abilMain: 0,  abilSub: 0,  abilDex: 0 },
      relic:   { baseId: 'none_relic',     enfVal: 0,  enfStat: 'STAB', abilMain: 0,  abilSub: 0,  abilDex: 0 }
    },
    // 사전 수동 합산 오버라이드 지원(장비/어빌 총합)
    overrideEquip: {
      stab: 1400,
      hack: 770,
      dex: 891
    },
    overrideEnf: {
      stab: 235,
      hack: 0
    }
  }
];

