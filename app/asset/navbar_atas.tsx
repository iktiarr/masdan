"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface SimpleHeaderProps {
  title?: string; // Judul bersifat opsional
}

export default function SimpleHeader({ title }: SimpleHeaderProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mencegah error hidrasi (Hydration Mismatch) pada icon tema
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md transition-colors duration-300"
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* --- 1. TOMBOL KEMBALI --- */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 px-3 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-bold hidden md:block">Kembali</span>
        </button>

        {/* --- 2. JUDUL (OPSIONAL) --- */}
        {title && (
          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-gray-900 dark:text-white capitalize truncate max-w-[50%] text-center">
            {title}
          </h1>
        )}

        {/* --- 3. TOMBOL TEMA --- */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-full text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-white/10"
          aria-label="Ganti Tema"
        >
          {mounted && theme === "dark" ? (
            <Sun size={20} className="fill-current" />
          ) : (
            <Moon size={20} className="fill-current text-gray-600" />
          )}
        </button>

      </div>
    </motion.header>
  );
}