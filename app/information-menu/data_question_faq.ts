import { 
  ShoppingBag, Code2, Layers, HelpCircle, 
  CreditCard, ShieldCheck, User 
} from "lucide-react";

export const faqData = [
  {
    category: "Umum & Profil",
    icon: User,
    items: [
      {
        q: "Siapa di balik website Iktiar Ramadani ini?",
        a: "Ini adalah platform personal branding dan toko digital milik Iktiar Ramadani, seorang Fullstack Developer yang fokus pada ekosistem React, Next.js, dan UI/UX Design."
      },
      {
        q: "Apa tujuan website ini dibuat?",
        a: "Website ini berfungsi sebagai portofolio profesional, blog berbagi ilmu, serta marketplace untuk menjual aset digital (source code, template) berkualitas tinggi."
      },
      {
        q: "Apakah website ini menggunakan template?",
        a: "Tidak. Website ini dibangun dari nol (scratch) menggunakan Next.js 14+, Tailwind CSS, Framer Motion, dan Contentful sebagai CMS."
      }
    ]
  },
  {
    category: "Toko Digital & Pembelian",
    icon: ShoppingBag,
    items: [
      {
        q: "Bagaimana cara membeli produk digital di sini?",
        a: "Pilih produk di halaman 'Toko Digital', klik tombol 'Beli'. Anda akan diarahkan ke WhatsApp Admin untuk konfirmasi pesanan dan pembayaran."
      },
      {
        q: "Metode pembayaran apa saja yang tersedia?",
        a: "Saat ini kami menerima Transfer Bank (BCA/Mandiri/Jago) dan E-Wallet (GoPay/OVO/Dana). Detail pembayaran akan diberikan via WhatsApp."
      },
      {
        q: "Apakah saya akan mendapatkan update produk?",
        a: "Ya! Untuk produk bertanda 'Lifetime Update', Anda akan mendapatkan versi terbaru secara gratis yang dikirimkan melalui email terdaftar."
      },
      {
        q: "Apakah ada kebijakan pengembalian dana (Refund)?",
        a: "Karena sifat produk digital, kami TIDAK melayani refund setelah file dikirimkan, kecuali file terbukti rusak total dan tidak bisa diperbaiki oleh tim kami."
      }
    ]
  },
  {
    category: "Teknis & Lisensi",
    icon: Code2,
    items: [
      {
        q: "Bolehkan saya menjual ulang source code yang saya beli?",
        a: "DILARANG KERAS. Lisensi yang Anda beli adalah 'Personal/Commercial Use'. Anda boleh menggunakannya untuk proyek klien, tapi tidak boleh menjual kembali source code mentahnya."
      },
      {
        q: "Teknologi apa yang digunakan pada produk Anda?",
        a: "Mayoritas produk kami berbasis React, Next.js, Tailwind CSS, dan TypeScript. Pastikan Anda memahami dasar teknologi tersebut sebelum membeli."
      },
      {
        q: "Apakah saya mendapat bantuan jika ada error?",
        a: "Tentu. Kami menyediakan support gratis selama 1 bulan untuk bug/error pada kode asli. Modifikasi kode di luar tanggung jawab kami."
      }
    ]
  },
  {
    category: "Layanan & Kerjasama",
    icon: Layers,
    items: [
      {
        q: "Apakah menerima jasa pembuatan website custom?",
        a: "Ya, kami membuka slot terbatas untuk jasa pembuatan website, aplikasi web, dan desain UI/UX. Hubungi via halaman 'Contact' untuk diskusi."
      },
      {
        q: "Bagaimana cara mengajak kolaborasi?",
        a: "Silakan kirim proposal atau ajakan ngobrol santai melalui email di irofficialfeedback@gmail.com atau DM Instagram."
      }
    ]
  },
  {
    category: "Sistem & Keamanan",
    icon: ShieldCheck,
    items: [
      {
        q: "Mengapa ulasan saya tidak langsung muncul?",
        a: "Untuk menjaga kualitas dan menghindari spam, semua ulasan yang masuk melalui form akan dimoderasi terlebih dahulu oleh Admin sebelum ditampilkan."
      },
      {
        q: "Apakah data email saya aman?",
        a: "Sangat aman. Kami tidak membagikan data pribadi Anda kepada pihak ketiga. Email hanya digunakan untuk keperluan transaksi dan notifikasi penting."
      }
    ]
  }
];