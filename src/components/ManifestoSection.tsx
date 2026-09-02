import React from 'react';
import { KSHESTRA_MANIFESTO } from '../data/initialData';
import { Feather } from 'lucide-react';
import { motion } from 'motion/react';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#211E1C] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold">
              <Feather className="w-3.5 h-3.5" />
              <span>FOR THE ARTIST, BY THE ARTIST</span>
            </div>
            <h2 className="font-gambetta text-4xl sm:text-6xl font-bold tracking-tight text-[#211E1C]">
              The 10 Commandments
            </h2>
          </div>

          <div className="md:text-right max-w-md">
            <p className="text-xs font-mono text-[#5E5752]">
              Kshestra Manifesto · 10 Sovereign Principles
            </p>
          </div>
        </div>

        {/* The 10 Commandments Grid: Simple, Direct, Heading & Bio Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {KSHESTRA_MANIFESTO.principles.map((p, idx) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              className="bg-[#FFFFFF] border border-[#211E1C]/15 p-6 sm:p-8 rounded-xs hover:border-[#8E3524]/60 transition-all shadow-xs space-y-3"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm font-bold text-[#8E3524]">
                  {p.num}.
                </span>
                <h3 className="font-gambetta text-xl sm:text-2xl font-bold text-[#211E1C] leading-snug">
                  {p.title}
                </h3>
              </div>

              <p className="font-sans text-sm sm:text-base text-[#211E1C]/90 leading-relaxed pl-7">
                {p.statement} {p.tangibleMechanism}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

