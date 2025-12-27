export interface ReleaseChange {
  type: "new" | "update" | "fix";
  text: string;
}

export interface ReleaseItem {
  version: string;
  date: string;
  title: string;
  description: string;
  isLatest: boolean;
  changes: ReleaseChange[];
}

export const releasesData: ReleaseItem[] = [
  {
    version: "v1.4.0",
    date: "27 Desember 2025",
    title: "Perbaikan dan Update Fitur",
    description: "Kami baru saja merilis beberapa fitur terbaru, silahkan membaca catatan liris kami",
    isLatest: true,
    changes: [
      { 
        type: "new", 
        text: "Beberapa fitur terbaru seperti halaman ddokumen dan halaman fitur lainnya." 
      },
      { 
        type: "new", 
        text: "Menyiapkan fitur dan halaman baru bagi pengguna" 
      },
      { 
        type: "update", 
        text: "Memperbaiki tampilan halaman agar lebih mudah dibaca dan lebih menyesuaikan" 
      },
      { 
        type: "fix", 
        text: "Memperbaiki masalah yang terjadi pada setiap halaman" 
      },
      { 
        type: "fix", 
        text: "Meningkatkan performa dan analisa sistem serta data agar lebih nyaman digunakan" 
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