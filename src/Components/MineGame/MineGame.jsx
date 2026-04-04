import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import axiosSecure from "../../lib/axiosSecure";

// ─── SOUND ENGINE ────────────────────────────────────────────────────────────
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

// ─── MATH ────────────────────────────────────────────────────────────────────
const HOUSE_EDGE = 0.08;
const TOTAL = 25;
const TIMER_DURATION = 10; // seconds

function calcMult(rev, bombs) {
  let m = 1; const gems = TOTAL - bombs;
  for (let i = 0; i < rev; i++) {
    const rem = TOTAL - i, sr = gems - i;
    if (sr <= 0 || rem <= 0) break;
    m *= (rem / sr) * (1 - HOUSE_EDGE);
  }
  return Math.max(1, m);
}

// ─── TIMER RING ───────────────────────────────────────────────────────────────
function TimerRing({ timeLeft, total = TIMER_DURATION }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const progress = timeLeft / total;
  const dashOffset = circ * (1 - progress);
  const isUrgent = timeLeft <= 3;
  const color = isUrgent ? "#ef4444" : timeLeft <= 6 ? "#f59e0b" : "#22c55e";

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <svg width={56} height={56} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={28} cy={28} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
        <circle
          cx={28} cy={28} r={r} fill="none"
          stroke={color} strokeWidth={4}
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s ease" }}
        />
        <text
          x={28} y={28}
          textAnchor="middle" dominantBaseline="central"
          fill={color}
          fontSize={isUrgent ? 15 : 13}
          fontWeight={700}
          fontFamily="'Orbitron',monospace"
          style={{ transform: "rotate(90deg)", transformOrigin: "28px 28px", transition: "font-size 0.15s" }}
        >
          {timeLeft}
        </text>
      </svg>
      <span style={{
        color: color,
        fontSize: 11,
        fontFamily: "'Rajdhani',sans-serif",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        animation: isUrgent ? "pulse 0.6s ease-in-out infinite alternate" : "none",
      }}>
        {isUrgent ? "Hurry!" : "Time left"}
      </span>
    </div>
  );
}

// ─── SVGS ────────────────────────────────────────────────────────────────────
function GemSVG({ size = 32, glow, pop }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      style={{
        filter: glow ? "drop-shadow(0 0 8px #4ade80) drop-shadow(0 0 16px #22c55e)" : "none",
        animation: pop ? "gemPop 0.45s cubic-bezier(.36,1.4,.64,1) both" : "none",
        display: "block",
      }}>
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
      style={{
        filter: explode ? "drop-shadow(0 0 10px #ef4444) drop-shadow(0 0 20px #dc2626)" : "none",
        animation: explode ? "mineExplode 0.4s ease" : "none",
        display: "block",
      }}>
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <line key={i} x1="24" y1="24"
          x2={24 + Math.cos(deg * Math.PI / 180) * 19}
          y2={24 + Math.sin(deg * Math.PI / 180) * 19}
          stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
      ))}
      <circle cx="24" cy="24" r="12" fill="#1a1a2e" stroke="#ef4444" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="8.5" fill={explode ? "#ef4444" : "#2d2d4e"}/>
      <circle cx="20" cy="20" r="2" fill="#6b7280" opacity="0.5"/>
      {explode && <circle cx="24" cy="24" r="15" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>}
    </svg>
  );
}

