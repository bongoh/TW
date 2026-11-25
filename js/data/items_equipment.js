// ============================================================================
// TalesWeaver Equipment & Enhancement Database (items_equipment.js)
// 12부위 실전 장비, 0~12강 공식 강화, 인챈트 품질 및 부가 옵션 전수 DB
// ============================================================================

// 1. 0~12강 강화 공식 수치 테이블 (무기 / 방어구 / DEX 증가치)
var ENHANCE_STAT_TABLE = {
  // 무기 강화 단계별 누적 증가 스탯 (주스탯, DEX)
  weapon: {
    0:  { stat: 0,   dex: 0,  desc: "노강화 (기본 상태)" },
    1:  { stat: 2,   dex: 0,  desc: "1강화" },
    2:  { stat: 4,   dex: 0,  desc: "2강화" },
    3:  { stat: 6,   dex: 0,  desc: "3강화" },
    4:  { stat: 8,   dex: 0,  desc: "4강화" },
    5:  { stat: 10,  dex: 0,  desc: "5강화 (안전 구간 완료)" },
    6:  { stat: 14,  dex: 2,  desc: "6강화" },
    7:  { stat: 18,  dex: 5,  desc: "7강화" },
    8:  { stat: 28,  dex: 8,  desc: "8강화 (실전 입문 구간)" },
    9:  { stat: 42,  dex: 12, desc: "9강화 (상위 징검다리)" },
    10: { stat: 64,  dex: 18, desc: "10강화 (⚖️ 국민작 표준 / 국템)" },
    11: { stat: 102, dex: 28, desc: "11강화 (👑 초월 종결 엔드 스펙)" },
    12: { stat: 140, dex: 38, desc: "12강화 (🔥 극한 초월 엔드 스펙)" }
  },
  // 방어구 (갑옷, 날개, 손목, 투구, 아티팩트 등) 강화 단계별 누적 증가 스탯
  armor: {
    0:  { stat: 0,  dex: 0,  desc: "노강화 (기본 상태)" },
    1:  { stat: 2,  dex: 0,  desc: "1강화" },
    2:  { stat: 4,  dex: 0,  desc: "2강화" },
    3:  { stat: 6,  dex: 0,  desc: "3강화" },
    4:  { stat: 8,  dex: 0,  desc: "4강화" },
    5:  { stat: 10, dex: 0,  desc: "5강화 (안전 구간 완료)" },
    6:  { stat: 13, dex: 1,  desc: "6강화" },
    7:  { stat: 16, dex: 2,  desc: "7강화" },
    8:  { stat: 22, dex: 4,  desc: "8강화" },
    9:  { stat: 30, dex: 6,  desc: "9강화" },
    10: { stat: 45, dex: 10, desc: "10강화 (⚖️ 국민작 표준 / 국템)" },
    11: { stat: 70, dex: 16, desc: "11강화 (👑 초월 종결 엔드 스펙)" },
    12: { stat: 95, dex: 22, desc: "12강화 (🔥 극한 초월 엔드 스펙)" }
  }
};

// 2. 인챈트 품질별 공식 수치 (떡작 vs 국민작 vs 한계작 vs 초한계작)
var ENCHANT_TIER_TABLE = {
  budget: {
    id: "budget",
    name: "📉 떡작 / 노작 (하급작)",
    mainBonus: 3,
    dexBonus: 2,
    desc: "인챈트 수치가 최저치(+0~5)로 낮게 붙은 가성비 매물"
  },
  standard: {
    id: "standard",
    name: "⚖️ 국민작 (실전 표준 국템)",
    mainBonus: 15,
    dexBonus: 10,
    desc: "실전에서 가장 널리 쓰이는 표준 인챈트(+12~16) 완료 매물"
  },
  limit: {
    id: "limit",
    name: "👑 종결 한계작 (극인챈 만수치)",
    mainBonus: 30,
    dexBonus: 20,
    desc: "인크립트 한계 돌파 후 최상급 주문서로 +25~35+ 채운 종결작"
  },
  hyper_limit: {
    id: "hyper_limit",
    name: "🔥 초한계작 (극한 돌파)",
    mainBonus: 35,
    dexBonus: 25,
    desc: "한계치를 초과 달성한 최상위 랭커 전용 극옵션 매물"
  }
};

