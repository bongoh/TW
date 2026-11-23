/**
 * TalesWeaver Companion Guide - Data & Configurations
 * Thresholds, Doping items, Recipes, Waste Items, and Default Profiles
 */

const STORAGE_KEY = 'tw_anais_weekly_tasks_v1';

// 0. TalesWeaver Playable Characters & Growth Types (18종 캐릭터 & 육성 가능 계열)
const TW_CHARACTERS = [
  {
    id: "anais",
    name: "아나이스 델 카릴",
    types: [
      { id: "magic_def", name: "🛡️ 비호정령 (마방 핸드벨)", defaultWeapon: "abyss_bell", defaultArmor: "eclipse_robe", desc: "레이드 필수 서포터/장판 버퍼" },
      { id: "magic_atk", name: "🔮 파괴정령 (마공 완드)", defaultWeapon: "eclipse_wand", defaultArmor: "anomarad_robe", desc: "장판 지속형 원거리 마법 딜러" }
    ],
    defaultType: "magic_def",
    desc: "비호정령(마방) / 파괴정령(마공)"
  },
  {
    id: "lucian",
    name: "루시안 칼츠",
    types: [
      { id: "stab", name: "🗡️ 찌르기 (레이피어)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "원월드·찬솔 쾌속 찌르기" },
      { id: "hack", name: "🪓 베기 (세이버)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "비연파 고화력 물리 베기" },
      { id: "composite", name: "⚔️ 물리복합 (장검)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "밸런스형 전천후 물리복합" }
    ],
    defaultType: "stab",
    desc: "찌르기(레이피어) / 베기(세이버) / 물복(장검)"
  },
  {
    id: "boris",
    name: "보리스 진네만",
    types: [
      { id: "hack", name: "🪓 베기 (대검/평도)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "핫샷·연 연타 물리 베기 종결" },
      { id: "composite", name: "⚔️ 물리복합 (대검)", defaultWeapon: "eclipse_sword", defaultArmor: "abyss_armor", desc: "묵직한 한 방 광역 물리복합" },
      { id: "magic_slash", name: "🪄 마법베기 (빙한 평도)", defaultWeapon: "eclipse_sword", defaultArmor: "anomarad_mail", desc: "빙격참·프로즌 브레이크 마법베기" }
    ],
    defaultType: "hack",
    desc: "베기(대검) / 물복(대검) / 마베(평도)"
  },
  {
    id: "ispin",
    name: "이스핀 샤를",
    types: [
      { id: "stab", name: "🗡️ 찌르기 (레이피어)", defaultWeapon: "fairy_rapier", defaultArmor: "anomarad_mail", desc: "펄스핀 24타 극딜 찌르기" },
      { id: "hack", name: "🪓 베기 (세이버)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "샤프 샤벨 고속 베기" },
      { id: "composite", name: "⚔️ 물리복합 (장검)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "공방일체 물리복합" }
    ],
    defaultType: "stab",
    desc: "찌르기(펄스핀) / 베기(세이버) / 물복(장검)"
  },
  {
    id: "maximin",
    name: "막시민 리프크네",
    types: [
      { id: "hack", name: "🪓 베기 (평도/세이버)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "오화월광참 호쾌한 물리 베기" },
      { id: "composite", name: "⚔️ 물리복합 (대검)", defaultWeapon: "eclipse_sword", defaultArmor: "abyss_armor", desc: "풍속성 광역 대검 물리복합" },
      { id: "magic_slash", name: "🪄 마법베기 (바람 평도)", defaultWeapon: "eclipse_sword", defaultArmor: "anomarad_mail", desc: "폭풍 마법 결합 하이브리드" }
    ],
    defaultType: "hack",
    desc: "베기(평도) / 물복(대검) / 마베(평도)"
  },
  {
    id: "siblyn",
    name: "시벨린 우",
    types: [
      { id: "stab", name: "🗡️ 찌르기 (창)", defaultWeapon: "abyss_spear", defaultArmor: "anomarad_mail", desc: "투룡 투창 초고화력 단타 찌르기" },
      { id: "composite", name: "⚔️ 물리복합 (봉)", defaultWeapon: "abyss_spear", defaultArmor: "abyss_armor", desc: "홍원단 광역 타격 물리복합" }
    ],
    defaultType: "stab",
    desc: "찌르기(창) / 물리복합(봉)"
  },
  {
    id: "naya",
    name: "나야트레이",
    types: [
      { id: "stab", name: "🗡️ 찌르기 (단도)", defaultWeapon: "abyss_dagger", defaultArmor: "anomarad_mail", desc: "심 28타 초고속 연타 찌르기" },
      { id: "hack", name: "🪓 베기 (단검)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "인술 분신·수리검 베기" }
    ],
    defaultType: "stab",
    desc: "찌르기(단도) / 베기(단검)"
  },
  {
    id: "tichiel",
    name: "티치엘 쥬스피앙",
    types: [
      { id: "magic_atk", name: "🔮 마법공격 (스태프)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "원소 화·수·뇌 마법 폭딜러" },
      { id: "magic_def", name: "🛡️ 백법/서포터 (메이스)", defaultWeapon: "abyss_mace", defaultArmor: "eclipse_robe", desc: "힐·버프·배리어 전문 서포터" },
      { id: "magic_slash", name: "🪄 마법베기 (타격스태프)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "물리 타격과 신성 마법 결합" }
    ],
    defaultType: "magic_atk",
    desc: "마공(스태프) / 백법(메이스) / 마베"
  },
  {
    id: "milla",
    name: "밀라 네브라스카",
    types: [
      { id: "hack", name: "🪓 베기 (채찍)", defaultWeapon: "abyss_whip", defaultArmor: "nenyaple_mail", desc: "카드스프레이 크리티컬 채찍 베기" },
      { id: "composite", name: "⚔️ 물리복합 (플레일)", defaultWeapon: "abyss_whip", defaultArmor: "anomarad_mail", desc: "해적 기질 물리복합 파이터" }
    ],
    defaultType: "hack",
    desc: "베기(채찍) / 물리복합(플레일)"
  },
  {
    id: "cloe",
    name: "클로에 다 폰티나",
    types: [
      { id: "magic_atk", name: "🔮 마법공격 (스태프)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "피닉스·메테오 최상위 광역 마공" },
      { id: "magic_def", name: "🛡️ 마법방어 (마나월 방어)", defaultWeapon: "fairy_staff", defaultArmor: "eclipse_robe", desc: "마나월 기반 금강불괴 마방" }
    ],
    defaultType: "magic_atk",
    desc: "마공(스태프) / 마방(마나월)"
  },
  {
    id: "joshua",
    name: "조슈아 폰 아르님",
    types: [
      { id: "magic_slash", name: "🪄 마법베기 (마법검)", defaultWeapon: "eclipse_sword", defaultArmor: "anomarad_robe", desc: "유령 스탠스 팬텀 스타일 마베" },
      { id: "magic_atk", name: "🔮 마법공격 (방출)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "버프·디버프 복합 마법 방출" },
      { id: "stab", name: "🗡️ 찌르기 (스몰소드)", defaultWeapon: "fairy_rapier", defaultArmor: "anomarad_mail", desc: "귀족 펜싱 쾌속 찌르기" }
    ],
    defaultType: "magic_slash",
    desc: "마베(마법검) / 마공 / 찌르기"
  },
  {
    id: "ranzie",
    name: "란지에 로젠크란츠",
    types: [
      { id: "magic_atk", name: "🔮 마법공격 (마총)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "미스트랄 블레이즈 원거리 마총" },
      { id: "stab", name: "🗡️ 찌르기 (물리총)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "블러디드 샷 물리 피어싱" }
    ],
    defaultType: "magic_atk",
    desc: "마공(마총) / 찌르기(물리총)"
  },
  {
    id: "isaac",
    name: "이자크 듀카스텔",
    types: [
      { id: "stab", name: "🗡️ 찌르기 (클로)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "슬램·크래셔 격투 찌르기" },
      { id: "composite", name: "⚔️ 물리복합 (톤파)", defaultWeapon: "abyss_rapier", defaultArmor: "abyss_armor", desc: "묵직한 톤파 콤보 물리복합" }
    ],
    defaultType: "stab",
    desc: "찌르기(클로) / 물리복합(톤파)"
  },
  {
    id: "roamini",
    name: "로아미니",
    types: [
      { id: "magic_atk", name: "🔮 마법공격 (토템)", defaultWeapon: "abyss_totem", defaultArmor: "anomarad_robe", desc: "포이즌 디버프 및 지속 암흑 마공" }
    ],
    defaultType: "magic_atk",
    desc: "마법공격(토템 디버퍼)"
  },
  {
    id: "benya",
    name: "벤야",
    types: [
      { id: "magic_slash", name: "🪄 마법베기 (사이드 낫)", defaultWeapon: "abyss_scythe", defaultArmor: "anomarad_robe", desc: "헬게이트 광역 사신 낫 마베" },
      { id: "magic_atk", name: "🔮 마법공격 (홀)", defaultWeapon: "fairy_staff", defaultArmor: "eclipse_robe", desc: "샤이닝 컷 홀 원거리 마공" }
    ],
    defaultType: "magic_slash",
    desc: "마베(사이드) / 마공(홀)"
  },
  {
    id: "nocturne",
    name: "녹턴 드 블랑쉬",
    types: [
      { id: "magic_atk", name: "🔮 마법공격 (샷건)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "일렉트릭 샷건 화력 마공" }
    ],
    defaultType: "magic_atk",
    desc: "마법공격(샷건)"
  },
  {
    id: "liche",
    name: "리체 아브릴",
    types: [
      { id: "magic_atk", name: "🔮 마법공격 (펜듈럼)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "피네 멜로디 마법 딜링" },
      { id: "hack", name: "🪓 베기 (아밍소드)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "악의 무구 폭발적 물리 베기" }
    ],
    defaultType: "magic_atk",
    desc: "마공(펜듈럼) / 베기(아밍소드)"
  },
  {
    id: "yepnen",
    name: "예프넨 진네만",
    types: [
      { id: "hack", name: "🪓 베기 (소드/액스)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "5종 무기 형태 변환 물리 베기" },
      { id: "stab", name: "🗡️ 찌르기 (스피어/보우)", defaultWeapon: "abyss_spear", defaultArmor: "anomarad_mail", desc: "장거리 활 및 리치 관통 찌르기" }
    ],
    defaultType: "hack",
    desc: "베기(검/도끼) / 찌르기(창/활)"
  }
];

// 1. Character Archetypes & Dungeon Thresholds (6대 계열별 전수 기준치)
const archetypeConfigs = {
  magic_def: {
    id: 'magic_def',
    name: '마방캐 (비호 아나이스 / 마방 클로에)',
    shortName: '마방캐',
    statName: '마법방어력',
    statCode: 'MR',
    icon: '🛡️',
    placeholder: '예: 1520',
    thresholds: {
      nobuff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1200, mdef: 1200, acc: 1100, elem: 165, eta: 1,  equip: "인퍼널~아퀼루스 셋" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1250, mdef: 1250, acc: 1150, elem: 170, eta: 1,  equip: "아퀼루스 혼합~풀셋" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1350, mdef: 1350, acc: 1250, elem: 180, eta: 1,  equip: "아퀼루스 풀셋" },
        obang_hell:   { name: "오방 헬",           reqMain: 1450, mdef: 1450, acc: 1350, elem: 190, eta: 5,  equip: "아퀼루스 풀~어비스 부위" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 1550, mdef: 1550, acc: 1450, elem: 200, eta: 15, equip: "어비스 4~5셋 (10~12강)" },
        eclipse_high: { name: "이클 중상위",       reqMain: 1750, mdef: 1750, acc: 1500, elem: 205, eta: 21, equip: "어비스 한계작 / 이클 로브" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 1850, mdef: 1850, acc: 2050, elem: 210, eta: 21, equip: "5각 + 어비스·이클 고스펙" }
      },
      buff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1400, mdef: 1400, acc: 1250, elem: 180, eta: 1,  equip: "자버프 + 기본 물약" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1450, mdef: 1450, acc: 1300, elem: 185, eta: 1,  equip: "자버프 + 기본 도핑" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1550, mdef: 1550, acc: 1400, elem: 195, eta: 1,  equip: "자버프 + 비약/물약" },
        obang_hell:   { name: "오방 헬",           reqMain: 1700, mdef: 1700, acc: 1500, elem: 205, eta: 5,  equip: "실전 버프 + 노란 장판" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 1800, mdef: 1800, acc: 1600, elem: 210, eta: 15, equip: "실전 풀버프 + 비약·묘약" },
        eclipse_high: { name: "이클 중상위",       reqMain: 2000, mdef: 2000, acc: 1650, elem: 215, eta: 21, equip: "실전 풀버프 + 어스 프로텍션" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 2100, mdef: 2100, acc: 2250, elem: 220, eta: 21, equip: "실전 풀버프 (막보 명중 2,250)" }
      }
    }
  },
  stab: {
    id: 'stab',
    name: '찌르기캐 (루시안 / 이스핀 / 나야 / 시벨린 / 막시민)',
    shortName: '찌르기캐',
    statName: '찌르기 공격력',
    statCode: 'STAB',
    icon: '🗡️',
    placeholder: '예: 2293',
    thresholds: {
      nobuff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1400, mdef: 1400, acc: 1100, elem: 165, eta: 1,  equip: "인퍼널~아퀼루스 셋" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1600, mdef: 1600, acc: 1150, elem: 170, eta: 1,  equip: "아퀼루스 혼합~풀셋" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1800, mdef: 1800, acc: 1250, elem: 180, eta: 1,  equip: "아퀼루스 풀셋" },
        obang_hell:   { name: "오방 헬",           reqMain: 1950, mdef: 1950, acc: 1350, elem: 190, eta: 5,  equip: "아퀼루스 풀~어비스 부위" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 2100, mdef: 2100, acc: 1450, elem: 200, eta: 15, equip: "어비스 4~5셋 (10~12강)" },
        eclipse_high: { name: "이클 중상위",       reqMain: 2300, mdef: 2300, acc: 1500, elem: 205, eta: 21, equip: "어비스 한계작 / 이클 셋" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 2500, mdef: 2500, acc: 2050, elem: 210, eta: 21, equip: "5각 + 어비스·이클 고스펙" }
      },
      buff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1600, mdef: 1600, acc: 1250, elem: 180, eta: 1,  equip: "자버프 + 기본 물약" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1850, mdef: 1850, acc: 1300, elem: 185, eta: 1,  equip: "자버프 + 기본 도핑" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 2050, mdef: 2050, acc: 1400, elem: 195, eta: 1,  equip: "자버프 + 비약/물약" },
        obang_hell:   { name: "오방 헬",           reqMain: 2200, mdef: 2200, acc: 1500, elem: 205, eta: 5,  equip: "실전 버프 + 공격 도핑" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 2350, mdef: 2350, acc: 1600, elem: 210, eta: 15, equip: "실전 풀버프 + 비약·묘약" },
        eclipse_high: { name: "이클 중상위",       reqMain: 2550, mdef: 2550, acc: 1650, elem: 215, eta: 21, equip: "실전 풀버프 + 극딜 도핑" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 2800, mdef: 2800, acc: 2250, elem: 220, eta: 21, equip: "실전 풀버프 (막보 명중 2,250)" }
      }
    }
  },
  hack: {
    id: 'hack',
    name: '베기캐 (보리스 / 막시민 / 밀라 / 루시안 / 이스핀)',
    shortName: '베기캐',
    statName: '베기 공격력',
    statCode: 'HACK',
    icon: '🪓',
    placeholder: '예: 2350',
    thresholds: {
      nobuff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1400, mdef: 1400, acc: 1100, elem: 165, eta: 1,  equip: "인퍼널~아퀼루스 셋" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1600, mdef: 1600, acc: 1150, elem: 170, eta: 1,  equip: "아퀼루스 혼합~풀셋" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1800, mdef: 1800, acc: 1250, elem: 180, eta: 1,  equip: "아퀼루스 풀셋" },
        obang_hell:   { name: "오방 헬",           reqMain: 1950, mdef: 1950, acc: 1350, elem: 190, eta: 5,  equip: "아퀼루스 풀~어비스 부위" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 2100, mdef: 2100, acc: 1450, elem: 200, eta: 15, equip: "어비스 4~5셋 (10~12강)" },
        eclipse_high: { name: "이클 중상위",       reqMain: 2300, mdef: 2300, acc: 1500, elem: 205, eta: 21, equip: "어비스 한계작 / 이클 셋" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 2500, mdef: 2500, acc: 2050, elem: 210, eta: 21, equip: "5각 + 어비스·이클 고스펙" }
      },
      buff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1600, mdef: 1600, acc: 1250, elem: 180, eta: 1,  equip: "자버프 + 기본 물약" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1850, mdef: 1850, acc: 1300, elem: 185, eta: 1,  equip: "자버프 + 기본 도핑" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 2050, mdef: 2050, acc: 1400, elem: 195, eta: 1,  equip: "자버프 + 비약/물약" },
        obang_hell:   { name: "오방 헬",           reqMain: 2200, mdef: 2200, acc: 1500, elem: 205, eta: 5,  equip: "실전 버프 + 공격 도핑" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 2350, mdef: 2350, acc: 1600, elem: 210, eta: 15, equip: "실전 풀버프 + 비약·묘약" },
        eclipse_high: { name: "이클 중상위",       reqMain: 2550, mdef: 2550, acc: 1650, elem: 215, eta: 21, equip: "실전 풀버프 + 극딜 도핑" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 2800, mdef: 2800, acc: 2250, elem: 220, eta: 21, equip: "실전 풀버프 (막보 명중 2,250)" }
      }
    }
  },
  magic_atk: {
    id: 'magic_atk',
    name: '마공캐 (클로에 / 티치엘 / 란지에 / 로아미니)',
    shortName: '마공캐',
    statName: '마법공격력',
    statCode: 'INT',
    icon: '🔮',
    placeholder: '예: 2250',
    thresholds: {
      nobuff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1350, mdef: 1350, acc: 1100, elem: 165, eta: 1,  equip: "인퍼널~아퀼루스 셋" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1550, mdef: 1550, acc: 1150, elem: 170, eta: 1,  equip: "아퀼루스 혼합~풀셋" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1750, mdef: 1750, acc: 1250, elem: 180, eta: 1,  equip: "아퀼루스 풀셋" },
        obang_hell:   { name: "오방 헬",           reqMain: 1900, mdef: 1900, acc: 1350, elem: 190, eta: 5,  equip: "아퀼루스 풀~어비스 부위" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 2050, mdef: 2050, acc: 1450, elem: 200, eta: 15, equip: "어비스 4~5셋 (10~12강)" },
        eclipse_high: { name: "이클 중상위",       reqMain: 2250, mdef: 2250, acc: 1500, elem: 205, eta: 21, equip: "어비스 한계작 / 이클 셋" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 2450, mdef: 2450, acc: 2050, elem: 210, eta: 21, equip: "5각 + 어비스·이클 고스펙" }
      },
      buff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1550, mdef: 1550, acc: 1250, elem: 180, eta: 1,  equip: "자버프 + 기본 물약" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1750, mdef: 1750, acc: 1300, elem: 185, eta: 1,  equip: "자버프 + 기본 도핑" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1950, mdef: 1950, acc: 1400, elem: 195, eta: 1,  equip: "자버프 + 비약/물약" },
        obang_hell:   { name: "오방 헬",           reqMain: 2150, mdef: 2150, acc: 1500, elem: 205, eta: 5,  equip: "실전 버프 + 마공 도핑" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 2300, mdef: 2300, acc: 1600, elem: 210, eta: 15, equip: "실전 풀버프 + 비약·묘약" },
        eclipse_high: { name: "이클 중상위",       reqMain: 2500, mdef: 2500, acc: 1650, elem: 215, eta: 21, equip: "실전 풀버프 + 극마공 도핑" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 2750, mdef: 2750, acc: 2250, elem: 220, eta: 21, equip: "실전 풀버프 (막보 명중 2,250)" }
      }
    }
  },
  composite: {
    id: 'composite',
    name: '물리복합캐 (보리스 / 루시안 / 이스핀)',
    shortName: '물리복합캐',
    statName: '물리복합 공격력 (STAB/HACK)',
    statCode: 'STAB/HACK',
    icon: '⚔️',
    placeholder: '예: 1500',
    thresholds: {
      nobuff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1000, mdef: 1000, acc: 1100, elem: 165, eta: 1,  equip: "인퍼널~아퀼루스 셋" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1150, mdef: 1150, acc: 1150, elem: 170, eta: 1,  equip: "아퀼루스 혼합~풀셋" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1300, mdef: 1300, acc: 1250, elem: 180, eta: 1,  equip: "아퀼루스 풀셋" },
        obang_hell:   { name: "오방 헬",           reqMain: 1400, mdef: 1400, acc: 1350, elem: 190, eta: 5,  equip: "아퀼루스 풀~어비스 부위" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 1500, mdef: 1500, acc: 1450, elem: 200, eta: 15, equip: "어비스 4~5셋 (10~12강)" },
        eclipse_high: { name: "이클 중상위",       reqMain: 1650, mdef: 1650, acc: 1500, elem: 205, eta: 21, equip: "어비스 한계작 / 이클 셋" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 1800, mdef: 1800, acc: 2050, elem: 210, eta: 21, equip: "5각 + 어비스·이클 고스펙" }
      },
      buff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1150, mdef: 1150, acc: 1250, elem: 180, eta: 1,  equip: "자버프 + 기본 물약" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1300, mdef: 1300, acc: 1300, elem: 185, eta: 1,  equip: "자버프 + 기본 도핑" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1450, mdef: 1450, acc: 1400, elem: 195, eta: 1,  equip: "자버프 + 비약/물약" },
        obang_hell:   { name: "오방 헬",           reqMain: 1600, mdef: 1600, acc: 1500, elem: 205, eta: 5,  equip: "실전 버프 + 복합 도핑" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 1750, mdef: 1750, acc: 1600, elem: 210, eta: 15, equip: "실전 풀버프 + 비약·묘약" },
        eclipse_high: { name: "이클 중상위",       reqMain: 1900, mdef: 1900, acc: 1650, elem: 215, eta: 21, equip: "실전 풀버프 + 극딜 도핑" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 2100, mdef: 2100, acc: 2250, elem: 220, eta: 21, equip: "실전 풀버프 (막보 명중 2,250)" }
      }
    }
  },
  magic_slash: {
    id: 'magic_slash',
    name: '마법베기캐 (티치엘 / 조슈아)',
    shortName: '마법베기캐',
    statName: '마법베기 공격력 (HACK/INT)',
    statCode: 'HACK/INT',
    icon: '🪄',
    placeholder: '예: 1450',
    thresholds: {
      nobuff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1000, mdef: 1000, acc: 1100, elem: 165, eta: 1,  equip: "인퍼널~아퀼루스 셋" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1150, mdef: 1150, acc: 1150, elem: 170, eta: 1,  equip: "아퀼루스 혼합~풀셋" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1300, mdef: 1300, acc: 1250, elem: 180, eta: 1,  equip: "아퀼루스 풀셋" },
        obang_hell:   { name: "오방 헬",           reqMain: 1400, mdef: 1400, acc: 1350, elem: 190, eta: 5,  equip: "아퀼루스 풀~어비스 부위" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 1500, mdef: 1500, acc: 1450, elem: 200, eta: 15, equip: "어비스 4~5셋 (10~12강)" },
        eclipse_high: { name: "이클 중상위",       reqMain: 1650, mdef: 1650, acc: 1500, elem: 205, eta: 21, equip: "어비스 한계작 / 이클 셋" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 1800, mdef: 1800, acc: 2050, elem: 210, eta: 21, equip: "5각 + 어비스·이클 고스펙" }
      },
      buff: {
        shinjo:       { name: "신조의 둥지(일반)", reqMain: 1150, mdef: 1150, acc: 1250, elem: 180, eta: 1,  equip: "자버프 + 기본 물약" },
        abyss_normal: { name: "어비스·머큐리얼(일반/어려움)", reqMain: 1300, mdef: 1300, acc: 1300, elem: 185, eta: 1,  equip: "자버프 + 기본 도핑" },
        abyss_hell:   { name: "어비스 헬",         reqMain: 1450, mdef: 1450, acc: 1400, elem: 195, eta: 1,  equip: "자버프 + 비약/물약" },
        obang_hell:   { name: "오방 헬",           reqMain: 1600, mdef: 1600, acc: 1500, elem: 205, eta: 5,  equip: "실전 버프 + 마베 도핑" },
        rokagos:      { name: "로카고스(이클)",    reqMain: 1750, mdef: 1750, acc: 1600, elem: 210, eta: 15, equip: "실전 풀버프 + 비약·묘약" },
        eclipse_high: { name: "이클 중상위",       reqMain: 1900, mdef: 1900, acc: 1650, elem: 215, eta: 21, equip: "실전 풀버프 + 극딜 도핑" },
        obang_abyss:  { name: "오방 어비스(5각)",   reqMain: 2100, mdef: 2100, acc: 2250, elem: 220, eta: 21, equip: "실전 풀버프 (막보 명중 2,250)" }
      }
    }
  }
};

