"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Toaster, toast } from "sonner"; 
import AOS from "aos";

export default function HelpCenter() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Mengirim pesan...");

    try {
      const res = await fetch('/api/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Pesan Terkirim!", {
          id: toastId,
          description: "Kami akan segera membalas melalui Email Anda.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Gagal Mengirim", {
          id: toastId,
          description: result.error || "Terjadi kesalahan server.",
        });
      }
    } catch (error) {
      toast.error("Koneksi Gagal", {
        id: toastId,
        description: "Periksa internet Anda.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 py-24 px-6 flex flex-col items-center justify-center overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] dark:bg-[radial-gradient(#84cc16_1px,transparent_1px)] bg-size-[32px_32px] opacity-10 dark:opacity-5"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-200/40 dark:bg-lime-500/10 rounded-full blur-[150px] opacity-60"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        
        {/* --- BACK BUTTON --- */}
        <div className="mb-8 text-center md:text-left">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-lime-500 dark:hover:border-lime-500 transition-all duration-300 group shadow-sm">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-gray-500 dark:text-gray-400 group-hover:text-lime-500" />
              <span className="text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">Kembali</span>
          </Link>
        </div>

        {/* --- HEADER --- */}
        <div className="text-center mb-12 space-y-4" data-aos="fade-down">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-100 dark:bg-lime-900/20 border border-lime-200 dark:border-lime-500/30">
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest">Contact Support</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white">
             Butuh <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-emerald-600">Bantuan?</span>
           </h1>
           <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-lg">
             Isi formulir di bawah ini untuk menghubungi kami. Kami akan membalas secepat mungkin.
           </p>
        </div>

        {/* --- FORMULIR UTAMA --- */}
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden" data-aos="fade-up">
           
           {/* Form */}
           <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Nama Lengkap</label>
                   <input 
                     type="text" required placeholder="Nama Anda"
                     value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all placeholder:text-gray-400"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Alamat Email</label>
                   <input 
                     type="email" required placeholder="email@domain.com"
                     value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all placeholder:text-gray-400"
                   />
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Subjek Pesan</label>
                 <input 
                   type="text" required placeholder="Contoh: Kendala Pembayaran / Kerjasama"
                   value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                   className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all placeholder:text-gray-400"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Isi Pesan</label>
                 <textarea 
                   required rows={6} placeholder="Jelaskan detail pertanyaan Anda..."
                   value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                   className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                 />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gray-900 dark:bg-lime-500 hover:bg-black dark:hover:bg-lime-400 text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                {isSubmitting ? "Mengirim..." : "Kirim Pesan Sekarang"}
              </button>

           </form>
        </div>

      </div>
    </main>
  );
}