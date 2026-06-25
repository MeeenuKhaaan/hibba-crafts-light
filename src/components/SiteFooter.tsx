import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const cols: { title: string; items: { label: string; to?: string; href?: string }[] }[] = [
    {
      title: "Shop",
      items: [
        { label: "Men", to: "/men" },
        { label: "Women", to: "/women" },
        { label: "Knives", to: "/knives" },
        { label: "All Products", to: "/shop" },
      ],
    },
    {
      title: "Help",
      items: [
        { label: "Contact", to: "/contact" },
        { label: "Shipping & Returns", to: "/contact" },
        { label: "Lifetime Repair", to: "/about" },
      ],
    },
    {
      title: "Hibba",
      items: [
        { label: "Our Story", to: "/about" },
        { label: "WhatsApp +92 311 1222 482", href: "https://wa.me/923111222482" },
      ],
    },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="font-script text-4xl">Hibba</p>
          <p className="mt-3 max-w-sm text-sm text-background/70">
            Heirloom leather goods and hand-forged knives, shipped across Pakistan and worldwide.
          </p>
          <form
            className="mt-6 flex max-w-sm gap-0 border border-background/30"
            onSubmit={(e) => e.preventDefault()}
          >
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
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] uppercase tracking-luxury">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {col.items.map((i) =>
                i.to ? (
                  <li key={i.label}>
                    <Link to={i.to} className="hover:text-background">{i.label}</Link>
                  </li>
                ) : (
                  <li key={i.label}>
                    <a href={i.href} target="_blank" rel="noreferrer" className="hover:text-background">
                      {i.label}
                    </a>
                  </li>
                ),
              )}
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
