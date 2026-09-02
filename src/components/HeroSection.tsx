import React, { useState, useEffect } from 'react';
import { audioSynth } from '../services/audioSynthesizer';
import { motion } from 'motion/react';
import { Calendar, Compass, Sparkles, MapPin, Users, Flame, ArrowUpRight, Clock, ShieldCheck, Ticket } from 'lucide-react';
import { KshestraLogo } from './KshestraLogo';

interface HeroSectionProps {
  onExploreGatherings: () => void;
  onExploreArchive: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGatherings,
  onExploreArchive
}) => {
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);

  const artistStatements = [
    {
      bengali: '“শিল্পীর স্বাধীনতা কোনো অনুগ্রহ নয়, বেঁচে থাকার একমাত্র প্রমাণ।”',
      english: 'Artistic sovereignty is never a charity; it is our primary survival proof.',
      discipline: 'Cinema & Literature'
    },
    {
      bengali: '“বাঙলার পোড়ামাটি ও রেখায় জেগে ওঠে শতাব্দীর অলিখিত স্মৃতি।”',
      english: 'In the raw terracotta and ink lines of Bengal, centuries of unwritten memories awaken.',
      discipline: 'Visual Arts & Terracotta'
    },
    {
      bengali: '“একতারা আর দোতারার সুরে ধ্বনিত হয় আত্মার আদি ক্ষেত্র।”',
      english: 'In the acoustic resonance of ektara and dotara echoes the primordial territory of the soul.',
      discipline: 'Acoustic Sound & Performance'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatementIndex((prev) => (prev + 1) % artistStatements.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [artistStatements.length]);

  const multilingualScripts = [
    { lang: 'Bengali', script: 'ক্ষেত্র' },
    { lang: 'Devanagari', script: 'क्षेत्र' },
    { lang: 'Tamil', script: 'க்ஷேத்ரா' },
    { lang: 'Telugu', script: 'క్షేత్రం' },
    { lang: 'Malayalam', script: 'ക്ഷേത്രം' },
    { lang: 'Gurmukhi', script: 'ਖੇਤਰ' },
    { lang: 'Assamese', script: 'ক্ষেত্ৰ' },
    { lang: 'Odia', script: 'କ୍ଷେତ୍ର' }
  ];

  return (
    <section className="relative w-full pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-8 border-b border-[#211E1C]/20 bg-[#FAF7F2] overflow-hidden">
      
      {/* Editorial Watermark & Textured Grid Background */}
      <div className="absolute top-6 right-8 pointer-events-none opacity-5 select-none hidden lg:block">
        <span className="font-bengali text-[20vw] font-bold text-[#211E1C] leading-none">
          ক্ষেত্র
        </span>
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Top Editorial Metadata Strip (Linear Festival / Gallery Style) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#211E1C]/15 pb-4 text-[11px] font-mono text-[#5E5752]">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[#8E3524] text-[#FAF7F2] font-bold tracking-widest uppercase">
              SANCTUARY DISPATCH
            </span>
            <span className="text-[#211E1C] font-semibold">SEASON 2026/27</span>
            <span className="hidden sm:inline text-[#C98E3A]">✦</span>
            <span className="hidden sm:inline">NON-PROFIT TRUST #KSH-CAL-2026</span>
          </div>

          <div className="flex items-center gap-4 text-[#211E1C]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4A583A]"></span>
              <span>KOLKATA & MUMBAI RESIDENCIES</span>
            </span>
            <span>·</span>
            <span>IST (UTC+5:30)</span>
          </div>
        </div>

        {/* Monumental Hero Masthead & Emblem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Festival Display Typography */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EDE2] border border-[#211E1C]/15 rounded-sm text-xs font-mono uppercase tracking-widest text-[#8E3524]">
              <Flame className="w-3.5 h-3.5 text-[#C98E3A]" />
              <span>Sovereign Territory for Independent Creation</span>
            </div>

            <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#211E1C] leading-[0.98]">
              We are Many. <br />
              <span className="text-[#8E3524] italic font-serif">We are Kshestra.</span>
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-[#5E5752] italic font-light max-w-2xl leading-snug">
              The Soul Has a Territory. A physical and communal sanctuary for cinema, performance, and the living arts.
            </p>

            <p className="font-sans text-sm sm:text-base text-[#211E1C]/80 max-w-2xl leading-relaxed">
              We provide zero-cost physical studios, master equipment, full production crews, 
              and tax-deductible artist fellowships to build a world where creators own their work and their future.
            </p>

            {/* Action Buttons: Avant-Garde Poster Triggers */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => {
                  audioSynth.playChime();
                  onExploreGatherings();
                }}
                data-cursor="pointer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-sm bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] border border-[#211E1C]/20 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Ticket className="w-4 h-4 text-[#C98E3A]" />
                <span>Reserve Gathering Passes</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  audioSynth.playChime();
                  onExploreArchive();
                }}
                data-cursor="pointer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-sm bg-[#FFFFFF] hover:bg-[#F3EDE2] text-[#211E1C] border border-[#211E1C]/25 shadow-xs transition-all"
              >
                <Compass className="w-4 h-4 text-[#4A583A]" />
                <span>Exhibition Archive</span>
              </button>
            </div>

          </div>

          {/* Right Column: Kshestra Crest & Live Confluence Curatorial Docket */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Artistic Framed Monogram Box with Terracotta Wash */}
            <div className="sanctum-card rounded-sm bg-[#FFFFFF] border-2 border-[#211E1C] p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#211E1C] text-[#FAF7F2] text-[9px] font-mono px-3 py-1 uppercase tracking-widest">
                SEAL OF STEWARDSHIP
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-16 h-16 rounded-sm bg-[#3E1214] border border-[#C98E3A]/40 flex items-center justify-center p-2.5 shadow-sm">
                  <KshestraLogo variant="white" className="w-full h-full text-[#FAF7F2]" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#211E1C]">
                    ক্ষেত্র · Kshestra
                  </h3>
                  <span className="text-xs font-mono text-[#8E3524] font-semibold block">
                    The Soul Has a Territory
                  </span>
                </div>
              </div>

              {/* Rotating Curatorial Declaration */}
              <div className="p-4 bg-[#F3EDE2] rounded-sm border border-[#211E1C]/15 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#5E5752]">
                  <span>RESIDENT MANIFESTO</span>
                  <span className="text-[#8E3524]">{artistStatements[currentStatementIndex].discipline}</span>
                </div>
                <p className="font-bengali text-sm text-[#211E1C] font-semibold leading-snug">
                  {artistStatements[currentStatementIndex].bengali}
                </p>
                <p className="font-sans text-xs text-[#5E5752] italic leading-relaxed">
                  {artistStatements[currentStatementIndex].english}
                </p>
              </div>

              {/* Multilingual script ticker in the card */}
              <div className="pt-2 border-t border-[#211E1C]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-serif text-[#5E5752]">
                {multilingualScripts.slice(0, 5).map((item) => (
                  <span key={item.lang} className="hover:text-[#8E3524] cursor-default font-medium">
                    {item.script}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Editorial Banner: Indian Scripts Ribbon & Live Proof */}
        <div className="pt-6 border-t border-[#211E1C]/15 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#FFFFFF] p-4 sm:p-5 rounded-sm border border-[#211E1C]/15 shadow-xs">
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm sm:text-base font-serif text-[#5E5752]">
            <span className="text-xs font-mono uppercase text-[#8E3524] font-bold tracking-wider">
              PAN-INDIAN ROOTS:
            </span>
            {multilingualScripts.map((item, idx) => (
              <React.Fragment key={item.lang}>
                <span className="hover:text-[#8E3524] transition-colors font-semibold" title={item.lang}>
                  {item.script}
                </span>
                {idx < multilingualScripts.length - 1 && (
                  <span className="text-[#C98E3A]/60 text-xs select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#211E1C] shrink-0">
            <span className="px-2.5 py-1 bg-[#4A583A]/10 text-[#4A583A] font-bold rounded-sm border border-[#4A583A]/20">
              100% INDEPENDENT
            </span>
            <span className="px-2.5 py-1 bg-[#8E3524]/10 text-[#8E3524] font-bold rounded-sm border border-[#8E3524]/20">
              80G TAX EXEMPT
            </span>
          </div>

        </div>

      </div>

    </section>
  );
};
