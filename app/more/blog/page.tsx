"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { createClient } from "contentful";
import {
  Calendar,
  ArrowRight,
  Layout,
  Loader2,
  Search,
  ArrowUpDown,
  X,
  ChevronDown,
  Check,
  Filter as FilterIcon,
  SlidersHorizontal
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";
import SimpleHeader from "@/app/asset/navbar_atas";

// --- CONFIG ---
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

const getBadgeStyle = (type: string) => {
  switch (type?.toLowerCase()) {
    case "blog": return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20";
    case "artikel": return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20";
    case "tulisan": return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20";
    default: return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

export default function BlogPage() {
  // --- STATE ---
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  
  // UI State
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); // Modal Filter Mobile
  const sortRef = useRef<HTMLDivElement>(null);

  // --- FETCH DATA ---
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await client.getEntries({
          content_type: "blog",
          order: ["-fields.tanggal"],
        });
        setPosts(res.items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Click Outside Handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- LOGIC FILTERING ---
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // 1. Category
    if (selectedCategory !== "all") {
      result = result.filter(
        (post) => post.fields.jenis?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((post) =>
        post.fields.judul?.toLowerCase().includes(query)
      );
    }

    // 3. Sort
    result.sort((a, b) => {
      const dateA = new Date(a.fields.tanggal).getTime();
      const dateB = new Date(b.fields.tanggal).getTime();
      const titleA = a.fields.judul?.toLowerCase() || "";
      const titleB = b.fields.judul?.toLowerCase() || "";

      switch (sortOption) {
        case "oldest": return dateA - dateB;
        case "a-z": return titleA.localeCompare(titleB);
        case "z-a": return titleB.localeCompare(titleA);
        case "newest": default: return dateB - dateA;
      }
    });

    return result;
  }, [posts, searchQuery, selectedCategory, sortOption]);

  const categories = ["all", ...new Set(posts.map((p) => p.fields.jenis).filter(Boolean))];

  const sortLabels: Record<string, string> = {
    "newest": "Terbaru",
    "oldest": "Terlama",
    "a-z": "Judul (A-Z)",
    "z-a": "Judul (Z-A)"
  };

  // --- RENDER LOADING ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-lime-500" size={32} />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pt-24 pb-20 px-4 md:px-8 transition-colors duration-300">
        <SimpleHeader title="Blog, Artikel dan Tulisan" /> {/* Judul Header Lebih Pendek */}

        {/* Background FX */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto"> {/* Max width diperkecil (6xl) agar lebih compact */}
          
          {/* --- HEADER TITLE (COMPACT) --- */}
          <div className="text-center md:text-left mb-8">
             <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-3">
               Insights <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-500">& Stories</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm md:text-lg font-medium leading-relaxed">
               Catatan perjalanan, tutorial teknis, dan opini pribadi seputar teknologi.
             </p>
          </div>

          {/* --- MODERN FILTER BAR (Sticky & Compact) --- */}
          <div className="sticky top-20 z-30 -mx-4 px-4 md:mx-0 md:px-0 mb-8">
            <div className="bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-2 shadow-sm flex gap-2 items-center justify-between">
              
              {/* 1. SEARCH BAR (Lebih Kecil) */}
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Cari..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-lime-500 focus:ring-1 focus:ring-lime-500/20 outline-none transition-all text-xs md:text-sm font-medium text-gray-900 dark:text-white"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* 2. FILTER BUTTON (MOBILE ONLY) */}
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-transparent hover:border-lime-500 text-gray-600 dark:text-gray-300"
              >
                 <SlidersHorizontal size={18} />
              </button>

              {/* 3. DESKTOP FILTERS (Hidden on Mobile) */}
              <div className="hidden md:flex gap-2 items-center">
                 {/* Kategori Desktop */}
                 <div className="flex gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
                    {categories.map((cat: any) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all ${
                          selectedCategory === cat 
                            ? "bg-white dark:bg-[#1a1a1a] text-lime-600 shadow-sm" 
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {cat === "all" ? "Semua" : cat}
                      </button>
                    ))}
                 </div>

                 {/* Sort Desktop */}
                 <div className="relative" ref={sortRef}>
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-700 dark:text-gray-300 hover:border-lime-500 transition-all"
                    >
                        <ArrowUpDown size={14} className="text-gray-400" />
                        <span className="hidden lg:inline">{sortLabels[sortOption]}</span>
                        <ChevronDown size={14} />
                    </button>
                    <AnimatePresence>
                      {isSortOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl z-50 p-1"
                        >
                            {Object.entries(sortLabels).map(([key, label]) => (
                              <button
                                key={key}
                                onClick={() => { setSortOption(key); setIsSortOpen(false); }}
                                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                                  sortOption === key ? "bg-lime-500/10 text-lime-600" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5"
                                }`}
                              >
                                  {label}
                                  {sortOption === key && <Check size={12} className="text-lime-500" />}
                              </button>
                            ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
              </div>

            </div>
          </div>

          {/* --- CONTENT GRID (Lebih Kecil & Rapi) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredPosts.map((post) => {
              const { judul, tanggal, jenis, media } = post.fields;
              const imgUrl = media?.fields?.file?.url ? "https:" + media.fields.file.url : null;

              return (
                <Link
                  key={post.sys.id}
                  href={`/more/blog/${post.sys.id}`}
                  className="group flex flex-col h-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden hover:border-lime-400 dark:hover:border-lime-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                    {/* Image Area (Compact Height: h-40) */}
                    <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                       {imgUrl ? (
                         <Image src={imgUrl} alt={judul} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                       ) : (
                         <div className="flex items-center justify-center w-full h-full text-gray-300 dark:text-white/10">
                           <Layout size={24} />
                         </div>
                       )}
                       <div className="absolute top-2 left-2">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide border shadow-sm ${getBadgeStyle(jenis)}`}>
                             {jenis}
                          </span>
                       </div>
                    </div>

                    {/* Content Area (Padding Kecil) */}
                    <div className="p-4 flex flex-col flex-1">
                       <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 dark:text-gray-500 mb-2">
                          <Calendar size={10} />
                          <span>{new Date(tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                       </div>

                       <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 leading-snug line-clamp-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                          {judul}
                       </h3>
                       
                       <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            Baca Sekarang
                          </span>
                          <ArrowRight size={12} className="text-lime-500 group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                </Link>
              );
            })}
          </div>

          {/* --- NOT FOUND STATE --- */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
               <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
               </div>
               <p className="text-gray-500 text-sm">Tidak ditemukan.</p>
               <button 
                  onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                  className="mt-4 text-xs font-bold text-lime-600 hover:underline"
               >
                  Reset Filter
               </button>
            </div>
          )}

        </div>
      </main>

      {/* --- MOBILE FILTER MODAL (Bottom Sheet) --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
               onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
               initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#121212] rounded-t-2xl z-[70] p-6 shadow-2xl border-t border-gray-200 dark:border-white/10"
            >
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Filter & Urutkan</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 rounded-full bg-gray-100 dark:bg-white/10">
                     <X size={18} />
                  </button>
               </div>

               {/* Kategori Mobile */}
               <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Kategori</h4>
                  <div className="flex flex-wrap gap-2">
                     {categories.map((cat: any) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase border transition-all ${
                            selectedCategory === cat 
                              ? "bg-lime-500 text-black border-lime-500" 
                              : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {cat === "all" ? "Semua" : cat}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Sortir Mobile */}
               <div className="mb-8">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Urutkan Berdasarkan</h4>
                  <div className="grid grid-cols-2 gap-2">
                     {Object.entries(sortLabels).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setSortOption(key)}
                          className={`px-4 py-2.5 rounded-lg text-xs font-bold text-left border transition-all flex justify-between items-center ${
                             sortOption === key 
                               ? "bg-lime-500/10 border-lime-500 text-lime-700 dark:text-lime-400" 
                               : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                           {label}
                           {sortOption === key && <Check size={14} className="text-lime-500" />}
                        </button>
                     ))}
                  </div>
               </div>

               <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-lime-500 text-black font-bold text-sm shadow-lg shadow-lime-500/20 active:scale-95 transition-transform"
               >
                  Terapkan Filter
               </button>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}