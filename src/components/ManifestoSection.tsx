import React, { useState } from 'react';
import { KSHESTRA_MANIFESTO } from '../data/initialData';
import { Feather, Shield, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { KshestraLogo } from './KshestraLogo';

export const ManifestoSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  return (
    <section id="manifesto-section" className="py-20 md:py-32 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2] relative">
      
      {/* Background Subtle Watermark */}
      <div className="absolute top-20 right-10 pointer-events-none opacity-[0.025] select-none hidden lg:block font-gambetta text-[26vw] font-bold text-[#211E1C] leading-none">
        X
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Editorial Section Masthead */}
        <div className="border-b-2 border-[#211E1C] pb-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#8E3524] font-bold tracking-widest uppercase">
              <Feather className="w-4 h-4 text-[#8E3524]" />
              <span>THE SACRED CHARTER · RATIFIED 2026</span>
            </div>
            <div className="text-[#5E5752] uppercase tracking-wider">
              SANCTUARY COVENANT · KOLKATA TRUST
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <h2 className="font-gambetta text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#211E1C] leading-[1.08]">
                The 10 Commandments
              </h2>
              <p className="font-serif italic text-lg sm:text-2xl text-[#8E3524] leading-snug max-w-3xl">
                "{KSHESTRA_MANIFESTO.ourBelief}"
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right font-mono text-xs text-[#5E5752] space-y-2 border-l-2 lg:border-l-0 lg:border-r-2 border-[#8E3524] pl-4 lg:pl-0 lg:pr-4 py-1">
              <p className="font-bold text-[#211E1C] uppercase tracking-wider">
                A Binding Covenant For Free Art
              </p>
              <p>
                Ten sequential statutes governing residency, resources, dignity, and collective protection.
              </p>
            </div>
          </div>
        </div>

        {/* STACKED ONE UPON ANOTHER (Sequential Editorial Ledger - Not Boxes!) */}
        <div className="border-t-2 border-[#211E1C] divide-y divide-[#211E1C]/20">
          {KSHESTRA_MANIFESTO.principles.map((p, idx) => {
            const isHovered = hoveredIdx === idx;
            const roman = romanNumerals[idx] || `${idx + 1}`;

            return (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`py-8 sm:py-10 transition-colors duration-200 ${
                  isHovered ? 'bg-[#F3EDE2]/60' : 'bg-transparent'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                  
                  {/* Left Rail: Roman Numeral & Tenet Number */}
                  <div className="md:col-span-3 lg:col-span-2 flex md:flex-col items-baseline md:items-start justify-between md:justify-start gap-2">
                    <span className="font-gambetta text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8E3524] tracking-tight leading-none">
                      {roman}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#5E5752] uppercase font-bold">
                      STATUTE 0{idx + 1}
                    </span>
                  </div>

                  {/* Center/Main Column: Title & Pull-Quote Statement */}
                  <div className="md:col-span-9 lg:col-span-10 space-y-4">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="font-gambetta text-2xl sm:text-3xl font-bold text-[#211E1C] tracking-tight">
                        {p.title}
                      </h3>
                    </div>

                    {/* Creed Statement */}
                    <div className="border-l-3 border-[#8E3524] pl-4 sm:pl-5 py-1">
                      <p className="font-serif italic text-base sm:text-lg lg:text-xl text-[#211E1C] font-semibold leading-relaxed">
                        "{p.statement}"
                      </p>
                    </div>

                    {/* Sanctuary Action Mechanism */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 text-xs font-sans text-[#5E5752]">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold tracking-wider text-[#8E3524] shrink-0">
                        <Shield className="w-3.5 h-3.5 text-[#8E3524]" />
                        <span>SANCTUARY ACTION:</span>
                      </span>
                      <span className="text-[#211E1C]/85 leading-relaxed">
                        {p.tangibleMechanism}
                      </span>
                    </div>

                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* The Sovereign Promise Bottom Banner */}
        <div className="border-2 border-[#211E1C] bg-[#F3EDE2] p-8 sm:p-10 rounded-xs shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#211E1C]/15 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xs bg-[#8E3524] flex items-center justify-center text-[#FAF7F2] p-2">
                <KshestraLogo preferAssetImage className="w-full h-full object-contain filter invert" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#8E3524]">
                  THE SOVEREIGN PLEDGE
                </span>
                <h4 className="font-gambetta text-xl sm:text-2xl font-bold text-[#211E1C]">
                  Kshestra Foundation Oath
                </h4>
              </div>
            </div>

            <div className="px-4 py-1.5 bg-[#8E3524] text-[#FAF7F2] font-mono text-xs font-bold uppercase tracking-widest rounded-xs self-start md:self-auto">
              MANTRA: CREATE · SHARE · REBEL · UPLIFT · REPEAT
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {KSHESTRA_MANIFESTO.ourPromise.map((promise, pIdx) => (
              <div key={pIdx} className="flex items-start gap-3 bg-[#FFFFFF] p-4 rounded-xs border border-[#211E1C]/15">
                <CheckCircle2 className="w-4 h-4 text-[#8E3524] shrink-0 mt-0.5" />
                <span className="font-sans text-xs sm:text-sm text-[#211E1C] font-medium leading-snug">
                  {promise}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
