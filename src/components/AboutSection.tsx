import React from 'react';
import { Sparkles, Shield, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenBuildModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBuildModal }) => {
  return (
    <section id="about" className="py-20 sm:py-28 relative border-t border-white/[0.06] bg-[#06070c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-3">
            <span>Our Philosophy</span>
            <span>·</span>
            <span>Why VYRONIQ.AI Exists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Built for small businesses that refuse to compromise on quality.
          </h2>
        </div>

        {/* 2-Column Story & Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Story Narrative */}
          <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              For years, small business owners have faced an unfair choice: pay an agency <strong className="text-white">₹40,000 to ₹1,00,000 upfront</strong> (and get left with a site that becomes obsolete within months), or spend countless weekends fighting frustrating DIY builders like WordPress or Wix that end up looking broken on smartphones.
            </p>
            <p>
              We established <strong className="text-white">VYRONIQ.AI</strong> to erase this friction. By combining modern design architectures, automated deployment pipelines, and a dedicated team of engineers, we provide custom, high-converting digital storefronts at an honest price: <strong className="text-purple-300">₹699 per month</strong> with maintenance included.
            </p>
            <p>
              We don't abandon you after launch. Whenever your business grows, adds a new dish, changes operating hours, or needs seasonal promotional banners, our team executes the update for you over WhatsApp.
            </p>

            {/* Quick Guarantees */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero technical knowledge required</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Working prototype in 48 hours</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated WhatsApp support</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cancel or pause subscription anytime</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBuildModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>Build My Website Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contrast Comparison Grid */}
          <div className="rounded-2xl bg-[#0b0d18] border border-white/10 p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>How We Compare</span>
            </h3>

            <div className="space-y-4">
              
              {/* Traditional Agency */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-semibold text-rose-400 mb-1">
                  <span>Traditional Design Agencies</span>
                  <span>₹40,000+ Upfront</span>
                </div>
                <p className="text-xs text-slate-400">
                  Excessive discovery meetings, weeks of waiting, and expensive hourly retainers just to change a phone number or menu item.
                </p>
              </div>

              {/* DIY Builders */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-1">
                  <span>DIY Website Builders</span>
                  <span>₹1,200+/mo + 40 hrs of your time</span>
                </div>
                <p className="text-xs text-slate-400">
                  Hidden plugin fees, clunky mobile responsiveness, slow loading speeds, and you have to do all the technical work yourself.
                </p>
              </div>

              {/* VYRONIQ.AI */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-[#0e101f] border border-purple-500/50 shadow-md">
                <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                  <span className="flex items-center gap-1.5 text-purple-300">
                    <Rocket className="w-4 h-4 text-purple-400" />
                    VYRONIQ.AI
                  </span>
                  <span className="text-emerald-300 font-mono">₹699/mo (All-Inclusive)</span>
                </div>
                <p className="text-xs text-slate-200">
                  Bespoke modern design, lightning-fast cloud hosting, Google SEO, WhatsApp leads, and unlimited ongoing maintenance handled by pros.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
