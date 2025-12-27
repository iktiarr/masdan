"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "contentful";
import AOS from "aos";
import { 
  Code2, Layers, Wrench, PenTool, Plane, 
  ChevronDown, ChevronUp, Sparkles, 
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

const SECTION_INFO = {
  programming: {
    title: "Bahasa Pemrograman",
    desc: "Pondasi logika kode.",
    icon: Code2,
  },
  frameworks: {
    title: "Framework & Library",
    desc: "Sistem scalable & efisien.",
    icon: Layers,
  },
  tools: {
    title: "Tools & DevOps",
    desc: "Infrastruktur workflow.",
    icon: Wrench,
  },
  creative: {
    title: "Desain Kreatif",
    desc: "Sentuhan artistik UI/UX.",
    icon: PenTool,
  },
  experiance: {
    title: "Pengalaman",
    desc: "Jejak profesional.",
    icon: Plane,
  },
  aplication: {
    title: "Aplikasi & Platform",
    desc: "Ekosistem digital.",
    icon: Smartphone,
  }
};

type SectionKey = keyof typeof SECTION_INFO;

const SkillSkeleton = () => (
  <div className="flex flex-col items-center gap-3 animate-pulse">
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-200 dark:bg-white/10" />
    <div className="h-3 w-16 bg-gray-200 dark:bg-white/10 rounded" />
  </div>
);

export default function SkillsPage() {
  const [data, setData] = useState<Record<SectionKey, any[]> | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prefersReducedMotion = useReducedMotion();

  const fetchData = useCallback(async (isFirstLoad = false) => {
    try {
      if (isFirstLoad) setLoading(true);
      
      const res = await client.getEntries({ content_type: "skills" });
      
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
        aplication: items.filter((v) => v.kategori === "aplikasi"),
      });
    } catch (error) {
      console.error(error);
    } finally {
      if (isFirstLoad) setLoading(false);
    }
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    fetchData(true);

    const interval = setInterval(() => {
      fetchData(false);
    }, 5000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(interval);
    };
  }, [fetchData]);

  const toggleSection = (key: string) => {
    const isCurrentlyExpanded = expandedSections[key];
    setExpandedSections((prev) => ({ ...prev, [key]: !isCurrentlyExpanded }));

    if (isCurrentlyExpanded && sectionRefs.current[key]) {
      setTimeout(() => {
        sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  const SECTIONS: SectionKey[] = Object.keys(SECTION_INFO) as SectionKey[];

  return (
    <section id="skills" className="relative py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 px-4 md:px-8">
      <header className="text-center mb-16 space-y-2" data-aos="fade-down">
        <div className="flex flex-col items-left text-left mb-16 animate-fade-in-right">
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white tracking-tighter mb-2">
            Keahlian <span className="text-lime-500">Saya</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-lg leading-relaxed">
            Beberapa kemampuan yang pernah saya pelajari dan gunakan hingga saat ini.
          </p>
        </div>
      </header>

      <div className="space-y-12 max-w-[90rem] mx-auto">
        {SECTIONS.map((key) => {
          const section = SECTION_INFO[key];
          
          if (loading) {
            return (
              <div key={key} className="w-full space-y-4">
                <div className="h-8 w-48 bg-gray-200 dark:bg-white/5 rounded animate-pulse mb-4" />
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                  {[...Array(12)].map((_, i) => <SkillSkeleton key={i} />)}
                </div>
              </div>
            );
          }

          const items = data?.[key] || [];
          if (items.length === 0) return null;

          const Icon = section.icon;
          const isExpanded = expandedSections[key];
          const LIMIT = 8;
          const shouldTruncate = isMobile && items.length > LIMIT && !isExpanded;
          const displayItems = shouldTruncate ? items.slice(0, LIMIT) : items;
          const hiddenCount = items.length - LIMIT;

          return (
            <div 
              key={key} 
              ref={(el) => { if (el) sectionRefs.current[key] = el; }}
              className="w-full relative scroll-mt-24"
            >
              <header className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-100 dark:border-white/5">
                <div className="p-2 bg-lime-50 dark:bg-lime-900/10 rounded-xl text-lime-600 dark:text-lime-400">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 text-xs hidden sm:block">
                    {section.desc}
                  </p>
                </div>
              </header>

              <div className="relative">
                <ul className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-x-3 gap-y-6">
                  {displayItems.map((item: any) => (
                    <li
                      key={item.id}
                      className="group flex flex-col items-center gap-2"
                    >
                      <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-gray-50 dark:bg-gray-50 rounded-2xl border border-gray-100 dark:border-white/5 group-hover:border-lime-500 group-hover:shadow-lg group-hover:shadow-lime-500/20 group-hover:-translate-y-1 transition-all duration-300">
                        <img
                          loading="lazy"
                          src={item.icon ?? item.link}
                          alt={item.nama}
                          className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <span className="text-[10px] md:text-xs font-semibold text-gray-600 dark:text-gray-400 group-hover:text-lime-600 dark:group-hover:text-lime-400 text-center line-clamp-1 w-full px-1">
                        {item.nama}
                      </span>
                    </li>
                  ))}
                </ul>

                {isMobile && items.length > LIMIT && (
                  <>
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 z-10 flex items-end justify-center pb-0">
                        <button
                          onClick={() => toggleSection(key)}
                          className="flex items-center gap-2 px-5 py-2 rounded-full bg-lime-500 text-white shadow-lg shadow-lime-500/20 text-xs font-bold hover:bg-lime-600 transition-all active:scale-95 mb-2"
                        >
                          <Sparkles size={12} />
                          <span>Buka {hiddenCount} Lainnya</span>
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    )}

                    {isExpanded && (
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={() => toggleSection(key)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
                        >
                          <span>Tutup</span>
                          <ChevronUp size={14} />
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