import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { SiteHeader, PromoBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — HIBBA TRADING" },
      { name: "description", content: "Sign in or create your HIBBA TRADING account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate({ to: "/account" });
  }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/account",
            data: { full_name: name },
          },
        });
        if (error) throw error;
        setMsg("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setErr(null);
    const r = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (r.error) setErr(r.error.message || "Google sign-in failed");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <SiteHeader />
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Account</p>
          <h1 className="mt-2 font-script text-5xl">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h1>
        </div>

        <button
          onClick={google}
          className="mt-10 flex w-full items-center justify-center gap-3 border border-foreground px-6 py-3 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
        >
          <span>Continue with Google</span>
        </button>

        <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-luxury text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={submit} className="space-y-5">
          {mode === "signup" && (
            <Field label="Full name" value={name} onChange={setName} required />
          )}
          <Field label="Email" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />

          {err && <p className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</p>}
          {msg && <p className="border border-border bg-secondary px-3 py-2 text-xs">{msg}</p>}

          <button
            disabled={busy}
            className="w-full border border-foreground bg-foreground px-6 py-3 text-[11px] uppercase tracking-luxury text-background transition hover:bg-transparent hover:text-foreground disabled:opacity-40"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link to="/" className="underline">Back to shop</Link>
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-luxury text-muted-foreground">
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-border bg-transparent p-3 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
