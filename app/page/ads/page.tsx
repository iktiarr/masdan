export const dynamic = "force-dynamic";

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
      content_type: "iklan",
      order: ["fields.order"],
    });
    adsItems = adsRes.items;
  } catch {}

  if (adsItems.length === 0) return null;

  return (
    <section className="w-full bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <BannerCarousel items={adsItems} />
      </div>
    </section>
  );
}
