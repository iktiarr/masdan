'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Rocket, Zap, CheckCircle2 } from 'lucide-react';

// --- KONFIGURASI UPDATE ---
const CURRENT_VERSION = 'v1.3.0'; // Ganti versi agar popup muncul lagi
const UPDATES = [
  {
    title: "Arsip Dokumen Digital",
    desc: "Fitur baru untuk preview sertifikat & dokumen secara langsung tanpa download.",
    type: "New", 
  },
  {
    title: "Track Record UI",
    desc: "Tampilan riwayat pendidikan kini lebih interaktif dengan peta lokasi.",
    type: "Update",
  },
  {
    title: "Clean Design System",
    desc: "Perbaikan padding dan layout pada mode mobile agar lebih responsif.",
    type: "Fix",
  },
  {
    title: "Sistem Maintenance",
    desc: "Peningkatan keamanan dan stabilitas pada mode pemeliharaan server.",
    type: "Fix",
  },
];

const UpdatePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Cek localStorage
    const seenVersion = localStorage.getItem('app_version_seen');
    
    if (seenVersion !== CURRENT_VERSION) {
      // Delay sedikit agar animasi masuk lebih mulus
      const timer = setTimeout(() => setIsOpen(true), 1000);
      
      // Matikan scroll pada body saat popup muncul
      document.body.style.overflow = 'hidden';
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('app_version_seen', CURRENT_VERSION);
    // Hidupkan kembali scroll pada body
    document.body.style.overflow = 'auto';
  };

  if (!isOpen) return null;

  return (
    // Backdrop: z-index tinggi, background gelap pekat
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Container: 
          - max-w-lg (mobile/tablet)
          - md:max-w-2xl (desktop lebih lebar) 
      */}
      <div className="relative w-full max-w-lg md:max-w-2xl bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl border border-neutral-200 dark:border-white/10 overflow-hidden transform transition-all scale-100">
        
        {/* Dekorasi Header */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-lime-500/10 to-transparent pointer-events-none"></div>
        
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-gray-100 dark:border-white/5">
           {/* Icon Besar */}
           <div className="flex-shrink-0 w-16 h-16 bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400 rounded-2xl flex items-center justify-center shadow-lg shadow-lime-500/20">
              <Rocket size={32} className="animate-pulse" />
           </div>

           {/* Title Text */}
           <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Update <span className="text-lime-500">{CURRENT_VERSION}</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-base leading-relaxed">
                Kami baru saja merilis beberapa fitur baru dan perbaikan untuk meningkatkan pengalaman Anda.
              </p>
           </div>
        </div>

        {/* Content Area 
            - Menggunakan Grid pada desktop agar meminimalisir scroll ke bawah
        */}
        <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-[#111]/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
            {UPDATES.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-lime-500/40 transition-colors shadow-sm">
                <div className="mt-1 flex-shrink-0">
                  {item.type === 'New' && <Sparkles size={20} className="text-lime-500" />}
                  {item.type === 'Update' && <Zap size={20} className="text-blue-500" />}
                  {item.type === 'Fix' && <CheckCircle2 size={20} className="text-orange-500" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border 
                      ${item.type === 'New' ? 'bg-lime-100 text-lime-700 border-lime-200 dark:bg-lime-900/30 dark:text-lime-400 dark:border-lime-500/20' : 
                        item.type === 'Update' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500/20' :
                        'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-500/20'
                      }`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer / Button Area */}
        <div className="p-6 md:p-8 pt-0 bg-gray-50/50 dark:bg-[#111]/50 border-t border-gray-100 dark:border-white/5">
          <button 
            onClick={handleClose}
            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black text-lg rounded-2xl hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-lime-500/10 hover:shadow-lime-500/20"
          >
            Siap, Saya Mengerti! 🚀
          </button>
        </div>

      </div>

      {/* Style Scrollbar tipis agar rapi */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #525252;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default UpdatePopup;