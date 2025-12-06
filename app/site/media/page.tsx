"use client";

import { useState, useEffect } from "react";
import { 
  Instagram, Youtube, Linkedin, Facebook,
  Copy, Check, MessageCircle, AtSign, HeartHandshake, Mail, ArrowUpRight, Twitter, Send, Github
} from "lucide-react";
import AOS from "aos";

const SOCIALS = [
  {
    name: "Instagram",
    handle: "@iktiarramadani",
    link: "https://instagram.com/iktiarramadani",
    icon: Instagram,
    gradient: "from-fuchsia-500 to-pink-500",
    desc: "Daily Life & Creative",
  },
  {
    name: "YouTube",
    handle: "Abang Tiar",
    link: "https://www.youtube.com/@iktiarramadani",
    icon: Youtube,
    gradient: "from-red-500 to-orange-500",
    desc: "Tutorial & Edukasi",
  },
  {
    name: "TikTok",
    handle: "@iktiarramadani",
    link: "https://www.tiktok.com/@iktiarramadani",
    icon: ({ className }: { className?: string }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
    ),
    gradient: "from-black to-gray-800",
    desc: "Shorts & Fun",
  },
  {
    name: "Threads",
    handle: "@iktiarramadani",
    link: "https://www.threads.net/@iktiarramadani",
    icon: AtSign,
    gradient: "from-gray-700 to-black",
    desc: "Thoughts & Ideas",
  },
  {
    name: "LinkedIn",
    handle: "Iktiar Ramadani",
    link: "https://www.linkedin.com/in/iktiarramadani",
    icon: Linkedin,
    gradient: "from-blue-600 to-cyan-500",
    desc: "Professional Network",
  },
  {
    name: "Facebook",
    handle: "Iktiar Ramadani",
    link: "https://facebook.com/iktiar.ramadani.5",
    icon: Facebook,
    gradient: "from-blue-600 to-indigo-600",
    desc: "Social Community",
  },
];

export default function MediaPage() {
  const EMAIL = "irofficialfeedback@gmail.com"; 
  const WA_PHONE = "6285143875550";
  const BANK_INFO = {
    bankName: "BANK JAGO",
    accountNumber: "1081 1120 3480",
    accountName: "Iktiar Ramadani"
  };

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
  }, []);

  const handleCopy = async (text: string, type: 'email' | 'bank') => {
    let isSuccess = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        isSuccess = true;
      } catch (err) {
        console.warn("Clipboard API gagal, mencoba fallback...", err);
      }
    }

    if (!isSuccess) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        isSuccess = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (e) {
        console.error("Fallback copy gagal", e);
      }
    }

    if (isSuccess) {
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedBank(true);
        setTimeout(() => setCopiedBank(false), 2000);
      }
    } else {
      alert("Gagal menyalin otomatis. Silakan salin manual.");
    }
  };

  const handleWA = () => {
    const text = `Halo, saya ingin mendiskusikan keperluan bisnis/kolaborasi.`;
    window.open(`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <main id="media" className="relative min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans selection:bg-lime-500/30 flex items-center justify-center py-24 overflow-hidden transition-colors duration-300">
      <div className="relative w-full max-w-6xl z-10 px-6">
        <div className="text-center mb-16" data-aos="fade-down"> 
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 leading-tight">
             Ayo Terhubung <br/>
             <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-emerald-600">
               & Saling Kolaborasi
             </span>
           </h1>
           <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
             Jelajahi ekosistem digital saya. Temukan konten, diskusi, dan peluang kolaborasi di berbagai platform.
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {SOCIALS.map((social, idx) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              className="group relative col-span-1 lg:col-span-2 flex flex-col justify-between p-6 bg-white dark:bg-[#121212] rounded-4xl border border-gray-100 dark:border-white/5 overflow-hidden hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
               <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br ${social.gradient}`}></div>

               <div className="flex justify-between items-start relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors duration-500">
                     <social.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 backdrop-blur-sm">
                     <ArrowUpRight size={16} />
                  </div>
               </div>

               <div className="mt-8 relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-500">{social.name}</h3>
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 group-hover:text-white/80 transition-colors duration-500 mt-1">{social.desc}</p>
               </div>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
              data-aos="fade-up" data-aos-delay="200"
              className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] text-white p-8 md:p-10 shadow-2xl flex flex-col justify-between min-h-[280px] group border border-gray-800"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/20 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-2">Dukungan Anda.</h3>
                    <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                        Apresiasi dari Anda adalah bahan bakar untuk terus berkarya dan berbagi konten bermanfaat.
                    </p>
                </div>

                <div className="relative z-5 mt-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4 hover:bg-white/10 transition-colors">
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{BANK_INFO.bankName}</p>
                        <p className="text-xl font-mono font-bold text-white tracking-wide">{BANK_INFO.accountNumber}</p>
                        <p className="text-xs text-gray-400 mt-1">a.n {BANK_INFO.accountName}</p>
                    </div>
                    <button 
                        onClick={() => handleCopy(BANK_INFO.accountNumber, 'bank')}
                        className="p-3 rounded-xl bg-lime-500 text-black hover:bg-lime-400 transition-all active:scale-95 shadow-lg shadow-lime-900/20"
                    >
                        {copiedBank ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                </div>
            </div>

            <div 
              data-aos="fade-up" data-aos-delay="300"
              className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 p-8 md:p-10 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-500 flex flex-col justify-between min-h-[280px] group"
            >
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Kerja Sama.</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm leading-relaxed">
                        Tertarik mengundang saya sebagai pembantu kerja, konsultasi atau tawaran kolaborasi lainnya?
                    </p>
                </div>

                <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-3">
                    <button 
                        onClick={handleWA}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-lime-500 hover:bg-black dark:hover:bg-lime-400 text-white dark:text-black font-bold py-3.5 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-gray-200 dark:shadow-lime-900/20"
                    >
                        <MessageCircle size={18} /> WhatsApp
                    </button>
                    
                    <button 
                        onClick={() => handleCopy(EMAIL, 'email')}
                        className="flex-[1.5] flex items-center justify-between bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 py-3.5 px-5 rounded-xl transition-colors group/btn"
                    >
                        <div className="text-left overflow-hidden">
                            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Email Address</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{EMAIL}</p>
                        </div>
                        <div className="text-gray-400 dark:text-gray-500 group-hover/btn:text-lime-600 dark:group-hover/btn:text-lime-400 transition-colors">
                           {copiedEmail ? <Check size={18} /> : <Copy size={18} />}
                        </div>
                    </button>
                </div>
            </div>

        </div>
      </div>
    </main>
  );
}