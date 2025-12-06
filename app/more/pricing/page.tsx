"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, X, Zap, Crown, Briefcase, 
  ArrowLeft, HelpCircle, Star, Rocket, Shield 
} from "lucide-react";
import Link from "next/link";

// --- DATA PAKET ---
const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    price: "Rp 0",
    period: "/ selamanya",
    desc: "Akses dasar untuk pemula yang ingin mengintip materi.",
    icon: Star,
    highlight: false,
    features: [
      { text: "Akses Artikel Blog Dasar", active: true },
      { text: "Join Komunitas Discord (Public)", active: true },
      { text: "Newsletter Mingguan", active: true },
      { text: "Source Code Project Latihan", active: false },
      { text: "Sesi Mentoring Live", active: false },
      { text: "Rekaman Ulang Sesi", active: false },
      { text: "Jalur Pribadi (WhatsApp)", active: false },
    ]
  },
  {
    id: "weekly",
    name: "Sprint (Mingguan)",
    price: "Rp 150rb",
    period: "/ minggu",
    desc: "Cocok untuk yang butuh solusi cepat atau review kode sesaat.",
    icon: Zap,
    highlight: false,
    features: [
      { text: "Semua Fitur Starter", active: true },
      { text: "1x Sesi Mentoring (60 Menit)", active: true },
      { text: "Code Review (Max 1 Project)", active: true },
      { text: "Akses Rekaman Sesi", active: true },
      { text: "Prioritas Balasan Discord", active: true },
      { text: "Konsultasi Karir", active: false },
      { text: "Jalur Pribadi (WhatsApp)", active: false },
    ]
  },
  {
    id: "monthly",
    name: "Pro (Bulanan)",
    price: "Rp 500rb",
    period: "/ bulan",
    desc: "Paket paling populer. Belajar intensif dan terstruktur.",
    icon: Rocket,
    highlight: true, // BEST SELLER
    badge: "PALING LARIS",
    features: [
      { text: "4x Sesi Mentoring (60 Menit/sesi)", active: true },
      { text: "Unlimited Code Review", active: true },
      { text: "Akses Source Code Premium", active: true },
      { text: "Akses Discord VIP", active: true },
      { text: "Sertifikat Penyelesaian", active: true },
      { text: "Konsultasi Karir & CV Review", active: true },
      { text: "Jalur Pribadi (WhatsApp)", active: false },
    ]
  },
  {
    id: "yearly",
    name: "Master (Tahunan)",
    price: "Rp 4.5jt",
    period: "/ tahun",
    desc: "Hemat 25%. Komitmen jangka panjang untuk jadi expert.",
    icon: Crown,
    highlight: false,
    features: [
      { text: "48x Sesi Mentoring Total", active: true },
      { text: "Roadmap Belajar Personal", active: true },
      { text: "Mockup Interview Kerja", active: true },
      { text: "Garansi Uang Kembali (7 Hari)", active: true },
      { text: "Akses Project Kolaborasi", active: true },
      { text: "Semua Fitur Pro Bulanan", active: true },
      { text: "Jalur Pribadi (WhatsApp)", active: false },
    ]
  },
  {
    id: "business",
    name: "Eksklusif / Bisnis",
    price: "Hubungi Kami",
    period: "",
    desc: "Untuk tim perusahaan atau mentoring 1-on-1 full intensif.",
    icon: Briefcase,
    highlight: false,
    features: [
      { text: "Training Tim (Max 5 Orang)", active: true },
      { text: "Kurikulum Custom Sesuai Kebutuhan", active: true },
      { text: "On-Demand Mentoring", active: true },
      { text: "Jalur Pribadi (WhatsApp 24/7)", active: true },
      { text: "Kontrak Legal & Invoice Resmi", active: true },
      { text: "Visit Kantor (Area Tertentu)", active: true },
      { text: "Dedikasi Full Support", active: true },
    ]
  }
];

