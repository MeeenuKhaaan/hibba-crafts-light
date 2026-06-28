import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type WishlistCtx = {
  items: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  count: number;
};

const Ctx = createContext<WishlistCtx | null>(null);
const KEY = "hibba.wishlist.v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo<WishlistCtx>(
    () => ({
      items,
      has: (slug) => items.includes(slug),
      toggle: (slug) =>
        setItems((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
      remove: (slug) => setItems((prev) => prev.filter((s) => s !== slug)),
      count: items.length,
    }),
    [items],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
