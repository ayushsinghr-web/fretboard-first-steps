import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SONGS, PATTERNS } from "@/lib/guitar-data";
import { ChordDiagram, StrumPattern } from "@/components/guitar";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/songs/$slug")({
  loader: ({ params }) => {
    const song = SONGS.find((s) => s.slug === params.slug);
    if (!song) throw notFound();
    return song;
  },
  head: ({ loaderData: s }) =>
    s ? seo(`How to play ${s.title} by ${s.artist} on guitar | Easy chords`, `Learn ${s.title} on guitar with ${s.chords.join(", ")} chord diagrams, the strumming pattern and a beginner practice plan.`)
      : { meta: [{ title: "Song not found" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => <main className="wrap page"><h1 className="page-h">Song not found</h1><Link className="link" to="/songs">See all songs</Link></main>,
  component: SongPage,
});

function SongPage() {
  const s = Route.useLoaderData();
  const pat = PATTERNS.find((p) => p.id === s.pattern)!;
  return (
    <main className="wrap page">
      <p className="crumbs"><Link to="/songs">Songs</Link> / {s.title}</p>
      <h1 className="page-h">How to play {s.title} on guitar</h1>
      <p className="lede">{s.artist} · Key of {s.key} · {s.bpm} BPM · {s.level}</p>
      <div className="prose"><p>{s.intro}</p></div>
      <div className="pn" style={{ marginTop: 30 }}>
        <h2>The chords</h2>
        <div className="chords">{s.chords.map((c, i) => <ChordDiagram key={c} name={c} label={`Chord ${i + 1}`} />)}</div>
        <p style={{ color: "var(--mu)", marginTop: 16 }}>Progression: <b style={{ color: "var(--tx)" }}>{s.progression}</b></p>
      </div>
      <div className="pn"><h2>The strumming pattern</h2><StrumPattern pattern={pat} chord={s.chords[0]} /></div>
      <div className="prose">
        <h2>Step-by-step practice plan</h2>
        <ol>{s.steps.map((x) => <li key={x}>{x}</li>)}</ol>
        <div className="tip"><b>Teacher tip</b><br />{s.tip}</div>
        <p style={{ marginTop: 20 }}>Want to play along with a metronome? Open the <Link to="/">practice studio</Link> and pick {s.title}. New to the chords? Read <Link to="/guides/$slug" params={{ slug: "how-to-switch-from-am-to-c" }}>how to switch from Am to C</Link>.</p>
        <p style={{ fontSize: ".85rem", color: "var(--mu)" }}>We teach chords and rhythm only. Please support the artist by listening to the original recording for the lyrics.</p>
      </div>
    </main>
  );
}