// Legacy alias for backward compatibility
const thresholds = archetypeConfigs.magic_def.thresholds;

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
    characterId: 'anais',
    archetype: 'magic_def',
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
    characterId: 'roamini',
    archetype: 'magic_atk',
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
    { id: "abyss_helm", name: "어비스 헬름 (마방 134/물리 102)", stab: 102, hack: 102, int: 102, mr: 134, dex: 92 },
    { id: "eclipse_helm", name: "이클립스 헬름 (112)", stab: 112, hack: 112, int: 112, mr: 112, dex: 105 },
    { id: "aquilus_helm", name: "아퀼루스 헬름", stab: 85, hack: 85, int: 85, mr: 81, dex: 75 },
    { id: "infernal_helm", name: "인퍼널 헬름", stab: 70, hack: 70, int: 70, mr: 65, dex: 60 },
    { id: "custom_helm", name: "직접 입력", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  armor: [
    { id: "anomarad_mail", name: "매서운 아노마라드 메일 (찌르기 50)", stab: 50, hack: 0, int: 0, mr: 0, dex: 80 },
    { id: "anomarad_robe", name: "총명한 아노마라드 로브 (마공 50)", stab: 0, hack: 0, int: 50, mr: 50, dex: 80 },
    { id: "nenyaple_mail", name: "예리한 네냐플 학원 메일 (베기 50)", stab: 50, hack: 50, int: 0, mr: 0, dex: 70 },
    { id: "eclipse_robe", name: "이클립스 로브 (마방 447)", stab: 0, hack: 0, int: 140, mr: 447, dex: 110 },
    { id: "abyss_armor", name: "어비스 아머 (120)", stab: 120, hack: 120, int: 120, mr: 120, dex: 95 },
    { id: "aquilus_armor", name: "아퀼루스 아머 (95)", stab: 95, hack: 95, int: 95, mr: 95, dex: 80 },
    { id: "custom_armor", name: "직접 입력", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  weapon: [
    { id: "fairy_rapier", name: "페어리 피타 레이피어 (찌르기 280)", stab: 280, hack: 0, int: 0, mr: 0, dex: 25 },
    { id: "abyss_rapier", name: "어비스 레이피어 (찌르기 374)", stab: 374, hack: 130, int: 0, mr: 0, dex: 35 },
    { id: "abyss_spear", name: "어비스 스피어 (창 - 찌르기 410 / 베기 120)", stab: 410, hack: 120, int: 0, mr: 0, dex: 35 },
    { id: "abyss_dagger", name: "어비스 대거 (단도 - 찌르기 360 / 베기 150)", stab: 360, hack: 150, int: 0, mr: 0, dex: 40 },
    { id: "eclipse_sword", name: "이클립스 소드셰이프 (베기 474)", stab: 170, hack: 474, int: 0, mr: 0, dex: 50 },
    { id: "abyss_whip", name: "어비스 휩 (채찍 - 베기 395 / 찌르기 160)", stab: 160, hack: 395, int: 0, mr: 0, dex: 45 },
    { id: "abyss_scythe", name: "어비스 사이드 (낫 - 베기 410 / 마공 280)", stab: 0, hack: 410, int: 280, mr: 0, dex: 45 },
    { id: "fairy_staff", name: "페어리 피타 스태프 (마공 309)", stab: 0, hack: 0, int: 309, mr: 0, dex: 25 },
    { id: "abyss_bell", name: "어비스 핸드벨 (마방 354 / 마공 130)", stab: 0, hack: 0, int: 130, mr: 354, dex: 35 },
    { id: "abyss_mace", name: "어비스 메이스 (메이스 - 마방 345 / 마공 190)", stab: 0, hack: 0, int: 190, mr: 345, dex: 35 },
    { id: "abyss_totem", name: "어비스 토템 (토템 - 마공 385 / 마방 140)", stab: 0, hack: 0, int: 385, mr: 140, dex: 35 },
    { id: "eclipse_wand", name: "이클립스 완드 (마공 474)", stab: 0, hack: 0, int: 474, mr: 170, dex: 50 },
    { id: "custom_weapon", name: "직접 입력", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  wrist: [
    { id: "abyss_wrist", name: "어비스 리스트 (물리 150)", stab: 150, hack: 150, int: 0, mr: 0, dex: 65 },
    { id: "abyss_armlet", name: "어비스 암릿 (마방 163 / 마공 155)", stab: 0, hack: 0, int: 155, mr: 163, dex: 65 },
    { id: "aquilus_wrist", name: "아퀼루스 암릿 (130)", stab: 130, hack: 119, int: 119, mr: 130, dex: 55 },
    { id: "eclipse_wrist", name: "이클립스 리스트 (250)", stab: 250, hack: 250, int: 250, mr: 250, dex: 85 },
    { id: "custom_wrist", name: "직접 입력", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  head: [
    { id: "abyss_amulet", name: "어비스 아뮬렛 (102)", stab: 102, hack: 102, int: 102, mr: 102, dex: 92 },
    { id: "eclipse_amulet", name: "이클립스 아뮬렛 (112)", stab: 112, hack: 112, int: 112, mr: 112, dex: 105 },
    { id: "aquilus_amulet", name: "아퀼루스 아뮬렛 (83)", stab: 83, hack: 94, int: 94, mr: 94, dex: 75 },
    { id: "custom_head", name: "직접 입력", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  wings: [
    { id: "abyss_wings", name: "어비스 윙 (마방 92 / 물리 124)", stab: 124, hack: 124, int: 124, mr: 92, dex: 92 },
    { id: "eclipse_wings", name: "이클립스 윙 (220)", stab: 220, hack: 220, int: 220, mr: 220, dex: 115 },
    { id: "aquilus_wings", name: "아퀼루스 윙 (86)", stab: 86, hack: 88, int: 88, mr: 88, dex: 75 },
    { id: "custom_wings", name: "직접 입력", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  hands: [
    { id: "abyss_gauntlets", name: "어비스 건틀렛 (114)", stab: 114, hack: 102, int: 102, mr: 114, dex: 92 },
    { id: "eclipse_gauntlets", name: "이클립스 건틀렛 (124)", stab: 124, hack: 112, int: 112, mr: 124, dex: 105 },
    { id: "aquilus_gauntlets", name: "아퀼루스 건틀렛 (92)", stab: 92, hack: 82, int: 82, mr: 82, dex: 75 },
    { id: "custom_hands", name: "직접 입력", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  boots: [
    { id: "abyss_boots", name: "어비스 부츠 (102)", stab: 102, hack: 102, int: 102, mr: 102, dex: 92 },
    { id: "eclipse_boots", name: "이클립스 부츠 (112)", stab: 112, hack: 112, int: 112, mr: 112, dex: 105 },
    { id: "aquilus_boots", name: "아퀼루스 부츠 (82)", stab: 82, hack: 82, int: 82, mr: 82, dex: 75 },
    { id: "custom_boots", name: "직접 입력", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  cuff: [
    { id: "raido_cuff", name: "라이도 심볼릭 커프 (올스탯 140)", stab: 140, hack: 140, int: 140, mr: 140, dex: 140 },
    { id: "berka_cuff", name: "베르카 심볼릭 커프 (올스탯 110)", stab: 110, hack: 110, int: 110, mr: 110, dex: 110 },
    { id: "none_cuff", name: "미착용 (0)", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  effect: [
    { id: "zodiac_green", name: "조디악 사인 - 그린", stab: 30, hack: 5, int: 0, mr: 0, dex: 30 },
    { id: "beast_cerberus", name: "환수 케르베로스", stab: 20, hack: 5, int: 0, mr: 0, dex: 20 },
    { id: "beast_unicorn", name: "환수 유니콘 (마방 20)", stab: 0, hack: 0, int: 5, mr: 20, dex: 20 },
    { id: "beast_leviathan", name: "환수 리바이어던 (마공 20)", stab: 0, hack: 0, int: 20, mr: 5, dex: 20 },
    { id: "none_effect", name: "미착용 (0)", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  artifact: [
    { id: "akron_defensio", name: "아크론의 자력 디펜시오", stab: 130, hack: 30, int: 0, mr: 0, dex: 45 },
    { id: "eclipse_defensio", name: "이클립스의 참력 디펜시오", stab: 190, hack: 30, int: 0, mr: 0, dex: 60 },
    { id: "akron_divine", name: "아크론의 신성 디펜시오 (마방 130)", stab: 0, hack: 0, int: 30, mr: 130, dex: 45 },
    { id: "akron_magic", name: "아크론의 마력 (마공 120)", stab: 0, hack: 0, int: 120, mr: 20, dex: 45 },
    { id: "none_artifact", name: "미착용 (0)", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ],
  relic: [
    { id: "shinjo_relic", name: "신조의 펜던트, 브레이슬릿", stab: 50, hack: 50, int: 50, mr: 50, dex: 50 },
    { id: "lunaria_relic", name: "루나리아 펜던트, 브레이슬릿", stab: 200, hack: 200, int: 200, mr: 200, dex: 200 },
    { id: "sun_relic", name: "태양의 펜던트, 브레이슬릿", stab: 17, hack: 17, int: 17, mr: 17, dex: 17 },
    { id: "none_relic", name: "미착용 (0)", stab: 0, hack: 0, int: 0, mr: 0, dex: 0 }
  ]
};

// 10대 주요 콘텐츠 및 보스별 계수 & 명중 컷 (DC Inside 216109 & 텔쥐 계수계산기 종합)
const bossContentGuide = [
  { id: "final_battle", name: "최후의 결전", reqCoeff: 95000, reqDex: 2500, desc: "엔드 극딜·초고난도 (DEX 2,500 미만 시 MISS 발생)" },
  { id: "golgotha_leader", name: "골고다 선봉대 부대장", reqCoeff: 90000, reqDex: 2450, desc: "골고다 협곡 정예 부대장 (DEX 2,450 컷)" },
  { id: "apetiria_hard", name: "아페테리아 (어려움/EX)", reqCoeff: 85000, reqDex: 2400, desc: "아페 어려움·채굴장·색을 잃은 땅 (DEX 2,400 컷)" },
  { id: "golgotha_mob", name: "골고다 잡몹 / 오를리 지옥", reqCoeff: 78000, reqDex: 2200, desc: "골고다 잡몹군 및 오를리 방어전 지옥 난이도" },
  { id: "vestige", name: "베스티지 (Vestige)", reqCoeff: 75000, reqDex: 1800, desc: "주간 베스티지 전용 레이드 토벌" },
  { id: "eclipse_6boss", name: "이클립스 6보스 토벌전", reqCoeff: 70000, reqDex: 1650, desc: "로카고스·에토스·체리아·마티아 등 6종 보스전" },
  { id: "odin_war", name: "오딘 전면전", reqCoeff: 65000, reqDex: 1550, desc: "오딘 요새 전면전 및 대규모 공방" },
  { id: "abyss_hell", name: "어비스 지옥 (Hell)", reqCoeff: 55000, reqDex: 1350, desc: "심연 3층 어비스 헬 토벌전" },
  { id: "shinjo_hard", name: "신조의 둥지 (어려움)", reqCoeff: 50000, reqDex: 1300, desc: "신조 하드 파티 레이드" },
  { id: "mercurial_norm", name: "머큐리얼 / 신조·어비스 일반", reqCoeff: 35000, reqDex: 800, desc: "루미너스·신조일반·어비스 1~2층 일반 난이도" }
];

// 도핑 프리셋 정의 (계수 및 명중 계산기 연동용)
const coeffDopingPresets = {
  none: {
    name: "도핑 없음",
    stab: 0, hack: 0, int: 0, mr: 0, dex: 0,
    desc: "순수 노도핑 상태의 기본 능력치"
  },
  basic: {
    name: "기본 도핑 (스펙 가이드 표준 8종)",
    stab: 25, hack: 25, int: 25, mr: 25, dex: 35,
    desc: "눈사람+改각성+改신뢰+이자벨 고정/비율/대미지+정제앰플+신속포션"
  },
  full: {
    name: "상급 레이드 풀도핑 (이자벨 특선/비약/Type P)",
    stab: 85, hack: 85, int: 85, mr: 85, dex: 110,
    desc: "이자벨 특선 3종+비약 3종+사미선령+괴력햄+클럽Type P+소울링크"
  },
  tab1_link: {
    name: "Tab 1 버프 시뮬레이터 실시간 연동",
    stab: 0, hack: 0, int: 0, mr: 0, dex: 0,
    desc: "Tab 1에서 현재 체크된 도핑 항목들의 스탯을 실시간 자동 합산"
  }
};

// 6개 계열별 정석 검증 프리셋 (구글 시트 & 스크린샷 원본)
const defaultCoeffProfiles = [
  {
    id: "preset_screenshot",
    name: "① [찌르기] 펄스핀 이클 6보스 원활 (스크린샷 세팅)",
    type: "stab",
    dopingPreset: "none",
    applyDoping: false,
    baseStats: { stab: 658, hack: 66, int: 0, mr: 0, dex: 708 },
    bonusStats: {
      avatar: { stab: 10, hack: 10, dex: 10, int: 0, mr: 0 },
      title: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 },
      card: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 }
    },
    core: 0,
    slots: {
      helm:    { baseId: "abyss_helm",     enfVal: 20, enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      armor:   { baseId: "anomarad_mail",  enfVal: 0,  enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      weapon:  { baseId: "fairy_rapier",   enfVal: 61, enfStat: "STAB", abilMain: 21, abilSub: 0,  abilDex: 17 },
      wrist:   { baseId: "abyss_wrist",    enfVal: 40, enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      head:    { baseId: "abyss_amulet",   enfVal: 20, enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      wings:   { baseId: "abyss_wings",    enfVal: 30, enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      hands:   { baseId: "abyss_gauntlets",enfVal: 20, enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      boots:   { baseId: "abyss_boots",    enfVal: 20, enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      cuff:    { baseId: "none_cuff",      enfVal: 0,  enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      effect:  { baseId: "none_effect",    enfVal: 0,  enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      artifact:{ baseId: "none_artifact",  enfVal: 0,  enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 },
      relic:   { baseId: "none_relic",     enfVal: 0,  enfStat: "STAB", abilMain: 0,  abilSub: 0,  abilDex: 0 }
    },
    overrideEquip: { stab: 1400, hack: 770, dex: 891, int: 0, mr: 0 },
    overrideEnf: { stab: 235, hack: 0, int: 0, mr: 0 }
  },
  {
    id: "preset_mdef_biho",
    name: "② [마법방어] 비호/클로에 종결 어비스·이클 (구글 시트 7.5만)",
    type: "magic_def",
    dopingPreset: "none",
    applyDoping: false,
    baseStats: { stab: 0, hack: 0, int: 550, mr: 850, dex: 850 },
    bonusStats: {
      avatar: { stab: 0, hack: 0, dex: 15, int: 0, mr: 15 },
      title: { stab: 0, hack: 0, dex: 80, int: 80, mr: 80 },
      card: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 }
    },
    core: 210,
    slots: {
      helm:    { baseId: "abyss_helm",     enfVal: 30, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      armor:   { baseId: "eclipse_robe",   enfVal: 140, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      weapon:  { baseId: "abyss_bell",     enfVal: 90, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      wrist:   { baseId: "abyss_armlet",   enfVal: 40, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      head:    { baseId: "eclipse_amulet", enfVal: 60, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      wings:   { baseId: "abyss_wings",    enfVal: 20, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      hands:   { baseId: "abyss_gauntlets",enfVal: 20, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      boots:   { baseId: "abyss_boots",    enfVal: 20, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      cuff:    { baseId: "raido_cuff",     enfVal: 0,  enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      effect:  { baseId: "beast_unicorn",  enfVal: 235, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      artifact:{ baseId: "akron_divine",   enfVal: 30, enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 },
      relic:   { baseId: "shinjo_relic",   enfVal: 0,  enfStat: "MR", abilMain: 0, abilSub: 0, abilDex: 0 }
    },
    overrideEquip: { stab: 0, hack: 0, int: 1037, mr: 1953, dex: 920 },
    overrideEnf: { stab: 0, hack: 0, int: 0, mr: 945 }
  },
  {
    id: "preset_hack_end",
    name: "③ [베기] 이클립스 엔드 세팅 (구글 시트 12.8만)",
    type: "hack",
    dopingPreset: "none",
    applyDoping: false,
    baseStats: { stab: 550, hack: 850, int: 0, mr: 0, dex: 850 },
    bonusStats: {
      avatar: { stab: 15, hack: 15, dex: 15, int: 0, mr: 0 },
      title: { stab: 80, hack: 80, dex: 80, int: 0, mr: 0 },
      card: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 }
    },
    core: 480,
    slots: {
      helm:    { baseId: "eclipse_helm",     enfVal: 60, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      armor:   { baseId: "nenyaple_mail",    enfVal: 90, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      weapon:  { baseId: "eclipse_sword",    enfVal: 170, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      wrist:   { baseId: "eclipse_wrist",    enfVal: 140, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      head:    { baseId: "eclipse_amulet",   enfVal: 60, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      wings:   { baseId: "eclipse_wings",    enfVal: 100, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      hands:   { baseId: "eclipse_gauntlets",enfVal: 60, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      boots:   { baseId: "eclipse_boots",    enfVal: 60, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      cuff:    { baseId: "raido_cuff",       enfVal: 0,  enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      effect:  { baseId: "zodiac_green",     enfVal: 570, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      artifact:{ baseId: "eclipse_defensio", enfVal: 30, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      relic:   { baseId: "lunaria_relic",    enfVal: 0,  enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 }
    },
    overrideEquip: { stab: 1438, hack: 2109, dex: 980, int: 0, mr: 0 },
    overrideEnf: { stab: 530, hack: 1870, int: 0, mr: 0 }
  },
  {
    id: "preset_matk",
    name: "④ [마법공격] 아퀼·어비스 혼합 세팅 (구글 시트 4.5만)",
    type: "magic_atk",
    dopingPreset: "none",
    applyDoping: false,
    baseStats: { stab: 0, hack: 0, int: 850, mr: 550, dex: 800 },
    bonusStats: {
      avatar: { stab: 0, hack: 0, dex: 15, int: 15, mr: 15 },
      title: { stab: 0, hack: 0, dex: 60, int: 60, mr: 60 },
      card: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 }
    },
    core: 30,
    slots: {
      helm:    { baseId: "aquilus_helm",   enfVal: 30, enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      armor:   { baseId: "anomarad_robe",  enfVal: 0,  enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      weapon:  { baseId: "fairy_staff",    enfVal: 61, enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      wrist:   { baseId: "aquilus_wrist",  enfVal: 30, enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      head:    { baseId: "aquilus_amulet", enfVal: 30, enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      wings:   { baseId: "aquilus_wings",  enfVal: 30, enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      hands:   { baseId: "aquilus_gauntlets", enfVal: 30, enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      boots:   { baseId: "aquilus_boots",  enfVal: 30, enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      cuff:    { baseId: "raido_cuff",     enfVal: 0,  enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      effect:  { baseId: "beast_leviathan",enfVal: 30, enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      artifact:{ baseId: "akron_magic",    enfVal: 20, enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 },
      relic:   { baseId: "sun_relic",      enfVal: 0,  enfStat: "INT", abilMain: 0, abilSub: 0, abilDex: 0 }
    },
    overrideEquip: { stab: 0, hack: 0, int: 1289, mr: 723, dex: 850 },
    overrideEnf: { stab: 0, hack: 0, int: 321, mr: 0 }
  },
  {
    id: "preset_composite",
    name: "⑤ [물리복합] 보리스/루시안 세팅 (구글 시트 7.1만)",
    type: "composite",
    dopingPreset: "none",
    applyDoping: false,
    baseStats: { stab: 700, hack: 700, int: 0, mr: 0, dex: 800 },
    bonusStats: {
      avatar: { stab: 15, hack: 15, dex: 15, int: 0, mr: 0 },
      title: { stab: 80, hack: 80, dex: 80, int: 0, mr: 0 },
      card: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 }
    },
    core: 210,
    slots: {
      helm:    { baseId: "abyss_helm",     enfVal: 20, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      armor:   { baseId: "anomarad_mail",  enfVal: 70, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      weapon:  { baseId: "abyss_rapier",   enfVal: 70, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      wrist:   { baseId: "abyss_wrist",    enfVal: 40, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      head:    { baseId: "eclipse_amulet", enfVal: 60, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      wings:   { baseId: "abyss_wings",    enfVal: 30, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      hands:   { baseId: "abyss_gauntlets",enfVal: 20, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      boots:   { baseId: "abyss_boots",    enfVal: 20, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      cuff:    { baseId: "raido_cuff",     enfVal: 0,  enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      effect:  { baseId: "beast_cerberus", enfVal: 235, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      artifact:{ baseId: "akron_defensio", enfVal: 30, enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 },
      relic:   { baseId: "shinjo_relic",   enfVal: 0,  enfStat: "STAB", abilMain: 0, abilSub: 0, abilDex: 0 }
    },
    overrideEquip: { stab: 1533, hack: 1132, dex: 890, int: 0, mr: 0 },
    overrideEnf: { stab: 855, hack: 210, int: 0, mr: 0 }
  },
  {
    id: "preset_mslash",
    name: "⑥ [마법베기] 티치엘/조슈아 세팅 (구글 시트 5.2만)",
    type: "magic_slash",
    dopingPreset: "none",
    applyDoping: false,
    baseStats: { stab: 0, hack: 800, int: 700, mr: 0, dex: 850 },
    bonusStats: {
      avatar: { stab: 0, hack: 15, dex: 15, int: 15, mr: 0 },
      title: { stab: 0, hack: 80, dex: 80, int: 80, mr: 0 },
      card: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 }
    },
    core: 210,
    slots: {
      helm:    { baseId: "abyss_helm",     enfVal: 30, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      armor:   { baseId: "anomarad_mail",  enfVal: 60, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      weapon:  { baseId: "eclipse_sword",  enfVal: 120, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      wrist:   { baseId: "abyss_wrist",    enfVal: 40, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      head:    { baseId: "eclipse_amulet", enfVal: 60, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      wings:   { baseId: "abyss_wings",    enfVal: 30, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      hands:   { baseId: "abyss_gauntlets",enfVal: 20, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      boots:   { baseId: "abyss_boots",    enfVal: 20, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      cuff:    { baseId: "raido_cuff",     enfVal: 0,  enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      effect:  { baseId: "beast_cerberus", enfVal: 235, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      artifact:{ baseId: "akron_magic",    enfVal: 30, enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 },
      relic:   { baseId: "shinjo_relic",   enfVal: 0,  enfStat: "HACK", abilMain: 0, abilSub: 0, abilDex: 0 }
    },
    overrideEquip: { stab: 0, hack: 1650, dex: 920, int: 1100, mr: 0 },
    overrideEnf: { stab: 0, hack: 1200, int: 350, mr: 0 }
  }
];
