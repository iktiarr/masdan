"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { motion } from "framer-motion";
import { 
  Star, Loader2, User, MessageSquare, Quote, Info, MessageCircle, Sparkles 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import confetti from "canvas-confetti"; // Import Confetti

import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas"; 

// --- 1. KONFIGURASI CONTENTFUL ---
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",       
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "", 
});

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State Form
  const [formData, setFormData] = useState({ name: "", rating: 5, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await client.getEntries({ content_type: 'testimonials' });
        setReviews(res.items);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
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

  // --- HANDLE SUBMIT ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Mengirim ulasan...");

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          job: "Pengunjung Website",
          rating: formData.rating,
          message: formData.message
        }),
      });

      const result = await res.json();

      if (res.ok) {
        // SUKSES
        triggerConfetti(); // 🔥 Panggil Animasi Confetti
        toast.success("Ulasan Berhasil Dikirim!", {
          id: toastId,
          description: "Terima kasih atas apresiasi Anda!",
          duration: 4000,
        });
        setFormData({ name: "", rating: 5, message: "" });
      } else {
        toast.error("Gagal Mengirim", {
          id: toastId,
          description: result.error || "Terjadi kesalahan pada server.",
        });
      }
    } catch (error) {
      toast.error("Kesalahan Koneksi", {
        id: toastId,
        description: "Periksa koneksi internet Anda.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Marquee Logic (Duplikasi data agar scrolling smooth)
  const marqueeReviews = reviews.length > 0 
    ? [...reviews, ...reviews, ...reviews] 
    : [];

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 px-4 md:px-8 overflow-x-hidden">
        
        <SimpleHeader title="Testimonials" />
        <Toaster position="top-center" richColors />

        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[100px]" />
           <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* --- HEADER SECTION --- */}
          <div className="text-center mb-16">
             <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
               Wall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-500">Love</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
               Apa kata mereka yang telah berkolaborasi dan menggunakan layanan kami.
             </p>
             
             {/* Garis Pemisah */}
             <div className="w-full h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent mt-8 max-w-xs mx-auto" />
          </div>

          {/* --- BAGIAN 1: FORMULIR --- */}
          <div className="max-w-xl mx-auto bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden mb-24 group hover:border-lime-500/30 transition-all duration-500">
             
             {/* Dekorasi Glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

             <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
               <div className="text-center">
                   <h3 className="text-lg font-bold flex items-center justify-center gap-2 text-gray-900 dark:text-white">
                       <Sparkles size={18} className="text-lime-500" /> Tulis Pengalaman Anda
                   </h3>
                   <p className="text-xs text-gray-400 mt-1">Masukan Anda sangat berarti bagi kami.</p>
               </div>

               {/* Rating Input */}
               <div className="flex justify-center gap-2 bg-gray-50 dark:bg-white/5 p-3 rounded-2xl w-fit mx-auto border border-gray-100 dark:border-white/5">
                   {[1, 2, 3, 4, 5].map((star) => (
                     <button
                       key={star}
                       type="button"
                       onClick={() => setFormData({ ...formData, rating: star })}
                       className={`transition-all duration-300 hover:scale-125 hover:-rotate-12 ${star <= formData.rating ? "text-yellow-400 fill-yellow-400 drop-shadow-sm" : "text-gray-300 dark:text-gray-600"}`}
                     >
                         <Star size={28} />
                     </button>
                   ))}
               </div>

               <div className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500 ml-1">Nama</label>
                      <input 
                        type="text" placeholder="Nama Lengkap" required
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lime-500 focus:bg-white dark:focus:bg-black transition-all placeholder:text-gray-400"
                      />
                   </div>
                   
                   <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500 ml-1">Pesan</label>
                      <textarea 
                        rows={3} placeholder="Ceritakan pengalaman Anda..." required
                        value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lime-500 focus:bg-white dark:focus:bg-black transition-all placeholder:text-gray-400 resize-none"
                      />
                   </div>
               </div>

               <button 
                 type="submit" 
                 disabled={isSubmitting}
                 className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group/btn"
               >
                 {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                 ) : (
                    <>
                      Kirim Ulasan <MessageSquare size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </>
                 )}
               </button>

               {/* DISCLAIMER */}
               <div className="flex gap-3 items-start p-3 bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 rounded-xl">
                 <Info size={16} className="text-pink-500 mt-0.5 shrink-0" />
                 <p className="text-[10px] text-pink-600 dark:text-pink-300 leading-relaxed">
                     Ulasan akan dikurasi oleh admin untuk memastikan tidak ada spam sebelum ditampilkan ke publik.
                 </p>
               </div>
             </form>
          </div>


          {/* --- BAGIAN 2: DATA ULASAN (MARQUEE) --- */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-16">
              
              <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                 <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
                       <MessageCircle size={24} className="text-lime-500" /> Komunitas
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Terima kasih telah menjadi bagian dari perjalanan ini.</p>
                 </div>
                 {/* Total Review Badge */}
                 {!loading && (
                   <span className="bg-lime-100 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400 border border-lime-200 dark:border-lime-500/20 px-4 py-1.5 rounded-full text-xs font-bold">
                     {reviews.length} Ulasan Terverifikasi
                   </span>
                 )}
              </div>

              {/* --- INFINITE LOOP CARDS --- */}
              {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-lime-500" size={32} />
                </div>
              ) : reviews.length > 0 ? (
                <div className="relative w-full overflow-hidden py-4 -mx-4 md:mx-0">
                    
                    {/* Fade Gradient */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-20 bg-gradient-to-r from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-20 bg-gradient-to-l from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none"></div>

                    {/* Container Animasi */}
                    <motion.div 
                      className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ 
                        repeat: Infinity, 
                        ease: "linear", 
                        duration: 50, // Kecepatan Marquee
                      }}
                      whileHover={{ animationPlayState: "paused" }} // Pause saat hover (perlu CSS tambahan atau logic manual di motion)
                    >
                      {marqueeReviews.map((item, idx) => {
                          const { nama, text, rating, avatar } = item.fields;
                          const imgUrl = avatar?.fields?.file?.url ? "https:" + avatar.fields.file.url : null;

                          return (
                            <div 
                              key={idx}
                              className="w-[300px] md:w-[360px] p-6 rounded-3xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 shadow-sm shrink-0 hover:border-lime-400 dark:hover:border-lime-500/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl"
                            >
                              <div className="flex justify-between items-start mb-4">
                                  <div className="flex gap-1 text-yellow-400">
                                    {[...Array(rating || 5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                  </div>
                                  <Quote size={20} className="text-gray-200 dark:text-gray-800 group-hover:text-lime-500/20 transition-colors" />
                              </div>
                              
                              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4 italic font-medium">
                                "{text}"
                              </p>

                              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden border border-white/20 shadow-sm relative shrink-0">
                                    {imgUrl ? (
                                      <Image src={imgUrl} alt={nama} fill className="object-cover" />
                                    ) : (
                                      <span>{nama?.charAt(0) || <User size={16} />}</span>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{nama}</h4>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 bg-lime-500 rounded-full inline-block"></span> Verified
                                    </p>
                                  </div>
                              </div>
                            </div>
                          );
                      })}
                    </motion.div>
                </div>
              ) : (
                <div className="text-center py-20 opacity-50 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-2xl">
                    <p className="text-gray-500 dark:text-gray-400">Belum ada ulasan yang ditampilkan.</p>
                </div>
              )}

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}