import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import belt from "@/assets/product-belt.jpg";
import knife from "@/assets/product-knife.jpg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hibba Trading — Handcrafted Leather & Knives" },
      {
        name: "description",
        content:
          "Hibba Trading offers heirloom-quality leather goods and hand-forged knives, made for everyday craft and lasting use.",
      },
      { property: "og:title", content: "Hibba Trading — Handcrafted Leather & Knives" },
      {
        property: "og:description",
        content: "Heirloom leather goods and hand-forged knives, made to last.",
      },
    ],
  }),
  component: Home,
});


function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Categories />
      <Catalog />
      <Story />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
            H
          </span>
          <span className="font-display text-xl tracking-wide">Hibba Trading</span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#shop" className="hover:text-foreground">Shop</a>
          <a href="#leather" className="hover:text-foreground">Leather</a>
          <a href="#knives" className="hover:text-foreground">Knives</a>
          <a href="#story" className="hover:text-foreground">Our Story</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            Search
          </button>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Cart · 0
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Est. craftsmanship
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
            Leather that ages well.
            <br />
            <span className="text-primary">Knives that hold their edge.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
            Hibba Trading curates heirloom-quality leather goods and hand-forged
            blades — built by makers who care, for people who use them daily.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#shop"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
            >
              Shop the collection
            </a>
            <a
              href="#story"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
            >
              Our craft →
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Makers</dt>
              <dd className="mt-1 font-display text-2xl">24+</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Pieces shipped</dt>
              <dd className="mt-1 font-display text-2xl">12k</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Lifetime repair</dt>
              <dd className="mt-1 font-display text-2xl">✓</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-accent/15 blur-3xl" />
          <img
            src={hero}
            alt="Handcrafted leather wallet, belt and damascus steel knife on cream linen"
            width={1600}
            height={1100}
            className="rounded-2xl object-cover shadow-[var(--shadow-card)]"
          />
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { id: "leather", title: "Leather Goods", note: "Wallets, belts, bags" },
    { id: "knives", title: "Knives & Blades", note: "Kitchen, pocket, damascus" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-4 md:grid-cols-2">
        {cats.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="group flex items-end justify-between rounded-2xl border border-border bg-card p-8 transition hover:border-primary/40 hover:bg-secondary"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Collection
              </p>
              <h3 className="mt-2 font-display text-3xl">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
            </div>
            <span className="text-2xl text-primary transition group-hover:translate-x-1">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Catalog() {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Featured
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">The Collection</h2>
        </div>
        <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground md:block">
          View all →
        </a>
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p.slug} className="group">
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="block overflow-hidden rounded-xl bg-secondary"
            >
              <img
                src={p.img}
                alt={p.name}
                width={900}
                height={900}
                loading="lazy"
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </Link>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {p.category}
                </p>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="mt-1 block font-display text-xl hover:text-primary"
                >
                  {p.name}
                </Link>
              </div>
              <span className="font-medium">{p.price}</span>
            </div>
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="mt-4 block w-full rounded-full border border-border bg-card py-2.5 text-center text-sm font-medium transition hover:bg-primary hover:text-primary-foreground"
            >
              View product
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Our Story
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            Made by hands, kept for generations.
          </h2>
          <p className="mt-6 text-muted-foreground">
            Hibba Trading partners with small workshops across the world — third-generation
            tanners, bladesmiths who still forge by coal — to bring you objects that get
            better with use. Every piece is inspected, signed, and backed by our
            lifetime repair promise.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Full-grain vegetable-tanned leather",
              "Hand-forged high-carbon and damascus steel",
              "Free worldwide shipping over $200",
              "Free lifetime repair on every piece",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={belt} alt="Hand stitched leather belt" loading="lazy" className="aspect-[4/5] rounded-xl object-cover" />
          <img src={knife} alt="Damascus chef knife" loading="lazy" className="mt-10 aspect-[4/5] rounded-xl object-cover" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display">
              H
            </span>
            <span className="font-display text-xl">Hibba Trading</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Heirloom leather goods and hand-forged knives, shipped worldwide from
            independent workshops.
          </p>
          <form className="mt-6 flex max-w-sm gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button className="rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
        <div>
          <h4 className="font-display text-lg">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Wallets</a></li>
            <li><a href="#" className="hover:text-foreground">Belts & Bags</a></li>
            <li><a href="#" className="hover:text-foreground">Kitchen Knives</a></li>
            <li><a href="#" className="hover:text-foreground">Pocket Knives</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#story" className="hover:text-foreground">Our Story</a></li>
            <li><a href="#" className="hover:text-foreground">Lifetime Repair</a></li>
            <li><a href="#" className="hover:text-foreground">Shipping</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Hibba Trading. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
