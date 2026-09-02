import React, { useState } from 'react';
import { StorageService } from '../services/storage';
import { EventItem } from '../types';
import { audioSynth } from '../services/audioSynthesizer';
import { Calendar, MapPin, Ticket, Sparkles, ChevronUp, ChevronDown, ArrowUpRight } from 'lucide-react';
import { KshestraLogo } from './KshestraLogo';

interface BottomThirdEventsTickerProps {
  onSelectEvent: (event: EventItem) => void;
}

export const BottomThirdEventsTicker: React.FC<BottomThirdEventsTickerProps> = ({ onSelectEvent }) => {
  const [events] = useState<EventItem[]>(() => StorageService.getEvents());
  const [isMinimized, setIsMinimized] = useState(false);

  // Duplicate list to create a seamless infinite ticker
  const tickerEvents = [...events, ...events, ...events];

  const handleEventClick = (event: EventItem) => {
    audioSynth.playChime();
    onSelectEvent(event);
  };

  return (
    <div
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
        isMinimized ? 'bottom-0' : 'bottom-0 md:bottom-2'
      } px-0 md:px-4 max-w-7xl mx-auto pointer-events-none`}
    >
      <div className="pointer-events-auto bg-[#FFFFFF]/95 backdrop-blur-md text-[#211E1C] border-t md:border border-[#211E1C]/20 shadow-xl md:rounded-sm overflow-hidden flex flex-col">
        
        {/* Top Minimal Strip: Live Status & Controls */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-1.5 bg-[#F3EDE2] border-b border-[#211E1C]/10 text-[10px] sm:text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8E3524] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8E3524]"></span>
            </span>
            <span className="text-[#8E3524] font-bold uppercase tracking-wider flex items-center gap-1">
              <span>LIVE SANCTUARY PROGRAMME</span>
              <span className="hidden sm:inline">· 2026 CONFLUENCES</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#5E5752] hidden sm:inline text-[9px] uppercase tracking-widest">
              Hover to pause · Click event to reserve pass
            </span>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-[#5E5752] hover:text-[#8E3524] p-0.5 rounded transition-colors flex items-center gap-1 text-[10px]"
              title={isMinimized ? 'Expand Events Strip' : 'Minimize Events Strip'}
            >
              <span>{isMinimized ? 'EXPAND' : 'COLLAPSE'}</span>
              {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* The Continuous Infinite Marquee Strip */}
        {!isMinimized && (
          <div className="relative overflow-hidden py-2.5 sm:py-3 select-none flex items-center bg-[#FAF7F2]">
            {/* Left & Right Shadow Gradients for smooth fade */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

            <div className="animate-ticker flex items-center gap-8 sm:gap-12 whitespace-nowrap">
              {tickerEvents.map((evt, idx) => (
                <div
                  key={`${evt.id}-${idx}`}
                  onClick={() => handleEventClick(evt)}
                  className="group flex items-center gap-3 sm:gap-4 cursor-pointer px-3 py-1.5 rounded-sm hover:bg-[#F3EDE2] transition-all border border-transparent hover:border-[#8E3524]/30 shrink-0"
                >
                  <div className="w-5 h-5 rounded-full bg-[#8E3524] text-[#FAF7F2] flex items-center justify-center font-serif text-[10px] font-bold">
                    <KshestraLogo variant="white" className="w-3 h-3" />
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-[#8E3524] font-bold tracking-wider uppercase">
                      [{evt.date.split('·')[0].trim()}]
                    </span>
                    <span className="font-serif-display text-sm sm:text-base font-bold text-[#211E1C] group-hover:text-[#8E3524] transition-colors">
                      {evt.title}
                    </span>
                    <span className="text-[#5E5752] hidden md:inline text-[11px]">
                      ({evt.bengaliTitle})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#5E5752] bg-[#211E1C]/5 px-2 py-0.5 rounded">
                    <MapPin className="w-3 h-3 text-[#8E3524]" />
                    <span>{evt.city}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 bg-[#8E3524] text-[#FAF7F2] group-hover:bg-[#662215] rounded transition-all">
                    <span>{evt.price === 0 ? 'FREE PASS' : `PASS ₹${evt.price}`}</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Glyph Divider between items */}
                  <span className="text-[#C98E3A] text-xs font-serif pl-4">✦</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
