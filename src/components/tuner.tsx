import { useEffect, useRef, useState } from "react";
import { STRINGS } from "@/lib/guitar-data";
import { pluck } from "@/lib/audio";
import { Headstock, type TuneState } from "@/components/guitar";
import { detectPitch, TunerStabilizer, type Reading } from "@/lib/tuner-core";

export function Tuner() {
  const [on, setOn] = useState(false);
  const [err, setErr] = useState("");
  const [r, setR] = useState<Reading | null>(null);
  const stop = useRef<() => void>(() => {});

  useEffect(() => () => stop.current(), []);

  const start = async () => {
    if (on) { stop.current(); return; }
    setErr("");
    if (!navigator.mediaDevices?.getUserMedia) { setErr("This browser can't use the microphone. Try Chrome, Safari or Edge."); return; }
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    } catch {
      setErr(window.self !== window.top
        ? "The microphone is blocked inside this preview window. Open the site in its own browser tab and allow the microphone."
        : "Microphone access was blocked. Click the lock icon in the address bar, allow the microphone, then try again.");
      return;
    }
    const ctx = new AudioContext();
    await ctx.resume();
    const an = ctx.createAnalyser(); an.fftSize = 4096;
    ctx.createMediaStreamSource(stream).connect(an);
    const buf = new Float32Array(an.fftSize);
    const st = new TunerStabilizer();
    let raf = 0, last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 50) return; last = t;
      an.getFloatTimeDomainData(buf);
      setR(st.push(detectPitch(buf, ctx.sampleRate), t));
    };
    raf = requestAnimationFrame(loop);
    stop.current = () => { cancelAnimationFrame(raf); stream.getTracks().forEach((x) => x.stop()); void ctx.close(); setOn(false); setR(null); stop.current = () => {}; };
    setOn(true);
  };

  const s = r ? STRINGS[r.string]! : null;
  const state: TuneState = !r ? "idle" : r.inTune ? "ok" : r.cents < 0 ? "low" : "high";
  const msg = !on ? "Press Start tuner, then pluck any string. It finds the string by itself."
    : !r ? "Listening… pluck one string and let it ring."
    : state === "ok" ? `${s!.name} string is in tune. Move on to the next string.`
    : state === "low" ? `Too low. Tighten the ${s!.name} string (turn the peg slowly).`
    : `Too high. Loosen the ${s!.name} string a little, then tune up to the note.`;
  const needle = r ? Math.max(-50, Math.min(50, r.cents)) : 0;

  return (
    <section id="tuner" className="wrap">
      <div className="pn">
        <h2>Tune your guitar</h2>
        <p style={{ color: "var(--mu)", margin: "-8px 0 10px", maxWidth: "60ch" }}>
          Hold your guitar facing you. The tuner detects which string you play, lights up its peg and tells you which way to turn it. You can also tap a letter to hear the note.
        </p>
        <div className="tune-grid">
          <Headstock active={r ? r.string : -1} state={state} />
          <div className={`tn tn-live ${state}`}>
            <div className="rd"><b>{s ? s.name : "–"}</b><span>{r ? `${r.hz.toFixed(1)} Hz · ${r.cents > 0 ? "+" : ""}${Math.round(r.cents)} cents` : s ? "" : "Waiting for a string"}</span></div>
            <div className="mt"><i style={{ left: `${50 + needle}%` }} /></div>
            <div className="ms"><span>Flat</span><span>Standard: E A D G B e</span><span>Sharp</span></div>
            <p className="tune-msg" aria-live="polite">{state === "low" && "↑ "}{state === "high" && "↓ "}{msg}</p>
            {err && <p className="tune-err">{err}</p>}
            <button className="btn as-btn" onClick={start}>{on ? "Stop tuner" : "Start tuner"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { pluck };
