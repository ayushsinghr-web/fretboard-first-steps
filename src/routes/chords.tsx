import { createFileRoute } from "@tanstack/react-router";
import { CHORD_GROUPS } from "@/lib/guitar-data";
import { ChordDiagram } from "@/components/guitar";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/chords")({
  head: () => seo("Guitar chord chart for beginners with sound | Guitar Excellence Hub", "Interactive chord diagrams for Em, Am, C, G, D, E, A, Dm, sevenths and first barre chords. Tap to hear each chord."),
  component: () => (
    <main className="wrap page">
      <h1 className="page-h">Chord library</h1>
      <p className="lede">Numbers show which finger to use (1 index, 2 middle, 3 ring, 4 pinky). O means play the string open, X means don’t play it.</p>
      {CHORD_GROUPS.map((g) => (
        <div className="pn" key={g.title}>
          <h2>{g.title}</h2>
          <div className="chordlib">{g.chords.map((c) => <ChordDiagram key={c} name={c} />)}</div>
        </div>
      ))}
    </main>
  ),
});
