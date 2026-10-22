import { createFileRoute } from "@tanstack/react-router";
import { PATTERNS } from "@/lib/guitar-data";
import { StrumPattern } from "@/components/guitar";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/strumming")({
  head: () => seo("Guitar strumming patterns for beginners | Guitar Excellence Hub", "Eight easy guitar strumming patterns, from simple down strums to folk, rock and reggae grooves. Press play to hear each one."),
  component: () => (
    <main className="wrap page">
      <h1 className="page-h">Strumming patterns</h1>
      <p className="lede">Work down the list in order. Press play to hear a pattern and watch each strum light up.</p>
      <div className="key" style={{ marginBottom: 20 }}><span>Down strum</span><span>Up strum</span><span>Muted slap</span><span>Dot: rest</span></div>
      {PATTERNS.map((p) => <StrumPattern key={p.id} pattern={p} chord={["G", "C", "Em", "Am", "D", "A", "G", "Em"][PATTERNS.indexOf(p)] ?? "G"} />)}
    </main>
  ),
});
