"use client";

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { Loader2 } from "lucide-react";
import BannerCarousel from "@/app/components/BannerCarousel";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",       
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "", 
});

export default function AdsPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await client.getEntries({ 
          content_type: 'iklan',
          order: ['fields.order'],
        });
        setBanners(res.items);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    // Background diset explisit: Putih (Light) & Hitam (Dark)
    <main className="w-full bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
       <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
          
          {loading ? (
             <div className="flex justify-center items-center h-[200px]">
                <Loader2 className="animate-spin text-gray-400 dark:text-lime-500" size={32} />
             </div>
          ) : (
             // Panggil Carousel
             <BannerCarousel items={banners} />
          )}

       </div>
    </main>
  );
}