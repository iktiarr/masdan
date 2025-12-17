import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { Calendar, MapPin, AlertTriangle, User, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ShareButton from "@/app/more/blog/components/ShareButton";
import SimpleHeader from "@/app/asset/navbar_atas";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

async function getBlogPost(id: string) {
  try {
    const res = await client.getEntries({
      content_type: "blog",
      "sys.id": id,
      limit: 1,
    });
    if (res.items.length > 0) return res.items[0];
    return null;
  } catch {
    return null;
  }
}

const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <strong className="font-bold text-gray-900 dark:text-white">{text}</strong>
    ),
    [MARKS.CODE]: (text: any) => (
      <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-red-600 dark:text-red-400 font-mono text-sm border border-gray-200 dark:border-white/10">
        {text}
      </code>
    ),
    [MARKS.ITALIC]: (text: any) => (
      <em className="italic text-gray-800 dark:text-gray-200">{text}</em>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: any, children: any) => (
      <p className="mb-8 text-gray-700 dark:text-gray-300 leading-8 text-lg">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_2]: (_: any, children: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 pb-4 border-b border-gray-200 dark:border-white/10">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_: any, children: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
        {children}
      </h3>
    ),
    [BLOCKS.UL_LIST]: (_: any, children: any) => (
      <ul className="list-disc ml-6 mb-8 space-y-3 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_: any, children: any) => (
      <ol className="list-decimal ml-6 mb-8 space-y-3 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
    [BLOCKS.QUOTE]: (_: any, children: any) => (
      <div className="my-10 pl-6 border-l-4 border-lime-500 bg-gray-50 dark:bg-[#111] py-6 pr-4 rounded-r-xl">
        <p className="text-lg italic text-gray-600 dark:text-gray-400 font-serif leading-relaxed">
          "{children}"
        </p>
      </div>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lime-600 dark:text-lime-400 underline decoration-lime-500/30 hover:decoration-lime-500 transition-all font-medium"
      >
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      const imageUrl = file?.url ? "https:" + file.url : "";
      if (!imageUrl) return null;

      return (
        <figure className="my-10">
          <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#1a1a1a]">
            <Image src={imageUrl} alt={title || "Image"} fill className="object-contain" />
          </div>
          {title && (
            <figcaption className="text-center text-xs text-gray-500 mt-3 italic">
              {title}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

type Props = {
  params: { id: string };
};

export default async function BlogDetail({ params }: Props) {
  const post: any = await getBlogPost(params.id);
  const { judul, jenis, lokasi, isi, tanggal } = post.fields;
  const displayDate = new Date(tanggal || post.sys.createdAt).toLocaleDateString(
    "id-ID",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] transition-colors">

      <SimpleHeader />

      <article className="max-w-3xl mx-auto px-6 pt-24 pb-16">

        <header className="mb-12 border-b border-gray-200 dark:border-white/10 pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {jenis && (
              <span className="px-3 py-1 rounded-full bg-lime-100 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400 text-xs font-bold uppercase border border-lime-200 dark:border-lime-500/20">
                {jenis}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={14} /> {displayDate}
            </span>
            {lokasi && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 border-l pl-3">
                <MapPin size={14} /> {lokasi.lat.toFixed(2)}, {lokasi.lon.toFixed(2)}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
            {judul}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#222] flex items-center justify-center border">
                <User size={18} />
              </div>
              <div>
                <p className="text-sm font-bold">Iktiar Ramadani</p>
                <p className="text-xs text-gray-500">Penulis & Developer</p>
              </div>
            </div>

            <ShareButton title={judul} />
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {isi ? (
            documentToReactComponents(isi, renderOptions)
          ) : (
            <div className="py-12 text-center bg-gray-50 dark:bg-[#111] rounded-xl border border-dashed">
              <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-500">Konten sedang disiapkan.</p>
            </div>
          )}
        </div>

      </article>
    </main>
  );
}
