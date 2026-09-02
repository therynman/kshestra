import React, { useState } from 'react';
import { audioSynth } from '../services/audioSynthesizer';
import { Compass, ArrowUpRight, Sparkles, Building2, Briefcase, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KshestraLogo } from './KshestraLogo';

export const UnivertePipelineSection: React.FC = () => {
  const [showUniverteModal, setShowUniverteModal] = useState(false);

  return (
    <section id="univerte-pipeline-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#F6F0E6]">
      <div className="max-w-7xl mx-auto">
        
        <div className="border-2 border-[#211E1C] bg-[#FAF7F2] p-8 sm:p-12 lg:p-16 rounded-xs shadow-md space-y-8 lg:flex lg:items-center lg:justify-between lg:gap-16">
          
          {/* Left / Content */}
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#8E3524]">
              <Compass className="w-3.5 h-3.5 text-[#C0822B]" />
              <span>THE CAREER BRIDGE</span>
            </div>

            <h2 className="font-gambetta text-3xl sm:text-5xl font-bold tracking-tight text-[#211E1C] leading-[1.05]">
              Sustaining the Artist: <br className="hidden sm:inline" />
              <span className="text-[#8E3524] italic">The Univerte Pipeline</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5E5752] leading-relaxed font-sans">
              Kshestra is your cultural sanctuary. Here, you hone your craft, connect with your crew, and find your voice without commercial pressure. But when your portfolio is undeniable, our partner network—<strong className="text-[#211E1C]">Univerte</strong>—bridges you directly to paying agencies, production studios, art collectors, and brand sponsorships.
            </p>

            {/* Callout quote plate */}
            <div className="border-l-3 border-[#8E3524] pl-4 py-1 text-base sm:text-lg font-gambetta font-bold italic text-[#211E1C]">
              "We protect and train you here. Univerte gets you hired there."
            </div>
          </div>

          {/* Right / CTA Button */}
          <div className="shrink-0 pt-4 lg:pt-0">
            <button
              onClick={() => {
                audioSynth.playChime();
                setShowUniverteModal(true);
              }}
              data-cursor="pointer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] rounded-xs bg-[#211E1C] hover:bg-[#8E3524] text-[#FAF7F2] border border-[#211E1C] shadow-md transition-all whitespace-nowrap"
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
              className="bg-[#FAF7F2] rounded-xs max-w-xl w-full p-6 sm:p-8 border-2 border-[#211E1C] shadow-2xl relative space-y-6 text-[#211E1C]"
            >
              <button
                onClick={() => setShowUniverteModal(false)}
                data-cursor="pointer"
                className="absolute top-4 right-4 p-2 text-[#211E1C] hover:bg-[#8E3524] hover:text-[#FAF7F2] rounded-xs transition-colors border border-[#211E1C]/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b border-[#211E1C]/15 pb-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E3524]">
                  Commercial Bridge & Industry Alliance
                </div>
                <h3 className="font-gambetta text-2xl sm:text-3xl font-bold text-[#211E1C]">
                  The Univerte Commercial Network
                </h3>
                <p className="text-xs sm:text-sm text-[#5E5752] leading-relaxed">
                  Univerte acts as the external commercial conduit for graduating fellows from Kshestra Foundation.
                </p>
              </div>

              <div className="space-y-3 bg-[#F3EDE2] p-4 rounded-xs border border-[#211E1C]/10 text-xs text-[#211E1C] font-sans">
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
                  <span>Curated art collector showcases and regional exhibitions in Kolkata.</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowUniverteModal(false)}
                  data-cursor="pointer"
                  className="px-5 py-2.5 text-xs font-bold uppercase rounded-xs bg-[#8E3524] text-[#FAF7F2]"
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

