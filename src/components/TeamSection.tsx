import React, { useState, useEffect } from 'react';
import { TeamMember } from '../types';
import { StorageService } from '../services/storage';
import { Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { KshestraLogo } from './KshestraLogo';

const FALLBACK_AVATARS: Record<string, string> = {
  tamohan: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  oindrila: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  nayanika: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  shubhadeep: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  vira: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  aryan: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  sayan: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80'
};

const getMemberImage = (member: TeamMember) => {
  const nameLower = member.name.toLowerCase();
  if (nameLower.includes('tamohan')) return '/assets/Images/tamohan.png';
  if (nameLower.includes('oindrila')) return '/assets/Images/oindrila.png';
  if (nameLower.includes('nayanika')) return '/assets/Images/nayanika.png';
  if (nameLower.includes('shubhadeep')) return '/assets/Images/shubhadeep.png';
  if (nameLower.includes('vireshwar') || nameLower.includes('vira')) return '/assets/Images/vira.png';
  if (nameLower.includes('aryan')) return '/assets/Images/Aryan.png';
  if (nameLower.includes('sayan')) return '/assets/Images/Sayan.png';
  return member.portrait || '/assets/Kshestra Logo PNG.png';
};

const getMemberFallback = (member: TeamMember) => {
  const nameLower = member.name.toLowerCase();
  for (const [k, v] of Object.entries(FALLBACK_AVATARS)) {
    if (nameLower.includes(k)) return v;
  }
  return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
};

export const TeamSection: React.FC = () => {
  const [guardians, setGuardians] = useState<TeamMember[]>([]);

  useEffect(() => {
    setGuardians(StorageService.getGuardians());
  }, []);

  return (
    <section id="trustees-section" className="py-16 md:py-24 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#211E1C] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold">
              <Shield className="w-3.5 h-3.5 text-[#C0822B]" />
              <span>THE PILLARS</span>
            </div>
            <h2 className="font-gambetta text-3xl sm:text-5xl font-bold tracking-tight text-[#211E1C]">
              Guardians of the Sanctuary
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#5E5752] leading-relaxed">
              The steering committee and working artists stewarding Kshestra's non-profit cultural mission.
            </p>
          </div>

          <div className="text-xs font-mono text-[#5E5752]">
            <span className="text-[#8E3524] font-bold uppercase">7 Pillars</span> · Kolkata Sanctum
          </div>
        </div>

        {/* Compact, Smaller Profile Cards Grid (Image, Name, Position & Quote) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {guardians.map((member, idx) => {
            const imgSrc = getMemberImage(member);
            const fallbackSrc = getMemberFallback(member);

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="bg-[#FFFFFF] border border-[#211E1C]/15 rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#8E3524]/60 hover:shadow-md transition-all group"
              >
                <div>
                  {/* Smaller, Compact Portrait Photo */}
                  <div className="relative h-44 sm:h-48 w-full bg-[#211E1C] overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={member.name}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = 'true';
                          target.src = fallbackSrc;
                        }
                      }}
                      className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211E1C]/70 via-transparent to-transparent opacity-60" />
                    
                    {/* Index Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-[#FAF7F2]/95 backdrop-blur-xs px-1.5 py-0.5 rounded-xs border border-[#211E1C]/20 text-[9px] font-mono font-bold text-[#8E3524]">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Compact Info Content: Name & Position */}
                  <div className="p-4 pb-2 space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#8E3524] font-bold line-clamp-1">
                      {member.role}
                    </div>
                    <h3 className="font-gambetta text-lg sm:text-xl font-bold text-[#211E1C] group-hover:text-[#8E3524] transition-colors leading-snug">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Quote Footer (Bio removed to make profile compact) */}
                {member.quote && (
                  <div className="p-4 pt-1">
                    <div className="p-2.5 bg-[#FAF7F2] border-t border-[#211E1C]/10 text-[11px] font-serif italic text-[#211E1C]/85 leading-snug rounded-xs">
                      "{member.quote}"
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footnote Docket */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5E5752] pt-4 border-t border-[#211E1C]/15">
          <div className="flex items-center gap-2">
            <KshestraLogo preferAssetImage className="w-5 h-5" />
            <span>Non-Profit Cultural Trust Charter · Kolkata Sanctum</span>
          </div>
          <span className="text-[#8E3524] font-bold">100% INDEPENDENT GOVERNANCE</span>
        </div>

      </div>
    </section>
  );
};
