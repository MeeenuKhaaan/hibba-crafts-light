import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — Hibba Trading` : "Product — Hibba Trading";
    const description = p?.description ?? "Handcrafted leather goods and knives.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(p ? [{ property: "og:image", content: p.img }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">404</p>
      <h1 className="mt-3 font-display text-4xl">Product not found</h1>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
      >
        Back to shop
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
      >
        Try again
      </button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
              H
            </span>
            <span className="font-display text-xl tracking-wide">Hibba Trading</span>
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to shop
          </Link>
        </div>
      </header>

      <nav className="mx-auto max-w-7xl px-6 pt-6 text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-2 md:py-16">
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-accent/15 blur-3xl" />
          <img
            src={product.img}
            alt={product.name}
            width={900}
            height={900}
            className="aspect-square w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {product.category}
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl">{product.price}</span>
            <span className="text-xs text-muted-foreground">Free shipping over $200</span>
          </div>

          <p className="mt-8 text-base leading-relaxed text-foreground/90">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2 text-sm">
            {product.details.map((d: string) => (
              <li key={d} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <button className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90">
              Add to cart — {product.price}
            </button>
            <button className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-secondary">
              Save for later
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
            <div><p className="text-foreground">Lifetime repair</p><p className="mt-1">On every piece</p></div>
            <div><p className="text-foreground">Ships in 48h</p><p className="mt-1">Worldwide</p></div>
            <div><p className="text-foreground">30-day returns</p><p className="mt-1">No questions</p></div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="font-display text-3xl">More from {product.category}</h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-xl bg-card">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl">{p.name}</h3>
                    <span className="font-medium">{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
