"use client";

import { motion } from "framer-motion";
import { GitCommit, Tag, Calendar, CheckCircle2, AlertCircle, Zap } from "lucide-react";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

// Import Data & Components
import { releasesData } from "@/app/information-menu/data_releases";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 

// Konfigurasi Style untuk Tipe Perubahan
const TYPE_STYLES: Record<string, { icon: any, color: string, bg: string, border: string }> = {
  new: { 
    icon: Zap, 
    color: "text-lime-600 dark:text-lime-400", 
    bg: "bg-lime-100 dark:bg-lime-500/10", 
    border: "border-lime-200 dark:border-lime-500/20" 
  },
  fix: { 
    icon: AlertCircle, 
    color: "text-red-600 dark:text-red-400", 
    bg: "bg-red-100 dark:bg-red-500/10", 
    border: "border-red-200 dark:border-red-500/20" 
  },
  update: { 
    icon: CheckCircle2, 
    color: "text-blue-600 dark:text-blue-400", 
    bg: "bg-blue-100 dark:bg-blue-500/10", 
    border: "border-blue-200 dark:border-blue-500/20" 
  },
  default: { 
    icon: CheckCircle2, 
    color: "text-gray-600 dark:text-gray-400", 
    bg: "bg-gray-100 dark:bg-white/5", 
    border: "border-gray-200 dark:border-white/10" 
  }
};

export default function ReleasesPage() {
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 px-4 md:px-8">
        
        <SimpleHeader title="System Logs" />

        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
           <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          
          {/* --- HEADER SECTION --- */}
          <div className="text-center md:text-left mb-16 space-y-4" data-aos="fade-down">
             <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
               Catatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Pembaruan</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-xl">
               Jejak pengembangan sistem, fitur baru, dan perbaikan teknis untuk meningkatkan kualitas platform.
             </p>
             
             {/* Divider */}
             <div className="w-full h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent mt-8 max-w-xs md:max-w-md" />
          </div>

          {/* --- TIMELINE LIST --- */}
          <div className="relative border-l border-gray-200 dark:border-white/10 ml-3 md:ml-6 space-y-12 pb-20">
             {releasesData.map((release, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="relative pl-8 md:pl-12"
               >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full border-2 bg-gray-50 dark:bg-[#0a0a0a] ${release.isLatest ? 'border-lime-500 shadow-[0_0_10px_rgba(132,204,22,0.6)]' : 'border-gray-300 dark:border-gray-600'}`} />

                  {/* Card Content */}
                  <div className={`rounded-2xl border p-6 transition-all duration-300 group ${release.isLatest ? 'bg-white dark:bg-[#0a150a] border-lime-500/30 shadow-xl shadow-lime-500/5' : 'bg-white dark:bg-[#121212] border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10'}`}>
                     
                     {/* Card Header */}
                     <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                           <div className={`p-2 rounded-lg ${release.isLatest ? "bg-lime-100 dark:bg-lime-500/20 text-lime-600 dark:text-lime-400" : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"}`}>
                              <Tag size={18} />
                           </div>
                           <div>
                              <div className="flex items-center gap-2">
                                 <span className="text-xl font-bold font-mono text-gray-900 dark:text-white">{release.version}</span>
                                 {release.isLatest && (
                                   <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-lime-500 text-white dark:text-black uppercase tracking-wider shadow-sm">Latest</span>
                                 )}
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5 font-medium">
                                 <Calendar size={12} /> {release.date}
                              </span>
                           </div>
                        </div>
                     </div>

                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{release.title}</h3>

                     {/* Changes List */}
                     <div className="space-y-3 bg-gray-50 dark:bg-black/20 rounded-xl p-4 border border-gray-100 dark:border-white/5">
                        {release.changes.map((change: any, cIdx: number) => {
                          const style = TYPE_STYLES[change.type] || TYPE_STYLES.default;
                          const Icon = style.icon;
                          
                          return (
                            <div key={cIdx} className="flex items-start gap-3">
                               <div className={`mt-0.5 shrink-0 p-1 rounded border ${style.bg} ${style.border} ${style.color}`}>
                                  <Icon size={12} />
                               </div>
                               <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug pt-0.5">
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

      <Footer />
    </>
  );
}