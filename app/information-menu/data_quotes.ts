// app/information-menu/data_quotes.ts

export interface QuoteItem {
  id: string;
  name: string;
  role: string; // Sub-judul warna (misal: "The Silversmith")
  category: string; // Teks kecil di atas (misal: "ORGANIC SHAPES")
  quote: string;
  description: string;
  image_url: string;
  location: string; // Badge lokasi
  tag: string; // Badge tag
  link_text: string;
  link_url: string;
}

export const quotesData: QuoteItem[] = [
  {
    id: "1",
    name: "Steve Jobs",
    role: "Visionary & Founder",
    category: "INNOVATION & DESIGN",
    quote: "Orang-orang yang cukup gila untuk berpikir bahwa mereka dapat mengubah dunia, adalah orang-orang yang benar-benar melakukannya.",
    description: "Kreativitas hanyalah menghubungkan berbagai hal. Ketika Anda bertanya kepada orang-orang kreatif bagaimana mereka melakukan sesuatu, mereka merasa sedikit bersalah karena mereka tidak benar-benar melakukannya, mereka hanya melihat sesuatu.",
    image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
    location: "Cupertino, CA",
    tag: "Technology",
    link_text: "Baca Biografi",
    link_url: "#"
  },
  {
    id: "2",
    name: "Linus Torvalds",
    role: "Creator of Linux",
    category: "OPEN SOURCE PHILOSOPHY",
    quote: "Talk is cheap. Show me the code. Perangkat lunak itu seperti seks: lebih baik jika gratis (bebas).",
    description: "Kecerdasan adalah kemampuan untuk menghindari melakukan pekerjaan, namun tetap menyelesaikan pekerjaan tersebut. Filosofi open source mengajarkan kita bahwa kolaborasi terbuka menghasilkan solusi yang lebih baik.",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    location: "Helsinki, Finland",
    tag: "Coding",
    link_text: "Lihat Repository",
    link_url: "#"
  },
  {
    id: "3",
    name: "Ada Lovelace",
    role: "First Programmer",
    category: "HISTORY & LOGIC",
    quote: "Otak saya lebih dari sekadar fana; seiring waktu akan membuktikannya. Sains imajinasi adalah matematika.",
    description: "Menjembatani kesenjangan antara seni dan sains. Dia melihat potensi komputer jauh melampaui perhitungan angka biasa, membayangkan sebuah dunia di mana mesin dapat memanipulasi simbol apa pun.",
    image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
    location: "London, UK",
    tag: "History",
    link_text: "Pelajari Sejarah",
    link_url: "#"
  }
];