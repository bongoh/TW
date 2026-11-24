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
