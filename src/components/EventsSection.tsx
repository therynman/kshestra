import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';
import { StorageService } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { Calendar, MapPin, Ticket, ArrowUpRight, Sparkles } from 'lucide-react';
import { KshestraLogo } from './KshestraLogo';

interface EventsSectionProps {
  onBuyTicket: (event: EventItem) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onBuyTicket }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const list = StorageService.getEvents();
    setEvents(list);
    const handleUpdate = (e: any) => {
      setEvents(e.detail);
    };
    window.addEventListener('kshestra_events_updated', handleUpdate);
    return () => window.removeEventListener('kshestra_events_updated', handleUpdate);
  }, []);

  // Spotlight event is permanently kept big on top (doesn't change when clicking bottom events)
  const spotlightEvent = events[0];

  // The rest of the events shown in the bottom schedule
  const otherEvents = events.filter(e => e.id !== spotlightEvent?.id);
  
  const filteredScheduleEvents = activeFilter === 'all'
    ? otherEvents
    : otherEvents.filter(e => e.category.toLowerCase().includes(activeFilter.toLowerCase()));

  // Robust date parser to prevent any text overflow in the square calendar badge
  const parseEventDate = (dateStr: string, isoDate?: string) => {
    let month = 'OCT';
    let day = '10';

    if (isoDate) {
      const parts = isoDate.split('-');
      if (parts.length >= 3) {
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const m = parseInt(parts[1], 10);
        if (m >= 1 && m <= 12) month = monthNames[m - 1];
        day = parts[2];
        return { month, day };
      }
    }

    const mMatch = dateStr.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);
    if (mMatch) month = mMatch[1].toUpperCase();
    const dMatch = dateStr.match(/\b([0-2]?[0-9]|3[01])\b/);
    if (dMatch) day = dMatch[1];
    return { month, day };
  };

  return (
    <section id="events-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2] relative">
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header: Broadsheet Program Masthead */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-[#211E1C] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#C0822B]" />
              <span>LIVE CONFLUENCES · CALENDAR</span>
            </div>

            <h2 className="font-gambetta text-4xl sm:text-6xl font-bold tracking-tight text-[#211E1C]">
              Gatherings at the Sanctuary
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#5E5752] leading-relaxed">
              Reserve your seat at our intimate performances, collaborative mixers, and hands-on production labs in Kolkata. Every ticket directly funds community residencies and emerging creator supplies.
            </p>
          </div>

          <div className="font-mono text-xs text-[#5E5752] border-l-2 border-[#8E3524] pl-4 py-1">
            <span className="font-bold text-[#211E1C] uppercase block">Kolkata Physical Sanctum</span>
            <span>Intimate Capacity · Fair Artist Compensation</span>
          </div>
        </div>

        {/* 1. HIGHLIGHTED EVENT BIG ON TOP (Fixed spotlight) */}
        {spotlightEvent && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C0822B]" />
                <span>FEATURED HIGHLIGHT CONFLUENCE</span>
              </span>
              <span className="text-[#5E5752] font-normal hidden sm:inline">Curated Flagship Programme</span>
            </div>

            <div className="bg-[#FFFFFF] border-2 border-[#211E1C] shadow-lg rounded-xs overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Column: Visual Poster Stage */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[340px] bg-[#211E1C] overflow-hidden">
                  <img
                    src={spotlightEvent.coverImage}
                    alt={spotlightEvent.title}
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700 filter grayscale contrast-125 hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211E1C] via-[#211E1C]/30 to-transparent opacity-90" />

                  <div className="absolute top-4 left-4 bg-[#FAF7F2] text-[#211E1C] px-3 py-1 text-xs font-mono uppercase tracking-widest font-bold rounded-xs border border-[#211E1C]/20 flex items-center gap-2">
                    <KshestraLogo preferAssetImage className="w-4 h-4" />
                    <span>SPOTLIGHT CONFLUENCE</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-[#8E3524] text-[#FAF7F2] px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-xs">
                    {spotlightEvent.availableTickets} PASSES REMAINING
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F2] space-y-1">
                    <div className="text-xs font-mono text-[#C0822B] uppercase tracking-wider font-bold">
                      {spotlightEvent.category} · {spotlightEvent.city}
                    </div>
                    <div className="font-gambetta text-2xl sm:text-4xl font-bold leading-tight">
                      {spotlightEvent.title}
                    </div>
                  </div>
                </div>

                {/* Right Column: Information & Fast Pass Booking */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FAF7F2]">
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#5E5752] border-b border-[#211E1C]/15 pb-2">
                      <span className="text-[#8E3524] font-bold">{spotlightEvent.date}</span>
                      <span>{spotlightEvent.time || '18:30 IST'}</span>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-[#211E1C]/85 leading-relaxed">
                      {spotlightEvent.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#5E5752] pt-2">
                      <MapPin className="w-4 h-4 text-[#8E3524] shrink-0" />
                      <span>{spotlightEvent.venue}</span>
                    </div>

                    {spotlightEvent.featuredArtists && spotlightEvent.featuredArtists.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#5E5752]">
                          Featured Artists & Guild Mentors
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {spotlightEvent.featuredArtists.map((artist, aIdx) => (
                            <span
                              key={aIdx}
                              className="px-2 py-0.5 text-xs font-mono bg-[#FFFFFF] text-[#211E1C] border border-[#211E1C]/15 rounded-xs"
                            >
                              ✦ {artist}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#211E1C]/15 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#5E5752]">PASS ACCESS TIER</span>
                      <span className="font-bold text-sm text-[#211E1C]">
                        {spotlightEvent.price === 0 ? 'Trust Sponsored (Free)' : `Pass · ₹${spotlightEvent.price}`}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        audioSynth.playChime();
                        onBuyTicket(spotlightEvent);
                      }}
                      data-cursor="pointer"
                      className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] rounded-xs bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] border border-[#211E1C]/20 shadow-md transition-all"
                    >
                      <Ticket className="w-4 h-4 text-[#C0822B]" />
                      <span>Reserve Digital Pass</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* 2. REST OF THE EVENTS ON BOTTOM */}
        <div className="space-y-6 pt-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#211E1C]/15 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold block">
                FULL CALENDAR SCHEDULE
              </span>
              <h3 className="font-gambetta text-2xl sm:text-3xl font-bold text-[#211E1C]">
                Upcoming Gatherings & Sessions
              </h3>
            </div>

            {/* Filter Navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {['all', 'Performance', 'Masterclass', 'Filmmaking'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    audioSynth.playChime();
                    setActiveFilter(filter);
                  }}
                  data-cursor="pointer"
                  className={`px-3 py-1 rounded-xs uppercase tracking-wider transition-all font-semibold ${
                    activeFilter === filter
                      ? 'bg-[#8E3524] text-[#FAF7F2]'
                      : 'bg-[#F3EDE2] text-[#211E1C] hover:bg-[#EBE2D4] border border-[#211E1C]/15'
                  }`}
                >
                  {filter === 'all' ? 'All Gatherings' : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-[#211E1C]/15 border-y-2 border-[#211E1C] bg-[#FFFFFF]">
            {filteredScheduleEvents.map((evt) => {
              const { month, day } = parseEventDate(evt.date, evt.isoDate);

              return (
                <div
                  key={evt.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors"
                >
                  {/* Left: Clean, Non-Overflowing Date Badge + Details */}
                  <div className="flex items-start sm:items-center gap-4">
                    
                    {/* Fixed Square Date Badge: Month & Day fit cleanly without overflow */}
                    <div className="w-14 sm:w-16 h-14 sm:h-16 shrink-0 bg-[#211E1C] text-[#FAF7F2] rounded-xs border border-[#211E1C]/40 flex flex-col items-center justify-center font-mono text-center p-1 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] text-[#C0822B] uppercase font-bold tracking-wider leading-tight">
                        {month}
                      </span>
                      <span className="text-base sm:text-lg font-bold leading-tight text-[#FAF7F2] mt-0.5">
                        {day}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-gambetta text-lg sm:text-xl font-bold text-[#211E1C] hover:text-[#8E3524] transition-colors">
                          {evt.title}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#5E5752]">
                        <span className="text-[#8E3524] font-bold uppercase">{evt.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#8E3524]" />
                          {evt.venue} ({evt.city})
                        </span>
                        <span>·</span>
                        <span>{evt.time || '18:30 IST'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Direct Pass Booking */}
                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#211E1C]/10">
                    <div className="text-left md:text-right font-mono text-xs">
                      <div className="font-bold text-[#211E1C]">
                        {evt.price === 0 ? 'FREE PASS' : `₹${evt.price}`}
                      </div>
                      <div className="text-[10px] text-[#4A583A]">
                        {evt.availableTickets} seats left
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        audioSynth.playChime();
                        onBuyTicket(evt);
                      }}
                      data-cursor="pointer"
                      className="px-4 py-2 bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] font-mono text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Ticket className="w-3.5 h-3.5 text-[#C0822B]" />
                      <span>Book Pass</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredScheduleEvents.length === 0 && (
              <div className="p-8 text-center text-xs font-mono text-[#5E5752]">
                No gatherings found for this category filter.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
