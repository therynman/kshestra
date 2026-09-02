import React, { useState } from 'react';
import { KSHESTRA_MANIFESTO } from '../data/initialData';
import { Feather, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { KshestraLogo } from './KshestraLogo';

export const ManifestoSection: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);

  return (
    <section id="manifesto-section" className="py-20 md:py-32 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2] relative">
      
      {/* Background Subtle Watermark */}
      <div className="absolute top-20 right-10 pointer-events-none opacity-[0.025] select-none hidden lg:block font-gambetta text-[26vw] font-bold text-[#211E1C] leading-none">
        X
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
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
                Ten non-negotiable statutes governing residency, resources, dignity, and collective protection.
              </p>
            </div>
          </div>
        </div>

        {/* Structured Broadsheet Ledger (Not generic boxes!) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-12 lg:gap-y-10">
          {KSHESTRA_MANIFESTO.principles.map((p, idx) => {
            const isHovered = activePrinciple === idx;
            return (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onMouseEnter={() => setActivePrinciple(idx)}
                onMouseLeave={() => setActivePrinciple(null)}
                className={`relative bg-[#FFFFFF] border-2 transition-all duration-300 rounded-xs flex flex-col justify-between overflow-hidden shadow-xs ${
                  isHovered 
                    ? 'border-[#8E3524] shadow-md -translate-y-0.5' 
                    : 'border-[#211E1C]/20 hover:border-[#8E3524]/60'
                }`}
              >
                {/* Top Corner Index Stripe */}
                <div className="flex items-center justify-between px-6 py-3 bg-[#F3EDE2] border-b border-[#211E1C]/15 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#8E3524] text-[#FAF7F2] font-bold rounded-xs text-[10px] tracking-widest">
                      TENET {p.num}
                    </span>
                    <span className="text-[#5E5752] text-[10px] tracking-wider uppercase hidden sm:inline">
                      ARTICLE {idx + 1} OF 10
                    </span>
                  </div>
                  <span className="text-[#8E3524] font-serif text-sm">✦</span>
                </div>

                {/* Core Statement Body */}
                <div className="p-6 sm:p-7 space-y-4 flex-1">
                  <h3 className="font-gambetta text-2xl sm:text-3xl font-bold text-[#211E1C] leading-snug">
                    {p.title}
                  </h3>

                  {/* Creed Quote with Terracotta Bar */}
                  <div className="border-l-3 border-[#8E3524] pl-4 py-1">
                    <p className="font-serif italic text-base sm:text-lg text-[#211E1C] font-semibold leading-relaxed">
                      "{p.statement}"
                    </p>
                  </div>
                </div>

                {/* Grounding Action / Tangible Mechanism Footer */}
                <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#211E1C]/15 font-sans text-xs sm:text-sm text-[#5E5752] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold tracking-wider text-[#8E3524]">
                    <Shield className="w-3 h-3 text-[#8E3524]" />
                    <span>SANCTUARY ACTION MECHANISM</span>
                  </div>
                  <p className="leading-relaxed text-[#211E1C]/80">
                    {p.tangibleMechanism}
                  </p>
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
