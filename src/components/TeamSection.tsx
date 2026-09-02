import React, { useState, useEffect } from 'react';
import { TeamMember } from '../types';
import { StorageService } from '../services/storage';
import { Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { KshestraLogo } from './KshestraLogo';

export const TeamSection: React.FC = () => {
  const [guardians, setGuardians] = useState<TeamMember[]>([]);

  useEffect(() => {
    setGuardians(StorageService.getGuardians());
  }, []);

  return (
    <section id="trustees-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#211E1C] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8E3524] font-bold">
              <Shield className="w-3.5 h-3.5 text-[#C0822B]" />
              <span>THE PILLARS</span>
            </div>
            <h2 className="font-gambetta text-4xl sm:text-6xl font-bold tracking-tight text-[#211E1C]">
              Guardians of the Sanctuary
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#5E5752] leading-relaxed">
              The steering committee and working artists stewarding Kshestra's non-profit cultural mission.
            </p>
          </div>
        </div>

        {/* Pillars / Guardians Grid with Stock Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {guardians.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-[#FFFFFF] border border-[#211E1C]/15 rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#8E3524]/60 hover:shadow-md transition-all group"
            >
              <div>
                {/* Guardian Portrait Photo */}
                <div className="relative aspect-4/5 w-full bg-[#211E1C] overflow-hidden">
                  <img
                    src={member.portrait || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80`}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211E1C]/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-[#211E1C]/20 text-[10px] font-mono font-bold text-[#8E3524]">
                    0{idx + 1}
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-5 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#8E3524] font-bold">
                    {member.role}
                  </div>
                  <h3 className="font-gambetta text-xl font-bold text-[#211E1C] group-hover:text-[#8E3524] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#5E5752] font-sans leading-relaxed pt-1 line-clamp-4">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Quote / Medium Footer */}
              {member.quote && (
                <div className="p-4 pt-0">
                  <div className="p-3 bg-[#FAF7F2] border-t border-[#211E1C]/10 text-[11px] font-serif italic text-[#211E1C]/80 leading-relaxed rounded-xs">
                    "{member.quote}"
                  </div>
                </div>
              )}
            </motion.div>
          ))}
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
