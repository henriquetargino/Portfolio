// Caderno de Laboratório — interatividade do site (portado do protótipo v4).
// Roda em todas as páginas; cada bloco se ativa só se os elementos existirem.
import rough from 'roughjs';

const root = document.documentElement;
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

/* ===================== REGRESSION (home) ===================== */
const fig = document.getElementById('reg');
const eqEl = document.getElementById('eq');
const r2El = document.getElementById('r2');
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

if (fig) {
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
  let es = 100;
  for (let l = 0; l < layers.length - 1; l++)
    for (const a of layers[l]) for (const b of layers[l + 1])
      rc.line(a.x, a.y, b.x, b.y, { stroke: soft, strokeWidth: 0.55, roughness: 1, seed: es++ });
  let ns = 3;
  for (const layer of layers) for (const nd of layer)
    rc.circle(nd.x, nd.y, 17, { stroke: ink, strokeWidth: 1.1, fill: acc, fillStyle: 'solid', seed: ns++ * 9 });
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
  for (let k = 0; k < CON.length; k++)
    rc.line(HX(CON[k][0]), HY(CON[k][0]), HX(CON[k][1]), HY(CON[k][1]),
      { stroke: soft, strokeWidth: 1, roughness: 1.1, seed: k + 30 });
  for (let i = 0; i < LM.length; i++)
    rc.circle(HX(i), HY(i), i === 4 || i === 8 ? 11 : 7,
      { stroke: ink, strokeWidth: 0.9, fill: acc, fillStyle: 'solid', seed: i * 5 + 1 });
}
function drawStatics() { drawNN(); drawHand(); }

/* ===================== CONTEXTUAL CURSOR ===================== */
const cur = document.getElementById('cur');
const gx = document.getElementById('gx'), gy = document.getElementById('gy'), ro = document.getElementById('ro');
let curTX = -100, curTY = -100, curRX = -100, curRY = -100, overChart = false;

if (fine && cur) {
  document.body.classList.add('has-cursor');
  document.querySelectorAll('a, button, .pcard').forEach((el) => {
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

/* ===================== IDLE-SAFE LOOP ===================== */
function loop() {
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
  raf = busy ? requestAnimationFrame(loop) : null;
}

/* ===================== THEME ===================== */
const tbtn = document.getElementById('theme-toggle');
function setLabel() { if (tbtn) tbtn.textContent = root.getAttribute('data-theme') === 'blueprint' ? 'tema: blueprint' : 'tema: papel'; }
if (tbtn) {
  tbtn.addEventListener('click', () => {
    root.setAttribute('data-theme', root.getAttribute('data-theme') === 'blueprint' ? 'paper' : 'blueprint');
    setLabel(); figDirty = true; drawStatics(); kick();
  });
  setLabel();
}

/* ===================== INIT ===================== */
window.addEventListener('resize', () => { figResize(); drawStatics(); kick(); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawStatics);
if (fig) { initPts(); computeFit(); figResize(); }
drawStatics();
if (reduce) { if (fig) { lineProg = 1; drawReg(); } } else { kick(); }
