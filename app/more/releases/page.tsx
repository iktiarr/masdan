"use client";

import { motion } from "framer-motion";
import { GitCommit, Tag, Calendar, ArrowLeft, CheckCircle2, AlertCircle, Zap } from "lucide-react";
import Link from "next/link";
import TombolKembali from "@/app/asset/tombol_kembali";

const RELEASES = [
  {
    version: "v1.0.1-build.2025.12",
    date: "8 Desember 2025",
    title: "Perbaikan bug dan kesalahan",
    isLatest: true,
    changes: [
      { type: "update", text: "Memperbaharui desain banner ads agar lebih sesuai" },
      { type: "fix", text: "Memperbaiki kesalahan kode" }
    ]
  },
  {
    version: "v1.0.0-build.2025.12",
    date: "7 Desember 2025",
    title: "Peluncuran Perdana",
    isLatest: false,
    changes: [
      { type: "new", text: "Halaman utama" },
    ]
  }
];

const TYPE_STYLES: Record<string, { icon: any, color: string, border: string }> = {
  new: { icon: Zap, color: "text-lime-400", border: "border-lime-500/20 bg-lime-500/10" },
  fix: { icon: AlertCircle, color: "text-red-400", border: "border-red-500/20 bg-red-500/10" },
  update: { icon: CheckCircle2, color: "text-blue-400", border: "border-blue-500/20 bg-blue-500/10" },
  default: { icon: CheckCircle2, color: "text-gray-400", border: "border-gray-500/20 bg-gray-500/10" }
};

export default function ReleasesPage() {
  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans selection:bg-lime-500/30 py-12 px-6">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
         <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="mb-12">
          <TombolKembali/>
        </div>

        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-[10px] font-bold uppercase tracking-widest">
             <GitCommit size={12} /> System Logs
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Catatan <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-500">Pembaruan</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-xl">
            Jejak pengembangan sistem, fitur baru, dan perbaikan teknis untuk meningkatkan kualitas platform.
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12 pb-20">
           {RELEASES.map((release, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="relative pl-8 md:pl-12"
             >
                <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 ${release.isLatest ? 'bg-lime-500 border-lime-500 shadow-[0_0_15px_rgba(132,204,22,0.6)]' : 'bg-[#020a02] border-gray-600'}`} />

                <div className={`rounded-2xl border p-6 transition-all duration-300 ${release.isLatest ? 'bg-[#0a150a] border-lime-500/30 shadow-lg shadow-lime-900/10' : 'bg-[#050a05] border-white/5 hover:border-white/10'}`}>
                   <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-lg ${release.isLatest ? "bg-lime-500/20 text-lime-400" : "bg-white/5 text-gray-400"}`}>
                            <Tag size={18} />
                         </div>
                         <div>
                            <div className="flex items-center gap-2">
                               <span className="text-xl font-bold font-mono text-white">{release.version}</span>
                               {release.isLatest && (
                                 <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-lime-500 text-black uppercase tracking-wider">Latest</span>
                               )}
                            </div>
                            <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                               <Calendar size={10} /> {release.date}
                            </span>
                         </div>
                      </div>
                   </div>

                   <h3 className="text-lg font-bold text-white mb-2">{release.title}</h3>

                   <div className="space-y-3 bg-black/20 rounded-xl p-4 border border-white/5">
                      {release.changes.map((change, cIdx) => {
                        const style = TYPE_STYLES[change.type] || TYPE_STYLES.default;
                        const Icon = style.icon;
                        return (
                          <div key={cIdx} className="flex items-start gap-3">
                             <div className={`mt-0.5 shrink-0 p-1 rounded border ${style.border} ${style.color}`}>
                                <Icon size={14} />
                             </div>
                             <p className="text-sm text-gray-300 leading-snug pt-0.5">
                               {change.text}
                             </p>
                          </div>
                        );
                      })}
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </main>
  );
}