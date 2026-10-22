import { useEffect, useRef, useState } from "react";
import { CHORDS, STRINGS, type Pattern } from "@/lib/guitar-data";
import { pluck, strumChord } from "@/lib/audio";

export function ChordDiagram({ name, label }: { name: string; label?: string }) {
  const c = CHORDS[name];
  const [cur, setCur] = useState(false);
  if (!c) return null;
  return (
    <div className={`chord${cur ? " cur" : ""}`}>
      {label && <em>{label}</em>}
      <h3>{c.name}</h3>
      <small>{c.full}</small>
      <svg className="dia" viewBox="0 0 120 164" role="img" aria-label={`${c.full} chord diagram`}>
        <rect className="nut" x="15" y="33" width="90" height="4" rx="2" />
        {c.f.map((f, i) => {
          const x = 15 + i * 18, y = 37 + (f - 0.5) * 24;
          return (
            <g key={i}>
              <line x1={x} x2={x} y1="37" y2="157" />
              {f < 0 ? <path className="mk" d={`M${x - 5} 17l10 10m0-10l-10 10`} />
                : f === 0 ? <circle className="mk" cx={x} cy="22" r="5" />
                : <g className="dot" style={{ ["--d" as string]: `${i * 70}ms` }}><circle cx={x} cy={y} r="9" /><text x={x} y={y + 4}>{c.g[i]}</text></g>}
            </g>
          );
        })}
        {[1, 2, 3, 4, 5].map((j) => <line key={j} className="fr" x1="15" x2="105" y1={37 + j * 24} y2={37 + j * 24} />)}
      </svg>
      <button className="pl" onClick={() => { strumChord(name); setCur(true); setTimeout(() => setCur(false), 900); }}>Hear it</button>
    </div>
  );
}

const AR: Record<string, string> = { D: "M12 5v34M4 29l8 11 8-11", U: "M12 43V9M4 19l8-11 8 11", x: "M5 17l14 14M19 17L5 31", ".": "M12 24h.01" };

export function StrumPattern({ pattern, chord = "G" }: { pattern: Pattern; chord?: string }) {
  const [on, setOn] = useState(-1);
  const tm = useRef<number | null>(null);
  const stop = () => { if (tm.current) clearInterval(tm.current); tm.current = null; setOn(-1); };
  useEffect(() => stop, []);
  const play = () => {
    if (tm.current) return stop();
    let s = 0;
    const tick = () => {
      const ch = pattern.p[s];
      if (ch !== ".") strumChord(chord, ch as "D" | "U" | "x");
      setOn(s); s = (s + 1) % 8;
    };
    tick();
    tm.current = window.setInterval(tick, 30000 / pattern.bpm);
  };
  return (
    <div className="pat">
      <header><div><h3>{pattern.name}</h3><span>{pattern.level} · {pattern.bpm} BPM · on {chord}</span></div>
        <button className="ghost" onClick={play}>{on >= 0 ? "Stop" : "Play pattern"}</button></header>
      <div className="strum">
        {[...pattern.p].map((c, i) => (
          <div key={i} className={`slot ${c === "." ? "r" : c}${on === i ? " on" : ""}`}>
            <svg viewBox="0 0 24 48"><path d={AR[c]} /></svg><b>{"1&2&3&4&"[i]}</b>
          </div>
        ))}
      </div>
      <p>{pattern.desc}</p>
    </div>
  );
}

export type TuneState = "idle" | "low" | "high" | "ok";

/** Headstock view (3+3 layout). Tap a letter to hear its note; the tuner can highlight a string. */
export function Headstock({ active = -1, state = "idle" }: { active?: number; state?: TuneState } = {}) {
  const [tap, setTap] = useState(-1);
  const on = active >= 0 ? active : tap;
  const cls = active >= 0 ? ` t-${state}` : "";
  const hit = (i: number) => { pluck(STRINGS[i]!.hz); setTap(i); setTimeout(() => setTap((v) => (v === i ? -1 : v)), 1600); };
  const left = [2, 1, 0], right = [3, 4, 5];
  const pegY = [70, 130, 190];
  const strX = [68, 79, 90, 110, 121, 132];
  const postL = [72, 82, 92], postR = [128, 118, 108];
  const Btn = ({ i }: { i: number }) => (
    <button className={`hs-b${on === i ? " on" + cls : ""}`} onClick={() => hit(i)} aria-label={`Play ${STRINGS[i]!.label} string, ${STRINGS[i]!.name}`}>
      <span><b>{STRINGS[i]!.name}</b><br /><small>{on === i && state === "low" && active >= 0 ? "tighten" : on === i && state === "high" && active >= 0 ? "loosen" : on === i && state === "ok" && active >= 0 ? "in tune" : STRINGS[i]!.label}</small></span>
    </button>
  );
  return (
    <div>
      <div className="hs">
        <div className="hs-col l">{left.map((i) => <Btn key={i} i={i} />)}</div>
        <svg viewBox="0 0 200 300" aria-hidden="true">
          <path className="wood" d="M40 30 Q100 5 160 30 L165 225 Q150 240 140 260 L140 300 L60 300 L60 260 Q50 240 35 225 Z" />
          {left.map((s, k) => <g key={s}><rect className={`peg${on === s ? " on" + cls : ""}`} x="6" y={pegY[k]! - 12} width="30" height="24" rx="10" /><circle className="post" cx={postL[k]!} cy={pegY[k]!} r="7" /></g>)}
          {right.map((s, k) => <g key={s}><rect className={`peg${on === s ? " on" + cls : ""}`} x="164" y={pegY[k]! - 12} width="30" height="24" rx="10" /><circle className="post" cx={postR[k]!} cy={pegY[k]!} r="7" /></g>)}
          {left.map((s, k) => <line key={s} className={`str${on === s ? " on" + cls : ""}`} x1={postL[k]!} y1={pegY[k]!} x2={strX[s]!} y2="300" />)}
          {right.map((s, k) => <line key={s} className={`str${on === s ? " on" + cls : ""}`} x1={postR[k]!} y1={pegY[k]!} x2={strX[s]!} y2="300" />)}
        </svg>
        <div className="hs-col r">{right.map((i) => <Btn key={i} i={i} />)}</div>
      </div>
      <p className="hs-legend">Tap a letter to hear the note, then turn that peg until your string matches.</p>
    </div>
  );
}
