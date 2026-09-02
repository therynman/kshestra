// Web Audio API Indian Microtonal Acoustic Drone Synthesizer
// Generates warm, evocative Indian classical tanpura / harmonium ambient drone chord progressions

export type SoundscapeType = 'bhairav' | 'megh' | 'yaman' | 'baul_drone';

export interface SoundscapeInfo {
  id: SoundscapeType;
  name: string;
  bengaliName: string;
  raga: string;
  mood: string;
  baseFreq: number;
}

export const SOUNDSCAPES: SoundscapeInfo[] = [
  {
    id: 'bhairav',
    name: 'Bhairav Archival Resonance',
    bengaliName: 'ভৈরব শান্ত মহাফেজখানা ধ্বনি',
    raga: 'Raga Bhairav (ভৈরব)',
    mood: 'Contemplative, Morning Light & Ink',
    baseFreq: 130.81 // C3
  },
  {
    id: 'yaman',
    name: 'Yaman Twilight Harmonics',
    bengaliName: 'ইমন গোধূলি আলাপ',
    raga: 'Raga Yaman (ইমন)',
    mood: 'Lyrical, Serene Evening in Shantiniketan',
    baseFreq: 146.83 // D3
  },
  {
    id: 'megh',
    name: 'Megh Monsoon Wash',
    bengaliName: 'মেঘ মল্লার জলরং তান',
    raga: 'Raga Megh (মেঘ)',
    mood: 'Earthy, Terracotta & Rain on Silk',
    baseFreq: 110.00 // A2
  },
  {
    id: 'baul_drone',
    name: 'Baul Ektara Mysticism',
    bengaliName: 'বাউল একতারা ও দোতারা প্রতিধ্বনি',
    raga: 'Baul Folk Drone (বাউল সুর)',
    mood: 'Subaltern Mysticism & Freedom',
    baseFreq: 123.47 // B2
  }
];

class IndianDroneEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.35;
  private masterGain: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private oscillators: { osc: OscillatorNode; gain: GainNode; filter: BiquadFilterNode }[] = [];
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private activeSoundscape: SoundscapeType = 'bhairav';

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 64;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);
    }
  }

  public async start(soundscape: SoundscapeType = 'bhairav') {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    }

    this.activeSoundscape = soundscape;
    const selected = SOUNDSCAPES.find(s => s.id === soundscape) || SOUNDSCAPES[0];
    const base = selected.baseFreq;

    // Tanpura / Harmonium Harmonic chord intervals (Sa, Pa, High Sa, Re / Ga microtones)
    // Indian overtone ratios: 1 (Sa), 1.5 (Pa), 2 (High Sa), 1.125 (Re) or 1.25 (Ga)
    const harmonics = [
      { freq: base, type: 'sawtooth' as OscillatorType, gain: 0.22, filterFreq: 420 },
      { freq: base * 1.5, type: 'sine' as OscillatorType, gain: 0.18, filterFreq: 680 }, // Pa (Fifth)
      { freq: base * 2.0, type: 'triangle' as OscillatorType, gain: 0.12, filterFreq: 900 }, // High Sa
      { freq: base * 0.5, type: 'sine' as OscillatorType, gain: 0.30, filterFreq: 220 }, // Low Sub-drone
      { freq: base * 1.125, type: 'sine' as OscillatorType, gain: 0.08, filterFreq: 500 } // Microtone shimmer
    ];

    // LFO for slow breathing amplitude swell (mimicking Tanpura plucking & bellows)
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime); // ~5.5 second breath cycle
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    this.lfo.connect(this.lfoGain);
    this.lfo.start();

    this.oscillators = harmonics.map(h => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = h.type;
      osc.frequency.setValueAtTime(h.freq, this.ctx!.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(h.filterFreq, this.ctx!.currentTime);
      filter.Q.setValueAtTime(2.5, this.ctx!.currentTime);

      // Smooth fade-in
      gain.gain.setValueAtTime(0.001, this.ctx!.currentTime);
      gain.gain.exponentialRampToValueAtTime(h.gain, this.ctx!.currentTime + 2.5);

      // Connect LFO modulation to harmonic gain
      if (this.lfoGain) {
        this.lfoGain.connect(gain.gain);
      }

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      return { osc, gain, filter };
    });

    this.isPlaying = true;
    window.dispatchEvent(new CustomEvent('abohoman_audio_state', { 
      detail: { isPlaying: true, soundscape: this.activeSoundscape, volume: this.currentVolume } 
    }));
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    // Smooth fade out
    this.oscillators.forEach(o => {
      try {
        o.gain.gain.cancelScheduledValues(now);
        o.gain.gain.setValueAtTime(o.gain.gain.value, now);
        o.gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          try { o.osc.stop(); o.osc.disconnect(); } catch {}
        }, 1300);
      } catch {}
    });

    if (this.lfo) {
      try { this.lfo.stop(); this.lfo.disconnect(); } catch {}
      this.lfo = null;
    }

    this.oscillators = [];
    this.isPlaying = false;
    window.dispatchEvent(new CustomEvent('abohoman_audio_state', { 
      detail: { isPlaying: false, soundscape: this.activeSoundscape, volume: this.currentVolume } 
    }));
  }

  public toggle(soundscape?: SoundscapeType) {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start(soundscape || this.activeSoundscape);
    }
  }

  public setVolume(val: number) {
    this.currentVolume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
    window.dispatchEvent(new CustomEvent('abohoman_audio_state', { 
      detail: { isPlaying: this.isPlaying, soundscape: this.activeSoundscape, volume: this.currentVolume } 
    }));
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getActiveSoundscape(): SoundscapeType {
    return this.activeSoundscape;
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyserNode) {
      return new Uint8Array(32);
    }
    const dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteFrequencyData(dataArray);
    return dataArray;
  }

  // Play a soft temple chime / bell accent on interactions
  public playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5 Bell chime
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.85);
    } catch {}
  }
}

export const audioSynth = new IndianDroneEngine();
