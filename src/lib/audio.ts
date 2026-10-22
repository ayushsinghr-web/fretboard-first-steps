import { CHORDS, STRINGS } from "./guitar-data";

let ctx: AudioContext | null = null;
const cache: Record<number, AudioBuffer> = {};

function ac() {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  void ctx.resume();
  return ctx;
}

function buf(c: AudioContext, f: number) {
  if (cache[f]) return cache[f];
  const sr = c.sampleRate, n = (sr * 2) | 0, b = c.createBuffer(1, n, sr), d = b.getChannelData(0), p = Math.round(sr / f);
  for (let i = 0; i < p; i++) d[i] = Math.random() * 2 - 1;
  for (let i = p; i < n; i++) d[i] = 0.4985 * (d[i - p]! + d[i - p + 1]!);
  return (cache[f] = b);
}

export function pluck(f: number, delay = 0, vol = 0.2, dur = 2.4) {
  const c = ac(), at = c.currentTime + delay, s = c.createBufferSource(), g = c.createGain();
  s.buffer = buf(c, f);
  g.gain.setValueAtTime(vol, at);
  g.gain.exponentialRampToValueAtTime(0.001, at + dur);
  s.connect(g).connect(c.destination);
  s.start(at); s.stop(at + dur);
}

export function strumChord(name: string, dir: "D" | "U" | "x" = "D") {
  const ch = CHORDS[name] ?? CHORDS["Em"]!;
  let l = [0, 1, 2, 3, 4, 5].filter((i) => ch.f[i] >= 0);
  if (dir === "U") l = l.reverse().slice(0, 4);
  l.forEach((s, k) => pluck(STRINGS[s]!.hz * 2 ** (ch.f[s]! / 12), k * 0.012, dir === "U" ? 0.1 : 0.15, dir === "x" ? 0.07 : 1.3));
}
