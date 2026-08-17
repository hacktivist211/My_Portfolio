import { useEffect, useState } from "react";
import { NAV_ITEMS, routeLabel, type Route } from "@/lib/routes";

type Props = {
  route: Route;
  onNavigate: (to: Route, e: React.MouseEvent | React.KeyboardEvent) => void;
};

export default function Nav({ route, onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-colors duration-500 ${
          scrolled ? "smoked" : ""
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-16">
          <button
            onClick={(e) => onNavigate("index", e)}
            className="flex items-baseline gap-3 group"
            aria-label="Home"
          >
            <span className="font-black-ops text-lg tracking-tight text-bone group-hover:text-white transition-colors">
              NKC<span className="text-blood">.</span>
            </span>
            <span className="hidden md:inline font-archive text-[10px] tracking-[0.35em] text-ash group-hover:text-bone transition-colors">
              NIRAJ KUMAR CHENNUPATI
            </span>
          </button>

          {/* desktop menu — archive mono font */}
          <nav className="hidden md:flex items-center gap-8 font-archive text-[11px] tracking-[0.25em]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.route}
                onClick={(e) => onNavigate(item.route, e)}
                className={`relative py-1 uppercase transition-colors duration-300 ${
                  route === item.route ? "text-bone" : "text-ash hover:text-bone"
                }`}
              >
                <span className="text-blood mr-1.5">{item.no}</span>
                {item.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-px bg-blood transition-all duration-500 ${
                    route === item.route ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* mobile trigger */}
          <button
            className="md:hidden font-archive text-[11px] tracking-[0.3em] text-bone uppercase"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <div className="h-px w-full rule-line border-t" />
      </header>

      {/* mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[55] bg-ink transition-all duration-500 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-8 gap-2">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.route}
              onClick={(e) => onNavigate(item.route, e)}
              className={`text-left py-3 border-b rule-line flex items-baseline gap-4 transition-all duration-500 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-archive text-[10px] text-blood">{item.no}</span>
              <span
                className={`font-display text-4xl uppercase ${
                  route === item.route ? "text-bone" : "text-ash"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
          <p className="mt-10 font-archive text-[10px] tracking-[0.3em] text-ash uppercase">
            {routeLabel(route)} — Bengaluru, IN
          </p>
        </div>
      </div>
    </>
  );
}