// 3. 부가 옵션 (어빌리티 & 10대 전이석 랜덤 옵션 풀 & 접두어)
var EQUIP_OPTIONS_DB = {
  prefixes: {
    none:     { id: "none",     name: "일반 (접두어 없음)", label: "",        statBonus: 0,  dexBonus: 0,  dmgBonus: 0 },
    sharp:    { id: "sharp",    name: "예리한 (마공/마방/대미지)", label: "예리한", statBonus: 15, dexBonus: 0,  dmgBonus: 1 },
    swift:    { id: "swift",    name: "신속한 (명중/DEX/딜레이)", label: "신속한", statBonus: 0,  dexBonus: 15, dmgBonus: 0 },
    strong:   { id: "strong",   name: "강력한 (물리 베기/찌르기)", label: "강력한", statBonus: 15, dexBonus: 0,  dmgBonus: 0 },
    critical: { id: "critical", name: "치명적인 (크리티컬 특화)", label: "치명적인", statBonus: 0,  dexBonus: 5,  dmgBonus: 2 },
    solid:    { id: "solid",    name: "단단한 (DEF/HP 특화)", label: "단단한",   statBonus: 0,  dexBonus: 0,  dmgBonus: 0 }
  },
  abilities: {
    none:      { id: "none",      name: "없음 (노어빌)",          stat: 0,  dex: 0,  dmg: 0 },
    normal:    { id: "normal",    name: "상급 어빌리티 (딜+2%)",   stat: 18, dex: 8,  dmg: 2 },
    superior:  { id: "superior",  name: "최상급 어빌리티 (딜+3%)", stat: 25, dex: 12, dmg: 3 }
  },
  randomOptions: {
    dmg: [
      { id: "none", name: "0%", val: 0 },
      { id: "dmg_3", name: "+3% (국민)", val: 3 },
      { id: "dmg_5", name: "+5% (종결)", val: 5 },
      { id: "dmg_6", name: "+6% (극옵)", val: 6 }
    ],
    delay_fix: [
      { id: "none", name: "미적용", val: 0 },
      { id: "delay_fixed", name: "⚡ 후딜 고정 (0초)", val: 1 }
    ],
    crit_dmg: [
      { id: "none", name: "0%", val: 0 },
      { id: "crit_3", name: "+3%", val: 3 },
      { id: "crit_5", name: "+5%", val: 5 },
      { id: "crit_6", name: "+6%", val: 6 }
    ],
    boss_dmg: [
      { id: "none", name: "0%", val: 0 },
      { id: "boss_3", name: "+3%", val: 3 },
      { id: "boss_5", name: "+5%", val: 5 }
    ],
    def_ignore: [
      { id: "none", name: "0%", val: 0 },
      { id: "def_3", name: "+3%", val: 3 },
      { id: "def_5", name: "+5%", val: 5 }
    ],
    main_stat: [
      { id: "none", name: "+0", val: 0 },
      { id: "stat_15", name: "+15", val: 15 },
      { id: "stat_25", name: "+25", val: 25 },
      { id: "stat_35", name: "+35", val: 35 }
    ],
    dex_acc: [
      { id: "none", name: "+0", val: 0 },
      { id: "acc_15", name: "+15 (국민)", val: 15 },
      { id: "acc_25", name: "+25 (종결)", val: 25 },
      { id: "acc_35", name: "+35 (극옵)", val: 35 }
    ],
    element: [
      { id: "none", name: "+0", val: 0 },
      { id: "elem_10", name: "+10 (국민)", val: 10 },
      { id: "elem_15", name: "+15 (종결)", val: 15 },
      { id: "elem_20", name: "+20 (극옵)", val: 20 }
    ],
    dmg_reduce: [
      { id: "none", name: "0%", val: 0 },
      { id: "red_3", name: "-3%", val: 3 },
      { id: "red_5", name: "-5%", val: 5 }
    ],
    max_hp: [
      { id: "none", name: "+0", val: 0 },
      { id: "hp_5000", name: "+5,000", val: 5000 },
      { id: "hp_10000", name: "+10,000", val: 10000 }
    ],
    acc: [
      { id: "none", name: "+0", val: 0 },
      { id: "acc_15", name: "+15 (국민)", val: 15 },
      { id: "acc_25", name: "+25 (종결)", val: 25 },
      { id: "acc_35", name: "+35 (극옵)", val: 35 }
    ],
    elem: [
      { id: "none", name: "+0", val: 0 },
      { id: "elem_10", name: "+10 (국민)", val: 10 },
      { id: "elem_15", name: "+15 (종결)", val: 15 },
      { id: "elem_20", name: "+20 (극옵)", val: 20 }
    ]
  }
};

