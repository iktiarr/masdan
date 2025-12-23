'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { educationData, organizationData, experienceData } from '@/app/information-menu/data_education';

const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const TrackRecord = () => {
  // State untuk Organisasi
  const [isOrgExpanded, setIsOrgExpanded] = useState(false);
  // State untuk Pengalaman
  const [isExpExpanded, setIsExpExpanded] = useState(false);

  // Logika pembatasan data
  const visibleOrganization = isOrgExpanded ? organizationData : organizationData.slice(0, 4);
  const visibleExperience = isExpExpanded ? experienceData : experienceData.slice(0, 5);

  return (
    <section id="education" className="px-4 bg-white dark:bg-[#0a0a0a] md:px-8 max-w-[1600px] mx-auto overflow-hidden">
      <div className="flex flex-col items-end text-right mb-16 animate-fade-in-right">
        <h2 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white tracking-tighter mb-2">
          Perjalanan <span className="text-lime-500">Saya</span>
        </h2>
        <div className="h-1 w-32 bg-lime-500 mb-4 rounded-full"></div>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Berikut adalah perjalanan pendidikan dan beberapa pengalaman yang pernah saya dapatkan hingga saat ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {/* --- BAGIAN PENDIDIKAN (Tetap) --- */}
        <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-4 mb-4">
             <h3 className="text-2xl font-bold text-lime-500 dark:text-lime-500">Pendidikan</h3>
             <div className="flex-1 h-px bg-linear-to-r from-lime-500 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationData.map((edu, idx) => (
              <Link 
                href={edu.link} 
                key={idx} 
                target="_blank"
                className="group relative p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-lime-500 transition-all duration-300 hover:shadow-xl hover:shadow-lime-500/10 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 text-xs font-mono font-bold text-lime-700 dark:text-lime-400 bg-lime-100 dark:bg-lime-900/30 rounded border border-lime-200 dark:border-lime-500/20">
                    {edu.year}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-lime-500">
                    <IconArrowRight />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                  {edu.institution}
                </h4>
                <p className="text-sm font-semibold text-neutral-500 mb-3">{edu.degree}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* --- BAGIAN LOKASI (Tetap) --- */}
        <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
           <div className="flex items-center gap-4 mb-4">
             <h3 className="text-2xl font-bold text-lime-500 dark:text-lime-500">Lokasi</h3>
             <div className="flex-1 h-px bg-linear-to-r from-lime-500 to-transparent"></div>
          </div>
          <Link 
            href="https://maps.app.goo.gl/9hQ33Zgo55UQpMuK9" 
            target="_blank"
            className="block h-[280px] lg:h-[calc(100%-3rem)] w-full relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group cursor-pointer"
          >
             <div 
               className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
               style={{ backgroundImage: "url('https://static-maps.yandex.ru/1.x/?lang=en-US&ll=112.7521,-7.2575&z=12&l=map&size=600,450')" }} 
             ></div>

             <div className="absolute inset-0 bg-linear-to-t from-neutral-900/90 via-transparent to-transparent group-hover:bg-black/10 transition-colors"></div>

             <div className="absolute bottom-6 left-6 z-10">
                <div className="flex items-center gap-2 mb-1">
                   <div className="p-2 bg-lime-500 rounded-full text-white animate-bounce shadow-lg shadow-lime-500/50">
                      <IconMapPin />
                   </div>
                   <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-xs text-white border border-white/20 group-hover:bg-lime-500 group-hover:border-lime-500 transition-colors">
                      Klik Untuk Melihat ↗
                   </span>
                </div>
                <h4 className="text-2xl font-bold text-white group-hover:text-lime-400 transition-colors">Surabaya</h4>
                <p className="text-neutral-300 text-sm group-hover:text-white transition-colors">Jawa Timur, Indonesia</p>
             </div>
          </Link>
        </div>
      </div>

      {/* --- BAGIAN ORGANISASI (Diupdate) --- */}
      <div className="mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
         <div className="flex items-center gap-4 mb-6">
             <h3 className="text-2xl font-bold text-lime-500 dark:text-lime-500">Organisasi</h3>
             <div className="flex-1 h-px bg-linear-to-r from-lime-500 to-transparent"></div>
         </div>

         {/* Grid diubah untuk mapping visibleOrganization */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleOrganization.map((org, idx) => (
              <Link 
                href={org.link}
                key={idx}
                target="_blank"
                className="group flex flex-col justify-between p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-lime-500/50 hover:bg-lime-50 dark:hover:bg-lime-900/10 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:bg-lime-500 group-hover:text-white transition-colors">
                         <span className="font-bold text-xs">{idx + 1}</span>
                      </div>
                      <span className="text-xs font-mono text-neutral-400">{org.year}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                    {org.name}
                  </h4>
                  <h4 className="font-mono text-lime-500 dark:text-white text-l leading-tight mb-1 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                    {org.role}
                  </h4>
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                   <span className="text-[10px] text-neutral-400">View Detail</span>
                   <IconArrowRight />
                </div>
              </Link>
            ))}
         </div>

         {/* Tombol Expand untuk Organisasi */}
         {organizationData.length > 4 && (
            <div className="flex justify-center mt-8 relative z-10">
                <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-200 dark:border-neutral-800 -z-10"></div>
                <button 
                    onClick={() => setIsOrgExpanded(!isOrgExpanded)}
                    className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-lime-500 hover:text-lime-600 dark:hover:text-lime-400 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                >
                    <span className="text-sm font-bold text-gray-700 dark:text-neutral-300 group-hover:text-lime-600 dark:group-hover:text-lime-400">
                        {isOrgExpanded ? 'Persingkat Tampilan' : `Lihat Semua (${organizationData.length - 4}+ Lainnya)`}
                    </span>
                    <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${isOrgExpanded ? 'rotate-180' : ''}`} 
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </button>
            </div>
         )}
      </div>

      {/* --- BAGIAN PENGALAMAN (Tetap, dengan state baru) --- */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
         <div className="flex items-center gap-4 mb-6">
             <h3 className="text-2xl font-bold text-lime-500 dark:text-lime-500">Pengalaman</h3>
             <div className="flex-1 h-px bg-linear-to-r from-lime-500 to-transparent"></div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {visibleExperience.map((exp, idx) => (
               <div 
                 key={idx}
                 className="group relative p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-lime-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
               >
                 <p className="text-xs font-mono text-neutral-400 mb-2">{exp.year}</p>
                 <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-lime-600 dark:group-hover:text-lime-400">
                   {exp.role}
                 </h4>
                 <p className="text-xs text-neutral-500 mb-3 truncate">@ {exp.company}</p>
               </div>
            ))}
         </div>

         {/* Tombol Expand untuk Pengalaman */}
         {experienceData.length > 5 && (
            <div className="flex justify-center mt-8 relative z-10">
                <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-200 dark:border-neutral-800 -z-10"></div>
                <button 
                    onClick={() => setIsExpExpanded(!isExpExpanded)}
                    className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-lime-500 hover:text-lime-600 dark:hover:text-lime-400 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                >
                    <span className="text-sm font-bold text-gray-700 dark:text-neutral-300 group-hover:text-lime-600 dark:group-hover:text-lime-400">
                        {isExpExpanded ? 'Persingkat Tampilan' : `Lihat Semua (${experienceData.length - 5}+ Lainnya)`}
                    </span>
                    <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${isExpExpanded ? 'rotate-180' : ''}`} 
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </button>
            </div>
         )}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>

    </section>
  );
};

export default TrackRecord;