import { 
  FlaskConical, BrainCircuit, Microscope, 
  LineChart, Bot, Share2 
} from "lucide-react";

export const labsData = [
  {
    title: "Sistem Rekomendasi Fuzzy Logic",
    category: "Machine Learning",
    status: "Completed",
    date: "Desember 2025",
    description: "Penelitian skripsi mengenai implementasi metode Fuzzy Logic dan SAW untuk rekomendasi penjurusan mahasiswa TI.",
    link: "/labs/fuzzy-logic", // Nanti arahkan ke detail
    icon: BrainCircuit
  },
  {
    title: "Analisis Sentimen Pemilu",
    category: "Data Science",
    status: "Published",
    date: "November 2025",
    description: "Mining data Twitter/X menggunakan Python untuk melihat polarisasi opini publik menjelang pemilu.",
    link: "/labs/sentimen-analisis",
    icon: LineChart
  },
  {
    title: "Masdaner UI Kit",
    category: "Open Source",
    status: "Ongoing",
    date: "Oktober 2025",
    description: "Eksperimen desain sistem berbasis Shadcn UI dan Tailwind yang digunakan pada website ini.",
    link: "https://github.com/masdaner/ui-kit",
    icon: FlaskConical
  },
  {
    title: "WhatsApp Bot Assistant",
    category: "Automation",
    status: "Prototype",
    date: "September 2025",
    description: "Bot asisten pribadi terintegrasi dengan OpenAI API untuk menjawab pertanyaan seputar portofolio otomatis.",
    link: "/labs/wa-bot",
    icon: Bot
  }
];