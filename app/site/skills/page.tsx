"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "contentful";
import AOS from "aos";
import { 
  Code2, Layers, Wrench, PenTool, Plane, Loader2, 
  ChevronDown, ChevronUp, Sparkles 
} from "lucide-react";

// --- CLIENT CONTENTFUL ---
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

// --- DATA CONFIG ---
const SECTION_INFO = {
  programming: {
    title: "Bahasa Pemrograman",
    desc: "Pondasi logika dalam setiap baris kode.",
    icon: Code2,
  },
  frameworks: {
    title: "Framework & Library",
    desc: "Alat modern untuk sistem yang scalable.",
    icon: Layers,
  },
  tools: {
    title: "Tools & DevOps",
    desc: "Infrastruktur penunjang workflow.",
    icon: Wrench,
  },
  creative: {
    title: "Desain Kreatif",
    desc: "Sentuhan artistik UI/UX.",
    icon: PenTool,
  },
  experiance: {
    title: "Pengalaman",
    desc: "Jejak langkah profesional.",
    icon: Plane,
  },
};

type SectionKey = keyof typeof SECTION_INFO;

export default function SkillsPage() {
  const [data, setData] = useState<Record<SectionKey, any[]> | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State: expandedSections menyimpan ID section yang sedang TERBUKA
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  // State: Mobile Detection
  const [isMobile, setIsMobile] = useState(false);

  // Ref untuk scroll otomatis saat "Tutup" diklik
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Cek Mobile Responsif
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    async function fetchData() {
      try {
        const res = await client.getEntries({ content_type: "skills" });
        
        // Transform Data
        const items = res.items.map((item: any) => ({
          id: item.sys.id,
          nama: item.fields.nama,
          kategori: item.fields.kategori,
          icon: item.fields.icon?.fields?.file?.url 
            ? `https:${item.fields.icon.fields.file.url}` 
            : null,
          link: item.fields.link || null,
        }));

        setData({
          programming: items.filter((v) => v.kategori === "pemprograman"),
          frameworks: items.filter((v) => v.kategori === "framework"),
          tools: items.filter((v) => v.kategori === "alat"),
          creative: items.filter((v) => v.kategori === "kreatif"),
          experiance: items.filter((v) => v.kategori === "pengalaman"),
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSection = (key: string) => {
    const isCurrentlyExpanded = expandedSections[key];
    
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !isCurrentlyExpanded,
    }));

    // Logic Tambahan: Jika menutup ("Tutup"), scroll sedikit ke header section tsb
    if (isCurrentlyExpanded && sectionRefs.current[key]) {
      setTimeout(() => {
        sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
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
    <section id="skills" className="relative py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 px-4 md:px-8">
      
      {/* HEADER UTAMA */}
      <header className="text-center mb-24 space-y-4" data-aos="fade-down">
        <h2 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
          Keahlian &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">
            Pengalaman
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Arsenam teknologi dan jejak profesional yang membentuk kemampuan saya.
        </p>
      </header>

      <div className="space-y-20 max-w-7xl mx-auto">
        {SECTIONS.map((key) => {
          const section = SECTION_INFO[key];
          const items = data[key];
          
          if (!items || items.length === 0) return null;
          
          const Icon = section.icon;
          const isExpanded = expandedSections[key];
          
          // LOGIKA VISUALISASI
          // Batas item sebelum dipotong (Default 6 untuk Mobile)
          const LIMIT = 6;
          // Cek apakah perlu dipotong (Hanya di Mobile & Item > LIMIT & Belum dibuka)
          const shouldTruncate = isMobile && items.length > LIMIT && !isExpanded;
          // Data yang akan dirender
          const displayItems = shouldTruncate ? items.slice(0, LIMIT) : items;
          const hiddenCount = items.length - LIMIT;

          return (
            <div 
              key={key} 
              ref={(el) => { if (el) sectionRefs.current[key] = el; }} // Simpan ref untuk scroll
              className="w-full relative scroll-mt-24" // scroll-mt biar ga ketutup navbar pas scroll
            >
              {/* SECTION HEADER */}
              <header
                className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100 dark:border-white/5"
                data-aos="fade-right"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-lime-50 dark:bg-lime-900/10 rounded-2xl text-lime-600 dark:text-lime-400 shadow-sm shadow-lime-500/10">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                      {section.desc}
                    </p>
                  </div>
                </div>
              </header>

              {/* GRID ITEMS */}
              <div className="relative">
                <ul
                  className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8 md:gap-y-12"
                >
                  {displayItems.map((item: any, idx: number) => (
                    <li
                      key={item.id}
                      data-aos={isMobile ? "" : "fade-up"} // Disable AOS di mobile biar ga aneh pas expand
                      data-aos-delay={idx * 50}
                      className="group flex flex-col items-center gap-3"
                    >
                      <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 group-hover:border-lime-500/50 group-hover:shadow-lg group-hover:shadow-lime-500/20 transition-all duration-300">
                        <img
                          loading="lazy"
                          src={item.icon ?? item.link}
                          alt={item.nama}
                          className="w-8 h-8 md:w-10 md:h-10 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:invert-[.15] dark:group-hover:invert-0"
                        />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-center line-clamp-2">
                        {item.nama}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* --- LOGIKA TOMBOL & BLUR (EKSKLUSIF MOBILE) --- */}
                {isMobile && items.length > LIMIT && (
                  <>
                    {/* KONDISI 1: SEDANG TERTUTUP (TAMPILKAN BLUR + TOMBOL LIHAT SEMUA) */}
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/95 z-10 flex items-end justify-center pb-2">
                        <button
                          onClick={() => toggleSection(key)}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-black/50 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-lime-600 dark:hover:text-lime-400 hover:border-lime-500/50 transition-all active:scale-95 backdrop-blur-md"
                        >
                          <Sparkles size={14} className="text-lime-500" />
                          <span>Lihat {hiddenCount} Lainnya</span>
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    )}

                    {/* KONDISI 2: SUDAH TERBUKA (TAMPILKAN TOMBOL TUTUP SAJA DI BAWAH) */}
                    {isExpanded && (
                      <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-top-4 duration-300">
                        <button
                          onClick={() => toggleSection(key)}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-100 dark:bg-white/5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all active:scale-95"
                        >
                          <span>Tutup Kembali</span>
                          <ChevronUp size={16} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}