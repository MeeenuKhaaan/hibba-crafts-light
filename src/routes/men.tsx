import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { SiteHeader, PromoBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilterBar, type SortMode } from "@/components/CategoryFilterBar";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men — HIBBA TRADING" },
      { name: "description", content: "Wallets, belts and accessories for him." },
      { property: "og:title", content: "Men — HIBBA TRADING" },
      { property: "og:description", content: "Wallets, belts and accessories for him." },
    ],
  }),
  component: MenPage,
});

function MenPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortMode>("featured");
  const [maxPrice, setMaxPrice] = useState(50000);

  const items = useMemo(() => {
    let list = products.filter((p) => p.gender === "Men" && p.price <= maxPrice);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || p.tagline.toLowerCase().includes(s));
    }
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "new") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [q, sort, maxPrice]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">For Him</p>
          <h1 className="mt-2 font-script text-5xl md:text-6xl">Men</h1>
          <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
        </div>
        <CategoryFilterBar q={q} setQ={setQ} sort={sort} setSort={setSort} maxPrice={maxPrice} setMaxPrice={setMaxPrice} count={items.length} />
        <div className="mt-12">
          <ProductGrid items={items} />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
