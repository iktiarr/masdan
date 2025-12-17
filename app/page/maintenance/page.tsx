"use client";

import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  Database, 
  LayoutTemplate, 
  ShieldCheck, 
  Zap, 
  Loader2 
} from "lucide-react";

const maintenanceTasks = [
  {
    id: 1,
    icon: Database,
    title: "Memperbaiki masalah data",
    status: "Sedang Proses",
    color: "text-blue-400",
  },
  {
    id: 2,
    icon: Zap,
    title: "Optimasi Performa Server",
    status: "Sedang Proses",
    color: "text-yellow-400",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Patch Keamanan Sistem Diperbarui",
    status: "Sedang Proses",
    color: "text-emerald-400",
  },
  {
    id: 4,
    icon: LayoutTemplate,
    title: "Memperbaiki Tampilan Yang Salah",
    status: "Sedang Proses",
    color: "text-purple-400",
  },
];

export default function MaintenancePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-lime-500/30">
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-widest mb-4">
             <AlertTriangle size={12} /> Sistem Maintenance
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            SEDANG DALAM <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-500">PERBAIKAN</span>
          </h1>
          
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
            Kami sedang melakukan peningkatan sistem untuk memberikan pengalaman yang lebih baik. Berikut detail pengerjaan saat ini:
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full grid gap-3"
        >
          {maintenanceTasks.map((task) => (
            <motion.div 
              key={task.id} 
              variants={item}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-lime-500/30 transition-all group backdrop-blur-sm"
            >

              <div className={`p-2 rounded-lg bg-white/5 ${task.color} group-hover:scale-110 transition-transform`}>
                <task.icon size={18} />
              </div>

              <div className="flex-1 text-left">
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                  {task.title}
                </h3>
                <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                  STATUS: <span className={task.status === "Selesai" ? "text-emerald-400" : "text-yellow-500/80"}>{task.status.toUpperCase()}</span>
                </p>
              </div>

              <div className="text-gray-500">
                {task.status === "Sedang Proses" ? (
                  <Loader2 size={16} className="animate-spin text-lime-500" />
                ) : task.status === "Selesai" ? (
                   <ShieldCheck size={16} className="text-emerald-500" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <div className="absolute bottom-6 text-center text-[10px] text-gray-600 font-mono">
        ESTIMASI WAKTU SELESAI: <span className="text-gray-400 animate-pulse">SEGERA</span>
      </div>
    </main>
  );
}