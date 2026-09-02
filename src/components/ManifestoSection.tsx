import React, { useState } from 'react';
import { KSHESTRA_MANIFESTO } from '../data/initialData';
import { audioSynth } from '../services/audioSynthesizer';
import { BookOpen, Shield, CheckCircle2, Flame, Feather, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const ManifestoSection: React.FC = () => {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState<number | null>(null);

  return (
    <section id="manifesto-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8E3524] bg-[#F3EDE2] border border-[#211E1C]/15 rounded-sm">
            <Feather className="w-3.5 h-3.5" />
            <span>{KSHESTRA_MANIFESTO.eyebrow}</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#211E1C]">
            {KSHESTRA_MANIFESTO.title}
          </h2>

          <p className="font-bengali text-lg text-[#8E3524] font-medium">
            {KSHESTRA_MANIFESTO.bengaliTitle}
          </p>

          <div className="pt-2 text-base sm:text-lg text-[#5E5752] leading-relaxed font-serif italic border-y border-[#211E1C]/10 py-4 px-6 bg-[#F3EDE2]/50">
            "{KSHESTRA_MANIFESTO.introductoryStatement}"
          </div>
        </div>

        {/* 5 Core Principles & Tangible Mechanisms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KSHESTRA_MANIFESTO.principles.map((item, index) => {
            const isLast = index === KSHESTRA_MANIFESTO.principles.length - 1;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`sanctum-card rounded-sm p-6 sm:p-7 flex flex-col justify-between relative group ${
                  isLast ? 'md:col-span-2 lg:col-span-2 bg-[#F3EDE2]/60' : 'bg-[#FFFFFF]'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Num & Bengali Title */}
                  <div className="flex items-center justify-between border-b border-[#211E1C]/10 pb-3">
                    <span className="font-mono text-xs font-bold text-[#8E3524] tracking-widest">
                      PRINCIPLE #{item.num}
                    </span>
                    <span className="font-bengali text-xs font-semibold text-[#5E5752]">
                      {item.bengaliTitle}
                    </span>
                  </div>

                  {/* Principle Title */}
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#211E1C] group-hover:text-[#8E3524] transition-colors">
                    {item.title}
                  </h3>

                  {/* Principle Statement */}
                  <p className="text-sm text-[#5E5752] leading-relaxed">
                    {item.statement}
                  </p>
                </div>

                {/* The Tangible Mechanism Box */}
                <div className="mt-6 pt-4 border-t border-[#211E1C]/10 bg-[#FAF7F2] p-3.5 rounded-sm">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4A583A] mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A583A]" />
                    <span>The Tangible Mechanism</span>
                  </div>
                  <p className="text-xs text-[#211E1C] leading-normal font-sans">
                    {item.tangibleMechanism}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Callout */}
        <div className="text-center py-8 px-6 bg-[#211E1C] text-[#FAF7F2] rounded-sm shadow-md border border-[#211E1C] max-w-4xl mx-auto">
          <Flame className="w-6 h-6 text-[#C0822B] mx-auto mb-3 animate-pulse" />
          <p className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight italic">
            "{KSHESTRA_MANIFESTO.closingCallout}"
          </p>
          <p className="text-xs text-[#FAF7F2]/70 uppercase tracking-widest mt-2 font-mono">
            — THE SOVEREIGN KSHESTRA CULTURAL TRUST DECLARATION
          </p>
        </div>

      </div>
    </section>
  );
};
