import React, { useState, useEffect, useRef } from 'react';
import { StorageService } from '../services/storage';
import { EventItem } from '../types';
import { audioSynth, OFFICIAL_TRACK } from '../services/audioSynthesizer';
import { Play, Pause, Disc3, MapPin, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { KshestraLogo } from './KshestraLogo';

interface BottomThirdEventsTickerProps {
  onSelectEvent: (event: EventItem) => void;
}

export const BottomThirdEventsTicker: React.FC<BottomThirdEventsTickerProps> = ({ onSelectEvent }) => {
  const [events] = useState<EventItem[]>(() => StorageService.getEvents());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync with audio engine state
  useEffect(() => {
    const handleAudioState = (e: any) => {
      if (e.detail) {
        setIsPlaying(e.detail.isPlaying);
        if (typeof e.detail.volume === 'number') {
          setVolume(e.detail.volume);
        }
      }
    };
    window.addEventListener('kshestra_audio_state', handleAudioState);
    return () => window.removeEventListener('kshestra_audio_state', handleAudioState);
  }, []);

  // Visualizer loop for canvas in square player / volume popup
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderWave = () => {
      animId = requestAnimationFrame(renderWave);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isPlaying) {
        ctx.fillStyle = '#FAF7F2';
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, canvas.height - 2, canvas.width, 2);
        return;
      }

      const freqData = audioSynth.getFrequencyData();
      const barCount = 7;
      const barWidth = canvas.width / barCount;

      for (let i = 0; i < barCount; i++) {
        const val = freqData[i * 2 % freqData.length] || 0;
        const barHeight = Math.max(3, (val / 255) * canvas.height * 0.9);
        const x = i * barWidth;
        const y = canvas.height - barHeight;

        ctx.fillStyle = '#C0822B';
        ctx.globalAlpha = 0.9;
        ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
      }
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const togglePlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioSynth.toggle();
  };

  const handleEventClick = (event: EventItem) => {
    audioSynth.playChime();
    onSelectEvent(event);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioSynth.setVolume(val);
  };

  // Duplicate events to form an uninterrupted infinite ticker
  const tickerEvents = [...events, ...events, ...events, ...events];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-40 select-none bg-[#FAF7F2] border-t-2 border-[#211E1C] shadow-2xl">
      <div className="w-full flex items-stretch h-14 sm:h-16">
        
        {/* LEFT: Square Music Player (Exact same height as the rest of the banner) */}
        <div className="relative shrink-0">
          <button
            id="square-music-player-btn"
            onClick={togglePlayback}
            onMouseEnter={() => setShowVolumePopup(true)}
            onMouseLeave={() => setShowVolumePopup(false)}
            data-cursor="pointer"
            title={isPlaying ? `Pause: ${OFFICIAL_TRACK.title}` : `Play: ${OFFICIAL_TRACK.title}`}
            aria-label="Toggle background music"
            className="w-14 sm:w-16 h-14 sm:h-16 aspect-square bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] border-r-2 border-[#211E1C] flex flex-col items-center justify-center transition-colors relative group focus:outline-none"
          >
            {/* Spinning vinyl or pulsating effect when playing */}
            {isPlaying ? (
              <div className="flex flex-col items-center justify-center gap-0.5">
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF7F2] fill-current" />
                <canvas
                  ref={canvasRef}
                  width={28}
                  height={8}
                  className="rounded-xs mt-0.5"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-0.5">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF7F2] fill-current translate-x-0.5" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#FAF7F2]/80 uppercase">
                  PLAY
                </span>
              </div>
            )}

            {/* Small active dot indicator */}
            <span
              className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${
                isPlaying ? 'bg-[#C0822B] animate-pulse' : 'bg-[#FAF7F2]/30'
              }`}
            />
          </button>

          {/* Hover / Click Volume & Track Details Popover */}
          {showVolumePopup && (
            <div 
              onMouseEnter={() => setShowVolumePopup(true)}
              onMouseLeave={() => setShowVolumePopup(false)}
              className="absolute bottom-full left-0 mb-2 w-64 bg-[#FAF7F2] border-2 border-[#211E1C] rounded-xs shadow-xl p-3 z-50 text-[#211E1C]"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-[#211E1C]/15">
                <Disc3 className={`w-4 h-4 text-[#8E3524] shrink-0 ${isPlaying ? 'animate-spin' : ''}`} />
                <div className="overflow-hidden">
                  <div className="font-bold text-xs truncate font-gambetta">{OFFICIAL_TRACK.title}</div>
                  <div className="text-[10px] font-mono text-[#8E3524] truncate">Official Kshestra Sanctuary Score</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono">
                <button
                  onClick={() => {
                    const newVol = volume === 0 ? 0.5 : 0;
                    setVolume(newVol);
                    audioSynth.setVolume(newVol);
                  }}
                  className="p-1 hover:text-[#8E3524] transition-colors"
                >
                  {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-[#8E3524]" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-[#8E3524] h-1.5 bg-[#F3EDE2] rounded-xs cursor-pointer"
                />
                <span className="text-[10px] w-6 text-right text-[#5E5752]">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* REST OF BANNER: Extended fully from left to right */}
        <div className="flex-1 min-w-0 flex items-center bg-[#FFFFFF] overflow-hidden relative">
          
          {/* Live Sanctum Status Badge */}
          <div className="shrink-0 h-full bg-[#F3EDE2] border-r border-[#211E1C]/20 px-3 sm:px-4 flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-[#8E3524] z-20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8E3524] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8E3524]"></span>
            </span>
            <span className="tracking-wider uppercase whitespace-nowrap">
              <span className="hidden sm:inline">LIVE PROGRAMME · </span>KOLKATA 2026
            </span>
          </div>

          {/* Left & Right Soft Fade Gradients */}
          <div className="absolute left-24 sm:left-48 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10 pointer-events-none" />

          {/* Infinite Smooth Continuous Marquee */}
          <div className="animate-ticker flex items-center gap-6 sm:gap-10 whitespace-nowrap py-1 select-none">
            {tickerEvents.map((evt, idx) => (
              <div
                key={`${evt.id}-${idx}`}
                onClick={() => handleEventClick(evt)}
                data-cursor="pointer"
                className="group flex items-center gap-2.5 sm:gap-3.5 cursor-pointer px-2.5 py-1 rounded-xs hover:bg-[#F3EDE2] transition-colors border border-transparent hover:border-[#8E3524]/30 shrink-0"
              >
                <div className="w-5 h-5 rounded-xs bg-[#FAF7F2] border border-[#211E1C]/20 flex items-center justify-center p-0.5 shrink-0">
                  <KshestraLogo preferAssetImage className="w-full h-full object-contain" />
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#8E3524] font-bold tracking-wider uppercase">
                    [{evt.date.split('·')[0].trim()}]
                  </span>
                  <span className="font-gambetta text-sm sm:text-base font-bold text-[#211E1C] group-hover:text-[#8E3524] transition-colors truncate max-w-[200px] sm:max-w-none">
                    {evt.title}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-[#5E5752] bg-[#211E1C]/5 px-2 py-0.5 rounded-xs shrink-0">
                  <MapPin className="w-3 h-3 text-[#8E3524]" />
                  <span>{evt.city}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#8E3524] text-[#FAF7F2] group-hover:bg-[#662215] rounded-xs transition-colors shrink-0">
                  <span>{evt.price === 0 ? 'FREE PASS' : `PASS ₹${evt.price}`}</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <span className="text-[#C0822B] text-xs font-serif pl-3">✦</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
