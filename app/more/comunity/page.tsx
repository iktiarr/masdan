"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, MessageCircle, ArrowRight, ExternalLink, Mic, Heart, Globe
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 

// --- DATA (TETAP DI SINI) ---
const PLATFORMS = [
  {
    name: "Discord Server",
    desc: "Ruang diskusi realtime, voice chat untuk gaming/coding, dan showcase project harian.",
    icon: Mic,
    // Styling Light/Dark
    iconColor: "text-indigo-600 dark:text-indigo-400",
    iconBg: "bg-indigo-100 dark:bg-indigo-500/10",
    borderColor: "hover:border-indigo-500/50",
    shadowColor: "hover:shadow-indigo-500/10",
    link: "https://discord.gg/HGcjpWvCm"
  },
  {
    name: "Telegram Group",
    desc: "Notifikasi update tercepat, diskusi ringan, dan jejaring santai antar developer.",
    icon: MessageCircle,
    // Styling Light/Dark
    iconColor: "text-sky-600 dark:text-sky-400",
    iconBg: "bg-sky-100 dark:bg-sky-500/10",
    borderColor: "hover:border-sky-500/50",
    shadowColor: "hover:shadow-sky-500/10",
    link: "https://t.me/+Nqxc9NYBc2g1MDE1"
  },
  {
    name: "GitHub Discussions",
    desc: "Tempat bertanya masalah teknis, request fitur, dan kontribusi open source.",
    icon: Globe, // Ganti icon agar variatif
    // Styling Light/Dark
    iconColor: "text-gray-700 dark:text-gray-300",
    iconBg: "bg-gray-200 dark:bg-white/10",
    borderColor: "hover:border-gray-500/50",
    shadowColor: "hover:shadow-gray-500/10",
    link: "https://github.com"
  },
];

const CONTRIBUTORS = [
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026302d",
  "https://i.pravatar.cc/150?u=a04258a2462d826712d",
  "https://i.pravatar.cc/150?u=a04258a2462d826712e",
];

export default function CommunityPage() {
  
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 px-4 md:px-8 flex flex-col">
        
        <SimpleHeader title="Community" />

        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
           <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col">
          
          {/* --- HEADER SECTION --- */}
          <div className="mb-20 space-y-6" data-aos="fade-down">
             <motion.h1 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-6xl text-center font-black tracking-tighter text-gray-900 dark:text-white"
             >
               Connect. Collaborate. <br className="hidden md:block"/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Grow Together.</span>
             </motion.h1>
             
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg leading-relaxed"
             >
               Temukan tempatmu di komunitas ini. Berdiskusi, berbagi kode, dan bangun portofolio bersama developer lain yang memiliki visi sama.
             </motion.p>
          </div>

          {/* --- GRID PLATFORMS --- */}
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
                 className={`group relative bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${item.borderColor} ${item.shadowColor}`}
               >
                  <div className="flex justify-between items-start mb-6">
                     <div className={`p-4 rounded-2xl ${item.iconBg} ${item.iconColor} ring-1 ring-inset ring-black/5 dark:ring-white/5`}>
                        <item.icon size={32} />
                     </div>
                     <div className="p-2 rounded-full bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 group-hover:bg-lime-500 group-hover:text-black transition-colors duration-300">
                        <ExternalLink size={20} />
                     </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-base text-gray-500 dark:text-gray-400 mb-8 leading-relaxed min-h-[5rem]">
                    {item.desc}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                     <span>Gabung Sekarang</span>
                     <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform text-lime-500" />
                  </div>
               </motion.a>
             ))}
          </div>

          {/* --- FOOTER (Hall of Fame) --- */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-auto text-center border-t border-gray-200 dark:border-white/5 pt-16 pb-8"
          >
             <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-lime-600 dark:text-lime-400 mb-2">
                   <Heart size={20} className="fill-current animate-pulse" />
                   <span className="font-bold tracking-widest text-xs uppercase">Hall of Fame</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Terima Kasih Kontributor</h3>
                
                <div className="flex -space-x-4 mt-4 mb-6 justify-center">
                   {CONTRIBUTORS.map((src, i) => (
                     <div key={i} className="w-14 h-14 rounded-full border-4 border-gray-50 dark:border-[#0a0a0a] overflow-hidden transition-transform hover:-translate-y-2 hover:z-10 hover:scale-110 relative z-0 shadow-sm">
                        <img src={src} alt="Contributor" className="w-full h-full object-cover" />
                     </div>
                   ))}
                   <div className="w-14 h-14 rounded-full border-4 border-gray-50 dark:border-[#0a0a0a] bg-lime-100 dark:bg-lime-900/50 text-lime-700 dark:text-lime-400 flex items-center justify-center text-sm font-bold relative z-0 backdrop-blur-sm shadow-sm">
                      +40
                   </div>
                </div>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                   Membangun ekosistem ini bersama-sama. Ingin wajahmu ada di sini? Mulailah berkontribusi di GitHub kami.
                </p>
             </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  );
}