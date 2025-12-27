'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { educationData, organizationData, experienceData } from '@/app/information-menu/data_education';

const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const TrackRecord = () => {
  const [isOrgExpanded, setIsOrgExpanded] = useState(false);
  const [isExpExpanded, setIsExpExpanded] = useState(false);

  const visibleOrganization = isOrgExpanded ? organizationData : organizationData.slice(0, 4);
  const visibleExperience = isExpExpanded ? experienceData : experienceData.slice(0, 6);

  return (
    <section id="education" className="px-4 py-16 bg-white dark:bg-[#0a0a0a] md:px-8 max-w-[1600px] mx-auto overflow-hidden">
      <div className="flex flex-col items-end text-right mb-10 animate-fade-in-right">
        <h2 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white tracking-tighter mb-2">
          Jejak <span className="text-lime-500">Langkah</span>
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Arsip perjalanan pendidikan dan pengalaman profesional saya.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4">
             <h3 className="text-xl font-bold text-lime-500">Pendidikan</h3>
             <div className="flex-1 h-px bg-gradient-to-r from-lime-500 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {educationData.map((edu, idx) => (
              <Link 
                href={edu.link} 
                key={idx} 
                target="_blank"
                className="group relative p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-lime-500 transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/5 hover:-translate-y-0.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                    <span className="shrink-0 px-2.5 py-1 text-xs font-mono font-bold text-lime-700 dark:text-lime-400 bg-lime-100 dark:bg-lime-900/30 rounded border border-lime-200 dark:border-lime-500/20">
                        {edu.year}
                    </span>
                    <div>
                        <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                        {edu.institution}
                        </h4>
                        <p className="text-xs md:text-sm font-medium text-neutral-500 dark:text-neutral-400">{edu.degree}</p>
                    </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-lime-500 -translate-x-2 group-hover:translate-x-0 duration-300">
                   <IconArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
           <div className="flex items-center gap-3 mb-4">
             <h3 className="text-xl font-bold text-lime-500">Lokasi</h3>
             <div className="flex-1 h-px bg-gradient-to-r from-lime-500 to-transparent"></div>
          </div>
          <Link 
            href="https://maps.app.goo.gl/9hQ33Zgo55UQpMuK9" 
            target="_blank"
            className="block h-[140px] lg:h-[calc(100%-2.5rem)] w-full relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 group cursor-pointer"
          >
             <div 
               className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
               style={{ backgroundImage: "url('https://static-maps.yandex.ru/1.x/?lang=en-US&ll=112.7521,-7.2575&z=12&l=map&size=600,450')" }} 
             ></div>

             <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent"></div>

             <div className="absolute bottom-4 left-4 z-10">
                <div className="flex items-center gap-2 mb-0.5">
                    <IconMapPin />
                    <h4 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors">Surabaya</h4>
                </div>
                <p className="text-neutral-300 text-xs pl-6">Jawa Timur, Indonesia</p>
             </div>
          </Link>
        </div>
      </div>

      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
         <div className="flex items-center gap-3 mb-4">
             <h3 className="text-xl font-bold text-lime-500">Organisasi</h3>
             <div className="flex-1 h-px bg-gradient-to-r from-lime-500 to-transparent"></div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {visibleOrganization.map((org, idx) => (
              <Link 
                href={org.link}
                key={idx}
                target="_blank"
                className="group relative p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-lime-500/50 hover:bg-lime-50 dark:hover:bg-lime-900/10 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:bg-lime-500 group-hover:text-white transition-colors">
                        <span className="font-bold text-xs">{idx + 1}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate pr-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                                {org.name}
                            </h4>
                            <span className="text-[10px] font-mono text-neutral-400 shrink-0">{org.year}</span>
                        </div>
                        <h4 className="font-mono text-lime-600 dark:text-lime-500 text-xs leading-tight truncate">
                            {org.role}
                        </h4>
                    </div>
                </div>
              </Link>
            ))}
         </div>

         {organizationData.length > 4 && (
            <div className="flex justify-center mt-6 relative z-10">
                <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-100 dark:border-neutral-800 -z-10"></div>
                <button 
                    onClick={() => setIsOrgExpanded(!isOrgExpanded)}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-lime-500 text-xs font-bold text-gray-600 dark:text-neutral-400 hover:text-lime-600 transition-all active:scale-95"
                >
                    {isOrgExpanded ? 'Tutup' : `Lihat Semua (${organizationData.length})`}
                    <IconArrowRight />
                </button>
            </div>
         )}
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
         <div className="flex items-center gap-3 mb-4">
             <h3 className="text-xl font-bold text-lime-500">Pengalaman</h3>
             <div className="flex-1 h-px bg-gradient-to-r from-lime-500 to-transparent"></div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {visibleExperience.map((exp, idx) => (
               <div 
                 key={idx}
                 className="group p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-lime-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default"
               >
                 <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-lime-600 dark:text-lime-500 bg-lime-50 dark:bg-lime-900/20 px-1.5 py-0.5 rounded">
                        {exp.year}
                    </span>
                 </div>
                 <h4 className="font-bold text-gray-900 dark:text-white text-xs mb-0.5 line-clamp-1 group-hover:text-lime-600 dark:group-hover:text-lime-400">
                   {exp.role}
                 </h4>
                 <p className="text-[10px] text-neutral-500 truncate">@ {exp.company}</p>
               </div>
            ))}
         </div>

         {experienceData.length > 6 && (
            <div className="flex justify-center mt-6">
                <button 
                    onClick={() => setIsExpExpanded(!isExpExpanded)}
                    className="text-xs font-bold text-neutral-400 hover:text-lime-500 transition-colors flex items-center gap-1"
                >
                    {isExpExpanded ? 'Tampilkan Lebih Sedikit' : 'Tampilkan Lebih Banyak'}
                    <svg className={`w-3 h-3 transition-transform ${isExpExpanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </button>
            </div>
         )}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>

    </section>
  );
};

export default TrackRecord;