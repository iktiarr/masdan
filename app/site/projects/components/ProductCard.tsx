"use client";

import { ShoppingCart, ExternalLink, Calendar, Info, Layout, Tag, Award, Layers } from "lucide-react";


const getTagStyle = (text: string) => {
  if (!text) return "bg-gray-200 text-gray-700 border-gray-300";
  const t = text.toLowerCase();

  if (t.includes("baru") || t.includes("website")) return "bg-blue-100 text-blue-700 border-blue-200";
  if (t.includes("premium") || t.includes("aplikasi")) return "bg-purple-100 text-purple-700 border-purple-200";
  if (t.includes("hot") || t.includes("berbayar")) return "bg-red-100 text-red-700 border-red-200";
  if (t.includes("gratis") || t.includes("desain")) return "bg-emerald-100 text-emerald-700 border-emerald-200";

  return "bg-white/50 text-slate-700 border-slate-200";
};

export default function ProductCard({ item, index = 0 }: { item: any; index?: number }) {
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
  } = item.fields ?? {};

  const rawDate = tanggal ?? item?.sys?.createdAt;
  const displayDate = rawDate
    ? new Date(rawDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    : "";

  const formatRupiah = (num: number | string | undefined) => {
    const n = Number(num ?? 0) || 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(n);
  };

  const imageUrl = image?.fields?.file?.url ? String(image.fields.file.url).startsWith("http") ? String(image.fields.file.url) : `https:${image.fields.file.url}` : "";
  const isFree = Number(harga) === 0;
  const hasDiscount = Boolean(diskon) && Number(diskon) < Number(harga || 0);

  const titleId = `product-title-${index}-${item?.sys?.id ?? "x"}`;

  const handleBuy = () => {
    const phone = "6285143875550";
    const text = `Halo Admin, saya tertarik dengan produk: *${name}* (${isFree ? "Gratis" : formatRupiah(harga)}). Mohon informasinya.`;
    if (typeof window !== "undefined") {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      aria-labelledby={titleId}
      role="article"
      className="group flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-white/10 bg-white dark:bg-[#040a0c57]"
    >
      <div className="relative w-full h-36 bg-black/5 overflow-hidden shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name ?? "Produk"}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
            <Layout size={24} aria-hidden />
            <span className="text-[10px] mt-1 font-mono">TIDAK ADA GAMBAR</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {badge && (
            <span
              className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getTagStyle(
                badge
              )}`}
              aria-hidden
            >
              <Award size={10} /> {badge}
            </span>
          )}
          {label && (
            <span
              className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border ${getTagStyle(label)}`}
              aria-hidden
            >
              <Tag size={10} /> {label}
            </span>
          )}
          {jenis && (
            <span
              className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border ${getTagStyle(jenis)}`}
              aria-hidden
            >
              <Layers size={10} /> {jenis}
            </span>
          )}
        </div>

        <h3 id={titleId} className="text-slate-900 font-bold text-base leading-tight mb-2 line-clamp-1 dark:text-lime-400 group-hover:text-blue-700 transition-colors">
          {name}
        </h3>

        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3 border-l-2 dark:text-stone-50 border-slate-400/30 pl-2">
          {description ?? "Tidak ada deskripsi."}
        </p>

        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-stone-50 font-mono">
            <Calendar size={10} aria-hidden /> <span>{displayDate}</span>
          </div>

          {note && (
            <div className="flex gap-1.5 items-start p-1.5 rounded bg-white border border-white/50">
              <Info size={12} className="text-slate-600 mt-0.5 shrink-0" aria-hidden />
              <p className="text-[10px] text-slate-700 dark:text-black leading-tight italic">{note}</p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-900/10 flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[15px] text-slate-500 line-through dark:text-stone-50 decoration-red-600 decoration-2 font-medium">
                  {formatRupiah(diskon)}
                </span>
              )}
              <span className={`text-base font-extrabold dark:text-lime-400 ${isFree ? "text-emerald-600" : "text-slate-900"}`}>
                {isFree ? "Gratis" : formatRupiah(harga)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {previewUrl ? (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Lihat demo ${name}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 text-slate-700 border border-slate-200 transition-all text-[10px] font-bold shadow-sm"
              >
                <ExternalLink size={12} className="text-blue-600" aria-hidden /> Lihat Demo
              </a>
            ) : (
              <button
                disabled
                type="button"
                aria-disabled
                className="flex items-center justify-center px-3 py-2 rounded-lg bg-black/5 text-slate-400 border border-transparent text-[10px] font-bold cursor-not-allowed"
              >
                tidak ada demo
              </button>
            )}

            <button
              onClick={handleBuy}
              type="button"
              aria-label={isFree ? `Klaim ${name}` : `Beli ${name}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-black text-white font-bold text-[10px] transition-all active:scale-95 shadow-md"
            >
              <ShoppingCart size={12} className="text-lime-400" aria-hidden /> {isFree ? "Klaim" : "Beli"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
