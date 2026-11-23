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
