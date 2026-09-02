import React, { useState, useEffect } from 'react';
import { GazetteArticle } from '../types';
import { StorageService } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { BookOpen, Clock, User, ArrowRight, X, Feather } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KshestraLogo } from './KshestraLogo';

export const GazetteSection: React.FC = () => {
  const [dispatches, setDispatches] = useState<GazetteArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<GazetteArticle | null>(null);

  useEffect(() => {
    setDispatches(StorageService.getDispatches());
  }, []);

  const leadArticle = dispatches[0];
  const sideArticles = dispatches.slice(1);

  return (
    <section id="gazette-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header: Journal Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#211E1C] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold">
              <Feather className="w-3.5 h-3.5 text-[#C0822B]" />
              <span>VOICES FROM THE FIELD</span>
            </div>
            <h2 className="font-gambetta text-4xl sm:text-6xl font-bold tracking-tight text-[#211E1C]">
              Dispatches from the Sanctuary
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#5E5752] leading-relaxed">
              Essays, field journals, behind-the-scenes production diaries, and technical insights written directly by our resident creators.
            </p>
          </div>
        </div>

        {/* Broadsheet Journal Grid (1 Lead Feature + Stacked Chronicle Stream) */}
        {leadArticle && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Lead Editorial Feature (Left 7 Cols) */}
            <div 
              onClick={() => {
                audioSynth.playChime();
                setSelectedArticle(leadArticle);
              }}
              className="lg:col-span-7 bg-[#FFFFFF] border-2 border-[#211E1C] p-6 sm:p-10 rounded-xs space-y-6 cursor-pointer hover:shadow-md transition-all group relative"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#8E3524] border-b border-[#211E1C]/15 pb-3">
                <span className="font-bold uppercase tracking-wider">{leadArticle.category}</span>
                <span className="text-[#5E5752]">{leadArticle.issueNumber} · {leadArticle.readTime}</span>
              </div>

              <h3 className="font-gambetta text-2xl sm:text-4xl font-bold text-[#211E1C] group-hover:text-[#8E3524] transition-colors leading-tight">
                {leadArticle.title}
              </h3>

              <div className="flex items-center gap-2 text-xs font-mono text-[#5E5752]">
                <span className="text-[#211E1C] font-bold">{leadArticle.author}</span>
                <span>— {leadArticle.authorRole}</span>
              </div>

              <p className="drop-cap font-sans text-sm sm:text-base text-[#211E1C]/85 leading-relaxed">
                {leadArticle.excerpt}
              </p>

              <div className="pt-4 border-t border-[#211E1C]/15 flex items-center justify-between text-xs font-mono">
                <span className="text-[#8E3524] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                  Read Full Dispatch <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[#5E5752]">ARCHIVAL ESSAY</span>
              </div>
            </div>

            {/* Stacked Chronicle Articles (Right 5 Cols with Hairline Dividers) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold pb-1 border-b border-[#211E1C]/20">
                LATEST ESSAYS & DISPATCHES
              </div>

              <div className="divide-y divide-[#211E1C]/20 border-b border-[#211E1C]/20">
                {sideArticles.map((article, idx) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      audioSynth.playChime();
                      setSelectedArticle(article);
                    }}
                    className="py-5 space-y-2 cursor-pointer hover:bg-[#F3EDE2]/50 px-3 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5E5752]">
                      <span className="text-[#8E3524] font-bold uppercase">{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h4 className="font-gambetta text-lg sm:text-xl font-bold text-[#211E1C] group-hover:text-[#8E3524] transition-colors leading-snug">
                      {article.title}
                    </h4>

                    <p className="text-xs text-[#5E5752] font-sans line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="text-[11px] font-mono text-[#5E5752] pt-1">
                      By {article.author}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Full Essay Modal Reader */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#211E1C]/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF7F2] rounded-xs max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#211E1C] shadow-2xl p-6 sm:p-10 relative text-[#211E1C]"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                data-cursor="pointer"
                className="absolute top-4 right-4 p-2 text-[#211E1C] hover:bg-[#8E3524] hover:text-[#FAF7F2] rounded-xs transition-colors border border-[#211E1C]/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-3 border-b-2 border-[#211E1C] pb-4">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E3524]">
                    {selectedArticle.category} · {selectedArticle.issueNumber}
                  </div>
                  <h2 className="font-gambetta text-3xl sm:text-4xl font-bold text-[#211E1C] leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <div className="text-xs text-[#5E5752] font-mono">
                    {selectedArticle.readTime} · Written by {selectedArticle.author} ({selectedArticle.authorRole})
                  </div>
                </div>

                <div className="space-y-4 text-base text-[#211E1C] leading-relaxed font-sans">
                  {selectedArticle.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className={pIdx === 0 ? 'drop-cap' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#211E1C]/15 flex items-center justify-between text-xs text-[#5E5752] font-mono">
                  <span>Kshestra Sovereign Dispatches · 2026</span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    data-cursor="pointer"
                    className="px-4 py-2 text-xs font-bold uppercase rounded-xs bg-[#211E1C] text-[#FAF7F2]"
                  >
                    Close Essay
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

