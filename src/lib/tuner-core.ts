import { STRINGS } from "./guitar-data";

/** Autocorrelation pitch detection. Returns Hz or 0 when no clear note. */
export function detectPitch(b: Float32Array, sr: number): number {
  const n = b.length;
  let e = 0;
  for (let i = 0; i < n; i++) e += b[i]! * b[i]!;
  if (Math.sqrt(e / n) < 0.008) return 0;
  const lo = Math.floor(sr / 400), hi = Math.min(Math.floor(sr / 70), n >> 1), c: number[] = [];
  let mx = 0;
  for (let l = lo; l <= hi; l++) {
    let s = 0;
    for (let j = 0; j < n - hi; j++) s += b[j]! * b[j + l]!;
    c[l] = s; if (s > mx) mx = s;
  }
  for (let l = lo + 1; l < hi; l++) {
    const y1 = c[l - 1]!, y2 = c[l]!, y3 = c[l + 1]!;
    if (y2 > 0.9 * mx && y2 >= y1 && y2 >= y3) {
      const a = y1 + y3 - 2 * y2;
      return sr / (l + (a ? (0.5 * (y1 - y3)) / a : 0));
    }
  }
  return 0;
}

export const centsOff = (hz: number, target: number) => 1200 * Math.log2(hz / target);

export function nearestString(hz: number) {
  let best = 0, bc = Infinity;
  STRINGS.forEach((s, i) => { const c = centsOff(hz, s.hz); if (Math.abs(c) < Math.abs(bc)) { bc = c; best = i; } });
  return { string: best, cents: bc };
}

export type Reading = { string: number; cents: number; hz: number; inTune: boolean };

/**
 * Smooths raw pitches so the display doesn't jump around:
 * median of recent frames, a string only changes after several agreeing frames,
 * slow easing of the needle, and the last reading is held briefly after the note fades.
 */
export class TunerStabilizer {
  private hist: number[] = [];
  private cur: Reading | null = null;
  private cand = -1; private candCount = 0;
  private lastHeard = 0;
  private okFrames = 0;
  constructor(private hold = 2000, private switchFrames = 4, private tol = 5) {}

  push(hz: number, now: number): Reading | null {
    if (!(hz > 65 && hz < 420)) {
      if (this.cur && now - this.lastHeard > this.hold) { this.cur = null; this.hist = []; }
      return this.cur;
    }
    this.lastHeard = now;
    this.hist.push(hz); if (this.hist.length > 7) this.hist.shift();
    const med = [...this.hist].sort((a, b) => a - b)[this.hist.length >> 1]!;
    const { string, cents } = nearestString(med);

    if (!this.cur || string !== this.cur.string) {
      if (string === this.cand) this.candCount++; else { this.cand = string; this.candCount = 1; }
      if (this.cur && this.candCount < this.switchFrames) return this.cur;
      this.cur = { string, cents, hz: med, inTune: false };
      this.okFrames = 0;
    } else {
      this.cur = { ...this.cur, hz: med, cents: this.cur.cents * 0.7 + cents * 0.3 };
    }
    // hysteresis so "in tune" doesn't flicker on and off
    const a = Math.abs(this.cur.cents);
    if (a < this.tol) this.okFrames++; else if (a > this.tol + 3) this.okFrames = 0;
    this.cur.inTune = this.okFrames >= 3 || (this.cur.inTune && a <= this.tol + 3);
    return this.cur;
  }
}
