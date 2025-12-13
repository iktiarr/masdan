"use client";

export default function DemoDashboard() {
  return (
    <div className="w-full bg-white text-black">
      <div className="flex flex-1 flex-col md:flex-row p-4 md:p-16 gap-12 md:gap-16 items-center justify-center md:justify-between">
        
        <div className="flex-1 max-w-xl w-full md:w-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            My <span className="text-lime-600">Creative Arsenal</span>
          </h2>

          <p className="text-neutral-600 max-w-lg mx-auto text-sm md:text-base">
            I really like some of the technology that I find helpful
          </p>
        </div>

        <div className="flex-1 max-w-4xl w-full md:w-auto mt-8 md:mt-0 flex justify-center">
          <div className="scale-100 sm:scale-100 md:scale-100 origin-top overflow-hidden">
            <VSCodeMockup />
          </div>
        </div>

      </div>
    </div>
  );
}

function VSCodeMockup() {
  const codeLines = [
    `<span class="text-[#1b74cc]">import</span> {"{"} <span class="text-[#0ea5e9]">useState</span> {"}"} <span class="text-[#1b74cc]">from</span> <span class="text-[#d97706]">"react"</span>;`,
    ``,
    `<span class="text-[#1b74cc]">export default function</span> <span class="text-[#ca8a04]">CreativeArsenal</span>() {"{"}`,
    `  <span class="text-[#1b74cc]">const</span> [<span class="text-[#0369a1]">tech</span>, <span class="text-[#0369a1]">setTech</span>] = <span class="text-[#db2777]">useState</span>([`,
    `    <span class="text-[#b91c1c]">"React"</span>,`,
    `    <span class="text-[#15803d]">"Next.js"</span>,`,
    `    <span class="text-[#7e22ce]">"Vercel"</span>`,
    `  ]);`,
  ];

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-300 bg-white max-w-full">
      
      <div className="bg-neutral-100 px-4 py-3 flex items-center justify-between border-b border-neutral-300">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="text-neutral-700 text-sm font-medium">
          CreativeArsenal.tsx
        </span>
        <div className="w-8" />
      </div>

      <div className="flex bg-neutral-200 text-sm border-b border-neutral-300">
        <div className="px-4 py-2 bg-white text-lime-700 font-semibold border-r border-neutral-300">
          Code.tsx
        </div>
        <div className="px-4 py-2 text-neutral-700 border-r border-neutral-300">styles.css</div>
        <div className="px-4 py-2 text-neutral-700 border-r border-neutral-300">.env.local</div>
        <div className="px-4 py-2 text-neutral-700">README.md</div>
      </div>

      <div className="flex bg-white font-mono text-sm min-h-[260px] max-h-[260px] overflow-hidden">
        <div className="bg-neutral-100 text-neutral-500 px-4 py-4 select-none text-right leading-relaxed border-r border-neutral-300">
          {codeLines.map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        <div className="p-4 text-neutral-800 leading-6 whitespace-pre flex-1 overflow-hidden">
          {codeLines.map((line, i) => (
            <div
              key={i}
              dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
