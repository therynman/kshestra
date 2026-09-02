import React, { useState } from 'react';
import { StorageService } from '../services/storage';
import { audioSynth } from '../services/audioSynthesizer';
import { Mail, ArrowRight, CheckCircle2, Sparkles, Shield, Send } from 'lucide-react';
import { motion } from 'motion/react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const disciplines = [
    'Cinema',
    'Fine Arts',
    'Theatre',
    'Music',
    'Literature',
    'Patron'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!discipline) {
      setErrorMsg('Please select your primary discipline.');
      return;
    }

    setErrorMsg('');
    StorageService.addNewsletterSubscriber(email, discipline);
    audioSynth.playChime();
    setIsSubscribed(true);
  };

  return (
    <section id="newsletter-section" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#F6F0E6]">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8E3524] bg-[#FAF7F2] border border-[#211E1C]/15 rounded-sm">
            <Mail className="w-3.5 h-3.5" />
            <span>NEVER MISS A CONFLUENCE</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#211E1C]">
            Enter the Inner Circle of Independent Art
          </h2>

          <p className="text-base sm:text-lg text-[#5E5752] leading-relaxed font-sans">
            Bi-weekly field notes on craft and survival, early ticket reservations, and unlisted casting calls & residency grants delivered straight to your inbox. No promotional noise. No algorithms. Just pure dispatches.
          </p>

          <div className="p-3.5 bg-[#FAF7F2] border border-[#211E1C]/15 rounded-xs text-xs font-mono text-[#8E3524] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C0822B]" />
            <span>Instant Gift: Subscribers receive our curated PDF: "The Independent Creator’s Resource & Grant Directory (Kolkata Edition)"</span>
          </div>
        </div>

        {/* Newsletter Signup Box */}
        <div className="sanctum-card rounded-sm p-6 sm:p-10 bg-[#FFFFFF] border border-[#211E1C]/20 shadow-md">
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#4A583A]/10 text-[#4A583A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#211E1C]">
                You are in the Circle.
              </h3>
              <p className="text-sm text-[#5E5752] max-w-md mx-auto">
                A welcome dispatch has been prepared for <strong className="text-[#211E1C]">{email}</strong>. Look forward to bi-weekly field notes on craft and survival.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#211E1C] block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address (e.g. artist@domain.com)"
                    className="w-full px-4 py-3 text-sm bg-[#FAF7F2] text-[#211E1C] border border-[#211E1C]/20 rounded-sm focus:outline-none focus:border-[#8E3524] transition-colors"
                  />
                </div>

                {/* Craft Dropdown Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#211E1C] block">
                    Primary Discipline
                  </label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#FAF7F2] text-[#211E1C] border border-[#211E1C]/20 rounded-sm focus:outline-none focus:border-[#8E3524] transition-colors"
                  >
                    <option value="">Select Primary Discipline</option>
                    {disciplines.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {errorMsg && (
                <p className="text-xs text-[#8E3524] font-medium">
                  {errorMsg}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                data-cursor="pointer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xs bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] border border-[#211E1C]/30 shadow-xs transition-all hover:-translate-y-0.5"
              >
                <span>Subscribe to Dispatches & Get Free Directory ⟶</span>
              </button>

              {/* Microcopy Reassurance */}
              <p className="text-center text-xs text-[#5E5752] font-mono pt-1">
                Free forever. Unsubscribe with one click. We respect your attention and never share your data.
              </p>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
