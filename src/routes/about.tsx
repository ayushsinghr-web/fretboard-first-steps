import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Guitar Excellence Hub", "Why we built a free, interactive way for beginners to see, hear and play their first guitar songs."),
  component: () => (
    <main className="wrap page">
      <h1 className="page-h">About Guitar Excellence Hub</h1>
      <p className="lede">A free practice space for people picking up the guitar for the first time.</p>
      <div className="prose">
        <p>Most beginners give up in the first month. Not because guitar is too hard, but because chord charts are confusing, videos move too fast and practice feels lonely. We built Guitar Excellence Hub to fix that.</p>
        <p>Every lesson follows the same simple idea: <b>see the chord, hear the chord, play the song</b>. You can tune with the built-in tuner, tap any chord to hear how it should sound and strum along with a live metronome that shows every down and up stroke.</p>
        <h2>What we believe</h2>
        <ul>
          <li>Real songs are the best motivation, so you learn songs from day one.</li>
          <li>Small habits, like the pivot finger and the 2-minute silent switch, beat hours of random practice.</li>
          <li>Learning should be free and work in any browser, without an account.</li>
        </ul>
        <h2>Where to start</h2>
        <p>Begin with the <Link to="/guides/$slug" params={{ slug: "first-week-guitar-practice-plan" }}>first-week practice plan</Link>, then learn <Link to="/songs/$slug" params={{ slug: "riptide" }}>Riptide</Link>. Questions or song requests? <Link to="/contact">Get in touch</Link>.</p>
      </div>
    </main>
  ),
});
