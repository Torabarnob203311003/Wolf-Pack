import { useState, useEffect, useRef } from "react";

// ─── SOUND ENGINE (Web Audio API) ────────────────────────────────────────────
function createAudioCtx() {
  try { return new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; }
}
function playDiamondSound(ctx) {
  if (!ctx) return;
  const t = ctx.currentTime;
  [880, 1320, 1760].forEach((freq, i) => {
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = "sine"; osc.frequency.setValueAtTime(freq, t + i * 0.04);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + i * 0.04 + 0.08);
    g.gain.setValueAtTime(0.15, t + i * 0.04); g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.04 + 0.35);
    osc.start(t + i * 0.04); osc.stop(t + i * 0.04 + 0.4);
  });
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.05;
  const src = ctx.createBufferSource(); src.buffer = buf;
  const bpf = ctx.createBiquadFilter(); bpf.type = "bandpass"; bpf.frequency.value = 4000;
  const gn = ctx.createGain(); gn.gain.setValueAtTime(1, t); gn.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  src.connect(bpf); bpf.connect(gn); gn.connect(ctx.destination);
  src.start(t); src.stop(t + 0.1);
}
function playBombSound(ctx) {
  if (!ctx) return;
  const t = ctx.currentTime;
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.8, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
  const src = ctx.createBufferSource(); src.buffer = buf;
  const lpf = ctx.createBiquadFilter(); lpf.type = "lowpass"; lpf.frequency.value = 180;
  const g = ctx.createGain(); g.gain.setValueAtTime(1.2, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
  src.connect(lpf); lpf.connect(g); g.connect(ctx.destination);
  src.start(t); src.stop(t + 0.8);
  const osc = ctx.createOscillator(), og = ctx.createGain();
  osc.connect(og); og.connect(ctx.destination); osc.type = "sine";
  osc.frequency.setValueAtTime(120, t); osc.frequency.exponentialRampToValueAtTime(30, t + 0.3);
  og.gain.setValueAtTime(0.9, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  osc.start(t); osc.stop(t + 0.3);
}
function playCashoutSound(ctx) {
  if (!ctx) return;
  const t = ctx.currentTime;
  [523, 659, 784, 1047].forEach((freq, i) => {
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination); osc.type = "triangle"; osc.frequency.value = freq;
    g.gain.setValueAtTime(0.2, t + i * 0.07); g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.4);
    osc.start(t + i * 0.07); osc.stop(t + i * 0.07 + 0.45);
  });
}
function playClickSound(ctx) {
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator(), g = ctx.createGain();
  osc.connect(g); g.connect(ctx.destination); osc.type = "sine"; osc.frequency.value = 400;
  g.gain.setValueAtTime(0.07, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  osc.start(t); osc.stop(t + 0.06);
}

// ─── MATH ENGINE ────────────────────────────────────────────────────────────
const HOUSE_EDGE = 0.08;
const TOTAL = 25;

function calcMult(rev, bombs) {
  let m = 1; const gems = TOTAL - bombs;
  for (let i = 0; i < rev; i++) {
    const rem = TOTAL - i, sr = gems - i;
    if (sr <= 0 || rem <= 0) break;
    m *= (rem / sr) * (1 - HOUSE_EDGE);
  }
  return Math.max(1, m);
}
function calcSurvival(rev, bombs) {
  let p = 1; const gems = TOTAL - bombs;
  for (let i = 0; i < rev; i++) {
    const rem = TOTAL - i, sr = gems - i;
    if (sr <= 0) return 0;
    p *= sr / rem;
  }
  return p;
}
function genBoard(bombs) {
  const a = Array(TOTAL).fill("gem");
  let n = 0;
  while (n < bombs) { const i = Math.floor(Math.random() * TOTAL); if (a[i] !== "mine") { a[i] = "mine"; n++; } }
  return a;
}

// ─── GEM SVG ─────────────────────────────────────────────────────────────────
function GemSVG({ size = 32, glow, pop }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      style={{ filter: glow ? "drop-shadow(0 0 8px #4ade80) drop-shadow(0 0 16px #22c55e)" : "none", animation: pop ? "gemPop 0.45s cubic-bezier(.36,1.4,.64,1) both" : "none" }}>
      <polygon points="24,4 44,18 38,44 10,44 4,18" fill="#22c55e" stroke="#4ade80" strokeWidth="1.2"/>
      <polygon points="24,4 44,18 24,14" fill="#6ee7b7" opacity="0.85"/>
      <polygon points="24,4 4,18 24,14" fill="#16a34a" opacity="0.9"/>
      <polygon points="24,14 44,18 38,44 10,44 4,18" fill="#166534" opacity="0.35"/>
      <polygon points="24,14 33,22 24,44 15,22" fill="#86efac" opacity="0.2"/>
      <line x1="24" y1="14" x2="24" y2="44" stroke="#4ade80" strokeWidth="0.6" opacity="0.4"/>
      <line x1="4" y1="18" x2="44" y2="18" stroke="#4ade80" strokeWidth="0.6" opacity="0.4"/>
    </svg>
  );
}

