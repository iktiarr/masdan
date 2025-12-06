"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Sparkles, Beaker, Bell, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function NewFeaturePage() {
  const [email, setEmail] = useState("");
  const [isNotified, setIsNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsNotified(true);
      // Disini bisa tambah logic simpan email ke database
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-lime-500/30">
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* CARD UTAMA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0a150a]/80 backdrop-blur-xl border border-lime-500/20 rounded-3xl p-8 text-center shadow-2xl shadow-lime-900/20 relative overflow-hidden"
        >
           
           {/* Aksen Garis Atas */}
           <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-lime-500 to-transparent opacity-50"></div>

           {/* 1. IKON ANIMASI (LAB / EXPERIMENT) */}
           <div className="relative flex justify-center mb-8 mt-4">
              {/* Lingkaran Berdenyut */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-lime-500/20 rounded-full animate-ping opacity-20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-lime-500/10 rounded-full"></div>
              
              {/* Ikon Utama */}
              <div className="relative bg-[#020a02] border border-lime-500/30 p-4 rounded-2xl shadow-lg">
                 <Beaker size={32} className="text-lime-400" />
                 <motion.div 
                   className="absolute -top-1 -right-1 text-yellow-400"
                   animate={{ rotate: [0, 10, -10, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 >
                    <Sparkles size={16} fill="currentColor" />
                 </motion.div>
              </div>
           </div>

           {/* 2. TEXT CONTENT */}
           <div className="space-y-3 mb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-[10px] font-bold text-lime-400 uppercase tracking-widest">
                 Fitur Beta
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Fitur Baru Sedang <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-500">Diracik.</span>
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed">
                Kami sedang menyiapkan sesuatu yang spesial untuk meningkatkan pengalaman Anda. Fitur ini akan segera tersedia.
              </p>
           </div>

           {/* 4. FOOTER INFO */}
           <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
              <div className="flex justify-between text-[10px] text-gray-500 font-mono uppercase">
                 <span>Status: Dalam Proses Pembuatan</span>
                 <span className="text-lime-500 animate-pulse">● Cetak Biru</span>
              </div>
           </div>

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
    </main>
  );
}
