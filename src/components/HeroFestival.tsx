import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Ticket, 
  Calendar, 
  MapPin, 
  ArrowDown, 
  Volume2, 
  Compass, 
  Zap, 
  Flame, 
  Radio,
  ArrowUpRight,
  IdCard
} from 'lucide-react';
import { audioSynth } from '../services/audioSynthesizer';

interface HeroFestivalProps {
  onExploreLineup: () => void;
  onBookPass: () => void;
  onOpenBadgeGenerator: () => void;
}

export const HeroFestival: React.FC<HeroFestivalProps> = ({
  onExploreLineup,
  onBookPass,
  onOpenBadgeGenerator
}) => {
  // Countdown Timer State (Festival Opening: Oct 24, 2026)
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 52, hours: 14, minutes: 28, seconds: 40 });

  useEffect(() => {
    const targetDate = new Date('2026-10-24T10:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FFF5E9] border-b border-[#5C1D24]/20 pt-8 pb-16 sm:pb-24">
      
      {/* Background Decorative Radial Gradient Grid */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#5C1D24 0.75px, transparent 0.75px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Top Live Festival Dispatch Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#5C1D24]/15 pb-4 mb-8">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-[#5C1D24] text-[#FFF5E9] rounded-full text-xs font-sans font-medium tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#8A8E3E] animate-pulse" />
            <span>FESTIVAL SEASON 2026 • OFFICIAL PROGRAMME</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans text-[#6B5558]">
            <span className="flex items-center gap-1.5 font-medium text-[#5C1D24]">
              <MapPin className="w-3.5 h-3.5 text-[#8A8E3E]" />
              <span>Kolkata & Shantiniketan</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-medium text-[#5C1D24]">
              <Calendar className="w-3.5 h-3.5 text-[#8A8E3E]" />
              <span>Oct 24–26, 2026</span>
            </span>
          </div>
        </div>

        {/* Main Linear Kinetic Hero Headline */}
        <div className="space-y-4 text-left my-6 sm:my-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-[#8A8E3E] font-bold"
          >
            <Zap className="w-4 h-4 text-[#8A8E3E]" />
            <span>A Bold 3-Day Autonomous Performing & Visual Arts Festival</span>
          </motion.div>

          {/* Bengali Grand Title + English Kinetic Masthead */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-1"
          >
            <h1 className="font-bengali text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#5C1D24] leading-[1.05]">
              আবহমান শিল্প উৎসব ২০২৬
            </h1>
            <div className="font-serif-display italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2A0E12] tracking-tight">
              Abohoman Performing & Visual Arts Odyssey
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base sm:text-xl text-[#6B5558] max-w-3xl leading-relaxed font-normal pt-2"
          >
            Four open stages across the heritage printing lanes of College Street and the banyan courtyards of Shantiniketan. 
            Immerse in live linocut printmaking revolts, Baul-jazz microtonal soundscapes, avant-garde street theatre, and unconditional fellowships.
          </motion.p>
        </div>

        {/* Dynamic Action Buttons & Live Countdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-8 pt-4">
          
          {/* Left CTA Action Group */}
          <div className="lg:col-span-7 flex flex-wrap items-center gap-3.5">
            <button
              id="hero-book-pass-btn"
              onClick={() => {
                audioSynth.playChime();
                onBookPass();
              }}
              data-cursor="pointer"
              data-cursor-label="PASSES"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#5C1D24] hover:bg-[#3D1217] text-[#FFF5E9] font-sans font-semibold text-sm sm:text-base rounded-full transition-all shadow-md hover:shadow-lg group border border-[#5C1D24]"
            >
              <Ticket className="w-5 h-5 text-[#8A8E3E] group-hover:rotate-12 transition-transform" />
              <span>Book Festival Passes</span>
              <span className="px-2 py-0.5 rounded-full bg-[#8A8E3E] text-[#2A0E12] font-mono text-xs font-bold">
                From ₹250
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              id="hero-explore-lineup-btn"
              onClick={() => {
                audioSynth.playChime();
                onExploreLineup();
              }}
              data-cursor="pointer"
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#FAF0E4] hover:bg-[#F2E7D5] text-[#5C1D24] font-sans font-medium text-sm rounded-full transition-colors border border-[#5C1D24]/30"
            >
              <Calendar className="w-4 h-4 text-[#8A8E3E]" />
              <span>Explore 4 Stages & Schedule</span>
            </button>

            <button
              id="hero-badge-generator-btn"
              onClick={() => {
                audioSynth.playChime();
                onOpenBadgeGenerator();
              }}
              data-cursor="pointer"
              className="inline-flex items-center gap-2 px-5 py-4 bg-transparent hover:bg-[#5C1D24]/5 text-[#5C1D24] font-sans text-xs uppercase tracking-wider rounded-full transition-colors border border-[#5C1D24]/20"
            >
              <IdCard className="w-4 h-4 text-[#8A8E3E]" />
              <span>Create VIP Holographic Pass</span>
            </button>
          </div>

          {/* Right Live Festival Countdown Box (Linear Festival Aesthetic) */}
          <div className="lg:col-span-5 bg-[#FAF0E4] border border-[#5C1D24]/20 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#5C1D24]/15 pb-2.5 mb-4">
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#5C1D24]">
                <Radio className="w-3.5 h-3.5 text-[#8A8E3E] animate-pulse" />
                <span>GATES OPEN COUNTDOWN</span>
              </div>
              <span className="text-[11px] font-sans text-[#6B5558]">Oct 24 • 10:00 AM IST</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 bg-[#FFF5E9] rounded-xl border border-[#5C1D24]/10">
                <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#5C1D24]">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-[9px] font-sans uppercase tracking-widest text-[#6B5558] mt-0.5">DAYS</div>
              </div>
              <div className="p-2.5 bg-[#FFF5E9] rounded-xl border border-[#5C1D24]/10">
                <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#5C1D24]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[9px] font-sans uppercase tracking-widest text-[#6B5558] mt-0.5">HOURS</div>
              </div>
              <div className="p-2.5 bg-[#FFF5E9] rounded-xl border border-[#5C1D24]/10">
                <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#5C1D24]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[9px] font-sans uppercase tracking-widest text-[#6B5558] mt-0.5">MINS</div>
              </div>
              <div className="p-2.5 bg-[#FFF5E9] rounded-xl border border-[#5C1D24]/10">
                <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#8A8E3E]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[9px] font-sans uppercase tracking-widest text-[#6B5558] mt-0.5">SECS</div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Festival Pillars / Stages Ribbon (Linear Festivals Multi-Stage Preview) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-[#5C1D24]/15">
          
          <div className="p-4 bg-[#FAF0E4]/70 rounded-xl border border-[#5C1D24]/15 hover:bg-[#FAF0E4] transition-colors">
            <div className="text-[10px] font-sans text-[#8A8E3E] font-bold uppercase tracking-widest">STAGE 01</div>
            <div className="font-serif-display font-bold text-base sm:text-lg text-[#5C1D24] mt-0.5">
              College Street Bodhi
            </div>
            <div className="text-xs text-[#6B5558] font-sans mt-1">
              Open-air Linocut Press & Live Theatre
            </div>
          </div>

          <div className="p-4 bg-[#FAF0E4]/70 rounded-xl border border-[#5C1D24]/15 hover:bg-[#FAF0E4] transition-colors">
            <div className="text-[10px] font-sans text-[#8A8E3E] font-bold uppercase tracking-widest">STAGE 02</div>
            <div className="font-serif-display font-bold text-base sm:text-lg text-[#5C1D24] mt-0.5">
              Kala Bhavana Ashram
            </div>
            <div className="text-xs text-[#6B5558] font-sans mt-1">
              Living Gallery & Terracotta Studio
            </div>
          </div>

          <div className="p-4 bg-[#FAF0E4]/70 rounded-xl border border-[#5C1D24]/15 hover:bg-[#FAF0E4] transition-colors">
            <div className="text-[10px] font-sans text-[#8A8E3E] font-bold uppercase tracking-widest">STAGE 03</div>
            <div className="font-serif-display font-bold text-base sm:text-lg text-[#5C1D24] mt-0.5">
              Nandan Cine-Cell
            </div>
            <div className="text-xs text-[#6B5558] font-sans mt-1">
              Archival 16mm Projections & Sound
            </div>
          </div>

          <div className="p-4 bg-[#FAF0E4]/70 rounded-xl border border-[#5C1D24]/15 hover:bg-[#FAF0E4] transition-colors">
            <div className="text-[10px] font-sans text-[#8A8E3E] font-bold uppercase tracking-widest">STAGE 04</div>
            <div className="font-serif-display font-bold text-base sm:text-lg text-[#5C1D24] mt-0.5">
              Pragati Ghat Pavilion
            </div>
            <div className="text-xs text-[#6B5558] font-sans mt-1">
              Sunset Baul Drone & Microtonal Ragas
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
