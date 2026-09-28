import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/mockData.ts';
import { PortfolioItem } from '../types/index.ts';
import { ExternalLink, Check, Clock, Sparkles, X, Eye } from 'lucide-react';

interface PortfolioSectionProps {
  onOpenBuildModalWithStyle?: (styleName: string, category: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenBuildModalWithStyle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Dining & Hospitality', 'Healthcare & Wellness', 'Retail & Commerce', 'Professional Services'];

  const filteredItems = selectedCategory === 'All' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-28 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-3">
              <span>Selected Works</span>
              <span>·</span>
              <span>Built for Conversion</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
              Proven websites delivering real local business growth.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Explore how we transform local restaurants, clinics, retail storefronts, and advisory practices into digital powerhouses.
            </p>
          </div>

          {/* Category Filter Tabs (Interactive segmented control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group rounded-2xl bg-[#0b0d18] border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-purple-950/20"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#070810] border-b border-white/[0.06]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                
                {/* Fallback container */}
                <div className="hidden absolute inset-0 bg-[#0c0e18] flex items-center justify-center p-6 text-center">
                  <span className="text-sm font-semibold text-slate-300">{item.title}</span>
                </div>

                {/* Overlay hover trigger */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                  <span className="text-xs font-mono text-slate-300 bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10">
                    Turnaround: {item.turnaroundDays} Days
                  </span>
                  <button
                    onClick={() => setActiveItem(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-500 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Design</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="text-purple-400 font-medium">{item.category}</span>
                    <span className="font-mono text-slate-400">48h Delivery</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 mb-3">
                    {item.tagline}
                  </p>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-6">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveItem(item)}
                    className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenBuildModalWithStyle) {
                        onOpenBuildModalWithStyle(item.title, item.category);
                      }
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-white/[0.06] hover:bg-purple-600 rounded-lg border border-white/10 hover:border-purple-500 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-purple-300" />
                    <span>Build Similar Site</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for detailed showcase */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#0d0f1b] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/[0.05] border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{activeItem.category}</span>
                <h3 className="text-2xl font-bold text-white mt-1">{activeItem.title}</h3>
                <p className="text-sm text-slate-300">{activeItem.tagline}</p>
              </div>

              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 border border-white/10 bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-slate-300 mb-6">
                <p>{activeItem.description}</p>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Key Engineering Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeItem.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-white/[0.02] p-2 rounded border border-white/[0.06]">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Staging delivered in {activeItem.turnaroundDays} business days</span>
                </div>

                <button
                  onClick={() => {
                    const title = activeItem.title;
                    const cat = activeItem.category;
                    setActiveItem(null);
                    if (onOpenBuildModalWithStyle) {
                      onOpenBuildModalWithStyle(title, cat);
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg shadow-lg hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Build My Website Like This</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
