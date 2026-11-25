// ============================================================================
// TalesWeaver Avatar Resources & Detail Database (items_avatar_res.js)
// 실제 인게임 도트 스프라이트, 인벤토리 아이콘, 착용 가능 캐릭터, 상세 설명 매핑
// ============================================================================

var TW_AVATAR_RESOURCES = {
  // 18인 전 캐릭터 인게임 리소스 매핑 (실물 도트 9인 + 공식 스탠딩 일러스트 9인)
  characterDots: {
    "boris": {
      name: "보리스",
      charKey: "boris",
      hasRealDot: true,
      dotImg: "assets/avatar/boris_transparent.png",
      costumeDot: "assets/avatar/dot_boris.png",
      defaultItem: "테일즈 야채 (태도)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "lucian": {
      name: "루시안",
      charKey: "lucian",
      hasRealDot: true,
      dotImg: "assets/avatar/lucian_transparent.png",
      costumeDot: "assets/avatar/dot_lucian.png",
      defaultItem: "테일즈 야채 (세검)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "tichiel": {
      name: "티치엘",
      charKey: "tichiel",
      hasRealDot: true,
      dotImg: "assets/avatar/tichiel_transparent.png",
      costumeDot: "assets/avatar/dot_tichiel.png",
      defaultItem: "테일즈 야채 (스태프)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "mila": {
      name: "밀라",
      charKey: "mila",
      hasRealDot: true,
      dotImg: "assets/avatar/mila_transparent.png",
      costumeDot: "assets/avatar/dot_mila.png",
      defaultItem: "테일즈 야채 (채찍)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "sivelin": {
      name: "시벨린",
      charKey: "sivelin",
      hasRealDot: true,
      dotImg: "assets/avatar/sivelin_transparent.png",
      costumeDot: "assets/avatar/dot_sivelin.png",
      defaultItem: "테일즈 야채 (창)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "nayatrei": {
      name: "나야트레이",
      charKey: "nayatrei",
      hasRealDot: true,
      dotImg: "assets/avatar/nayatrei_transparent.png",
      costumeDot: "assets/avatar/nayatrei_sakura_dot.png",
      defaultItem: "벚꽃비 의복 - 환 (나야)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "lanziee": {
      name: "란지에",
      charKey: "lanziee",
      hasRealDot: true,
      dotImg: "assets/avatar/lanziee_transparent.png",
      costumeDot: "assets/avatar/dot_lanziee.png",
      defaultItem: "테일즈 야채 (건)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "issac": {
      name: "이자크",
      charKey: "issac",
      hasRealDot: true,
      dotImg: "assets/avatar/issac_transparent.png",
      costumeDot: "assets/avatar/dot_issac.png",
      defaultItem: "테일즈 야채 (클로)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "anais": {
      name: "아나이스",
      charKey: "anais",
      hasRealDot: true,
      dotImg: "assets/avatar/anais_transparent.png",
      costumeDot: "assets/avatar/dot_anais.png",
      defaultItem: "테일즈 야채 (핸드벨)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "roamini": {
      name: "로아미니",
      charKey: "roamini",
      hasRealDot: true,
      dotImg: "assets/avatar/roamini_transparent.png",
      costumeDot: "assets/avatar/roamini_hanbok_dot.png",
      defaultItem: "수려한 한복 (로아미니)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "clarice": {
      name: "리체",
      charKey: "clarice",
      hasRealDot: true,
      dotImg: "assets/avatar/clarice_transparent.png",
      costumeDot: "assets/avatar/costume_sakura_clarice.png",
      defaultItem: "벚꽃비 의복 - 환 (리체)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "ispin": {
      name: "이스핀",
      charKey: "ispin",
      hasRealDot: true,
      dotImg: "assets/avatar/ispin_transparent.png",
      costumeDot: "assets/avatar/costume_sakura_ispin.png",
      defaultItem: "벚꽃비 의복 - 환 (이스핀)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "maximin": {
      name: "막시민",
      charKey: "maximin",
      hasRealDot: true,
      dotImg: "assets/avatar/maximin_transparent.png",
      costumeDot: "assets/avatar/costume_sakura_r1_c0.png",
      defaultItem: "벚꽃비 의복 - 환 (막시민)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "josua": {
      name: "조슈아",
      charKey: "josua",
      hasRealDot: true,
      dotImg: "assets/avatar/josua_transparent.png",
      costumeDot: "assets/avatar/costume_sakura_josua.png",
      defaultItem: "벚꽃비 의복 - 환 (조슈아)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "benya": {
      name: "벤야",
      charKey: "benya",
      hasRealDot: true,
      dotImg: "assets/avatar/benya_transparent.png",
      costumeDot: "assets/avatar/costume_sakura_benya.png",
      defaultItem: "벚꽃비 의복 - 환 (벤야)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "isolet": {
      name: "이솔렛",
      charKey: "isolet",
      hasRealDot: true,
      dotImg: "assets/avatar/isolet_transparent.png",
      costumeDot: "assets/avatar/costume_sakura_isolet.png",
      defaultItem: "벚꽃비 의복 - 환 (이솔렛)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "nocturne": {
      name: "녹턴",
      charKey: "nocturne",
      hasRealDot: true,
      dotImg: "assets/avatar/nocturne_transparent.png",
      costumeDot: "assets/avatar/costume_sakura_nocturne.png",
      defaultItem: "수려한 한복 (녹턴)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    },
    "yevgnen": {
      name: "예프넨",
      charKey: "yevgnen",
      hasRealDot: true,
      dotImg: "assets/avatar/yevgnen_transparent.png",
      costumeDot: "assets/avatar/costume_sakura_yevgnen.png",
      defaultItem: "벚꽃비 의복 - 환 (예프넨)",
      rotationAngles: ["정면 (Isometric Front)", "우측면 (Right)", "배면 (Back)", "좌측면 (Left)"]
    }
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
    "av_hanbok_roamini": {
      id: "av_hanbok_roamini",
      name: "수려한 한복 (로아미니)",
      fullName: "수려한 한복 (로아미니) - 갑옷 (갑옷 확장)",
      slot: "showArmor",
      category: "갑옷(갑옷 확장)",
      round: "갑옷 확장",
      reqChar: "로아미니",
      durability: "100/100",
      hardness: 100,
      inscript: "합성 횟수 MAX",
      desc: "단아하고 화사한 전통의 미가 깃든 로아미니 전용 한복.",
      isUntradable: true,
      iconUrl: "assets/avatar/icon_sakura_robe.png",
      dotSprite: "assets/avatar/roamini_hanbok_dot.png"
    },
    "av_veggie_sivelin": {
      id: "av_veggie_sivelin",
      name: "테일즈 야채 (창)",
      fullName: "테일즈 야채 (창) - 옥수수창 무기 확장",
      slot: "showSubArms",
      category: "무기",
      round: "무기 확장",
      reqChar: "시벨린",
      durability: "100/100",
      hardness: 100,
      inscript: "합성 횟수 MAX",
      desc: "신선하고 달콤한 옥수수가 달린 시벨린 전용 무기 확장.",
      isUntradable: true,
      iconUrl: "assets/avatar/icon_curff.png",
      dotSprite: "assets/avatar/dot_sivelin.png"
    },
    "av_veggie_boris": {
      id: "av_veggie_boris",
      name: "테일즈 야채 (태도)",
      fullName: "테일즈 야채 (태도) - 무 태도 무기 확장",
      slot: "showSubArms",
      category: "무기",
      round: "무기 확장",
      reqChar: "보리스",
      durability: "100/100",
      hardness: 100,
      inscript: "합성 횟수 MAX",
      desc: "잘 여문 싱싱한 무가 장착된 보리스 전용 무기 확장.",
      isUntradable: true,
      iconUrl: "assets/avatar/icon_curff.png",
      dotSprite: "assets/avatar/dot_boris.png"
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
      dotSprite: null
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
