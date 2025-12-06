"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ComingSoon() {  
  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-lime-500/30">
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-900/20 border border-lime-500/30 backdrop-blur-md mb-8"
        >
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
           </span>
           <span className="text-[10px] font-bold text-lime-400 uppercase tracking-widest">SISTEM UPDATE</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          AKAN <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-500">HADIR</span> <br/> SEBENTAR LAGI.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-10"
        >
          Kami sedang membangun fitur baru yang akan mengubah cara Anda bekerja. Bersiaplah untuk pengalaman yang lebih baik.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
           <Link 
             href="/" 
             className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-lime-600 hover:bg-lime-500 text-black font-bold text-sm transition-all shadow-[0_0_20px_-5px_rgba(101,163,13,0.4)] active:scale-95 w-full sm:w-auto"
           >
             <Home size={18} /> Kembali ke Beranda
           </Link>
        </motion.div>

      </div>
    </main>
  );
}