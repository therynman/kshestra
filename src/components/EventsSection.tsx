import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';
import { StorageService } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { Calendar, MapPin, Ticket, ArrowUpRight } from 'lucide-react';
import { KshestraLogo } from './KshestraLogo';

interface EventsSectionProps {
  onBuyTicket: (event: EventItem) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onBuyTicket }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    const list = StorageService.getEvents();
    setEvents(list);
    if (list.length > 0 && !selectedEventId) {
      setSelectedEventId(list[0].id);
    }
    const handleUpdate = (e: any) => {
      setEvents(e.detail);
    };
    window.addEventListener('kshestra_events_updated', handleUpdate);
    return () => window.removeEventListener('kshestra_events_updated', handleUpdate);
  }, [selectedEventId]);

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(e => e.category.toLowerCase().includes(activeFilter.toLowerCase()));

  const featuredEvent = events.find(e => e.id === selectedEventId) || events[0];

  return (
    <section id="events-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2] relative">
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header: Broadsheet Program Masthead */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-[#211E1C] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#C0822B]" />
              <span>LIVE CONFLUENCES</span>
            </div>

            <h2 className="font-gambetta text-4xl sm:text-6xl font-bold tracking-tight text-[#211E1C]">
              Gatherings at the Sanctuary
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#5E5752] leading-relaxed">
              Reserve your seat at our intimate performances, collaborative mixers, and hands-on production labs in Kolkata. Every ticket directly funds community residencies and emerging creator supplies.
            </p>
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
                className={`px-3.5 py-1.5 rounded-xs uppercase tracking-wider transition-all font-semibold ${
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

        {/* FEATURED SPOTLIGHT STAGE */}
        {featuredEvent && (
          <div className="bg-[#FFFFFF] border-2 border-[#211E1C] shadow-md rounded-xs overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Visual Poster Stage */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[320px] bg-[#211E1C] overflow-hidden">
                <img
                  src={featuredEvent.coverImage}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700 filter grayscale contrast-125 hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211E1C] via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 left-4 bg-[#FAF7F2] text-[#211E1C] px-3 py-1 text-xs font-mono uppercase tracking-widest font-bold rounded-xs border border-[#211E1C]/20 flex items-center gap-2">
                  <KshestraLogo preferAssetImage className="w-4 h-4" />
                  <span>SPOTLIGHT CONFLUENCE</span>
                </div>

                <div className="absolute top-4 right-4 bg-[#8E3524] text-[#FAF7F2] px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-xs">
                  {featuredEvent.availableTickets} PASSES REMAINING
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F2] space-y-1">
                  <div className="text-xs font-mono text-[#C0822B] uppercase tracking-wider font-bold">
                    {featuredEvent.category} · {featuredEvent.city}
                  </div>
                  <div className="font-gambetta text-2xl sm:text-3xl font-bold leading-tight">
                    {featuredEvent.title}
                  </div>
                </div>
              </div>

              {/* Right Column: Information & Fast Pass Booking */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FAF7F2]">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#5E5752] border-b border-[#211E1C]/15 pb-2">
                    <span className="text-[#8E3524] font-bold">{featuredEvent.date}</span>
                    <span>{featuredEvent.time || '18:30 IST'}</span>
                  </div>

                  <p className="font-sans text-sm text-[#211E1C]/85 leading-relaxed">
                    {featuredEvent.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#5E5752] pt-2">
                    <MapPin className="w-4 h-4 text-[#8E3524] shrink-0" />
                    <span>{featuredEvent.venue}</span>
                  </div>

                  {featuredEvent.featuredArtists && featuredEvent.featuredArtists.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#5E5752]">
                        Leading Artists & Mentors
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {featuredEvent.featuredArtists.map((artist, aIdx) => (
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
                      {featuredEvent.price === 0 ? 'Trust Sponsored (Free)' : `Pass · ₹${featuredEvent.price}`}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      audioSynth.playChime();
                      onBuyTicket(featuredEvent);
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
        )}

        {/* TIMELINE SCHEDULE STREAM */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold">
            <span>FULL CALENDAR SCHEDULE</span>
            <span className="text-[#5E5752] font-normal">Click any row to inspect & book</span>
          </div>

          <div className="divide-y divide-[#211E1C]/15 border-y-2 border-[#211E1C] bg-[#FFFFFF]">
            {filteredEvents.map((evt) => {
              const isSelected = evt.id === selectedEventId;
              return (
                <div
                  key={evt.id}
                  onClick={() => {
                    audioSynth.playChime();
                    setSelectedEventId(evt.id);
                  }}
                  className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all ${
                    isSelected ? 'bg-[#F3EDE2]/80 border-l-4 border-[#8E3524]' : 'hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 shrink-0 bg-[#211E1C] text-[#FAF7F2] rounded-xs flex flex-col items-center justify-center font-mono text-center p-1">
                      <span className="text-[10px] text-[#C0822B] uppercase font-bold">
                        {evt.date.split(' ')[0]}
                      </span>
                      <span className="text-sm sm:text-base font-bold leading-none">
                        {evt.date.split(' ')[1]?.replace(',', '') || '2026'}
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
                      </div>
                    </div>
                  </div>

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
                      onClick={(e) => {
                        e.stopPropagation();
                        audioSynth.playChime();
                        onBuyTicket(evt);
                      }}
                      className="px-4 py-2 bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] font-mono text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
                    >
                      Book Pass
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
