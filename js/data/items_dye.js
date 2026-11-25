// ============================================================================
// TalesWeaver Character Dyeing & Uniform Salon Database (items_dye.js)
// 팬메이드 제복 컬러 시뮬레이터(SnowFlower) 및 인게임 만능 염색약 RGB 조합표
// ============================================================================

var TW_UNIFORM_DYE_DB = {
  // 1. 캐릭터별 폴더 및 제복 4부위(파트) 명칭 정의
  characters: {
    "boris": {
      folder: "bo",
      name: "보리스",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식", defaultCode: "d" },
        { key: "3", name: "스카프 & 바지 & 소매", defaultCode: "d" },
        { key: "4", name: "신발 & 벨트", defaultCode: "d" }
      ]
    },
    "lucian": {
      folder: "ru",
      name: "루시안",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식", defaultCode: "d" },
        { key: "3", name: "스카프 & 바지", defaultCode: "d" },
        { key: "4", name: "신발", defaultCode: "d" }
      ]
    },
    "tichiel": {
      folder: "ti",
      name: "티치엘",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식1", defaultCode: "d" },
        { key: "3", name: "코트장식2 & 치마", defaultCode: "d" },
        { key: "4", name: "신발", defaultCode: "d" }
      ]
    },
    "mila": {
      folder: "mill",
      name: "밀라",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식2", defaultCode: "d" },
        { key: "3", name: "코트장식1", defaultCode: "d" },
        { key: "4", name: "신발", defaultCode: "d" }
      ]
    },
    "sivelin": {
      folder: "sibel",
      name: "시벨린",
      parts: [
        { key: "1", name: "코트 & 바지", defaultCode: "d" },
        { key: "2", name: "코트장식1", defaultCode: "d" },
        { key: "3", name: "코트장식2", defaultCode: "d" },
        { key: "4", name: "신발 & 벨트", defaultCode: "d" }
      ]
    },
    "nayatrei": {
      folder: "naya",
      name: "나야트레이",
      parts: [
        { key: "1", name: "자켓", defaultCode: "d" },
        { key: "2", name: "코트장식1", defaultCode: "d" },
        { key: "3", name: "코트장식2 & 바지", defaultCode: "d" },
        { key: "4", name: "신발", defaultCode: "d" }
      ]
    },
    "lanziee": {
      folder: "ran",
      name: "란지에",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식1", defaultCode: "d" },
        { key: "3", name: "코트장식2 & 바지", defaultCode: "d" },
        { key: "4", name: "신발", defaultCode: "d" }
      ]
    },
    "issac": {
      folder: "eja",
      name: "이자크",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식1", defaultCode: "d" },
        { key: "3", name: "바지 & 코트장식2", defaultCode: "d" },
        { key: "4", name: "신발 & 벨트", defaultCode: "d" }
      ]
    },
    "anais": {
      folder: "ana",
      name: "아나이스",
      parts: [
        { key: "1", name: "코트 & 신발", defaultCode: "d" },
        { key: "2", name: "원피스 & 양말", defaultCode: "d" },
        { key: "3", name: "코트레이스", defaultCode: "d" },
        { key: "4", name: "리본 & 치마레이스", defaultCode: "d" }
      ]
    },
    "roamini": {
      folder: "roa",
      name: "로아미니",
      parts: [
        { key: "1", name: "드레스상 & 하", defaultCode: "d" },
        { key: "2", name: "코트장식1", defaultCode: "d" },
        { key: "3", name: "코트장식2", defaultCode: "d" },
        { key: "4", name: "구두", defaultCode: "d" }
      ]
    },
    "clarice": {
      folder: "re",
      name: "리체",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식", defaultCode: "d" },
        { key: "3", name: "블라우스&치마", defaultCode: "d" },
        { key: "4", name: "신발&벨트", defaultCode: "d" }
      ]
    },
    "ispin": {
      folder: "spin",
      name: "이스핀",
      parts: [
        { key: "1", name: "자켓 & 모자", defaultCode: "d" },
        { key: "2", name: "소매 & 모자장식2", defaultCode: "d" },
        { key: "3", name: "벨트 & 모자장식1", defaultCode: "d" },
        { key: "4", name: "신발 & 바지 & 리본 & 손목", defaultCode: "d" }
      ]
    },
    "maximin": {
      folder: "mak",
      name: "막시민",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식1", defaultCode: "d" },
        { key: "3", name: "양말 & 코트장식2", defaultCode: "d" },
        { key: "4", name: "신발 & 바지", defaultCode: "d" }
      ]
    },
    "josua": {
      folder: "jo",
      name: "조슈아",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식", defaultCode: "d" },
        { key: "3", name: "스카프 & 바지 & 소매", defaultCode: "d" },
        { key: "4", name: "신발", defaultCode: "d" }
      ]
    },
    "isolet": {
      folder: "leesol",
      name: "이솔렛",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식1", defaultCode: "d" },
        { key: "3", name: "코트장식2 & 치마", defaultCode: "d" },
        { key: "4", name: "신발", defaultCode: "d" }
      ]
    },
    "nocturne": {
      folder: "nok",
      name: "녹턴",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식", defaultCode: "d" },
        { key: "3", name: "리본 & 바지", defaultCode: "d" },
        { key: "4", name: "신발", defaultCode: "d" }
      ]
    },
    "chloe": {
      folder: "chloe",
      name: "클로에",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "코트장식1", defaultCode: "d" },
        { key: "3", name: "코트장식2 & 치마", defaultCode: "d" },
        { key: "4", name: "신발", defaultCode: "d" }
      ]
    },
    "benya": {
      folder: "benya",
      name: "벤야",
      fullName: "벤야",
      customImg: "assets/avatar/benya_transparent.png",
      parts: [
        { key: "1", name: "원피스", defaultCode: "d" },
        { key: "2", name: "리본", defaultCode: "d" },
        { key: "3", name: "슈즈", defaultCode: "d" },
        { key: "4", name: "장식", defaultCode: "d" }
      ]
    },
    "yevgnen": {
      folder: "yevgnen",
      name: "예프넨",
      fullName: "예프넨 진네만",
      customImg: "assets/avatar/yevgnen_transparent.png",
      parts: [
        { key: "1", name: "코트", defaultCode: "d" },
        { key: "2", name: "장식", defaultCode: "d" },
        { key: "3", name: "바지", defaultCode: "d" },
        { key: "4", name: "부츠", defaultCode: "d" }
      ]
    }
  },

  // 2. 전체 74종 공식 제복 염색약 컬러 리스트
  colors: [
    { code: "d", name: "기본제복", hex: "#4B5563" },
    { code: "72", name: "구름솜", hex: "#E0E7FF" },
    { code: "71", name: "신포도", hex: "#8B5CF6" },
    { code: "70", name: "크림소다", hex: "#38BDF8" },
    { code: "69", name: "골든골드", hex: "#FBBF24" },
    { code: "68", name: "블루베리", hex: "#4338CA" },
    { code: "67", name: "청포도", hex: "#84CC16" },
    { code: "64", name: "체리블라썸핑크", hex: "#F43F5E" },
    { code: "65", name: "레몬옐로우", hex: "#FACC15" },
    { code: "66", name: "라임그린", hex: "#A3E635" },
    { code: "61", name: "베이비핑크", hex: "#FBCFE8" },
    { code: "62", name: "민트셔벗", hex: "#6EE7B7" },
    { code: "63", name: "바이올렛실버", hex: "#CBD5E1" },
    { code: "55", name: "딥마린블루", hex: "#1E3A8A" },
    { code: "56", name: "일루전바이올렛", hex: "#7C3AED" },
    { code: "57", name: "리프브라운", hex: "#78350F" },
    { code: "58", name: "피그린", hex: "#15803D" },
    { code: "59", name: "얼티밋핫핑크", hex: "#EC4899" },
    { code: "60", name: "와인레드", hex: "#881337" },
    { code: "1", name: "리얼화이트", hex: "#FFFFFF" },
    { code: "2", name: "리얼블랙", hex: "#111827" },
    { code: "3", name: "블러디레드", hex: "#DC2626" },
    { code: "4", name: "포레스트그린", hex: "#166534" },
    { code: "5", name: "스위트오렌지", hex: "#EA580C" },
    { code: "6", name: "하이퍼리얼화이트", hex: "#F8FAFC" },
    { code: "no", name: "하이퍼리얼블랙", hex: "#030712" },
    { code: "7", name: "하이퍼리얼레드", hex: "#B91C1C" },
    { code: "8", name: "하이퍼리얼그린", hex: "#15803D" },
    { code: "9", name: "하이퍼리얼블루", hex: "#1D4ED8" },
    { code: "10", name: "모닝골드1", hex: "#FEF08A" },
    { code: "11", name: "모닝골드2", hex: "#FDE047" },
    { code: "12", name: "모닝골드3", hex: "#FACC15" },
    { code: "13", name: "모닝골드4", hex: "#EAB308" },
    { code: "14", name: "모닝골드5", hex: "#CA8A04" },
    { code: "15", name: "모닝골드6", hex: "#A16207" },
    { code: "16", name: "모닝골드7", hex: "#854D0E" },
    { code: "17", name: "모닝골드8", hex: "#713F12" },
    { code: "18", name: "모닝골드9", hex: "#542F0B" },
    { code: "19", name: "프레시민트1", hex: "#CCFBF1" },
    { code: "20", name: "프레시민트2", hex: "#99F6E4" },
    { code: "21", name: "프레시민트3", hex: "#5EEAD4" },
    { code: "22", name: "프레시민트4", hex: "#2DD4BF" },
    { code: "23", name: "프레시민트5", hex: "#14B8A6" },
    { code: "24", name: "프레시민트6", hex: "#0D9488" },
    { code: "25", name: "프레시민트7", hex: "#0F766E" },
    { code: "26", name: "프레시민트8", hex: "#115E59" },
    { code: "27", name: "프레시민트9", hex: "#134E4A" },
    { code: "28", name: "스프라이트그린1", hex: "#DCFCE7" },
    { code: "29", name: "스프라이트그린2", hex: "#BBF7D0" },
    { code: "30", name: "스프라이트그린3", hex: "#86EFAC" },
    { code: "31", name: "스프라이트그린4", hex: "#4ADE80" },
    { code: "32", name: "스프라이트그린5", hex: "#22C55E" },
    { code: "33", name: "스프라이트그린6", hex: "#16A34A" },
    { code: "34", name: "스프라이트그린7", hex: "#15803D" },
    { code: "35", name: "스프라이트그린8", hex: "#166534" },
    { code: "36", name: "스프라이트그린9", hex: "#14532D" },
    { code: "37", name: "블루밍핑크1", hex: "#FCE7F3" },
    { code: "38", name: "블루밍핑크2", hex: "#FBCFE8" },
    { code: "39", name: "블루밍핑크3", hex: "#F9A8D4" },
    { code: "40", name: "블루밍핑크4", hex: "#F472B6" },
    { code: "41", name: "블루밍핑크5", hex: "#EC4899" },
    { code: "42", name: "블루밍핑크6", hex: "#DB2777" },
    { code: "43", name: "블루밍핑크7", hex: "#BE185D" },
    { code: "44", name: "블루밍핑크8", hex: "#9D174D" },
    { code: "45", name: "블루밍핑크9", hex: "#831843" },
    { code: "46", name: "프로즌블루1", hex: "#E0F2FE" },
    { code: "47", name: "프로즌블루2", hex: "#BAE6FD" },
    { code: "48", name: "프로즌블루3", hex: "#7DD3FC" },
    { code: "49", name: "프로즌블루4", hex: "#38BDF8" },
    { code: "50", name: "프로즌블루5", hex: "#0EA5E9" },
    { code: "51", name: "프로즌블루6", hex: "#0284C7" },
    { code: "52", name: "프로즌블루7", hex: "#0369A1" },
    { code: "53", name: "프로즌블루8", hex: "#075985" },
    { code: "54", name: "프로즌블루9", hex: "#0C4A6E" }
  ],

  // 3. 상단 퀵 프리셋 (가장 인기 있는 12대 제복 염색약)
  popularColors: [
    { code: "d", name: "기본제복", hex: "#4B5563" },
    { code: "1", name: "리얼화이트", hex: "#FFFFFF" },
    { code: "2", name: "리얼블랙", hex: "#111827" },
    { code: "6", name: "하이퍼화이트", hex: "#F8FAFC" },
    { code: "3", name: "블러디레드", hex: "#DC2626" },
    { code: "72", name: "구름솜", hex: "#E0E7FF" },
    { code: "70", name: "크림소다", hex: "#38BDF8" },
    { code: "71", name: "신포도", hex: "#8B5CF6" },
    { code: "69", name: "골든골드", hex: "#FBBF24" },
    { code: "61", name: "베이비핑크", hex: "#FBCFE8" },
    { code: "62", name: "민트셔벗", hex: "#6EE7B7" },
    { code: "55", name: "딥마린블루", hex: "#1E3A8A" }
  ],

  // 4. 기본옷·한복·교복용 커뮤니티 검증 인게임 만능 염색약 RGB 조합표 (1-클릭 스포이드 복사)
  communityRgbPresets: [
    { name: "리얼 블랙", r: 0, g: 0, b: 0, hex: "#000000", tag: "국민 블랙" },
    { name: "순백 리얼화이트", r: 255, g: 255, b: 255, hex: "#FFFFFF", tag: "순백" },
    { name: "바스타드 앰버", r: 255, g: 126, b: 0, hex: "#FF7E00", tag: "눈사람족 인기" },
    { name: "화이트 골드", r: 245, g: 230, b: 163, hex: "#F5E6A3", tag: "연금빛" },
    { name: "체리블라썸 핑크", r: 243, g: 156, b: 155, hex: "#F39C9B", tag: "벚꽃 핑크" },
    { name: "민트 셔벗", r: 168, g: 230, b: 207, hex: "#A8E6CF", tag: "파스텔 민트" },
    { name: "미드나잇 딥네이비", r: 27, g: 38, b: 59, hex: "#1B263B", tag: "고급 네이비" },
    { name: "블러디 레드", r: 200, g: 30, b: 30, hex: "#C81E1E", tag: "진홍빛" },
    { name: "라벤더 퍼플", r: 184, g: 160, b: 214, hex: "#B8A0D6", tag: "연보라" },
    { name: "포레스트 딥그린", r: 34, g: 112, b: 62, hex: "#22703E", tag: "숲속 그린" },
    { name: "스카이 크림소다", r: 135, g: 206, b: 235, hex: "#87CEEB", tag: "하늘빛" },
    { name: "크림 베이지", r: 250, g: 240, b: 215, hex: "#FAF0D7", tag: "밀크티" }
  ]
};