// 4. 국템(표준 국민작) 템플릿 기본값
var KOREAN_STANDARD_TEMPLATE = {
  name: "⚖️ 실전 국템 (어비스 8세트 10강 국민작 기준)",
  weapon: { tier: "abyss", enhance: 10, quality: "standard", customStat: 15, customDex: 10, ability: "superior", optDmg: 3, optAcc: 15, optElem: 10 },
  armor:  { tier: "abyss", enhance: 10, quality: "standard", customStat: 15, customDex: 10, ability: "superior", optDmg: 0, optAcc: 15, optElem: 10 },
  wings:  { tier: "abyss", enhance: 10, quality: "standard", customStat: 15, customDex: 10, ability: "superior", optDmg: 0, optAcc: 15, optElem: 10 },
  wrist:  { tier: "abyss", enhance: 10, quality: "standard", customStat: 15, customDex: 10, ability: "superior", optDmg: 0, optAcc: 15, optElem: 10 },
  effect: { tier: "60effect", enhance: 0, quality: "standard", customStat: 60, customDex: 35, ability: "none", optDmg: 0, optAcc: 0, optElem: 0 },
  cuff:   { tier: "cuff140",  enhance: 0, quality: "standard", customStat: 140, customDex: 35, ability: "none", optDmg: 0, optAcc: 0, optElem: 0 },
  artifact:{ tier: "abyss", enhance: 10, quality: "standard", customStat: 15, customDex: 10, ability: "superior", optDmg: 0, optAcc: 15, optElem: 10 },
  relic:  { tier: "relic8",   enhance: 8, quality: "standard", customStat: 80, customDex: 30, ability: "none", optDmg: 0, optAcc: 0, optElem: 0 }
};

// 5. 테일즈위버 인게임 장비창(Equip Window) 슬롯 구조 정의
var TW_INGAME_EQUIP_LAYOUT = [
  {
    rowKey: "head",
    real: { key: "head", label: "REAL HEAD", defaultName: "어비스 헬름", defaultDur: "(52/52)", rarity: "abyss", icon: "👑" },
    show: { key: "showHead", label: "SHOW HEAD", defaultName: "별빛 요정 리본", defaultDur: "(100/100)", rarity: "avatar", icon: "🎀", defaultOn: true }
  },
  {
    rowKey: "armor",
    real: { key: "armor", label: "REAL ARMOR", defaultName: "+10 어비스 메일/로브", defaultDur: "(84/84)", rarity: "abyss", icon: "🥋" },
    show: { key: "showArmor", label: "SHOW ARMOR", defaultName: "아바타 수영복 (화이트)", defaultDur: "(100/100)", rarity: "avatar", icon: "👗", defaultOn: true }
  },
  {
    rowKey: "arms",
    real: { key: "arms", label: "REAL ARMS", defaultName: "+10 어비스 무기", defaultDur: "(87/98)", rarity: "abyss", icon: "⚔️" },
    show: { key: "showArms", label: "SHOW ARMS", defaultName: "빈 슬롯", defaultDur: "", rarity: "empty", icon: "🗡️", defaultOn: false }
  },
  {
    rowKey: "subArms",
    real: { key: "subArms", label: "REAL SUB ARMS", defaultName: "어비스 리스트 / 펜듈럼", defaultDur: "(48/52)", rarity: "abyss", icon: "🛡️" },
    show: { key: "showSubArms", label: "SHOW SUB ARMS", defaultName: "라이도 심볼릭 커프 (140)", defaultDur: "(100/100)", rarity: "gold", icon: "💍", defaultOn: true }
  },
  {
    rowKey: "face",
    real: { key: "face", label: "REAL FACE", defaultName: "어비스 아뮬렛", defaultDur: "(30/30)", rarity: "abyss", icon: "📿" },
    show: { key: "showFace", label: "SHOW FACE", defaultName: "테트라의 넥타이", defaultDur: "(100/100)", rarity: "avatar", icon: "👔", defaultOn: true }
  },
  {
    rowKey: "back",
    real: { key: "back", label: "REAL BACK", defaultName: "어비스 윙", defaultDur: "(48/48)", rarity: "abyss", icon: "🪶" },
    show: { key: "showBack", label: "SHOW BACK", defaultName: "별빛 유리 날개", defaultDur: "(100/100)", rarity: "avatar", icon: "🪽", defaultOn: false }
  },
  {
    rowKey: "hand",
    isSingle: true,
    real: { key: "hand", label: "HAND", defaultName: "어비스 건틀렛", defaultDur: "(48/48)", rarity: "abyss", icon: "🧤" }
  },
  {
    rowKey: "foot",
    real: { key: "foot", label: "REAL FOOT", defaultName: "어비스 부츠", defaultDur: "(52/52)", rarity: "abyss", icon: "👢" },
    show: { key: "showFoot", label: "SHOW FOOT", defaultName: "밀키웨이 발자국", defaultDur: "(100/100)", rarity: "avatar", icon: "✨", defaultOn: true }
  },
  {
    rowKey: "effect",
    real: { key: "effect", label: "REAL EFFECT", defaultName: "[넥슨30주년] 빛나는 효과 (60마방)", defaultDur: "(55/55)", rarity: "gold", icon: "🌟" },
    show: { key: "showEffect", label: "SHOW EFFECT", defaultName: "시오칸하임 마법진", defaultDur: "(100/100)", rarity: "avatar", icon: "🌀", defaultOn: true }
  },
  {
    rowKey: "artifact",
    isSingle: true,
    real: { key: "artifact", label: "ARTIFACT", defaultName: "아크론의 참력 / 디바인", defaultDur: "(40/40)", rarity: "purple", icon: "🔮" }
  },
  {
    rowKey: "relic",
    real: { key: "relicRight", label: "RELIC (RIGHT)", defaultName: "신조의 펜던트 (+4)", defaultDur: "(100/100)", rarity: "relic", icon: "☀️" },
    show: { key: "relicLeft", label: "RELIC (LEFT)", defaultName: "태양의 브레이슬릿 (+4)", defaultDur: "(100/100)", rarity: "relic", icon: "💎", defaultOn: true }
  },
  {
    rowKey: "vehicle",
    isSingle: true,
    real: { key: "vehicle", label: "VEHICLE", defaultName: "빈 슬롯 (탈것 미착용)", defaultDur: "", rarity: "empty", icon: "🐎" }
  }
];

