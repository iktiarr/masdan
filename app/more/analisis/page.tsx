"use client";

import { motion } from "framer-motion";
import { 
  Download, Users, Globe, Code2, 
  Star, Zap, CheckCircle2, BarChart2, // CheckCircle2 sudah ditambahkan disini
  ArrowUpRight, Server
} from "lucide-react";

// --- DUMMY DATA PUBLIC ---
const HERO_STATS = [
  { label: "Total Downloads", value: "1,240+", desc: "Aset digital digunakan", icon: Download, color: "text-lime-400", bg: "bg-lime-500/10" },
  { label: "Happy Developers", value: "850+", desc: "Klien puas", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Countries Reached", value: "12", desc: "Pengguna global", icon: Globe, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "System Uptime", value: "99.9%", desc: "Selalu online", icon: Server, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const TECH_USAGE = [
  { name: "React / Next.js", percent: 65, color: "bg-blue-500" },
  { name: "TypeScript", percent: 80, color: "bg-blue-400" },
  { name: "Tailwind CSS", percent: 90, color: "bg-cyan-400" },
  { name: "Node.js", percent: 45, color: "bg-green-500" },
  { name: "Python", percent: 30, color: "bg-yellow-500" },
];

const POPULAR_CATEGORIES = [
  { name: "Admin Dashboard Templates", count: 450, trend: "+12%" },
  { name: "E-Commerce UI Kits", count: 320, trend: "+8%" },
  { name: "Landing Page Sections", count: 210, trend: "+5%" },
];

const TOP_COUNTRIES = [
  { country: "Indonesia", users: "65%", flag: "🇮🇩" },
  { country: "United States", users: "15%", flag: "🇺🇸" },
  { country: "Singapore", users: "10%", flag: "🇸🇬" },
  { country: "Others", users: "10%", flag: "🌍" },
];

export default function PublicAnalytics() {
  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans p-6 md:p-12 overflow-hidden selection:bg-lime-500/30">
      
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[150px]"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-12 text-center md:text-left">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <BarChart2 size={12} /> Open Metrics
           </div>
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
             Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">Statistics</span>
           </h1>
           <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
             Transparansi adalah kunci. Berikut adalah data performa produk dan jangkauan komunitas kami secara real-time.
           </p>
        </div>

        {/* --- 1. HERO STATS (GRID 4) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {HERO_STATS.map((stat, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-[#0a150a] border border-lime-900/30 rounded-2xl p-5 hover:border-lime-500/30 transition-all group"
             >
                <div className="flex items-center justify-between mb-4">
                   <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon size={20} />
                   </div>
                   {idx === 0 && <Zap size={16} className="text-yellow-400 animate-pulse" />}
                </div>
                <h3 className="text-3xl font-bold text-white mb-1 font-mono">{stat.value}</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-[10px] text-gray-600">{stat.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* --- 2. CONTENT GRID (VISUALISASI) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* KOLOM KIRI: Tech Stack & Kategori (Lebar 2) */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* TECH STACK USAGE (Bar Chart CSS) */}
              <div className="bg-[#0a150a] border border-lime-900/30 rounded-2xl p-6 md:p-8">
                 <div className="flex items-center gap-3 mb-6">
                    <Code2 className="text-lime-400" size={20} />
                    <h3 className="font-bold text-white text-lg">Teknologi yang Digunakan</h3>
                 </div>
                 <div className="space-y-5">
                    {TECH_USAGE.map((tech, i) => (
                      <div key={i}>
                         <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                            <span>{tech.name}</span>
                            <span>{tech.percent}% Projects</span>
                         </div>
                         <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.percent}%` }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className={`h-full rounded-full ${tech.color} relative`}
                            >
                               <div className="absolute inset-0 bg-white/20"></div>
                            </motion.div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* POPULAR CATEGORIES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {POPULAR_CATEGORIES.map((cat, i) => (
                   <div key={i} className="bg-[#0a150a] border border-lime-900/30 rounded-xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-10">
                         <Star size={40} />
                      </div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Trending #{i+1}</p>
                      <h4 className="text-sm font-bold text-white mb-3 line-clamp-2">{cat.name}</h4>
                      <div className="flex items-end gap-2">
                         <span className="text-xl font-bold text-lime-400">{cat.count}</span>
                         <span className="text-[10px] text-emerald-500 mb-1 flex items-center">
                           <ArrowUpRight size={10} /> {cat.trend}
                         </span>
                      </div>
                   </div>
                 ))}
              </div>

           </div>

           {/* KOLOM KANAN: Geography & Trust (Lebar 1) */}
           <div className="lg:col-span-1 space-y-8">
              
              {/* VISITOR GEOGRAPHY */}
              <div className="bg-[#0a150a] border border-lime-900/30 rounded-2xl p-6">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Globe size={18} className="text-blue-400"/> Top Countries
                    </h3>
                 </div>
                 <div className="space-y-4">
                    {TOP_COUNTRIES.map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                         <div className="flex items-center gap-3">
                            <span className="text-lg">{c.flag}</span>
                            <span className="text-sm font-medium text-gray-300">{c.country}</span>
                         </div>
                         <span className="text-xs font-bold text-lime-400">{c.users}</span>
                      </div>
                    ))}
                 </div>
                 <div className="mt-6 pt-4 border-t border-white/5 text-center">
                    <p className="text-[10px] text-gray-500">Data berdasarkan IP pengunjung unik.</p>
                 </div>
              </div>

              {/* QUALITY BADGE */}
              <div className="bg-gradient-to-br from-lime-900/20 to-emerald-900/20 border border-lime-500/20 rounded-2xl p-6 text-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-500 to-emerald-500"></div>
                 <CheckCircle2 size={32} className="text-lime-400 mx-auto mb-3" />
                 <h3 className="font-bold text-white text-lg mb-1">100% Verified Code</h3>
                 <p className="text-xs text-gray-400 leading-relaxed">
                   Setiap produk yang dirilis telah melewati proses testing ketat untuk memastikan kualitas & keamanan.
                 </p>
              </div>

           </div>

        </div>

        {/* FOOTER TIMESTAMP */}
        <div className="mt-12 text-center">
           <p className="text-[10px] text-gray-600 font-mono uppercase">
             Last Updated: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
           </p>
        </div>

      </div>
    </main>
  );
}