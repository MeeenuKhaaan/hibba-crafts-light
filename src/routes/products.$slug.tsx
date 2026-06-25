import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products, formatPKR } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — HIBBA` : "Product — HIBBA";
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
      <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">404</p>
      <h1 className="mt-3 font-script text-5xl">Product not found</h1>
      <Link
        to="/"
        className="mt-8 inline-block border border-foreground px-8 py-3 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
      >
        Back to shop
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-script text-4xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 border border-foreground px-6 py-3 text-[11px] uppercase tracking-luxury hover:bg-foreground hover:text-background"
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
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-2 text-center text-[11px] uppercase tracking-luxury">
          Free delivery on orders above Rs.1,990
        </div>
      </div>

      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-script text-4xl">Hibba</Link>
          <Link to="/" className="text-[11px] uppercase tracking-luxury hover:underline">
            ← Continue shopping
          </Link>
        </div>
      </header>

      <nav className="mx-auto max-w-7xl px-6 pt-6 text-[11px] uppercase tracking-luxury text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-2 md:py-16">
        <div className="relative bg-secondary">
          {product.isNew && (
            <span className="absolute left-4 top-4 z-10 bg-background px-2 py-1 text-[10px] uppercase tracking-luxury">
              New
            </span>
          )}
          <img
            src={product.img}
            alt={product.name}
            width={900}
            height={900}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">
            {product.sku}
          </p>
          <h1 className="mt-3 text-2xl font-medium uppercase tracking-wider md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-medium">{formatPKR(product.price)}</span>
            <span className="text-[11px] uppercase tracking-luxury text-muted-foreground">
              Inclusive of all taxes
            </span>
          </div>

          <div className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-foreground/90">
            {product.description}
          </div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">
              Details
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {product.details.map((d: string) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-3 shrink-0 bg-foreground" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <button className="w-full border border-foreground bg-foreground px-8 py-4 text-[11px] uppercase tracking-luxury text-background transition hover:bg-transparent hover:text-foreground">
              Add to bag · {formatPKR(product.price)}
            </button>
            <button className="w-full border border-foreground px-8 py-4 text-[11px] uppercase tracking-luxury transition hover:bg-foreground hover:text-background">
              Save for later
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-[11px] uppercase tracking-luxury text-muted-foreground">
            <div><p className="text-foreground">Lifetime repair</p><p className="mt-1 normal-case tracking-normal">On every piece</p></div>
            <div><p className="text-foreground">Ships 3–7 days</p><p className="mt-1 normal-case tracking-normal">Across Pakistan</p></div>
            <div><p className="text-foreground">Gift wrapped</p><p className="mt-1 normal-case tracking-normal">Complimentary</p></div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">
                You may also like
              </p>
              <h2 className="mt-2 font-script text-4xl">More {product.category}</h2>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group block text-center"
                >
                  <div className="overflow-hidden bg-background">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 text-sm font-medium uppercase tracking-wider">{p.name}</p>
                  <p className="mt-1 text-sm">{formatPKR(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center text-[11px] uppercase tracking-luxury">
          © {new Date().getFullYear()} HIBBA Trading · Designed in Pakistan
        </div>
      </footer>
    </div>
  );
}
