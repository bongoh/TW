/**
 * TalesWeaver Companion Guide - Data & Configurations
 * Thresholds, Doping items, Recipes, Waste Items, and Default Profiles
 */

const STORAGE_KEY = 'tw_anais_weekly_tasks_v1';

// 0. TalesWeaver Playable Characters & Growth Types (19종 캐릭터 & 육성 가능 계열 전수 등록)
const TW_CHARACTERS = [
  {
    id: "anais",
    name: "아나이스 델 카릴",
    types: [
      { branchId: "anais_biho", id: "magic_def", archId: "magic_def", name: "🛡️ 비호정령 (마방 핸드벨)", defaultWeapon: "abyss_bell", defaultArmor: "anomarad_robe", desc: "레이드 필수 서포터/버퍼 (핸드벨·로브)" },
      { branchId: "anais_bear", id: "composite", archId: "composite", name: "🧸 마법인형·곰나이스 (물복/마베 셉터)", defaultWeapon: "abyss_scepter", defaultArmor: "anomarad_robe", desc: "곰 미카베라·루시베어 소환 공격 딜러" },
      { branchId: "anais_destroyer", id: "magic_atk", archId: "magic_atk", name: "🔮 파괴정령 (마공 완드)", defaultWeapon: "eclipse_wand", defaultArmor: "anomarad_robe", desc: "원소 장판 지속형 원거리 마법 딜러" }
    ],
    defaultBranch: "anais_biho",
    defaultType: "magic_def",
    desc: "비호(마방) / 곰나이스(물복) / 파괴(마공)"
  },
  {
    id: "naya",
    name: "나야트레이",
    types: [
      { branchId: "naya_comp", id: "composite", archId: "composite", name: "⚔️ 물리복합 (단도/손도끼 - 물복 나야)", defaultWeapon: "abyss_dagger", defaultArmor: "anomarad_mail", desc: "심·인술 폭·백스탭 극딜 물리복합" },
      { branchId: "naya_stab", id: "stab", archId: "stab", name: "🗡️ 찌르기 (단도)", defaultWeapon: "abyss_dagger", defaultArmor: "anomarad_mail", desc: "심 28타 초고속 연타 찌르기" },
      { branchId: "naya_hack", id: "hack", archId: "hack", name: "🪓 베기 (손도끼/단검)", defaultWeapon: "abyss_axe", defaultArmor: "nenyaple_mail", desc: "인술 분신·수리검 투척 물리 베기" }
    ],
    defaultBranch: "naya_comp",
    defaultType: "composite",
    desc: "물리복합(단도/도끼) / 찌르기(단도) / 베기(도끼)"
  },
  {
    id: "lucian",
    name: "루시안 칼츠",
    types: [
      { branchId: "lucian_stab", id: "stab", archId: "stab", name: "🗡️ 찌르기 (레이피어)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "원월드·찬솔 쾌속 찌르기" },
      { branchId: "lucian_hack", id: "hack", archId: "hack", name: "🪓 베기 (세이버)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "비연파 고화력 물리 베기" },
      { branchId: "lucian_comp", id: "composite", archId: "composite", name: "⚔️ 물리복합 (장검/평도)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "연·실피드 전천후 물리복합" }
    ],
    defaultBranch: "lucian_stab",
    defaultType: "stab",
    desc: "찌르기(레이피어) / 베기(세이버) / 물복(장검)"
  },
  {
    id: "boris",
    name: "보리스 진네만",
    types: [
      { branchId: "boris_hack", id: "hack", archId: "hack", name: "🪓 베기 (대검/평도)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "핫샷·연 연타 물리 베기 종결" },
      { branchId: "boris_comp", id: "composite", archId: "composite", name: "⚔️ 물리복합 (대검/평도)", defaultWeapon: "eclipse_sword", defaultArmor: "abyss_armor", desc: "스매시·연 묵직한 광역 물리복합" },
      { branchId: "boris_magic", id: "magic_slash", archId: "magic_slash", name: "🪄 마법베기 (빙한 마검)", defaultWeapon: "eclipse_sword", defaultArmor: "anomarad_mail", desc: "빙격참·프로즌 브레이크 마법베기" }
    ],
    defaultBranch: "boris_hack",
    defaultType: "hack",
    desc: "베기(대검) / 물복(대검) / 마베(평도)"
  },
  {
    id: "ispin",
    name: "이스핀 샤를",
    types: [
      { branchId: "ispin_stab", id: "stab", archId: "stab", name: "🗡️ 찌르기 (레이피어)", defaultWeapon: "fairy_rapier", defaultArmor: "anomarad_mail", desc: "펄스핀 24타 극딜 찌르기" },
      { branchId: "ispin_hack", id: "hack", archId: "hack", name: "🪓 베기 (세이버)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "샤프 샤벨 고속 베기" },
      { branchId: "ispin_comp", id: "composite", archId: "composite", name: "⚔️ 물리복합 (장검)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "공방일체 전천후 물리복합" },
      { branchId: "ispin_magic", id: "magic_slash", archId: "magic_slash", name: "🪄 마법베기 (화속성 마검)", defaultWeapon: "eclipse_sword", defaultArmor: "anomarad_robe", desc: "오리플람 화속성 마법베기" }
    ],
    defaultBranch: "ispin_stab",
    defaultType: "stab",
    desc: "찌르기(펄스핀) / 베기(세이버) / 물복(장검) / 마베"
  },
  {
    id: "maximin",
    name: "막시민 리프크네",
    types: [
      { branchId: "maximin_hack", id: "hack", archId: "hack", name: "🪓 베기 (평도/세이버)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "오화월광참 호쾌한 물리 베기" },
      { branchId: "maximin_comp", id: "composite", archId: "composite", name: "⚔️ 물리복합 (대검/장검)", defaultWeapon: "eclipse_sword", defaultArmor: "abyss_armor", desc: "롤링 크래시 대검 물리복합" },
      { branchId: "maximin_magic", id: "magic_slash", archId: "magic_slash", name: "🪄 마법베기 (바람 마검)", defaultWeapon: "eclipse_sword", defaultArmor: "anomarad_mail", desc: "실피드 랜스·윈드 슬라이서 마베" }
    ],
    defaultBranch: "maximin_hack",
    defaultType: "hack",
    desc: "베기(평도) / 물복(대검) / 마베(마검)"
  },
  {
    id: "siblyn",
    name: "시벨린 우",
    types: [
      { branchId: "siblyn_spear", id: "stab", archId: "stab", name: "🗡️ 찌르기 (창)", defaultWeapon: "abyss_spear", defaultArmor: "anomarad_mail", desc: "투룡 투창 초고화력 단타 찌르기" },
      { branchId: "siblyn_pole", id: "composite", archId: "composite", name: "⚔️ 물리복합 (봉)", defaultWeapon: "abyss_spear", defaultArmor: "abyss_armor", desc: "홍원단 광역 타격 물리복합" },
      { branchId: "siblyn_hack", id: "hack", archId: "hack", name: "🪓 베기 (봉 베기)", defaultWeapon: "abyss_spear", defaultArmor: "nenyaple_mail", desc: "하드히트 연타 물리 베기" }
    ],
    defaultBranch: "siblyn_spear",
    defaultType: "stab",
    desc: "찌르기(창) / 물복(봉) / 베기(봉)"
  },
  {
    id: "tichiel",
    name: "티치엘 쥬스피앙",
    types: [
      { branchId: "tichiel_white", id: "magic_def", archId: "magic_def", name: "🛡️ 백법·서포터 (메이스)", defaultWeapon: "abyss_mace", defaultArmor: "anomarad_robe", desc: "힐·배리어·와이드 블레싱 전문 서포터" },
      { branchId: "tichiel_black", id: "magic_atk", archId: "magic_atk", name: "🔮 흑법·마법공격 (스태프)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "원소 화·수·뇌 마법 폭딜러" },
      { branchId: "tichiel_strike", id: "magic_slash", archId: "magic_slash", name: "🪄 타법·타격 (메이스/스태프)", defaultWeapon: "abyss_mace", defaultArmor: "anomarad_robe", desc: "퓨어 스트라이크 타격 마법베기" }
    ],
    defaultBranch: "tichiel_white",
    defaultType: "magic_def",
    desc: "백법(메이스) / 마공(스태프) / 타법(타격)"
  },
  {
    id: "milla",
    name: "밀라 네브라스카",
    types: [
      { branchId: "milla_hack", id: "hack", archId: "hack", name: "🪓 베기 (채찍)", defaultWeapon: "abyss_whip", defaultArmor: "nenyaple_mail", desc: "카드스프레이 크리티컬 채찍 베기" },
      { branchId: "milla_comp", id: "composite", archId: "composite", name: "⚔️ 물리복합 (플레일)", defaultWeapon: "abyss_whip", defaultArmor: "anomarad_mail", desc: "스위핑 해머 해적 물리복합" },
      { branchId: "milla_stab", id: "stab", archId: "stab", name: "🗡️ 찌르기 (채찍 관통)", defaultWeapon: "abyss_whip", defaultArmor: "anomarad_mail", desc: "급소 찌르기 채찍 변형" }
    ],
    defaultBranch: "milla_hack",
    defaultType: "hack",
    desc: "베기(채찍) / 물복(플레일) / 찌르기"
  },
  {
    id: "cloe",
    name: "클로에 다 폰티나",
    types: [
      { branchId: "cloe_magic", id: "magic_atk", archId: "magic_atk", name: "🔮 마법공격 (스태프/완드)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "피닉스·메테오 최상위 광역 마공" },
      { branchId: "cloe_def", id: "magic_def", archId: "magic_def", name: "🛡️ 마법방어 (마나월 방어)", defaultWeapon: "fairy_staff", defaultArmor: "eclipse_robe", desc: "마나월 기반 금강불괴 마방 세팅" }
    ],
    defaultBranch: "cloe_magic",
    defaultType: "magic_atk",
    desc: "마공(스태프) / 마방(마나월)"
  },
  {
    id: "joshua",
    name: "조슈아 폰 아르님",
    types: [
      { branchId: "joshua_change", id: "magic_slash", archId: "magic_slash", name: "🪄 변화계·마법베기 (마법검)", defaultWeapon: "eclipse_sword", defaultArmor: "anomarad_robe", desc: "팬텀 스타일 고스트 마법베기" },
      { branchId: "joshua_emit", id: "magic_atk", archId: "magic_atk", name: "🔮 방출계·마법공격 (완드)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "원거리 버프·디버프 복합 마법 방출" },
      { branchId: "joshua_reinforce", id: "stab", archId: "stab", name: "🗡️ 강화계·찌르기 (스몰소드)", defaultWeapon: "fairy_rapier", defaultArmor: "anomarad_mail", desc: "귀족 펜싱 쾌속 찌르기" }
    ],
    defaultBranch: "joshua_change",
    defaultType: "magic_slash",
    desc: "마베(변화계) / 마공(방출계) / 찌르기(강화계)"
  },
  {
    id: "ranzie",
    name: "란지에 로젠크란츠",
    types: [
      { branchId: "ranzie_magic", id: "magic_atk", archId: "magic_atk", name: "🔮 마법계·마법공격 (마총)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "미스트랄 블레이즈 원거리 마총" },
      { branchId: "ranzie_stab", id: "stab", archId: "stab", name: "🗡️ 물리계·찌르기 (물리총)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "블러디드 샷 물리 피어싱" }
    ],
    defaultBranch: "ranzie_magic",
    defaultType: "magic_atk",
    desc: "마공(마총) / 찌르기(물총)"
  },
  {
    id: "isaac",
    name: "이자크 듀카스텔",
    types: [
      { branchId: "isaac_stab", id: "stab", archId: "stab", name: "🗡️ 찌르기 (클로)", defaultWeapon: "abyss_rapier", defaultArmor: "anomarad_mail", desc: "슬램·크래셔 격투 찌르기" },
      { branchId: "isaac_comp", id: "composite", archId: "composite", name: "⚔️ 물리복합 (톤파)", defaultWeapon: "abyss_tonfa", defaultArmor: "abyss_armor", desc: "묵직한 톤파 콤보 물리복합" },
      { branchId: "isaac_hack", id: "hack", archId: "hack", name: "🪓 베기 (톤파/클로)", defaultWeapon: "abyss_tonfa", defaultArmor: "nenyaple_mail", desc: "파이널 포커스 물리 베기" }
    ],
    defaultBranch: "isaac_stab",
    defaultType: "stab",
    desc: "찌르기(클로) / 물복(톤파) / 베기(톤파)"
  },
  {
    id: "isolet",
    name: "이솔렛",
    types: [
      { branchId: "isolet_tiella", id: "composite", archId: "composite", name: "⚔️ 티엘라 (쌍검 물리복합)", defaultWeapon: "abyss_tiella", defaultArmor: "anomarad_mail", desc: "듀얼 블레이드 윈드 슬라이스 연타 물복" },
      { branchId: "isolet_tiella_ms", id: "magic_slash", archId: "magic_slash", name: "🪄 티엘라 (쌍검 마법베기)", defaultWeapon: "abyss_tiella", defaultArmor: "anomarad_robe", desc: "신성 마법과 칼날 결합 마법베기" },
      { branchId: "isolet_chant", id: "magic_atk", archId: "magic_atk", name: "🔮 찬트 (신성 찬트 홀/서포터)", defaultWeapon: "abyss_chant", defaultArmor: "eclipse_robe", desc: "그라비티·홀리 실드 신성 마공 및 힐링" }
    ],
    defaultBranch: "isolet_tiella",
    defaultType: "composite",
    desc: "티엘라(쌍검 물복/마베) / 찬트(신성 마공/서포터)"
  },
  {
    id: "benya",
    name: "벤야",
    types: [
      { branchId: "benya_scythe", id: "hack", archId: "hack", name: "🪓 낫벤·영혼계 (사이드 낫/베기)", defaultWeapon: "abyss_scythe", defaultArmor: "anomarad_robe", desc: "헬게이트·소울 스틸 고화력 베기 종결" },
      { branchId: "benya_hammer", id: "magic_def", archId: "magic_def", name: "🛡️ 햄벤·해머 (마방 해머 타격)", defaultWeapon: "abyss_hammer", defaultArmor: "eclipse_robe", desc: "카운터 해머·어스퀘이크 단단한 마방 타격" },
      { branchId: "benya_holy", id: "magic_atk", archId: "magic_atk", name: "🔮 유령계·마법공격 (홀/성속성)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "샤이닝 컷 홀 원거리 성속성 마공" }
    ],
    defaultBranch: "benya_scythe",
    defaultType: "hack",
    desc: "낫벤(베기) / 햄벤(해머 마방) / 마공(홀)"
  },
  {
    id: "roamini",
    name: "로아미니",
    types: [
      { branchId: "roamini_magic", id: "magic_atk", archId: "magic_atk", name: "🔮 마법공격 (토템 디버퍼)", defaultWeapon: "abyss_totem", defaultArmor: "anomarad_robe", desc: "포이즌 디버프 및 지속 암흑 마공" }
    ],
    defaultBranch: "roamini_magic",
    defaultType: "magic_atk",
    desc: "마법공격(토템 암흑 디버퍼)"
  },
  {
    id: "nocturne",
    name: "녹턴 드 블랑쉬",
    types: [
      { branchId: "nocturne_magic", id: "magic_atk", archId: "magic_atk", name: "🔮 마법공격 (샷건 화력)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "일렉트릭 샷건 화력 마공" }
    ],
    defaultBranch: "nocturne_magic",
    defaultType: "magic_atk",
    desc: "마법공격(샷건 전격 마공)"
  },
  {
    id: "liche",
    name: "리체 아브릴",
    types: [
      { branchId: "liche_fine", id: "magic_atk", archId: "magic_atk", name: "🔮 피네계·마법공격 (펜듈럼)", defaultWeapon: "fairy_staff", defaultArmor: "anomarad_robe", desc: "피네 멜로디 광역 마법 딜링" },
      { branchId: "liche_cor", id: "hack", archId: "hack", name: "🪓 코르계·베기 (아밍소드)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "악의 무구 폭발적 물리 베기" }
    ],
    defaultBranch: "liche_fine",
    defaultType: "magic_atk",
    desc: "마공(피네 펜듈럼) / 베기(코르 아밍소드)"
  },
  {
    id: "yepnen",
    name: "예프넨 진네만",
    types: [
      { branchId: "yepnen_hack", id: "hack", archId: "hack", name: "🪓 베기 (소드/액스/우르미)", defaultWeapon: "eclipse_sword", defaultArmor: "nenyaple_mail", desc: "5종 무기 스위칭 폭발적 물리 베기" },
      { branchId: "yepnen_stab", id: "stab", archId: "stab", name: "🗡️ 찌르기 (스피어/파이크/보우)", defaultWeapon: "abyss_spear", defaultArmor: "anomarad_mail", desc: "장거리 파이크·활 관통 찌르기" },
      { branchId: "yepnen_comp", id: "composite", archId: "composite", name: "⚔️ 물리복합 (우르미/치즐 변형)", defaultWeapon: "eclipse_sword", defaultArmor: "abyss_armor", desc: "샤드 와이어·흡혈 채널링 연타 물복" }
    ],
    defaultBranch: "yepnen_hack",
    defaultType: "hack",
    desc: "베기(소드/액스) / 찌르기(창/활) / 물복(우르미)"
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
  content_core: [
    'snowman_potion', 'awakening_potion', 'trust_potion',
    'isabelle_fixed', 'isabelle_percent', 'isabelle_damage',
    'purified_ampoule', 'haste_potion', 'attendance_buff', 'equip_reinforce_stone'
  ],
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
    branchId: 'anais_biho',
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
    branchId: 'roamini_magic',
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
    { id: "abyss_axe", name: "어비스 액스 (손도끼 - 베기 390 / 찌르기 180)", stab: 180, hack: 390, int: 0, mr: 0, dex: 35 },
    { id: "eclipse_sword", name: "이클립스 소드셰이프 (베기 474)", stab: 170, hack: 474, int: 0, mr: 0, dex: 50 },
    { id: "abyss_whip", name: "어비스 휩 (채찍 - 베기 395 / 찌르기 160)", stab: 160, hack: 395, int: 0, mr: 0, dex: 45 },
    { id: "abyss_scythe", name: "어비스 사이드 (낫 - 베기 410 / 마공 280)", stab: 0, hack: 410, int: 280, mr: 0, dex: 45 },
    { id: "abyss_hammer", name: "어비스 해머 (해머/햄벤 - 마방 360 / 베기 210)", stab: 0, hack: 210, int: 0, mr: 360, dex: 35 },
    { id: "fairy_staff", name: "페어리 피타 스태프 (마공 309)", stab: 0, hack: 0, int: 309, mr: 0, dex: 25 },
    { id: "abyss_bell", name: "어비스 핸드벨 (마방 354 / 마공 130)", stab: 0, hack: 0, int: 130, mr: 354, dex: 35 },
    { id: "abyss_scepter", name: "어비스 셉터 (곰나이스/아나이스 - 마공 375 / 베기 180)", stab: 0, hack: 180, int: 375, mr: 150, dex: 35 },
    { id: "abyss_mace", name: "어비스 메이스 (메이스 - 마방 345 / 마공 190)", stab: 0, hack: 0, int: 190, mr: 345, dex: 35 },
    { id: "abyss_totem", name: "어비스 토템 (토템 - 마공 385 / 마방 140)", stab: 0, hack: 0, int: 385, mr: 140, dex: 35 },
    { id: "abyss_tiella", name: "어비스 티엘라 (쌍검/이솔렛 - 베기 320 / 찌르기 320)", stab: 320, hack: 320, int: 260, mr: 0, dex: 45 },
    { id: "abyss_chant", name: "어비스 찬트 (홀/이솔렛 - 마공 370 / 마방 330)", stab: 0, hack: 0, int: 370, mr: 330, dex: 35 },
    { id: "abyss_tonfa", name: "어비스 톤파 (톤파/이자크 - 베기 290 / 찌르기 290)", stab: 290, hack: 290, int: 0, mr: 0, dex: 35 },
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

// ==================== 9-1. TARGET MONSTERS & DUNGEONS DATABASE (전투 시험장 타겟 DB) ====================
const TARGET_MONSTERS_DATA = [
  // 1. Dummies (훈련용 샌드백 허수아비)
  {
    id: "dummy_zero",
    category: "dummy",
    categoryName: "🎯 훈련용 허수아비",
    name: "방어력 0 허수아비 (순수 딜량 측정)",
    dungeon: "네냐플 연무장",
    level: 310,
    hp: 50000000,
    pdef: 0,
    mdef: 0,
    eva: 0,
    is1ShotTarget: true,
    desc: "방어력과 회피가 없는 순수 스탯 및 스킬 계수 측정용 샌드백입니다."
  },
  {
    id: "dummy_std",
    category: "dummy",
    categoryName: "🎯 훈련용 허수아비",
    name: "정예 방어 허수아비 (표준 방어력)",
    dungeon: "네냐플 연무장",
    level: 310,
    hp: 100000000,
    pdef: 2500,
    mdef: 2500,
    eva: 1000,
    is1ShotTarget: true,
    desc: "평균적인 필드 방어력과 회피치를 보유한 표준 테스트 허수아비입니다."
  },

  // 2. Farming Mobs (일반 사냥터 / 던전 잡몹 - 1방 컷 검증 특화)
  {
    id: "mob_arcadia",
    category: "farming",
    categoryName: "🌾 일반 사냥터 (1방 컷 검증)",
    name: "아르카디아 일반 몬스터",
    dungeon: "아르카디아 중심부 (Lv.285)",
    level: 285,
    hp: 8000000,
    pdef: 800,
    mdef: 800,
    eva: 600,
    is1ShotTarget: true,
    desc: "초반 파밍 던전의 1방 컷(원킬 원샷) 달성 여부 검증용 몬스터입니다."
  },
  {
    id: "mob_prava",
    category: "farming",
    categoryName: "🌾 일반 사냥터 (1방 컷 검증)",
    name: "프라바 전초기지 거인 병사",
    dungeon: "프라바 전초기지 (Lv.290)",
    level: 290,
    hp: 20000000,
    pdef: 1500,
    mdef: 1500,
    eva: 950,
    is1ShotTarget: true,
    desc: "중급 사냥터의 튼튼한 거인 몬스터로 2천만 이상 1방 컷을 검증합니다."
  },
  {
    id: "mob_apple",
    category: "farming",
    categoryName: "🌾 일반 사냥터 (1방 컷 검증)",
    name: "사과의 섬 숲 경비 몬스터",
    dungeon: "사과의 섬 (Lv.300)",
    level: 300,
    hp: 45000000,
    pdef: 2400,
    mdef: 2400,
    eva: 1350,
    is1ShotTarget: true,
    desc: "버닝 졸업 후 주력 파밍터로 4,500만 이상 화력으로 1방 컷이 나는지 검증합니다."
  },
  {
    id: "mob_golgotha",
    category: "farming",
    categoryName: "🌾 일반 사냥터 (1방 컷 검증)",
    name: "골고다 협곡 선봉대 잡몹",
    dungeon: "골고다 협곡 (Lv.310)",
    level: 310,
    hp: 80000000,
    pdef: 3800,
    mdef: 3800,
    eva: 2100,
    is1ShotTarget: true,
    desc: "최상위 사냥터 고스펙 잡몹으로 8천만 원킬 및 명중(DEX 2,100+)을 시험합니다."
  },

  // 3. Raid Bosses (주간 레이드 보스 - 실대미지 & 적중도 검증)
  {
    id: "boss_mercurial",
    category: "raid",
    categoryName: "⚔️ 주간 레이드 보스",
    name: "루미에라 / 셀레나 (머큐리얼)",
    dungeon: "머큐리얼 케이브 (Lv.300)",
    level: 300,
    hp: 3000000000,
    pdef: 3800,
    mdef: 3800,
    eva: 800,
    is1ShotTarget: false,
    desc: "입문용 주간 레이드 보스로 타당 실대미지와 처치 속도를 시험합니다."
  },
  {
    id: "boss_shinjo",
    category: "raid",
    categoryName: "⚔️ 주간 레이드 보스",
    name: "신조 (Shinjo 하드)",
    dungeon: "신조의 둥지 어려움 (Lv.305)",
    level: 305,
    hp: 6000000000,
    pdef: 5500,
    mdef: 5500,
    eva: 1300,
    is1ShotTarget: false,
    desc: "중자본 국민 보스로 마방 1,400+ 및 타당 수천만 딜량을 점검합니다."
  },
  {
    id: "boss_abyss",
    category: "raid",
    categoryName: "⚔️ 주간 레이드 보스",
    name: "어비스 심층 군주 (Hell)",
    dungeon: "어비스 지옥 심층 (Lv.310)",
    level: 310,
    hp: 15000000000,
    pdef: 7800,
    mdef: 7800,
    eva: 1350,
    is1ShotTarget: false,
    desc: "어비스 헬 지옥 난이도 보스로 고방어력 관통력과 올힛 여부를 검증합니다."
  },
  {
    id: "boss_eclipse",
    category: "raid",
    categoryName: "⚔️ 주간 레이드 보스",
    name: "로카고스 / 에토스 / 체리아",
    dungeon: "달의 섬 이클립스 6보스전",
    level: 310,
    hp: 35000000000,
    pdef: 9200,
    mdef: 9200,
    eva: 1650,
    is1ShotTarget: false,
    desc: "이클립스 주간 보스군으로 명중 1,650+ 및 최상위 실대미지를 검증합니다."
  },
  {
    id: "boss_apetiria",
    category: "raid",
    categoryName: "⚔️ 주간 레이드 보스",
    name: "아페테리아 심연 수호자",
    dungeon: "아페테리아 어려움/EX",
    level: 310,
    hp: 50000000000,
    pdef: 11000,
    mdef: 11000,
    eva: 2400,
    is1ShotTarget: false,
    desc: "명중 컷 2,400을 요구하는 고난도 보스로 펫 집중 스킬 효과를 즉시 체감 가능합니다."
  },
  {
    id: "boss_golgotha_leader",
    category: "raid",
    categoryName: "⚔️ 주간 레이드 보스",
    name: "골고다 선봉대 부대장",
    dungeon: "골고다 협곡 정예 레이드",
    level: 310,
    hp: 65000000000,
    pdef: 12500,
    mdef: 12500,
    eva: 2450,
    is1ShotTarget: false,
    desc: "명중 컷 2,450 요구, 극강의 방어력을 뚫어내는 종결 DPS를 측정합니다."
  },
  {
    id: "boss_final",
    category: "raid",
    categoryName: "⚔️ 주간 레이드 보스",
    name: "최후의 결전 (End Boss)",
    dungeon: "달의 섬 최후의 결전",
    level: 310,
    hp: 100000000000,
    pdef: 14000,
    mdef: 14000,
    eva: 2500,
    is1ShotTarget: false,
    desc: "명중 컷 2,500 및 최고위 대미지 배율을 요구하는 테일즈위버 최종 관문입니다."
  }
];

// ==================== 9-2. CHARACTER ARCHETYPE SKILLS DATABASE (캐릭터 계열별 실전 스킬 DB) ====================
const CHARACTER_SKILLS_DATA = {
  // 1. 마법방어 (아나이스 비호정령, 티치엘 백법)
  magic_def: [
    { id: "sk_mdef_judge", name: "저지먼트 (Judgement)", hits: 12, mult: 1900, type: "single", desc: "비호정령의 대표 주력 단일 타격기 (12타 / 1,900%)" },
    { id: "sk_mdef_square", name: "스퀘어 가든 (Square Garden)", hits: 8, mult: 2400, type: "area", desc: "성역 형성 주변 몬스터 섬멸 광역기 (8타 / 2,400%)" },
    { id: "sk_mdef_holy", name: "홀리 블래스트 (Holy Blast)", hits: 10, mult: 2100, type: "single", desc: "마법방어력 비례 극딜 단일 마법 (10타 / 2,100%)" }
  ],
  // 2. 찌르기 (루시안, 이스핀, 나야, 시벨린)
  stab: [
    { id: "sk_stab_wonmu", name: "원무 (Dance of Blades)", hits: 12, mult: 2200, type: "single", desc: "초고속 연속 찌르기 대표 주력기 (12타 / 2,200%)" },
    { id: "sk_stab_pearl", name: "펄스핀 (Pearl Spin)", hits: 14, mult: 2500, type: "single", desc: "회전 폭풍 극딜 연속 찌르기 (14타 / 2,500%)" },
    { id: "sk_stab_charge", name: "충뢰 (Lightning Thrust)", hits: 8, mult: 2700, type: "area", desc: "번개 관통 광역 찌르기 (8타 / 2,700%)" }
  ],
  // 3. 베기 (보리스, 막시민, 루시안, 나야, 이스핀)
  hack: [
    { id: "sk_hack_smash", name: "스매시 (Smash)", hits: 10, mult: 2500, type: "single", desc: "묵직한 1방 베기 극딜기 (10타 / 2,500%)" },
    { id: "sk_hack_yeon", name: "연 (Continuous Slash)", hits: 12, mult: 2300, type: "single", desc: "쾌속 12연타 베기 주력기 (12타 / 2,300%)" },
    { id: "sk_hack_moon", name: "오화월광참 (Five Flowers)", hits: 10, mult: 2600, type: "area", desc: "광역 달빛 물리 베기 (10타 / 2,600%)" }
  ],
  // 4. 물리복합 (보리스, 나야, 시벨린, 밀라, 루시안, 곰나이스)
  composite: [
    { id: "sk_comp_crash", name: "크래시 버스트 (Crash Burst)", hits: 10, mult: 2600, type: "single", desc: "물리와 마력이 융합된 폭발 타격 (10타 / 2,600%)" },
    { id: "sk_comp_ninja", name: "인술 폭 (Ninja Burst)", hits: 8, mult: 2400, type: "area", desc: "화약과 수리검 광역 폭파 (8타 / 2,400%)" },
    { id: "sk_comp_red", name: "홍원단 (Red Circle)", hits: 12, mult: 2300, type: "single", desc: "봉을 이용한 연속 타격기 (12타 / 2,300%)" }
  ],
  // 5. 마법공격 (티치엘 흑법, 파괴정령, 조슈아, 클로에, 란지에)
  magic_atk: [
    { id: "sk_matk_meteor", name: "메테오 스트라이크 (Meteor)", hits: 10, mult: 2700, type: "area", desc: "초고화력 운석 낙하 광역 마법 (10타 / 2,700%)" },
    { id: "sk_matk_ghost", name: "고스트 버스트 (Ghost Burst)", hits: 12, mult: 2300, type: "single", desc: "영혼 마력 집중 단일 투사 (12타 / 2,300%)" },
    { id: "sk_matk_ice", name: "아이스 임팩트 (Ice Impact)", hits: 10, mult: 2500, type: "single", desc: "빙결 마법 집중 타격 (10타 / 2,500%)" }
  ],
  // 6. 마법베기 (보리스 마검, 막시민 마검, 이스핀 마검, 로아미니)
  magic_slash: [
    { id: "sk_mslash_frozen", name: "프로즌 브레이크 (Frozen Break)", hits: 10, mult: 2600, type: "single", desc: "빙한의 마검으로 적을 분쇄 (10타 / 2,600%)" },
    { id: "sk_mslash_ori", name: "오리플람 (Oriflamme)", hits: 8, mult: 2500, type: "area", desc: "화염 마검 광역 베기 (8타 / 2,500%)" },
    { id: "sk_mslash_sylph", name: "실피드 랜스 (Sylphid Lance)", hits: 12, mult: 2400, type: "single", desc: "바람의 칼날 관통 베기 (12타 / 2,400%)" }
  ]
};

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
      pet: { stab: 0, hack: 0, dex: 0, int: 0, mr: 0 },
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
      pet: { stab: 0, hack: 0, dex: 30, int: 0, mr: 40 },
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
      pet: { stab: 0, hack: 40, dex: 30, int: 0, mr: 0 },
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
      pet: { stab: 0, hack: 40, dex: 30, int: 0, mr: 0 },
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


// ==================== 9. TALESWEAVER GLOSSARY DATA (초보자 필수 용어 사전) ====================
const GLOSSARY_CATEGORIES = {
  all: { name: "전체 보기", icon: "📋" },
  raid: { name: "던전 · 레이드 약어", icon: "⚔️" },
  spec: { name: "스펙 · 시스템 용어", icon: "✨" },
  equip: { name: "장비 · 티어 약어", icon: "🛡️" },
  economy: { name: "도핑 · 재화 · 경제", icon: "🧪" },
  skill: { name: "비호 · 전투 스킬", icon: "🧙" },
  tips: { name: "실수 방지 꿀팁", icon: "💡" }
};

const GLOSSARY_DATA = [
  // 1. 던전 · 레이드 약어
  {
    id: "g_shinuh_hel_obang",
    term: "신어헬오방",
    officialName: "신조의 둥지 + 어비스 + 헬(머큐/사과섬) + 오를리 방어전",
    category: "raid",
    summary: "테일즈위버 주간 필수 던전 4종을 한 번에 순회하는 국민 주간 레이드 루틴입니다.",
    example: "「신어헬오방 5인팟 비호님 모십니다. 디코 브로드캐스트 지원!」",
    tags: ["신조", "어비스", "헬", "오를리", "루틴", "주간숙제"]
  },
  {
    id: "g_shinjo",
    term: "신조",
    officialName: "신조의 둥지 (일반 / 어려움)",
    category: "raid",
    summary: "룬 경험치와 아퀼루스 장비 진화 재료(신조의 깃털 등)를 수급하는 주간 레이드입니다.",
    example: "「룬 레벨 30 미만일 땐 파티보다 솔플로 신조 도는 게 경험치 훨씬 이득입니다.」",
    tags: ["신조의둥지", "깃털", "룬레벨", "아퀼루스"]
  },
  {
    id: "g_abyss",
    term: "어비스",
    officialName: "심연의 틈 어비스 던전 (일반 / 심층)",
    category: "raid",
    summary: "엔드 장비 제작 재료인 어비스 코어와 가루를 파밍하는 주간 상위 던전입니다.",
    example: "「어비스 1~2인 심층 진입 시 마방 1,350 이상과 생빛 유지가 필수입니다.」",
    tags: ["어비스", "심연", "코어", "골론"]
  },
  {
    id: "g_apple_island",
    term: "사과섬",
    officialName: "사과의 섬 (달의 섬 근해)",
    category: "raid",
    summary: "에피소드 4의 주 무대로, 프시키의 허상 및 이클립스 6대 보스가 출현하는 최고위 파밍지입니다.",
    example: "「사과섬 입장하려면 에피소드 4 챕터 1 간소화 퀘스트 먼저 깨야 합니다.」",
    tags: ["사과의섬", "이클립스", "골모답", "프시키"]
  },
  {
    id: "g_mercurial",
    term: "머큐 (머큐리얼)",
    officialName: "머큐리얼 케이브 (루미에라, 칼리고, 셀레나, 시리스)",
    category: "raid",
    summary: "眞 아퀼루스 장비 제작 재료와 정수를 수급하는 사과의 섬 4대 관문 던전입니다.",
    example: "「머큐 루미에라 잡을 때 반사 장판 조심하고 딜컷 신호 잘 보세요.」",
    tags: ["머큐리얼", "루미에라", "칼리고", "아퀼루스"]
  },
  {
    id: "g_pshiki",
    term: "프허 (프시키)",
    officialName: "프시키의 허상",
    category: "raid",
    summary: "사과의 섬에서 주간 2,000만 ELSO와 장비 강화석을 수급하는 파밍 던전입니다.",
    example: "「프허 돌 때는 Ctrl+Y 눌러서 강화석 자동 소모 옵션 꼭 끄고 엘소 모으세요.」",
    tags: ["프시키의허상", "엘소", "ELSO", "강화석"]
  },
  {
    id: "g_abendon",
    term: "어벤던",
    officialName: "어벤던로드 (필멸/카디프/오를란느)",
    category: "raid",
    summary: "Shift+M 세계지도 좌측에서 진입하며, 마정석을 캐서 켈티카 아크레아에게 시드로 환전하는 최고 효율의 돈벌이 던전(주 30회)입니다.",
    example: "「주간 어벤던 30판 다 돌면 고정 시드만 2억~3.5억 넘게 들어옵니다.」",
    tags: ["어벤던로드", "마정석", "시드파밍", "아크레아", "돈벌이"]
  },
  {
    id: "g_limbo",
    term: "림보",
    officialName: "아카드라트-림보 (보물 개구리)",
    category: "raid",
    summary: "처치 시 경험치 400% 버프를 주는 '보물 개구리'가 출현하는 초보자 초고속 레벨업 성지입니다.",
    example: "「1편 공략대로 림보 들어가서 개구리 버프 띄우면 당일 310 만렙 바로 찍습니다.」",
    tags: ["아카드라트", "림보", "보물개구리", "400%", "만렙"]
  },
  {
    id: "g_obang",
    term: "오방",
    officialName: "오를리 방어전 (일반 / 어비스)",
    category: "raid",
    summary: "성문을 방어하며 몰려오는 적을 격퇴하는 주간 방어 던전입니다.",
    example: "「5차 각성 완료하면 오방 어비스 난이도가 열려 추가 상자를 얻습니다.」",
    tags: ["오를리방어전", "시간의사원", "어비스"]
  },
  {
    id: "g_kata",
    term: "카타",
    officialName: "네냐플 카타콤",
    category: "raid",
    summary: "네냐플 학원에서 진입하는 일일/주간 던전으로 룬 경험치와 기초 보급품을 줍니다.",
    example: "「카타콤 일일 5회는 룬 레벨 30까지 매일 필수 코스입니다.」",
    tags: ["카타콤", "네냐플", "룬경험치"]
  },
  {
    id: "g_rokagos",
    term: "로카고스",
    officialName: "로카고스 토벌전",
    category: "raid",
    summary: "체리아, 마티아, 티로로스, 라이코스 등 강력한 기믹 보스들이 출현하는 상위 토벌전입니다.",
    example: "「로카고스 2페이즈 티로로스는 나침반 시선 방향 반대로 유도해야 전멸 안 당합니다.」",
    tags: ["로카고스", "체리아", "티로로스", "토벌전"]
  },

  // 2. 스펙 · 시스템 용어
  {
    id: "g_geukhan",
    term: "극한 (1차 / 2차)",
    officialName: "1차 극한 / 2차 극한 시스템",
    category: "spec",
    summary: "캐릭터의 스킬 대미지 상한선과 최대 체력 한도를 비약적으로 해제하는 필수 승급 단계입니다.",
    example: "「285에 1차 극한, 310 만렙 달성 후 원격 퀘스트로 2차 극한을 완료해야 딜이 뚫립니다.」",
    tags: ["1차극한", "2차극한", "대미지제한", "스펙업"]
  },
  {
    id: "g_gak_seong",
    term: "각성 (1~5각)",
    officialName: "1차 ~ 5차 각성 (Awakening)",
    category: "spec",
    summary: "캐릭터의 타격당 대미지 제한을 단계별로 확장하는 시스템입니다. (5각 시 300만 이상 해금)",
    example: "「이클립스 보스 진입하려면 최소 5차 각성이 필수 조건입니다.」",
    tags: ["각성", "1각", "2각", "3각", "4각", "5각"]
  },
  {
    id: "g_eta",
    term: "에타 (Eta)",
    officialName: "에타의 의지 (시스템)",
    category: "spec",
    summary: "5차 각성 후 개방되는 상위 육성 시스템으로, 에타 레벨이 오를 때마다 고정 스탯과 최종 대미지 % 증가를 제공합니다.",
    example: "「에타 10레벨만 올려도 마을 스탯 및 실전 딜 체감이 엄청납니다.」",
    tags: ["에타", "에타의의지", "엔디미온", "고정스탯"]
  },
  {
    id: "g_rune_level",
    term: "룬 레벨 (룬렙)",
    officialName: "룬 계정 시스템 (Rune Level)",
    category: "spec",
    summary: "같은 넥슨 ID 내 모든 캐릭터가 공유하는 계정 내실 레벨입니다. (최대 40레벨)",
    example: "「룬 레벨 30을 넘겨야 상위 던전 파티 플레이 시 경험치 페널티가 사라집니다.」",
    tags: ["룬레벨", "룬의아이들", "룬스킬", "룬경험치"]
  },
  {
    id: "g_tesis_core",
    term: "테시스 코어 (코어)",
    officialName: "테시스 코어 진화 및 강화 시스템",
    category: "spec",
    summary: "장비에 장착하여 공격력, 마방, 명중, 피해량 증폭을 부여하는 상위 코어 아이템입니다.",
    example: "「코어는 1강 기본작 후 이클 코어 진화권으로 3부위 +10강(총 30작) 맞추는 게 정석 가성비입니다.」",
    tags: ["테시스코어", "코어4진화", "30작", "마방증가"]
  },
  {
    id: "g_mdef_enchant",
    term: "마방작 (인챈트)",
    officialName: "마법방어력 인챈트 (Magic Defense Enchant)",
    category: "spec",
    summary: "비호정령의 힐량과 딜량의 핵심인 마법방어력(MR) 스탯을 주문서로 장비에 강화 부여하는 작업입니다.",
    example: "「비호는 무조건 마방작이 1순위입니다. 방패와 로브에 마방 극옵을 먼저 붙이세요.」",
    tags: ["마방작", "인챈트", "비호정령", "MR", "스탯강화"]
  },
  {
    id: "g_hit_dex",
    term: "명중P (명중 포인트)",
    officialName: "DEX 절대 명중 판정 포인트",
    category: "spec",
    summary: "엔드 보스(골모답, 골론 등)에게 공격이 MISS 나지 않고 박히기 위한 순수 종합 명중 수치입니다.",
    example: "「최후의 결전 명중 컷은 DEX 2,500입니다. 4번 계산기 탭에서 판정해 보세요.」",
    tags: ["명중", "DEX", "MISS", "골모답", "명중계산기"]
  },
  {
    id: "g_coeff",
    term: "계수 (스킬 계수)",
    officialName: "스킬 대미지 계수 공식",
    category: "spec",
    summary: "장비와 스탯의 주스탯/부스탯이 공격력에 반영되는 비율 공식입니다. (비호는 마방 100% 반영)",
    example: "「비호정령 계수는 마방 수치가 딜과 힐에 온전히 1:1로 적용됩니다.」",
    tags: ["계수", "데미지공식", "마법방어력", "계수계산기"]
  },
  {
    id: "g_catalyst",
    term: "카탈 (카탈리스트)",
    officialName: "장비 옵션 전이 촉매 (Catalyst)",
    category: "spec",
    summary: "하위 티어 장비(인퍼널 등)에 붙어있던 인챈트 수치를 상위 장비(아퀼루스 등)로 옮길 때 사용하는 소모품입니다.",
    example: "「아퀼루스로 넘어갈 때 인퍼널 마방작 수치를 카탈리스트로 전이하면 돈을 아낍니다.」",
    tags: ["카탈리스트", "전이", "옵션전이", "인챈트계승"]
  },

  // 3. 장비 · 티어 약어
  {
    id: "g_jin_infernal",
    term: "진인퍼 (眞인퍼)",
    officialName: "眞 인퍼널 장비 세트 (Lv.290)",
    category: "equip",
    summary: "버닝러시 이벤트에서 초보자에게 기간제로 지급되는 준종결 지원 장비입니다.",
    example: "「진인퍼 세트만 풀로 장착해도 어벤던로드와 신조 일반은 여유롭게 돕니다.」",
    tags: ["인퍼널", "진인퍼", "버닝장비", "290제"]
  },
  {
    id: "g_jin_aquilus",
    term: "진아퀼 (眞아퀼)",
    officialName: "眞 아퀼루스 장비 세트 (Lv.300)",
    category: "equip",
    summary: "머큐리얼과 사과의 섬 재료로 제작하며, 테일즈위버의 든든한 국민 상위 장비 세트입니다.",
    example: "「사과의 섬 퀘스트 깨고 엘소 파밍하면 2주 기간제 진아퀼 풀셋을 공짜로 만듭니다.」",
    tags: ["아퀼루스", "진아퀼", "300제", "머큐리얼"]
  },
  {
    id: "g_abyss_set",
    term: "어비스 세트",
    officialName: "어비스 방어구 및 무기 (Lv.310)",
    category: "equip",
    summary: "아퀼루스 윗 등급의 상위 레이드 장비로, 강력한 세트 효과와 높은 마방을 제공합니다.",
    example: "「어비스 5세트 맞추면 이클립스 일반 난이도 생존이 매우 단단해집니다.」",
    tags: ["어비스장비", "310제", "상위레이드"]
  },
  {
    id: "g_eclipse_set",
    term: "이클 (이클립스)",
    officialName: "이클립스 장비 세트 (최상위 엔드)",
    category: "equip",
    summary: "현재 테일즈위버의 최상위 종결 레이드 장비입니다. 완제 드랍 시 초고액의 시드 가치를 가집니다.",
    example: "「주간 이클 순회에서 완제 득템하면 바로 수십억 시드 잭팟입니다!」",
    tags: ["이클립스", "종결장비", "골모답", "득템"]
  },
  {
    id: "g_vestige_set",
    term: "베스티지",
    officialName: "베스티지 장비 및 던전",
    category: "equip",
    summary: "곰돌이 레이드로 불리는 베스티지 던전에서 획득하는 성장형 특수 장비입니다.",
    example: "「베스티지 4단계는 물약 사용 전면 금지 기믹이니 힐 장판 꼭 밟으세요.」",
    tags: ["베스티지", "곰돌이", "물약금지"]
  },
  {
    id: "g_ankira",
    term: "엔키라 (진엔키)",
    officialName: "眞 엔키라 칼라그 장비 (Lv.280)",
    category: "equip",
    summary: "인퍼널 이전 단계의 육성 장비로, 현재는 젤리삐 가이드 기본 보상으로 거쳐 갑니다.",
    example: "「엔키라는 만렙 전 육성용이니 제련에 큰돈 쓰지 말고 인퍼널로 넘어가세요.」",
    tags: ["엔키라", "진엔키라", "육성장비"]
  },

  // 4. 도핑 · 재화 · 경제
  {
    id: "g_goe",
    term: "괴 (1괴)",
    officialName: "금괴 교환권 (100,000,000 Seed)",
    category: "economy",
    summary: "1억 시드를 뜻하는 테일즈위버 유저 간의 대표적인 화폐 단위입니다. (10괴 = 10억 시드)",
    example: "「신조 깃털 2괴에 팝니다. 1:1 거래 주세요.」",
    tags: ["괴", "1괴", "금괴", "1억", "화폐단위"]
  },
  {
    id: "g_frog_buff",
    term: "개구리 버프",
    officialName: "보물 개구리의 축복 (경험치 400%)",
    category: "economy",
    summary: "아카드라트 림보에서 랜덤 등장하는 황금 보물 개구리를 처치하면 걸리는 1시간 400% 버프입니다.",
    example: "「개구리 버프 뜬 상태에서 이자벨+경단 먹고 몰이 사냥하면 30분 만에 310 찍힙니다.」",
    tags: ["보물개구리", "개구리버프", "400%", "경험치"]
  },
  {
    id: "g_izabel",
    term: "이자벨 (이자경/이자비/이자고)",
    officialName: "이자벨의 비약 시리즈 (경험/비율/고정)",
    category: "economy",
    summary: "테일즈위버 3대 기본 도핑약입니다. 이자경(경험치 100%), 이자비(스탯 10%), 이자고(고정스탯).",
    example: "「중요 보스 갈 때는 이자비(비율)랑 이자고(고정) 꼭 같이 켜두세요.」",
    tags: ["이자벨", "이자경", "이자비", "이자고", "필수도핑"]
  },
  {
    id: "g_toema",
    term: "퇴마 (퇴마포션)",
    officialName: "퇴마사의 은총",
    category: "economy",
    summary: "공격력 증가와 명중률을 보정해 주는 대표적인 상위 전투 도핑 물약입니다.",
    example: "「보스 명중이 살짝 부족할 때 퇴마사의 은총 먹어주면 바로 박힙니다.」",
    tags: ["퇴마사의은총", "퇴마", "명중도핑", "공격력"]
  },
  {
    id: "g_gratz",
    term: "그라츠",
    officialName: "그라츠 물약 / 신속 포션",
    category: "economy",
    summary: "이동 속도와 공격 딜레이를 대폭 줄여 쾌적한 사냥을 돕는 필수 편의 도핑약입니다.",
    example: "「비호는 장판 깔고 빠르게 무빙해야 하니 그라츠 물약 상시 유지하세요.」",
    tags: ["그라츠", "신속포션", "이속", "딜레이"]
  },
  {
    id: "g_majeongseok",
    term: "마정석",
    officialName: "어벤던로드 마정석 (하급~최상급)",
    category: "economy",
    summary: "어벤던로드에서 드랍되는 보석으로, 켈티카 광장 아크레아에게 가져가면 순수 시드로 즉시 환전됩니다.",
    example: "「주간 숙제 끝나면 가방에 쌓인 최상급 마정석 몽땅 아크레아한테 환전하세요.」",
    tags: ["마정석", "어벤던", "아크레아", "시드환전"]
  },

  // 5. 비호 · 전투 스킬
  {
    id: "g_holy_field",
    term: "홀필 (홀리필드)",
    officialName: "홀리 필드 (Holy Field)",
    category: "skill",
    summary: "비호정령의 상징 스킬로, 결계 내 파티원이 받는 모든 피해량을 % 단위로 대폭 경감합니다.",
    example: "「보스 광역기 전조 보이면 즉시 홀필 깔아서 파티원 살려야 합니다.」",
    tags: ["홀리필드", "피해감소", "결계", "비호스킬"]
  },
  {
    id: "g_wide_heal",
    term: "와힐 (와이드힐)",
    officialName: "와이드 힐 (Wide Heal)",
    category: "skill",
    summary: "화면 내 전 파티원의 체력을 즉각 대량으로 회복시키는 핵심 광역 즉시 치유기입니다.",
    example: "「공대 피가 반피 이하로 빠지면 쿨 돌아올 때마다 와힐 연타해 주세요.」",
    tags: ["와이드힐", "광역힐", "비호정령", "힐러"]
  },
  {
    id: "g_over_pace",
    term: "오페 (오버페이스)",
    officialName: "오버 페이스 (Over Pace)",
    category: "skill",
    summary: "장판 위에 있는 파티원의 공격력과 피해량을 폭발적으로 증폭시키는 핵심 공격 버프입니다.",
    example: "「딜러들이 보스 극딜 넣는 자리에 오페 장판 항상 유지해 주는 게 비호의 실력입니다.」",
    tags: ["오버페이스", "공격버프", "딜증폭", "장판"]
  },
  {
    id: "g_light_of_life",
    term: "생빛 (생명의빛)",
    officialName: "생명의 빛",
    category: "skill",
    summary: "지속 도트 치유와 생존력을 부여하는 기본 유지형 힐 장판입니다.",
    example: "「아에르 소환하고 보스 발밑에 생명의 빛 깔아두면 파티가 웬만해선 안 죽습니다.」",
    tags: ["생명의빛", "도트힐", "아에르", "유지력"]
  },
  {
    id: "g_aer_air",
    term: "아에르",
    officialName: "정령 아에르 (소환수)",
    category: "skill",
    summary: "비호정령의 바람 속성 정령으로, 소환 시 비호의 모든 서포트 스킬과 힐 장판의 매개체가 됩니다.",
    example: "「던전 입장하면 제일 먼저 단축키로 아에르부터 소환해 두세요.」",
    tags: ["아에르", "정령", "소환수", "비호정령"]
  },

  // 6. 실수 방지 꿀팁
  {
    id: "g_tip_gak5",
    term: "5각 1개씩 조합",
    officialName: "5차 각성 재료 낱개 조합 주의보",
    category: "tips",
    summary: "5차 각성 재료(윤기/수영석)를 조합창에 여러 개 한꺼번에 넣으면 1개만 나오는 치명적 시스템 손실이 발생하므로 반드시 1개씩 개별 조합해야 합니다.",
    example: "「⚠️ 5각 재료 절대 뭉쳐서 조합하지 마세요! 1개씩 나눠서 넣어야 전 재산 안 날립니다.」",
    tags: ["5차각성", "재료조합", "주의사항", "손실방지"]
  },
  {
    id: "g_tip_gamble_npc",
    term: "어벤던 도박 NPC 무시",
    officialName: "어벤던로드 도박 NPC 회피",
    category: "tips",
    summary: "어벤던로드 보스 클리어 후 나타나는 도박 제안 NPC는 확률상 무조건 시드를 잃으므로 100% 무시해야 합니다.",
    example: "「보스 잡고 나오는 도박 NPC는 말도 섞지 말고 바로 포탈 타고 나오세요.」",
    tags: ["어벤던로드", "도박NPC", "시드손실", "꿀팁"]
  },
  {
    id: "g_tip_ctrl_y",
    term: "Ctrl+Y 강화석 끄기",
    officialName: "프시키의 허상 강화석 소모 방지",
    category: "tips",
    summary: "프시키의 허상에서 Ctrl+Y를 눌러 강화석 자동 소모 옵션을 OFF로 꺼두어야 아까운 강화석 낭비 없이 순수 ELSO 포인트를 모을 수 있습니다.",
    example: "「프허 돌기 전에 단축키 Ctrl+Y 눌러서 강화석 소모 체크 해제되었는지 확인 필수!」",
    tags: ["Ctrl+Y", "프시키의허상", "강화석", "엘소"]
  },
  {
    id: "g_tip_rune30_solo",
    term: "룬 30 미만 신조 솔플",
    officialName: "신조의 둥지 솔로 플레이 추천",
    category: "tips",
    summary: "계정 룬 레벨 30 미만일 때 파티로 입장하면 경험치 패널티가 크므로, 신조 일반은 솔플로 도는 것이 훨씬 빠르고 경험치도 독식합니다.",
    example: "「룬 20렙대 초보분들은 신조 파티 찾지 마시고 솔플로 편하게 깨시면 됩니다.」",
    tags: ["신조의둥지", "솔플", "룬레벨30", "경험치페널티"]
  },
  {
    id: "g_rune_book",
    term: "룬 도감작 (장비 수집)",
    officialName: "룬의 서 장비 수집 & 룬 도감 등록",
    category: "spec",
    summary: "저레벨 마법 빗자루 10종 및 데린/시오칸/네오테시스 날개 등을 수집하여 룬 도감에 등록하는 필수 내실 코스입니다. 등록 시 영구 룬 경험치 및 추가 룬 스킬포인트를 획득할 수 있습니다.",
    example: "「빗자루 10종 도감작 먼저 끝내시면 이동속도랑 마방 룬 스킬 찍을 포인트가 바로 나옵니다!」",
    tags: ["룬도감", "룬스킬포인트", "빗자루", "내실", "추가포인트"]
  },
  {
    id: "g_magic_brooms",
    term: "저렙 빗자루 10종",
    officialName: "크라이덴/시련/수정/시노프/혼동 마법 빗자루 컬렉션",
    category: "equip",
    summary: "크라이덴 평원 4, 시련의 동굴 1~4층, 시노프 던전 등에서 일반 몬스터가 쉽게 드롭하는 10가지 마법 빗자루 시리즈입니다. 룬 도감에 등록하여 손쉽게 추가 룬 포인트를 챙기는 초보자 1순위 파밍템입니다.",
    example: "「시노프 3~6층 돌면서 고혹/크리스탈/요정/천상 빗자루 4종 한 번에 모아보세요.」",
    tags: ["빗자루", "룬도감", "시노프", "시련의동굴", "크라이덴", "혼동"]
  },
  {
    id: "g_classic_wings",
    term: "데린·시오칸·네오 날개",
    officialName: "眞-타임스코프R, 眞-시간가방, 眞-윙오브데스티니, 眞-켈란, 네오테시스 1·2 날개",
    category: "equip",
    summary: "과거 국민 던전(데린세히르 어려움, 시오칸하임 일반, 네오테시스 1·2)의 보상 날개와 아티팩트로, 룬 도감 등록 시 대량의 룬 업적 점수와 스킬포인트를 수급합니다.",
    example: "「데린세히르 보스방 돌다 안 나오면 수호자의 훈장 60개로 윙 오브 데스티니 확정 교환하세요.」",
    tags: ["데린세히르", "시오칸하임", "네오테시스", "날개", "룬도감", "훈장"]
  },
  {
    id: "g_gathering",
    term: "채집 & 조제",
    officialName: "테일즈위버 라이프 스킬 (약초 채집 & 물약/요리 조제)",
    category: "tips",
    summary: "나르비크 플레르 NPC 또는 네냐플에서 습득하는 생활 스킬로, 룬정원에서 매일 자라나는 허브를 채집하여 괴력의 햄, 퇴마사의 은총, 비약류를 직접 제작하고 룬 업적을 달성합니다.",
    example: "「매일 룬정원 허브 채집하면 룬 업적 '채집의 달인' 달성으로 추가 룬포인트도 쏠쏠합니다.」",
    tags: ["채집", "조제", "룬정원", "허브", "괴력의햄", "라이프스킬"]
  },
  {
    id: "g_goryeok_ham",
    term: "괴력의 햄",
    officialName: "조제/요리 버프 아이템 - 괴력의 햄",
    category: "economy",
    summary: "마법방어력(MR) +15, 공격 피해량 +5%를 올려주는 비호정령의 국민 버프 음식입니다. 룬정원 채집 허브(바닐라 등)를 이용해 직접 조제하거나 거래소에서 구매합니다.",
    example: "「컨텐츠 갈 때 괴력의 햄 하나만 씹어도 힐량과 딜 계수가 확실히 체감됩니다.」",
    tags: ["괴력의햄", "도핑", "마방", "대미지", "채집", "조제"]
  },
  {
    id: "g_fairy_pitta",
    term: "페어리 피타 (Pitta)",
    officialName: "페어리 피타 무기 및 장비 세트",
    category: "equip",
    summary: "외전 6 챕터 업데이트로 추가된 중자본 징검다리 장비로, 드롭 시 봉인 상태이며 거래소 구매 시 명중률 30 / 크리티컬 30에 가까운 고옵션 매물을 고르는 것이 핵심입니다.",
    example: "「아퀼루스 전 단계에서 피타 무기 사서 틴트작 330선까지 치고 쓰시면 가성비 최고입니다.」",
    tags: ["피타", "페어리피타", "하모닉틴트", "외전6", "무기"]
  },
  {
    id: "g_harmonic_tint",
    term: "하모닉 틴트 (피타 노가다)",
    officialName: "페어리 피타 전용 강화 재료 - 하모닉 틴트",
    category: "economy",
    summary: "봉인 해제된 피타 장비에 사용하여 스탯을 강화하는 아이템입니다. 330~340선까지는 효율이 좋으나 341 이후 급격히 비용이 폭증하며, 피타 장비를 분해하여 틴트를 모아 파는 '피타 노가다'는 뉴비의 대표 시드 벌이입니다.",
    example: "「피타 던전 돌아서 장비 갈갈이하고 하모닉 틴트 거래소에 올리면 초반 시드 금방 모입니다.」",
    tags: ["하모닉틴트", "피타노가다", "시드벌이", "강화재료"]
  },
  {
    id: "g_cuff",
    term: "라이도 심볼릭 커프 (커프)",
    officialName: "일일 내실 장비 - 라이도 심볼릭 커프",
    category: "spec",
    summary: "일일 던전 '발굴지'와 '설계자의 채굴장'을 순회하며 모은 조각으로 주스탯/명중/크리를 영구적으로 올리는 핵심 장비 내실입니다. 발굴지에서 최대 140, 채굴장에서 200까지 확장됩니다.",
    example: "「매일 발굴지 돌아서 커프 마방 140 먼저 꽉 채우고 명중으로 넘어가세요!」",
    tags: ["커프", "라이도심볼릭커프", "발굴지", "채굴장", "내실"]
  },
  {
    id: "g_core_master",
    term: "코어 마스터 (4진 4강)",
    officialName: "테시스 코어 마스터 및 세트 효과",
    category: "spec",
    summary: "모든 방향의 테시스 코어를 4진화 4강화(+10강) 완료한 상태입니다. 달성 시 전 지역 상시 적용되는 최종 대미지 % 증폭 버프를 얻으며 코어 마스터 던전이 개방됩니다. 명중/민첩/회피 등 부스탯 코어는 강화 비용이 50% 반값입니다.",
    example: "「비용 아끼려면 부스탯 코어부터 4진4강 뚫어서 코어마스터 세트 효과 먼저 챙기세요.」",
    tags: ["코어마스터", "테시스코어", "4진4강", "부스탯반값", "최종뎀증"]
  },
  {
    id: "g_transfer_stone",
    term: "부여석 & 상급 전이석",
    officialName: "옵션 전이 시스템 & 룬정원 우즈 부여석",
    category: "equip",
    summary: "랜덤 옵션을 상위 장비로 이전하는 시스템입니다. 대상 장비와 옵션의 슬롯 카테고리가 일치해야 하므로 우즈 NPC에게 부여석을 사서 맞춰야 합니다. 100% 확정엔 '강대한 마력', 더미 보존엔 '찬란한' 상급 전이석을 씁니다.",
    example: "「카테고리 안 맞추고 전이 돌리면 엉뚱한 옵션 날아가니 우즈 부여석 먼저 꼭 바르세요.」",
    tags: ["옵션전이", "부여석", "강대한마력", "찬란한", "카테고리"]
  },
  {
    id: "g_eta_of_will",
    term: "에타의 의지 (에타)",
    officialName: "5차 각성 상위 내실 시스템 - 에타의 의지",
    category: "spec",
    summary: "5차 각성 완료 후 엔디미온을 통해 해금되는 최상위 스펙업 시스템입니다. 에타 레벨(1~100+)이 상승할 때마다 올스탯, 최종 대미지 % 증가, 피격 피해 감소 효과를 폭발적으로 부여합니다.",
    example: "「하이아칸(sc=7)과 네냐플(sc=6) 서버별 랭킹 확인하면서 일일 에타 가루 파밍 루틴 챙기세요.」",
    tags: ["에타", "에타의의지", "5차각성", "엔디미온", "에타랭킹"]
  },
  {
    id: "g_encrypt_scrolls",
    term: "인크립트 스크롤",
    officialName: "장비 한계돌파 스크롤 (왕실/축복/가호/로드/비아누)",
    category: "equip",
    summary: "장비의 합성 횟수를 늘리고 한계 스탯을 뚫는 스크롤입니다. 성공률은 왕실(36%), 축복(31%), 가호(26%), 로드(21%) 순이며, 비아누는 실패해도 장비가 파괴되지 않는 노파괴 스크롤입니다. 파괴 보호 주문서로 실패 시 파괴율을 경감할 수 있습니다.",
    example: "「왕실 인크 바를 땐 파괴 보호 주문서 30장 풀로 넣어서 파괴 위험 줄이세요.」",
    tags: ["인크립트", "왕실인크", "축인크", "비아누", "파괴보호"]
  },
  {
    id: "g_reinforce_talisman",
    term: "장비 강화 부적",
    officialName: "강화 실패 하락 방지 부적",
    category: "equip",
    summary: "장비 7강 ➔ 8강 이상 강화 시도 시 실패하더라도 단계 하락(-1~3단계 하락 또는 0강 초기화)을 막아주는 필수 보호 아이템입니다.",
    example: "「7강까지는 그냥 던져도 되지만 8강 도전부터는 강화 부적 없으면 6강으로 떨어집니다!」",
    tags: ["강화부적", "장비강화", "하락방지", "안전강화"]
  },
  {
    id: "g_soul_eater",
    term: "소울이터 & 감각의 해방",
    officialName: "소울링크 1티어 종결 유물",
    category: "spec",
    summary: "소울링크 유물 뽑기에서 약 1.0% 확률로 등장하는 '소울이터'(보스 스탯 강탈)와 약 5.0% 확률의 '감각의 해방'(크리티컬 배율 증폭)으로 구성된 종결 유물 세트입니다. 아브리 엔키라 훈장으로 소울 포인트를 모아 뽑습니다.",
    example: "「소울링크 유물은 소울이터 1% 뜰 때까지 소울 포인트 모아서 천천히 돌리는 게 정석입니다.」",
    tags: ["소울링크", "소울이터", "감각의해방", "유물", "아브리엔키라"]
  },
  {
    id: "g_gold_mcard",
    term: "8스킬 금카드 (몬카)",
    officialName: "개편된 몬스터 카드 조합 시스템",
    category: "spec",
    summary: "개편 후 복잡한 공식 없이 1랭크 4스킬 동카드 2개를 조합한 뒤 결과창에서 '다시 뽑기'를 눌러 금카드(8스킬)를 띄우는 방식으로 단순화되었습니다. 비호는 백속+3, 레어+4, 전준+4, 약점포착+3, 이속+4, 호기심+3, 속공+3, 최후의의지+3을 주로 씁니다.",
    example: "「동카드 2개 조합하고 시드 들여서 다시 뽑기 돌리면 8스킬 금카드 금방 나옵니다.」",
    tags: ["몬스터카드", "금카드", "8스킬", "다시뽑기", "카드스캐너"]
  },
  {
    id: "g_third_sien",
    term: "서드 시엔 & 연강마",
    officialName: "스킬 레벨 확장 및 연마 강화",
    category: "spec",
    summary: "스킬의 최대 레벨 한계를 뚫어주는 '서드 시엔'과 기본 연마(무기/방어구/콤보)의 배율을 대폭 끌어올리는 '연마 강화'입니다. 서드시엔 섭취 후에는 반드시 스킬창(V)에서 직접 레벨을 올려주어야 적용됩니다.",
    example: "「서드시엔 먹고 스킬창에서 레벨 안 올리면 적용 안 되니 꼭 V키 눌러서 확인하세요!」",
    tags: ["서드시엔", "컴플리트", "연강마", "스킬한계돌파", "연마"]
  },
  {
    id: "g_sun_relic",
    term: "태양의 렐릭 & 신조의 성물",
    officialName: "네냐플 디르웬 렐릭 & 신조 성물 슬롯",
    category: "spec",
    summary: "네냐플 디르웬 일일 퀘스트로 조각을 모아 성장시키는 '태양의 렐릭'과 신조의 둥지 완료 후 눈물/깃털로 강화하는 '신조의 성물'입니다. 계정 전체 캐릭터에 올스탯과 공격력/마방을 상시 제공하는 필수 내실입니다.",
    example: "「매일 디르웬한테 렐릭 조각 퀘스트만 깨도 올스탯과 체력이 영구적으로 쑥쑥 큽니다.」",
    tags: ["태양의렐릭", "신조의성물", "디르웬", "성물슬롯", "내실"]
  }
];


// ==================== 10. CRAFTING, REFINEMENT & COMBINATION DATA (공방 데이터) ====================
const CRAFTING_DATA = {
  enchant: {
    title: "🛡️ 제련 & 마방 인챈트 연구실",
    desc: "비호정령의 힐량과 딜량의 핵심인 마법방어력(MR) 인챈트 주문서 및 안전 강화 규칙입니다.",
    scrolls: [
      {
        name: "일회용 마방 인챈트 주문서",
        type: "가성비 추천 (초보자 1순위)",
        cost: "약 500만~1,000만 Seed",
        stat: "MR +6 ~ +12",
        feature: "거래소에서 저렴하게 구매 가능하며, 기간제 眞 아퀼루스 장비에 발라 마을 마방 1,400+를 달성하는 핵심 주문서입니다."
      },
      {
        name: "축복받은 마법방어력 인챈트",
        type: "정규 상위 인챈트",
        cost: "약 3,000만~5,000만 Seed",
        stat: "MR +10 ~ +18",
        feature: "영구제 아퀼루스나 어비스 장비 종결 세팅 시 사용합니다. 실패 시 내구도 보호제를 권장합니다."
      },
      {
        name: "하이퍼 인챈트 주문서",
        type: "최상위 극옵 도전",
        cost: "고액 시드 / 캐시샵",
        stat: "MR +15 ~ +25",
        feature: "이클립스 종결 장비에 바르는 주문서로, 극한의 마방을 끌어올릴 때 사용합니다."
      }
    ],
    rules: [
      "📌 비호정령 인챈트 1순위 부위: 【방패(손목)】와 【로브(갑옷)】에 마방 수치가 가장 높게 붙으므로 최우선 강화하세요.",
      "📌 안전 강화 구간: 기본 1~6강까지는 실패 부담이 적으나, 고강화 시도 시 내구도 손상 방지제를 반드시 확인하세요.",
      "📌 기간제 장비 활용: 버닝 기간제 眞 아퀼루스에는 고가 주문서 대신 일회용 마방 주문서로 알뜰하게 도배하세요."
    ]
  },
  awakening5: {
    title: "⚠️ 5차 각성 개별 조합 가이드",
    warning: "🚨 [초특급 주의] 5차 각성 재료는 한꺼번에 넣으면 1개만 나오는 시스템 참사가 발생합니다. 반드시 1개씩 개별 조합하세요!",
    steps: [
      {
        step: "STEP 1. 재료 준비",
        detail: "젤리삐 가이드 11단계 보상 및 이클립스/어비스 보스 파밍으로 '윤기나는 정수'와 '수호자의 영석'을 확보합니다."
      },
      {
        step: "STEP 2. 1개씩 낱개 조합 (핵심)",
        detail: "조합창에 재료를 전부 올리지 말고, 딱 1세트(정수 1개 + 영석 1개)씩만 넣고 조합하여 '융합된 수호자의 영석'을 만듭니다."
      },
      {
        step: "STEP 3. 아크론 요새 NPC 리라 전달",
        detail: "제작된 융합된 수호자의 영석을 아크론 요새의 NPC 리라에게 전달하여 퀘스트를 완료합니다."
      },
      {
        step: "STEP 4. 엔디미온 '에타의 의지' 해금",
        detail: "연계 퀘스트를 통해 엔디미온을 찾아가면 마침내 5차 각성이 완료되고 '에타의 의지' 내실 시스템이 공식 개방됩니다."
      }
    ]
  },
  tesisCore: {
    title: "👑 테시스 코어 4진화 & 30작 가성비 로드맵",
    desc: "적은 비용으로 종결급 성능(마방 +32 및 최종 대미지 % 증폭)을 끌어내는 초보자 가성비 세팅법입니다.",
    steps: [
      {
        num: "1단계: 코어 상자 분해",
        desc: "코어 던전(TP 소모) 및 주간 숙제로 얻은 테시스 코어 상자를 분해하여 '코어 조각'을 모읍니다."
      },
      {
        num: "2단계: 기본 1단계 강화",
        desc: "코어 조각을 사용하여 원하는 3부위 코어를 기본 1강화 상태로 만들어 둡니다."
      },
      {
        num: "3단계: 이클립스 코어 진화권 사용",
        desc: "거래소에서 저렴하게 거래되는 '이클립스 코어 진화권'을 사용하여 코어를 즉시 4진화로 점핑시킵니다."
      },
      {
        num: "4단계: 3부위 +10강 (+30작) 완성",
        desc: "3부위 모두 +10강까지 강화 완료하면 총 +30작이 완성되어 마방 +32 및 폭발적인 딜 증폭 버프를 획득합니다!"
      }
    ]
  },
  recipes: [
    {
      name: "眞 아퀼루스 장비 세트 (Lv.300)",
      npc: "사과의 섬 제작소 NPC",
      mats: [
        "아퀼루스 장비 파편 5개",
        "머큐리얼 정수 10개",
        "아퀼루스 변환석 1개",
        "제작 비용 5,000만 Seed"
      ],
      tip: "사과의 섬 스토리 퀘스트 클리어 시 2주 기간제 풀세트를 무료 제작할 수 있습니다."
    },
    {
      name: "어비스 장비 세트 (Lv.310)",
      npc: "심연의 틈 NPC",
      mats: [
        "어비스 코어 상자 10개",
        "심연의 가루 50개",
        "융합 촉매 5개",
        "제작 비용 1억 Seed"
      ],
      tip: "신조의 둥지와 어비스 심층 파티 순회를 통해 재료를 수급합니다."
    },
    {
      name: "이클립스 장비 세트 (최상위 엔드)",
      npc: "달의 섬 이클립스 제단",
      mats: [
        "이클립스 정수 20개",
        "고유 에타 가루 100개",
        "달의 파편 10개",
        "제작 비용 2억 Seed"
      ],
      tip: "사과의 섬 6대 보스 순회 및 완제 직드랍 득템을 노리는 것이 효율적입니다."
    }
  ],
  ability: {
    title: "✨ 어빌리티 합성 & 옵션 전이 규칙",
    desc: "장비에 추가 특수 효과를 부여하고 상위 장비로 인챈트 수치를 계승하는 시스템입니다.",
    points: [
      {
        title: "상실의 백마법 증폭 어빌리티 (비호 필수)",
        content: "무기 및 갑옷 부위에 장착 시 비호정령의 백마법 공격력 및 힐량이 퍼센트(%)로 증가하는 필수 어빌리티입니다."
      },
      {
        title: "카탈리스트 옵션 전이 수칙",
        content: "인퍼널 장비에 완성해 둔 고수치 마방작을 아퀼루스 장비로 이전할 때 카탈리스트를 사용하면 인챈트 비용을 수억 시드 절약할 수 있습니다."
      },
      {
        title: "전이 시 주의점",
        content: "옵션 전이 시 베이스 장비는 소멸하므로 대상 장비와 계승 장비를 반드시 두 번 확인하세요."
      }
    ]
  }
};


// ==================== 11. WEEKLY TASK LOOT PRESETS (주간 숙제 득템 프리셋 DB) ====================
const LOOT_PRESETS = {
  w_shinjo: [
    { name: "신조의 깃털", defaultSeed: 45000000, tag: "재료" },
    { name: "아퀼루스 변환석", defaultSeed: 80000000, tag: "대박" },
    { name: "신조의 눈물", defaultSeed: 30000000, tag: "희귀" },
    { name: "아퀼루스 완제 상자", defaultSeed: 120000000, tag: "완제" }
  ],
  w_abendon_mortal: [
    { name: "최상급 마정석 x5", defaultSeed: 35000000, tag: "시드" },
    { name: "최상급 마정석 x10", defaultSeed: 70000000, tag: "대박" },
    { name: "특상급 마정석 1개", defaultSeed: 50000000, tag: "희귀" }
  ],
  w_abendon_cardif: [
    { name: "최상급 마정석 x5", defaultSeed: 35000000, tag: "시드" },
    { name: "최상급 마정석 x10", defaultSeed: 70000000, tag: "대박" },
    { name: "특상급 마정석 1개", defaultSeed: 50000000, tag: "희귀" }
  ],
  w_abendon_orlanne: [
    { name: "최상급 마정석 x5", defaultSeed: 35000000, tag: "시드" },
    { name: "최상급 마정석 x10", defaultSeed: 70000000, tag: "대박" },
    { name: "특상급 마정석 1개", defaultSeed: 50000000, tag: "희귀" }
  ],
  w_abyss_boss: [
    { name: "어비스 코어 상자", defaultSeed: 60000000, tag: "코어" },
    { name: "심연의 가루 x10", defaultSeed: 40000000, tag: "재료" },
    { name: "어비스 장비 완제", defaultSeed: 250000000, tag: "잭팟" }
  ],
  w_abyss_deep: [
    { name: "어비스 코어 상자 x2", defaultSeed: 120000000, tag: "코어" },
    { name: "심연의 정수", defaultSeed: 80000000, tag: "재료" },
    { name: "어비스 무기 완제", defaultSeed: 350000000, tag: "잭팟" }
  ],
  w_mercurial_celena: [
    { name: "머큐리얼 파편", defaultSeed: 30000000, tag: "재료" },
    { name: "셀레나의 정수", defaultSeed: 50000000, tag: "희귀" },
    { name: "아퀼루스 장비 완제", defaultSeed: 150000000, tag: "완제" }
  ],
  w_mercurial_caligo: [
    { name: "머큐리얼 파편", defaultSeed: 30000000, tag: "재료" },
    { name: "칼리고의 정수", defaultSeed: 50000000, tag: "희귀" }
  ],
  w_mercurial_siris: [
    { name: "머큐리얼 파편", defaultSeed: 30000000, tag: "재료" },
    { name: "시리스의 정수", defaultSeed: 50000000, tag: "희귀" }
  ],
  w_mercurial_lumi: [
    { name: "머큐리얼 파편 x2", defaultSeed: 60000000, tag: "재료" },
    { name: "루미에라의 정수", defaultSeed: 70000000, tag: "희귀" },
    { name: "진아퀼 무기 상자", defaultSeed: 200000000, tag: "잭팟" }
  ],
  w_ecl_bosses: [
    { name: "이클립스 무기 완제", defaultSeed: 400000000, tag: "초대박" },
    { name: "이클립스 방어구 완제", defaultSeed: 250000000, tag: "대박" },
    { name: "고유 에타 가루 x20", defaultSeed: 80000000, tag: "에타" },
    { name: "이클립스 코어 진화권", defaultSeed: 60000000, tag: "코어" }
  ],
  w_vestige: [
    { name: "베스티지 완제", defaultSeed: 150000000, tag: "완제" },
    { name: "베스티지 파편 x5", defaultSeed: 30000000, tag: "재료" }
  ],
  w_obang_abyss: [
    { name: "어비스 방어전 상자", defaultSeed: 40000000, tag: "상자" },
    { name: "고액 시드 주머니", defaultSeed: 30000000, tag: "시드" }
  ],
  w_rokagos: [
    { name: "로카고스의 파편", defaultSeed: 40000000, tag: "재료" },
    { name: "특수 강화석 x10", defaultSeed: 20000000, tag: "강화" }
  ],
  w_elso_cap: [
    { name: "주간 ELSO 환전 대박", defaultSeed: 50000000, tag: "엘소" }
  ],
  default: [
    { name: "주간 보너스 완제", defaultSeed: 50000000, tag: "완제" },
    { name: "특수 재료 상자", defaultSeed: 20000000, tag: "재료" },
    { name: "고액 시드 주머니", defaultSeed: 15000000, tag: "시드" }
  ]
};


// ==================== 12. RUNE COLLECTION & SKILL POINT DATA (룬 도감 16대 필수 컬렉션) ====================
const RUNE_COLLECTION_DATA = {
  summary: {
    title: "🌱 룬 도감 16대 필수 컬렉션 (빗자루 10종 & 클래식 날개 6종)",
    desc: "룬 레벨 40을 달성해도 기본 지급 포인트만으로는 이동속도, 마방, 올스탯 패시브를 전부 마스터할 수 없습니다. 저레벨 마법 빗자루 10종과 옛 던전 날개 6종을 룬 도감에 등록하여 계정 영구 추가 룬 스킬포인트를 손쉽게 획득하세요!"
  },
  brooms: [
    {
      id: "broom_wood",
      name: "나무 마법 빗자루",
      location: "크라이덴 평원 4",
      subLoc: "필드 전역",
      type: "초반 필드",
      mobType: "일반 몬스터",
      tip: "초반 필드 잡몹 처치 시 높은 확률로 드롭. 워프 카드로 진입 권장."
    },
    {
      id: "broom_plastic",
      name: "플라스틱 마법 빗자루",
      location: "시련의 동굴 1층",
      subLoc: "동굴 내부",
      type: "시련의 동굴",
      mobType: "1층 몬스터",
      tip: "시련의 동굴 1층 잡몹 처치 시 드롭."
    },
    {
      id: "broom_apprentice",
      name: "수습 마녀의 빗자루",
      location: "시련의 동굴 2층",
      subLoc: "동굴 내부",
      type: "시련의 동굴",
      mobType: "2층 몬스터",
      tip: "시련의 동굴 2층 몬스터 처치 시 드롭."
    },
    {
      id: "broom_gold",
      name: "황금 날개 빗자루",
      location: "시련의 동굴 4층",
      subLoc: "동굴 내부",
      type: "시련의 동굴",
      mobType: "4층 몬스터",
      tip: "시련의 동굴 4층 몬스터 처치 시 드롭."
    },
    {
      id: "broom_garden",
      name: "마법 정원 빗자루",
      location: "수정동굴 1층",
      subLoc: "수정동굴",
      type: "수정동굴",
      mobType: "1층 몬스터",
      tip: "수정동굴 1층 몬스터 처치 시 드롭."
    },
    {
      id: "broom_allure",
      name: "고혹의 마녀 빗자루",
      location: "시노프 던전 3층",
      subLoc: "시노프 3층",
      type: "시노프 던전",
      mobType: "3층 몬스터",
      tip: "시노프 던전 3층 몬스터 처치 시 드롭."
    },
    {
      id: "broom_crystal",
      name: "크리스탈 마법 빗자루",
      location: "시노프 던전 4층",
      subLoc: "시노프 4층",
      type: "시노프 던전",
      mobType: "4층 몬스터",
      tip: "시노프 던전 4층 몬스터 처치 시 드롭."
    },
    {
      id: "broom_fairy",
      name: "요정의 빗자루",
      location: "시노프 던전 5층",
      subLoc: "시노프 5층",
      type: "시노프 던전",
      mobType: "5층 몬스터",
      tip: "시노프 던전 5층 몬스터 처치 시 드롭."
    },
    {
      id: "broom_celestial",
      name: "천상의 마법 빗자루",
      location: "시노프 던전 6층",
      subLoc: "시노프 6층",
      type: "시노프 던전",
      mobType: "6층 몬스터",
      tip: "시노프 던전 6층 몬스터 처치 시 드롭. 시노프 3~6층을 한 번에 순회하면 4종을 빠르게 수집합니다."
    },
    {
      id: "broom_blaze",
      name: "작렬의 마법 빗자루",
      location: "혼란의 동굴 5층",
      subLoc: "혼동 5층",
      type: "혼란의 동굴",
      mobType: "5층 몬스터",
      tip: "혼란의 동굴 5층 몬스터 처치 시 드롭."
    }
  ],
  wings: [
    {
      id: "wing_timescope",
      name: "眞 - 타임 스코프R",
      location: "데린세히르 [어려움] 전맵",
      subLoc: "1~5층 전 구역",
      type: "특수 아티팩트",
      mobType: "일반/정예 몬스터",
      tip: "데린세히르 어려움 난이도 사냥 시 드롭."
    },
    {
      id: "wing_timebag",
      name: "眞 - 시간 여행자의 가방R",
      location: "데린세히르 [어려움] 전맵",
      subLoc: "1~5층 전 구역",
      type: "특수 몸 장비",
      mobType: "일반/정예 몬스터",
      tip: "데린세히르 어려움 난이도 사냥 시 드롭."
    },
    {
      id: "wing_destiny",
      name: "眞 - 윙 오브 데스티니R",
      location: "데린세히르 [어려움] 보스방 or 수호자의 훈장 60개 교환",
      subLoc: "보스방 / NPC 교환",
      type: "클래식 날개",
      mobType: "보스 드롭 or 확정 교환",
      tip: "보스 직접 드롭 외에도 던전 앞 NPC에게 수호자의 훈장 60개로 100% 확정 교환 가능!"
    },
    {
      id: "wing_kelan",
      name: "眞 - 켈란 클라우스 윙",
      location: "시오칸하임 [일반] 전맵",
      subLoc: "시오칸 일반 전 구역",
      type: "클래식 날개",
      mobType: "일반 난이도 몬스터",
      tip: "시오칸하임 일반 난이도 전 구역 몬스터 처치 시 드롭."
    },
    {
      id: "wing_neotesis1",
      name: "기억의 수호자 XXX 윙 시리즈",
      location: "네오테시스 1 완료 보상",
      subLoc: "던전 클리어 보상 상자",
      type: "네오테시스 날개",
      mobType: "던전 완료 보상",
      tip: "네오테시스 1 던전 완료 보상 상자에서 직업군별 윙 획득 후 도감 등록."
    },
    {
      id: "wing_neotesis2",
      name: "천공의 수호자 OOO 윙 시리즈",
      location: "네오테시스 2 완료 보상",
      subLoc: "던전 클리어 보상 상자",
      type: "네오테시스 날개",
      mobType: "던전 완료 보상",
      tip: "네오테시스 2 던전 완료 보상 상자에서 직업군별 윙 획득 후 도감 등록."
    }
  ],
  skillPriority: [
    {
      rank: "🥇 1순위: 이동속도 증가",
      stat: "이동속도 +1 ~ +3",
      desc: "테일즈위버의 모든 기믹 회피, 보스 장판 탈출 및 던전 이동 속도를 좌우하는 최우선 룬 스킬입니다."
    },
    {
      rank: "🥈 2순위: 마법방어력 / 공격력",
      stat: "MR / ATK 증가",
      desc: "비호정령의 힐 계수 및 보호막, 버프 효율과 직결되며 파티 딜링 능력을 끌어올립니다."
    },
    {
      rank: "🥉 3순위: 올스탯 / 명중 / 크리티컬",
      stat: "ALL STATS / DEX / CRI",
      desc: "상위 던전 명중 컷(DEX)과 크리티컬 배율을 안정적으로 확보해 줍니다."
    },
    {
      rank: "🎖️ 4순위: 피격 대미지 감소 / 체력",
      stat: "피격 댐감 % / Max HP",
      desc: "신어헬오방 및 어비스/이클립스 고난도 레이드에서 의문사를 방지하는 든든한 방어 패시브입니다."
    }
  ]
};

// ==================== 13. GATHERING & ALCHEMY RECIPES (룬정원 채집 & 조제 가이드) ====================
const GATHERING_DATA = {
  overview: {
    title: "🌿 룬정원 채집 & 조제 가이드 (도핑비 절약 & 룬 업적)",
    desc: "매일 룬정원(ESC ➔ 룬의 정원)에 피어나는 자생 허브를 채집하면 룬 업적 '채집의 달인' 점수가 누적되어 추가 룬 포인트를 수급하며, 비호 필수 도핑인 '괴력의 햄'과 '비약류'를 직접 만들어 수억 시드를 절약할 수 있습니다.",
    npc: "나르비크 플레르 NPC (마을 서쪽 화원) 또는 네냐플 퀘스트"
  },
  gardenHerbs: [
    { name: "생명 허브 / 마나 허브", spot: "룬정원 외곽 잔디밭", usage: "기초 회복 물약 및 고급 방어 비약 베이스" },
    { name: "바닐라 / 신선한 풀", spot: "룬정원 중앙 화단 주변", usage: "괴력의 햄 및 특수 버프 요리 핵심 필수 재료" },
    { name: "달콤한 열매 / 야생 열매", spot: "룬정원 나무 및 덤불", usage: "각종 스탯 물약 및 조합형 포션 재료" }
  ],
  recipes: [
    {
      name: "괴력의 햄 (비호정령 국민 버프 음식)",
      badge: "비호 필수 1순위",
      effect: "마법방어력(MR) +15, 최종 대미지 +5% 지속 증폭",
      mats: "신선한 햄 1개 + 바닐라 2개 + 허브 조미료 1개",
      tip: "상점이나 거래소에서 사면 매일 수백만 시드가 나가지만, 직접 채집한 바닐라로 만들면 재료비 0원에 무한 자급자족 가능합니다!"
    },
    {
      name: "퇴마사의 은총",
      badge: "생존율 특화",
      effect: "받는 마법 피해 10% 감소 및 상태이상 저항 보조",
      mats: "마나 허브 3개 + 정제수 1개 + 은총의 가루",
      tip: "신어헬오방 및 상위 보스 레이드에서 비호정령의 급사를 막아주는 든든한 방어형 비약입니다."
    },
    {
      name: "개-각성의 비약 / 개-신뢰의 물약 자체 조제",
      badge: "시드 절약 특화",
      effect: "주요 스탯 + 및 최종 공격력 증폭",
      mats: "고급 약초 추출물 + 각성의 가루",
      tip: "매번 키트나 거래소에서 구매하지 않고 자체 채집 약초로 직접 조제하여 도핑 비용을 크게 절약합니다."
    }
  ]
};


// ==================== 14. AQUILUS & ABYSS EQUIPMENT OPTION GUIDE (아퀼/어비스 옵션 도감) ====================
// 출처: 디시인사이드 188589 & 매직위버 15687
const EQUIP_OPTION_DATA = {
  overview: {
    title: "💎 아퀼루스(Lv.300) & 어비스(Lv.310) 장비 옵션 도감",
    desc: "기본 고정 스탯 및 1티어 유효 랜덤 옵션 기준표입니다. 비호정령과 딜러 계열에 따라 챙겨야 하는 옵션 우선순위가 다릅니다."
  },
  tiers: {
    aquilus: {
      name: "아퀼루스 장비 (Lv.300)",
      baseLevel: 300,
      fixedStats: {
        weapon: "MR 145~175 / STAB 160~195 / HACK 160~195 / DEX 40~55 / CRI 30~42",
        armor: "물방 170~195 / 마방 130~160 / 올스탯 15~25",
        sub: "마방 75~110 / DEX 25~35 / 회피 25~35"
      },
      recommendedOptions: {
        biho: [
          { slot: "무기", opt: "마법방어력 % 증가 (+8% ~ +12%)", rank: "1티어 종결", note: "비호 장판 힐량 및 대미지 배율 핵심" },
          { slot: "무기", opt: "공격 피해량 % 증가 (+5% ~ +10%)", rank: "1티어 필수", note: "솔플 및 파티 서브 딜링 증폭" },
          { slot: "갑옷", opt: "마법방어력 고정 (+25 ~ +40) / %", rank: "1티어 종결", note: "몸통 마방 최대치 확보" },
          { slot: "갑옷", opt: "피격 대미지 감소 % (-5% ~ -8%)", rank: "생존 1순위", note: "신어헬오방 의문사 방지" },
          { slot: "손목/날개", opt: "고정 회피 (+20 ~ +30)", rank: "1티어 필수", note: "보스 일반 공격 회피율 극대화" },
          { slot: "공통", opt: "모든 능력치 (+15 ~ +25)", rank: "2티어 유효", note: "DEX/MR/INT 종합 보정" }
        ],
        dealer: [
          { slot: "무기", opt: "공격 피해량 % 증가 (+8% ~ +15%)", rank: "1티어 종결", note: "최종 대미지 직접 배율" },
          { slot: "무기", opt: "크리티컬 피해량 % 증가 (+10% ~ +15%)", rank: "1티어 필수", note: "극딜 배율 보강" },
          { slot: "갑옷", opt: "주스탯 고정치 (+35 ~ +50)", rank: "1티어 필수", note: "기본 스탯 계수 상승" },
          { slot: "손목/날개", opt: "보스 추가 피해 % (+5% ~ +8%)", rank: "1티어 종결", note: "상위 보스전 특화" }
        ]
      }
    },
    abyss: {
      name: "어비스 장비 (Lv.310)",
      baseLevel: 310,
      fixedStats: {
        weapon: "MR 185~220 / STAB 200~240 / HACK 200~240 / DEX 55~70 / CRI 42~55",
        armor: "물방 210~245 / 마방 165~205 / 올스탯 25~40",
        sub: "마방 110~150 / DEX 35~48 / 회피 35~48"
      },
      recommendedOptions: {
        biho: [
          { slot: "무기", opt: "마법방어력 % 증가 (+12% ~ +15%)", rank: "종결 극옵", note: "어비스 무기 특유의 압도적 계수 증폭" },
          { slot: "무기", opt: "스킬 쿨타임 감소 (-1초 ~ -2초)", rank: "종결 유틸", note: "생명의 빛 / 오버 페이스 회전율 극대화" },
          { slot: "갑옷", opt: "마법방어력 고정 (+40 ~ +55)", rank: "종결 극옵", note: "마을 마방 1,600+ 돌파 필수" },
          { slot: "갑옷", opt: "피격 대미지 감소 % (-8% ~ -12%)", rank: "종결 생존", note: "어비스 지옥 / 이클립스 즉사기 생존" },
          { slot: "손목/날개", opt: "고정 회피 (+30 ~ +40)", rank: "종결 유효", note: "엔드 보스 평타 완전 회피" }
        ],
        dealer: [
          { slot: "무기", opt: "공격 피해량 % 증가 (+15% ~ +20%)", rank: "종결 극옵", note: "어비스 종결 딜러 1순위" },
          { slot: "무기", opt: "크리티컬 피해량 % 증가 (+15% ~ +20%)", rank: "종결 필수", note: "맥댐 확장과 동시 시너지" },
          { slot: "손목/날개", opt: "보스 추가 피해 % (+8% ~ +12%)", rank: "종결 필수", note: "이클립스 보스 컷 단축" }
        ]
      }
    }
  }
};

// ==================== 15. FAIRY PITTA & HARMONIC TINT GUIDE (페어리 피타 노가다 & 틴트작) ====================
// 출처: 넥슨 공식 개발자 노트 737 (News/DevNote/737)
const PITTA_DATA = {
  overview: {
    title: "🧚 페어리 피타(Pitta) 파밍 & 하모닉 틴트 강화 가이드",
    desc: "외전 6 챕터 업데이트로 도입된 중자본 징검다리 장비로, 봉인 상태 해제 후 '하모닉 틴트'로 스펙을 강화하며, 피타 장비 분해로 틴트를 대량 채굴해 거래소에 파는 뉴비 최고의 시드 벌이 노가다입니다."
  },
  weaponSpecs: {
    state: "봉인된 페어리 피타 무기 (드롭 초기 상태)",
    rule: "봉인 상태에서는 강화 한계치가 존재하지 않으며 드롭 시 최소~최대치가 무작위로 결정됩니다.",
    shoppingTip: "거래소에서 피타 무기를 구매할 때는 주력 공격력뿐만 아니라 【명중률 30】 / 【크리티컬 30】에 가까운 매물을 최우선으로 구매해야 나중에 틴트를 덜 씁니다."
  },
  tintBreakpoints: [
    {
      range: "1단계: 수치 1 ~ 330 구간",
      cost: "초저비용 (소량 틴트 소모)",
      efficiency: "⭐⭐⭐⭐⭐ 가성비 최상",
      tip: "소량의 하모닉 틴트만으로도 수치가 팍팍 오르는 구간. 무자본 뉴비는 330까지만 찍어도 버닝 던전 졸업급 화력이 나옵니다."
    },
    {
      range: "2단계: 수치 331 ~ 340 구간",
      cost: "중간 비용",
      efficiency: "⭐⭐⭐⭐ 실전 추천 종결선",
      tip: "일반적인 유저들의 타협 종결선. 적당한 시드 투자로 아퀼루스 장비 맞추기 전까지 든든하게 사용 가능합니다."
    },
    {
      range: "3단계: 수치 341 이상 구간",
      cost: "기하급수적 비용 폭증 (비추천)",
      efficiency: "⭐⭐ 매몰 비용 위험",
      tip: "필요 틴트 수량이 기하급수적으로 폭증합니다. 이 단계에 돈을 쏟기보다는 아퀼루스나 어비스 장비 직작으로 넘어가는 것이 경제적입니다."
    }
  ],
  farmingRoutine: [
    "1. 피타 던전 진입 전 '레어 드롭률 증가(레어 도핑)' 풀세팅 장착.",
    "2. 단계별 스테이지를 빠르게 순회하며 '페어리 피타 장비'를 대량 드롭 파밍.",
    "3. 인벤토리에서 피타 장비를 분해하여 '하모닉 틴트'와 고급 추출 부산물을 회수.",
    "4. 거래소에 하모닉 틴트를 시세에 맞춰 등록 ➔ 초반 수천만~수억 Seed의 핵심 종잣돈 마련!"
  ]
};

// ==================== 16. OPTION TRANSFER & BUYEOSEOK SYSTEM (옵션 전이 & 부여석) ====================
// 출처: 매직위버 15759 & 넥슨 가이드 66084
const TRANSFER_DATA = {
  overview: {
    title: "📜 장비 옵션 전이 & 룬정원 우즈 부여석 완벽 가이드",
    desc: "인퍼널 ➔ 아퀼루스 ➔ 어비스로 상위 장비를 업그레이드할 때 정성껏 맞춘 1티어 랜덤 옵션을 그대로 계승하는 시스템입니다."
  },
  rules: [
    {
      title: "🚨 1. 슬롯 카테고리 일치 필수 (실수 방지 최우선)",
      desc: "전이를 받을 대상 장비에 '동일한 카테고리 번호'의 옵션 슬롯이 없으면 엉뚱한 옵션이 덮어씌워져 망합니다! 반드시 룬의 정원 NPC 우즈에게 해당 카테고리의 【부여석】을 구매해 대상 장비의 슬롯 카테고리를 먼저 맞춰야 합니다."
    },
    {
      title: "💎 2. 기본 전이석 100개 소모",
      desc: "옵션 전이 1회 시도당 기본 '전이석 100개'가 소모됩니다. 아르카디아 3 등지에서 획득한 장비를 분해하여 수급할 수 있습니다."
    },
    {
      title: "👑 3. 상황별 상급 전이석 활용법",
      desc: "• 【강대한 마력의 상급 전이석】: 성공 확률 100% 확정! 종결 고수치 옵션을 안전하게 옮길 때 사용.\n• 【찬란한 상급 전이석】: 성공률 +30% & 재료(더미) 장비 소멸 방지! 동일 등급/옵션을 반복해서 띄우는 작업 시 필수."
    }
  ],
  checklist: [
    "✅ 전이 받을 장비의 슬롯 카테고리가 부여석으로 세팅되었는가?",
    "✅ 전이석 100개 및 상급 전이석(강대한 마력 또는 찬란한)이 인벤토리에 있는가?",
    "✅ 재료 장비(더미)와 목표 장비의 좌우 위치가 바뀌지 않았는가? (재료 장비는 소멸함)"
  ]
};

// ==================== 17. TESIS CORE MASTER & HALF-PRICE SUB-STATS (코어 마스터 & 부스탯) ====================
// 출처: 매직위버 15476 & 디시인사이드 180910, 208242
const CORE_MASTER_DATA = {
  overview: {
    title: "👑 테시스 코어 마스터(4진 4강) & 부스탯 50% 반값 가성비 트리",
    desc: "2차 극한 이후 개방되는 최상위 내실입니다. 모든 방향의 코어 조각을 4진화 4강화(+10강)하면 '코어 마스터'가 활성화되어 전 지역 상시 적용되는 강력한 세트 효과(최종 대미지 % 증폭)를 얻고 코어 마스터 던전에 입장할 수 있습니다."
  },
  halfPriceTip: {
    title: "💡 [핵심 절약 꿀팁] 부스탯 코어는 강화 비용이 정확히 50% 반값!",
    content: "찌르기, 베기, 마법공격, 마법방어 등 '주스탯 코어'에 비해 【명중률, 민첩성, 물리방어, 회피율】 같은 '부스탯 코어'는 강화에 소모되는 코어 가루, 결정, 시드가 절반(1/2)입니다! 따라서 적은 재화로 코어 마스터 세트 효과를 빠르게 활성화하려면 부스탯 코어부터 4진 4강을 뚫는 것이 고인물들의 정석 루트입니다."
  },
  stages: [
    { stage: "0진화 1~4강", desc: "코어 조각 장착 후 기본 강화 단계" },
    { stage: "1~3진화 승급", desc: "코어 조각 합성 및 진화권으로 랭크 업" },
    { stage: "4진화 4강화 (코어 마스터)", desc: "모든 조각 최대치 달성 ➔ 전 지역 상시 최종 대미지 % 증폭 발동 + 코어 마스터 던전 개방!" }
  ],
  farmingTip: "네냐플 NPC 아그네스를 통한 '테시스 코어 던전' 입장 시 던전 좌측 하단 아이콘에서 TP를 사용하면 코어 가루와 결정 획득량이 대폭 뻥튀기됩니다."
};

// ==================== 18. RAIDO SYMBOLIC CUFF SYSTEM (라이도 심볼릭 커프) ====================
// 출처: 디시인사이드 181410
const CUFF_DATA = {
  overview: {
    title: "💍 라이도 심볼릭 커프 (발굴지 & 채굴장 내실 완벽 가이드)",
    desc: "매일 일일 던전을 돌아 획득하는 '조합 조각'으로 캐릭터의 주스탯, 명중, 크리티컬을 영구적으로 성장시키는 핵심 장비 내실입니다."
  },
  stages: [
    {
      name: "1단계: 발굴지",
      maxStat: "능력치 최대 140까지 강화 가능",
      difficulty: "초보자 일일 루틴",
      tip: "버닝 졸업 후 매일 발굴지를 돌아 주스탯(비호는 MR) 140을 최우선 목표로 올인합니다."
    },
    {
      name: "2단계: 설계자의 채굴장",
      maxStat: "능력치 140 ~ 200까지 확장 강화",
      difficulty: "상위 확장 루틴",
      tip: "스펙을 갖춘 후 채굴장으로 넘어가 주스탯 200 및 명중/크리티컬을 본격적으로 확장합니다."
    }
  ],
  fragmentTips: [
    { type: "상급 조각 (+2 ~ +4 상승)", desc: "스탯 수치가 높아져 요구량이 커진 100+ 이상 구간에 집중 투입하여 효율을 극대화합니다." },
    { type: "하급 / 중급 조각 (+1 ~ +2 상승)", desc: "초반 저스탯 구간 및 목표 수치(140/200)에 딱 맞추기 위한 잔여 수치 미세 조율에 활용합니다." }
  ],
  priority: "🥇 비호정령: 마법방어력(MR) 140 우선 달성 ➔ 🥈 명중률(DEX) ➔ 🥉 크리티컬"
};

// ==================== 19. ETA OF WILL & OFFICIAL RANKING CHECKER (에타의 의지 & 랭킹 조회) ====================
// 출처: 넥슨 공식 에타 랭킹 (Ranking/EtaRank?sc=7 / sc=6)
const ETA_RANK_CONFIG = {
  overview: {
    title: "🔮 에타의 의지(5차 각성 상위 내실) & 실시간 서버 랭킹 조회",
    desc: "5차 각성 완료 후 엔디미온을 통해 해금되는 최상위 스펙업 시스템입니다. 에타 레벨(1~100+)마다 올스탯, 최종 대미지 % 증폭, 피격 대미지 감소를 대량으로 제공합니다."
  },
  servers: [
    { id: "7", name: "하이아칸 (sc=7)" },
    { id: "6", name: "네냐플 (sc=6)" }
  ],
  baseUrl: "https://tales.nexon.com/Community/Ranking/EtaRank",
  milestones: [
    { level: "에타 Lv.1 ~ 10", reward: "올스탯 +50 / 최종 피해량 +3%", note: "사과의 섬 퀘스트 후 첫 관문" },
    { level: "에타 Lv.11 ~ 30", reward: "올스탯 +150 / 최종 피해량 +8% / 피격 댐감 -3%", note: "이클립스 및 주간 레이드 실전선" },
    { level: "에타 Lv.31 ~ 50", reward: "올스탯 +300 / 최종 피해량 +15% / 피격 댐감 -6%", note: "상위 랭커권 진입" },
    { level: "에타 Lv.51 ~ 100+", reward: "올스탯 +500+ / 최종 피해량 +25%+ / 피격 댐감 -10%+", note: "초월 종결 내실" }
  ]
};

// ==================== 20. FOUR CORE PROBABILITY TABLES & ENCRYPT SYSTEM (4대 공식 확률표) ====================
// 출처: 인벤 1120 (인크립트), 1122 (장비강화), 1123 (테시스코어), 1121 (소울링크)
const PROBABILITY_DATA = {
  encrypt: {
    title: "🎲 인크립트 스크롤 성공 & 파괴 확률표 (인벤 1120)",
    desc: "장비의 한계 합성을 뚫어주는 인크립트 스크롤의 공식 성공률 및 파괴 보호 주문서 적용 규칙입니다.",
    scrolls: [
      { id: "royal", name: "왕실 인크립트", baseRate: 36, maxProtects: 30, desc: "기본 성공률 36% (실패율 64%). 파괴 보호 주문서를 최대 30장까지 적용하여 파괴율을 34%까지 낮출 수 있습니다." },
      { id: "blessed", name: "축복받은 인크립트", baseRate: 31, maxProtects: 40, desc: "기본 성공률 31% (실패율 69%). 파괴 보호 주문서 최대 40장 적용 가능 (파괴율 29%까지 경감)." },
      { id: "divine", name: "가호의 인크립트", baseRate: 26, maxProtects: 50, desc: "기본 성공률 26% (실패율 74%). 파괴 보호 주문서 최대 50장 적용 가능 (파괴율 24%까지 경감)." },
      { id: "lord", name: "로드 인크립트", baseRate: 21, maxProtects: 60, desc: "기본 성공률 21% (실패율 79%). 파괴 보호 주문서 최대 60장 적용 가능 (파괴율 19%까지 경감)." },
      { id: "vianu", name: "비아누의 인크립트 (노파괴)", baseRate: 80, maxProtects: 0, isSafe: true, rates: [80, 65, 50, 40, 30, 20, 15, 10, 5, 3], desc: "실패하더라도 장비가 절대 파괴되지 않는 안전 스크롤! (합성 횟수에 따라 80%~3% 차등 적용)" }
    ],
    rules: [
      "파괴 보호 주문서 효과: 주문서 1장당 '실패 시 장비 파괴율'을 1%p씩 차감하여 '장비 보존(안전 실패)'으로 전환합니다.",
      "왕실 인크립트 추천: 성공률이 36%로 가장 높으므로 반드시 보호 주문서 30장 풀투입 후 시도하는 것이 정석입니다.",
      "비아누 활용법: 실패 패널티가 0이므로 고가의 베이스 장비에 첫 합성작을 할 때 가장 안전합니다."
    ]
  },
  reinforce: {
    title: "⚔️ 장비 강화(0 ➔ 11강) 성공률 & 실패 패널티 (인벤 1122)",
    desc: "장비 강화 단계별 성공 확률과 7강 이상 실패 시 발생하는 단계 하락 및 보호 아이템 활용 수칙입니다.",
    steps: [
      { step: "0 ➔ 1강", success: "100%", penalty: "없음 (100% 확정)", itemTip: "기본 강화" },
      { step: "1 ➔ 2강", success: "70%", penalty: "실패 시 유지 (하락 없음)", itemTip: "안전 구간" },
      { step: "2 ➔ 3강", success: "50%", penalty: "실패 시 유지 (하락 없음)", itemTip: "안전 구간" },
      { step: "3 ➔ 4강", success: "30%", penalty: "실패 시 유지 (하락 없음)", itemTip: "안전 구간" },
      { step: "4 ➔ 5강", success: "20%", penalty: "실패 시 유지 (하락 없음)", itemTip: "안전 구간" },
      { step: "5 ➔ 6강", success: "10%", penalty: "실패 시 유지 (하락 없음)", itemTip: "가성비 구간" },
      { step: "6 ➔ 7강", success: "7%", penalty: "실패 시 유지 (하락 없음)", itemTip: "안전 마지막 선" },
      { step: "7 ➔ 8강", success: "7%", penalty: "⚠️ 실패 시 1단계 하락 (6강 복귀)", itemTip: "🚨 강화 부적 필수" },
      { step: "8 ➔ 9강", success: "5%", penalty: "⚠️ 실패 시 2단계 하락 (6강 복귀)", itemTip: "🚨 강화 부적 필수" },
      { step: "9 ➔ 10강", success: "5%", penalty: "⚠️ 실패 시 3단계 하락 (6강 복귀)", itemTip: "🚨 강화 부적 필수" },
      { step: "10 ➔ 11강", success: "5%", penalty: "💥 실패 시 0강 완전 초기화!", itemTip: "🚨 초월 엔드 스펙" }
    ],
    items: [
      { name: "장비 강화 부적", effect: "7강 이상 실패 시 단계 하락 완전 방어", tip: "7강➔8강 이상 구간에서는 부적 없이 시도 시 순식간에 6강으로 미끄러집니다." },
      { name: "장비 강화 행운석", effect: "슬롯당 1~5개 장착하여 성공 확률 소폭 보정", tip: "8강~11강 극한의 저확률 구간 돌파 시 필수 지참합니다." }
    ]
  },
  tesisCore: {
    title: "👑 테시스 코어 진화 & 강화 확률표 (인벤 1123)",
    desc: "코어 조각 승급 및 부위별 강화에 소모되는 재화와 성공 확률입니다.",
    evolutions: [
      { step: "0 ➔ 1진화", mat: "코어 가루 50개 + 1,000만 Seed", rate: "100%", effect: "코어 기본 슬롯 개방" },
      { step: "1 ➔ 2진화", mat: "코어 가루 100개 + 결정 5개 + 2,000만 Seed", rate: "80%", effect: "코어 옵션 2단계 해금" },
      { step: "2 ➔ 3진화", mat: "코어 가루 200개 + 결정 15개 + 4,000만 Seed", rate: "60%", effect: "코어 옵션 3단계 해금" },
      { step: "3 ➔ 4진화", mat: "코어 가루 400개 + 결정 30개 + 8,000만 Seed", rate: "40%", effect: "4진화 달성 (코어마스터 조건)" }
    ],
    enhancements: [
      { range: "1 ➔ 4강", rate: "70% ~ 50%", cost: "가루 20~40개", note: "비교적 수월하게 안착" },
      { range: "5 ➔ 7강", rate: "40% ~ 25%", cost: "가루 50~80개 + 결정 2개", note: "가성비 정체 구간" },
      { range: "8 ➔ 10강", rate: "20% ~ 15%", cost: "가루 100개+ + 결정 5개+", note: "부위당 +10강 완성 (총 +30작 완성)" }
    ],
    tip: "테시스 코어 던전 입장 시 TP 부스팅을 켜면 재료 파밍 속도가 2배 이상 빨라지며, 부스탯 코어(명중/민첩/회피/물방)는 주스탯 코어 대비 재료 소모가 정확히 50%(반값)입니다."
  },
  soulLink: {
    title: "🔮 소울링크 유물 뽑기 공식 확률표 (인벤 1121)",
    desc: "소울링크 유물 뽑기 시 등장하는 유물별 획득 확률 및 1티어 종결 옵션 가이드입니다.",
    rates: [
      { name: "소울이터", rate: "1.0%", grade: "SSS (1티어 종결)", desc: "보스 스탯 흡수 및 괴력 버프 발동 (비호 및 전직업 필수 1순위)" },
      { name: "감각의 해방", rate: "5.0%", grade: "SS (1티어 종결)", desc: "크리티컬 대미지 배율 대폭 증폭" },
      { name: "소울시커", rate: "12.0%", grade: "S (유용)", desc: "사냥 및 몬스터 추적 파밍 효율 향상" },
      { name: "신성한 스크롤 / 크라운스톤", rate: "각 15.0%", grade: "A (중간)", desc: "스탯 보정 및 강화 보조 유물" },
      { name: "일반 / 상급 유물", rate: "67.0%", grade: "B (일반)", desc: "기본 능력치 보정 유물" }
    ],
    farmTip: "아브리 엔키라 일일 훈장을 모아 룬정원/소울링크 관리인에게서 '소울 포인트'로 환전하여 소울이터(1%)가 뜰 때까지 꾸준히 뽑기를 진행합니다."
  }
};

// ==================== 21. MONSTER CARD 8-SKILL SYSTEM (몬스터 카드 개편) ====================
// 출처: 인벤 38 (정보공유 - 몬스터 카드)
const MONSTER_CARD_DATA = {
  title: "🃏 개편된 몬스터 카드 8스킬 조합 & 추천 세팅 (인벤 38)",
  desc: "과거의 복잡한 8단 합성 공식이 폐지되고, 1랭크 4스킬 동카드 2장 조합 후 '다시 뽑기'로 손쉽게 8스킬 금카드를 완성할 수 있습니다.",
  process: [
    { step: "1단계: 1랭크 4스킬 동카드 2장 준비", desc: "카드 스캐너로 수집한 1랭크 몬스터 카드 중 원하는 스킬이 4개씩 붙은 동카드 2장을 준비합니다." },
    { step: "2단계: 카드 조합 실행", desc: "인게임 몬스터 카드 창에서 두 동카드를 합성합니다." },
    { step: "3단계: '다시 뽑기'로 금카드(8스킬) 저격", desc: "합성 결과창에서 소정의 시드를 지불하고 [다시 뽑기]를 반복하여 금카드 등급을 띄웁니다." },
    { step: "4단계: 8스킬 유효옵 확정 등록", desc: "원하는 8개 필수 스킬이 모두 붙은 금카드가 나오면 확정하여 슬롯에 장착합니다." }
  ],
  bihoSkills: [
    { name: "백속성 (+3)", type: "속성", desc: "비호정령의 주속성을 높여 힐량과 딜량 대폭 상승" },
    { name: "레어 (+4)", type: "파밍", desc: "보스 및 필드 드롭률 상승 필수 유틸" },
    { name: "전투준비 (+4)", type: "전투", desc: "전투 진입 시 공격력/마법방어력 및 관통력 보너스" },
    { name: "약점포착 (+3)", type: "공격", desc: "적 방어력을 관통하고 추가 대미지 부여" },
    { name: "이동속도 (+4)", type: "유틸", desc: "비호의 생존과 장판 회피율을 극대화하는 이속 +4" },
    { name: "호기심 (+3)", type: "성장", desc: "경험치 획득량 증가 및 레벨업 지원" },
    { name: "속공 (+3)", type: "전투", desc: "스킬 후딜레이 감소 및 연타 반응속도 향상" },
    { name: "최후의의지 (+3)", type: "생존", desc: "치명타 피격 시 생존력 보강 및 방어막 생성" }
  ],
  dealerSkills: [
    { name: "주속성 (+3)", type: "속성", desc: "캐릭터별 주속성 (화/수/풍/토/뇌/암/백) 강화" },
    { name: "주속성 공격 (+3)", type: "공격", desc: "속성 공격 시 추가 속성 대미지 부여" },
    { name: "레어 (+4)", type: "파밍", desc: "아이템 파밍 드롭률 극대화" },
    { name: "전투준비 (+4)", type: "전투", desc: "전투 돌입 시 공격력 폭발적 증폭" },
    { name: "약점포착 (+3)", type: "공격", desc: "방어력 관통 추가 피해" },
    { name: "이동속도 (+4)", type: "유틸", desc: "신속한 무빙 및 패턴 회피" },
    { name: "추가 대미지 (+3)", type: "공격", desc: "타격 시 고정 추가 피해" },
    { name: "치명타 (+3)", type: "공격", desc: "크리티컬 확률 및 배율 보정" }
  ],
  scannerTip: "인게임 [몬스터 카드 보관함]과 [카드 스캐너]를 상시 켜두면 사냥 중에 몬스터 카드가 인벤토리 부담 없이 자동으로 수집·등록됩니다."
};

// ==================== 22. POLISHING & THIRD SIEN SYSTEM (연마 종류 & 서드시엔) ====================
// 출처: 인벤 39 (정보공유 - 연마 종류)
const POLISHING_DATA = {
  title: "📚 테일즈위버 연마 종류 & 서드 시엔(Third Sien) 총정리 (인벤 39)",
  desc: "캐릭터의 공격력, 방어력, 체력, 스킬 레벨 한계를 뚫어주는 필수 연마 시스템입니다.",
  base7: [
    { name: "무기 연마", effect: "무기 공격력 & 마법 공격력 대폭 상승", source: "주간 레이드 보스, 어비스, 사과의 섬" },
    { name: "방어구 연마", effect: "물리 방어력 & 마법 방어력 대폭 상승 (비호 1순위)", source: "신조의 둥지, 어비스" },
    { name: "콤보 연마", effect: "콤보 공격 배율 및 연계 공격력 상승", source: "어비스 심층, 머큐리얼" },
    { name: "속성 무시", effect: "적의 속성 저항을 관통하여 상시 최대 피해 적용", source: "레이드 보스 상자, 거래소" },
    { name: "극천의 연마", effect: "대미지 한계돌파 수치 확장", source: "이클립스, 상위 레이드" },
    { name: "심연의 연마", effect: "어비스 추가 피해 및 스탯 증폭", source: "심연의 틈, 어비스 지옥" },
    { name: "신조의 연마", effect: "신조 보스 피해량 및 방어 관통 보너스", source: "신조의 둥지 하드" }
  ],
  extended: [
    { name: "체력 연마 (HP 마스터리)", level: "Lv.1 ~ Lv.10", effect: "최대 체력(HP)을 단계별로 대폭 뻥튀기하여 고난도 레이드 의문사 방지", tip: "비호정령 생존을 위한 필수 연마" },
    { name: "저격 연마", level: "Lv.1 ~ Lv.5", effect: "원거리 사거리 및 크리티컬 적중 보정", tip: "원거리 딜러 및 유틸리티 캐릭터 추천" },
    { name: "서드 시엔 (Third Sien)", level: "기본 1권", effect: "주력 스킬의 최대 레벨 한계를 +1~+2 돌파하여 계수 대폭 상승", tip: "🚨 섭취 후 반드시 스킬창(V)에서 수동으로 스킬 레벨을 올려야 실적용됨!" },
    { name: "컴플리트 서드 시엔", level: "완성형", effect: "전체 스킬의 한계 레벨을 완전 개방", tip: "상위 랭커 및 종결 세팅의 필수 코스" },
    { name: "연마 강화 (연강마)", level: "강화형", effect: "기본 연마(무기/방어구/콤보)의 상승 배율을 1.5~2배 이상 재증폭", tip: "모든 기본 연마 섭취 후 공격력을 비약적으로 끌어올리는 끝판왕" }
  ],
  vitalWarning: "🚨 [필수 확인] 서드 시엔이나 컴플리트 서드시엔을 섭취한 후에는 캐릭터 스킬창(단축키 V)을 열어서 대상 스킬의 레벨 업 버튼(+)을 직접 눌러 올려주어야만 효과가 적용됩니다! (먹기만 하고 V키 확인 안 해서 미적용 상태로 다니는 초보자가 매우 많습니다)"
};

// ==================== 23. RELIC GROWTH & SHINJO RELIC SYSTEM (렐릭 & 신조 성물) ====================
// 출처: 인벤 40 (렐릭의 성장), 42 (신조의 성물)
const RELIC_DATA = {
  sunRelic: {
    title: "☀️ 태양의 렐릭 성장 가이드 (인벤 40 - 네냐플 디르웬)",
    desc: "네냐플 학원의 NPC 디르웬 일일 퀘스트로 렐릭의 조각을 수급하여 영구 능력치를 성장시키는 기초 내실입니다.",
    npc: "네냐플 학원 NPC 디르웬",
    routine: "매일 디르웬 일일 퀘스트 수행 ➔ '렐릭의 조각' 파밍 ➔ 렐릭 레벨업 (Lv.1 ~ Lv.30+)",
    stats: "올스탯 증가, Max HP 상승, 마법방어력(MR) 증가 (비호 힐량 상승)",
    tip: "응축된 렐릭의 결정을 투입하면 성장 속도가 배로 빨라지며, 저비용으로 꾸준히 스탯을 올릴 수 있습니다."
  },
  shinjoRelic: {
    title: "🦅 신조의 성물 슬롯 강화 시스템 (인벤 42 - 계정 공유)",
    desc: "신조의 둥지 완료 보상인 '신조의 눈물'과 '신조의 깃털'로 성물 슬롯을 레벨업하여 계정 내 모든 캐릭터에 상시 스탯을 부여합니다.",
    source: "신조의 둥지(일반/어려움) 클리어 보상",
    mats: "신조의 눈물 & 신조의 깃털",
    effect: "계정 내 전체 캐릭터에 올스탯 및 공격/방어 능력치가 상시 적용되는 영구 내실입니다.",
    priority: "신조의 둥지 주간 숙제를 빠짐없이 돌아 눈물과 깃털을 모아 성물 슬롯 레벨을 최우선으로 올리세요."
  }
};

// ==================== 24. EXCAVATION SITE ROUTINE (발굴지 & 커프 초고속 140) ====================
// 출처: 인벤 43 (발굴지) & 디시 181410
const EXCAVATION_DATA = {
  title: "⛏️ 고대 유적 발굴지 & 라이도 커프 140 초고속 루트 (인벤 43)",
  desc: "라이도 심볼릭 커프의 주스탯을 140까지 초고속으로 끌어올리는 일일 던전 파밍 공략입니다.",
  location: "고대 유적 발굴지 (일일 1회 필수 입장)",
  routine: [
    "1. 발굴지 입장 후 전역의 발굴 구역을 순회하며 네임드 처치 및 보물상자 개봉",
    "2. 하급/중급 조합 조각은 1~100 수치 구간에 아낌없이 투입하여 기초 스탯 확보",
    "3. 상승폭이 큰 상급 조각(+2~+4)은 수치 상승이 둔화되는 100~140 구간에 집중 투입하여 효율 극대화",
    "4. 마법방어력(MR) 140 조기 졸업 후 '설계자의 채굴장'으로 넘어가 200까지 확장!"
  ],
  priorityTip: "비호정령은 마법방어력(MR) 140을 최우선 달성한 뒤, 명중률(DEX)과 크리티컬 조각을 차례로 채워 넣습니다."
};

// ==================== 25. PROGRESSION ROADMAP & UPGRADE RECOMMENDER DATA ====================
// 출처: 디시인사이드 테일즈위버 갤러리 262032 (5각 아일단 이후 뭐해야해요? 실전 가이드)
const PROGRESSION_ROADMAP_DATA = {
  stages: [
    {
      id: "step1",
      badge: "🌱 1단계: 4대 기초 내실 & 주간 15억+ 확정 수익 해금",
      title: "기초 내실 4대장 & 주간 확정 수익 체계 구축",
      summary: "5차 각성과 어비스 풀셋(아일단) 진입 후 가장 먼저 갖춰야 할 내실로, 최소 비용으로 주간 확정 시드 수익과 상위 던전을 엽니다.",
      items: [
        {
          name: "☀️ 고대 렐릭의 성소 (렐릭 10단)",
          period: "더블리워드 시 약 5~6개월 (미사용 시 1년)",
          tpCost: "주간 4,200 TP",
          profit: "성소 13단계 진입 자격 획득 및 기본 스탯 대폭 상승",
          tip: "★ 무조건 '더블 리워드 쿠폰(주간 4,200 TP)' 사용 필수! 미사용 시 10강까지 1년이 걸려 추후 스펙이 되어도 성소 13단 진입이 불가능해집니다."
        },
        {
          name: "👑 어비스 코어 마스터 (어코마)",
          period: "약 2주 완성 (주 14회 × 500 TP = 7,000 TP)",
          tpCost: "7,000 TP (2주 누적)",
          profit: "주간 확정 약 7억 Seed + 어비스 재료 드랍 대폭 증가",
          tip: "코어마스터 던전 2주 집중 파밍으로 가루/결정을 모으고, 강화는 패스 보상 엘소(주당 60만)로 진행하세요."
        },
        {
          name: "🔮 머큐리얼 코어 마스터 (머코마)",
          period: "약 1주 완성 (주 7회 × 200 TP = 1,400 TP)",
          tpCost: "1,400 TP",
          profit: "주간 확정 약 6억 Seed + 경험의 심장(경심)·레어의 심장(레심)",
          tip: "명중/회피/민첩 부스탯 코어 기준 1주일이면 가루와 결정이 모두 모여 가장 빠르게 주간 6억 시드를 확보할 수 있습니다."
        },
        {
          name: "⚡ 에타 Lv.10 & 이클립스 코어 Lv.120",
          period: "대장간 파밍 + 코어 진화권 활용",
          tpCost: "이클립스 코어 진화권 1~2단계 활용",
          profit: "훈련소(주간 2.45억 Seed + 경험치 50억 + 정수 17개) & 오딘(라피스) 해금",
          tip: "★ 꿀팁: 코어진화권 2단계 사용 시 '3진 0강'으로 넘기지 말고 '2진 4강'에서 멈춰 최종 피해량 +1%를 챙기세요! 3진 4강까지는 진화권이 가루 직접 강화보다 저렴합니다."
        }
      ]
    },
    {
      id: "step2",
      badge: "🚀 2단계: 3·4신기 & 신규 채굴장(발굴지 200작) 진입",
      title: "신규 채굴장(커프 200 종결) 진입 & 토벌전 4분 주파",
      summary: "에타 20과 이클립스 3~4신기를 확보하여 상위 내실의 꽃인 신규 채굴장(라이도 커프 200작)을 열고 토벌전을 쾌속 클리어합니다.",
      items: [
        {
          name: "⛏️ 신규 채굴장 (설계자의 채굴장)",
          req: "에타의 의지 Lv.20 + 던전 요구 주스탯",
          gearReq: "마방캐: 이클 4신기 + 렐릭 8~9단 + 100효과 / 단일캐: 이클 3신기 + 렐릭 8~9단 + 100효과",
          profit: "라이도 커프 주스탯 200 종결 내실 완성 가능",
          tip: "채굴장 입장 컷을 맞추는 순간 이클립스 토벌전도 판당 4~5분대로 주파할 수 있어 파밍 속도가 비약적으로 상승합니다."
        }
      ]
    },
    {
      id: "step3",
      badge: "👑 3단계: 심화 내실 완성 & 다캐릭(부캐) 확장 전략",
      title: "성소 13단, 이클코마, 커프 부스탯 & 부캐릭 복리 파이 확장",
      summary: "본캐의 이클립스 코어 마스터를 달성하고, 5각 부캐릭터를 육성하여 이클코마 던전에 투입해 매주 막대한 시드 파이를 복리로 증식합니다.",
      items: [
        {
          name: "☀️ 고대 렐릭의 성소 13단계 진입",
          req: "렐릭 10강 완료 (더블리워드 필수)",
          profit: "상위 렐릭 스탯 대폭 확장"
        },
        {
          name: "👑 이클립스 코어 마스터 (이클코마)",
          req: "4진화 코어 강화",
          profit: "최상위 피해량 및 생존력 완성"
        },
        {
          name: "👥 부캐릭터 5각 육성 ➔ 이클코마 투입",
          req: "부캐 5차 각성 완료",
          profit: "계정당 주간 득템 및 확정 시드 2배~3배 복리 증가"
        }
      ]
    }
  ]
};
