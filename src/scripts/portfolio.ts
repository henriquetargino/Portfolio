// Caderno de Laboratório — interatividade do site.
// View Transitions: setup global 1x; setup de página a cada astro:page-load.
// Move 2: cada célula "executa" ao entrar na tela (In[ ]→In[*]→In[n]),
// os gráficos se desenham progressivamente e as métricas contam de zero.
import rough from 'roughjs';
import { tools as instrTools } from '../data/tools';
import { navigate } from 'astro:transitions/client';

const root = document.documentElement;
const base = import.meta.env.BASE_URL;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const cssVar = (n) => getComputedStyle(root).getPropertyValue(n).trim();

function fitCanvas(c) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = c.clientWidth, h = c.clientHeight;
  if (!w || !h) return null;
  c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
  const x = c.getContext('2d');
  x.setTransform(dpr, 0, 0, dpr, 0, 0);
  x.clearRect(0, 0, w, h);
  return { x, w, h };
}

let raf = null;
function kick() { if (!raf && !reduce) raf = requestAnimationFrame(loop); }

// progresso de "desenho" dos gráficos (0..1) — animado quando a célula executa
let nnProg = 0, handProg = 0, instrProg = 0;
let nnRun = false, handRun = false, instrRun = false;
let revealTargets = [];
let lastReveal = 0;
let rafOk = false;

/* ===================== REGRESSION (home) ===================== */
let fig = null, eqEl = null, r2El = null;
const PAD = { l: 42, r: 18, t: 18, b: 32 };
const DX1 = 10, DY1 = 10;
let figW = 0, figH = 0, figDPR = 1, fctx = null;
let pts = [], dragIdx = -1, fitA = 0, fitB = 0, fitR2 = 0, lineProg = 0, figDirty = true;

function initPts() {
  pts = [];
  const xs = [0.7, 1.7, 2.7, 3.7, 4.7, 5.7, 6.8, 7.9, 8.9];
  for (let i = 0; i < xs.length; i++) {
    let y = 1.1 + 0.78 * xs[i] + (Math.random() - 0.5) * 2.7;
    y = Math.max(0.5, Math.min(9.5, y));
    pts.push({ x: xs[i], y, seed: i * 13 + 5 });
  }
}
const PX = (x) => PAD.l + (x / DX1) * (figW - PAD.l - PAD.r);
const PY = (y) => (figH - PAD.b) - (y / DY1) * (figH - PAD.t - PAD.b);
const IX = (p) => (p - PAD.l) / (figW - PAD.l - PAD.r) * DX1;
const IY = (p) => ((figH - PAD.b) - p) / (figH - PAD.t - PAD.b) * DY1;

function computeFit() {
  const n = pts.length; let sx = 0, sy = 0;
  for (const p of pts) { sx += p.x; sy += p.y; }
  const mx = sx / n, my = sy / n;
  let num = 0, den = 0;
  for (const p of pts) { num += (p.x - mx) * (p.y - my); den += (p.x - mx) * (p.x - mx); }
  fitB = den === 0 ? 0 : num / den;
  fitA = my - fitB * mx;
  let ssr = 0, sst = 0;
  for (const p of pts) { const yh = fitA + fitB * p.x; ssr += (p.y - yh) * (p.y - yh); sst += (p.y - my) * (p.y - my); }
  fitR2 = sst === 0 ? 0 : 1 - ssr / sst;
}

function figResize() {
  if (!fig) return;
  figDPR = Math.min(window.devicePixelRatio || 1, 2);
  figW = fig.clientWidth; figH = fig.clientHeight;
  fig.width = Math.floor(figW * figDPR); fig.height = Math.floor(figH * figDPR);
  fctx = fig.getContext('2d');
  fctx.setTransform(figDPR, 0, 0, figDPR, 0, 0);
  figDirty = true;
}

