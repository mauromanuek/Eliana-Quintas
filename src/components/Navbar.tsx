import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NAV_LINKS, SITE_BRAND } from '../data/content';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('#inicio');

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHash(`#${id}`);
            }
          });
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    setActiveHash(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#101B32]/95 border-b border-white/10 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          onClick={() => handleLinkClick('#inicio')}
          className="font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-white whitespace-nowrap shrink-0 transition-colors hover:text-[#C6A46A]"
        >
          {SITE_BRAND.displayName}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#C6A46A] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#consultoria"
            onClick={() => handleLinkClick('#consultoria')}
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#C6A46A] px-4 py-2 text-xs sm:text-sm font-semibold text-[#101B32] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#D4B680]"
          >
            Solicitar consultoria
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/10 bg-[#101B32] px-4 pb-6 pt-3 lg:hidden"
          >
            <nav aria-label="Navegação móvel" className="flex flex-col divide-y divide-white/10">
              {NAV_LINKS.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`flex min-h-[44px] items-center justify-between py-2.5 text-base font-medium transition-colors ${
                      isActive ? 'text-[#C6A46A]' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </nav>
            <div className="mt-4 pt-2">
              <a
                href="#consultoria"
                onClick={() => handleLinkClick('#consultoria')}
                className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-[#C6A46A] px-5 py-2.5 text-sm font-semibold text-[#101B32] transition-colors hover:bg-[#D4B680]"
              >
                Solicitar consultoria
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
