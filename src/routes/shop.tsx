import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products } from "@/lib/products";
import { SiteHeader, PromoBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — HIBBA TRADING" },
      { name: "description", content: "Browse the full HIBBA TRADING collection of leather goods and forged knives." },
      { property: "og:title", content: "Shop All — HIBBA TRADING" },
      { property: "og:description", content: "Leather goods and forged knives, shipped across Pakistan." },
    ],
  }),
  component: ShopPage,
});

type Cat = "All" | "Leather" | "Knives";
type Sort = "featured" | "price-asc" | "price-desc" | "new";

function ShopPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat>("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [maxPrice, setMaxPrice] = useState(50000);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (p.price > maxPrice) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        if (!p.name.toLowerCase().includes(s) && !p.tagline.toLowerCase().includes(s)) return false;
      }
      return true;
    });
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "new") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [q, cat, sort, maxPrice]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">The collection</p>
          <h1 className="mt-2 font-script text-5xl md:text-6xl">All Products</h1>
          <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
        </div>

        <div className="mt-10 grid gap-4 border-y border-border py-5 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-border bg-transparent py-2 pl-10 pr-3 text-sm outline-none"
            />
          </div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as Cat)}
            className="border border-border bg-transparent px-3 py-2 text-sm"
          >
            <option value="All">All categories</option>
            <option value="Leather">Leather</option>
            <option value="Knives">Knives</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-border bg-transparent px-3 py-2 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <label className="flex items-center gap-3 text-xs uppercase tracking-luxury md:col-span-4">
            Max price: Rs.{maxPrice.toLocaleString("en-PK")}
            <input
              type="range"
              min={1000}
              max={50000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-1 accent-foreground"
            />
            <span className="text-muted-foreground">{filtered.length} items</span>
          </label>
        </div>

        <div className="mt-12">
          <ProductGrid items={filtered} />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
