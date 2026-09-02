import React, { useState, useEffect } from 'react';
import { TeamMember } from '../types';
import { StorageService } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { Shield, Sparkles, User, Award, Quote, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export const TeamSection: React.FC = () => {
  const [guardians, setGuardians] = useState<TeamMember[]>([]);

  useEffect(() => {
    setGuardians(StorageService.getGuardians());
  }, []);

  return (
    <section id="trustees-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#F6F0E6]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8E3524] bg-[#FAF7F2] border border-[#211E1C]/15 rounded-sm">
            <Shield className="w-3.5 h-3.5" />
            <span>THE PILLARS</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#211E1C]">
            Guardians of the Sanctuary
          </h2>

          <p className="text-base sm:text-lg text-[#5E5752] leading-relaxed font-sans">
            The steering committee and dedicated artists stewarding Kshestra's non-profit cultural mission.
          </p>
        </div>

        {/* 7 Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {guardians.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="sanctum-card rounded-sm p-6 sm:p-7 bg-[#FFFFFF] border border-[#211E1C]/15 hover:border-[#8E3524]/40 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header: Name and Title */}
                <div className="border-b border-[#211E1C]/10 pb-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif-display text-2xl font-bold text-[#211E1C] group-hover:text-[#8E3524] transition-colors">
                      {member.name}
                    </h3>
                    {member.bengaliName && (
                      <span className="font-bengali text-sm text-[#8E3524]">
                        {member.bengaliName}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8E3524] mt-1">
                    {member.role}
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs sm:text-sm text-[#5E5752] leading-relaxed font-sans">
                  {member.bio}
                </p>
              </div>

              {/* Tag note / discipline */}
              <div className="mt-6 pt-3 border-t border-[#211E1C]/10 flex items-center justify-between text-[11px] text-[#4A583A] font-mono">
                <span>Trustee Guardian</span>
                <span className="text-[#8E3524]">EST. 2026</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
