"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import AOS from "aos";
import "aos/dist/aos.css";
import { Calendar, MapPin, ExternalLink, Ticket, Loader2, PartyPopper } from "lucide-react";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";

// --- KONFIGURASI CONTENTFUL ---
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

// --- HELPER DATE FORMATTER ---
const formatDate = (dateString: string) => {
  if (!dateString) return "TBA";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long", // "Desember"
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date) + " WIB";
};

// --- HELPER STATUS COLOR (Sesuai Validasi JSON) ---
const getStatusColor = (status: string) => {
  // Normalisasi ke huruf kecil biar aman
  const s = status?.toLowerCase() || "";
  
  if (s === "dibuka") return "bg-lime-500 text-black";
  if (s === "segera hadir") return "bg-blue-500 text-white";
  if (s === "tutup") return "bg-red-500 text-white";
  
  return "bg-gray-500 text-white"; // Default
};

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    async function fetchEvents() {
      try {
        // Fetch Content Type "acara" (Sesuai JSON)
        const res = await client.getEntries({ 
          content_type: "acara",
          // Urutkan dari tanggal paling baru/mendatang
          order: ["fields.tanggal"] 
        });

        const items = res.items.map((entry: any) => {
          const f = entry.fields;
          return {
            id: entry.sys.id,
            title: f.nama,           // Field ID: nama
            date: f.tanggal,         // Field ID: tanggal
            location: f.lokasi,      // Field ID: lokasi
            status: f.status,        // Field ID: status ("Dibuka", "Tutup", "Segera Hadir")
            link: f.link || "#",     // Field ID: link
            bannerUrl: f.banner?.fields?.file?.url ? `https:${f.banner.fields.file.url}` : null, // Field ID: banner
          };
        });

        setEvents(items);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-lime-500" size={34} />
      </section>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white pt-24 pb-20 px-4 md:px-8">
        
        {/* Background Hiasan */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-[100px]" />
           <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* HEADER */}
          <div className="text-center mb-16 space-y-4" data-aos="fade-down">
             <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
               Upcoming <span className="text-lime-600">Events</span>
             </h1>
             <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
               Ikuti webinar, workshop, dan kegiatan seru lainnya. Jangan sampai ketinggalan!
             </p>
          </div>

          {/* EVENTS GRID */}
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, idx) => {
                const isClosed = event.status?.toLowerCase() === 'tutup';
                
                return (
                  <div 
                    key={event.id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="group flex flex-col bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-lime-500/50 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-300"
                  >
                    {/* Banner Image */}
                    <div className="relative aspect-video bg-gray-100 dark:bg-white/5 overflow-hidden">
                      {event.bannerUrl ? (
                        <img 
                          src={event.bannerUrl} 
                          alt={event.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-300 dark:text-gray-600">
                           <PartyPopper size={40} />
                        </div>
                      )}
                      
                      {/* Status Badge (Overlay) */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${getStatusColor(event.status)}`}>
                          {event.status || "Info"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-500 dark:text-gray-400 mb-4">
                         <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-lg border border-gray-100 dark:border-white/5">
                            <Calendar size={14} className="text-lime-600" />
                            <span>{formatDate(event.date)}</span>
                         </div>
                         <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-lg border border-gray-100 dark:border-white/5 max-w-[140px]">
                            <MapPin size={14} className="text-lime-600 shrink-0" />
                            <span className="truncate">{event.location || "Online"}</span>
                         </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                        {event.title || "Nama Event"}
                      </h3>

                      {/* Button - Paling Bawah */}
                      <div className="mt-auto pt-6">
                        <a 
                          href={isClosed ? "#" : event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all active:scale-95
                            ${isClosed 
                              ? 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-white/5' 
                              : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-lime-600 dark:hover:bg-lime-400 shadow-lg shadow-black/5'
                            }
                          `}
                          onClick={(e) => isClosed && e.preventDefault()}
                        >
                           <span>
                             {isClosed ? 'Pendaftaran Ditutup' : 'Lihat Detail / Daftar'}
                           </span>
                           {!isClosed && <ExternalLink size={16} />}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
             // EMPTY STATE
             <div className="text-center py-24 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-300 dark:border-white/10">
                <PartyPopper className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Belum ada event aktif</h3>
                <p className="text-gray-500">Pantau terus halaman ini untuk update selanjutnya!</p>
             </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}