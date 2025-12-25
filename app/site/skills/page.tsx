"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import AOS from "aos";
import { Code2, Layers, Wrench, PenTool, Plane, Loader2 } from "lucide-react";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

const SECTION_INFO = {
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

type SectionKey = keyof typeof SECTION_INFO;

export default function SkillsPage() {
  const [data, setData] = useState<Record<SectionKey, any[]> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    async function fetchData() {
      try {
        const res = await client.getEntries({ content_type: "skills" });

        const items = res.items.map((item: any) => ({
          id: item.sys.id,
          nama: item.fields.nama,
          kategori: item.fields.kategori,
          link: item.fields.link,
        }));

        setData({
          programming: items.filter((v) => v.kategori === "pemprograman"),
          frameworks: items.filter((v) => v.kategori === "framework"),
          tools: items.filter((v) => v.kategori === "alat"),
          creative: items.filter((v) => v.kategori === "kreatif"),
          experiance: items.filter((v) => v.kategori === "pengalaman"),
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-lime-500" size={34} />
      </section>
    );
  }

  const SECTIONS: SectionKey[] = Object.keys(SECTION_INFO) as SectionKey[];

  return (
    <section id="skills" className="relative py-15 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 px-6">
      <header className="text-center mb-20 space-y-4" data-aos="fade-down">
        <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
          Keahlian &{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-500 to-emerald-600">
            Pengalaman
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Kumpulan teknologi dan alat yang saya gunakan untuk mengubah ide
          menjadi sebuah karya serta pengalaman yang pernah saya ikuti.
        </p>
      </header>

      <div className="space-y-24 max-w-7xl mx-auto">
        {SECTIONS.map((key) => {
          const section = SECTION_INFO[key];
          const items = data[key];
          if (!items || items.length === 0) return null;
          const Icon = section.icon;

          return (
            <section key={key} aria-labelledby={`skill-${key}`} className="w-full">
              <header
                className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-gray-200 dark:border-white/10"
                data-aos="fade-right"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 text-lime-600 dark:text-lime-400">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 id={`skill-${key}`} className="text-2xl font-bold text-lime-500 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-gray-500 dark:text-lime-400 text-sm max-w-lg">
                      {section.desc}
                    </p>
                  </div>
                </div>
              </header>

              <ul
                className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-6 gap-y-12"
                role="list"
              >
                {items.map((item, idx) => (
                  <li
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 30}
                    className="group flex flex-col items-center gap-3 cursor-default"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="absolute inset-0 bg-lime-400/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      <img
                        loading="lazy"
                        src={item.link}
                        alt={item.nama}
                        className="w-12 h-12 object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all dark:invert-[.10] dark:group-hover:invert-0"
                      />
                    </div>

                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white text-center">
                      {item.nama}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
