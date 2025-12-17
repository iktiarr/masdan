"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  Menu, LogOut, Sun, Moon, Search, X 
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Command as CommandPrimitive } from "cmdk"; 

import { navItems, getCommandGroups } from "@/app/information-menu/data_command_pallet_header";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  const [activeSection, setActiveSection] = useState("hero");
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [openCmd, setOpenCmd] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const commandGroups = getCommandGroups({
    router,
    setTheme,
    scrollToSection: (id) => scrollToSection(id)
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCmd((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
      setOpenCmd(false);
    }
  };

  const runCommand = (action: () => void) => {
    setOpenCmd(false);
    action();
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-white/5"
            : "bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border-b border-black/5 dark:border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
          <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg overflow-hidden group-hover:rotate-12 transition-transform">
              <Image src="/ikon_header.png" alt="Logo" width={32} height={32} className="object-cover w-full h-full" priority />
            </div>
          </button>

          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
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

            <button
              onClick={() => setOpenCmd(true)}
              className="group flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-transparent hover:border-lime-500/50 transition-all text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Search size={16} />
              <span className="hidden lg:inline">Cari...</span>
              <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 dark:border-white/10 bg-white dark:bg-black px-1.5 font-mono text-[10px] font-medium text-gray-500 dark:text-gray-400 opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            <Link
              href="/page/logout"
              className="flex items-center gap-2 px-4 py-2 rounded-full
                        bg-linear-to-r from-purple-600 via-pink-600 to-orange-500
                        text-white font-semibold text-sm
                        shadow-md shadow-pink-500/20
                        hover:shadow-pink-500/40 hover:scale-[1.03]
                        transition-all duration-200"
            >
              <LogOut size={16} />
              Whats In Here
            </Link>

          </div>

          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setOpenCmd(true)} className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300">
              <Search size={20} />
            </button>
            {mounted && (
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <Sheet open={isBurgerOpen} onOpenChange={setIsBurgerOpen}>
              <SheetTrigger className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10">
                <Menu className="text-gray-800 dark:text-white w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-white/10 overflow-y-auto p-0 flex flex-col h-full [&_button[aria-label='Close']]:hidden">
                 <nav className="p-4 space-y-1 flex-1">
                    {navItems.map((item) => (
                      <button key={item.id} onClick={() => scrollToSection(item.id)} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5">
                        {item.label}
                      </button>
                    ))}
                 </nav>

                 <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                    <Link
                      href="/page/logout"
                      onClick={() => setIsBurgerOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl
                                text-sm font-bold text-white
                                bg-linear-to-r from-purple-500 via-pink-500 to-orange-400
                                shadow-lg shadow-pink-500/20
                                hover:shadow-pink-500/40 hover:scale-[1.02]
                                transition-all duration-200 ease-out"
                    >
                      <LogOut size={18} />
                      Go To Instagram
                    </Link>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <CommandPrimitive.Dialog
        open={openCmd}
        onOpenChange={setOpenCmd}
        className="fixed inset-0 z-9999 flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4"
        onClick={(e) => { if(e.target === e.currentTarget) setOpenCmd(false) }}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10 animate-in fade-in duration-200" />
        
        <div className="w-full max-w-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          
          <div className="flex items-center border-b border-gray-100 dark:border-white/5 px-3">
            <Search className="mr-2 h-5 w-5 shrink-0 text-gray-500" />
            
            <CommandPrimitive.Input
              placeholder="Cari perintah atau halaman..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 dark:text-white"
            />
            
            <div className="hidden sm:flex text-[10px] bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-gray-500 font-mono">ESC</div>

            <button 
              onClick={() => setOpenCmd(false)}
              className="sm:hidden p-2 ml-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <CommandPrimitive.Empty className="py-6 text-center text-sm text-gray-500">
              Tidak ada hasil ditemukan.
            </CommandPrimitive.Empty>

            {commandGroups.map((group, idx) => (
              <React.Fragment key={idx}>
                <CommandPrimitive.Group heading={group.heading} className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1.5 mb-1">
                  {group.items.map((item, itemIdx) => (
                    <CommandPrimitive.Item
                      key={itemIdx}
                      onSelect={() => runCommand(item.action)}
                      className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none text-gray-700 dark:text-gray-200 aria-selected:bg-lime-500 aria-selected:text-white data-[selected=true]:bg-lime-500 data-[selected=true]:text-white transition-colors"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.Group>
                {idx < commandGroups.length - 1 && <CommandPrimitive.Separator className="my-1 h-px bg-gray-100 dark:bg-white/5" />}
              </React.Fragment>
            ))}

          </CommandPrimitive.List>
        </div>
      </CommandPrimitive.Dialog>
    </>
  );
}