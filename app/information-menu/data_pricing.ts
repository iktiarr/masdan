import { Star, Zap, Rocket, Crown, Briefcase } from "lucide-react";

export const pricingPackages = [
  {
    id: "starter",
    name: "Starter",
    price: "Rp 0",
    period: "/ selamanya",
    desc: "Akses dasar untuk pemula yang ingin mengintip materi.",
    icon: Star,
    highlight: false,
    color: "gray", // Untuk styling warna
    features: [
      { text: "Akses Artikel Blog Dasar", active: true },
      { text: "Join Komunitas Discord (Public)", active: true },
      { text: "Newsletter Mingguan", active: true },
      { text: "Source Code Project Latihan", active: false },
      { text: "Sesi Mentoring Live", active: false },
    ]
  },
  {
    id: "weekly",
    name: "Sprint",
    price: "Rp 150rb",
    period: "/ minggu",
    desc: "Solusi cepat untuk review kode atau konsultasi sesaat.",
    icon: Zap,
    highlight: false,
    color: "blue",
    features: [
      { text: "Semua Fitur Starter", active: true },
      { text: "1x Sesi Mentoring (60 Menit)", active: true },
      { text: "Code Review (Max 1 Project)", active: true },
      { text: "Akses Rekaman Sesi", active: true },
      { text: "Prioritas Balasan Discord", active: true },
    ]
  },
  {
    id: "monthly",
    name: "Pro Member",
    price: "Rp 500rb",
    period: "/ bulan",
    desc: "Pilihan terbaik untuk belajar intensif dan terstruktur.",
    icon: Rocket,
    highlight: true,
    badge: "PALING LARIS",
    color: "lime", // Warna signature kita
    features: [
      { text: "4x Sesi Mentoring (60 Menit/sesi)", active: true },
      { text: "Unlimited Code Review", active: true },
      { text: "Akses Source Code Premium", active: true },
      { text: "Akses Discord VIP", active: true },
      { text: "Sertifikat Penyelesaian", active: true },
    ]
  },
  {
    id: "yearly",
    name: "Master",
    price: "Rp 4.5jt",
    period: "/ tahun",
    desc: "Komitmen jangka panjang untuk menguasai skill expert.",
    icon: Crown,
    highlight: false,
    color: "purple",
    features: [
      { text: "48x Sesi Mentoring Total", active: true },
      { text: "Roadmap Belajar Personal", active: true },
      { text: "Mockup Interview Kerja", active: true },
      { text: "Garansi Uang Kembali (7 Hari)", active: true },
      { text: "Akses Project Kolaborasi", active: true },
    ]
  },
  {
    id: "business",
    name: "Enterprise",
    price: "Hubungi",
    period: "",
    desc: "Solusi custom untuk tim perusahaan atau private 1-on-1.",
    icon: Briefcase,
    highlight: false,
    color: "orange",
    features: [
      { text: "Training Tim (Max 5 Orang)", active: true },
      { text: "Kurikulum Custom", active: true },
      { text: "On-Demand Mentoring", active: true },
      { text: "Jalur Pribadi (WhatsApp 24/7)", active: true },
      { text: "Kontrak Legal & Invoice", active: true },
    ]
  }
];