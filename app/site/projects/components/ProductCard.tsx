"use client";

import { ShoppingCart, ExternalLink, Calendar, Info, Layout, Tag, Award, Layers } from "lucide-react";
import { motion } from "framer-motion";

const getTagStyle = (text: string) => {
  if (!text) return "bg-gray-200 text-gray-700 border-gray-300";
  const t = text.toLowerCase();

  if (t.includes("baru") || t.includes("website")) return "bg-blue-100 text-blue-700 border-blue-200";
  if (t.includes("premium") || t.includes("aplikasi")) return "bg-purple-100 text-purple-700 border-purple-200";
  if (t.includes("hot") || t.includes("berbayar")) return "bg-red-100 text-red-700 border-red-200";
  if (t.includes("gratis") || t.includes("desain")) return "bg-emerald-100 text-emerald-700 border-emerald-200";

  return "bg-white/50 text-slate-700 border-slate-200";
};

export default function ProductCard({ item, index = 0 }: { item: any, index?: number }) {
  const { 
    name, 
    description, 
    image, 
    label, 
    badge, 
    jenis,
    harga, 
    diskon, 
    previewUrl, 
    tanggal, 
    note 
  } = item.fields;

  const displayDate = new Date(tanggal || item.sys.createdAt).toLocaleDateString("id-ID", { 
    day: "numeric", month: "short", year: "numeric" 
  });

  const formatRupiah = (num: number) => new Intl.NumberFormat("id-ID", { 
    style: "currency", currency: "IDR", maximumFractionDigits: 0 
  }).format(num);

  const imageUrl = image?.fields?.file?.url ? "https:" + image.fields.file.url : "";
  const isFree = harga === 0;
  const hasDiscount = diskon && diskon < harga;

  const handleBuy = () => {
    const phone = "6285143875550";
    const text = `Halo Admin, saya tertarik dengan produk: *${name}* (${isFree ? 'Gratis' : formatRupiah(harga)}). Mohon informasinya.`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-white/20"
      style={{ backgroundColor: 'oklch(70.4% 0.04 256.788)' }}
    >

      <div className="relative w-full h-36 bg-black/10 overflow-hidden shrink-0">
        {imageUrl ? (
           <img 
             src={imageUrl} 
             alt={name} 
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
           />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
            <Layout size={24} />
            <span className="text-[10px] mt-1 font-mono">TIDAK ADA GAMBAR</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
           {badge && (
             <span className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getTagStyle(badge)}`}>
               <Award size={10} /> {badge}
             </span>
           )}
           {label && (
             <span className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border ${getTagStyle(label)}`}>
               <Tag size={10} /> {label}
             </span>
           )}
           {jenis && (
             <span className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border ${getTagStyle(jenis)}`}>
               <Layers size={10} /> {jenis}
             </span>
           )}
        </div>

        <h3 className="text-slate-900 font-bold text-base leading-tight mb-2 line-clamp-1 group-hover:text-blue-700 transition-colors">
          {name}
        </h3>

        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3 border-l-2 border-slate-400/30 pl-2">
          {description || "Tidak ada deskripsi."}
        </p>

        <div className="mt-auto space-y-2">
           <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              <Calendar size={10} /> {displayDate}
           </div>

           {note && (
             <div className="flex gap-1.5 items-start p-1.5 rounded bg-white/40 border border-white/50">
                <Info size={12} className="text-slate-600 mt-0.5 shrink-0" />
                <p className="text-[10px] text-slate-700 leading-tight italic">{note}</p>
             </div>
           )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-900/10 flex flex-col gap-3">
          <div className="flex items-end justify-between">
             <div className="flex flex-col">
               {hasDiscount && (
                 <span className="text-[11px] text-slate-500 line-through decoration-red-500 decoration-1 font-medium">
                   {formatRupiah(diskon)}
                 </span>
               )}
               <span className={`text-base font-extrabold ${isFree ? 'text-emerald-600' : 'text-slate-900'}`}>
                 {isFree ? "Gratis" : formatRupiah(harga)}
               </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
             {previewUrl ? (
               <a 
                 href={previewUrl} 
                 target="_blank" 
                 className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 text-slate-700 border border-slate-200 transition-all text-[10px] font-bold shadow-sm group/demo"
               >
                 <ExternalLink size={12} className="group-hover/demo:scale-110 transition-transform text-blue-600" /> 
                 Lihat Demo
               </a>
             ) : (
               <button disabled className="flex items-center justify-center px-3 py-2 rounded-lg bg-black/5 text-slate-400 border border-transparent text-[10px] font-bold cursor-not-allowed">
                 tidak ada demo
               </button>
             )}

             <button 
               onClick={handleBuy}
               className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-black text-white font-bold text-[10px] transition-all active:scale-95 shadow-md"
             >
               <ShoppingCart size={12} className="text-emerald-400" /> 
               {isFree ? "Klaim" : "Beli"}
             </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}