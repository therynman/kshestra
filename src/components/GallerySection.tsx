import React, { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { StorageService } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { Image as ImageIcon, Eye, ArrowRight, X, Heart, Sparkles, Flame, Bookmark, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KshestraLogo } from './KshestraLogo';

interface GallerySectionProps {
  onPatronizeArtwork?: (artwork: Artwork) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onPatronizeArtwork }) => {
  const [galleryItems, setGalleryItems] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    setGalleryItems(StorageService.getGallery());
    const handleUpdate = (e: any) => {
      setGalleryItems(e.detail);
    };
    window.addEventListener('kshestra_gallery_updated', handleUpdate);
    return () => window.removeEventListener('kshestra_gallery_updated', handleUpdate);
  }, []);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="gallery-section" className="py-20 md:py-32 px-4 sm:px-8 border-b border-[#211E1C]/20 bg-[#FAF7F2] relative">
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header: Museum Curatorial Docket */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#211E1C]/20 pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#8E3524] bg-[#F3EDE2] border border-[#211E1C]/15 rounded-sm">
              <ImageIcon className="w-3.5 h-3.5 text-[#C98E3A]" />
              <span>THE LIVING ARCHIVE · জীবন্ত সংগ্রহালয়</span>
            </div>

            <h2 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-[#211E1C] leading-[1.02]">
              Living Works & Provenance
            </h2>

            <p className="text-base sm:text-lg text-[#5E5752] leading-relaxed font-sans">
              Authentic archival records, performance memories, and tactile masterworks created within the sanctuary's walls.
            </p>
          </div>

          {/* Curatorial Disciplines */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {['all', 'Visual Arts', 'Cinema', 'Performing Arts', 'Literature & Theatre'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  audioSynth.playChime();
                  setActiveCategory(cat);
                }}
                data-cursor="pointer"
                className={`px-4 py-2 rounded-sm uppercase tracking-wider transition-all font-semibold ${
                  activeCategory === cat
                    ? 'bg-[#211E1C] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#211E1C] hover:bg-[#F3EDE2] border border-[#211E1C]/15'
                }`}
              >
                {cat === 'all' ? 'All Archive' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Curated Exhibition Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => {
                audioSynth.playChime();
                setSelectedArtwork(item);
              }}
              data-cursor="pointer"
              className="sanctum-card rounded-sm bg-[#FFFFFF] border-2 border-[#211E1C] hover:border-[#8E3524] shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Artwork Canvas Frame with Archival Linen Matte */}
              <div className="p-4 sm:p-5 bg-[#F7F3EC] border-b-2 border-[#211E1C]">
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#211E1C] border border-[#211E1C]/20 shadow-inner">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161413]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Accession Index Stamp */}
                  <div className="absolute top-3 left-3 bg-[#161413]/90 backdrop-blur-sm px-3 py-1 text-[10px] font-mono text-[#FAF7F2] uppercase tracking-widest rounded-sm border border-[#FAF7F2]/20 flex items-center gap-1.5">
                    <KshestraLogo variant="white" className="w-3 h-3" />
                    <span>#KSH-ARC-0{idx + 1}</span>
                  </div>

                  {/* Provenance Tag */}
                  <div className="absolute top-3 right-3 bg-[#FAF7F2]/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono text-[#8E3524] font-bold uppercase rounded-sm border border-[#211E1C]/15">
                    {item.provenance}
                  </div>

                  {/* Hover Inspect Indicator */}
                  <div className="absolute bottom-3 right-3 bg-[#FAF7F2] text-[#211E1C] px-3 py-1.5 text-xs font-mono font-bold rounded-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5 text-[#8E3524]" />
                    <span>INSPECT WORK</span>
                  </div>
                </div>
              </div>

              {/* Museum Label / Curatorial Plaque */}
              <div className="p-6 space-y-4 bg-[#FFFFFF]">
                <div className="flex items-start justify-between gap-4 border-b border-[#211E1C]/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8E3524] font-bold tracking-widest block">
                      {item.category}
                    </span>
                    <h3 className="font-serif-display text-2xl font-bold text-[#211E1C] group-hover:text-[#8E3524] transition-colors">
                      "{item.title}"
                    </h3>
                  </div>

                  {item.bengaliTitle && (
                    <span className="font-bengali text-sm text-[#8E3524] font-bold shrink-0">
                      {item.bengaliTitle}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#5E5752] leading-relaxed font-sans">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-2 text-xs font-mono text-[#5E5752]">
                  <span>Creator: <strong className="text-[#211E1C]">{item.artist}</strong></span>
                  <span className="text-[#8E3524] font-semibold">Sanctum Collection</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* High-Resolution Curatorial Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#161413]/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF7F2] rounded-sm max-w-4xl w-full border-2 border-[#211E1C] shadow-2xl overflow-hidden relative text-[#211E1C]"
            >
              {/* Modal Header */}
              <div className="bg-[#211E1C] text-[#FAF7F2] p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <KshestraLogo variant="white" className="w-6 h-6" />
                  <div>
                    <h3 className="font-serif-display text-lg sm:text-xl font-bold">
                      {selectedArtwork.title}
                    </h3>
                    <p className="text-[10px] text-[#FAF7F2]/70 font-mono">
                      Accession Record: {selectedArtwork.provenance}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  data-cursor="pointer"
                  className="p-1.5 hover:bg-[#8E3524] rounded-sm text-[#FAF7F2] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
                <div className="relative rounded-sm overflow-hidden bg-[#211E1C] border border-[#211E1C]/20 max-h-96 flex items-center justify-center">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#8E3524] font-bold">
                        {selectedArtwork.category} · {selectedArtwork.provenance}
                      </span>
                      <h4 className="font-serif-display text-2xl font-bold text-[#211E1C]">
                        {selectedArtwork.title}
                      </h4>
                      {selectedArtwork.bengaliTitle && (
                        <p className="font-bengali text-sm text-[#8E3524]">
                          {selectedArtwork.bengaliTitle}
                        </p>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#5E5752] leading-relaxed font-sans">
                      {selectedArtwork.description}
                    </p>

                    <div className="p-3 bg-[#F3EDE2] rounded-sm border border-[#211E1C]/10 text-xs font-mono space-y-1">
                      <div>Artist: <strong className="text-[#211E1C]">{selectedArtwork.artist}</strong></div>
                      <div>Curator Note: Preserved under Kshestra Living Archive Trust.</div>
                    </div>
                  </div>

                  {onPatronizeArtwork && (
                    <button
                      onClick={() => {
                        const work = selectedArtwork;
                        setSelectedArtwork(null);
                        onPatronizeArtwork(work);
                      }}
                      data-cursor="pointer"
                      className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-sm bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] transition-all flex items-center justify-center gap-2"
                    >
                      <Flame className="w-4 h-4 text-[#C98E3A]" />
                      <span>Patronize / Support This Work</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
