import { createClient } from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { Calendar, MapPin, ArrowLeft, AlertTriangle, User, Clock, BookOpen, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ShareButton from "@/app/more/blog/components/ShareButton"; // <-- Tambahkan ini

export const revalidate = 0; 
export const dynamic = "force-dynamic";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",       
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "", 
});

async function getBlogPost(id: string) {
  try {
    const res = await client.getEntries({
      content_type: 'blog',
      'sys.id': id,
      limit: 1
    });
    if (res.items.length > 0) return res.items[0];
    return null;
  } catch (error) {
    return null;
  }
}

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong className="font-bold text-gray-900 dark:text-white">{text}</strong>,
    [MARKS.CODE]: (text: any) => <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-red-600 dark:text-red-400 font-mono text-sm border border-gray-200 dark:border-white/10">{text}</code>,
    [MARKS.ITALIC]: (text: any) => <em className="italic text-gray-800 dark:text-gray-200">{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-8 text-gray-700 dark:text-gray-300 leading-8 text-lg">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 pb-4 border-b border-gray-200 dark:border-white/10">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc ml-6 mb-8 space-y-3 text-gray-700 dark:text-gray-300">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal ml-6 mb-8 space-y-3 text-gray-700 dark:text-gray-300">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <div className="my-10 pl-6 border-l-4 border-lime-500 bg-gray-50 dark:bg-[#111] py-6 pr-4 rounded-r-xl">
        <p className="text-lg italic text-gray-600 dark:text-gray-400 font-serif leading-relaxed">
          "{children}"
        </p>
      </div>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-lime-600 dark:text-lime-400 underline decoration-lime-500/30 hover:decoration-lime-500 transition-all font-medium">
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      const imageUrl = file?.url ? 'https:' + file.url : '';
      if (!imageUrl) return null;
      return (
        <figure className="my-10">
          <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm bg-gray-100 dark:bg-[#1a1a1a]">
            <Image src={imageUrl} alt={title || "Image"} fill className="object-contain" />
          </div>
          {title && <figcaption className="text-center text-xs text-gray-500 mt-3 italic">{title}</figcaption>}
        </figure>
      );
    }
  },
};

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function BlogDetail({ params }: Props) {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const { id } = resolvedParams;

  const post: any = await getBlogPost(id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] text-center p-6">
        <div className="p-8 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl max-w-md">
           <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-4" />
           <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Artikel Tidak Ditemukan</h2>
           <Link href="/blog" className="mt-4 inline-block px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-sm transition-transform hover:scale-105">
             Kembali ke Blog
           </Link>
        </div>
      </div>
    );
  }

  const { judul, jenis, lokasi, isi, tanggal } = post.fields || {};
  
  const rawDate = tanggal || post.sys.createdAt;
  let displayDate = "";
  try {
    displayDate = new Date(rawDate).toLocaleDateString("id-ID", { 
      day: 'numeric', month: 'long', year: 'numeric' 
    });
  } catch (e) {
    displayDate = "Tanggal publikasi";
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white font-sans transition-colors duration-300 pt-5 pb-10">
      
      <article className="max-w-3xl mx-auto px-6">
        
        {/* --- TOP NAVIGATION --- */}
        <div className="mb-10">
          <Link href="/more/blog" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors group">
             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
             Kembali ke Daftar
          </Link>
        </div>

        {/* --- ARTICLE HEADER --- */}
        <header className="mb-12 border-b border-gray-200 dark:border-white/10 pb-10">
           
           {/* Meta Tags */}
           <div className="flex flex-wrap items-center gap-3 mb-6">
              {jenis && (
                <span className="px-3 py-1 rounded-full bg-lime-100 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400 text-xs font-bold uppercase tracking-wide border border-lime-200 dark:border-lime-500/20">
                  {jenis}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 font-medium">
                 <Calendar size={14} /> {displayDate}
              </span>
              {lokasi && (
                <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 font-medium border-l border-gray-300 dark:border-white/20 pl-3 ml-1">
                   <MapPin size={14} /> {lokasi.lat.toFixed(2)}, {lokasi.lon.toFixed(2)}
                </span>
              )}
           </div>

           {/* Judul Utama */}
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6">
             {judul}
           </h1>

           {/* Author Info (Statis) */}
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#222] flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                    <User size={20} />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Iktiar Ramadani</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Penulis & Developer</p>
                 </div>
              </div>
              
              {/* ... kode author ... */}
              <ShareButton title={judul || "Artikel Blog"} />
           </div>

        </header>

        {/* --- ARTICLE CONTENT --- */}
        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-lime-600 prose-img:rounded-xl max-w-none">
           {isi ? documentToReactComponents(isi, renderOptions) : (
             <div className="py-12 text-center bg-gray-50 dark:bg-[#111] rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500">Konten sedang disiapkan.</p>
             </div>
           )}
        </div>

        {/* --- ARTICLE FOOTER --- */}
        <footer className="mt-20 pt-10 border-t border-gray-200 dark:border-white/10">
           
           <div className="bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-2xl p-8 md:p-10 text-center">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Terima kasih telah membaca!</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                Jika artikel ini bermanfaat, jangan ragu untuk membagikannya atau menjelajahi tulisan lainnya.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link 
                   href="/more/blog" 
                   className="w-full sm:w-auto px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-sm transition-transform hover:-translate-y-1 shadow-lg"
                 >
                   Artikel Lainnya
                 </Link>
                 <Link 
                   href="/" 
                   className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-transparent border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white rounded-full font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                 >
                   Ke Beranda
                 </Link>
              </div>
           </div>

        </footer>

      </article>
    </main>
  );
}