// 6. 장비 등급별 색상 & 내구도 프리셋
var TW_TIER_STYLES = {
  aquilus: { name: "眞 아퀼루스", color: "#38bdf8", class: "tw-rarity-aquilus", baseDur: "(48/52)" },
  abyss:   { name: "어비스",     color: "#c084fc", class: "tw-rarity-abyss",   baseDur: "(52/52)" },
  eclipse: { name: "이클립스",   color: "#fb923c", class: "tw-rarity-eclipse", baseDur: "(65/65)" },
  gold:    { name: "명품/스페셜", color: "#fde68a", class: "tw-rarity-gold",    baseDur: "(55/55)" },
  purple:  { name: "특화 장비",  color: "#d8b4fe", class: "tw-rarity-purple",  baseDur: "(40/40)" },
  avatar:  { name: "아바타",     color: "#f8fafc", class: "tw-rarity-avatar",  baseDur: "(100/100)" },
  relic:   { name: "성소 렐릭",  color: "#93c5fd", class: "tw-rarity-relic",   baseDur: "(100/100)" },
  empty:   { name: "빈 슬롯",    color: "#64748b", class: "tw-rarity-empty",   baseDur: "" }
};

// 7. 인게임 기본 장비 착용 상태
var TW_DEFAULT_EQUIP_STATE = {
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

if (typeof window !== 'undefined') {
  window.ENHANCE_STAT_TABLE = ENHANCE_STAT_TABLE;
  window.ENCHANT_TIER_TABLE = ENCHANT_TIER_TABLE;
  window.EQUIP_OPTIONS_DB = EQUIP_OPTIONS_DB;
  window.KOREAN_STANDARD_TEMPLATE = KOREAN_STANDARD_TEMPLATE;
  window.TW_INGAME_EQUIP_LAYOUT = TW_INGAME_EQUIP_LAYOUT;
  window.TW_TIER_STYLES = TW_TIER_STYLES;
  window.TW_DEFAULT_EQUIP_STATE = TW_DEFAULT_EQUIP_STATE;
}
if (typeof globalThis !== 'undefined') {
  globalThis.ENHANCE_STAT_TABLE = ENHANCE_STAT_TABLE;
  globalThis.ENCHANT_TIER_TABLE = ENCHANT_TIER_TABLE;
  globalThis.EQUIP_OPTIONS_DB = EQUIP_OPTIONS_DB;
  globalThis.KOREAN_STANDARD_TEMPLATE = KOREAN_STANDARD_TEMPLATE;
  globalThis.TW_INGAME_EQUIP_LAYOUT = TW_INGAME_EQUIP_LAYOUT;
  globalThis.TW_TIER_STYLES = TW_TIER_STYLES;
  globalThis.TW_DEFAULT_EQUIP_STATE = TW_DEFAULT_EQUIP_STATE;
}
