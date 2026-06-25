import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import belt from "@/assets/product-belt.jpg";
import bag from "@/assets/product-bag.jpg";
import knife from "@/assets/product-knife.jpg";
import { products, formatPKR } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HIBBA — Where Sophistication Begins" },
      {
        name: "description",
        content:
          "HIBBA Trading: handcrafted leather goods and forged knives. Free delivery on orders above Rs.1,990.",
      },
      { property: "og:title", content: "HIBBA — Where Sophistication Begins" },
      {
        property: "og:description",
        content: "Handcrafted leather goods and forged knives, shipped across Pakistan.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PromoBar />
      <Header />
      <Hero />
      <ServiceRow />
      <Categories />
      <NewArrivals />
      <SplitBanner />
      <Story />
      <Footer />
    </div>
  );
}

function PromoBar() {
  return (
    <div className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-2 text-center text-[11px] tracking-luxury uppercase">
        Get free delivery on all orders of Rs.1,990 and above · delivery within 3–7 days
      </div>
    </div>
  );
}

function Header() {
  const nav = ["New Arrivals", "Men", "Women", "Gifting", "Knives", "Contact"];
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <button aria-label="Menu" className="md:hidden">
          <span className="block h-px w-6 bg-foreground" />
          <span className="mt-1.5 block h-px w-6 bg-foreground" />
          <span className="mt-1.5 block h-px w-4 bg-foreground" />
        </button>
        <a href="#" className="font-script text-4xl leading-none tracking-tight">
          Hibba
        </a>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 text-[11px] uppercase tracking-luxury md:flex">
          {nav.map((n) => (
            <a key={n} href="#shop" className="text-foreground/80 hover:text-foreground">
              {n}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5 text-[11px] uppercase tracking-luxury">
          <button className="hidden sm:block">Search</button>
          <button>Account</button>
          <button>Bag (0)</button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-secondary">
        <img
          src={hero}
          alt="Handcrafted leather and damascus steel knife"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-xl text-background">
            <p className="text-[11px] uppercase tracking-luxury text-background/80">
              The new collection · 2026
            </p>
            <h1 className="mt-6 font-script text-7xl leading-[0.9] md:text-8xl">
              Leather,
            </h1>
            <p className="mt-4 text-2xl font-light uppercase tracking-[0.3em] md:text-3xl">
              Where Sophistication
              <br />
              Begins
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="border border-background bg-background px-8 py-3 text-[11px] uppercase tracking-luxury text-foreground transition hover:bg-transparent hover:text-background"
              >
                Shop the collection
              </a>
              <a
                href="#story"
                className="border border-background px-8 py-3 text-[11px] uppercase tracking-luxury text-background transition hover:bg-background hover:text-foreground"
              >
                Discover the craft
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow() {
  const items = [
    { title: "30,000+ Loyal Customers", note: "Trusted across Pakistan" },
    { title: "Fast Shipping", note: "Delivered in 3–7 days" },
    { title: "Complimentary Gift Packing", note: "On every order" },
  ];
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((it) => (
          <div key={it.title} className="px-6 py-8 text-center">
            <p className="text-sm font-medium uppercase tracking-wider">{it.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{it.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { title: "Men", note: "Wallets · Belts · Briefcases", img: belt },
    { title: "Women", note: "Bags · Wallets · Accessories", img: bag },
    { title: "Knives & Blades", note: "Kitchen · Pocket · Damascus", img: knife },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {cats.map((c) => (
          <a key={c.title} href="#shop" className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-background">
                <p className="text-[11px] uppercase tracking-luxury text-background/80">
                  Shop
                </p>
                <h3 className="mt-1 font-script text-4xl">{c.title}</h3>
                <p className="text-xs uppercase tracking-wider">{c.note}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function NewArrivals() {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">
          Just in
        </p>
        <h2 className="mt-2 font-script text-5xl md:text-6xl">New Arrivals</h2>
        <div className="mx-auto mt-3 h-px w-12 bg-foreground" />
      </div>

      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
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
              <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">
                {p.sku}
              </p>
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="mt-1 block text-sm font-medium uppercase tracking-wider hover:underline"
              >
                {p.name}
              </Link>
              <p className="mt-2 text-sm">{formatPKR(p.price)}</p>
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="mt-4 inline-block border border-foreground px-6 py-2 text-[11px] uppercase tracking-luxury transition hover:bg-foreground hover:text-background"
              >
                View product
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SplitBanner() {
  return (
    <section className="grid gap-0 md:grid-cols-2">
      <div className="relative h-[60vh] min-h-[420px] bg-secondary">
        <img src={bag} alt="Women's leather" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-10 text-background">
          <div>
            <p className="font-script text-5xl">For Her</p>
            <a href="#shop" className="mt-4 inline-block border border-background px-6 py-2 text-[11px] uppercase tracking-luxury hover:bg-background hover:text-foreground">
              Discover
            </a>
          </div>
        </div>
      </div>
      <div className="relative h-[60vh] min-h-[420px] bg-secondary">
        <img src={belt} alt="Men's leather" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-10 text-background">
          <div>
            <p className="font-script text-5xl">For Him</p>
            <a href="#shop" className="mt-4 inline-block border border-background px-6 py-2 text-[11px] uppercase tracking-luxury hover:bg-background hover:text-foreground">
              Discover
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="bg-secondary/60">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-[11px] uppercase tracking-luxury text-muted-foreground">
          The HIBBA promise
        </p>
        <h2 className="mt-4 font-script text-5xl md:text-6xl">Made by hand. Kept for years.</h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          From third-generation tanners in Lahore to bladesmiths who still forge by coal,
          every HIBBA piece is inspected, signed, and backed by our lifetime repair promise.
          Designed in Pakistan. Loved across the world.
        </p>
        <a
          href="#shop"
          className="mt-10 inline-block border border-foreground px-8 py-3 text-[11px] uppercase tracking-luxury transition hover:bg-foreground hover:text-background"
        >
          Explore the collection
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="font-script text-4xl">Hibba</p>
          <p className="mt-3 max-w-sm text-sm text-background/70">
            Heirloom leather goods and hand-forged knives, shipped across Pakistan and worldwide.
          </p>
          <form className="mt-6 flex max-w-sm gap-0 border border-background/30">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-background/50"
            />
            <button className="bg-background px-5 text-[11px] uppercase tracking-luxury text-foreground">
              Join
            </button>
          </form>
        </div>
        {[
          { title: "Shop", items: ["Men", "Women", "Knives", "Gifting"] },
          { title: "Help", items: ["Shipping", "Returns", "Lifetime Repair", "Contact"] },
          { title: "Hibba", items: ["Our Story", "Stores", "Loyalty", "WhatsApp +92 311 1222 482"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] uppercase tracking-luxury">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {col.items.map((i) => (
                <li key={i}><a href="#" className="hover:text-background">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-[11px] uppercase tracking-luxury text-background/60 md:flex-row">
          <p>© {new Date().getFullYear()} HIBBA Trading. All rights reserved.</p>
          <p>Designed in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
