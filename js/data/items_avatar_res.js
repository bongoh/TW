// ============================================================================
// TalesWeaver Avatar Resources & Detail Database (items_avatar_res.js)
// 실제 인게임 도트 스프라이트, 인벤토리 아이콘, 착용 가능 캐릭터, 상세 설명 매핑
// ============================================================================

var TW_AVATAR_RESOURCES = {
  // 18인 전 캐릭터 인게임 도트 베이스 및 대표 착용 스프라이트 매핑 (100% 투명 도트 완비)
  characterDots: {
    "boris": {
      name: "보리스",
      charKey: "boris",
      dotImg: "assets/avatar/boris_transparent.png",
      defaultItem: "테일즈 야채 (태도)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "lucian": {
      name: "루시안",
      charKey: "lucian",
      dotImg: "assets/avatar/lucian_transparent.png",
      defaultItem: "테일즈 야채 (세검)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "roamini": {
      name: "로아미니",
      charKey: "roamini",
      dotImg: "assets/avatar/roamini_transparent.png",
      defaultItem: "어비스 로브",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "clarice": {
      name: "리체",
      charKey: "clarice",
      dotImg: "assets/avatar/clarice_transparent.png",
      defaultItem: "피네 앙상블",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "tichiel": {
      name: "티치엘",
      charKey: "tichiel",
      dotImg: "assets/avatar/tichiel_transparent.png",
      defaultItem: "테일즈 야채 (스태프)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "mila": {
      name: "밀라",
      charKey: "mila",
      dotImg: "assets/avatar/mila_transparent.png",
      defaultItem: "테일즈 야채 (채찍)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "ispin": {
      name: "이스핀",
      charKey: "ispin",
      dotImg: "assets/avatar/ispin_transparent.png",
      defaultItem: "오를란느 제복",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "maximin": {
      name: "막시민",
      charKey: "maximin",
      dotImg: "assets/avatar/maximin_transparent.png",
      defaultItem: "탐정 코트",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "sivelin": {
      name: "시벨린",
      charKey: "sivelin",
      dotImg: "assets/avatar/sivelin_transparent.png",
      defaultItem: "테일즈 야채 (창)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "nayatrei": {
      name: "나야트레이",
      charKey: "nayatrei",
      dotImg: "assets/avatar/nayatrei_transparent.png",
      defaultItem: "벚꽃비 의복 - 환 (나야)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "josua": {
      name: "조슈아",
      charKey: "josua",
      dotImg: "assets/avatar/josua_transparent.png",
      defaultItem: "공작 정장",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "lanziee": {
      name: "란지에",
      charKey: "lanziee",
      dotImg: "assets/avatar/lanziee_transparent.png",
      defaultItem: "테일즈 야채 (건)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "issac": {
      name: "이자크",
      charKey: "issac",
      dotImg: "assets/avatar/issac_transparent.png",
      defaultItem: "테일즈 야채 (클로)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "anais": {
      name: "아나이스",
      charKey: "anais",
      dotImg: "assets/avatar/anais_transparent.png",
      defaultItem: "테일즈 야채 (핸드벨)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "benya": {
      name: "벤야",
      charKey: "benya",
      dotImg: "assets/avatar/benya_transparent.png",
      defaultItem: "유령의 드레스",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "isolet": {
      name: "이솔렛",
      charKey: "isolet",
      dotImg: "assets/avatar/isolet_transparent.png",
      defaultItem: "달의 섬 제복",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "nocturne": {
      name: "녹턴",
      charKey: "nocturne",
      dotImg: "assets/avatar/nocturne_transparent.png",
      defaultItem: "메카닉 재킷",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "yevgnen": {
      name: "예프넨",
      charKey: "yevgnen",
      dotImg: "assets/avatar/yevgnen_transparent.png",
      defaultItem: "진네만 가문의 갑옷",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    }
  },

  // 의상 및 코디 부위별 실시간 레이어 스프라이트 매핑 엔진
  resolveLayerSprite: function(slotKey, itemName) {
    if (!itemName || itemName.includes("미착용") || itemName.includes("없음")) return null;
    var name = itemName.toLowerCase();

    // 1. Show Armor (아바타 의상 / 의복 / 슈트 / 제복 / 한복 / 수영복)
    if (slotKey === "showArmor") {
      if (name.includes("벚꽃") || name.includes("환") || name.includes("기모노") || name.includes("유카타")) {
        return "assets/avatar/costume_sakura_kimono.png";
      }
      if (name.includes("네냐플") || name.includes("교복") || name.includes("제복") || name.includes("하복") || name.includes("동복")) {
        return "assets/avatar/costume_nenaple_uniform.png";
      }
      if (name.includes("한복") || name.includes("명절") || name.includes("단아한") || name.includes("설빔") || name.includes("추석")) {
        return "assets/avatar/costume_hanbok.png";
      }
      if (name.includes("수영복") || name.includes("마린") || name.includes("비치") || name.includes("바다") || name.includes("여름")) {
        return "assets/avatar/costume_summer_swimsuit.png";
      }
      if (name.includes("정장") || name.includes("턱시도") || name.includes("수트") || name.includes("코트") || name.includes("자켓")) {
        return "assets/avatar/costume_royal_tuxedo.png";
      }
      if (name.includes("로브") || name.includes("어비스") || name.includes("마법") || name.includes("드레스") || name.includes("망토")) {
        return "assets/avatar/costume_abyss_robe.png";
      }
      if (name.includes("산타") || name.includes("크리스마스") || name.includes("겨울") || name.includes("눈꽃")) {
        return "assets/avatar/costume_santa_coat.png";
      }
      // 기본 아바타 의상 확장 레이어
      return "assets/avatar/costume_royal_tuxedo.png";
    }

    // 2. Show Head (투구 / 헤어 장식 / 모자 / 리본 / 동물귀)
    if (slotKey === "showHead") {
      if (name.includes("토끼") || name.includes("바니") || name.includes("래빗")) {
        return "assets/avatar/head_bunny_ears.png";
      }
      if (name.includes("엔젤") || name.includes("천사") || name.includes("링") || name.includes("헤일로")) {
        return "assets/avatar/head_angel_ring.png";
      }
      if (name.includes("왕관") || name.includes("크라운") || name.includes("티아라")) {
        return "assets/avatar/head_mini_crown.png";
      }
      if (name.includes("리본") || name.includes("보우")) {
        return "assets/avatar/head_red_ribbon.png";
      }
      if (name.includes("고양이") || name.includes("냥이") || name.includes("네코") || name.includes("귀")) {
        return "assets/avatar/head_cat_ears.png";
      }
      return "assets/avatar/head_bunny_ears.png";
    }

    // 3. Show Sub Arms (무기 확장 / 손목 확장 / 커프)
    if (slotKey === "showSubArms" || slotKey === "showArms") {
      if (name.includes("커프") || name.includes("손목") || name.includes("팔찌") || name.includes("라이도")) {
        return "assets/avatar/arms_curff.png";
      }
      if (name.includes("야채") || name.includes("채소") || name.includes("옥수수") || name.includes("당근") || name.includes("무")) {
        return "assets/avatar/arms_veggie_weapon.png";
      }
      if (name.includes("은하") || name.includes("금빛") || name.includes("검") || name.includes("도") || name.includes("블레이드")) {
        return "assets/avatar/arms_silver_galaxy.png";
      }
      return "assets/avatar/arms_curff.png";
    }

    // 4. Show Back (날개 확장 / 등 확장)
    if (slotKey === "showBack") {
      if (name.includes("천사") || name.includes("화이트") || name.includes("순백") || name.includes("성스러운") || name.includes("엔젤")) {
        return "assets/avatar/back_angel_wings.png";
      }
      if (name.includes("악마") || name.includes("다크") || name.includes("칼리고") || name.includes("흑") || name.includes("어둠") || name.includes("데빌")) {
        return "assets/avatar/back_demon_wings.png";
      }
      if (name.includes("요정") || name.includes("페어리") || name.includes("나비") || name.includes("실프")) {
        return "assets/avatar/back_fairy_wings.png";
      }
      return "assets/avatar/back_angel_wings.png";
    }

    // 5. Show Face (얼굴 장식 / 안경 / 마스크 / 홍조)
    if (slotKey === "showFace") {
      if (name.includes("안경") || name.includes("글래스") || name.includes("선글라스") || name.includes("렌즈") || name.includes("돋보기")) {
        return "assets/avatar/face_glasses.png";
      }
      if (name.includes("홍조") || name.includes("볼") || name.includes("치크") || name.includes("블러셔")) {
        return "assets/avatar/face_blush.png";
      }
      if (name.includes("마스크") || name.includes("복면") || name.includes("두건")) {
        return "assets/avatar/face_mask.png";
      }
      return "assets/avatar/face_glasses.png";
    }

    return null;
  },

  // 인게임 실제 아이콘 및 상세 스펙 매핑 테이블
  itemDetails: {
    "av_sakura_naya": {
      id: "av_sakura_naya",
      name: "벚꽃비 의복 - 환 (나야)",
      fullName: "벚꽃비 의복 - 환 (나야) - 갑옷 (갑옷 확장)",
      slot: "showArmor",
      category: "갑옷(갑옷 확장)",
      round: "갑옷 확장",
      reqChar: "나야트레이",
      durability: "100/100",
      hardness: 100,
      inscript: "합성 횟수 MAX",
      desc: "벚꽃비 마을 사람들이 즐겨 입는 의복, 환의 술법이 서려 있다.",
      isUntradable: true,
      iconUrl: "assets/avatar/icon_sakura_robe.png",
      dotSprite: "assets/avatar/nayatrei_sakura_dot.png"
    },
    "av_symbolic_curff": {
      id: "av_symbolic_curff",
      name: "라이도 심볼릭 커프",
      fullName: "라이도 심볼릭 커프 (손목 확장)",
      slot: "showSubArms",
      category: "손목",
      round: "월템",
      reqChar: "전체 캐릭터",
      durability: "100/100",
      hardness: 100,
      inscript: "합성 횟수 MAX",
      desc: "라이도의 상징이 깃든 신비로운 심볼릭 커프.",
      isUntradable: true,
      iconUrl: "assets/avatar/icon_curff.png",
      dotSprite: "assets/avatar/arms_curff.png"
    }
  },

  // 아이템명 또는 ID로 상세 리소스 조회 헬퍼
  getItemResource: function(nameOrId) {
    if (!nameOrId) return null;
    if (this.itemDetails[nameOrId]) return this.itemDetails[nameOrId];
    for (var k in this.itemDetails) {
      if (this.itemDetails[k].name === nameOrId || this.itemDetails[k].fullName === nameOrId) {
        return this.itemDetails[k];
      }
    }
    return null;
  }
};
