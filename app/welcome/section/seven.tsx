"use client";
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

export default function WorldMapDemo() {
  return (
    <div className="py-40 bg-white w-full">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
          <span className="text-lime-600">Global </span>
          <span className="text-black">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
              key={idx}
              className="inline-block"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h2>

        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          I come from Indonesia and I want the whole world to know that just with a small idea made with high ambition, the whole world can know who I really am.
        </p>
      </div>-7.142392, 113.472974

      <WorldMap
        dots={[
          {
            start: { lat: 40.7128, lng: -74.006 },      // New York, USA
            end: { lat: -7.142392, lng: 113.472974 },       // Indonesia (Jakarta)
          },
          {
            start: { lat: 51.5074, lng: -0.1278 },      // London, UK
            end: { lat: -7.142392, lng: 113.472974 },
          },
          {
            start: { lat: 35.6762, lng: 139.6503 },     // Tokyo, Japan
            end: { lat: -7.142392, lng: 113.472974 },
          },
          {
            start: { lat: -33.8688, lng: 151.2093 },    // Sydney, Australia
            end: { lat: -7.142392, lng: 113.472974 },
          },
          {
            start: { lat: 25.276987, lng: 55.296249 },  // Dubai, UAE
            end: { lat: -7.142392, lng: 113.472974 },
          },
          {
            start: { lat: 37.5665, lng: 126.978 },      // Seoul, South Korea
            end: { lat: -7.142392, lng: 113.472974 },
          },
          {
            start: { lat: 52.5200, lng: 13.4050 },      // Berlin, Germany
            end: { lat: -7.142392, lng: 113.472974 },
          },
          {
            start: { lat: 28.6139, lng: 77.2090 },      // New Delhi, India
            end: { lat: -7.142392, lng: 113.472974 },
          },
        ]}
      />
    </div>
  );
}
