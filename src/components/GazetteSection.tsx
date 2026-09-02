import React, { useState, useEffect } from 'react';
import { GazetteArticle } from '../types';
import { StorageService } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { BookOpen, Clock, User, ArrowRight, X, Feather } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GazetteSection: React.FC = () => {
  const [dispatches, setDispatches] = useState<GazetteArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<GazetteArticle | null>(null);

  useEffect(() => {
    setDispatches(StorageService.getDispatches());
  }, []);

  return (
    <section id="dispatches-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8E3524] bg-[#F3EDE2] border border-[#211E1C]/15 rounded-sm">
            <Feather className="w-3.5 h-3.5" />
            <span>VOICES FROM THE FIELD</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#211E1C]">
            Dispatches from the Sanctuary
          </h2>

          <p className="text-base sm:text-lg text-[#5E5752] leading-relaxed font-sans">
            Essays, field journals, behind-the-scenes production diaries, and technical insights written directly by our resident creators.
          </p>
        </div>

        {/* 3 Dispatches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dispatches.map((dispatch, idx) => (
            <motion.div
              key={dispatch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="sanctum-card rounded-sm p-7 bg-[#FFFFFF] border border-[#211E1C]/15 hover:border-[#8E3524]/40 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Category & Read Time */}
                <div className="flex flex-col gap-1 border-b border-[#211E1C]/10 pb-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8E3524]">
                    {dispatch.category}
                  </div>
                  <div className="text-xs text-[#5E5752] font-mono">
                    {dispatch.readTime} · By {dispatch.author}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#211E1C] leading-snug group-hover:text-[#8E3524] transition-colors">
                  {dispatch.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#5E5752] leading-relaxed font-sans">
                  {dispatch.excerpt}
                </p>
              </div>

              {/* Read Full Essay Link */}
              <div className="pt-6 border-t border-[#211E1C]/10 mt-6">
                <button
                  onClick={() => {
                    audioSynth.playChime();
                    setSelectedArticle(dispatch);
                  }}
                  data-cursor="pointer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8E3524] hover:text-[#662215] transition-colors"
                >
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Full Essay Modal Reader */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#211E1C]/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF7F2] rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#211E1C]/20 shadow-2xl p-6 sm:p-10 relative"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                data-cursor="pointer"
                className="absolute top-4 right-4 p-2 text-[#211E1C] hover:bg-[#8E3524] hover:text-[#FAF7F2] rounded-sm transition-colors border border-[#211E1C]/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2 border-b border-[#211E1C]/15 pb-4">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E3524]">
                    {selectedArticle.category} · {selectedArticle.issueNumber}
                  </div>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#211E1C]">
                    {selectedArticle.title}
                  </h2>
                  <div className="text-xs text-[#5E5752] font-mono">
                    {selectedArticle.readTime} · Written by {selectedArticle.author} ({selectedArticle.authorRole})
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#211E1C] leading-relaxed font-serif">
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
                    className="px-4 py-2 text-xs font-bold uppercase rounded-sm bg-[#211E1C] text-[#FAF7F2]"
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
