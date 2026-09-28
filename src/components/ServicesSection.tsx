import React from 'react';
import { 
  Layout, 
  ShieldCheck, 
  Server, 
  MessageSquare, 
  Search, 
  ShoppingBag,
  ArrowRight,
  Check
} from 'lucide-react';
import { SERVICES_LIST } from '../data/mockData.ts';

interface ServicesSectionProps {
  onOpenBuildModal: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-5 h-5 text-blue-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-purple-400" />,
  Server: <Server className="w-5 h-5 text-cyan-400" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-emerald-400" />,
  Search: <Search className="w-5 h-5 text-indigo-400" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5 text-fuchsia-400" />
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBuildModal }) => {
  return (
    <section id="services" className="py-20 sm:py-28 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-3">
            <span>Core Capabilities</span>
            <span>·</span>
            <span>End-to-End Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Everything your business needs to dominate online.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            We don't just dump a generic template on you and disappear. Every VYRONIQ.AI website is a fully managed digital asset with custom design, hosting, security, and continuous updates.
          </p>
        </div>

        {/* Asymmetric Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service, index) => {
            const isFeatured = index === 1; // Maintenance included card
            return (
              <div 
                key={service.number}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured 
                    ? 'bg-gradient-to-b from-[#141226] to-[#0c0e17] border border-purple-500/40 shadow-xl shadow-purple-950/30' 
                    : 'bg-[#0b0d18] border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-[11px] font-semibold text-white tracking-wide shadow-md">
                    Always Included In Your Plan
                  </div>
                )}

                <div>
                  {/* Service Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-bold text-slate-500">
                      {service.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      {iconMap[service.iconName] || <Layout className="w-5 h-5 text-blue-400" />}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Concrete Deliverables List */}
                <div className="pt-6 border-t border-white/[0.06] space-y-2.5">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    What You Get:
                  </div>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mid-page Action Callout */}
        <div className="mt-14 sm:mt-20 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-[#0c0e17] border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
              Ready to launch your custom business website?
            </h4>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Tell us your requirements in 3 minutes. Zero upfront fee. Get a live interactive draft delivered in 48 hours.
            </p>
          </div>
          <button
            onClick={onOpenBuildModal}
            className="w-full md:w-auto px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Build My Website</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};
