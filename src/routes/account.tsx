import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, PromoBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/lib/auth";
import { formatPKR } from "@/lib/products";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — HIBBA TRADING" },
      { name: "description", content: "Manage your profile, addresses and orders." },
    ],
  }),
  component: AccountPage,
});

type Profile = { full_name: string | null; phone: string | null };
type Address = {
  id: string;
  label: string | null;
  full_name: string;
  phone: string;
  address_line: string;
  city: string;
  is_default: boolean;
};
type Order = {
  id: string;
  order_code: string;
  total: number;
  status: string;
  created_at: string;
  payment_method: string;
};

function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({ full_name: "", phone: "" });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"orders" | "addresses" | "profile">("orders");
  const [newAddr, setNewAddr] = useState({ label: "", full_name: "", phone: "", address_line: "", city: "" });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setProfile({ full_name: data.full_name ?? "", phone: data.phone ?? "" });
    });
    supabase.from("addresses").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setAddresses(data as Address[]);
    });
    supabase.from("orders").select("id, order_code, total, status, created_at, payment_method").order("created_at", { ascending: false }).then(({ data }) => {
      if (data) setOrders(data as Order[]);
    });
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <PromoBar />
        <SiteHeader />
        <p className="py-24 text-center text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  const saveProfile = async () => {
    setSaving(true);
    await supabase.from("profiles").upsert({ id: user.id, full_name: profile.full_name, phone: profile.phone });
    setSaving(false);
  };

  const addAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("addresses")
      .insert({ ...newAddr, user_id: user.id })
      .select()
      .single();
    if (!error && data) {
      setAddresses((a) => [data as Address, ...a]);
      setNewAddr({ label: "", full_name: "", phone: "", address_line: "", city: "" });
    }
  };

  const removeAddress = async (id: string) => {
    await supabase.from("addresses").delete().eq("id", id);
    setAddresses((a) => a.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Signed in</p>
            <h1 className="mt-2 font-script text-5xl">{profile.full_name || user.email}</h1>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={async () => { await signOut(); navigate({ to: "/" }); }}
            className="border border-foreground px-5 py-2 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
          >
            Sign out
          </button>
        </div>

        <div className="mt-6 flex gap-6 border-b border-border text-[11px] uppercase tracking-luxury">
          {(["orders", "addresses", "profile"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 py-3 ${tab === t ? "border-foreground" : "border-transparent text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <div className="mt-8">
            {orders.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No orders yet. <Link to="/shop" search={{ q: "" }} className="underline">Start shopping</Link>
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-left text-[11px] uppercase tracking-luxury text-muted-foreground">
                  <tr>
                    <th className="py-3">Order</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t border-border">
                      <td className="py-3 font-medium">{o.order_code}</td>
                      <td>{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="capitalize">{o.payment_method}</td>
                      <td className="capitalize">{o.status}</td>
                      <td className="text-right">{formatPKR(o.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "addresses" && (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              {addresses.length === 0 && (
                <p className="text-sm text-muted-foreground">No saved addresses.</p>
              )}
              {addresses.map((a) => (
                <div key={a.id} className="border border-border p-4">
                  <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">
                    {a.label || "Address"}
                  </p>
                  <p className="mt-1 font-medium">{a.full_name}</p>
                  <p className="text-sm">{a.address_line}, {a.city}</p>
                  <p className="text-sm text-muted-foreground">{a.phone}</p>
                  <button onClick={() => removeAddress(a.id)} className="mt-3 text-xs underline">Remove</button>
                </div>
              ))}
            </div>
            <form onSubmit={addAddress} className="space-y-3 border border-border p-5">
              <p className="text-[11px] uppercase tracking-luxury">Add new address</p>
              <input required placeholder="Label (Home, Office)" value={newAddr.label} onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })} className="w-full border border-border bg-transparent p-2 text-sm" />
              <input required placeholder="Full name" value={newAddr.full_name} onChange={(e) => setNewAddr({ ...newAddr, full_name: e.target.value })} className="w-full border border-border bg-transparent p-2 text-sm" />
              <input required placeholder="Phone" value={newAddr.phone} onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })} className="w-full border border-border bg-transparent p-2 text-sm" />
              <input required placeholder="Address" value={newAddr.address_line} onChange={(e) => setNewAddr({ ...newAddr, address_line: e.target.value })} className="w-full border border-border bg-transparent p-2 text-sm" />
              <input required placeholder="City" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} className="w-full border border-border bg-transparent p-2 text-sm" />
              <button className="w-full border border-foreground bg-foreground py-2 text-[11px] uppercase tracking-luxury text-background">Save address</button>
            </form>
          </div>
        )}

        {tab === "profile" && (
          <div className="mt-8 max-w-md space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Full name</label>
              <input value={profile.full_name ?? ""} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="mt-2 w-full border border-border bg-transparent p-3 text-sm" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">Phone</label>
              <input value={profile.phone ?? ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-2 w-full border border-border bg-transparent p-3 text-sm" />
            </div>
            <button onClick={saveProfile} disabled={saving} className="border border-foreground bg-foreground px-6 py-3 text-[11px] uppercase tracking-luxury text-background disabled:opacity-40">
              {saving ? "Saving…" : "Save profile"}
            </button>
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
