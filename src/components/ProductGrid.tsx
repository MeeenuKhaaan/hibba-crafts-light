import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { formatPKR, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

export function ProductGrid({ items }: { items: Product[] }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No products match your search.
      </p>
    );
  }
  return (
    <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const wished = has(p.slug);
        return (
          <article key={p.slug} className="group">
            <div className="relative overflow-hidden bg-secondary">
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="block"
              >
                {p.isNew && (
                  <span className="absolute left-3 top-3 z-10 bg-background px-2 py-1 text-[10px] uppercase tracking-luxury">
                    New
                  </span>
                )}
                {p.oldPrice && (
                  <span className="absolute left-3 top-10 z-10 bg-destructive px-2 py-1 text-[10px] uppercase tracking-luxury text-destructive-foreground">
                    Sale
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
              <button
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggle(p.slug)}
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/90 transition hover:scale-110"
              >
                <Heart className={`h-4 w-4 ${wished ? "fill-destructive text-destructive" : ""}`} />
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">{p.sku}</p>
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="mt-1 block text-sm font-medium uppercase tracking-wider hover:underline"
              >
                {p.name}
              </Link>
              <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-foreground text-foreground" />
                <span>{p.rating.toFixed(1)}</span>
                <span>· {p.reviews.length} reviews</span>
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                <span>{formatPKR(p.price)}</span>
                {p.oldPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPKR(p.oldPrice)}
                  </span>
                )}
              </div>
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
        );
      })}
    </div>
  );
}
