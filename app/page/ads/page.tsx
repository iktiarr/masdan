export const revalidate = 0; 

import { createClient } from "contentful";
import BannerCarousel from "@/app/components/BannerCarousel";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
}).withoutUnresolvableLinks; 

export default async function AdsSection() {
  let adsItems: any[] = [];

  try {
    const adsRes = await client.getEntries({
      content_type: "iklan",
      order: ["fields.order"],
      include: 2,
    });
    adsItems = adsRes.items;
  } catch (error) {
    console.error("Error fetching ads:", error);
  }

  if (adsItems.length === 0) return null;

  return (
    <section className="w-full bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <BannerCarousel items={adsItems} />
      </div>
    </section>
  );
}