export interface ReleaseChange {
  type: "new" | "update" | "fix";
  text: string;
}

export interface ReleaseItem {
  version: string;
  date: string;
  title: string;
  description: string; // Deskripsi singkat untuk header Popup
  isLatest: boolean;
  changes: ReleaseChange[];
}

export const releasesData: ReleaseItem[] = [
  {
    version: "v1.3.0",
    date: "22 Desember 2025",
    title: "Big Update: Arsip & UI",
    description: "Kami baru saja merilis fitur Arsip Dokumen dan perbaikan tampilan Track Record.",
    isLatest: true, // <--- Cukup pindahkan ini ke object lain jika ada update baru
    changes: [
      { 
        type: "new", 
        text: "Arsip Dokumen Digital: Fitur baru untuk preview sertifikat & dokumen secara langsung." 
      },
      { 
        type: "update", 
        text: "Track Record UI: Tampilan riwayat pendidikan kini lebih interaktif dengan peta." 
      },
      { 
        type: "fix", 
        text: "Clean Design System: Perbaikan padding pada mode mobile agar lebih responsif." 
      },
      { 
        type: "fix", 
        text: "Sistem Maintenance: Peningkatan keamanan dan stabilitas server." 
      }
    ]
  },
  {
    version: "v1.0.1",
    date: "8 Desember 2025",
    title: "Perbaikan Bug & Optimasi",
    description: "Fokus pada perbaikan layout blog dan optimalisasi iklan.",
    isLatest: false,
    changes: [
      { type: "update", text: "Memperbaharui desain banner ads agar lebih responsif di mobile." },
      { type: "fix", text: "Memperbaiki bug layout pada halaman blog saat mode gelap." },
      { type: "new", text: "Menambahkan fitur filter kategori pada halaman blog." }
    ]
  },
  {
    version: "v1.0.0",
    date: "7 Desember 2025",
    title: "Peluncuran Perdana",
    description: "Peluncuran resmi website portfolio Masdaner.",
    isLatest: false,
    changes: [
      { type: "new", text: "Peluncuran resmi website portfolio versi 1.0." },
      { type: "new", text: "Integrasi sistem manajemen konten (Contentful)." },
      { type: "new", text: "Fitur formulir kontak dan testimonial." }
    ]
  }
];