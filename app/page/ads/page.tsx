import { createClient } from "contentful";
import BannerCarousel from "@/app/components/BannerCarousel"; 

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",       
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "", 
});

export default async function AdsSection() {
  
  let adsItems: any[] = [];
  try {
    const adsRes = await client.getEntries({ 
      content_type: 'iklan', 
      order: ['fields.order'], 
    });
    adsItems = adsRes.items;
  } catch (error) {
    console.error("Gagal load iklan:", error);
  }

  if (adsItems.length === 0) return null;

  return (
    // Padding kecil saja (py-4) agar tidak terlalu jauh jaraknya
    <section className="w-full bg-white">
       <div className="max-w-7xl mx-auto">
          {/* Tidak perlu judul "Highlight", langsung banner saja seperti Tokopedia/Shopee */}
          <BannerCarousel items={adsItems} />
       </div>
    </section>
  );
}