function drawReg() {
  if (!fig || !figW || !fctx) return;
  fctx.setTransform(figDPR, 0, 0, figDPR, 0, 0);
  fctx.clearRect(0, 0, figW, figH);
  const ink = cssVar('--ink'), soft = cssVar('--ink-soft'), acc = cssVar('--accent');
  const rc = rough.canvas(fig);
  fctx.strokeStyle = cssVar('--grid'); fctx.lineWidth = 1;
  for (let g = 2; g <= 10; g += 2) {
    fctx.beginPath(); fctx.moveTo(PX(g), PY(0)); fctx.lineTo(PX(g), PY(10)); fctx.stroke();
    fctx.beginPath(); fctx.moveTo(PX(0), PY(g)); fctx.lineTo(PX(10), PY(g)); fctx.stroke();
  }
  const axo = { stroke: ink, strokeWidth: 1.4, roughness: 1.2, seed: 7 };
  rc.line(PX(0), PY(0), PX(0), PY(10), axo);
  rc.line(PX(0), PY(0), PX(10), PY(0), axo);
  fctx.fillStyle = soft; fctx.font = '10px "JetBrains Mono", monospace';
  for (let t = 2; t <= 10; t += 2) {
    fctx.fillText(String(t), PX(t) - 3, PY(0) + 15);
    fctx.fillText(String(t), PX(0) - 16, PY(t) + 3);
  }
  const x1 = lineProg * DX1;
  rc.line(PX(0), PY(fitA), PX(x1), PY(fitA + fitB * x1),
    { stroke: acc, strokeWidth: 2.4, roughness: 1, bowing: 0.8, seed: 42 });
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    rc.circle(PX(p.x), PY(p.y), i === dragIdx ? 17 : 11,
      { stroke: ink, strokeWidth: 1, fill: acc, fillStyle: 'solid', seed: p.seed });
  }
  if (eqEl) eqEl.textContent = 'ŷ = ' + fitA.toFixed(2) + ' + ' + fitB.toFixed(2) + 'x';
  if (r2El) r2El.textContent = 'R² = ' + fitR2.toFixed(3);
}

function endDrag() { if (dragIdx >= 0) { dragIdx = -1; figDirty = true; kick(); } }

function bindReg() {
  if (!fig) return;
  fig.addEventListener('pointerdown', (e) => {
    const r = fig.getBoundingClientRect();
    const mxp = e.clientX - r.left, myp = e.clientY - r.top;
    for (let i = 0; i < pts.length; i++) {
      const dx = mxp - PX(pts[i].x), dy = myp - PY(pts[i].y);
      if (dx * dx + dy * dy < 18 * 18) { dragIdx = i; try { fig.setPointerCapture(e.pointerId); } catch (err) { } break; }
    }
  });
  fig.addEventListener('pointermove', (e) => {
    if (dragIdx < 0) return;
    const r = fig.getBoundingClientRect();
    pts[dragIdx].x = Math.max(0.3, Math.min(9.8, IX(e.clientX - r.left)));
    pts[dragIdx].y = Math.max(0.3, Math.min(9.8, IY(e.clientY - r.top)));
    computeFit(); figDirty = true; kick();
  });
  fig.addEventListener('pointerup', endDrag);
  fig.addEventListener('pointercancel', endDrag);
}

/* ===================== HAND-DRAWN REPRESENTATIONS ===================== */
function drawNN() {
  const c = document.getElementById('nn'); if (!c || !rough) return;
  const m = fitCanvas(c); if (!m) return;
  const rc = rough.canvas(c);
  const ink = cssVar('--ink'), acc = cssVar('--accent'), soft = cssVar('--ink-soft');
  const cols = [0.16, 0.5, 0.84].map((f) => f * m.w);
  const counts = [3, 5, 2];
  const layers = [];
  for (let l = 0; l < counts.length; l++) {
    const arr = [];
    for (let i = 0; i < counts[l]; i++) arr.push({ x: cols[l], y: m.h * (i + 1) / (counts[l] + 1) });
    layers.push(arr);
  }
  const edges = []; let es = 100;
  for (let l = 0; l < layers.length - 1; l++)
    for (const a of layers[l]) for (const b of layers[l + 1]) edges.push({ a, b, seed: es++ });
  const nodes = []; let ns = 3;
  for (const layer of layers) for (const nd of layer) nodes.push({ x: nd.x, y: nd.y, seed: ns++ * 9 });
  const count = Math.ceil(nnProg * (edges.length + nodes.length));
  let d = 0;
  for (const e of edges) { if (d >= count) break; rc.line(e.a.x, e.a.y, e.b.x, e.b.y, { stroke: soft, strokeWidth: 0.55, roughness: 1, seed: e.seed }); d++; }
  for (const nd of nodes) { if (d >= count) break; rc.circle(nd.x, nd.y, 17, { stroke: ink, strokeWidth: 1.1, fill: acc, fillStyle: 'solid', seed: nd.seed }); d++; }
}

