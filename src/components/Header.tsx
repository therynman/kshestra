import React, { useState, useEffect } from 'react';
import { UserMember } from '../types';
import { StorageService } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { 
  Flame, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  Volume2, 
  VolumeX,
  Compass,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { KshestraLogo } from './KshestraLogo';

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
  onOpenAdmin: () => void;
  onOpenDonate: () => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onOpenDashboard,
  onOpenAdmin,
  onOpenDonate,
  onScrollToSection
}) => {
  const [currentUser, setCurrentUser] = useState<UserMember | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    setCurrentUser(StorageService.getCurrentUser());
    const handleAuthChange = (e: any) => {
      setCurrentUser(e.detail);
    };
    window.addEventListener('kshestra_auth_changed', handleAuthChange);
    return () => window.removeEventListener('kshestra_auth_changed', handleAuthChange);
  }, []);

  const handleNavTo = (sectionId: string) => {
    audioSynth.playChime();
    setMobileMenuOpen(false);
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleSound = () => {
    if (isPlayingAudio) {
      audioSynth.stop();
      setIsPlayingAudio(false);
    } else {
      audioSynth.start('bhairav');
      audioSynth.playChime();
      setIsPlayingAudio(true);
    }
  };

  const navLinks = [
    { id: 'gallery-section', label: 'Living Archive', bengali: 'সংগ্রহ' },
    { id: 'events-section', label: 'Gatherings', bengali: 'সম্মেলন' },
    { id: 'manifesto-section', label: 'Manifesto', bengali: 'ইশতেহার' },
    { id: 'trustees-section', label: 'Guardians', bengali: 'অভিভাবক' },
    { id: 'gazette-section', label: 'Dispatches', bengali: 'পত্রিকা' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#211E1C]/15 shadow-xs">
      
      {/* 1. Subtle Cultural Trust Top Announcement Strip */}
      <div className="border-b border-[#211E1C]/10 py-1.5 px-4 sm:px-8 text-[11px] font-sans flex flex-wrap items-center justify-between gap-2 text-[#5E5752] bg-[#F3EDE2]/70">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wider text-[#8E3524] uppercase text-[10px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E3524] animate-pulse"></span>
            <span>EST. 2026 · NON-PROFIT CULTURAL TRUST</span>
          </span>
          <span className="text-[#4A583A] hidden sm:inline">✦</span>
          <span className="tracking-wide hidden sm:inline">KOLKATA & MUMBAI SANCTUMS</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Ambient Acoustic Soundscape Quick Toggle */}
          <button
            onClick={toggleSound}
            data-cursor="pointer"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] uppercase tracking-wider rounded-sm bg-[#FAF7F2] hover:bg-[#8E3524]/10 text-[#211E1C] border border-[#211E1C]/20 transition-colors"
            title="Toggle meditative acoustic drone"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3 h-3 text-[#8E3524] animate-pulse" />
                <span className="font-mono">Drone: Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-[#5E5752]" />
                <span className="font-mono">Sonic Sanctum</span>
              </>
            )}
          </button>

          {/* Admin Switcher for Trustees */}
          <button
            onClick={onOpenAdmin}
            data-cursor="pointer"
            className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-sm text-[#5E5752] hover:text-[#8E3524] transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-[#4A583A]" />
            <span className="font-mono">Trustee Desk</span>
          </button>
        </div>
      </div>

      {/* 2. Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand with Official Kshestra Pegasus / Bankura Monogram Logo */}
        <button
          onClick={() => {
            audioSynth.playChime();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group flex items-center gap-3.5"
          data-cursor="pointer"
        >
          <div className="w-10 h-10 rounded-sm bg-[#3E1214] border border-[#C98E3A]/40 flex items-center justify-center p-1.5 shadow-xs group-hover:bg-[#5C1D24] transition-all">
            <KshestraLogo variant="white" className="w-full h-full text-[#FAF7F2]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#211E1C] group-hover:text-[#8E3524] transition-colors">
                Kshestra <span className="font-bengali text-lg font-normal text-[#8E3524]">(ক্ষেত্র)</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-sans text-[#5E5752] tracking-wide">
              The Soul Has a Territory
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavTo(item.id)}
              data-cursor="pointer"
              className="group relative py-1 text-[#211E1C] hover:text-[#8E3524] transition-colors tracking-wide"
            >
              <span>{item.label}</span>
              <span className="ml-1 text-[11px] font-bengali text-[#5E5752] opacity-70 group-hover:text-[#8E3524]">
                {item.bengali}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8E3524] transition-all duration-200 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Actions: Support the Flame & Enter the Sanctuary */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Action 1: Support the Flame (Donate / Patronage) */}
          <button
            onClick={() => {
              audioSynth.playChime();
              onOpenDonate();
            }}
            data-cursor="pointer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] border border-[#211E1C]/30 shadow-xs transition-all duration-200 hover:-translate-y-0.5"
          >
            <Flame className="w-3.5 h-3.5 text-[#C98E3A]" />
            <span>Support the Flame</span>
          </button>

          {/* Action 2: Enter the Sanctuary */}
          <button
            onClick={() => {
              audioSynth.playChime();
              if (currentUser) {
                onOpenDashboard();
              } else {
                onOpenAuth();
              }
            }}
            data-cursor="pointer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wide rounded-sm bg-[#F3EDE2] hover:bg-[#EBE2D4] text-[#211E1C] border border-[#211E1C]/20 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-[#4A583A]" />
            <span>{currentUser ? currentUser.name.split(' ')[0] : 'Enter the Sanctuary'}</span>
          </button>

        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => {
              audioSynth.playChime();
              onOpenDonate();
            }}
            className="px-3 py-1.5 text-[11px] font-bold uppercase rounded-sm bg-[#8E3524] text-[#FAF7F2] sm:hidden"
          >
            Support
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-cursor="pointer"
            className="p-2 rounded-sm border border-[#211E1C]/20 text-[#211E1C] hover:bg-[#FAF7F2]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#211E1C]/20 px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavTo(item.id)}
                className="text-left py-2 px-3 rounded-sm hover:bg-[#F3EDE2] text-[#211E1C] text-sm font-medium flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#8E3524] font-bengali">{item.bengali}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#211E1C]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="w-full py-2.5 text-center text-xs font-bold uppercase rounded-sm bg-[#8E3524] text-[#FAF7F2] flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-[#C98E3A]" />
              <span>Support the Flame (80G Grants)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentUser) onOpenDashboard();
                else onOpenAuth();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-sm bg-[#F3EDE2] text-[#211E1C] border border-[#211E1C]/20"
            >
              {currentUser ? `Resident Vault (${currentUser.name})` : 'Enter the Sanctuary'}
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
