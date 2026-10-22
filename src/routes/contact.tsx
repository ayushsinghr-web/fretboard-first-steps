import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { seo } from "@/lib/seo";

const EMAIL = "hello@guitarexcellencehub.com";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Guitar Excellence Hub", "Send us a question, a song request or feedback about our beginner guitar lessons."),
  component: Contact,
});

function Contact() {
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${f.msg}\n\nFrom: ${f.name} <${f.email}>`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Message from " + f.name)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <main className="wrap page">
      <h1 className="page-h">Contact us</h1>
      <p className="lede">Have a question, found a mistake or want a song lesson added? We read every message.</p>
      <div className="pn" style={{ maxWidth: 620 }}>
        <form onSubmit={send}>
          <label className="field"><span>Your name</span><input required maxLength={100} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
          <label className="field"><span>Your email</span><input required type="email" maxLength={200} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
          <label className="field"><span>Message</span><textarea required rows={6} maxLength={2000} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} /></label>
          <button className="btn as-btn" type="submit">Send message</button>
        </form>
        <p style={{ color: "var(--mu)", marginTop: 18, fontSize: ".92rem" }}>Or email us directly at <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      </div>
    </main>
  );
}
