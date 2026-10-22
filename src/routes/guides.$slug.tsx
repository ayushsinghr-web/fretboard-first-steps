import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GUIDES } from "@/lib/guitar-data";
import { ChordDiagram, Headstock } from "@/components/guitar";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const g = GUIDES.find((x) => x.slug === params.slug);
    if (!g) throw notFound();
    return g;
  },
  head: ({ loaderData: g }) => (g ? seo(`${g.title} | Guitar Excellence Hub`, g.desc) : { meta: [{ title: "Guide not found" }, { name: "robots", content: "noindex" }] }),
  notFoundComponent: () => <main className="wrap page"><h1 className="page-h">Guide not found</h1><Link className="link" to="/guides">See all guides</Link></main>,
  component: GuidePage,
});

function GuidePage() {
  const g = Route.useLoaderData();
  return (
    <main className="wrap page">
      <p className="crumbs"><Link to="/guides">Guides</Link> / {g.title}</p>
      <h1 className="page-h">{g.title}</h1>
      <p className="lede">{g.desc}</p>
      {g.chords && <div className="chords" style={{ maxWidth: 700, marginBottom: 20 }}>{g.chords.map((c) => <ChordDiagram key={c} name={c} />)}</div>}
      {g.slug === "how-to-tune-a-guitar" && <div className="pn" style={{ maxWidth: 700 }}><Headstock /></div>}
      <article className="prose">
        {g.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((p) => <p key={p}>{p}</p>)}
            {s.list && <ol>{s.list.map((l) => <li key={l}>{l}</li>)}</ol>}
          </section>
        ))}
        <h2>Keep going</h2>
        <p>Browse the <Link to="/chords">chord library</Link>, try the <Link to="/strumming">strumming patterns</Link> or learn a full <Link to="/songs">song</Link>.</p>
      </article>
    </main>
  );
}
