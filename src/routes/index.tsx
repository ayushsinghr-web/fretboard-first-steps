import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { homeTop, homeBottom, bootHome } from "@/lib/home-legacy";
import { Tuner } from "@/components/tuner";
import { SONGS, GUIDES } from "@/lib/guitar-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guitar Excellence Hub: learn Riptide, Stand By Me and Zombie" },
      { name: "description", content: "An interactive beginner guitar dashboard with a tuner, chord diagrams, chord audio, strumming patterns and a live metronome." },
      { property: "og:title", content: "Guitar Excellence Hub: learn guitar songs the easy way" },
      { property: "og:description", content: "Tune up, see the chord, hear the chord and strum along with a live metronome." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const ac = new AbortController();
    bootHome(ac.signal);
    return () => ac.abort();
  }, []);
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: homeTop }} />
      <Tuner />
      <div dangerouslySetInnerHTML={{ __html: homeBottom }} />
      <section className="wrap hb">
        <h2>Song lessons and guides</h2>
        <div className="cards">
          {SONGS.map((s) => (
            <Link key={s.slug} to="/songs/$slug" params={{ slug: s.slug }} className="card">
              <span className="tag">Song lesson</span><h3>{s.title}</h3><p>{s.artist} · {s.chords.join(" ")}</p>
            </Link>
          ))}
          {GUIDES.slice(0, 3).map((g) => (
            <Link key={g.slug} to="/guides/$slug" params={{ slug: g.slug }} className="card">
              <span className="tag">Guide</span><h3>{g.title}</h3><p>{g.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
