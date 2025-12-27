"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import AOS from "aos";
import { 
  FileText, 
  Image as ImageIcon, 
  Eye, 
  X, 
  Loader2, 
  Award,
  FileSpreadsheet,
  FileBox
} from "lucide-react";

// --- 1. SETUP CONTENTFUL ---
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

// --- 2. CONFIG ---
const SECTION_INFO = {
  documents: {
    title: "Arsip Dokumen",
    desc: "Kumpulan sertifikat dan dokumentasi pendukung dalam format digital.",
    icon: Award,
  },
};

type SectionKey = keyof typeof SECTION_INFO;

export default function CertificatesPage() {
  const [data, setData] = useState<Record<SectionKey, any[]> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    async function fetchData() {
      try {
        const res = await client.getEntries({ content_type: "sertifikat" });

        const items = res.items.map((item: any) => {
          const asset = item.fields.file?.[0];
          return {
            id: item.sys.id,
            nama: item.fields.nama,
            url: asset?.fields.file.url ? `https:${asset.fields.file.url}` : "",
            type: asset?.fields.file.contentType || "",
            fileName: asset?.fields.file.fileName || "document",
          };
        }).filter((item) => item.url !== "");

        setData({ documents: items });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // --- HELPER FUNCTIONS ---
  
  // Menentukan Ikon berdasarkan tipe file
  const getFileIcon = (mime: string) => {
    if (mime.includes("image")) return <ImageIcon size={32} className="text-purple-500" />;
    if (mime.includes("pdf")) return <FileText size={32} className="text-red-500" />;
    if (mime.includes("sheet") || mime.includes("excel")) return <FileSpreadsheet size={32} className="text-green-500" />;
    return <FileBox size={32} className="text-blue-500" />;
  };

  // Menentukan Label tipe file yang lebih rapi
  const getFileTypeLabel = (mime: string) => {
    if (mime.includes("image")) return "Image File";
    if (mime.includes("pdf")) return "PDF Document";
    if (mime.includes("word")) return "MS Word";
    if (mime.includes("sheet") || mime.includes("excel")) return "MS Excel";
    return "Document";
  };

  // Logic Preview: Native vs Google Viewer
  const renderPreviewContent = (item: any) => {
    const isImage = item.type.includes("image");
    const isPdf = item.type.includes("pdf");

    // 1. Jika Gambar -> Pakai tag IMG biasa
    if (isImage) {
      return (
        <img 
          src={item.url} 
          alt={item.nama} 
          className="max-w-full max-h-full object-contain rounded-md shadow-md"
        />
      );
    }

    // 2. Jika PDF -> Pakai Iframe biasa (Browser support PDF natively)
    if (isPdf) {
      return (
        <iframe 
          src={item.url} 
          className="w-full h-full rounded-md border-none"
          title="PDF Preview"
        />
      );
    }

    // 3. Jika Word/Excel/PPT -> Gunakan Google Docs Viewer agar tidak auto-download
    // Google Viewer URL wrapper
    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(item.url)}&embedded=true`;
    
    return (
      <iframe 
        src={googleViewerUrl}
        className="w-full h-full rounded-md border-none"
        title="Office Document Preview"
      />
    );
  };

  if (loading || !data) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-lime-500" size={34} />
      </section>
    );
  }

  const SECTIONS: SectionKey[] = Object.keys(SECTION_INFO) as SectionKey[];

  return (
    <>
      <section id="certificates" className="relative py-15 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 px-6">
        
        {/* HEADER */}
        <header className="text-center mb-20 space-y-4" data-aos="fade-down">
          <div className="flex flex-col items-end text-right mb-16 animate-fade-in-right">
            <h2 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white tracking-tighter mb-2">
              Dokumen <span className="text-lime-500">Saya</span>
            </h2>
            <div className="h-1 w-32 bg-lime-500 mb-4 rounded-full"></div>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-lg leading-relaxed">
              hasil dari jerih payah saya untuk menjadi yang lebih baik setiap harinya.
            </p>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {SECTIONS.map((key) => {
            const items = data[key];
            if (!items || items.length === 0) return null;

            return (
              <section key={key} className="w-full">
                {/* LIST CARD SIMPLE */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      data-aos="fade-up"
                      data-aos-delay={idx * 50}
                      className="group flex items-center p-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 rounded-2xl hover:border-lime-500 transition-all duration-300"
                    >
                      {/* 1. Ikon File (Kiri) */}
                      <div className="shrink-0 mr-4 p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                        {getFileIcon(item.type)}
                      </div>

                      {/* 2. Info Nama & Jenis (Tengah) */}
                      <div className="flex-1 min-w-0 mr-4">
                        <h4 className="text-base font-bold text-gray-900 dark:text-white truncate group-hover:text-lime-500 transition-colors">
                          {item.nama}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                          {getFileTypeLabel(item.type)}
                        </p>
                      </div>

                      {/* 3. Tombol Preview (Kanan) */}
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="shrink-0 p-2.5 rounded-full bg-white dark:bg-white/5 text-gray-400 hover:text-lime-600 hover:bg-lime-100 dark:hover:bg-lime-900/30 transition-all active:scale-95 border border-gray-100 dark:border-white/5"
                        title="Preview File"
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* --- MODAL PREVIEW (NO DOWNLOAD) --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          
          {/* Close on Background Click */}
          <div className="absolute inset-0" onClick={() => setSelectedItem(null)}></div>

          <div className="relative w-full max-w-6xl h-[85vh] flex flex-col bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] z-10">
              <div className="flex items-center gap-3">
                 <div className="hidden sm:block">
                    {getFileIcon(selectedItem.type)}
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1">
                      {selectedItem.nama}
                    </h4>
                    <p className="text-xs text-gray-500 font-mono">
                      Preview Mode • {getFileTypeLabel(selectedItem.type)}
                    </p>
                 </div>
              </div>

              {/* Hanya tombol Close */}
              <button 
                onClick={() => setSelectedItem(null)} 
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Preview Area */}
            <div className="flex-1 bg-gray-100 dark:bg-[#050505] relative overflow-hidden flex items-center justify-center p-4">
               {renderPreviewContent(selectedItem)}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}