const LM = [[120, 150], [97, 136], [80, 121], [68, 108], [58, 96], [101, 95], [97, 72], [94, 56], [92, 42],
[121, 90], [121, 64], [121, 46], [121, 32], [141, 93], [145, 70], [147, 54], [149, 40],
[160, 100], [168, 82], [173, 68], [177, 56]];
const CON = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
[9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17]];
function drawHand() {
  const c = document.getElementById('hand'); if (!c || !rough) return;
  const m = fitCanvas(c); if (!m) return;
  const rc = rough.canvas(c);
  const ink = cssVar('--ink'), acc = cssVar('--accent'), soft = cssVar('--ink-soft');
  const s = Math.min(m.w / 220, m.h / 175);
  const ox = (m.w - 200 * s) / 2 - 8 * s, oy = (m.h - 165 * s) / 2;
  const HX = (i) => ox + LM[i][0] * s;
  const HY = (i) => oy + LM[i][1] * s;
  const count = Math.ceil(handProg * (CON.length + LM.length));
  let d = 0;
  for (let k = 0; k < CON.length; k++) {
    if (d >= count) break;
    rc.line(HX(CON[k][0]), HY(CON[k][0]), HX(CON[k][1]), HY(CON[k][1]), { stroke: soft, strokeWidth: 1, roughness: 1.1, seed: k + 30 });
    d++;
  }
  for (let i = 0; i < LM.length; i++) {
    if (d >= count) break;
    rc.circle(HX(i), HY(i), i === 4 || i === 8 ? 11 : 7, { stroke: ink, strokeWidth: 0.9, fill: acc, fillStyle: 'solid', seed: i * 5 + 1 });
    d++;
  }
}
/* ---- instrumentos · scatter (k-means) desenhado à mão ---- */
const INSTR_AREAS = ['ml', 'cv', 'agents', 'data'] as const;
const instrCenters = {
  ml: { fx: 0.23, fy: 0.42 },
  cv: { fx: 0.61, fy: 0.16 },
  agents: { fx: 0.77, fy: 0.55 },
  data: { fx: 0.41, fy: 0.81 },
};
const clampN = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const seedRand = (s) => { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

function drawInstrScatter() {
  const c = document.getElementById('instr-scatter'); if (!c || !rough) return;
  const m = fitCanvas(c); if (!m) return;
  const cx = c.getContext('2d');
  const rc = rough.canvas(c);
  const ink = cssVar('--ink');
  const colMap = { ml: cssVar('--hl-ml'), cv: cssVar('--hl-cv'), agents: cssVar('--hl-agent'), data: cssVar('--hl-data') };
  const PADL = 30, PADR = 22, PADT = 26, PADB = 26;
  const plotW = m.w - PADL - PADR, plotH = m.h - PADT - PADB;
  cx.strokeStyle = cssVar('--grid'); cx.lineWidth = 1;
  for (let g = 1; g < 5; g++) {
    const yy = PADT + plotH * g / 5;
    cx.beginPath(); cx.moveTo(PADL, yy); cx.lineTo(PADL + plotW, yy); cx.stroke();
    const xx = PADL + plotW * g / 5;
    cx.beginPath(); cx.moveTo(xx, PADT); cx.lineTo(xx, PADT + plotH); cx.stroke();
  }
  rc.line(PADL, PADT, PADL, PADT + plotH, { stroke: ink, strokeWidth: 1.4, roughness: 1.1, seed: 7 });
  rc.line(PADL, PADT + plotH, PADL + plotW, PADT + plotH, { stroke: ink, strokeWidth: 1.4, roughness: 1.1, seed: 9 });
  // pré-calcula os pontos (agrupados por área = clusters surgem um a um)
  const P = [];
  for (const area of INSTR_AREAS) {
    const list = instrTools.filter((t) => t.area === area);
    const ctr = instrCenters[area];
    const col = colMap[area];
    list.forEach((t, i) => {
      const ang = i * 2.39996;
      const rad = Math.min(0.038 + 0.04 * Math.pow(i, 0.72), 0.13);
      const jx = (seedRand(t.symbol.charCodeAt(0) + i * 7) - 0.5) * 0.03;
      const jy = (seedRand(t.symbol.charCodeAt(0) * 3 + i) - 0.5) * 0.03;
      const fx = clampN(ctr.fx + Math.cos(ang) * rad + jx, 0.05, 0.95);
      const fy = clampN(ctr.fy + Math.sin(ang) * rad + jy, 0.06, 0.95);
      P.push({ px: PADL + fx * plotW, py: PADT + fy * plotH, col, name: t.name, ang, seed: t.symbol.charCodeAt(0) * 5 + i * 3 });
    });
  }
  const count = Math.ceil(instrProg * P.length);
  cx.font = '600 12px "JetBrains Mono", monospace';
  for (let k = 0; k < count && k < P.length; k++) {
    const p = P[k];
    rc.circle(p.px, p.py, 15, { stroke: ink, strokeWidth: 1.1, fill: p.col, fillStyle: 'solid', seed: p.seed });
    const dirx = Math.cos(p.ang), diry = Math.sin(p.ang);
    cx.fillStyle = ink;
    let align = dirx > 0.35 ? 'left' : dirx < -0.35 ? 'right' : 'center';
    let lx = p.px + dirx * 13;
    const tw = cx.measureText(p.name).width;
    const rEdge = PADL + plotW, lEdge = PADL;
    const rOver = (align === 'left' ? lx + tw : align === 'center' ? p.px + tw / 2 : lx) > rEdge;
    const lOver = (align === 'right' ? lx - tw : align === 'center' ? p.px - tw / 2 : lx) < lEdge;
    if (rOver) { align = 'right'; lx = p.px - 13; }
    else if (lOver) { align = 'left'; lx = p.px + 13; }
    if (p.name === 'Pydantic AI') { align = 'left'; lx = p.px + 13; }
    cx.textAlign = align;
    cx.textBaseline = diry > 0.3 ? 'top' : diry < -0.3 ? 'bottom' : 'middle';
    cx.fillText(p.name, lx, p.py + diry * 13);
  }
  cx.textAlign = 'left';
  cx.textBaseline = 'alphabetic';
}

function drawStatics() { drawNN(); drawHand(); drawInstrScatter(); }

/* ===================== CONTEXTUAL CURSOR (persiste entre páginas) ===================== */
let cur = null, gx = null, gy = null, ro = null;
let curTX = -100, curTY = -100, curRX = -100, curRY = -100, overChart = false;

/* ===================== IDLE-SAFE LOOP ===================== */
function loop() {
  rafOk = true;
  let busy = false;
  if (fine && cur) {
    const dx = curTX - curRX, dy = curTY - curRY;
    curRX += dx * 0.2; curRY += dy * 0.2;
    cur.style.transform = 'translate(' + curRX + 'px,' + curRY + 'px)';
    if (Math.abs(dx) + Math.abs(dy) > 0.4) busy = true;
  }
  if (fig) {
    if (lineProg < 1) { lineProg = Math.min(1, lineProg + 0.04); figDirty = true; busy = true; }
    if (figDirty) { drawReg(); figDirty = false; }
  }
  if (nnRun) { nnProg = Math.min(1, nnProg + 0.05); drawNN(); busy = true; if (nnProg >= 1) nnRun = false; }
  if (handRun) { handProg = Math.min(1, handProg + 0.04); drawHand(); busy = true; if (handProg >= 1) handRun = false; }
  if (instrRun) { instrProg = Math.min(1, instrProg + 0.028); drawInstrScatter(); busy = true; if (instrProg >= 1) instrRun = false; }
  raf = busy ? requestAnimationFrame(loop) : null;
}

/* ===================== EXECUÇÃO DE CÉLULAS (notebook) ===================== */
function blankCell(label) {
  if (label.dataset.cellInit) return;
  label.dataset.cellInit = '1';
  const m = label.textContent.match(/^\s*([A-Za-z]+)\s*\[([^\]]*)\](.*)$/);
  if (!m) { label.dataset.cellPlain = '1'; return; }
  label.dataset.cellPre = m[1]; label.dataset.cellNum = m[2].trim(); label.dataset.cellPost = m[3];
  label.textContent = m[1] + ' [ ]' + m[3];
}
function animateLabel(label) {
  if (label.dataset.cellPlain) return;
  const pre = label.dataset.cellPre, num = label.dataset.cellNum, post = label.dataset.cellPost;
  if (pre === undefined) return;
  if (/in/i.test(pre)) {
    label.textContent = pre + ' [*]' + post;
    setTimeout(() => { label.textContent = pre + ' [' + num + ']' + post; }, 473);
  } else {
    label.textContent = pre + ' [' + num + ']' + post;
  }
}
function animateMetric(b) {
  if (b.dataset.counted) return;
  b.dataset.counted = '1';
  const mm = b.textContent.trim().match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!mm) return; // ex.: "∞" — deixa como está
  const pre = mm[1], target = parseFloat(mm[2]), exact = mm[2], post = mm[3];
  const isInt = exact.indexOf('.') < 0;
  const dur = 950, t0 = performance.now();
  function step(t) {
    const k = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - k, 3);
    const v = target * e;
    b.textContent = pre + (isInt ? Math.round(v) : v.toFixed(1)) + post;
    if (k < 1) requestAnimationFrame(step); else b.textContent = pre + exact + post;
  }
  requestAnimationFrame(step);
}
function fireReveal(t) {
  if (t.type === 'label') animateLabel(t.el);
  else if (t.type === 'metric') animateMetric(t.el);
  else if (t.type === 'chart') {
    // com rAF: anima o desenho; sem rAF (aba oculta/offscreen): desenha cheio na hora
    if (t.id === 'nn') { if (rafOk) { nnProg = 0; nnRun = true; kick(); } else { nnProg = 1; drawNN(); } }
    else if (t.id === 'hand') { if (rafOk) { handProg = 0; handRun = true; kick(); } else { handProg = 1; drawHand(); } }
    else if (t.id === 'instr-scatter') { if (rafOk) { instrProg = 0; instrRun = true; kick(); } else { instrProg = 1; drawInstrScatter(); } }
  }
}
// reveal por posição de scroll (IntersectionObserver é instável em alguns ambientes)
function revealOnScroll() {
  const vh = window.innerHeight;
  for (const t of revealTargets) {
    if (t.done) continue;
    const r = t.el.getBoundingClientRect();
    if (r.top < vh * 0.9) { t.done = true; fireReveal(t); }
  }
}
function onScroll() {
  const now = Date.now();
  if (now - lastReveal < 90) return;
  lastReveal = now;
  revealOnScroll();
}