// ─── TILE ─────────────────────────────────────────────────────────────────────
function Tile({ idx, state, onPick, disabled, iconSize }) {
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
  const clickable = !disabled && state === "hidden";

  return (
    <div
      onClick={() => clickable && onPick(idx)}
      style={{ perspective: "700px", cursor: clickable ? "pointer" : "default", userSelect: "none" }}
    >
      <div style={{
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.32s cubic-bezier(.4,0,.2,1)",
        position: "relative", width: "100%", paddingBottom: "100%",
      }}>
        {/* FRONT */}
        <div style={{
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          position: "absolute", inset: 0, borderRadius: 10,
          background: "linear-gradient(145deg, #2a3352 0%, #1c2440 60%, #161d35 100%)",
          border: "1px solid rgba(255,255,255,0.055)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: Math.max(5, iconSize * 0.25), height: Math.max(5, iconSize * 0.25), borderRadius: "50%", background: "rgba(255,255,255,0.06)" }}/>
        </div>
        {/* BACK */}
        <div style={{
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          position: "absolute", inset: 0, transform: "rotateY(180deg)", borderRadius: 10,
          background: isGem
            ? "linear-gradient(145deg, #0f2e1f, #071a12)"
            : isMine ? "linear-gradient(145deg, #2a0f0f, #140707)"
            : "linear-gradient(145deg, #141a2b, #0c101a)",
          border: isGem
            ? "1px solid rgba(212,175,55,0.45)"
            : isMine ? "1px solid rgba(180,50,50,0.45)"
            : "1px solid rgba(212,175,55,0.12)",
          boxShadow: isGem
            ? "0 0 22px rgba(212,175,55,0.25), inset 0 0 10px rgba(34,197,94,0.15)"
            : isMine ? "0 0 18px rgba(220,38,38,0.25), inset 0 0 8px rgba(0,0,0,0.6)"
            : "inset 0 0 8px rgba(212,175,55,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {isGem && <GemSVG size={iconSize} glow pop={fresh} />}
          {isMine && <MineSVG size={Math.round(iconSize * 0.88)} explode={fresh} />}
        </div>
      </div>
    </div>
  );
}

// ─── WINDOW WIDTH HOOK ────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 400);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    fn();
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

// ─── STYLE CONSTANTS ──────────────────────────────────────────────────────────
const S = {
  card: {
    background: "#151d30",
    borderRadius: 12,
    padding: "12px 14px",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  label: {
    color: "rgba(255,255,255,0.38)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 700,
  },
  orb: { fontFamily: "'Orbitron',monospace" },
  raj: { fontFamily: "'Rajdhani',sans-serif" },
};

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function MineGame() {
  const winW = useWindowWidth();
  const isMobile = winW < 600;

  const [balance, setBalance] = useState(1000);
  const [betInput, setBetInput] = useState("0.00");
  const [bet, setBet] = useState(0);
  const [mines, setMines] = useState(7);
  const [board, setBoard] = useState(Array(TOTAL).fill("hidden"));
  const [game, setGame] = useState("idle");
  const [revealed, setRevealed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ─── Timer state ──────────────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  // ─── Backend state ────────────────────────────────────────────────────────
  const [gameId, setGameId] = useState(null);
  const [serverMult, setServerMult] = useState(1);
  const [serverPayout, setServerPayout] = useState(0);
  const [serverMines, setServerMines] = useState(7);
  const [serverGems, setServerGems] = useState(18);

  const audioCtx = useRef(null);
  const mutedRef = useRef(false);
  // Keep a ref to revealed so the timer callback can read current value
  const revealedRef = useRef(0);
  const payoutRef = useRef(0);
  const gameRef = useRef("idle");

  useEffect(() => { mutedRef.current = muted; }, [muted]);
  useEffect(() => { revealedRef.current = revealed; }, [revealed]);
  useEffect(() => { gameRef.current = game; }, [game]);

  function getCtx() {
    if (!audioCtx.current) audioCtx.current = createAudioCtx();
    if (audioCtx.current?.state === "suspended") audioCtx.current.resume();
    return mutedRef.current ? null : audioCtx.current;
  }

  function playTickSound(ctx) {
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator(), g = ctx.createGain();
  osc.connect(g); g.connect(ctx.destination);
  osc.type = "sine"; osc.frequency.value = 660;
  g.gain.setValueAtTime(0.09, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  osc.start(t); osc.stop(t + 0.08);
}

function playUrgentTickSound(ctx) {
  if (!ctx) return;
  const t = ctx.currentTime;
  // Sharp high beep
  const osc = ctx.createOscillator(), g = ctx.createGain();
  osc.connect(g); g.connect(ctx.destination);
  osc.type = "square"; osc.frequency.value = 880;
  g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  osc.start(t); osc.stop(t + 0.1);
  // Low thud underneath
  const osc2 = ctx.createOscillator(), g2 = ctx.createGain();
  osc2.connect(g2); g2.connect(ctx.destination);
  osc2.type = "sine"; osc2.frequency.setValueAtTime(180, t);
  osc2.frequency.exponentialRampToValueAtTime(80, t + 0.12);
  g2.gain.setValueAtTime(0.18, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  osc2.start(t); osc2.stop(t + 0.12);
}

  // ─── TIMER EFFECT ─────────────────────────────────────────────────────────
 useEffect(() => {
  if (game !== "playing") return;
  setTimeLeft(TIMER_DURATION);

  const interval = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        if (revealedRef.current > 0) {
          setBoard(b => b.map(s => s === "gem" ? "gem-safe" : s));
          setGame("won");
          setBalance(p => +(p + payoutRef.current).toFixed(2));
          playCashoutSound(mutedRef.current ? null : audioCtx.current);
        } else {
          setGame("lost");
          playBombSound(mutedRef.current ? null : audioCtx.current);
        }
        return 0;
      }

      // 🔔 Play tick sound on every countdown step
      const ctx = mutedRef.current ? null : audioCtx.current;
      if (prev <= 4) {
        // Final 3 seconds — urgent double-beep
        playUrgentTickSound(ctx);
      } else {
        // Normal tick
        playTickSound(ctx);
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [game]);

  // Keep payoutRef in sync so timer can access it
  const activeMines = game === "idle" ? mines : serverMines;
  const activeGems = game === "idle" ? TOTAL - mines : serverGems;
  const mult = game === "playing" || game === "won" ? serverMult : calcMult(revealed, mines);
  const payout = game === "playing" || game === "won" ? serverPayout : +(bet * mult).toFixed(2);
  const profit = +(payout - bet).toFixed(2);

  useEffect(() => { payoutRef.current = payout; }, [payout]);

  // ── Icon size calculation ──
  const outerPad = isMobile ? 10 : 16;
  const wrapperW = Math.min(winW, 860);
  const availW = wrapperW - outerPad * 2;
  const gridW = isMobile ? availW : availW - 210 - 12;
  const tileGap = Math.max(4, Math.min(7, Math.round(gridW * 0.018)));
  const tileW = Math.floor((gridW - tileGap * 4) / 5);
  const iconSize = Math.max(10, Math.round(tileW * 0.40));

  // ─── START GAME (API) ─────────────────────────────────────────────────────
  async function startGame() {
    const b = Math.max(0, parseFloat(betInput) || 0);
    if (b <= 0) return toast.error("Enter a valid bet amount.");
    if (b > balance) return toast.error("Insufficient balance.");

    setLoading(true);
    try {
      const res = await axiosSecure.post("/mine/start", {
        gemCount: TOTAL - mines,
        bombCount: mines,
        betAmount: b,
      });

      if (res.data?.success) {
        const d = res.data.data;
        setGameId(d.gameId);
        setBet(d.bet);
        setServerMult(d.multiplier);
        setServerPayout(d.currentPayout);
        setServerMines(d.mines);
        setServerGems(d.gems);
        setBoard(d.board);
        setRevealed(d.revealed);
        setGame("playing"); // ← triggers timer reset via useEffect
        setBalance(p => +(p - d.bet).toFixed(2));
        playClickSound(getCtx());
      } else {
        toast.error(res.data?.message || "Failed to start game.");
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.error || err?.response?.data?.message || "Server error. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  // ─── REVEAL TILE (API) ────────────────────────────────────────────────────
  async function pickTile(idx) {
    if (game !== "playing" || loading) return;

    setLoading(true);
    try {
      const res = await axiosSecure.post("/mine/reveal", {
        gameId,
        tileIndex: idx,
      });

      if (res.data?.success) {
        const d = res.data.data;
        setServerMult(d.multiplier);
        setServerPayout(d.currentPayout);
        setRevealed(d.revealed);

        const nb = [...board];

        if (d.result === "lost") {
          if (d.board) {
            d.board.forEach((cell, i) => { nb[i] = cell; });
          } else {
            nb[idx] = "mine";
          }
          setBoard(nb);
          setGame("lost");
          playBombSound(getCtx());

        } else if (d.result === "won") {
          nb[idx] = "gem";
          setBoard(nb);
          setGame("won");
          setBalance(p => +(p + d.currentPayout).toFixed(2));
          playCashoutSound(getCtx());

        } else {
          nb[idx] = "gem";
          setBoard(nb);
          // Reset timer on each successful reveal
          // setTimeLeft(TIMER_DURATION);
          playDiamondSound(getCtx());
        }
      } else {
        toast.error(res.data?.message || "Failed to reveal tile.");
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.error || err?.response?.data?.message || "Server error. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  // ─── PICK RANDOM ─────────────────────────────────────────────────────────
  function pickRandom() {
    if (game !== "playing" || loading) return;
    const idxs = board.reduce((a, s, i) => s === "hidden" ? [...a, i] : a, []);
    if (!idxs.length) return;
    pickTile(idxs[Math.floor(Math.random() * idxs.length)]);
  }

  // ─── CASH OUT ─────────────────────────────────────────────────────────────
  function cashOut() {
    if (game !== "playing" || revealed === 0 || loading) return;
    setBoard(b => b.map(s => s === "gem" ? "gem-safe" : s));
    setGame("won");
    setBalance(p => +(p + payout).toFixed(2));
    playCashoutSound(getCtx());
  }

  function reset() {
    setBoard(Array(TOTAL).fill("hidden"));
    setRevealed(0);
    setGame("idle");
    setBet(0);
    setGameId(null);
    setServerMult(1);
    setServerPayout(0);
    setTimeLeft(TIMER_DURATION);
  }

  const halfBet = () => setBetInput(v => Math.max(0, parseFloat(v) / 2).toFixed(2));
  const doubleBet = () => setBetInput(v => Math.min(balance, parseFloat(v) * 2).toFixed(2));
  const isIdle = game === "idle" || game === "won" || game === "lost";

  // ── Reusable sub-components ──────────────────────────────────────────────

  const BetCard = (
    <div style={S.card}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={S.label}>Bet Amount</span>
        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700 }}>£{balance.toFixed(2)}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#0d1220", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.07)" }}>
        <input
          type="number"
          value={betInput}
          onChange={e => setBetInput(e.target.value)}
          disabled={game === "playing"}
          min={0}
          placeholder="0.00"
          style={{ background: "transparent", color: "white", outline: "none", border: "none", width: "100%", ...S.raj, fontWeight: 700, fontSize: 15 }}
        />
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          {[["½", halfBet], ["2×", doubleBet]].map(([l, fn]) => (
            <button key={l} onClick={fn} disabled={game === "playing"} style={{
              background: "rgba(255,255,255,0.07)", border: "none", borderRadius: 6,
              color: "rgba(255,255,255,0.45)", padding: "3px 8px", fontSize: 12,
              fontWeight: 700, cursor: "pointer", ...S.raj,
            }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );

  const MinesGemsCard = (
    <div style={S.card}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {[["Mines", activeMines], ["Gems", activeGems]].map(([lbl, val]) => (
          <div key={lbl} style={{ flex: 1 }}>
            <div style={{ ...S.label, marginBottom: 5 }}>{lbl}</div>
            <div style={{ background: "#0d1220", borderRadius: 8, padding: "6px 8px", textAlign: "center", color: "#F5D334", fontSize: isMobile ? 15 : 18, fontWeight: 700, border: "1px solid rgba(255,255,255,0.07)", ...S.orb }}>{val}</div>
          </div>
        ))}
      </div>
      <input type="range" min={1} max={24} value={mines} disabled={game === "playing"}
        onChange={e => setMines(+e.target.value)} style={{ width: "100%" }} />
    </div>
  );

  const ProfitCard = (
    <div style={S.card}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 2 }}>
        <span style={S.label}>Profit ({mult.toFixed(2)}x)</span>
        <span style={{ color: "#F5D334", fontSize: 11, fontWeight: 700 }}>£{profit.toFixed(2)}</span>
      </div>
      <div style={{ background: "rgba(245,211,52,0.06)", border: "1px solid rgba(245,211,52,0.25)", borderRadius: 8, padding: "7px 10px", ...S.orb, fontSize: 15, fontWeight: 700, color: "#F5D334" }}>
        {profit.toFixed(2)}
      </div>
    </div>
  );

  // ─── TIMER CARD ───────────────────────────────────────────────────────────
  const TimerCard = game === "playing" ? (
    <div style={{
      ...S.card,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 14px",
      border: timeLeft <= 3
        ? "1px solid rgba(239,68,68,0.45)"
        : timeLeft <= 6
          ? "1px solid rgba(245,158,11,0.35)"
          : "1px solid rgba(34,197,94,0.25)",
      background: timeLeft <= 3
        ? "rgba(239,68,68,0.06)"
        : "#151d30",
      transition: "border-color 0.3s, background 0.3s",
    }}>
      <div>
        <div style={{ ...S.label, marginBottom: 3 }}>Auto {revealed > 0 ? "cashout" : "end"} in</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, ...S.raj }}>
          {revealed > 0 ? "Will cashout your gems" : "No gems — round ends"}
        </div>
      </div>
      <TimerRing timeLeft={timeLeft} total={TIMER_DURATION} />
    </div>
  ) : null;

  const ActionButtons = (
    <>
      {game === "playing" && (
        <button onClick={pickRandom} disabled={loading} style={{ width: "100%", padding: "9px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.05)", color: loading ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.6)", ...S.raj, fontWeight: 700, fontSize: 13, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Loading..." : "Pick random tile"}
        </button>
      )}
      {isIdle ? (
        <button onClick={game === "idle" ? startGame : reset} disabled={loading} style={{ width: "100%", padding: "13px 0", borderRadius: 12, border: "none", background: loading ? "rgba(199,136,0,0.5)" : "linear-gradient(90deg,#C78800,#F5D334)", color: "black", ...S.orb, fontWeight: 900, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", boxShadow: "0 4px 18px rgba(199,136,0,0.35)", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Starting..." : game === "idle" ? "▶  Bet" : game === "won" ? "▶  Play Again" : "▶  Try Again"}
        </button>
      ) : (
        <button onClick={cashOut} disabled={revealed === 0 || loading} style={{ width: "100%", padding: "13px 0", borderRadius: 12, border: revealed > 0 && !loading ? "2px solid #F5D334" : "1px solid rgba(255,255,255,0.08)", background: revealed > 0 && !loading ? "linear-gradient(90deg,#C78800,#F5D334)" : "rgba(255,255,255,0.03)", color: revealed > 0 && !loading ? "black" : "rgba(255,255,255,0.25)", ...S.orb, fontWeight: 900, fontSize: 12, letterSpacing: "0.1em", cursor: revealed > 0 && !loading ? "pointer" : "default" }}>
          {loading ? "Processing..." : `Cashout £${payout.toFixed(2)}`}
        </button>
      )}
      <button onClick={() => setMuted(m => !m)} style={{ width: "100%", padding: "7px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.28)", cursor: "pointer", ...S.raj, fontWeight: 600, fontSize: 13 }}>
        {muted ? "🔇  Sound Off" : "🔊  Sound On"}
      </button>
    </>
  );

  const TileGrid = (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: tileGap, width: "100%", opacity: loading ? 0.7 : 1, pointerEvents: loading ? "none" : "auto", transition: "opacity 0.2s" }}>
      {Array(TOTAL).fill(null).map((_, i) => (
        <Tile key={i} idx={i} state={board[i]} onPick={pickTile} disabled={game !== "playing" || loading} iconSize={iconSize} />
      ))}
    </div>
  );

  const Banner = game === "won" ? (
    <div style={{ textAlign: "center", padding: "10px 16px", borderRadius: 12, background: "rgba(245,211,52,0.08)", border: "1px solid rgba(245,211,52,0.25)", color: "#F5D334", fontSize: isMobile ? 12 : 14, ...S.raj, fontWeight: 600 }}>
      💎 CASHED OUT · £{payout.toFixed(2)} · {mult.toFixed(3)}×
    </div>
  ) : game === "lost" ? (
    <div style={{ textAlign: "center", padding: "10px 16px", borderRadius: 12, background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.3)", color: "#f87171", fontSize: isMobile ? 12 : 14, ...S.raj, fontWeight: 600 }}>
      💣 BOOM · -£{bet.toFixed(2)}
    </div>
  ) : null;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: isMobile ? "flex-start" : "center",
      justifyContent: "center",
      padding: isMobile ? "10px" : "16px",
      background: "#080c14",
      ...S.raj,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap');
        @keyframes gemPop { 0%{transform:scale(0.4) rotate(-15deg);opacity:0} 65%{transform:scale(1.25) rotate(6deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes mineExplode { 0%{transform:scale(0.2);opacity:0} 55%{transform:scale(1.4)} 100%{transform:scale(1)} }
        @keyframes pulse { from{opacity:1} to{opacity:0.5} }
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}
        input[type=range]{-webkit-appearance:none;height:3px;border-radius:2px;background:rgba(255,255,255,0.1);outline:none;width:100%;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#22c55e;cursor:pointer;box-shadow:0 0 6px rgba(34,197,94,0.5);}
      `}</style>

      <div style={{
        width: "100%",
        maxWidth: 860,
        background: "#0e1425",
        borderRadius: isMobile ? 14 : 18,
        padding: isMobile ? 10 : 16,
      }}>

        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h1 style={{ ...S.orb, fontWeight: 900, fontSize: 18, color: "#F5D334", letterSpacing: "0.15em", margin: 0 }}>MINES</h1>
            {TileGrid}
            {Banner}
            {TimerCard}
            {BetCard}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {MinesGemsCard}
              {ProfitCard}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ActionButtons}
            </div>
          </div>

        ) : (
          <div style={{ display: "flex", flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
            {/* Left */}
            <div style={{ width: 210, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {BetCard}
              {MinesGemsCard}
              {ProfitCard}
              {TimerCard}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ActionButtons}
              </div>
            </div>

            {/* Right */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <h1 style={{ ...S.orb, fontWeight: 900, fontSize: 22, color: "#F5D334", letterSpacing: "0.15em", margin: 0 }}>MINES</h1>
              {TileGrid}
              {Banner}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}