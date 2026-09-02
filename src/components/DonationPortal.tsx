import React, { useState } from 'react';
import { DonationTier } from '../types';
import { INITIAL_DONATION_TIERS } from '../data/initialData';
import { audioSynth } from '../services/audioSynthesizer';
import { Flame, CheckCircle, FileText } from 'lucide-react';

interface DonationPortalProps {
  onInitiateDonation: (amount: number, tierId?: string, tierName?: string) => void;
}

export const DonationPortal: React.FC<DonationPortalProps> = ({ onInitiateDonation }) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-studio');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [is80GRequested, setIs80GRequested] = useState<boolean>(true);

  const tiers = INITIAL_DONATION_TIERS;

  const handleSelectTier = (tier: DonationTier) => {
    audioSynth.playChime();
    setSelectedTierId(tier.id);
    setCustomAmount('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalAmount = 2500;
    let tierName = 'Sanctum Studio Patron';

    if (customAmount && parseInt(customAmount, 10) > 0) {
      finalAmount = parseInt(customAmount, 10);
      tierName = `Custom Patronage Grant: ₹${finalAmount}`;
    } else {
      const tier = tiers.find(t => t.id === selectedTierId);
      if (tier) {
        finalAmount = tier.amount;
        tierName = tier.name;
      }
    }

    onInitiateDonation(finalAmount, selectedTierId, tierName);
  };

  return (
    <section id="donate-portal" className="py-20 md:py-28 px-4 sm:px-8 border-b border-[#211E1C]/15 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#8E3524] bg-[#F3EDE2] border border-[#211E1C]/15 rounded-xs">
            <Flame className="w-3.5 h-3.5 text-[#C0822B]" />
            <span>PRESERVE THE FIRE</span>
          </div>

          <h2 className="font-gambetta text-3xl sm:text-5xl font-bold tracking-tight text-[#211E1C]">
            Art Asks for Courage, Not Charity
          </h2>

          <p className="text-base sm:text-lg text-[#5E5752] leading-relaxed font-sans">
            Every workshop, residency seat, and open lab is made possible through direct cultural grants, public contributions, and visionary patrons. Help us maintain physical sanctums and fund independent productions in Kolkata.
          </p>
        </div>

        {/* 3 Grant Tiers Grid (Pure Grants - No Subscriptions) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {tiers.map((tier) => {
            const isSelected = selectedTierId === tier.id && !customAmount;
            return (
              <div
                key={tier.id}
                onClick={() => handleSelectTier(tier)}
                data-cursor="pointer"
                className={`rounded-xs p-7 sm:p-8 flex flex-col justify-between cursor-pointer transition-all relative ${
                  isSelected
                    ? 'border-[#8E3524] bg-[#FFFFFF] shadow-lg ring-1 ring-[#8E3524]'
                    : 'bg-[#FFFFFF] border border-[#211E1C]/15 hover:border-[#8E3524]/40'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8E3524] text-[#FAF7F2] text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-xs shadow-xs">
                    Recommended Fellowship Grant
                  </div>
                )}

                <div className="space-y-4">
                  <div className="border-b border-[#211E1C]/10 pb-3">
                    <h3 className="font-gambetta text-xl sm:text-2xl font-bold text-[#211E1C]">
                      {tier.name}
                    </h3>

                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8E3524] mt-2">
                      ₹{tier.amount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5E5752] leading-relaxed font-sans">
                    {tier.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {tier.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs text-[#211E1C]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#4A583A] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <div className={`w-full py-2 text-xs font-bold uppercase tracking-wider rounded-xs text-center border transition-colors ${
                    isSelected
                      ? 'bg-[#8E3524] text-[#FAF7F2] border-[#8E3524]'
                      : 'bg-[#FAF7F2] text-[#211E1C] border-[#211E1C]/20 hover:border-[#8E3524]'
                  }`}>
                    {isSelected ? 'Grant Tier Selected' : 'Select Grant Tier'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Grant Contribution & 80G Tax Exemption */}
        <div className="rounded-xs p-6 sm:p-8 bg-[#F3EDE2] border border-[#211E1C]/15 max-w-2xl mx-auto space-y-6">
          <div className="space-y-2 text-center">
            <h4 className="font-gambetta text-xl font-bold text-[#211E1C]">
              Or Contribute a Custom Sanctuary Grant
            </h4>
            <p className="text-xs text-[#5E5752]">
              All patron contributions are directly eligible for 80G tax exemptions under the Kshestra Cultural Trust charter.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl font-bold text-[#211E1C]">₹</span>
              <input
                type="number"
                min="100"
                step="50"
                placeholder="Enter custom grant amount in INR (e.g. 5000)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  if (e.target.value) setSelectedTierId('');
                }}
                className="w-full px-4 py-2.5 text-sm bg-[#FFFFFF] text-[#211E1C] border border-[#211E1C]/20 rounded-xs focus:outline-none focus:border-[#8E3524]"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#211E1C]">
                <input
                  type="checkbox"
                  checked={is80GRequested}
                  onChange={(e) => setIs80GRequested(e.target.checked)}
                  className="rounded-xs accent-[#8E3524]"
                />
                <FileText className="w-3.5 h-3.5 text-[#4A583A]" />
                <span>Issue Section 80G Tax Exemption Certificate</span>
              </label>
            </div>

            <button
              type="submit"
              data-cursor="pointer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xs bg-[#8E3524] hover:bg-[#662215] text-[#FAF7F2] border border-[#211E1C]/20 shadow-md transition-all hover:-translate-y-0.5"
            >
              <Flame className="w-4 h-4 text-[#C0822B]" />
              <span>Support the Foundation / Make a Grant Contribution</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
