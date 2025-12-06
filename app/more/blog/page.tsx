"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { 
  Calendar, ArrowRight, Layout, 
  Loader2, BookOpen, ArrowLeft 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",       
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "", 
});

const getBadgeStyle = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'blog': return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
    case 'artikel': return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800";
    case 'tulisan': return "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800";
    default: return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await client.getEntries({ 
          content_type: 'blog', 
          order: ['-fields.tanggal'], 
        });
        setPosts(res.items);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-lime-500" size={32} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-24 pb-20 px-4 md:px-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[120px]" />
         <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- TOMBOL KEMBALI --- */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-lime-500 dark:hover:border-lime-500 transition-all duration-300 group shadow-sm">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-gray-500 dark:text-gray-400 group-hover:text-lime-500" />
              <span className="text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">Kembali ke Beranda</span>
          </Link>
        </div>

        {/* --- HEADER --- */}
        <div className="mb-12 space-y-2">
           <div className="flex items-center gap-2 text-lime-600 dark:text-lime-400 text-xs font-bold uppercase tracking-widest">
              <BookOpen size={14} /> Blog & Articles
           </div>
           <h1 className="text-3xl md:text-5xl font-black tracking-tight">
             Stories & Insights.
           </h1>
           <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
             Catatan perjalanan, tutorial teknis, dan opini pribadi seputar dunia pengembangan perangkat lunak.
           </p>
        </div>

        {/* --- LIST POSTS (GRID 4 KOLOM) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {posts.map((post) => {
             const { judul, tanggal, jenis, media } = post.fields;
             const imgUrl = media?.fields?.file?.url ? "https:" + media.fields.file.url : null;

             return (
               <Link key={post.sys.id} href={`/more/blog/${post.sys.id}`} className="group flex flex-col bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden hover:border-lime-400 dark:hover:border-lime-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                  
                  {/* Thumbnail Image (Lebih Kecil/Compact) */}
                  <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
                     {imgUrl ? (
                       <Image src={imgUrl} alt={judul} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-gray-400">
                         <Layout size={24} />
                       </div>
                     )}
                     
                     {/* Badge Kecil */}
                     <div className="absolute top-2 left-2">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border shadow-sm ${getBadgeStyle(jenis)}`}>
                          {jenis}
                        </span>
                     </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col flex-1">
                     <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 mb-2 font-mono">
                        <Calendar size={10} />
                        {new Date(tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                     </div>
                     
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors line-clamp-2">
                       {judul}
                     </h3>
                     
                     <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        <span>Read Article</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                     </div>
                  </div>
               </Link>
             );
           })}
        </div>

        {/* Empty State */}
        {posts.length === 0 && !loading && (
           <div className="text-center py-20 text-gray-500 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl mt-10">
              <p>Belum ada tulisan yang dipublikasikan.</p>
           </div>
        )}

      </div>
    </main>
  );
}