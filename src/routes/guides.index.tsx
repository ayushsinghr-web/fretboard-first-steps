import { createFileRoute, Link } from "@tanstack/react-router";
import { GUIDES } from "@/lib/guitar-data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () => seo("Beginner guitar guides | Guitar Excellence Hub", "Free written guides on tuning, strumming and chord changes like Am to C and G to C."),
  component: () => (
    <main className="wrap page">
      <h1 className="page-h">Beginner guitar guides</h1>
      <p className="lede">Short, practical lessons that fix the problems every new player runs into.</p>
      <div className="cards">
        {GUIDES.map((g) => (
          <Link key={g.slug} to="/guides/$slug" params={{ slug: g.slug }} className="card">
            <span className="tag">Guide</span><h3>{g.title}</h3><p>{g.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  ),
});
