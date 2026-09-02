import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, ChevronDown, ChevronUp, Radio } from 'lucide-react';
import { audioSynth, SOUNDSCAPES, SoundscapeType } from '../services/audioSynthesizer';

export const AudioDock: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState<SoundscapeType>('bhairav');
  const [volume, setVolume] = useState(0.35);
  const [isExpanded, setIsExpanded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleAudioState = (e: any) => {
      if (e.detail) {
        setIsPlaying(e.detail.isPlaying);
        setActiveSoundscape(e.detail.soundscape);
        setVolume(e.detail.volume);
      }
    };

    window.addEventListener('kshestra_audio_state', handleAudioState);
    window.addEventListener('abohoman_audio_state', handleAudioState);
    return () => {
      window.removeEventListener('kshestra_audio_state', handleAudioState);
      window.removeEventListener('abohoman_audio_state', handleAudioState);
    };
  }, []);

  // Live visualizer loop
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
        // Draw resting flat line with faint pulse
        ctx.beginPath();
        ctx.strokeStyle = '#8E3524';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.25;
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        return;
      }

      const freqData = audioSynth.getFrequencyData();
      const barCount = 16;
      const barWidth = canvas.width / barCount;

      for (let i = 0; i < barCount; i++) {
        const val = freqData[i % freqData.length] || 0;
        const normalized = Math.max(3, (val / 255) * canvas.height * 0.9);
        const x = i * barWidth;
        const y = (canvas.height - normalized) / 2;

        ctx.fillStyle = i % 2 === 0 ? '#8E3524' : '#4A583A';
        ctx.globalAlpha = 0.85;
        ctx.fillRect(x + 1, y, barWidth - 2, normalized);
      }
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const currentInfo = SOUNDSCAPES.find(s => s.id === activeSoundscape) || SOUNDSCAPES[0];

  const togglePlayback = () => {
    audioSynth.toggle();
  };

  const changeSoundscape = (id: SoundscapeType) => {
    audioSynth.start(id);
    audioSynth.playChime();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioSynth.setVolume(val);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm w-[calc(100vw-32px)] sm:w-80 select-none">
      <div className="bg-[#FAF7F2]/95 backdrop-blur-md border border-[#211E1C]/20 rounded-sm shadow-lg p-3 transition-all duration-300 text-[#211E1C]">
        
        {/* Top bar with audio visualizer & quick toggle */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <button
              id="audio-play-pause-btn"
              onClick={togglePlayback}
              data-cursor="pointer"
              title={isPlaying ? "Pause Sanctuary Acoustic Drone" : "Play Sanctuary Acoustic Drone"}
              className="w-8 h-8 rounded-sm shrink-0 flex items-center justify-center bg-[#8E3524] text-[#FAF7F2] hover:bg-[#662215] transition-colors shadow-xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-0.5" />}
            </button>

            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#211E1C] truncate">
                <span>{currentInfo.name}</span>
                <span className="text-[10px] font-bengali text-[#8E3524]">{currentInfo.bengaliName}</span>
              </div>
              <p className="text-[10px] text-[#5E5752] truncate font-mono">
                {isPlaying ? 'Acoustic Sanctuary Resonance' : 'Drone Inactive · Tap to Play'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Real-time Oscilloscope Canvas */}
            <canvas
              ref={canvasRef}
              width={64}
              height={24}
              className="rounded-sm bg-[#F3EDE2] border border-[#211E1C]/10"
            />

            {/* Expand options */}
            <button
              id="audio-expand-toggle-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              data-cursor="pointer"
              aria-label="Toggle soundscape settings"
              className="p-1 hover:bg-[#F3EDE2] rounded-sm text-[#5E5752] hover:text-[#211E1C] transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Soundscape Selector & Volume Slider */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-[#211E1C]/10 space-y-3">
            
            {/* Soundscape presets */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5E5752] block">
                Sanctum Acoustic Modes
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {SOUNDSCAPES.map((sc) => {
                  const isActive = activeSoundscape === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => changeSoundscape(sc.id)}
                      data-cursor="pointer"
                      className={`text-left p-1.5 rounded-sm border text-xs transition-all ${
                        isActive
                          ? 'bg-[#8E3524] text-[#FAF7F2] border-[#8E3524]'
                          : 'bg-[#FAF7F2] text-[#211E1C] border-[#211E1C]/15 hover:border-[#8E3524]/50'
                      }`}
                    >
                      <div className="font-medium truncate">{sc.name}</div>
                      <div className="text-[9px] opacity-80 truncate font-mono">{sc.mood}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume Control */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#5E5752]">
                <span className="flex items-center gap-1">
                  {volume === 0 ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-[#8E3524]" />}
                  Master Resonance Volume
                </span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#211E1C]/20 rounded-lg appearance-none cursor-pointer accent-[#8E3524]"
              />
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
