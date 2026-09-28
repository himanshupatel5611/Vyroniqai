import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Clock, ShieldCheck, Zap } from 'lucide-react';
import { HERO_SHOWCASE_IMAGE } from '../data/mockData.ts';

interface HeroProps {
  onOpenBuildModal: () => void;
  onExplorePortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBuildModal, onExplorePortfolio }) => {
  return (
    <section id="home" className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden subtle-grid">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-blue-700/15 via-indigo-600/10 to-purple-600/20 blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top editorial kicker */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-purple-500/30 backdrop-blur-md shadow-inner text-xs sm:text-sm text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium text-slate-200">The Modern Digital Growth Partner</span>
            <span className="text-slate-600">/</span>
            <span className="text-purple-300 font-semibold">Maintenance Included</span>
          </div>
        </div>

        {/* Primary Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.12]">
            Affordable Professional Websites for Small Businesses.
          </h1>
          
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            VYRONIQ.AI crafts lightning-fast, high-converting websites engineered to bring local customers through your door. Starting at just <span className="text-white font-semibold underline decoration-purple-500 decoration-2 underline-offset-4">₹699/month</span> with all maintenance included.
          </p>

          {/* Primary Action Row */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBuildModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-xl shadow-indigo-950/60 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 border border-blue-400/40 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Build My Website</span>
              <ArrowRight className="w-4 h-4 text-white/90" />
            </button>

            <button
              onClick={onExplorePortfolio}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
            >
              <span>View Client Work</span>
            </button>
          </div>

          {/* Proof / Value guarantees row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>48–72 Hour Delivery</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Zero Upfront Risk</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Unlimited Maintenance</span>
            </span>
          </div>
        </div>

        {/* Hero Visual Mockup Carrier */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto relative">
          <div className="relative rounded-2xl p-1 sm:p-2 bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent border border-white/10 shadow-2xl shadow-purple-950/50">
            
            {/* Top metallic bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b0d18] rounded-t-xl border-b border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-md border border-white/[0.04]">
                <span className="text-blue-400">https://</span>yourbusiness.vyroniq.ai
              </div>
              <div className="text-[10px] text-slate-500 font-mono hidden sm:block">
                Ultra-Fast Responsive Canvas
              </div>
            </div>

            {/* Showcase Image with Fallback Container */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-b-xl bg-[#080912]">
              <img
                src={HERO_SHOWCASE_IMAGE}
                alt="VYRONIQ.AI responsive multi-screen website showcase"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  // Fallback container if image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 bg-[#090b14] flex-col items-center justify-center p-8 text-center">
                <Sparkles className="w-12 h-12 text-purple-400 mb-3" />
                <h3 className="text-lg font-bold text-white">VYRONIQ.AI Interactive Studio</h3>
                <p className="text-xs text-slate-400 max-w-md mt-1">
                  High-speed, responsive, dark futuristic web architectures tailored for cafes, clinics, retail shops, and professional firms.
                </p>
              </div>

              {/* Metallic corner subtle glass highlights */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#06070b] via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating feature markers */}
            <div className="absolute -bottom-5 left-4 right-4 sm:left-8 sm:right-8 flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-[#0f1120]/95 backdrop-blur-xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">100% Mobile Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">Continuous Updates Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">WhatsApp Lead Automation</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
