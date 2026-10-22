import { createFileRoute, Link } from "@tanstack/react-router";
import { SONGS } from "@/lib/guitar-data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/songs/")({
  head: () => seo("Easy guitar songs for beginners | Guitar Excellence Hub", "Step-by-step beginner guitar lessons for Riptide, Stand By Me and Zombie with chords and strumming patterns."),
  component: () => (
    <main className="wrap page">
      <h1 className="page-h">Easy songs for beginners</h1>
      <p className="lede">Each lesson shows the chords, the strumming pattern and a step-by-step plan to play the whole song.</p>
      <div className="cards">
        {SONGS.map((s) => (
          <Link key={s.slug} to="/songs/$slug" params={{ slug: s.slug }} className="card">
            <span className="tag">{s.level} · {s.bpm} BPM</span><h3>{s.title}</h3><p>{s.artist}</p><p>Chords: {s.chords.join(", ")}</p>
          </Link>
        ))}
      </div>
    </main>
  ),
});
