'use client';

'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, Home, Briefcase, FileText, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "Contact", href: "/contact", icon: Mail },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className={`relative z-20 mx-auto transition-all duration-500 ${isScrolled ? "max-w-[1200px] px-4 pt-4" : "max-w-full px-0 pt-0"}`}>
        <motion.nav
          initial={false}
          animate={{
            borderRadius: isScrolled ? "999px" : "0px",
            background: isScrolled
              ? "rgba(255, 255, 255, 0.85)"
              : "rgba(255, 255, 255, 0.95)",
            height: isScrolled ? "64px" : "90px",
            borderBottomWidth: isScrolled ? "1px" : "1px",
            borderLeftWidth: isScrolled ? "1px" : "0px",
            borderRightWidth: isScrolled ? "1px" : "0px",
            borderTopWidth: isScrolled ? "1px" : "0px",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`
            w-full flex items-center justify-between transition-all pointer-events-auto
            ${isScrolled ? "border-white/40 backdrop-blur-xl dropdown-shadow px-6" : "border-border/10 backdrop-blur-md shadow-sm px-8 lg:px-12"}
          `}
        >
          {/* 1. Left: Desktop Navigation | Mobile: Hamburger */}
          <div className="hidden md:flex flex-1 items-center justify-start h-full">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-tight transition-all relative group py-2 ${pathname === link.href
                    ? "text-brand-teal"
                    : "text-brand-navy/70 hover:text-brand-navy"
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-teal origin-left transition-transform duration-300 rounded-full ${pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile: Logo on left */}
          <div className="md:hidden flex items-center">
            <Link href="/" className="flex items-center transition-transform hover:scale-105 active:scale-95">
              <Image src="/images/logo-main.png" alt="Velto Labs" width={144} height={36} className="h-9 w-auto" priority />
            </Link>
          </div>

          {/* 2. Center: Logo (desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <Link href="/" className="flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95">
              <Image src="/images/logo-main.png" alt="Velto Labs" width={192} height={48} className="h-10 lg:h-12 w-auto" priority />
            </Link>
          </div>

          {/* 3. Right: Action Button (desktop) | Hamburger (mobile) */}
          <div className="flex flex-1 items-center justify-end">
            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <Button
                asChild
                variant="default"
                size="sm"
                className={`
                  bg-brand-teal hover:bg-brand-teal-hover text-white font-semibold transition-all duration-300 hover:shadow-teal
                  ${isScrolled ? "rounded-full px-6 py-2 h-10 text-xs" : "rounded-2xl px-8 py-6 h-12 text-sm"}
                `}
              >
                <Link href="/contact#book" className="flex items-center">
                  Book Scan
                  <Calendar className={`ml-2 h-4 w-4 transition-transform duration-300 ${isScrolled ? "scale-75" : "scale-100"}`} />
                </Link>
              </Button>
            </div>

            {/* Mobile: Hamburger on right */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-brand-navy hover:bg-brand-teal/10 rounded-2xl transition-colors"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* ── Modern Mobile Navigation ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay - starts below the navbar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-0 z-10 bg-brand-navy/20 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden relative z-20 mt-2 mx-3 bg-white/95 backdrop-blur-2xl border border-brand-navy/5 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] pointer-events-auto overflow-hidden"
            >
              {/* Decorative top accent */}
              <div className="h-1 bg-gradient-to-r from-brand-teal via-brand-teal/60 to-brand-navy/30 rounded-t-3xl" />

              <div className="p-5">
                {/* Nav links */}
                <nav className="space-y-1.5">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.06, type: "spring", stiffness: 300, damping: 24 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold text-[15px] transition-all duration-200 group ${isActive
                            ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20"
                            : "text-brand-navy/70 hover:bg-brand-navy/[0.04] hover:text-brand-navy active:scale-[0.98]"
                            }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${isActive ? "bg-white/20" : "bg-brand-teal/8 group-hover:bg-brand-teal/12"
                            }`}>
                            <Icon size={18} className={isActive ? "text-white" : "text-brand-teal"} />
                          </div>
                          <span>{link.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="ml-auto w-2 h-2 rounded-full bg-white"
                            />
                          )}
                          {!isActive && (
                            <ArrowRight size={14} className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-200" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="my-4 h-px bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent origin-left"
                />

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-brand-navy to-brand-navy/90 hover:from-brand-navy/95 hover:to-brand-navy text-white rounded-2xl py-7 text-[15px] font-bold hover:shadow-xl transition-all duration-300 group"
                  >
                    <Link href="/contact#book" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2">
                      <ShieldCheck size={18} className="opacity-70" />
                      Book a Cyber Snapshot
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>

                {/* Trust footer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-[11px] text-brand-navy/30 font-medium mt-4 tracking-wide"
                >
                  Trusted by 50+ Australian organisations
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
