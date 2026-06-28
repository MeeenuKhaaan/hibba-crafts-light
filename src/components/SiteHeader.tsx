import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

export function PromoBar() {
  return (
    <div className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-2 text-center text-[11px] tracking-luxury uppercase">
        Get free delivery on all orders of Rs.1,990 and above · delivery within 3–7 days
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { count } = useCart();
  const nav: { label: string; to: string }[] = [
    { label: "New", to: "/shop" },
    { label: "Men", to: "/men" },
    { label: "Women", to: "/women" },
    { label: "Knives", to: "/knives" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-script text-4xl leading-none tracking-tight">
          Hibba Trading
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 text-[11px] uppercase tracking-luxury md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/80 hover:text-foreground"
              activeProps={{ className: "text-foreground underline underline-offset-4" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5 text-[11px] uppercase tracking-luxury">
          <Link to="/contact" className="hidden sm:block hover:underline">Help</Link>
          <Link to="/cart" className="hover:underline">Bag ({count})</Link>
        </div>
      </div>
    </header>
  );
}
