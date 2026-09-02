import React, { useState } from 'react';
import { audioSynth } from '../services/audioSynthesizer';
import { Compass, ArrowUpRight, Sparkles, Building2, Briefcase, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const UnivertePipelineSection: React.FC = () => {
  const [showUniverteModal, setShowUniverteModal] = useState(false);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        
        <div className="sanctum-card rounded-sm p-8 sm:p-12 md:p-16 bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#FAF7F2] border border-[#211E1C]/20 shadow-md space-y-8 text-center md:text-left md:flex md:items-center md:justify-between md:gap-12">
          
          {/* Left / Content */}
          <div className="space-y-5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#4A583A] bg-[#FFFFFF] border border-[#211E1C]/15 rounded-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>THE CAREER BRIDGE</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#211E1C]">
              Sustaining the Artist: <br className="hidden sm:inline" />
              <span className="text-[#8E3524] italic font-serif">The Univerte Pipeline</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5E5752] leading-relaxed font-sans">
              Kshestra is your cultural sanctuary. Here, you hone your craft, connect with your crew, and find your voice without commercial pressure. But when your portfolio is undeniable, our corporate partner—<strong className="text-[#211E1C]">Univerte</strong>—bridges you directly to paying agencies, production studios, art collectors, and brand sponsorships.
            </p>

            {/* Callout */}
            <div className="p-4 bg-[#FFFFFF] border-l-4 border-[#8E3524] rounded-r-sm text-sm sm:text-base font-serif font-bold italic text-[#211E1C]">
              "We protect and train you here. Univerte gets you hired there."
            </div>
          </div>

          {/* Right / CTA Button */}
          <div className="shrink-0 pt-4 md:pt-0">
            <button
              onClick={() => {
                audioSynth.playChime();
                setShowUniverteModal(true);
              }}
              data-cursor="pointer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-sm bg-[#211E1C] hover:bg-[#8E3524] text-[#FAF7F2] border border-[#211E1C] shadow-md transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Discover the Univerte Network</span>
              <ArrowUpRight className="w-4 h-4 text-[#C0822B]" />
            </button>
          </div>

        </div>

      </div>

      {/* Univerte Network Modal Detail */}
      <AnimatePresence>
        {showUniverteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#211E1C]/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF7F2] rounded-sm max-w-xl w-full p-6 sm:p-8 border border-[#211E1C]/20 shadow-2xl relative space-y-6"
            >
              <button
                onClick={() => setShowUniverteModal(false)}
                data-cursor="pointer"
                className="absolute top-4 right-4 p-2 text-[#211E1C] hover:bg-[#8E3524] hover:text-[#FAF7F2] rounded-sm transition-colors border border-[#211E1C]/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E3524]">
                  Commercial Bridge & Industry Alliance
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#211E1C]">
                  The Univerte Commercial Network
                </h3>
                <p className="text-sm text-[#5E5752] leading-relaxed">
                  Univerte acts as the external commercial conduit for graduating fellows from Kshestra Foundation.
                </p>
              </div>

              <div className="space-y-3 bg-[#F3EDE2] p-4 rounded-sm border border-[#211E1C]/10 text-xs text-[#211E1C]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A583A] shrink-0 mt-0.5" />
                  <span>Direct scouting access for top advertising agencies and production houses.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A583A] shrink-0 mt-0.5" />
                  <span>Standardized fair-compensation contracts with zero exploitative clauses.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A583A] shrink-0 mt-0.5" />
                  <span>Curated art collector showcases in Mumbai, Delhi, and Bangalore.</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowUniverteModal(false)}
                  data-cursor="pointer"
                  className="px-5 py-2.5 text-xs font-bold uppercase rounded-sm bg-[#8E3524] text-[#FAF7F2]"
                >
                  Understood & Return to Sanctuary
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
