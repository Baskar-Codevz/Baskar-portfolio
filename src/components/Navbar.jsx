
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const sections = [
  "home",
  "about",
  "work",
  "skills",
  "services",
  "testimonials",
  "contact",
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);

        let current = "home";

        sections.forEach((id) => {
          const section = document.getElementById(id);

          if (section && section.getBoundingClientRect().top <= 160) {
            current = id;
          }
        });

        setActiveSection(current);
        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#08080a]/90 shadow-lg shadow-black/20 backdrop-blur-2xl"
          : "border-b border-white/[0.04] bg-[#08080a]/45 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          aria-label="Home"
          className="group relative flex items-center text-xl font-semibold tracking-tight text-white"
        >
          Baskar
          <span className="text-violet-400 transition-transform duration-300 group-hover:translate-x-1">
            .
          </span>
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 lg:flex xl:gap-7"
        >
          {navItems.map((item, index) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.name}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`group relative flex items-center gap-1.5 py-3 text-[12px] transition-colors duration-300 xl:text-[13px] ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {item.name}

                {item.name === "Testimonials" && (
                  <span className="h-1 w-1 rounded-full bg-violet-400" />
                )}

                <span
                  className={`absolute bottom-1 left-0 h-[2px] rounded-full bg-violet-400 transition-all duration-300 ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />

                <span className="sr-only">
                  Navigation item {index + 1}
                </span>
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="group hidden items-center gap-2 rounded-full border border-white/10 py-2 pl-4 pr-2 text-xs font-medium text-white transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-400/[0.08] lg:inline-flex"
        >
          Let's talk
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-400 text-black transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={15} />
          </span>
        </a>

        {/* Mobile / tablet menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 lg:hidden"
        >
          <span className="transition-transform duration-300">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </span>
        </button>
      </div>

      {/* Mobile / tablet navigation */}
      <div
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={`overflow-y-auto border-t border-white/[0.07] bg-[#09090c]/95 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible max-h-[calc(100dvh-76px)] opacity-100"
            : "invisible max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 pb-6 pt-3 sm:px-8">
          {navItems.map((item, index) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.name}
                href={item.href}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
                aria-current={isActive ? "location" : undefined}
                className={`group flex items-center justify-between border-b border-white/[0.06] py-4 transition-all duration-300 ${
                  isActive
                    ? "text-violet-300"
                    : "text-zinc-400 hover:text-white"
                } ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${index * 45}ms` : "0ms",
                }}
              >
                <span className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-[10px] text-zinc-600">
                    0{index + 1}
                  </span>
                  {item.name}
                </span>

                <ArrowUpRight
                  size={16}
                  className={`transition-transform duration-300 ${
                    isActive
                      ? "text-violet-300"
                      : "text-zinc-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-300"
                  }`}
                />
              </a>
            );
          })}

          <a
            href="#contact"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
            className="group mt-5 flex items-center justify-between rounded-xl bg-violet-400 px-5 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:bg-violet-300"
          >
            Let's build something
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

