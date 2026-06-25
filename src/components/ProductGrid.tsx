import { Link } from "@tanstack/react-router";
import { formatPKR, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductGrid({ items }: { items: Product[] }) {
  const { add } = useCart();
  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No products in this category yet.
      </p>
    );
  }
  return (
    <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <article key={p.slug} className="group">
          <Link
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="relative block overflow-hidden bg-secondary"
          >
            {p.isNew && (
              <span className="absolute left-3 top-3 z-10 bg-background px-2 py-1 text-[10px] uppercase tracking-luxury">
                New
              </span>
            )}
            <img
              src={p.img}
              alt={p.name}
              width={900}
              height={900}
              loading="lazy"
              className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </Link>
          <div className="mt-4 text-center">
            <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">{p.sku}</p>
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="mt-1 block text-sm font-medium uppercase tracking-wider hover:underline"
            >
              {p.name}
            </Link>
            <p className="mt-2 text-sm">{formatPKR(p.price)}</p>
            <div className="mt-4 flex justify-center gap-2">
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="border border-foreground px-5 py-2 text-[11px] uppercase tracking-luxury transition hover:bg-foreground hover:text-background"
              >
                View
              </Link>
              <button
                onClick={() => add(p.slug, 1)}
                className="border border-foreground bg-foreground px-5 py-2 text-[11px] uppercase tracking-luxury text-background transition hover:bg-transparent hover:text-foreground"
              >
                Add to bag
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
