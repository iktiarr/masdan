"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client"; 
import { motion } from "framer-motion";
import { 
  Play, Pause, Heart, Download, Bookmark, 
  Music2, Loader2, Headphones, Disc
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/app/asset/navbar_atas";
import Footer from "@/app/asset/footer_bawah";

// Import Tipe Data
import { Song } from "@/app/information-menu/data_music";

export default function MusicPage() {
  const supabase = createClient();
  
  // --- STATE ---
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Audio State
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Interaction State (Disiapkan dulu, fungsi backend dimatikan sementara sesuai request)
  const [likedSongIds, setLikedSongIds] = useState<Set<string>>(new Set());
  const [favoritedSongIds, setFavoritedSongIds] = useState<Set<string>>(new Set());
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data: songsData, error } = await supabase
        .from("songs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching songs:", error);
      else setSongs(songsData || []);

      setLoading(false);
    };

    fetchData();
  }, []);

  // --- AUDIO LOGIC (SINGLE SOURCE) ---
  const handlePlayPause = (song: Song) => {
    if (!audioRef.current) return;

    // Jika lagu yang diklik adalah lagu yang sedang aktif
    if (currentSongId === song.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Ganti Lagu Baru (Otomatis lagu lama berhenti karena tag audio cuma satu)
      audioRef.current.src = song.audio_url;
      audioRef.current.play().catch(e => {
        console.error("Playback error:", e);
        toast.error("Gagal memutar audio. Cek link sumber.");
      });
      setCurrentSongId(song.id);
      setIsPlaying(true);
    }
  };

  // --- UI COMPONENTS ---
  // Komponen Visualizer Bar (Gelombang Suara)
  const MusicBars = () => (
    <div className="flex items-end gap-[2px] h-4 ml-3">
      <span className="w-1 bg-lime-500 rounded-t-sm animate-[music-bar_1s_ease-in-out_infinite]"></span>
      <span className="w-1 bg-lime-500 rounded-t-sm animate-[music-bar_1.2s_ease-in-out_infinite_0.1s]"></span>
      <span className="w-1 bg-lime-500 rounded-t-sm animate-[music-bar_0.8s_ease-in-out_infinite_0.2s]"></span>
      <span className="w-1 bg-lime-500 rounded-t-sm animate-[music-bar_1.1s_ease-in-out_infinite_0.3s]"></span>
    </div>
  );

  return (
    <>
      <Navbar />
      
      {/* GLOBAL AUDIO ELEMENT 
         Hanya ada satu di halaman ini. Ini menjamin tidak ada musik double.
      */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} onError={() => setIsPlaying(false)} />

      <main className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-gray-900 dark:text-white pt-28 pb-20 px-4 md:px-8">
        
        {/* Background Ambient */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[5%] right-[10%] w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-[120px]" />
           <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header Section */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-white/5 pb-8">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-2"
              >
                <div className="p-2 bg-lime-100 dark:bg-lime-900/20 rounded-lg text-lime-600 dark:text-lime-400">
                  <Music2 size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-lime-600 dark:text-lime-500">Music Collection</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black tracking-tighter"
              >
                Masdaner <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">Vibes</span>
              </motion.h1>
            </div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-full shadow-sm"
            >
              <Headphones size={16} className="text-lime-500" />
              <span className="font-bold text-sm">{songs.length} Tracks</span>
            </motion.div>
          </div>

          {loading && (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <Loader2 className="animate-spin text-lime-500" size={40} />
              <p className="text-sm text-gray-500">Memuat playlist...</p>
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song, idx) => {
                const active = currentSongId === song.id;
                
                return (
                  <motion.div 
                    key={song.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`
                      group relative overflow-hidden rounded-3xl p-4 transition-all duration-500
                      ${active 
                        ? 'bg-white dark:bg-[#0f1c0f] border-lime-500 ring-1 ring-lime-500/50 shadow-xl shadow-lime-500/10' 
                        : 'bg-white dark:bg-[#121212] border-gray-200 dark:border-white/5 hover:border-lime-500/30 hover:shadow-lg'
                      }
                      border
                    `}
                  >
                    
                    <div className="flex items-center gap-4">
                      {/* 1. Cover Image (Sekarang Bersih tanpa tombol) */}
                      <div className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 shadow-inner`}>
                        <img 
                          src={song.cover_url} 
                          alt={song.title} 
                          className={`w-full h-full object-cover transition-transform duration-700 ${active && isPlaying ? 'scale-110' : 'group-hover:scale-105'}`} 
                        />
                        {/* Efek Vinyl Spinning kecil di pojok jika aktif */}
                        {active && isPlaying && (
                           <div className="absolute bottom-1 right-1 p-1 bg-black/50 backdrop-blur-sm rounded-full animate-spin-slow">
                              <Disc size={12} className="text-lime-400" />
                           </div>
                        )}
                      </div>

                      {/* 2. Info Lagu & Visualizer */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center h-full gap-1">
                        <div className="flex items-center">
                           <h3 className={`font-bold text-lg truncate ${active ? 'text-lime-600 dark:text-lime-400' : 'text-gray-900 dark:text-white'}`}>
                             {song.title}
                           </h3>
                           {/* Tampilkan visualizer di sebelah judul jika aktif */}
                           {active && isPlaying && <MusicBars />}
                        </div>
                        
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate flex items-center gap-1">
                          {song.artist}
                        </p>

                        {/* 3. Tombol Play (Terpisah, Besar, Mudah di klik) */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <button 
                            onClick={() => handlePlayPause(song)}
                            className={`
                              w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
                              ${active && isPlaying 
                                ? 'bg-lime-500 text-white shadow-lime-500/40 scale-100' 
                                : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-lime-500 hover:text-white hover:scale-110'
                              }
                            `}
                          >
                             {active && isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 4. Action Bar (Bawah) */}
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                       {/* Like (Visual Only sementara) */}
                       <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/10 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors group/btn">
                          <Heart size={16} className="group-hover/btn:fill-red-500 transition-colors" />
                          <span>Like</span>
                       </button>

                       {/* Action Kanan */}
                       <div className="flex gap-1">
                          <a 
                            href={song.audio_url} 
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-lime-600 transition-colors"
                            title="Download"
                          >
                            <Download size={16} />
                          </a>
                          
                          <button 
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-lime-600 transition-colors"
                            title="Simpan (Coming Soon)"
                          >
                            <Bookmark size={16} />
                          </button>
                       </div>
                    </div>

                    {/* Progress Bar Hiasan (Hanya muncul jika aktif) */}
                    {active && isPlaying && (
                       <div className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-500/20">
                          <motion.div 
                            layoutId="progressBar"
                            className="h-full bg-lime-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 30, ease: "linear" }} // Estimasi durasi visual
                          />
                       </div>
                    )}

                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && songs.length === 0 && (
            <div className="text-center py-24">
              <div className="inline-flex p-4 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
                 <Music2 className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Playlist Kosong</h3>
              <p className="text-gray-500 dark:text-gray-400">Belum ada lagu yang ditambahkan ke koleksi ini.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* Style untuk animasi custom */}
      <style jsx global>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </>
  );
}