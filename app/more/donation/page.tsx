"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  Heart, Copy, Check, CreditCard, Wallet, 
  Banknote, Info, ExternalLink, Loader2 
} from "lucide-react";
import { toast } from "sonner"; // Pastikan sudah install sonner untuk notif copy
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";

// --- KONFIGURASI CONTENTFUL ---
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

// --- DATA HARDCODED (PEMBAYARAN DEFAULT/MANUAL) ---
// Ini tidak masuk Contentful sesuai request, ubah di sini saja.
const MANUAL_PAYMENTS = [
  {
    bank: "BCA",
    number: "1234567890",
    name: "Masdaner",
    icon: CreditCard, // Ikon Kartu
  },
  {
    bank: "DANA / GoPay",
    number: "081234567890",
    name: "Masdaner",
    icon: Wallet, // Ikon Dompet
  },
];

export default function DonationPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    async function fetchData() {
      try {
        // Fetch Content Type "donasi"
        const res = await client.getEntries({ content_type: "donasi" });
        
        if (res.items.length > 0) {
          const item: any = res.items[0].fields; // Ambil item pertama saja
          
          // LOGIKA PARSING KOLOM 'CHECK' (Array of String)
          // Format di Contentful harus: "Nama Platform|LinkURL"
          // Contoh: "Saweria|https://saweria.co/xxx"
          const onlineLinks = item.check?.map((str: string) => {
            const parts = str.split('|'); 
            return {
              label: parts[0]?.trim() || "Link",
              url: parts[1]?.trim() || "#"
            };
          }) || [];

          setData({
            nama: item.nama,
            deskripsi: item.deskripsi,
            catatan: item.catatan,
            onlinePayments: onlineLinks,
            imageUrl: item.gambar?.fields?.file?.url 
              ? `https:${item.gambar.fields.file.url}` 
              : null,
          });
        }
      } catch (error) {
        console.error("Error fetching donation data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Fungsi Copy ke Clipboard
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    toast.success("Nomor rekening berhasil disalin!");
    
    // Reset icon check setelah 2 detik
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-lime-500" size={34} />
      </section>
    );
  }

  if (!data) return null;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white pt-24 pb-20 px-4 md:px-8">
        
        {/* Background Hiasan */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px]" />
           <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* --- HEADER SECTION --- */}
          <div className="text-center mb-12 space-y-6" data-aos="fade-down">
             <div className="inline-flex items-center justify-center p-4 bg-lime-100 dark:bg-lime-900/20 rounded-full text-lime-600 dark:text-lime-400 mb-2 shadow-xl shadow-lime-500/20 animate-pulse">
                <Heart size={40} className="fill-lime-500/20" />
             </div>
             
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
               {data.nama || "Dukungan & Donasi"}
             </h1>
             
             {/* Deskripsi & Gambar Wrapper */}
             <div className="max-w-3xl mx-auto bg-white dark:bg-[#121212] rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-white/5 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6">
                   {/* Gambar Profil/Banner */}
                   {data.imageUrl && (
                     <div className="shrink-0">
                       <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-lime-100 dark:border-white/5">
                         <img 
                           src={data.imageUrl} 
                           alt="Donasi" 
                           className="w-full h-full object-cover" 
                         />
                       </div>
                     </div>
                   )}
                   
                   <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-center md:text-left">
                     "{data.deskripsi}"
                   </p>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* --- KIRI: PEMBAYARAN ONLINE (CONTENTFUL) --- */}
            <div className="space-y-6" data-aos="fade-right">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <ExternalLink size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Platform Donasi</h3>
               </div>

               <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-3xl p-6 shadow-sm">
                  {data.onlinePayments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {data.onlinePayments.map((pay: any, idx: number) => (
                        <a 
                          key={idx}
                          href={pay.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-lime-500 hover:text-white hover:border-lime-500 dark:hover:bg-lime-500 dark:hover:text-black transition-all font-bold group"
                        >
                           <span>{pay.label}</span>
                           <ExternalLink size={16} className="opacity-50 group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">Belum ada link donasi online.</p>
                  )}
               </div>
            </div>

            {/* --- KANAN: TRANSFER MANUAL (HARDCODED) --- */}
            <div className="space-y-6" data-aos="fade-left">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                    <Banknote size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Transfer Langsung</h3>
               </div>

               <div className="space-y-4">
                  {MANUAL_PAYMENTS.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-lime-500/30 transition-colors"
                    >
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-500 dark:text-gray-400">
                             <item.icon size={24} />
                          </div>
                          <div>
                             <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.bank}</p>
                             <p className="text-lg font-mono font-bold text-gray-900 dark:text-white">{item.number}</p>
                             <p className="text-xs text-gray-500">a.n {item.name}</p>
                          </div>
                       </div>
                       
                       <button 
                         onClick={() => handleCopy(item.number, `manual-${idx}`)}
                         className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-lime-100 dark:hover:bg-lime-900/30 text-gray-500 hover:text-lime-600 transition-all active:scale-95"
                         title="Salin Nomor"
                       >
                         {copiedIndex === `manual-${idx}` ? (
                           <Check size={20} className="text-lime-600 dark:text-lime-400" />
                         ) : (
                           <Copy size={20} />
                         )}
                       </button>
                    </div>
                  ))}
               </div>
            </div>

          </div>

          {/* --- CATATAN SECTION --- */}
          {data.catatan && (
             <div className="mt-12" data-aos="fade-up">
                <div className="bg-lime-50/50 dark:bg-lime-900/5 border border-lime-200 dark:border-lime-500/10 rounded-2xl p-6 flex gap-4 items-start">
                   <div className="shrink-0 p-1">
                      <Info size={24} className="text-lime-600 dark:text-lime-500" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-bold text-lime-700 dark:text-lime-400 text-sm uppercase tracking-wide">
                        Catatan Tambahan
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {data.catatan}
                      </p>
                   </div>
                </div>
             </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}