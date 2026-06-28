import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { SiteHeader, PromoBar } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/knives")({
  head: () => ({
    meta: [
      { title: "Knives & Blades — HIBBA TRADING" },
      { name: "description", content: "Hand-forged damascus, kitchen and pocket knives." },
      { property: "og:title", content: "Knives & Blades — HIBBA TRADING" },
      { property: "og:description", content: "Hand-forged damascus, kitchen and pocket knives." },
    ],
  }),
  component: KnivesPage,
});

function KnivesPage() {
  const items = products.filter((p) => p.category === "Knives");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">Forged by hand</p>
          <h1 className="mt-2 font-script text-5xl md:text-6xl">Knives & Blades</h1>
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
