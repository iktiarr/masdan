"use client";

import { motion } from "framer-motion";
import { 
  Users, MessageCircle, Github, ArrowRight, 
  ArrowLeft, ExternalLink, Mic, Heart
} from "lucide-react";
import Link from "next/link";

const PLATFORMS = [
  {
    name: "Discord Server",
    desc: "Ruang diskusi realtime, voice chat untuk gaming/coding, dan showcase project harian.",
    icon: Mic,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "group-hover:border-indigo-500/50",
    glow: "group-hover:shadow-indigo-500/20",
    link: "https://discord.gg/HGcjpWvCm"
  },
  {
    name: "Telegram Group",
    desc: "Notifikasi update tercepat, diskusi ringan, dan jejaring santai antar developer.",
    icon: MessageCircle,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "group-hover:border-sky-500/50",
    glow: "group-hover:shadow-sky-500/20",
    link: "https://t.me/+Nqxc9NYBc2g1MDE1"
  },
];

const CONTRIBUTORS = [
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026302d",
  "https://i.pravatar.cc/150?u=a04258a2462d826712d",
  "https://i.pravatar.cc/150?u=a04258a2462d826712d",
];

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans selection:bg-lime-500/30 py-12 px-6 flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
         <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {/* TOMBOL KEMBALI */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-lime-500/20 hover:border-lime-500/50 transition-all duration-300 group backdrop-blur-sm">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-lime-400" />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Kembali ke Beranda</span>
          </Link>
        </div>
        
        {/* HEADER (Rata Kiri) */}
        <div className="mb-20 space-y-6"> {/* Hapus text-center */}
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-900/20 border border-lime-500/30 backdrop-blur-md"
           >
             <Users size={14} className="text-lime-400" />
             <span className="text-[10px] font-bold text-lime-400 uppercase tracking-widest">Join The Ecosystem</span>
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-extrabold tracking-tight"
           >
             Connect. Collaborate. <br/>
             <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-500">Grow Together.</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-gray-400 max-w-2xl text-lg leading-relaxed" // Hapus mx-auto
           >
             Temukan tempatmu di komunitas ini. Berdiskusi, berbagi kode, dan bangun portofolio bersama developer lain yang memiliki visi sama.
           </motion.p>
        </div>

        {/* GRID PLATFORMS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
           {PLATFORMS.map((item, idx) => (
             <motion.a
               key={idx}
               href={item.link}
               target="_blank"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className={`group relative bg-[#0a150a] border border-lime-900/30 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${item.border} ${item.glow}`}
             >
                <div className="flex justify-between items-start mb-6">
                   <div className={`p-4 rounded-2xl ${item.bg} ${item.color} ring-1 ring-white/5`}>
                      <item.icon size={32} />
                   </div>
                   <div className="p-2 rounded-full bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-white transition-colors">
                      <ExternalLink size={20} />
                   </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-lime-400 transition-colors">{item.name}</h3>
                <p className="text-base text-gray-400 mb-8 leading-relaxed min-h-20">{item.desc}</p>
                
                <div className="flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                   <span>Gabung Sekarang</span>
                   <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
             </motion.a>
           ))}
        </div>

        {/* FOOTER (Hall of Fame) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-auto text-center border-t border-white/5 pt-16 pb-8"
        >
           <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-lime-400 mb-2">
                 <Heart size={20} className="fill-lime-400 animate-pulse" />
                 <span className="font-bold tracking-widest text-xs uppercase">Hall of Fame</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Terima Kasih Kontributor</h3>
              
              <div className="flex -space-x-4 mt-4 mb-6">
                 {CONTRIBUTORS.map((src, i) => (
                   <div key={i} className="w-14 h-14 rounded-full border-4 border-[#020a02] overflow-hidden transition-transform hover:-translate-y-2 hover:z-10 hover:scale-110 relative z-0">
                      <img src={src} alt="Contributor" className="w-full h-full object-cover" />
                   </div>
                 ))}
                 <div className="w-14 h-14 rounded-full border-4 border-[#020a02] bg-lime-900/50 text-lime-400 flex items-center justify-center text-sm font-bold relative z-0 backdrop-blur-sm">
                    +40
                 </div>
              </div>
              
              <p className="text-gray-500 text-sm max-w-md">
                 Membangun ekosistem ini bersama-sama. Ingin wajahmu ada di sini? Mulailah berkontribusi di GitHub kami.
              </p>
           </div>
        </motion.div>
      </div>
    </main>
  );
}