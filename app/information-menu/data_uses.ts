import { 
  Code2, Database, Paintbrush, LayoutTemplate, 
  Terminal, Globe, ShieldCheck, Zap 
} from "lucide-react";

export const usesData = [
  {
    category: "Core Framework",
    items: [
      {
        name: "Next.js 14",
        description: "Framework React utama untuk routing dan server-side rendering.",
        link: "https://nextjs.org/",
        icon: Code2
      },
      {
        name: "TypeScript",
        description: "Superset JavaScript untuk tipe data yang aman dan strict.",
        link: "https://www.typescriptlang.org/",
        icon: Terminal
      }
    ]
  },
  {
    category: "Backend & Database",
    items: [
      {
        name: "Supabase",
        description: "Backend-as-a-Service untuk Auth, Database, dan Storage.",
        link: "https://supabase.com/",
        icon: Database
      },
      {
        name: "PostgreSQL",
        description: "Database relasional powerful yang digunakan oleh Supabase.",
        link: "https://www.postgresql.org/",
        icon: Database
      }
    ]
  },
  {
    category: "UI & Styling",
    items: [
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework untuk styling cepat.",
        link: "https://tailwindcss.com/",
        icon: Paintbrush
      },
      {
        name: "Shadcn UI",
        description: "Koleksi komponen UI yang reusable dan accessible.",
        link: "https://ui.shadcn.com/",
        icon: LayoutTemplate
      },
      {
        name: "Framer Motion",
        description: "Library animasi untuk React yang halus dan deklaratif.",
        link: "https://www.framer.com/motion/",
        icon: Zap
      },
      {
        name: "Lucide Icons",
        description: "Set ikon open-source yang ringan dan konsisten.",
        link: "https://lucide.dev/",
        icon: Paintbrush
      }
    ]
  },
  {
    category: "Deployment & Tools",
    items: [
      {
        name: "Vercel",
        description: "Platform deployment hosting untuk aplikasi Next.js.",
        link: "https://vercel.com/",
        icon: Globe
      },
      {
        name: "Sonner",
        description: "Library notifikasi toast yang cantik dan ringan.",
        link: "https://sonner.emilkowal.ski/",
        icon: ShieldCheck
      }
    ]
  }
];