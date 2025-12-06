"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, AlertTriangle, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-lime-500/30">
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
           <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-linear-to-b from-lime-400 to-transparent leading-none select-none opacity-50 font-mono">
             404
           </h1>

           <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a150a] border border-lime-500/30 p-4 rounded-2xl shadow-2xl shadow-lime-500/10"
             animate={{ y: [-10, 10, -10] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           >
             <AlertTriangle size={48} className="text-lime-500" />
           </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="space-y-4 mt-6"
        >
           <h2 className="text-2xl md:text-4xl font-bold text-white">
             Halaman Tidak Ditemukan
           </h2>
           <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
             Sepertinya Anda tersesat. Halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau diubah.
           </p>
        </motion.div>

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

      <div className="absolute bottom-8 text-center font-mono text-[10px] text-lime-900/50">
         ERROR_CODE:  HALAMAN_TIDAK_DITEMUKAN_404
      </div>

    </main>
  );
}