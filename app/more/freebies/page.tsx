"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import AOS from "aos";
import "aos/dist/aos.css"; // Jangan lupa import CSS AOS
import { Loader2, Download, Gift, FileText, PackageOpen } from "lucide-react";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";

// --- KONFIGURASI CONTENTFUL ---
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

// --- STRUKTUR INFO SECTION ---
// Kita buat fleksibel, siapa tahu nanti mau dipisah per kategori (misal: Template, Ebook, dll)
// Untuk sekarang kita pakai satu kategori utama: 'all'
const SECTION_INFO = {
  all: {
    title: "Koleksi Gratis",
    desc: "Aset, template, dan dokumen bermanfaat yang bisa Anda unduh secara gratis.",
    icon: Gift,
  },
};

type SectionKey = keyof typeof SECTION_INFO;

// --- HELPER SIZE FORMATTER ---
const formatSize = (bytes: number) => {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function FreebiesPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    async function fetchData() {
      try {
        // Fetch Content Type "itemGratis" sesuai JSON Anda
        const res = await client.getEntries({ content_type: "itemGratis" });

        const items = res.items.map((entry: any) => {
          // Ambil data file dari asset
          const fileAsset = entry.fields.item;
          const fileUrl = fileAsset?.fields?.file?.url ? `https:${fileAsset.fields.file.url}` : "#";
          const fileSize = fileAsset?.fields?.file?.details?.size || 0;
          const fileType = fileAsset?.fields?.file?.contentType || "Unknown";

          return {
            id: entry.sys.id,
            nama: entry.fields.nama,
            deskripsi: entry.fields.deskripsi,
            fileUrl: fileUrl,
            fileSize: fileSize,
            fileType: fileType,
          };
        });

        setData(items);
      } catch (error) {
        console.error("Error fetching freebies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-lime-500" size={34} />
      </section>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white pt-24 pb-20 px-4 md:px-8">
        
        {/* Background Hiasan */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* HEADER UTAMA */}
          <header className="text-center mb-16 space-y-4" data-aos="fade-down">
             <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Resources</span>
             </h2>
             <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Koleksi aset, template, dan dokumen gratis yang saya buat untuk komunitas. Silakan unduh dan gunakan!
             </p>
          </header>

          {/* CONTENT SECTION */}
          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item, idx) => (
                <div 
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="flex flex-col bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-3xl p-6 hover:border-lime-500/50 hover:shadow-xl hover:shadow-lime-500/5 transition-all duration-300 group"
                >
                  {/* Icon & Size Badge */}
                  <div className="mb-4 flex justify-between items-start">
                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-400 group-hover:text-lime-500 group-hover:bg-lime-50 dark:group-hover:bg-lime-900/20 transition-colors">
                      <FileText size={24} />
                    </div>
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                      {formatSize(item.fileSize)}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                      {item.nama || "Untitled Item"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {item.deskripsi || "Tidak ada deskripsi."}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                    <a 
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-black/5
                        ${item.fileUrl === "#" 
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                          : "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-lime-600 dark:hover:bg-lime-400"
                        }
                      `}
                    >
                      <Download size={18} />
                      Download Now
                    </a>
                    <div className="mt-2 text-center">
                       <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                         Type: {item.fileType.split('/')[1] || 'File'}
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // EMPTY STATE
            <div 
              className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-300 dark:border-white/10"
              data-aos="fade-up"
            >
              <PackageOpen className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Belum ada item gratis</h3>
              <p className="text-gray-500">Pastikan konten di Contentful sudah di-Publish ya!</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}