"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Star, Send, Loader2, User, MessageSquare, Quote, Info, MessageCircle 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from "sonner"; // Import Sonner

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

  // --- HANDLE SUBMIT (SONNER NOTIFICATION) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Loading Toast
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
        toast.success("Ulasan Berhasil Dikirim!", {
          id: toastId,
          description: "Terima kasih, ulasan Anda akan segera kami tinjau.",
          duration: 4000,
        });
        setFormData({ name: "", rating: 5, message: "" });
      } else {
        // GAGAL DARI SERVER
        toast.error("Gagal Mengirim", {
          id: toastId,
          description: result.error || "Terjadi kesalahan pada server.",
        });
      }
    } catch (error) {
      // GAGAL KONEKSI
      toast.error("Kesalahan Koneksi", {
        id: toastId,
        description: "Periksa koneksi internet Anda dan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Marquee Logic
  const marqueeReviews = reviews.length > 0 
    ? [...reviews, ...reviews, ...reviews, ...reviews] 
    : [];

  return (
    <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 overflow-hidden">
      
      {/* --- TOASTER (Notifikasi) --- */}
      <Toaster position="top-center" richColors />

      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] dark:bg-[radial-gradient(#84cc16_1px,transparent_1px)] bg-size-[32px_32px] opacity-10 dark:opacity-5"></div>
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-lime-200/40 dark:bg-lime-500/10 rounded-full blur-[120px] opacity-60"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-200/40 dark:bg-emerald-500/10 rounded-full blur-[120px] opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-lime-500 dark:hover:border-lime-500 transition-all duration-300 group shadow-sm mb-8">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-gray-500 dark:text-gray-400 group-hover:text-lime-500" />
              <span className="text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">Kembali</span>
          </Link>
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
               Wall of <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-emerald-600">Love.</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 text-lg">
               Pendapat jujur dari mereka yang telah menggunakan produk dan layanan kami.
             </p>
          </div>
        </div>

        {/* --- BAGIAN 1: FORMULIR (INPUT) --- */}
        <div className="max-w-xl mx-auto bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden mb-24">
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="text-center mb-6">
                  <h3 className="text-lg font-bold flex items-center justify-center gap-2 text-gray-900 dark:text-white">
                      <MessageSquare size={18} className="text-lime-500" /> Berikan Ulasan Anda
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Bagikan pengalaman Anda kepada dunia.</p>
              </div>

              {/* Rating Input */}
              <div className="flex justify-center gap-2 bg-gray-50 dark:bg-white/5 p-3 rounded-2xl w-fit mx-auto">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`transition-transform hover:scale-110 active:scale-90 ${star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                    >
                        <Star size={28} />
                    </button>
                  ))}
              </div>

              <div className="space-y-3">
                  <input 
                    type="text" placeholder="Nama Anda" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  />
                  <textarea 
                    rows={3} placeholder="Tulis pengalaman Anda di sini..." required
                    value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 resize-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Kirim Ulasan"}
              </button>

              {/* DISCLAIMER */}
              <div className="mt-4 flex gap-3 items-start p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-xl">
                <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-blue-600 dark:text-blue-300 leading-relaxed">
                    Ulasan akan dikurasi terlebih dahulu oleh admin sebelum ditampilkan untuk menjaga kualitas konten.
                </p>
              </div>
            </form>
        </div>


        {/* --- BAGIAN 2: DATA ULASAN (JUDUL BARU) --- */}
        <div className="border-t border-gray-200 dark:border-white/10 pt-16">
            
            <div className="flex items-center justify-between mb-8">
               <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     <MessageCircle size={24} className="text-lime-500" /> Semua Ulasan
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Apa kata mereka tentang layanan kami.</p>
               </div>
               {/* Total Review Badge */}
               {!loading && (
                 <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold">
                   {reviews.length} Reviews
                 </span>
               )}
            </div>

            {/* --- INFINITE LOOP CARDS (MARQUEE) --- */}
            {loading ? (
              <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin text-lime-500" size={32} />
              </div>
            ) : reviews.length > 0 ? (
              <div className="relative w-full overflow-hidden py-4">
                  
                  {/* Fade Gradient Kiri-Kanan */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 z-20 bg-linear-to-r from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-20 z-20 bg-linear-to-l from-gray-50 dark:from-[#0a0a0a] to-transparent pointer-events-none"></div>

                  {/* Container Animasi */}
                  <motion.div 
                    className="flex gap-6 w-max"
                    animate={{ x: ["0%", "-50%"] }} // Bergerak ke kiri
                    transition={{ 
                      repeat: Infinity, 
                      ease: "linear", 
                      duration: 40, 
                    }}
                  >
                    {marqueeReviews.map((item, idx) => {
                        const { nama, text, rating, avatar } = item.fields;
                        const imgUrl = avatar?.fields?.file?.url ? "https:" + avatar.fields.file.url : null;

                        return (
                          <div 
                            key={idx}
                            className="w-[320px] md:w-[360px] p-6 rounded-3xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 shadow-sm shrink-0 hover:border-lime-400 dark:hover:border-lime-500/50 transition-colors group"
                          >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-1 text-yellow-400">
                                  {[...Array(rating || 5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <Quote size={24} className="text-gray-200 dark:text-gray-800 group-hover:text-lime-500/50 transition-colors" />
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4 italic font-medium">
                              "{text}"
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-lime-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden border border-white/20 shadow-sm relative shrink-0">
                                  {imgUrl ? (
                                    <Image src={imgUrl} alt={nama} fill className="object-cover" />
                                  ) : (
                                    <span>{nama?.charAt(0) || <User size={16} />}</span>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{nama}</h4>
                                  <p className="text-[10px] text-gray-400 dark:text-gray-500">Verified User</p>
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
  );
}