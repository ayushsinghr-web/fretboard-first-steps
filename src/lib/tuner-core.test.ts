import { describe, it, expect } from "vitest";
import { nearestString, TunerStabilizer, detectPitch } from "./tuner-core";

describe("tuner", () => {
  it("auto-detects the A string from a slightly flat note", () => {
    const r = nearestString(107);
    expect(r.string).toBe(1);
    expect(r.cents).toBeLessThan(0); // flat -> tighten
  });

  it("detects a sharp high e", () => {
    const r = nearestString(335);
    expect(r.string).toBe(5);
    expect(r.cents).toBeGreaterThan(0); // sharp -> loosen
  });

  it("ignores a single stray reading instead of jumping strings", () => {
    const st = new TunerStabilizer();
    let t = 0;
    for (let i = 0; i < 6; i++) st.push(110, (t += 50));
    const r = st.push(196, (t += 50));
    expect(r?.string).toBe(1);
  });

  it("holds the last reading briefly when the note fades", () => {
    const st = new TunerStabilizer();
    st.push(110, 0);
    expect(st.push(0, 1000)?.string).toBe(1);
    expect(st.push(0, 3000)).toBeNull();
  });

  it("finds the pitch of a pure 196 Hz tone", () => {
    const sr = 44100, b = new Float32Array(4096);
    for (let i = 0; i < b.length; i++) b[i] = 0.5 * Math.sin((2 * Math.PI * 196 * i) / sr);
    expect(Math.abs(detectPitch(b, sr) - 196)).toBeLessThan(2);
  });
});
