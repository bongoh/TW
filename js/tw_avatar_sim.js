// UI of the web avatar simulator (mirrors csharp/TwAvatar/AvatarPanel.cs). Needs compose.js (TW).
'use strict';
// TWAvatarSim.mount(host, opts) draws the simulator into host's shadow root, so its styles and element ids never meet
// the page around it: TalesDB shows it inside its own page (no iframe), web/index.html shows it alone.
//   opts.css   the stylesheet (css/app.css with its ?v=)       opts.data  where the exported data lives (default: data/)
//   opts.tdb   TalesDB's avatar list icon base                 opts.art   TalesDB's character art base
//   opts.embed true inside TalesDB: no page background / padding of its own, TalesDB's font
(() => {
  let root = null;
  const $ = id => root.getElementById(id);
  // 배경('배경' 칸): avatar-sim/bg/ 의 그림 (list.json 의 순서). 게임 맵을 캐릭터 크기에 맞춰 잘라낸 것이라 캐릭터 뒤에 꽉 채워 깐다.
  // 주소는 이 파일(js/app.js)이 있는 곳 기준 (사이트 /avatar-sim/ · 따로 띄운 페이지 모두)
  const BG_BASE = new URL('../bg/', (document.currentScript && document.currentScript.src) || location.href).href;
  const BG_KEY = /^[a-z0-9-]{1,40}$/;
  const bgUrl = key => BG_BASE + key + '.jpg';              // 게임 실제 크기 (무대 · 게시판 그림)
  const bgCardUrl = key => BG_BASE + key + '-card.jpg';     // 액자(3:4)에 맞춘 작은 그림 (목록 카드 · [배경] 단추 · 대미지 카드)
  let bgList = [], bgSize = [800, 960];
  const bgImgs = {};
  // 배경이 깔려 있으면 무대를 끌 때 캐릭터만 배경 위에서 움직인다 (배경은 그대로). 그림을 찍을 때는 캐릭터를 가운데에 두고
  // 배경을 bgAt 만큼 반대로 옮겨 같은 장면을 만든다 (compose.js render 의 underOff)
  const bgOn = () => !!st.bg && st.mode !== 'tf';
  const bgOff = () => bgOn() ? [-st.bgAt[0], -st.bgAt[1]] : null;
  const bgClamp = ([x, y]) => { const mx = Math.max(0, bgSize[0] / 2 - 40), my = Math.max(0, bgSize[1] / 2 - 60);
    return [Math.round(Math.max(-mx, Math.min(mx, x))), Math.round(Math.max(-my, Math.min(my, y)))]; };
  fetch(BG_BASE + 'list.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : null).then(j => {
    bgList = (j && Array.isArray(j.list) ? j.list : []).filter(e => e && BG_KEY.test(e.key));
    if (j && Array.isArray(j.size) && j.size.length === 2) bgSize = j.size.map(Number);
    if (root) bgButton();
    if (st.char && st.cat === 'bg') fillGrid();
  }).catch(() => {});
  // 배경 그림 한 장: 다 받았으면 그림, 아직이면 null (받으면 무대를 다시 그린다)
  function bgImage(key) {
    if (!key || !BG_KEY.test(key)) return null;
    let im = bgImgs[key];
    if (!im) { im = bgImgs[key] = new Image(); im.onload = () => { if (st.bg === key && st.char) drawNow(); }; im.src = bgUrl(key); }
    return im.complete && im.naturalWidth ? im : null;
  }
  // 찍을 때(코디 게시판 그림)는 다 받을 때까지 기다린다. 못 받으면 배경 없이
  function bgLoaded(key) {
    if (!key || !BG_KEY.test(key)) return Promise.resolve(null);
    const ready = bgImage(key); if (ready) return Promise.resolve(ready);
    const im = bgImgs[key];
    return new Promise(res => { im.addEventListener('load', () => res(im.naturalWidth ? im : null), { once: true }); im.addEventListener('error', () => res(null), { once: true }); });
  }
  // 카테고리 줄 오른쪽의 [배경] 단추: 입힌 배경(없으면 로슈의 만물상)을 작은 그림으로
  const BG_ICON = 'roshu-store';
  function bgButton() {
    const b = root && root.getElementById('btnBg'); if (!b) return;
    const key = st.bg || (bgList.some(e => e.key === BG_ICON) ? BG_ICON : (bgList[0] && bgList[0].key)) || '';
    const ic = b.querySelector('.bgic'); if (ic) ic.style.backgroundImage = key ? `url('${bgCardUrl(key)}')` : '';
    b.classList.toggle('on', st.cat === 'bg');
    b.classList.toggle('worn', !!st.bg);
    b.title = st.bg ? `배경: ${(bgList.find(e => e.key === st.bg) || {}).name || st.bg}` : '캐릭터 뒤에 까는 배경 (게임 맵의 한 부분)';
  }
  const MARKUP = `
<div id="pick" class="pick-modal hidden">   <!-- character picker: a small window over the simulator -->
  <div class="pick-box">
    <div class="pick-head"><h1>캐릭터 선택</h1><button id="pickClose" class="pick-close" title="닫기">×</button></div>
    <div id="pickGrid" class="pick-grid"></div>
    <div id="pickStatus" class="status"></div>
  </div>
</div>
<div id="my" class="pick-modal hidden">   <!-- 내 코디: 이 브라우저에 저장한 코디 · .twcody 파일 · 코드 -->
  <div class="pick-box my-box">
    <div class="pick-head"><h1>내 코디</h1><button id="myClose" class="pick-close" title="닫기">×</button></div>
    <div class="my-row"><input id="myName" type="text" maxlength="40" placeholder="코디 이름 (비우면 캐릭터 이름)" autocomplete="off"><button class="btn primary" data-my="save" type="button">지금 코디 저장</button></div>
    <div id="myList" class="my-list"></div>
    <div class="my-row my-io"><button class="btn" data-my="file" type="button">파일 불러오기</button><button class="btn" data-my="paste" type="button">코드 붙여 넣기</button></div>
    <div id="myPaste" class="my-row hidden"><textarea id="myCode" rows="3" placeholder="TW-로 시작하는 짧은 코드나 TWPK1.cody. 로 시작하는 긴 코드를 붙여 넣으세요"></textarea><button class="btn" data-my="pasteGo" type="button">불러오기</button></div>
    <p class="muted my-note">브라우저 캐시에 저장됩니다. 캐시를 지우면 모든 내용이 삭제되니 유의하시기 바랍니다.</p>
    <div id="myStatus" class="status"></div>
  </div>
</div>
<div id="own" class="pick-modal hidden">   <!-- 보유 아바타: 가진 아바타를 체크해 두면 랜덤이 그 안에서만 고른다 (이 브라우저에 저장 · 코드 · .twown 파일) -->
  <div class="pick-box own-box">
    <div class="pick-head"><h1>보유 아바타</h1><button id="ownClose" class="pick-close" title="닫기">×</button></div>
    <div class="own-top"><label class="filt-chk own-rand" title="켜 두면 🎲 랜덤이 여기서 체크한 아바타 안에서만 고릅니다"><input id="ownRand" type="checkbox"><span>랜덤을 보유한 아바타로만 돌리기</span></label><span id="ownTotal" class="muted"></span></div>
    <div class="filt own-filt">
      <div class="filt-row"><span class="filt-lbl">부위</span><div id="ownSlots" class="filt-opts"></div></div>
      <div class="filt-row"><span class="filt-lbl">획득처</span><div id="ownGroups" class="filt-opts"></div></div>
      <div class="filt-row"><span class="filt-lbl">찾기</span><div class="filt-opts"><input id="ownQ" type="search" placeholder="아바타 이름 · 상자 이름 검색" autocomplete="off">
        <label class="filt-chk"><input id="ownOnly" type="checkbox"><span>보유만 보기</span></label>
        <span class="filt-end"><span id="ownCount" class="filt-count"></span><button type="button" class="filt-reset" data-own="all">보이는 것 모두 체크</button><button type="button" class="filt-reset" data-own="none">보이는 것 모두 해제</button></span></div></div>
    </div>
    <div id="ownList" class="own-list"></div>
    <div class="my-row my-io own-io"><button class="btn" data-own="code" type="button">코드 복사</button><button class="btn" data-own="paste" type="button">코드 붙여 넣기</button><button class="btn" data-own="export" type="button">파일 저장</button><button class="btn" data-own="file" type="button">파일 불러오기</button><button class="btn own-clear" data-own="clear" type="button">전부 지우기</button></div>
    <div id="ownPaste" class="my-row hidden"><textarea id="ownCode" rows="3" placeholder="TW-로 시작하는 짧은 코드나 TWPK1.own. 로 시작하는 긴 코드를 붙여 넣으세요"></textarea><span class="own-paste-acts"><button class="btn primary" data-own="pasteGo" type="button" title="지금 목록을 지우고 코드의 목록으로 바꿉니다">바꾸기</button><button class="btn" data-own="pasteAdd" type="button" title="지금 목록에 코드의 목록을 더합니다">합치기</button></span></div>
    <p class="muted my-note">브라우저 캐시에 저장됩니다. 캐시를 지우면 모든 내용이 삭제되니 코드나 파일로 따로 보관해 두세요. 무기 · 보조는 캐릭터마다 저장됩니다.</p>
    <div id="ownStatus" class="status"></div>
  </div>
</div>
<div id="sim" class="screen hidden">
  <div class="left">
    <div class="who">
      <div id="whoCard" class="who-card" title="클릭 = 캐릭터 바꾸기"><img id="whoArt" alt=""><div id="whoTf" class="hidden"></div><div id="whoName" class="nm"></div></div>
      <div class="who-right">
        <div id="cats" class="group"></div>
        <div class="btn-row" style="margin:0">
          <span id="kinds" class="group"></span>
          <input id="search" type="search" placeholder="이름 검색" autocomplete="off">
          <span id="countLabel" class="muted"></span>
        </div>
      </div>
      <!-- 카테고리 줄 오른쪽 빈자리. 사이트가 mount 할 때 준 단추(코디 게시판 업로드)와 그 아래 [New] · [Hidden] 이 선다 -->
      <div id="shareBox" class="share-box"><button id="btnBg" class="btn bg-open" type="button"><span class="bgic"></span>배경</button><button id="btnOwn" class="btn bg-open own-open" type="button" title="가진 아바타를 체크해 두고, 랜덤을 그 안에서만 돌립니다"><span class="ownic">✔</span>보유 아바타</button><button id="btnMy" class="btn my-open" type="button" title="이 브라우저에 코디를 저장하고 불러옵니다. 파일·코드로 주고받을 수도 있습니다">내 코디</button></div>
    </div>
    <!-- 조건 판: 획득처(테일즈DB 아바타 시트를 아이템 번호로 맞춘다) · 정렬 · NEW만 (filtRender) -->
    <div id="filt" class="filt hidden"></div>
    <div id="parts" class="group parts hidden"></div>   <!-- weapon types of 확장 무기 / 일반 무기: outside the list, so it never scrolls -->
    <div id="grid" class="grid"><div class="grid-wait" role="status"><span class="spin"></span><span>아이템 목록을 불러오는 중…</span></div></div>
    <div id="pager" class="pager hidden"></div>   <!-- 목록 쪽 넘김 (세 줄씩, appendCards) -->
  </div>
  <div class="right panel">
    <div class="stage">
      <canvas id="view" width="516" height="600"></canvas>
      <div class="ov ov-left"><span class="ov-title">동작</span><div id="motions" class="ov-col"></div><span id="cmotionsTitle" class="ov-title hidden" title="로컬에서만: 확장 의상 애니메이션에 들어 있는 동작을 동작표 없이 그대로">의상 동작</span><div id="cmotions" class="ov-col hidden"></div></div>
      <div class="ov ov-right">
        <div id="hairBox" class="ov-col"><span class="ov-title">헤어</span><div id="hairModes" class="ov-col"></div></div>
        <span class="ov-title">확대</span>
        <div id="zoomCtl" class="ov-zoom"><button class="btn" data-z="-1" title="축소 (마우스 휠)">−</button><button class="btn lbl" data-z="0" title="원래 크기·위치로 (그림 더블클릭과 같음)">2x</button><button class="btn" data-z="1" title="확대 (마우스 휠)">+</button></div>
        <div id="beamBox" class="ov-col hidden"><span class="ov-title">광선</span><button id="weaponFx" class="btn on" title="예프넨 소드셰이프의 광선을 켜고 끕니다">켜짐</button></div>
      </div>
      <div id="cdye" class="ov-dye hidden closed"></div>   <!-- 확장 의상 염색: shown while a dyeable outfit is worn -->
      <div id="face" class="ov-dye face-dye hidden closed"></div>   <!-- 꾸미기: 컬러렌즈 / 립 (facedye.json) -->
      <div id="findc" class="ov-dye find-dye hidden"></div>   <!-- 색상 찾기: 염색 창에서 연다 -->
      <button class="arrow ar-up" data-motion="-1" title="이전 동작">▲</button>
      <!-- dir_order runs 정면 → 정면좌 → 좌 → …: ◀ steps forward (the character turns to the left), ▶ back (to the right) -->
      <button class="arrow ar-left" data-step="1" title="왼쪽으로 한 칸 회전">◀</button>
      <button class="arrow ar-right" data-step="-1" title="오른쪽으로 한 칸 회전">▶</button>
      <button class="arrow ar-down" data-motion="1" title="다음 동작">▼</button>
    </div>
    <!-- 재생 / 정지 · 틱 막대: 효과가 잠깐씩 나오는 아바타는 멈춰서 원하는 순간을 고른다 (코디 게시판 업로드 · 대미지 카드가 그 순간을 찍는다) -->
    <div id="animRow" class="anim-row">
      <button id="btnPlay" class="btn" type="button" title="애니메이션 멈추기 / 다시 재생">⏸ 정지</button>
      <input id="tick" type="range" min="0" max="0" value="0" aria-label="애니메이션 순간 (틱)" title="움직이면 멈추고 그 순간을 보여 줍니다">
      <span id="tickLabel" class="muted"></span>
    </div>
    <div id="slots" class="slots"></div>
    <div class="btn-row hidden" id="playRow">   <!-- zoom / play / tick: kept for scripts, hidden from the page -->
      <span class="lbl">확대</span><span id="zooms" class="group"></span>
    </div>
    <div class="btn-row hidden" id="presetRow">   <!-- presets: hidden from the page, kept for scripts -->
      <span class="lbl">프리셋</span><span id="presets" class="group"></span>
    </div>
    <div class="btn-row hidden" id="exportRow">   <!-- export buttons: hidden from the page, kept for scripts -->
      <button id="btnPng" class="btn">PNG 저장</button>
      <button id="btnSheet" class="btn">8방향 시트</button>
      <button id="btnGif" class="btn">프레임 PNG 묶음</button>
    </div>
    <div id="status" class="status hidden"></div>
    <div id="suggest" class="suggest hidden"></div>   <!-- search suggestions (fixed, placed under the search box) -->
  </div>
</div>`;
  const VIEW = [516, 600];
  // category cards and slot boxes (6 in top row, 5 in bottom row).
  const CAT_ORDER = ['uniform', 'head', 'face', 'body', 'back', 'foot', 'hair', 'costume', 'weapon_av', 'weapon_eq', 'sub'];   // the list buttons
  const SLOT_ORDER = ['head', 'face', 'body', 'back', 'foot', 'hair', 'costume', 'weapon', 'sub'];                  // the worn-item slots
  // list buttons that show part of a slot: 확장 무기 = avatar weapons, 일반 무기 = equipment weapons (the ones tagged [장비])
  const CAT_FILTER = { weapon_av: ['weapon', 'avatar'], weapon_eq: ['weapon', 'equip'] };
  const catSlot = c => (CAT_FILTER[c] || [c])[0], catKind = c => (CAT_FILTER[c] || [])[1];
  const NO_KIND_FILTER = new Set(['uniform', 'weapon_av', 'weapon_eq', 'sub', 'bg']);   // lists that are all one kind: no 전체/아바타/장비 chips, no [장비] tag (bg = 배경)
  const SUB_LABEL = { '이솔렛': '보조 무기', '조슈아': '보조 무기' };                          // 이솔렛's off-hand is a second sword
  const hasSub = () => st.char.items.some(it => it.slot === 'sub');
  const LIST_LS = 'tw_avatar_list';                 // the last answer, used until the fresh one arrives (or if it does not)
  const listKept = loadLS(LIST_LS, { ids: [] });
  let skipIds = new Set(listKept.ids);
  let listKnown = true;
  function listFromKept() {
    listKnown = true;
    if (st.char) listArrived();
  }
  let listReady = Promise.resolve();
  async function loadList() {
    listKnown = true;
    if (st.char) { listArrived(); fillGrid(); }
  }
  function listArrived() {
    if (!st.char || st.mode === 'tf') return;
    let off = false;
    if (!st.full) for (const [k, id] of Object.entries(st.equip)) { const it = st.char.byId[id]; if (it && skipped(it)) { delete st.equip[k]; off = true; } }
    catIcons(); partChips(); fillGrid(); ownRefresh();
    if (off) { markSelected(); refresh(); }
  }
  // the rest of the list lives under its own folder (a name the answer carries, or a full address): next to the data
  // 서버가 지키는 묶음('/api/avatar-bundle/', 출입표 쿠키는 서버가 붙인다) · 예전 CDN 묶음 폴더 이름 · 전체 주소
  const bundleUrl = b => b ? (/^https?:/.test(b) ? b : b.startsWith('/') ? new URL(b, location.origin).href : new URL((b.includes('/') ? '' : 'avatar-sim-p/') + b, new URL('..', new URL(DATA_BASE, location.href))).href).replace(/\/?$/, '/') : '';
  // 로그인(이번 주 코드, 출입표 쿠키)해 있으면 숨긴 아이템까지 연다. 캐릭터를 아직 안 열었으면 열 때 moreItems 가 합친다.
  // 검색칸에 코드를 넣어 여는 길은 2026-11-02 에 없앴다 (사이트 위 메뉴의 로그인 하나로)
  async function openFull(bundle) {
    st.more = bundleUrl(bundle);
    st.full = true;
    if (!st.char) return;
    await moreItems(); catIcons(); listBtns(); partChips(); fillGrid();
  }
  // 사이트에서 로그인하면 (app.js accountUnlockAll) 목록을 다시 받아 연다
  window.addEventListener('tw-login', () => { if (!st.full) loadList(); });
  // 로그인이 끝나면 (app.js accountLockAll): 숨긴 아이템을 다시 감춘다. 묶음에서 합친 아이템은 skipIds 에 들어 있어서
  // st.full 만 끄면 목록에서 빠지고, 입고 있던 것은 listArrived 가 벗긴다
  window.addEventListener('tw-logout', () => {
    if (!st.full) return;
    st.full = false;
    st.more = '';
    if (st.char) { listArrived(); listBtns(); }
  });
  // the items of that folder for the open character are added to the list (and count as skipped: not for the gallery)
  async function moreItems() {
    return;
  }
  const skipped = it => skipIds.has(it.id);
  const shown = it => st.full || (listKnown && !skipped(it));
  // search: spaces and list marks (♣ ★ ...) do not count, so '다크아우라' finds '♣ 다크 아우라'; a query of initial consonants
  // only (ㄷㅋㅇㅇㄹ) is matched against the names' initials. q is already lower-cased (st.q)
  const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const squash = t => t.toLowerCase().replace(/[\s\u2000-\u2bff\u3000-\u303f()[\]\-_·.,]/g, '');
  const initials = t => [...t].map(ch => { const c = ch.charCodeAt(0) - 0xac00; return c >= 0 && c < 11172 ? CHO[Math.floor(c / 588)] : ch; }).join('');
  const nameCache = new Map();
  function nameKeys(name) { let k = nameCache.get(name); if (!k) { const sq = squash(name); k = [sq, initials(sq)]; nameCache.set(name, k); } return k; }
  function nameMatch(name, q) {
    if (!q) return true; const qq = squash(q); if (!qq) return true;
    const [sq, ini] = nameKeys(name);
    return sq.includes(qq) || (/^[ㄱ-ㅎ]+$/.test(qq) && ini.includes(qq));
  }
  // lists split by weapon type (index part_names: 세검 장검 ...): a row of type buttons above the list when there are two or more
  // (보조: 이솔렛 물리검 / 마법검, 조슈아 수정구 / 스펠북)
  const PART_CATS = new Set(['weapon_av', 'weapon_eq', 'sub']);
  // 확장 무기 order: by series, as asked (names differ by character - 슈팅스타(검) / 테일즈 슈팅스타(소드셰이프) - and the
  // collaborations are told apart by their item number ranges); the rest after them in their own order
  const AV_WEAPON_SERIES = [/^별빛/, /^코스믹/, /^드래고닉 레거시/, /탄생석/, /슈팅스타/, /쿠루쿠루/, /뮤직/, /야채/, /키친/, /^아발론/,
    /^프리즘 플라워/, /^금빛 은하/, /보노보노/,
    [1045754, 1045762],                                    // 로그 호라이즌 (신도 코가라스마루, 선혈의 마인 도끼, 요변천목도 ...)
    [1046284, 1046318],                                    // 슬레이어즈 (빛의 검, 붉은 눈의 마왕, 제로스의 지팡이, 영왕결마탄)
    /^하트리본/,
    [1047348, 1047362],                                    // 던전밥 (검돌이, 파린의 메이스, 암브로시아, 미믹의 발톱 ...)
    [1047823, 1047852],                                    // 베스페리아 (브레이브 베스페리아, 에스텔 로드, 칼로리안 해머, 금성 2호 ...)
    /^엔젤릭/];
  const avSeries = it => { const k = AV_WEAPON_SERIES.findIndex(s => Array.isArray(s) ? it.id >= s[0] && it.id <= s[1] : s.test(it.name)); return k < 0 ? AV_WEAPON_SERIES.length : k; };
  const avOrder = list => list.map((it, i) => [avSeries(it), i, it]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x[2]);
  const st = { ci: -1, char: null, hair: -1, hairHidden: false, hairMode: 'all', equip: {}, hidden: new Set(), dye: 0, dyeBy: {}, cdye: {},   // dye: of the worn hair; dyeBy: last dye per style (card previews)
               motion: 0, dir: 10, tick: 0, maxT: 0, zoom: 2, pan: [0, 0], cat: 'head', kind: 'all', q: '', shown: 0, list: [],
               playing: true, loading: 0, timer: null, lastPose: null, mode: 'char', tf: 0,     // mode 'tf' = transform cloak screen
               full: false,                                                                      // the whole list is shown
               part: 'all',                                                                      // weapon type shown (PART_CATS lists)
               bdye: {},                                                                         // 기본 의상 염색: {part index: preset index or 'rrggbb'}
               eye: 0, eyeDye: -1, lip: false, lipDye: -1,                                       // 꾸미기: 컬러렌즈 style 1-6 (0 = none) / 립 + dye (-1 = 기본색)
               bg: '',                                                                           // 배경 (bg/list.json 의 key, '' = 없음)
               bgAt: [0, 0] };                                                                   // 배경 위 캐릭터 자리: 배경 한가운데에서 캐릭터 가운데까지 (게임 픽셀)
  const settings = loadLS('tw_avatar_settings', { hatHairModes: {}, presets: {}, lastChar: null, weaponFx: true });
  // 입은 칸의 체크를 끈 칸 (2026-11-19 사용자: 랜덤은 체크된 칸만). 입은 것이 있으면 체크 = 그리기(st.hidden · st.hairHidden)이고, 빈 칸은 이 목록으로
  // 체크를 기억한다 (예: 무기 칸을 비우고 체크를 꺼 두면 랜덤이 무기를 주지 않는다). 이 브라우저에 기억한다
  const randOff = new Set(Array.isArray(settings.randOff) ? settings.randOff : []);
  const randOffSet = (key, off) => { if (off === randOff.has(key)) return; if (off) randOff.add(key); else randOff.delete(key); settings.randOff = [...randOff]; saveLS(); };
  function loadLS(k, def) { try { return Object.assign(def, JSON.parse(localStorage.getItem(k) || '{}')); } catch (e) { return def; } }
  function saveLS() { try { localStorage.setItem('tw_avatar_settings', JSON.stringify(settings)); } catch (e) { } }
  const status = s => { $('status').textContent = s; };

  // ---------------------------------------------------------------- start: character picker
  // TalesDB's own list icons for the avatar parts (tdbicons.json: item id -> path on TalesDB's CDN)
  const TDB_SLOTS = new Set(['head', 'face', 'body', 'back', 'foot']);
  let TDB = { base: '', icons: {} };
  const tdbUrl = (slot, id) => TDB_SLOTS.has(slot) && TDB.icons[id] ? TDB.base + encodeURIComponent(TDB.icons[id].split('/').pop()) : null;
  const tdbImg = url => `<img class="tdb" src="${url}" alt="" loading="lazy" decoding="async" draggable="false">`;
  // the icon from the local webp files (assets/avatar/icons/) or shared sheets
  const tdbIcon = (slot, id) => {
    if (!TDB_SLOTS.has(slot)) return null;
    const url = tdbUrl(slot, id);
    if (url) return { url };
    const cell = TW.tdbCell(id);
    if (cell) return { cell };
    return null;
  };
  const tdbHtml = t => t.cell ? `<span class="tdb" style="background-image:url('${t.cell.url}');background-position:${-t.cell.x}px ${-t.cell.y}px"></span>` : tdbImg(t.url);

  // where the exported data lives (opts.data): 'data/' next to this page, or the CDN; images from another origin are
  // loaded with CORS. Inside TalesDB, its own CDN gives the avatar list icons (opts.tdb) and the character art
  // (opts.art) - the same files its other pages use, so the browser already has them.
  let DATA_BASE = 'data/', TDB_BASE = '', ART_BASE = '', cssReady = Promise.resolve();
  const CHAR_ART_MAP = {
    '루시안': 'lucian', '보리스': 'boris', '막시민': 'maximin', '시벨린': 'sivelin',
    '조슈아': 'josua', '란지에': 'lanziee', '이자크': 'issac', '밀라': 'mila',
    '티치엘': 'tichiel', '이스핀': 'ispin', '나야트레이': 'nayatrei', '아나이스': 'anais',
    '클로에': 'chloe', '벤야': 'benya', '이솔렛': 'isolet', '로아미니': 'roamini',
    '녹턴': 'nocturne', '리체': 'clarice', '예프넨': 'yevgnen'
  };
  const artUrl = name => (ART_BASE || DATA_BASE + 'art/') + (CHAR_ART_MAP[name] || encodeURIComponent(name)) + '.png';

  async function main() {
    // everything the first screen needs is asked for at once: the data files, TalesDB's icon list and the last
    // character (TW.load and TW.loadChar run side by side; a character's file needs nothing from index.json)
    const q = new URLSearchParams(location.search), tf = q.has('tf'), first = q.has('char') ? +q.get('char') : (settings.lastChar ?? 0);
    TW.setBase(DATA_BASE);
    const charP = TW.loadChar(tf ? 0 : first).catch(() => null);   // a wrong ?char= fails again (and reports) in selectChar
    listReady = loadList();                                          // which items stay out of the lists
    const idx = await TW.load(DATA_BASE);
    listFromKept();
    // the TalesDB icon list comes in boot.json; an older export has it on its own
    TDB = TW.S.tdb || (await TW.getJSON(DATA_BASE + 'tdbicons.json').catch(() => null)) || TDB;   // none: the exported sheets are used
    if (TDB_BASE) TDB.base = TDB_BASE;                     // TalesDB passes its current avatar image address
    await charP;                                           // not listReady: see loadList
    const g = $('pickGrid'); g.innerHTML = '';
    for (const c of idx.chars) {
      // the art loads when the picker first opens (19 pictures the first screen does not show)
      const d = document.createElement('div'); d.className = 'pick-card';
      d.innerHTML = `<img data-src="${artUrl(c.art)}" alt=""><div class="nm">${c.name}</div>`; d.title = c.full;
      d.onclick = () => selectChar(c.idx);
      g.appendChild(d);
    }
    const t = document.createElement('div'); t.className = 'pick-card pick-tf';
    t.innerHTML = `<div class="tf-art"></div><div class="nm">변신 망토</div>`; t.title = '모든 캐릭터 공통';
    t.onclick = selectTransforms; g.appendChild(t);
    // the card picture is its own small file (icons/t/card.webp): the cloak sheet (1 MB) loads only on the cloak screen
    { const im = new Image(); im.alt = ''; im.onerror = () => im.remove(); im.src = DATA_BASE + 'icons/t/card' + (idx.img_ext || '.png') + '?v=' + (idx.stamp || 0); t.querySelector('.tf-art').appendChild(im); }
    buildStatic(idx);
    // the picker is a small window over the simulator: close it with ×, Esc or a click outside it
    $('pickClose').onclick = hidePicker;
    $('pick').onclick = e => { if (e.target === $('pick')) hidePicker(); };
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hidePicker(); });
    await cssReady;                                        // see mount(): the list needs its size first
    // 동작·방향만 바꾸면 refresh 를 안 거치니, 탭이 내려갈(새로고침·이동) 때도 한 번 더 적어 둔다
    addEventListener('pagehide', saveSession);
    const keep = !tf && !q.has('char') ? sessionLook() : null;
    if (tf) selectTransforms();
    else if (!(keep && await setLook(keep))) selectChar(first);   // 이 탭에서 입던 모습, 없으면 마지막 캐릭터
  }
  function buildStatic(idx) {
    group($('zooms'), [[1, '1x'], [2, '2x']], v => { st.zoom = v; applyZoom(); }, () => st.zoom);
    buildHairToggles();
    if ($('weaponFx')) $('weaponFx').onclick = () => { settings.weaponFx = settings.weaponFx === false; saveLS(); syncWeaponFx(); refresh(); };
    syncWeaponFx();
    st.zoom = ZOOMS.includes(settings.zoom) ? settings.zoom : ZOOM_DEFAULT; wireStageZoom();
    group($('presets'), [['1', '1'], ['2', '2'], ['3', '3']], v => preset(v, false), () => null, v => preset(v, true));
    root.querySelectorAll('.arrow').forEach(b => b.onclick = () => { if (b.dataset.motion) stepMotion(+b.dataset.motion); else stepDir(+b.dataset.step); });
    $('whoCard').onclick = showPicker;
    $('pager').onclick = e => { const b = e.target.closest('button[data-p]'); if (!b || b.disabled) return; gridPage = +b.dataset.p; appendCards(); };
    // 창 폭이 바뀌어 한 줄 칸 수가 달라지면 보던 첫 아이템이 든 쪽으로 다시 그린다
    if (window.ResizeObserver) new ResizeObserver(() => {
      const n = pageSize(); if (!gridSize || n === gridSize || !st.list.length) return;
      gridPage = Math.floor(gridPage * gridSize / n); appendCards();
    }).observe($('grid'));
    $('search').oninput = () => { st.q = $('search').value.trim().toLowerCase(); fillGrid(); suggest(); };
    $('search').onkeydown = suggestKey;
    $('search').onfocus = () => suggest();
    $('search').onblur = () => setTimeout(closeSuggest, 150);   // a click on a suggestion lands first
    $('btnPlay').onclick = togglePlay;
    $('tick').oninput = () => { stopPlay(); st.tick = +$('tick').value; drawNow(); };   // 막대를 움직이면 멈춘다
    $('btnPng').onclick = savePng; $('btnSheet').onclick = saveSheet; $('btnGif').onclick = saveFrames;
    group($('kinds'), [['all', '전체'], ['avatar', '아바타'], ['equip', '장비']], v => { st.kind = v; fillGrid(); }, () => st.kind);
    wireFilt();
    wireMy();
    wireOwn();
  }
  // hair: two independent toggles (front / back) -> hairMode all | front | back | none
  const hairOn = () => ({ front: st.hairMode === 'all' || st.hairMode === 'front', back: st.hairMode === 'all' || st.hairMode === 'back' });
  function buildHairToggles() {
    const el = $('hairModes'); el.innerHTML = '';
    for (const [k, label] of [['front', '앞머리'], ['back', '뒷머리']]) {
      const b = document.createElement('button'); b.className = 'btn'; b.textContent = label; b.dataset.k = k; b.title = '켜면 보이고 끄면 숨깁니다';
      b.onclick = () => { const h = hairOn(); h[k] = !h[k]; st.hairMode = h.front && h.back ? 'all' : h.front ? 'front' : h.back ? 'back' : 'none';
                          const hat = st.equip.head; if (hat) { settings.hatHairModes[hat] = st.hairMode; saveLS(); } syncHair(); refresh(); };
      el.appendChild(b);
    }
    syncHair();
  }
  function syncHair() {
    const h = hairOn(), parts = hairParts();
    $('hairModes').querySelectorAll('.btn').forEach(b => {
      const k = b.dataset.k, on = h[k], has = parts[k];
      b.classList.toggle('on', on && has); b.classList.toggle('off', !on || !has); b.disabled = !has;
      b.title = has ? '켜면 보이고 끄면 숨깁니다' : (k === 'back' ? '이 헤어는 뒷머리가 따로 없는 한 장짜리입니다' : '이 헤어에는 앞머리 조각이 없습니다');
    });
  }
  // which pieces the worn style has (layer 8 = main piece, 9-13 = back pieces); unknown until its animations are loaded
  function hairParts() {
    const out = { front: true, back: true }, h = st.char && st.hair >= 0 ? st.char.hairById[st.hair] : null; if (!h) return out;
    const keys = new Set(); let loaded = true;
    for (const a of h.anims) { const A = TW.S.anims[a]; if (!A) { loaded = false; continue; } for (const m in A.m) for (const dv in A.m[m]) for (const e of A.m[m][dv].e) for (const k of e) if (k[0] === 6) keys.add(k[1]); }
    if (!loaded) return out;
    out.front = TW.S.index.hair_front_layers.some(k => keys.has(k)); out.back = TW.S.index.hair_back_layers.some(k => keys.has(k));
    return out;
  }
  // a row of toggle buttons; get() tells which one is on
  function group(el, items, onPick, get, onRight) {
    el.innerHTML = '';
    for (const [v, label, title] of items) {
      const b = document.createElement('button'); b.className = 'btn'; b.textContent = label; if (title) b.title = title;
      b.dataset.v = v; b.onclick = () => { onPick(v); syncGroup(el, get); };
      if (onRight) b.oncontextmenu = e => { e.preventDefault(); onRight(v); };
      el.appendChild(b);
    }
    syncGroup(el, get);
  }
  function syncGroup(el, get) { const cur = get(); el.querySelectorAll('.btn').forEach(b => b.classList.toggle('on', String(b.dataset.v) === String(cur))); }
  function showPicker() {
    $('pickGrid').querySelectorAll('img[data-src]').forEach(im => { im.src = im.dataset.src; im.removeAttribute('data-src'); });
    $('pick').classList.remove('hidden');
  }
  function hidePicker() { if (st.ci >= 0) $('pick').classList.add('hidden'); }

  // 사이트가 mount 할 때 준 '코디 게시판 업로드'. 카테고리 줄(5칸 격자)은 자리가 꽉 차 있으므로
  // 그 오른쪽 빈자리(#shareBox)에 따로 세운다. 한 번만 만들면 된다
  let shareOpt = null;
  function placeShare() {
    const box = $('shareBox');
    if (!shareOpt || !box || box.querySelector('.share')) return;
    const b = document.createElement('button');
    b.className = 'btn share'; b.type = 'button';
    b.textContent = shareOpt.label || '코디 게시판 업로드';
    b.title = shareOpt.title || '지금 화면에 보이는 모습 그대로 올라갑니다';
    b.onclick = () => shareOpt.onClick(b);
    box.prepend(b);
  }

  // [New] 테일즈DB 아바타 DB 의 New 목록(/data/sheets/labels.json, 최근 것부터)에 있는 아이템 · [Hidden] 숨긴 아이템 (검색칸에 코드를 넣은 뒤에만)
  // 그 목록을 못 받으면 아이템 번호가 큰 것(나중에 나온 것) 30개. 카테고리처럼 목록을 바꾼다 (st.cat = 'new' / 'hidden').
  // 다시 누르거나 카테고리를 누르면 돌아간다
  const NEW_N = 30;
  const isListCat = c => c === 'new' || c === 'hidden';
  // New 목록: 이름 → 순서 (0 = 가장 최근). 시트 이름과 견줄 때는 ♣ · 띄어쓰기 · 기호 · 끝의 (1) · ' E' 를 뺀다
  const newKey = t => squash(String(t || '').replace(/\s*\(\d+\)\s*$/, '').replace(/\s+E$/, ''));   // squash: 띄어쓰기·기호(♣ 포함)를 빼고 소문자로
  let newRank = null;
  fetch('/data/sheets/labels.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(j => {
    const list = j?.avatar?.new; if (!Array.isArray(list) || !list.length) return;
    newRank = new Map(); list.forEach((n, i) => { const k = newKey(n); if (!newRank.has(k)) newRank.set(k, i); });
    if (st.char) { listBtns(); if (st.cat === 'new') fillGrid(); else if (st.list.length) fillGrid(); }
  }).catch(() => {});
  const inNew = it => !!newRank && newRank.has(newKey(it.name));
  // 아바타 목록(투구·머리·몸·효과·다리 확장)의 기본 순서 = 테일즈DB 아바타 시트의 줄 순서 (/data/sheets/avatar.csv, 위에서부터).
  // 시트에 없는 것(장비 아이템 등)은 그 뒤에 원래 순서대로. 시트를 못 받으면 원래 순서
  // 시트 열: 리스트 이미지, 상세 이미지, 이름, 획득처(' / ' 로 여럿), 확률, 부위, 月-아이템 교환 가능(O/X), 아이템 번호
  const SHEET_CATS = new Set(['head', 'face', 'body', 'back', 'foot']);
  let sheetRank = null, sheetById = null;
  function csvRows(text) {
    const out = []; let row = [], f = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) { if (ch === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += ch; continue; }
      if (ch === '"') q = true;
      else if (ch === ',') { row.push(f); f = ''; }
      else if (ch === '\n') { row.push(f.replace(/\r$/, '')); out.push(row); row = []; f = ''; }
      else f += ch;
    }
    if (f || row.length) { row.push(f); out.push(row); }
    return out;
  }
  // 획득처 묶음 (조건 판). 획득처 하나는 앞에서부터 처음 맞는 묶음에 들고, 세부는 그 안의 이름 (회차 · 상자 번호 · 세트 이름).
  // 세부 함수: 이 묶음이 아니면 null/undefined, 세부가 없으면 ''. 규칙에 안 맞는 새 획득처는 '이벤트 · 콜라보' 로 간다
  const SRC_GROUPS = [
    ['fancy', '화려한 모음집', s => s.match(/화려한\s*아바타\s*모음집\s*\(([^)]+)\)/)?.[1].replace(/\s+/g, '')],
    ['setbox', '세트 모음집 상자', s => { const m = s.match(/세트\s*모음집\s*상자\s*(\d+)/); return m && '상자 ' + m[1]; }],
    ['vol', '세트 상자 Vol', s => { const m = s.match(/세트\s*상자\s*Vol\.?\s*(\d+)/i); return m && 'Vol.' + m[1]; }],
    ['season', '계절 상자', s => s.match(/^(.+?)(?:의)?\s*화려한\s*아바타\s*상자$/)?.[1]],
    ['set', '아바타 세트', s => s.match(/^(.+?)\s*아바타\s*세트$/)?.[1]],
    ['month', '月-아바타 교환', s => /^月-아바타\s*교환/.test(s) ? '' : null],
    ['event', '이벤트 · 콜라보', s => s],
  ];
  function srcInfo(row, rank) {
    const groups = new Set(), subs = new Set();
    for (const src of String(row[3] || '').split(/\s+\/\s+/).map(x => x.trim()).filter(Boolean)) {
      for (const [g, , sub] of SRC_GROUPS) { const v = sub(src); if (v == null) continue; groups.add(g); if (v) subs.add(g + '|' + v); break; }
    }
    if (String(row[6] || '').trim() === 'O') groups.add('month');
    return { rank, groups, subs };
  }
  fetch('/data/sheets/version.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : {}).catch(() => ({}))
    .then(v => fetch('/data/sheets/avatar.csv' + (v.avatar ? '?v=' + v.avatar : '')))
    .then(r => r.ok ? r.text() : '').then(text => {
      const rows = csvRows(text.replace(/^\ufeff/, '')).slice(1).filter(r => r[2]);
      if (!rows.length) return;
      sheetRank = new Map(); sheetById = new Map();
      rows.forEach((r, i) => {
        const k = newKey(r[2]); if (k && !sheetRank.has(k)) sheetRank.set(k, i);
        const id = +r[7]; if (id && !sheetById.has(id)) sheetById.set(id, srcInfo(r, i));
      });
      if (st.char && (SHEET_CATS.has(st.cat) || isListCat(st.cat))) fillGrid();
      ownRefresh();
    }).catch(() => {});
  const bySheet = list => {
    if (!sheetRank) return list;
    const rank = it => sheetById.get(it.id)?.rank ?? sheetRank.get(newKey(it.name)) ?? Infinity;
    return list.map((it, i) => [rank(it), i, it]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x[2]);
  };
  // ---------------------------------------------------------------- 조건 판 (다나와식)
  // 획득처 줄: 아바타 다섯 부위 · New · Hidden 목록에서 (시트를 받았을 때). 묶음을 고르면 그 아래 줄에 세부가 펼쳐진다
  // (세부를 하나도 안 고르면 묶음 전체). 정렬 · NEW만은 헤어 · 배경 · 변신 망토를 뺀 모든 목록에서.
  // 고른 조건은 다른 부위로 옮겨도 남는다 (같은 회차의 투구 · 몸을 차례로 볼 수 있게). 정렬만 이 브라우저에 저장한다
  const SORTS = [['base', '기본', '테일즈DB 아바타 DB 순서 (획득처 순)'], ['new', '최신순', '최근에 추가된 아이템부터'], ['name', '이름순', '가나다 순']];
  const filt = { src: new Set(), sub: new Set(), newOnly: false, hiddenOnly: false, sort: SORTS.some(x => x[0] === settings.sort) ? settings.sort : 'base' };
  // 헤어도 정렬 · New · Hidden 은 쓴다 (획득처 · 종류 줄은 아바타 목록에만). 숨긴 헤어는 묶음이 붙인 alt, New 는 헤어의 new
  const filtOn = () => st.mode !== 'tf' && !!st.char && st.cat !== 'bg' && st.cat !== 'uniform';
  const hiddenOf = it => st.cat === 'hair' ? !!it.alt : st.full && skipped(it);
  const filtSrcOn = () => !!sheetById && (SHEET_CATS.has(st.cat) || isListCat(st.cat));
  const filtActive = () => filt.src.size > 0 || filt.newOnly || filt.hiddenOnly;
  const filtClear = () => { filt.src.clear(); filt.sub.clear(); filt.newOnly = false; filt.hiddenOnly = false; };
  const isNewItem = it => !!it.new || (st.cat !== 'hair' && inNew(it));
  const plainName = n => String(n || '').replace(/^[^0-9A-Za-z가-힣ㄱ-ㅎ]+/, '');
  function srcPass(it) {
    const s = sheetById.get(it.id); if (!s) return false;
    for (const g of filt.src) {
      if (!s.groups.has(g)) continue;
      const picked = [...filt.sub].filter(k => k.startsWith(g + '|'));
      if (!picked.length || picked.some(k => s.subs.has(k))) return true;
    }
    return false;
  }
  const filtKeeps = it => (!filtSrcOn() || !filt.src.size || srcPass(it)) && (!filt.newOnly || isNewItem(it)) && (!filt.hiddenOnly || hiddenOf(it));
  function filtApply(list) {
    st.base = list;                                       // 조건을 걸기 전 목록 (조건 판의 개수)
    if (!filtOn()) return list;
    let out = filtActive() ? list.filter(filtKeeps) : list;
    if (filt.sort === 'new') {
      const nr = it => inNew(it) ? newRank.get(newKey(it.name)) : Infinity;
      out = out.map(it => [nr(it), it]).sort((a, b) => a[0] - b[0] || b[1].id - a[1].id).map(x => x[1]);
    } else if (filt.sort === 'name') out = [...out].sort((a, b) => plainName(a.name).localeCompare(plainName(b.name), 'ko'));
    return out;
  }
  const subNum = k => { const m = k.match(/\d+/); return m ? +m[0] : Infinity; };
  const subOrder = (a, b) => subNum(a) - subNum(b) || a.localeCompare(b, 'ko');
  const filtChk = (f, v, label, n, on) => `<label class="filt-chk f-${f}${on ? ' on' : ''}${n ? '' : ' zero'}"><input type="checkbox" data-f="${f}" value="${esc(v)}"${on ? ' checked' : ''}><span>${esc(label)}</span><em>${n.toLocaleString()}</em></label>`;
  function filtRender() {
    const box = $('filt'); if (!box) return;
    if (!filtOn()) { box.classList.add('hidden'); box.innerHTML = ''; return; }
    const base = st.base || [], rows = [];
    if (filtSrcOn()) {
      const cnt = new Map(), subCnt = new Map();
      for (const it of base) {
        const s = sheetById.get(it.id); if (!s) continue;
        for (const g of s.groups) cnt.set(g, (cnt.get(g) || 0) + 1);
        for (const k of s.subs) subCnt.set(k, (subCnt.get(k) || 0) + 1);
      }
      const opts = SRC_GROUPS.filter(([g]) => cnt.get(g) || filt.src.has(g)).map(([g, label]) => filtChk('src', g, label, cnt.get(g) || 0, filt.src.has(g))).join('');
      rows.push(`<div class="filt-row"><span class="filt-lbl">획득처</span><div class="filt-opts">${opts || '<span class="muted">이 목록에는 획득처 정보가 없습니다</span>'}</div></div>`);
      for (const [g, label] of SRC_GROUPS) {
        if (!filt.src.has(g)) continue;
        const keys = [...new Set([...subCnt.keys(), ...filt.sub])].filter(k => k.startsWith(g + '|')).sort(subOrder);
        if (keys.length < 2 && !keys.some(k => filt.sub.has(k))) continue;
        rows.push(`<div class="filt-row filt-sub"><span class="filt-lbl">${esc(label)}</span><div class="filt-opts">` +
          keys.map(k => filtChk('sub', k, k.slice(g.length + 1), subCnt.get(k) || 0, filt.sub.has(k))).join('') + '</div></div>');
      }
    }
    if (PART_CATS.has(st.cat) && partTypes.length) {
      const pt = [['all', '전체'], ...partTypes.map(p => [String(p), partLabel(p)])];
      rows.push(`<div class="filt-row"><span class="filt-lbl">종류</span><div class="filt-opts"><span class="filt-tabs">` +
        pt.map(([k, l]) => `<button type="button" class="filt-tab${String(st.part) === k ? ' on' : ''}" data-part="${k}">${esc(l)}</button>`).join('') + '</span></div></div>');
    }
    const tabs = SORTS.map(([k, l, t]) => `<button type="button" class="filt-tab${filt.sort === k ? ' on' : ''}" data-sort="${k}" title="${t}">${l}</button>`).join('');
    rows.push(`<div class="filt-row"><span class="filt-lbl">정렬</span><div class="filt-opts"><span class="filt-tabs">${tabs}</span>` +
      filtChk('new', '1', 'New', base.filter(isNewItem).length, filt.newOnly) +
      // 숨긴 아이템: 로그인했을 때만
      (st.full ? filtChk('hidden', '1', 'Hidden', base.filter(hiddenOf).length, filt.hiddenOnly) : '') +
      `<span class="filt-end"><span class="filt-count">${st.list.length.toLocaleString()}개</span>` +
      (filtActive() ? '<button type="button" class="filt-reset" data-reset="1">조건 초기화</button>' : '') + '</span></div></div>');
    box.innerHTML = rows.join('');
    box.classList.remove('hidden');
  }
  function wireFilt() {
    const box = $('filt');
    box.onchange = e => {
      const t = e.target, f = t.dataset && t.dataset.f; if (!f) return;
      if (f === 'new') filt.newOnly = t.checked;
      else if (f === 'hidden') filt.hiddenOnly = t.checked;
      else {
        // 획득처 묶음은 하나만 (다른 묶음을 고르면 앞의 묶음과 그 세부는 풀린다). 세부는 여러 개
        if (f === 'src' && t.checked) { filt.src.clear(); filt.sub.clear(); }
        const set = f === 'src' ? filt.src : filt.sub;
        if (t.checked) set.add(t.value); else set.delete(t.value);
        if (f === 'src' && !t.checked) for (const k of [...filt.sub]) if (k.startsWith(t.value + '|')) filt.sub.delete(k);   // 묶음을 끄면 세부도
      }
      fillGrid();
    };
    box.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.part) st.part = b.dataset.part;
      else if (b.dataset.sort) { filt.sort = b.dataset.sort; settings.sort = filt.sort; saveLS(); }
      else if (b.dataset.reset) filtClear();
      fillGrid();
    };
  }
  // [New] · [Hidden] 목록 단추는 없앴다: 조건 판의 New · Hidden 체크가 지금 부위 안에서 거른다
  function listBtns() { bgButton(); }
  function openListCat(v) {
    st.cat = v; st.part = 'all'; st.q = ''; $('search').value = ''; closeSuggest();
    $('kinds').classList.toggle('hidden', NO_KIND_FILTER.has(v));
    syncGroup($('cats'), () => st.cat); listBtns(); partChips(); fillGrid();
  }

  async function selectChar(ci) {
    $('pickStatus').textContent = '불러오는 중…';
    const idx = TW.S.index, c = await TW.loadChar(ci);
    // 캐릭터를 바꿔도 입던 아바타(투구 · 머리 · 몸 · 효과 · 다리 · 확장 의상)는 그대로 입힌다 - 아이템 번호가 캐릭터끼리 같다.
    // 무기 · 확장 무기 · 보조는 캐릭터마다 달라 벗긴다. 새 캐릭터에 없는 것 · 목록에서 빠진 것도 벗는다. 기본 의상 염색 · 헤어는 캐릭터 것
    const prev = st.mode !== 'tf' && st.char ? { equip: st.equip, hidden: st.hidden, cdye: st.cdye } : null;
    st.ci = ci; await moreItems();
    setMode('char');
    st.ci = ci; st.char = c; st.equip = {}; st.hidden = new Set(); st.hairHidden = false; st.dye = 0; st.dyeBy = {}; st.cdye = {}; st.bdye = {};
    if (prev) for (const [slot, id] of Object.entries(prev.equip)) {
      const it = c.byId[id];
      if (slot === 'weapon' || slot === 'sub' || !it || it.slot !== slot || !shown(it)) continue;
      st.equip[slot] = id;
      if (prev.hidden.has(id)) st.hidden.add(id);
      if (slot === 'costume') st.cdye = prev.cdye;                // 확장 의상 염색은 그 옷을 따라간다
    }
    if (!CAT_ORDER.includes(st.cat) && !(st.cat === 'new' || (st.cat === 'hidden' && st.full))) st.cat = 'head';   // coming from the transform cloak screen: start on 투구 확장
    st.hair = idx.chars[ci].default_hair; st.motion = 0; st.dir = 10; st.tick = 0; st.q = ''; $('search').value = '';
    settings.lastChar = ci; saveLS();
    $('whoArt').src = artUrl(idx.chars[ci].art); $('whoName').textContent = idx.chars[ci].name; $('whoCard').title = idx.chars[ci].full;
    // 6 per row: 제복염색 머리 얼굴 의상 등 발자국 / 헤어 확장의상 무기 보조 변신
    const byKey = Object.fromEntries(idx.slots.map(s => [s.key, [s.key, s.label.replace(' (방패/펜듈럼)', ''), s.label]]));
    byKey.uniform = ['uniform', '제복 염색', '🎨 제복/염색 (74색)'];
    byKey.weapon_av = ['weapon_av', '확장 무기', '아바타 무기']; byKey.weapon_eq = ['weapon_eq', '일반 무기', '장비 무기'];
    if (byKey.sub && SUB_LABEL[idx.chars[ci].name]) byKey.sub = ['sub', SUB_LABEL[idx.chars[ci].name], byKey.sub[2]];
    if (!hasSub()) { delete byKey.sub; if (st.cat === 'sub') st.cat = 'head'; }          // nothing to hold in the off hand
    group($('cats'), CAT_ORDER.map(k => k === 'hair' ? ['hair', '헤어', '헤어 스타일'] : byKey[k]).filter(Boolean),
          // 다른 분류로 옮기면 검색어는 비운다 (자동완성 후보를 골라 그 분류로 가는 pickSuggest 는 검색어를 남긴다)
          v => { st.cat = v; st.part = 'all'; st.q = ''; $('search').value = ''; closeSuggest(); $('kinds').classList.toggle('hidden', NO_KIND_FILTER.has(v)); listBtns(); partChips(); fillGrid(); }, () => st.cat);
    placeShare(); listBtns();
    $('kinds').classList.toggle('hidden', NO_KIND_FILTER.has(st.cat));
    st.part = 'all'; partChips();
    catIcons();
    $('motions').classList.remove('many');
    group($('motions'), idx.chars[ci].motions.map(m => [m, idx.motion_names[m] || ('동작 ' + m)]), v => { st.motion = +v; st.rawCostume = null; st.tick = 0; refresh(); }, () => (rawCostumeOn() ? null : st.motion));
    buildSlots(idx);
    $('pick').classList.add('hidden'); $('sim').classList.remove('hidden'); $('pickStatus').textContent = '';
    applyZoom(); fillGrid(); await refresh(); startPlay(); bootDone();
  }
  function bootDone() { const b = $('boot'); if (b) b.remove(); }

  // ---------------------------------------------------------------- transform cloak screen
  function setMode(m) {
    st.mode = m; const tf = m === 'tf';
    for (const id of ['cats', 'kinds', 'slots', 'shareBox']) $(id).classList.toggle('hidden', tf);   // shareBox: 코디 게시판 업로드 · New · Hidden (변신 망토 화면에는 없다)
    if (tf) $('parts').classList.add('hidden');            // the weapon-type row comes back with the character screen (partChips)
    $('sim').classList.toggle('tf', tf);                 // transform screen: a taller preview takes the slots' place (css)
    $('whoArt').classList.toggle('hidden', tf); $('whoTf').classList.toggle('hidden', !tf);
    $('hairBox').classList.toggle('hidden', tf);                         // hair toggles: a transform hides the hair (확대 stays)
  }
  // paint one icon-sheet cell into a box, scaled to fit `size`
  function drawCellInto(box, cell, size) {
    if (!cell || !box) return;
    const im = new Image(); im.onload = () => {
      const cv = document.createElement('canvas'), f = size / Math.max(cell.w, cell.h); cv.width = Math.round(cell.w * f); cv.height = Math.round(cell.h * f);
      const g = cv.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(im, cell.x, cell.y, cell.w, cell.h, 0, 0, cv.width, cv.height);
      box.innerHTML = ''; box.appendChild(cv);
    }; im.src = cell.url;
  }
  async function selectTransforms() {
    $('pickStatus').textContent = '불러오는 중…';
    const [tl, c] = await Promise.all([TW.loadTransforms(), TW.loadChar(0)]);
    setMode('tf');
    st.ci = 0; st.char = c; st.equip = {}; st.hidden.clear(); st.hair = -1; st.motion = 0; st.dir = 10; st.tick = 0; st.q = ''; $('search').value = '';
    st.cat = 'transform'; st.tf = (tl.items[0] || {}).id || 0;
    $('whoName').textContent = '변신 망토'; $('whoCard').title = '클릭 = 캐릭터 선택으로';
    drawCellInto($('whoTf'), TW.transformIcon(st.tf), 100);
    await tfAnimsReady(st.tf); tfMotionButtons();
    $('pick').classList.add('hidden'); $('sim').classList.remove('hidden'); $('pickStatus').textContent = '';
    if (st.tf) fitTransformMotion(st.tf);
    applyZoom(); fillGrid(); await refresh(); startPlay(); bootDone();
  }
  // the motions offered for a cloak: its own motions among tf_motion_order (기본 필드 걷기 달리기 공격 마법 시전), played
  // directly (pose.raw) rather than through the DB 0293 character-motion map
  // it.motions can name motions the cloak's animation does not have (고양이 낭자: 공격 / 마법 시전 draw nothing):
  // only the ones some animation of the cloak really draws (tfAnimsReady loads them first)
  const drawsMotion = (it, m) => it.anims.some(a => {
    const A = TW.S.anims[a], M = A && A.m[m];
    return M && Object.values(M).some(d => d === 'M' || (d && Array.isArray(d.e) && d.e.some(e => e.length)));
  });
  function tfMotions(id) {
    const it = TW.S.tlist && TW.S.tlist.byId[id], order = TW.S.index.tf_motion_order;
    let ms = it && it.motions ? (order ? order.filter(m => it.motions.includes(m)) : it.motions) : [];
    if (it && it.anims.every(a => TW.S.anims[a] !== undefined)) { const drawn = ms.filter(m => drawsMotion(it, m)); if (drawn.length) ms = drawn; }
    return ms.length ? ms : TW.S.index.chars[0].motions;
  }
  const tfAnimsReady = id => { const it = TW.S.tlist && TW.S.tlist.byId[id]; return it ? Promise.all(it.anims.map(a => TW.loadAnim(a).catch(() => null))) : Promise.resolve(); };
  function tfMotionLabel(m) { return TW.S.index.motion_names[m] || `동작 ${m}`; }
  function tfMotionButtons() {
    const ms = tfMotions(st.tf);
    group($('motions'), ms.map(m => [m, tfMotionLabel(m)]), v => { st.motion = +v; st.tick = 0; refresh(); }, () => st.motion);
    $('motions').classList.toggle('many', ms.length > 8);       // two columns when a cloak has many motions
  }
  // the cloak lacks the current motion: idle, field idle, or its first motion
  function fitTransformMotion(id) {
    const ms = tfMotions(id);
    if (ms.length && !ms.includes(st.motion)) { st.motion = ms.includes(0) ? 0 : ms.includes(1) ? 1 : ms[0]; st.tick = 0; syncGroup($('motions'), () => st.motion); }
  }

  // the hidden items hidden again (and taken off if worn) once the simulator is left: the page left (back / forward
  // can bring it back from the browser's page cache) or, inside TalesDB, another tab opened (the host is not displayed)
  function resetList() {
    if (!st.full) return;
    st.full = false;
    if (!st.char) return;
    let off = false;
    for (const [k, id] of Object.entries(st.equip)) { const it = st.char.byId[id]; if (it && skipped(it)) { delete st.equip[k]; off = true; } }
    const h = st.char.hairById[st.hair]; if (h && h.alt) { st.hair = TW.S.index.chars[st.ci].default_hair; st.dye = 0; off = true; }
    TW.dropBundle(); st.more = ''; filt.hiddenOnly = false;
    if (st.cat === 'hidden') { st.cat = 'head'; syncGroup($('cats'), () => st.cat); }
    catIcons(); listBtns(); partChips(); fillGrid();
    if (off) { markSelected(); refresh(); }
  }
  // the weapon-type buttons (전체 + this character's types in the open list); hidden for every other list
  // 무기 종류: 조건 판의 '종류' 줄 (filtRender). 예전 단추 줄(#parts)은 쓰지 않는다
  let partTypes = [];
  function partChips() {
    const el = $('parts'), on = st.mode !== 'tf' && PART_CATS.has(st.cat);
    const kind = catKind(st.cat);
    const types = on ? [...new Set(st.char.items.filter(it => it.slot === catSlot(st.cat) && (!kind || it.kind === kind) && shown(it)).map(it => it.part))].sort((a, b) => a - b) : [];
    el.classList.add('hidden'); el.innerHTML = '';
    partTypes = types.length < 2 ? [] : types;
    if (!partTypes.length || (st.part !== 'all' && !types.includes(+st.part))) st.part = 'all';
  }
  // 이솔렛's off-hand swords are 물리서브검 / 마법서브검 in the data: in the 보조 무기 list just 물리검 / 마법검
  const partLabel = p => (TW.S.index.part_names[p] || ('종류 ' + p)).replace('서브', '');
  // list buttons without a fixed icon: the first entry of that list (this character's) drawn above the label
  const LIVE_CAT_ICONS = ['hair', 'weapon_av', 'weapon_eq', 'sub'];
  function catIcons() {
    const ci = st.ci, c = st.char, B = 30;
    for (const k of LIVE_CAT_ICONS) {
      const b = $('cats').querySelector(`.btn[data-v="${k}"]`); if (!b) continue;
      b.classList.add('live-ic'); let box = b.querySelector('.cic');
      if (!box) { box = document.createElement('span'); box.className = 'cic'; b.prepend(box); }
      box.innerHTML = '';
      // 이 함수는 목록이 바뀔 때마다 불린다 (처음 · 목록 도착 · 로그인 · 묶음 합치기). 그림은 나중에 그려져 붙으므로, 앞서 부른 것이
      // 아직 그리는 중에 다시 불리면 둘 다 붙어 같은 그림이 여러 장 나왔다 (2026-11-24 사용자: 로그인하면 간헐적으로 헤어 칸에
      // 그림이 겹친다). 칸마다 부른 차례를 적어 두고, 마지막으로 부른 것만 붙인다
      const turn = box._turn = (box._turn || 0) + 1;
      // the first entries of the list, in order, until one has a picture (투명 아바타 (방패) draws nothing)
      const cands = k === 'hair' ? [c.hairById[TW.S.index.chars[ci].default_hair] || c.hair[0]]
                                 : (k === 'weapon_av' ? avOrder : x => x)(c.items.filter(it => it.slot === catSlot(k) && (!catKind(k) || it.kind === catKind(k)) && shown(it))).slice(0, 6);
      (async () => {
        for (const e of cands) {
          if (!e) continue;
          let cv = null;
          try { cv = k === 'hair' ? headOnly(await TW.hairIcon(ci, e.id)) : await TW.itemIcon(ci, e.id); } catch (err) { console.warn('cat icon', k, err); }
          if (box._turn !== turn) return;   // 그사이 다시 불렸다: 새로 부른 쪽이 그린다
          if (!cv || st.ci !== ci) continue;
          const f = Math.min(B / cv.width, B / cv.height);
          cv.style.width = Math.round(cv.width * f) + 'px'; cv.style.height = Math.round(cv.height * f) + 'px'; box.replaceChildren(cv); return;
        }
      })();
    }
  }
  // the hair icon window is head + chest: keep the head (top 42 px) and trim the empty border
  function headOnly(cv) {
    if (!cv) return null;
    const H = Math.min(42, cv.height), g = cv.getContext('2d'), d = g.getImageData(0, 0, cv.width, H).data;
    let x0 = cv.width, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < cv.width; x++) if (d[(y * cv.width + x) * 4 + 3] > 24) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    if (x1 < 0) return cv;
    const o = document.createElement('canvas'); o.width = x1 - x0 + 1; o.height = y1 - y0 + 1; o.getContext('2d').drawImage(cv, -x0, -y0); return o;
  }

  // ---------------------------------------------------------------- search suggestions
  // under the search box: up to 10 names from every list of the character (not only the open one), the list's name beside
  // each; names starting with the query first, then the open list's. Picking one opens its list with the whole name typed in
  const SUGGEST_N = 10;
  function catOfItem(it) {
    for (const k of CAT_ORDER) { if (k === 'hair') continue; const sl = catSlot(k), kd = catKind(k); if (it.slot === sl && (!kd || it.kind === kd)) return k; }
    return null;
  }
  function catLabel(k) { const b = root.querySelector('#cats .btn[data-v="' + k + '"]'); return b ? b.textContent.trim() : k; }
  let sugIdx = -1;
  function suggest() {
    const box = $('suggest'), q = st.q;
    if (!q || st.mode === 'tf' || !st.char || !squash(q)) { closeSuggest(); return; }
    const seen = new Set(), out = [];
    const add = (name, cat, extra) => { const key = cat + '|' + name; if (seen.has(key) || !nameMatch(name, q)) return; seen.add(key); out.push({ name, cat, ...extra }); };
    for (const h of st.char.hair) add(h.name, 'hair', { id: h.id });
    const have = new Set(root.querySelectorAll('#cats .btn').length ? [...root.querySelectorAll('#cats .btn')].map(b => b.dataset.v) : CAT_ORDER);
    for (const it of st.char.items) { if (!shown(it)) continue; const k = catOfItem(it); if (k && have.has(k)) add(it.name, k, { id: it.id }); }
    if (!out.length) { closeSuggest(); return; }
    const qq = squash(q), rank = r => (nameKeys(r.name)[0].startsWith(qq) ? 0 : 2) + (r.cat === st.cat ? 0 : 1);
    out.sort((a, b) => rank(a) - rank(b) || a.name.length - b.name.length);
    box.innerHTML = ''; sugIdx = -1;
    out.slice(0, SUGGEST_N).forEach((r, i) => {
      const d = document.createElement('div'); d.className = 'sug'; d.dataset.i = i;
      const n = document.createElement('span'); n.textContent = r.name; const c = document.createElement('em'); c.textContent = catLabel(r.cat);
      d.appendChild(n); d.appendChild(c);
      d.onpointerdown = ev => { ev.preventDefault(); pickSuggest(r); };
      box.appendChild(d);
    });
    box._rows = out.slice(0, SUGGEST_N);
    const a = $('search').getBoundingClientRect();                          // fixed: viewport coordinates
    box.style.left = a.left + 'px'; box.style.top = (a.bottom + 4) + 'px'; box.style.width = Math.max(a.width, 260) + 'px';
    box.classList.remove('hidden');
  }
  function closeSuggest() { const b = $('suggest'); if (b) { b.classList.add('hidden'); b.innerHTML = ''; b._rows = null; } sugIdx = -1; }
  function suggestKey(ev) {
    const box = $('suggest'), rows = box._rows;
    if (ev.key === 'Escape') { closeSuggest(); return; }
    if (!rows || box.classList.contains('hidden')) return;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      // -1 = none chosen (the typed text); the arrows cycle through the rows and back to it
      ev.preventDefault(); const n = rows.length + 1; sugIdx = ((sugIdx + 1 + (ev.key === 'ArrowDown' ? 1 : -1)) % n + n) % n - 1;
      box.querySelectorAll('.sug').forEach((d, i) => d.classList.toggle('on', i === sugIdx));
    } else if (ev.key === 'Enter' && sugIdx >= 0) { ev.preventDefault(); pickSuggest(rows[sugIdx]); }
  }
  function pickSuggest(r) {
    closeSuggest();
    if (r.cat !== st.cat) {
      st.cat = r.cat; st.part = 'all'; $('kinds').classList.toggle('hidden', NO_KIND_FILTER.has(r.cat)); partChips(); syncGroup($('cats'), () => st.cat);
    }
    const it = r.cat !== 'hair' && st.char.byId[r.id];
    if (it && st.kind !== 'all' && !catKind(r.cat) && it.kind !== st.kind) { st.kind = 'all'; syncGroup($('kinds'), () => st.kind); }   // the 아바타 / 장비 filter would hide it
    if (it && !filtKeeps(it)) filtClear();
    $('search').value = r.name; st.q = r.name.toLowerCase(); fillGrid(); $('search').blur();
  }
  // ---------------------------------------------------------------- item grid
  // hair styles are shown by name only (they used to carry a list number in front)
  const hairLabel = id => { const h = st.char.hairById[id]; return h ? h.name : String(id); };
  function listFor() {
    if (st.mode === 'tf') return TW.S.tlist.items.filter(it => nameMatch(it.name, st.q) || String(it.id) === st.q);
    if (st.cat === 'uniform') return [];
    if (st.cat === 'bg') return [{ id: '', name: '배경 없음' }, ...bgList.map(e => ({ id: e.key, name: e.name }))].filter(e => !e.id || nameMatch(e.name, st.q));
    const c = st.char;
    if (st.cat === 'hair') {                                   // the character's own style (default) first
      const def = TW.S.index.chars[st.ci].default_hair;
      const hs = c.hair.filter(h => nameMatch(h.name, st.q));
      return filtApply([...hs.filter(h => h.id === def), ...hs.filter(h => h.id !== def)]);
    }
    if (isListCat(st.cat)) {                                  // [New] · [Hidden]: every list of the character, newest (biggest id) first
      const kd = st.kind === 'all' ? null : st.kind;
      let pool = c.items.filter(it => (st.cat === 'hidden' ? st.full && skipped(it) : shown(it) && !skipped(it)) && (!kd || it.kind === kd));
      if (st.cat === 'new') pool = newRank ? pool.filter(inNew).sort((a, b) => newRank.get(newKey(a.name)) - newRank.get(newKey(b.name)) || b.id - a.id)
                                           : pool.sort((a, b) => b.id - a.id).slice(0, NEW_N);
      else pool.sort((a, b) => b.id - a.id);
      return filtApply(pool.filter(it => nameMatch(it.name, st.q) || String(it.id) === st.q));
    }
    const slot = catSlot(st.cat), kind = catKind(st.cat) || (st.kind === 'all' ? null : st.kind);
    const part = PART_CATS.has(st.cat) && st.part !== 'all' ? +st.part : null;
    const list = c.items.filter(it => it.slot === slot && (!kind || it.kind === kind) && shown(it) && (part === null || it.part === part) &&
                                      (nameMatch(it.name, st.q) || String(it.id) === st.q));
    // 아바타 목록은 시트 순서. 그 밖에는 the latest exports' items (chars/<n>.json 'new', tw_webexport NEW_DAYS) first
    if (SHEET_CATS.has(st.cat) && sheetRank) return filtApply(bySheet(list));
    const ordered = st.cat === 'weapon_av' ? avOrder(list) : list;
    return filtApply(ordered.some(it => it.new) ? [...ordered.filter(it => it.new), ...ordered.filter(it => !it.new)] : ordered);
  }
  const TW_DYE_COLORS_74 = [
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
    { code: "54", name: "프로즌블루9", hex: "#0C4A6E" },
    { code: "6", name: "하이퍼화이트", hex: "#F8FAFC" }
  ];

  function renderUniformDyeGrid() {
    const g = $('grid'); if (!g) return;
    g.innerHTML = ''; g.scrollTop = 0;
    pagerRender(0);
    const ci = st.ci;
    if (ci < 0 || !TW.S.chars[ci]) {
      g.innerHTML = '<div class="grid-empty">캐릭터를 먼저 선택해 주세요.</div>';
      return;
    }
    const cname = TW.S.index.chars[ci].name;
    const parts = TW.baseDyes(ci);
    if (!parts || !parts.length) {
      g.innerHTML = `<div class="grid-empty">${cname}의 기본 제복 염색 부위 정보가 없습니다.</div>`;
      return;
    }
    if (st.uniformPart === undefined || st.uniformPart >= parts.length) {
      st.uniformPart = 0;
    }
    const curK = st.uniformPart;
    const curVal = st.bdye[curK];
    $('countLabel').textContent = '공식 74색 제복 염색';

    const wrap = document.createElement('div');
    wrap.className = 'dye-studio';

    // 1. Header with title and reset actions
    const hdr = document.createElement('div');
    hdr.className = 'dye-header';
    hdr.innerHTML = `<div class="dye-title">
      <span>🎨</span>
      <span><b>${cname}</b> 공식 제복 염색 Studio (${parts.length}개 부위)</span>
    </div>
    <div class="dye-actions">
      <button type="button" class="dye-act-btn" id="dyeResetPart">선택 부위 기본색</button>
      <button type="button" class="dye-act-btn" id="dyeResetAll">전체 부위 초기화</button>
    </div>`;
    wrap.appendChild(hdr);

    // 2. Parts selector row
    const pbar = document.createElement('div');
    pbar.className = 'dye-parts-bar';
    parts.forEach(([name], k) => {
      const v = st.bdye[k];
      const chipBg = v ? (v.startsWith('#') ? v : '#' + v) : '#ffffff';
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dye-part-btn' + (k === curK ? ' on' : '');
      b.innerHTML = `<span class="dye-part-chip" style="background:${chipBg};${!v ? 'border-style:dashed;' : ''}"></span>
        <span>${k + 1}. ${name}</span>
        ${v ? `<span class="dye-part-reset" data-reset="${k}" title="이 부위 초기화">×</span>` : ''}`;
      b.onclick = ev => {
        if (ev.target.classList.contains('dye-part-reset')) {
          ev.stopPropagation();
          delete st.bdye[k];
          refresh();
          renderUniformDyeGrid();
          return;
        }
        st.uniformPart = k;
        renderUniformDyeGrid();
      };
      pbar.appendChild(b);
    });
    wrap.appendChild(pbar);

    // 3. 74 Official Colors Swatches Grid
    const cgrid = document.createElement('div');
    cgrid.className = 'dye-colors-grid';
    TW_DYE_COLORS_74.forEach(c => {
      const card = document.createElement('button');
      card.type = 'button';
      const isCur = c.code === 'd' ? (!curVal) : (curVal && curVal.toLowerCase() === c.hex.replace('#', '').toLowerCase());
      card.className = 'dye-color-card' + (isCur ? ' selected' : '');
      card.title = `${c.name} (${c.hex})`;
      card.innerHTML = `<span class="dye-color-chip" style="background:${c.hex}"></span>
        <span class="dye-color-name">${c.name}</span>
        <span class="dye-color-hex">${c.hex}</span>`;
      card.onclick = () => {
        if (c.code === 'd') {
          delete st.bdye[curK];
        } else {
          st.bdye[curK] = c.hex.replace('#', '').toLowerCase();
        }
        refresh();
        renderUniformDyeGrid();
      };
      cgrid.appendChild(card);
    });
    wrap.appendChild(cgrid);

    // 4. Custom Hex input
    const crow = document.createElement('div');
    crow.className = 'dye-custom-row';
    const curHex = curVal ? (curVal.startsWith('#') ? curVal : '#' + curVal) : '#ffffff';
    crow.innerHTML = `<span style="font-size:12px;font-weight:700;">자유 색상:</span>
      <input type="color" id="dyeCustomPicker" value="${curHex}">
      <input type="text" id="dyeCustomHex" placeholder="#RRGGBB" value="${curVal ? '#' + curVal : ''}">
      <button type="button" class="dye-act-btn" id="dyeCustomApply">적용</button>`;
    wrap.appendChild(crow);

    g.appendChild(wrap);

    // Wire actions
    const rPart = hdr.querySelector('#dyeResetPart');
    if (rPart) rPart.onclick = () => { delete st.bdye[curK]; refresh(); renderUniformDyeGrid(); };
    const rAll = hdr.querySelector('#dyeResetAll');
    if (rAll) rAll.onclick = () => { st.bdye = {}; refresh(); renderUniformDyeGrid(); };

    const cp = crow.querySelector('#dyeCustomPicker'), ch = crow.querySelector('#dyeCustomHex'), ca = crow.querySelector('#dyeCustomApply');
    if (cp && ch && ca) {
      cp.oninput = () => { ch.value = cp.value; };
      cp.onchange = () => { st.bdye[curK] = cp.value.replace('#', '').toLowerCase(); refresh(); renderUniformDyeGrid(); };
      const applyCustom = () => {
        const val = ch.value.trim().replace('#', '');
        if (/^[0-9a-fA-F]{6}$/.test(val)) {
          st.bdye[curK] = val.toLowerCase();
          refresh();
          renderUniformDyeGrid();
        }
      };
      ca.onclick = applyCustom;
      ch.onkeydown = ev => { if (ev.key === 'Enter') applyCustom(); };
    }
  }

  function fillGrid() {
    const g = $('grid'); if (!g) return;
    if (st.cat === 'uniform') {
      g.classList.add('dye-mode');
      const fBox = $('filt'); if (fBox) { fBox.classList.add('hidden'); fBox.innerHTML = ''; }
      const pBox = $('parts'); if (pBox) { pBox.classList.add('hidden'); pBox.innerHTML = ''; }
      const sRow = $('search') && $('search').closest('.btn-row'); if (sRow) sRow.classList.add('hidden');
      renderUniformDyeGrid();
      return;
    }
    g.classList.remove('dye-mode');
    const sRow = $('search') && $('search').closest('.btn-row'); if (sRow) sRow.classList.remove('hidden');
    st.base = null; st.list = listFor(); st.shown = 0; gridPage = 0;
    filtRender();
    g.innerHTML = ''; g.scrollTop = 0;
    const wait = !listKnown && st.cat !== 'hair' && st.cat !== 'bg';
    $('countLabel').textContent = wait ? '불러오는 중…' : `${st.list.length.toLocaleString()}개`;
    if (wait) { g.innerHTML = '<div class="grid-wait" role="status"><span class="spin"></span><span>아이템 목록을 불러오는 중…</span></div>'; pagerRender(0); return; }
    if (!st.list.length && filtOn() && filtActive()) { g.innerHTML = '<div class="grid-empty">조건에 맞는 아이템이 없습니다.</div>'; pagerRender(0); return; }
    appendCards();
  }
  // 목록은 세 줄씩 쪽으로 나눠 보인다 (한 줄 칸 수는 목록 폭을 따른다). 아래 쪽 넘김 단추로 옮긴다
  const PAGE_ROWS = 3;
  let gridPage = 0, gridSize = 0;
  function pageSize() {
    const cols = getComputedStyle($('grid')).gridTemplateColumns.split(' ').filter(x => x && x !== 'none').length;
    return Math.max(1, cols) * PAGE_ROWS;
  }
  function pagerRender(pages) {
    const el = $('pager'); if (!el) return;
    if (pages <= 1) { el.classList.add('hidden'); el.innerHTML = ''; return; }
    const cur = gridPage, nums = new Set([0, pages - 1]);
    for (let i = cur - 2; i <= cur + 2; i++) if (i >= 0 && i < pages) nums.add(i);
    let html = `<button type="button" class="pg pg-step" data-p="${cur - 1}"${cur > 0 ? '' : ' disabled'} title="이전 쪽">‹</button>`, last = -1;
    for (const i of [...nums].sort((a, b) => a - b)) {
      if (i - last > 1) html += '<span class="pg-gap">…</span>';
      html += `<button type="button" class="pg${i === cur ? ' on' : ''}" data-p="${i}">${i + 1}</button>`; last = i;
    }
    html += `<button type="button" class="pg pg-step" data-p="${cur + 1}"${cur < pages - 1 ? '' : ' disabled'} title="다음 쪽">›</button>`;
    el.innerHTML = html; el.classList.remove('hidden');
  }
  // 지금 쪽의 카드만 그린다
  function appendCards() {
    const g = $('grid'), size = pageSize(), pages = Math.max(1, Math.ceil(st.list.length / size));
    gridSize = size; gridPage = Math.min(Math.max(0, gridPage), pages - 1);
    const from = gridPage * size, rows = st.list.slice(from, from + size);
    g.innerHTML = '';
    st.shown = from + rows.length;
    pagerRender(pages);
    if (st.cat === 'bg') {                                    // 배경: 잘라낸 맵 그림을 그대로 카드에 (맨 앞은 '배경 없음')
      for (const e of rows) {
        const d = document.createElement('div'); d.className = 'card bg-card' + (st.bg === e.id ? ' on' : ''); d.dataset.bg = e.id;
        d.innerHTML = `<div class="nm" title="${esc(e.name)}">${esc(e.name)}</div>` +
          (e.id ? `<div class="ic bgthumb" style="background-image:url('${bgCardUrl(e.id)}')"></div>` : '<div class="ic bgthumb none">없음</div>');
        d.onclick = () => pick(e);
        g.appendChild(d);
      }
      return;
    }
    const src = TW.S.index.src_labels;
    const on = new Set(st.mode === 'tf' ? [st.tf] : Object.values(st.equip)); if (st.cat === 'hair') on.add(st.hair);
    for (const e of rows) {
      const d = document.createElement('div'); d.className = 'card' + (on.has(e.id) ? ' on' : ''); d.dataset.id = e.id;
      const tag = st.cat === 'hair' ? '' : (e.kind === 'equip' && !NO_KIND_FILTER.has(st.cat) ? '[장비] ' : '') + (st.cat === 'costume' || st.cat === 'transform' ? '' : (src[e.src] || ''));   // the category already says 변신
      const name = st.cat === 'hair' ? hairLabel(e.id) : e.name;
      const ic = st.mode === 'tf' ? TW.transformIcon(e.id) : TW.iconSheet(st.ci, st.cat === 'hair' ? 'h' : 'i', e.id);
      const nm = `<div class="nm" title="${esc(tag + name)}">${esc(tag + name)}</div>`;
      d.innerHTML = nm + ((st.cat === 'hair' ? e.alt : st.full && skipped(e)) ? '<span class="new hid" title="숨긴 아이템">Hidden</span>'
                         : e.new || st.cat === 'new' || (st.cat !== 'hair' && inNew(e)) ? '<span class="new" title="최근에 추가된 아이템">NEW</span>' : '');
      const tu = st.mode !== 'tf' && tdbIcon(e.slot, e.id);
      if (st.cat === 'hair' && st.mode !== 'tf') { dyeDots(d, e); cardIcon(d, e); }
      else if (tu) {                                           // TalesDB icon; if its own file cannot load, the exported icon instead
        d.insertAdjacentHTML('beforeend', `<div class="ic tdbbox" style="width:76px;height:76px;left:18px;top:5px">${tdbHtml(tu)}</div>`);
        const box = d.querySelector('.ic'), img = box.querySelector('img');
        if (img) img.onerror = () => { box.remove(); if (ic) d.insertAdjacentHTML('beforeend', sheetBox(ic)); else { d.insertAdjacentHTML('beforeend', `<div class="ic live" style="width:76px;height:76px;left:18px;top:5px"></div>`); liveIcon(d.querySelector('.ic.live'), e, 76); } };
      }
      else if (ic) d.insertAdjacentHTML('beforeend', sheetBox(ic));
      else { d.insertAdjacentHTML('beforeend', `<div class="ic live" style="width:76px;height:76px;left:18px;top:5px"></div>`); liveIcon(d.querySelector('.ic'), e, 76); }
      d.onclick = () => pick(e);
      g.appendChild(d);
    }
  }
  // the icon box is exactly one sheet cell, so neighbouring icons never show through
  const sheetBox = ic => `<div class="ic sheet" style="width:${ic.w}px;height:${ic.h}px;left:${(112 - ic.w) / 2}px;top:${5 + (76 - ic.h) / 2}px;background-image:url('${ic.url}');background-position:${-ic.x}px ${-ic.y}px"></div>`;
  // hair cards: the style's dyes as colour dots, 3 on each side of the preview. A dot puts the style on with that dye
  // (the same dot again = undyed); the card preview shows the style's last dye.
  function dyeDots(d, e) {
    TW.dyes(e.id).forEach(([name, sw], k) => {
      const b = document.createElement('button'); b.className = 'dye ' + (k < 3 ? 'l' : 'r'); b.dataset.k = k + 1;
      b.style.top = (13 + (k % 3) * 22) + 'px'; b.style.background = '#' + sw; b.title = `${k + 1}. ${name}`;
      b.onclick = ev => {
        ev.stopPropagation();
        st.dyeBy[e.id] = st.hair === e.id && st.dye === k + 1 ? 0 : k + 1;
        st.hair = e.id; st.hairHidden = false; st.dye = st.dyeBy[e.id];
        cardIcon(d, e); markSelected(); refresh();
      };
      d.appendChild(b);
    });
  }
  function cardIcon(d, e) {
    const k = st.dyeBy[e.id] || 0, old = d.querySelector('.ic'); if (old) old.remove();
    d.querySelectorAll('.dye').forEach(b => b.classList.toggle('on', +b.dataset.k === k));
    const ic = k ? null : TW.iconSheet(st.ci, 'h', e.id);
    if (ic) { d.insertAdjacentHTML('afterbegin', sheetBox(ic)); return; }
    const box = document.createElement('div'); box.className = 'ic live'; box.style.cssText = 'width:76px;height:76px;left:18px;top:5px';
    d.prepend(box); liveIcon(box, Object.assign({}, e, { slot: 'hair', dye: k }), 76);
  }
  // an item / hair style that is not in the icon sheets (added after the last TW_WebExport), or a dyed hair: drawn in the browser
  async function liveIcon(box, e, size) {
    try {
      const cv = st.cat === 'hair' || e.slot === 'hair' ? await TW.hairIcon(st.ci, e.id, e.dye || 0) : await TW.itemIcon(st.ci, e.id);
      if (!cv || !box.isConnected) return;
      const f = Math.min(1, size / Math.max(cv.width, cv.height)); cv.style.width = Math.round(cv.width * f) + 'px'; cv.style.height = Math.round(cv.height * f) + 'px';
      cv.style.position = 'absolute'; cv.style.left = Math.round((size - cv.width * f) / 2) + 'px'; cv.style.top = Math.round((size - cv.height * f) / 2) + 'px';
      box.appendChild(cv);
    } catch (err) { console.warn('icon', e.id, err); }
  }
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  function markSelected() {
    if (st.cat === 'bg') { root.querySelectorAll('#grid .card[data-bg]').forEach(d => d.classList.toggle('on', d.dataset.bg === st.bg)); bgButton(); return; }
    const on = new Set(st.mode === 'tf' ? [st.tf] : Object.values(st.equip)); if (st.cat === 'hair') on.add(st.hair);
    root.querySelectorAll('#grid .card').forEach(d => d.classList.toggle('on', on.has(+d.dataset.id)));
  }
  async function pick(e) {
    if (st.cat === 'bg' && st.mode !== 'tf') {
      st.bg = st.bg === e.id ? '' : e.id; st.bgAt = [0, 0];               // 다른 배경이면 캐릭터를 배경 한가운데로
      markSelected(); bgImage(st.bg); if (st.lastPose) anchor = viewAnchor(st.lastPose); drawNow(); saveSession(); return;
    }
    if (st.mode === 'tf') { st.tf = e.id; markSelected(); await tfAnimsReady(e.id); if (st.tf !== e.id) return; tfMotionButtons(); fitTransformMotion(e.id); refresh(); return; }
    if (st.cat === 'hair') { st.hair = e.id; st.hairHidden = false; st.dye = st.dyeBy[e.id] || 0; markSelected(); refresh(); return; }
    const slot = e.slot, old = st.equip[slot];
    if (old === e.id) { delete st.equip[slot]; st.hidden.delete(e.id); }
    else {
      if (old) st.hidden.delete(old);
      st.equip[slot] = e.id; st.hidden.delete(e.id);
      if (slot === 'weapon' || slot === 'sub') {
        if (st.motion === 0 && TW.S.index.chars[st.ci].motions.includes(1)) { st.motion = 1; st.tick = 0; syncGroup($('motions'), () => st.motion); status('무기 애니메이션에는 기본(0) 프레임이 없어 동작을 1(필드)로 바꿨습니다.'); }
      } else {
        if (slot === 'head') { st.hairMode = settings.hatHairModes[e.id] || 'all'; syncHair(); }
        const tr = TW.S.extras.transforms[e.id];
        if (tr) {
          const ms = Object.keys(tr.motions).map(Number);
          if (ms.length && !ms.includes(st.motion)) { const m = ms.includes(14) ? 14 : Math.min(...ms); st.motion = m; st.tick = 0; syncGroup($('motions'), () => st.motion); status(`이 변신 아이템은 동작 [${ms.join(', ')}] 에서만 적용됩니다. 동작을 ${m}(${TW.S.index.motion_names[m] || ''})로 바꿨습니다.`); }
        }
      }
    }
    markSelected(); refresh();
  }

  // ---------------------------------------------------------------- slots
  function buildSlots(idx) {
    const el = $('slots'); el.innerHTML = '';
    let short = { hair: '헤어', head: '투구 확장', face: '머리 확장', body: '몸 확장', back: '효과 확장', foot: '다리 확장', costume: '확장 의상', transform: '변신', weapon: '무기', sub: '보조' };
    const have = new Set(['hair', ...idx.slots.map(s => s.key)]); if (!hasSub()) have.delete('sub');
    if (SUB_LABEL[idx.chars[st.ci].name]) short = Object.assign({}, short, { sub: SUB_LABEL[idx.chars[st.ci].name] });
    for (const key of SLOT_ORDER.filter(k => have.has(k))) {
      const d = document.createElement('div'); d.className = 'slot'; d.dataset.key = key; d.dataset.short = short[key] || key;
      d.innerHTML = `<input type="checkbox" checked title="그리기 (체크를 끄면 그리지 않고, 랜덤에서도 빼 둡니다)"><div class="lb">${short[key] || key}</div><div class="ic" title="더블클릭 = 벗기"></div><div class="nm"></div>`;
      d.querySelector('.ic').ondblclick = () => { if (key === 'hair') st.hair = -1; else { const id = st.equip[key]; delete st.equip[key]; st.hidden.delete(id); } markSelected(); refresh(); };
      d.querySelector('input').onchange = ev => { randOffSet(key, !ev.target.checked); if (key === 'hair') st.hairHidden = !ev.target.checked; else { const id = st.equip[key]; if (id) { if (ev.target.checked) st.hidden.delete(id); else st.hidden.add(id); } } refresh(); };
      el.appendChild(d);
    }
    // 마지막 칸: 위 = 랜덤 입히기, 아래 = 전부 해제 (칸 수를 늘리지 않으려고 한 칸을 둘로 나눴다, 2026-11-19)
    const acts = document.createElement('div'); acts.className = 'slot-acts';
    const r = document.createElement('button'); r.type = 'button'; r.className = 'slot-act';
    r.innerHTML = '<span class="sym">🎲</span><span class="t">랜덤</span>'; r.dataset.rand = '1'; syncRandBtn(r);
    // 연달아 누르면 한 번에 20~30개씩 받는 요청이 쌓인다 (WAF 는 한 IP 가 5분에 받는 자료 수를 센다): 그림이 다 뜰 때까지,
    // 적어도 RAND_LOCK_MS 동안은 단추를 잠근다 (2026-11-19 사용자)
    r.onclick = async () => {
      if (r.disabled) return;
      r.disabled = true; const t0 = Date.now();
      try { await randomLook(); } catch (e) { console.error(e); }
      setTimeout(() => { r.disabled = false; }, Math.max(0, RAND_LOCK_MS - (Date.now() - t0)));
    };
    const c = document.createElement('button'); c.type = 'button'; c.className = 'slot-act'; c.title = '착용한 아이템을 전부 벗습니다';
    c.innerHTML = '<span class="sym">⟲</span><span>전부 해제</span>';
    c.onclick = () => {
      st.equip = {}; st.hidden.clear(); st.cdye = {}; st.bdye = {}; st.hair = TW.S.index.chars[st.ci].default_hair; st.hairHidden = false; st.hairMode = 'all';
      for (const k of [...randOff]) randOffSet(k, false);     // 체크도 처음처럼 전부 켠다
      st.dye = 0; st.dyeBy[st.hair] = 0; const cd = root.querySelector(`#grid .card[data-id="${st.hair}"]`); if (cd && st.cat === 'hair') cardIcon(cd, st.char.hairById[st.hair]);
      syncHair(); markSelected(); refresh();
    };
    acts.append(r, c); el.appendChild(acts);
  }
  // 랜덤 입히기 (2026-11-19 사용자: "그냥 모든 아바타를 랜덤하게 입혀주는거임"): 체크된 칸마다 지금 목록에 나오는 것 가운데 하나를 아무거나 입힌다 (체크를 끈 칸은 그대로).
  //   아바타가 있는 칸은 아바타만 고른다 ([장비] 는 빼고). 숨긴 아이템은 로그인해 목록에 보일 때만 (shown). 헤어는 스타일과 염색을 같이 고른다 (염색 없음도 한 가지). 확장 의상은 부위마다 아무 색으로 염색한다
  //   동작은 되도록 그대로 둔다: 지금 동작에서 그릴 수 없는 변신 아이템 · 의상은 고르지 않는다. 무기는 기본(0) 그림이 없어 하나씩 고를 때(pick)처럼 필드(1)로 바꾼다
  const RAND_LOCK_MS = 1200;
  // 랜덤이 한 칸에서 고르는 범위: 아바타가 있는 칸은 아바타만 ([장비] 는 빼고). [보유 아바타] 창도 같은 범위를 보인다
  const randPool = key => { const all = st.char.items.filter(it => it.slot === key && shown(it)), av = all.filter(it => it.kind === 'avatar'); return av.length ? av : all; };
  function syncRandBtn(b) {
    b = b || root.querySelector('#slots [data-rand]'); if (!b) return;
    const on = settings.randOwn === true;
    b.classList.toggle('own', on); b.querySelector('.t').textContent = on ? '보유 랜덤' : '랜덤';
    b.title = on ? '체크된 칸마다 [보유 아바타] 에 체크해 둔 것 가운데 하나를 아무거나 입힙니다' : '칸마다 아바타를 아무거나 하나씩 입힙니다';
  }
  function randomLook() {
    if (st.mode === 'tf' || !st.char) return;
    const c = st.char, any = a => a[Math.floor(Math.random() * a.length)];
    // 체크된 칸만 돌린다. 체크를 끈 칸은 입은 것(또는 빈 칸) 그대로 둔다
    const go = [...root.querySelectorAll('#slots .slot')].filter(d => d.querySelector('input').checked).map(d => d.dataset.key);
    if (!go.length) { status('체크된 칸이 없습니다. 돌릴 칸의 체크를 켜 주세요.'); return; }
    // 보유 아바타로만 (settings.randOwn, [보유 아바타] 창): 칸마다 체크해 둔 것 안에서만 고른다. 그 칸에 가진 것이 없으면 벗긴다.
    //   헤어는 체크한 스타일 + 캐릭터 기본 헤어에서 고르고, 헤어를 하나도 체크하지 않았으면 헤어는 그대로 둔다
    const ownOn = settings.randOwn === true;
    if (ownOn && !own.items.size && !own.hair.size) { status('보유 아바타 목록이 비어 있습니다. [보유 아바타] 에서 가진 아바타를 체크해 주세요.'); ownOpen(); return; }
    const raws = Object.fromEntries(go.filter(k => k !== 'hair').map(k => [k, randPool(k)]));
    if (!go.includes('hair') && !Object.values(raws).some(p => p.length)) { status('아이템 목록을 받는 중입니다. 잠시 뒤에 다시 눌러 주세요.'); return; }
    // 보유 랜덤의 무기 칸은 일반 무기([장비])도 고른다 (보유 목록에 일반 무기가 있다, 2026-11-19 사용자). 그냥 랜덤은 전처럼 확장 무기만
    const ownPool = (k, p) => (k === 'weapon' ? c.items.filter(it => it.slot === 'weapon' && shown(it)) : p).filter(it => own.items.has(it.id));
    const pools = Object.fromEntries(Object.entries(raws).map(([k, p]) => [k, ownOn ? ownPool(k, p) : p]));
    // 무기 · 보조를 들게 되면 (새로 고르거나, 체크를 끈 채 그려지고 있거나) 기본(0) 동작은 필드(1)로
    const held = k => (go.includes(k) ? (pools[k] || []).length > 0 : !!st.equip[k] && !st.hidden.has(st.equip[k]));
    let motion = st.motion;
    if (motion === 0 && (held('weapon') || held('sub')) && TW.S.index.chars[st.ci].motions.includes(1)) motion = 1;
    const fits = it => { const tr = TW.S.extras.transforms[it.id], ms = tr ? Object.keys(tr.motions).map(Number) : []; return !ms.length || ms.includes(motion); };
    for (const key of go) {
      if (key === 'hair') {                                  // 스타일 + 염색 (0 = 원래 색, 1.. = 그 스타일의 염색)
        if (ownOn && !own.hair.size) continue;
        const def = TW.S.index.chars[st.ci].default_hair;
        const h = any(ownOn ? c.hair.filter(x => own.hair.has(x.id) || x.id === def) : c.hair); if (!h) continue;
        st.hair = h.id; st.dye = Math.floor(Math.random() * (TW.dyes(h.id).length + 1)); st.dyeBy[h.id] = st.dye;
        const cd = st.cat === 'hair' && root.querySelector(`#grid .card[data-id="${h.id}"]`); if (cd) cardIcon(cd, h);
        continue;
      }
      const ok = pools[key].filter(fits), e = any(ok.length ? ok : []);
      if (e) st.equip[key] = e.id; else delete st.equip[key];
    }
    if (go.includes('head')) st.hairMode = st.equip.head ? settings.hatHairModes[st.equip.head] || 'all' : 'all';
    if (go.includes('costume')) st.rawCostume = null;
    // 확장 의상 염색: 부위마다 아무 색 (자유 색이라 색상은 아무거나, 너무 탁하거나 하얗게 날아가지 않게 채도 · 밝기만 가운데로). 기본 외형 바꾸기 · 염색 못 하는 옷은 그대로
    const cos = go.includes('costume') && st.equip.costume, cparts = cos && !NO_DYE.has(cos) && !isLook(cos) ? TW.costumeDyes(cos) : [];
    if (cparts.length) {
      const hex = () => {
        const h = Math.random() * 360, sat = 0.35 + Math.random() * 0.55, l = 0.3 + Math.random() * 0.45, a = sat * Math.min(l, 1 - l);
        const f = n => { const k = (n + h / 30) % 12; return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))).toString(16).padStart(2, '0'); };
        return f(0) + f(8) + f(4);
      };
      const cur = st.cdye[cos] || (st.cdye[cos] = {});          // 염색 창이 이 객체를 들고 있으므로 바꿔 끼우지 않고 채운다
      cparts.forEach((part, k) => { cur[k] = hex(); });
      $('cdye').dataset.iid = '';                               // 같은 옷이 또 나와도 염색 창의 색 칸을 다시 그리게
    }
    const drawn = k => !!st.equip[k] && !st.hidden.has(st.equip[k]);
    if (motion !== st.motion && (drawn('weapon') || drawn('sub'))) { st.motion = motion; st.tick = 0; syncGroup($('motions'), () => st.motion); }
    syncHair(); markSelected(); return refresh();   // 그림이 다 뜨면 끝난다 (단추 잠금이 이것을 기다린다)
  }
  const SLOT_IC = 30;                                       // 입은 칸의 그림 크기 (css .slot .ic)
  function refreshSlots() {
    if (st.mode === 'tf') return;
    const short = {};
    root.querySelectorAll('#slots .slot').forEach(d => {
      const key = d.dataset.key, ic = d.querySelector('.ic'), cb = d.querySelector('input'), lb = d.querySelector('.lb'), nm = d.querySelector('.nm');
      let id = key === 'hair' ? st.hair : st.equip[key], name = '';
      if (key === 'hair' && id >= 0) { const h = st.char.hairById[id], dn = st.dye ? (TW.dyes(id)[st.dye - 1] || [])[0] : ''; name = (h ? hairLabel(id) : String(id)) + (dn ? ` (${dn})` : ''); }
      else if (key !== 'hair' && id) { const it = st.char.byId[id]; name = it ? it.name : String(id); }
      d.classList.toggle('filled', !!name);
      if (!name) { ic.style.backgroundImage = ''; ic.style.clipPath = ''; ic.innerHTML = ''; ic.classList.remove('tdbbox'); ic.title = d.dataset.short + ': 비어 있음'; cb.checked = !randOff.has(key); nm.textContent = ''; nm.title = ''; return; }
      const rec = key === 'hair' ? st.char.hairById[id] : st.char.byId[id];
      const B = SLOT_IC, sh = key === 'hair' && st.dye ? null : TW.iconSheet(st.ci, key === 'hair' ? 'h' : 'i', id);
      ic.innerHTML = '';
      const tu = key !== 'hair' && tdbIcon(key, id);
      if (tu) {                                                // TalesDB icon in the slot too
        ic.style.backgroundImage = ''; ic.style.clipPath = ''; ic.classList.add('tdbbox'); ic.innerHTML = tdbHtml(tu); ic.title = name;
        cb.checked = !st.hidden.has(id); nm.textContent = name; nm.title = d.dataset.short + ': ' + name; return;
      }
      ic.classList.remove('tdbbox');
      if (!sh) { ic.style.backgroundImage = ''; ic.style.clipPath = ''; liveIcon(ic, key === 'hair' ? { id, slot: 'hair', dye: st.dye } : rec, B); cb.checked = key === 'hair' ? !st.hairHidden : !st.hidden.has(id); nm.textContent = name; nm.title = d.dataset.short + ': ' + name; return; }
      const f = B / Math.max(sh.w, sh.h);   // one cell scaled into the box
      const sheetW = TW.S.index.icon.cols * sh.w;
      ic.style.backgroundImage = `url('${sh.url}')`; ic.style.backgroundSize = `${sheetW * f}px auto`;
      ic.style.backgroundPosition = `${-sh.x * f + (B - sh.w * f) / 2}px ${-sh.y * f + (B - sh.h * f) / 2}px`;
      ic.style.clipPath = `inset(${(B - sh.h * f) / 2}px ${(B - sh.w * f) / 2}px)`; ic.title = name;
      cb.checked = key === 'hair' ? !st.hairHidden : !st.hidden.has(id);
      nm.textContent = name; nm.title = d.dataset.short + ': ' + name;
    });
  }

  // ---------------------------------------------------------------- presets
  // the dye choices are copied in and out: the saved preset must not follow later changes (settings are saved again later)
  const copy = o => JSON.parse(JSON.stringify(o));
  function preset(n, save) {
    if (!save && !settings.presets[n]) save = true;
    if (save) {
      settings.presets[n] = { char: st.ci, hair: st.hair, dye: st.dye, hairMode: st.hairMode, items: Object.values(st.equip), hidden: [...st.hidden], cdye: copy(st.cdye), bdye: copy(st.bdye), eye: st.eye, eyeDye: st.eyeDye, lip: st.lip, lipDye: st.lipDye }; saveLS();
      status(`프리셋 ${n} 저장: ${TW.S.index.chars[st.ci].name}, 헤어 ${st.hair}, 아이템 ${Object.keys(st.equip).length}개`); return;
    }
    const p = settings.presets[n];
    if (!listKnown) { status('아이템 목록을 불러오는 중입니다. 잠시 뒤에 다시 눌러 주세요.'); return; }   // see loadList
    if (p.char !== st.ci) { status(`프리셋 ${n}은 ${TW.S.index.chars[p.char].name} 것입니다. 먼저 그 캐릭터로 바꾸세요.`); return; }
    st.equip = {}; st.hidden = new Set(p.hidden || []); st.cdye = copy(p.cdye || {}); st.bdye = copy(p.bdye || {}); $('cdye').dataset.iid = '';
    st.eye = p.eye || 0; st.eyeDye = p.eyeDye ?? -1; st.lip = !!p.lip; st.lipDye = p.lipDye ?? -1; $('face').dataset.ci = '';   // the 꾸미기 window is built anew too   // the 염색 window is built anew on the loaded choices
    for (const id of p.items) { const it = st.char.byId[id]; if (it && shown(it)) st.equip[it.slot] = id; }   // a hidden item saved with the code open stays off
    st.hair = st.char.hairById[p.hair] ? p.hair : st.hair; st.dye = st.hair === p.hair ? p.dye || 0 : 0; st.dyeBy[st.hair] = st.dye; st.hairHidden = false; st.hairMode = p.hairMode || 'all';
    syncHair(); markSelected(); refresh(); status(`프리셋 ${n} 불러옴`);
  }

  // ---------------------------------------------------------------- preview
  // 로컬에서만 (localhost): 입은 확장 의상의 애니메이션에 들어 있는 동작을 모두 단추로 ('의상 동작'). 누르면 DB 0293 동작표를
  // 거치지 않고 그 동작 번호를 그대로 튼다 (pose.raw). 게임 화면과 견줘 보려고 (2026-11-03 사용자). 사이트에는 보이지 않는다
  const LOCAL_VIEW = ['localhost', '127.0.0.1'].includes(location.hostname);
  st.rawCostume = null;
  const costumeTf = () => (st.mode !== 'tf' && st.equip.costume ? TW.S.extras.transforms[st.equip.costume] : null);
  const rawCostumeOn = () => LOCAL_VIEW && st.rawCostume !== null && !!costumeTf();
  let cmotionsKey = '';
  async function costumeMotionButtons() {
    if (!LOCAL_VIEW) return;
    const tr = costumeTf(), box = $('cmotions'), title = $('cmotionsTitle');
    if (!tr) { st.rawCostume = null; cmotionsKey = ''; box.classList.add('hidden'); title.classList.add('hidden'); syncGroup($('motions'), () => st.motion); return; }
    const key = `${st.equip.costume}|${tr.anim}`;
    if (key !== cmotionsKey) {
      await TW.loadAnim(tr.anim).catch(() => null);
      const A = TW.S.anims[tr.anim], ms = A ? Object.keys(A.m).map(Number).sort((a, b) => a - b) : [];
      const names = TW.S.index.motion_names;
      group(box, ms.map(m => [m, `${m} ${names[m] || ''}`.trim(), `의상 애니메이션의 동작 ${m}을 그대로`]), v => { st.rawCostume = +v; st.tick = 0; refresh(); }, () => (rawCostumeOn() ? st.rawCostume : null));
      if (st.rawCostume !== null && !ms.includes(st.rawCostume)) st.rawCostume = null;
      cmotionsKey = key;
    }
    box.classList.remove('hidden'); title.classList.remove('hidden');
    syncGroup(box, () => (rawCostumeOn() ? st.rawCostume : null));
    syncGroup($('motions'), () => (rawCostumeOn() ? null : st.motion));
  }
  // 걷기는 기본 의상(맨몸 · 기본 외형 바꾸기)에만: 확장 의상에는 걷는 그림이 없다 - DB 0293 동작표가 걷기를 달리기로 보내고, 옷의
  // '걷기' 동작이 있어도 달리기와 같은 그림이다 (2026-11-03 사용자). 확장 의상을 입으면 걷기 단추를 숨기고 걷던 중이면 달리기로
  function syncWalk() {
    const b = $('motions') && $('motions').querySelector('.btn[data-v="2"]'); if (!b || st.mode === 'tf') return;
    const tr = costumeTf(), noWalk = !!tr && !tr.look;
    b.classList.toggle('hidden', noWalk);
    if (noWalk && st.motion === 2) { st.motion = 3; st.tick = 0; syncGroup($('motions'), () => (rawCostumeOn() ? null : st.motion)); }
  }
  function pose() {
    if (rawCostumeOn()) return { char: st.ci, motion: st.rawCostume, dir: st.dir, hair: st.hairHidden ? -1 : st.hair, dye: st.dye, items: Object.values(st.equip), hairMode: st.hairMode, hidden: st.hidden,
             cdye: st.equip.costume && !NO_DYE.has(st.equip.costume) ? st.cdye[st.equip.costume] || null : null, eye: st.eye, eyeDye: st.eyeDye, lip: st.lip, lipDye: st.lipDye, weaponFx: settings.weaponFx !== false, raw: true };
    if (st.mode === 'tf') return { char: st.ci, motion: st.motion, dir: st.dir, hair: -1, items: st.tf ? [st.tf] : [], hairMode: 'all', hidden: new Set(), raw: true };
    return { char: st.ci, motion: st.motion, dir: st.dir, hair: st.hairHidden ? -1 : st.hair, dye: st.dye, items: Object.values(st.equip), hairMode: st.hairMode, hidden: st.hidden,
             cdye: st.equip.costume && !NO_DYE.has(st.equip.costume) ? st.cdye[st.equip.costume] || null : null, bdye: ownOutfit() ? st.bdye : null,
             eye: st.eye, eyeDye: st.eyeDye, lip: st.lip, lipDye: st.lipDye, weaponFx: settings.weaponFx !== false };
  }
  // 광선 켜짐/꺼짐: 예프넨 소드셰이프의 광선 (compose.js WEAPON_BEAM) - 예프넨일 때만 보이고, 이 브라우저에 기억한다
  function syncWeaponFx() {
    const b = $('weaponFx'); if (!b) return;
    if ($('beamBox')) $('beamBox').classList.toggle('hidden', !(st.char && st.char.name === '예프넨'));
    const on = settings.weaponFx !== false;
    b.classList.toggle('on', on); b.classList.toggle('off', !on); b.textContent = on ? '켜짐' : '꺼짐';
  }
  function setDir(d) { st.dir = d; refresh(); }
  function stepDir(s) { const o = TW.S.index.dir_order; setDir(o[(o.indexOf(st.dir) + s + o.length) % o.length]); }
  function stepMotion(s) { const ms = st.mode === 'tf' ? tfMotions(st.tf) : TW.S.index.chars[st.ci].motions; st.motion = ms[(ms.indexOf(st.motion) + s + ms.length) % ms.length]; st.tick = 0; syncGroup($('motions'), () => st.motion); refresh(); }
  // ---------------------------------------------------------------- stage zoom / pan
  // st.zoom = the drawing scale in whole steps (pixels stay square; 1.5x etc. drew some pixels wider than others); st.pan = how far the picture was dragged from its
  // centred place, in canvas pixels. Mouse wheel: zoom about the pointer; drag: move the picture; double click: back to
  // 2x in the middle. − / 배율 / + under the 헤어 toggles do the same (the 배율 button resets)
  const ZOOM_STEP = 1, ZOOMS = [1, 2, 3, 4, 5], ZOOM_DEFAULT = 2;   // 1x ~ 5x
  function viewAnchor(p, z = st.zoom) {
    const a = TW.centeredAnchor(p, VIEW[0] / z, VIEW[1] / z), b = bgOn() ? st.bgAt : [0, 0];
    return [a[0] + st.pan[0] / z + b[0], a[1] + st.pan[1] / z + b[1]];
  }
  // at = [x, y] canvas pixels to keep still (the pointer); none = about the centre
  function setZoom(z, at) {
    z = Math.max(ZOOMS[0], Math.min(ZOOMS[ZOOMS.length - 1], z));
    if (z === st.zoom) return;
    if (at && anchor && st.lastPose) {
      const wx = at[0] / st.zoom - anchor[0], wy = at[1] / st.zoom - anchor[1];       // the figure point under the pointer
      const a0 = TW.centeredAnchor(st.lastPose, VIEW[0] / z, VIEW[1] / z), b = bgOn() ? st.bgAt : [0, 0];
      st.pan = [(at[0] / z - wx - a0[0] - b[0]) * z, (at[1] / z - wy - a0[1] - b[1]) * z];
    } else st.pan = st.pan.map(v => v * z / st.zoom);
    st.zoom = z; settings.zoom = z; saveLS(); syncZoom(); applyZoom();
  }
  function resetView() { st.pan = [0, 0]; if (st.zoom !== ZOOM_DEFAULT) setZoom(ZOOM_DEFAULT); else applyZoom(); }
  function syncZoom() {
    const el = $('zoomCtl'); if (!el) return;
    el.querySelector('.lbl').textContent = st.zoom + 'x';
    el.querySelector('[data-z="-1"]').disabled = st.zoom <= ZOOMS[0];
    el.querySelector('[data-z="1"]').disabled = st.zoom >= ZOOMS[ZOOMS.length - 1];
  }
  // 캔버스 픽셀 [x, y] 가 캐릭터 위인가: 몸통 · 헤어 · 얼굴 조각을 감싼 네모 (조금 넉넉하게)
  function onFigure([x, y]) {
    if (!anchor || !st.lastPose) return false;
    const b = TW.bounds(TW.compose(st.lastPose, st.tick).filter(l => SHOT_CORE.test(l.tag)));
    if (!b) return false;
    const z = st.zoom, m = 6;
    return x >= (anchor[0] + b.minx - m) * z && x <= (anchor[0] + b.maxx + m) * z && y >= (anchor[1] + b.miny - m) * z && y <= (anchor[1] + b.maxy + m) * z;
  }
  function wireStageZoom() {
    const v = $('view');
    const at = e => { const r = v.getBoundingClientRect(); return [(e.clientX - r.left) * VIEW[0] / r.width, (e.clientY - r.top) * VIEW[1] / r.height]; };
    let lastWheel = 0;
    v.addEventListener('wheel', e => {
      e.preventDefault();
      const now = Date.now(); if (now - lastWheel < 90) return;          // a touchpad sends many small steps: one zoom step per flick
      lastWheel = now; setZoom(st.zoom + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP), at(e));
    }, { passive: false });
    v.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      e.preventDefault(); v.setPointerCapture(e.pointerId); v.classList.add('drag');
      let last = at(e);
      // 배경이 깔려 있으면: 캐릭터를 잡으면 캐릭터만 배경 위에서, 그 밖(배경)을 잡으면 카메라(배경 · 캐릭터 모두)를 옮긴다
      const moveChar = bgOn() && onFigure(last);
      v.onpointermove = m => {
        const p = at(m);
        if (moveChar) st.bgAt = bgClamp([st.bgAt[0] + (p[0] - last[0]) / st.zoom, st.bgAt[1] + (p[1] - last[1]) / st.zoom]);   // 배경 위에서 캐릭터만
        else st.pan = [st.pan[0] + p[0] - last[0], st.pan[1] + p[1] - last[1]];
        last = p;
        if (st.lastPose) anchor = viewAnchor(st.lastPose);
        drawNow();
      };
      v.onpointerup = v.onpointercancel = () => { v.onpointermove = null; v.classList.remove('drag'); if (moveChar) saveSession(); };
    });
    // 배경이 깔려 있을 때 캐릭터 위에서는 이동 커서 (잡으면 캐릭터가 움직인다는 표시). 너무 자주 재지 않게 80ms 마다
    let lastHover = 0;
    v.addEventListener('pointermove', e => {
      if (v.onpointermove) return;
      const now = Date.now(); if (now - lastHover < 80) return; lastHover = now;
      v.style.cursor = bgOn() && onFigure(at(e)) ? 'move' : '';
    });
    v.addEventListener('dblclick', resetView);
    $('zoomCtl').querySelectorAll('.btn').forEach(b => b.onclick = () => { const d = +b.dataset.z; if (d) setZoom(st.zoom + d * ZOOM_STEP); else resetView(); });
    syncZoom();
  }
  function applyZoom() { const v = $('view'); v.width = VIEW[0]; v.height = VIEW[1]; if (st.lastPose) anchor = viewAnchor(pose()); drawNow(); }
  let anchor = null;
  // ---------------------------------------------------------------- 염색 window on the stage: the worn 확장 의상 (DB 0351,
  // free colours per part) or, with no 확장 의상, the character's own outfit (DB 0186 / 0068, the game's 10 colours per part)
  // outfits the data lists as dyeable that the game does not let you dye (confirmed in game): no 염색 window for them
  const NO_DYE = new Set([1040556]);                // 멜빵바지 (이스핀)
  // 기본 외형 바꾸기(클로에 연미복, extras look): 확장 의상 칸에 들지만 캐릭터 제 옷처럼 기본 의상 염색을 그대로 쓴다
  const isLook = iid => !!(iid && TW.S.extras && TW.S.extras.transforms[iid] && TW.S.extras.transforms[iid].look);
  const ownOutfit = () => !st.equip.costume || isLook(st.equip.costume);
  function dyePanel() {
    const box = $('cdye'), iid = st.mode !== 'tf' && st.equip.costume, parts = iid && !NO_DYE.has(iid) ? TW.costumeDyes(iid) : [];
    if (st.mode !== 'tf' && ownOutfit()) { basePanel(box); return; }
    if (!parts.length) { box.classList.add('hidden'); return; }
    const cur = st.cdye[iid] || (st.cdye[iid] = {});
    if (box.dataset.iid !== String(iid)) {
      box.dataset.iid = String(iid); box.innerHTML = '';
      dyeChrome(box, '부위별로 색을 고릅니다');
      parts.forEach(([name, , base], k) => {
        const row = document.createElement('div'); row.className = 'row'; if (name.startsWith('머리')) row.dataset.hairPart = '1';
        // the part's colour: a swatch opening colorPicker (the colour applies while picking and stays when the picker
        // closes; Esc puts the old one back, × clears the part)
        const sw = document.createElement('button'); sw.className = 'sw'; sw.title = name;
        const show = () => { sw.style.background = '#' + (cur[k] || 'ffffff'); sw.classList.toggle('unset', !cur[k]); };
        show();
        sw.onclick = () => {
          const before = cur[k]; let last = 0;
          colorPicker(sw, cur[k] || 'ffffff',
            hex => { cur[k] = hex; show(); const now = Date.now(); if (now - last > 120) { last = now; drawNow(); } },
            hex => { if (hex) cur[k] = hex; else if (before) cur[k] = before; else delete cur[k]; show(); refresh(); },
            {});
        };
        const nm = document.createElement('span'); nm.textContent = name; nm.title = name;   // cut short by css: whole on hover
        const x = document.createElement('button'); x.className = 'x'; x.textContent = '×'; x.title = '이 부위 염색 지우기';
        x.onclick = () => { delete cur[k]; show(); refresh(); };
        row.appendChild(sw); row.appendChild(nm); row.appendChild(x); box.appendChild(row);
      });
      box.appendChild(findButton());
      const all = document.createElement('button'); all.className = 'btn foot'; all.textContent = '전부 지우기';
      all.onclick = () => { st.cdye[iid] = {}; box.dataset.iid = ''; dyePanel(); refresh(); }; box.appendChild(all);
    }
    // a chosen hair style replaces the outfit's painted hair: its '머리' part is not dyed then (compose.js)
    const hairOn = st.hair >= 0 && !st.hairHidden;
    box.querySelectorAll('.row[data-hair-part]').forEach(r => { r.classList.toggle('off', hairOn); r.title = hairOn ? '헤어를 골라서 의상의 머리 대신 그 헤어가 보입니다. 헤어를 벗기면 이 염색이 적용됩니다' : ''; });
    box.classList.remove('hidden'); placeDye();
  }
  // 창을 끄는 범위: 무대 밖, 시뮬레이터 전체(호스트) 안까지 간다. 자리는 무대 기준이라 왼쪽·위로 나가면 음수다
  const lim = (v, a, b) => Math.max(a, Math.min(b, v));
  function winRange(box, w, h) {
    const S = box.parentElement.getBoundingClientRect(), H = root.host.getBoundingClientRect();
    return { S, x0: H.left - S.left, x1: H.right - S.left - w, y0: H.top - S.top, y1: H.bottom - S.top - h };
  }
  // the window's frame: the 염색 button (closed) and, open, a title bar to drag it around with × at its right
  // end closing it back to the button
  function dyeChrome(box, title) {
    box.classList.toggle('closed', !st.cdyeOpen);
    const head = document.createElement('button'); head.className = 'btn head'; head.textContent = '염색'; head.title = title;
    head.onclick = () => { st.cdyeOpen = true; box.classList.remove('closed'); placeDye(); }; box.appendChild(head);
    const bar = document.createElement('div'); bar.className = 'bar'; bar.title = '끌어서 옮기기';
    const ttl = document.createElement('span'); ttl.textContent = '염색';
    const cls = document.createElement('button'); cls.className = 'close'; cls.textContent = '×'; cls.title = '닫기';
    // 염색 창을 닫으면 거기서 연 색상 찾기 창도 같이 닫는다
    cls.onclick = () => { st.cdyeOpen = false; box.classList.add('closed'); placeDye(); st.findOpen = false; findPanel(); };
    bar.onpointerdown = ev => {
      if (ev.button !== 0 || ev.target === cls) return;
      ev.preventDefault(); bar.setPointerCapture(ev.pointerId);
      const B = box.getBoundingClientRect(), dx = ev.clientX - B.left, dy = ev.clientY - B.top;
      const R = winRange(box, B.width, B.height);
      bar.onpointermove = e => {
        st.cdyePos = { x: lim(e.clientX - R.S.left - dx, R.x0, R.x1), y: lim(e.clientY - R.S.top - dy, R.y0, R.y1) };
        placeDye();
      };
      bar.onpointerup = bar.onpointercancel = () => { bar.onpointermove = null; };
    };
    bar.appendChild(ttl); bar.appendChild(cls); box.appendChild(bar);
  }
  // 기본 의상 염색: the same window as 확장 의상 염색 (per part a swatch opening colorPicker, × = undyed), the picker
  // also offering the game's colours of that part (up to 10 presets): a preset keeps the game's own shading, a colour
  // picked freely gets the part's shading (compose.js partRamp: colour + DB 0186 ramp - its first entry). The part called
  // 머리 is the hair: the body has none, but the hair style is drawn with the same palette indices, so it colours the worn
  // hair while no hair dye is chosen (compose.js)
  const presetSwatch = ramp => { const ks = Object.keys(ramp).map(Number).sort((a, b) => a - b); return ramp[ks[Math.floor(ks.length * 0.45)]] || 'ffffff'; };
  function basePanel(box) {
    const parts = TW.baseDyes(st.ci).map((p, k) => [p, k]);
    if (!parts.length) { box.classList.add('hidden'); box.dataset.iid = ''; return; }
    if (box.dataset.iid !== 'base' + st.ci) {
      box.dataset.iid = 'base' + st.ci; box.innerHTML = '';
      dyeChrome(box, '부위별로 색을 고릅니다');
      for (const [[name, , presets, order, names], k] of parts) {
        // the presets in the order the shop sells the dyes (basedye.json: columns without a dye item last), named by the dye
        const pre = (order || presets.map((_, j) => j)).filter(j => presets[j])
          .map((j, pos) => ({ value: j, hex: presetSwatch(presets[j]), title: (names && names[j]) || `${pos + 1}번 색` }));
        const row = document.createElement('div'); row.className = 'row'; row.dataset.k = k;
        const sw = document.createElement('button'); sw.className = 'sw';
        // the swatch shows the part's current dye (st.bdye[k]: a preset index or 'rrggbb'); kept in step by basePanel
        row.show = () => {
          const v = st.bdye[k], p = pre.find(q => q.value === v);
          sw.style.background = '#' + (typeof v === 'string' ? v : p ? p.hex : 'ffffff'); sw.classList.toggle('unset', v === undefined);
          sw.title = v === undefined ? name : `${name} · ${typeof v === 'string' ? '#' + v : p ? p.title : ''}`;
        };
        sw.onclick = () => {
          const before = st.bdye[k], p = pre.find(q => q.value === before); let last = 0;
          const set = (hex, preset) => { st.bdye[k] = preset !== undefined ? preset : hex; row.show(); };
          colorPicker(sw, typeof before === 'string' ? before : p ? p.hex : 'ffffff',
            (hex, preset) => { set(hex, preset); const now = Date.now(); if (now - last > 120) { last = now; drawNow(); } },
            (hex, preset) => {
              if (hex) set(hex, preset); else if (before !== undefined) st.bdye[k] = before; else delete st.bdye[k];
              if (hex && name === '머리') st.dye = 0;     // a hair dye would cover it
              row.show(); refresh();
            },
            { presets: pre, preset: p ? before : undefined });
        };
        const nm = document.createElement('span'); nm.textContent = name; nm.title = name;   // cut short by css: whole on hover
        const x = document.createElement('button'); x.className = 'x'; x.textContent = '×'; x.title = '이 부위 염색 지우기';
        x.onclick = () => { delete st.bdye[k]; row.show(); refresh(); };
        row.appendChild(sw); row.appendChild(nm); row.appendChild(x); box.appendChild(row);
      }
      box.appendChild(findButton());
      const all = document.createElement('button'); all.className = 'btn foot'; all.textContent = '전부 지우기';
      all.onclick = () => { st.bdye = {}; refresh(); }; box.appendChild(all);
    }
    box.querySelectorAll('.row').forEach(r => r.show());
    box.classList.remove('hidden'); placeDye();
  }
  // ---------------------------------------------------------------- 색상 찾기 (염색 창의 '색상 찾기')
  // 염색은 고른 색 하나가 아니라 부위의 명암 띠를 통째로 칠한다. 고른 색이 그대로 들어가는 자리는 기본 의상은
  // 첫 칸, 확장 의상도 첫 칸뿐이라, 화면에서 집은 색을 그대로 넣는다고 그 색이 나오지는 않는다. 목표 색을
  // 정하면 지금 입은 옷의 부위마다 '그 부위가 그 색으로 보이려면 무엇을 넣어야 하는지'를 거꾸로 찾아 적고,
  // 누르면 그대로 넣는다. 낼 수 없는 색이면 가장 가까운 색과 그 차이를 적는다
  const FIND_NEAR = 4;                               // 이보다 멀면 '낼 수 없는 색'으로 본다 (눈에 띄는 차이)
  // 못 가는 까닭: 밝기가 모자라거나 넘치는 것인지, 색 자체가 안 나오는 것인지
  function whyFar(got, want) {
    const a = oklab(hex2rgb(got)), b = oklab(hex2rgb(want));
    const dl = a[0] - b[0], dc = Math.hypot(a[1] - b[1], a[2] - b[2]);
    if (Math.abs(dl) < dc * 1.5) return '그 색까지는 못 갑니다.';
    return dl < 0 ? '이 부위는 어두운 명암만 써서 더 밝아지지 않습니다.' : '이 부위는 밝은 명암만 써서 더 어두워지지 않습니다.';
  }
  // 부위 이름 뒤의 은/는: 받침이 있으면 '은' (옷은, 바지는)
  const eun = w => { const c = w.charCodeAt(w.length - 1); return w + (c >= 0xac00 && c <= 0xd7a3 && (c - 0xac00) % 28 ? '은' : '는'); };
  function findButton() {
    const b = document.createElement('button'); b.className = 'btn foot findbtn'; b.textContent = '색상 찾기';
    b.title = '원하는 색을 내려면 어느 부위에 무엇을 넣어야 하는지 찾습니다 (다시 누르면 닫힙니다)';
    b.classList.toggle('on', !!st.findOpen);
    // 한 번 더 누르면 닫는다. 열 때는 끌어다 둔 자리를 잊고 늘 염색 창 아래에 뜬다
    b.onclick = () => { st.findOpen = !st.findOpen; if (st.findOpen) st.findPos = null; findPanel(); };
    return b;
  }
  // 지금 염색할 수 있는 부위들: 확장 의상을 입었으면 그 옷의 부위, 아니면 캐릭터 제 옷의 부위 (dyePanel 과 같은 규칙)
  function dyeParts() {
    if (st.mode !== 'tf' && ownOutfit()) {
      const list = [];
      TW.baseDyes(st.ci).forEach(([name, , presets], k) => {
        if (name !== '머리') list.push({ name, k, shades: baseShades(st.ci, k) });   // 헤어는 제 염색이 따로 있다
      });
      return list.length ? { kind: 'b', list } : null;
    }
    const iid = st.mode !== 'tf' && st.equip.costume, cs = iid && !NO_DYE.has(iid) ? TW.costumeDyes(iid) : [];
    return cs.length ? { kind: 'c', iid, list: cs.map(([name, , base], k) => ({ name, k, shades: costumeShades(base) })) } : null;
  }
  // 부위가 '그 색으로 보인다' 는 것은 한 칸의 색이 아니라 화면에 나온 넓이대로 섞인 색이다. 부위마다 다른 색을
  // 시험 삼아 칠한 그림을 눈에 안 보이는 곳에 한 장 그려서, 명암마다 몇 점이나 나오는지 세어 둔다
  function shadeWeights(parts) {
    const probe = {}, map = new Map();
    const w = parts.list.map((part, n) => {
      const hex = rgb2hex([(n * 37) % 80 + 90, (n * 53 + 27) % 80 + 90, (n * 71 + 54) % 80 + 90]);
      probe[part.k] = hex;
      const sh = part.shades(hex);
      sh.forEach((c, i) => { if (!map.has(c)) map.set(c, [n, i]); });
      return new Array(sh.length).fill(0);
    });
    try {
      const cv = document.createElement('canvas'); cv.width = VIEW[0]; cv.height = VIEW[1];
      TW.render(cv, Object.assign({}, pose(), parts.kind === 'b' ? { bdye: probe } : { cdye: probe }), st.tick, { anchor, scale: st.zoom });
      const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 200) continue;
        const hit = map.get(rgb2hex([d[i], d[i + 1], d[i + 2]]));
        if (hit) w[hit[0]][hit[1]]++;
      }
    } catch (e) { /* 그리지 못하면 칸을 고르게 본다 */ }
    return w.map(c => (c.some(v => v) ? c : c.map(() => 1)));
  }
  // 그 넓이대로 섞은 색 = 눈에 보이는 색
  const shadeLook = (shades, w) => hex => {
    const l = shades(hex).map(hex2rgb);
    let sum = [0, 0, 0], tot = 0;
    l.forEach((c, i) => { const q = w[i] || 0; tot += q; sum = sum.map((v, j) => v + c[j] * q); });
    return rgb2hex(sum.map(v => v / (tot || 1)));
  };
  function applyFound(parts, k, hex) {
    if (parts.kind === 'b') st.bdye[k] = hex;
    else { st.cdye[parts.iid] = st.cdye[parts.iid] || {}; st.cdye[parts.iid][k] = hex; $('cdye').dataset.iid = ''; }
    refresh();
  }
  function findPanel() {
    const box = $('findc'), parts = dyeParts();
    root.querySelectorAll('.findbtn').forEach(b => b.classList.toggle('on', !!(st.findOpen && parts)));
    if (!st.findOpen || !parts) { box.classList.add('hidden'); return; }
    box.classList.remove('hidden'); box.innerHTML = '';
    const bar = document.createElement('div'); bar.className = 'bar';
    const ttl = document.createElement('span'); ttl.textContent = '색상 찾기';
    const cls = document.createElement('button'); cls.className = 'close'; cls.textContent = '×'; cls.title = '닫기';
    cls.onclick = () => { st.findOpen = false; findPanel(); };
    bar.title = '끌어서 옮기기';
    bar.onpointerdown = ev => {
      if (ev.button !== 0 || ev.target === cls) return;
      ev.preventDefault(); bar.setPointerCapture(ev.pointerId);
      const B = box.getBoundingClientRect(), dx = ev.clientX - B.left, dy = ev.clientY - B.top;
      const R = winRange(box, B.width, B.height);
      bar.onpointermove = e => {
        st.findPos = { x: lim(e.clientX - R.S.left - dx, R.x0, R.x1), y: lim(e.clientY - R.S.top - dy, R.y0, R.y1) };
        placeFind();
      };
      bar.onpointerup = bar.onpointercancel = () => { bar.onpointermove = null; };
    };
    bar.appendChild(ttl); bar.appendChild(cls); box.appendChild(bar);
    // 목표 색: 눌러서 색 고르기 창을 연다 (스포이드로 화면에서 집어 올 수 있다)
    const row = document.createElement('div'); row.className = 'row';
    const lb = document.createElement('span'); lb.textContent = '목표 색';
    const sw = document.createElement('button'); sw.className = 'sw';
    const hex = document.createElement('b');
    const show = () => { sw.style.background = '#' + (st.findTarget || 'c3c3c3'); hex.textContent = rgbText(st.findTarget || 'c3c3c3'); };
    sw.title = '눌러서 색을 고릅니다 (스포이드로 화면에서 집어 올 수 있습니다)';
    sw.onclick = () => colorPicker(sw, st.findTarget || 'c3c3c3',
      v => { st.findTarget = v; show(); list(); },
      v => { if (v) st.findTarget = v; show(); list(); });
    row.appendChild(lb); row.appendChild(sw); row.appendChild(hex); box.appendChild(row);
    const res = document.createElement('div'); box.appendChild(res);
    const weights = shadeWeights(parts);
    const note = document.createElement('p'); note.className = 'hint';
    note.textContent = '가장 비슷한 색상 찾아줌';
    box.appendChild(note);
    // 못 가는 부위가 하나라도 있을 때만 ≈ 가 무슨 뜻인지 적는다
    const warn = document.createElement('p'); warn.className = 'hint warn'; warn.hidden = true;
    warn.textContent = '≈ 표시 : 구현이 불가능한 색상';
    box.appendChild(warn);
    // 부위마다 보이는 색이 목표 색이 되는 입력 색을 찾는다
    function list() {
      const target = st.findTarget || 'c3c3c3';
      res.innerHTML = ''; warn.hidden = true;
      parts.list.forEach((part, n) => {
        const look = shadeLook(part.shades, weights[n]), r = fitInput(look, target);
        const far = r.diff > FIND_NEAR, got = look(r.hex);
        if (far) warn.hidden = false;
        const line = document.createElement('div'); line.className = 'row';
        const nm = document.createElement('span'); nm.textContent = part.name; nm.title = part.name;
        const same = !far && r.hex === target;        // 고른 색을 그대로 넣으면 되는 경우
        const b = document.createElement('button'); b.className = 'btn ap' + (far ? ' bad' : '');
        b.innerHTML = `<i style="background:#${r.hex}"></i>${far ? '≈' : ''}${rgbText(r.hex)}${same ? '<em>그대로</em>' : ''}`;
        b.title = far ? `${part.name}: ${whyFar(got, target)} 이 색이 가장 가깝습니다 (보이는 색 ${rgbText(got)}, 차이 ${r.diff})`
                      : same ? `${eun(part.name)} 목표 색을 그대로 넣으면 됩니다`
                      : `${part.name}에 이 색을 넣으면 ${rgbText(got)} 로 보입니다 (차이 ${r.diff})`;
        b.onclick = () => applyFound(parts, part.k, r.hex);
        const lk = document.createElement('i'); lk.className = 'look'; lk.style.background = '#' + got;
        lk.title = `넣었을 때 보이는 색 (${rgbText(got)})`;
        line.appendChild(nm); line.appendChild(b); line.appendChild(lk); res.appendChild(line);
      });
    }
    show(); list(); placeFind();
  }
  // 창은 끌어다 둔 자리에 선다 (st.findPos, 무대 안 좌표). 자리를 안 잡았으면 염색 창 바로 아래:
  // 염색 창이 제자리면 css 가 그렇게 두고, 끌어다 옮겼으면 그 창 아래에 오른쪽 끝을 맞춰 붙인다
  function placeFind() {
    const box = $('findc'), dye = $('cdye');
    let p = st.findPos;
    if (!p && st.cdyePos && !dye.classList.contains('hidden')) {
      p = { x: dye.offsetLeft + dye.offsetWidth - box.offsetWidth, y: dye.offsetTop + dye.offsetHeight + 4 };
    }
    Object.assign(box.style, p ? { left: p.x + 'px', top: p.y + 'px', right: 'auto', bottom: 'auto' } : { left: '', top: '', right: '', bottom: '' });
    if (!p) return;
    const R = winRange(box, box.offsetWidth, box.offsetHeight);
    box.style.left = lim(p.x, R.x0, R.x1) + 'px';
    box.style.top = lim(p.y, R.y0, R.y1) + 'px';
  }
  // ---------------------------------------------------------------- 꾸미기: 컬러렌즈 / 립 (facedye.json - the game's unreleased
  // 꾸미기, UI text '립 / 컬러렌즈 (준비 중)'). A window like 염색 (bottom left): eye style 없음 / 1-5 with that style's dyes,
  // 립 off / on with its dyes. Front facings only (the data has no back views)
  function facePanel() {
    const box = $('face'), fa = TW.faceAnims(st.ci);
    if (st.mode === 'tf' || !fa) { box.classList.add('hidden'); return; }
    box.classList.toggle('closed', !st.faceOpen);
    if (box.dataset.ci !== String(st.ci)) {
      box.dataset.ci = String(st.ci); box.innerHTML = '';
      const head = document.createElement('button'); head.className = 'btn head'; head.textContent = '꾸미기'; head.title = '컬러렌즈 · 립 (게임에는 아직 없는 기능)';
      head.onclick = () => { st.faceOpen = true; facePanel(); }; box.appendChild(head);
      const bar = document.createElement('div'); bar.className = 'bar';
      const ttl = document.createElement('span'); ttl.textContent = '꾸미기'; ttl.title = '정면 쪽에서만 보입니다';
      const cls = document.createElement('button'); cls.className = 'close'; cls.textContent = '×'; cls.title = '닫기';
      cls.onclick = () => { st.faceOpen = false; facePanel(); }; bar.appendChild(ttl); bar.appendChild(cls); box.appendChild(bar);
      const styles = (TW.S.face && TW.S.face.styles) || {};
      // one part: a row of choice buttons, the chosen style's name, and its dyes as dots (the last one = 기본색)
      const part = (label, opts, getOn, setOn, dyes, getDye, setDye) => {
        const row = document.createElement('div'); row.className = 'row fchoice';
        const lb = document.createElement('b'); lb.textContent = label; row.appendChild(lb);
        const btns = opts.map(([v, text, title]) => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = text; b.title = title || text;
          b.onclick = () => { setOn(v); sync(); refresh(); }; row.appendChild(b); return [v, b]; });
        const nm = document.createElement('div'); nm.className = 'row fname';
        const dots = document.createElement('div'); dots.className = 'row fdots';
        const sync = () => {
          btns.forEach(([v, b]) => b.classList.toggle('on', v === getOn()));
          const list = getOn() ? dyes() : []; dots.innerHTML = ''; nm.textContent = getOn() ? (opts.find(o => o[0] === getOn()) || [])[2] || '' : '';   // 없음: no name line
          nm.classList.toggle('hidden', !nm.textContent);
          list.forEach(([n, sw], k) => {
            const b = document.createElement('button'); b.className = 'fdot'; b.style.background = '#' + sw; b.title = n;
            const val = k === list.length - 1 && n === '기본색' ? -1 : k;
            b.classList.toggle('on', getDye() === val); b.onclick = () => { setDye(val); sync(); refresh(); }; dots.appendChild(b);
          });
        };
        box.appendChild(row); box.appendChild(nm); box.appendChild(dots); sync();
      };
      part('눈', [[0, '없음', '캐릭터 원래 눈'], ...Object.keys(fa.eyes).map(Number).sort((a, b) => a - b).map((k, n) => [k, String(n + 1), styles[k] || ''])],   // data styles 2-6 shown as 1-5
        () => st.eye, v => { if (v !== st.eye) st.eyeDye = -1; st.eye = v; }, () => TW.faceDyes('lens', st.eye), () => st.eyeDye, v => { st.eyeDye = v; });
      if (fa.lip) part('립', [[false, '없음', ''], [true, '켜기', '립스틱']], () => st.lip, v => { st.lip = v; }, () => TW.faceDyes('lip'), () => st.lipDye, v => { st.lipDye = v; });
    }
    box.classList.remove('hidden');
  }
  // ---------------------------------------------------------------- colour picker (확장 의상 / 기본 의상 염색)
  // The browser's own picker opens its own window, so this one: saturation / brightness square, hue bar, R G B, the
  // eyedropper where the browser has one, and opt.presets [{value, hex, title}] (기본 의상: the game's colours) as boxes
  // under the number fields. The fields read RGB, HSB or HEX (the button left of them switches; remembered in
  // settings.pickMode). The colour applies as it is picked and
  // there is no 확인 / 취소: onLive(hex, preset) while picking, onDone(hex, preset) when the window closes (Enter or a
  // click outside it), onDone(null) only on Esc, which puts the old colour back. preset = the chosen preset's value
  // until the colour is changed by hand (opt.preset: the one at the start), else undefined. One open at a time.
  let pickerClose = null;
  const hsv2rgb = (h, s, v) => { const f = n => { const k = (n + h / 60) % 6; return Math.round(255 * (v - v * s * Math.max(0, Math.min(k, 4 - k, 1)))); }; return [f(5), f(3), f(1)]; };
  const rgb2hsv = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), d = mx - Math.min(r, g, b);
    const h = !d ? 0 : mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [h * 60, mx ? d / mx : 0, mx]; };
  const hex2rgb = hex => [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  const rgb2hex = rgb => rgb.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  // 넣는 색과 화면에 나오는 색은 다르다: 염색은 부위의 명암 띠를 통째로 칠하고, 고른 색은 그중 한 칸으로만 들어간다
  // (기본 의상·확장 의상 모두 첫 칸). 그래서 화면에서 집은 색을 그대로 넣으면 그 색이 집었던 자리(밝은
  // 쪽인지 어두운 쪽인지)에 다시 오지 않는다. 색상 찾기가 넣을 색을 거꾸로 찾는다 (fitInput)
  // 색끼리 얼마나 다른가: RGB 거리는 밝기 차이를 너무 크게 센다 (같은 빨강인데 조금 어두우면 '딴 색' 이 된다).
  // 눈에 보이는 차이에 가깝게 OKLab 으로 재고, 0~100 쯤으로 펴서 쓴다 (1 이면 겨우 알아볼 차이)
  const srgb2lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  function oklab(rgb) {
    const r = srgb2lin(rgb[0]), g = srgb2lin(rgb[1]), b = srgb2lin(rgb[2]);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
  }
  const colorDist = (a, b) => { const p = oklab(a), q = oklab(b); return Math.round(Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) * 100); };
  // at(hex) = 그 색을 넣었을 때 노린 칸에 나오는 색. 칸의 각 채널은 넣은 색의 같은 채널에만, 그것도 단조롭게
  // 반응하므로 (compose.js partRamp / costumeImage) 채널마다 따로 이분 탐색하면 된다. 밝은 칸은 흰색 쪽으로
  // 섞이고 어두운 칸은 검정 쪽으로 눌리는 탓에 낼 수 없는 색이 있는데, 그때는 가장 가까운 값과 그 차이를 돌려준다
  // 부위의 명암 띠: 그 색을 넣으면 옷에 실제로 그려지는 색들 (compose.js 와 같은 계산, 어두운 쪽부터)
  const costumeShades = base => hex => { const c = hex2rgb(hex), b0 = hex2rgb(base[0] || '000000');
    return base.map(e => { const b = hex2rgb(e || 'ffffff'); return rgb2hex(TW.q565(c.map((x, j) => lim(x + b[j] - b0[j], 0, 255)))); }); };
  const baseShades = (ci, k) => hex => { const r = TW.partRamp(ci, k, hex); return Object.keys(r).map(Number).sort((a, b) => a - b).map(i => rgb2hex(TW.q565(hex2rgb(r[i])))); };
  const mainShade = n => Math.floor(n * 0.45);     // 그 부위를 대표하는 칸 (presetSwatch 와 같은 자리)
  const rgbText = hex => hex2rgb(hex).join(', ');  // 색상 찾기 창은 색을 R, G, B 값으로 적는다
  function fitInput(at, target) {
    const t = hex2rgb(target);
    let lo = [0, 0, 0], hi = [255, 255, 255];
    for (let n = 0; n < 9; n++) {
      const mid = lo.map((v, j) => (v + hi[j]) >> 1), got = hex2rgb(at(rgb2hex(mid)));
      got.forEach((g, j) => { if (g < t[j]) lo[j] = mid[j] + 1; else hi[j] = mid[j]; });
    }
    let best = null;                                  // 경계에서 한 칸 빗나갈 수 있어 양옆까지 재 본다
    for (const c of [lo, hi, lo.map(v => v - 1), hi.map(v => v + 1)]) {
      const rgb = c.map(v => lim(v, 0, 255)), hex = rgb2hex(rgb), d = colorDist(hex2rgb(at(hex)), t);
      if (!best || d < best.diff) best = { hex, rgb, diff: d };
    }
    // 밝은 칸은 넘친 채널을 흰색 쪽으로 푸느라 채널끼리 조금 얽힌다. 채널마다 따로 센 값이 꼭 최선은 아니라,
    // 한 칸씩 움직여 보며 더 가까워지는 쪽으로 다듬는다
    for (let step = 16; step >= 1; step >>= 1) {
      for (let pass = 0; pass < 8; pass++) {
        let moved = false;
        for (let j = 0; j < 3; j++) for (const d of [-step, step]) {
          const rgb = best.rgb.slice(); rgb[j] = lim(rgb[j] + d, 0, 255);
          const hex = rgb2hex(rgb), q = colorDist(hex2rgb(at(hex)), t);
          if (q < best.diff) { best = { hex, rgb, diff: q }; moved = true; }
        }
        if (!moved) break;
      }
    }
    return best;
  }
  function colorPicker(anchor, hex, onLive, onDone, opt = {}) {
    if (pickerClose) pickerClose(null);
    let [h, s, v] = rgb2hsv(...hex2rgb(hex)), pv = opt.preset;
    const el = document.createElement('div'); el.className = 'cpick';
    el.innerHTML = `<div class="sv"><canvas width="200" height="132"></canvas><i></i></div>
      <div class="mid">${window.EyeDropper ? '<button class="eye" title="화면에서 색 가져오기"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M19.4 3.6a2.1 2.1 0 0 0-3 0l-2.6 2.6-1.1-1.1-1.4 1.4 1.1 1.1-7.2 7.2V18h3.2l7.2-7.2 1.1 1.1 1.4-1.4-1.1-1.1 2.6-2.6a2.1 2.1 0 0 0 0-3zM7.6 16H6v-1.6l7-7 1.6 1.6z" fill="currentColor"/></svg></button>' : ''}
        <span class="now"></span><div class="hue"><i></i></div></div>
      <div class="rgb"><div class="fields"></div></div>
      <div class="modes" role="radiogroup" aria-label="입력 방식">${['RGB', 'HSB', 'HSL', 'HEX'].map(m => `<button type="button" role="radio" data-m="${m}">${m}</button>`).join('')}</div>
      ${opt.presets && opt.presets.length ? '<div class="pre"></div>' : ''}`;
    root.appendChild(el);
    const sv = el.querySelector('.sv'), cv = sv.querySelector('canvas'), dot = sv.querySelector('i'), hue = el.querySelector('.hue'), knob = hue.querySelector('i');
    const now = el.querySelector('.now'), fieldBox = el.querySelector('.rgb .fields'), modeBtns = [...el.querySelectorAll('.modes button')];
    // 입력 칸: RGB (0~255) / HSB (H 0~360, S·B 0~100) / HSL (H 0~360, S·L 0~100) / HEX (rrggbb). 아래 단추가 라디오처럼
    // 하나만 켜지고, 고른 방식은 다음에 열 때도 그대로 (settings.pickMode)
    const MODES = { RGB: [['R', 255], ['G', 255], ['B', 255]], HSB: [['H', 360], ['S', 100], ['B', 100]], HSL: [['H', 360], ['S', 100], ['L', 100]], HEX: [['HEX']] };
    let mode = MODES[settings.pickMode] ? settings.pickMode : 'RGB', nums = [];
    const fieldValues = () => {
      if (mode === 'RGB') return hsv2rgb(h, s, v);
      if (mode === 'HSB') return [Math.round(h) % 360, Math.round(s * 100), Math.round(v * 100)];
      if (mode === 'HSL') { const l = v * (1 - s / 2), sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l); return [Math.round(h) % 360, Math.round(sl * 100), Math.round(l * 100)]; }
      return [rgb2hex(hsv2rgb(h, s, v)).toUpperCase()];
    };
    const buildFields = () => {
      modeBtns.forEach(b => { const on = b.dataset.m === mode; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
      fieldBox.innerHTML = MODES[mode].map(([c, max]) => max
        ? `<label><input type="number" min="0" max="${max}" step="1">${c}</label>`
        : `<label class="hex"><input type="text" maxlength="7" spellcheck="false">${c}</label>`).join('');
      nums = [...fieldBox.querySelectorAll('input')];
      fieldValues().forEach((x, i) => { nums[i].value = x; });
      nums.forEach(n => n.oninput = () => {
        if (mode === 'HEX') {
          let t = n.value.trim().replace(/^#/, '');
          if (/^[0-9a-f]{3}$/i.test(t)) t = t.replace(/./g, c => c + c);
          if (!/^[0-9a-f]{6}$/i.test(t)) return;             // 다 칠 때까지 기다린다
          [h, s, v] = rgb2hsv(...hex2rgb(t.toLowerCase()));
        } else if (mode === 'HSB') {
          const [H, S, B] = nums.map((i, j) => lim(+i.value || 0, 0, MODES.HSB[j][1]));
          h = Math.min(359.9, H); s = S / 100; v = B / 100;
        } else if (mode === 'HSL') {
          const [H, S, L] = nums.map((i, j) => lim(+i.value || 0, 0, MODES.HSL[j][1])), sl = S / 100, l = L / 100;
          const vv = l + sl * Math.min(l, 1 - l);
          h = Math.min(359.9, H); v = vv; s = vv ? 2 * (1 - l / vv) : 0;
        } else {
          [h, s, v] = rgb2hsv(...nums.map(i => lim(+i.value || 0, 0, 255)));
        }
        live(true);
      });
    };
    modeBtns.forEach(b => b.onclick = () => { mode = b.dataset.m; settings.pickMode = mode; saveLS(); buildFields(); });
    const paint = (fromNums) => {
      const g = cv.getContext('2d'), W = cv.width, H = cv.height;
      g.fillStyle = `hsl(${h}, 100%, 50%)`; g.fillRect(0, 0, W, H);
      let gr = g.createLinearGradient(0, 0, W, 0); gr.addColorStop(0, '#fff'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, '#000'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      dot.style.left = s * 100 + '%'; dot.style.top = (1 - v) * 100 + '%'; knob.style.left = h / 360 * 100 + '%';
      const rgb = hsv2rgb(h, s, v); now.style.background = '#' + rgb2hex(rgb);
      if (!fromNums) fieldValues().forEach((x, i) => { if (nums[i]) nums[i].value = x; });
      return rgb2hex(rgb);
    };
    // the presets: a box per game colour (its dye name on hover); the chosen one is outlined while the colour is its own
    const boxes = (opt.presets || []).map(p => {
      const b = document.createElement('button'); b.className = 'p'; b.style.background = '#' + p.hex; b.title = p.title;
      b.onclick = () => { [h, s, v] = rgb2hsv(...hex2rgb(p.hex)); pv = p.value; mark(); onLive(paint(), pv); };
      el.querySelector('.pre').appendChild(b); return b;
    });
    const mark = () => boxes.forEach((b, i) => b.classList.toggle('on', opt.presets[i].value === pv));
    const live = fromNums => { pv = undefined; mark(); onLive(paint(fromNums), pv); };
    const drag = (target, set) => target.onpointerdown = ev => {
      if (ev.button !== 0) return; ev.preventDefault(); target.setPointerCapture(ev.pointerId);
      const at = e => { const b = target.getBoundingClientRect(); set(Math.max(0, Math.min(1, (e.clientX - b.left) / b.width)), Math.max(0, Math.min(1, (e.clientY - b.top) / b.height))); live(); };
      at(ev); target.onpointermove = at; target.onpointerup = target.onpointercancel = () => { target.onpointermove = null; };
    };
    drag(sv, (x, y) => { s = x; v = 1 - y; });
    drag(hue, x => { h = Math.min(359.9, x * 360); });
    buildFields();
    const eye = el.querySelector('.eye');
    if (eye) eye.onclick = async () => { try { const r = await new window.EyeDropper().open(); [h, s, v] = rgb2hsv(...hex2rgb(r.sRGBHex.slice(1))); live(); } catch (e) { /* dismissed */ } };
    // 색 단추 높이에, 그 단추가 든 창(염색 / 색상 찾기)을 가리지 않도록 창 옆으로 비켜 선다
    const a = anchor.getBoundingClientRect(), P = el.getBoundingClientRect();
    const W = ((anchor.closest && anchor.closest('.ov-dye')) || anchor).getBoundingClientRect();
    let x = W.left - P.width - 8; if (x < 8) x = Math.min(W.right + 8, innerWidth - P.width - 8);
    el.style.left = Math.max(8, x) + 'px'; el.style.top = Math.max(8, Math.min(a.top - 40, innerHeight - P.height - 8)) + 'px';
    const close = result => {
      pickerClose = null; el.remove(); document.removeEventListener('pointerdown', outside, true); document.removeEventListener('keydown', key, true);
      onDone(result, result ? pv : undefined);
    };
    // a click outside keeps the colour (it is already on the character); Esc puts the old one back
    const outside = ev => { if (!ev.composedPath().includes(el)) close(paint()); };
    const key = ev => { if (ev.key === 'Escape') { ev.stopPropagation(); close(null); } else if (ev.key === 'Enter') close(paint()); };
    setTimeout(() => { document.addEventListener('pointerdown', outside, true); document.addEventListener('keydown', key, true); });
    pickerClose = close;
    mark(); paint();
  }
  // the open window sits where it was last dragged (st.cdyePos, stage pixels); closed, the 염색 button is in its own corner (css)
  function placeDye() {
    const box = $('cdye'), p = !box.classList.contains('closed') && st.cdyePos;
    Object.assign(box.style, p ? { left: p.x + 'px', top: p.y + 'px', right: 'auto', bottom: 'auto' } : { left: '', top: '', right: '', bottom: '' });
    if (!p) return;
    // another outfit can make the window taller (more parts): moved up / left as far as it takes to stay whole in the
    // simulator; st.cdyePos keeps the place chosen, so a shorter window goes back there
    const R = winRange(box, box.offsetWidth, box.offsetHeight);
    box.style.left = lim(p.x, R.x0, R.x1) + 'px';
    box.style.top = lim(p.y, R.y0, R.y1) + 'px';
  }
  async function refresh() {
    refreshSlots(); dyePanel(); facePanel(); findPanel(); syncWeaponFx(); syncWalk(); await costumeMotionButtons();
    const p = pose(); st.loading++; status('불러오는 중…');
    try { await TW.prepare(p, (n, t) => status(`텍스처 ${n}/${t}`)); }
    catch (e) { status('불러오기 실패: ' + e.message); }
    st.loading--;
    if (st.loading) return;                         // a newer refresh is running
    syncHair();                                     // the worn style's pieces are known now (앞머리 / 뒷머리 buttons)
    st.maxT = TW.maxDuration(p); if (st.tick > st.maxT) st.tick = 0;
    $('tick').max = st.maxT; $('tick').value = st.tick;
    anchor = viewAnchor(p); st.lastPose = p;
    drawNow(); status(`${TW.S.index.chars[st.ci].name}: 아이템 ${Object.keys(st.equip).length}개, ${st.maxT + 1}틱`);
    saveSession();
  }
  function drawNow() {
    if (st.ci < 0 || !TW.S.chars[st.ci]) return;
    try { TW.render($('view'), pose(), st.tick, { anchor, scale: st.zoom, under: bgOn() ? bgImage(st.bg) : null, underOff: bgOff() }); } catch (e) { console.error(e); }
    $('tickLabel').textContent = `${st.tick} / ${st.maxT}`;
  }
  // one data tick per TICK_MS. The client's tick length is not known (60 ms looked slow next to the game): 45 ms
  const TICK_MS = 45;
  function startPlay() { stopPlay(); st.playing = true; $('btnPlay').textContent = '⏸ 정지'; st.timer = setInterval(() => { if (st.loading || !st.maxT) return; st.tick = (st.tick + 1) % (st.maxT + 1); $('tick').value = st.tick; drawNow(); }, TICK_MS); }
  function stopPlay() { if (st.timer) clearInterval(st.timer); st.timer = null; st.playing = false; $('btnPlay').textContent = '▶ 재생'; }
  function togglePlay() { if (st.timer) stopPlay(); else startPlay(); }

  // ---------------------------------------------------------------- export
  function download(canvas, name) { canvas.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 5000); }, 'image/png'); }
  function baseName() { return `${TW.S.index.chars[st.ci].name}_m${st.motion}_d${st.dir}`; }
  function savePng() { const cv = document.createElement('canvas'); cv.width = VIEW[0]; cv.height = VIEW[1]; TW.render(cv, pose(), st.tick, { anchor, scale: st.zoom }); download(cv, baseName() + `_t${st.tick}_x${st.zoom}.png`); }
  function saveSheet() {
    const w = 220, h = 240, cv = document.createElement('canvas'); cv.width = w * 8; cv.height = h; const g = cv.getContext('2d');
    const p = pose();
    TW.S.index.dir_order.forEach((d, i) => { const c = document.createElement('canvas'); c.width = w; c.height = h; TW.render(c, Object.assign({}, p, { dir: d }), st.tick, {}); g.drawImage(c, w * i, 0); });
    download(cv, `${TW.S.index.chars[st.ci].name}_m${st.motion}_sheet.png`);
  }
  function saveFrames() {               // every key tick of the current pose as one strip (GIF encoding needs a library; see README)
    const p = pose(), times = TW.frameTimes(p), w = VIEW[0], h = VIEW[1];
    const cv = document.createElement('canvas'); cv.width = w * times.length; cv.height = h; const g = cv.getContext('2d');
    times.forEach((t, i) => { const c = document.createElement('canvas'); c.width = w; c.height = h; TW.render(c, p, t, { anchor, scale: st.zoom }); g.drawImage(c, w * i, 0); });
    download(cv, baseName() + `_frames_${times.join('-')}.png`);
  }

  // PC only: a phone / tablet (mobile user agent, or a touch screen without a mouse) gets a notice and downloads nothing
  const MOBILE = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(navigator.userAgent) ||
                 (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent)) ||               // iPadOS asks as a Mac
                 (matchMedia('(pointer: coarse)').matches && !matchMedia('(any-pointer: fine)').matches);

  function mount(host, opts = {}) {
    if (root) return;                                      // one simulator per page
    root = host.shadowRoot || host.attachShadow({ mode: 'open' });
    const dir = u => String(u).replace(/\/?$/, '/');
    DATA_BASE = dir(opts.data || window.TW_DATA_BASE || 'data/');
    TDB_BASE = opts.tdb ? dir(opts.tdb) : '';
    ART_BASE = opts.art ? dir(opts.art) : '';
    if (opts.embed) host.classList.add('embed');
    if (opts.share && typeof opts.share.onClick === 'function') shareOpt = opts.share;
    // the host stays invisible until app.css has loaded (app.css makes it visible), so the bare markup never flashes
    // .boot: the loading ring over everything until the first character is drawn (bootDone); it is visible even
    // before app.css arrives
    root.innerHTML = '<style>:host { display: block; visibility: hidden; } .hidden { display: none !important; } :host { position: relative; } .boot { position: absolute; inset: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; min-height: 320px; background: #fff; border-radius: 14px; color: #5d6b66; font: 600 14px/1.4 "IBM Plex Sans KR", "Noto Sans KR", "Malgun Gothic", sans-serif; visibility: visible; } .grid-wait { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; width: 100%; min-height: 260px; color: #5d6b66; font-weight: 600; } .spin { width: 38px; height: 38px; border-radius: 50%; border: 4px solid rgba(120, 140, 170, .25); border-top-color: #127a68; animation: boot-spin .8s linear infinite; } @keyframes boot-spin { to { transform: rotate(360deg); } } @media (prefers-reduced-motion: reduce) { .spin { animation-duration: 2.4s; } }</style>' +
                     `<link rel="stylesheet" href="${esc(opts.css || 'css/app.css')}">` + MARKUP +
                     '<div id="boot" class="boot" role="status"><span class="spin"></span><span>아바타 시뮬레이터를 불러오는 중…</span></div>';
    // the item list may only be filled once app.css sizes it: without it the list box has no height, so
    // appendCards() keeps adding cards to "fill" it and draws the whole list (500+ cards and icons) at once
    const link = root.querySelector('link');
    cssReady = new Promise(res => { link.onload = link.onerror = res; });
    // 사이트가 데이터 사용량 경고를 보여 주고 동의를 받았으면(allowMobile) 휴대폰에서도 연다
    if (MOBILE && !opts.allowMobile) {
      $('pick').classList.add('hidden'); $('sim').classList.add('hidden');
      const n = document.createElement('div'); n.className = 'mobile-block';
      n.innerHTML = '<b>아바타 시뮬레이터는 PC에서만 이용할 수 있습니다.</b><span>PC 브라우저로 접속해 주세요.</span>';
      bootDone(); root.appendChild(n); return;
    }
    addEventListener('pagehide', resetList);
    if (window.ResizeObserver) new ResizeObserver(es => { for (const e of es) if (!e.contentRect.width && !e.contentRect.height) resetList(); }).observe(host);
    main().catch(e => { bootDone(); $('pickStatus').textContent = '데이터를 읽지 못했습니다: ' + e.message; $('pick').classList.remove('hidden'); console.error(e); });
  }
  // ---------------------------------------------------------------- 코디 게시판 (사이트가 쓴다)
  // 갤러리에 올릴 그림은 보고 있던 방향 그대로 찍는다 (배율·끌어 놓은 자리는 늘 같게).
  // 목록 썸네일은 2배, 글을 열었을 때 보이는 큰 그림은 4배 (픽셀 그림이라 줄여 쓰면 뭉개져서 따로 찍는다)
  // thumb = 목록 썸네일(인물만 잘라 담는다), big = 글 보기용, zoom = big 의 테두리를 재는 기준 배율,
  // pad = 잘라낸 썸네일 둘레에 남기는 여백 (논리 점)
  const SHOT = { zoom: 2, thumb: 3, big: 4, pad: 10, reach: 0.45 };
  // 한 장 찍기.
  //   tight = 그려지는 것에 딱 맞춰 자른다 (목록 썸네일: 빈 자리가 없어 작은 칸에서도 크게 보인다).
  //     자르는 상자는 그 틱에 그려지는 모든 조각을 감싼 것이라 날개·오라·무기 빛도 들어오고, 거기에
  //     여백(SHOT.pad)을 더 둔다. 발밑 그림자는 bounds 가 알아서 뺀다
  //   아니면 = 화면과 같은 테두리로 (글 보기용 큰 그림)
  //   under = 배경 그림 (있으면 뒤에 꽉 채워 깐다. 썸네일은 자를 자리를 캐릭터만으로 정한 뒤 그 크기로 다시 그린다)
  //   tick = 찍을 순간 (snapshot 이 누른 순간 하나로 정해 두 장에 같이 쓴다. 재생 중에도 두 장이 같은 프레임이 되게)
  async function shot(p, zoom, tight, under = null, tick = st.tick) {
    const cv = document.createElement('canvas');
    let at;
    const b = tight ? TW.bounds(TW.compose(p, tick)) : null;
    if (b) {
      const pad = SHOT.pad;
      const w = Math.ceil(b.maxx - b.minx) + pad * 2, h = Math.ceil(b.maxy - b.miny) + pad * 2;
      cv.width = w * zoom; cv.height = h * zoom;
      at = [pad - b.minx, pad - b.miny];
    } else {
      const f = zoom / SHOT.zoom;
      cv.width = Math.round(VIEW[0] * f); cv.height = Math.round(VIEW[1] * f);
      at = TW.centeredAnchor(p, cv.width / zoom, cv.height / zoom);
    }
    TW.render(cv, p, tick, { anchor: at, scale: zoom, under: b ? null : under, underOff: bgOff() });
    // 조각들의 네모 칸은 실제 그림보다 클 수 있다(이펙트 칸은 대부분 투명): 실제로 그려진 픽셀만 남기고 여백을 다시 둔다.
    // 캐릭터 둘레 일정 범위(SHOT.reach × 캐릭터 키)까지만 담는다: 기둥처럼 크게 뻗는 이펙트는 잘리고 캐릭터가 작아지지 않는다
    let limit = null;
    if (b) {
      const core = TW.bounds(TW.compose(p, tick).filter(l => SHOT_CORE.test(l.tag)));
      if (core) {
        const e = (core.maxy - core.miny) * SHOT.reach;
        limit = { x0: (core.minx - e + at[0]) * zoom, y0: (core.miny - e + at[1]) * zoom, x1: (core.maxx + e + at[0]) * zoom, y1: (core.maxy + e + at[1]) * zoom };
      }
    }
    let out = b ? trimToPixels(cv, SHOT.pad * zoom, limit) : cv;
    if (b && under) {                                          // 잘라낸 자리 그대로, 배경을 깔고 다시 그린다
      const o = document.createElement('canvas'), pz = SHOT.pad * zoom, x0 = out.trimX ?? pz, y0 = out.trimY ?? pz;
      o.width = out.width; o.height = out.height;
      TW.render(o, p, tick, { anchor: [at[0] - (x0 - pz) / zoom, at[1] - (y0 - pz) / zoom], scale: zoom, under, underOff: bgOff() });
      out = o;
    }
    return new Promise(res => out.toBlob(res, 'image/png'));
  }
  // 캐릭터 자신 (compose.js centeredAnchor 와 같은 기준): 몸·의상, 헤어, 얼굴, 탈것
  const SHOT_CORE = /^(body|hair|eye|lip|face)|_(rider|vehicle)$/;
  // limit = 이 네모(캔버스 픽셀) 안에서만 잰다
  function trimToPixels(cv, pad, limit = null) {
    const { width: w, height: h } = cv, px = cv.getContext('2d').getImageData(0, 0, w, h).data;
    const lx0 = limit ? Math.max(0, Math.floor(limit.x0)) : 0, ly0 = limit ? Math.max(0, Math.floor(limit.y0)) : 0;
    const lx1 = limit ? Math.min(w - 1, Math.ceil(limit.x1)) : w - 1, ly1 = limit ? Math.min(h - 1, Math.ceil(limit.y1)) : h - 1;
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = ly0; y <= ly1; y++) for (let x = lx0; x <= lx1; x++) {
      if (px[(y * w + x) * 4 + 3] <= 8) continue;              // 거의 안 보이는 빛 번짐은 빼고 잰다
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
    if (x1 < 0) return cv;
    const out = document.createElement('canvas');
    out.width = x1 - x0 + 1 + pad * 2; out.height = y1 - y0 + 1 + pad * 2;
    out.getContext('2d').drawImage(cv, x0, y0, x1 - x0 + 1, y1 - y0 + 1, pad, pad, x1 - x0 + 1, y1 - y0 + 1);
    out.trimX = x0; out.trimY = y0;                             // 원래 캔버스에서 잘라낸 자리 (배경을 깔고 다시 그릴 때)
    return out;
  }
  // 비밀 코드로 연 아이템은 아직 나오지 않은 것이라 갤러리에 나가면 안 된다. 코드를 넣은 채든
  // 넣었다 끈 뒤든, 그 아이템을 입고 있으면 막는다. 올릴 수 없는 까닭을 돌려주고, 올릴 수 있으면 빈 글
  const wearingSkipped = () => Object.values(st.equip).some(id => { const it = st.char && st.char.byId[id]; return it && skipped(it); });
  function shareBlocked() {
    if (st.ci < 0 || !TW.S.chars[st.ci]) return '아직 캐릭터를 불러오는 중입니다.';
    if (st.mode === 'tf') return '변신 망토 화면은 코디 게시판에 올릴 수 없습니다.';
    if (wearingSkipped()) return '아직 나오지 않은 아이템이 있어 코디 게시판에 올릴 수 없습니다.';   // 로그인한 채여도 입지 않았으면 올린다 (그림엔 입은 것만 나온다)
    return '';
  }

  // 지금 코디를 그림 두 장으로 내준다. { thumb, big, name } 이고, 아직 못 그리는 상태면 null 이다.
  // 배경을 입혔으면 두 장 모두 배경을 깐다. opts.bg === false 이면 배경 없이 (대미지 카드: 카드가 배경을 따로 깐다)
  async function snapshot(opts = {}) {
    if (shareBlocked()) return null;
    if (st.ci < 0 || !TW.S.chars[st.ci] || st.loading) return null;
    const p = Object.assign({}, pose()), tick = st.tick;   // 보고 있는 방향·동작·순간(틱) 그대로. 효과가 잠깐씩 나오는 아바타는 ⏸ 정지로 멈춰 고른 순간이 찍힌다
    try { await TW.prepare(p, () => {}); } catch (e) { return null; }   // 돌려 놓고 찍으면 그 방향 그림이 아직 없다
    const under = opts.bg === false ? null : await bgLoaded(st.bg);
    const [thumb, big] = await Promise.all([shot(p, SHOT.thumb, true, under, tick), shot(p, SHOT.big, false, under, tick)]);
    return thumb && big ? { thumb, big, name: TW.S.index.chars[st.ci].name } : null;
  }

  // 코디 한 벌 = 프리셋 내용 + 동작·방향. 캐릭터는 번호가 아니라 이름으로 적는다 (자료가 늘면 번호가 밀린다)
  function getLook() {
    if (st.ci < 0 || !TW.S.index || shareBlocked()) return null;
    return lookNow();
  }
  function lookNow() {
    return {
      v: 1, char: TW.S.index.chars[st.ci].name,
      hair: st.hair, dye: st.dye, hairMode: st.hairMode, hairHidden: st.hairHidden,
      items: Object.values(st.equip), hidden: [...st.hidden],
      cdye: copy(st.cdye), bdye: copy(st.bdye),
      eye: st.eye, eyeDye: st.eyeDye, lip: st.lip, lipDye: st.lipDye,
      motion: st.motion, dir: st.dir,
      ...(st.bg ? { bg: st.bg } : {}),                          // 배경 (없으면 적지 않는다: 예전 코디와 같은 모양)
      ...(st.bg && (st.bgAt[0] || st.bgAt[1]) ? { bgAt: [...st.bgAt] } : {}),   // 배경 위 캐릭터 자리 (가운데면 적지 않는다)
      ...(!st.playing && st.tick > 0 ? { tick: st.tick } : {}),                 // 멈춰 둔 순간 (재생 중이면 적지 않는다)
    };
  }

  // 새로고침해도 입던 그대로: 사이트가 새로 올라오면 app.js(사이트)가 탭을 새로고침한다(siteVersionCheck). 그때 입혀 둔
  // 아바타·염색이 사라지지 않게 지금 모습을 이 탭의 sessionStorage 에 두고, 다시 열 때 ?char= 가 없으면 그것을 입힌다.
  // 탭마다 따로이고 탭을 닫으면 지워진다 (다른 탭·다음 방문은 지금처럼 마지막 캐릭터로 연다)
  const SESSION_KEY = 'tw_avatar_session';
  function saveSession() {
    if (st.ci < 0 || st.mode === 'tf' || !TW.S.index || !TW.S.chars[st.ci]) return;
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(lookNow())); } catch (e) { /* 저장 못 하는 창: 그냥 넘어간다 */ }
  }
  function sessionLook() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch (e) { return null; }
  }

  // 그 코디를 그대로 입힌다 (갤러리의 '시뮬레이터에서 보기'). 없는 아이템·헤어는 건너뛴다
  async function setLook(look) {
    if (!look || !look.char) return false;
    // 갤러리에서 바로 넘어오면 아직 자료(목록)가 오는 중일 수 있다. 올 때까지 기다린다
    for (let i = 0; i < 150 && !(TW.S.index && TW.S.index.chars); i++) await new Promise(res => setTimeout(res, 100));
    if (!(TW.S.index && TW.S.index.chars)) return false;
    await listReady;
    const want = TW.charName(look.char);       // 예전 코디는 '아나벨' 로 적혀 있다
    const ci = TW.S.index.chars.findIndex(c => c.name === want);
    if (ci < 0) return false;
    await selectChar(ci);                       // 캐릭터를 고르면 입은 것이 비워진다. 그 다음에 입힌다
    st.hidden = new Set(look.hidden || []);
    st.cdye = copy(look.cdye || {}); st.bdye = copy(look.bdye || {});
    $('cdye').dataset.iid = ''; $('face').dataset.ci = '';      // 염색 · 꾸미기 창을 새로 짓는다
    st.eye = look.eye || 0; st.eyeDye = look.eyeDye ?? -1; st.lip = !!look.lip; st.lipDye = look.lipDye ?? -1;
    st.equip = {};
    // 숨은 아이템은 코디로 들어와도 입히지 않는다 (갤러리로는 못 올라오지만, 주소를 손대 넣어도 막는다)
    for (const id of look.items || []) { const it = st.char.byId[id]; if (it && !skipped(it)) st.equip[it.slot] = id; }
    if (st.char.hairById[look.hair]) { st.hair = look.hair; st.dye = look.dye || 0; st.dyeBy[st.hair] = st.dye; }
    st.hairHidden = !!look.hairHidden; st.hairMode = look.hairMode || 'all';
    if (TW.S.index.chars[ci].motions.includes(look.motion)) st.motion = look.motion;
    if (TW.S.index.dir_order.includes(look.dir)) st.dir = look.dir;
    st.bg = BG_KEY.test(look.bg || '') ? look.bg : '';      // 배경이 없는 (예전) 코디는 배경도 벗긴다
    st.bgAt = st.bg && Array.isArray(look.bgAt) && look.bgAt.length === 2 && look.bgAt.every(Number.isFinite) ? bgClamp(look.bgAt) : [0, 0];
    bgImage(st.bg);
    // 멈춘 순간이 적힌 코디는 그 순간에 멈춰 보이고, 없으면 처음부터 재생한다 (refresh 가 동작 길이를 넘는 틱은 0 으로)
    st.tick = Number.isInteger(look.tick) && look.tick > 0 ? look.tick : 0;
    if (st.tick) stopPlay(); else if (!st.playing) startPlay();
    syncHair(); markSelected(); bgButton(); syncGroup($('motions'), () => st.motion);
    await refresh();
    return true;
  }

  // ---------------------------------------------------------------- 내 코디
  // 이 브라우저(localStorage)에 코디를 저장해 두고 다시 입는다. 다른 PC·다른 사람에게는 .twcody 파일이나 코드(한 줄 글자)로
  // 넘긴다. 파일·코드는 사이트(app.js)의 window.TWPack 이 암호화해 만든다 (시뮬레이터만 따로 띄운 페이지에서는 그 단추를 숨긴다).
  // 아직 나오지 않은 아이템(skipIds: 숨긴 목록 + 비밀 코드로 연 묶음)을 입은 코디는 저장은 되지만 내보낼 수 없다
  const MY_LS = 'tw_avatar_mylooks', MY_MAX = 200;
  let myLooks = null;
  const myLoad = () => { if (!myLooks) { try { const a = JSON.parse(localStorage.getItem(MY_LS) || '[]'); myLooks = Array.isArray(a) ? a.filter(e => e && e.look && e.look.char) : []; } catch (e) { myLooks = []; } } return myLooks; };
  const mySave = () => { try { localStorage.setItem(MY_LS, JSON.stringify(myLooks)); return true; } catch (e) { return false; } };
  const myStatus = t => { const el = $('myStatus'); if (el) el.textContent = t || ''; };
  const lookHidden = look => (look.items || []).some(id => skipIds.has(id));
  const myDate = iso => { const d = new Date(iso); return isNaN(d) ? '' : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`; };
  function myRender() {
    const list = myLoad(), io = !!window.TWPack;
    root.querySelectorAll('[data-my="file"], [data-my="paste"]').forEach(b => b.classList.toggle('hidden', !io));
    $('myList').innerHTML = list.length ? list.map(e => {
      const secret = e.secret || lookHidden(e.look);
      return `<div class="my-item" data-id="${esc(e.id)}">
        <div class="my-info"><b>${esc(e.name)}</b><span class="muted">${esc(TW.charName(e.look.char))} · ${myDate(e.at)}${secret ? ' · 미출시 아이템' : ''}</span></div>
        <div class="my-acts"><button class="btn" data-my="wear" type="button">입기</button><button class="btn" data-my="overwrite" type="button" title="지금 입은 모습으로 이 코디를 바꿉니다 (이름은 그대로)">덮어쓰기</button>${io ? `<button class="btn" data-my="export" type="button"${secret ? ' disabled title="아직 나오지 않은 아이템을 입어 내보낼 수 없습니다"' : ''}>파일</button><button class="btn" data-my="code" type="button"${secret ? ' disabled title="아직 나오지 않은 아이템을 입어 내보낼 수 없습니다"' : ''}>코드 복사</button>` : ''}<button class="btn" data-my="del" type="button">지우기</button></div>
      </div>`;
    }).join('') : '<p class="muted my-empty">저장한 코디가 없습니다. 지금 입은 모습을 저장해 보세요.</p>';
  }
  function myOpen() { myRender(); myStatus(''); $('myPaste').classList.add('hidden'); $('my').classList.remove('hidden'); }
  function myClose() { $('my').classList.add('hidden'); }
  // 이름이 이미 있으면 뒤에 번호를 붙인다 (아나이스 코디 → 아나이스 코디 2 → 아나이스 코디 3 …)
  function myUniqueName(name, list) {
    const taken = new Set(list.map(e => e.name));
    if (!taken.has(name)) return name;
    for (let n = 2; ; n++) { const tail = ` ${n}`, cand = name.slice(0, 40 - tail.length) + tail; if (!taken.has(cand)) return cand; }
  }
  // 목록에 하나 더한다 (맨 위). 넘치면 오래된 것부터 뺀다
  function myAdd(name, look, secret) {
    const list = myLoad();
    const want = String(name || '').trim().slice(0, 40) || `${TW.charName(look.char)} 코디`;
    const entry = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: myUniqueName(want, list), at: new Date().toISOString(), secret: !!secret, look };
    list.unshift(entry); if (list.length > MY_MAX) list.length = MY_MAX;
    if (!mySave()) { list.shift(); myStatus('브라우저 저장 공간에 쓸 수 없습니다 (사이트 데이터 저장이 막혀 있거나 가득 찼습니다).'); return null; }
    return entry;
  }
  function mySaveNow() {
    if (st.ci < 0 || !TW.S.chars[st.ci]) return myStatus('아직 캐릭터를 불러오는 중입니다.');
    if (st.mode === 'tf') return myStatus('변신 망토 화면은 저장할 수 없습니다.');
    const e = myAdd($('myName').value, lookNow(), wearingSkipped());
    if (!e) return;
    $('myName').value = ''; myRender(); myStatus(`'${e.name}' 을(를) 저장했습니다.`);
  }
  // 덮어쓰기: 이름은 그대로 두고 지금 입은 모습으로 바꾼다. 바꾼 것을 목록 맨 위로
  function myOverwrite(e) {
    if (st.ci < 0 || !TW.S.chars[st.ci]) return myStatus('아직 캐릭터를 불러오는 중입니다.');
    if (st.mode === 'tf') return myStatus('변신 망토 화면은 저장할 수 없습니다.');
    if (!confirm(`'${e.name}' 을(를) 지금 입은 모습으로 덮어쓸까요?`)) return;
    const list = myLoad(), i = list.indexOf(e), keep = { look: e.look, at: e.at, secret: e.secret };
    e.look = lookNow(); e.at = new Date().toISOString(); e.secret = !!wearingSkipped();
    list.splice(i, 1); list.unshift(e);
    if (!mySave()) {
      list.shift(); list.splice(i, 0, e); Object.assign(e, keep);
      return myStatus('브라우저 저장 공간에 쓸 수 없습니다 (사이트 데이터 저장이 막혀 있거나 가득 찼습니다).');
    }
    myRender(); myStatus(`'${e.name}' 을(를) 지금 입은 모습으로 덮어썼습니다.`);
  }
  async function myWear(e) {
    myStatus('입히는 중…');
    const ok = await setLook(e.look);
    if (ok) { myClose(); status(`'${e.name}' 을(를) 입었습니다.`); } else myStatus('이 코디를 입히지 못했습니다. 잠시 후 다시 눌러 주세요.');
  }
  async function myPack(e) {
    if (e.secret || lookHidden(e.look)) throw new Error('아직 나오지 않은 아이템을 입은 코디는 내보낼 수 없습니다.');
    return window.TWPack.pack('cody', { name: e.name, look: e.look });
  }
  // 파일·코드로 받은 코디: 목록에 넣고 바로 입는다. 미출시 아이템 번호가 들어 있으면 setLook 이 그것만 빼고 입힌다
  async function myImport(text) {
    const d = await window.TWPack.unpack(text, 'cody');
    if (!d || !d.look || !d.look.char) throw new Error('코디 정보가 없는 파일입니다.');
    const e = myAdd(d.name, d.look, lookHidden(d.look));
    if (!e) return;
    myRender(); await myWear(e);
  }
  function wireMy() {
    $('btnBg').onclick = () => { if (st.char) openListCat(st.cat === 'bg' ? 'head' : 'bg'); };   // [배경]: 목록을 배경으로 (다시 누르면 투구 확장)
    $('btnMy').onclick = myOpen;
    $('myClose').onclick = myClose;
    $('my').onclick = ev => { if (ev.target === $('my')) myClose(); };   // 바깥 어두운 곳을 누르면 닫는다
    $('myName').onkeydown = ev => { if (ev.key === 'Enter') mySaveNow(); };
    $('my').addEventListener('click', async ev => {
      const b = ev.target.closest('[data-my]'); if (!b || b.disabled) return;
      const act = b.dataset.my, id = b.closest('.my-item')?.dataset.id, e = id && myLoad().find(x => x.id === id);
      try {
        if (act === 'save') mySaveNow();
        else if (act === 'wear' && e) await myWear(e);
        else if (act === 'overwrite' && e) myOverwrite(e);
        else if (act === 'del' && e) { if (confirm(`'${e.name}' 을(를) 지울까요?`)) { myLooks = myLoad().filter(x => x.id !== id); mySave(); myRender(); myStatus('지웠습니다.'); } }
        else if (act === 'export' && e) { window.TWPack.download(await myPack(e), `${window.TWPack.safeName(e.name)}${window.TWPack.kinds.cody.ext}`); myStatus('파일로 내려받았습니다.'); }
        else if (act === 'code' && e) {
          // 짧은 코드(TW-xxxxxxx)를 만든다. 서버에 못 맡기면 긴 코드 (window.TWPack.shorten, 사이트 app.js)
          const long = await myPack(e);
          const r = window.TWPack.shorten ? await window.TWPack.shorten('cody', long) : { text: long, short: false };
          await navigator.clipboard.writeText(r.text);
          myStatus(r.short ? `코드 ${r.text} 를 복사했습니다. 받는 사람은 [코드 붙여 넣기] 로 불러옵니다.` : `${r.note ? r.note + ' ' : ''}긴 코드를 복사했습니다. 받는 사람은 [코드 붙여 넣기] 로 불러옵니다.`);
        }
        else if (act === 'file') { const f = await window.TWPack.pickFile(window.TWPack.kinds.cody.ext); if (f) await myImport(f.text); }
        else if (act === 'paste') { $('myPaste').classList.toggle('hidden'); $('myCode').focus(); }
        else if (act === 'pasteGo') { await myImport($('myCode').value); $('myCode').value = ''; $('myPaste').classList.add('hidden'); }
      } catch (err) { myStatus(err.message || '처리하지 못했습니다.'); }
    });
  }

  // ---------------------------------------------------------------- 보유 아바타
  // (2026-11-19 사용자) 가진 아바타를 체크해 두고 랜덤을 그 안에서만 돌린다 (settings.randOwn, randomLook). 창 하나에서 부위 · 획득처(상자) 묶음 ·
  // 이름으로 찾아 체크한다. 목록은 이 브라우저(localStorage)에 남고, 계산기 · 코디처럼 코드(TW-xxxxxxx · 긴 코드)나 .twown 파일로 옮긴다
  // (window.TWPack, 종류 'own'). 아이템 번호는 캐릭터끼리 같아서 목록은 하나다 (무기 · 보조만 캐릭터마다 번호가 달라, 그것만 캐릭터마다 따로 체크하게 된다). 헤어는 번호 체계가 달라 따로 둔다.
  // 저장 꼴: 번호를 작은 것부터 늘어놓고 앞 번호와의 차이를 36진수로, 이어지는 번호는 '차이-더 이어지는 개수' 로 줄인다 (상자째 체크하면 번호가 이어진다)
  // 내보낼 때(코드 · 파일)는 아직 나오지 않은 아이템 · 헤어 번호를 뺀다
  const OWN_LS = 'tw_avatar_owned', OWN_MAX = 30000, OWN_AUTO_OPEN = 400;
  // 입은 칸(SLOT_ORDER)과 같은 순서 (2026-11-19 사용자). 무기 칸은 목록 단추처럼 확장 무기(아바타) · 일반 무기([장비])로 나눠 보인다
  const OWN_SLOTS = ['head', 'face', 'body', 'back', 'foot', 'hair', 'costume', 'weapon_av', 'weapon_eq', 'sub'];
  const OWN_TOP = ['hair', 'costume', 'weapon_av', 'weapon_eq', 'sub'];                 // 상자 묶음이 없는 부위: 목록 맨 위에 이 순서로
  const OWN_LABEL = { head: '투구 확장', face: '머리 확장', body: '몸 확장', back: '효과 확장', foot: '다리 확장', costume: '확장 의상', weapon_av: '확장 무기', weapon_eq: '일반 무기', sub: '보조', hair: '헤어' };
  const OWN_SHORT = { head: '투구', face: '머리', body: '몸', back: '효과', foot: '다리', costume: '의상', weapon_av: '확장', weapon_eq: '일반', sub: '보조', hair: '헤어' };
  const packIds = ids => {
    const a = [...new Set(ids)].filter(n => Number.isInteger(n) && n >= 0).sort((x, y) => x - y), out = [];
    let prev = 0;
    for (let i = 0; i < a.length;) {
      let j = i; while (j + 1 < a.length && a[j + 1] === a[j] + 1) j++;
      out.push((a[i] - prev).toString(36) + (j > i ? '-' + (j - i).toString(36) : ''));
      prev = a[j]; i = j + 1;
    }
    return out.join(',');
  };
  const unpackIds = text => {
    const out = []; let prev = 0;
    for (const tok of String(text || '').split(',')) {
      const m = tok.match(/^([0-9a-z]{1,8})(?:-([0-9a-z]{1,4}))?$/); if (!m) continue;
      const start = prev + parseInt(m[1], 36), run = m[2] ? parseInt(m[2], 36) : 0;
      if (!Number.isSafeInteger(start) || out.length + run + 1 > OWN_MAX) break;
      for (let k = 0; k <= run; k++) out.push(start + k);
      prev = start + run;
    }
    return out;
  };
  // 저장: { v: 1, i, h } 목록 하나. 2026-11-19 에 잠깐(한 시간쯤) 캐릭터마다 따로 저장한 판({ v: 2, c: { 캐릭터 번호: { i, h } } })이 나갔다가
  // 되돌렸다 (사용자: 방식은 그대로, 문구만): 그 꼴로 남은 것은 캐릭터들의 목록을 하나로 합쳐 읽고 바로 다시 적어 둔다
  const own = { items: new Set(), hair: new Set() };
  const ownSave = () => { try { localStorage.setItem(OWN_LS, JSON.stringify({ v: 1, i: packIds(own.items), h: packIds(own.hair) })); return true; } catch (e) { return false; } };
  try {
    const j = JSON.parse(localStorage.getItem(OWN_LS) || '{}');
    const put = o => { if (!o) return; for (const id of unpackIds(o.i)) own.items.add(id); for (const id of unpackIds(o.h)) own.hair.add(id); };
    if (j.c && typeof j.c === 'object') { Object.values(j.c).forEach(put); ownSave(); } else put(j);
  } catch (e) { }
  const ownHas = e => (e.k === 'h' ? own.hair : own.items).has(e.id);
  const ownStatus = t => { const el = $('ownStatus'); if (el) el.textContent = t || ''; };
  const ownUi = { slot: 'all', group: 'all', q: '', only: false, open: new Set(), shut: new Set(), data: null, vis: [] };
  const ownSlotLabel = k => k === 'sub' ? SUB_LABEL[TW.S.index.chars[st.ci].name] || OWN_LABEL.sub : OWN_LABEL[k];
  // 지금 캐릭터의 목록(보유 랜덤이 고르는 범위와 같다: 아바타 + 일반 무기)과 묶음. 아바타 다섯 부위는 아바타 시트의 획득처대로 (획득처가 여럿이면 묶음마다 한 번씩 나온다),
  // 헤어 · 확장 의상 · 확장 무기 · 일반 무기(종류별) · 보조는 부위째 묶어 맨 위에, 다섯 부위 가운데 시트에 없는 것은 맨 아래 '그 밖' 에
  function ownBuild() {
    const c = st.char, secs = new Map(), ents = [];
    const weapons = c.items.filter(it => it.slot === 'weapon' && shown(it)), wAv = avOrder(weapons.filter(it => it.kind === 'avatar')), wEq = weapons.filter(it => it.kind !== 'avatar');
    const eqTypes = new Set(wEq.map(it => it.part)).size;      // 일반 무기는 종류(세검 · 장검 …)가 둘 이상이면 종류마다 한 묶음
    const sec = (key, label, g, order) => { let s = secs.get(key); if (!s) { s = { key, label, g, order, list: [] }; secs.set(key, s); } return s; };
    const add = e => {
      ents.push(e);
      const s = e.k === 'i' && SHEET_CATS.has(e.slot) && sheetById ? sheetById.get(e.id) : null;
      let n = 0;
      if (s) SRC_GROUPS.forEach(([g, label], gi) => {
        if (!s.groups.has(g)) return;
        const subs = [...s.subs].filter(k => k.startsWith(g + '|'));
        if (!subs.length) { sec(g + '|', label, g, [gi, 0, '']).list.push(e); n++; }
        for (const k of subs) { sec(k, label + ' · ' + k.slice(g.length + 1), g, [gi, subNum(k), k]).list.push(e); n++; }
      });
      if (n) return;
      // 헤어 · 확장 의상 · 확장 무기 · 일반 무기 · 보조는 상자 묶음이 없다: 부위째 한 줄씩, 목록 맨 위에 둔다 (창을 열면 바로 보이게, 2026-11-19 사용자).
      // 다섯 부위 가운데 시트에 없는 것은 맨 아래 '그 밖' 으로
      const part = SHEET_CATS.has(e.slot), ty = e.slot === 'weapon_eq' && eqTypes > 1 ? e.it.part : null;
      sec((part ? 'none|' : 'etc|') + e.slot + (ty === null ? '' : '|' + ty), ownSlotLabel(e.slot) + (ty === null ? '' : ' · ' + partLabel(ty)) + (part ? ' (획득처 정보 없음)' : ''), part ? 'none' : 'etc',
          [part ? SRC_GROUPS.length : -1, (part ? OWN_SLOTS : OWN_TOP).indexOf(e.slot), ty === null ? '' : String(ty).padStart(5, '0')]).list.push(e);
    };
    for (const slot of OWN_SLOTS) {
      if (slot === 'hair') for (const h of c.hair) add({ k: 'h', id: h.id, slot, name: h.name, it: h });
      else for (const it of slot === 'weapon_av' ? wAv : slot === 'weapon_eq' ? wEq : randPool(slot)) add({ k: 'i', id: it.id, slot, name: it.name, it });
    }
    const cmp = (a, b) => a.order[0] - b.order[0] || (a.order[1] - b.order[1]) || a.order[2].localeCompare(b.order[2], 'ko');
    return { ci: st.ci, ents, secs: [...secs.values()].sort(cmp) };
  }
  // 목록 그림: 다섯 부위는 테일즈DB 아이콘, 나머지는 내보낸 아이콘 시트의 한 칸을 30px 칸에 맞춘다 (시트에 없으면 그림 없이 이름만 - 창을 여는 것만으로 애니메이션을 받지 않게)
  function ownIcon(e) {
    const tu = e.k === 'i' && tdbIcon(e.slot, e.id);
    if (tu) return tdbHtml(tu);
    const sh = TW.iconSheet(st.ci, e.k === 'h' ? 'h' : 'i', e.id); if (!sh) return '';
    const B = 30, f = B / Math.max(sh.w, sh.h), sheetW = TW.S.index.icon.cols * sh.w, px = (B - sh.w * f) / 2, py = (B - sh.h * f) / 2;
    return `<span class="sh" style="background-image:url('${sh.url}');background-size:${sheetW * f}px auto;background-position:${-sh.x * f + px}px ${-sh.y * f + py}px;clip-path:inset(${py}px ${px}px)"></span>`;
  }
  function ownChip(e) {
    const hid = e.k === 'h' ? !!e.it.alt : st.full && skipped(e.it);
    return `<label class="own-it${hid ? ' hid' : ''}" data-k="${e.k}" data-id="${e.id}" title="${esc(e.name)}"><input type="checkbox"><span class="own-ic">${ownIcon(e)}</span><span class="own-nm">${esc(e.name)}</span><em>${OWN_SHORT[e.slot]}</em></label>`;
  }
  const ownTab = (v, label, n, of, on) => `<button type="button" class="own-tab${on ? ' on' : ''}${of ? '' : ' zero'}" data-v="${esc(v)}">${esc(label)}<em>${n.toLocaleString()}/${of.toLocaleString()}</em></button>`;
  function ownTabs() {
    const d = ownUi.data; if (!d) return;
    const cnt = list => { let n = 0; for (const e of list) if (ownHas(e)) n++; return n; };
    const slots = OWN_SLOTS.filter(k => d.ents.some(e => e.slot === k));
    $('ownSlots').innerHTML = ownTab('all', '전체', cnt(d.ents), d.ents.length, ownUi.slot === 'all') +
      slots.map(k => { const l = d.ents.filter(e => e.slot === k); return ownTab(k, ownSlotLabel(k), cnt(l), l.length, ownUi.slot === k); }).join('');
    // 획득처 묶음: 고른 부위 안에서 센다 (한 아이템이 묶음 안의 여러 상자에 들어도 한 번)
    const inSlot = e => ownUi.slot === 'all' || e.slot === ownUi.slot, by = new Map();
    for (const s of d.secs) { let m = by.get(s.g); if (!m) by.set(s.g, m = new Map()); for (const e of s.list) if (inSlot(e)) m.set(e.k + e.id, e); }
    const all = d.ents.filter(inSlot);
    $('ownGroups').innerHTML = ownTab('all', '전체', cnt(all), all.length, ownUi.group === 'all') +
      [['etc', '헤어 · 의상 · 무기'], ...SRC_GROUPS.map(([g, label]) => [g, label]), ['none', '그 밖']].filter(([g]) => by.has(g) && (by.get(g).size || ownUi.group === g))
        .map(([g, label]) => { const l = [...by.get(g).values()]; return ownTab(g, label, cnt(l), l.length, ownUi.group === g); }).join('');
    const ni = own.items.size, nh = own.hair.size;
    $('ownTotal').textContent = `선택 : 아바타 ${ni.toLocaleString()}개 헤어 ${nh.toLocaleString()}개`;
  }
  function ownRender(keep) {
    const box = $('ownList'), d = ownUi.data; if (!box || !d) return;
    const y = box.scrollTop;
    if (!listKnown) { box.innerHTML = '<div class="grid-wait" role="status"><span class="spin"></span><span>아이템 목록을 불러오는 중…</span></div>'; ownUi.vis = []; ownTabs(); return; }
    const q = ownUi.q, base = e => (ownUi.slot === 'all' || e.slot === ownUi.slot) && (!ownUi.only || ownHas(e)), vis = [];
    for (const s of d.secs) {
      if (ownUi.group !== 'all' && s.g !== ownUi.group) continue;
      const whole = !!q && nameMatch(s.label, q);                    // 상자 이름으로 찾으면 그 상자의 것이 다 나온다
      const list = s.list.filter(e => base(e) && (!q || whole || nameMatch(e.name, q)));
      if (list.length) vis.push({ s, list });
    }
    ownUi.vis = vis;
    const seen = new Set(); for (const v of vis) for (const e of v.list) seen.add(e.k + e.id);
    $('ownCount').textContent = `${seen.size.toLocaleString()}개`;
    // 묶음은 접어 둔다 (상자째 체크가 먼저다). 찾는 말이 있거나 '보유만 보기' 라서 결과가 적을 때, 묶음이 한두 개일 때는 펼친다. 손으로 펼치고 접은 것은 그대로 따른다
    const auto = vis.length <= 2 || ((!!q || ownUi.only) && seen.size <= OWN_AUTO_OPEN);
    box.innerHTML = vis.length ? vis.map((v, i) => {
      const open = ownUi.shut.has(v.s.key) ? false : ownUi.open.has(v.s.key) || auto;
      return `<div class="own-sec${open ? ' open' : ''}" data-sec="${i}"><input type="checkbox" data-secchk title="이 묶음에 보이는 것을 모두 체크 / 해제"><button type="button" class="own-sec-t" data-toggle title="펼치기 / 접기"><span class="tw">▸</span><b>${esc(v.s.label)}</b><em></em></button></div>` +
        (open ? `<div class="own-items">${v.list.map(ownChip).join('')}</div>` : '');
    }).join('') : `<div class="grid-empty">${d.ents.length ? '조건에 맞는 아바타가 없습니다.' : '이 캐릭터의 목록이 비어 있습니다.'}</div>`;
    box.scrollTop = keep ? y : 0;
    ownSync();
  }
  // 체크가 바뀐 뒤: 보이는 칸 · 묶음 줄(전부 / 일부 / 없음) · 위의 개수를 맞춘다 (목록을 다시 그리지 않아 보던 자리가 그대로다)
  function ownSync() {
    const box = $('ownList');
    box.querySelectorAll('.own-it').forEach(l => { const on = ownHas({ k: l.dataset.k, id: +l.dataset.id }); l.classList.toggle('on', on); l.querySelector('input').checked = on; });
    box.querySelectorAll('.own-sec').forEach(h => {
      const v = ownUi.vis[+h.dataset.sec]; if (!v) return;
      let n = 0; for (const e of v.list) if (ownHas(e)) n++;
      const cb = h.querySelector('input'); cb.checked = n === v.list.length; cb.indeterminate = n > 0 && n < v.list.length;
      h.classList.toggle('has', n > 0); h.querySelector('em').textContent = `${n} / ${v.list.length}`;
    });
    ownTabs(); ownBadge();
  }
  function ownBadge() {
    const b = $('btnOwn'); if (!b) return;
    const n = own.items.size + own.hair.size;
    b.querySelector('.ownic').textContent = n ? (n > 999 ? '999+' : String(n)) : '✔';
    b.classList.toggle('worn', settings.randOwn === true);
  }
  function ownSet(list, on) {
    for (const e of list) { const set = e.k === 'h' ? own.hair : own.items; if (on) set.add(e.id); else set.delete(e.id); }
    ownStatus(ownSave() ? '' : '브라우저 저장 공간에 쓸 수 없습니다 (사이트 데이터 저장이 막혀 있거나 가득 찼습니다). 창을 닫으면 사라집니다.');
    ownSync();
  }
  function ownOpen() {
    if (!st.char || st.mode === 'tf') { status('보유 아바타는 캐릭터 화면에서 엽니다.'); return; }
    ownUi.data = ownBuild(); ownStatus('');
    $('ownRand').checked = settings.randOwn === true; $('ownPaste').classList.add('hidden');
    const io = !!window.TWPack;                                 // 시뮬레이터만 따로 띄운 페이지에는 코드 · 파일이 없다
    root.querySelectorAll('#own [data-own="code"], #own [data-own="paste"], #own [data-own="export"], #own [data-own="file"]').forEach(b => b.classList.toggle('hidden', !io));
    $('own').classList.remove('hidden'); ownRender();
  }
  function ownClose() { $('own').classList.add('hidden'); }
  // 목록 · 획득처 시트가 늦게 오면 열려 있는 창을 다시 그린다
  function ownRefresh() { const el = $('own'); if (!el || el.classList.contains('hidden') || !st.char || st.mode === 'tf') return; ownUi.data = ownBuild(); ownRender(true); }
  // 내보내는 목록: 아직 나오지 않은 아이템(숨긴 목록) · 헤어(묶음이 붙인 것, 또는 지금 목록에 없는 것)는 뺀다
  function ownData() {
    const hb = st.char ? st.char.hairById : null;
    return { v: 1, i: packIds([...own.items].filter(id => !skipIds.has(id))), h: packIds([...own.hair].filter(id => hb && hb[id] && !hb[id].alt)) };
  }
  async function ownPack() {
    const d = ownData(); if (!d.i && !d.h) throw new Error('체크한 아바타가 없습니다.');
    return window.TWPack.pack('own', d);
  }
  async function ownImport(text, merge) {
    const d = await window.TWPack.unpack(text, 'own');
    if (!d || typeof d.i !== 'string') throw new Error('보유 아바타 목록이 없는 파일입니다.');
    const items = unpackIds(d.i), hair = unpackIds(d.h);
    if (!merge) { own.items.clear(); own.hair.clear(); }
    for (const id of items) own.items.add(id);
    for (const id of hair) own.hair.add(id);
    const ok = ownSave();
    ownRender(true);
    ownStatus(`아바타 ${items.length.toLocaleString()}개 · 헤어 ${hair.length.toLocaleString()}개를 ${merge ? '합쳤습니다' : '불러왔습니다'}.` + (ok ? '' : ' (브라우저에 저장하지는 못했습니다)'));
  }
  function wireOwn() {
    $('btnOwn').onclick = ownOpen;
    $('ownClose').onclick = ownClose;
    $('own').onclick = ev => { if (ev.target === $('own')) ownClose(); };   // 바깥 어두운 곳을 누르면 닫는다
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('own').classList.contains('hidden')) ownClose(); });
    $('ownRand').onchange = e => { settings.randOwn = e.target.checked; saveLS(); syncRandBtn(); ownBadge(); };
    let timer = 0;
    $('ownQ').oninput = () => { clearTimeout(timer); timer = setTimeout(() => { ownUi.q = $('ownQ').value.trim(); ownRender(); }, 120); };
    $('ownOnly').onchange = e => { ownUi.only = e.target.checked; ownRender(); };
    $('ownSlots').onclick = e => { const b = e.target.closest('[data-v]'); if (b) { ownUi.slot = b.dataset.v; ownRender(); } };
    $('ownGroups').onclick = e => { const b = e.target.closest('[data-v]'); if (b) { ownUi.group = b.dataset.v; ownRender(); } };
    $('ownList').addEventListener('change', e => {
      const t = e.target, h = t.closest('.own-sec'), it = t.closest('.own-it');
      if (h) { const v = ownUi.vis[+h.dataset.sec]; if (v) ownSet(v.list, t.checked); }
      else if (it) ownSet([{ k: it.dataset.k, id: +it.dataset.id }], t.checked);
    });
    $('ownList').addEventListener('click', e => {
      const b = e.target.closest('[data-toggle]'); if (!b) return;
      const h = b.closest('.own-sec'), v = ownUi.vis[+h.dataset.sec]; if (!v) return;
      const key = v.s.key;
      if (h.classList.contains('open')) { ownUi.shut.add(key); ownUi.open.delete(key); } else { ownUi.open.add(key); ownUi.shut.delete(key); }
      ownRender(true);
    });
    $('own').addEventListener('click', async ev => {
      const b = ev.target.closest('[data-own]'); if (!b || b.disabled) return;
      const act = b.dataset.own;
      try {
        if (act === 'all' || act === 'none') {
          const m = new Map(); for (const v of ownUi.vis) for (const e of v.list) m.set(e.k + e.id, e);
          if (!m.size) return;
          if (m.size >= 200 && !confirm(`보이는 ${m.size.toLocaleString()}개를 모두 ${act === 'all' ? '체크' : '해제'}할까요?`)) return;
          ownSet([...m.values()], act === 'all');
        }
        else if (act === 'clear') {
          if (!own.items.size && !own.hair.size) return;
          if (!confirm('체크한 보유 아바타를 전부 지울까요? (다른 캐릭터에서 체크한 무기 · 보조도 함께 지워집니다)')) return;
          own.items.clear(); own.hair.clear(); ownSave(); ownRender(true); ownStatus('전부 지웠습니다.');
        }
        else if (act === 'code') {
          // 짧은 코드(TW-xxxxxxx)를 만든다. 서버에 못 맡기면 긴 코드 (window.TWPack.shorten, 사이트 app.js)
          const long = await ownPack();
          const r = window.TWPack.shorten ? await window.TWPack.shorten('own', long) : { text: long, short: false };
          await navigator.clipboard.writeText(r.text);
          ownStatus(r.short ? `코드 ${r.text} 를 복사했습니다. [코드 붙여 넣기] 로 불러옵니다.` : `${r.note ? r.note + ' ' : ''}긴 코드를 복사했습니다. [코드 붙여 넣기] 로 불러옵니다.`);
        }
        else if (act === 'export') { window.TWPack.download(await ownPack(), `보유 아바타${window.TWPack.kinds.own.ext}`); ownStatus('파일로 내려받았습니다.'); }
        else if (act === 'file') {
          const f = await window.TWPack.pickFile(window.TWPack.kinds.own.ext); if (!f) return;
          if (!own.items.size && !own.hair.size) await ownImport(f.text, false);
          else { $('ownCode').value = f.text.trim(); $('ownPaste').classList.remove('hidden'); ownStatus('파일을 읽었습니다. 지금 목록을 바꾸려면 [바꾸기], 더하려면 [합치기] 를 눌러 주세요.'); }
        }
        else if (act === 'paste') { $('ownPaste').classList.toggle('hidden'); $('ownCode').focus(); }
        else if (act === 'pasteGo' || act === 'pasteAdd') {
          if (!$('ownCode').value.trim()) return ownStatus('코드를 붙여 넣어 주세요.');
          await ownImport($('ownCode').value, act === 'pasteAdd'); $('ownCode').value = ''; $('ownPaste').classList.add('hidden');
        }
      } catch (err) { ownStatus(err.message || '처리하지 못했습니다.'); }
    });
    ownBadge();
  }

  // 사이트의 시뮬레이터 위 줄(내 코디 · ↓ 저장 · ↑ 불러오기)이 부른다. 안 되는 까닭은 던져서 사이트가 알린다
  async function exportFile() {
    if (!window.TWPack) throw new Error('이 페이지에서는 파일로 저장할 수 없습니다.');
    if (st.ci < 0 || !TW.S.chars[st.ci]) throw new Error('아직 캐릭터를 불러오는 중입니다.');
    if (st.mode === 'tf') throw new Error('변신 망토 화면은 저장할 수 없습니다.');
    if (wearingSkipped()) throw new Error('아직 나오지 않은 아이템을 입은 코디는 파일로 저장할 수 없습니다.');
    const look = lookNow(), name = `${look.char} 코디`;
    window.TWPack.download(await window.TWPack.pack('cody', { name, look }), `${window.TWPack.safeName(name)}${window.TWPack.kinds.cody.ext}`);
  }
  async function importFile() {
    if (!window.TWPack) throw new Error('이 페이지에서는 파일을 불러올 수 없습니다.');
    const f = await window.TWPack.pickFile(window.TWPack.kinds.cody.ext);
    if (f) await myImport(f.text);
  }

  window.TWAvatarSim = { mount, snapshot, getLook, setLook, shareBlocked, openMyLooks: myOpen, openOwned: ownOpen, exportFile, importFile };
})();