/* ===================== TERMINAL ESCONDIDO (aperte /) ===================== */
let termEl = null, termIn = null, termOut = null;
function escHtmlT(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function termRefs() { termEl = document.getElementById('term'); termIn = document.getElementById('term-in'); termOut = document.getElementById('term-out'); }
function termPrint(html) {
  if (!termOut) return;
  const row = document.createElement('div');
  row.className = 'term-row';
  row.innerHTML = html;
  termOut.appendChild(row);
  termOut.scrollTop = termOut.scrollHeight;
}
function termOpen() {
  termRefs();
  if (!termEl) return;
  if (!termOut.dataset.greeted) { termOut.dataset.greeted = '1'; termPrint('<span class="tm-dim">portfolio.ipynb shell · digite <b>help</b> + Enter · <b>esc</b> pra sair</span>'); }
  termEl.classList.add('open');
  setTimeout(() => { if (termIn) termIn.focus(); }, 30);
}
function termClose() { if (termEl) termEl.classList.remove('open'); if (termIn) termIn.blur(); }
function termGo(path) { termClose(); try { navigate(base + path); } catch (e) { location.href = base + path; } }
function termExec(raw) {
  const cmd = (raw || '').trim();
  termPrint('<span class="tm-p">&gt;&gt;&gt;</span> ' + escHtmlT(cmd));
  if (!cmd) return;
  const parts = cmd.toLowerCase().split(/\s+/);
  const name = parts[0];
  if (name === 'help') termPrint('whoami · projects · cv · nn · contact · clear · home');
  else if (name === 'whoami') termPrint('henrique targino<br><span class="tm-dim">ai engineer · cientista de dados</span><br><span class="tm-dim">visão computacional · redes neurais · agentes de ia</span><br>"ainda acho isso surreal"');
  else if (name === 'projects' || name === 'ls') termPrint('detector-sos · ai-soccer · precos-carros · buraco · agente-whatsapp<br><span class="tm-dim">dica: "cv" abre o de visão computacional, "nn" o de redes neurais</span>');
  else if (name === 'cv') termGo('projetos/detector-sos');
  else if (name === 'nn' || name === 'soccer') termGo('projetos/ai-soccer');
  else if (name === 'contact' || name === 'contato') { const c = document.getElementById('contato'); if (c) { termClose(); c.scrollIntoView({ behavior: 'smooth' }); } else termGo(''); }
  else if (name === 'home') termGo('');
  else if (name === 'clear' || name === 'cls') { if (termOut) termOut.innerHTML = ''; }
  else termPrint('<span class="tm-err">comando não encontrado:</span> ' + escHtmlT(name) + ', digite <b>help</b>');
}

/* ===================== SETUP GLOBAL (1x) ===================== */
let globalsReady = false;
function setupGlobals() {
  if (fine) {
    window.addEventListener('pointermove', (e) => {
      curTX = e.clientX; curTY = e.clientY;
      if (overChart && fig && gx && gy && ro) {
        gx.style.top = e.clientY + 'px';
        gy.style.left = e.clientX + 'px';
        const r = fig.getBoundingClientRect();
        ro.style.left = (e.clientX + 14) + 'px';
        ro.style.top = (e.clientY + 16) + 'px';
        ro.textContent = 'x ' + IX(e.clientX - r.left).toFixed(1) + '  ·  y ' + IY(e.clientY - r.top).toFixed(1);
      }
      kick();
    });
  }

  window.addEventListener('resize', () => { figResize(); drawStatics(); revealOnScroll(); kick(); });
  window.addEventListener('scroll', onScroll, { passive: true });

  // terminal escondido: "/" abre, "esc" fecha
  document.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); termOpen(); }
    else if (e.key === 'Escape') { termClose(); }
  });

  requestAnimationFrame(() => { rafOk = true; });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawStatics);

  // carga inicial/refresh sem hash → começa no hero (sobrepõe restauração de rolagem)
  if (!location.hash) {
    window.scrollTo(0, 0);
    setTimeout(() => { if (!location.hash) window.scrollTo(0, 0); }, 80);
  }
}

