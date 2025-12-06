"use client";

import { motion } from "framer-motion";
import { Settings, Wrench, AlertTriangle } from "lucide-react";

export default function MaintenancePage() {
  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-lime-500/30">
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        <div className="relative flex justify-center mb-8">
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="text-lime-500/20"
           >
             <Settings size={120} strokeWidth={1} />
           </motion.div>
           
           <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] p-4 rounded-2xl border border-white/10 shadow-2xl"
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           >
             <Wrench size={32} className="text-lime-400" />
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-widest mb-4">
             <AlertTriangle size={12} /> Sistem Maintenance
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            SEDANG DALAM <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-500">PERBAIKAN</span>
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
            Kami sedang melakukan peningkatan sistem untuk memberikan pengalaman yang lebih baik. Website akan segera kembali normal.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-6 text-center text-[10px] text-gray-600 font-mono">
        ESTIMASI WAKTU SELESAI: <span className="text-gray-400">TIDAK DIKETAHUI</span>
      </div>
    </main>
  );
}