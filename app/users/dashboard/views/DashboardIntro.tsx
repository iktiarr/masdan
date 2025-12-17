"use client";
import { motion } from "framer-motion";

interface Props {
  nama: string;
  onStart: () => void;
}

export default function DashboardIntro({ nama, onStart }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6"
    >
      <div className="p-4 bg-lime-100 dark:bg-lime-900/30 rounded-full animate-bounce">
        <span className="text-4xl">👋</span>
      </div>
      <div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
          Halo, <span className="text-lime-600 dark:text-lime-500">{nama}</span>!
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Selamat datang di panel admin Anda. Pilih menu di samping atau klik tombol di bawah untuk memulai.
        </p>
      </div>
      <button 
        onClick={onStart}
        className="px-6 py-3 bg-foreground text-background font-bold rounded-full hover:opacity-90 transition-opacity"
      >
        Mulai Akses Home &rarr;
      </button>
    </motion.div>
  );
}