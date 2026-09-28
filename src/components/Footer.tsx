import React from 'react';
import { Shield, Sparkles, MessageSquare, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { VYRONIQ_LOGO_IMAGE } from '../data/mockData.ts';

interface FooterProps {
  onOpenBuildModal: () => void;
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBuildModal,
  onOpenAdmin,
  isAdminOpen
}) => {
  const { isAdmin } = useAuth();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#05060a] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 font-display text-2xl font-extrabold text-white">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-black border border-white/15 p-0.5 shadow-md shrink-0">
                <img 
                  src={VYRONIQ_LOGO_IMAGE} 
                  alt="VYRONIQ.AI Official Logo" 
                  className="w-full h-full object-cover rounded-[8px]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span>VYRONIQ<span className="text-purple-400 font-light">.AI</span></span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              We design, build, host, and continuously maintain modern high-converting websites for small businesses at ₹699/month.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Sehore, Madhya Pradesh, India</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenBuildModal}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build My Website</span>
              </button>

              {/* Admin button ONLY shown for vyroniqai640@gmail.com */}
              {isAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="px-3 py-2 text-xs font-medium text-purple-300 hover:text-white bg-purple-500/10 border border-purple-500/30 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>{isAdminOpen ? 'Website View' : 'Admin Portal'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">Navigation</div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  Capabilities & Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Pricing Plans (₹699/mo)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('portfolio')} className="hover:text-white transition-colors cursor-pointer">
                  Live Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('testimonials')} className="hover:text-white transition-colors cursor-pointer">
                  Client Reviews
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Services Breakdown */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">Included With Every Site</div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>· Custom Responsive Design</li>
              <li>· Unlimited Content Maintenance</li>
              <li>· High-Speed Cloud Hosting</li>
              <li>· WhatsApp Lead Button</li>
              <li>· Google Maps & SEO Integration</li>
              <li>· SSL Encryption & Daily Backups</li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">Direct Contact</div>
            <div className="space-y-2.5 text-xs">
              <a 
                href="https://wa.me/919406756996" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+91 94067 56996 (WhatsApp)</span>
              </a>
              <a 
                href="tel:9406906918" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>+91 94069 06918 (Phone)</span>
              </a>
              <a 
                href="mailto:vyroniqai640@gmail.com" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">vyroniqai640@gmail.com</span>
              </a>
              <div className="pt-2 text-[11px] text-slate-500">
                HQ: Sehore, Madhya Pradesh, India
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} VYRONIQ.AI · Sehore, Madhya Pradesh, India. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors p-2 rounded-lg bg-white/[0.02] border border-white/5 cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
