import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, ArrowRight, Music, Flame, Eye } from 'lucide-react';
import { audioSynth } from '../services/audioSynthesizer';
import { KshestraLogo } from './KshestraLogo';

interface WelcomeCurtainProps {
  onEnter: () => void;
}

export const WelcomeCurtain: React.FC<WelcomeCurtainProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [soundscapeMode, setSoundscapeMode] = useState<'drone' | 'flute' | 'raga'>('drone');

  const handleEnterWebsite = () => {
    setIsExiting(true);
    
    // Automatically turn on audio synthesiser with soothing meditative temple soundscape
    try {
      audioSynth.start('bhairav');
      audioSynth.playChime();
    } catch (e) {
      console.error('Audio auto-play notification:', e);
    }

    setTimeout(() => {
      onEnter();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.04,
            filter: 'blur(10px)',
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#161413] text-[#FAF7F2] p-6 sm:p-10 md:p-14 overflow-hidden select-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(142, 53, 36, 0.15) 0%, rgba(22, 20, 19, 0.95) 75%)`,
          }}
        >
          {/* Subtle Ambient Grain & Background Calligraphy Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center overflow-hidden">
            <span className="font-bengali text-[35vw] font-bold text-[#FAF7F2] leading-none select-none">
              ক্ষেত্র
            </span>
          </div>

          {/* Top Archival Header Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#FAF7F2]/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C98E3A] animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C98E3A] font-semibold">
                KSHESTRA SANCTUARY PORTAL · ক্ষেত্র
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#FAF7F2]/60 uppercase tracking-widest border border-[#FAF7F2]/20 px-3 py-1 rounded-sm">
              <span>EST. 2026</span>
              <span>·</span>
              <span>NON-PROFIT TRUST</span>
            </div>
          </div>

          {/* Central Entrance Greeting Showcase */}
          <div className="relative z-10 max-w-3xl mx-auto my-auto text-center py-6 sm:py-10 space-y-6">
            
            {/* The Official Kshestra Logo with Glowing Aura */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex justify-center"
            >
              <div className="relative group cursor-pointer p-4">
                <div className="absolute inset-0 rounded-full bg-[#8E3524]/20 blur-2xl group-hover:bg-[#8E3524]/40 transition-all duration-700"></div>
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#211E1C] border border-[#C98E3A]/40 flex items-center justify-center shadow-2xl p-4 sm:p-5">
                  <KshestraLogo variant="white" className="w-full h-full text-[#FAF7F2] drop-shadow-md" />
                </div>
              </div>
            </motion.div>

            {/* Typography Greeting */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C98E3A]/40 bg-[#FAF7F2]/5 text-[#C98E3A] text-[11px] font-mono uppercase tracking-[0.2em]">
                <Flame className="w-3.5 h-3.5" />
                <span>The Soul Has a Territory · ক্ষেত্র</span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF7F2] leading-[1.08]">
                Welcome to the Sanctuary
              </h1>
              
              <p className="font-serif italic text-lg sm:text-2xl text-[#C98E3A] font-light">
                স্বতন্ত্র শিল্প, সাহিত্য ও সৃজনের উন্মুক্ত নিকেতন
              </p>

              <p className="text-xs sm:text-sm text-[#FAF7F2]/70 max-w-xl mx-auto font-sans leading-relaxed pt-2">
                A non-profit foundation providing physical studios, production crews, 
                and zero-cost training for independent Indian creators.
              </p>
            </motion.div>

            {/* Audio Experience Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-sm bg-[#211E1C]/90 border border-[#FAF7F2]/10 text-xs text-[#FAF7F2]/80 font-mono"
            >
              <Music className="w-4 h-4 text-[#C98E3A] animate-bounce" />
              <span>Sonic Sanctum Soundscape will start automatically on entry</span>
            </motion.div>

            {/* THE PRIMARY BUTTON AS REQUESTED: Continue exploring */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={handleEnterWebsite}
                data-cursor="pointer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-sm bg-[#8E3524] hover:bg-[#A83F2C] text-[#FAF7F2] border border-[#FAF7F2]/20 shadow-2xl hover:shadow-[#8E3524]/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-4 h-4 text-[#C98E3A]" />
                <span>Continue exploring</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

          </div>

          {/* Bottom Footnote & Location Stamps */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-t border-[#FAF7F2]/10 pt-4 text-[11px] font-mono text-[#FAF7F2]/50 gap-2">
            <div className="flex items-center gap-4">
              <span>KOLKATA · 22.5726° N</span>
              <span>•</span>
              <span>MUMBAI · 19.0760° N</span>
            </div>
            <div>
              <span>PRESS [CONTINUE EXPLORING] TO UNLOCK SANCTUM</span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
