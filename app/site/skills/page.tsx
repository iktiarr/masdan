"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import AOS from "aos";

import { Code2, Layers, Wrench, PenTool, Loader2, Plane } from "lucide-react";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",       
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "", 
});

const SECTION_INFO: any = {
  programming: {
    title: "Bahasa Pemrograman",
    desc: "Bahasa inti yang menjadi pondasi logika dalam setiap baris kode yang saya tulis.",
    icon: Code2,
  },
  frameworks: {
    title: "Kerangka Kerja & Library",
    desc: "Alat bantu modern untuk membangun sistem yang scalable, cepat, dan efisien.",
    icon: Layers,
  },
  tools: {
    title: "Alat Developer",
    desc: "Manajemen infrastruktur kode untuk alur kerja yang mulus.",
    icon: Wrench,
  },
  creative: {
    title: "Desain & Kreatif",
    desc: "Sentuhan artistik untuk menciptakan antarmuka yang fungsional dan indah.",
    icon: PenTool,
  },
  experiance: {
    title: "Pengalaman Kerja",
    desc: "Adaptasi dengan semua hal diluar ruang kerja.",
    icon: Plane,
  },
};

export default function SkillsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });

    async function fetchData() {
      try {
        const res = await client.getEntries({ content_type: 'skills' });
        
        const items = res.items.map((item: any) => ({
          id: item.sys.id,
          nama: item.fields.nama,
          kategori: item.fields.kategori,
          link: item.fields.link,
        }));

        const groupedData = {
          programming: items.filter((i: any) => i.kategori === 'pemprograman'),
          experiance: items.filter((i: any) => i.kategori === 'pengalaman'),
          frameworks: items.filter((i: any) => i.kategori === 'framework'),
          creative: items.filter((i: any) => i.kategori === 'kreatif'),
          tools: items.filter((i: any) => i.kategori === 'alat'),
        };

        setData(groupedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-lime-500" size={32} />
      </div>
    );
  }

  const CATEGORY_SECTIONS = [
    { key: 'programming', items: data.programming },
    { key: 'frameworks', items: data.frameworks },
    { key: 'experiance', items: data.experiance },
    { key: 'creative', items: data.creative },
    { key: 'tools', items: data.tools },
  ];

  return (
    <section id="skills" className="relative py-24 px-4 md:px-8 bg-white dark:bg-[#0a0a0a] flex flex-col items-center min-h-screen overflow-hidden transition-colors duration-300">
      <div className="relative w-full max-w-8xl z-10">
        <div className="text-center mb-24 space-y-4" data-aos="fade-down">
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
            Keahlian & <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-emerald-600">Pengalaman</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Kumpulan teknologi dan alat yang saya gunakan untuk mengubah ide menjadi sebuah karya serta pengalaman yang pernah saya ikuti.
          </p>
        </div>

        <div className="space-y-24">
          
          {CATEGORY_SECTIONS.map((section, sectionIdx) => (
            section.items.length > 0 && (
              <div key={section.key} className="w-full">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 dark:border-white/10" data-aos="fade-right">
                   <div className="flex items-start gap-4">
                      {(() => {
                        const Icon = SECTION_INFO[section.key]?.icon || Code2;
                        return (
                          <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 text-lime-600 dark:text-lime-400">
                            <Icon size={24} />
                          </div>
                        );
                      })()}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-none mb-2">
                           {SECTION_INFO[section.key]?.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg leading-relaxed">
                          {SECTION_INFO[section.key]?.desc}
                        </p>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-x-6 gap-y-10">
                  {section.items.map((item: any, idx: number) => (
                    <div 
                      key={item.id}
                      data-aos="fade-up"
                      data-aos-delay={idx * 30}
                      className="group flex flex-col items-center gap-4 cursor-default relative"
                    >

                      <div className="relative w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute inset-0 bg-lime-400/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <img 
                          src={item.link} 
                          alt={item.nama} 
                          className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100 dark:invert-[.10] dark:group-hover:invert-0 drop-shadow-sm"
                        />
                      </div>

                      <div className="flex flex-col items-center gap-2 w-full">
                        <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors text-center">
                          {item.nama}
                        </h4>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )
          ))}

        </div>

      </div>
    </section>
  );
}