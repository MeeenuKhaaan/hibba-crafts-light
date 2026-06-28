import { createFileRoute } from "@tanstack/react-router";
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

function ShopPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">The collection</p>
          <h1 className="mt-2 font-script text-5xl md:text-6xl">All Products</h1>
          <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
        </div>
        <div className="mt-12">
          <ProductGrid items={products} />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
