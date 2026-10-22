import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy policy | Guitar Excellence Hub", "How Guitar Excellence Hub handles your data, microphone access and cookies."),
  component: () => (
    <main className="wrap page">
      <h1 className="page-h">Privacy policy</h1>
      <p className="lede">Last updated: October 22, 2026</p>
      <div className="prose">
        <p>Guitar Excellence Hub (“we”, “us”) respects your privacy. This policy explains what information we collect when you use this website and how we use it.</p>
        <h2>Information we collect</h2>
        <ul>
          <li><b>No account needed.</b> You can use every lesson, chord and tool without signing up.</li>
          <li><b>Messages you send.</b> If you contact us, we receive your name, email address and message so we can reply.</li>
          <li><b>Basic usage data.</b> Our hosting provider may log standard technical data such as IP address, browser type and pages visited to keep the site secure and working.</li>
        </ul>
        <h2>Microphone access</h2>
        <p>The tuner asks for microphone access only when you press “Start tuner”. Sound is analysed live inside your browser to detect pitch. Audio is never recorded, stored or sent to us or anyone else. You can stop the tuner or revoke permission in your browser settings at any time.</p>
        <h2>Cookies</h2>
        <p>We do not use advertising cookies. Our site may use essential storage needed for it to function. If we add analytics or advertising in the future, we will update this policy and ask for consent where required by law.</p>
        <h2>How we use information</h2>
        <p>We use the information only to run and improve the website and to answer your messages. We never sell your personal data.</p>
        <h2>Third-party services</h2>
        <p>We load fonts from Google Fonts, which may receive your IP address when fonts are downloaded. Please see Google’s privacy policy for details.</p>
        <h2>Children</h2>
        <p>Our lessons are suitable for all ages, but we do not knowingly collect personal information from children under 13. If you believe a child has sent us personal data, contact us and we will delete it.</p>
        <h2>Your rights</h2>
        <p>Depending on where you live, you may have the right to access, correct or delete your personal data. To make a request, please <Link to="/contact">contact us</Link>.</p>
        <h2>Changes</h2>
        <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>
      </div>
    </main>
  ),
});
