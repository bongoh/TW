// ============================================================================
// TalesWeaver Avatar Database (items_avatar.js)
// 1~83회차 화려한 아바타 및 월간 확장 아이템(월템) 2,100여 종 전수 DB
// 자료 출처: 매직위버 호랑구님의 확장 아이템 및 화려한 아바타 회차별 정리 시트
// ============================================================================

var TW_AVATAR_DB = {
  version: "2023.08.24",
  totalCount: 2098,

  slots: {
    showHead:    { key: "showHead",    label: "SHOW HEAD",     name: "투구 / 헤어 / 모자", icon: "🎀" },
    showArmor:   { key: "showArmor",   label: "SHOW ARMOR",    name: "아바타 의상 / 몸",   icon: "👗" },
    showFace:    { key: "showFace",    label: "SHOW FACE",     name: "얼굴 장식 / 안경",   icon: "👔" },
    showBack:    { key: "showBack",    label: "SHOW BACK",     name: "날개 / 망토 / 등",   icon: "🪽" },
    showFoot:    { key: "showFoot",    label: "SHOW FOOT",     name: "발자국 / 지면",     icon: "✨" },
    showEffect:  { key: "showEffect",  label: "SHOW EFFECT",   name: "마법진 / 전신 효과", icon: "🌀" },
    showSubArms: { key: "showSubArms", label: "SHOW SUB ARMS", name: "무기 확장",         icon: "🗡️" }
  },

  setEffect: {
    requiredCount: 5,
    name: "화려한 아바타 5세트 효과",
    stats: { allStat: 10, moveSpeed: 3, hp: 2000, desc: "모든 능력치 +10, 이동속도 +3, 최대 HP +2000" }
  },

  items: [
  {
    "id": "av_0001",
    "name": "노랑 토끼귀 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "81회차",
      "노랑",
      "토끼귀",
      "장식"
    ]
  },
  {
    "id": "av_0002",
    "name": "선장모자",
    "slot": "showHead",
    "category": "투구",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "81회차",
      "선장모자"
    ]
  },
  {
    "id": "av_0003",
    "name": "아이돌 트윈 리본",
    "slot": "showHead",
    "category": "투구",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "81회차",
      "아이돌",
      "트윈",
      "리본"
    ]
  },
  {
    "id": "av_0004",
    "name": "악몽의 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "81회차",
      "악몽의",
      "모자"
    ]
  },
  {
    "id": "av_0005",
    "name": "프릴 블랙 위치 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "81회차",
      "프릴",
      "블랙",
      "위치"
    ]
  },
  {
    "id": "av_0006",
    "name": "벨 포인트 셀일러",
    "slot": "showHead",
    "category": "머리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "81회차",
      "포인트",
      "셀일러"
    ]
  },
  {
    "id": "av_0007",
    "name": "여름별",
    "slot": "showHead",
    "category": "머리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "81회차",
      "여름별"
    ]
  },
  {
    "id": "av_0008",
    "name": "체리블라썸 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "81회차",
      "체리블라썸",
      "머플러"
    ]
  },
  {
    "id": "av_0009",
    "name": "토끼의 넥타이",
    "slot": "showFace",
    "category": "머리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "81회차",
      "토끼의",
      "넥타이"
    ]
  },
  {
    "id": "av_0010",
    "name": "하와이안 꽃 목걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "81회차",
      "하와이안",
      "목걸이"
    ]
  },
  {
    "id": "av_0011",
    "name": "노랑 토끼 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "81회차",
      "노랑",
      "토끼",
      "꼬리"
    ]
  },
  {
    "id": "av_0012",
    "name": "악몽의 빗자루",
    "slot": "showBack",
    "category": "몸",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "81회차",
      "악몽의",
      "빗자루"
    ]
  },
  {
    "id": "av_0013",
    "name": "정열적인 흰색 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "81회차",
      "정열적인",
      "흰색",
      "코트"
    ]
  },
  {
    "id": "av_0014",
    "name": "크리스탈 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "81회차",
      "크리스탈"
    ]
  },
  {
    "id": "av_0015",
    "name": "팬더 가방",
    "slot": "showBack",
    "category": "몸",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "81회차",
      "팬더",
      "가방"
    ]
  },
  {
    "id": "av_0016",
    "name": "꽃이 피는 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "81회차",
      "꽃이",
      "피는",
      "발자국"
    ]
  },
  {
    "id": "av_0017",
    "name": "낫 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "81회차",
      "발자국"
    ]
  },
  {
    "id": "av_0018",
    "name": "물개 공놀이",
    "slot": "showFoot",
    "category": "다리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "81회차",
      "물개",
      "공놀이"
    ]
  },
  {
    "id": "av_0019",
    "name": "잔디 스프링쿨러",
    "slot": "showFoot",
    "category": "다리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "81회차",
      "잔디",
      "스프링쿨러"
    ]
  },
  {
    "id": "av_0020",
    "name": "조각난 사과",
    "slot": "showFoot",
    "category": "다리",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "81회차",
      "조각난",
      "사과"
    ]
  },
  {
    "id": "av_0021",
    "name": "무지개색 우산",
    "slot": "showEffect",
    "category": "효과",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "81회차",
      "무지개색",
      "우산"
    ]
  },
  {
    "id": "av_0022",
    "name": "사파이어 원석",
    "slot": "showEffect",
    "category": "효과",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "81회차",
      "사파이어",
      "원석"
    ]
  },
  {
    "id": "av_0023",
    "name": "수국 감상 우비 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "81회차",
      "수국",
      "감상",
      "우비",
      "젤리삐"
    ]
  },
  {
    "id": "av_0024",
    "name": "여름휴가 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "81회차",
      "여름휴가",
      "젤리삐"
    ]
  },
  {
    "id": "av_0025",
    "name": "작은 꽃집",
    "slot": "showEffect",
    "category": "효과",
    "round": "81회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "81회차",
      "작은",
      "꽃집"
    ]
  },
  {
    "id": "av_0026",
    "name": "그린 민트 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "82회차",
      "그린",
      "민트",
      "베레모"
    ]
  },
  {
    "id": "av_0027",
    "name": "꽃 마법 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "82회차",
      "마법",
      "모자"
    ]
  },
  {
    "id": "av_0028",
    "name": "머리 위 휴식 고양이",
    "slot": "showHead",
    "category": "투구",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "82회차",
      "머리",
      "휴식",
      "고양이"
    ]
  },
  {
    "id": "av_0029",
    "name": "젤리삐 우비 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "82회차",
      "젤리삐",
      "우비",
      "모자"
    ]
  },
  {
    "id": "av_0030",
    "name": "푸른 데님 버킷 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "82회차",
      "푸른",
      "데님",
      "버킷"
    ]
  },
  {
    "id": "av_0031",
    "name": "그린 민트 넥타이&안경",
    "slot": "showFace",
    "category": "머리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "82회차",
      "그린",
      "민트",
      "넥타이&안경"
    ]
  },
  {
    "id": "av_0032",
    "name": "금장식 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "82회차",
      "금장식",
      "케이프"
    ]
  },
  {
    "id": "av_0033",
    "name": "닌자 하프 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "82회차",
      "닌자",
      "하프",
      "케이프"
    ]
  },
  {
    "id": "av_0034",
    "name": "쉬폰 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "82회차",
      "쉬폰",
      "케이프"
    ]
  },
  {
    "id": "av_0035",
    "name": "푸른 레이스 턱시도",
    "slot": "showHead",
    "category": "머리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "82회차",
      "푸른",
      "레이스",
      "턱시도"
    ]
  },
  {
    "id": "av_0036",
    "name": "고양이 천사 드레스",
    "slot": "showArmor",
    "category": "몸",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "82회차",
      "고양이",
      "천사",
      "드레스"
    ]
  },
  {
    "id": "av_0037",
    "name": "까마귀 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "82회차",
      "까마귀",
      "날개"
    ]
  },
  {
    "id": "av_0038",
    "name": "쉬폰 드레스",
    "slot": "showArmor",
    "category": "몸",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "82회차",
      "쉬폰",
      "드레스"
    ]
  },
  {
    "id": "av_0039",
    "name": "앨리스 망토 (그린 민트)",
    "slot": "showBack",
    "category": "몸",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "82회차",
      "앨리스",
      "망토",
      "그린",
      "민트"
    ]
  },
  {
    "id": "av_0040",
    "name": "파도무늬 서핑보드",
    "slot": "showArmor",
    "category": "몸",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "82회차",
      "파도무늬",
      "서핑보드"
    ]
  },
  {
    "id": "av_0041",
    "name": "달걀 부화 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "82회차",
      "달걀",
      "부화",
      "발자국"
    ]
  },
  {
    "id": "av_0042",
    "name": "수려한 깃털 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "82회차",
      "수려한",
      "깃털",
      "발자국"
    ]
  },
  {
    "id": "av_0043",
    "name": "젤리삐 당고 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "82회차",
      "젤리삐",
      "당고",
      "발자국"
    ]
  },
  {
    "id": "av_0044",
    "name": "조립 파괴 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "82회차",
      "조립",
      "파괴",
      "발자국"
    ]
  },
  {
    "id": "av_0045",
    "name": "체스 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "82회차",
      "체스",
      "발자국"
    ]
  },
  {
    "id": "av_0046",
    "name": "감전 효과",
    "slot": "showEffect",
    "category": "효과",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "82회차",
      "감전"
    ]
  },
  {
    "id": "av_0047",
    "name": "잔잔한 소나기",
    "slot": "showEffect",
    "category": "효과",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "82회차",
      "잔잔한",
      "소나기"
    ]
  },
  {
    "id": "av_0048",
    "name": "젤리삐 대폭풍",
    "slot": "showEffect",
    "category": "효과",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "82회차",
      "젤리삐",
      "대폭풍"
    ]
  },
  {
    "id": "av_0049",
    "name": "젤리토조",
    "slot": "showEffect",
    "category": "효과",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "82회차",
      "젤리토조"
    ]
  },
  {
    "id": "av_0050",
    "name": "해변의 여유",
    "slot": "showEffect",
    "category": "효과",
    "round": "82회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "82회차",
      "해변의",
      "여유"
    ]
  },
  {
    "id": "av_0051",
    "name": "비누거품 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "83회차",
      "비누거품",
      "모자"
    ]
  },
  {
    "id": "av_0052",
    "name": "상어 인형 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "83회차",
      "상어",
      "인형",
      "모자"
    ]
  },
  {
    "id": "av_0053",
    "name": "아누비스 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "83회차",
      "아누비스",
      "모자"
    ]
  },
  {
    "id": "av_0054",
    "name": "파란 깃털 미니 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "83회차",
      "파란",
      "깃털",
      "미니"
    ]
  },
  {
    "id": "av_0055",
    "name": "파란 하트 왕관",
    "slot": "showHead",
    "category": "투구",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "83회차",
      "파란",
      "하트",
      "왕관"
    ]
  },
  {
    "id": "av_0056",
    "name": "고대 신화 목걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "83회차",
      "고대",
      "신화",
      "목걸이"
    ]
  },
  {
    "id": "av_0057",
    "name": "노랑 마스크",
    "slot": "showFace",
    "category": "머리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "83회차",
      "노랑",
      "마스크"
    ]
  },
  {
    "id": "av_0058",
    "name": "오리 우비",
    "slot": "showHead",
    "category": "머리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "83회차",
      "오리",
      "우비"
    ]
  },
  {
    "id": "av_0059",
    "name": "작은 행성 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "83회차",
      "작은",
      "행성",
      "귀걸이"
    ]
  },
  {
    "id": "av_0060",
    "name": "하트 장식 어깨 갑옷",
    "slot": "showArmor",
    "category": "머리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "83회차",
      "하트",
      "장식",
      "어깨",
      "갑옷"
    ]
  },
  {
    "id": "av_0061",
    "name": "그린 민트 드레스",
    "slot": "showArmor",
    "category": "몸",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "83회차",
      "그린",
      "민트",
      "드레스"
    ]
  },
  {
    "id": "av_0062",
    "name": "꽃 마법 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "83회차",
      "마법",
      "망토"
    ]
  },
  {
    "id": "av_0063",
    "name": "진진 알파 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "83회차",
      "진진",
      "알파"
    ]
  },
  {
    "id": "av_0064",
    "name": "카벙클 가방",
    "slot": "showBack",
    "category": "몸",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "83회차",
      "카벙클",
      "가방"
    ]
  },
  {
    "id": "av_0065",
    "name": "파란 장미 턱시도",
    "slot": "showArmor",
    "category": "몸",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "83회차",
      "파란",
      "장미",
      "턱시도"
    ]
  },
  {
    "id": "av_0066",
    "name": "1톤 함정 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "83회차",
      "1톤",
      "함정",
      "발자국"
    ]
  },
  {
    "id": "av_0067",
    "name": "루비 하트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "83회차",
      "루비",
      "하트",
      "발자국"
    ]
  },
  {
    "id": "av_0068",
    "name": "용궁 버스 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "83회차",
      "용궁",
      "버스",
      "발자국"
    ]
  },
  {
    "id": "av_0069",
    "name": "주황 파스텔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "83회차",
      "주황",
      "파스텔",
      "발자국"
    ]
  },
  {
    "id": "av_0070",
    "name": "풀잎 탄생 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "83회차",
      "풀잎",
      "탄생",
      "발자국"
    ]
  },
  {
    "id": "av_0071",
    "name": "겨울 냉기",
    "slot": "showEffect",
    "category": "효과",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "83회차",
      "겨울",
      "냉기"
    ]
  },
  {
    "id": "av_0072",
    "name": "버블 둥지",
    "slot": "showEffect",
    "category": "효과",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "83회차",
      "버블",
      "둥지"
    ]
  },
  {
    "id": "av_0073",
    "name": "세이렌의 노래",
    "slot": "showEffect",
    "category": "효과",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "83회차",
      "세이렌의",
      "노래"
    ]
  },
  {
    "id": "av_0074",
    "name": "수호 부적",
    "slot": "showEffect",
    "category": "효과",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "83회차",
      "수호",
      "부적"
    ]
  },
  {
    "id": "av_0075",
    "name": "우르르 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "83회차",
    "tab": "81회차~83회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "83회차",
      "우르르",
      "젤리삐"
    ]
  },
  {
    "id": "av_0076",
    "name": "블러드 데몬 뿔",
    "slot": "showHead",
    "category": "투구",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "76회차",
      "블러드",
      "데몬"
    ]
  },
  {
    "id": "av_0077",
    "name": "아이스바 헬멧",
    "slot": "showHead",
    "category": "투구",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "76회차",
      "아이스바",
      "헬멧"
    ]
  },
  {
    "id": "av_0078",
    "name": "젤리삐 털모자",
    "slot": "showHead",
    "category": "투구",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "76회차",
      "젤리삐",
      "털모자"
    ]
  },
  {
    "id": "av_0079",
    "name": "주얼 로즈 헤어핀",
    "slot": "showHead",
    "category": "투구",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "76회차",
      "주얼",
      "로즈",
      "헤어핀"
    ]
  },
  {
    "id": "av_0080",
    "name": "핑크래빗 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "76회차",
      "핑크래빗"
    ]
  },
  {
    "id": "av_0081",
    "name": "러브 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "76회차",
      "러브",
      "가면"
    ]
  },
  {
    "id": "av_0082",
    "name": "블러드 데몬 밴디지",
    "slot": "showHead",
    "category": "머리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "76회차",
      "블러드",
      "데몬",
      "밴디지"
    ]
  },
  {
    "id": "av_0083",
    "name": "포근한 양털 목도리",
    "slot": "showHead",
    "category": "머리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "76회차",
      "포근한",
      "양털",
      "목도리"
    ]
  },
  {
    "id": "av_0084",
    "name": "핑크래빗 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "76회차",
      "핑크래빗",
      "머플러"
    ]
  },
  {
    "id": "av_0085",
    "name": "흰 부엉이",
    "slot": "showHead",
    "category": "머리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "76회차",
      "부엉이"
    ]
  },
  {
    "id": "av_0086",
    "name": "마룡의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "76회차",
      "마룡의",
      "날개"
    ]
  },
  {
    "id": "av_0087",
    "name": "블러드 데몬 털망토",
    "slot": "showBack",
    "category": "몸",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "76회차",
      "블러드",
      "데몬",
      "털망토"
    ]
  },
  {
    "id": "av_0088",
    "name": "아이보리 더플코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "76회차",
      "아이보리",
      "더플코트"
    ]
  },
  {
    "id": "av_0089",
    "name": "주얼 로즈 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "76회차",
      "주얼",
      "로즈"
    ]
  },
  {
    "id": "av_0090",
    "name": "핑크래빗 점퍼",
    "slot": "showArmor",
    "category": "몸",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "76회차",
      "핑크래빗",
      "점퍼"
    ]
  },
  {
    "id": "av_0091",
    "name": "꿈나무 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "76회차",
      "꿈나무",
      "발자국"
    ]
  },
  {
    "id": "av_0092",
    "name": "날쌘 고양이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "76회차",
      "날쌘",
      "고양이",
      "발자국"
    ]
  },
  {
    "id": "av_0093",
    "name": "샤이닝핑크 발자국",
    "slot": "showEffect",
    "category": "다리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "76회차",
      "샤이닝핑크",
      "발자국"
    ]
  },
  {
    "id": "av_0094",
    "name": "염소자리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "76회차",
      "염소자리",
      "발자국"
    ]
  },
  {
    "id": "av_0095",
    "name": "퍼플 파스텔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "76회차",
      "퍼플",
      "파스텔",
      "발자국"
    ]
  },
  {
    "id": "av_0096",
    "name": "네온 샤워",
    "slot": "showEffect",
    "category": "효과",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "76회차",
      "네온",
      "샤워"
    ]
  },
  {
    "id": "av_0097",
    "name": "눈 내린 숲속 온천",
    "slot": "showEffect",
    "category": "효과",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "76회차",
      "내린",
      "숲속",
      "온천"
    ]
  },
  {
    "id": "av_0098",
    "name": "별밤의 캠프",
    "slot": "showEffect",
    "category": "효과",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "76회차",
      "별밤의",
      "캠프"
    ]
  },
  {
    "id": "av_0099",
    "name": "얼음낚시 캠핑카",
    "slot": "showEffect",
    "category": "효과",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "76회차",
      "얼음낚시",
      "캠핑카"
    ]
  },
  {
    "id": "av_0100",
    "name": "핑크빛 시그널",
    "slot": "showEffect",
    "category": "효과",
    "round": "76회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "76회차",
      "핑크빛",
      "시그널"
    ]
  },
  {
    "id": "av_0101",
    "name": "루피망고 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "77회차",
      "루피망고",
      "모자"
    ]
  },
  {
    "id": "av_0102",
    "name": "붉은 여우신령의 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "77회차",
      "붉은",
      "여우신령의"
    ]
  },
  {
    "id": "av_0103",
    "name": "양털 무스탕 귀마개",
    "slot": "showHead",
    "category": "투구",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "77회차",
      "양털",
      "무스탕",
      "귀마개"
    ]
  },
  {
    "id": "av_0104",
    "name": "프릴 메이드 토끼귀",
    "slot": "showHead",
    "category": "투구",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "77회차",
      "프릴",
      "메이드",
      "토끼귀"
    ]
  },
  {
    "id": "av_0105",
    "name": "핑크베어 털모자",
    "slot": "showHead",
    "category": "투구",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "77회차",
      "핑크베어",
      "털모자"
    ]
  },
  {
    "id": "av_0106",
    "name": "붉은 여우신령의 털장식",
    "slot": "showHead",
    "category": "머리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "77회차",
      "붉은",
      "여우신령의",
      "털장식"
    ]
  },
  {
    "id": "av_0107",
    "name": "빼꼼 토끼 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "77회차",
      "빼꼼",
      "토끼",
      "머플러"
    ]
  },
  {
    "id": "av_0108",
    "name": "아이돌 노블 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "77회차",
      "아이돌",
      "노블",
      "케이프"
    ]
  },
  {
    "id": "av_0109",
    "name": "패셔너블 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "77회차",
      "패셔너블",
      "머플러"
    ]
  },
  {
    "id": "av_0110",
    "name": "프릴 메이드 카라",
    "slot": "showHead",
    "category": "머리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "77회차",
      "프릴",
      "메이드",
      "카라"
    ]
  },
  {
    "id": "av_0111",
    "name": "돈다발",
    "slot": "showFoot",
    "category": "몸",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "77회차",
      "돈다발"
    ]
  },
  {
    "id": "av_0112",
    "name": "붉은 여우신령의 옷",
    "slot": "showArmor",
    "category": "몸",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "77회차",
      "붉은",
      "여우신령의"
    ]
  },
  {
    "id": "av_0113",
    "name": "양털 무스탕",
    "slot": "showArmor",
    "category": "몸",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "77회차",
      "양털",
      "무스탕"
    ]
  },
  {
    "id": "av_0114",
    "name": "퍼플 다크 블레이드",
    "slot": "showArmor",
    "category": "몸",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "77회차",
      "퍼플",
      "다크",
      "블레이드"
    ]
  },
  {
    "id": "av_0115",
    "name": "프릴 메이드 스커트",
    "slot": "showArmor",
    "category": "몸",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "77회차",
      "프릴",
      "메이드",
      "스커트"
    ]
  },
  {
    "id": "av_0116",
    "name": "냥이배틀 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "77회차",
      "냥이배틀",
      "발자국"
    ]
  },
  {
    "id": "av_0117",
    "name": "물병자리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "77회차",
      "물병자리",
      "발자국"
    ]
  },
  {
    "id": "av_0118",
    "name": "복주머니 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "77회차",
      "복주머니",
      "발자국"
    ]
  },
  {
    "id": "av_0119",
    "name": "색종이 꽃가루 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "77회차",
      "색종이",
      "꽃가루",
      "발자국"
    ]
  },
  {
    "id": "av_0120",
    "name": "장독 격파닭 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "77회차",
      "장독",
      "격파닭",
      "발자국"
    ]
  },
  {
    "id": "av_0121",
    "name": "몽글몽글 오색구름",
    "slot": "showEffect",
    "category": "효과",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "77회차",
      "몽글몽글",
      "오색구름"
    ]
  },
  {
    "id": "av_0122",
    "name": "방울방울",
    "slot": "showEffect",
    "category": "효과",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "77회차",
      "방울방울"
    ]
  },
  {
    "id": "av_0123",
    "name": "빙글빙글 팽이삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "77회차",
      "빙글빙글",
      "팽이삐"
    ]
  },
  {
    "id": "av_0124",
    "name": "시바의 산책",
    "slot": "showEffect",
    "category": "효과",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "77회차",
      "시바의",
      "산책"
    ]
  },
  {
    "id": "av_0125",
    "name": "핑크베어 토이푸들",
    "slot": "showEffect",
    "category": "효과",
    "round": "77회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "77회차",
      "핑크베어",
      "토이푸들"
    ]
  },
  {
    "id": "av_0126",
    "name": "금테 안경",
    "slot": "showFace",
    "category": "투구",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "78회차",
      "금테",
      "안경"
    ]
  },
  {
    "id": "av_0127",
    "name": "둥실둥실 토끼 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "78회차",
      "둥실둥실",
      "토끼"
    ]
  },
  {
    "id": "av_0128",
    "name": "조커 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "78회차",
      "조커",
      "헤어밴드"
    ]
  },
  {
    "id": "av_0129",
    "name": "팬텀 괴도 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "78회차",
      "팬텀",
      "괴도"
    ]
  },
  {
    "id": "av_0130",
    "name": "화이트 엔젤 머리장식",
    "slot": "showHead",
    "category": "투구",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "78회차",
      "화이트",
      "엔젤",
      "머리장식"
    ]
  },
  {
    "id": "av_0131",
    "name": "근위기사 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "78회차",
      "근위기사",
      "케이프"
    ]
  },
  {
    "id": "av_0132",
    "name": "다이스 초커",
    "slot": "showHead",
    "category": "머리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "78회차",
      "다이스",
      "초커"
    ]
  },
  {
    "id": "av_0133",
    "name": "와일드 셔츠 카라",
    "slot": "showHead",
    "category": "머리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "78회차",
      "와일드",
      "셔츠",
      "카라"
    ]
  },
  {
    "id": "av_0134",
    "name": "큐트 체리 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "78회차",
      "큐트",
      "체리",
      "이어링"
    ]
  },
  {
    "id": "av_0135",
    "name": "화이트 엔젤 프릴",
    "slot": "showHead",
    "category": "머리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "78회차",
      "화이트",
      "엔젤",
      "프릴"
    ]
  },
  {
    "id": "av_0136",
    "name": "고수",
    "slot": "showArmor",
    "category": "몸",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "78회차",
      "고수"
    ]
  },
  {
    "id": "av_0137",
    "name": "벚꽃 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "78회차",
      "벚꽃",
      "날개"
    ]
  },
  {
    "id": "av_0138",
    "name": "블랙 앤 화이트 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "78회차",
      "블랙",
      "화이트",
      "코트"
    ]
  },
  {
    "id": "av_0139",
    "name": "호랑이 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "78회차",
      "호랑이",
      "배낭"
    ]
  },
  {
    "id": "av_0140",
    "name": "화이트 엔젤 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "78회차",
      "화이트",
      "엔젤"
    ]
  },
  {
    "id": "av_0141",
    "name": "동동 비눗방울 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "78회차",
      "동동",
      "비눗방울",
      "발자국"
    ]
  },
  {
    "id": "av_0142",
    "name": "민들레 씨앗 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "78회차",
      "민들레",
      "씨앗",
      "발자국"
    ]
  },
  {
    "id": "av_0143",
    "name": "샤인스타 토네이도 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "78회차",
      "샤인스타",
      "토네이도",
      "발자국"
    ]
  },
  {
    "id": "av_0144",
    "name": "양자리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "78회차",
      "양자리",
      "발자국"
    ]
  },
  {
    "id": "av_0145",
    "name": "위험한 맨홀 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "78회차",
      "위험한",
      "맨홀",
      "발자국"
    ]
  },
  {
    "id": "av_0146",
    "name": "다크 썬더",
    "slot": "showEffect",
    "category": "효과",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "78회차",
      "다크",
      "썬더"
    ]
  },
  {
    "id": "av_0147",
    "name": "땅의 기운",
    "slot": "showEffect",
    "category": "효과",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "78회차",
      "땅의",
      "기운"
    ]
  },
  {
    "id": "av_0148",
    "name": "밤샘 연구",
    "slot": "showEffect",
    "category": "효과",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "78회차",
      "밤샘",
      "연구"
    ]
  },
  {
    "id": "av_0149",
    "name": "방전",
    "slot": "showEffect",
    "category": "효과",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "78회차",
      "방전"
    ]
  },
  {
    "id": "av_0150",
    "name": "판타지 버터플라이",
    "slot": "showEffect",
    "category": "효과",
    "round": "78회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "78회차",
      "판타지",
      "버터플라이"
    ]
  },
  {
    "id": "av_0151",
    "name": "민트 리본 고양이 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "79회차",
      "민트",
      "리본",
      "고양이"
    ]
  },
  {
    "id": "av_0152",
    "name": "밝은꽃 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "79회차",
      "밝은꽃",
      "헤어밴드"
    ]
  },
  {
    "id": "av_0153",
    "name": "별밤 미니햇",
    "slot": "showHead",
    "category": "투구",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "79회차",
      "별밤",
      "미니햇"
    ]
  },
  {
    "id": "av_0154",
    "name": "수국 장식 리본",
    "slot": "showHead",
    "category": "투구",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "79회차",
      "수국",
      "장식",
      "리본"
    ]
  },
  {
    "id": "av_0155",
    "name": "파란 장미 왕관",
    "slot": "showHead",
    "category": "투구",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "79회차",
      "파란",
      "장미",
      "왕관"
    ]
  },
  {
    "id": "av_0156",
    "name": "민트 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "79회차",
      "민트",
      "케이프"
    ]
  },
  {
    "id": "av_0157",
    "name": "별밤 카라",
    "slot": "showHead",
    "category": "머리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "79회차",
      "별밤",
      "카라"
    ]
  },
  {
    "id": "av_0158",
    "name": "블랙 앤드 레드 체크 넥타이",
    "slot": "showFace",
    "category": "머리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "79회차",
      "블랙",
      "앤드",
      "레드",
      "체크",
      "넥타이"
    ]
  },
  {
    "id": "av_0159",
    "name": "사수의 선글라스",
    "slot": "showFace",
    "category": "머리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "79회차",
      "사수의",
      "선글라스"
    ]
  },
  {
    "id": "av_0160",
    "name": "파란 리본 넥타이",
    "slot": "showFace",
    "category": "머리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "79회차",
      "파란",
      "리본",
      "넥타이"
    ]
  },
  {
    "id": "av_0161",
    "name": "달콤 휘핑크림",
    "slot": "showArmor",
    "category": "몸",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "79회차",
      "달콤",
      "휘핑크림"
    ]
  },
  {
    "id": "av_0162",
    "name": "민트 고양이 드레스",
    "slot": "showArmor",
    "category": "몸",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "79회차",
      "민트",
      "고양이",
      "드레스"
    ]
  },
  {
    "id": "av_0163",
    "name": "별밤 후드 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "79회차",
      "별밤",
      "후드",
      "코트"
    ]
  },
  {
    "id": "av_0164",
    "name": "으르렁 백호",
    "slot": "showArmor",
    "category": "몸",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "79회차",
      "으르렁",
      "백호"
    ]
  },
  {
    "id": "av_0165",
    "name": "파란 장미 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "79회차",
      "파란",
      "장미",
      "망토"
    ]
  },
  {
    "id": "av_0166",
    "name": "발짝 젤리삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "79회차",
      "발짝",
      "젤리삐",
      "발자국"
    ]
  },
  {
    "id": "av_0167",
    "name": "버섯 가족 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "79회차",
      "버섯",
      "가족",
      "발자국"
    ]
  },
  {
    "id": "av_0168",
    "name": "뿌려지는 무지개 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "79회차",
      "뿌려지는",
      "무지개",
      "발자국"
    ]
  },
  {
    "id": "av_0169",
    "name": "화려한 불빛 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "79회차",
      "화려한",
      "불빛",
      "발자국"
    ]
  },
  {
    "id": "av_0170",
    "name": "화려한 축하 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "79회차",
      "화려한",
      "축하",
      "발자국"
    ]
  },
  {
    "id": "av_0171",
    "name": "다리 위 흩날리는 벚꽃",
    "slot": "showEffect",
    "category": "효과",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "79회차",
      "다리",
      "흩날리는",
      "벚꽃"
    ]
  },
  {
    "id": "av_0172",
    "name": "마이크 댄스 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "79회차",
      "마이크",
      "댄스",
      "젤리삐"
    ]
  },
  {
    "id": "av_0173",
    "name": "문앞 벚꽃 정원",
    "slot": "showEffect",
    "category": "효과",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "79회차",
      "문앞",
      "벚꽃",
      "정원"
    ]
  },
  {
    "id": "av_0174",
    "name": "아기 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "79회차",
      "아기",
      "젤리삐"
    ]
  },
  {
    "id": "av_0175",
    "name": "화려한 꽃",
    "slot": "showEffect",
    "category": "효과",
    "round": "79회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "79회차",
      "화려한"
    ]
  },
  {
    "id": "av_0176",
    "name": "금색 비행사 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "80회차",
      "금색",
      "비행사",
      "모자"
    ]
  },
  {
    "id": "av_0177",
    "name": "별밤 마녀 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "80회차",
      "별밤",
      "마녀",
      "모자"
    ]
  },
  {
    "id": "av_0178",
    "name": "스위트 파르페",
    "slot": "showHead",
    "category": "투구",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "80회차",
      "스위트",
      "파르페"
    ]
  },
  {
    "id": "av_0179",
    "name": "핑크 아이돌 가발",
    "slot": "showFoot",
    "category": "투구",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "80회차",
      "핑크",
      "아이돌",
      "가발"
    ]
  },
  {
    "id": "av_0180",
    "name": "하늘꽃 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "80회차",
      "하늘꽃",
      "헤어밴드"
    ]
  },
  {
    "id": "av_0181",
    "name": "근엄한 마녀",
    "slot": "showHead",
    "category": "머리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "80회차",
      "근엄한",
      "마녀"
    ]
  },
  {
    "id": "av_0182",
    "name": "메모리얼 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "80회차",
      "메모리얼",
      "스카프"
    ]
  },
  {
    "id": "av_0183",
    "name": "큐트 익스플로전",
    "slot": "showHead",
    "category": "머리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "80회차",
      "큐트",
      "익스플로전"
    ]
  },
  {
    "id": "av_0184",
    "name": "풍경 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "80회차",
      "풍경",
      "귀걸이"
    ]
  },
  {
    "id": "av_0185",
    "name": "핑크 아이돌 리본타이",
    "slot": "showHead",
    "category": "머리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "80회차",
      "핑크",
      "아이돌",
      "리본타이"
    ]
  },
  {
    "id": "av_0186",
    "name": "봉인 마술 서적",
    "slot": "showArmor",
    "category": "몸",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "80회차",
      "봉인",
      "마술",
      "서적"
    ]
  },
  {
    "id": "av_0187",
    "name": "분홍 꽃모양 클로크",
    "slot": "showArmor",
    "category": "몸",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "80회차",
      "분홍",
      "꽃모양",
      "클로크"
    ]
  },
  {
    "id": "av_0188",
    "name": "전설속 여우 꼬리 장식",
    "slot": "showBack",
    "category": "몸",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "80회차",
      "전설속",
      "여우",
      "꼬리",
      "장식"
    ]
  },
  {
    "id": "av_0189",
    "name": "핑크 아이돌 버슬 스커트",
    "slot": "showArmor",
    "category": "몸",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "80회차",
      "핑크",
      "아이돌",
      "버슬",
      "스커트"
    ]
  },
  {
    "id": "av_0190",
    "name": "하늘 마녀 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "80회차",
      "하늘",
      "마녀",
      "망토"
    ]
  },
  {
    "id": "av_0191",
    "name": "나들이 세트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "80회차",
      "나들이",
      "세트",
      "발자국"
    ]
  },
  {
    "id": "av_0192",
    "name": "넘어진 젠가 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "80회차",
      "넘어진",
      "젠가",
      "발자국"
    ]
  },
  {
    "id": "av_0193",
    "name": "블루 파스텔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "80회차",
      "블루",
      "파스텔",
      "발자국"
    ]
  },
  {
    "id": "av_0194",
    "name": "알록 별 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "80회차",
      "알록",
      "발자국"
    ]
  },
  {
    "id": "av_0195",
    "name": "풍성 식물 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "80회차",
      "풍성",
      "식물",
      "발자국"
    ]
  },
  {
    "id": "av_0196",
    "name": "구름 번개삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "80회차",
      "구름",
      "번개삐"
    ]
  },
  {
    "id": "av_0197",
    "name": "떨어지는 돌",
    "slot": "showEffect",
    "category": "효과",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "80회차",
      "떨어지는"
    ]
  },
  {
    "id": "av_0198",
    "name": "스위트 파라솔",
    "slot": "showEffect",
    "category": "효과",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "80회차",
      "스위트",
      "파라솔"
    ]
  },
  {
    "id": "av_0199",
    "name": "어둠 마법진",
    "slot": "showEffect",
    "category": "효과",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "80회차",
      "어둠",
      "마법진"
    ]
  },
  {
    "id": "av_0200",
    "name": "젤리삐 소원 나무",
    "slot": "showEffect",
    "category": "효과",
    "round": "80회차",
    "tab": "76회차~80회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "80회차",
      "젤리삐",
      "소원",
      "나무"
    ]
  },
  {
    "id": "av_0201",
    "name": "고양이 발 헤어핀",
    "slot": "showFoot",
    "category": "투구",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "71회차",
      "고양이",
      "헤어핀"
    ]
  },
  {
    "id": "av_0202",
    "name": "레몬 밀짚모자",
    "slot": "showHead",
    "category": "투구",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "71회차",
      "레몬",
      "밀짚모자"
    ]
  },
  {
    "id": "av_0203",
    "name": "화사한 꽃장식",
    "slot": "showHead",
    "category": "투구",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "71회차",
      "화사한",
      "꽃장식"
    ]
  },
  {
    "id": "av_0204",
    "name": "아이밴드 밀리터리 캡",
    "slot": "showHead",
    "category": "투구",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "71회차",
      "아이밴드",
      "밀리터리"
    ]
  },
  {
    "id": "av_0205",
    "name": "천상의 관",
    "slot": "showArmor",
    "category": "투구",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "71회차",
      "천상의"
    ]
  },
  {
    "id": "av_0206",
    "name": "고양이 방울 리본",
    "slot": "showHead",
    "category": "머리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "71회차",
      "고양이",
      "방울",
      "리본"
    ]
  },
  {
    "id": "av_0207",
    "name": "메이드 에이프런",
    "slot": "showHead",
    "category": "머리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "71회차",
      "메이드",
      "에이프런"
    ]
  },
  {
    "id": "av_0208",
    "name": "3자 입",
    "slot": "showHead",
    "category": "머리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "71회차",
      "3자"
    ]
  },
  {
    "id": "av_0209",
    "name": "산쵸 수염",
    "slot": "showFace",
    "category": "머리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "71회차",
      "산쵸",
      "수염"
    ]
  },
  {
    "id": "av_0210",
    "name": "밀키웨이 스타 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "71회차",
      "밀키웨이",
      "스타",
      "머플러"
    ]
  },
  {
    "id": "av_0211",
    "name": "산뜻한 고양이 자켓",
    "slot": "showArmor",
    "category": "몸",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "71회차",
      "산뜻한",
      "고양이",
      "자켓"
    ]
  },
  {
    "id": "av_0212",
    "name": "우아한 나들이",
    "slot": "showArmor",
    "category": "몸",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "71회차",
      "우아한",
      "나들이"
    ]
  },
  {
    "id": "av_0213",
    "name": "은하수 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "71회차",
      "은하수",
      "망토"
    ]
  },
  {
    "id": "av_0214",
    "name": "하얀 호른",
    "slot": "showArmor",
    "category": "몸",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "71회차",
      "하얀",
      "호른"
    ]
  },
  {
    "id": "av_0215",
    "name": "천상의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "71회차",
      "천상의",
      "날개"
    ]
  },
  {
    "id": "av_0216",
    "name": "야옹이 발인사 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "71회차",
      "야옹이",
      "발인사",
      "발자국"
    ]
  },
  {
    "id": "av_0217",
    "name": "놀이터 고양이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "71회차",
      "놀이터",
      "고양이",
      "발자국"
    ]
  },
  {
    "id": "av_0218",
    "name": "다크블루 파스텔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "71회차",
      "다크블루",
      "파스텔",
      "발자국"
    ]
  },
  {
    "id": "av_0219",
    "name": "탄산음료 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "71회차",
      "탄산음료",
      "발자국"
    ]
  },
  {
    "id": "av_0220",
    "name": "회 한 접시 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "71회차",
      "접시",
      "발자국"
    ]
  },
  {
    "id": "av_0221",
    "name": "달밤의 유령",
    "slot": "showEffect",
    "category": "효과",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "71회차",
      "달밤의",
      "유령"
    ]
  },
  {
    "id": "av_0222",
    "name": "밤하늘 별똥별",
    "slot": "showEffect",
    "category": "효과",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "71회차",
      "밤하늘",
      "별똥별"
    ]
  },
  {
    "id": "av_0223",
    "name": "심연의 바다",
    "slot": "showEffect",
    "category": "효과",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "71회차",
      "심연의",
      "바다"
    ]
  },
  {
    "id": "av_0224",
    "name": "스위트 도넛",
    "slot": "showEffect",
    "category": "효과",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "71회차",
      "스위트",
      "도넛"
    ]
  },
  {
    "id": "av_0225",
    "name": "멜트 다운",
    "slot": "showEffect",
    "category": "효과",
    "round": "71회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "71회차",
      "멜트",
      "다운"
    ]
  },
  {
    "id": "av_0226",
    "name": "비단 술장식 뱃씨",
    "slot": "showHead",
    "category": "투구",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "72회차",
      "비단",
      "술장식",
      "뱃씨"
    ]
  },
  {
    "id": "av_0227",
    "name": "꽃장식 뱃씨",
    "slot": "showHead",
    "category": "투구",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "72회차",
      "꽃장식",
      "뱃씨"
    ]
  },
  {
    "id": "av_0228",
    "name": "자색 전모",
    "slot": "showHead",
    "category": "투구",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "72회차",
      "자색",
      "전모"
    ]
  },
  {
    "id": "av_0229",
    "name": "청색 비단 남바위",
    "slot": "showHead",
    "category": "투구",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "72회차",
      "청색",
      "비단",
      "남바위"
    ]
  },
  {
    "id": "av_0230",
    "name": "전통 갓",
    "slot": "showHead",
    "category": "투구",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "72회차",
      "전통"
    ]
  },
  {
    "id": "av_0231",
    "name": "도령 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "72회차",
      "도령",
      "모자"
    ]
  },
  {
    "id": "av_0232",
    "name": "방랑시인 삿갓",
    "slot": "showHead",
    "category": "투구",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "72회차",
      "방랑시인",
      "삿갓"
    ]
  },
  {
    "id": "av_0233",
    "name": "꽃놀이 머리꽂이",
    "slot": "showHead",
    "category": "머리",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "72회차",
      "꽃놀이",
      "머리꽂이"
    ]
  },
  {
    "id": "av_0234",
    "name": "펜듈럼 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "72회차",
      "펜듈럼",
      "귀걸이"
    ]
  },
  {
    "id": "av_0235",
    "name": "레몬 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "72회차",
      "레몬",
      "스카프"
    ]
  },
  {
    "id": "av_0236",
    "name": "물동이 지게",
    "slot": "showArmor",
    "category": "몸",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "72회차",
      "물동이",
      "지게"
    ]
  },
  {
    "id": "av_0237",
    "name": "술항아리",
    "slot": "showArmor",
    "category": "몸",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "72회차",
      "술항아리"
    ]
  },
  {
    "id": "av_0238",
    "name": "가을 풍경",
    "slot": "showArmor",
    "category": "몸",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "72회차",
      "가을",
      "풍경"
    ]
  },
  {
    "id": "av_0239",
    "name": "전통도검",
    "slot": "showArmor",
    "category": "몸",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "72회차",
      "전통도검"
    ]
  },
  {
    "id": "av_0240",
    "name": "황금 매화 나뭇가지",
    "slot": "showArmor",
    "category": "몸",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "72회차",
      "황금",
      "매화",
      "나뭇가지"
    ]
  },
  {
    "id": "av_0241",
    "name": "깃발 젤리삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "72회차",
      "깃발",
      "젤리삐",
      "발자국"
    ]
  },
  {
    "id": "av_0242",
    "name": "천하대장군 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "72회차",
      "천하대장군",
      "발자국"
    ]
  },
  {
    "id": "av_0243",
    "name": "돈 나와라 뚝딱 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "72회차",
      "나와라",
      "뚝딱",
      "발자국"
    ]
  },
  {
    "id": "av_0244",
    "name": "불똥이 퐁퐁 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "72회차",
      "불똥이",
      "퐁퐁",
      "발자국"
    ]
  },
  {
    "id": "av_0245",
    "name": "피어나는 연꽃 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "72회차",
      "피어나는",
      "연꽃",
      "발자국"
    ]
  },
  {
    "id": "av_0246",
    "name": "대나무 숲 향기",
    "slot": "showEffect",
    "category": "효과",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "72회차",
      "대나무",
      "향기"
    ]
  },
  {
    "id": "av_0247",
    "name": "닭 모이 먹는 시간",
    "slot": "showEffect",
    "category": "효과",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "72회차",
      "모이",
      "먹는",
      "시간"
    ]
  },
  {
    "id": "av_0248",
    "name": "연날리기",
    "slot": "showEffect",
    "category": "효과",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "72회차",
      "연날리기"
    ]
  },
  {
    "id": "av_0249",
    "name": "장미 마법진",
    "slot": "showEffect",
    "category": "효과",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "72회차",
      "장미",
      "마법진"
    ]
  },
  {
    "id": "av_0250",
    "name": "아름다운 선율",
    "slot": "showEffect",
    "category": "효과",
    "round": "72회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "72회차",
      "아름다운",
      "선율"
    ]
  },
  {
    "id": "av_0251",
    "name": "잘 익은 호박 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "73회차",
      "익은",
      "호박",
      "모자"
    ]
  },
  {
    "id": "av_0252",
    "name": "호박 마녀 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "73회차",
      "호박",
      "마녀",
      "모자"
    ]
  },
  {
    "id": "av_0253",
    "name": "잘 익은 밤송이 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "73회차",
      "익은",
      "밤송이",
      "모자"
    ]
  },
  {
    "id": "av_0254",
    "name": "할로윈 리본 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "73회차",
      "할로윈",
      "리본",
      "머리띠"
    ]
  },
  {
    "id": "av_0255",
    "name": "익선관",
    "slot": "showHead",
    "category": "투구",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "73회차",
      "익선관"
    ]
  },
  {
    "id": "av_0256",
    "name": "잘 익은 호박 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "73회차",
      "익은",
      "호박",
      "케이프"
    ]
  },
  {
    "id": "av_0257",
    "name": "호박 마녀 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "73회차",
      "호박",
      "마녀",
      "케이프"
    ]
  },
  {
    "id": "av_0258",
    "name": "도토리 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "73회차",
      "도토리",
      "케이프"
    ]
  },
  {
    "id": "av_0259",
    "name": "블러드 플로우",
    "slot": "showHead",
    "category": "머리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "73회차",
      "블러드",
      "플로우"
    ]
  },
  {
    "id": "av_0260",
    "name": "풍선껌 안경",
    "slot": "showBack",
    "category": "머리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "73회차",
      "풍선껌",
      "안경"
    ]
  },
  {
    "id": "av_0261",
    "name": "화려한 검은 깃털 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "73회차",
      "화려한",
      "검은",
      "깃털",
      "망토"
    ]
  },
  {
    "id": "av_0262",
    "name": "할로윈 금빛 빗자루",
    "slot": "showBack",
    "category": "몸",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "73회차",
      "할로윈",
      "금빛",
      "빗자루"
    ]
  },
  {
    "id": "av_0263",
    "name": "댕댕이 호두",
    "slot": "showArmor",
    "category": "몸",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "73회차",
      "댕댕이",
      "호두"
    ]
  },
  {
    "id": "av_0264",
    "name": "로즈 데빌 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "73회차",
      "로즈",
      "데빌"
    ]
  },
  {
    "id": "av_0265",
    "name": "곤룡포",
    "slot": "showArmor",
    "category": "몸",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "73회차",
      "곤룡포"
    ]
  },
  {
    "id": "av_0266",
    "name": "귀신삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "73회차",
      "귀신삐",
      "발자국"
    ]
  },
  {
    "id": "av_0267",
    "name": "장미검 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "73회차",
      "장미검",
      "발자국"
    ]
  },
  {
    "id": "av_0268",
    "name": "장미 큐브 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "73회차",
      "장미",
      "큐브",
      "발자국"
    ]
  },
  {
    "id": "av_0269",
    "name": "무지개 스프링 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "73회차",
      "무지개",
      "스프링",
      "발자국"
    ]
  },
  {
    "id": "av_0270",
    "name": "한글 자음 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "73회차",
      "한글",
      "자음",
      "발자국"
    ]
  },
  {
    "id": "av_0271",
    "name": "달밤의 드라큘라 성",
    "slot": "showEffect",
    "category": "효과",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "73회차",
      "달밤의",
      "드라큘라"
    ]
  },
  {
    "id": "av_0272",
    "name": "젤리삐 모험가 파티",
    "slot": "showEffect",
    "category": "효과",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "73회차",
      "젤리삐",
      "모험가",
      "파티"
    ]
  },
  {
    "id": "av_0273",
    "name": "할로윈 가을빛 우산",
    "slot": "showEffect",
    "category": "효과",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "73회차",
      "할로윈",
      "가을빛",
      "우산"
    ]
  },
  {
    "id": "av_0274",
    "name": "불타는 용암대지",
    "slot": "showEffect",
    "category": "효과",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "73회차",
      "불타는",
      "용암대지"
    ]
  },
  {
    "id": "av_0275",
    "name": "달맞이 호롱",
    "slot": "showEffect",
    "category": "효과",
    "round": "73회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "73회차",
      "달맞이",
      "호롱"
    ]
  },
  {
    "id": "av_0276",
    "name": "두루미 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "74회차",
      "두루미",
      "모자"
    ]
  },
  {
    "id": "av_0277",
    "name": "코스모스 머리 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "74회차",
      "코스모스",
      "머리",
      "장식"
    ]
  },
  {
    "id": "av_0278",
    "name": "해바라기 한송이",
    "slot": "showHead",
    "category": "투구",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "74회차",
      "해바라기",
      "한송이"
    ]
  },
  {
    "id": "av_0279",
    "name": "블랙 헌팅캡",
    "slot": "showHead",
    "category": "투구",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "74회차",
      "블랙",
      "헌팅캡"
    ]
  },
  {
    "id": "av_0280",
    "name": "인디언 울프 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "74회차",
      "인디언",
      "울프"
    ]
  },
  {
    "id": "av_0281",
    "name": "두루미 깃털 장식",
    "slot": "showHead",
    "category": "머리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "74회차",
      "두루미",
      "깃털",
      "장식"
    ]
  },
  {
    "id": "av_0282",
    "name": "얼룩 야옹이 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "74회차",
      "얼룩",
      "야옹이",
      "머플러"
    ]
  },
  {
    "id": "av_0283",
    "name": "핑크 토끼 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "74회차",
      "핑크",
      "토끼",
      "귀걸이"
    ]
  },
  {
    "id": "av_0284",
    "name": "깃털 블랙 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "74회차",
      "깃털",
      "블랙",
      "케이프"
    ]
  },
  {
    "id": "av_0285",
    "name": "인디언 울프 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "74회차",
      "인디언",
      "울프",
      "케이프"
    ]
  },
  {
    "id": "av_0286",
    "name": "두루미 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "74회차",
      "두루미",
      "날개"
    ]
  },
  {
    "id": "av_0287",
    "name": "화이트 밀리터리 유니폼",
    "slot": "showArmor",
    "category": "몸",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "74회차",
      "화이트",
      "밀리터리",
      "유니폼"
    ]
  },
  {
    "id": "av_0288",
    "name": "어부바 백곰",
    "slot": "showArmor",
    "category": "몸",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "74회차",
      "어부바",
      "백곰"
    ]
  },
  {
    "id": "av_0289",
    "name": "타락천사의 날개옷",
    "slot": "showBack",
    "category": "몸",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "74회차",
      "타락천사의",
      "날개옷"
    ]
  },
  {
    "id": "av_0290",
    "name": "인디언 울프 드레스",
    "slot": "showArmor",
    "category": "몸",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "74회차",
      "인디언",
      "울프",
      "드레스"
    ]
  },
  {
    "id": "av_0291",
    "name": "왜가리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "74회차",
      "왜가리",
      "발자국"
    ]
  },
  {
    "id": "av_0292",
    "name": "수학 천재 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "74회차",
      "수학",
      "천재",
      "발자국"
    ]
  },
  {
    "id": "av_0293",
    "name": "빛의 파동 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "74회차",
      "빛의",
      "파동",
      "발자국"
    ]
  },
  {
    "id": "av_0294",
    "name": "빛나는 잎사귀 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "74회차",
      "빛나는",
      "잎사귀",
      "발자국"
    ]
  },
  {
    "id": "av_0295",
    "name": "옐로우 파스텔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "74회차",
      "옐로우",
      "파스텔",
      "발자국"
    ]
  },
  {
    "id": "av_0296",
    "name": "오물오물 기니피그",
    "slot": "showEffect",
    "category": "효과",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "74회차",
      "오물오물",
      "기니피그"
    ]
  },
  {
    "id": "av_0297",
    "name": "빛나는 존재감",
    "slot": "showEffect",
    "category": "효과",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "74회차",
      "빛나는",
      "존재감"
    ]
  },
  {
    "id": "av_0298",
    "name": "레인보우 바람개비",
    "slot": "showEffect",
    "category": "효과",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "74회차",
      "레인보우",
      "바람개비"
    ]
  },
  {
    "id": "av_0299",
    "name": "가을의 휴식",
    "slot": "showEffect",
    "category": "효과",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "74회차",
      "가을의",
      "휴식"
    ]
  },
  {
    "id": "av_0300",
    "name": "낙엽 침대",
    "slot": "showEffect",
    "category": "효과",
    "round": "74회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "74회차",
      "낙엽",
      "침대"
    ]
  },
  {
    "id": "av_0301",
    "name": "고양이 고스로리 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "75회차",
      "고양이",
      "고스로리",
      "헤어밴드"
    ]
  },
  {
    "id": "av_0302",
    "name": "순수 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "75회차",
      "순수",
      "베레모"
    ]
  },
  {
    "id": "av_0303",
    "name": "핑크 리본 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "75회차",
      "핑크",
      "리본",
      "머리띠"
    ]
  },
  {
    "id": "av_0304",
    "name": "크리스탈 티아라",
    "slot": "showHead",
    "category": "투구",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "75회차",
      "크리스탈",
      "티아라"
    ]
  },
  {
    "id": "av_0305",
    "name": "크리스마스 장식뿔",
    "slot": "showHead",
    "category": "투구",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "75회차",
      "크리스마스",
      "장식뿔"
    ]
  },
  {
    "id": "av_0306",
    "name": "고양이 고스로리 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "75회차",
      "고양이",
      "고스로리",
      "케이프"
    ]
  },
  {
    "id": "av_0307",
    "name": "핑크 리본 목도리",
    "slot": "showHead",
    "category": "머리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "75회차",
      "핑크",
      "리본",
      "목도리"
    ]
  },
  {
    "id": "av_0308",
    "name": "핑크 리본 방울 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "75회차",
      "핑크",
      "리본",
      "방울",
      "귀걸이"
    ]
  },
  {
    "id": "av_0309",
    "name": "눈꽃송이 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "75회차",
      "눈꽃송이",
      "귀걸이"
    ]
  },
  {
    "id": "av_0310",
    "name": "펑크 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "75회차",
      "펑크",
      "스카프"
    ]
  },
  {
    "id": "av_0311",
    "name": "고양이 고스로리 드레스",
    "slot": "showArmor",
    "category": "몸",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "75회차",
      "고양이",
      "고스로리",
      "드레스"
    ]
  },
  {
    "id": "av_0312",
    "name": "순수 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "75회차",
      "순수",
      "망토"
    ]
  },
  {
    "id": "av_0313",
    "name": "와일드 블랙 후드 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "75회차",
      "와일드",
      "블랙",
      "후드",
      "코트"
    ]
  },
  {
    "id": "av_0314",
    "name": "타탄체크 백팩",
    "slot": "showBack",
    "category": "몸",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "75회차",
      "타탄체크",
      "백팩"
    ]
  },
  {
    "id": "av_0315",
    "name": "화이트 스노우 날개옷",
    "slot": "showBack",
    "category": "몸",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "75회차",
      "화이트",
      "스노우",
      "날개옷"
    ]
  },
  {
    "id": "av_0316",
    "name": "뾰로롱 팝 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "75회차",
      "뾰로롱",
      "발자국"
    ]
  },
  {
    "id": "av_0317",
    "name": "산타 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "75회차",
      "산타",
      "발자국"
    ]
  },
  {
    "id": "av_0318",
    "name": "크리스마스 촛불 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "75회차",
      "크리스마스",
      "촛불",
      "발자국"
    ]
  },
  {
    "id": "av_0319",
    "name": "푸딩 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "75회차",
      "푸딩",
      "발자국"
    ]
  },
  {
    "id": "av_0320",
    "name": "하트 시그널 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "75회차",
      "하트",
      "시그널",
      "발자국"
    ]
  },
  {
    "id": "av_0321",
    "name": "100% 파워",
    "slot": "showEffect",
    "category": "효과",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "75회차",
      "100%",
      "파워"
    ]
  },
  {
    "id": "av_0322",
    "name": "크리스마스 스노우볼",
    "slot": "showEffect",
    "category": "효과",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "75회차",
      "크리스마스",
      "스노우볼"
    ]
  },
  {
    "id": "av_0323",
    "name": "겨울 왕국 스노우볼",
    "slot": "showEffect",
    "category": "효과",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "75회차",
      "겨울",
      "왕국",
      "스노우볼"
    ]
  },
  {
    "id": "av_0324",
    "name": "대왕 곰인형",
    "slot": "showEffect",
    "category": "효과",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "75회차",
      "대왕",
      "곰인형"
    ]
  },
  {
    "id": "av_0325",
    "name": "솔로 크리스마스 하우스",
    "slot": "showEffect",
    "category": "효과",
    "round": "75회차",
    "tab": "71회차~75회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "75회차",
      "솔로",
      "크리스마스",
      "하우스"
    ]
  },
  {
    "id": "av_0326",
    "name": "별장식 쿠키앤크림 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "66회차",
      "별장식",
      "쿠키앤크림",
      "머리띠"
    ]
  },
  {
    "id": "av_0327",
    "name": "슈가 핑크 칵테일 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "66회차",
      "슈가",
      "핑크",
      "칵테일"
    ]
  },
  {
    "id": "av_0328",
    "name": "별밤 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "66회차",
      "별밤",
      "베레모"
    ]
  },
  {
    "id": "av_0329",
    "name": "사이버캣 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "66회차",
      "사이버캣",
      "후드"
    ]
  },
  {
    "id": "av_0330",
    "name": "하늘신의 왕관",
    "slot": "showHead",
    "category": "투구",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "66회차",
      "하늘신의",
      "왕관"
    ]
  },
  {
    "id": "av_0331",
    "name": "하트 초커",
    "slot": "showHead",
    "category": "머리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "66회차",
      "하트",
      "초커"
    ]
  },
  {
    "id": "av_0332",
    "name": "키스 마크",
    "slot": "showHead",
    "category": "머리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "66회차",
      "키스",
      "마크"
    ]
  },
  {
    "id": "av_0333",
    "name": "별밤 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "66회차",
      "별밤",
      "케이프"
    ]
  },
  {
    "id": "av_0334",
    "name": "사이버캣 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "66회차",
      "사이버캣",
      "머플러"
    ]
  },
  {
    "id": "av_0335",
    "name": "콧수염 안경",
    "slot": "showFace",
    "category": "머리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "66회차",
      "콧수염",
      "안경"
    ]
  },
  {
    "id": "av_0336",
    "name": "사랑에 빠진 캔디",
    "slot": "showArmor",
    "category": "몸",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "66회차",
      "사랑에",
      "빠진",
      "캔디"
    ]
  },
  {
    "id": "av_0337",
    "name": "초코 엔젤",
    "slot": "showArmor",
    "category": "몸",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "66회차",
      "초코",
      "엔젤"
    ]
  },
  {
    "id": "av_0338",
    "name": "팬텀 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "66회차",
      "팬텀"
    ]
  },
  {
    "id": "av_0339",
    "name": "사이버캣 후드 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "66회차",
      "사이버캣",
      "후드",
      "코트"
    ]
  },
  {
    "id": "av_0340",
    "name": "하늘신의 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "66회차",
      "하늘신의",
      "망토"
    ]
  },
  {
    "id": "av_0341",
    "name": "초코 러브 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "66회차",
      "초코",
      "러브",
      "발자국"
    ]
  },
  {
    "id": "av_0342",
    "name": "하트 폭탄 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "66회차",
      "하트",
      "폭탄",
      "발자국"
    ]
  },
  {
    "id": "av_0343",
    "name": "운석 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "66회차",
      "운석",
      "발자국"
    ]
  },
  {
    "id": "av_0344",
    "name": "심술 고양이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "66회차",
      "심술",
      "고양이",
      "발자국"
    ]
  },
  {
    "id": "av_0345",
    "name": "물고기자리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "66회차",
      "물고기자리",
      "발자국"
    ]
  },
  {
    "id": "av_0346",
    "name": "팬케이크 판타지",
    "slot": "showEffect",
    "category": "효과",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "66회차",
      "팬케이크",
      "판타지"
    ]
  },
  {
    "id": "av_0347",
    "name": "러브 그래비티",
    "slot": "showEffect",
    "category": "효과",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "66회차",
      "러브",
      "그래비티"
    ]
  },
  {
    "id": "av_0348",
    "name": "금지된 의식",
    "slot": "showEffect",
    "category": "효과",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "66회차",
      "금지된",
      "의식"
    ]
  },
  {
    "id": "av_0349",
    "name": "오를란느 마법석",
    "slot": "showEffect",
    "category": "효과",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "66회차",
      "오를란느",
      "마법석"
    ]
  },
  {
    "id": "av_0350",
    "name": "하늘신의 가호",
    "slot": "showEffect",
    "category": "효과",
    "round": "66회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "66회차",
      "하늘신의",
      "가호"
    ]
  },
  {
    "id": "av_0351",
    "name": "리프 젤리삐 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "67회차",
      "리프",
      "젤리삐",
      "베레모"
    ]
  },
  {
    "id": "av_0352",
    "name": "로얄 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "67회차",
      "로얄",
      "크라운"
    ]
  },
  {
    "id": "av_0353",
    "name": "플라워 토끼 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "67회차",
      "플라워",
      "토끼",
      "머리띠"
    ]
  },
  {
    "id": "av_0354",
    "name": "리틀 엔젤 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "67회차",
      "리틀",
      "엔젤",
      "헤어밴드"
    ]
  },
  {
    "id": "av_0355",
    "name": "데빌 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "67회차",
      "데빌",
      "후드"
    ]
  },
  {
    "id": "av_0356",
    "name": "띠용",
    "slot": "showHead",
    "category": "머리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "67회차",
      "띠용"
    ]
  },
  {
    "id": "av_0357",
    "name": "클래식 프릴 리본 카라",
    "slot": "showHead",
    "category": "머리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "67회차",
      "클래식",
      "프릴",
      "리본",
      "카라"
    ]
  },
  {
    "id": "av_0358",
    "name": "솜사탕 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "67회차",
      "솜사탕",
      "스카프"
    ]
  },
  {
    "id": "av_0359",
    "name": "어깨 위 니트",
    "slot": "showHead",
    "category": "머리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "67회차",
      "어깨",
      "니트"
    ]
  },
  {
    "id": "av_0360",
    "name": "왕눈이 안경",
    "slot": "showFace",
    "category": "머리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "67회차",
      "왕눈이",
      "안경"
    ]
  },
  {
    "id": "av_0361",
    "name": "리프 젤리삐 스쿨백",
    "slot": "showArmor",
    "category": "몸",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "67회차",
      "리프",
      "젤리삐",
      "스쿨백"
    ]
  },
  {
    "id": "av_0362",
    "name": "찬란한 날개옷",
    "slot": "showBack",
    "category": "몸",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "67회차",
      "찬란한",
      "날개옷"
    ]
  },
  {
    "id": "av_0363",
    "name": "리틀 엔젤 날개 드레스",
    "slot": "showBack",
    "category": "몸",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "67회차",
      "리틀",
      "엔젤",
      "날개",
      "드레스"
    ]
  },
  {
    "id": "av_0364",
    "name": "사이버 소드",
    "slot": "showSubArms",
    "category": "몸",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "67회차",
      "사이버",
      "소드"
    ]
  },
  {
    "id": "av_0365",
    "name": "데빌 턱시도",
    "slot": "showArmor",
    "category": "몸",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "67회차",
      "데빌",
      "턱시도"
    ]
  },
  {
    "id": "av_0366",
    "name": "입학생 리프 젤리삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "67회차",
      "입학생",
      "리프",
      "젤리삐",
      "발자국"
    ]
  },
  {
    "id": "av_0367",
    "name": "블랙데이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "67회차",
      "블랙데이",
      "발자국"
    ]
  },
  {
    "id": "av_0368",
    "name": "와르르 연필 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "67회차",
      "와르르",
      "연필",
      "발자국"
    ]
  },
  {
    "id": "av_0369",
    "name": "우수수 팝콘 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "67회차",
      "우수수",
      "팝콘",
      "발자국"
    ]
  },
  {
    "id": "av_0370",
    "name": "브로큰 하트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "67회차",
      "브로큰",
      "하트",
      "발자국"
    ]
  },
  {
    "id": "av_0371",
    "name": "트윙클 슈팅스타",
    "slot": "showEffect",
    "category": "효과",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "67회차",
      "트윙클",
      "슈팅스타"
    ]
  },
  {
    "id": "av_0372",
    "name": "기력 상승",
    "slot": "showEffect",
    "category": "효과",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "67회차",
      "기력",
      "상승"
    ]
  },
  {
    "id": "av_0373",
    "name": "신비한 마법책",
    "slot": "showEffect",
    "category": "효과",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "67회차",
      "신비한",
      "마법책"
    ]
  },
  {
    "id": "av_0374",
    "name": "열정 드러머 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "67회차",
      "열정",
      "드러머",
      "젤리삐"
    ]
  },
  {
    "id": "av_0375",
    "name": "안락한 허바리움",
    "slot": "showEffect",
    "category": "효과",
    "round": "67회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "67회차",
      "안락한",
      "허바리움"
    ]
  },
  {
    "id": "av_0376",
    "name": "레이디 키티 리틀 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "68회차",
      "레이디",
      "키티",
      "리틀",
      "크라운"
    ]
  },
  {
    "id": "av_0377",
    "name": "토끼 귀 꽃모자",
    "slot": "showHead",
    "category": "투구",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "68회차",
      "토끼",
      "꽃모자"
    ]
  },
  {
    "id": "av_0378",
    "name": "플라워 메이드 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "68회차",
      "플라워",
      "메이드",
      "헤어밴드"
    ]
  },
  {
    "id": "av_0379",
    "name": "빼꼼 고양이 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "68회차",
      "빼꼼",
      "고양이"
    ]
  },
  {
    "id": "av_0380",
    "name": "버터플라이 리본",
    "slot": "showHead",
    "category": "투구",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "68회차",
      "버터플라이",
      "리본"
    ]
  },
  {
    "id": "av_0381",
    "name": "레이디 키티 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "68회차",
      "레이디",
      "키티",
      "케이프"
    ]
  },
  {
    "id": "av_0382",
    "name": "슬픔",
    "slot": "showHead",
    "category": "머리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "68회차",
      "슬픔"
    ]
  },
  {
    "id": "av_0383",
    "name": "플라워 메이드 카라",
    "slot": "showHead",
    "category": "머리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "68회차",
      "플라워",
      "메이드",
      "카라"
    ]
  },
  {
    "id": "av_0384",
    "name": "한 송이 장미",
    "slot": "showHead",
    "category": "머리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "68회차",
      "송이",
      "장미"
    ]
  },
  {
    "id": "av_0385",
    "name": "블러드 데몬 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "68회차",
      "블러드",
      "데몬",
      "머플러"
    ]
  },
  {
    "id": "av_0386",
    "name": "레이디 키티 드레스",
    "slot": "showArmor",
    "category": "몸",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "68회차",
      "레이디",
      "키티",
      "드레스"
    ]
  },
  {
    "id": "av_0387",
    "name": "로즈 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "68회차",
      "로즈"
    ]
  },
  {
    "id": "av_0388",
    "name": "플라워 메이드 스커트",
    "slot": "showArmor",
    "category": "몸",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "68회차",
      "플라워",
      "메이드",
      "스커트"
    ]
  },
  {
    "id": "av_0389",
    "name": "밤의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "68회차",
      "밤의",
      "날개"
    ]
  },
  {
    "id": "av_0390",
    "name": "블러드 데몬 소드",
    "slot": "showSubArms",
    "category": "몸",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "68회차",
      "블러드",
      "데몬",
      "소드"
    ]
  },
  {
    "id": "av_0391",
    "name": "바나나 고양이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "68회차",
      "바나나",
      "고양이",
      "발자국"
    ]
  },
  {
    "id": "av_0392",
    "name": "행복한 클로버 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "68회차",
      "행복한",
      "클로버",
      "발자국"
    ]
  },
  {
    "id": "av_0393",
    "name": "도깨비불 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "68회차",
      "도깨비불",
      "발자국"
    ]
  },
  {
    "id": "av_0394",
    "name": "요란한 알람시계 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "68회차",
      "요란한",
      "알람시계",
      "발자국"
    ]
  },
  {
    "id": "av_0395",
    "name": "데굴데굴 휴지 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "68회차",
      "데굴데굴",
      "휴지",
      "발자국"
    ]
  },
  {
    "id": "av_0396",
    "name": "이스터 에그 피크닉",
    "slot": "showEffect",
    "category": "효과",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "68회차",
      "이스터",
      "에그",
      "피크닉"
    ]
  },
  {
    "id": "av_0397",
    "name": "나비 꽃바람",
    "slot": "showEffect",
    "category": "효과",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "68회차",
      "나비",
      "꽃바람"
    ]
  },
  {
    "id": "av_0398",
    "name": "쇼타임",
    "slot": "showEffect",
    "category": "효과",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "68회차",
      "쇼타임"
    ]
  },
  {
    "id": "av_0399",
    "name": "사이버 스페이스",
    "slot": "showEffect",
    "category": "효과",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "68회차",
      "사이버",
      "스페이스"
    ]
  },
  {
    "id": "av_0400",
    "name": "치킨생각",
    "slot": "showEffect",
    "category": "효과",
    "round": "68회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "68회차",
      "치킨생각"
    ]
  },
  {
    "id": "av_0401",
    "name": "고양이 우비",
    "slot": "showHead",
    "category": "투구",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "69회차",
      "고양이",
      "우비"
    ]
  },
  {
    "id": "av_0402",
    "name": "리프 우산 젤리삐",
    "slot": "showEffect",
    "category": "투구",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "69회차",
      "리프",
      "우산",
      "젤리삐"
    ]
  },
  {
    "id": "av_0403",
    "name": "빨간 망토 늑대 후드",
    "slot": "showBack",
    "category": "투구",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "69회차",
      "빨간",
      "망토",
      "늑대",
      "후드"
    ]
  },
  {
    "id": "av_0404",
    "name": "딸기 밀짚모자",
    "slot": "showHead",
    "category": "투구",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "69회차",
      "딸기",
      "밀짚모자"
    ]
  },
  {
    "id": "av_0405",
    "name": "마린 마법사 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "69회차",
      "마린",
      "마법사",
      "베레모"
    ]
  },
  {
    "id": "av_0406",
    "name": "혼돈의 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "69회차",
      "혼돈의",
      "머플러"
    ]
  },
  {
    "id": "av_0407",
    "name": "똘망똘망",
    "slot": "showHead",
    "category": "머리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "69회차",
      "똘망똘망"
    ]
  },
  {
    "id": "av_0408",
    "name": "빨간 망토 늑대 케이프",
    "slot": "showBack",
    "category": "머리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "69회차",
      "빨간",
      "망토",
      "늑대",
      "케이프"
    ]
  },
  {
    "id": "av_0409",
    "name": "마법 원석 귀걸이",
    "slot": "showEffect",
    "category": "머리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "69회차",
      "마법",
      "원석",
      "귀걸이"
    ]
  },
  {
    "id": "av_0410",
    "name": "세일러 프릴 카라",
    "slot": "showHead",
    "category": "머리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "69회차",
      "세일러",
      "프릴",
      "카라"
    ]
  },
  {
    "id": "av_0411",
    "name": "흰색 잉어무늬 셔츠",
    "slot": "showArmor",
    "category": "몸",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "69회차",
      "흰색",
      "잉어무늬",
      "셔츠"
    ]
  },
  {
    "id": "av_0412",
    "name": "버터플라이 로즈",
    "slot": "showArmor",
    "category": "몸",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "69회차",
      "버터플라이",
      "로즈"
    ]
  },
  {
    "id": "av_0413",
    "name": "빨간 망토 늑대 스커트",
    "slot": "showBack",
    "category": "몸",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "69회차",
      "빨간",
      "망토",
      "늑대",
      "스커트"
    ]
  },
  {
    "id": "av_0414",
    "name": "비밀의 화원 열쇠",
    "slot": "showArmor",
    "category": "몸",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "69회차",
      "비밀의",
      "화원",
      "열쇠"
    ]
  },
  {
    "id": "av_0415",
    "name": "마린 마법사 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "69회차",
      "마린",
      "마법사",
      "망토"
    ]
  },
  {
    "id": "av_0416",
    "name": "춤추는 해파리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "69회차",
      "춤추는",
      "해파리",
      "발자국"
    ]
  },
  {
    "id": "av_0417",
    "name": "썸머 알파벳 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "69회차",
      "썸머",
      "알파벳",
      "발자국"
    ]
  },
  {
    "id": "av_0418",
    "name": "독침 발사 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "69회차",
      "독침",
      "발사",
      "발자국"
    ]
  },
  {
    "id": "av_0419",
    "name": "꿈꾸는 우산 발자국",
    "slot": "showEffect",
    "category": "다리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "69회차",
      "꿈꾸는",
      "우산",
      "발자국"
    ]
  },
  {
    "id": "av_0420",
    "name": "폴짝 개구리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "69회차",
      "폴짝",
      "개구리",
      "발자국"
    ]
  },
  {
    "id": "av_0421",
    "name": "번쩍번쩍 번개",
    "slot": "showEffect",
    "category": "효과",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "69회차",
      "번쩍번쩍",
      "번개"
    ]
  },
  {
    "id": "av_0422",
    "name": "빗방울이 뚝뚝",
    "slot": "showEffect",
    "category": "효과",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "69회차",
      "빗방울이",
      "뚝뚝"
    ]
  },
  {
    "id": "av_0423",
    "name": "비오는 날의 개구리 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "69회차",
      "비오는",
      "날의",
      "개구리",
      "젤리삐"
    ]
  },
  {
    "id": "av_0424",
    "name": "개구리 합창단",
    "slot": "showEffect",
    "category": "효과",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "69회차",
      "개구리",
      "합창단"
    ]
  },
  {
    "id": "av_0425",
    "name": "반짝반짝 무지개",
    "slot": "showEffect",
    "category": "효과",
    "round": "69회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "69회차",
      "반짝반짝",
      "무지개"
    ]
  },
  {
    "id": "av_0426",
    "name": "세일러 밀짚모자",
    "slot": "showHead",
    "category": "투구",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "70회차",
      "세일러",
      "밀짚모자"
    ]
  },
  {
    "id": "av_0427",
    "name": "파도 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "70회차",
      "파도",
      "모자"
    ]
  },
  {
    "id": "av_0428",
    "name": "마린 위치 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "70회차",
      "마린",
      "위치"
    ]
  },
  {
    "id": "av_0429",
    "name": "머리 위 팥빙수",
    "slot": "showHead",
    "category": "투구",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "70회차",
      "머리",
      "팥빙수"
    ]
  },
  {
    "id": "av_0430",
    "name": "화이트 챙모자",
    "slot": "showHead",
    "category": "투구",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "70회차",
      "화이트",
      "챙모자"
    ]
  },
  {
    "id": "av_0431",
    "name": "샌드위치 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "70회차",
      "샌드위치",
      "케이프"
    ]
  },
  {
    "id": "av_0432",
    "name": "돌고래 목도리",
    "slot": "showHead",
    "category": "머리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "70회차",
      "돌고래",
      "목도리"
    ]
  },
  {
    "id": "av_0433",
    "name": "카멜레온 목걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "70회차",
      "카멜레온",
      "목걸이"
    ]
  },
  {
    "id": "av_0434",
    "name": "포도송이 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "70회차",
      "포도송이",
      "귀걸이"
    ]
  },
  {
    "id": "av_0435",
    "name": "조개껍질 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "70회차",
      "조개껍질",
      "귀걸이"
    ]
  },
  {
    "id": "av_0436",
    "name": "세일러 자켓",
    "slot": "showArmor",
    "category": "몸",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "70회차",
      "세일러",
      "자켓"
    ]
  },
  {
    "id": "av_0437",
    "name": "파도 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "70회차",
      "파도",
      "날개"
    ]
  },
  {
    "id": "av_0438",
    "name": "마린 위치 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "70회차",
      "마린",
      "위치",
      "망토"
    ]
  },
  {
    "id": "av_0439",
    "name": "매달린 잉어",
    "slot": "showArmor",
    "category": "몸",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "70회차",
      "매달린",
      "잉어"
    ]
  },
  {
    "id": "av_0440",
    "name": "골드핑크 나비날개",
    "slot": "showBack",
    "category": "몸",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "70회차",
      "골드핑크",
      "나비날개"
    ]
  },
  {
    "id": "av_0441",
    "name": "강시삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "70회차",
      "강시삐",
      "발자국"
    ]
  },
  {
    "id": "av_0442",
    "name": "빛기둥 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "70회차",
      "빛기둥",
      "발자국"
    ]
  },
  {
    "id": "av_0443",
    "name": "좀비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "70회차",
      "좀비",
      "발자국"
    ]
  },
  {
    "id": "av_0444",
    "name": "물방울이 퐁퐁 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "70회차",
      "물방울이",
      "퐁퐁",
      "발자국"
    ]
  },
  {
    "id": "av_0445",
    "name": "철퍼덕 아이스크림 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "70회차",
      "철퍼덕",
      "아이스크림",
      "발자국"
    ]
  },
  {
    "id": "av_0446",
    "name": "내 맘대로 홈캉스",
    "slot": "showEffect",
    "category": "효과",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "70회차",
      "맘대로",
      "홈캉스"
    ]
  },
  {
    "id": "av_0447",
    "name": "트와일라잇 비치",
    "slot": "showEffect",
    "category": "효과",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "70회차",
      "트와일라잇",
      "비치"
    ]
  },
  {
    "id": "av_0448",
    "name": "인어 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "70회차",
      "인어",
      "젤리삐"
    ]
  },
  {
    "id": "av_0449",
    "name": "반딧불",
    "slot": "showEffect",
    "category": "효과",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "70회차",
      "반딧불"
    ]
  },
  {
    "id": "av_0450",
    "name": "물오름",
    "slot": "showEffect",
    "category": "효과",
    "round": "70회차",
    "tab": "66~70회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "70회차",
      "물오름"
    ]
  },
  {
    "id": "av_0451",
    "name": "닭머리",
    "slot": "showHead",
    "category": "투구",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "61회차",
      "닭머리"
    ]
  },
  {
    "id": "av_0452",
    "name": "스팀펑크 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "61회차",
      "스팀펑크"
    ]
  },
  {
    "id": "av_0453",
    "name": "백여우 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "61회차",
      "백여우"
    ]
  },
  {
    "id": "av_0454",
    "name": "블루 엔젤링",
    "slot": "showHead",
    "category": "투구",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "61회차",
      "블루",
      "엔젤링"
    ]
  },
  {
    "id": "av_0455",
    "name": "식빵 멍멍이",
    "slot": "showHead",
    "category": "투구",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "61회차",
      "식빵",
      "멍멍이"
    ]
  },
  {
    "id": "av_0456",
    "name": "석류알 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "61회차",
      "석류알",
      "귀걸이"
    ]
  },
  {
    "id": "av_0457",
    "name": "러블리",
    "slot": "showHead",
    "category": "머리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "61회차",
      "러블리"
    ]
  },
  {
    "id": "av_0458",
    "name": "마스크팩",
    "slot": "showFace",
    "category": "머리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "61회차",
      "마스크팩"
    ]
  },
  {
    "id": "av_0459",
    "name": "해바라기",
    "slot": "showHead",
    "category": "머리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "61회차",
      "해바라기"
    ]
  },
  {
    "id": "av_0460",
    "name": "스팀펑크 아이",
    "slot": "showHead",
    "category": "머리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "61회차",
      "스팀펑크",
      "아이"
    ]
  },
  {
    "id": "av_0461",
    "name": "새크리파이스",
    "slot": "showArmor",
    "category": "몸",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "61회차",
      "새크리파이스"
    ]
  },
  {
    "id": "av_0462",
    "name": "슈발리에",
    "slot": "showFoot",
    "category": "몸",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "61회차",
      "슈발리에"
    ]
  },
  {
    "id": "av_0463",
    "name": "스팀펑크 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "61회차",
      "스팀펑크"
    ]
  },
  {
    "id": "av_0464",
    "name": "페이탈 어트랙션",
    "slot": "showArmor",
    "category": "몸",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "61회차",
      "페이탈",
      "어트랙션"
    ]
  },
  {
    "id": "av_0465",
    "name": "블러디 이터",
    "slot": "showArmor",
    "category": "몸",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "61회차",
      "블러디",
      "이터"
    ]
  },
  {
    "id": "av_0466",
    "name": "비밀 장판 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "61회차",
      "비밀",
      "장판",
      "발자국"
    ]
  },
  {
    "id": "av_0467",
    "name": "맨드레이크 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "61회차",
      "맨드레이크",
      "발자국"
    ]
  },
  {
    "id": "av_0468",
    "name": "수호 젤리삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "61회차",
      "수호",
      "젤리삐",
      "발자국"
    ]
  },
  {
    "id": "av_0469",
    "name": "흩날리는 장미 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "61회차",
      "흩날리는",
      "장미",
      "발자국"
    ]
  },
  {
    "id": "av_0470",
    "name": "레인보우홀 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "61회차",
      "레인보우홀",
      "발자국"
    ]
  },
  {
    "id": "av_0471",
    "name": "위치 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "61회차",
      "위치",
      "젤리삐"
    ]
  },
  {
    "id": "av_0472",
    "name": "시트러스 프레쉬",
    "slot": "showEffect",
    "category": "효과",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "61회차",
      "시트러스",
      "프레쉬"
    ]
  },
  {
    "id": "av_0473",
    "name": "보틀 아쿠아리움",
    "slot": "showEffect",
    "category": "효과",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "61회차",
      "보틀",
      "아쿠아리움"
    ]
  },
  {
    "id": "av_0474",
    "name": "천사 황구",
    "slot": "showEffect",
    "category": "효과",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "61회차",
      "천사",
      "황구"
    ]
  },
  {
    "id": "av_0475",
    "name": "미스틱 소드 - 플뢰레",
    "slot": "showEffect",
    "category": "효과",
    "round": "61회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "61회차",
      "미스틱",
      "소드",
      "플뢰레"
    ]
  },
  {
    "id": "av_0476",
    "name": "복숭아꽃 뱃씨",
    "slot": "showHead",
    "category": "투구",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "62회차",
      "복숭아꽃",
      "뱃씨"
    ]
  },
  {
    "id": "av_0477",
    "name": "머리 위 흰머리 오목눈이",
    "slot": "showFace",
    "category": "투구",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "62회차",
      "머리",
      "흰머리",
      "오목눈이"
    ]
  },
  {
    "id": "av_0478",
    "name": "키티 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "62회차",
      "키티",
      "헤어밴드"
    ]
  },
  {
    "id": "av_0479",
    "name": "레이드 머쉬룸",
    "slot": "showHead",
    "category": "투구",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "62회차",
      "레이드",
      "머쉬룸"
    ]
  },
  {
    "id": "av_0480",
    "name": "선라이즈 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "62회차",
      "선라이즈",
      "크라운"
    ]
  },
  {
    "id": "av_0481",
    "name": "입에 문 송편",
    "slot": "showHead",
    "category": "머리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "62회차",
      "입에",
      "송편"
    ]
  },
  {
    "id": "av_0482",
    "name": "어깨 위의 흰머리 오목눈이",
    "slot": "showFace",
    "category": "머리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "62회차",
      "어깨",
      "위의",
      "흰머리",
      "오목눈이"
    ]
  },
  {
    "id": "av_0483",
    "name": "냥글라스",
    "slot": "showHead",
    "category": "머리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "62회차",
      "냥글라스"
    ]
  },
  {
    "id": "av_0484",
    "name": "레이디 머쉬룸 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "62회차",
      "레이디",
      "머쉬룸",
      "케이프"
    ]
  },
  {
    "id": "av_0485",
    "name": "블랙 세일러 카라",
    "slot": "showHead",
    "category": "머리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "62회차",
      "블랙",
      "세일러",
      "카라"
    ]
  },
  {
    "id": "av_0486",
    "name": "핑크 스트라이크",
    "slot": "showArmor",
    "category": "몸",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "62회차",
      "핑크",
      "스트라이크"
    ]
  },
  {
    "id": "av_0487",
    "name": "촤아악",
    "slot": "showArmor",
    "category": "몸",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "62회차",
      "촤아악"
    ]
  },
  {
    "id": "av_0488",
    "name": "네로 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "62회차",
      "네로",
      "망토"
    ]
  },
  {
    "id": "av_0489",
    "name": "요트 파카",
    "slot": "showArmor",
    "category": "몸",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "62회차",
      "요트",
      "파카"
    ]
  },
  {
    "id": "av_0490",
    "name": "천상의 나비 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "62회차",
      "천상의",
      "나비",
      "날개"
    ]
  },
  {
    "id": "av_0491",
    "name": "퍼지는 단풍 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "62회차",
      "퍼지는",
      "단풍",
      "발자국"
    ]
  },
  {
    "id": "av_0492",
    "name": "워프홀 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "62회차",
      "워프홀",
      "발자국"
    ]
  },
  {
    "id": "av_0493",
    "name": "글로우링 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "62회차",
      "글로우링",
      "발자국"
    ]
  },
  {
    "id": "av_0494",
    "name": "레드 파스텔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "62회차",
      "레드",
      "파스텔",
      "발자국"
    ]
  },
  {
    "id": "av_0495",
    "name": "그린 파스텔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "62회차",
      "그린",
      "파스텔",
      "발자국"
    ]
  },
  {
    "id": "av_0496",
    "name": "무지개 다리",
    "slot": "showEffect",
    "category": "효과",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "62회차",
      "무지개",
      "다리"
    ]
  },
  {
    "id": "av_0497",
    "name": "서빙 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "62회차",
      "서빙",
      "젤리삐"
    ]
  },
  {
    "id": "av_0498",
    "name": "둥둥 고양이",
    "slot": "showEffect",
    "category": "효과",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "62회차",
      "둥둥",
      "고양이"
    ]
  },
  {
    "id": "av_0499",
    "name": "괴도 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "62회차",
      "괴도",
      "젤리삐"
    ]
  },
  {
    "id": "av_0500",
    "name": "식신 - 종이 인형",
    "slot": "showEffect",
    "category": "효과",
    "round": "62회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "62회차",
      "식신",
      "종이",
      "인형"
    ]
  },
  {
    "id": "av_0501",
    "name": "쫑긋 밀짚모자",
    "slot": "showHead",
    "category": "투구",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "63회차",
      "쫑긋",
      "밀짚모자"
    ]
  },
  {
    "id": "av_0502",
    "name": "디아볼로스 서클릿",
    "slot": "showHead",
    "category": "투구",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "63회차",
      "디아볼로스",
      "서클릿"
    ]
  },
  {
    "id": "av_0503",
    "name": "머리 위 홍시",
    "slot": "showHead",
    "category": "투구",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "63회차",
      "머리",
      "홍시"
    ]
  },
  {
    "id": "av_0504",
    "name": "레더 크로스 레드 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "63회차",
      "레더",
      "크로스",
      "레드"
    ]
  },
  {
    "id": "av_0505",
    "name": "애플 민트 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "63회차",
      "애플",
      "민트",
      "헤어밴드"
    ]
  },
  {
    "id": "av_0506",
    "name": "허걱 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "63회차",
      "허걱",
      "가면"
    ]
  },
  {
    "id": "av_0507",
    "name": "유스티티아",
    "slot": "showHead",
    "category": "머리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "63회차",
      "유스티티아"
    ]
  },
  {
    "id": "av_0508",
    "name": "메달",
    "slot": "showHead",
    "category": "머리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "63회차",
      "메달"
    ]
  },
  {
    "id": "av_0509",
    "name": "파티시에 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "63회차",
      "파티시에",
      "케이프"
    ]
  },
  {
    "id": "av_0510",
    "name": "메이플 브로치",
    "slot": "showHead",
    "category": "머리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "63회차",
      "메이플",
      "브로치"
    ]
  },
  {
    "id": "av_0511",
    "name": "억눌린 타락천사",
    "slot": "showArmor",
    "category": "몸",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "63회차",
      "억눌린",
      "타락천사"
    ]
  },
  {
    "id": "av_0512",
    "name": "블루 로즈",
    "slot": "showArmor",
    "category": "몸",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "63회차",
      "블루",
      "로즈"
    ]
  },
  {
    "id": "av_0513",
    "name": "데빌 캣 트라이던트",
    "slot": "showArmor",
    "category": "몸",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "63회차",
      "데빌",
      "트라이던트"
    ]
  },
  {
    "id": "av_0514",
    "name": "정지된 마검",
    "slot": "showArmor",
    "category": "몸",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "63회차",
      "정지된",
      "마검"
    ]
  },
  {
    "id": "av_0515",
    "name": "애플 민트 엔젤",
    "slot": "showArmor",
    "category": "몸",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "63회차",
      "애플",
      "민트",
      "엔젤"
    ]
  },
  {
    "id": "av_0516",
    "name": "음양 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "63회차",
      "음양",
      "발자국"
    ]
  },
  {
    "id": "av_0517",
    "name": "스톤 니들 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "63회차",
      "스톤",
      "니들",
      "발자국"
    ]
  },
  {
    "id": "av_0518",
    "name": "워터 스플래쉬 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "63회차",
      "워터",
      "스플래쉬",
      "발자국"
    ]
  },
  {
    "id": "av_0519",
    "name": "람쥐썬더 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "63회차",
      "람쥐썬더",
      "발자국"
    ]
  },
  {
    "id": "av_0520",
    "name": "두둠칫새 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "63회차",
      "두둠칫새",
      "발자국"
    ]
  },
  {
    "id": "av_0521",
    "name": "달콤한 시간",
    "slot": "showEffect",
    "category": "효과",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "63회차",
      "달콤한",
      "시간"
    ]
  },
  {
    "id": "av_0522",
    "name": "꽃토끼",
    "slot": "showEffect",
    "category": "효과",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "63회차",
      "꽃토끼"
    ]
  },
  {
    "id": "av_0523",
    "name": "동화 속으로",
    "slot": "showEffect",
    "category": "효과",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "63회차",
      "동화",
      "속으로"
    ]
  },
  {
    "id": "av_0524",
    "name": "청사초롱",
    "slot": "showEffect",
    "category": "효과",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "63회차",
      "청사초롱"
    ]
  },
  {
    "id": "av_0525",
    "name": "미스틱 소드 - 카타나",
    "slot": "showEffect",
    "category": "효과",
    "round": "63회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "63회차",
      "미스틱",
      "소드",
      "카타나"
    ]
  },
  {
    "id": "av_0526",
    "name": "데스페라도",
    "slot": "showHead",
    "category": "투구",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "64회차",
      "데스페라도"
    ]
  },
  {
    "id": "av_0527",
    "name": "블루 티어즈 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "64회차",
      "블루",
      "티어즈",
      "크라운"
    ]
  },
  {
    "id": "av_0528",
    "name": "타나토스 아이",
    "slot": "showHead",
    "category": "투구",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "64회차",
      "타나토스",
      "아이"
    ]
  },
  {
    "id": "av_0529",
    "name": "주시하는 뱀파이어",
    "slot": "showHead",
    "category": "투구",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "64회차",
      "주시하는",
      "뱀파이어"
    ]
  },
  {
    "id": "av_0530",
    "name": "스티치 래빗 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "64회차",
      "스티치",
      "래빗",
      "후드"
    ]
  },
  {
    "id": "av_0531",
    "name": "엔젤 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "64회차",
      "엔젤",
      "케이프"
    ]
  },
  {
    "id": "av_0532",
    "name": "스크류 벨 리본",
    "slot": "showHead",
    "category": "머리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "64회차",
      "스크류",
      "리본"
    ]
  },
  {
    "id": "av_0533",
    "name": "연가",
    "slot": "showHead",
    "category": "머리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "64회차",
      "연가"
    ]
  },
  {
    "id": "av_0534",
    "name": "로얄 벨 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "64회차",
      "로얄",
      "머플러"
    ]
  },
  {
    "id": "av_0535",
    "name": "플러피 래빗 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "64회차",
      "플러피",
      "래빗",
      "케이프"
    ]
  },
  {
    "id": "av_0536",
    "name": "지나파 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "64회차",
      "지나파",
      "망토"
    ]
  },
  {
    "id": "av_0537",
    "name": "로드 오브 캣",
    "slot": "showArmor",
    "category": "몸",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "64회차",
      "로드",
      "오브"
    ]
  },
  {
    "id": "av_0538",
    "name": "낙원의 요정",
    "slot": "showArmor",
    "category": "몸",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "64회차",
      "낙원의",
      "요정"
    ]
  },
  {
    "id": "av_0539",
    "name": "은화비",
    "slot": "showArmor",
    "category": "몸",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "64회차",
      "은화비"
    ]
  },
  {
    "id": "av_0540",
    "name": "내 친구 몰티즈",
    "slot": "showArmor",
    "category": "몸",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "64회차",
      "친구",
      "몰티즈"
    ]
  },
  {
    "id": "av_0541",
    "name": "겨울밤 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "64회차",
      "겨울밤",
      "발자국"
    ]
  },
  {
    "id": "av_0542",
    "name": "개껌 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "64회차",
      "개껌",
      "발자국"
    ]
  },
  {
    "id": "av_0543",
    "name": "둗더쥐 잡기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "64회차",
      "둗더쥐",
      "잡기",
      "발자국"
    ]
  },
  {
    "id": "av_0544",
    "name": "스노우 파스텔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "64회차",
      "스노우",
      "파스텔",
      "발자국"
    ]
  },
  {
    "id": "av_0545",
    "name": "홀라당 귤 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "64회차",
      "홀라당",
      "발자국"
    ]
  },
  {
    "id": "av_0546",
    "name": "닿지 않는 주먹밥",
    "slot": "showEffect",
    "category": "효과",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "64회차",
      "닿지",
      "않는",
      "주먹밥"
    ]
  },
  {
    "id": "av_0547",
    "name": "씩씩한 고슴도치",
    "slot": "showEffect",
    "category": "효과",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "64회차",
      "씩씩한",
      "고슴도치"
    ]
  },
  {
    "id": "av_0548",
    "name": "설향",
    "slot": "showEffect",
    "category": "효과",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "64회차",
      "설향"
    ]
  },
  {
    "id": "av_0549",
    "name": "크리스탈 크리스마스",
    "slot": "showEffect",
    "category": "효과",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "64회차",
      "크리스탈",
      "크리스마스"
    ]
  },
  {
    "id": "av_0550",
    "name": "천사 검둥이",
    "slot": "showEffect",
    "category": "효과",
    "round": "64회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "64회차",
      "천사",
      "검둥이"
    ]
  },
  {
    "id": "av_0551",
    "name": "레이지 캣 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "65회차",
      "레이지",
      "후드"
    ]
  },
  {
    "id": "av_0552",
    "name": "머리 위 큐티 카우",
    "slot": "showHead",
    "category": "투구",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "65회차",
      "머리",
      "큐티",
      "카우"
    ]
  },
  {
    "id": "av_0553",
    "name": "포근한 니트 리본",
    "slot": "showHead",
    "category": "투구",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "65회차",
      "포근한",
      "니트",
      "리본"
    ]
  },
  {
    "id": "av_0554",
    "name": "로맨티스트",
    "slot": "showHead",
    "category": "투구",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "65회차",
      "로맨티스트"
    ]
  },
  {
    "id": "av_0555",
    "name": "몽화",
    "slot": "showHead",
    "category": "투구",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "65회차",
      "몽화"
    ]
  },
  {
    "id": "av_0556",
    "name": "음흉",
    "slot": "showHead",
    "category": "머리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "65회차",
      "음흉"
    ]
  },
  {
    "id": "av_0557",
    "name": "진주 귀고리",
    "slot": "showHead",
    "category": "머리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "65회차",
      "진주",
      "귀고리"
    ]
  },
  {
    "id": "av_0558",
    "name": "윈터 브로치",
    "slot": "showHead",
    "category": "머리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "65회차",
      "윈터",
      "브로치"
    ]
  },
  {
    "id": "av_0559",
    "name": "큐티 카우 귀",
    "slot": "showHead",
    "category": "머리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "65회차",
      "큐티",
      "카우"
    ]
  },
  {
    "id": "av_0560",
    "name": "동글동글 안경",
    "slot": "showFace",
    "category": "머리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "65회차",
      "동글동글",
      "안경"
    ]
  },
  {
    "id": "av_0561",
    "name": "포근한 털실볼",
    "slot": "showArmor",
    "category": "몸",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "65회차",
      "포근한",
      "털실볼"
    ]
  },
  {
    "id": "av_0562",
    "name": "스노우 에스프리",
    "slot": "showArmor",
    "category": "몸",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "65회차",
      "스노우",
      "에스프리"
    ]
  },
  {
    "id": "av_0563",
    "name": "럭키 카우 복주머니",
    "slot": "showArmor",
    "category": "몸",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "65회차",
      "럭키",
      "카우",
      "복주머니"
    ]
  },
  {
    "id": "av_0564",
    "name": "큐티 카우 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "65회차",
      "큐티",
      "카우",
      "꼬리"
    ]
  },
  {
    "id": "av_0565",
    "name": "황소 복주머니 가방",
    "slot": "showBack",
    "category": "몸",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "65회차",
      "황소",
      "복주머니",
      "가방"
    ]
  },
  {
    "id": "av_0566",
    "name": "화르륵 성냥 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "65회차",
      "화르륵",
      "성냥",
      "발자국"
    ]
  },
  {
    "id": "av_0567",
    "name": "무수한 선물 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "65회차",
      "무수한",
      "선물",
      "발자국"
    ]
  },
  {
    "id": "av_0568",
    "name": "멍컹왈컹 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "65회차",
      "멍컹왈컹",
      "발자국"
    ]
  },
  {
    "id": "av_0569",
    "name": "스노우 딜라이트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "65회차",
      "스노우",
      "딜라이트",
      "발자국"
    ]
  },
  {
    "id": "av_0570",
    "name": "고드름 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "65회차",
      "고드름",
      "발자국"
    ]
  },
  {
    "id": "av_0571",
    "name": "소소한 휴식",
    "slot": "showEffect",
    "category": "효과",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "65회차",
      "소소한",
      "휴식"
    ]
  },
  {
    "id": "av_0572",
    "name": "얼음 액자",
    "slot": "showEffect",
    "category": "효과",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "65회차",
      "얼음",
      "액자"
    ]
  },
  {
    "id": "av_0573",
    "name": "큐티 카우와 함께",
    "slot": "showEffect",
    "category": "효과",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "65회차",
      "큐티",
      "카우와",
      "함께"
    ]
  },
  {
    "id": "av_0574",
    "name": "모락모락 소고기 떡국",
    "slot": "showEffect",
    "category": "효과",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "65회차",
      "모락모락",
      "소고기",
      "떡국"
    ]
  },
  {
    "id": "av_0575",
    "name": "다크 코멧",
    "slot": "showEffect",
    "category": "효과",
    "round": "65회차",
    "tab": "61~65회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "65회차",
      "다크",
      "코멧"
    ]
  },
  {
    "id": "av_0576",
    "name": "티아의 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "56회차",
      "티아의",
      "모자"
    ]
  },
  {
    "id": "av_0577",
    "name": "세일러 고양이 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "56회차",
      "세일러",
      "고양이",
      "모자"
    ]
  },
  {
    "id": "av_0578",
    "name": "아깽이",
    "slot": "showHead",
    "category": "투구",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "56회차",
      "아깽이"
    ]
  },
  {
    "id": "av_0579",
    "name": "아노마라드 크라운즈",
    "slot": "showHead",
    "category": "투구",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "56회차",
      "아노마라드",
      "크라운즈"
    ]
  },
  {
    "id": "av_0580",
    "name": "블레이즈 헤일로",
    "slot": "showHead",
    "category": "투구",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "56회차",
      "블레이즈",
      "헤일로"
    ]
  },
  {
    "id": "av_0581",
    "name": "레드체인 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "56회차",
      "레드체인",
      "케이프"
    ]
  },
  {
    "id": "av_0582",
    "name": "로즈바인",
    "slot": "showHead",
    "category": "머리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "56회차",
      "로즈바인"
    ]
  },
  {
    "id": "av_0583",
    "name": "벨 리본",
    "slot": "showHead",
    "category": "머리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "56회차",
      "리본"
    ]
  },
  {
    "id": "av_0584",
    "name": "아울 마스크",
    "slot": "showFace",
    "category": "머리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "56회차",
      "아울",
      "마스크"
    ]
  },
  {
    "id": "av_0585",
    "name": "핑크 코튼 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "56회차",
      "핑크",
      "코튼",
      "이어링"
    ]
  },
  {
    "id": "av_0586",
    "name": "바구니 고양이",
    "slot": "showArmor",
    "category": "몸",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "56회차",
      "바구니",
      "고양이"
    ]
  },
  {
    "id": "av_0587",
    "name": "스팀펑크 스틱",
    "slot": "showArmor",
    "category": "몸",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "56회차",
      "스팀펑크",
      "스틱"
    ]
  },
  {
    "id": "av_0588",
    "name": "실버 버터플라이 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "56회차",
      "실버",
      "버터플라이"
    ]
  },
  {
    "id": "av_0589",
    "name": "제독 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "56회차",
      "제독",
      "코트"
    ]
  },
  {
    "id": "av_0590",
    "name": "하얀 마냐",
    "slot": "showArmor",
    "category": "몸",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "56회차",
      "하얀",
      "마냐"
    ]
  },
  {
    "id": "av_0591",
    "name": "그린 이퀄라이저 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "56회차",
      "그린",
      "이퀄라이저",
      "발자국"
    ]
  },
  {
    "id": "av_0592",
    "name": "꿈꾸는 물고기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "56회차",
      "꿈꾸는",
      "물고기",
      "발자국"
    ]
  },
  {
    "id": "av_0593",
    "name": "소울 라이트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "56회차",
      "소울",
      "라이트",
      "발자국"
    ]
  },
  {
    "id": "av_0594",
    "name": "스타 부스트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "56회차",
      "스타",
      "부스트",
      "발자국"
    ]
  },
  {
    "id": "av_0595",
    "name": "페어리 퀵 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "56회차",
      "페어리",
      "발자국"
    ]
  },
  {
    "id": "av_0596",
    "name": "와칭 유",
    "slot": "showEffect",
    "category": "효과",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "56회차",
      "와칭"
    ]
  },
  {
    "id": "av_0597",
    "name": "숲 속 작은 요정",
    "slot": "showEffect",
    "category": "효과",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "56회차",
      "작은",
      "요정"
    ]
  },
  {
    "id": "av_0598",
    "name": "신년의 밤",
    "slot": "showEffect",
    "category": "효과",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "56회차",
      "신년의"
    ]
  },
  {
    "id": "av_0599",
    "name": "플라삐의 고백",
    "slot": "showEffect",
    "category": "효과",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "56회차",
      "플라삐의",
      "고백"
    ]
  },
  {
    "id": "av_0600",
    "name": "목욕탕 평상",
    "slot": "showEffect",
    "category": "효과",
    "round": "56회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "56회차",
      "목욕탕",
      "평상"
    ]
  },
  {
    "id": "av_0601",
    "name": "다크 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "57회차",
      "다크",
      "후드"
    ]
  },
  {
    "id": "av_0602",
    "name": "메탈릭 헤드폰",
    "slot": "showHead",
    "category": "투구",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "57회차",
      "메탈릭",
      "헤드폰"
    ]
  },
  {
    "id": "av_0603",
    "name": "은색 늑대",
    "slot": "showHead",
    "category": "투구",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "57회차",
      "은색",
      "늑대"
    ]
  },
  {
    "id": "av_0604",
    "name": "청순",
    "slot": "showHead",
    "category": "투구",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "57회차",
      "청순"
    ]
  },
  {
    "id": "av_0605",
    "name": "흑장미 비녀",
    "slot": "showHead",
    "category": "투구",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "57회차",
      "흑장미",
      "비녀"
    ]
  },
  {
    "id": "av_0606",
    "name": "고딕 밴디지",
    "slot": "showHead",
    "category": "머리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "57회차",
      "고딕",
      "밴디지"
    ]
  },
  {
    "id": "av_0607",
    "name": "세일러 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "57회차",
      "세일러",
      "케이프"
    ]
  },
  {
    "id": "av_0608",
    "name": "둘둘 붕대",
    "slot": "showHead",
    "category": "머리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "57회차",
      "둘둘",
      "붕대"
    ]
  },
  {
    "id": "av_0609",
    "name": "레드벨벳 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "57회차",
      "레드벨벳",
      "케이프"
    ]
  },
  {
    "id": "av_0610",
    "name": "칭칭 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "57회차",
      "칭칭",
      "머플러"
    ]
  },
  {
    "id": "av_0611",
    "name": "마법의 빗자루",
    "slot": "showBack",
    "category": "몸",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "57회차",
      "마법의",
      "빗자루"
    ]
  },
  {
    "id": "av_0612",
    "name": "블러디 엠퍼러",
    "slot": "showArmor",
    "category": "몸",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "57회차",
      "블러디",
      "엠퍼러"
    ]
  },
  {
    "id": "av_0613",
    "name": "정열적인 갈색 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "57회차",
      "정열적인",
      "갈색",
      "코트"
    ]
  },
  {
    "id": "av_0614",
    "name": "타락 천사",
    "slot": "showArmor",
    "category": "몸",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "57회차",
      "타락",
      "천사"
    ]
  },
  {
    "id": "av_0615",
    "name": "허둥지둥 고양이",
    "slot": "showArmor",
    "category": "몸",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "57회차",
      "허둥지둥",
      "고양이"
    ]
  },
  {
    "id": "av_0616",
    "name": "놀랐냥 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "57회차",
      "놀랐냥",
      "발자국"
    ]
  },
  {
    "id": "av_0617",
    "name": "달토끼 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "57회차",
      "달토끼",
      "발자국"
    ]
  },
  {
    "id": "av_0618",
    "name": "머쉬룸 로켓 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "57회차",
      "머쉬룸",
      "로켓",
      "발자국"
    ]
  },
  {
    "id": "av_0619",
    "name": "삼색 물고기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "57회차",
      "삼색",
      "물고기",
      "발자국"
    ]
  },
  {
    "id": "av_0620",
    "name": "폴링 퍼피 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "57회차",
      "폴링",
      "퍼피",
      "발자국"
    ]
  },
  {
    "id": "av_0621",
    "name": "널브러진 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "57회차",
      "널브러진",
      "젤리삐"
    ]
  },
  {
    "id": "av_0622",
    "name": "마법 연구실",
    "slot": "showEffect",
    "category": "효과",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "57회차",
      "마법",
      "연구실"
    ]
  },
  {
    "id": "av_0623",
    "name": "영혼 탈출",
    "slot": "showEffect",
    "category": "효과",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "57회차",
      "영혼",
      "탈출"
    ]
  },
  {
    "id": "av_0624",
    "name": "장난꾸러기 악마",
    "slot": "showEffect",
    "category": "효과",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "57회차",
      "장난꾸러기",
      "악마"
    ]
  },
  {
    "id": "av_0625",
    "name": "체스 보드 탁자",
    "slot": "showEffect",
    "category": "효과",
    "round": "57회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "57회차",
      "체스",
      "보드",
      "탁자"
    ]
  },
  {
    "id": "av_0626",
    "name": "핑크냥",
    "slot": "showHead",
    "category": "투구",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "58회차",
      "핑크냥"
    ]
  },
  {
    "id": "av_0627",
    "name": "트윈스 로즈",
    "slot": "showHead",
    "category": "투구",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "58회차",
      "트윈스",
      "로즈"
    ]
  },
  {
    "id": "av_0628",
    "name": "샴족 머리 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "58회차",
      "샴족",
      "머리",
      "장식"
    ]
  },
  {
    "id": "av_0629",
    "name": "운랑 머리 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "58회차",
      "운랑",
      "머리",
      "장식"
    ]
  },
  {
    "id": "av_0630",
    "name": "그레이스 엔젤 코르사주",
    "slot": "showHead",
    "category": "투구",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "58회차",
      "그레이스",
      "엔젤",
      "코르사주"
    ]
  },
  {
    "id": "av_0631",
    "name": "네냐플 사감",
    "slot": "showHead",
    "category": "머리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "58회차",
      "네냐플",
      "사감"
    ]
  },
  {
    "id": "av_0632",
    "name": "캡틴",
    "slot": "showHead",
    "category": "머리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "58회차",
      "캡틴"
    ]
  },
  {
    "id": "av_0633",
    "name": "어둠의 주모자",
    "slot": "showHead",
    "category": "머리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "58회차",
      "어둠의",
      "주모자"
    ]
  },
  {
    "id": "av_0634",
    "name": "가스가스가스",
    "slot": "showHead",
    "category": "머리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "58회차",
      "가스가스가스"
    ]
  },
  {
    "id": "av_0635",
    "name": "맨 인 더 다크",
    "slot": "showHead",
    "category": "머리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "58회차",
      "다크"
    ]
  },
  {
    "id": "av_0636",
    "name": "천사의 선물",
    "slot": "showArmor",
    "category": "몸",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "58회차",
      "천사의",
      "선물"
    ]
  },
  {
    "id": "av_0637",
    "name": "카오스",
    "slot": "showArmor",
    "category": "몸",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "58회차",
      "카오스"
    ]
  },
  {
    "id": "av_0638",
    "name": "용의 후예",
    "slot": "showArmor",
    "category": "몸",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "58회차",
      "용의",
      "후예"
    ]
  },
  {
    "id": "av_0639",
    "name": "앵거 오브 소서러",
    "slot": "showArmor",
    "category": "몸",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "58회차",
      "앵거",
      "오브",
      "소서러"
    ]
  },
  {
    "id": "av_0640",
    "name": "윙 오브 갤럭시",
    "slot": "showBack",
    "category": "몸",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "58회차",
      "오브",
      "갤럭시"
    ]
  },
  {
    "id": "av_0641",
    "name": "호들갑 유령 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "58회차",
      "호들갑",
      "유령",
      "발자국"
    ]
  },
  {
    "id": "av_0642",
    "name": "깜작 꽃게 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "58회차",
      "깜작",
      "꽃게",
      "발자국"
    ]
  },
  {
    "id": "av_0643",
    "name": "회전 바닥 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "58회차",
      "회전",
      "바닥",
      "발자국"
    ]
  },
  {
    "id": "av_0644",
    "name": "이별의 동전 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "58회차",
      "이별의",
      "동전",
      "발자국"
    ]
  },
  {
    "id": "av_0645",
    "name": "암살 닌자 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "58회차",
      "암살",
      "닌자",
      "발자국"
    ]
  },
  {
    "id": "av_0646",
    "name": "박쥐",
    "slot": "showEffect",
    "category": "효과",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "58회차",
      "박쥐"
    ]
  },
  {
    "id": "av_0647",
    "name": "목욕하는 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "58회차",
      "목욕하는",
      "젤리삐"
    ]
  },
  {
    "id": "av_0648",
    "name": "롤리팝 헤븐즈",
    "slot": "showEffect",
    "category": "효과",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "58회차",
      "롤리팝",
      "헤븐즈"
    ]
  },
  {
    "id": "av_0649",
    "name": "메이크업☆",
    "slot": "showEffect",
    "category": "효과",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "58회차",
      "메이크업☆"
    ]
  },
  {
    "id": "av_0650",
    "name": "리리컬 라이트",
    "slot": "showEffect",
    "category": "효과",
    "round": "58회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "58회차",
      "리리컬",
      "라이트"
    ]
  },
  {
    "id": "av_0651",
    "name": "허스키 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "59회차",
      "허스키",
      "모자"
    ]
  },
  {
    "id": "av_0652",
    "name": "사자 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "59회차",
      "사자",
      "모자"
    ]
  },
  {
    "id": "av_0653",
    "name": "불굴",
    "slot": "showHead",
    "category": "투구",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "59회차",
      "불굴"
    ]
  },
  {
    "id": "av_0654",
    "name": "세일러 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "59회차",
      "세일러",
      "베레모"
    ]
  },
  {
    "id": "av_0655",
    "name": "퍼피 캐스켓",
    "slot": "showHead",
    "category": "투구",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "59회차",
      "퍼피",
      "캐스켓"
    ]
  },
  {
    "id": "av_0656",
    "name": "리본 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "59회차",
      "리본",
      "머플러"
    ]
  },
  {
    "id": "av_0657",
    "name": "프린지 스톨",
    "slot": "showHead",
    "category": "머리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "59회차",
      "프린지",
      "스톨"
    ]
  },
  {
    "id": "av_0658",
    "name": "크라운 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "59회차",
      "크라운",
      "케이프"
    ]
  },
  {
    "id": "av_0659",
    "name": "레인코트 케이프",
    "slot": "showArmor",
    "category": "머리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "59회차",
      "레인코트",
      "케이프"
    ]
  },
  {
    "id": "av_0660",
    "name": "초코 도넛 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "59회차",
      "초코",
      "도넛",
      "이어링"
    ]
  },
  {
    "id": "av_0661",
    "name": "딸랑딸랑 고양이 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "59회차",
      "딸랑딸랑",
      "고양이",
      "꼬리"
    ]
  },
  {
    "id": "av_0662",
    "name": "봉인된 비전서",
    "slot": "showArmor",
    "category": "몸",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "59회차",
      "봉인된",
      "비전서"
    ]
  },
  {
    "id": "av_0663",
    "name": "냥냥 리본",
    "slot": "showArmor",
    "category": "몸",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "59회차",
      "냥냥",
      "리본"
    ]
  },
  {
    "id": "av_0664",
    "name": "루베르",
    "slot": "showArmor",
    "category": "몸",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "59회차",
      "루베르"
    ]
  },
  {
    "id": "av_0665",
    "name": "등 뒤의 수리부엉이",
    "slot": "showArmor",
    "category": "몸",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "59회차",
      "뒤의",
      "수리부엉이"
    ]
  },
  {
    "id": "av_0666",
    "name": "R.I.P.발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "59회차",
      "R.I.P.발자국"
    ]
  },
  {
    "id": "av_0667",
    "name": "날벼락 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "59회차",
      "날벼락",
      "발자국"
    ]
  },
  {
    "id": "av_0668",
    "name": "미사일 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "59회차",
      "미사일",
      "발자국"
    ]
  },
  {
    "id": "av_0669",
    "name": "화산 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "59회차",
      "화산",
      "발자국"
    ]
  },
  {
    "id": "av_0670",
    "name": "신장개업 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "59회차",
      "신장개업",
      "발자국"
    ]
  },
  {
    "id": "av_0671",
    "name": "캔디 파라다이스",
    "slot": "showEffect",
    "category": "효과",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "59회차",
      "캔디",
      "파라다이스"
    ]
  },
  {
    "id": "av_0672",
    "name": "별똥별이 떨어지는 밤",
    "slot": "showEffect",
    "category": "효과",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "59회차",
      "별똥별이",
      "떨어지는"
    ]
  },
  {
    "id": "av_0673",
    "name": "블루밍 피크닉",
    "slot": "showEffect",
    "category": "효과",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "59회차",
      "블루밍",
      "피크닉"
    ]
  },
  {
    "id": "av_0674",
    "name": "우주 장판",
    "slot": "showEffect",
    "category": "효과",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "59회차",
      "우주",
      "장판"
    ]
  },
  {
    "id": "av_0675",
    "name": "마법 실험실",
    "slot": "showEffect",
    "category": "효과",
    "round": "59회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "59회차",
      "마법",
      "실험실"
    ]
  },
  {
    "id": "av_0676",
    "name": "신탁",
    "slot": "showHead",
    "category": "투구",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "60회차",
      "신탁"
    ]
  },
  {
    "id": "av_0677",
    "name": "킬러캣 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "60회차",
      "킬러캣",
      "후드"
    ]
  },
  {
    "id": "av_0678",
    "name": "폭신 여우 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "60회차",
      "폭신",
      "여우"
    ]
  },
  {
    "id": "av_0679",
    "name": "무지개 높은음자리표",
    "slot": "showHead",
    "category": "투구",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "60회차",
      "무지개",
      "높은음자리표"
    ]
  },
  {
    "id": "av_0680",
    "name": "카멜리아 리본",
    "slot": "showHead",
    "category": "투구",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "60회차",
      "카멜리아",
      "리본"
    ]
  },
  {
    "id": "av_0681",
    "name": "데몬즈 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "60회차",
      "데몬즈",
      "머플러"
    ]
  },
  {
    "id": "av_0682",
    "name": "헤헤 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "60회차",
      "헤헤",
      "가면"
    ]
  },
  {
    "id": "av_0683",
    "name": "광대",
    "slot": "showHead",
    "category": "머리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "60회차",
      "광대"
    ]
  },
  {
    "id": "av_0684",
    "name": "하프 앤 하프",
    "slot": "showHead",
    "category": "머리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "60회차",
      "하프"
    ]
  },
  {
    "id": "av_0685",
    "name": "쇼콜라 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "60회차",
      "쇼콜라",
      "이어링"
    ]
  },
  {
    "id": "av_0686",
    "name": "마도",
    "slot": "showArmor",
    "category": "몸",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "60회차",
      "마도"
    ]
  },
  {
    "id": "av_0687",
    "name": "도깨비 축제",
    "slot": "showArmor",
    "category": "몸",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "60회차",
      "도깨비",
      "축제"
    ]
  },
  {
    "id": "av_0688",
    "name": "아이돌 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "60회차",
      "아이돌",
      "코트"
    ]
  },
  {
    "id": "av_0689",
    "name": "로드 오브 쇼콜라",
    "slot": "showArmor",
    "category": "몸",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "60회차",
      "로드",
      "오브",
      "쇼콜라"
    ]
  },
  {
    "id": "av_0690",
    "name": "우마도",
    "slot": "showArmor",
    "category": "몸",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "60회차",
      "우마도"
    ]
  },
  {
    "id": "av_0691",
    "name": "물파장 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "60회차",
      "물파장",
      "발자국"
    ]
  },
  {
    "id": "av_0692",
    "name": "아이리스 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "60회차",
      "아이리스",
      "발자국"
    ]
  },
  {
    "id": "av_0693",
    "name": "띠요옹 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "60회차",
      "띠요옹",
      "발자국"
    ]
  },
  {
    "id": "av_0694",
    "name": "잔혹한 아침 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "60회차",
      "잔혹한",
      "아침",
      "발자국"
    ]
  },
  {
    "id": "av_0695",
    "name": "라면 대참사 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "60회차",
      "라면",
      "대참사",
      "발자국"
    ]
  },
  {
    "id": "av_0696",
    "name": "새장",
    "slot": "showEffect",
    "category": "효과",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "60회차",
      "새장"
    ]
  },
  {
    "id": "av_0697",
    "name": "상냥한 풍선",
    "slot": "showEffect",
    "category": "효과",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "60회차",
      "상냥한",
      "풍선"
    ]
  },
  {
    "id": "av_0698",
    "name": "새근새근 제니",
    "slot": "showEffect",
    "category": "효과",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "60회차",
      "새근새근",
      "제니"
    ]
  },
  {
    "id": "av_0699",
    "name": "반짝반짝 진주",
    "slot": "showEffect",
    "category": "효과",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "60회차",
      "반짝반짝",
      "진주"
    ]
  },
  {
    "id": "av_0700",
    "name": "폴리스 타워",
    "slot": "showEffect",
    "category": "효과",
    "round": "60회차",
    "tab": "56~60회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "60회차",
      "폴리스",
      "타워"
    ]
  },
  {
    "id": "av_0701",
    "name": "오팔 장식 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "51회차",
      "오팔",
      "장식",
      "후드"
    ]
  },
  {
    "id": "av_0702",
    "name": "총사 모자",
    "slot": "showSubArms",
    "category": "투구",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "51회차",
      "총사",
      "모자"
    ]
  },
  {
    "id": "av_0703",
    "name": "데빌 차일드",
    "slot": "showHead",
    "category": "투구",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "51회차",
      "데빌",
      "차일드"
    ]
  },
  {
    "id": "av_0704",
    "name": "프로그 킹",
    "slot": "showHead",
    "category": "투구",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "51회차",
      "프로그"
    ]
  },
  {
    "id": "av_0705",
    "name": "모노크롬 크로스 헤어핀",
    "slot": "showHead",
    "category": "투구",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "51회차",
      "모노크롬",
      "크로스",
      "헤어핀"
    ]
  },
  {
    "id": "av_0706",
    "name": "둘둘 레서판다",
    "slot": "showHead",
    "category": "머리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "51회차",
      "둘둘",
      "레서판다"
    ]
  },
  {
    "id": "av_0707",
    "name": "임페리얼",
    "slot": "showHead",
    "category": "머리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "51회차",
      "임페리얼"
    ]
  },
  {
    "id": "av_0708",
    "name": "하늬바람",
    "slot": "showHead",
    "category": "머리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "51회차",
      "하늬바람"
    ]
  },
  {
    "id": "av_0709",
    "name": "마안 봉인",
    "slot": "showHead",
    "category": "머리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "51회차",
      "마안",
      "봉인"
    ]
  },
  {
    "id": "av_0710",
    "name": "트윙클 플라워 피어스",
    "slot": "showBack",
    "category": "머리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "51회차",
      "트윙클",
      "플라워",
      "피어스"
    ]
  },
  {
    "id": "av_0711",
    "name": "영혼의 가지",
    "slot": "showArmor",
    "category": "몸",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "51회차",
      "영혼의",
      "가지"
    ]
  },
  {
    "id": "av_0712",
    "name": "천상의 야상곡",
    "slot": "showArmor",
    "category": "몸",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "51회차",
      "천상의",
      "야상곡"
    ]
  },
  {
    "id": "av_0713",
    "name": "거대한 단풍잎",
    "slot": "showArmor",
    "category": "몸",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "51회차",
      "거대한",
      "단풍잎"
    ]
  },
  {
    "id": "av_0714",
    "name": "애머시스트 숄",
    "slot": "showBack",
    "category": "몸",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "51회차",
      "애머시스트"
    ]
  },
  {
    "id": "av_0715",
    "name": "엔젤릭 다크",
    "slot": "showArmor",
    "category": "몸",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "51회차",
      "엔젤릭",
      "다크"
    ]
  },
  {
    "id": "av_0716",
    "name": "러브 클로버 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "51회차",
      "러브",
      "클로버",
      "발자국"
    ]
  },
  {
    "id": "av_0717",
    "name": "검은 음표 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "51회차",
      "검은",
      "음표",
      "발자국"
    ]
  },
  {
    "id": "av_0718",
    "name": "따끈따끈 찐만두 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "51회차",
      "따끈따끈",
      "찐만두",
      "발자국"
    ]
  },
  {
    "id": "av_0719",
    "name": "스케치 별 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "51회차",
      "스케치",
      "발자국"
    ]
  },
  {
    "id": "av_0720",
    "name": "드라군의 탄생 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "51회차",
      "드라군의",
      "탄생",
      "발자국"
    ]
  },
  {
    "id": "av_0721",
    "name": "혼의 경계",
    "slot": "showEffect",
    "category": "효과",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "51회차",
      "혼의",
      "경계"
    ]
  },
  {
    "id": "av_0722",
    "name": "하루의 흐름",
    "slot": "showEffect",
    "category": "효과",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "51회차",
      "하루의",
      "흐름"
    ]
  },
  {
    "id": "av_0723",
    "name": "오싹한 시선",
    "slot": "showEffect",
    "category": "효과",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "51회차",
      "오싹한",
      "시선"
    ]
  },
  {
    "id": "av_0724",
    "name": "페리도트",
    "slot": "showEffect",
    "category": "효과",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "51회차",
      "페리도트"
    ]
  },
  {
    "id": "av_0725",
    "name": "마신 강림",
    "slot": "showEffect",
    "category": "효과",
    "round": "51회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "51회차",
      "마신",
      "강림"
    ]
  },
  {
    "id": "av_0726",
    "name": "서큐버스 메이드 카추샤",
    "slot": "showHead",
    "category": "투구",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "52회차",
      "서큐버스",
      "메이드",
      "카추샤"
    ]
  },
  {
    "id": "av_0727",
    "name": "스컬 니트 비니",
    "slot": "showHead",
    "category": "투구",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "52회차",
      "스컬",
      "니트",
      "비니"
    ]
  },
  {
    "id": "av_0728",
    "name": "아누비스",
    "slot": "showHead",
    "category": "투구",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "52회차",
      "아누비스"
    ]
  },
  {
    "id": "av_0729",
    "name": "울프 마스크",
    "slot": "showFace",
    "category": "투구",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "52회차",
      "울프",
      "마스크"
    ]
  },
  {
    "id": "av_0730",
    "name": "콕콕 까마귀",
    "slot": "showHead",
    "category": "투구",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "52회차",
      "콕콕",
      "까마귀"
    ]
  },
  {
    "id": "av_0731",
    "name": "서큐버스 메이드 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "52회차",
      "서큐버스",
      "메이드",
      "케이프"
    ]
  },
  {
    "id": "av_0732",
    "name": "드라큘라 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "52회차",
      "드라큘라",
      "케이프"
    ]
  },
  {
    "id": "av_0733",
    "name": "크로우 페더",
    "slot": "showHead",
    "category": "머리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "52회차",
      "크로우",
      "페더"
    ]
  },
  {
    "id": "av_0734",
    "name": "데모닉 템테이션",
    "slot": "showHead",
    "category": "머리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "52회차",
      "데모닉",
      "템테이션"
    ]
  },
  {
    "id": "av_0735",
    "name": "기묘",
    "slot": "showHead",
    "category": "머리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "52회차",
      "기묘"
    ]
  },
  {
    "id": "av_0736",
    "name": "블랙 쉽 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "52회차",
      "블랙",
      "코트"
    ]
  },
  {
    "id": "av_0737",
    "name": "하트 데빌 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "52회차",
      "하트",
      "데빌"
    ]
  },
  {
    "id": "av_0738",
    "name": "폴리스 실드",
    "slot": "showArmor",
    "category": "몸",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "52회차",
      "폴리스",
      "실드"
    ]
  },
  {
    "id": "av_0739",
    "name": "가디언 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "52회차",
      "가디언"
    ]
  },
  {
    "id": "av_0740",
    "name": "레비테이션 스타",
    "slot": "showArmor",
    "category": "몸",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "52회차",
      "레비테이션",
      "스타"
    ]
  },
  {
    "id": "av_0741",
    "name": "크리스탈 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "52회차",
      "크리스탈",
      "발자국"
    ]
  },
  {
    "id": "av_0742",
    "name": "플레어 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "52회차",
      "플레어",
      "발자국"
    ]
  },
  {
    "id": "av_0743",
    "name": "폰 떨굼 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "52회차",
      "떨굼",
      "발자국"
    ]
  },
  {
    "id": "av_0744",
    "name": "나무토막 분신 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "52회차",
      "나무토막",
      "분신",
      "발자국"
    ]
  },
  {
    "id": "av_0745",
    "name": "땅꺼짐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "52회차",
      "땅꺼짐",
      "발자국"
    ]
  },
  {
    "id": "av_0746",
    "name": "크리스탈 리플",
    "slot": "showEffect",
    "category": "효과",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "52회차",
      "크리스탈",
      "리플"
    ]
  },
  {
    "id": "av_0747",
    "name": "문 나이트",
    "slot": "showEffect",
    "category": "효과",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "52회차",
      "나이트"
    ]
  },
  {
    "id": "av_0748",
    "name": "쾌걸 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "52회차",
      "쾌걸",
      "젤리삐"
    ]
  },
  {
    "id": "av_0749",
    "name": "단풍 낙엽",
    "slot": "showEffect",
    "category": "효과",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "52회차",
      "단풍",
      "낙엽"
    ]
  },
  {
    "id": "av_0750",
    "name": "마녀의 우산",
    "slot": "showEffect",
    "category": "효과",
    "round": "52회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "52회차",
      "마녀의",
      "우산"
    ]
  },
  {
    "id": "av_0751",
    "name": "고글 니트 비니",
    "slot": "showHead",
    "category": "투구",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "53회차",
      "고글",
      "니트",
      "비니"
    ]
  },
  {
    "id": "av_0752",
    "name": "블랙 리본 미니 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "53회차",
      "블랙",
      "리본",
      "미니"
    ]
  },
  {
    "id": "av_0753",
    "name": "스타 헤드셋",
    "slot": "showHead",
    "category": "투구",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "53회차",
      "스타",
      "헤드셋"
    ]
  },
  {
    "id": "av_0754",
    "name": "검은 고양이 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "53회차",
      "검은",
      "고양이"
    ]
  },
  {
    "id": "av_0755",
    "name": "순수",
    "slot": "showHead",
    "category": "투구",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "53회차",
      "순수"
    ]
  },
  {
    "id": "av_0756",
    "name": "리본 밍크 퍼",
    "slot": "showHead",
    "category": "머리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "53회차",
      "리본",
      "밍크"
    ]
  },
  {
    "id": "av_0757",
    "name": "새침부끄 머리핀",
    "slot": "showHead",
    "category": "머리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "53회차",
      "새침부끄",
      "머리핀"
    ]
  },
  {
    "id": "av_0758",
    "name": "단풍잎 머리 장식",
    "slot": "showHead",
    "category": "머리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "53회차",
      "단풍잎",
      "장식"
    ]
  },
  {
    "id": "av_0759",
    "name": "어둠의 목도리",
    "slot": "showHead",
    "category": "머리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "53회차",
      "어둠의",
      "목도리"
    ]
  },
  {
    "id": "av_0760",
    "name": "홍조",
    "slot": "showFace",
    "category": "머리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "53회차",
      "홍조"
    ]
  },
  {
    "id": "av_0761",
    "name": "큰 리본",
    "slot": "showArmor",
    "category": "몸",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "53회차",
      "리본"
    ]
  },
  {
    "id": "av_0762",
    "name": "앨리스 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "53회차",
      "앨리스",
      "망토"
    ]
  },
  {
    "id": "av_0763",
    "name": "허미트 클로크",
    "slot": "showArmor",
    "category": "몸",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "53회차",
      "허미트",
      "클로크"
    ]
  },
  {
    "id": "av_0764",
    "name": "소악마의 탄생",
    "slot": "showArmor",
    "category": "몸",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "53회차",
      "소악마의",
      "탄생"
    ]
  },
  {
    "id": "av_0765",
    "name": "잃어버린 천사 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "53회차",
      "잃어버린",
      "천사",
      "날개"
    ]
  },
  {
    "id": "av_0766",
    "name": "영혼 불꽃 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "53회차",
      "영혼",
      "불꽃",
      "발자국"
    ]
  },
  {
    "id": "av_0767",
    "name": "빨강 음표 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "53회차",
      "빨강",
      "음표",
      "발자국"
    ]
  },
  {
    "id": "av_0768",
    "name": "휘리릭 펭귄 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "53회차",
      "휘리릭",
      "펭귄",
      "발자국"
    ]
  },
  {
    "id": "av_0769",
    "name": "폭발 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "53회차",
      "폭발",
      "발자국"
    ]
  },
  {
    "id": "av_0770",
    "name": "지하실 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "53회차",
      "지하실",
      "발자국"
    ]
  },
  {
    "id": "av_0771",
    "name": "눈의 요정",
    "slot": "showEffect",
    "category": "효과",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "53회차",
      "눈의",
      "요정"
    ]
  },
  {
    "id": "av_0772",
    "name": "은빛 구미호",
    "slot": "showEffect",
    "category": "효과",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "53회차",
      "은빛",
      "구미호"
    ]
  },
  {
    "id": "av_0773",
    "name": "테일즈 글라스",
    "slot": "showEffect",
    "category": "효과",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "53회차",
      "테일즈",
      "글라스"
    ]
  },
  {
    "id": "av_0774",
    "name": "다이아몬드 바람",
    "slot": "showEffect",
    "category": "효과",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "53회차",
      "다이아몬드",
      "바람"
    ]
  },
  {
    "id": "av_0775",
    "name": "근두운 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "53회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "53회차",
      "근두운",
      "젤리삐"
    ]
  },
  {
    "id": "av_0776",
    "name": "양은 냄비",
    "slot": "showHead",
    "category": "투구",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "54회차",
      "양은",
      "냄비"
    ]
  },
  {
    "id": "av_0777",
    "name": "풍산개 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "54회차",
      "풍산개",
      "모자"
    ]
  },
  {
    "id": "av_0778",
    "name": "혁명가의 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "54회차",
      "혁명가의",
      "베레모"
    ]
  },
  {
    "id": "av_0779",
    "name": "다크니스 티아라",
    "slot": "showHead",
    "category": "투구",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "54회차",
      "다크니스",
      "티아라"
    ]
  },
  {
    "id": "av_0780",
    "name": "저주받은 악마의 뿔",
    "slot": "showHead",
    "category": "투구",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "54회차",
      "저주받은",
      "악마의"
    ]
  },
  {
    "id": "av_0781",
    "name": "빅 옐로우 선글라스",
    "slot": "showFace",
    "category": "머리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "54회차",
      "옐로우",
      "선글라스"
    ]
  },
  {
    "id": "av_0782",
    "name": "쫑긋 고양이 귀",
    "slot": "showHead",
    "category": "머리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "54회차",
      "쫑긋",
      "고양이"
    ]
  },
  {
    "id": "av_0783",
    "name": "크로스 피어스",
    "slot": "showHead",
    "category": "머리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "54회차",
      "크로스",
      "피어스"
    ]
  },
  {
    "id": "av_0784",
    "name": "엘레강스 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "54회차",
      "엘레강스",
      "머플러"
    ]
  },
  {
    "id": "av_0785",
    "name": "빨강 하이비스커스",
    "slot": "showHead",
    "category": "머리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "54회차",
      "빨강",
      "하이비스커스"
    ]
  },
  {
    "id": "av_0786",
    "name": "코로나 링크",
    "slot": "showArmor",
    "category": "몸",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "54회차",
      "코로나",
      "링크"
    ]
  },
  {
    "id": "av_0787",
    "name": "하늘하늘 날개옷",
    "slot": "showBack",
    "category": "몸",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "54회차",
      "하늘하늘",
      "날개옷"
    ]
  },
  {
    "id": "av_0788",
    "name": "요괴 고양이 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "54회차",
      "요괴",
      "고양이",
      "꼬리"
    ]
  },
  {
    "id": "av_0789",
    "name": "탐욕",
    "slot": "showArmor",
    "category": "몸",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "54회차",
      "탐욕"
    ]
  },
  {
    "id": "av_0790",
    "name": "퍼 후드 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "54회차",
      "후드",
      "코트"
    ]
  },
  {
    "id": "av_0791",
    "name": "함정 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "54회차",
      "함정",
      "발자국"
    ]
  },
  {
    "id": "av_0792",
    "name": "피어나는 꽃 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "54회차",
      "피어나는",
      "발자국"
    ]
  },
  {
    "id": "av_0793",
    "name": "계란초밥 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "54회차",
      "계란초밥",
      "발자국"
    ]
  },
  {
    "id": "av_0794",
    "name": "오염 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "54회차",
      "오염",
      "발자국"
    ]
  },
  {
    "id": "av_0795",
    "name": "암살 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "54회차",
      "암살",
      "발자국"
    ]
  },
  {
    "id": "av_0796",
    "name": "버섯 의자",
    "slot": "showEffect",
    "category": "효과",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "54회차",
      "버섯",
      "의자"
    ]
  },
  {
    "id": "av_0797",
    "name": "슬리핑 드래곤",
    "slot": "showEffect",
    "category": "효과",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "54회차",
      "슬리핑",
      "드래곤"
    ]
  },
  {
    "id": "av_0798",
    "name": "지하세계의 업화",
    "slot": "showEffect",
    "category": "효과",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "54회차",
      "지하세계의",
      "업화"
    ]
  },
  {
    "id": "av_0799",
    "name": "땡 틀렸습니다!",
    "slot": "showEffect",
    "category": "효과",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "54회차",
      "틀렸습니다!"
    ]
  },
  {
    "id": "av_0800",
    "name": "감나무 아래",
    "slot": "showEffect",
    "category": "효과",
    "round": "54회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "54회차",
      "감나무",
      "아래"
    ]
  },
  {
    "id": "av_0801",
    "name": "헌팅 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "55회차",
      "헌팅"
    ]
  },
  {
    "id": "av_0802",
    "name": "하프물범 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "55회차",
      "하프물범",
      "모자"
    ]
  },
  {
    "id": "av_0803",
    "name": "마법의 여행자 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "55회차",
      "마법의",
      "여행자",
      "모자"
    ]
  },
  {
    "id": "av_0804",
    "name": "프로즌 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "55회차",
      "프로즌",
      "크라운"
    ]
  },
  {
    "id": "av_0805",
    "name": "프로즌 티아라",
    "slot": "showHead",
    "category": "투구",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "55회차",
      "프로즌",
      "티아라"
    ]
  },
  {
    "id": "av_0806",
    "name": "하트 안대",
    "slot": "showFace",
    "category": "머리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "55회차",
      "하트",
      "안대"
    ]
  },
  {
    "id": "av_0807",
    "name": "블루 넥타이",
    "slot": "showFace",
    "category": "머리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "55회차",
      "블루",
      "넥타이"
    ]
  },
  {
    "id": "av_0808",
    "name": "체크 리본",
    "slot": "showHead",
    "category": "머리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "55회차",
      "체크",
      "리본"
    ]
  },
  {
    "id": "av_0809",
    "name": "세일러 카라",
    "slot": "showHead",
    "category": "머리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "55회차",
      "세일러",
      "카라"
    ]
  },
  {
    "id": "av_0810",
    "name": "스노우 위치 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "55회차",
      "스노우",
      "위치",
      "케이프"
    ]
  },
  {
    "id": "av_0811",
    "name": "프릴 블랙 위치 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "55회차",
      "프릴",
      "블랙",
      "위치",
      "망토"
    ]
  },
  {
    "id": "av_0812",
    "name": "달의 가호",
    "slot": "showArmor",
    "category": "몸",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "55회차",
      "달의",
      "가호"
    ]
  },
  {
    "id": "av_0813",
    "name": "뿅뿅 뿅망치",
    "slot": "showArmor",
    "category": "몸",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "55회차",
      "뿅뿅",
      "뿅망치"
    ]
  },
  {
    "id": "av_0814",
    "name": "글래이셔",
    "slot": "showArmor",
    "category": "몸",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "55회차",
      "글래이셔"
    ]
  },
  {
    "id": "av_0815",
    "name": "눈의 여왕",
    "slot": "showFace",
    "category": "몸",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "55회차",
      "눈의",
      "여왕"
    ]
  },
  {
    "id": "av_0816",
    "name": "스노우 플레이크 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "55회차",
      "스노우",
      "플레이크",
      "발자국"
    ]
  },
  {
    "id": "av_0817",
    "name": "첨벙첨벙 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "55회차",
      "첨벙첨벙",
      "발자국"
    ]
  },
  {
    "id": "av_0818",
    "name": "색종이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "55회차",
      "색종이",
      "발자국"
    ]
  },
  {
    "id": "av_0819",
    "name": "꿈꾸는 양 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "55회차",
      "꿈꾸는",
      "발자국"
    ]
  },
  {
    "id": "av_0820",
    "name": "팝콘의 탄생 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "55회차",
      "팝콘의",
      "탄생",
      "발자국"
    ]
  },
  {
    "id": "av_0821",
    "name": "첫눈 오는 날",
    "slot": "showEffect",
    "category": "효과",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "55회차",
      "첫눈",
      "오는"
    ]
  },
  {
    "id": "av_0822",
    "name": "눈 장난",
    "slot": "showEffect",
    "category": "효과",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "55회차",
      "장난"
    ]
  },
  {
    "id": "av_0823",
    "name": "스노우 볼",
    "slot": "showEffect",
    "category": "효과",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "55회차",
      "스노우"
    ]
  },
  {
    "id": "av_0824",
    "name": "핫초코 머그컵",
    "slot": "showEffect",
    "category": "효과",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "55회차",
      "핫초코",
      "머그컵"
    ]
  },
  {
    "id": "av_0825",
    "name": "프로즌 서클",
    "slot": "showEffect",
    "category": "효과",
    "round": "55회차",
    "tab": "51~55회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "55회차",
      "프로즌",
      "서클"
    ]
  },
  {
    "id": "av_0826",
    "name": "신드바드의 터번",
    "slot": "showHead",
    "category": "투구",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "46회차",
      "신드바드의",
      "터번"
    ]
  },
  {
    "id": "av_0827",
    "name": "적미호 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "46회차",
      "적미호",
      "모자"
    ]
  },
  {
    "id": "av_0828",
    "name": "캣 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "46회차",
      "크라운"
    ]
  },
  {
    "id": "av_0829",
    "name": "라쿤과 여우",
    "slot": "showHead",
    "category": "투구",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "46회차",
      "라쿤과",
      "여우"
    ]
  },
  {
    "id": "av_0830",
    "name": "들꽃 밀짚모자",
    "slot": "showHead",
    "category": "투구",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "46회차",
      "들꽃",
      "밀짚모자"
    ]
  },
  {
    "id": "av_0831",
    "name": "바니걸 베스트",
    "slot": "showHead",
    "category": "머리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "46회차",
      "바니걸",
      "베스트"
    ]
  },
  {
    "id": "av_0832",
    "name": "피아노 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "46회차",
      "피아노",
      "케이프"
    ]
  },
  {
    "id": "av_0833",
    "name": "애플 세일러",
    "slot": "showHead",
    "category": "머리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "46회차",
      "애플",
      "세일러"
    ]
  },
  {
    "id": "av_0834",
    "name": "체리 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "46회차",
      "체리",
      "이어링"
    ]
  },
  {
    "id": "av_0835",
    "name": "코스모 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "46회차",
      "코스모",
      "케이프"
    ]
  },
  {
    "id": "av_0836",
    "name": "잉어킹",
    "slot": "showArmor",
    "category": "몸",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "46회차",
      "잉어킹"
    ]
  },
  {
    "id": "av_0837",
    "name": "해신",
    "slot": "showArmor",
    "category": "몸",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "46회차",
      "해신"
    ]
  },
  {
    "id": "av_0838",
    "name": "스위트 베이비 베어",
    "slot": "showArmor",
    "category": "몸",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "46회차",
      "스위트",
      "베이비",
      "베어"
    ]
  },
  {
    "id": "av_0839",
    "name": "메이드 캣",
    "slot": "showArmor",
    "category": "몸",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "46회차",
      "메이드"
    ]
  },
  {
    "id": "av_0840",
    "name": "적미호",
    "slot": "showArmor",
    "category": "몸",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "46회차",
      "적미호"
    ]
  },
  {
    "id": "av_0841",
    "name": "붉은 불길 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "46회차",
      "붉은",
      "불길",
      "발자국"
    ]
  },
  {
    "id": "av_0842",
    "name": "데스 노크 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "46회차",
      "데스",
      "노크",
      "발자국"
    ]
  },
  {
    "id": "av_0843",
    "name": "하트팝 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "46회차",
      "하트팝",
      "발자국"
    ]
  },
  {
    "id": "av_0844",
    "name": "산양 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "46회차",
      "산양",
      "발자국"
    ]
  },
  {
    "id": "av_0845",
    "name": "수상한 연기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "46회차",
      "수상한",
      "연기",
      "발자국"
    ]
  },
  {
    "id": "av_0846",
    "name": "라이프 스톰",
    "slot": "showEffect",
    "category": "효과",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "46회차",
      "라이프",
      "스톰"
    ]
  },
  {
    "id": "av_0847",
    "name": "곡예하는 돌고래",
    "slot": "showEffect",
    "category": "효과",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "46회차",
      "곡예하는",
      "돌고래"
    ]
  },
  {
    "id": "av_0848",
    "name": "유니콘",
    "slot": "showEffect",
    "category": "효과",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "46회차",
      "유니콘"
    ]
  },
  {
    "id": "av_0849",
    "name": "미네의 나들이",
    "slot": "showEffect",
    "category": "효과",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "46회차",
      "미네의",
      "나들이"
    ]
  },
  {
    "id": "av_0850",
    "name": "예언의 구슬",
    "slot": "showEffect",
    "category": "효과",
    "round": "46회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "46회차",
      "예언의",
      "구슬"
    ]
  },
  {
    "id": "av_0851",
    "name": "가장",
    "slot": "showHead",
    "category": "투구",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "47회차",
      "가장"
    ]
  },
  {
    "id": "av_0852",
    "name": "대악마의 뿔",
    "slot": "showHead",
    "category": "투구",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "47회차",
      "대악마의"
    ]
  },
  {
    "id": "av_0853",
    "name": "울프 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "47회차",
      "울프",
      "후드"
    ]
  },
  {
    "id": "av_0854",
    "name": "애플 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "47회차",
      "애플",
      "베레모"
    ]
  },
  {
    "id": "av_0855",
    "name": "커넥터 캣",
    "slot": "showHead",
    "category": "투구",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "47회차",
      "커넥터"
    ]
  },
  {
    "id": "av_0856",
    "name": "테일즈예보 - 흐림",
    "slot": "showHead",
    "category": "머리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "47회차",
      "테일즈예보",
      "흐림"
    ]
  },
  {
    "id": "av_0857",
    "name": "반짝반짝 목도리",
    "slot": "showHead",
    "category": "머리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "47회차",
      "반짝반짝",
      "목도리"
    ]
  },
  {
    "id": "av_0858",
    "name": "왕가의 목걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "47회차",
      "왕가의",
      "목걸이"
    ]
  },
  {
    "id": "av_0859",
    "name": "비치 세일러 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "47회차",
      "비치",
      "세일러",
      "케이프"
    ]
  },
  {
    "id": "av_0860",
    "name": "마크라메 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "47회차",
      "마크라메",
      "이어링"
    ]
  },
  {
    "id": "av_0861",
    "name": "분홍 고양이 리본 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "47회차",
      "분홍",
      "고양이",
      "리본",
      "꼬리"
    ]
  },
  {
    "id": "av_0862",
    "name": "무녀 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "47회차",
      "무녀",
      "망토"
    ]
  },
  {
    "id": "av_0863",
    "name": "빙룡의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "47회차",
      "빙룡의",
      "날개"
    ]
  },
  {
    "id": "av_0864",
    "name": "세인트 스톨",
    "slot": "showArmor",
    "category": "몸",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "47회차",
      "세인트",
      "스톨"
    ]
  },
  {
    "id": "av_0865",
    "name": "새장 속 요정",
    "slot": "showArmor",
    "category": "몸",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "47회차",
      "새장",
      "요정"
    ]
  },
  {
    "id": "av_0866",
    "name": "보라 나비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "47회차",
      "보라",
      "나비",
      "발자국"
    ]
  },
  {
    "id": "av_0867",
    "name": "스컬 고스트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "47회차",
      "스컬",
      "고스트",
      "발자국"
    ]
  },
  {
    "id": "av_0868",
    "name": "카드 잭팟 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "47회차",
      "카드",
      "잭팟",
      "발자국"
    ]
  },
  {
    "id": "av_0869",
    "name": "매화 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "47회차",
      "매화",
      "발자국"
    ]
  },
  {
    "id": "av_0870",
    "name": "떨어지는 방울 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "47회차",
      "떨어지는",
      "방울",
      "발자국"
    ]
  },
  {
    "id": "av_0871",
    "name": "다크 아우라",
    "slot": "showEffect",
    "category": "효과",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "47회차",
      "다크",
      "아우라"
    ]
  },
  {
    "id": "av_0872",
    "name": "테일즈 괴담",
    "slot": "showEffect",
    "category": "효과",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "47회차",
      "테일즈",
      "괴담"
    ]
  },
  {
    "id": "av_0873",
    "name": "빵터진 곰인형",
    "slot": "showEffect",
    "category": "효과",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "47회차",
      "빵터진",
      "곰인형"
    ]
  },
  {
    "id": "av_0874",
    "name": "로얄 에그",
    "slot": "showEffect",
    "category": "효과",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "47회차",
      "로얄",
      "에그"
    ]
  },
  {
    "id": "av_0875",
    "name": "느긋한 사바나",
    "slot": "showEffect",
    "category": "효과",
    "round": "47회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "47회차",
      "느긋한",
      "사바나"
    ]
  },
  {
    "id": "av_0876",
    "name": "장난꾸러기 토끼",
    "slot": "showHead",
    "category": "투구",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "48회차",
      "장난꾸러기",
      "토끼"
    ]
  },
  {
    "id": "av_0877",
    "name": "산양 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "48회차",
      "산양",
      "머리띠"
    ]
  },
  {
    "id": "av_0878",
    "name": "스위트 베이비 베어 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "48회차",
      "스위트",
      "베이비",
      "베어"
    ]
  },
  {
    "id": "av_0879",
    "name": "블랙 페더 티아라",
    "slot": "showHead",
    "category": "투구",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "48회차",
      "블랙",
      "페더",
      "티아라"
    ]
  },
  {
    "id": "av_0880",
    "name": "캣 캐스켓",
    "slot": "showHead",
    "category": "투구",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "48회차",
      "캐스켓"
    ]
  },
  {
    "id": "av_0881",
    "name": "버터플라이 피어스",
    "slot": "showHead",
    "category": "머리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "48회차",
      "버터플라이",
      "피어스"
    ]
  },
  {
    "id": "av_0882",
    "name": "둘둘 하얀 꼬리",
    "slot": "showBack",
    "category": "머리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "48회차",
      "둘둘",
      "하얀",
      "꼬리"
    ]
  },
  {
    "id": "av_0883",
    "name": "물빛 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "48회차",
      "물빛",
      "케이프"
    ]
  },
  {
    "id": "av_0884",
    "name": "루비 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "48회차",
      "루비",
      "귀걸이"
    ]
  },
  {
    "id": "av_0885",
    "name": "분노",
    "slot": "showHead",
    "category": "머리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "48회차",
      "분노"
    ]
  },
  {
    "id": "av_0886",
    "name": "풍성한 꼬리털 장식",
    "slot": "showBack",
    "category": "몸",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "48회차",
      "풍성한",
      "꼬리털",
      "장식"
    ]
  },
  {
    "id": "av_0887",
    "name": "다소곳 곰",
    "slot": "showArmor",
    "category": "몸",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "48회차",
      "다소곳"
    ]
  },
  {
    "id": "av_0888",
    "name": "시간의 마도사",
    "slot": "showArmor",
    "category": "몸",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "48회차",
      "시간의",
      "마도사"
    ]
  },
  {
    "id": "av_0889",
    "name": "징조",
    "slot": "showArmor",
    "category": "몸",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "48회차",
      "징조"
    ]
  },
  {
    "id": "av_0890",
    "name": "권능",
    "slot": "showArmor",
    "category": "몸",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "48회차",
      "권능"
    ]
  },
  {
    "id": "av_0891",
    "name": "콜 라이트닝 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "48회차",
      "라이트닝",
      "발자국"
    ]
  },
  {
    "id": "av_0892",
    "name": "달마 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "48회차",
      "달마",
      "발자국"
    ]
  },
  {
    "id": "av_0893",
    "name": "마그마 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "48회차",
      "마그마",
      "발자국"
    ]
  },
  {
    "id": "av_0894",
    "name": "여름 향기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "48회차",
      "여름",
      "향기",
      "발자국"
    ]
  },
  {
    "id": "av_0895",
    "name": "열기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "48회차",
      "열기",
      "발자국"
    ]
  },
  {
    "id": "av_0896",
    "name": "물장난 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "48회차",
      "물장난",
      "젤리삐"
    ]
  },
  {
    "id": "av_0897",
    "name": "별이 내리는 세계",
    "slot": "showEffect",
    "category": "효과",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "48회차",
      "별이",
      "내리는",
      "세계"
    ]
  },
  {
    "id": "av_0898",
    "name": "나비의 가호",
    "slot": "showEffect",
    "category": "효과",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "48회차",
      "나비의",
      "가호"
    ]
  },
  {
    "id": "av_0899",
    "name": "성화봉송 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "48회차",
      "성화봉송",
      "젤리삐"
    ]
  },
  {
    "id": "av_0900",
    "name": "고요한 까마귀",
    "slot": "showEffect",
    "category": "효과",
    "round": "48회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "48회차",
      "고요한",
      "까마귀"
    ]
  },
  {
    "id": "av_0901",
    "name": "스타더스트 리본",
    "slot": "showHead",
    "category": "투구",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "49회차",
      "스타더스트",
      "리본"
    ]
  },
  {
    "id": "av_0902",
    "name": "라비라비 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "49회차",
      "라비라비",
      "후드"
    ]
  },
  {
    "id": "av_0903",
    "name": "로즈 칵테일",
    "slot": "showHead",
    "category": "투구",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "49회차",
      "로즈",
      "칵테일"
    ]
  },
  {
    "id": "av_0904",
    "name": "플라워 네스트",
    "slot": "showHead",
    "category": "투구",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "49회차",
      "플라워",
      "네스트"
    ]
  },
  {
    "id": "av_0905",
    "name": "스테이스 카추샤",
    "slot": "showHead",
    "category": "투구",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "49회차",
      "스테이스",
      "카추샤"
    ]
  },
  {
    "id": "av_0906",
    "name": "에메랄드 귀 장식",
    "slot": "showHead",
    "category": "머리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "49회차",
      "에메랄드",
      "장식"
    ]
  },
  {
    "id": "av_0907",
    "name": "코스모스 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "49회차",
      "코스모스",
      "케이프"
    ]
  },
  {
    "id": "av_0908",
    "name": "쿠키 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "49회차",
      "쿠키",
      "이어링"
    ]
  },
  {
    "id": "av_0909",
    "name": "수정 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "49회차",
      "수정",
      "귀걸이"
    ]
  },
  {
    "id": "av_0910",
    "name": "스트라이프 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "49회차",
      "스트라이프",
      "케이프"
    ]
  },
  {
    "id": "av_0911",
    "name": "하늘하늘 리본",
    "slot": "showArmor",
    "category": "몸",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "49회차",
      "하늘하늘",
      "리본"
    ]
  },
  {
    "id": "av_0912",
    "name": "알로하 리본",
    "slot": "showArmor",
    "category": "몸",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "49회차",
      "알로하",
      "리본"
    ]
  },
  {
    "id": "av_0913",
    "name": "여린 나비 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "49회차",
      "여린",
      "나비",
      "날개"
    ]
  },
  {
    "id": "av_0914",
    "name": "로맨틱 노트 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "49회차",
      "로맨틱",
      "노트",
      "코트"
    ]
  },
  {
    "id": "av_0915",
    "name": "궁중 마법사 로브",
    "slot": "showArmor",
    "category": "몸",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "49회차",
      "궁중",
      "마법사",
      "로브"
    ]
  },
  {
    "id": "av_0916",
    "name": "꽃나비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "49회차",
      "꽃나비",
      "발자국"
    ]
  },
  {
    "id": "av_0917",
    "name": "파문 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "49회차",
      "파문",
      "발자국"
    ]
  },
  {
    "id": "av_0918",
    "name": "무선 조종 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "49회차",
      "무선",
      "조종",
      "발자국"
    ]
  },
  {
    "id": "av_0919",
    "name": "스케치 하트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "49회차",
      "스케치",
      "하트",
      "발자국"
    ]
  },
  {
    "id": "av_0920",
    "name": "꼬챙이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "49회차",
      "꼬챙이",
      "발자국"
    ]
  },
  {
    "id": "av_0921",
    "name": "체리 젤리",
    "slot": "showEffect",
    "category": "효과",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "49회차",
      "체리",
      "젤리"
    ]
  },
  {
    "id": "av_0922",
    "name": "블랙 오팔",
    "slot": "showEffect",
    "category": "효과",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "49회차",
      "블랙",
      "오팔"
    ]
  },
  {
    "id": "av_0923",
    "name": "대롱대롱 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "49회차",
      "대롱대롱",
      "젤리삐"
    ]
  },
  {
    "id": "av_0924",
    "name": "슈빌",
    "slot": "showEffect",
    "category": "효과",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "49회차",
      "슈빌"
    ]
  },
  {
    "id": "av_0925",
    "name": "냥이",
    "slot": "showEffect",
    "category": "효과",
    "round": "49회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "49회차",
      "냥이"
    ]
  },
  {
    "id": "av_0926",
    "name": "나이트메어 캡",
    "slot": "showHead",
    "category": "투구",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "50회차",
      "나이트메어"
    ]
  },
  {
    "id": "av_0927",
    "name": "해적왕",
    "slot": "showHead",
    "category": "투구",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "50회차",
      "해적왕"
    ]
  },
  {
    "id": "av_0928",
    "name": "네모필라 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "50회차",
      "네모필라",
      "헤어밴드"
    ]
  },
  {
    "id": "av_0929",
    "name": "뻔뻔한 고양이",
    "slot": "showHead",
    "category": "투구",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "50회차",
      "뻔뻔한",
      "고양이"
    ]
  },
  {
    "id": "av_0930",
    "name": "검은 토끼 리본 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "50회차",
      "검은",
      "토끼",
      "리본",
      "머리띠"
    ]
  },
  {
    "id": "av_0931",
    "name": "카이저 스타일 수염",
    "slot": "showFace",
    "category": "머리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "50회차",
      "카이저",
      "스타일",
      "수염"
    ]
  },
  {
    "id": "av_0932",
    "name": "빙빙 벨트",
    "slot": "showHead",
    "category": "머리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "50회차",
      "빙빙",
      "벨트"
    ]
  },
  {
    "id": "av_0933",
    "name": "모자이크",
    "slot": "showHead",
    "category": "머리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "50회차",
      "모자이크"
    ]
  },
  {
    "id": "av_0934",
    "name": "별 목걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "50회차",
      "목걸이"
    ]
  },
  {
    "id": "av_0935",
    "name": "러셀 레이스 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "50회차",
      "러셀",
      "레이스",
      "케이프"
    ]
  },
  {
    "id": "av_0936",
    "name": "나그네",
    "slot": "showArmor",
    "category": "몸",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "50회차",
      "나그네"
    ]
  },
  {
    "id": "av_0937",
    "name": "다크 문",
    "slot": "showArmor",
    "category": "몸",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "50회차",
      "다크"
    ]
  },
  {
    "id": "av_0938",
    "name": "다크 크라운 셉터",
    "slot": "showArmor",
    "category": "몸",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "50회차",
      "다크",
      "크라운",
      "셉터"
    ]
  },
  {
    "id": "av_0939",
    "name": "플래닛 문 완드",
    "slot": "showSubArms",
    "category": "몸",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "50회차",
      "플래닛",
      "완드"
    ]
  },
  {
    "id": "av_0940",
    "name": "체인 크로우",
    "slot": "showArmor",
    "category": "몸",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "50회차",
      "체인",
      "크로우"
    ]
  },
  {
    "id": "av_0941",
    "name": "하트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "50회차",
      "하트",
      "발자국"
    ]
  },
  {
    "id": "av_0942",
    "name": "금가루 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "50회차",
      "금가루",
      "발자국"
    ]
  },
  {
    "id": "av_0943",
    "name": "찌리릿 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "50회차",
      "찌리릿",
      "발자국"
    ]
  },
  {
    "id": "av_0944",
    "name": "디멘션 크러쉬 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "50회차",
      "디멘션",
      "크러쉬",
      "발자국"
    ]
  },
  {
    "id": "av_0945",
    "name": "톡신 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "50회차",
      "톡신",
      "발자국"
    ]
  },
  {
    "id": "av_0946",
    "name": "매지컬 라이트",
    "slot": "showEffect",
    "category": "효과",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "50회차",
      "매지컬",
      "라이트"
    ]
  },
  {
    "id": "av_0947",
    "name": "블러디 로즈",
    "slot": "showEffect",
    "category": "효과",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "50회차",
      "블러디",
      "로즈"
    ]
  },
  {
    "id": "av_0948",
    "name": "붉은 바람개비",
    "slot": "showEffect",
    "category": "효과",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "50회차",
      "붉은",
      "바람개비"
    ]
  },
  {
    "id": "av_0949",
    "name": "업라이징 파이어",
    "slot": "showEffect",
    "category": "효과",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "50회차",
      "업라이징",
      "파이어"
    ]
  },
  {
    "id": "av_0950",
    "name": "두둥실 멍멍이",
    "slot": "showEffect",
    "category": "효과",
    "round": "50회차",
    "tab": "46~50회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "50회차",
      "두둥실",
      "멍멍이"
    ]
  },
  {
    "id": "av_0951",
    "name": "검은 터키시 앙고라",
    "slot": "showHead",
    "category": "투구",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "41회차",
      "검은",
      "터키시",
      "앙고라"
    ]
  },
  {
    "id": "av_0952",
    "name": "군악대장",
    "slot": "showHead",
    "category": "투구",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "41회차",
      "군악대장"
    ]
  },
  {
    "id": "av_0953",
    "name": "근엄한 젤리삐 왕관",
    "slot": "showHead",
    "category": "투구",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "41회차",
      "근엄한",
      "젤리삐",
      "왕관"
    ]
  },
  {
    "id": "av_0954",
    "name": "봉봉 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "41회차",
      "봉봉",
      "베레모"
    ]
  },
  {
    "id": "av_0955",
    "name": "하이디 보닛",
    "slot": "showHead",
    "category": "투구",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "41회차",
      "하이디",
      "보닛"
    ]
  },
  {
    "id": "av_0956",
    "name": "인텔리전스 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "41회차",
      "인텔리전스",
      "머플러"
    ]
  },
  {
    "id": "av_0957",
    "name": "군악대 외투",
    "slot": "showHead",
    "category": "머리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "41회차",
      "군악대",
      "외투"
    ]
  },
  {
    "id": "av_0958",
    "name": "의장대 외투",
    "slot": "showHead",
    "category": "머리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "41회차",
      "의장대",
      "외투"
    ]
  },
  {
    "id": "av_0959",
    "name": "봉봉 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "41회차",
      "봉봉",
      "케이프"
    ]
  },
  {
    "id": "av_0960",
    "name": "하이디 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "41회차",
      "하이디",
      "케이프"
    ]
  },
  {
    "id": "av_0961",
    "name": "동백",
    "slot": "showArmor",
    "category": "몸",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "41회차",
      "동백"
    ]
  },
  {
    "id": "av_0962",
    "name": "여린 요정 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "41회차",
      "여린",
      "요정",
      "날개"
    ]
  },
  {
    "id": "av_0963",
    "name": "시크릿 노블",
    "slot": "showArmor",
    "category": "몸",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "41회차",
      "시크릿",
      "노블"
    ]
  },
  {
    "id": "av_0964",
    "name": "플리츠 프릴 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "41회차",
      "플리츠",
      "프릴",
      "망토"
    ]
  },
  {
    "id": "av_0965",
    "name": "파일 벙커",
    "slot": "showArmor",
    "category": "몸",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "41회차",
      "파일",
      "벙커"
    ]
  },
  {
    "id": "av_0966",
    "name": "은하수 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "41회차",
      "은하수",
      "발자국"
    ]
  },
  {
    "id": "av_0967",
    "name": "물폭탄 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "41회차",
      "물폭탄",
      "발자국"
    ]
  },
  {
    "id": "av_0968",
    "name": "요즈렐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "41회차",
      "요즈렐",
      "발자국"
    ]
  },
  {
    "id": "av_0969",
    "name": "연꽃 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "41회차",
      "연꽃",
      "발자국"
    ]
  },
  {
    "id": "av_0970",
    "name": "증거인멸 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "41회차",
      "증거인멸",
      "발자국"
    ]
  },
  {
    "id": "av_0971",
    "name": "매지컬 이스터 에그",
    "slot": "showEffect",
    "category": "효과",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "41회차",
      "매지컬",
      "이스터",
      "에그"
    ]
  },
  {
    "id": "av_0972",
    "name": "아장아장 오리",
    "slot": "showEffect",
    "category": "효과",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "41회차",
      "아장아장",
      "오리"
    ]
  },
  {
    "id": "av_0973",
    "name": "씩씩한 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "41회차",
      "씩씩한",
      "젤리삐"
    ]
  },
  {
    "id": "av_0974",
    "name": "봄바람",
    "slot": "showEffect",
    "category": "효과",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "41회차",
      "봄바람"
    ]
  },
  {
    "id": "av_0975",
    "name": "토끼 뒤를 쫓는 작아진 앨리스",
    "slot": "showEffect",
    "category": "효과",
    "round": "41회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "41회차",
      "토끼",
      "뒤를",
      "쫓는",
      "작아진",
      "앨리스"
    ]
  },
  {
    "id": "av_0976",
    "name": "평온의 밤",
    "slot": "showHead",
    "category": "투구",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "42회차",
      "평온의"
    ]
  },
  {
    "id": "av_0977",
    "name": "소녀의 봄",
    "slot": "showHead",
    "category": "투구",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "42회차",
      "소녀의"
    ]
  },
  {
    "id": "av_0978",
    "name": "러브미",
    "slot": "showHead",
    "category": "투구",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "42회차",
      "러브미"
    ]
  },
  {
    "id": "av_0979",
    "name": "체리블라썸 헤어핀",
    "slot": "showHead",
    "category": "투구",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "42회차",
      "체리블라썸",
      "헤어핀"
    ]
  },
  {
    "id": "av_0980",
    "name": "버블 파이프",
    "slot": "showHead",
    "category": "머리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "42회차",
      "버블",
      "파이프"
    ]
  },
  {
    "id": "av_0981",
    "name": "락 쵸커",
    "slot": "showHead",
    "category": "머리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "42회차",
      "쵸커"
    ]
  },
  {
    "id": "av_0982",
    "name": "스타더스트 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "42회차",
      "스타더스트",
      "케이프"
    ]
  },
  {
    "id": "av_0983",
    "name": "오렌지 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "42회차",
      "오렌지",
      "이어링"
    ]
  },
  {
    "id": "av_0984",
    "name": "입에 문 붉은 장미",
    "slot": "showHead",
    "category": "머리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "42회차",
      "입에",
      "붉은",
      "장미"
    ]
  },
  {
    "id": "av_0985",
    "name": "슈팅스타 머플러",
    "slot": "showFace",
    "category": "몸",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "42회차",
      "슈팅스타",
      "머플러"
    ]
  },
  {
    "id": "av_0986",
    "name": "갤럭시 루트",
    "slot": "showArmor",
    "category": "몸",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "42회차",
      "갤럭시",
      "루트"
    ]
  },
  {
    "id": "av_0987",
    "name": "매혹의 삼미호",
    "slot": "showArmor",
    "category": "몸",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "42회차",
      "매혹의",
      "삼미호"
    ]
  },
  {
    "id": "av_0988",
    "name": "밤하늘 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "42회차",
      "밤하늘",
      "날개"
    ]
  },
  {
    "id": "av_0989",
    "name": "과일 바구니 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "42회차",
      "과일",
      "바구니",
      "배낭"
    ]
  },
  {
    "id": "av_0990",
    "name": "사과 속 애벌레 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "42회차",
      "사과",
      "애벌레",
      "발자국"
    ]
  },
  {
    "id": "av_0991",
    "name": "퍼피룸 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "42회차",
      "퍼피룸",
      "발자국"
    ]
  },
  {
    "id": "av_0992",
    "name": "별 속 우주 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "42회차",
      "우주",
      "발자국"
    ]
  },
  {
    "id": "av_0993",
    "name": "먹구름 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "42회차",
      "먹구름",
      "발자국"
    ]
  },
  {
    "id": "av_0994",
    "name": "오리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "42회차",
      "오리",
      "발자국"
    ]
  },
  {
    "id": "av_0995",
    "name": "돈방석",
    "slot": "showEffect",
    "category": "효과",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "42회차",
      "돈방석"
    ]
  },
  {
    "id": "av_0996",
    "name": "반짝반짝 보석",
    "slot": "showEffect",
    "category": "효과",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "42회차",
      "반짝반짝",
      "보석"
    ]
  },
  {
    "id": "av_0997",
    "name": "영수 기린",
    "slot": "showEffect",
    "category": "효과",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "42회차",
      "영수",
      "기린"
    ]
  },
  {
    "id": "av_0998",
    "name": "젤리삐 우산 돌리기",
    "slot": "showEffect",
    "category": "효과",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "42회차",
      "젤리삐",
      "우산",
      "돌리기"
    ]
  },
  {
    "id": "av_0999",
    "name": "젤리삐 풍선 그네",
    "slot": "showEffect",
    "category": "효과",
    "round": "42회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "42회차",
      "젤리삐",
      "풍선",
      "그네"
    ]
  },
  {
    "id": "av_1000",
    "name": "스컬 헤어핀",
    "slot": "showHead",
    "category": "투구",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "43회차",
      "스컬",
      "헤어핀"
    ]
  },
  {
    "id": "av_1001",
    "name": "브라이드 리본 베일",
    "slot": "showHead",
    "category": "투구",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "43회차",
      "브라이드",
      "리본",
      "베일"
    ]
  },
  {
    "id": "av_1002",
    "name": "화조풍월",
    "slot": "showHead",
    "category": "투구",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "43회차",
      "화조풍월"
    ]
  },
  {
    "id": "av_1003",
    "name": "머리 위 올빼미",
    "slot": "showHead",
    "category": "투구",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "43회차",
      "머리",
      "올빼미"
    ]
  },
  {
    "id": "av_1004",
    "name": "붓다",
    "slot": "showHead",
    "category": "투구",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "43회차",
      "붓다"
    ]
  },
  {
    "id": "av_1005",
    "name": "밀리터리 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "43회차",
      "밀리터리",
      "스카프"
    ]
  },
  {
    "id": "av_1006",
    "name": "블루 펑키 선글라스",
    "slot": "showFace",
    "category": "머리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "43회차",
      "블루",
      "펑키",
      "선글라스"
    ]
  },
  {
    "id": "av_1007",
    "name": "플라워 섬머 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "43회차",
      "플라워",
      "섬머",
      "스카프"
    ]
  },
  {
    "id": "av_1008",
    "name": "키 쵸커",
    "slot": "showHead",
    "category": "머리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "43회차",
      "쵸커"
    ]
  },
  {
    "id": "av_1009",
    "name": "목에 건 고글",
    "slot": "showHead",
    "category": "머리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "43회차",
      "목에",
      "고글"
    ]
  },
  {
    "id": "av_1010",
    "name": "몽환 보라 등불",
    "slot": "showArmor",
    "category": "몸",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "43회차",
      "몽환",
      "보라",
      "등불"
    ]
  },
  {
    "id": "av_1011",
    "name": "검은 고양이 리본 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "43회차",
      "검은",
      "고양이",
      "리본",
      "꼬리"
    ]
  },
  {
    "id": "av_1012",
    "name": "마가렛 엄브렐라",
    "slot": "showArmor",
    "category": "몸",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "43회차",
      "마가렛",
      "엄브렐라"
    ]
  },
  {
    "id": "av_1013",
    "name": "속삭이는 은방울꽃",
    "slot": "showArmor",
    "category": "몸",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "43회차",
      "속삭이는",
      "은방울꽃"
    ]
  },
  {
    "id": "av_1014",
    "name": "앨리스 티나이프",
    "slot": "showArmor",
    "category": "몸",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "43회차",
      "앨리스",
      "티나이프"
    ]
  },
  {
    "id": "av_1015",
    "name": "몽환나비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "43회차",
      "몽환나비",
      "발자국"
    ]
  },
  {
    "id": "av_1016",
    "name": "신비의 숲 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "43회차",
      "신비의",
      "발자국"
    ]
  },
  {
    "id": "av_1017",
    "name": "토끼 삼남매 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "43회차",
      "토끼",
      "삼남매",
      "발자국"
    ]
  },
  {
    "id": "av_1018",
    "name": "봉인의 지팡이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "43회차",
      "봉인의",
      "지팡이",
      "발자국"
    ]
  },
  {
    "id": "av_1019",
    "name": "페스티벌 도트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "43회차",
      "페스티벌",
      "도트",
      "발자국"
    ]
  },
  {
    "id": "av_1020",
    "name": "쾌유기원 링거",
    "slot": "showEffect",
    "category": "효과",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "43회차",
      "쾌유기원",
      "링거"
    ]
  },
  {
    "id": "av_1021",
    "name": "플라워 서클",
    "slot": "showEffect",
    "category": "효과",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "43회차",
      "플라워",
      "서클"
    ]
  },
  {
    "id": "av_1022",
    "name": "천상의 하모니",
    "slot": "showEffect",
    "category": "효과",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "43회차",
      "천상의",
      "하모니"
    ]
  },
  {
    "id": "av_1023",
    "name": "트윙클 페어리",
    "slot": "showEffect",
    "category": "효과",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "43회차",
      "트윙클",
      "페어리"
    ]
  },
  {
    "id": "av_1024",
    "name": "백사",
    "slot": "showEffect",
    "category": "효과",
    "round": "43회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "43회차",
      "백사"
    ]
  },
  {
    "id": "av_1025",
    "name": "풀잎",
    "slot": "showHead",
    "category": "투구",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "44회차",
      "풀잎"
    ]
  },
  {
    "id": "av_1026",
    "name": "머리 위 청개구리",
    "slot": "showHead",
    "category": "투구",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "44회차",
      "머리",
      "청개구리"
    ]
  },
  {
    "id": "av_1027",
    "name": "피크닉 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "44회차",
      "피크닉"
    ]
  },
  {
    "id": "av_1028",
    "name": "레드 체크 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "44회차",
      "레드",
      "체크",
      "헤어밴드"
    ]
  },
  {
    "id": "av_1029",
    "name": "굿나잇 헤어밴드",
    "slot": "showHead",
    "category": "투구",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "44회차",
      "굿나잇",
      "헤어밴드"
    ]
  },
  {
    "id": "av_1030",
    "name": "다이스 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "44회차",
      "다이스",
      "이어링"
    ]
  },
  {
    "id": "av_1031",
    "name": "페스티벌 메이크업",
    "slot": "showHead",
    "category": "머리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "44회차",
      "페스티벌",
      "메이크업"
    ]
  },
  {
    "id": "av_1032",
    "name": "개나리 헤어핀",
    "slot": "showHead",
    "category": "머리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "44회차",
      "개나리",
      "헤어핀"
    ]
  },
  {
    "id": "av_1033",
    "name": "레드 체크 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "44회차",
      "레드",
      "체크",
      "스카프"
    ]
  },
  {
    "id": "av_1034",
    "name": "꿈나라",
    "slot": "showHead",
    "category": "머리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "44회차",
      "꿈나라"
    ]
  },
  {
    "id": "av_1035",
    "name": "머스킷티어",
    "slot": "showArmor",
    "category": "몸",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "44회차",
      "머스킷티어"
    ]
  },
  {
    "id": "av_1036",
    "name": "매스커레이드",
    "slot": "showArmor",
    "category": "몸",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "44회차",
      "매스커레이드"
    ]
  },
  {
    "id": "av_1037",
    "name": "전개",
    "slot": "showArmor",
    "category": "몸",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "44회차",
      "전개"
    ]
  },
  {
    "id": "av_1038",
    "name": "밀크 카우 후드",
    "slot": "showArmor",
    "category": "몸",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "44회차",
      "밀크",
      "카우",
      "후드"
    ]
  },
  {
    "id": "av_1039",
    "name": "블랙캣 파카",
    "slot": "showArmor",
    "category": "몸",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "44회차",
      "블랙캣",
      "파카"
    ]
  },
  {
    "id": "av_1040",
    "name": "심연의 눈 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "44회차",
      "심연의",
      "발자국"
    ]
  },
  {
    "id": "av_1041",
    "name": "땀땀 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "44회차",
      "땀땀",
      "발자국"
    ]
  },
  {
    "id": "av_1042",
    "name": "용암 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "44회차",
      "용암",
      "발자국"
    ]
  },
  {
    "id": "av_1043",
    "name": "하트별 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "44회차",
      "하트별",
      "발자국"
    ]
  },
  {
    "id": "av_1044",
    "name": "바스러지는 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "44회차",
      "바스러지는",
      "발자국"
    ]
  },
  {
    "id": "av_1045",
    "name": "굿나잇 캐노피",
    "slot": "showEffect",
    "category": "효과",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "44회차",
      "굿나잇",
      "캐노피"
    ]
  },
  {
    "id": "av_1046",
    "name": "깊은 연못",
    "slot": "showEffect",
    "category": "효과",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "44회차",
      "깊은",
      "연못"
    ]
  },
  {
    "id": "av_1047",
    "name": "개구리 연못",
    "slot": "showEffect",
    "category": "효과",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "44회차",
      "개구리",
      "연못"
    ]
  },
  {
    "id": "av_1048",
    "name": "스페셜 피크닉",
    "slot": "showEffect",
    "category": "효과",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "44회차",
      "스페셜",
      "피크닉"
    ]
  },
  {
    "id": "av_1049",
    "name": "빙글빙글 모빌",
    "slot": "showEffect",
    "category": "효과",
    "round": "44회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "44회차",
      "빙글빙글",
      "모빌"
    ]
  },
  {
    "id": "av_1050",
    "name": "말괄량이",
    "slot": "showHead",
    "category": "투구",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "45회차",
      "말괄량이"
    ]
  },
  {
    "id": "av_1051",
    "name": "클래식 세일러 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "45회차",
      "클래식",
      "세일러"
    ]
  },
  {
    "id": "av_1052",
    "name": "알로하 헤드 드레스",
    "slot": "showArmor",
    "category": "투구",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "45회차",
      "알로하",
      "헤드",
      "드레스"
    ]
  },
  {
    "id": "av_1053",
    "name": "머리 위 새둥지",
    "slot": "showHead",
    "category": "투구",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "45회차",
      "머리",
      "새둥지"
    ]
  },
  {
    "id": "av_1054",
    "name": "슬리핑 램",
    "slot": "showHead",
    "category": "투구",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "45회차",
      "슬리핑"
    ]
  },
  {
    "id": "av_1055",
    "name": "카우걸 미니베스트",
    "slot": "showHead",
    "category": "머리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "45회차",
      "카우걸",
      "미니베스트"
    ]
  },
  {
    "id": "av_1056",
    "name": "클래식 세일러 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "45회차",
      "클래식",
      "세일러",
      "케이프"
    ]
  },
  {
    "id": "av_1057",
    "name": "알로하 네클리스",
    "slot": "showHead",
    "category": "머리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "45회차",
      "알로하",
      "네클리스"
    ]
  },
  {
    "id": "av_1058",
    "name": "도살자",
    "slot": "showHead",
    "category": "머리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "45회차",
      "도살자"
    ]
  },
  {
    "id": "av_1059",
    "name": "군번줄",
    "slot": "showHead",
    "category": "머리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "45회차",
      "군번줄"
    ]
  },
  {
    "id": "av_1060",
    "name": "아라비안 클로크",
    "slot": "showArmor",
    "category": "몸",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "45회차",
      "아라비안",
      "클로크"
    ]
  },
  {
    "id": "av_1061",
    "name": "운랑 꼬리 장식",
    "slot": "showBack",
    "category": "몸",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "45회차",
      "운랑",
      "꼬리",
      "장식"
    ]
  },
  {
    "id": "av_1062",
    "name": "플라워 페어리",
    "slot": "showArmor",
    "category": "몸",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "45회차",
      "플라워",
      "페어리"
    ]
  },
  {
    "id": "av_1063",
    "name": "화이트로즈 스톨",
    "slot": "showArmor",
    "category": "몸",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "45회차",
      "화이트로즈",
      "스톨"
    ]
  },
  {
    "id": "av_1064",
    "name": "알로하 파라솔",
    "slot": "showArmor",
    "category": "몸",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "45회차",
      "알로하",
      "파라솔"
    ]
  },
  {
    "id": "av_1065",
    "name": "선혈 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "45회차",
      "선혈",
      "발자국"
    ]
  },
  {
    "id": "av_1066",
    "name": "황야의 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "45회차",
      "황야의",
      "발자국"
    ]
  },
  {
    "id": "av_1067",
    "name": "깨진 화분 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "45회차",
      "깨진",
      "화분",
      "발자국"
    ]
  },
  {
    "id": "av_1068",
    "name": "화르르 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "45회차",
      "화르르",
      "발자국"
    ]
  },
  {
    "id": "av_1069",
    "name": "방울방울 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "45회차",
      "방울방울",
      "발자국"
    ]
  },
  {
    "id": "av_1070",
    "name": "젤리삐 파르페",
    "slot": "showEffect",
    "category": "효과",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "45회차",
      "젤리삐",
      "파르페"
    ]
  },
  {
    "id": "av_1071",
    "name": "리버 플로우",
    "slot": "showEffect",
    "category": "효과",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "45회차",
      "리버",
      "플로우"
    ]
  },
  {
    "id": "av_1072",
    "name": "벚꽃비 화과자",
    "slot": "showEffect",
    "category": "효과",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "45회차",
      "벚꽃비",
      "화과자"
    ]
  },
  {
    "id": "av_1073",
    "name": "유모차 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "45회차",
      "유모차",
      "젤리삐"
    ]
  },
  {
    "id": "av_1074",
    "name": "쓰리 고스트",
    "slot": "showEffect",
    "category": "효과",
    "round": "45회차",
    "tab": "41~45회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "45회차",
      "쓰리",
      "고스트"
    ]
  },
  {
    "id": "av_1075",
    "name": "노루의 뿔",
    "slot": "showHead",
    "category": "투구",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "36회차",
      "노루의"
    ]
  },
  {
    "id": "av_1076",
    "name": "뉴비 엔젤 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "36회차",
      "뉴비",
      "엔젤",
      "베레모"
    ]
  },
  {
    "id": "av_1077",
    "name": "알파카 귀마개",
    "slot": "showHead",
    "category": "투구",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "36회차",
      "알파카",
      "귀마개"
    ]
  },
  {
    "id": "av_1078",
    "name": "웨스턴 와일드",
    "slot": "showHead",
    "category": "투구",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "36회차",
      "웨스턴",
      "와일드"
    ]
  },
  {
    "id": "av_1079",
    "name": "치킨 스쿨 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "36회차",
      "치킨",
      "스쿨",
      "베레모"
    ]
  },
  {
    "id": "av_1080",
    "name": "뉴비 엔젤 칼라",
    "slot": "showHead",
    "category": "머리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "36회차",
      "뉴비",
      "엔젤",
      "칼라"
    ]
  },
  {
    "id": "av_1081",
    "name": "블랙로즈 피어스",
    "slot": "showHead",
    "category": "머리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "36회차",
      "블랙로즈",
      "피어스"
    ]
  },
  {
    "id": "av_1082",
    "name": "비애의 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "36회차",
      "비애의",
      "가면"
    ]
  },
  {
    "id": "av_1083",
    "name": "치킨 스쿨 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "36회차",
      "치킨",
      "스쿨",
      "케이프"
    ]
  },
  {
    "id": "av_1084",
    "name": "홀리 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "36회차",
      "홀리",
      "케이프"
    ]
  },
  {
    "id": "av_1085",
    "name": "불꽃 여우 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "36회차",
      "불꽃",
      "여우",
      "꼬리"
    ]
  },
  {
    "id": "av_1086",
    "name": "사자 꼬리 장식",
    "slot": "showBack",
    "category": "몸",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "36회차",
      "사자",
      "꼬리",
      "장식"
    ]
  },
  {
    "id": "av_1087",
    "name": "용맹",
    "slot": "showArmor",
    "category": "몸",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "36회차",
      "용맹"
    ]
  },
  {
    "id": "av_1088",
    "name": "창공의 지배자",
    "slot": "showArmor",
    "category": "몸",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "36회차",
      "창공의",
      "지배자"
    ]
  },
  {
    "id": "av_1089",
    "name": "치킨 스쿨 유니폼",
    "slot": "showArmor",
    "category": "몸",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "36회차",
      "치킨",
      "스쿨",
      "유니폼"
    ]
  },
  {
    "id": "av_1090",
    "name": "땡그랑 한 푼 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "36회차",
      "땡그랑",
      "발자국"
    ]
  },
  {
    "id": "av_1091",
    "name": "뿅! 파인애플 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "36회차",
      "뿅!",
      "파인애플",
      "발자국"
    ]
  },
  {
    "id": "av_1092",
    "name": "삼각김밥 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "36회차",
      "삼각김밥",
      "발자국"
    ]
  },
  {
    "id": "av_1093",
    "name": "오선보 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "36회차",
      "오선보",
      "발자국"
    ]
  },
  {
    "id": "av_1094",
    "name": "찐득한 껌 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "36회차",
      "찐득한",
      "발자국"
    ]
  },
  {
    "id": "av_1095",
    "name": "돌핀 로데오",
    "slot": "showEffect",
    "category": "효과",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "36회차",
      "돌핀",
      "로데오"
    ]
  },
  {
    "id": "av_1096",
    "name": "매지컬 스타 로드",
    "slot": "showEffect",
    "category": "효과",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "36회차",
      "매지컬",
      "스타",
      "로드"
    ]
  },
  {
    "id": "av_1097",
    "name": "우왕좌왕 박쥐들",
    "slot": "showEffect",
    "category": "효과",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "36회차",
      "우왕좌왕",
      "박쥐들"
    ]
  },
  {
    "id": "av_1098",
    "name": "젤리삐 샤워",
    "slot": "showEffect",
    "category": "효과",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "36회차",
      "젤리삐",
      "샤워"
    ]
  },
  {
    "id": "av_1099",
    "name": "치킨 스쿨 북",
    "slot": "showEffect",
    "category": "효과",
    "round": "36회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "36회차",
      "치킨",
      "스쿨"
    ]
  },
  {
    "id": "av_1100",
    "name": "가시 왕관",
    "slot": "showHead",
    "category": "투구",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "37회차",
      "가시",
      "왕관"
    ]
  },
  {
    "id": "av_1101",
    "name": "고양이 예언가",
    "slot": "showHead",
    "category": "투구",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "37회차",
      "고양이",
      "예언가"
    ]
  },
  {
    "id": "av_1102",
    "name": "매지컬 버니 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "37회차",
      "매지컬",
      "버니"
    ]
  },
  {
    "id": "av_1103",
    "name": "체셔 고양이 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "37회차",
      "체셔",
      "고양이"
    ]
  },
  {
    "id": "av_1104",
    "name": "하트퀸 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "37회차",
      "하트퀸",
      "크라운"
    ]
  },
  {
    "id": "av_1105",
    "name": "로맨틱 퍼",
    "slot": "showHead",
    "category": "머리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "37회차",
      "로맨틱"
    ]
  },
  {
    "id": "av_1106",
    "name": "매지컬 버니 베스트",
    "slot": "showHead",
    "category": "머리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "37회차",
      "매지컬",
      "버니",
      "베스트"
    ]
  },
  {
    "id": "av_1107",
    "name": "우아",
    "slot": "showHead",
    "category": "머리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "37회차",
      "우아"
    ]
  },
  {
    "id": "av_1108",
    "name": "체셔 고양이 넥타이",
    "slot": "showFace",
    "category": "머리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "37회차",
      "체셔",
      "고양이",
      "넥타이"
    ]
  },
  {
    "id": "av_1109",
    "name": "하얀 고양이 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "37회차",
      "하얀",
      "고양이",
      "머플러"
    ]
  },
  {
    "id": "av_1110",
    "name": "레서판다 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "37회차",
      "레서판다",
      "꼬리"
    ]
  },
  {
    "id": "av_1111",
    "name": "매지컬 버니 턱시도",
    "slot": "showArmor",
    "category": "몸",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "37회차",
      "매지컬",
      "버니",
      "턱시도"
    ]
  },
  {
    "id": "av_1112",
    "name": "체셔 고양이 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "37회차",
      "체셔",
      "고양이",
      "꼬리"
    ]
  },
  {
    "id": "av_1113",
    "name": "크로우",
    "slot": "showArmor",
    "category": "몸",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "37회차",
      "크로우"
    ]
  },
  {
    "id": "av_1114",
    "name": "프레스티지 하트퀸",
    "slot": "showArmor",
    "category": "몸",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "37회차",
      "프레스티지",
      "하트퀸"
    ]
  },
  {
    "id": "av_1115",
    "name": "꿈꾸는 나비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "37회차",
      "꿈꾸는",
      "나비",
      "발자국"
    ]
  },
  {
    "id": "av_1116",
    "name": "마트료시카 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "37회차",
      "마트료시카",
      "발자국"
    ]
  },
  {
    "id": "av_1117",
    "name": "상큼별 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "37회차",
      "상큼별",
      "발자국"
    ]
  },
  {
    "id": "av_1118",
    "name": "하트 페인트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "37회차",
      "하트",
      "페인트",
      "발자국"
    ]
  },
  {
    "id": "av_1119",
    "name": "화산지대 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "37회차",
      "화산지대",
      "발자국"
    ]
  },
  {
    "id": "av_1120",
    "name": "롱소드 굿나이트 연",
    "slot": "showEffect",
    "category": "효과",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "37회차",
      "롱소드",
      "굿나이트"
    ]
  },
  {
    "id": "av_1121",
    "name": "밥보단 잠",
    "slot": "showEffect",
    "category": "효과",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "37회차",
      "밥보단"
    ]
  },
  {
    "id": "av_1122",
    "name": "생선 굽는 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "37회차",
      "생선",
      "굽는",
      "젤리삐"
    ]
  },
  {
    "id": "av_1123",
    "name": "젤리삐 검볼 머신",
    "slot": "showEffect",
    "category": "효과",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "37회차",
      "젤리삐",
      "검볼",
      "머신"
    ]
  },
  {
    "id": "av_1124",
    "name": "젤리삐 얼음 조각상",
    "slot": "showEffect",
    "category": "효과",
    "round": "37회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "37회차",
      "젤리삐",
      "얼음",
      "조각상"
    ]
  },
  {
    "id": "av_1125",
    "name": "마제스티",
    "slot": "showHead",
    "category": "투구",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "38회차",
      "마제스티"
    ]
  },
  {
    "id": "av_1126",
    "name": "롭이어 니트 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "38회차",
      "롭이어",
      "니트",
      "베레모"
    ]
  },
  {
    "id": "av_1127",
    "name": "그레이스 실크 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "38회차",
      "그레이스",
      "실크"
    ]
  },
  {
    "id": "av_1128",
    "name": "하피 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "38회차",
      "하피",
      "머리띠"
    ]
  },
  {
    "id": "av_1129",
    "name": "스프링 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "38회차",
      "스프링",
      "크라운"
    ]
  },
  {
    "id": "av_1130",
    "name": "시크 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "38회차",
      "시크",
      "케이프"
    ]
  },
  {
    "id": "av_1131",
    "name": "체인 포켓 워치",
    "slot": "showHead",
    "category": "머리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "38회차",
      "체인",
      "포켓",
      "워치"
    ]
  },
  {
    "id": "av_1132",
    "name": "역병 의사 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "38회차",
      "역병",
      "의사",
      "가면"
    ]
  },
  {
    "id": "av_1133",
    "name": "래빗테일 니트 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "38회차",
      "래빗테일",
      "니트",
      "케이프"
    ]
  },
  {
    "id": "av_1134",
    "name": "플라워 브로치",
    "slot": "showHead",
    "category": "머리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "38회차",
      "플라워",
      "브로치"
    ]
  },
  {
    "id": "av_1135",
    "name": "신록의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "38회차",
      "신록의",
      "날개"
    ]
  },
  {
    "id": "av_1136",
    "name": "구미",
    "slot": "showArmor",
    "category": "몸",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "38회차",
      "구미"
    ]
  },
  {
    "id": "av_1137",
    "name": "오리야 먹자",
    "slot": "showArmor",
    "category": "몸",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "38회차",
      "오리야",
      "먹자"
    ]
  },
  {
    "id": "av_1138",
    "name": "용왕",
    "slot": "showArmor",
    "category": "몸",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "38회차",
      "용왕"
    ]
  },
  {
    "id": "av_1139",
    "name": "스프링 가든",
    "slot": "showArmor",
    "category": "몸",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "38회차",
      "스프링",
      "가든"
    ]
  },
  {
    "id": "av_1140",
    "name": "별 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "38회차",
      "발자국"
    ]
  },
  {
    "id": "av_1141",
    "name": "먼지 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "38회차",
      "먼지",
      "발자국"
    ]
  },
  {
    "id": "av_1142",
    "name": "반딧불이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "38회차",
      "반딧불이",
      "발자국"
    ]
  },
  {
    "id": "av_1143",
    "name": "하트 쥬얼 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "38회차",
      "하트",
      "쥬얼",
      "발자국"
    ]
  },
  {
    "id": "av_1144",
    "name": "재주넘는 여우 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "38회차",
      "재주넘는",
      "여우",
      "발자국"
    ]
  },
  {
    "id": "av_1145",
    "name": "빙글빙글 나비",
    "slot": "showEffect",
    "category": "효과",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "38회차",
      "빙글빙글",
      "나비"
    ]
  },
  {
    "id": "av_1146",
    "name": "수호 마법원",
    "slot": "showEffect",
    "category": "효과",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "38회차",
      "수호",
      "마법원"
    ]
  },
  {
    "id": "av_1147",
    "name": "젤리삐 보물선",
    "slot": "showEffect",
    "category": "효과",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "38회차",
      "젤리삐",
      "보물선"
    ]
  },
  {
    "id": "av_1148",
    "name": "엄지공주",
    "slot": "showEffect",
    "category": "효과",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "38회차",
      "엄지공주"
    ]
  },
  {
    "id": "av_1149",
    "name": "꽃밭에서",
    "slot": "showEffect",
    "category": "효과",
    "round": "38회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "38회차",
      "꽃밭에서"
    ]
  },
  {
    "id": "av_1150",
    "name": "구미호 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "39회차",
      "구미호"
    ]
  },
  {
    "id": "av_1151",
    "name": "전투력 측정기",
    "slot": "showHead",
    "category": "투구",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "39회차",
      "전투력",
      "측정기"
    ]
  },
  {
    "id": "av_1152",
    "name": "세인트 베일",
    "slot": "showHead",
    "category": "투구",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "39회차",
      "세인트",
      "베일"
    ]
  },
  {
    "id": "av_1153",
    "name": "솜털 여우 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "39회차",
      "솜털",
      "여우",
      "후드"
    ]
  },
  {
    "id": "av_1154",
    "name": "역병 의사 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "39회차",
      "역병",
      "의사",
      "모자"
    ]
  },
  {
    "id": "av_1155",
    "name": "산타할아버지 수염",
    "slot": "showFace",
    "category": "머리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "39회차",
      "산타할아버지",
      "수염"
    ]
  },
  {
    "id": "av_1156",
    "name": "플라워 리본 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "39회차",
      "플라워",
      "리본",
      "스카프"
    ]
  },
  {
    "id": "av_1157",
    "name": "로즈 실크 숄",
    "slot": "showBack",
    "category": "머리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "39회차",
      "로즈",
      "실크"
    ]
  },
  {
    "id": "av_1158",
    "name": "스팀펑크 호크",
    "slot": "showHead",
    "category": "머리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "39회차",
      "스팀펑크",
      "호크"
    ]
  },
  {
    "id": "av_1159",
    "name": "푸른 안광",
    "slot": "showHead",
    "category": "머리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "39회차",
      "푸른",
      "안광"
    ]
  },
  {
    "id": "av_1160",
    "name": "거울아 거울아",
    "slot": "showArmor",
    "category": "몸",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "39회차",
      "거울아"
    ]
  },
  {
    "id": "av_1161",
    "name": "엔젤 부스터",
    "slot": "showArmor",
    "category": "몸",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "39회차",
      "엔젤",
      "부스터"
    ]
  },
  {
    "id": "av_1162",
    "name": "홀리 소드 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "39회차",
      "홀리",
      "소드"
    ]
  },
  {
    "id": "av_1163",
    "name": "비밀의 천사",
    "slot": "showArmor",
    "category": "몸",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "39회차",
      "비밀의",
      "천사"
    ]
  },
  {
    "id": "av_1164",
    "name": "꿈꾸는 인형",
    "slot": "showArmor",
    "category": "몸",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "39회차",
      "꿈꾸는",
      "인형"
    ]
  },
  {
    "id": "av_1165",
    "name": "별무늬 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "39회차",
      "별무늬",
      "발자국"
    ]
  },
  {
    "id": "av_1166",
    "name": "원숭이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "39회차",
      "원숭이",
      "발자국"
    ]
  },
  {
    "id": "av_1167",
    "name": "흩날리는 벚꽃잎 발자국",
    "slot": "showEffect",
    "category": "다리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "39회차",
      "흩날리는",
      "벚꽃잎",
      "발자국"
    ]
  },
  {
    "id": "av_1168",
    "name": "야생화 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "39회차",
      "야생화",
      "발자국"
    ]
  },
  {
    "id": "av_1169",
    "name": "파파라치 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "39회차",
      "파파라치",
      "발자국"
    ]
  },
  {
    "id": "av_1170",
    "name": "벚꽃비",
    "slot": "showEffect",
    "category": "효과",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "39회차",
      "벚꽃비"
    ]
  },
  {
    "id": "av_1171",
    "name": "둥실둥실 금붕어",
    "slot": "showEffect",
    "category": "효과",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "39회차",
      "둥실둥실",
      "금붕어"
    ]
  },
  {
    "id": "av_1172",
    "name": "흰머리 오목눈이",
    "slot": "showEffect",
    "category": "효과",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "39회차",
      "흰머리",
      "오목눈이"
    ]
  },
  {
    "id": "av_1173",
    "name": "아나벨의 곰인형",
    "slot": "showEffect",
    "category": "효과",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "39회차",
      "아나벨의",
      "곰인형"
    ]
  },
  {
    "id": "av_1174",
    "name": "자강두삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "39회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "39회차",
      "자강두삐"
    ]
  },
  {
    "id": "av_1175",
    "name": "곰돌이 귀마개",
    "slot": "showHead",
    "category": "투구",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "40회차",
      "곰돌이",
      "귀마개"
    ]
  },
  {
    "id": "av_1176",
    "name": "모르포나비 헤어핀",
    "slot": "showHead",
    "category": "투구",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "40회차",
      "모르포나비",
      "헤어핀"
    ]
  },
  {
    "id": "av_1177",
    "name": "꽃다발 머리띠",
    "slot": "showFoot",
    "category": "투구",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "40회차",
      "꽃다발",
      "머리띠"
    ]
  },
  {
    "id": "av_1178",
    "name": "귀부인 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "40회차",
      "귀부인",
      "모자"
    ]
  },
  {
    "id": "av_1179",
    "name": "캔디 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "40회차",
      "캔디",
      "베레모"
    ]
  },
  {
    "id": "av_1180",
    "name": "깃털 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "40회차",
      "깃털",
      "귀걸이"
    ]
  },
  {
    "id": "av_1181",
    "name": "모르포나비 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "40회차",
      "모르포나비",
      "케이프"
    ]
  },
  {
    "id": "av_1182",
    "name": "스트라이프 리본",
    "slot": "showHead",
    "category": "머리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "40회차",
      "스트라이프",
      "리본"
    ]
  },
  {
    "id": "av_1183",
    "name": "엔젤 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "40회차",
      "엔젤",
      "스카프"
    ]
  },
  {
    "id": "av_1184",
    "name": "페더 쵸커",
    "slot": "showHead",
    "category": "머리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "40회차",
      "페더",
      "쵸커"
    ]
  },
  {
    "id": "av_1185",
    "name": "벚꽃나무 아래",
    "slot": "showArmor",
    "category": "몸",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "40회차",
      "벚꽃나무",
      "아래"
    ]
  },
  {
    "id": "av_1186",
    "name": "모르포나비 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "40회차",
      "모르포나비",
      "날개"
    ]
  },
  {
    "id": "av_1187",
    "name": "정의의 천사",
    "slot": "showArmor",
    "category": "몸",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "40회차",
      "정의의",
      "천사"
    ]
  },
  {
    "id": "av_1188",
    "name": "토끼 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "40회차",
      "토끼",
      "배낭"
    ]
  },
  {
    "id": "av_1189",
    "name": "플라워 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "40회차",
      "플라워"
    ]
  },
  {
    "id": "av_1190",
    "name": "꽃 한 송이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "40회차",
      "송이",
      "발자국"
    ]
  },
  {
    "id": "av_1191",
    "name": "반짝별 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "40회차",
      "반짝별",
      "발자국"
    ]
  },
  {
    "id": "av_1192",
    "name": "사랑의 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "40회차",
      "사랑의",
      "발자국"
    ]
  },
  {
    "id": "av_1193",
    "name": "신기루 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "40회차",
      "신기루",
      "발자국"
    ]
  },
  {
    "id": "av_1194",
    "name": "작은 양초 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "40회차",
      "작은",
      "양초",
      "발자국"
    ]
  },
  {
    "id": "av_1195",
    "name": "댄싱 베이비 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "40회차",
      "댄싱",
      "베이비",
      "젤리삐"
    ]
  },
  {
    "id": "av_1196",
    "name": "모르포나비 트윈즈",
    "slot": "showEffect",
    "category": "효과",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "40회차",
      "모르포나비",
      "트윈즈"
    ]
  },
  {
    "id": "av_1197",
    "name": "애프터눈 티타임",
    "slot": "showEffect",
    "category": "효과",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "40회차",
      "애프터눈",
      "티타임"
    ]
  },
  {
    "id": "av_1198",
    "name": "페어리 블레싱",
    "slot": "showEffect",
    "category": "효과",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "40회차",
      "페어리",
      "블레싱"
    ]
  },
  {
    "id": "av_1199",
    "name": "하트 쿠션",
    "slot": "showEffect",
    "category": "효과",
    "round": "40회차",
    "tab": "36~40회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "40회차",
      "하트",
      "쿠션"
    ]
  },
  {
    "id": "av_1200",
    "name": "다람쥐 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "31회차",
      "다람쥐",
      "모자"
    ]
  },
  {
    "id": "av_1201",
    "name": "방울 연꽃 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "31회차",
      "방울",
      "연꽃",
      "장식"
    ]
  },
  {
    "id": "av_1202",
    "name": "봉인된 리치 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "31회차",
      "봉인된",
      "리치",
      "후드"
    ]
  },
  {
    "id": "av_1203",
    "name": "알록달록 폭죽",
    "slot": "showHead",
    "category": "투구",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "31회차",
      "알록달록",
      "폭죽"
    ]
  },
  {
    "id": "av_1204",
    "name": "호위무사",
    "slot": "showHead",
    "category": "투구",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "31회차",
      "호위무사"
    ]
  },
  {
    "id": "av_1205",
    "name": "냥 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "31회차",
      "스카프"
    ]
  },
  {
    "id": "av_1206",
    "name": "롱 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "31회차",
      "머플러"
    ]
  },
  {
    "id": "av_1207",
    "name": "백작",
    "slot": "showHead",
    "category": "머리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "31회차",
      "백작"
    ]
  },
  {
    "id": "av_1208",
    "name": "엑자일 마스크",
    "slot": "showFace",
    "category": "머리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "31회차",
      "엑자일",
      "마스크"
    ]
  },
  {
    "id": "av_1209",
    "name": "쿠나이",
    "slot": "showHead",
    "category": "머리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "31회차",
      "쿠나이"
    ]
  },
  {
    "id": "av_1210",
    "name": "나이트워커",
    "slot": "showArmor",
    "category": "몸",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "31회차",
      "나이트워커"
    ]
  },
  {
    "id": "av_1211",
    "name": "대형 수리검",
    "slot": "showArmor",
    "category": "몸",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "31회차",
      "대형",
      "수리검"
    ]
  },
  {
    "id": "av_1212",
    "name": "로켓 폭죽",
    "slot": "showArmor",
    "category": "몸",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "31회차",
      "로켓",
      "폭죽"
    ]
  },
  {
    "id": "av_1213",
    "name": "봉인된 리치 로브",
    "slot": "showArmor",
    "category": "몸",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "31회차",
      "봉인된",
      "리치",
      "로브"
    ]
  },
  {
    "id": "av_1214",
    "name": "빨간 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "31회차",
      "빨간",
      "망토"
    ]
  },
  {
    "id": "av_1215",
    "name": "반딧불 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "31회차",
      "반딧불",
      "발자국"
    ]
  },
  {
    "id": "av_1216",
    "name": "분수 폭죽 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "31회차",
      "분수",
      "폭죽",
      "발자국"
    ]
  },
  {
    "id": "av_1217",
    "name": "스파크 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "31회차",
      "스파크",
      "발자국"
    ]
  },
  {
    "id": "av_1218",
    "name": "유리구두 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "31회차",
      "유리구두",
      "발자국"
    ]
  },
  {
    "id": "av_1219",
    "name": "페인트아트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "31회차",
      "페인트아트",
      "발자국"
    ]
  },
  {
    "id": "av_1220",
    "name": "난장판",
    "slot": "showEffect",
    "category": "효과",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "31회차",
      "난장판"
    ]
  },
  {
    "id": "av_1221",
    "name": "마법의 액자",
    "slot": "showEffect",
    "category": "효과",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "31회차",
      "마법의",
      "액자"
    ]
  },
  {
    "id": "av_1222",
    "name": "보글보글 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "31회차",
      "보글보글",
      "젤리삐"
    ]
  },
  {
    "id": "av_1223",
    "name": "타로 셀렉션",
    "slot": "showEffect",
    "category": "효과",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "31회차",
      "타로",
      "셀렉션"
    ]
  },
  {
    "id": "av_1224",
    "name": "행복한 고양이",
    "slot": "showEffect",
    "category": "효과",
    "round": "31회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "31회차",
      "행복한",
      "고양이"
    ]
  },
  {
    "id": "av_1225",
    "name": "닥스훈트 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "32회차",
      "닥스훈트"
    ]
  },
  {
    "id": "av_1226",
    "name": "망둥이 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "32회차",
      "망둥이",
      "모자"
    ]
  },
  {
    "id": "av_1227",
    "name": "브레이브 유니콘",
    "slot": "showHead",
    "category": "투구",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "32회차",
      "브레이브",
      "유니콘"
    ]
  },
  {
    "id": "av_1228",
    "name": "여우 무녀 머리 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "32회차",
      "여우",
      "무녀",
      "머리",
      "장식"
    ]
  },
  {
    "id": "av_1229",
    "name": "정상 정복",
    "slot": "showHead",
    "category": "투구",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "32회차",
      "정상",
      "정복"
    ]
  },
  {
    "id": "av_1230",
    "name": "딸랑딸랑 목도리",
    "slot": "showHead",
    "category": "머리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "32회차",
      "딸랑딸랑",
      "목도리"
    ]
  },
  {
    "id": "av_1231",
    "name": "사이드 벨 리본 초커",
    "slot": "showHead",
    "category": "머리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "32회차",
      "사이드",
      "리본",
      "초커"
    ]
  },
  {
    "id": "av_1232",
    "name": "스탠다드 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "32회차",
      "스탠다드",
      "머플러"
    ]
  },
  {
    "id": "av_1233",
    "name": "암살자",
    "slot": "showHead",
    "category": "머리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "32회차",
      "암살자"
    ]
  },
  {
    "id": "av_1234",
    "name": "토끼 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "32회차",
      "토끼",
      "머플러"
    ]
  },
  {
    "id": "av_1235",
    "name": "블랙캣 메이드",
    "slot": "showArmor",
    "category": "몸",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "32회차",
      "블랙캣",
      "메이드"
    ]
  },
  {
    "id": "av_1236",
    "name": "세비지 컬렉션",
    "slot": "showArmor",
    "category": "몸",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "32회차",
      "세비지",
      "컬렉션"
    ]
  },
  {
    "id": "av_1237",
    "name": "아코디언",
    "slot": "showArmor",
    "category": "몸",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "32회차",
      "아코디언"
    ]
  },
  {
    "id": "av_1238",
    "name": "여우 무녀 의복",
    "slot": "showArmor",
    "category": "몸",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "32회차",
      "여우",
      "무녀",
      "의복"
    ]
  },
  {
    "id": "av_1239",
    "name": "전율의 배틀액스",
    "slot": "showArmor",
    "category": "몸",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "32회차",
      "전율의",
      "배틀액스"
    ]
  },
  {
    "id": "av_1240",
    "name": "기계 부품 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "32회차",
      "기계",
      "부품",
      "발자국"
    ]
  },
  {
    "id": "av_1241",
    "name": "백수정 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "32회차",
      "백수정",
      "발자국"
    ]
  },
  {
    "id": "av_1242",
    "name": "부적 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "32회차",
      "부적",
      "발자국"
    ]
  },
  {
    "id": "av_1243",
    "name": "스위트 스타 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "32회차",
      "스위트",
      "스타",
      "발자국"
    ]
  },
  {
    "id": "av_1244",
    "name": "파티클 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "32회차",
      "파티클",
      "발자국"
    ]
  },
  {
    "id": "av_1245",
    "name": "금은보화",
    "slot": "showEffect",
    "category": "효과",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "32회차",
      "금은보화"
    ]
  },
  {
    "id": "av_1246",
    "name": "도깨비 불",
    "slot": "showEffect",
    "category": "효과",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "32회차",
      "도깨비"
    ]
  },
  {
    "id": "av_1247",
    "name": "매직 서클",
    "slot": "showEffect",
    "category": "효과",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "32회차",
      "매직",
      "서클"
    ]
  },
  {
    "id": "av_1248",
    "name": "빙빙 까마귀",
    "slot": "showEffect",
    "category": "효과",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "32회차",
      "빙빙",
      "까마귀"
    ]
  },
  {
    "id": "av_1249",
    "name": "인도하는 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "32회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "32회차",
      "인도하는",
      "젤리삐"
    ]
  },
  {
    "id": "av_1250",
    "name": "광음",
    "slot": "showHead",
    "category": "투구",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "33회차",
      "광음"
    ]
  },
  {
    "id": "av_1251",
    "name": "달걀 머리 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "33회차",
      "달걀",
      "머리",
      "장식"
    ]
  },
  {
    "id": "av_1252",
    "name": "로즈 레이디 보닛",
    "slot": "showHead",
    "category": "투구",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "33회차",
      "로즈",
      "레이디",
      "보닛"
    ]
  },
  {
    "id": "av_1253",
    "name": "하프 헬멧",
    "slot": "showHead",
    "category": "투구",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "33회차",
      "하프",
      "헬멧"
    ]
  },
  {
    "id": "av_1254",
    "name": "헌팅캡",
    "slot": "showHead",
    "category": "투구",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "33회차",
      "헌팅캡"
    ]
  },
  {
    "id": "av_1255",
    "name": "밍크 숄",
    "slot": "showBack",
    "category": "머리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "33회차",
      "밍크"
    ]
  },
  {
    "id": "av_1256",
    "name": "어깨 위의 젤리삐",
    "slot": "showHead",
    "category": "머리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "33회차",
      "어깨",
      "위의",
      "젤리삐"
    ]
  },
  {
    "id": "av_1257",
    "name": "에그머니나",
    "slot": "showHead",
    "category": "머리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "33회차",
      "에그머니나"
    ]
  },
  {
    "id": "av_1258",
    "name": "울먹 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "33회차",
      "울먹",
      "가면"
    ]
  },
  {
    "id": "av_1259",
    "name": "이면",
    "slot": "showHead",
    "category": "머리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "33회차",
      "이면"
    ]
  },
  {
    "id": "av_1260",
    "name": "로즈 레이디",
    "slot": "showArmor",
    "category": "몸",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "33회차",
      "로즈",
      "레이디"
    ]
  },
  {
    "id": "av_1261",
    "name": "윙 오브 메모리얼",
    "slot": "showBack",
    "category": "몸",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "33회차",
      "오브",
      "메모리얼"
    ]
  },
  {
    "id": "av_1262",
    "name": "쥬니히토에",
    "slot": "showArmor",
    "category": "몸",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "33회차",
      "쥬니히토에"
    ]
  },
  {
    "id": "av_1263",
    "name": "프라이드 에그",
    "slot": "showArmor",
    "category": "몸",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "33회차",
      "프라이드",
      "에그"
    ]
  },
  {
    "id": "av_1264",
    "name": "해와 달",
    "slot": "showArmor",
    "category": "몸",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "33회차",
      "해와"
    ]
  },
  {
    "id": "av_1265",
    "name": "거울의 정령 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "33회차",
      "거울의",
      "정령",
      "발자국"
    ]
  },
  {
    "id": "av_1266",
    "name": "마카롱 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "33회차",
      "마카롱",
      "발자국"
    ]
  },
  {
    "id": "av_1267",
    "name": "에그팝 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "33회차",
      "에그팝",
      "발자국"
    ]
  },
  {
    "id": "av_1268",
    "name": "여우 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "33회차",
      "여우",
      "발자국"
    ]
  },
  {
    "id": "av_1269",
    "name": "우박 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "33회차",
      "우박",
      "발자국"
    ]
  },
  {
    "id": "av_1270",
    "name": "두둥실 평원",
    "slot": "showEffect",
    "category": "효과",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "33회차",
      "두둥실",
      "평원"
    ]
  },
  {
    "id": "av_1271",
    "name": "삐약삐약 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "33회차",
      "삐약삐약",
      "젤리삐"
    ]
  },
  {
    "id": "av_1272",
    "name": "사랑하는 나의 지구",
    "slot": "showEffect",
    "category": "효과",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "33회차",
      "사랑하는",
      "나의",
      "지구"
    ]
  },
  {
    "id": "av_1273",
    "name": "써니 사이드 업",
    "slot": "showEffect",
    "category": "효과",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "33회차",
      "써니",
      "사이드"
    ]
  },
  {
    "id": "av_1274",
    "name": "캔디 레인",
    "slot": "showEffect",
    "category": "효과",
    "round": "33회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "33회차",
      "캔디",
      "레인"
    ]
  },
  {
    "id": "av_1275",
    "name": "눈사람 탈",
    "slot": "showFace",
    "category": "투구",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "34회차",
      "눈사람"
    ]
  },
  {
    "id": "av_1276",
    "name": "솔라 시스템",
    "slot": "showHead",
    "category": "투구",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "34회차",
      "솔라",
      "시스템"
    ]
  },
  {
    "id": "av_1277",
    "name": "스노우 밤비",
    "slot": "showHead",
    "category": "투구",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "34회차",
      "스노우",
      "밤비"
    ]
  },
  {
    "id": "av_1278",
    "name": "판타지아 선캡",
    "slot": "showHead",
    "category": "투구",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "34회차",
      "판타지아",
      "선캡"
    ]
  },
  {
    "id": "av_1279",
    "name": "포근한 예티 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "34회차",
      "포근한",
      "예티",
      "후드"
    ]
  },
  {
    "id": "av_1280",
    "name": "그레이 울프 퍼",
    "slot": "showHead",
    "category": "머리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "34회차",
      "그레이",
      "울프"
    ]
  },
  {
    "id": "av_1281",
    "name": "드림워커 헤드폰",
    "slot": "showHead",
    "category": "머리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "34회차",
      "드림워커",
      "헤드폰"
    ]
  },
  {
    "id": "av_1282",
    "name": "스노우밤비 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "34회차",
      "스노우밤비",
      "케이프"
    ]
  },
  {
    "id": "av_1283",
    "name": "크리스마스 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "34회차",
      "크리스마스",
      "머플러"
    ]
  },
  {
    "id": "av_1284",
    "name": "테일즈예보 - 눈",
    "slot": "showFace",
    "category": "머리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "34회차",
      "테일즈예보"
    ]
  },
  {
    "id": "av_1285",
    "name": "고귀한 방랑자",
    "slot": "showArmor",
    "category": "몸",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "34회차",
      "고귀한",
      "방랑자"
    ]
  },
  {
    "id": "av_1286",
    "name": "블랙 후드 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "34회차",
      "블랙",
      "후드",
      "코트"
    ]
  },
  {
    "id": "av_1287",
    "name": "스노우 아울",
    "slot": "showArmor",
    "category": "몸",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "34회차",
      "스노우",
      "아울"
    ]
  },
  {
    "id": "av_1288",
    "name": "일월",
    "slot": "showArmor",
    "category": "몸",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "34회차",
      "일월"
    ]
  },
  {
    "id": "av_1289",
    "name": "포근한 예티 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "34회차",
      "포근한",
      "예티",
      "코트"
    ]
  },
  {
    "id": "av_1290",
    "name": "녹는 눈사람 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "34회차",
      "녹는",
      "눈사람",
      "발자국"
    ]
  },
  {
    "id": "av_1291",
    "name": "눈보라 펭귄 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "34회차",
      "눈보라",
      "펭귄",
      "발자국"
    ]
  },
  {
    "id": "av_1292",
    "name": "별가루 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "34회차",
      "별가루",
      "발자국"
    ]
  },
  {
    "id": "av_1293",
    "name": "얼음꽃 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "34회차",
      "얼음꽃",
      "발자국"
    ]
  },
  {
    "id": "av_1294",
    "name": "파랑 나비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "34회차",
      "파랑",
      "나비",
      "발자국"
    ]
  },
  {
    "id": "av_1295",
    "name": "내 친구 예티",
    "slot": "showEffect",
    "category": "효과",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "34회차",
      "친구",
      "예티"
    ]
  },
  {
    "id": "av_1296",
    "name": "비누방울 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "34회차",
      "비누방울",
      "젤리삐"
    ]
  },
  {
    "id": "av_1297",
    "name": "빙글빙글 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "34회차",
      "빙글빙글",
      "젤리삐"
    ]
  },
  {
    "id": "av_1298",
    "name": "심쿵! 포메라니안",
    "slot": "showEffect",
    "category": "효과",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "34회차",
      "심쿵!",
      "포메라니안"
    ]
  },
  {
    "id": "av_1299",
    "name": "천사 강림",
    "slot": "showEffect",
    "category": "효과",
    "round": "34회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "34회차",
      "천사",
      "강림"
    ]
  },
  {
    "id": "av_1300",
    "name": "매지션 길드 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "35회차",
      "매지션",
      "길드"
    ]
  },
  {
    "id": "av_1301",
    "name": "샤크바리 두건",
    "slot": "showHead",
    "category": "투구",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "35회차",
      "샤크바리",
      "두건"
    ]
  },
  {
    "id": "av_1302",
    "name": "엑소시스트 베일",
    "slot": "showHead",
    "category": "투구",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "35회차",
      "엑소시스트",
      "베일"
    ]
  },
  {
    "id": "av_1303",
    "name": "죠안 두건",
    "slot": "showHead",
    "category": "투구",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "35회차",
      "죠안",
      "두건"
    ]
  },
  {
    "id": "av_1304",
    "name": "페넥여우 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "35회차",
      "페넥여우"
    ]
  },
  {
    "id": "av_1305",
    "name": "얼음 결정 머리 장식",
    "slot": "showHead",
    "category": "머리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "35회차",
      "얼음",
      "결정",
      "장식"
    ]
  },
  {
    "id": "av_1306",
    "name": "엑소시스트 블라인드",
    "slot": "showHead",
    "category": "머리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "35회차",
      "엑소시스트",
      "블라인드"
    ]
  },
  {
    "id": "av_1307",
    "name": "종 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "35회차",
      "귀걸이"
    ]
  },
  {
    "id": "av_1308",
    "name": "핑크 코튼 퍼",
    "slot": "showHead",
    "category": "머리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "35회차",
      "핑크",
      "코튼"
    ]
  },
  {
    "id": "av_1309",
    "name": "화이트 롱 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "35회차",
      "화이트",
      "머플러"
    ]
  },
  {
    "id": "av_1310",
    "name": "꽃돼지 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "35회차",
      "꽃돼지",
      "배낭"
    ]
  },
  {
    "id": "av_1311",
    "name": "매지션 길드 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "35회차",
      "매지션",
      "길드",
      "망토"
    ]
  },
  {
    "id": "av_1312",
    "name": "엑소시스트 바이블",
    "slot": "showArmor",
    "category": "몸",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "35회차",
      "엑소시스트",
      "바이블"
    ]
  },
  {
    "id": "av_1313",
    "name": "코타츠",
    "slot": "showArmor",
    "category": "몸",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "35회차",
      "코타츠"
    ]
  },
  {
    "id": "av_1314",
    "name": "페넥여우 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "35회차",
      "페넥여우",
      "꼬리"
    ]
  },
  {
    "id": "av_1315",
    "name": "멧돼지 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "35회차",
      "멧돼지",
      "발자국"
    ]
  },
  {
    "id": "av_1316",
    "name": "부지런한 참새 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "35회차",
      "부지런한",
      "참새",
      "발자국"
    ]
  },
  {
    "id": "av_1317",
    "name": "불사조 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "35회차",
      "불사조",
      "발자국"
    ]
  },
  {
    "id": "av_1318",
    "name": "블링블링 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "35회차",
      "블링블링",
      "발자국"
    ]
  },
  {
    "id": "av_1319",
    "name": "영사기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "35회차",
      "영사기",
      "발자국"
    ]
  },
  {
    "id": "av_1320",
    "name": "겨울나무 아래",
    "slot": "showEffect",
    "category": "효과",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "35회차",
      "겨울나무",
      "아래"
    ]
  },
  {
    "id": "av_1321",
    "name": "따뜻한 백곰♥",
    "slot": "showEffect",
    "category": "효과",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "35회차",
      "따뜻한",
      "백곰♥"
    ]
  },
  {
    "id": "av_1322",
    "name": "반짝반짝 별고리",
    "slot": "showEffect",
    "category": "효과",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "35회차",
      "반짝반짝",
      "별고리"
    ]
  },
  {
    "id": "av_1323",
    "name": "배회하는 영혼",
    "slot": "showEffect",
    "category": "효과",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "35회차",
      "배회하는",
      "영혼"
    ]
  },
  {
    "id": "av_1324",
    "name": "복돼지",
    "slot": "showEffect",
    "category": "효과",
    "round": "35회차",
    "tab": "31~35회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "35회차",
      "복돼지"
    ]
  },
  {
    "id": "av_1325",
    "name": "레인드롭 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "26회차",
      "레인드롭",
      "베레모"
    ]
  },
  {
    "id": "av_1326",
    "name": "리프레쉬 섬머",
    "slot": "showHead",
    "category": "투구",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "26회차",
      "리프레쉬",
      "섬머"
    ]
  },
  {
    "id": "av_1327",
    "name": "블랙로즈의 뿔",
    "slot": "showHead",
    "category": "투구",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "26회차",
      "블랙로즈의"
    ]
  },
  {
    "id": "av_1328",
    "name": "뼈 투구",
    "slot": "showHead",
    "category": "투구",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "26회차"
    ]
  },
  {
    "id": "av_1329",
    "name": "호랑이 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "26회차",
      "호랑이"
    ]
  },
  {
    "id": "av_1330",
    "name": "레인드롭 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "26회차",
      "레인드롭",
      "케이프"
    ]
  },
  {
    "id": "av_1331",
    "name": "블랙로즈의 퍼",
    "slot": "showHead",
    "category": "머리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "26회차",
      "블랙로즈의"
    ]
  },
  {
    "id": "av_1332",
    "name": "어깨 위의 앵무새",
    "slot": "showHead",
    "category": "머리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "26회차",
      "어깨",
      "위의",
      "앵무새"
    ]
  },
  {
    "id": "av_1333",
    "name": "입에 문 빙과",
    "slot": "showHead",
    "category": "머리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "26회차",
      "입에",
      "빙과"
    ]
  },
  {
    "id": "av_1334",
    "name": "테일즈위버 - 비",
    "slot": "showHead",
    "category": "머리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "26회차",
      "테일즈위버"
    ]
  },
  {
    "id": "av_1335",
    "name": "그레이스 엔젤 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "26회차",
      "그레이스",
      "엔젤"
    ]
  },
  {
    "id": "av_1336",
    "name": "미네 우산",
    "slot": "showEffect",
    "category": "몸",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "26회차",
      "미네",
      "우산"
    ]
  },
  {
    "id": "av_1337",
    "name": "블랙로즈의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "26회차",
      "블랙로즈의",
      "날개"
    ]
  },
  {
    "id": "av_1338",
    "name": "일렉트릭 기타",
    "slot": "showArmor",
    "category": "몸",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "26회차",
      "일렉트릭",
      "기타"
    ]
  },
  {
    "id": "av_1339",
    "name": "호랑이 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "26회차",
      "호랑이",
      "꼬리"
    ]
  },
  {
    "id": "av_1340",
    "name": "꼬꼬댁 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "26회차",
      "꼬꼬댁",
      "발자국"
    ]
  },
  {
    "id": "av_1341",
    "name": "도장 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "26회차",
      "도장",
      "발자국"
    ]
  },
  {
    "id": "av_1342",
    "name": "불가사의 불가사리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "26회차",
      "불가사의",
      "불가사리",
      "발자국"
    ]
  },
  {
    "id": "av_1343",
    "name": "쥬얼리 샤워 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "26회차",
      "쥬얼리",
      "샤워",
      "발자국"
    ]
  },
  {
    "id": "av_1344",
    "name": "지진 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "26회차",
      "지진",
      "발자국"
    ]
  },
  {
    "id": "av_1345",
    "name": "동력의 원천",
    "slot": "showEffect",
    "category": "효과",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "26회차",
      "동력의",
      "원천"
    ]
  },
  {
    "id": "av_1346",
    "name": "바캉스 아일랜드",
    "slot": "showEffect",
    "category": "효과",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "26회차",
      "바캉스",
      "아일랜드"
    ]
  },
  {
    "id": "av_1347",
    "name": "빙글빙글 금붕어",
    "slot": "showEffect",
    "category": "효과",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "26회차",
      "빙글빙글",
      "금붕어"
    ]
  },
  {
    "id": "av_1348",
    "name": "스플래쉬 서클",
    "slot": "showEffect",
    "category": "효과",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "26회차",
      "스플래쉬",
      "서클"
    ]
  },
  {
    "id": "av_1349",
    "name": "알록달록 빗방울",
    "slot": "showEffect",
    "category": "효과",
    "round": "26회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "26회차",
      "알록달록",
      "빗방울"
    ]
  },
  {
    "id": "av_1350",
    "name": "망태",
    "slot": "showHead",
    "category": "투구",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "27회차",
      "망태"
    ]
  },
  {
    "id": "av_1351",
    "name": "방글방글 해파리",
    "slot": "showHead",
    "category": "투구",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "27회차",
      "방글방글",
      "해파리"
    ]
  },
  {
    "id": "av_1352",
    "name": "빙과 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "27회차",
      "빙과",
      "모자"
    ]
  },
  {
    "id": "av_1353",
    "name": "빙한의 투구",
    "slot": "showHead",
    "category": "투구",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "27회차",
      "빙한의"
    ]
  },
  {
    "id": "av_1354",
    "name": "투신의 가호",
    "slot": "showHead",
    "category": "투구",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "27회차",
      "투신의",
      "가호"
    ]
  },
  {
    "id": "av_1355",
    "name": "나사 장식",
    "slot": "showHead",
    "category": "머리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "27회차",
      "나사",
      "장식"
    ]
  },
  {
    "id": "av_1356",
    "name": "덮수룩한 수염",
    "slot": "showFace",
    "category": "머리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "27회차",
      "덮수룩한",
      "수염"
    ]
  },
  {
    "id": "av_1357",
    "name": "입에 문 도",
    "slot": "showHead",
    "category": "머리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "27회차",
      "입에"
    ]
  },
  {
    "id": "av_1358",
    "name": "젤리피시 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "27회차",
      "젤리피시",
      "케이프"
    ]
  },
  {
    "id": "av_1359",
    "name": "파이프",
    "slot": "showHead",
    "category": "머리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "27회차",
      "파이프"
    ]
  },
  {
    "id": "av_1360",
    "name": "만돌린",
    "slot": "showArmor",
    "category": "몸",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "27회차",
      "만돌린"
    ]
  },
  {
    "id": "av_1361",
    "name": "빙한의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "27회차",
      "빙한의",
      "날개"
    ]
  },
  {
    "id": "av_1362",
    "name": "용살자",
    "slot": "showArmor",
    "category": "몸",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "27회차",
      "용살자"
    ]
  },
  {
    "id": "av_1363",
    "name": "전장의 흔적",
    "slot": "showArmor",
    "category": "몸",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "27회차",
      "전장의",
      "흔적"
    ]
  },
  {
    "id": "av_1364",
    "name": "젤리피시 에스코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "27회차",
      "젤리피시",
      "에스코트"
    ]
  },
  {
    "id": "av_1365",
    "name": "멧토끼 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "27회차",
      "멧토끼",
      "발자국"
    ]
  },
  {
    "id": "av_1366",
    "name": "무지개 강아지 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "27회차",
      "무지개",
      "강아지",
      "발자국"
    ]
  },
  {
    "id": "av_1367",
    "name": "푸른 물방울 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "27회차",
      "푸른",
      "물방울",
      "발자국"
    ]
  },
  {
    "id": "av_1368",
    "name": "폭죽 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "27회차",
      "폭죽",
      "발자국"
    ]
  },
  {
    "id": "av_1369",
    "name": "환영해요 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "27회차",
      "환영해요",
      "발자국"
    ]
  },
  {
    "id": "av_1370",
    "name": "만년 빙화",
    "slot": "showEffect",
    "category": "효과",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "27회차",
      "만년",
      "빙화"
    ]
  },
  {
    "id": "av_1371",
    "name": "물거품",
    "slot": "showEffect",
    "category": "효과",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "27회차",
      "물거품"
    ]
  },
  {
    "id": "av_1372",
    "name": "발광 해파리",
    "slot": "showEffect",
    "category": "효과",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "27회차",
      "발광",
      "해파리"
    ]
  },
  {
    "id": "av_1373",
    "name": "새둥지",
    "slot": "showEffect",
    "category": "효과",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "27회차",
      "새둥지"
    ]
  },
  {
    "id": "av_1374",
    "name": "수호의 방패",
    "slot": "showEffect",
    "category": "효과",
    "round": "27회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "27회차",
      "수호의",
      "방패"
    ]
  },
  {
    "id": "av_1375",
    "name": "늑대 아이",
    "slot": "showHead",
    "category": "투구",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "28회차",
      "늑대",
      "아이"
    ]
  },
  {
    "id": "av_1376",
    "name": "멜로디 헤어핀",
    "slot": "showHead",
    "category": "투구",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "28회차",
      "멜로디",
      "헤어핀"
    ]
  },
  {
    "id": "av_1377",
    "name": "민트초코 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "28회차",
      "민트초코",
      "베레모"
    ]
  },
  {
    "id": "av_1378",
    "name": "아나벨의 검은 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "28회차",
      "아나벨의",
      "검은",
      "모자"
    ]
  },
  {
    "id": "av_1379",
    "name": "아누비스의 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "28회차",
      "아누비스의"
    ]
  },
  {
    "id": "av_1380",
    "name": "링 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "28회차",
      "이어링"
    ]
  },
  {
    "id": "av_1381",
    "name": "민트초코 보우 타이",
    "slot": "showHead",
    "category": "머리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "28회차",
      "민트초코",
      "보우",
      "타이"
    ]
  },
  {
    "id": "av_1382",
    "name": "씨익 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "28회차",
      "씨익",
      "가면"
    ]
  },
  {
    "id": "av_1383",
    "name": "입에 문 카드",
    "slot": "showHead",
    "category": "머리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "28회차",
      "입에",
      "카드"
    ]
  },
  {
    "id": "av_1384",
    "name": "파시움",
    "slot": "showHead",
    "category": "머리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "28회차",
      "파시움"
    ]
  },
  {
    "id": "av_1385",
    "name": "미니 다크 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "28회차",
      "미니",
      "다크"
    ]
  },
  {
    "id": "av_1386",
    "name": "민트초코 리본",
    "slot": "showArmor",
    "category": "몸",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "28회차",
      "민트초코",
      "리본"
    ]
  },
  {
    "id": "av_1387",
    "name": "시바견 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "28회차",
      "시바견",
      "꼬리"
    ]
  },
  {
    "id": "av_1388",
    "name": "아누비스의 저울",
    "slot": "showArmor",
    "category": "몸",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "28회차",
      "아누비스의",
      "저울"
    ]
  },
  {
    "id": "av_1389",
    "name": "이상한 나라의 열쇠",
    "slot": "showArmor",
    "category": "몸",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "28회차",
      "이상한",
      "나라의",
      "열쇠"
    ]
  },
  {
    "id": "av_1390",
    "name": "가로등 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "28회차",
      "가로등",
      "발자국"
    ]
  },
  {
    "id": "av_1391",
    "name": "극염 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "28회차",
      "극염",
      "발자국"
    ]
  },
  {
    "id": "av_1392",
    "name": "당근 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "28회차",
      "당근",
      "발자국"
    ]
  },
  {
    "id": "av_1393",
    "name": "드랍 더 붐붐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "28회차",
      "드랍",
      "붐붐",
      "발자국"
    ]
  },
  {
    "id": "av_1394",
    "name": "민들레 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "28회차",
      "민들레",
      "발자국"
    ]
  },
  {
    "id": "av_1395",
    "name": "달토끼",
    "slot": "showEffect",
    "category": "효과",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "28회차",
      "달토끼"
    ]
  },
  {
    "id": "av_1396",
    "name": "둥실둥실 플라삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "28회차",
      "둥실둥실",
      "플라삐"
    ]
  },
  {
    "id": "av_1397",
    "name": "민트초코칩",
    "slot": "showEffect",
    "category": "효과",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "28회차",
      "민트초코칩"
    ]
  },
  {
    "id": "av_1398",
    "name": "아누비스 벽화",
    "slot": "showEffect",
    "category": "효과",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "28회차",
      "아누비스",
      "벽화"
    ]
  },
  {
    "id": "av_1399",
    "name": "클래식 오르골",
    "slot": "showEffect",
    "category": "효과",
    "round": "28회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "28회차",
      "클래식",
      "오르골"
    ]
  },
  {
    "id": "av_1400",
    "name": "단감 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "29회차",
      "단감",
      "모자"
    ]
  },
  {
    "id": "av_1401",
    "name": "버팔로",
    "slot": "showHead",
    "category": "투구",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "29회차",
      "버팔로"
    ]
  },
  {
    "id": "av_1402",
    "name": "시바견 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "29회차",
      "시바견"
    ]
  },
  {
    "id": "av_1403",
    "name": "토끼 인형 탈",
    "slot": "showHead",
    "category": "투구",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "29회차",
      "토끼",
      "인형"
    ]
  },
  {
    "id": "av_1404",
    "name": "하양 곰돌이 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "29회차",
      "하양",
      "곰돌이",
      "모자"
    ]
  },
  {
    "id": "av_1405",
    "name": "나무 열매 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "29회차",
      "나무",
      "열매",
      "귀걸이"
    ]
  },
  {
    "id": "av_1406",
    "name": "레드 넥타이",
    "slot": "showFace",
    "category": "머리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "29회차",
      "레드",
      "넥타이"
    ]
  },
  {
    "id": "av_1407",
    "name": "멋쟁이 선글라스",
    "slot": "showFace",
    "category": "머리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "29회차",
      "멋쟁이",
      "선글라스"
    ]
  },
  {
    "id": "av_1408",
    "name": "입에 문 단풍",
    "slot": "showHead",
    "category": "머리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "29회차",
      "입에",
      "단풍"
    ]
  },
  {
    "id": "av_1409",
    "name": "자객",
    "slot": "showHead",
    "category": "머리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "29회차",
      "자객"
    ]
  },
  {
    "id": "av_1410",
    "name": "가을나무 아래",
    "slot": "showArmor",
    "category": "몸",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "29회차",
      "가을나무",
      "아래"
    ]
  },
  {
    "id": "av_1411",
    "name": "가을의 여왕",
    "slot": "showArmor",
    "category": "몸",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "29회차",
      "가을의",
      "여왕"
    ]
  },
  {
    "id": "av_1412",
    "name": "노블 조커",
    "slot": "showArmor",
    "category": "몸",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "29회차",
      "노블",
      "조커"
    ]
  },
  {
    "id": "av_1413",
    "name": "마타도르",
    "slot": "showArmor",
    "category": "몸",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "29회차",
      "마타도르"
    ]
  },
  {
    "id": "av_1414",
    "name": "만산홍엽",
    "slot": "showArmor",
    "category": "몸",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "29회차",
      "만산홍엽"
    ]
  },
  {
    "id": "av_1415",
    "name": "감자튀김 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "29회차",
      "감자튀김",
      "발자국"
    ]
  },
  {
    "id": "av_1416",
    "name": "단풍 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "29회차",
      "단풍",
      "발자국"
    ]
  },
  {
    "id": "av_1417",
    "name": "바이올렛 이퀄라이저 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "29회차",
      "바이올렛",
      "이퀄라이저",
      "발자국"
    ]
  },
  {
    "id": "av_1418",
    "name": "초록 나비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "29회차",
      "초록",
      "나비",
      "발자국"
    ]
  },
  {
    "id": "av_1419",
    "name": "코사크 댄스 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "29회차",
      "코사크",
      "댄스",
      "발자국"
    ]
  },
  {
    "id": "av_1420",
    "name": "가을바람",
    "slot": "showEffect",
    "category": "효과",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "29회차",
      "가을바람"
    ]
  },
  {
    "id": "av_1421",
    "name": "슈팅★스타",
    "slot": "showEffect",
    "category": "효과",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "29회차",
      "슈팅★스타"
    ]
  },
  {
    "id": "av_1422",
    "name": "와르르 탱탱볼",
    "slot": "showEffect",
    "category": "효과",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "29회차",
      "와르르",
      "탱탱볼"
    ]
  },
  {
    "id": "av_1423",
    "name": "젤리삐 투어",
    "slot": "showEffect",
    "category": "효과",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "29회차",
      "젤리삐",
      "투어"
    ]
  },
  {
    "id": "av_1424",
    "name": "토스트 쿠션",
    "slot": "showEffect",
    "category": "효과",
    "round": "29회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "29회차",
      "토스트",
      "쿠션"
    ]
  },
  {
    "id": "av_1425",
    "name": "검은 마녀의 상징",
    "slot": "showHead",
    "category": "투구",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "30회차",
      "검은",
      "마녀의",
      "상징"
    ]
  },
  {
    "id": "av_1426",
    "name": "사과 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "30회차",
      "사과",
      "모자"
    ]
  },
  {
    "id": "av_1427",
    "name": "파수꾼의 작은 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "30회차",
      "파수꾼의",
      "작은",
      "모자"
    ]
  },
  {
    "id": "av_1428",
    "name": "펄 붙은 장미 리본",
    "slot": "showHead",
    "category": "투구",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "30회차",
      "붙은",
      "장미",
      "리본"
    ]
  },
  {
    "id": "av_1429",
    "name": "할로윈 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "30회차",
      "할로윈"
    ]
  },
  {
    "id": "av_1430",
    "name": "머엉 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "30회차",
      "머엉",
      "가면"
    ]
  },
  {
    "id": "av_1431",
    "name": "잭-오-랜턴의 상징",
    "slot": "showHead",
    "category": "머리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "30회차",
      "잭-오-랜턴의",
      "상징"
    ]
  },
  {
    "id": "av_1432",
    "name": "파수꾼의 옷깃",
    "slot": "showArmor",
    "category": "머리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "30회차",
      "파수꾼의",
      "옷깃"
    ]
  },
  {
    "id": "av_1433",
    "name": "할로윈 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "30회차",
      "할로윈",
      "케이프"
    ]
  },
  {
    "id": "av_1434",
    "name": "할로윈 퍼",
    "slot": "showHead",
    "category": "머리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "30회차",
      "할로윈"
    ]
  },
  {
    "id": "av_1435",
    "name": "할로윈 브룸",
    "slot": "showArmor",
    "category": "몸",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "30회차",
      "할로윈",
      "브룸"
    ]
  },
  {
    "id": "av_1436",
    "name": "악몽의 상징",
    "slot": "showArmor",
    "category": "몸",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "30회차",
      "악몽의",
      "상징"
    ]
  },
  {
    "id": "av_1437",
    "name": "여명의 파수꾼",
    "slot": "showArmor",
    "category": "몸",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "30회차",
      "여명의",
      "파수꾼"
    ]
  },
  {
    "id": "av_1438",
    "name": "파닥파닥 소악마",
    "slot": "showArmor",
    "category": "몸",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "30회차",
      "파닥파닥",
      "소악마"
    ]
  },
  {
    "id": "av_1439",
    "name": "할로윈 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "30회차",
      "할로윈",
      "망토"
    ]
  },
  {
    "id": "av_1440",
    "name": "두개골 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "30회차",
      "두개골",
      "발자국"
    ]
  },
  {
    "id": "av_1441",
    "name": "스펙터 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "30회차",
      "스펙터",
      "발자국"
    ]
  },
  {
    "id": "av_1442",
    "name": "유령삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "30회차",
      "유령삐",
      "발자국"
    ]
  },
  {
    "id": "av_1443",
    "name": "펌프킨 헤드 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "30회차",
      "펌프킨",
      "헤드",
      "발자국"
    ]
  },
  {
    "id": "av_1444",
    "name": "혼백 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "30회차",
      "혼백",
      "발자국"
    ]
  },
  {
    "id": "av_1445",
    "name": "그림 리퍼",
    "slot": "showEffect",
    "category": "효과",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "30회차",
      "그림",
      "리퍼"
    ]
  },
  {
    "id": "av_1446",
    "name": "윌 오 더 위스프",
    "slot": "showEffect",
    "category": "효과",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "30회차",
      "위스프"
    ]
  },
  {
    "id": "av_1447",
    "name": "젤리삐의 가마솥",
    "slot": "showEffect",
    "category": "효과",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "30회차",
      "젤리삐의",
      "가마솥"
    ]
  },
  {
    "id": "av_1448",
    "name": "할로윈",
    "slot": "showEffect",
    "category": "효과",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "30회차",
      "할로윈"
    ]
  },
  {
    "id": "av_1449",
    "name": "할로윈 요정",
    "slot": "showEffect",
    "category": "효과",
    "round": "30회차",
    "tab": "26~30회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "30회차",
      "할로윈",
      "요정"
    ]
  },
  {
    "id": "av_1450",
    "name": "중장기사의 투구",
    "slot": "showHead",
    "category": "투구",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "21회차",
      "중장기사의"
    ]
  },
  {
    "id": "av_1451",
    "name": "엔지니어링 고글",
    "slot": "showHead",
    "category": "투구",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "21회차",
      "엔지니어링",
      "고글"
    ]
  },
  {
    "id": "av_1452",
    "name": "위치냥",
    "slot": "showHead",
    "category": "투구",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "21회차",
      "위치냥"
    ]
  },
  {
    "id": "av_1453",
    "name": "캡틴 캣",
    "slot": "showHead",
    "category": "투구",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "21회차",
      "캡틴"
    ]
  },
  {
    "id": "av_1454",
    "name": "탐험 헬멧",
    "slot": "showHead",
    "category": "투구",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "21회차",
      "탐험",
      "헬멧"
    ]
  },
  {
    "id": "av_1455",
    "name": "블루밍 로즈",
    "slot": "showHead",
    "category": "머리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "21회차",
      "블루밍",
      "로즈"
    ]
  },
  {
    "id": "av_1456",
    "name": "퓨어 하트 피어스",
    "slot": "showHead",
    "category": "머리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "21회차",
      "퓨어",
      "하트",
      "피어스"
    ]
  },
  {
    "id": "av_1457",
    "name": "마가렛 쉬폰 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "21회차",
      "마가렛",
      "쉬폰",
      "스카프"
    ]
  },
  {
    "id": "av_1458",
    "name": "세기말 마스크",
    "slot": "showFace",
    "category": "머리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "21회차",
      "세기말",
      "마스크"
    ]
  },
  {
    "id": "av_1459",
    "name": "탐험 마스크",
    "slot": "showFace",
    "category": "머리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "21회차",
      "탐험",
      "마스크"
    ]
  },
  {
    "id": "av_1460",
    "name": "안티크 시저",
    "slot": "showArmor",
    "category": "몸",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "21회차",
      "안티크",
      "시저"
    ]
  },
  {
    "id": "av_1461",
    "name": "위치냥 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "21회차",
      "위치냥",
      "망토"
    ]
  },
  {
    "id": "av_1462",
    "name": "검의 가호",
    "slot": "showArmor",
    "category": "몸",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "21회차",
      "검의",
      "가호"
    ]
  },
  {
    "id": "av_1463",
    "name": "탐험 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "21회차",
      "탐험",
      "배낭"
    ]
  },
  {
    "id": "av_1464",
    "name": "리프 파라솔",
    "slot": "showArmor",
    "category": "몸",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "21회차",
      "리프",
      "파라솔"
    ]
  },
  {
    "id": "av_1465",
    "name": "회오리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "21회차",
      "회오리",
      "발자국"
    ]
  },
  {
    "id": "av_1466",
    "name": "수제버거 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "21회차",
      "수제버거",
      "발자국"
    ]
  },
  {
    "id": "av_1467",
    "name": "얌전한 고양이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "21회차",
      "얌전한",
      "고양이",
      "발자국"
    ]
  },
  {
    "id": "av_1468",
    "name": "주황 풍선 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "21회차",
      "주황",
      "풍선",
      "발자국"
    ]
  },
  {
    "id": "av_1469",
    "name": "말 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "21회차",
      "발자국"
    ]
  },
  {
    "id": "av_1470",
    "name": "유성우",
    "slot": "showEffect",
    "category": "효과",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "21회차",
      "유성우"
    ]
  },
  {
    "id": "av_1471",
    "name": "족쇄",
    "slot": "showEffect",
    "category": "효과",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "21회차",
      "족쇄"
    ]
  },
  {
    "id": "av_1472",
    "name": "응석꾸러기 팬더",
    "slot": "showEffect",
    "category": "효과",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "21회차",
      "응석꾸러기",
      "팬더"
    ]
  },
  {
    "id": "av_1473",
    "name": "생존",
    "slot": "showEffect",
    "category": "효과",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "21회차",
      "생존"
    ]
  },
  {
    "id": "av_1474",
    "name": "장난감 요새",
    "slot": "showEffect",
    "category": "효과",
    "round": "21회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "21회차",
      "장난감",
      "요새"
    ]
  },
  {
    "id": "av_1475",
    "name": "중세 가발",
    "slot": "showFoot",
    "category": "투구",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "22회차",
      "중세",
      "가발"
    ]
  },
  {
    "id": "av_1476",
    "name": "벚꽃비 가발",
    "slot": "showFoot",
    "category": "투구",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "22회차",
      "벚꽃비",
      "가발"
    ]
  },
  {
    "id": "av_1477",
    "name": "제독",
    "slot": "showHead",
    "category": "투구",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "22회차",
      "제독"
    ]
  },
  {
    "id": "av_1478",
    "name": "사슴뿔 투구",
    "slot": "showHead",
    "category": "투구",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "22회차",
      "사슴뿔"
    ]
  },
  {
    "id": "av_1479",
    "name": "붕대 감은 고양이 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "22회차",
      "붕대",
      "감은",
      "고양이"
    ]
  },
  {
    "id": "av_1480",
    "name": "테일즈예보 - 맑음",
    "slot": "showHead",
    "category": "머리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "22회차",
      "테일즈예보",
      "맑음"
    ]
  },
  {
    "id": "av_1481",
    "name": "으앙 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "22회차",
      "으앙",
      "가면"
    ]
  },
  {
    "id": "av_1482",
    "name": "골드링 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "22회차",
      "골드링",
      "이어링"
    ]
  },
  {
    "id": "av_1483",
    "name": "기린 머리띠",
    "slot": "showHead",
    "category": "머리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "22회차",
      "기린",
      "머리띠"
    ]
  },
  {
    "id": "av_1484",
    "name": "스멀스멀 버섯",
    "slot": "showHead",
    "category": "머리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "22회차",
      "스멀스멀",
      "버섯"
    ]
  },
  {
    "id": "av_1485",
    "name": "붕대 감은 고양이 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "22회차",
      "붕대",
      "감은",
      "고양이",
      "꼬리"
    ]
  },
  {
    "id": "av_1486",
    "name": "사신의 그림자",
    "slot": "showArmor",
    "category": "몸",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "22회차",
      "사신의",
      "그림자"
    ]
  },
  {
    "id": "av_1487",
    "name": "캡틴 크루저",
    "slot": "showArmor",
    "category": "몸",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "22회차",
      "캡틴",
      "크루저"
    ]
  },
  {
    "id": "av_1488",
    "name": "뇌신의 북",
    "slot": "showArmor",
    "category": "몸",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "22회차",
      "뇌신의"
    ]
  },
  {
    "id": "av_1489",
    "name": "생과 사",
    "slot": "showArmor",
    "category": "몸",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "22회차",
      "생과"
    ]
  },
  {
    "id": "av_1490",
    "name": "비누방울 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "22회차",
      "비누방울",
      "발자국"
    ]
  },
  {
    "id": "av_1491",
    "name": "수박 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "22회차",
      "수박",
      "발자국"
    ]
  },
  {
    "id": "av_1492",
    "name": "죠스 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "22회차",
      "죠스",
      "발자국"
    ]
  },
  {
    "id": "av_1493",
    "name": "팝스타 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "22회차",
      "팝스타",
      "발자국"
    ]
  },
  {
    "id": "av_1494",
    "name": "분수 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "22회차",
      "분수",
      "발자국"
    ]
  },
  {
    "id": "av_1495",
    "name": "흑염안",
    "slot": "showEffect",
    "category": "효과",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "22회차",
      "흑염안"
    ]
  },
  {
    "id": "av_1496",
    "name": "폴링 로즈",
    "slot": "showEffect",
    "category": "효과",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "22회차",
      "폴링",
      "로즈"
    ]
  },
  {
    "id": "av_1497",
    "name": "경면 세계",
    "slot": "showEffect",
    "category": "효과",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "22회차",
      "경면",
      "세계"
    ]
  },
  {
    "id": "av_1498",
    "name": "스타 쿠션",
    "slot": "showEffect",
    "category": "효과",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "22회차",
      "스타",
      "쿠션"
    ]
  },
  {
    "id": "av_1499",
    "name": "마력 집광기",
    "slot": "showEffect",
    "category": "효과",
    "round": "22회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "22회차",
      "마력",
      "집광기"
    ]
  },
  {
    "id": "av_1500",
    "name": "과일 밀짚 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "23회차",
      "과일",
      "밀짚",
      "모자"
    ]
  },
  {
    "id": "av_1501",
    "name": "열대어 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "23회차",
      "열대어",
      "모자"
    ]
  },
  {
    "id": "av_1502",
    "name": "큰 리본 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "23회차",
      "리본",
      "머리띠"
    ]
  },
  {
    "id": "av_1503",
    "name": "드래곤 헬름",
    "slot": "showHead",
    "category": "투구",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "23회차",
      "드래곤",
      "헬름"
    ]
  },
  {
    "id": "av_1504",
    "name": "수박 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "23회차",
      "수박",
      "모자"
    ]
  },
  {
    "id": "av_1505",
    "name": "웹 패턴 넥타이",
    "slot": "showFace",
    "category": "머리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "23회차",
      "패턴",
      "넥타이"
    ]
  },
  {
    "id": "av_1506",
    "name": "속박",
    "slot": "showHead",
    "category": "머리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "23회차",
      "속박"
    ]
  },
  {
    "id": "av_1507",
    "name": "크레센트 캣",
    "slot": "showHead",
    "category": "머리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "23회차",
      "크레센트"
    ]
  },
  {
    "id": "av_1508",
    "name": "파스텔 큐트",
    "slot": "showHead",
    "category": "머리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "23회차",
      "파스텔",
      "큐트"
    ]
  },
  {
    "id": "av_1509",
    "name": "오로라 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "23회차",
      "오로라",
      "스카프"
    ]
  },
  {
    "id": "av_1510",
    "name": "미니 정원",
    "slot": "showArmor",
    "category": "몸",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "23회차",
      "미니",
      "정원"
    ]
  },
  {
    "id": "av_1511",
    "name": "금 닻",
    "slot": "showArmor",
    "category": "몸",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "23회차"
    ]
  },
  {
    "id": "av_1512",
    "name": "우리엘",
    "slot": "showArmor",
    "category": "몸",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "23회차",
      "우리엘"
    ]
  },
  {
    "id": "av_1513",
    "name": "성대한 파티 만찬",
    "slot": "showArmor",
    "category": "몸",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "23회차",
      "성대한",
      "파티",
      "만찬"
    ]
  },
  {
    "id": "av_1514",
    "name": "캡틴 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "23회차",
      "캡틴",
      "망토"
    ]
  },
  {
    "id": "av_1515",
    "name": "뼈다귀 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "23회차",
      "뼈다귀",
      "발자국"
    ]
  },
  {
    "id": "av_1516",
    "name": "한 맺힌 영혼 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "23회차",
      "맺힌",
      "영혼",
      "발자국"
    ]
  },
  {
    "id": "av_1517",
    "name": "뿡뿡 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "23회차",
      "뿡뿡",
      "발자국"
    ]
  },
  {
    "id": "av_1518",
    "name": "불의 정령 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "23회차",
      "불의",
      "정령",
      "발자국"
    ]
  },
  {
    "id": "av_1519",
    "name": "새틀라이트 빔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "23회차",
      "새틀라이트",
      "발자국"
    ]
  },
  {
    "id": "av_1520",
    "name": "산들바람",
    "slot": "showEffect",
    "category": "효과",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "23회차",
      "산들바람"
    ]
  },
  {
    "id": "av_1521",
    "name": "블레이즈 서클",
    "slot": "showEffect",
    "category": "효과",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "23회차",
      "블레이즈",
      "서클"
    ]
  },
  {
    "id": "av_1522",
    "name": "수박개기 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "23회차",
      "수박개기",
      "젤리삐"
    ]
  },
  {
    "id": "av_1523",
    "name": "롱롱이",
    "slot": "showEffect",
    "category": "효과",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "23회차",
      "롱롱이"
    ]
  },
  {
    "id": "av_1524",
    "name": "젤리삐 풍경",
    "slot": "showEffect",
    "category": "효과",
    "round": "23회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "23회차",
      "젤리삐",
      "풍경"
    ]
  },
  {
    "id": "av_1525",
    "name": "쫑긋 토끼귀 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "24회차",
      "쫑긋",
      "토끼귀",
      "모자"
    ]
  },
  {
    "id": "av_1526",
    "name": "오베론",
    "slot": "showHead",
    "category": "투구",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "24회차",
      "오베론"
    ]
  },
  {
    "id": "av_1527",
    "name": "터키시 앙고라",
    "slot": "showHead",
    "category": "투구",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "24회차",
      "터키시",
      "앙고라"
    ]
  },
  {
    "id": "av_1528",
    "name": "천사 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "24회차",
      "천사",
      "머리띠"
    ]
  },
  {
    "id": "av_1529",
    "name": "은방울꽃 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "24회차",
      "은방울꽃",
      "머리띠"
    ]
  },
  {
    "id": "av_1530",
    "name": "스노클링 고글",
    "slot": "showHead",
    "category": "머리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "24회차",
      "스노클링",
      "고글"
    ]
  },
  {
    "id": "av_1531",
    "name": "소서러 후드",
    "slot": "showArmor",
    "category": "머리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "24회차",
      "소서러",
      "후드"
    ]
  },
  {
    "id": "av_1532",
    "name": "괴도 샤른가면",
    "slot": "showHead",
    "category": "머리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "24회차",
      "괴도",
      "샤른가면"
    ]
  },
  {
    "id": "av_1533",
    "name": "다크니스 드래곤 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "24회차",
      "다크니스",
      "드래곤",
      "머플러"
    ]
  },
  {
    "id": "av_1534",
    "name": "천사의 부름",
    "slot": "showHead",
    "category": "머리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "24회차",
      "천사의",
      "부름"
    ]
  },
  {
    "id": "av_1535",
    "name": "정령 호수의 나비",
    "slot": "showArmor",
    "category": "몸",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "24회차",
      "정령",
      "호수의",
      "나비"
    ]
  },
  {
    "id": "av_1536",
    "name": "백여우 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "24회차",
      "백여우",
      "꼬리"
    ]
  },
  {
    "id": "av_1537",
    "name": "금은각의 호로병",
    "slot": "showArmor",
    "category": "몸",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "24회차",
      "금은각의",
      "호로병"
    ]
  },
  {
    "id": "av_1538",
    "name": "천사 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "24회차",
      "천사",
      "날개"
    ]
  },
  {
    "id": "av_1539",
    "name": "타천사 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "24회차",
      "타천사",
      "날개"
    ]
  },
  {
    "id": "av_1540",
    "name": "빅-버거 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "24회차",
      "빅-버거",
      "발자국"
    ]
  },
  {
    "id": "av_1541",
    "name": "엄지척 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "24회차",
      "엄지척",
      "발자국"
    ]
  },
  {
    "id": "av_1542",
    "name": "추억빛 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "24회차",
      "추억빛",
      "발자국"
    ]
  },
  {
    "id": "av_1543",
    "name": "벼락 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "24회차",
      "벼락",
      "발자국"
    ]
  },
  {
    "id": "av_1544",
    "name": "물풍선 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "24회차",
      "물풍선",
      "발자국"
    ]
  },
  {
    "id": "av_1545",
    "name": "흩날리는 깃털",
    "slot": "showEffect",
    "category": "효과",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "24회차",
      "흩날리는",
      "깃털"
    ]
  },
  {
    "id": "av_1546",
    "name": "둥실둥실 해파리",
    "slot": "showEffect",
    "category": "효과",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "24회차",
      "둥실둥실",
      "해파리"
    ]
  },
  {
    "id": "av_1547",
    "name": "악몽의 리리스",
    "slot": "showEffect",
    "category": "효과",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "24회차",
      "악몽의",
      "리리스"
    ]
  },
  {
    "id": "av_1548",
    "name": "샤인 레인",
    "slot": "showEffect",
    "category": "효과",
    "round": "24회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "24회차",
      "샤인",
      "레인"
    ]
  },
  {
    "id": "av_1549",
    "name": "앨리스 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "25회차",
      "앨리스",
      "머리띠"
    ]
  },
  {
    "id": "av_1550",
    "name": "머구리",
    "slot": "showHead",
    "category": "투구",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "25회차",
      "머구리"
    ]
  },
  {
    "id": "av_1551",
    "name": "육망성",
    "slot": "showHead",
    "category": "투구",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "25회차",
      "육망성"
    ]
  },
  {
    "id": "av_1552",
    "name": "열대의 선물",
    "slot": "showHead",
    "category": "투구",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "25회차",
      "열대의",
      "선물"
    ]
  },
  {
    "id": "av_1553",
    "name": "홍염의 투구",
    "slot": "showHead",
    "category": "투구",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "25회차",
      "홍염의"
    ]
  },
  {
    "id": "av_1554",
    "name": "힙스터 스타일 수염",
    "slot": "showFace",
    "category": "머리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "25회차",
      "힙스터",
      "스타일",
      "수염"
    ]
  },
  {
    "id": "av_1555",
    "name": "반야",
    "slot": "showHead",
    "category": "머리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "25회차",
      "반야"
    ]
  },
  {
    "id": "av_1556",
    "name": "섬머 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "25회차",
      "섬머",
      "스카프"
    ]
  },
  {
    "id": "av_1557",
    "name": "다이아몬드 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "25회차",
      "다이아몬드",
      "이어링"
    ]
  },
  {
    "id": "av_1558",
    "name": "어깨 위의 토코투칸",
    "slot": "showHead",
    "category": "머리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "25회차",
      "어깨",
      "위의",
      "토코투칸"
    ]
  },
  {
    "id": "av_1559",
    "name": "어둠의 결계",
    "slot": "showEffect",
    "category": "몸",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "25회차",
      "어둠의",
      "결계"
    ]
  },
  {
    "id": "av_1560",
    "name": "유령 신부",
    "slot": "showArmor",
    "category": "몸",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "25회차",
      "유령",
      "신부"
    ]
  },
  {
    "id": "av_1561",
    "name": "트로피칼 플라워",
    "slot": "showArmor",
    "category": "몸",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "25회차",
      "트로피칼",
      "플라워"
    ]
  },
  {
    "id": "av_1562",
    "name": "봉인된 검",
    "slot": "showArmor",
    "category": "몸",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "25회차",
      "봉인된"
    ]
  },
  {
    "id": "av_1563",
    "name": "홍염의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "25회차",
      "홍염의",
      "날개"
    ]
  },
  {
    "id": "av_1564",
    "name": "화살 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "25회차",
      "화살",
      "발자국"
    ]
  },
  {
    "id": "av_1565",
    "name": "불타는 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "25회차",
      "불타는",
      "발자국"
    ]
  },
  {
    "id": "av_1566",
    "name": "덫 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "25회차",
      "발자국"
    ]
  },
  {
    "id": "av_1567",
    "name": "과즙 팡팡 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "25회차",
      "과즙",
      "팡팡",
      "발자국"
    ]
  },
  {
    "id": "av_1568",
    "name": "새 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "25회차",
      "발자국"
    ]
  },
  {
    "id": "av_1569",
    "name": "유령 소녀",
    "slot": "showEffect",
    "category": "효과",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "25회차",
      "유령",
      "소녀"
    ]
  },
  {
    "id": "av_1570",
    "name": "시클 소녀",
    "slot": "showEffect",
    "category": "효과",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "25회차",
      "시클",
      "소녀"
    ]
  },
  {
    "id": "av_1571",
    "name": "블루밍 릴리",
    "slot": "showEffect",
    "category": "효과",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "25회차",
      "블루밍",
      "릴리"
    ]
  },
  {
    "id": "av_1572",
    "name": "트로피칼 후르츠",
    "slot": "showEffect",
    "category": "효과",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "25회차",
      "트로피칼",
      "후르츠"
    ]
  },
  {
    "id": "av_1573",
    "name": "만년염화",
    "slot": "showEffect",
    "category": "효과",
    "round": "25회차",
    "tab": "21~25회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "25회차",
      "만년염화"
    ]
  },
  {
    "id": "av_1574",
    "name": "새싹 화분",
    "slot": "showHead",
    "category": "투구",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "16회차",
      "새싹",
      "화분"
    ]
  },
  {
    "id": "av_1575",
    "name": "톡톡 체리",
    "slot": "showHead",
    "category": "투구",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "16회차",
      "톡톡",
      "체리"
    ]
  },
  {
    "id": "av_1576",
    "name": "유치원 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "16회차",
      "유치원",
      "모자"
    ]
  },
  {
    "id": "av_1577",
    "name": "벚꽃 만개",
    "slot": "showHead",
    "category": "투구",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "16회차",
      "벚꽃",
      "만개"
    ]
  },
  {
    "id": "av_1578",
    "name": "체리블라썸 미니 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "16회차",
      "체리블라썸",
      "미니"
    ]
  },
  {
    "id": "av_1579",
    "name": "하얀 리본 머리띠",
    "slot": "showHead",
    "category": "머리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "16회차",
      "하얀",
      "리본",
      "머리띠"
    ]
  },
  {
    "id": "av_1580",
    "name": "레인보우 문",
    "slot": "showHead",
    "category": "머리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "16회차",
      "레인보우"
    ]
  },
  {
    "id": "av_1581",
    "name": "블랙캣 피어스",
    "slot": "showHead",
    "category": "머리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "16회차",
      "블랙캣",
      "피어스"
    ]
  },
  {
    "id": "av_1582",
    "name": "레인보우 스타",
    "slot": "showHead",
    "category": "머리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "16회차",
      "레인보우",
      "스타"
    ]
  },
  {
    "id": "av_1583",
    "name": "주홍 하이비스커스",
    "slot": "showHead",
    "category": "머리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "16회차",
      "주홍",
      "하이비스커스"
    ]
  },
  {
    "id": "av_1584",
    "name": "노란 별 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "16회차",
      "노란",
      "날개"
    ]
  },
  {
    "id": "av_1585",
    "name": "유치원 가방",
    "slot": "showBack",
    "category": "몸",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "16회차",
      "유치원",
      "가방"
    ]
  },
  {
    "id": "av_1586",
    "name": "세인트 엔젤",
    "slot": "showArmor",
    "category": "몸",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "16회차",
      "세인트",
      "엔젤"
    ]
  },
  {
    "id": "av_1587",
    "name": "봄의 여왕",
    "slot": "showArmor",
    "category": "몸",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "16회차",
      "봄의",
      "여왕"
    ]
  },
  {
    "id": "av_1588",
    "name": "벚꽃 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "16회차",
      "벚꽃",
      "발자국"
    ]
  },
  {
    "id": "av_1589",
    "name": "새싹 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "16회차",
      "새싹",
      "발자국"
    ]
  },
  {
    "id": "av_1590",
    "name": "꽃향기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "16회차",
      "꽃향기",
      "발자국"
    ]
  },
  {
    "id": "av_1591",
    "name": "쓱삭쓱싹 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "16회차",
      "쓱삭쓱싹",
      "발자국"
    ]
  },
  {
    "id": "av_1592",
    "name": "초밥의 탄생 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "16회차",
      "초밥의",
      "탄생",
      "발자국"
    ]
  },
  {
    "id": "av_1593",
    "name": "하트 뿅뿅",
    "slot": "showEffect",
    "category": "효과",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "16회차",
      "하트",
      "뿅뿅"
    ]
  },
  {
    "id": "av_1594",
    "name": "하이퍼 메가폰",
    "slot": "showEffect",
    "category": "효과",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "16회차",
      "하이퍼",
      "메가폰"
    ]
  },
  {
    "id": "av_1595",
    "name": "뚜뚜와 낮잠",
    "slot": "showEffect",
    "category": "효과",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "16회차",
      "뚜뚜와",
      "낮잠"
    ]
  },
  {
    "id": "av_1596",
    "name": "황금 나비",
    "slot": "showEffect",
    "category": "효과",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "16회차",
      "황금",
      "나비"
    ]
  },
  {
    "id": "av_1597",
    "name": "쿵떡쿵떡 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "16회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "16회차",
      "쿵떡쿵떡",
      "젤리삐"
    ]
  },
  {
    "id": "av_1598",
    "name": "자애의 리본",
    "slot": "showHead",
    "category": "투구",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "17회차",
      "자애의",
      "리본"
    ]
  },
  {
    "id": "av_1599",
    "name": "봄의 화관",
    "slot": "showHead",
    "category": "투구",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "17회차",
      "봄의",
      "화관"
    ]
  },
  {
    "id": "av_1600",
    "name": "머리 위 클로버",
    "slot": "showHead",
    "category": "투구",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "17회차",
      "머리",
      "클로버"
    ]
  },
  {
    "id": "av_1601",
    "name": "드라군 인형 탈",
    "slot": "showHead",
    "category": "투구",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "17회차",
      "드라군",
      "인형"
    ]
  },
  {
    "id": "av_1602",
    "name": "고글",
    "slot": "showHead",
    "category": "투구",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "17회차",
      "고글"
    ]
  },
  {
    "id": "av_1603",
    "name": "초록 파티리본",
    "slot": "showHead",
    "category": "머리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "17회차",
      "초록",
      "파티리본"
    ]
  },
  {
    "id": "av_1604",
    "name": "테일즈 헤드셋",
    "slot": "showHead",
    "category": "머리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "17회차",
      "테일즈",
      "헤드셋"
    ]
  },
  {
    "id": "av_1605",
    "name": "꿀밤",
    "slot": "showHead",
    "category": "머리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "17회차",
      "꿀밤"
    ]
  },
  {
    "id": "av_1606",
    "name": "둘둘 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "17회차",
      "둘둘",
      "머플러"
    ]
  },
  {
    "id": "av_1607",
    "name": "세기말 어깨 보호구",
    "slot": "showHead",
    "category": "머리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "17회차",
      "세기말",
      "어깨",
      "보호구"
    ]
  },
  {
    "id": "av_1608",
    "name": "코코몽키 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "17회차",
      "코코몽키",
      "배낭"
    ]
  },
  {
    "id": "av_1609",
    "name": "드라군 꼬리 장식",
    "slot": "showBack",
    "category": "몸",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "17회차",
      "드라군",
      "꼬리",
      "장식"
    ]
  },
  {
    "id": "av_1610",
    "name": "별이 총총한 예복",
    "slot": "showSubArms",
    "category": "몸",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "17회차",
      "별이",
      "총총한",
      "예복"
    ]
  },
  {
    "id": "av_1611",
    "name": "화려한 나들이",
    "slot": "showArmor",
    "category": "몸",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "17회차",
      "화려한",
      "나들이"
    ]
  },
  {
    "id": "av_1612",
    "name": "생명의 태엽",
    "slot": "showArmor",
    "category": "몸",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "17회차",
      "생명의",
      "태엽"
    ]
  },
  {
    "id": "av_1613",
    "name": "플라워 로드 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "17회차",
      "플라워",
      "로드",
      "발자국"
    ]
  },
  {
    "id": "av_1614",
    "name": "모듬 분식 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "17회차",
      "모듬",
      "분식",
      "발자국"
    ]
  },
  {
    "id": "av_1615",
    "name": "나노 필드 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "17회차",
      "나노",
      "필드",
      "발자국"
    ]
  },
  {
    "id": "av_1616",
    "name": "핑크 구두 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "17회차",
      "핑크",
      "구두",
      "발자국"
    ]
  },
  {
    "id": "av_1617",
    "name": "UFO 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "17회차",
      "UFO",
      "발자국"
    ]
  },
  {
    "id": "av_1618",
    "name": "나비의 춤",
    "slot": "showEffect",
    "category": "효과",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "17회차",
      "나비의"
    ]
  },
  {
    "id": "av_1619",
    "name": "알파카",
    "slot": "showEffect",
    "category": "효과",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "17회차",
      "알파카"
    ]
  },
  {
    "id": "av_1620",
    "name": "빛의 정령",
    "slot": "showEffect",
    "category": "효과",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "17회차",
      "빛의",
      "정령"
    ]
  },
  {
    "id": "av_1621",
    "name": "오르골 카논",
    "slot": "showEffect",
    "category": "효과",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "17회차",
      "오르골",
      "카논"
    ]
  },
  {
    "id": "av_1622",
    "name": "흩날리는 추억",
    "slot": "showEffect",
    "category": "효과",
    "round": "17회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "17회차",
      "흩날리는",
      "추억"
    ]
  },
  {
    "id": "av_1623",
    "name": "머리 위 리브리오",
    "slot": "showHead",
    "category": "투구",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "18회차",
      "머리",
      "리브리오"
    ]
  },
  {
    "id": "av_1624",
    "name": "후르츠 캐스켓",
    "slot": "showHead",
    "category": "투구",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "18회차",
      "후르츠",
      "캐스켓"
    ]
  },
  {
    "id": "av_1625",
    "name": "동백 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "18회차",
      "동백",
      "모자"
    ]
  },
  {
    "id": "av_1626",
    "name": "허리케인 고양이 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "18회차",
      "허리케인",
      "고양이",
      "모자"
    ]
  },
  {
    "id": "av_1627",
    "name": "셜록",
    "slot": "showHead",
    "category": "투구",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "18회차",
      "셜록"
    ]
  },
  {
    "id": "av_1628",
    "name": "뱅글뱅글 안경",
    "slot": "showFace",
    "category": "머리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "18회차",
      "뱅글뱅글",
      "안경"
    ]
  },
  {
    "id": "av_1629",
    "name": "골드 크로스 피어스",
    "slot": "showHead",
    "category": "머리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "18회차",
      "골드",
      "크로스",
      "피어스"
    ]
  },
  {
    "id": "av_1630",
    "name": "생명의 원천",
    "slot": "showHead",
    "category": "머리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "18회차",
      "생명의",
      "원천"
    ]
  },
  {
    "id": "av_1631",
    "name": "카벙클 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "18회차",
      "카벙클",
      "머플러"
    ]
  },
  {
    "id": "av_1632",
    "name": "셜록 파이프",
    "slot": "showHead",
    "category": "머리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "18회차",
      "셜록",
      "파이프"
    ]
  },
  {
    "id": "av_1633",
    "name": "클래식 스쿨백",
    "slot": "showArmor",
    "category": "몸",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "18회차",
      "클래식",
      "스쿨백"
    ]
  },
  {
    "id": "av_1634",
    "name": "책임지는 하프",
    "slot": "showArmor",
    "category": "몸",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "18회차",
      "책임지는",
      "하프"
    ]
  },
  {
    "id": "av_1635",
    "name": "벚꽃비 우산",
    "slot": "showEffect",
    "category": "몸",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "18회차",
      "벚꽃비",
      "우산"
    ]
  },
  {
    "id": "av_1636",
    "name": "비극적인 사건 현장",
    "slot": "showArmor",
    "category": "몸",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "18회차",
      "비극적인",
      "사건",
      "현장"
    ]
  },
  {
    "id": "av_1637",
    "name": "캔디봄 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "18회차",
      "캔디봄",
      "발자국"
    ]
  },
  {
    "id": "av_1638",
    "name": "화살표 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "18회차",
      "화살표",
      "발자국"
    ]
  },
  {
    "id": "av_1639",
    "name": "레인보우 스타 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "18회차",
      "레인보우",
      "스타",
      "발자국"
    ]
  },
  {
    "id": "av_1640",
    "name": "플링플링 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "18회차",
      "플링플링",
      "발자국"
    ]
  },
  {
    "id": "av_1641",
    "name": "땅의 요정 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "18회차",
      "땅의",
      "요정",
      "발자국"
    ]
  },
  {
    "id": "av_1642",
    "name": "통통 농구공",
    "slot": "showEffect",
    "category": "효과",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "18회차",
      "통통",
      "농구공"
    ]
  },
  {
    "id": "av_1643",
    "name": "엔드리스 러브",
    "slot": "showEffect",
    "category": "효과",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "18회차",
      "엔드리스",
      "러브"
    ]
  },
  {
    "id": "av_1644",
    "name": "수국의 원",
    "slot": "showEffect",
    "category": "효과",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "18회차",
      "수국의"
    ]
  },
  {
    "id": "av_1645",
    "name": "하트 테이블",
    "slot": "showEffect",
    "category": "효과",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "18회차",
      "하트",
      "테이블"
    ]
  },
  {
    "id": "av_1646",
    "name": "왓슨삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "18회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "18회차",
      "왓슨삐"
    ]
  },
  {
    "id": "av_1647",
    "name": "화이트 헤드캣",
    "slot": "showHead",
    "category": "투구",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "19회차",
      "화이트",
      "헤드캣"
    ]
  },
  {
    "id": "av_1648",
    "name": "체크 턱시도 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "19회차",
      "체크",
      "턱시도",
      "모자"
    ]
  },
  {
    "id": "av_1649",
    "name": "젤리삐 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "19회차",
      "젤리삐",
      "후드"
    ]
  },
  {
    "id": "av_1650",
    "name": "나이트메어 헬름",
    "slot": "showHead",
    "category": "투구",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "19회차",
      "나이트메어",
      "헬름"
    ]
  },
  {
    "id": "av_1651",
    "name": "빵봉투",
    "slot": "showHead",
    "category": "투구",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "19회차",
      "빵봉투"
    ]
  },
  {
    "id": "av_1652",
    "name": "어깨위의 잉꼬",
    "slot": "showHead",
    "category": "머리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "19회차",
      "어깨위의",
      "잉꼬"
    ]
  },
  {
    "id": "av_1653",
    "name": "레드 리본",
    "slot": "showHead",
    "category": "머리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "19회차",
      "레드",
      "리본"
    ]
  },
  {
    "id": "av_1654",
    "name": "물의 숄",
    "slot": "showBack",
    "category": "머리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "19회차",
      "물의"
    ]
  },
  {
    "id": "av_1655",
    "name": "체리블라썸 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "19회차",
      "체리블라썸",
      "이어링"
    ]
  },
  {
    "id": "av_1656",
    "name": "번쩍 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "19회차",
      "번쩍",
      "가면"
    ]
  },
  {
    "id": "av_1657",
    "name": "스위트 리본 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "19회차",
      "스위트",
      "리본",
      "망토"
    ]
  },
  {
    "id": "av_1658",
    "name": "베르세르크",
    "slot": "showArmor",
    "category": "몸",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "19회차",
      "베르세르크"
    ]
  },
  {
    "id": "av_1659",
    "name": "부채 소녀",
    "slot": "showArmor",
    "category": "몸",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "19회차",
      "부채",
      "소녀"
    ]
  },
  {
    "id": "av_1660",
    "name": "노락색 우산",
    "slot": "showEffect",
    "category": "몸",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "19회차",
      "노락색",
      "우산"
    ]
  },
  {
    "id": "av_1661",
    "name": "크노헨 Jr.의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "19회차",
      "크노헨",
      "Jr.의",
      "날개"
    ]
  },
  {
    "id": "av_1662",
    "name": "블룸붐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "19회차",
      "블룸붐",
      "발자국"
    ]
  },
  {
    "id": "av_1663",
    "name": "그림자 나비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "19회차",
      "그림자",
      "나비",
      "발자국"
    ]
  },
  {
    "id": "av_1664",
    "name": "독구름 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "19회차",
      "독구름",
      "발자국"
    ]
  },
  {
    "id": "av_1665",
    "name": "점핑 뚜뚜 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "19회차",
      "점핑",
      "뚜뚜",
      "발자국"
    ]
  },
  {
    "id": "av_1666",
    "name": "즉석 달걀 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "19회차",
      "즉석",
      "달걀",
      "발자국"
    ]
  },
  {
    "id": "av_1667",
    "name": "커스터드 푸딩과 함께",
    "slot": "showEffect",
    "category": "효과",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "19회차",
      "커스터드",
      "푸딩과",
      "함께"
    ]
  },
  {
    "id": "av_1668",
    "name": "라이트닝 볼",
    "slot": "showEffect",
    "category": "효과",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "19회차",
      "라이트닝"
    ]
  },
  {
    "id": "av_1669",
    "name": "마가렛 샤워",
    "slot": "showEffect",
    "category": "효과",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "19회차",
      "마가렛",
      "샤워"
    ]
  },
  {
    "id": "av_1670",
    "name": "로즈 테라피",
    "slot": "showEffect",
    "category": "효과",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "19회차",
      "로즈",
      "테라피"
    ]
  },
  {
    "id": "av_1671",
    "name": "낚시하는 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "19회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "19회차",
      "낚시하는",
      "젤리삐"
    ]
  },
  {
    "id": "av_1672",
    "name": "보라 토끼귀 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "20회차",
      "보라",
      "토끼귀",
      "장식"
    ]
  },
  {
    "id": "av_1673",
    "name": "하얀 포포머리",
    "slot": "showHead",
    "category": "투구",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "20회차",
      "하얀",
      "포포머리"
    ]
  },
  {
    "id": "av_1674",
    "name": "흑영접",
    "slot": "showHead",
    "category": "투구",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "20회차",
      "흑영접"
    ]
  },
  {
    "id": "av_1675",
    "name": "롭이어 카추샤",
    "slot": "showHead",
    "category": "투구",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "20회차",
      "롭이어",
      "카추샤"
    ]
  },
  {
    "id": "av_1676",
    "name": "에메랄드 엘프 캡",
    "slot": "showHead",
    "category": "투구",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "20회차",
      "에메랄드",
      "엘프"
    ]
  },
  {
    "id": "av_1677",
    "name": "반요",
    "slot": "showHead",
    "category": "머리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "20회차",
      "반요"
    ]
  },
  {
    "id": "av_1678",
    "name": "목 깁스",
    "slot": "showHead",
    "category": "머리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "20회차",
      "깁스"
    ]
  },
  {
    "id": "av_1679",
    "name": "별 헤는 밤",
    "slot": "showHead",
    "category": "머리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "20회차",
      "헤는"
    ]
  },
  {
    "id": "av_1680",
    "name": "자율규제",
    "slot": "showHead",
    "category": "머리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "20회차",
      "자율규제"
    ]
  },
  {
    "id": "av_1681",
    "name": "에메랄드 이어링",
    "slot": "showHead",
    "category": "머리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "20회차",
      "에메랄드",
      "이어링"
    ]
  },
  {
    "id": "av_1682",
    "name": "빛나는 모래시계",
    "slot": "showArmor",
    "category": "몸",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "20회차",
      "빛나는",
      "모래시계"
    ]
  },
  {
    "id": "av_1683",
    "name": "괴도 캣츠",
    "slot": "showArmor",
    "category": "몸",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "20회차",
      "괴도",
      "캣츠"
    ]
  },
  {
    "id": "av_1684",
    "name": "요조숙녀",
    "slot": "showArmor",
    "category": "몸",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "20회차",
      "요조숙녀"
    ]
  },
  {
    "id": "av_1685",
    "name": "밤 까마귀",
    "slot": "showArmor",
    "category": "몸",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "20회차",
      "까마귀"
    ]
  },
  {
    "id": "av_1686",
    "name": "에메랄드 크로스보우",
    "slot": "showArmor",
    "category": "몸",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "20회차",
      "에메랄드",
      "크로스보우"
    ]
  },
  {
    "id": "av_1687",
    "name": "부서지는 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "20회차",
      "부서지는",
      "발자국"
    ]
  },
  {
    "id": "av_1688",
    "name": "완전 회피 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "20회차",
      "완전",
      "회피",
      "발자국"
    ]
  },
  {
    "id": "av_1689",
    "name": "싱그러운 클로버 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "20회차",
      "싱그러운",
      "클로버",
      "발자국"
    ]
  },
  {
    "id": "av_1690",
    "name": "우당탕탕 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "20회차",
      "우당탕탕",
      "발자국"
    ]
  },
  {
    "id": "av_1691",
    "name": "압정 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "20회차",
      "압정",
      "발자국"
    ]
  },
  {
    "id": "av_1692",
    "name": "꿈꾸는 토끼풀",
    "slot": "showEffect",
    "category": "효과",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "20회차",
      "꿈꾸는",
      "토끼풀"
    ]
  },
  {
    "id": "av_1693",
    "name": "이슬비",
    "slot": "showEffect",
    "category": "효과",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "20회차",
      "이슬비"
    ]
  },
  {
    "id": "av_1694",
    "name": "사랑이 피어날 때",
    "slot": "showEffect",
    "category": "효과",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "20회차",
      "사랑이",
      "피어날"
    ]
  },
  {
    "id": "av_1695",
    "name": "프로포즈 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "20회차",
      "프로포즈",
      "젤리삐"
    ]
  },
  {
    "id": "av_1696",
    "name": "에메랄드 결정",
    "slot": "showEffect",
    "category": "효과",
    "round": "20회차",
    "tab": "16~20회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "20회차",
      "에메랄드",
      "결정"
    ]
  },
  {
    "id": "av_1697",
    "name": "엘티보 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "11회차",
      "엘티보",
      "후드"
    ]
  },
  {
    "id": "av_1698",
    "name": "버섯돌이",
    "slot": "showHead",
    "category": "투구",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "11회차",
      "버섯돌이"
    ]
  },
  {
    "id": "av_1699",
    "name": "레드 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "11회차",
      "레드",
      "후드"
    ]
  },
  {
    "id": "av_1700",
    "name": "토끼귀 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "11회차",
      "토끼귀",
      "모자"
    ]
  },
  {
    "id": "av_1701",
    "name": "타이거 마스크",
    "slot": "showFace",
    "category": "투구",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "11회차",
      "타이거",
      "마스크"
    ]
  },
  {
    "id": "av_1702",
    "name": "걸리쉬 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "11회차",
      "걸리쉬",
      "머플러"
    ]
  },
  {
    "id": "av_1703",
    "name": "한입 당근",
    "slot": "showHead",
    "category": "머리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "11회차",
      "한입",
      "당근"
    ]
  },
  {
    "id": "av_1704",
    "name": "체인",
    "slot": "showHead",
    "category": "머리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "11회차",
      "체인"
    ]
  },
  {
    "id": "av_1705",
    "name": "강시 부적",
    "slot": "showHead",
    "category": "머리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "11회차",
      "강시",
      "부적"
    ]
  },
  {
    "id": "av_1706",
    "name": "오색나비",
    "slot": "showHead",
    "category": "머리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "11회차",
      "오색나비"
    ]
  },
  {
    "id": "av_1707",
    "name": "여행 가방",
    "slot": "showBack",
    "category": "몸",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "11회차",
      "여행",
      "가방"
    ]
  },
  {
    "id": "av_1708",
    "name": "전국갑국",
    "slot": "showArmor",
    "category": "몸",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "11회차",
      "전국갑국"
    ]
  },
  {
    "id": "av_1709",
    "name": "스위트 엄브렐라",
    "slot": "showArmor",
    "category": "몸",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "11회차",
      "스위트",
      "엄브렐라"
    ]
  },
  {
    "id": "av_1710",
    "name": "엔젤 보우",
    "slot": "showArmor",
    "category": "몸",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "11회차",
      "엔젤",
      "보우"
    ]
  },
  {
    "id": "av_1711",
    "name": "다크 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "11회차",
      "다크"
    ]
  },
  {
    "id": "av_1712",
    "name": "동전 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "11회차",
      "동전",
      "발자국"
    ]
  },
  {
    "id": "av_1713",
    "name": "바나나 껍질 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "11회차",
      "바나나",
      "껍질",
      "발자국"
    ]
  },
  {
    "id": "av_1714",
    "name": "돌핀쇼 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "11회차",
      "돌핀쇼",
      "발자국"
    ]
  },
  {
    "id": "av_1715",
    "name": "스타게이트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "11회차",
      "스타게이트",
      "발자국"
    ]
  },
  {
    "id": "av_1716",
    "name": "점핑 젤리삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "11회차",
      "점핑",
      "젤리삐",
      "발자국"
    ]
  },
  {
    "id": "av_1717",
    "name": "폴링 카드",
    "slot": "showEffect",
    "category": "효과",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "11회차",
      "폴링",
      "카드"
    ]
  },
  {
    "id": "av_1718",
    "name": "검은 천사의 강림",
    "slot": "showEffect",
    "category": "효과",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "11회차",
      "검은",
      "천사의",
      "강림"
    ]
  },
  {
    "id": "av_1719",
    "name": "악령의 그림자",
    "slot": "showEffect",
    "category": "효과",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "11회차",
      "악령의",
      "그림자"
    ]
  },
  {
    "id": "av_1720",
    "name": "라이브 온 스테이지☆",
    "slot": "showEffect",
    "category": "효과",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "11회차",
      "라이브",
      "스테이지☆"
    ]
  },
  {
    "id": "av_1721",
    "name": "잠재력 폭발!",
    "slot": "showEffect",
    "category": "효과",
    "round": "11회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "11회차",
      "잠재력",
      "폭발!"
    ]
  },
  {
    "id": "av_1722",
    "name": "라면",
    "slot": "showHead",
    "category": "투구",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "12회차",
      "라면"
    ]
  },
  {
    "id": "av_1723",
    "name": "코튼 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "12회차",
      "코튼",
      "후드"
    ]
  },
  {
    "id": "av_1724",
    "name": "롭이어 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "12회차",
      "롭이어",
      "베레모"
    ]
  },
  {
    "id": "av_1725",
    "name": "크리스마스 루돌프",
    "slot": "showHead",
    "category": "투구",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "12회차",
      "크리스마스",
      "루돌프"
    ]
  },
  {
    "id": "av_1726",
    "name": "악동 산타",
    "slot": "showHead",
    "category": "투구",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "12회차",
      "악동",
      "산타"
    ]
  },
  {
    "id": "av_1727",
    "name": "붕어빵",
    "slot": "showHead",
    "category": "머리",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "12회차",
      "붕어빵"
    ]
  },
  {
    "id": "av_1728",
    "name": "래빗 후드 케이프",
    "slot": "showArmor",
    "category": "머리",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "12회차",
      "래빗",
      "후드",
      "케이프"
    ]
  },
  {
    "id": "av_1729",
    "name": "메리 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "12회차",
      "메리",
      "케이프"
    ]
  },
  {
    "id": "av_1730",
    "name": "고독한 자의 수염",
    "slot": "showFace",
    "category": "머리",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "12회차",
      "고독한",
      "자의",
      "수염"
    ]
  },
  {
    "id": "av_1731",
    "name": "바다",
    "slot": "showArmor",
    "category": "몸",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "12회차",
      "바다"
    ]
  },
  {
    "id": "av_1732",
    "name": "매지컬 크리스마스",
    "slot": "showArmor",
    "category": "몸",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "12회차",
      "매지컬",
      "크리스마스"
    ]
  },
  {
    "id": "av_1733",
    "name": "두툼한 밍크코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "12회차",
      "두툼한",
      "밍크코트"
    ]
  },
  {
    "id": "av_1734",
    "name": "산타 양말",
    "slot": "showArmor",
    "category": "몸",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "12회차",
      "산타",
      "양말"
    ]
  },
  {
    "id": "av_1735",
    "name": "엄청난 선물",
    "slot": "showArmor",
    "category": "몸",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "12회차",
      "엄청난",
      "선물"
    ]
  },
  {
    "id": "av_1736",
    "name": "눈꽃 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "12회차",
      "눈꽃",
      "발자국"
    ]
  },
  {
    "id": "av_1737",
    "name": "샤이니 스노우 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "12회차",
      "샤이니",
      "스노우",
      "발자국"
    ]
  },
  {
    "id": "av_1738",
    "name": "뽀드득 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "12회차",
      "뽀드득",
      "발자국"
    ]
  },
  {
    "id": "av_1739",
    "name": "눈팡 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "12회차",
      "눈팡",
      "발자국"
    ]
  },
  {
    "id": "av_1740",
    "name": "함박눈 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "12회차",
      "함박눈",
      "발자국"
    ]
  },
  {
    "id": "av_1741",
    "name": "이불밖은 위험해",
    "slot": "showEffect",
    "category": "효과",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "12회차",
      "이불밖은",
      "위험해"
    ]
  },
  {
    "id": "av_1742",
    "name": "백설",
    "slot": "showEffect",
    "category": "효과",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "12회차",
      "백설"
    ]
  },
  {
    "id": "av_1743",
    "name": "젤리삐 품안에",
    "slot": "showEffect",
    "category": "효과",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "12회차",
      "젤리삐",
      "품안에"
    ]
  },
  {
    "id": "av_1744",
    "name": "화이트 크리스마스",
    "slot": "showEffect",
    "category": "효과",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "12회차",
      "화이트",
      "크리스마스"
    ]
  },
  {
    "id": "av_1745",
    "name": "고 투 헬 크리스마스",
    "slot": "showEffect",
    "category": "효과",
    "round": "12회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "12회차",
      "크리스마스"
    ]
  },
  {
    "id": "av_1746",
    "name": "별 군밤 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "13회차",
      "군밤",
      "모자"
    ]
  },
  {
    "id": "av_1747",
    "name": "크라운 포인트",
    "slot": "showHead",
    "category": "투구",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "13회차",
      "크라운",
      "포인트"
    ]
  },
  {
    "id": "av_1748",
    "name": "머리 수건",
    "slot": "showHead",
    "category": "투구",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "13회차",
      "머리",
      "수건"
    ]
  },
  {
    "id": "av_1749",
    "name": "늘어진 시바견",
    "slot": "showHead",
    "category": "투구",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "13회차",
      "늘어진",
      "시바견"
    ]
  },
  {
    "id": "av_1750",
    "name": "가넷 헤어핀",
    "slot": "showHead",
    "category": "투구",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "13회차",
      "가넷",
      "헤어핀"
    ]
  },
  {
    "id": "av_1751",
    "name": "뾰루퉁",
    "slot": "showHead",
    "category": "머리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "13회차",
      "뾰루퉁"
    ]
  },
  {
    "id": "av_1752",
    "name": "플레임 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "13회차",
      "플레임",
      "머플러"
    ]
  },
  {
    "id": "av_1753",
    "name": "감기 마스크",
    "slot": "showFace",
    "category": "머리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "13회차",
      "감기",
      "마스크"
    ]
  },
  {
    "id": "av_1754",
    "name": "족제비 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "13회차",
      "족제비",
      "머플러"
    ]
  },
  {
    "id": "av_1755",
    "name": "가넷 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "13회차",
      "가넷",
      "케이프"
    ]
  },
  {
    "id": "av_1756",
    "name": "타이거 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "13회차",
      "타이거",
      "망토"
    ]
  },
  {
    "id": "av_1757",
    "name": "알록달록 사탕",
    "slot": "showArmor",
    "category": "몸",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "13회차",
      "알록달록",
      "사탕"
    ]
  },
  {
    "id": "av_1758",
    "name": "황제펭귄 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "13회차",
      "황제펭귄",
      "배낭"
    ]
  },
  {
    "id": "av_1759",
    "name": "하오리",
    "slot": "showArmor",
    "category": "몸",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "13회차",
      "하오리"
    ]
  },
  {
    "id": "av_1760",
    "name": "가넷 장식",
    "slot": "showArmor",
    "category": "몸",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "13회차",
      "가넷",
      "장식"
    ]
  },
  {
    "id": "av_1761",
    "name": "주사위 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "13회차",
      "주사위",
      "발자국"
    ]
  },
  {
    "id": "av_1762",
    "name": "폭탄 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "13회차",
      "폭탄",
      "발자국"
    ]
  },
  {
    "id": "av_1763",
    "name": "깜짝상자 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "13회차",
      "깜짝상자",
      "발자국"
    ]
  },
  {
    "id": "av_1764",
    "name": "디지털 드로잉 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "13회차",
      "디지털",
      "드로잉",
      "발자국"
    ]
  },
  {
    "id": "av_1765",
    "name": "눈사람 일대기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "13회차",
      "눈사람",
      "일대기",
      "발자국"
    ]
  },
  {
    "id": "av_1766",
    "name": "입김",
    "slot": "showEffect",
    "category": "효과",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "13회차",
      "입김"
    ]
  },
  {
    "id": "av_1767",
    "name": "화이트 아울",
    "slot": "showEffect",
    "category": "효과",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "13회차",
      "화이트",
      "아울"
    ]
  },
  {
    "id": "av_1768",
    "name": "감도는 냉기",
    "slot": "showEffect",
    "category": "효과",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "13회차",
      "감도는",
      "냉기"
    ]
  },
  {
    "id": "av_1769",
    "name": "젤리삐 빈",
    "slot": "showEffect",
    "category": "효과",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "13회차",
      "젤리삐"
    ]
  },
  {
    "id": "av_1770",
    "name": "가넷 결정",
    "slot": "showEffect",
    "category": "효과",
    "round": "13회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "13회차",
      "가넷",
      "결정"
    ]
  },
  {
    "id": "av_1771",
    "name": "니트 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "14회차",
      "니트",
      "베레모"
    ]
  },
  {
    "id": "av_1772",
    "name": "얼음 왕관",
    "slot": "showHead",
    "category": "투구",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "14회차",
      "얼음",
      "왕관"
    ]
  },
  {
    "id": "av_1773",
    "name": "따뜻한 토끼 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "14회차",
      "따뜻한",
      "토끼",
      "모자"
    ]
  },
  {
    "id": "av_1774",
    "name": "양 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "14회차",
      "모자"
    ]
  },
  {
    "id": "av_1775",
    "name": "토끼 귀마개",
    "slot": "showHead",
    "category": "투구",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "14회차",
      "토끼",
      "귀마개"
    ]
  },
  {
    "id": "av_1776",
    "name": "익스트림 고글",
    "slot": "showHead",
    "category": "머리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "14회차",
      "익스트림",
      "고글"
    ]
  },
  {
    "id": "av_1777",
    "name": "빅 레드 리본",
    "slot": "showHead",
    "category": "머리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "14회차",
      "레드",
      "리본"
    ]
  },
  {
    "id": "av_1778",
    "name": "레이저 고글",
    "slot": "showHead",
    "category": "머리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "14회차",
      "레이저",
      "고글"
    ]
  },
  {
    "id": "av_1779",
    "name": "검은 고양이 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "14회차",
      "검은",
      "고양이",
      "머플러"
    ]
  },
  {
    "id": "av_1780",
    "name": "방울 목도리",
    "slot": "showHead",
    "category": "머리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "14회차",
      "방울",
      "목도리"
    ]
  },
  {
    "id": "av_1781",
    "name": "식신",
    "slot": "showArmor",
    "category": "몸",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "14회차",
      "식신"
    ]
  },
  {
    "id": "av_1782",
    "name": "주사기",
    "slot": "showArmor",
    "category": "몸",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "14회차",
      "주사기"
    ]
  },
  {
    "id": "av_1783",
    "name": "이그니스 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "14회차",
      "이그니스",
      "망토"
    ]
  },
  {
    "id": "av_1784",
    "name": "백룡",
    "slot": "showArmor",
    "category": "몸",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "14회차",
      "백룡"
    ]
  },
  {
    "id": "av_1785",
    "name": "참마도",
    "slot": "showArmor",
    "category": "몸",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "14회차",
      "참마도"
    ]
  },
  {
    "id": "av_1786",
    "name": "무지개 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "14회차",
      "무지개",
      "발자국"
    ]
  },
  {
    "id": "av_1787",
    "name": "빛의 조각 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "14회차",
      "빛의",
      "조각",
      "발자국"
    ]
  },
  {
    "id": "av_1788",
    "name": "섀도우테일 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "14회차",
      "섀도우테일",
      "발자국"
    ]
  },
  {
    "id": "av_1789",
    "name": "빛나는 그것 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "14회차",
      "빛나는",
      "그것",
      "발자국"
    ]
  },
  {
    "id": "av_1790",
    "name": "레드 이퀄라이저 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "14회차",
      "레드",
      "이퀄라이저",
      "발자국"
    ]
  },
  {
    "id": "av_1791",
    "name": "키리모찌 먹기",
    "slot": "showEffect",
    "category": "효과",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "14회차",
      "키리모찌",
      "먹기"
    ]
  },
  {
    "id": "av_1792",
    "name": "빠직",
    "slot": "showEffect",
    "category": "효과",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "14회차",
      "빠직"
    ]
  },
  {
    "id": "av_1793",
    "name": "유니버스 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "14회차",
      "유니버스",
      "젤리삐"
    ]
  },
  {
    "id": "av_1794",
    "name": "네크로맨서 비전",
    "slot": "showEffect",
    "category": "효과",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "14회차",
      "네크로맨서",
      "비전"
    ]
  },
  {
    "id": "av_1795",
    "name": "뾰로롱 하트",
    "slot": "showEffect",
    "category": "효과",
    "round": "14회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "14회차",
      "뾰로롱",
      "하트"
    ]
  },
  {
    "id": "av_1796",
    "name": "양 니트 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "15회차",
      "니트",
      "베레모"
    ]
  },
  {
    "id": "av_1797",
    "name": "불여우 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "15회차",
      "불여우"
    ]
  },
  {
    "id": "av_1798",
    "name": "밍크 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "15회차",
      "밍크",
      "모자"
    ]
  },
  {
    "id": "av_1799",
    "name": "제너럴",
    "slot": "showHead",
    "category": "투구",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "15회차",
      "제너럴"
    ]
  },
  {
    "id": "av_1800",
    "name": "명란 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "15회차",
      "명란",
      "모자"
    ]
  },
  {
    "id": "av_1801",
    "name": "오리 주둥이",
    "slot": "showHead",
    "category": "머리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "15회차",
      "오리",
      "주둥이"
    ]
  },
  {
    "id": "av_1802",
    "name": "딸기 머리띠",
    "slot": "showHead",
    "category": "머리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "15회차",
      "딸기",
      "머리띠"
    ]
  },
  {
    "id": "av_1803",
    "name": "스트로베리 필드",
    "slot": "showHead",
    "category": "머리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "15회차",
      "스트로베리",
      "필드"
    ]
  },
  {
    "id": "av_1804",
    "name": "세 번째 검",
    "slot": "showHead",
    "category": "머리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "15회차",
      "번째"
    ]
  },
  {
    "id": "av_1805",
    "name": "우물우물 도너츠",
    "slot": "showHead",
    "category": "머리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "15회차",
      "우물우물",
      "도너츠"
    ]
  },
  {
    "id": "av_1806",
    "name": "젤리삐 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "15회차",
      "젤리삐",
      "배낭"
    ]
  },
  {
    "id": "av_1807",
    "name": "불여우 구미",
    "slot": "showArmor",
    "category": "몸",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "15회차",
      "불여우",
      "구미"
    ]
  },
  {
    "id": "av_1808",
    "name": "나이트 스카이",
    "slot": "showArmor",
    "category": "몸",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "15회차",
      "나이트",
      "스카이"
    ]
  },
  {
    "id": "av_1809",
    "name": "벨 오브 메타트론",
    "slot": "showArmor",
    "category": "몸",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "15회차",
      "오브",
      "메타트론"
    ]
  },
  {
    "id": "av_1810",
    "name": "악마의 증거",
    "slot": "showArmor",
    "category": "몸",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "15회차",
      "악마의",
      "증거"
    ]
  },
  {
    "id": "av_1811",
    "name": "구슬 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "15회차",
      "구슬",
      "발자국"
    ]
  },
  {
    "id": "av_1812",
    "name": "스핀 젤리삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "15회차",
      "스핀",
      "젤리삐",
      "발자국"
    ]
  },
  {
    "id": "av_1813",
    "name": "호외 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "15회차",
      "호외",
      "발자국"
    ]
  },
  {
    "id": "av_1814",
    "name": "팔랑 지폐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "15회차",
      "팔랑",
      "지폐",
      "발자국"
    ]
  },
  {
    "id": "av_1815",
    "name": "양양 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "15회차",
      "양양",
      "발자국"
    ]
  },
  {
    "id": "av_1816",
    "name": "금단의 마법진",
    "slot": "showEffect",
    "category": "효과",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "15회차",
      "금단의",
      "마법진"
    ]
  },
  {
    "id": "av_1817",
    "name": "크로노스 게이트",
    "slot": "showEffect",
    "category": "효과",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "15회차",
      "크로노스",
      "게이트"
    ]
  },
  {
    "id": "av_1818",
    "name": "젤리삐의 겨울나기",
    "slot": "showEffect",
    "category": "효과",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "15회차",
      "젤리삐의",
      "겨울나기"
    ]
  },
  {
    "id": "av_1819",
    "name": "파랑새",
    "slot": "showEffect",
    "category": "효과",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "15회차",
      "파랑새"
    ]
  },
  {
    "id": "av_1820",
    "name": "알케미스트 스튜디오",
    "slot": "showEffect",
    "category": "효과",
    "round": "15회차",
    "tab": "11~15회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "15회차",
      "알케미스트",
      "스튜디오"
    ]
  },
  {
    "id": "av_1821",
    "name": "더듬이 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "6회차",
      "더듬이",
      "머리띠"
    ]
  },
  {
    "id": "av_1822",
    "name": "밤송이",
    "slot": "showHead",
    "category": "투구",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "6회차",
      "밤송이"
    ]
  },
  {
    "id": "av_1823",
    "name": "실버 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "6회차",
      "실버",
      "크라운"
    ]
  },
  {
    "id": "av_1824",
    "name": "젤리삐 인형",
    "slot": "showHead",
    "category": "투구",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "6회차",
      "젤리삐",
      "인형"
    ]
  },
  {
    "id": "av_1825",
    "name": "텐갤런",
    "slot": "showHead",
    "category": "투구",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "6회차",
      "텐갤런"
    ]
  },
  {
    "id": "av_1826",
    "name": "매달린 햄스터",
    "slot": "showHead",
    "category": "머리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "6회차",
      "매달린",
      "햄스터"
    ]
  },
  {
    "id": "av_1827",
    "name": "뱀뱀",
    "slot": "showHead",
    "category": "머리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "6회차",
      "뱀뱀"
    ]
  },
  {
    "id": "av_1828",
    "name": "베이지 애스콧타이",
    "slot": "showHead",
    "category": "머리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "6회차",
      "베이지",
      "애스콧타이"
    ]
  },
  {
    "id": "av_1829",
    "name": "어깨 위 참새",
    "slot": "showHead",
    "category": "머리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "6회차",
      "어깨",
      "참새"
    ]
  },
  {
    "id": "av_1830",
    "name": "핑키 라이더",
    "slot": "showHead",
    "category": "머리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "6회차",
      "핑키",
      "라이더"
    ]
  },
  {
    "id": "av_1831",
    "name": "꿀벌 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "6회차",
      "꿀벌",
      "배낭"
    ]
  },
  {
    "id": "av_1832",
    "name": "밀라 첼로 케이스",
    "slot": "showArmor",
    "category": "몸",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "6회차",
      "밀라",
      "첼로",
      "케이스"
    ]
  },
  {
    "id": "av_1833",
    "name": "속박의 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "6회차",
      "속박의",
      "날개"
    ]
  },
  {
    "id": "av_1834",
    "name": "야수",
    "slot": "showArmor",
    "category": "몸",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "6회차",
      "야수"
    ]
  },
  {
    "id": "av_1835",
    "name": "흑기사",
    "slot": "showArmor",
    "category": "몸",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "6회차",
      "흑기사"
    ]
  },
  {
    "id": "av_1836",
    "name": "껌 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "6회차",
      "발자국"
    ]
  },
  {
    "id": "av_1837",
    "name": "낙엽 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "6회차",
      "낙엽",
      "발자국"
    ]
  },
  {
    "id": "av_1838",
    "name": "쩅쨍 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "6회차",
      "쩅쨍",
      "발자국"
    ]
  },
  {
    "id": "av_1839",
    "name": "플라워 퍼퓸 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "6회차",
      "플라워",
      "퍼퓸",
      "발자국"
    ]
  },
  {
    "id": "av_1840",
    "name": "헨젤과 그레텔 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "6회차",
      "헨젤과",
      "그레텔",
      "발자국"
    ]
  },
  {
    "id": "av_1841",
    "name": "고양이 컵",
    "slot": "showEffect",
    "category": "효과",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "6회차",
      "고양이"
    ]
  },
  {
    "id": "av_1842",
    "name": "금기의 마도서",
    "slot": "showEffect",
    "category": "효과",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "6회차",
      "금기의",
      "마도서"
    ]
  },
  {
    "id": "av_1843",
    "name": "나의 팬",
    "slot": "showEffect",
    "category": "효과",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "6회차",
      "나의"
    ]
  },
  {
    "id": "av_1844",
    "name": "브레맨 음악대",
    "slot": "showEffect",
    "category": "효과",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "6회차",
      "브레맨",
      "음악대"
    ]
  },
  {
    "id": "av_1845",
    "name": "플라잉 레비",
    "slot": "showEffect",
    "category": "효과",
    "round": "6회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "6회차",
      "플라잉",
      "레비"
    ]
  },
  {
    "id": "av_1846",
    "name": "사제 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "7회차",
      "사제",
      "모자"
    ]
  },
  {
    "id": "av_1847",
    "name": "애머시스트 위치",
    "slot": "showHead",
    "category": "투구",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "7회차",
      "애머시스트",
      "위치"
    ]
  },
  {
    "id": "av_1848",
    "name": "어둠의 광대",
    "slot": "showHead",
    "category": "투구",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "7회차",
      "어둠의",
      "광대"
    ]
  },
  {
    "id": "av_1849",
    "name": "어쌔신 마스크",
    "slot": "showFace",
    "category": "투구",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "7회차",
      "어쌔신",
      "마스크"
    ]
  },
  {
    "id": "av_1850",
    "name": "팔라딘 투구",
    "slot": "showHead",
    "category": "투구",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "7회차",
      "팔라딘"
    ]
  },
  {
    "id": "av_1851",
    "name": "검은 조언자",
    "slot": "showHead",
    "category": "머리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "7회차",
      "검은",
      "조언자"
    ]
  },
  {
    "id": "av_1852",
    "name": "성월의 물방울",
    "slot": "showHead",
    "category": "머리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "7회차",
      "성월의",
      "물방울"
    ]
  },
  {
    "id": "av_1853",
    "name": "어쌔신 클로스",
    "slot": "showHead",
    "category": "머리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "7회차",
      "어쌔신",
      "클로스"
    ]
  },
  {
    "id": "av_1854",
    "name": "윙 스카프",
    "slot": "showBack",
    "category": "머리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "7회차",
      "스카프"
    ]
  },
  {
    "id": "av_1855",
    "name": "점성술사의 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "7회차",
      "점성술사의",
      "케이프"
    ]
  },
  {
    "id": "av_1856",
    "name": "레이븐",
    "slot": "showArmor",
    "category": "몸",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "7회차",
      "레이븐"
    ]
  },
  {
    "id": "av_1857",
    "name": "메모라이징 매직",
    "slot": "showArmor",
    "category": "몸",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "7회차",
      "메모라이징",
      "매직"
    ]
  },
  {
    "id": "av_1858",
    "name": "사신의 낫",
    "slot": "showArmor",
    "category": "몸",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "7회차",
      "사신의"
    ]
  },
  {
    "id": "av_1859",
    "name": "성기사단 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "7회차",
      "성기사단",
      "망토"
    ]
  },
  {
    "id": "av_1860",
    "name": "죽음의 손길",
    "slot": "showArmor",
    "category": "몸",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "7회차",
      "죽음의",
      "손길"
    ]
  },
  {
    "id": "av_1861",
    "name": "검은 영혼 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "7회차",
      "검은",
      "영혼",
      "발자국"
    ]
  },
  {
    "id": "av_1862",
    "name": "두둥 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "7회차",
      "두둥",
      "발자국"
    ]
  },
  {
    "id": "av_1863",
    "name": "붓터치 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "7회차",
      "붓터치",
      "발자국"
    ]
  },
  {
    "id": "av_1864",
    "name": "흑염룡 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "7회차",
      "흑염룡",
      "발자국"
    ]
  },
  {
    "id": "av_1865",
    "name": "힘찬 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "7회차",
      "힘찬",
      "발자국"
    ]
  },
  {
    "id": "av_1866",
    "name": "검은 고양이",
    "slot": "showEffect",
    "category": "효과",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "7회차",
      "검은",
      "고양이"
    ]
  },
  {
    "id": "av_1867",
    "name": "빛나는 가시넝쿨",
    "slot": "showEffect",
    "category": "효과",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "7회차",
      "빛나는",
      "가시넝쿨"
    ]
  },
  {
    "id": "av_1868",
    "name": "섀도우 스톰",
    "slot": "showEffect",
    "category": "효과",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "7회차",
      "섀도우",
      "스톰"
    ]
  },
  {
    "id": "av_1869",
    "name": "숨은 조력자",
    "slot": "showEffect",
    "category": "효과",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "7회차",
      "숨은",
      "조력자"
    ]
  },
  {
    "id": "av_1870",
    "name": "주시자의 눈",
    "slot": "showEffect",
    "category": "효과",
    "round": "7회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "7회차",
      "주시자의"
    ]
  },
  {
    "id": "av_1871",
    "name": "갓",
    "slot": "showHead",
    "category": "투구",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "8회차"
    ]
  },
  {
    "id": "av_1872",
    "name": "검은 토끼귀 실크 햇",
    "slot": "showHead",
    "category": "투구",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "8회차",
      "검은",
      "토끼귀",
      "실크"
    ]
  },
  {
    "id": "av_1873",
    "name": "방랑자",
    "slot": "showHead",
    "category": "투구",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "8회차",
      "방랑자"
    ]
  },
  {
    "id": "av_1874",
    "name": "사과나무 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "8회차",
      "사과나무",
      "모자"
    ]
  },
  {
    "id": "av_1875",
    "name": "호박 머리",
    "slot": "showHead",
    "category": "투구",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "8회차",
      "호박",
      "머리"
    ]
  },
  {
    "id": "av_1876",
    "name": "근엄 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "8회차",
      "근엄",
      "가면"
    ]
  },
  {
    "id": "av_1877",
    "name": "꺄아 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "8회차",
      "꺄아",
      "가면"
    ]
  },
  {
    "id": "av_1878",
    "name": "맛있져 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "8회차",
      "맛있져",
      "가면"
    ]
  },
  {
    "id": "av_1879",
    "name": "아 그래 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "8회차",
      "그래",
      "가면"
    ]
  },
  {
    "id": "av_1880",
    "name": "쿠왁 가면",
    "slot": "showHead",
    "category": "머리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "8회차",
      "쿠왁",
      "가면"
    ]
  },
  {
    "id": "av_1881",
    "name": "고딕 캣",
    "slot": "showArmor",
    "category": "몸",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "8회차",
      "고딕"
    ]
  },
  {
    "id": "av_1882",
    "name": "구름 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "8회차",
      "구름",
      "날개"
    ]
  },
  {
    "id": "av_1883",
    "name": "매지션 케이프",
    "slot": "showArmor",
    "category": "몸",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "8회차",
      "매지션",
      "케이프"
    ]
  },
  {
    "id": "av_1884",
    "name": "물의 요정",
    "slot": "showArmor",
    "category": "몸",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "8회차",
      "물의",
      "요정"
    ]
  },
  {
    "id": "av_1885",
    "name": "후광",
    "slot": "showArmor",
    "category": "몸",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "8회차",
      "후광"
    ]
  },
  {
    "id": "av_1886",
    "name": "양초 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "8회차",
      "양초",
      "발자국"
    ]
  },
  {
    "id": "av_1887",
    "name": "유령 물고기 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "8회차",
      "유령",
      "물고기",
      "발자국"
    ]
  },
  {
    "id": "av_1888",
    "name": "유령초 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "8회차",
      "유령초",
      "발자국"
    ]
  },
  {
    "id": "av_1889",
    "name": "할로윈 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "8회차",
      "할로윈",
      "발자국"
    ]
  },
  {
    "id": "av_1890",
    "name": "해골 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "8회차",
      "해골",
      "발자국"
    ]
  },
  {
    "id": "av_1891",
    "name": "거미줄 무늬 우산",
    "slot": "showEffect",
    "category": "효과",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "8회차",
      "거미줄",
      "무늬",
      "우산"
    ]
  },
  {
    "id": "av_1892",
    "name": "미니 윙키",
    "slot": "showEffect",
    "category": "효과",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "8회차",
      "미니",
      "윙키"
    ]
  },
  {
    "id": "av_1893",
    "name": "초롱 도깨비",
    "slot": "showEffect",
    "category": "효과",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "8회차",
      "초롱",
      "도깨비"
    ]
  },
  {
    "id": "av_1894",
    "name": "할로윈 유령",
    "slot": "showEffect",
    "category": "효과",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "8회차",
      "할로윈",
      "유령"
    ]
  },
  {
    "id": "av_1895",
    "name": "해골 유령",
    "slot": "showEffect",
    "category": "효과",
    "round": "8회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "8회차",
      "해골",
      "유령"
    ]
  },
  {
    "id": "av_1896",
    "name": "너구리 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "9회차",
      "너구리"
    ]
  },
  {
    "id": "av_1897",
    "name": "다람쥐 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "9회차",
      "다람쥐"
    ]
  },
  {
    "id": "av_1898",
    "name": "백곰 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "9회차",
      "백곰"
    ]
  },
  {
    "id": "av_1899",
    "name": "백호 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "9회차",
      "백호"
    ]
  },
  {
    "id": "av_1900",
    "name": "은여우 귀",
    "slot": "showHead",
    "category": "투구",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "9회차",
      "은여우"
    ]
  },
  {
    "id": "av_1901",
    "name": "너구리 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "9회차",
      "너구리",
      "머플러"
    ]
  },
  {
    "id": "av_1902",
    "name": "다람쥐 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "9회차",
      "다람쥐",
      "머플러"
    ]
  },
  {
    "id": "av_1903",
    "name": "백곰 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "9회차",
      "백곰",
      "머플러"
    ]
  },
  {
    "id": "av_1904",
    "name": "은여우 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "9회차",
      "은여우",
      "머플러"
    ]
  },
  {
    "id": "av_1905",
    "name": "호피무늬 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "9회차",
      "호피무늬",
      "머플러"
    ]
  },
  {
    "id": "av_1906",
    "name": "너구리 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "9회차",
      "너구리",
      "꼬리"
    ]
  },
  {
    "id": "av_1907",
    "name": "다람쥐 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "9회차",
      "다람쥐",
      "꼬리"
    ]
  },
  {
    "id": "av_1908",
    "name": "백곰 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "9회차",
      "백곰",
      "꼬리"
    ]
  },
  {
    "id": "av_1909",
    "name": "백호 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "9회차",
      "백호",
      "꼬리"
    ]
  },
  {
    "id": "av_1910",
    "name": "은여우 꼬리",
    "slot": "showBack",
    "category": "몸",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "9회차",
      "은여우",
      "꼬리"
    ]
  },
  {
    "id": "av_1911",
    "name": "검은 강아지 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "9회차",
      "검은",
      "강아지",
      "발자국"
    ]
  },
  {
    "id": "av_1912",
    "name": "공룡 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "9회차",
      "공룡",
      "발자국"
    ]
  },
  {
    "id": "av_1913",
    "name": "너구리 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "9회차",
      "너구리",
      "발자국"
    ]
  },
  {
    "id": "av_1914",
    "name": "뒹굴팬더 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "9회차",
      "뒹굴팬더",
      "발자국"
    ]
  },
  {
    "id": "av_1915",
    "name": "점핑캣 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "9회차",
      "점핑캣",
      "발자국"
    ]
  },
  {
    "id": "av_1916",
    "name": "귀여운 다람쥐",
    "slot": "showEffect",
    "category": "효과",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "9회차",
      "귀여운",
      "다람쥐"
    ]
  },
  {
    "id": "av_1917",
    "name": "귀여운 여우",
    "slot": "showEffect",
    "category": "효과",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "9회차",
      "귀여운",
      "여우"
    ]
  },
  {
    "id": "av_1918",
    "name": "귀여운 펭귄",
    "slot": "showEffect",
    "category": "효과",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "9회차",
      "귀여운",
      "펭귄"
    ]
  },
  {
    "id": "av_1919",
    "name": "내곁의 백곰",
    "slot": "showEffect",
    "category": "효과",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "9회차",
      "내곁의",
      "백곰"
    ]
  },
  {
    "id": "av_1920",
    "name": "카피바라 가족",
    "slot": "showEffect",
    "category": "효과",
    "round": "9회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "9회차",
      "카피바라",
      "가족"
    ]
  },
  {
    "id": "av_1921",
    "name": "빨간 스카프 강아지",
    "slot": "showHead",
    "category": "투구",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "10회차",
      "빨간",
      "스카프",
      "강아지"
    ]
  },
  {
    "id": "av_1922",
    "name": "착 달라붙은 황제펭귄",
    "slot": "showHead",
    "category": "투구",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "10회차",
      "달라붙은",
      "황제펭귄"
    ]
  },
  {
    "id": "av_1923",
    "name": "낚시 펭귄 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "10회차",
      "낚시",
      "펭귄",
      "모자"
    ]
  },
  {
    "id": "av_1924",
    "name": "댄싱 캣",
    "slot": "showHead",
    "category": "투구",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "10회차",
      "댄싱"
    ]
  },
  {
    "id": "av_1925",
    "name": "하얀 올빼미",
    "slot": "showHead",
    "category": "투구",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "10회차",
      "하얀",
      "올빼미"
    ]
  },
  {
    "id": "av_1926",
    "name": "매달린 하얀 고양이",
    "slot": "showHead",
    "category": "머리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "10회차",
      "매달린",
      "하얀",
      "고양이"
    ]
  },
  {
    "id": "av_1927",
    "name": "어깨 위의 드래곤",
    "slot": "showHead",
    "category": "머리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "10회차",
      "어깨",
      "위의",
      "드래곤"
    ]
  },
  {
    "id": "av_1928",
    "name": "애깨 위의 여우",
    "slot": "showHead",
    "category": "머리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "10회차",
      "애깨",
      "위의",
      "여우"
    ]
  },
  {
    "id": "av_1929",
    "name": "어깨 위의 족제비",
    "slot": "showHead",
    "category": "머리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "10회차",
      "어깨",
      "위의",
      "족제비"
    ]
  },
  {
    "id": "av_1930",
    "name": "어깨 위의 눈사람",
    "slot": "showFace",
    "category": "머리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "10회차",
      "어깨",
      "위의",
      "눈사람"
    ]
  },
  {
    "id": "av_1931",
    "name": "등 뒤의 망둥이",
    "slot": "showArmor",
    "category": "몸",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "10회차",
      "뒤의",
      "망둥이"
    ]
  },
  {
    "id": "av_1932",
    "name": "어깨 위 고양이",
    "slot": "showArmor",
    "category": "몸",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "10회차",
      "어깨",
      "고양이"
    ]
  },
  {
    "id": "av_1933",
    "name": "나무늘보",
    "slot": "showArmor",
    "category": "몸",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "10회차",
      "나무늘보"
    ]
  },
  {
    "id": "av_1934",
    "name": "도너츠냥",
    "slot": "showArmor",
    "category": "몸",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "10회차",
      "도너츠냥"
    ]
  },
  {
    "id": "av_1935",
    "name": "설녀의 가호",
    "slot": "showArmor",
    "category": "몸",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "10회차",
      "설녀의",
      "가호"
    ]
  },
  {
    "id": "av_1936",
    "name": "나비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "10회차",
      "나비",
      "발자국"
    ]
  },
  {
    "id": "av_1937",
    "name": "박스냥 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "10회차",
      "박스냥",
      "발자국"
    ]
  },
  {
    "id": "av_1938",
    "name": "허수아비 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "10회차",
      "허수아비",
      "발자국"
    ]
  },
  {
    "id": "av_1939",
    "name": "땅의 정령 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "10회차",
      "땅의",
      "정령",
      "발자국"
    ]
  },
  {
    "id": "av_1940",
    "name": "박쥐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "10회차",
      "박쥐",
      "발자국"
    ]
  },
  {
    "id": "av_1941",
    "name": "요정",
    "slot": "showEffect",
    "category": "효과",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "10회차",
      "요정"
    ]
  },
  {
    "id": "av_1942",
    "name": "행복한 털뭉치",
    "slot": "showEffect",
    "category": "효과",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "10회차",
      "행복한",
      "털뭉치"
    ]
  },
  {
    "id": "av_1943",
    "name": "둥둥 햄스터",
    "slot": "showEffect",
    "category": "효과",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "10회차",
      "둥둥",
      "햄스터"
    ]
  },
  {
    "id": "av_1944",
    "name": "핑크 밤비",
    "slot": "showEffect",
    "category": "효과",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "10회차",
      "핑크",
      "밤비"
    ]
  },
  {
    "id": "av_1945",
    "name": "풍성한 양",
    "slot": "showEffect",
    "category": "효과",
    "round": "10회차",
    "tab": "06~10회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "10회차",
      "풍성한"
    ]
  },
  {
    "id": "av_1946",
    "name": "파일럿 캡",
    "slot": "showHead",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "파일럿"
    ]
  },
  {
    "id": "av_1947",
    "name": "미니 로열 크라운",
    "slot": "showHead",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "미니",
      "로열",
      "크라운"
    ]
  },
  {
    "id": "av_1948",
    "name": "토끼 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "토끼",
      "모자"
    ]
  },
  {
    "id": "av_1949",
    "name": "펑키 헷",
    "slot": "showHead",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "펑키"
    ]
  },
  {
    "id": "av_1950",
    "name": "리본 헤드 드레스",
    "slot": "showArmor",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "리본",
      "헤드",
      "드레스"
    ]
  },
  {
    "id": "av_1951",
    "name": "천사의 티아라",
    "slot": "showHead",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "천사의",
      "티아라"
    ]
  },
  {
    "id": "av_1952",
    "name": "핑크 리본 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "핑크",
      "리본",
      "베레모"
    ]
  },
  {
    "id": "av_1953",
    "name": "코튼 벨 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "코튼",
      "베레모"
    ]
  },
  {
    "id": "av_1954",
    "name": "블랙캣 리본 후드",
    "slot": "showArmor",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "블랙캣",
      "리본",
      "후드"
    ]
  },
  {
    "id": "av_1955",
    "name": "블루 마린 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "1회차",
      "블루",
      "마린",
      "베레모"
    ]
  },
  {
    "id": "av_1956",
    "name": "스타 레드 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "스타",
      "레드",
      "스카프"
    ]
  },
  {
    "id": "av_1957",
    "name": "무지개 바람개비",
    "slot": "showHead",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "무지개",
      "바람개비"
    ]
  },
  {
    "id": "av_1958",
    "name": "스트라이프 리본 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "스트라이프",
      "리본",
      "머플러"
    ]
  },
  {
    "id": "av_1959",
    "name": "아프간 스톨",
    "slot": "showHead",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "아프간",
      "스톨"
    ]
  },
  {
    "id": "av_1960",
    "name": "크리스탈 피어스",
    "slot": "showHead",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "크리스탈",
      "피어스"
    ]
  },
  {
    "id": "av_1961",
    "name": "냥냥 목도리",
    "slot": "showHead",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "냥냥",
      "목도리"
    ]
  },
  {
    "id": "av_1962",
    "name": "리본 퍼 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "리본",
      "스카프"
    ]
  },
  {
    "id": "av_1963",
    "name": "검은 바람",
    "slot": "showHead",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "검은",
      "바람"
    ]
  },
  {
    "id": "av_1964",
    "name": "매달린 토끼",
    "slot": "showHead",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "매달린",
      "토끼"
    ]
  },
  {
    "id": "av_1965",
    "name": "가디언 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "1회차",
      "가디언",
      "스카프"
    ]
  },
  {
    "id": "av_1966",
    "name": "주시냥 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "주시냥",
      "배낭"
    ]
  },
  {
    "id": "av_1967",
    "name": "막시민 바이올린 케이스",
    "slot": "showArmor",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "막시민",
      "바이올린",
      "케이스"
    ]
  },
  {
    "id": "av_1968",
    "name": "매지컬 스푼",
    "slot": "showArmor",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "매지컬",
      "스푼"
    ]
  },
  {
    "id": "av_1969",
    "name": "유니베어 코트",
    "slot": "showArmor",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "유니베어",
      "코트"
    ]
  },
  {
    "id": "av_1970",
    "name": "데들리 러브",
    "slot": "showArmor",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "데들리",
      "러브"
    ]
  },
  {
    "id": "av_1971",
    "name": "빛나는 벨 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "빛나는",
      "망토"
    ]
  },
  {
    "id": "av_1972",
    "name": "별의 속삭임",
    "slot": "showArmor",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "별의",
      "속삭임"
    ]
  },
  {
    "id": "av_1973",
    "name": "축복의 울림",
    "slot": "showArmor",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "축복의",
      "울림"
    ]
  },
  {
    "id": "av_1974",
    "name": "코드네임 레드",
    "slot": "showArmor",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "코드네임",
      "레드"
    ]
  },
  {
    "id": "av_1975",
    "name": "천체의 수호자",
    "slot": "showArmor",
    "category": "몸",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "1회차",
      "천체의",
      "수호자"
    ]
  },
  {
    "id": "av_1976",
    "name": "검은 구두 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "검은",
      "구두",
      "발자국"
    ]
  },
  {
    "id": "av_1977",
    "name": "번개 구두 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "번개",
      "구두",
      "발자국"
    ]
  },
  {
    "id": "av_1978",
    "name": "젤리삐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "젤리삐",
      "발자국"
    ]
  },
  {
    "id": "av_1979",
    "name": "블랙홀 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "블랙홀",
      "발자국"
    ]
  },
  {
    "id": "av_1980",
    "name": "장미 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "장미",
      "발자국"
    ]
  },
  {
    "id": "av_1981",
    "name": "하얀 천사 깃털 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "하얀",
      "천사",
      "깃털",
      "발자국"
    ]
  },
  {
    "id": "av_1982",
    "name": "말 발굽 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "발굽",
      "발자국"
    ]
  },
  {
    "id": "av_1983",
    "name": "라이트 플라워 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "라이트",
      "플라워",
      "발자국"
    ]
  },
  {
    "id": "av_1984",
    "name": "반짝반짝 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "반짝반짝",
      "발자국"
    ]
  },
  {
    "id": "av_1985",
    "name": "반사 빛 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "1회차",
      "반사",
      "발자국"
    ]
  },
  {
    "id": "av_1986",
    "name": "러그",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "러그"
    ]
  },
  {
    "id": "av_1987",
    "name": "성스러운 흰 비둘기",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "성스러운",
      "비둘기"
    ]
  },
  {
    "id": "av_1988",
    "name": "붉은 나비",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "붉은",
      "나비"
    ]
  },
  {
    "id": "av_1989",
    "name": "크리스탈 라이트",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "크리스탈",
      "라이트"
    ]
  },
  {
    "id": "av_1990",
    "name": "젤리삐 슈팅스타",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "젤리삐",
      "슈팅스타"
    ]
  },
  {
    "id": "av_1991",
    "name": "미니 시바견",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "미니",
      "시바견"
    ]
  },
  {
    "id": "av_1992",
    "name": "일섬",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "일섬"
    ]
  },
  {
    "id": "av_1993",
    "name": "로맨틱 포춘",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "로맨틱",
      "포춘"
    ]
  },
  {
    "id": "av_1994",
    "name": "빙글빙글 혜성",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "빙글빙글",
      "혜성"
    ]
  },
  {
    "id": "av_1995",
    "name": "생명의 부름",
    "slot": "showEffect",
    "category": "효과",
    "round": "1회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "1회차",
      "생명의",
      "부름"
    ]
  },
  {
    "id": "av_1996",
    "name": "늘어뜨린 토끼귀 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "2회차",
      "늘어뜨린",
      "토끼귀",
      "모자"
    ]
  },
  {
    "id": "av_1997",
    "name": "바다 머리 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "2회차",
      "바다",
      "머리",
      "장식"
    ]
  },
  {
    "id": "av_1998",
    "name": "소년 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "2회차",
      "소년",
      "모자"
    ]
  },
  {
    "id": "av_1999",
    "name": "언밸런스 미니 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "2회차",
      "언밸런스",
      "미니",
      "베레모"
    ]
  },
  {
    "id": "av_2000",
    "name": "푸른 깃털 검은 베레모",
    "slot": "showHead",
    "category": "투구",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "2회차",
      "푸른",
      "깃털",
      "검은",
      "베레모"
    ]
  },
  {
    "id": "av_2001",
    "name": "골든 폭스 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "2회차",
      "골든",
      "폭스",
      "머플러"
    ]
  },
  {
    "id": "av_2002",
    "name": "리본 코튼 퍼",
    "slot": "showHead",
    "category": "머리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "2회차",
      "리본",
      "코튼"
    ]
  },
  {
    "id": "av_2003",
    "name": "빅 레드 선글라스",
    "slot": "showFace",
    "category": "머리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "2회차",
      "레드",
      "선글라스"
    ]
  },
  {
    "id": "av_2004",
    "name": "스웨터 머플러",
    "slot": "showFace",
    "category": "머리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "2회차",
      "스웨터",
      "머플러"
    ]
  },
  {
    "id": "av_2005",
    "name": "에버그린 스카프",
    "slot": "showHead",
    "category": "머리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "2회차",
      "에버그린",
      "스카프"
    ]
  },
  {
    "id": "av_2006",
    "name": "미네 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "2회차",
      "미네",
      "배낭"
    ]
  },
  {
    "id": "av_2007",
    "name": "보글보글 밥상",
    "slot": "showArmor",
    "category": "몸",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "2회차",
      "보글보글",
      "밥상"
    ]
  },
  {
    "id": "av_2008",
    "name": "봉인된 어둠",
    "slot": "showArmor",
    "category": "몸",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "2회차",
      "봉인된",
      "어둠"
    ]
  },
  {
    "id": "av_2009",
    "name": "잃어버린 악마 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "2회차",
      "잃어버린",
      "악마",
      "날개"
    ]
  },
  {
    "id": "av_2010",
    "name": "해바라기 비단 외투",
    "slot": "showArmor",
    "category": "몸",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "2회차",
      "해바라기",
      "비단",
      "외투"
    ]
  },
  {
    "id": "av_2011",
    "name": "검은 천사 깃털 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "2회차",
      "검은",
      "천사",
      "깃털",
      "발자국"
    ]
  },
  {
    "id": "av_2012",
    "name": "고양이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "2회차",
      "고양이",
      "발자국"
    ]
  },
  {
    "id": "av_2013",
    "name": "매지컬 클로버 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "2회차",
      "매지컬",
      "클로버",
      "발자국"
    ]
  },
  {
    "id": "av_2014",
    "name": "알록달록 무지개 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "2회차",
      "알록달록",
      "무지개",
      "발자국"
    ]
  },
  {
    "id": "av_2015",
    "name": "푸른 불길 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "2회차",
      "푸른",
      "불길",
      "발자국"
    ]
  },
  {
    "id": "av_2016",
    "name": "배트 라이징",
    "slot": "showEffect",
    "category": "효과",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "2회차",
      "배트",
      "라이징"
    ]
  },
  {
    "id": "av_2017",
    "name": "불꽃놀이",
    "slot": "showEffect",
    "category": "효과",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "2회차",
      "불꽃놀이"
    ]
  },
  {
    "id": "av_2018",
    "name": "사락사락 코스모스",
    "slot": "showEffect",
    "category": "효과",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "2회차",
      "사락사락",
      "코스모스"
    ]
  },
  {
    "id": "av_2019",
    "name": "호기심 많은 고양이",
    "slot": "showEffect",
    "category": "효과",
    "round": "2회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "2회차",
      "호기심",
      "많은",
      "고양이"
    ]
  },
  {
    "id": "av_2020",
    "name": "돌고래 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "3회차",
      "돌고래",
      "모자"
    ]
  },
  {
    "id": "av_2021",
    "name": "리프 젤리삐 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "3회차",
      "리프",
      "젤리삐",
      "모자"
    ]
  },
  {
    "id": "av_2022",
    "name": "머메이드 카추샤",
    "slot": "showHead",
    "category": "투구",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "3회차",
      "머메이드",
      "카추샤"
    ]
  },
  {
    "id": "av_2023",
    "name": "우산 든 젤리삐",
    "slot": "showEffect",
    "category": "투구",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "3회차",
      "우산",
      "젤리삐"
    ]
  },
  {
    "id": "av_2024",
    "name": "토끼귀 밀짚모자",
    "slot": "showHead",
    "category": "투구",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "3회차",
      "토끼귀",
      "밀짚모자"
    ]
  },
  {
    "id": "av_2025",
    "name": "블루 라인 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "3회차",
      "블루",
      "라인",
      "케이프"
    ]
  },
  {
    "id": "av_2026",
    "name": "비명",
    "slot": "showHead",
    "category": "머리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "3회차",
      "비명"
    ]
  },
  {
    "id": "av_2027",
    "name": "사이몬 아이즈",
    "slot": "showHead",
    "category": "머리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "3회차",
      "사이몬",
      "아이즈"
    ]
  },
  {
    "id": "av_2028",
    "name": "새벽",
    "slot": "showHead",
    "category": "머리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "3회차",
      "새벽"
    ]
  },
  {
    "id": "av_2029",
    "name": "의기 양양",
    "slot": "showHead",
    "category": "머리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "3회차",
      "의기",
      "양양"
    ]
  },
  {
    "id": "av_2030",
    "name": "10t 망치",
    "slot": "showArmor",
    "category": "몸",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "3회차",
      "10t",
      "망치"
    ]
  },
  {
    "id": "av_2031",
    "name": "노블 화이트",
    "slot": "showArmor",
    "category": "몸",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "3회차",
      "노블",
      "화이트"
    ]
  },
  {
    "id": "av_2032",
    "name": "쁘띠 인페르노",
    "slot": "showArmor",
    "category": "몸",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "3회차",
      "쁘띠",
      "인페르노"
    ]
  },
  {
    "id": "av_2033",
    "name": "양갱맨",
    "slot": "showArmor",
    "category": "몸",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "3회차",
      "양갱맨"
    ]
  },
  {
    "id": "av_2034",
    "name": "화이트윙",
    "slot": "showBack",
    "category": "몸",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "3회차",
      "화이트윙"
    ]
  },
  {
    "id": "av_2035",
    "name": "16톤 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "3회차",
      "16톤",
      "발자국"
    ]
  },
  {
    "id": "av_2036",
    "name": "그림자 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "3회차",
      "그림자",
      "발자국"
    ]
  },
  {
    "id": "av_2037",
    "name": "댄싱머신 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "3회차",
      "댄싱머신",
      "발자국"
    ]
  },
  {
    "id": "av_2038",
    "name": "뚜뚜또또 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "3회차",
      "뚜뚜또또",
      "발자국"
    ]
  },
  {
    "id": "av_2039",
    "name": "원령 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "3회차",
      "원령",
      "발자국"
    ]
  },
  {
    "id": "av_2040",
    "name": "꼬마 천사",
    "slot": "showEffect",
    "category": "효과",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "3회차",
      "꼬마",
      "천사"
    ]
  },
  {
    "id": "av_2041",
    "name": "데굴데굴 고양이",
    "slot": "showEffect",
    "category": "효과",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "3회차",
      "데굴데굴",
      "고양이"
    ]
  },
  {
    "id": "av_2042",
    "name": "망둥뚜풍선",
    "slot": "showEffect",
    "category": "효과",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "3회차",
      "망둥뚜풍선"
    ]
  },
  {
    "id": "av_2043",
    "name": "아리아리 병아리",
    "slot": "showEffect",
    "category": "효과",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "3회차",
      "아리아리",
      "병아리"
    ]
  },
  {
    "id": "av_2044",
    "name": "흐리고 비",
    "slot": "showEffect",
    "category": "효과",
    "round": "3회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "3회차",
      "흐리고"
    ]
  },
  {
    "id": "av_2045",
    "name": "고양이 인형 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "4회차",
      "고양이",
      "인형",
      "모자"
    ]
  },
  {
    "id": "av_2046",
    "name": "다크나이트 헬름",
    "slot": "showHead",
    "category": "투구",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "4회차",
      "다크나이트",
      "헬름"
    ]
  },
  {
    "id": "av_2047",
    "name": "단죄의 왕관",
    "slot": "showHead",
    "category": "투구",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "4회차",
      "단죄의",
      "왕관"
    ]
  },
  {
    "id": "av_2048",
    "name": "선녀 머리띠",
    "slot": "showHead",
    "category": "투구",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "4회차",
      "선녀",
      "머리띠"
    ]
  },
  {
    "id": "av_2049",
    "name": "스프라이트 모자",
    "slot": "showHead",
    "category": "투구",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "4회차",
      "스프라이트",
      "모자"
    ]
  },
  {
    "id": "av_2050",
    "name": "안대",
    "slot": "showFace",
    "category": "머리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "4회차",
      "안대"
    ]
  },
  {
    "id": "av_2051",
    "name": "이슬 백합",
    "slot": "showHead",
    "category": "머리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "4회차",
      "이슬",
      "백합"
    ]
  },
  {
    "id": "av_2052",
    "name": "팬텀 마스크",
    "slot": "showFace",
    "category": "머리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "4회차",
      "팬텀",
      "마스크"
    ]
  },
  {
    "id": "av_2053",
    "name": "흑십자 귀걸이",
    "slot": "showFace",
    "category": "머리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "4회차",
      "흑십자",
      "귀걸이"
    ]
  },
  {
    "id": "av_2054",
    "name": "흑장미",
    "slot": "showHead",
    "category": "머리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "4회차",
      "흑장미"
    ]
  },
  {
    "id": "av_2055",
    "name": "고양이 인형 배낭",
    "slot": "showBack",
    "category": "몸",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "4회차",
      "고양이",
      "인형",
      "배낭"
    ]
  },
  {
    "id": "av_2056",
    "name": "다크나이트 망토",
    "slot": "showBack",
    "category": "몸",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "4회차",
      "다크나이트",
      "망토"
    ]
  },
  {
    "id": "av_2057",
    "name": "미니 화이트 윙",
    "slot": "showBack",
    "category": "몸",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "4회차",
      "미니",
      "화이트"
    ]
  },
  {
    "id": "av_2058",
    "name": "샤르르빌 - 1766",
    "slot": "showArmor",
    "category": "몸",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "4회차",
      "샤르르빌",
      "1766"
    ]
  },
  {
    "id": "av_2059",
    "name": "은빛 구미",
    "slot": "showArmor",
    "category": "몸",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "4회차",
      "은빛",
      "구미"
    ]
  },
  {
    "id": "av_2060",
    "name": "다이아몬드 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "4회차",
      "다이아몬드",
      "발자국"
    ]
  },
  {
    "id": "av_2061",
    "name": "물 파장 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "4회차",
      "파장",
      "발자국"
    ]
  },
  {
    "id": "av_2062",
    "name": "버섯 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "4회차",
      "버섯",
      "발자국"
    ]
  },
  {
    "id": "av_2063",
    "name": "포르기네이 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "4회차",
      "포르기네이",
      "발자국"
    ]
  },
  {
    "id": "av_2064",
    "name": "핑크 페인트 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "4회차",
      "핑크",
      "페인트",
      "발자국"
    ]
  },
  {
    "id": "av_2065",
    "name": "꼬마 악마",
    "slot": "showEffect",
    "category": "효과",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "4회차",
      "꼬마",
      "악마"
    ]
  },
  {
    "id": "av_2066",
    "name": "방방 젤리삐",
    "slot": "showEffect",
    "category": "효과",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "4회차",
      "방방",
      "젤리삐"
    ]
  },
  {
    "id": "av_2067",
    "name": "산뜻한 꽃내음",
    "slot": "showEffect",
    "category": "효과",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "4회차",
      "산뜻한",
      "꽃내음"
    ]
  },
  {
    "id": "av_2068",
    "name": "우아한 티타임",
    "slot": "showEffect",
    "category": "효과",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "4회차",
      "우아한",
      "티타임"
    ]
  },
  {
    "id": "av_2069",
    "name": "전율",
    "slot": "showEffect",
    "category": "효과",
    "round": "4회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "4회차",
      "전율"
    ]
  },
  {
    "id": "av_2070",
    "name": "검정 토끼 귀 장식",
    "slot": "showHead",
    "category": "투구",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "5회차",
      "검정",
      "토끼",
      "장식"
    ]
  },
  {
    "id": "av_2071",
    "name": "리본 밀짚모자",
    "slot": "showHead",
    "category": "투구",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "5회차",
      "리본",
      "밀짚모자"
    ]
  },
  {
    "id": "av_2072",
    "name": "머리 위 책더미",
    "slot": "showHead",
    "category": "투구",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "5회차",
      "머리",
      "책더미"
    ]
  },
  {
    "id": "av_2073",
    "name": "청부",
    "slot": "showHead",
    "category": "투구",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "5회차",
      "청부"
    ]
  },
  {
    "id": "av_2074",
    "name": "회식의 신",
    "slot": "showHead",
    "category": "투구",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "투구",
      "5회차",
      "회식의"
    ]
  },
  {
    "id": "av_2075",
    "name": "고티 스타일 수염",
    "slot": "showFace",
    "category": "머리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "5회차",
      "고티",
      "스타일",
      "수염"
    ]
  },
  {
    "id": "av_2076",
    "name": "달걀 토스트",
    "slot": "showHead",
    "category": "머리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "5회차",
      "달걀",
      "토스트"
    ]
  },
  {
    "id": "av_2077",
    "name": "막시민 안경",
    "slot": "showFace",
    "category": "머리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "5회차",
      "막시민",
      "안경"
    ]
  },
  {
    "id": "av_2078",
    "name": "이글거리는 안광",
    "slot": "showHead",
    "category": "머리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "5회차",
      "이글거리는",
      "안광"
    ]
  },
  {
    "id": "av_2079",
    "name": "포도 머리띠",
    "slot": "showHead",
    "category": "머리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "머리",
      "5회차",
      "포도",
      "머리띠"
    ]
  },
  {
    "id": "av_2080",
    "name": "등 뒤의 카벙클",
    "slot": "showArmor",
    "category": "몸",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "5회차",
      "뒤의",
      "카벙클"
    ]
  },
  {
    "id": "av_2081",
    "name": "엔젤 메신저",
    "slot": "showArmor",
    "category": "몸",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "5회차",
      "엔젤",
      "메신저"
    ]
  },
  {
    "id": "av_2082",
    "name": "요도 무라마사",
    "slot": "showArmor",
    "category": "몸",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "5회차",
      "요도",
      "무라마사"
    ]
  },
  {
    "id": "av_2083",
    "name": "일곱 빛깔 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "5회차",
      "일곱",
      "빛깔",
      "날개"
    ]
  },
  {
    "id": "av_2084",
    "name": "푸른 혁명가",
    "slot": "showArmor",
    "category": "몸",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "몸",
      "5회차",
      "푸른",
      "혁명가"
    ]
  },
  {
    "id": "av_2085",
    "name": "고속 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "5회차",
      "고속",
      "발자국"
    ]
  },
  {
    "id": "av_2086",
    "name": "나뭇잎 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "5회차",
      "나뭇잎",
      "발자국"
    ]
  },
  {
    "id": "av_2087",
    "name": "두더쥐 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "5회차",
      "두더쥐",
      "발자국"
    ]
  },
  {
    "id": "av_2088",
    "name": "뾱뾱 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "5회차",
      "뾱뾱",
      "발자국"
    ]
  },
  {
    "id": "av_2089",
    "name": "환상의 선율 발자국",
    "slot": "showFoot",
    "category": "다리",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "다리",
      "5회차",
      "환상의",
      "선율",
      "발자국"
    ]
  },
  {
    "id": "av_2090",
    "name": "둥실둥실 검은 고양이",
    "slot": "showEffect",
    "category": "효과",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "5회차",
      "둥실둥실",
      "검은",
      "고양이"
    ]
  },
  {
    "id": "av_2091",
    "name": "마법의 램프",
    "slot": "showEffect",
    "category": "효과",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "5회차",
      "마법의",
      "램프"
    ]
  },
  {
    "id": "av_2092",
    "name": "마이 리틀 미네",
    "slot": "showEffect",
    "category": "효과",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "5회차",
      "마이",
      "리틀",
      "미네"
    ]
  },
  {
    "id": "av_2093",
    "name": "무한의 검제",
    "slot": "showEffect",
    "category": "효과",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "5회차",
      "무한의",
      "검제"
    ]
  },
  {
    "id": "av_2094",
    "name": "젤리삐냥",
    "slot": "showEffect",
    "category": "효과",
    "round": "5회차",
    "tab": "01~05회차",
    "isMonthly": false,
    "tags": [
      "효과",
      "5회차",
      "젤리삐냥"
    ]
  },
  {
    "id": "av_2095",
    "name": "별하늘 티아라",
    "slot": "showHead",
    "category": "투구",
    "round": "47일차",
    "tab": "17주년 출석 체크",
    "isMonthly": false,
    "tags": [
      "투구",
      "47일차",
      "별하늘",
      "티아라"
    ]
  },
  {
    "id": "av_2096",
    "name": "별하늘 케이프",
    "slot": "showHead",
    "category": "머리",
    "round": "61일차",
    "tab": "17주년 출석 체크",
    "isMonthly": false,
    "tags": [
      "머리",
      "61일차",
      "별하늘",
      "케이프"
    ]
  },
  {
    "id": "av_2097",
    "name": "별하늘 날개",
    "slot": "showBack",
    "category": "몸",
    "round": "68일차",
    "tab": "17주년 출석 체크",
    "isMonthly": false,
    "tags": [
      "몸",
      "68일차",
      "별하늘",
      "날개"
    ]
  },
  {
    "id": "av_2098",
    "name": "우주 여행",
    "slot": "showEffect",
    "category": "효과",
    "round": "75일차",
    "tab": "17주년 출석 체크",
    "isMonthly": false,
    "tags": [
      "효과",
      "75일차",
      "우주",
      "여행"
    ]
  }
],

  search: function(query, slotKey, roundFilter) {
    var q = (query || "").trim().toLowerCase();
    return this.items.filter(function(it) {
      if (slotKey && it.slot !== slotKey) return false;
      if (roundFilter && it.round !== roundFilter) return false;
      if (!q) return true;
      if (it.name.toLowerCase().indexOf(q) !== -1) return true;
      if (it.category && it.category.indexOf(q) !== -1) return true;
      if (it.round && it.round.indexOf(q) !== -1) return true;
      if (it.tags && it.tags.some(function(t) { return t.toLowerCase().indexOf(q) !== -1; })) return true;
      return false;
    });
  },

  getBySlot: function(slotKey) {
    return this.items.filter(function(it) { return it.slot === slotKey; });
  },

  getById: function(id) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) return this.items[i];
    }
    return null;
  },

  getRounds: function() {
    var seen = {};
    var list = [];
    for (var i = 0; i < this.items.length; i++) {
      var r = this.items[i].round;
      if (r && !seen[r]) {
        seen[r] = true;
        list.push(r);
      }
    }
    return list;
  }
};

if (typeof window !== 'undefined') window.TW_AVATAR_DB = TW_AVATAR_DB;
if (typeof globalThis !== 'undefined') globalThis.TW_AVATAR_DB = TW_AVATAR_DB;
