import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onOpenBuildModal: (plan?: 'monthly' | 'yearly') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBuildModal }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-20 sm:py-28 relative border-t border-white/[0.06] bg-[#07080f]">
      {/* Glow highlight behind pricing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-700/10 via-purple-700/15 to-indigo-700/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-3">
            <span>Simple, Fair Pricing</span>
            <span>·</span>
            <span>No Hidden Surcharges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            World-class web design at small-business pricing.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Never pay hefty agency retainer fees again. Both plans include full custom design, high-speed hosting, and continuous website maintenance.
          </p>

          {/* Interactive Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                billingPeriod === 'yearly'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                Save 17% (2 Mo Free)
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Monthly Plan */}
          <div className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
            billingPeriod === 'monthly'
              ? 'bg-gradient-to-b from-[#111322] to-[#0c0e17] border-2 border-purple-500/50 shadow-2xl shadow-purple-950/40'
              : 'bg-[#0b0d18] border border-white/[0.08] opacity-90'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Monthly Flexibility</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Perfect for starting fast with zero long-term commitment.</p>
                </div>
                {billingPeriod === 'monthly' && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30">
                    Active View
                  </span>
                )}
              </div>

              {/* Price display */}
              <div className="my-6 pb-6 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                    ₹699
                  </span>
                  <span className="text-slate-400 font-medium text-sm">/ month</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Website maintenance & updates included</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3.5 mb-8">
                {[
                  'Custom modern responsive website (mobile, tablet & desktop)',
                  'Continuous website maintenance & unlimited text/image updates',
                  'High-speed cloud hosting with 99.9% uptime SLA',
                  'Free SSL security certificate included',
                  'Frictionless WhatsApp lead capture & click-to-call buttons',
                  'Google Maps integration & basic search meta setup',
                  '48–72 hour initial staging preview delivery',
                  'Cancel or pause anytime with zero penalty'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => onOpenBuildModal('monthly')}
                className="w-full py-4 px-6 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Build My Website (₹699/mo)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2.5">
                Zero upfront payment required to submit your brief.
              </p>
            </div>
          </div>

          {/* Annual Plan */}
          <div className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
            billingPeriod === 'yearly'
              ? 'bg-gradient-to-b from-[#141228] to-[#0c0e17] border-2 border-purple-500 shadow-2xl shadow-purple-950/50'
              : 'bg-[#0b0d18] border border-white/[0.08] opacity-90'
          }`}>
            <div className="absolute -top-3.5 right-8 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
              Best Value · 2 Months Free
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Annual Growth Plan</h3>
                  <p className="text-xs text-slate-400 mt-0.5">The complete hassle-free package for serious local businesses.</p>
                </div>
              </div>

              {/* Price display */}
              <div className="my-6 pb-6 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                    ₹6,999
                  </span>
                  <span className="text-slate-400 font-medium text-sm">/ year</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Full year maintenance included (Equivalent to ₹583/mo)</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3.5 mb-8">
                {[
                  'Everything in the Monthly Plan, plus:',
                  'Free custom domain registration / configuration assistance (.com or .in)',
                  'Priority turnarounds for revisions (within 24 hours)',
                  'Priority ongoing content & seasonal promo updates',
                  'Enhanced Local SEO schema markup for Google Maps prominence',
                  'Dedicated WhatsApp support channel for your team',
                  'Full year of enterprise cloud hosting & daily automated backups',
                  'Save ₹1,389 compared to monthly billing'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span className={idx === 0 ? 'font-semibold text-purple-300' : ''}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => onOpenBuildModal('yearly')}
                className="w-full py-4 px-6 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:brightness-110 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Build My Website (₹6,999/yr)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2.5">
                Review your live staging link first before starting annual billing.
              </p>
            </div>
          </div>

        </div>

        {/* Maintenance Guarantee Note */}
        <div className="mt-12 max-w-3xl mx-auto rounded-2xl bg-white/[0.02] border border-white/10 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">What does "Website Maintenance Included" mean?</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              When your business hours change, menu prices adjust, you introduce a new service, or you want to swap out hero photos, you don't need to hire a developer. Just message us on WhatsApp with the text or photos, and we publish the update promptly!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