function MineSVG({ size = 28, explode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      style={{ filter: explode ? "drop-shadow(0 0 10px #ef4444) drop-shadow(0 0 20px #dc2626)" : "none", animation: explode ? "mineExplode 0.4s ease" : "none" }}>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <line key={i} x1="24" y1="24"
          x2={24 + Math.cos(deg * Math.PI / 180) * 19} y2={24 + Math.sin(deg * Math.PI / 180) * 19}
          stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
      ))}
      <circle cx="24" cy="24" r="12" fill="#1a1a2e" stroke="#ef4444" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="8.5" fill={explode ? "#ef4444" : "#2d2d4e"}/>
      <circle cx="20" cy="20" r="2" fill="#6b7280" opacity="0.5"/>
      {explode && <circle cx="24" cy="24" r="15" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>}
    </svg>
  );
}

// ─── TILE ────────────────────────────────────────────────────────────────────
function Tile({ idx, state, onPick, disabled }) {
  const [flipped, setFlipped] = useState(false);
  const [fresh, setFresh] = useState(false);
  const prev = useRef(state);

  useEffect(() => {
    if (state !== "hidden" && prev.current === "hidden") {
      requestAnimationFrame(() => setFlipped(true));
      setFresh(true);
      const t = setTimeout(() => setFresh(false), 600);
      prev.current = state;
      return () => clearTimeout(t);
    }
    if (state === "hidden") { setFlipped(false); prev.current = "hidden"; }
  }, [state]);

  const isGem = state === "gem" || state === "gem-safe";
  const isMine = state === "mine";

  return (
    <div onClick={() => !disabled && state === "hidden" && onPick(idx)}
      className="relative select-none"
      style={{ perspective: "700px", cursor: disabled || state !== "hidden" ? "default" : "pointer" }}>
      <div style={{
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.32s cubic-bezier(.4,0,.2,1)",
        position: "relative", width: "100%", paddingBottom: "100%",
      }}>
        {/* FRONT */}
        <div style={{
          backfaceVisibility: "hidden", position: "absolute", inset: 0,
          borderRadius: 10,
          background: "linear-gradient(145deg, #2a3352 0%, #1c2440 60%, #161d35 100%)",
          border: "1px solid rgba(255,255,255,0.055)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
          className={!disabled && state === "hidden" ? "hover-tile" : ""}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }}/>
        </div>
        {/* BACK */}
        <div style={{
          backfaceVisibility: "hidden", position: "absolute", inset: 0,
          transform: "rotateY(180deg)", borderRadius: 10,
          background: isGem ? "linear-gradient(145deg,#0b2718,#071a10)" : isMine ? "linear-gradient(145deg,#2d0e0e,#1a0707)" : "linear-gradient(145deg,#1c2440,#161d35)",
          border: isGem ? "1px solid rgba(74,222,128,0.28)" : isMine ? "1px solid rgba(239,68,68,0.38)" : "1px solid rgba(255,255,255,0.05)",
          boxShadow: isGem ? "0 0 18px rgba(34,197,94,0.13)" : isMine ? "0 0 18px rgba(239,68,68,0.18)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {isGem && <GemSVG size={28} glow pop={fresh} />}
          {isMine && <MineSVG size={26} explode={fresh} />}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function MineGame() {
  const [tab, setTab] = useState("manual");
  const [balance, setBalance] = useState(1000);
  const [betInput, setBetInput] = useState("0.00");
  const [bet, setBet] = useState(0);
  const [mines, setMines] = useState(3);
  const [board, setBoard] = useState(Array(TOTAL).fill("hidden"));
  const [game, setGame] = useState("idle"); // idle | playing | won | lost
  const [revealed, setRevealed] = useState(0);
  const [history, setHistory] = useState([]);
  const [muted, setMuted] = useState(false);
  const boardData = useRef([]);
  const audioCtx = useRef(null);
  const mutedRef = useRef(false);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  function getCtx() {
    if (!audioCtx.current) audioCtx.current = createAudioCtx();
    if (audioCtx.current?.state === "suspended") audioCtx.current.resume();
    return mutedRef.current ? null : audioCtx.current;
  }

  const gems = TOTAL - mines;
  const mult = calcMult(revealed, mines);
  const survival = calcSurvival(revealed, mines);
  const payout = +(bet * mult).toFixed(2);
  const profit = +(payout - bet).toFixed(2);

  function startGame() {
    const b = Math.max(0, parseFloat(betInput) || 0);
    if (b <= 0 || b > balance) return;
    setBet(b);
    const bd = genBoard(mines);
    boardData.current = bd;
    setBoard(Array(TOTAL).fill("hidden"));
    setRevealed(0);
    setGame("playing");
    setBalance(p => +(p - b).toFixed(2));
    playClickSound(getCtx());
  }

  function pickTile(idx) {
    if (game !== "playing") return;
    const type = boardData.current[idx];
    const nb = [...board];
    if (type === "mine") {
      boardData.current.forEach((t, i) => { if (t === "mine") nb[i] = "mine"; });
      setBoard(nb); setGame("lost");
      playBombSound(getCtx());
      setHistory(h => [{ r: "loss", amt: -bet, m: mult }, ...h.slice(0, 13)]);
    } else {
      nb[idx] = "gem";
      const nr = revealed + 1;
      setBoard(nb); setRevealed(nr);
      playDiamondSound(getCtx());
      const nm = calcMult(nr, mines);
      if (nr === gems) {
        const win = +(bet * nm).toFixed(2);
        setGame("won"); setBalance(p => +(p + win).toFixed(2));
        playCashoutSound(getCtx());
        setHistory(h => [{ r: "win", amt: +(win - bet).toFixed(2), m: nm }, ...h.slice(0, 13)]);
      }
    }
  }

  function pickRandom() {
    if (game !== "playing") return;
    const idxs = board.reduce((a, s, i) => s === "hidden" ? [...a, i] : a, []);
    if (!idxs.length) return;
    pickTile(idxs[Math.floor(Math.random() * idxs.length)]);
  }

  function cashOut() {
    if (game !== "playing" || revealed === 0) return;
    const win = payout;
    setBoard(b => b.map(s => s === "gem" ? "gem-safe" : s));
    setGame("won"); setBalance(p => +(p + win).toFixed(2));
    playCashoutSound(getCtx());
    setHistory(h => [{ r: "cashout", amt: profit, m: mult }, ...h.slice(0, 13)]);
  }

  function reset() {
    setBoard(Array(TOTAL).fill("hidden")); setRevealed(0); setGame("idle"); setBet(0);
  }

  const halfBet = () => setBetInput(v => Math.max(0, parseFloat(v) / 2).toFixed(2));
  const doubleBet = () => setBetInput(v => Math.min(balance, parseFloat(v) * 2).toFixed(2));
  const isIdle = game === "idle" || game === "won" || game === "lost";

  return (
    <div style={{ minHeight: "100vh", background: "#0e1425", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "'Rajdhani',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap');
        @keyframes gemPop { 0%{transform:scale(0.4) rotate(-15deg);opacity:0} 65%{transform:scale(1.25) rotate(6deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes mineExplode { 0%{transform:scale(0.2);opacity:0} 55%{transform:scale(1.4)} 100%{transform:scale(1)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 18%{transform:translateX(-10px)} 36%{transform:translateX(9px)} 54%{transform:translateX(-6px)} 72%{transform:translateX(5px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes numFlip { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        @keyframes winGlow { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0)} 50%{box-shadow:0 0 0 5px rgba(74,222,128,0.18)} }
        .hover-tile:hover { background:linear-gradient(145deg,#32407a,#252e58,#1c2445) !important; border-color:rgba(99,119,255,0.35) !important; transform:scale(1.04); transition:all 0.12s ease; }
        input[type=range]{-webkit-appearance:none;height:3px;border-radius:2px;background:rgba(255,255,255,0.1);outline:none;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#22c55e;cursor:pointer;box-shadow:0 0 6px rgba(34,197,94,0.5);}
        .num-in{background:transparent;color:white;outline:none;width:100%;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:15px;}
        .num-in::-webkit-inner-spin-button,.num-in::-webkit-outer-spin-button{-webkit-appearance:none;}
        .cashout-pulse{animation:winGlow 1.6s infinite;}
        .lost-shake{animation:shake 0.42s ease;}
        * { box-sizing:border-box; }
      `}</style>

      <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 860, alignItems: "flex-start" }}>

        {/* ── LEFT PANEL ── */}
        <div style={{ width: 210, minWidth: 200, display: "flex", flexDirection: "column", gap: 10 }}>

          {/* Tabs */}
          <div style={{ display: "flex", background: "#151d30", borderRadius: 12, padding: 4, gap: 4, border: "1px solid rgba(255,255,255,0.06)" }}>
            {["manual","auto"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer",
                background: tab === t ? "#1f2d4a" : "transparent",
                color: tab === t ? "#fff" : "rgba(255,255,255,0.32)",
                fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 13,
                letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s",
              }}>{t}</button>
            ))}
          </div>

          {/* Bet */}
          <div style={{ background: "#151d30", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Bet Amount</span>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700 }}>₹{balance.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#0d1220", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 8 }}>
              <input type="number" className="num-in" value={betInput}
                onChange={e => setBetInput(e.target.value)} disabled={game === "playing"} min={0} placeholder="0.00" />
              <div style={{ display: "flex", gap: 4 }}>
                {[["½", halfBet], ["2×", doubleBet]].map(([l, fn]) => (
                  <button key={l} onClick={fn} disabled={game === "playing"} style={{
                    background: "rgba(255,255,255,0.07)", border: "none", borderRadius: 6, color: "rgba(255,255,255,0.45)",
                    padding: "3px 8px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Rajdhani',sans-serif",
                  }}>{l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Mines / Gems */}
          <div style={{ background: "#151d30", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {[["Mines", mines, "#f87171"], ["Gems", gems, "#4ade80"]].map(([lbl, val, col]) => (
                <div key={lbl} style={{ flex: 1 }}>
                  <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 5 }}>{lbl}</div>
                  <div style={{ background: "#0d1220", borderRadius: 8, padding: "7px 10px", textAlign: "center", color: col, fontSize: 18, fontWeight: 700, border: "1px solid rgba(255,255,255,0.07)", fontFamily: "'Orbitron',monospace" }}>{val}</div>
                </div>
              ))}
            </div>
            <input type="range" min={1} max={24} value={mines} disabled={game === "playing"}
              onChange={e => setMines(+e.target.value)} style={{ width: "100%" }} />
          </div>

          {/* Profit */}
          <div style={{ background: "#151d30", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                Total profit ({mult.toFixed(2)}x)
              </span>
              <span style={{ color: profit >= 0 ? "#4ade80" : "#f87171", fontSize: 11, fontWeight: 700, animation: "numFlip 0.2s ease" }}>
                ₹{profit.toFixed(2)}
              </span>
            </div>
            <div style={{ background: "#0d1220", borderRadius: 8, padding: "7px 10px", fontFamily: "'Orbitron',monospace", fontSize: 15, fontWeight: 700, border: "1px solid rgba(255,255,255,0.07)", color: profit >= 0 ? "#4ade80" : "#f87171", animation: "numFlip 0.2s ease" }}>
              {profit.toFixed(2)}
            </div>
          </div>

          {/* Survival bar */}
          {game === "playing" && revealed > 0 && (
            <div style={{ background: "#151d30", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.06)", animation: "fadeUp 0.3s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Survival</span>
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Orbitron',monospace", color: survival > 0.6 ? "#4ade80" : survival > 0.35 ? "#fbbf24" : "#f87171" }}>
                  {(survival * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, width: `${survival * 100}%`, transition: "all 0.5s ease", background: survival > 0.6 ? "#22c55e" : survival > 0.35 ? "#f59e0b" : "#ef4444" }} />
              </div>
            </div>
          )}

          {/* Pick Random */}
          {game === "playing" && (
            <button onClick={pickRandom} style={{
              width: "100%", padding: "9px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", fontFamily: "'Rajdhani',sans-serif",
              fontWeight: 700, fontSize: 13, letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.15s",
            }}>
              Pick random tile
            </button>
          )}

          {/* Main CTA */}
          {isIdle ? (
            <button onClick={game === "idle" ? startGame : reset} style={{
              width: "100%", padding: "13px 0", borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              color: "white", fontFamily: "'Orbitron',monospace", fontWeight: 900,
              fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase",
              boxShadow: "0 4px 18px rgba(22,163,74,0.28), 0 1px 0 rgba(255,255,255,0.1) inset",
              transition: "all 0.18s",
            }}>
              {game === "idle" ? "▶  Bet" : game === "won" ? "▶  Play Again" : "▶  Try Again"}
            </button>
          ) : (
            <button onClick={cashOut} disabled={revealed === 0} className={revealed > 0 ? "cashout-pulse" : ""}
              style={{
                width: "100%", padding: "13px 0", borderRadius: 12, border: revealed > 0 ? "2px solid #16a34a" : "none",
                cursor: revealed === 0 ? "not-allowed" : "pointer", opacity: revealed === 0 ? 0.4 : 1,
                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                color: "white", fontFamily: "'Orbitron',monospace", fontWeight: 900,
                fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                boxShadow: "0 4px 18px rgba(22,163,74,0.3)",
              }}>
              Cashout  ₹{payout.toFixed(2)}
            </button>
          )}

          {/* Sound toggle */}
          <button onClick={() => setMuted(m => !m)} style={{
            width: "100%", padding: "7px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.28)", fontFamily: "'Rajdhani',sans-serif",
            fontWeight: 600, fontSize: 12, letterSpacing: "0.07em", cursor: "pointer",
          }}>
            {muted ? "🔇  Sound Off" : "🔊  Sound On"}
          </button>
        </div>

        {/* ── RIGHT: BOARD ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px" }}>
            <h1 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: 22, color: "white", letterSpacing: "0.15em", margin: 0 }}>
              MINES
            </h1>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {history.slice(0, 10).map((h, i) => (
                <div key={i} style={{
                  width: 24, height: 24, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
                  background: h.r === "loss" ? "rgba(239,68,68,0.15)" : "rgba(74,222,128,0.12)",
                  border: `1px solid ${h.r === "loss" ? "rgba(239,68,68,0.3)" : "rgba(74,222,128,0.3)"}`,
                  animation: `fadeUp 0.3s ease ${i * 0.04}s both`,
                }}>{h.r === "loss" ? "💣" : "💎"}</div>
              ))}
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "3px 10px", color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", fontFamily: "'Rajdhani',sans-serif" }}>
                RTP 92%
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className={game === "lost" ? "lost-shake" : ""}
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 7, padding: 4 }}>
            {Array(TOTAL).fill(null).map((_, i) => (
              <Tile key={i} idx={i} state={board[i]} onPick={pickTile} disabled={game !== "playing"} />
            ))}
          </div>

          {/* Result messages */}
          {game === "won" && (
            <div style={{ textAlign: "center", padding: "10px 16px", borderRadius: 12, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.22)", color: "#4ade80", fontFamily: "'Orbitron',monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", animation: "fadeUp 0.35s ease" }}>
              💎 CASHED OUT · ₹{payout.toFixed(2)} · {mult.toFixed(3)}×
            </div>
          )}
          {game === "lost" && (
            <div style={{ textAlign: "center", padding: "10px 16px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", color: "#f87171", fontFamily: "'Orbitron',monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
              💣 BOOM · -₹{bet.toFixed(2)} · {revealed} tile{revealed !== 1 ? "s" : ""} survived
            </div>
          )}

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
            {[
              { l: "Multiplier", v: `${mult.toFixed(3)}×`, c: "#a5b4fc" },
              { l: "Next Click", v: `${calcMult(revealed + 1, mines).toFixed(3)}×`, c: "rgba(255,255,255,0.35)" },
              { l: "Gems Left", v: `${Math.max(0, gems - revealed)}`, c: "#4ade80" },
              { l: "Mines", v: `${mines}`, c: "#f87171" },
            ].map(s => (
              <div key={s.l} style={{ background: "#151d30", borderRadius: 10, padding: "8px 10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 3 }}>{s.l}</div>
                <div style={{ color: s.c, fontFamily: "'Orbitron',monospace", fontSize: 12, fontWeight: 700, animation: "numFlip 0.2s ease" }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}