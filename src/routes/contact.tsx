import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, PromoBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — HIBBA TRADING" },
      { name: "description", content: "Get in touch with HIBBA TRADING TRADING. WhatsApp, email and our Lahore studio." },
      { property: "og:title", content: "Contact — HIBBA TRADING" },
      { property: "og:description", content: "Get in touch with HIBBA TRADING TRADING." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <SiteHeader />

      <section className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
        <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">We're here to help</p>
        <h1 className="mt-2 font-script text-5xl md:text-6xl">Contact</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Questions about an order, sizing, or a custom piece — drop us a line.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            {[
              { t: "WhatsApp", d: "+92 311 1222 482", href: "https://wa.me/923111222482" },
              { t: "Email", d: "hello@hibbatrading.pk", href: "mailto:hello@hibbatrading.pk" },
              { t: "Studio", d: "Mall Road, Lahore, Pakistan" },
              { t: "Hours", d: "Mon–Sat · 11am – 8pm PKT" },
            ].map((c) => (
              <div key={c.t}>
                <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">{c.t}</p>
                {c.href ? (
                  <a href={c.href} className="mt-1 block text-base hover:underline">{c.d}</a>
                ) : (
                  <p className="mt-1 text-base">{c.d}</p>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setForm({ name: "", email: "", message: "" });
            }}
            className="space-y-5 border border-border p-8"
          >
            {sent && (
              <p className="border border-foreground bg-secondary px-4 py-3 text-[11px] uppercase tracking-luxury">
                Thanks — we'll be in touch shortly.
              </p>
            )}
            <div>
              <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
              />
            </div>
            <button
              type="submit"
              className="w-full border border-foreground bg-foreground px-8 py-3 text-[11px] uppercase tracking-luxury text-background transition hover:bg-transparent hover:text-foreground"
            >
              Send message
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
