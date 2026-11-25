// ============================================================================
// TalesWeaver Character Dyeing & Beauty Salon Database (items_dye.js)
// 엘티보 눈사람족 수장 판매 염색약(1,500만 SEED), 뷰티샵 및 캐릭터별 염색 부위
// ============================================================================

var TW_DYE_DB = {
  // 1. 엘티보 마을 워프 근처 '눈사람족 수장' 판매 염색약 (1,500만 SEED / 1일권) 및 특수 염색약
  potions: [
    {
      id: "bastard_amber",
      name: "바스타드 앰버",
      category: "eltibo",
      hex: "#FF7E00",
      rgb: [255, 126, 0],
      price: "1,500만 SEED",
      origin: "엘티보 눈사람족 수장",
      desc: "은은하고 따뜻한 호박색(앰버) 빛깔의 눈사람족 특제 염색약",
      badge: "인기"
    },
    {
      id: "white_gold",
      name: "화이트 골드",
      category: "eltibo",
      hex: "#F5E6A3",
      rgb: [245, 230, 163],
      price: "1,500만 SEED",
      origin: "엘티보 눈사람족 수장",
      desc: "고급스러운 백금/연금빛의 인기 염색약",
      badge: "인기"
    },
    {
      id: "light_green",
      name: "라이트 그린",
      category: "eltibo",
      hex: "#87D37C",
      rgb: [135, 211, 124],
      price: "1,500만 SEED",
      origin: "엘티보 눈사람족 수장",
      desc: "산뜻한 새싹 느낌의 밝은 연두빛 염색약",
      badge: ""
    },
    {
      id: "light_blue",
      name: "라이트 블루",
      category: "eltibo",
      hex: "#68C3D4",
      rgb: [104, 195, 212],
      price: "1,500만 SEED",
      origin: "엘티보 눈사람족 수장",
      desc: "맑고 투명한 하늘빛 바다색 염색약",
      badge: ""
    },
    {
      id: "purple",
      name: "퍼플",
      category: "eltibo",
      hex: "#9B59B6",
      rgb: [155, 89, 182],
      price: "1,500만 SEED",
      origin: "엘티보 눈사람족 수장",
      desc: "신비롭고 몽환적인 보랏빛 염색약",
      badge: ""
    },
    {
      id: "pink",
      name: "핑크",
      category: "eltibo",
      hex: "#F39C9B",
      rgb: [243, 156, 155],
      price: "1,500만 SEED",
      origin: "엘티보 눈사람족 수장",
      desc: "사랑스럽고 화사한 벚꽃 핑크빛 염색약",
      badge: "추천"
    },
    {
      id: "red",
      name: "레드",
      category: "eltibo",
      hex: "#E74C3C",
      rgb: [231, 76, 60],
      price: "1,500만 SEED",
      origin: "엘티보 눈사람족 수장",
      desc: "강렬하고 열정적인 진홍빛 레드 염색약",
      badge: ""
    },
    {
      id: "orange",
      name: "오렌지",
      category: "eltibo",
      hex: "#E67E22",
      rgb: [230, 126, 34],
      price: "1,500만 SEED",
      origin: "엘티보 눈사람족 수장",
      desc: "생기 넘치는 상큼한 감귤 오렌지빛 염색약",
      badge: ""
    },
    // 스페셜 / 만능 / 뷰티샵 프리셋
    {
      id: "real_black",
      name: "리얼 블랙",
      category: "special",
      hex: "#1A1A1A",
      rgb: [26, 26, 26],
      price: "만능 / 뷰티샵",
      origin: "만능 염색약 (0, 0, 0)",
      desc: "깊고 선명한 흑단빛 리얼 블랙",
      badge: "스페셜"
    },
    {
      id: "pure_white",
      name: "스노우 화이트",
      category: "special",
      hex: "#FFFFFF",
      rgb: [255, 255, 255],
      price: "만능 / 뷰티샵",
      origin: "만능 염색약 (255, 255, 255)",
      desc: "순백의 눈송이처럼 깨끗한 화이트",
      badge: "스페셜"
    },
    {
      id: "navy_blue",
      name: "미드나잇 네이비",
      category: "special",
      hex: "#1B263B",
      rgb: [27, 38, 59],
      price: "만능 / 뷰티샵",
      origin: "만능 염색약 (RGB 커스텀)",
      desc: "밤하늘의 깊이를 담은 고급스러운 딥 네이비",
      badge: ""
    },
    {
      id: "mint_pastel",
      name: "파스텔 민트",
      category: "special",
      hex: "#A8E6CF",
      rgb: [168, 230, 207],
      price: "만능 / 뷰티샵",
      origin: "만능 염색약 (RGB 커스텀)",
      desc: "청량감 있는 감성 파스텔 톤 민트",
      badge: ""
    }
  ],

  // 2. 캐릭터별 염색 가능 세부 부위 (파트) 정의
  characterParts: {
    "nayatrei": [
      { key: "hair",   name: "기본 헤어",       defaultHex: "#E6D4BE", icon: "💇‍♀️", desc: "나야트레이의 은백색 스트레이트 헤어" },
      { key: "top",    name: "의복 상의 (겉옷)", defaultHex: "#3D2B3D", icon: "🥋", desc: "자줏빛 닌자 의복 겉옷 및 어깨 라인" },
      { key: "ribbon", name: "목장식 / 리본",   defaultHex: "#8A2436", icon: "🧣", desc: "목에 두른 붉은 닌자 머플러 / 매듭 리본" },
      { key: "pants",  name: "의복 하의 (부츠)", defaultHex: "#6B5864", icon: "👖", desc: "닌자 하의 및 무릎 레깅스 / 각반" }
    ],
    "boris": [
      { key: "hair",   name: "기본 헤어",       defaultHex: "#223A5E", icon: "💇‍♂️", desc: "보리스 진네만의 짙은 네이비 블루 헤어" },
      { key: "coat",   name: "롱코트 (겉감)",   defaultHex: "#1E272C", icon: "🧥", desc: "묵직한 사제풍 롱코트 외투" },
      { key: "shirt",  name: "셔츠 / 깃 안감",  defaultHex: "#E0E6ED", icon: "👔", desc: "코트 안쪽의 흰 셔츠와 칼라 깃" },
      { key: "pants",  name: "팬츠 / 가죽부츠", defaultHex: "#5D6D7E", icon: "👖", desc: "하의 슬랙스 및 가죽 부츠" }
    ],
    "lucian": [
      { key: "hair",   name: "기본 헤어",       defaultHex: "#C0392B", icon: "💇‍♂️", desc: "루시안의 밝은 와인레드 더벅머리" },
      { key: "top",    name: "모험가 조끼/상의", defaultHex: "#D35400", icon: "🦺", desc: "가죽 조끼 및 상의 셔츠" },
      { key: "pants",  name: "팬츠 / 부츠",     defaultHex: "#2C3E50", icon: "👖", desc: "하의 팬츠" }
    ],
    "tichiel": [
      { key: "hair",   name: "기본 헤어",       defaultHex: "#F39C12", icon: "💇‍♀️", desc: "티치엘의 금발 트윈테일 헤어" },
      { key: "dress",  name: "마법 원피스",     defaultHex: "#8E44AD", icon: "👗", desc: "보라빛 마법사 원피스 복장" },
      { key: "ribbon", name: "헤어 리본",       defaultHex: "#E74C3C", icon: "🎀", desc: "양갈래 머리를 묶은 붉은 리본" }
    ],
    "mila": [
      { key: "hair",   name: "기본 헤어",       defaultHex: "#E67E22", icon: "💇‍♀️", desc: "밀라의 오렌지 웨이브 헤어" },
      { key: "top",    name: "해적 코트",       defaultHex: "#C0392B", icon: "🧥", desc: "붉은 해적 캡틴 재킷" },
      { key: "pants",  name: "하의 / 부츠",     defaultHex: "#2C3E50", icon: "👖", desc: "해적 부츠 및 가죽 팬츠" }
    ],
    "lanziee": [
      { key: "hair",   name: "기본 헤어",       defaultHex: "#85C1E9", icon: "💇‍♂️", desc: "란지에의 하늘색 샤기컷 헤어" },
      { key: "coat",   name: "혁명군 제복 코트", defaultHex: "#283747", icon: "🧥", desc: "혁명군 제복 롱코트" },
      { key: "pants",  name: "제복 팬츠",       defaultHex: "#566573", icon: "👖", desc: "제복 슬랙스 팬츠" }
    ],
    "sivelin": [
      { key: "hair",   name: "기본 헤어",       defaultHex: "#922B21", icon: "💇‍♂️", desc: "시벨린의 붉은 꽁지 장발" },
      { key: "top",    name: "용병 가죽 갑주",   defaultHex: "#784212", icon: "🥋", desc: "용병 가죽 상의" },
      { key: "pants",  name: "팬츠",           defaultHex: "#1B2631", icon: "👖", desc: "가죽 하의" }
    ],
    "issac": [
      { key: "hair",   name: "기본 헤어",       defaultHex: "#5D6D7E", icon: "💇‍♂️", desc: "이자크의 거친 은발 헤어" },
      { key: "top",    name: "격투 도복 상의",   defaultHex: "#B03A2E", icon: "🥋", desc: "붉은 도복 상의" },
      { key: "pants",  name: "도복 바지",       defaultHex: "#17202A", icon: "👖", desc: "도복 하의" }
    ],
    "anais": [
      { key: "hair",   name: "기본 헤어",       defaultHex: "#F1948A", icon: "💇‍♀️", desc: "아나이스의 핑크 양갈래 헤어" },
      { key: "dress",  name: "원피스 드레스",   defaultHex: "#FADBD8", icon: "👗", desc: "프릴 원피스 드레스" },
      { key: "ribbon", name: "장식 리본",       defaultHex: "#E74C3C", icon: "🎀", desc: "머리 및 허리 리본" }
    ]
  },

  // 기본 파트가 정의되지 않은 캐릭터를 위한 기본 템플릿
  getDefaultParts: function(charKey) {
    if (this.characterParts[charKey]) {
      return this.characterParts[charKey];
    }
    return [
      { key: "hair",   name: "기본 헤어", defaultHex: "#D4AF37", icon: "💇", desc: "캐릭터 기본 헤어스타일" },
      { key: "top",    name: "기본 상의", defaultHex: "#34495E", icon: "🥋", desc: "캐릭터 기본 상의/외투" },
      { key: "pants",  name: "기본 하의", defaultHex: "#2C3E50", icon: "👖", desc: "캐릭터 기본 하의/부츠" }
    ];
  }
};
