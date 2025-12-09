"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, LayoutGrid, ChevronRight } from "lucide-react";
import { exploreMenu } from "@/app/information-menu/menudata";

const getBadgeStyle = (text: string) => {
  const t = text?.toLowerCase();
  if (t === "baru" || t === "new") return "text-red-600 bg-red-500/10 border-red-500/20";
  if (t === "update") return "text-blue-600 bg-blue-500/10 border-blue-500/20";
  if (t === "segera" || t === "soon") return "text-amber-600 bg-amber-500/10 border-amber-500/20";
  return "text-gray-500 bg-gray-500/10 border-gray-500/20";
};

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(exploreMenu[0].category);
  const displayItems = exploreMenu.find(v => v.category === selectedCategory)?.items || [];

  return (
    <main
      id="other"
      className="relative bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white pt-20 pb-6 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size[40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] dark:bg-[radial-gradient(#84cc16_1px,transparent_1px)] bg-size[20px_20px] opacity-20 dark:opacity-10"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-lime-300/20 dark:bg-lime-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-3 border-b border-gray-200 dark:border-white/5 pb-8">
          <div className="space-y-4 max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter"
            >
              Explore{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-emerald-600">
                Everything.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed"
            >
              Pusat navigasi untuk mengakses seluruh halaman, layanan, dan ekosistem digital
              yang tersedia. Pilih kategori untuk memulai.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1 space-y-2 lg:sticky lg:top-32">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
              Kategori Menu
            </h3>

            {exploreMenu.map((section, idx) => {
              const active = selectedCategory === section.category;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(section.category)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all relative overflow-hidden ${
                    active
                      ? "bg-lime-500 text-black shadow-lg shadow-lime-500/20 font-bold"
                      : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-100 dark:border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <section.icon
                      size={18}
                      className={
                        active
                          ? "text-black"
                          : "text-gray-400 group-hover:text-lime-500 transition-colors"
                      }
                    />
                    <span className="text-sm">{section.category}</span>
                  </div>
                  {active && <ChevronRight size={16} className="relative z-10" />}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-2 bg-white dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10 text-lime-500">
                <Sparkles size={20} className="fill-lime-500/20" />
              </div>
              <h2 className="text-2xl font-bold">{selectedCategory}</h2>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {displayItems.map((item, idx) => {
                  const ItemIcon = item.icon || LayoutGrid;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 hover:border-lime-400 dark:hover:border-lime-500/50 shadow-sm hover:shadow-xl hover:shadow-lime-500/10 transition-all duration-300 relative overflow-hidden h-full"
                      >
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-lime-500 group-hover:text-white transition-all shadow-inner">
                          <ItemIcon size={22} strokeWidth={1.5} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors truncate">
                              {item.label}
                            </h3>

                            <ArrowUpRight
                              size={14}
                              className="text-gray-300 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
                            />
                          </div>

                          {item.badge ? (
                            <span
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border tracking-wide ${getBadgeStyle(
                                item.badge
                              )}`}
                            >
                              {item.badge}
                            </span>
                          ) : (
                            <span className="text-[10px] text-gray-400 dark:text-gray-600 group-hover:text-gray-500 transition-colors">
                              Akses halaman
                            </span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