// 레거시 호환용 포션 DB
var TW_DYE_DB = {
  potions: [
    { id: "bastard_amber", name: "바스타드 앰버", hex: "#FF7E00", rgb: [255, 126, 0] },
    { id: "white_gold", name: "화이트 골드", hex: "#F5E6A3", rgb: [245, 230, 163] },
    { id: "light_green", name: "라이트 그린", hex: "#87D37C", rgb: [135, 211, 124] },
    { id: "light_blue", name: "라이트 블루", hex: "#68C3D4", rgb: [104, 195, 212] },
    { id: "purple", name: "퍼플", hex: "#9B59B6", rgb: [155, 89, 182] },
    { id: "pink", name: "핑크", hex: "#F39C9B", rgb: [243, 156, 155] },
    { id: "red", name: "레드", hex: "#E74C3C", rgb: [231, 76, 60] },
    { id: "orange", name: "오렌지", hex: "#E67E22", rgb: [230, 126, 34] },
    { id: "real_black", name: "리얼 블랙", hex: "#1A1A1A", rgb: [26, 26, 26] },
    { id: "pure_white", name: "스노우 화이트", hex: "#FFFFFF", rgb: [255, 255, 255] },
    { id: "navy_blue", name: "미드나잇 네이비", hex: "#1B263B", rgb: [27, 38, 59] }
  ]
};
