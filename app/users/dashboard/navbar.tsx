"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NavbarProps {
  nama: string;
  onLogout?: () => void; // Kita buat opsional karena logout sudah ada di Sidebar
}

export default function Navbar({ nama }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("Selamat Datang");

  // Efek Sapaan Berdasarkan Waktu
  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 11) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 18) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");
  }, []);

  if (!mounted) return null;

  return (
    // Sticky: Menempel di atas saat scroll
    // z-30: Di atas konten, tapi di bawah Sidebar Mobile (biasanya z-40/50)
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6 md:px-10">
        
        {/* BAGIAN KIRI: Sapaan & Nama (Animasi) */}
        <div className="flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider"
          >
            {greeting} <Sparkles size={12} className="text-yellow-500 animate-pulse" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl font-bold bg-gradient-to-r from-lime-600 to-emerald-600 dark:from-lime-400 dark:to-emerald-400 bg-clip-text text-transparent truncate max-w-[200px] md:max-w-md"
          >
            {nama || "Pengguna"}
          </motion.h2>
        </div>

        {/* BAGIAN KANAN: Tombol Tema */}
        <div className="flex items-center gap-4">
          <motion.div
             whileHover={{ scale: 1.1, rotate: 15 }}
             whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border-gray-200 dark:border-white/10 bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 shadow-sm"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>
        </div>
        
      </div>
    </header>
  );
}