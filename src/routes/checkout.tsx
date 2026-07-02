import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader, PromoBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/products";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

const FREE_SHIP = 1990;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — HIBBA TRADING" },
      { name: "description", content: "Complete your order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIP ? 0 : 250;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
    payment: "cod",
  });
  const [placed, setPlaced] = useState<string | null>(null);

  const set = <K extends keyof typeof form>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const valid =
    form.name.trim().length > 1 &&
    /^[0-9+ \-]{8,15}$/.test(form.phone) &&
    form.address.trim().length > 5 &&
    form.city.trim().length > 1;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || detailed.length === 0) return;
    const orderId = "HT-" + Date.now().toString().slice(-6);
    const lines = detailed
      .map((it) => `• ${it.product.name} × ${it.qty} — ${formatPKR(it.product.price * it.qty)}`)
      .join("\n");
    const msg =
      `*New Order ${orderId}*\n\n` +
      `*Customer:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || "-"}\n` +
      `*Address:* ${form.address}, ${form.city}\n*Notes:* ${form.notes || "-"}\n\n` +
      `*Items*\n${lines}\n\n` +
      `Subtotal: ${formatPKR(subtotal)}\nShipping: ${shipping === 0 ? "Free" : formatPKR(shipping)}\n*Total: ${formatPKR(total)}*\n` +
      `Payment: ${form.payment === "cod" ? "Cash on Delivery" : "Bank transfer"}`;
    const url = `https://wa.me/923111222482?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setPlaced(orderId);
    clear();
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <PromoBar />
        <SiteHeader />
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Confirmed</p>
          <h1 className="mt-2 font-script text-5xl">Thank you</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Your order <span className="font-medium text-foreground">{placed}</span> has been placed.
            We've opened WhatsApp so we can confirm details and dispatch.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/shop"
              className="border border-foreground px-6 py-3 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
            >
              Continue shopping
            </Link>
            <button
              onClick={() => navigate({ to: "/" })}
              className="border border-foreground bg-foreground px-6 py-3 text-[11px] uppercase tracking-luxury text-background hover:bg-transparent hover:text-foreground"
            >
              Home
            </button>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Step 2 of 2</p>
          <h1 className="mt-2 font-script text-5xl">Checkout</h1>
        </div>

        {detailed.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            Your bag is empty. <Link to="/shop" className="underline">Start shopping</Link>
          </p>
        ) : (
          <form onSubmit={placeOrder} className="mt-12 grid gap-10 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} required />
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Phone (WhatsApp)" value={form.phone} onChange={(v) => set("phone", v)} required placeholder="03XX XXXXXXX" />
                <Field label="Email (optional)" value={form.email} onChange={(v) => set("email", v)} type="email" />
              </div>
              <Field label="Address" value={form.address} onChange={(v) => set("address", v)} required />
              <Field label="City" value={form.city} onChange={(v) => set("city", v)} required />
              <div>
                <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">
                  Order notes (optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                  className="mt-2 w-full border border-border bg-transparent p-3 text-sm outline-none"
                />
              </div>

              <fieldset className="border border-border p-5">
                <legend className="px-2 text-[11px] uppercase tracking-luxury">Payment method</legend>
                <label className="mt-2 flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="pay"
                    value="cod"
                    checked={form.payment === "cod"}
                    onChange={() => set("payment", "cod")}
                    className="mt-1"
                  />
                  <span>
                    <strong>Cash on Delivery</strong>
                    <p className="text-xs text-muted-foreground">Pay when you receive your order.</p>
                  </span>
                </label>
                <label className="mt-4 flex items-start gap-3 text-sm">
                  <input
                    type="radio"
                    name="pay"
                    value="bank"
                    checked={form.payment === "bank"}
                    onChange={() => set("payment", "bank")}
                    className="mt-1"
                  />
                  <span>
                    <strong>Bank transfer</strong>
                    <p className="text-xs text-muted-foreground">We'll share account details on WhatsApp.</p>
                  </span>
                </label>
              </fieldset>
            </div>

            <aside className="h-fit border border-border p-6">
              <h2 className="text-[11px] uppercase tracking-luxury">Order summary</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {detailed.map((it) => (
                  <li key={it.slug} className="flex justify-between gap-3">
                    <span className="flex-1">{it.product.name} × {it.qty}</span>
                    <span>{formatPKR(it.product.price * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPKR(subtotal)}</dd></div>
                <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : formatPKR(shipping)}</dd></div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                  <dt>Total</dt><dd>{formatPKR(total)}</dd>
                </div>
              </dl>
              <button
                type="submit"
                disabled={!valid}
                className="mt-6 w-full border border-foreground bg-foreground px-6 py-3 text-[11px] uppercase tracking-luxury text-background transition hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                Place order
              </button>
              <p className="mt-3 text-[11px] text-muted-foreground">
                We'll confirm via WhatsApp within minutes.
              </p>
            </aside>
          </form>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">
        {label}{required && " *"}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-border bg-transparent p-3 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
