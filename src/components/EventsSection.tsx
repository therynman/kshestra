import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';
import { StorageService } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { Calendar, Clock, MapPin, Ticket, Sparkles, Users, ArrowRight, ArrowUpRight, Check, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { KshestraLogo } from './KshestraLogo';

interface EventsSectionProps {
  onBuyTicket: (event: EventItem) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onBuyTicket }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    setEvents(StorageService.getEvents());
    const handleUpdate = (e: any) => {
      setEvents(e.detail);
    };
    window.addEventListener('kshestra_events_updated', handleUpdate);
    return () => window.removeEventListener('kshestra_events_updated', handleUpdate);
  }, []);

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(e => e.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="events-section" className="py-20 md:py-32 px-4 sm:px-8 border-b border-[#211E1C]/20 bg-[#F4EFEA] relative overflow-hidden">
      
      {/* Background Architectural Watermark */}
      <div className="absolute top-12 left-6 pointer-events-none opacity-5 select-none hidden md:block">
        <span className="font-mono text-[16vw] font-bold text-[#211E1C] leading-none">
          CONFLUENCE
        </span>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header: Bold Festival Editorial */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#211E1C]/20 pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#8E3524] bg-[#FAF7F2] border border-[#211E1C]/15 rounded-sm">
              <Calendar className="w-3.5 h-3.5 text-[#C98E3A]" />
              <span>SANCTUM CONFLUENCES 2026</span>
            </div>

            <h2 className="font-serif-display text-4xl sm:text-6xl font-bold tracking-tight text-[#211E1C] leading-[1.02]">
              Gatherings at the Sanctuary
            </h2>

            <p className="text-base sm:text-lg text-[#5E5752] leading-relaxed font-sans">
              Intimate acoustic performances, cinema masterclasses, and collaborative production labs. 
              Passes are limited to preserve sacred circle intimacy.
            </p>
          </div>

          {/* Category Filter Pills (Editorial Style) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {['all', 'Performance', 'Masterclass', 'Filmmaking'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  audioSynth.playChime();
                  setActiveFilter(filter);
                }}
                data-cursor="pointer"
                className={`px-4 py-2 rounded-sm uppercase tracking-wider transition-all font-semibold ${
                  activeFilter === filter
                    ? 'bg-[#8E3524] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#211E1C] hover:bg-[#EAE2D7] border border-[#211E1C]/15'
                }`}
              >
                {filter === 'all' ? 'All Gatherings' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Poster Ticket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="sanctum-card rounded-sm bg-[#FFFFFF] border-2 border-[#211E1C] flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div>
                {/* Event Poster Image & Top Docket */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#211E1C] border-b-2 border-[#211E1C]">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale contrast-125 group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161413] via-transparent to-transparent opacity-80" />

                  {/* Archival Index Badge */}
                  <div className="absolute top-3 left-3 bg-[#161413]/90 backdrop-blur-sm text-[#FAF7F2] px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-sm border border-[#FAF7F2]/20 flex items-center gap-1.5">
                    <KshestraLogo variant="white" className="w-3 h-3" />
                    <span>0{idx + 1} // {event.category.split('&')[0]}</span>
                  </div>

                  {/* Seat Availability Tag */}
                  <div className="absolute top-3 right-3 bg-[#8E3524] text-[#FAF7F2] px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm shadow-sm">
                    {event.availableTickets} SEATS LEFT
                  </div>

                  {/* Date & Time Overlay in Poster Style */}
                  <div className="absolute bottom-3 left-3 right-3 text-[#FAF7F2] space-y-1">
                    <div className="font-mono text-xs text-[#C98E3A] font-bold tracking-wider uppercase">
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#FAF7F2]/80">
                      <MapPin className="w-3 h-3 text-[#C98E3A]" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Event Body Content */}
                <div className="p-6 space-y-4">
                  {event.bengaliTitle && (
                    <span className="font-bengali text-xs text-[#8E3524] font-bold tracking-wider block">
                      {event.bengaliTitle}
                    </span>
                  )}

                  <h3 className="font-serif-display text-2xl font-bold text-[#211E1C] leading-snug group-hover:text-[#8E3524] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5E5752] leading-relaxed font-sans line-clamp-3">
                    {event.description}
                  </p>

                  {/* Featured Artist tags */}
                  {event.featuredArtists && event.featuredArtists.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#211E1C]/10">
                      {event.featuredArtists.map((artist, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 text-[10px] font-mono bg-[#F3EDE2] text-[#211E1C] rounded-sm border border-[#211E1C]/10"
                        >
                          ✦ {artist}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Perforated Receipt Footer with Booking Trigger */}
              <div className="p-6 pt-0 space-y-3">
                <div className="p-3 bg-[#FAF7F2] border-t-2 border-dashed border-[#211E1C]/20 rounded-sm flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[#5E5752] block text-[9px] uppercase">Access Tier</span>
                    <span className="font-bold text-[#211E1C]">
                      {event.price === 0 ? 'Trust Sponsored Pass' : `General Pass · ₹${event.price}`}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#8E3524] font-bold uppercase text-[10px]">
                      {event.city}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    audioSynth.playChime();
                    onBuyTicket(event);
                  }}
                  data-cursor="pointer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] rounded-sm bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] border border-[#211E1C]/30 shadow-sm transition-all transform hover:-translate-y-0.5"
                >
                  <Ticket className="w-4 h-4 text-[#C98E3A]" />
                  <span>Reserve Digital Pass</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
