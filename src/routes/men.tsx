import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { SiteHeader, PromoBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men — HIBBA" },
      { name: "description", content: "Wallets, belts and accessories for him." },
      { property: "og:title", content: "Men — HIBBA" },
      { property: "og:description", content: "Wallets, belts and accessories for him." },
    ],
  }),
  component: MenPage,
});

function MenPage() {
  const items = products.filter((p) => p.gender === "Men");
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
        <div className="mt-12">
          <ProductGrid items={items} />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
