// TW avatar compositor for the browser: a port of src/avatarlib.py (plan / compose_layers / render) that works on
// the files written by src/tw_webexport.py (+ src/tw_webbundle.py).  No framework; everything is plain functions on a
// shared `TW` object.
//
//   TW.load(baseUrl)                         -> boot.json (or index.json + extras.json + dyes)
//   TW.loadChar(ci)                          -> chars/<ci>.json (cached)
//   TW.prepare(pose)                         -> fetches every animation and texture the pose needs
//   TW.compose(pose, tick)                   -> [{z, pri, ei, img, sx, sy, w, h, x, y, flip, tag, blend}]
//   TW.render(canvas, pose, tick, opts)      -> draws one frame (centered like the desktop app)
//   TW.maxDuration(pose), TW.frameTimes(pose)
//
// pose = {char, motion, dir, hair, dye (0 = none, 1-6), items: [...], hairMode: 'all'|'front'|'back'|'none', hidden: Set,
//         eye (컬러렌즈 style: data ids 2-6, the page shows 1-5; 0 = none), eyeDye / lipDye (index into facedye lens[eye] / lip, -1 = 기본색), lip (bool)}
'use strict';
const TW = (() => {
  const S = { base: '', ver: 0, verP: null, index: null, extras: null, chars: {}, anims: {}, texs: {}, tm: {}, pending: {}, dye: { styles: {}, tex: [] }, dyeTex: new Set(), cdye: { items: {}, tex: [] },
              tdb: null, tdbSheet: null,
              alt: '', altAnims: new Set(), altTexs: new Set(), altKeys: [], generic: new Set(),
              sign: '', passP: null, passAt: 0, passTimer: 0 };   // the pass for the animation / atlas files (see pass() below)   // the private bundle (mergeBundle): its base URL, the animation / atlas ids it brought, the extras keys it added
  const v = () => (S.ver && /^https?:\/\//i.test(S.base) ? '?v=' + S.ver : '');
  // 사이트에서 부르는 캐릭터 이름 (게임 자료 이름 → 사이트 이름). load() 가 index 의 이름을 이것으로 바꾼다
  const CHAR_RENAME = { '아나벨': '아나이스' };
  const charName = name => CHAR_RENAME[name] || name;
  const ext = () => (S.index && S.index.img_ext) || '.webp';   // image format of atlases / icon sheets (index.json img_ext)

  // browser-cache generation of the CDN files (cg=): bump it when browsers hold copies they cannot use. Generation 2:
  // copies saved before cdn.talesdb.xyz (CloudFront since 2026-10-10) sent Access-Control-Allow-Origin. A revalidation
  // of such a copy is answered 304 without CORS headers, so the browser kept the header-less copy and blocked it
  const CG = 'cg=2';
  const bust = url => (/^https?:\/\//i.test(url) ? url + (url.includes('?') ? '&' : '?') + CG : url);
  // The pass for the animation / atlas files (api/sim-pass.mjs; CloudFront answers 403 for those two folders without
  // it once the distribution is locked).  A site that takes the data from its own address (/_cdn/avatar-sim/) gets
  // signed cookies from /api/sim-pass: asked once before the first animation, again every 50 minutes (they last an
  // hour) and once more when a file is refused.  A page on another origin (the admin page) cannot use cookies there
  // and hands the same signature over as a query string instead: setSign('Policy=..&Signature=..&Key-Pair-Id=..').
  // Until the server is set up /api/sim-pass answers { ok: false } and nothing changes.
  const PASS_URL = '/api/sim-pass', PASS_EVERY = 50 * 60 * 1000, PASS_RETRY = 60 * 1000;
  const ownData = b => { try { const u = new URL(b, location.href); return u.origin === location.origin && u.pathname.startsWith('/_cdn/'); } catch (e) { return false; } };
  function pass(force) {
    if (!ownData(S.base)) return Promise.resolve();
    // a refused file asks again, but not more often than once a minute (a file that does not exist is refused too)
    if (S.passP && !(force && Date.now() - S.passAt > PASS_RETRY)) return S.passP;
    S.passAt = Date.now();
    S.passP = fetch(PASS_URL, { credentials: 'same-origin', cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null);
    if (!S.passTimer) S.passTimer = setInterval(() => { S.passAt = 0; S.passP = null; pass(); }, PASS_EVERY);
    return S.passP;
  }
  const setSign = q => { S.sign = String(q || '').replace(/^[?&]+/, ''); };
  const signed = url => (S.sign ? url + (url.includes('?') ? '&' : '?') + S.sign : url);
  async function getJSON(url) {
    // a file asked for with the data version (?v=) never changes under that address -> cache hard (no request at all
    // the next time; CloudFront bills per request); version.json and anything without a version is revalidated
    let r;
    try { r = await fetch(bust(url), { cache: /[?&]v=[1-9]/.test(url) ? 'force-cache' : 'no-cache' }); }
    // a cached copy without CORS headers fails the request (and a 304 revalidation keeps it): fetch it whole once,
    // which also replaces that copy in the browser cache
    catch (e) { r = await fetch(bust(url), { cache: 'reload' }); }
    // the pass ran out (a sleeping tab): take a new one and ask once more.  Only when a new pass really was taken:
    // a file that does not exist is answered 403 as well, and that must not double every such request
    if (r.status === 403 && ownData(url)) { const at = S.passAt; await pass(true); if (S.passAt !== at) r = await fetch(bust(url), { cache: 'reload' }); }
    if (!r.ok) throw new Error(url + ': ' + r.status);
    return r.json();
  }
  function once(key, fn) {                     // one in-flight promise per resource
    if (!S.pending[key]) S.pending[key] = fn().finally(() => { delete S.pending[key]; });
    return S.pending[key];
  }

  // start-up: version.json is the one file the browser always asks about; the rest (boot.json = index, extras, dyes,
  // TalesDB icon list and sheet map in one file; chars/<n>.json with its icon map) carries ?v=<version> and comes from
  // the browser cache on a later visit. An export without boot.json (or no version): the separate files, revalidated.
  // setBase() starts version.json, so loadChar() can run alongside load().
  function setBase(base) {
    const b = base.replace(/\/?$/, '/');
    if (b !== S.base || !S.verP) { S.base = b; S.verP = getJSON(b + 'version.json').then(j => (S.ver = j.stamp || 0)).catch(() => 0); }
  }
  const ver = () => S.verP || Promise.resolve(0);
  async function load(base) {
    setBase(base);
    const vv = await ver();
    const boot = vv ? await getJSON(S.base + 'boot.json?v=' + vv).catch(() => null) : null;
    const [index, extras, dye, cdye, bdye, fdye] = boot && boot.index && boot.extras ? [boot.index, boot.extras, boot.hairdye, boot.costumedye, boot.basedye, boot.facedye] : await Promise.all([
      getJSON(S.base + 'index.json'), getJSON(S.base + 'extras.json'),
      getJSON(S.base + 'hairdye.json').catch(() => null), getJSON(S.base + 'costumedye.json').catch(() => null),
      getJSON(S.base + 'basedye.json').catch(() => null), getJSON(S.base + 'facedye.json').catch(() => null)]);
    if (boot) { S.tdb = boot.tdbicons || null; S.tdbSheet = boot.tdbsheet || null; }
    // 테일즈DB 그림 한 장에 게임 아이템이 둘 이상 이어진 것: 이름이 같은 다른 아이템이다 (♣ 토끼 모자 1036077 회색 토끼 /
    // 1036198 흰 토끼 두건 - 시트의 토끼 모자는 1036077). 번호가 작은 것만 그 그림을 쓰고, 나머지는 게임 그림으로 그린다
    if (S.tdb && S.tdb.icons) {
      const seen = new Set();
      for (const id of Object.keys(S.tdb.icons).sort((a, b) => a - b)) {
        const p = S.tdb.icons[id];
        if (!seen.has(p)) { seen.add(p); continue; }
        delete S.tdb.icons[id];
        if (S.tdbSheet && S.tdbSheet.d) delete S.tdbSheet.d[id];
      }
    }
    // 캐릭터 이름: 게임 자료는 '아나벨' 이지만 사이트에서는 '아나이스' 로 부른다 (TWTools 의 내보내기도 이제 아나이스로 적는다.
    // 다시 내보내기 전의 자료가 와도 여기서 바꾼다). 예전 코디(look.char)의 '아나벨' 은 TW.charName 으로 맞춘다
    for (const c of index.chars || []) c.name = charName(c.name);
    S.index = index; S.extras = extras; S.generic = new Set(index.generic_anims || []);
    if (dye) { S.dye = dye; S.dyeTex = new Set(dye.tex); }               // no dye data: hair undyed
    if (cdye) { S.cdye = cdye; for (const t of cdye.tex) S.dyeTex.add(t); }   // no costume dye data
    if (bdye) { S.bdye = bdye; for (const t of bdye.tex) S.dyeTex.add(t); }   // no base outfit dye data
    S.face = fdye || null; if (fdye) for (const t of fdye.tex) S.dyeTex.add(t);   // 립 / 컬러렌즈 (no data: not offered)
    return S.index;
  }
  async function loadChar(ci) {
    if (S.chars[ci]) return S.chars[ci];
    return once('char' + ci, async () => {
      const vv = await ver();
      const c = await getJSON(S.base + 'chars/' + ci + '.json' + (vv ? '?v=' + vv : ''));
      // the icon map is inside the character file (tw_webbundle); an older export has it on its own
      const map = c.iconMap || await getJSON(S.base + 'icons/' + ci + '/map.json').catch(() => null);
      c.iconMap = map || { i: {}, h: {}, stamp: 0 };
      c.byId = {}; c.items.forEach((it, i) => { it.index = i; c.byId[it.id] = it; });
      c.hairById = {}; c.hair.forEach((h, i) => { h.index = i; c.hairById[h.id] = h; });
      S.chars[ci] = c; return c;
    });
  }
  // 로컬에 실제로 존재하는 에셋 번호 목록 (404 방지용 가드)
  const LOCAL_ANIMS = new Set([31, 136, 245, 516, 588, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 969, 3793, 3853, 4276, 4449, 4524, 4646, 4647, 4670, 4682, 4798, 4935, 4967, 4984, 4999, 5015, 5016, 5031, 5082, 5120, 5121, 5216, 5275, 5276, 5279, 5280, 5443, 5446, 5465, 5478, 5479, 5914, 5929, 5944, 5967, 6038, 6039, 6050, 6595, 6596, 6659, 7420, 7422, 7514, 8237, 8780, 8781, 9315, 9350, 9501, 10311, 10312, 10390, 10767, 10771, 11370, 11373, 12833, 13318, 13556, 13561, 13694, 13697, 13923, 13924, 13926, 13927, 13928, 13929, 13930, 13931, 13932, 13933, 16081, 20052, 20054, 20055, 22673, 22674, 22675, 22676, 22884, 22971, 23260, 23261, 23262, 23263, 23264, 23265, 23769, 30478, 30479, 30507, 30508, 32494, 32496, 32497, 33041, 38280, 44307, 45409, 45425, 45426, 45427, 45526, 45541, 45565, 47854, 56604, 56605, 56608, 56609, 56610, 56611, 56612, 56613, 70021, 74707, 75900, 75901, 76611, 76622, 76623, 76634, 76645, 76646, 76657, 76658, 76669, 76680, 79140, 79145, 79172, 79189, 79190, 79201, 79219, 79220, 79230, 79252, 79253, 79277, 79296, 79297, 79320, 79321, 80964, 80965, 80966, 80967, 81050, 81051, 83120, 85980, 86404, 86405, 86406, 86407, 86408, 86409, 87996, 88058, 88059, 88060, 88061, 93268, 93270, 95149, 95150, 107931, 112685, 112686, 123248]);
  const LOCAL_TEXS = new Set([1, 25, 27, 63, 105, 115, 149, 208, 244, 330, 362, 486, 487, 488, 489, 490, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 512, 738, 742, 1273, 1305, 1427, 1493, 1494, 1496, 1507, 1550, 1551, 1552, 1569, 1571, 1586, 1591, 1606, 1607, 1657, 1660, 1662, 1663, 1664, 1665, 1677, 1680, 1770, 1771, 1772, 1774, 1775, 1782, 1792, 1805, 1813, 1814, 1853, 2039, 2041, 2087, 2110, 2119, 2263, 2284, 2299, 2300, 2395, 2403, 2472, 2492, 2494, 2607, 2653, 2658, 2744, 2916, 3043, 3053, 3094, 3112, 3115, 3126, 3127, 3129, 3130, 3131, 3132, 3133, 3134, 3135, 3136, 3312, 3581, 3641, 3642, 3643, 4219, 4220, 4221, 4222, 4260, 4261, 4262, 4263, 4274, 4277, 4306, 5284, 5285, 5305, 5306, 5607, 5608, 5609, 5694, 6375, 7220, 7421, 7462, 7463, 7464, 7465, 7468, 7510, 8293, 8294, 8301, 8302, 8303, 9953, 10129, 10202, 10412, 10494, 10495, 10496, 10497, 10498, 10499, 10854, 10913, 10914, 10915, 10916, 10917, 10918, 10921, 10922, 10923, 10924, 10925, 11158, 11159, 11182, 11801, 11897, 11899, 11902, 12352, 12361, 12362, 12927, 12929, 13134, 13135, 14402, 14575, 15525, 900010, 900024]);
  const LOCAL_IDX_TEXS = new Set([32, 112, 421, 1136, 3126, 3127, 3128, 3129, 3130, 3131, 3132, 3133, 3134, 3135, 3136, 3187, 3312, 4306, 5694, 5699, 6375, 6376, 7468, 7510, 9953, 10129, 10202, 10494, 10495, 10496, 10497, 10498, 10499, 10913, 10914, 10915, 10916, 10917, 10918, 10921, 10922, 10923, 10924, 10925, 14402, 14575]);

  async function loadAnim(id) {
    if (S.anims[id] !== undefined) return S.anims[id];
    if (!LOCAL_ANIMS.has(+id)) { S.anims[id] = null; return null; }
    return once('anim' + id, async () => {
      await ver(); await pass(); let a = null;
      // an animation of the private bundle (tw_websplit) is only there; anything else is tried there too when the
      // public folder has no such file (a bundle item sharing an animation with a public one is answered publicly)
      const alt = S.alt, urls = [signed(S.base + 'anim/' + id + '.json' + v()), alt ? alt + 'anim/' + id + '.json' : null].filter(Boolean);
      if (alt && S.altAnims.has(+id)) urls.reverse();
      let from = '';
      for (const u of urls) { try { a = await getJSON(u); from = u; break; } catch (e) { a = null; } }
      // the texture frames this animation draws (tw_webbundle 't'): with them loadTex needs only the atlas image.
      // S.tm[tid] is the very object loadTex hands out as meta.f, so frames another animation brings in later show up
      if (a && a.t) {
        if (alt && from.startsWith(alt)) for (const tid in a.t) S.altTexs.add(+tid);   // its atlases are in the bundle too
        for (const tid in a.t) Object.assign(S.tm[tid] || (S.tm[tid] = {}), a.t[tid]); delete a.t;
      }
      if (a) unmirror(a);
      S.anims[id] = a; return a;
    });
  }
  // effect animations shown the same in every facing (always their reference direction): 4449 삐약삐약 젤리삐 - the chick
  // of direction 0 everywhere (in game); its other facings hold unrelated pieces (a purple spark at 2, no chick at 14 / 6).
  // Not a rule for every reference other than 2: 수호 부적 (also 0) has a real back view at 2. Same list in avatarlib.py
  const FX_FIXED_DIR = new Set([4449]);
  // effect animations whose layer keys say the opposite of where the picture hangs: 0 (in front) and 1 (behind) are
  // swapped. 115652 성스러운 빛 (DB 0296 kind 5): a sunburst on the back - on the side facings it sits toward the back
  // like 여름의 유령 / 테일즈 괴담 22972 and 사이언스 소드 115371 (same kind, same place), which key 1 in the front
  // facings and 0 in the back ones; this one alone keys 0 in front / 1 in back, so it covered the chest seen from the
  // front and went behind the body seen from the back (game: behind from the front, over the back from behind,
  // 2026-11-23 사용자: "정면에선 앞에 나오고, 후면에선 뒤에 나오는 현상"). Not in avatarlib.py yet (TWTools)
  const FX_LAYER_SWAP = new Set([115652]);
  // right-facing directions written as 'M' are the mirror image of the left-facing one (tw_webexport MIRROR_PAIRS):
  // frame keys get the mirror flag flipped and the x offset negated, everything else is the same
  const MIRROR_PAIRS = [['0', '4'], ['14', '6'], ['12', '8']];
  function unmirror(a) {
    for (const m of Object.values(a.m)) for (const [l, r] of MIRROR_PAIRS) {
      if (m[r] !== 'M') continue;
      const src = m[l];
      m[r] = { mt: src.mt, e: src.e.map(el => el.map(k => k[0] === 0 ? [0, k[1], k[2], k[3], k[4] ^ 8, -k[5], k[6], k[7]].concat(k.slice(8)) : k)) };
    }
  }
  function loadImage(url) {
    return new Promise((res, rej) => {
      const im = new Image();
      if (/^https?:\/\//i.test(url)) im.crossOrigin = 'anonymous';
      im.onload = () => res(im);
      im.onerror = () => rej(new Error(url));
      im.src = bust(url);
    });
  }
  async function loadTex(tid) {
    if (S.texs[tid] !== undefined) return S.texs[tid];
    if (!LOCAL_TEXS.has(+tid)) { S.texs[tid] = null; return null; }
    return once('tex' + tid, async () => {
      await ver(); await pass(); let t = null;
      const known = S.tm[tid] && Object.keys(S.tm[tid]).length;   // frames came with the animations: no tex/<id>.json
      // the atlas is public, or else in the private bundle (tw_websplit moves the atlases only hidden items draw)
      const bases = [[S.base, v()], S.alt ? [S.alt, ''] : null].filter(Boolean);
      if (S.alt && S.altTexs.has(+tid)) bases.reverse();
      for (const [base, vv] of bases) {
        const sg = base === S.base ? signed : u => u;     // the bundle has its own pass
        try {
          const hasIdx = S.dyeTex.has(+tid) && LOCAL_IDX_TEXS.has(+tid);
          const [meta, img, idx] = await Promise.all([known ? { f: S.tm[tid] } : getJSON(sg(base + 'tex/' + tid + '.json' + vv)), loadImage(sg(base + 'tex/' + tid + ext() + vv)),
                                                      hasIdx ? loadImage(sg(base + 'tex/' + tid + '.idx' + ext() + vv)).catch(() => null) : null]);
          if (!known) S.tm[tid] = Object.assign(meta.f, S.tm[tid] || {});
          t = { id: +tid, meta, img, idx, lum: null, dyed: {} }; break;
        } catch (e) { t = null; }
      }
      S.texs[tid] = t; return t;
    });
  }
  // additive layers: on a transparent canvas a black pixel must stay see-through, so the sprite's alpha becomes
  // max(r, g, b) (same trick as avatarlib.draw_layer); computed once per atlas on demand
  // a frame multiplied by a colour (key [8], ARGB4444; tw_webexport 'tint'): one small canvas per frame and colour, so the
  // layer draws from it as from the atlas. 마신 강림 / 리리컬 라이트 / 멜트 다운 are one yellow pillar texture tinted
  // black / pink / green this way. Returns [image, sx, sy, pseudo-texture (for lumImage)]
  function tinted(tex, cur, fr) {
    const tint = cur[8];
    if (tint === undefined) return [tex.img, fr[0], fr[1], tex];
    const key = cur[3] + ':' + tint; tex.tints = tex.tints || {};
    let t = tex.tints[key];
    if (!t) {
      const cv = document.createElement('canvas'); cv.width = fr[2]; cv.height = fr[3];
      const g = cv.getContext('2d');
      g.drawImage(tex.img, fr[0], fr[1], fr[2], fr[3], 0, 0, fr[2], fr[3]);
      g.globalCompositeOperation = 'multiply';
      g.fillStyle = `rgb(${((tint >> 8) & 15) * 17},${((tint >> 4) & 15) * 17},${(tint & 15) * 17})`; g.fillRect(0, 0, fr[2], fr[3]);
      g.globalCompositeOperation = 'destination-in';             // the multiply fill made the frame's box opaque: cut it back
      g.drawImage(tex.img, fr[0], fr[1], fr[2], fr[3], 0, 0, fr[2], fr[3]);
      const a = (tint >> 12) & 15;
      if (a < 15) { g.globalAlpha = a / 15; g.fillRect(0, 0, fr[2], fr[3]); }   // still destination-in: scales the opacity
      t = tex.tints[key] = { id: tex.id, img: cv, lum: null };
    }
    return [t.img, 0, 0, t];
  }
  function lumImage(t) {
    if (t.lum) return t.lum;
    const cv = document.createElement('canvas'); cv.width = t.img.width; cv.height = t.img.height;
    const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(t.img, 0, 0);
    const d = g.getImageData(0, 0, cv.width, cv.height), p = d.data;
    // colour stored un-premultiplied (light / brightness): drawn with 'lighter' the canvas then gains exactly the light,
    // and a transparent canvas shown over the page adds it to the background instead of tinting it darker
    for (let i = 0; i < p.length; i += 4) {
      const a = p[i + 3] / 255, r = p[i] * a, gg = p[i + 1] * a, b = p[i + 2] * a, m = Math.max(r, gg, b);
      if (m > 0) { p[i] = r * 255 / m; p[i + 1] = gg * 255 / m; p[i + 2] = b * 255 / m; }
      p[i + 3] = m;
    }
    g.putImageData(d, 0, 0); t.lum = cv; return cv;
  }

  // hair dyes (hairdye.json): the game swaps palette entries; tex/<id>.idx.png holds each pixel's palette index as grey,
  // so the dyed atlas is the original with the pixels of the ramp's indices recoloured (computed once per style / dye)
  function dyes(sid) { return S.dye.styles[sid] || []; }
  // 게임은 16비트(RGB565)로 그린다: 텍스처는 원래 RGB565 라 그대로지만, 염색으로 만든 색은 여기서 같은 칸으로
  // 깎아야 게임 화면과 값이 같다 (R·B 5비트, G 6비트, 위 비트를 아래에 채워 다시 8비트로)
  const q565 = c => { const r = c[0] >> 3, g = c[1] >> 2, b = c[2] >> 3; return [r << 3 | r >> 2, g << 2 | g >> 4, b << 3 | b >> 2]; };
  // the atlas with the pixels of the given palette indices recoloured (lut[index] = [r, g, b]); cached per key
  function lutImage(t, key, lut) {
    if (t.dyed[key]) return t.dyed[key];
    if (!t.idx) return (t.dyed[key] = t.img);
    lut = lut.map(c => c && q565(c));
    const w = t.img.width, h = t.img.height, cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const g = cv.getContext('2d', { willReadFrequently: true }); g.drawImage(t.idx, 0, 0);
    const ix = g.getImageData(0, 0, w, h).data; g.clearRect(0, 0, w, h); g.drawImage(t.img, 0, 0);
    const d = g.getImageData(0, 0, w, h), p = d.data;
    for (let k = 0; k < p.length; k += 4) {
      if (!p[k + 3]) continue; const c = lut[ix[k]]; if (c) { p[k] = c[0]; p[k + 1] = c[1]; p[k + 2] = c[2]; }
    }
    g.putImageData(d, 0, 0); return (t.dyed[key] = cv);
  }
  function dyedImage(t, sid, dye) {
    const key = sid + ':' + dye; if (t.dyed[key]) return t.dyed[key];
    const ramp = (dyes(sid)[dye - 1] || [])[2]; if (!ramp || !Object.keys(ramp).length) return (t.dyed[key] = t.img);
    const lut = new Array(256).fill(null);
    for (const i in ramp) { const c = parseInt(ramp[i], 16); lut[+i] = [c >> 16 & 255, c >> 8 & 255, c & 255]; }
    return lutImage(t, key, lut);
  }
  // 확장 의상 염색 (costumedye.json / DB 0351): a part is a run of palette indices with a base ramp (the look of white
  // dye, mostly greys); the chosen colour plus the ramp entry minus the part's first entry, per channel (avatarlib.costume_dye_palette; measured on a game capture)
  function costumeDyes(iid) { return (S.cdye.items || {})[iid] || []; }
  function costumeImage(t, iid, colours) {
    const parts = costumeDyes(iid), ks = Object.keys(colours || {}).filter(k => colours[k] && parts[k]).sort();
    if (!ks.length) return t.img;
    const key = 'c' + iid + ':' + ks.map(k => k + '=' + colours[k]).join(','); if (t.dyed[key]) return t.dyed[key];
    const old = Object.keys(t.dyed).filter(k => k[0] === 'c'); if (old.length > 24) for (const k of old.slice(0, 12)) delete t.dyed[k];   // colour-wheel dragging
    const lut = new Array(256).fill(null);
    for (const k of ks) {
      const c = parseInt(colours[k].replace('#', ''), 16), cr = c >> 16 & 255, cg = c >> 8 & 255, cb = c & 255, [, idx, base] = parts[k];
      const b0 = parseInt(base[0] || '000000', 16), cl = v => v < 0 ? 0 : v > 255 ? 255 : v;   // the part's first ramp entry = the chosen colour
      idx.forEach((pi, i) => { const b = parseInt(base[i] || 'ffffff', 16); lut[pi] = [cl(cr + (b >> 16 & 255) - (b0 >> 16 & 255)), cl(cg + (b >> 8 & 255) - (b0 >> 8 & 255)), cl(cb + (b & 255) - (b0 & 255))]; });
    }
    return lutImage(t, key, lut);
  }

  // 기본 의상 염색 (basedye.json / DB 0186 + 0068): each character's own outfit has up to 6 parts, each with up to 10
  // preset ramps {palette index: rrggbb} - the colours the game offers. choice = {part index: preset index, or 'rrggbb'
  // for a colour picked freely}
  function baseDyes(ci) { return ((S.bdye || {}).chars || {})[ci] || []; }
  // 자유 색 염색의 기준 명암 (DB 0186: 캐릭터마다 6행, 부위마다 {팔레트 번호: 색} 한 줄). basedye.json 부위의 6번째 칸에 있고 (2026-10-14~),
  // 그것이 없는 옛 데이터용으로 같은 값을 여기에도 둔다: {캐릭터: {부위 첫 팔레트 번호: '색 색 …'}} (팔레트 번호 순서대로, tw_webexport 로 만든 값)
  const BASE_RAMP = {"0":{"16":"431b3a 5c3649 7e5160 986b79 b98792 d3a3af edbfc6 ffe3e3 ffffe7","32":"150021 150021 33163f 492f52 5f4866 756179 8b7a8d a193a0 b7acb4 cdc5c7 e6e2e3","48":"233854 314c61 456475 5d7d85 7ba39f a1c4b5 c7dfcb e7f3e7","80":"a63d69 bd4d78 db658c f081a3 ffa1b8 ffbdc8 ffd9dc ffeeed ffffff"},"1":{"16":"232e42 35434e 47585b 5a6d67 6c8274 7f9881 93ad93 a7c3a5 bbd4b8 d0e5cb e7f2e5 ffffff","32":"472f27 644f48 826f69 472f27 644f48 826f69 93837e a59793 b7aba8 c9bfbe dad2d1 eae4e4 fbf7f7","48":"423432 423332 695654 907977 ae9592 ccb1ad dcc8c3 ede0da"},"2":{"16":"1f022b 33163f 492f52 5f4866 756179 8b7a8d a193a0 b7acb4 cdc5c7","32":"362924 594d52 807277 a49696 c8bbb5 f4e8d8 a6743f cdae8b f4e8d8","48":"423432 423332 695654 907977 ae9592 ccb1ad dcc8c3 ede0da fff9f2"},"3":{"16":"172b0d 2f4521 485f35 617949 7a935d 93ad72 a1b680 afc08f c1cda7 d3dabf e5e7d7 f8f4f0 f8f4f0 f8f4f0 f8f4f0 f8f4f0","32":"172b0d 314523 4b603a 667a50 809567 9aaf7d b5ca94","48":"172b0d 2f4521 485f35 617949 7a935d 93ad72 a1b680 afc08f c1cda7 d3dabf e5e7d7 f8f4f0 f8f4f0 f8f4f0 f8f4f0"},"4":{"16":"78480d 915811 a76e25 be843a d49a4e ebb063 facc75 ffe5af fff4d9","32":"362924 594d52 807277 a49696 c8bbb5 f4e8d8 a6743f cdae8b f4e8d8","48":"423432 423332 695654 907977 ae9592 ccb1ad dcc8c3 ede0da fff9f2","64":"632626 8c4e3b b57651 d9af7f ffebba","80":"42372d 5b4c3f 755c52 8f7764 a98d77 ccb89f f0e4c7 fff8e8 b57651 ffc29e ffe6d5 6b5c4f 887a6f a6988f c3b7af e1d5cf"},"5":{"32":"9e80a6 ab8fb5 b9a3c4 cfb6e0 d8cef2 e9deff ffe8ff ffffff ffffff ffffff","16":"362924 594d52 807277 a49696 c8bbb5 f4e8d8 ded2c8","48":"423432 423332 695654 907977 ae9592 ccb1ad dcc8c3 ede0da","64":"594557 755a6c 8c7089 a387a1 bfa3b4 d6bcd0 f0d8ec","80":"544161 694d75 7d5e8f 917099 b28daa d1abca f0c5e1","96":"38476b 4a66bd 5280ff 629bd9 a6e6ff e8fcff ffffff"},"6":{"16":"78480d 915811 a76e25 be843a d49a4e ebb063 facc75 ffe5af fff4d9","32":"362924 594d52 807277 a49696 c8bbb5 f4e8d8 a6743f cdae8b f4e8d8","48":"423432 423332 695654 907977 ae9592 ccb1ad dcc8c3 ede0da fff9f2","64":"632626 8c4e3b b57651 d9af7f ffebba","80":"42372d 5b4c3f 755c52 8f7764 a98d77 ccb89f f0e4c7 fff8e8 b57651 ffc29e ffe6d5 6b5c4f 887a6f a6988f c3b7af e1d5cf"},"7":{"16":"43533f 536b53 6b836f 7f9b83 93b393 abcba7 c7e7bb efffe3","32":"1f1017 2f2b29 3c3e38 4a5147 576455 697b67 7c9279 8faa8c 9dbc9a adcda7 c7e7bb e3f3dd ffffff","48":"333f2b 43533f 5a6d57 71886f 89a488 a8c5a1 dbfbcf","64":"333f2b 43533f 5a6d57 71886f 89a488 a8c5a1 bdddb1"},"8":{"16":"43533f 546550 657861 768b72 879e83 9cb596 b9cda9 d7e6bc f5ffcf","32":"533733 674943 7b5b53 977b6f af9387 c5a99f dbbfb7 f3d7cf f8e6e0 fdf6f2 fbf7f7","48":"15210d 3b3f27 615d42 887c5d ae9a78 d4b893 fbd7ae"},"9":{"16":"8c2952 a63d69 bd4d78 db658c f081a3 ffa1b8 ffacc0 ffb7c9 ffc2d2 ffcedb ffd9e4 ffe4ed ffeff6 fffbff","32":"362924 594d52 807277 a49696 c8bbb5 f4e8d8 a6743f cdae8b f4e8d8 f081a3 ffa1b8 ffbdc8 ffbdc8 fffbff","48":"53234a 683851 7d4d59 936361 b38775 d3ac89","64":"7d4d59 936361 a87869 bd9279 d3ac89 e9c699 ffe1a9 fff0d4 ffffff"},"10":{"16":"465957 566a62 667b6e 778d7a 879e86 98b092 a8bd9f b8caac c8d7b9 d8e5c6","32":"8b3334 aa5340 c9734c e99459 f0af6d f7cb82 ffe797 fff7bf","48":"1f2b17 2f3e29 3f513b 4f644d 5a7159 667e65 728c72 7e997e 89a588 95b292 a0bf9c b0ccac c1d9bc d2e6cc e3f3dd ffffff","64":"3f231f 533733 674943 7b5b53 977b6f af9387 c3a79f dbbfb7 f3d7cf fff5ed fbf7f7"},"11":{"32":"644d6a 855580 9e6d96","16":"6b4a48 78524f 8c5f53 a16d58 b2785b c28767 d6926b dea67e e8b590 ffc099 ffd8b5 fff4eb 5c1e20 6e2e2f 863b37 9e493f c26e65 dc9084 fac6b7 fffcfe ffffff","48":"9c6e96 aa7ca0 b88aaa c997b7 d8aac4 e7bed2 f2d6e3 fdeef5 ffffff","64":"443824 645834 4d1a1c 5c1e20 6e2e2f 863b37 9e493f c26e65 dc9084","80":"9e6494 b076a2 bf87ae cf99bb dbabc5 e6b8cd f1cbde f8dbe8 ffebf3 fff5f9 fffafc ffffff"},"12":{"16":"78405b a2537a cc6699 de97ab f0c9bd","32":"362924 594d52 807277 a49696 c8bbb5 f4e8d8","48":"423432 423332 695654 907977 ae9592 ccb1ad dcc8c3 ede0da","64":"683b51 894968 aa5780 cc6699 e0759c ff65d1 ffe4db c99e99 c99e99 ffc1ba ffd6d1","80":"42372d 5b4c3f 755c52 8f7764 a98d77 ccb89f f0e4c7 fff8e8"},"13":{"16":"646464 72706d 807c77 8e8881 9c948b aaa095 b8ac9f c6b8a9 d4c4b3 e2d0bd f0dcc7 ffe9d1","32":"6e6e6e 7c7976 8a857f 948b82 a99d91 beb0a1 d4c3b1 e9d6c1 ffe9d1","112":"646464 777471 8a857f 9e958c b1a69a c4b7a8 d8c7b5 ebd8c3 ffe9d1","48":"646464 837e79 a2998f c0b3a5 e0cebb ffe9d1","64":"6e6e6e 7a7673 908983 a69c92 bcafa2 d2c3b1 e8d5c1 ffe9d1","80":"646464 7d7a76 979088 b1a69a cbbcac e5d2be ffe9d1"},"14":{"32":"8f8ea2 aaaac0 bebed2 d2d3e4 e0e0ea e8ebf5 f1f6ff f5ffff","16":"6b776e 7d8781 8f9894 a1a8a7 b3b9ba c5cacd d7dae0 e9ebf3 fcfcff 6b776e 808a84 959d9a aab1b0 bfc4c6 d4d7dc e9ebf3","48":"62606c 787581 8e8a97 a49fad bab4c3 d0c9d9 e6deef fdf3ff","64":"51545d 686975 7f7f8d 9695a5 aeaabd c5c0d5 dcd6ed f4ecff","80":"3e424a 646670 8b8b96 b1b0bc d8d5e2"},"15":{"16":"351d2d 44303c 54474b 635b5b 756d66 847c74 938b7b 9d9d8c aaaa96","208":"200030 301438 402448 483850 584860 685c70 706c78 806878 1c0414 1c1424 24203c 39354c 4e4a5c 625e6c 77737c 8c888c","32":"381c50 502c60 683878 884490 984ca0 a858b0 d078c8 d890d0","48":"301c30 402838 503448 684450 805458 986460 b88480 382438 483040 603c50 704050 a85c48 c87458 f8b468 f8dc78","64":"682c28 804038 a85c48 c87458 f08c68 f8b468 f8dc78 f8fcc0","80":"200030 301438 402448 483850 682c28 804038 a85c48 c87458 f08c68 f8b468 f8dc78"},"16":{"16":"875852 a66853 ba7b54 ce8e56 e3a259 f0b762 fad27e ffe587 fdf1b9 fcfcec","32":"0f0d0d 181717 212020 2e2a2a 3d3939 4a4646 6b5f5f 7a7272","48":"524952 635c63 827d82 a19da1 c1bec1 e0dee0 ffffff","64":"251b19 342724 423230 54413d 685653 7b6864 641414 8c281c a43824 bc5034 d47454 ba7b54 ce8e56 e1a765 f4c074 ffe587","96":"344d8a 3c659e 457cb1 579dcb 68bde5 8fe3ff","112":"261d1d 362c2c 463c3b 564b4a 665b59 766a68 867a77 968986"},"17":{"16":"101010 161616 222222 2d2d2d 393939 454545 505050 5c5c5c 676767 787878 848787 989898","32":"1e1e1e 303030 363636 3c3c3c 484848 585858 686868 787878 878787 9b9b9b","48":"797979 878787 989898 a9a9a9 bababa c8c8c8 d7d7d7 e0e0e0 f0f0f0 ffffff","64":"242424 383838 404040 505050 686868 919191 aaaaaa f8f4f0","80":"242424 303030 404040 585858 6e6e6e 7d7d7d 8c8c8c a0a0a0 242424 363636 444444 525252 606060 6e6e6e c4c4c4","96":"282828 383838 484848 585858 696969 787878 878787 a0a0a0"},"18":{"176":"7f7f7f 929292 a4a4a4 b8b8b8 c8c8c8 d8d8d8 e8e8e8 f2f2f2 f9f9f9 fafafa 5b5b5b 6c6c6c 858585 9f9f9f","32":"171717 2b2b2b 3f3f3f 535353 6c6c6c 909090 b4b4b4 cecece f5f5f5 191421 29283a 423d4a 52515a 6b6973","48":"262626 373737 474747 585858 737373 939393 5c5957 807c7b a39f9e cdcbce f7f7ff 171717 2b2b2b 3f3f3f 535353 6c6c6c","64":"111111 212121 323232 434343 535353 636363 737373 363636 494949 5c5c5c 757575","80":"111111 1f1f1f 2d2d2d 3c3c3c 4b4b4b 5a5a5a 686868 767676","96":"1d1d1d 2a2a2a 373737 4a4a4a 636363 818181 acacac d9d9d9"}};
  function baseRampOf(ci, k) {
    const p = baseDyes(ci)[k]; if (!p) return null;
    if (Array.isArray(p[5]) && p[5].length) return p[5];                  // basedye.json (tw_webexport, 2026-10-14~): DB 0186 그대로
    const r = p[1] && (BASE_RAMP[ci] || {})[p[1][0]];
    return r ? r.split(' ') : null;
  }
  // a freely picked colour: the part's shading (each palette index's brightness, averaged over the part's presets) put
  // on that colour. The index a preset's swatch shows (45% into the run, app.js presetSwatch) gets the colour itself;
  // the others are the colour times that index's brightness ratio, so a dark colour stays dark all the way up - the
  // game's own dark dyes do the same (도토리색 runs 3f1300 → db9f63, it never reaches white)
  const luma = c => 0.299 * (c >> 16 & 255) + 0.587 * (c >> 8 & 255) + 0.114 * (c & 255);
  // 밝은 색은 칸마다 곱하다 보면 천장에 부딪힌다. 이 밝기부터는 천천히 다가가게 눌러 둔다: 게임의 밝은 염색약도
  // 위쪽 칸의 차이가 좁고 (화이트 a99b98 → fbf7f7, 1.56배), 어두운 염색약은 그대로 벌어진다 (다크그레이 2.75배)
  const KNEE = 178;
  const softL = l => (l <= KNEE ? l : KNEE + (255 - KNEE) * (1 - Math.exp(-(l - KNEE) / (255 - KNEE))));
  // 그러고도 255 를 넘는 채널이 생기면 넘친 만큼 흰색 쪽으로 풀어 준다. 그냥 자르면 색이 틀어진다 (빨강만 넘치면
  // 주황이 된다). 밝기는 지키고 채도만 깎는 셈이라, 밝은 색의 위쪽 칸이 게임처럼 하얘진다
  function toneRGB(rgb) {
    const l = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
    if (l >= 255) return [255, 255, 255];
    let s = 1;
    for (const v of rgb) if (v > l) s = Math.min(s, (255 - l) / (v - l));
    return rgb.map(v => Math.round(Math.max(0, Math.min(255, l + (v - l) * s))));
  }
  // 게임의 자유 색 염색은 확장 의상 염색과 같은 덧셈이다: 고른 색 + 기준 명암[i] - 기준 명암[0] (채널마다, 0~255).
  // 고른 색이 부위의 첫 (가장 어두운) 칸이 된다. 벤야 겉치마를 150 1 50 / 150 150 1 / 1 30 130 으로 염색한 게임
  // 화면과 칸마다 맞춰 봤다 (RGB565 로 깎으면 일곱 칸 모두 같은 값). 기준 명암이 없는 부위만 아래 옛 방식으로 칠한다
  function partRamp(ci, k, hex) {
    const p = baseDyes(ci)[k], base = baseRampOf(ci, k);
    if (!p) return {};
    if (!base) return customRamp(p[2], hex);
    const c = parseInt(hex, 16), rgb = [c >> 16 & 255, c >> 8 & 255, c & 255], b0 = parseInt(base[0], 16), ramp = {};
    const cl = v => (v < 0 ? 0 : v > 255 ? 255 : v);
    p[1].forEach((pi, i) => {
      if (base[i] === undefined) return;
      const b = parseInt(base[i], 16);
      ramp[pi] = [16, 8, 0].map((s, j) => cl(rgb[j] + (b >> s & 255) - (b0 >> s & 255)).toString(16).padStart(2, '0')).join('');
    });
    return ramp;
  }
  function customRamp(presets, hex) {
    const ks = Object.keys(presets[0] || {}).map(Number).sort((a, b) => a - b), c = parseInt(hex, 16), rgb = [c >> 16 & 255, c >> 8 & 255, c & 255];
    const L = k => { const v = presets.filter(r => r && r[k]).map(r => luma(parseInt(r[k], 16))); return v.reduce((a, b) => a + b, 0) / (v.length || 1); };
    const ref = Math.max(1, L(ks[Math.floor(ks.length * 0.45)])), ramp = {};
    for (const k of ks) {
      const want = rgb.map(v => v * L(k) / ref), lw = 0.299 * want[0] + 0.587 * want[1] + 0.114 * want[2];
      // 누르는 것은 밝은 쪽 칸에서만: 고른 색이 들어가는 칸(L(k) = ref)은 그 색 그대로여야 한다
      const f = lw > 0 && L(k) > ref ? softL(lw) / lw : 1;
      ramp[k] = toneRGB(want.map(v => v * f)).map(v => v.toString(16).padStart(2, '0')).join('');
    }
    return ramp;
  }
  function baseImage(t, ci, choice) {
    const parts = baseDyes(ci), ks = Object.keys(choice || {}).filter(k => parts[k] && (typeof choice[k] === 'string' || parts[k][2][choice[k]])).sort();
    if (!ks.length) return t.img;
    const key = 'b' + ci + ':' + ks.map(k => k + '=' + choice[k]).join(','); if (t.dyed[key]) return t.dyed[key];
    const old = Object.keys(t.dyed).filter(k => k[0] === 'b'); if (old.length > 24) for (const k of old.slice(0, 12)) delete t.dyed[k];   // colour-square dragging
    const lut = new Array(256).fill(null);
    for (const k of ks) {
      const ramp = typeof choice[k] === 'string' ? partRamp(ci, +k, choice[k]) : parts[k][2][choice[k]];
      for (const i in ramp) { const c = parseInt(ramp[i], 16); lut[+i] = [c >> 16 & 255, c >> 8 & 255, c & 255]; }
    }
    return lutImage(t, key, lut);
  }

  // 립 / 컬러렌즈 (facedye.json, the unreleased 꾸미기 - DB 0298 col 10 / 11, colours DB 0233-0237): per character the lip
  // animation and eye styles 1-6 (small sprites on face layers 15 / 14, front facings only); a dye swaps palette entries
  // like a hair dye. faceAnims(ci) = {lip, eyes: {style: anim}}
  function faceAnims(ci) { return ((S.face || {}).chars || {})[ci] || null; }
  function faceDyes(kind, style) { const f = S.face || {}; return (kind === 'lip' ? f.lip : (f.lens || {})[style]) || []; }
  function faceImage(t, kind, style, k) {
    const ramp = k >= 0 ? (faceDyes(kind, style)[k] || [])[2] : null; if (!ramp || !Object.keys(ramp).length) return t.img;
    const key = 'f' + kind + style + ':' + k; if (t.dyed[key]) return t.dyed[key];
    const lut = new Array(256).fill(null);
    for (const i in ramp) { const c = parseInt(ramp[i], 16); lut[+i] = [c >> 16 & 255, c >> 8 & 255, c & 255]; }
    return lutImage(t, key, lut);
  }
  // the face parts a pose wears: [[anim, tag]] - on the character's own body or an outfit that keeps the character (not
  // a transform cloak / painted vehicle row)
  function faceParts(pose) {
    const f = faceAnims(pose.char); if (!f) return [];
    const out = [];
    if (pose.eye && f.eyes[pose.eye]) out.push([f.eyes[pose.eye], 'eye']);
    if (pose.lip && f.lip) out.push([f.lip, 'lip']);
    return out;
  }

  // ------------------------------------------------------------------ animation sampling
  function motionsOf(a) { return a ? Object.keys(a.m).map(Number) : []; }
  // an effect that hangs on a weapon (only motion 0, its frames on attach points: 108892 / 113556 소드셰이프 광선,
  // 132576 ...): plan() plays it on its own loop in any motion the weapon is held in
  const rideCache = new Map();
  function ridesOnWeapon(a) {
    if (rideCache.has(a)) return rideCache.get(a);
    const ids = motionsOf(a); let fr = 0, att = 0;
    if (ids.length === 1 && ids[0] === 0) for (const d of Object.values(a.m[0])) if (d !== 'M') for (const e of d.e) for (const k of e) if (k[0] === 0) { fr++; if (k[7]) att++; }
    const r = fr > 0 && att * 2 >= fr;
    rideCache.set(a, r); return r;
  }
  function resolveMotion(a, ...wanted) {
    const ids = motionsOf(a);
    for (const m of wanted) {
      if (m === 'any') { if (ids.length) return ids[0]; }
      else if (m !== null && m !== undefined && ids.includes(m)) return m;
    }
    return null;
  }
  // an animation whose motions all hold a single direction (effect auras made for direction 2 only) is the same in every
  // facing (avatarlib.AvatarData._dirs)
  function dirData(a, motion, dir) {
    const m = a && a.m[motion]; if (!m) return null;
    if (m[dir]) return m[dir];
    if (a.anyDir === undefined) a.anyDir = Object.values(a.m).every(x => Object.keys(x).length === 1);
    return a.anyDir ? Object.values(m)[0] : null;
  }
  function duration(a, motion, dir) { const d = dirData(a, motion, dir); return d ? d.mt : 0; }

  // {element: opacity 0..255} at tick tt (avatarlib.element_alpha): alpha key [9, elem, target, tick, fade ticks, from 0]
  // moves the element's opacity to `target` from `tick` over `fade ticks` (255 or missing: at once); from 0 = fade in
  function elementAlpha(akeys, tt) {
    const seg = {};
    const at = (s, t) => s[3] <= 0 ? s[1] : s[0] + (s[1] - s[0]) * Math.min(1, Math.max(0, t - s[2]) / s[3]);
    for (const k of akeys.slice().sort((a, b) => (a[3] || 0) - (b[3] || 0))) {
      const t0 = k[3] || 0; if (t0 > tt) break;
      const dur = k[4] === undefined ? 255 : k[4];
      const start = k[5] === 1 ? 0 : (seg[k[1]] ? at(seg[k[1]], t0) : 255);
      seg[k[1]] = [start, k[2], t0, dur >= 255 ? 0 : dur];
    }
    const out = {}; for (const c in seg) out[c] = Math.round(at(seg[c], tt)); return out;
  }

  // [(img, sx, sy, w, h, x, y, flip, layer, ei, blend)] of one animation at motion/dir/tick.
  // parent: {attachName: [x, y, ofsx, ofsy]} (un-mirrored attach points of what was drawn before);
  // attachOut: receives this animation's attach points; loose: draw attach keys at their own offset when no parent.
  // an attached frame turned / scaled about its attach point: the box it ends up in (compose.js draws it with a canvas transform)
  const ROT_SIGN = 1;                                        // avatarlib.ATTACH_ROT_SIGN
  const pv0 = attr => attr ? attr.p[0] : 0, pv1 = attr => attr ? attr.p[1] : 0;
  function spinBox(w, h, pv, deg, scx, scy) {
    const cx = -pv[0], cy = -pv[1], t = deg * ROT_SIGN * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    const xs = [], ys = [];
    for (const x of [0, w]) for (const y of [0, h]) { const X = (x - cx) * scx, Y = (y - cy) * scy; xs.push(X * c - Y * s); ys.push(X * s + Y * c); }
    const minx = Math.floor(Math.min(...xs)), miny = Math.floor(Math.min(...ys));
    return { minx, miny, w: Math.max(1, Math.ceil(Math.max(...xs)) - minx), h: Math.max(1, Math.ceil(Math.max(...ys)) - miny), cx, cy, scx, scy };
  }
  function animLayers(a, motion, dir, t, parent, attachOut, loose, onClock) {
    const d = dirData(a, motion, dir); if (!d) return [];
    const out = []; let layer = 1; const blend = {}, akeys = [];
    for (const e of d.e) for (const k of e) { if (k[0] === 6) layer = k[1]; else if (k[0] === 10) blend[k[1]] = k[2]; else if (k[0] === 9) akeys.push(k); }
    // 보통은 애니메이션마다 제 길이로 되풀이한다. onClock (렌즈·립): 몸의 시계를 그대로 따르고 되감지 않는다 - 제 길이보다
    // 짧으면 끝 키(12) 뒤로는 감춰져 몸의 눈이 보인다 (벤야 대기 12·8 방향: 렌즈 90틱, 몸 170틱 - 되감으면 손을 드는 동안
    // 렌즈가 처음 자리에 박혀 보였다)
    const tt = onClock !== undefined ? onClock : d.mt > 0 ? t % (d.mt + 1) : 0;
    const alpha = elementAlpha(akeys, tt);
    // attach points: within one animation the first element that has a point keeps it. A later small piece can carry a
    // copy of the body's whole list measured from its own frame (로아미니 idle, facing 12 / 8: a 4x3 sprite at the feet from
    // tick 90 lists Head / Hair1 ... too), which put the hair at her feet. Other animations (items) may still override
    const own = new Set();
    d.e.forEach((e, ei) => {
      let cur = null;
      for (const k of e) {
        if (k[0] === 0 && k[1] <= tt) cur = k;
        else if (k[0] === 12 && k[1] <= tt) cur = null;           // end key: hidden from this tick on
      }
      if (!cur) return;
      const hidden = alpha[ei] === 0;                                // an effect's origin marker: not drawn, but its attach points count
      const tex = S.texs[cur[2]]; if (!tex) return;
      const fr = tex.meta.f[cur[3]]; if (!fr) return;
      let ux = fr[4], uy = fr[5], ox = cur[5], oy = cur[6];
      const attr = fr[6] || null;
      let rot = null, rotDeg = 0, hungOn = null;
      const [timg, tsx, tsy, ttex] = tinted(tex, cur, fr);
      if (cur[7]) {                                                // attach-point key
        const name = attr ? attr.n : '';
        if (parent && parent[name]) {
          hungOn = name;
          const p = parent[name], pv = attr ? attr.p : [0, 0]; uy = p[1] + pv[1]; ox = p[2]; oy = p[3];
          // 0x40 on an attach-point key: the opposite facing's picture - mirrored about the point it hangs on, so the
          // pivot comes out on the other side (검은 바람 필드 정면좌: the tail streams the other way, the wrap stays on the neck)
          ux = cur[4] & 64 ? p[0] - pv[0] - fr[2] : p[0] + pv[0];
          const ang = p[4] || 0, scx = p[5] || 1, scy = p[6] || 1;        // scale 0 = not set (예프넨 잠옷 'Head'), not invisible
          if (ang || scx !== 1 || scy !== 1) { rot = spinBox(fr[2], fr[3], pv, ang, scx, scy); rotDeg = ang * ROT_SIGN; }   // the point's rotation / scale (예프넨 소드셰이프 beam)
        }
        else if (!loose || name.startsWith('Effect')) return;   // no such point: not shown; loose (icons) only for parts hanging on the body
      }
      // a frame hanging on a point does not hand that same point on: 블랙로즈의 뿔 (front + back halves, both on 'Head')
      // carries its own 'Head' at its pivot - passing it on moved the body's Head, and the second half floated up-left
      if (attachOut && attr && attr.s) for (const n in attr.s) { if (own.has(n) || n === hungOn) continue; own.add(n); const s = attr.s[n]; attachOut[n] = [ux + s[0], uy + s[1], ox, oy, s[2] || 0, s[3] || 1, s[4] || 1]; }
      if (hidden) return;
      if (rot) {                                                   // drawn with a transform (drawLayers); x / y / w / h = its box
        const flip = (cur[4] & 8) !== 0, bx = ux - pv0(attr) + rot.minx;    // ux - pivot = the parent point
        const x = flip ? -(bx + rot.w) + ox : bx + ox;
        out.push({ img: timg, tex: ttex, sx: tsx, sy: tsy, w: rot.w, h: rot.h, x, y: uy - pv1(attr) + rot.miny + oy, flip, layer, ei,
                   blend: blend[ei] || 0, alpha: alpha[ei] !== undefined ? alpha[ei] / 255 : 1,
                   rot: { deg: rotDeg, scx: rot.scx, scy: rot.scy, cx: rot.cx, cy: rot.cy, px: (flip ? -(ux - pv0(attr)) : ux - pv0(attr)) + ox, py: uy - pv1(attr) + oy, fw: fr[2], fh: fr[3] } });
        return;
      }
      // flag 8: mirrored about the anchor (the mirrored directions); flag 0x40: the picture flipped where it stands - a
      // texture without mirrored copies of its frames reuses them this way (이스핀 이클립스 방패 = the 어비스 shield's
      // mirrored frames 5-7; a spinning object's second half). Both: the picture comes out unflipped, placed mirrored.
      // On an attach-point key the picture is mirrored about its point (placed above, where the parent's point is used)
      const about = (cur[4] & 8) !== 0, flip = about !== ((cur[4] & 64) !== 0);
      const x = about ? -(ux + fr[2]) + ox : ux + ox;
      out.push({ img: timg, tex: ttex, sx: tsx, sy: tsy, w: fr[2], h: fr[3], x, y: uy + oy, flip, layer, ei, blend: blend[ei] || 0, alpha: alpha[ei] !== undefined ? alpha[ei] / 255 : 1 });
    });
    return out;
  }

  // ------------------------------------------------------------------ plan: what takes part in a pose
  function hairLayersOf(a) {
    const keys = new Set();
    for (const m in a.m) for (const dv in a.m[m]) for (const e of a.m[m][dv].e) for (const k of e) if (k[0] === 6) keys.add(k[1]);
    const F = S.index.hair_front_layers, B = S.index.hair_back_layers;
    if (keys.size && [...keys].every(k => F.includes(k))) return 'front';
    if (keys.size && [...keys].every(k => B.includes(k))) return 'back';
    return 'mixed';
  }
  function plan(pose) {
    const c = S.chars[pose.char], ix = S.index.chars[pose.char], X = S.extras;
    const items = (pose.items || []).filter(i => !(pose.hidden && pose.hidden.has(i)));
    let body = ix.body, bm = pose.motion, drawBody = true;
    // DB 0298 col 8 row 12: the body that holds a weapon (벤야 only: 38281 draws the shaft her 사이드 / 해머 skins leave out)
    const wb12 = c.weapon_body && c.weapon_body['12'];
    if (wb12 && wb12 !== 65535 && wb12 !== ix.body && items.some(i => (c.byId[i] || {}).slot === 'weapon')) body = wb12;
    const hairRec = pose.hair >= 0 ? c.hairById[pose.hair] : null;
    let drawHair = !!hairRec; let rest = items.slice(); const extra = [];
    // pose.raw (cloak screen): pose.motion is the cloak animation's own motion id, not a character motion to map
    const tf = items.map(i => [i, X.transforms[i]]).find(([i, tr]) => tr && (pose.raw || tr.motions[pose.motion] !== undefined));
    const veh = items.map(i => [i, X.vehicles[i]]).find(([i, v]) => v);
    if (tf) {
      const [iid, tr] = tf;
      body = tr.anim; bm = pose.raw ? pose.motion : tr.motions[pose.motion];
      // an outfit with the hair painted in: a chosen hair style is drawn on the hairless body (DB 0293 alt 0, avatarlib.bald_body)
      if (tr.costume && tr.hair_baked && drawHair && tr.bald) body = tr.bald;
      else if (!tr.costume || tr.hair_baked) drawHair = false;
      rest = !tr.costume ? [] : rest.filter(i => i !== iid && ['head', 'face', 'body', 'back', 'foot', 'weapon', 'sub'].includes((c.byId[i] || {}).slot));
      if (tr.effect) extra.push([tr.effect, [bm], 3, 'transform' + iid + '_fx']);   // only in the motions the overlay was made for
    } else if (veh) {
      let [iid, v] = veh;
      const alt = v.alt && v.alt[pose.char]; if (alt) v = X.vehicles[alt];   // generic old vehicle -> this character's painted row
      const gi = Math.min(S.index.vehicle_group[pose.motion] || 0, v.groups.length - 1), g = v.groups[gi];
      if (g.vehicle[0] === 65535) drawBody = drawHair = false;           // painted row: the rider anim already holds the seated character
      else if (g.motion) bm = g.motion;
      else if (motionsOf(S.anims[body]).includes(14)) bm = 14;          // no rider motion given: sit (a guess)
      for (const key of ['rider', 'vehicle', 'effect']) { const [a, m] = g[key]; if (a && a !== 65535) extra.push([a, [m, bm, 0, 'any'], 3, 'vehicle' + iid + '_' + key]); }
      rest = rest.filter(i => i !== iid);
    }
    const out = [[body, drawBody ? [bm] : null, 0, 'body']];
    if (drawHair && pose.hairMode !== 'none') {
      for (const a of hairRec.anims) {
        const A = S.anims[a]; if (!A) continue;
        const part = hairLayersOf(A);
        if (pose.hairMode === 'front' && part === 'back') continue;
        if (pose.hairMode === 'back' && part === 'front') continue;
        out.push([a, [bm, 0], 2, 'hair']);
      }
    }
    // the face parts follow the body motion only (no fallback to the idle face in motions they lack)
    if (drawBody && (!tf || tf[1].costume)) for (const [a, tag] of faceParts(pose)) out.push([a, [bm], 2, tag]);
    out.push(...extra);
    rest.forEach((iid, n) => {
      const it = c.byId[iid]; if (!it) return;
      if (X.footprints[iid]) { out.push([X.footprints[iid], 'foot', 4 + n, 'foot' + iid]); return; }
      if (it.src === 'transform' || it.src === 'vehicle') return;   // not active in this motion: draws nothing (avatarlib.plan)
      // effect / pet items: one fixed motion (skill-effect skins that only have the cast motion: that one). A shared body
      // overlay (index generic_anims: 23774 아나이스's hand on the hat in the idle gesture) only in motions it has - the 기본
      // fallback put the standing hands at head height while seated. Weapons too: a weapon without frames for the motion
      // is not held in it (달리기 has none - the game puts the weapon away), so no idle fallback: the idle weapon showed up
      // at the start of each run cycle and vanished
      // A weapon's light (예프넨 소드셰이프 광선, 132576 의 반짝임 ...) is its own animation with only motion 0, hung on the
      // weapon's Effect points: the game plays it on its own loop whenever the weapon is out. 'ride' asks for that (resolve
      // below); without the weapon there is no point to hang on, so nothing shows. pose.weaponFx === false turns off the 광선
      const wpn = it.slot === 'weapon' || it.slot === 'sub';
      it.anims.forEach((a, k) => out.push([a, it.fxm ? [it.fxm[k], 'any'] : (S.generic.has(+a) ? [bm] : wpn ? [bm, 'ride'] : [bm, 0]), 4 + n, 'item' + iid, !!(it.fxh && it.fxh[k]), it.fxd ? it.fxd[k] : null, it.fxl ? it.fxl[k] : null]));
    });
    // resolve motions now that we know the animations
    return out.map(([a, want, pri, tag, head, fd, fl]) => {
      const A = S.anims[a];
      let m = null;
      if (want === 'foot') m = 'foot';
      else if (want && A && want[1] === 'ride') {
        m = resolveMotion(A, want[0]);
        // pose.weaponFx === false: 예프넨 소드셰이프 광선 (WEAPON_BEAM) only - the other lights always show
        if (m === null && ridesOnWeapon(A) && (pose.weaponFx !== false || !WEAPON_BEAM.has(+a))) m = 0;
      }
      else if (want && A) m = resolveMotion(A, ...want);
      return { a, m, pri, tag, head: !!head, fd: fd ?? null, fl: fl ?? null };   // fd / fl: an effect's own direction / default layer (avatarlib.fx_dir / fx_layer)
    });
  }
  function animIds(pose) {                                   // every animation id a pose may touch (for prefetch)
    const c = S.chars[pose.char], ix = S.index.chars[pose.char], X = S.extras, ids = new Set([ix.body]);
    if (c.weapon_body && c.weapon_body['12'] && c.weapon_body['12'] !== 65535) ids.add(c.weapon_body['12']);   // weapon-holding body (벤야)
    const h = pose.hair >= 0 ? c.hairById[pose.hair] : null; if (h) h.anims.forEach(a => ids.add(a));
    for (const [a] of faceParts(pose)) ids.add(a);
    for (const i of pose.items || []) {
      const it = c.byId[i]; if (it) it.anims.forEach(a => ids.add(a));
      const tr = X.transforms[i]; if (tr) { ids.add(tr.anim); if (tr.bald) ids.add(tr.bald); if (tr.effect) ids.add(tr.effect); }
      let v = X.vehicles[i]; if (v && v.alt && v.alt[pose.char]) v = X.vehicles[v.alt[pose.char]];
      if (v) for (const g of v.groups) for (const k of ['rider', 'vehicle', 'effect']) if (g[k][0] && g[k][0] !== 65535) ids.add(g[k][0]);
      if (X.footprints[i]) ids.add(X.footprints[i]);
    }
    return [...ids];
  }
  function animBottom(A, motion, dir) {                       // lowest row any frame of the motion reaches (avatarlib.anim_bottom)
    const d = dirData(A, motion, dir); let low = 0;
    if (d) for (const e of d.e) for (const k of e) { if (k[0] !== 0) continue; const t = S.texs[k[2]], fr = t && t.meta.f[k[3]]; if (fr) low = Math.max(low, fr[5] + k[6] + fr[3]); }
    return low;
  }
  function texIds(animList) {
    const t = new Set();
    for (const a of animList) { const A = S.anims[a]; if (!A) continue; for (const m in A.m) for (const dv in A.m[m]) for (const e of A.m[m][dv].e) for (const k of e) if (k[0] === 0) t.add(k[2]); }
    return [...t];
  }
  async function prepare(pose, onProgress) {
    await loadChar(pose.char);
    const ids = animIds(pose);
    await Promise.all(ids.map(loadAnim));
    const tids = texIds(ids); let n = 0;
    await Promise.all(tids.map(t => loadTex(t).then(() => { n++; if (onProgress) onProgress(n, tids.length); })));
  }

  // ------------------------------------------------------------------ compose
  const BODY_Z = 0;
  function z(a) { if (S.index.marker_layers.includes(a)) return -1000; return S.index.layer_pos[a] || 0; }
  // the layer a direction's layer key sets (the last one, as animLayers reads it); null: the direction has none
  function keyLayer(a, motion, dir) {
    const d = dirData(a, motion, dir); if (!d) return null; let l = null;
    for (const e of d.e) for (const k of e) if (k[0] === 6) l = k[1];
    return l;
  }
  // 예프넨's 소드셰이프 light blades: shared by most of them (motion 0 only) and keyed to layer 1, so the blade stayed behind
  // the body while the hilt is in front - they follow the hilt's layer (in front, behind when she turns away). The
  // glows of other weapons without layer keys (금빛 은하, 인퍼널 ...) are left on the default layer 1 as before
  const WEAPON_BEAM = new Set([108892, 113556]);
  // any light hung on a weapon's Effect points (ridesOnWeapon: 132576 의 반짝임 ...) is drawn the same way: on the
  // weapon's layer, and over the weapon itself - left on the default layer 1 it went behind the body while the weapon was in front
  const onWeapon = a => WEAPON_BEAM.has(a) || (!!S.anims[a] && ridesOnWeapon(S.anims[a]));
  // the layer of each worn weapon / off-hand item's own weapon animation in this motion / facing (the first of its
  // animations with a layer key, beams left out): the WEAPON_BEAM animations are drawn on it
  function weaponLayers(pose, P) {
    const c = S.chars[pose.char], out = {};
    for (const p of P) {
      if (p.m === null || !String(p.tag).startsWith('item') || out[p.tag] !== undefined || onWeapon(p.a)) continue;
      const it = c && c.byId[+p.tag.slice(4)]; if (!it || (it.slot !== 'weapon' && it.slot !== 'sub')) continue;
      const l = keyLayer(S.anims[p.a], p.m, pose.dir); if (l !== null) out[p.tag] = l;
    }
    return out;
  }
  // the textures an animation draws (every motion / facing), cached per animation id
  const texSets = {};
  function texSetOf(a) {
    if (!a || !S.anims[a]) return new Set();
    if (texSets[a]) return texSets[a];
    const o = new Set();
    for (const m of Object.values(S.anims[a].m)) for (const d of Object.values(m)) if (d !== 'M') for (const e of d.e) for (const k of e) if (k[0] === 0) o.add(k[2]);
    return (texSets[a] = o);
  }
  // 의상 몸과 맨몸의 Head 점이 똑같은 프레임의 비율 (그 동작 · 방향, 두 애니메이션의 길이가 같을 때만. 다르면 0). 한 번 세어 둔다
  const headAgree = new Map();
  function headAgreement(costA, baseA, m, dir) {
    const key = `${costA}|${baseA}|${m}|${dir}`;
    if (headAgree.has(key)) return headAgree.get(key);
    const dc = dirData(S.anims[costA], m, dir), db = dirData(S.anims[baseA], m, dir);
    let same = 0, n = 0;
    if (dc && db && dc.mt === db.mt) {
      const times = new Set();
      for (const e of dc.e) for (const k of e) if (k[0] === 0) times.add(k[1]);
      for (const tt of times) {
        const a = {}, b = {};
        animLayers(S.anims[costA], m, dir, tt, null, a, true); animLayers(S.anims[baseA], m, dir, tt, null, b, true);
        if (!a.Head || !b.Head) continue;
        n++; if (a.Head[0] === b.Head[0] && a.Head[1] === b.Head[1]) same++;
      }
    }
    const r = n ? same / n : 0;
    headAgree.set(key, r);
    return r;
  }
  function compose(pose, t) {
    const P = plan(pose), body = P[0], layers = [], attach = {}, WL = weaponLayers(pose, P);
    // attach points each piece of a worn weapon handed on, per item: a two-handed weapon is two pieces with an Effect2 each
    // (나야트레이 액스, 이솔렛 글라디우스·크리스) and its light (132576 의 반짝임) hangs on every piece, not only the last one
    const pieceAt = {}, pieceLayer = new Map();
    // loose: a costume standing in for the body may be made of attach keys (리체 잠옷) - no parent exists for the body itself
    // 확장 의상 염색: pose.cdye = {part index: 'rrggbb'} of the worn outfit, applied only while that outfit is the body
    const cdi = pose.cdye && Object.keys(pose.cdye).length ? (pose.items || []).find(i => S.extras.transforms[i] && [S.extras.transforms[i].anim, S.extras.transforms[i].bald].includes(body.a) && costumeDyes(i).length) : undefined;
    // on the hairless body the chosen hair style shows instead: the outfit's '머리' part is not dyed
    let cdye = pose.cdye;
    if (cdi !== undefined && body.a !== S.extras.transforms[cdi].anim) {
      cdye = {}; costumeDyes(cdi).forEach(([n], k) => { if (pose.cdye[k] && !n.startsWith('머리')) cdye[k] = pose.cdye[k]; });
    }
    // 기본 의상 염색: pose.bdye = {part index: preset index or 'rrggbb'}, only while the character's own body is drawn (its weapon
    // bodies included), not a costume / transform standing in for it
    // 기본 외형 바꾸기(클로에 연미복, extras look): 팔레트가 기본 몸과 같아 기본 의상 염색이 그대로 든다
    const lookBody = (pose.items || []).some(i => { const tr = S.extras.transforms[i]; return tr && tr.look && tr.anim === body.a; });
    const cb = S.chars[pose.char], ownBody = cb && (lookBody || body.a === S.index.chars[pose.char].body || Object.values(cb.weapon_body || {}).includes(body.a));
    const bdye = ownBody && pose.bdye && Object.keys(pose.bdye).length ? pose.bdye : null;
    // 기본 의상의 '머리' 부위 (벤야 머리 염색약 블랙 / 실버 …): 몸에는 머리가 없고 헤어 스타일이 같은 팔레트 번호로 그려진다
    // (머리핀처럼 헤어 그림에 든 다른 부위도). 헤어 염색을 고르지 않았으면 기본 의상 염색 그대로 헤어도 칠한다
    const hairB = bdye;
    // 염색은 텍스처의 팔레트를 바꾸는 것이라, 같은 텍스처를 그리는 다른 애니메이션에도 똑같이 든다: 확장 의상의 덧그림
    // (나야트레이 네냐플 교복 대기: 얼굴로 올린 손이 덧그림 123022 / 텍스처 15507), 몸 텍스처를 같이 쓰는 겹침(아나이스 모자 위 손)
    const dyeTex = cdi !== undefined ? new Set([...texSetOf(body.a), ...texSetOf(S.extras.transforms[cdi].effect)]) : bdye ? texSetOf(body.a) : null;
    if (body.m !== null) for (const L of animLayers(S.anims[body.a], body.m, pose.dir, t, null, attach, true)) {
      if (cdi !== undefined) L.img = costumeImage(L.tex, cdi, cdye);
      else if (bdye) L.img = baseImage(L.tex, pose.char, bdye);
      layers.push(Object.assign(L, { z: BODY_Z, pri: 0, tag: 'body' }));
    }
    // 머리 없는 확장 의상: 헤어가 붙는 점(Head · Hair…)을 맨몸 점으로 맞추는 프레임. 의상의 점은 대개 맨몸과 같게 만들어졌는데 몇
    // 프레임만 1~2px 밀려 있다 (이스핀 고양이 · 토끼 잠옷 달리기 8 · 12 방향 10프레임 중 3: 헤어가 앞으로 튀어나왔다, 2026-11-03).
    // 그 동작 · 방향의 프레임 70% 이상이 맨몸과 점이 똑같을 때만, 3px 안으로 다른 나머지를 실수로 보고 맨몸 점을 쓴다. 맨몸과 다르게
    // 그린 옷(나야트레이 고양이 잠옷 달리기 정면: 절반이 1px 다르고 그 점이 옷 머리에 맞다)은 의상의 점 그대로
    const baseBody = S.index.chars[pose.char].body;
    if (body.m !== null && !pose.raw && body.a !== baseBody && dirData(S.anims[baseBody], body.m, pose.dir)
        && (pose.items || []).some(i => { const tr = S.extras.transforms[i]; return tr && tr.costume && !tr.hair_baked && tr.anim === body.a; })
        && headAgreement(body.a, baseBody, body.m, pose.dir) >= 0.7) {
      const own = {}; animLayers(S.anims[baseBody], body.m, pose.dir, t, null, own, true);
      for (const n in attach) {
        if (!/^(Head|Hair)/.test(n) || !own[n]) continue;
        if (Math.abs(own[n][0] - attach[n][0]) <= 3 && Math.abs(own[n][1] - attach[n][1]) <= 3) attach[n] = own[n];
      }
    }
    // 벤야: 확장 의상(수영복 …)을 입으면 몸이 의상 그림으로 바뀌어, 무기 든 몸(0298 col 8 row 12)에 그려진 사이드 / 해머의
    // 자루가 없어진다. 무기를 들고 있으면 무기 든 몸과 기본 몸이 다른 픽셀(= 자루, shaftLayer)을 의상 몸 바로 위에 얹는다
    const ixc = S.index.chars[pose.char], wb = cb && cb.weapon_body && cb.weapon_body['12'];
    if (body.m !== null && !pose.raw && wb && wb !== 65535 && body.a !== wb && body.a !== ixc.body
        && (pose.items || []).some(i => !(pose.hidden && pose.hidden.has(i)) && (cb.byId[i] || {}).slot === 'weapon')) {
      const sl = shaftLayer(cb, ixc, pose.motion, pose.dir, t);
      if (sl) layers.push(Object.assign(sl, { z: BODY_Z, pri: 0.5, tag: 'body' }));
    }
    for (const p of P.slice(1)) {
      if (p.m === null) continue;
      if (p.m === 'foot') { layers.push(...footprintLayers(p, body.m, pose.dir, t)); continue; }
      // DB 0199 vehicles have no layer keys: 'rider' = the part behind the character, 'vehicle' = the part in front of it
      const zv = p.tag.endsWith('_vehicle') ? 40 : p.tag.endsWith('_rider') ? -40 : null;
      const dye = p.tag === 'hair' && pose.dye > 0 ? pose.dye : 0;
      // kind-0 attached effect (통통 농구공, 열혈 축구공): its bounce lands on the top of the head (avatarlib.fx_on_head)
      let dx = 0, dy = 0;
      if (p.head && attach.Head) { dx = attach.Head[0]; dy = attach.Head[1] - 8 - animBottom(S.anims[p.a], p.m, pose.dir); }
      const F = S.index.hair_front_layers, B = S.index.hair_back_layers;
      // an effect without frames for this facing draws its reference's direction; a few always draw it (FX_FIXED_DIR).
      // Not when another animation of the same item has this facing: the item is split by facing (붉은 후광: 96584 the back
      // views, 96585 the front ones - the back halo was drawn behind the front one, two halos)
      const split = P.some(q => q !== p && q.tag === p.tag && q.m !== null && q.m !== 'foot' && dirData(S.anims[q.a], q.m, pose.dir));
      const dv = p.fd !== null && dirData(S.anims[p.a], p.m, p.fd) && (FX_FIXED_DIR.has(p.a) || (!split && !dirData(S.anims[p.a], p.m, pose.dir))) ? p.fd : pose.dir;
      // an effect animation without layer keys: in front / behind by its kind (avatarlib.fx_layer: 하트 뿅뿅 in front)
      const dd = p.fl !== null ? dirData(S.anims[p.a], p.m, dv) : null;
      let fl = dd && !dd.e.some(e => e.some(k => k[0] === 6)) ? p.fl : null;
      // a worn weapon / off-hand item (its pieces may have no layer keys: 이자크 카라, 란지에 피스톨 - WL has nothing for them)
      const wit = String(p.tag).startsWith('item') ? S.chars[pose.char].byId[+p.tag.slice(4)] : null;
      const isWpn = !!wit && (wit.slot === 'weapon' || wit.slot === 'sub');
      const lit = isWpn && onWeapon(p.a);
      // 소드셰이프 light blade, 132576 의 반짝임 ...: the layer of the piece it hangs on (below), else the weapon's (WL).
      // WL is the first piece's layer only: with it a two-piece weapon's light all went on the front piece's layer, and the
      // light of the piece behind the body showed through the body (이자크 두 조각 카라 · 클로: pieces on layers 4 / 1)
      const wl = fl === null && lit ? WL[p.tag] : undefined;
      // 렌즈·립: 몸 애니메이션의 틱 (몸이 이 동작을 한 바퀴 도는 동안 같은 시각)
      let onClock;
      if (p.tag === 'eye' || p.tag === 'lip') { const bd = body.m !== null && dirData(S.anims[body.a], body.m, pose.dir); onClock = bd && bd.mt > 0 ? t % (bd.mt + 1) : 0; }
      // a weapon piece: keep its own points; a light on a weapon: once per piece that has the point it hangs on
      const piece = isWpn && !lit ? {} : null;
      // pieces handing the same points at the same place (a one-handed weapon cut into a front and a back half) count once
      let parents = [attach];
      if (lit && pieceAt[p.tag] && pieceAt[p.tag].length > 1) {
        const seen = new Set(); parents = [];
        for (const q of pieceAt[p.tag]) {
          const key = Object.keys(q).filter(n => n.startsWith('Effect')).sort().map(n => n + ':' + Math.round(q[n][0]) + ',' + Math.round(q[n][1])).join(' ');
          if (!key || seen.has(key)) continue;
          seen.add(key); parents.push(q);
        }
        if (!parents.length) parents = [attach];
      }
      const drawn = [];
      for (const par of parents) {
        const got = animLayers(S.anims[p.a], p.m, dv, t, par, piece || attach, false, onClock);
        // a light on a weapon without layer keys: the layer of the piece it hangs on (pieceLayer), else the weapon's, else the default
        // (one piece / one parent: as before, the weapon's layer first)
        const pl = !lit || fl !== null ? undefined : par !== attach && pieceLayer.has(par) ? pieceLayer.get(par) : wl ?? pieceLayer.get(par);
        if (pl !== undefined) for (const L of got) L.layer = pl;
        drawn.push(...got);
      }
      if (piece) {
        Object.assign(attach, piece); (pieceAt[p.tag] = pieceAt[p.tag] || []).push(piece);
        if (drawn.length) { pieceLayer.set(piece, drawn[drawn.length - 1].layer); pieceLayer.set(attach, drawn[drawn.length - 1].layer); }
      }
      for (const L of drawn) {
        if (fl !== null) L.layer = fl;
        else if (FX_LAYER_SWAP.has(+p.a) && (L.layer === 0 || L.layer === 1)) L.layer = 1 - L.layer;
        if (p.tag === 'hair' && ((pose.hairMode === 'front' && B.includes(L.layer)) || (pose.hairMode === 'back' && F.includes(L.layer)))) continue;   // a hair animation can hold both pieces
        if (dye) L.img = dyedImage(L.tex, pose.hair, dye);
        else if (p.tag === 'hair' && hairB) L.img = baseImage(L.tex, pose.char, hairB);
        else if (p.tag === 'eye') L.img = faceImage(L.tex, 'lens', pose.eye, pose.eyeDye ?? -1);
        else if (p.tag === 'lip') L.img = faceImage(L.tex, 'lip', 0, pose.lipDye ?? -1);
        else if (dyeTex && dyeTex.has(L.tex.id)) L.img = cdi !== undefined ? costumeImage(L.tex, cdi, cdye) : baseImage(L.tex, pose.char, bdye);
        L.x += dx; L.y += dy;
        // the face layers 14 / 15 are the index's marker layers (drawn at the back for any other animation): the eye / lip
        // sprites sit on them in front of the face, under the front hair (avatarlib.LAYER_POS 14: +4, 15: +3)
        const fz = p.tag === 'eye' || p.tag === 'lip' ? S.index.layer_pos[L.layer] || 4 : null;
        layers.push(Object.assign(L, { z: zv ?? fz ?? z(L.layer), pri: lit ? p.pri + (WEAPON_BEAM.has(+p.a) ? -0.1 : 0.1) : p.pri, tag: p.tag }));   // 소드셰이프 광선: under the hilt (사람 → 광선 → 무기, as in the game); other lights over the weapon
      }
    }
    const worn = (pose.items || []).filter(i => !(pose.hidden && pose.hidden.has(i))).map(i => cb && cb.byId[i]).filter(Boolean);
    // 기본 동작의 손짓 (루시안이 얼굴로 손을 올린다 ...): 몸은 한 장 그림이라 손이 투구 확장 아래에 깔린다. 게임처럼 손이 모자
    // 앞에 오도록, 이 틱의 몸이 쉬는 자세(틱 0)와 달라진 픽셀 중 투구 확장에 가려진 것만 그 위에 다시 그린다 (gestureLayer)
    // 뒤로 돈 방향은 손이 얼굴 앞(머리 너머)이라 모자에 가리는 게 맞다
    // 손이 모자 앞으로 올라오는 손짓이 확인된 캐릭터만: 손짓 중 고개를 돌리는 캐릭터(이솔렛이 비둘기를 볼 때)는 얼굴 · 머리 픽셀이
    // '달라진 곳' 이 되어 모자 위에 얼룩으로 올라왔다. 몸 그림에 손 위치(Hand 부착점)가 없어 손만 골라낼 수 없다
    if (ownBody && !pose.raw && body.m === 0 && !BACK_DIRS.has(pose.dir) && GESTURE_CHARS.has(S.index.chars[pose.char].name)) {
      const headTags = new Set(worn.filter(it => it.slot === 'head').map(it => 'item' + it.id));
      const heads = layers.filter(L => headTags.has(L.tag));
      if (heads.length) {
        const g = gestureLayer(body.a, pose.dir, t, heads);
        if (g) layers.push(Object.assign(g, { z: Math.max(...heads.map(L => L.z)), pri: 99, tag: 'body' }));
      }
    }
    // 품이 큰 몸 확장(곤룡포)을 입고 뒤로 돌면 무기는 옷 뒤에 (보리스처럼). 무기의 층 번호가 앞쪽인 캐릭터(막시민 · 밀라 · 시벨린 · 녹턴
    // · 이자크, 루시안 뒷면 ...)는 무기가 옷을 뚫고 나왔다
    const robes = new Set(worn.filter(it => it.slot === 'body' && COVER_BACK.test(it.name)).map(it => 'item' + it.id));
    const wItems = worn.filter(it => it.slot === 'weapon' || it.slot === 'sub');
    // 손에 끼는 무기(이자크 카라 · 클로)는 소매 속이라 어느 방향이든 옷 뒤로
    const sleeved = new Set(wItems.filter(it => SLEEVE_PARTS.test(S.index.part_names[it.part] || '')).map(it => 'item' + it.id));
    if (robes.size) for (const L of layers) if (sleeved.has(L.tag)) L.z = Math.min(L.z, -41);
    const wTags = new Set(wItems.map(it => 'item' + it.id).filter(t => !sleeved.has(t)));
    if (robes.size && wTags.size && BACK_DIRS.has(pose.dir)) {
      for (const L of layers) if (wTags.has(L.tag)) L.z = Math.min(L.z, -41);
    }
    // 앞쪽 방향: 소매가 무기를 쥔 손을 덮어 무기만 떠 보였다 (란지에 총). 몸 그림에 손 위치가 없는 캐릭터도 있어, 무기 둘레(GRIP_R)의
    // 몸 픽셀 중 옷에 가린 것만 옷 위 · 무기 아래에 다시 그린다 (gripLayer)
    else if (robes.size && wTags.size) {
      const bodyL = layers.filter(L => L.tag === 'body'), robeL = layers.filter(L => robes.has(L.tag) && L.z > BODY_Z), wL = layers.filter(L => wTags.has(L.tag));
      if (bodyL.length && robeL.length && wL.length) {
        const rz = Math.max(...robeL.map(L => L.z));
        const g = gripLayer(bodyL, robeL, wL);
        if (g) layers.push(Object.assign(g, { z: rz, pri: 98, tag: 'body' }));
        // 몸 뒤 층의 무기(루시안 검 끝 ...)는 큰 소매에 덮였다. 소매는 몸 옆에 늘어진 것이라 그 앞으로 꺼내되, 몸 · 머리에 가린
        // 자리는 그대로 가린다 (무기 위에 있던 것 중 옷이 아닌 것을 빼고 옷 위에 다시)
        const behind = wL.filter(L => L.z < rz);
        if (behind.length) {
          const lo = Math.min(...behind.map(L => L.z));
          const occ = layers.filter(L => !robes.has(L.tag) && !wTags.has(L.tag) && L.pri !== 98 && L.z > lo && L.z <= rz);
          const o = outLayer(behind, occ);
          if (o) layers.push(Object.assign(o, { z: rz, pri: 99, tag: behind[0].tag }));
        }
      }
    }
    layers.sort((A, B) => (A.z - B.z) || (A.pri - B.pri) || (A.ei - B.ei));
    return layers;
  }
  const GESTURE_CHARS = new Set(['루시안']);
  const BACK_DIRS = new Set([0, 2, 4]);                     // 뒤좌 · 뒷면 · 뒤우
  const COVER_BACK = /곤룡포/;
  const SLEEVE_PARTS = /^(카라|클로)$/;
  const GRIP_R = 5;                                         // 무기 둘레 몇 픽셀까지를 손으로 보나
  const gripCache = new Map();
  // 무기 픽셀 중 occ(몸 · 머리 ...)에 안 가린 것
  const outCache = new Map();
  function outLayer(wL, occ) {
    const sig = l => [l.tex && l.tex.id, l.sx, l.sy, l.w, l.h, l.x, l.y, l.flip ? 1 : 0, l.rot ? JSON.stringify(l.rot) : '', l.img && l.img.width, l.blend, l.alpha].join(',');
    const key = wL.map(sig).join(';') + '|' + occ.map(sig).join(';');
    if (outCache.has(key)) { const hit = outCache.get(key); return hit && Object.assign({}, hit); }
    const b = bounds(wL), w = Math.max(1, b.maxx - b.minx), h = Math.max(1, b.maxy - b.miny);
    const cw = document.createElement('canvas'); cw.width = w; cw.height = h; drawLayers(cw.getContext('2d'), wL, -b.minx, -b.miny);
    const co = document.createElement('canvas'); co.width = w; co.height = h; drawLayers(co.getContext('2d'), occ.map(l => Object.assign({}, l, { alpha: 1 })), -b.minx, -b.miny);
    const gw = cw.getContext('2d'), dw = gw.getImageData(0, 0, w, h), p = dw.data, q = co.getContext('2d').getImageData(0, 0, w, h).data;
    let n = 0;
    for (let i = 3; i < p.length; i += 4) { if (q[i]) p[i - 3] = p[i - 2] = p[i - 1] = p[i] = 0; else if (p[i]) n++; }
    let made = null;
    if (n) { gw.putImageData(dw, 0, 0); made = { img: cw, sx: 0, sy: 0, w, h, x: b.minx, y: b.miny, flip: false, layer: 0, ei: -1, blend: 0, alpha: 1 }; }
    if (outCache.size > 400) outCache.clear();
    outCache.set(key, made);
    return made && Object.assign({}, made);
  }
  function gripLayer(bodyL, robeL, wL) {
    const sig = l => [l.tex && l.tex.id, l.sx, l.sy, l.w, l.h, l.x, l.y, l.flip ? 1 : 0, l.rot ? JSON.stringify(l.rot) : '', l.img && l.img.width].join(',');
    const key = [bodyL, robeL, wL].map(a => a.map(sig).join(';')).join('|');
    if (gripCache.has(key)) { const hit = gripCache.get(key); return hit && Object.assign({}, hit); }
    const b = bounds(bodyL), w = Math.max(1, b.maxx - b.minx), h = Math.max(1, b.maxy - b.miny);
    const draw = L => { const c = document.createElement('canvas'); c.width = w; c.height = h; drawLayers(c.getContext('2d'), L.map(l => Object.assign({}, l, { alpha: 1 })), -b.minx, -b.miny); return c; };
    const cb = draw(bodyL), gb = cb.getContext('2d'), db = gb.getImageData(0, 0, w, h), p = db.data;
    const r = draw(robeL).getContext('2d').getImageData(0, 0, w, h).data, q = draw(wL).getContext('2d').getImageData(0, 0, w, h).data;
    // 무기 픽셀을 GRIP_R 만큼 넓힌 자리 (가로 → 세로 두 번)
    const near = new Uint8Array(w * h), tmp = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (q[(y * w + x) * 4 + 3]) for (let k = Math.max(0, x - GRIP_R); k <= Math.min(w - 1, x + GRIP_R); k++) tmp[y * w + k] = 1;
    for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) if (tmp[y * w + x]) for (let k = Math.max(0, y - GRIP_R); k <= Math.min(h - 1, y + GRIP_R); k++) near[k * w + x] = 1;
    let n = 0;
    for (let i = 0, j = 0; j < w * h; i += 4, j++) { if (p[i + 3] && r[i + 3] && near[j]) n++; else p[i] = p[i + 1] = p[i + 2] = p[i + 3] = 0; }
    let made = null;
    if (n) { gb.putImageData(db, 0, 0); made = { img: cb, sx: 0, sy: 0, w, h, x: b.minx, y: b.miny, flip: false, layer: 0, ei: -1, blend: 0, alpha: 1 }; }
    if (gripCache.size > 400) gripCache.clear();
    gripCache.set(key, made);
    return made && Object.assign({}, made);
  }
  // 손짓 픽셀: 몸의 지금 그림에서 쉬는 자세와 달라진 곳 ∩ 투구 확장이 덮은 곳. 같은 그림 조합이면 앞서 만든 것을 쓴다
  const gestureCache = new Map();
  function gestureLayer(bodyA, dir, t, heads) {
    const A = S.anims[bodyA], d = dirData(A, 0, dir); if (!d || d.mt <= 0) return null;
    // 머리가 같이 움직이는 손짓(막시민 바이올린 ...)은 쉬는 자세를 머리 부착점이 옮겨 간 만큼 옮겨 견준다. 안 그러면 머리 · 얼굴
    // 픽셀이 통째로 '달라진 곳' 이 되어 모자 위에 얼룩으로 올라온다
    const ac = {}, ar = {};
    const cur = animLayers(A, 0, dir, t, {}, ac, true).map(l => Object.assign(l, { tag: '' }));
    const rest = animLayers(A, 0, dir, 0, {}, ar, true).map(l => Object.assign(l, { tag: '' }));
    if (ac.Head && ar.Head) { const mx = ac.Head[0] - ar.Head[0], my = ac.Head[1] - ar.Head[1]; const mir = d.e.some(e => e.some(k => k[0] === 0 && (k[4] & 8)));   // 거울 방향: 부착점은 거울 전 좌표
      for (const l of rest) { l.x += mir ? -mx : mx; l.y += my; } }
    if (!cur.length || !rest.length) return null;
    const sig = l => [l.tex && l.tex.id, l.sx, l.sy, l.w, l.h, l.x, l.y, l.flip ? 1 : 0, l.rot ? JSON.stringify(l.rot) : ''].join(',');
    const sc = cur.map(sig).join(';'), sr = rest.map(sig).join(';');
    if (sc === sr) return null;                               // 쉬는 자세 그대로
    const key = sc + '|' + sr + '|' + heads.map(sig).join(';');
    if (gestureCache.has(key)) { const hit = gestureCache.get(key); return hit && Object.assign({}, hit); }
    const hs = heads.map(l => Object.assign({}, l, { tag: '' }));
    const b = bounds(cur), w = Math.max(1, b.maxx - b.minx), h = Math.max(1, b.maxy - b.miny);
    const draw = L => { const c = document.createElement('canvas'); c.width = w; c.height = h; drawLayers(c.getContext('2d'), L, -b.minx, -b.miny); return c; };
    const ca = draw(cur), ga = ca.getContext('2d'), da = ga.getImageData(0, 0, w, h), p = da.data;
    const q = draw(rest).getContext('2d').getImageData(0, 0, w, h).data, m = draw(hs).getContext('2d').getImageData(0, 0, w, h).data;
    let n = 0;
    for (let i = 0; i < p.length; i += 4) {
      const same = Math.max(Math.abs(p[i] - q[i]), Math.abs(p[i + 1] - q[i + 1]), Math.abs(p[i + 2] - q[i + 2]), Math.abs(p[i + 3] - q[i + 3])) <= 8;
      if (same || !p[i + 3] || !m[i + 3]) p[i] = p[i + 1] = p[i + 2] = p[i + 3] = 0; else n++;
    }
    let made = null;
    if (n) { ga.putImageData(da, 0, 0); made = { img: ca, sx: 0, sy: 0, w, h, x: b.minx, y: b.miny, flip: false, layer: 0, ei: -1, blend: 0, alpha: 1 }; }
    if (gestureCache.size > 400) gestureCache.clear();
    gestureCache.set(key, made);
    return made && Object.assign({}, made);
  }
  function footprintLayers(p, bodyMotion, dir, t) {
    const WM = S.index.walk_motions[bodyMotion]; if (!WM) return [];
    const A = S.anims[p.a]; if (!A) return [];
    const ms = motionsOf(A).filter(m => m === 0 || m === 1); const out = [];
    const [dx, dy] = S.index.move_dir[dir] || [0, 1];
    for (const m of ms) {
      const dur = duration(A, m, 2); let [step, speed] = WM;
      const first = animLayers(A, m, 2, 0, null, null, true);
      if (first.length) { const w = Math.max(...first.map(L => L.x + L.w)) - Math.min(...first.map(L => L.x)); step = Math.max(step, Math.floor(w * (Math.abs(dx) > Math.abs(dy) ? 1.2 : 0.7))); }
      const phase = (t * speed + (m === 1 ? step / 2 : 0)) % step;
      const n = dur > 8 ? Math.max(4, Math.min(8, Math.floor(dur * speed / step) + 2)) : 4;
      for (let k = 0; k < n; k++) {
        const dist = phase + k * step, age = Math.floor(dist / speed); let frames, alpha = 1;
        if (dur > 8) { if (age > dur) continue; frames = animLayers(A, m, 2, age, null, null, true); }
        else { frames = animLayers(A, m, 2, Math.min(age, dur), null, null, true); alpha = Math.max(0, 1 - dist / (step * 4)); if (alpha <= 0.05) continue; }
        for (const L of frames) out.push(Object.assign(L, { z: -999, pri: p.pri, ei: L.ei * 10 + k, x: Math.round(L.x - dx * dist), y: Math.round(L.y - dy * dist), tag: p.tag, alpha: alpha * (L.alpha ?? 1) }));
      }
    }
    return out;
  }
  function maxDuration(pose) {
    let mx = 0;
    for (const p of plan(pose)) { if (p.m === null || p.m === 'foot') continue; mx = Math.max(mx, duration(S.anims[p.a], p.m, pose.dir)); }
    return mx;
  }
  function frameTimes(pose) {
    const times = new Set([0]);
    for (const p of plan(pose)) {
      if (p.m === null || p.m === 'foot') continue;
      const d = dirData(S.anims[p.a], p.m, pose.dir); if (!d) continue;
      for (const e of d.e) for (const k of e) if (k[0] === 0 || k[0] === 12) times.add(k[1]);
    }
    return [...times].sort((a, b) => a - b);
  }
  function bounds(layers) {
    const L = layers.filter(l => !l.tag.startsWith('foot'));
    if (!L.length) return null;
    return { minx: Math.min(...L.map(l => l.x)), maxx: Math.max(...L.map(l => l.x + l.w)), miny: Math.min(...L.map(l => l.y)), maxy: Math.max(...L.map(l => l.y + l.h)) };
  }
  // anchor (feet) that centers the tick-0 figure in a w x h box; the same anchor is used for every tick so the
  // animation does not jitter. Only the character itself counts (body / costume, hair, face, a vehicle and its rider):
  // items' effects (sparks scattered over the stage, wings, auras) would pull the figure off the middle
  const CORE_TAG = /^(body|hair|eye|lip|face)|_(rider|vehicle)$/;
  // The box is the union over every facing of the same pose: measured per facing, its middle moved when the character
  // was turned (a cape, wings or a sleeve sticking out on one side) and the feet jumped by up to 25 px (잠옷, 벚꽃비 의복;
  // 로아미니's own body 19 px). With one box for all facings the feet stay put while turning, as in the game.
  // prepare() loads the textures of every facing, so the other facings are there to be measured
  const coreBoxes = new Map();
  function coreBox(pose) {
    const key = JSON.stringify([pose.char, pose.motion, pose.items, pose.hair, pose.hairMode, pose.raw ? 1 : 0]);
    if (coreBoxes.has(key)) return coreBoxes.get(key);
    let b = null;
    const dirs = (S.index && S.index.dir_order) || [pose.dir];
    for (const dir of dirs.includes(pose.dir) ? dirs : [...dirs, pose.dir]) {
      const all = compose(Object.assign({}, pose, { dir }), 0), core = all.filter(l => CORE_TAG.test(l.tag));
      const d = bounds(core.length ? core : all); if (!d) continue;
      b = b ? { minx: Math.min(b.minx, d.minx), maxx: Math.max(b.maxx, d.maxx), miny: Math.min(b.miny, d.miny), maxy: Math.max(b.maxy, d.maxy) } : d;
    }
    // keep it only once everything the pose draws is loaded (asked before prepare() finished: measure again next time)
    const ids = animIds(pose);
    if (ids.every(a => S.anims[a]) && texIds(ids).every(t => S.texs[t] !== undefined)) {
      if (coreBoxes.size > 200) coreBoxes.clear();
      coreBoxes.set(key, b);
    }
    return b;
  }
  function centeredAnchor(pose, w, h) {
    const b = coreBox(pose);
    if (!b) return [w >> 1, h - 40];
    return [(w >> 1) - ((b.minx + b.maxx) >> 1), (h >> 1) - ((b.miny + b.maxy) >> 1)];
  }
  // 캐릭터 가운데 (anchor 기준, centeredAnchor 와 같은 몸통 상자): 배경(opts.under)을 여기에 맞춘다
  function coreCenter(pose) {
    const b = coreBox(pose);
    return b ? [(b.minx + b.maxx) >> 1, (b.miny + b.maxy) >> 1] : [0, -40];
  }
  function drawLayers(ctx, layers, ax, ay) {
    for (const L of layers) {
      ctx.save();
      if (L.alpha !== undefined && L.alpha < 1) ctx.globalAlpha = L.alpha;
      let img = L.img;
      if (L.blend === 1) { ctx.globalCompositeOperation = 'lighter'; img = lumImage(L.tex); }
      const x = ax + L.x, y = ay + L.y;
      if (L.rot) {                                             // turned / scaled about its attach point, then mirrored like the rest
        const r = L.rot; ctx.translate(ax + r.px, ay + r.py); if (L.flip) ctx.scale(-1, 1);
        ctx.rotate(r.deg * Math.PI / 180); ctx.scale(r.scx, r.scy); ctx.drawImage(img, L.sx, L.sy, r.fw, r.fh, -r.cx, -r.cy, r.fw, r.fh);
      }
      else if (L.flip) { ctx.translate(x + L.w, y); ctx.scale(-1, 1); ctx.drawImage(img, L.sx, L.sy, L.w, L.h, 0, 0, L.w, L.h); }
      else ctx.drawImage(img, L.sx, L.sy, L.w, L.h, x, y, L.w, L.h);
      ctx.restore();
    }
  }
  // opts: {anchor: [x, y] | null (centered), bg: css colour | null, scale}
  function render(canvas, pose, t, opts = {}) {
    const ctx = canvas.getContext('2d'); const sc = opts.scale || 1;
    const w = canvas.width / sc, h = canvas.height / sc;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
    // additive layers (glows, 3D effects) can only add their light exactly onto an opaque picture: paint the stage
    // colour (the canvas's own CSS background) first; off-screen canvases (PNG export) stay transparent
    let bg = opts.bg;
    if (!bg && canvas.isConnected) { const c = getComputedStyle(canvas).backgroundColor; if (c && !/rgba\(.*,\s*0\)|transparent/.test(c)) bg = c; }
    if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    ctx.imageSmoothingEnabled = false; ctx.scale(sc, sc);
    const [ax, ay] = opts.anchor || centeredAnchor(pose, w, h);
    // opts.under: 캐릭터 뒤에 까는 배경 그림 (시뮬레이터 '배경', 게임 맵을 실제 크기로 잘라낸 것). 캐릭터와 같은 배율로,
    // 그림 한가운데를 캐릭터 가운데(centeredAnchor 와 같은 기준) + opts.underOff 에 둔다.
    // underOff = 배경 가운데에서 본 캐릭터 자리의 반대 (코디의 bgAt 을 뒤집은 것: 캐릭터를 배경 위 어디에 세웠는지)
    const u = opts.under;
    if (u && u.naturalWidth) {
      const [cx, cy] = coreCenter(pose), [ox, oy] = opts.underOff || [0, 0];
      ctx.drawImage(u, Math.round(ax + cx + ox - u.naturalWidth / 2), Math.round(ay + cy + oy - u.naturalHeight / 2));
    }
    drawLayers(ctx, compose(pose, t), ax, ay);
    return [ax, ay];
  }

  // ------------------------------------------------------------------ icons (sheets written by the exporter)
  // where an item id (kind 'i') or hair id (kind 'h') sits in the character's icon sheets; null if not in the sheets
  function iconSheet(ci, kind, id) {
    const c = S.chars[ci]; if (!c) return null;
    if (kind === 'i' && c.altIcons && c.altIcons[id]) return c.altIcons[id];      // a private bundle item: its own sheet
    return sheetCell(c.iconMap, String(ci), kind, id);
  }
  // ---- the private bundle of hidden (unreleased) items, tw_websplit.py: the same files as the public data under another
  // base URL, holding only those items (and hidden hair styles). mergeBundle(ci, base) adds the bundle's items of character ci to the loaded
  // character (and the bundle's extras); dropBundle() takes everything of it out again. Returns the ids it added
  async function mergeBundle(ci, base) {
    base = base.replace(/\/?$/, '/');
    if (S.alt && S.alt !== base) dropBundle();
    S.alt = base;
    const c = await loadChar(ci);
    if (c.altFrom === base) return c.items.filter(it => it.alt).map(it => it.id);
    const first = S.altExtras === undefined;
    const [b, ext_, cd, tl] = await Promise.all([getJSON(base + 'chars/' + ci + '.json'), first ? getJSON(base + 'extras.json').catch(() => null) : null,
                                                 first ? getJSON(base + 'costumedye.json').catch(() => null) : null,
                                                 first ? getJSON(base + 'transforms.json').catch(() => null) : null]);
    if (first) {
      S.altExtras = ext_ || {};
      // 숨긴 변신 망토: 망토 화면의 목록(transforms.json)에 붙인다 (목록을 아직 안 받았으면 loadTransforms 가 붙인다)
      S.altTlist = tl && tl.items ? tl : null;
      for (const it of (S.altTlist ? S.altTlist.items : [])) for (const a of it.anims || []) S.altAnims.add(+a);
      mergeAltTransforms();
      for (const key of ['transforms', 'footprints']) for (const k in (S.altExtras[key] || {})) {
        if (!S.extras[key]) S.extras[key] = {};
        if (!(k in S.extras[key])) { S.extras[key][k] = S.altExtras[key][k]; S.altKeys.push([key, k]); }
        const t = S.altExtras[key][k];
        for (const a of typeof t === 'object' ? [t.anim, t.effect, t.bald].concat(t.alt || []) : [t]) if (a > 0) S.altAnims.add(+a);
      }
      // the hidden 확장 의상's dye parts and the atlases that carry a palette index image
      for (const k in ((cd && cd.items) || {})) if (!(k in S.cdye.items)) { S.cdye.items[k] = cd.items[k]; S.altKeys.push(['cdye', k]); }
      for (const t of (cd && cd.tex) || []) if (!S.dyeTex.has(t)) { S.dyeTex.add(t); S.altKeys.push(['dyeTex', t]); }
    }
    const m = b.iconMap || { i: {}, stamp: 0 }, per = S.index.icon.per_sheet, cols = S.index.icon.cols, size = S.index.icon.size;
    c.altIcons = c.altIcons || {};
    const ids = [];
    for (const it of b.items || []) {
      if (c.byId[it.id]) continue;
      it.index = c.items.length; it.alt = true; c.items.push(it); c.byId[it.id] = it; ids.push(it.id);
      for (const a of it.anims || []) S.altAnims.add(+a);
      const k = m.i[String(it.id)];
      if (k !== undefined) c.altIcons[it.id] = { url: base + 'icons/' + ci + '/i' + Math.floor(k / per) + ext() + '?v=' + (m.stamp || 0), x: (k % per % cols) * size, y: Math.floor(k % per / cols) * size, w: size, h: size };
    }
    // 숨긴 헤어: 헤어 목록 끝에 붙인다 (아이콘은 시트에 없어 브라우저가 그린다)
    for (const h of b.hair || []) {
      if (c.hairById[h.id]) continue;
      const x = Object.assign({}, h, { alt: true, index: c.hair.length }); c.hair.push(x); c.hairById[h.id] = x;
      for (const a of h.anims || []) S.altAnims.add(+a);
    }
    c.altFrom = base;
    return ids;
  }
  function dropBundle() {
    for (const c of Object.values(S.chars)) {
      if (!c.altFrom) continue;
      c.items = c.items.filter(it => !it.alt); c.byId = {}; c.items.forEach((it, i) => { it.index = i; c.byId[it.id] = it; });
      if (c.hair.some(h => h.alt)) { c.hair = c.hair.filter(h => !h.alt); c.hairById = {}; c.hair.forEach((h, i) => { h.index = i; c.hairById[h.id] = h; }); }
      delete c.altIcons; delete c.altFrom;
    }
    for (const [key, k] of S.altKeys) {
      if (key === 'cdye') delete S.cdye.items[k];
      else if (key === 'dyeTex') S.dyeTex.delete(k);
      else if (S.extras && S.extras[key]) delete S.extras[key][k];
    }
    for (const a of S.altAnims) { delete S.anims[a]; delete S.pending['anim' + a]; }
    for (const t of S.altTexs) { delete S.texs[t]; delete S.pending['tex' + t]; }
    if (S.tlist && S.tlist.items.some(it => it.alt)) {
      S.tlist.items = S.tlist.items.filter(it => !it.alt); S.tlist.byId = {}; S.tlist.items.forEach((it, i) => { it.index = i; S.tlist.byId[it.id] = it; });
    }
    S.altKeys = []; S.altAnims = new Set(); S.altTexs = new Set(); S.alt = ''; delete S.altExtras; delete S.altTlist;
  }
  // 묶음의 변신 망토를 망토 목록 끝에 붙인다 (아이콘은 묶음의 icons/t 에서)
  function mergeAltTransforms() {
    const t = S.tlist, a = S.altTlist; if (!t || !a) return;
    for (const it of a.items) {
      if (t.byId[it.id]) continue;
      const x = Object.assign({}, it, { alt: true, slot: 'transform', index: t.items.length }); t.items.push(x); t.byId[it.id] = x;
    }
  }
  function sheetCell(map, dir, kind, id, base = S.base) {
    // 로컬 배포 환경: 미존재하는 시트 파일 404 요청 방지
    return null;
  }
  // the transform cloak list (one for all characters) and its icon sheets
  async function loadTransforms() {
    if (S.tlist) return S.tlist;
    return once('tlist', async () => {
      const [t, map] = await Promise.all([getJSON(S.base + 'transforms.json' + v()), getJSON(S.base + 'icons/t/map.json' + v()).catch(() => null)]);
      t.iconMap = map || { i: {}, stamp: 0 };
      t.byId = {}; t.items.forEach((it, i) => { it.index = i; it.slot = 'transform'; t.byId[it.id] = it; });
      S.tlist = t; mergeAltTransforms(); return t;
    });
  }
  function transformIcon(id) {
    const it = S.tlist && S.tlist.byId[id];
    if (it && it.alt && S.altTlist) return sheetCell(S.altTlist.iconMap, 't', 'i', id, S.alt);
    return S.tlist ? sheetCell(S.tlist.iconMap, 't', 'i', id) : null;
  }
  // TalesDB's avatar list icon of an item in the shared sheets (icons/d, boot.json tdbsheet); null: not in a sheet
  function tdbCell(id) {
    // 로컬 배포 환경: 미존재하는 icons/d/ 시트 파일 404 요청 방지
    return null;
  }
  // hair icon drawn in the browser (same window as the exporter: head + chest, 60x76)
  async function hairIcon(ci, sid, dye = 0) {
    const pose = { char: ci, motion: 0, dir: 10, hair: sid, dye, items: [], hairMode: 'all' }; await prepare(pose);
    const layers = compose(pose, 0); if (!layers.some(l => l.tag === 'hair')) return null;
    const body = layers.filter(l => l.tag !== 'hair'); const top = Math.min(...(body.length ? body : layers).map(l => l.y)) - 12;
    const [w, h] = S.index.icon.hair, cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    drawLayers(cv.getContext('2d'), layers.filter(l => !(l.y + l.h < top || l.y > top + h)), w >> 1, -top); return cv;
  }

  function trimCanvas(cv) {
    const g = cv.getContext('2d'), d = g.getImageData(0, 0, cv.width, cv.height).data; let x0 = cv.width, y0 = cv.height, x1 = -1, y1 = -1;
    for (let y = 0; y < cv.height; y++) for (let x = 0; x < cv.width; x++) if (d[(y * cv.width + x) * 4 + 3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 < 0) return cv;
    const o = document.createElement('canvas'); o.width = x1 - x0 + 1; o.height = y1 - y0 + 1; o.getContext('2d').drawImage(cv, -x0, -y0); return o;
  }
  // 벤야: her 사이드 / 해머 skins draw only the blade and the pommel; the shaft is painted into the weapon-holding body
  // (0298 col 8 row 12). For the icons it is the pixels that body has and the base body has not (avatarlib.weapon_shaft)
  // 그림마다 픽셀을 비교하므로, 같은 프레임(두 몸의 조각이 같다)이면 앞서 만든 것을 쓴다 (의상을 입은 화면은 틱마다 부른다)
  const shaftCache = new Map();
  function shaftLayer(c, ix, motion, dir, t) {
    const wb = c.weapon_body && c.weapon_body['12']; if (!wb || wb === 65535 || wb === ix.body) return null;
    const A = S.anims[wb], B = S.anims[ix.body]; if (!A || !B || !dirData(A, motion, dir) || !dirData(B, motion, dir)) return null;
    const la = animLayers(A, motion, dir, t, {}, {}, true).map(l => Object.assign(l, { tag: '' }));
    const lb = animLayers(B, motion, dir, t, {}, {}, true).map(l => Object.assign(l, { tag: '' }));
    if (!la.length || !lb.length) return null;
    const sig = l => [l.tex && l.tex.id, l.sx, l.sy, l.w, l.h, l.x, l.y, l.flip ? 1 : 0, l.rot ? JSON.stringify(l.rot) : ''].join(',');
    const key = wb + '|' + la.map(sig).join(';') + '|' + lb.map(sig).join(';');
    if (shaftCache.has(key)) { const hit = shaftCache.get(key); return hit && Object.assign({}, hit); }
    const made = shaftDiff(la, lb);
    if (shaftCache.size > 400) shaftCache.clear();
    shaftCache.set(key, made);
    return made && Object.assign({}, made);
  }
  function shaftDiff(la, lb) {
    const b = bounds(la.concat(lb)), w = Math.max(1, b.maxx - b.minx), h = Math.max(1, b.maxy - b.miny);
    const ca = document.createElement('canvas'), cb = document.createElement('canvas'); ca.width = cb.width = w; ca.height = cb.height = h;
    drawLayers(ca.getContext('2d'), la, -b.minx, -b.miny); drawLayers(cb.getContext('2d'), lb, -b.minx, -b.miny);
    const ga = ca.getContext('2d'), da = ga.getImageData(0, 0, w, h), p = da.data, q = cb.getContext('2d').getImageData(0, 0, w, h).data;
    let n = 0;
    for (let i = 0; i < p.length; i += 4) {
      const same = Math.max(Math.abs(p[i] - q[i]), Math.abs(p[i + 1] - q[i + 1]), Math.abs(p[i + 2] - q[i + 2]), Math.abs(p[i + 3] - q[i + 3])) <= 8;
      if (same || !p[i + 3]) p[i] = p[i + 1] = p[i + 2] = p[i + 3] = 0; else n++;
    }
    if (!n) return null;
    ga.putImageData(da, 0, 0);
    return { img: ca, sx: 0, sy: 0, w, h, x: b.minx, y: b.miny, flip: false, layer: 0, ei: -1, blend: 0, alpha: 1, tag: '' };
  }
  // one-off single-item preview (the item's first frame, like the desktop icon) for anything not in a sheet
  async function itemIcon(ci, iid) {
    const c = await loadChar(ci); const it = c.byId[iid] || (S.tlist && S.tlist.byId[iid]); if (!it) return null;
    const tc = S.extras.transforms[iid];
    if (tc && tc.costume && !tc.hair_baked && it.slot === 'costume') {        // outfit without painted hair: add the default hair
      const pose = { char: ci, motion: 0, dir: 10, hair: S.index.chars[ci].default_hair, items: [iid], hairMode: 'all' }; await prepare(pose);
      const L = compose(pose, 0); if (L.length) {
        const b = bounds(L.map(l => Object.assign(l, { tag: '' }))), cv = document.createElement('canvas');
        cv.width = Math.max(1, b.maxx - b.minx); cv.height = Math.max(1, b.maxy - b.miny); drawLayers(cv.getContext('2d'), L, -b.minx, -b.miny); return trimCanvas(cv);
      }
    }
    await Promise.all(it.anims.map(loadAnim)); await Promise.all(texIds(it.anims).map(loadTex));
    const ix = S.index.chars[ci], wb = it.slot === 'weapon' && c.weapon_body && c.weapon_body['12'];   // 벤야: the shaft comes from the body
    const shaft = wb && wb !== 65535 && wb !== ix.body;
    if (shaft) { await Promise.all([wb, ix.body].map(loadAnim)); await Promise.all(texIds([wb, ix.body]).map(loadTex)); }
    // idle, or what a transform maps idle to (some cloaks have no front view in motion 0), then any motion / direction
    const tr = S.extras.transforms[iid], want = [...(tr && tr.motions[0] !== undefined ? [tr.motions[0]] : []), 0, 1, 14];
    for (const a of it.anims) for (const m of motionsOf(S.anims[a])) if (!want.includes(m)) want.push(m);   // then every motion
    const draw = layers => {
      const b = bounds(layers.map(l => Object.assign(l, { tag: '' }))), cv = document.createElement('canvas');
      cv.width = Math.max(1, b.maxx - b.minx); cv.height = Math.max(1, b.maxy - b.miny);
      drawLayers(cv.getContext('2d'), layers, -b.minx, -b.miny);
      return trimCanvas(cv);   // faint wide glow layers must not push the item into a corner
    };
    const visible = cv => { const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 24) n++; return n; };
    for (const m0 of want) {
      let best = null;                                           // 보조 (shields): the facing that shows the most of it (avatarlib.icon_image)
      for (const dv of [10, 2, 12, 8]) {
        const attach = {}; let layers = [], pose = null;
        for (const [k, a] of it.anims.entries()) {
          const A = S.anims[a]; if (!A) continue; const m = it.fxm ? resolveMotion(A, it.fxm[k], 'any') : resolveMotion(A, m0, ...want); if (m === null) continue;   // each anim falls back to its own first motion
          const dd = dirData(A, m, dv), ts = dd ? dd.e.flat().filter(k => k[0] === 0).map(k => k[1]) : [];   // first frame may start after tick 0
          const t = ts.length ? Math.min(...ts) : 0; if (!pose) pose = [m, t];
          // 소드셰이프 광선: read after the hilt (it hangs on it) but laid under it, as on the stage and in the game
          const got = animLayers(A, m, dv, t, attach, attach, true);
          if (WEAPON_BEAM.has(+a)) layers.unshift(...got); else layers.push(...got);
        }
        if (!layers.length) continue;
        if (shaft) { const sl = shaftLayer(c, ix, pose[0], dv, pose[1]); if (sl) layers.unshift(sl); }
        const cv = draw(layers);
        if (it.slot !== 'sub') return cv;
        const n = visible(cv); if (!best || n > best[0]) best = [n, cv];
      }
      if (best) return best[1];
    }
    return null;
  }

  return { S, setBase, setSign, pass, bust, getJSON, baseDyes, customRamp, partRamp, q565, load, loadChar, loadAnim, loadTex, mergeBundle, dropBundle, prepare, plan, compose, render, drawLayers, centeredAnchor, coreCenter, bounds,
           maxDuration, frameTimes, faceAnims, faceDyes, iconSheet, itemIcon, hairIcon, dyes, costumeDyes, loadTransforms, transformIcon, tdbCell, resolveMotion, motionsOf,
           charName };
})();