/* ===================== SETUP DE PÁGINA (a cada navegação) ===================== */
function setupPage() {
  // refs que podem ser recriados a cada navegação
  cur = document.getElementById('cur');
  gx = document.getElementById('gx'); gy = document.getElementById('gy'); ro = document.getElementById('ro');

  // terminal (elementos recriados a cada navegação)
  termRefs();
  if (termIn && !termIn.dataset.bound) {
    termIn.dataset.bound = '1';
    termIn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { termExec(termIn.value); termIn.value = ''; }
      else if (e.key === 'Escape') { termClose(); }
    });
  }
  const termX = document.getElementById('term-close');
  if (termX && !termX.dataset.bound) { termX.dataset.bound = '1'; termX.addEventListener('click', termClose); }

  // a marca volta pra seção certa (não pro topo) quando se está numa sub-página
  const brand = document.querySelector('.brand');
  if (brand) {
    const p = location.pathname;
    let target = base;
    if (p.indexOf('/projetos/') >= 0) {
      const slug = p.split('/projetos/')[1].replace(/\/+$/, '');
      target = slug ? base + '#proj-' + slug : base;
    } else if (p.indexOf('/certificados') >= 0) target = base + '#certificados';
    else if (p.indexOf('/artigos') >= 0) target = base + '#artigos';
    brand.setAttribute('href', target);
  }

  // depois que o scroll pra âncora acontece, limpa o hash da URL —
  // assim um refresh cai no hero, mas a navegação (back-link) ainda rola pro lugar certo
  if (location.hash && /^#(proj-|certificados|artigos|instrumentos|contato)/.test(location.hash)) {
    setTimeout(() => {
      try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) { }
    }, 700);
  }

  fig = document.getElementById('reg');
  eqEl = document.getElementById('eq');
  r2El = document.getElementById('r2');
  if (fig) { initPts(); computeFit(); figResize(); bindReg(); lineProg = reduce ? 1 : 0; }

  if (fine && cur) {
    document.body.classList.add('has-cursor');
    document.documentElement.classList.add('has-cursor');
    cur.classList.remove('link');
    overChart = false;
    document.body.classList.remove('cur-chart');
    document.querySelectorAll('a, button, .pcard').forEach((el) => {
      if (el.dataset.curBound) return;
      el.dataset.curBound = '1';
      el.addEventListener('pointerenter', () => cur.classList.add('link'));
      el.addEventListener('pointerleave', () => cur.classList.remove('link'));
    });
    if (fig) {
      const fw = fig.closest('.figure');
      if (fw) {
        fw.addEventListener('pointerenter', () => { overChart = true; document.body.classList.add('cur-chart'); });
        fw.addEventListener('pointerleave', () => { overChart = false; document.body.classList.remove('cur-chart'); });
      }
    }
  }

  // estado de "execução" das células (reveal por scroll)
  nnProg = handProg = instrProg = reduce ? 1 : 0;
  nnRun = handRun = instrRun = false;
  revealTargets = [];
  if (!reduce) {
    document.querySelectorAll('.cell-label').forEach((l) => { blankCell(l); revealTargets.push({ el: l, type: 'label' }); });
    ['nn', 'hand', 'instr-scatter'].forEach((id) => { const el = document.getElementById(id); if (el) revealTargets.push({ el, type: 'chart', id }); });
    document.querySelectorAll('.metric b').forEach((b) => revealTargets.push({ el: b, type: 'metric' }));
    revealOnScroll();
  }

  drawStatics();
  if (reduce && fig) drawReg();

  // carrossel de certificados (toca só quando visível)
  const certCar = document.getElementById('cert-carousel');
  if (certCar && !reduce) {
    const track = certCar.querySelector('.cert-track');
    if (track) {
      new IntersectionObserver((entries) => {
        entries.forEach((e) => track.classList.toggle('playing', e.isIntersecting));
      }, { threshold: 0 }).observe(certCar);
    }
  }

  // pausa vídeos fora da tela
  document.querySelectorAll('video[data-autopause]').forEach((v) => {
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { v.play().catch(() => { }); } else { v.pause(); }
      });
    }, { threshold: 0.1 }).observe(v);
  });

  if (!reduce) kick();
}

/* ===================== INIT (via View Transitions) ===================== */
function onPageLoad() {
  if (!globalsReady) { setupGlobals(); globalsReady = true; }
  setupPage();
}
document.addEventListener('astro:page-load', onPageLoad);