// --- DATA FAQ ---
const FAQS = [
  { q: "Apakah pemula bisa langsung ikut?", a: "Tentu! Paket Starter dan Monthly sangat ramah untuk pemula yang baru belajar coding dari nol." },
  { q: "Bagaimana sistem mentoringnya?", a: "Mentoring dilakukan via Google Meet/Zoom. Jadwalnya fleksibel, disepakati bersama antara mentor dan murid." },
  { q: "Apakah bisa refund?", a: "Khusus paket Tahunan, kami menyediakan garansi uang kembali 7 hari jika Anda merasa tidak cocok dengan metodenya." },
  { q: "Metode pembayaran apa yang tersedia?", a: "Kami menerima Transfer Bank (BCA, Mandiri), E-Wallet (GoPay, OVO), dan QRIS." },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen bg-[#020a02] text-white font-sans selection:bg-lime-500/30 py-12 px-6 flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
         <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-lime-500/20 hover:border-lime-500/50 transition-all duration-300 group backdrop-blur-sm mb-8">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-lime-400" />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Kembali ke Beranda</span>
          </Link>

          <div className="max-w-7xl mx-auto space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-[10px] font-bold uppercase tracking-widest"
            >
               <Rocket size={12} /> Investasi Leher ke Atas
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Pilih Paket <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">Belajar</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Percepat karir coding-mu dengan bimbingan privat. Pilih paket yang sesuai dengan target dan kecepatan belajarmu.
            </p>
          </div>
        </div>

        {/* PRICING GRID */}
        {/* Layout: Grid responsive. Paket 'Pro' akan menonjol */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24 items-start">
           {PACKAGES.map((pkg, idx) => (
             <motion.div 
               key={pkg.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className={`relative flex flex-col p-6 rounded-3xl border transition-all duration-300 h-full hover:-translate-y-2
                 ${pkg.highlight 
                    ? "bg-[#0a150a] border-lime-500 shadow-[0_0_30px_rgba(132,204,22,0.15)] z-10 scale-105 md:scale-110 lg:scale-105 xl:scale-100 xl:translate-y-0" 
                    : "bg-[#050a05] border-white/10 hover:border-lime-500/30 hover:shadow-lg"
                 }
               `}
             >
                {/* Badge untuk Best Seller */}
                {pkg.highlight && (
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lime-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-lime-500/40">
                      {pkg.badge}
                   </div>
                )}

                {/* Header Card */}
                <div className="mb-6">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${pkg.highlight ? "bg-lime-500 text-black" : "bg-white/5 text-gray-400"}`}>
                      <pkg.icon size={20} />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
                   <p className="text-xs text-gray-400 min-h-[40px] leading-relaxed">{pkg.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-white/5">
                   <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{pkg.price}</span>
                      <span className="text-xs text-gray-500 font-medium">{pkg.period}</span>
                   </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8 flex-1">
                   {pkg.features.map((feat, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm">
                        {feat.active ? (
                          <Check size={16} className="text-lime-500 shrink-0 mt-0.5" />
                        ) : (
                          <X size={16} className="text-gray-700 shrink-0 mt-0.5" />
                        )}
                        <span className={feat.active ? "text-gray-300" : "text-gray-700 decoration-gray-700"}>
                          {feat.text}
                        </span>
                     </li>
                   ))}
                </ul>

                {/* CTA Button */}
                <Link 
                  href={pkg.price === "Hubungi Kami" ? "/contact" : "/checkout"}
                  className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center transition-all active:scale-95
                    ${pkg.highlight 
                       ? "bg-lime-500 text-black hover:bg-lime-400 shadow-lg shadow-lime-500/20" 
                       : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    }
                  `}
                >
                   {pkg.price === "Hubungi Kami" ? "Kontak Admin" : "Pilih Paket Ini"}
                </Link>

             </motion.div>
           ))}
        </div>

        {/* FAQ SECTION */}
        <div className="max-w-3xl mx-auto">
           <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">Pertanyaan Umum (FAQ)</h2>
              <p className="text-gray-400 text-sm">Masih ragu? Temukan jawabannya di sini.</p>
           </div>

           <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#0a150a] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-lime-500/30"
                >
                   <button 
                     onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                     className="w-full flex items-center justify-between p-5 text-left"
                   >
                      <span className="font-bold text-gray-200 text-sm md:text-base">{faq.q}</span>
                      <span className={`text-lime-500 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}>
                         <ArrowLeft size={18} className="-rotate-90" />
                      </span>
                   </button>
                   
                   <motion.div 
                     initial={false}
                     animate={{ height: openFaq === idx ? "auto" : 0, opacity: openFaq === idx ? 1 : 0 }}
                     className="overflow-hidden"
                   >
                      <p className="p-5 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                        {faq.a}
                      </p>
                   </motion.div>
                </div>
              ))}
           </div>
        </div>

        {/* Trust Badge Footer */}
        <div className="mt-20 text-center border-t border-white/5 pt-10">
           <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-500 text-xs font-mono uppercase tracking-widest">
              <span className="flex items-center gap-2"><Shield size={14} /> Secure Payment</span>
              <span className="flex items-center gap-2"><Check size={14} /> Verified Mentor</span>
              <span className="flex items-center gap-2"><Star size={14} /> 4.9/5 Rating</span>
           </div>
        </div>

      </div>
    </main>
  );
}