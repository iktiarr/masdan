"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, LogOut, Sun, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("hero");
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Product" },
    { id: "media", label: "Media" },
  ];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 100;
      const sections = navItems.map(item => document.getElementById(item.id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(id);
        }, 100);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsBurgerOpen(false);
    }
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-white/5"
          : "bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border-b border-black/5 dark:border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        <button
          onClick={() => scrollToSection("hero")}
          aria-label="Kembali ke halaman atas"
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden group-hover:rotate-12 transition-transform">
            <Image
              src="/ikon_header.png"
              alt="Logo Masdan"
              width={32}
              height={32}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </button>

        <div className="hidden md:flex items-center gap-4">
          <nav aria-label="Navigasi utama" className="flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Menu ${item.label}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-black bg-lime-500/10 font-bold dark:text-lime-400 dark:bg-lime-500/10"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="h-6 w-px bg-gray-200 dark:bg-white/10" />

          {mounted && (
            <button
              aria-label="Toggle tema"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <Link
            href="/page/logout"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
          >
            <LogOut size={16} />
            Keluar
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          {mounted && (
            <button
              aria-label="Toggle tema"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <Sheet open={isBurgerOpen} onOpenChange={setIsBurgerOpen}>
            <SheetTrigger
              aria-label="Buka menu"
              className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
            >
              <Menu className="text-gray-800 dark:text-white w-6 h-6" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] bg-white dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-white/10 overflow-y-auto p-0 flex flex-col h-full"
            >
              <div className="p-5 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur border-b border-gray-100 dark:border-white/10">
                <span className="font-bold text-lg text-gray-900 dark:text-white">Menu Utama</span>
              </div>

              <nav className="p-4 space-y-1 flex-1" aria-label="Navigasi mobile">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      activeSection === item.id
                        ? "bg-lime-50 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400 font-bold"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                <Link
                  href="/page/logout"
                  onClick={() => setIsBurgerOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"
                >
                  <LogOut size={18} />
                  Log Out
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
