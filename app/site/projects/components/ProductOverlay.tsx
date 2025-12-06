"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Search, X, 
  Tag, Award, Layers,
  Type, ArrowDownAZ, ArrowUpAZ,
  Banknote, ArrowDown01, ArrowDown10,
  ChevronDown, ChevronUp, Clock, RotateCcw, PackageX, Filter
} from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductOverlay({ 
  isOpen, 
  onClose, 
  products = [] 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  products: any[] 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("Semua");
  const [selectedBadge, setSelectedBadge] = useState("Semua");
  const [selectedJenis, setSelectedJenis] = useState("Semua");
  const [sortOrder, setSortOrder] = useState("terbaru");
  
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const uniqueData = useMemo(() => {
    if (!products) return { labels: [], badges: [], jenis: [] };

    const labels = new Set(products.map(p => p.fields?.label).filter(Boolean));
    const badges = new Set(products.map(p => p.fields?.badge).filter(Boolean));
    const jenis = new Set(products.map(p => p.fields?.jenis).filter(Boolean));

    return {
      labels: ["Semua", ...Array.from(labels)],
      badges: ["Semua", ...Array.from(badges)],
      jenis: ["Semua", ...Array.from(jenis)]
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let data = products;

    if (searchQuery) {
      data = data.filter((item) => 
        item.fields?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLabel !== "Semua") data = data.filter((item) => item.fields?.label === selectedLabel);
    if (selectedBadge !== "Semua") data = data.filter((item) => item.fields?.badge === selectedBadge);
    if (selectedJenis !== "Semua") data = data.filter((item) => item.fields?.jenis === selectedJenis);

    return data.sort((a, b) => {
      const priceA = a.fields?.harga || 0;
      const priceB = b.fields?.harga || 0;
      const nameA = (a.fields?.name || "").toLowerCase();
      const nameB = (b.fields?.name || "").toLowerCase();
      const dateA = a.sys?.createdAt ? new Date(a.sys.createdAt).getTime() : 0;
      const dateB = b.sys?.createdAt ? new Date(b.sys.createdAt).getTime() : 0;

      switch (sortOrder) {
        case "termurah": return priceA - priceB;
        case "termahal": return priceB - priceA;
        case "az": return nameA.localeCompare(nameB);
        case "za": return nameB.localeCompare(nameA);
        default: return dateB - dateA; // Terbaru
      }
    });
  }, [products, searchQuery, selectedLabel, selectedBadge, selectedJenis, sortOrder]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedLabel("Semua");
    setSelectedBadge("Semua");
    setSelectedJenis("Semua");
    setSortOrder("terbaru");
  };

  const isFiltered = searchQuery || selectedLabel !== "Semua" || selectedBadge !== "Semua" || selectedJenis !== "Semua" || sortOrder !== "terbaru";
  const isSortActive = (val: string) => sortOrder === val;

  const FilterGroup = ({ title, icon: Icon, data, selected, setSelected }: any) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
        <Icon size={12} /> {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((item: string) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 ${
              selected === item 
              ? "bg-gray-900 text-white border-gray-900 dark:bg-lime-500 dark:text-black dark:border-lime-500 shadow-md" 
              : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 dark:hover:border-white/20 dark:hover:text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }} 
          animate={{ y: 0 }}      
          exit={{ y: "100%" }}    
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-0 bg-gray-50 dark:bg-[#0a0a0a] z-9999 flex flex-col overflow-hidden text-gray-900 dark:text-white transition-colors duration-300"
        >
          
          <div className="shrink-0 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/10 shadow-sm sticky top-0 z-50 flex flex-col transition-colors duration-300">
            <div className="flex items-center gap-3 px-4 py-3 md:px-8 border-b border-gray-100 dark:border-white/5">
              <button 
                onClick={onClose}
                className="shrink-0 flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all active:scale-95 shadow-md"
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-bold hidden sm:inline">Kembali</span>
              </button>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari produk..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-white/10 border-transparent focus:bg-white dark:focus:bg-black focus:border-lime-500 dark:focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <button 
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-[#121212] dark:hover:bg-[#1a1a1a] transition-colors text-xs font-bold text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-white/10 uppercase tracking-wide"
            >
              <Filter size={14} />
              {isFilterExpanded ? "Tutup Filter" : "Filter & Urutkan"}
              {isFilterExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <AnimatePresence>
              {isFilterExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/10"
                >
                  <div className="p-5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FilterGroup 
                        title="Kategori / Label" 
                        icon={Tag} 
                        data={uniqueData.labels} 
                        selected={selectedLabel} 
                        setSelected={setSelectedLabel} 
                      />
                      <FilterGroup 
                        title="Status / Badge" 
                        icon={Award} 
                        data={uniqueData.badges} 
                        selected={selectedBadge} 
                        setSelected={setSelectedBadge} 
                      />
                      <FilterGroup 
                        title="Jenis Produk" 
                        icon={Layers} 
                        data={uniqueData.jenis} 
                        selected={selectedJenis} 
                        setSelected={setSelectedJenis} 
                      />
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-white/10 w-full"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                          <Type size={12} /> Urutkan Nama
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSortOrder("az")}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                              isSortActive("az") 
                              ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800" 
                              : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 dark:hover:border-white/20"
                            }`}
                          >
                            <ArrowDownAZ size={14} /> A - Z
                          </button>
                          <button
                            onClick={() => setSortOrder("za")}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                              isSortActive("za") 
                              ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800" 
                              : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 dark:hover:border-white/20"
                            }`}
                          >
                            <ArrowUpAZ size={14} /> Z - A
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                          <Banknote size={12} /> Urutkan Harga
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSortOrder("termurah")}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                              isSortActive("termurah") 
                              ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                              : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 dark:hover:border-white/20"
                            }`}
                          >
                            <ArrowDown01 size={14} /> Termurah
                          </button>
                          <button
                            onClick={() => setSortOrder("termahal")}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                              isSortActive("termahal") 
                              ? "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                              : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 dark:hover:border-white/20"
                            }`}
                          >
                            <ArrowDown10 size={14} /> Termahal
                          </button>
                        </div>
                      </div>

                    </div>

                    <div className="flex justify-end pt-2 border-t border-dashed border-gray-100 dark:border-white/10 mt-4">
                       <div className="flex gap-3">
                          <button
                             onClick={() => setSortOrder("terbaru")}
                             className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md border transition-colors ${
                               isSortActive("terbaru") 
                               ? "bg-gray-100 text-gray-900 border-gray-200 dark:bg-white/10 dark:text-white dark:border-white/20" 
                               : "text-gray-400 dark:text-gray-500 border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                             }`}
                          >
                             <Clock size={12} /> Default: Terbaru
                          </button>

                          {isFiltered && (
                             <button 
                               onClick={handleReset}
                               className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-md transition-colors uppercase tracking-wider border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                             >
                               <RotateCcw size={12} /> Reset Filter
                             </button>
                          )}
                       </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0a0a0a] p-4 md:p-6 custom-scrollbar transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto pb-20">
               
               <div className="mb-5 px-1 flex justify-between items-center">
                 <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                   Menampilkan <span className="text-gray-900 dark:text-white ml-1">{filteredProducts.length}</span> Produk
                 </p>
               </div>

               {filteredProducts.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
                    {filteredProducts.map((item: any, idx: number) => (
                       <ProductCard key={item.sys?.id || idx} item={item} index={idx} />
                    ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center py-32 text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 transition-colors">
                    <PackageX size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium mb-1">Tidak ada produk ditemukan.</p>
                    <button onClick={handleReset} className="mt-2 text-xs font-bold text-lime-600 dark:text-lime-400 hover:underline">
                      Reset Filter
                    </button>
                 </div>
               )}

            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}