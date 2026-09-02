import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Download, 
  Check, 
  QrCode, 
  ShieldCheck, 
  Award, 
  Flame, 
  IdCard,
  Printer,
  Copy,
  Share2
} from 'lucide-react';
import { audioSynth } from '../services/audioSynthesizer';

interface FestivalBadgeGeneratorProps {
  onBookOfficialPass?: () => void;
}

export const FestivalBadgeGenerator: React.FC<FestivalBadgeGeneratorProps> = ({ onBookOfficialPass }) => {
  const [attendeeName, setAttendeeName] = useState('Sourav Mukherjee');
  const [role, setRole] = useState<'All-Access Patron' | 'Student Artist' | 'Press & Curator' | 'Day Festival Pass'>('All-Access Patron');
  const [hologramStyle, setHologramStyle] = useState<'madder-gold' | 'cyber-moss' | 'terracotta-noir'>('madder-gold');
  const [badgeId, setBadgeId] = useState('ABH-2026-VIP-8941');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyPassId = () => {
    audioSynth.playChime();
    navigator.clipboard.writeText(badgeId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    audioSynth.playChime();
    window.print();
  };

  return (
    <section id="badge-maker-section" className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#5C1D24]/20 pb-6 mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-sans text-[#8A8E3E] uppercase tracking-[0.25em] font-bold mb-2">
            <IdCard className="w-3.5 h-3.5" />
            <span>Interactive Pass Studio</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#5C1D24] tracking-tight">
            Personalized VIP Festival Pass
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6B5558] mt-1">
            Generate and customize your personalized holographic attendee badge with QR check-in & stage access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF0E4] hover:bg-[#F2E7D5] text-[#5C1D24] border border-[#5C1D24]/30 rounded-full font-sans text-xs font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#8A8E3E]" />
            <span>Print Badge</span>
          </button>
        </div>
      </div>

      {/* 2-Column Interactive Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Customizer Controls */}
        <div className="lg:col-span-6 bg-[#FAF0E4] border border-[#5C1D24]/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="font-serif-display text-2xl font-bold text-[#5C1D24] mb-1">
              Customize Your Festival Credential
            </h3>
            <p className="font-sans text-xs text-[#6B5558]">
              Your customized badge grants access to specific stages and printmaking pavilions.
            </p>
          </div>

          {/* Attendee Name Input */}
          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5C1D24] block">
              ATTENDEE NAME / ARTIST HANDLE
            </label>
            <input
              type="text"
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value)}
              placeholder="e.g. Debjani Sen"
              className="w-full px-4 py-3 bg-[#FFF5E9] border border-[#5C1D24]/30 rounded-xl text-[#2A0E12] font-serif-display text-lg focus:outline-none focus:border-[#5C1D24] transition-colors"
            />
          </div>

          {/* Role / Tier Selector */}
          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5C1D24] block">
              FESTIVAL ACCESS TIER
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {(['All-Access Patron', 'Student Artist', 'Press & Curator', 'Day Festival Pass'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    audioSynth.playChime();
                    setRole(t);
                    setBadgeId(`ABH-2026-${t.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`);
                  }}
                  className={`p-3 text-left rounded-xl text-xs font-medium transition-all border ${
                    role === t
                      ? 'bg-[#5C1D24] text-[#FFF5E9] border-[#5C1D24] shadow-xs'
                      : 'bg-[#FFF5E9] text-[#5C1D24] border-[#5C1D24]/20 hover:bg-[#F8ECE0]'
                  }`}
                >
                  <div className="font-bold">{t}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">
                    {t === 'All-Access Patron' && 'All 4 Stages + Greenroom'}
                    {t === 'Student Artist' && 'Workshops + Student Pass'}
                    {t === 'Press & Curator' && 'Press Kit + Preview Hour'}
                    {t === 'Day Festival Pass' && 'Single Day Stages Entry'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Hologram Foil Color */}
          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5C1D24] block">
              HOLOGRAPHIC FOIL ACCENT
            </label>
            <div className="flex items-center gap-3">
              {[
                { id: 'madder-gold', label: 'Madder & Gold', bg: 'bg-[#5C1D24]' },
                { id: 'cyber-moss', label: 'Olive Moss', bg: 'bg-[#8A8E3E]' },
                { id: 'terracotta-noir', label: 'Terracotta Noir', bg: 'bg-[#C86D51]' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    audioSynth.playChime();
                    setHologramStyle(style.id as any);
                  }}
                  className={`px-3 py-2 rounded-full text-xs font-sans flex items-center gap-2 border transition-all ${
                    hologramStyle === style.id
                      ? 'border-[#5C1D24] bg-[#FFF5E9] font-bold text-[#5C1D24] shadow-xs'
                      : 'border-[#5C1D24]/20 bg-transparent text-[#6B5558]'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${style.bg}`} />
                  <span>{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Copy Pass ID */}
          <div className="pt-2 flex items-center justify-between border-t border-[#5C1D24]/15">
            <div className="font-mono text-xs text-[#6B5558]">
              PASS CODE: <span className="text-[#5C1D24] font-bold">{badgeId}</span>
            </div>
            <button
              onClick={handleCopyPassId}
              className="inline-flex items-center gap-1.5 text-xs text-[#8A8E3E] hover:text-[#5C1D24] font-sans font-medium transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
            </button>
          </div>

        </div>

        {/* Right: Live Holographic Render Preview */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          
          <motion.div
            key={`${role}-${hologramStyle}-${attendeeName}`}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-sm rounded-3xl p-6 sm:p-7 shadow-xl border-2 relative overflow-hidden text-[#FFF5E9] ${
              hologramStyle === 'madder-gold' 
                ? 'bg-gradient-to-br from-[#3D1217] via-[#5C1D24] to-[#1F080B] border-[#8A8E3E]/40' 
                : hologramStyle === 'cyber-moss'
                ? 'bg-gradient-to-br from-[#404314] via-[#64672B] to-[#1E2009] border-[#FFF5E9]/40'
                : 'bg-gradient-to-br from-[#4D1F16] via-[#7B3322] to-[#250F0A] border-[#FFF5E9]/40'
            }`}
          >
            {/* Lanyard Clip Hole at Top */}
            <div className="w-12 h-3.5 rounded-full bg-[#1A0608] mx-auto mb-5 border border-white/20" />

            {/* Top Pass Header */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
              <div>
                <div className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#E5A93C] font-bold">
                  ABOHOMAN FESTIVAL 2026
                </div>
                <div className="font-bengali text-xs text-white/90">
                  আবহমান শিল্প উৎসব
                </div>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-mono border border-white/20">
                OCT 24–26
              </div>
            </div>

            {/* Attendee Photo / Avatar Icon & Name */}
            <div className="my-4 text-center space-y-1">
              <div className="w-20 h-20 rounded-full mx-auto bg-white/10 border-2 border-[#E5A93C] flex items-center justify-center mb-3 shadow-inner">
                <span className="font-serif-display text-3xl font-bold text-white">
                  {attendeeName ? attendeeName.charAt(0).toUpperCase() : 'A'}
                </span>
              </div>
              <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {attendeeName || 'Guest Attendee'}
              </h4>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A93C] text-[#2A0E12] font-sans font-bold text-xs uppercase tracking-wider shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{role}</span>
              </div>
            </div>

            {/* Stages Access Matrix */}
            <div className="my-5 p-3 rounded-xl bg-black/30 border border-white/10 grid grid-cols-2 gap-2 text-[10px] font-sans">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#E5A93C]" />
                <span>Stage 1: Bodhi Press</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#E5A93C]" />
                <span>Stage 2: Kala Courtyard</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#E5A93C]" />
                <span>Stage 3: Nandan Cine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#E5A93C]" />
                <span>Stage 4: Victoria Baul</span>
              </div>
            </div>

            {/* Bottom QR & Security Watermark */}
            <div className="flex items-center justify-between border-t border-white/20 pt-3 text-[10px] font-mono text-white/70">
              <div>
                <div>PASS ID: {badgeId}</div>
                <div className="text-[8px] text-[#E5A93C] uppercase">80G TRUST COMPLIANT</div>
              </div>
              <div className="p-1.5 bg-white rounded-lg">
                <QrCode className="w-9 h-9 text-[#2A0E12]" />
              </div>
            </div>

          </motion.div>

          {/* Quick Notice */}
          <div className="text-center mt-4 text-xs font-sans text-[#6B5558]">
            ✦ Show this digital pass or QR at any festival gate for instant RFID wristband pairing.
          </div>

        </div>

      </div>

    </section>
  );
};
