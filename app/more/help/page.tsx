"use client";

import { useState, useEffect } from "react";
import { Send, Loader2, LifeBuoy, Mail, MessageSquare } from "lucide-react";
import { Toaster, toast } from "sonner"; 
import confetti from "canvas-confetti"; // Import Confetti
import AOS from "aos";
import "aos/dist/aos.css"; // Pastikan CSS AOS diimport jika belum di global

import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 

export default function HelpCenter() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // --- LOGIC CONFETTI ---
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

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
        // SUKSES
        triggerConfetti(); // 🔥 Efek Confetti
        toast.success("Pesan Terkirim!", {
          id: toastId,
          description: "Kami akan segera membalas melalui Email Anda.",
          duration: 4000,
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
    <>
      <Navbar />

      <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 px-4 md:px-8 flex flex-col items-center overflow-hidden">
        
        <SimpleHeader title="Help Center" />
        <Toaster position="top-center" richColors />

        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[100px]" />
           <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-4xl">
          
          {/* --- HEADER --- */}
          <div className="text-center mb-12 space-y-4" data-aos="fade-down">
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 dark:text-white">
               Butuh <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Bantuan?</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Jangan ragu untuk menghubungi kami. Tim kami siap membantu menjawab pertanyaan Anda.
             </p>
          </div>

          {/* --- FORMULIR UTAMA --- */}
          <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group hover:border-lime-500/30 transition-all duration-500" data-aos="fade-up">
             
             {/* Dekorasi Glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
             
             {/* Form */}
             <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Nama Lengkap</label>
                    <input 
                      type="text" required placeholder="Nama Anda"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-black focus:border-lime-500 focus:ring-1 focus:ring-lime-500/20 outline-none transition-all placeholder:text-gray-400"
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Alamat Email</label>
                    <input 
                      type="email" required placeholder="email@domain.com"
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-black focus:border-lime-500 focus:ring-1 focus:ring-lime-500/20 outline-none transition-all placeholder:text-gray-400"
                    />
                 </div>
               </div>

               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Subjek</label>
                  <input 
                    type="text" required placeholder="Contoh: Kendala Pembayaran / Kerjasama"
                    value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-black focus:border-lime-500 focus:ring-1 focus:ring-lime-500/20 outline-none transition-all placeholder:text-gray-400"
                  />
               </div>

               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Pesan</label>
                  <textarea 
                    required rows={6} placeholder="Jelaskan detail pertanyaan atau masalah Anda..."
                    value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-black focus:border-lime-500 focus:ring-1 focus:ring-lime-500/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                  />
               </div>

               <button 
                 type="submit" 
                 disabled={isSubmitting}
                 className="w-full py-4 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group/btn"
               >
                 {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                 ) : (
                    <>
                      Kirim Pesan <Send size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </>
                 )}
               </button>

             </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}