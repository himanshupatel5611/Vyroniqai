import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Shield, 
  ArrowRight, 
  LogIn, 
  LogOut, 
  MessageSquareHeart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { VYRONIQ_LOGO_IMAGE } from '../data/mockData.ts';

interface NavbarProps {
  onOpenBuildModal: () => void;
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBuildModal,
  onOpenAdmin,
  isAdminOpen
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, isAdmin, signInWithGoogle, logOut } = useAuth();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (isAdminOpen) {
      onOpenAdmin(); // return to main site
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#06070b]/85 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Official Brand Logo & Wordmark */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          className="group flex items-center gap-3 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-white/15 p-0.5 shadow-lg shadow-purple-950/40 group-hover:border-purple-500/50 transition-colors shrink-0">
            <img 
              src={VYRONIQ_LOGO_IMAGE} 
              alt="VYRONIQ.AI Logo" 
              className="w-full h-full object-cover rounded-[9px]"
              onError={(e) => {
                // Fallback to stylized 'V' if image fails
                const target = e.currentTarget;
                target.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="tracking-wider leading-none">
              VYRONIQ<span className="text-purple-400 font-light">.AI</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
              Web Studio · Sehore
            </span>
          </div>
        </a>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button 
            onClick={() => scrollToSection('home')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            Pricing
            <span className="text-[10px] text-purple-300 tracking-wider font-mono bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40">₹699/mo</span>
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Reviews</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Actions & Google Auth */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Admin button ONLY shown for vyroniqai640@gmail.com */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isAdminOpen
                  ? 'bg-purple-600/30 text-purple-300 border-purple-500'
                  : 'bg-purple-950/40 text-purple-300 border-purple-500/40 hover:bg-purple-900/50'
              }`}
              title="Admin Request Portal (Owner only)"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>{isAdminOpen ? 'Return to Site' : 'Admin Portal'}</span>
              <span className="text-[9px] bg-purple-500 text-white font-bold px-1.5 py-0.2 rounded">
                Owner
              </span>
            </button>
          )}

          {/* Google Auth Status / Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-xs text-slate-200 transition-all cursor-pointer"
                title={currentUser.email || 'User Account'}
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-6 h-6 rounded-full border border-purple-400/50"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline max-w-[90px] truncate text-xs font-medium">
                  {currentUser.displayName?.split(' ')[0] || 'Account'}
                </span>
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0e101f] border border-white/15 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-xs font-bold text-white truncate">{currentUser.displayName || 'Client'}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Admin Verified
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-purple-300 hover:text-white hover:bg-purple-950/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer mt-1"
                    >
                      <Shield className="w-3.5 h-3.5 text-purple-400" />
                      <span>Admin Request Portal</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      scrollToSection('testimonials');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquareHeart className="w-3.5 h-3.5 text-blue-400" />
                    <span>Client Reviews</span>
                  </button>

                  <div className="my-1 border-t border-white/10" />

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logOut().catch(() => {});
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signInWithGoogle().catch(() => {})}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all cursor-pointer"
              title="Sign in with Google"
            >
              <LogIn className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={onOpenBuildModal}
            className="relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-md shadow-indigo-950/50 hover:shadow-indigo-500/25 hover:brightness-110 active:scale-[0.98] border border-blue-400/30 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
            <span>Build My Website</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/80 hidden sm:inline" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-slate-300 hover:text-white rounded-lg border border-white/10 bg-white/[0.03]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#090b14]/98 px-4 pt-3 pb-6 space-y-3">
          <button 
            onClick={() => scrollToSection('home')} 
            className="block w-full text-left py-2 text-base text-slate-200 hover:text-white"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="block w-full text-left py-2 text-base text-slate-200 hover:text-white"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="flex items-center justify-between w-full py-2 text-base text-slate-200 hover:text-white"
          >
            <span>Pricing</span>
            <span className="text-xs text-purple-300 font-mono">₹699/mo</span>
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="block w-full text-left py-2 text-base text-slate-200 hover:text-white"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')} 
            className="flex items-center justify-between w-full py-2 text-base text-slate-200 hover:text-white"
          >
            <span>Client Reviews</span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              5.0 ★
            </span>
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="block w-full text-left py-2 text-base text-slate-200 hover:text-white"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="block w-full text-left py-2 text-base text-slate-200 hover:text-white"
          >
            Contact
          </button>
          
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signInWithGoogle().catch(() => {});
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-slate-200 bg-white/[0.04] border border-white/10 rounded-lg flex items-center justify-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5 text-purple-400" />
                <span>Sign in with Google</span>
              </button>
            ) : (
              <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] rounded-lg border border-white/10 text-xs">
                <span className="text-slate-300 truncate">{currentUser.email}</span>
                <button
                  onClick={() => logOut().catch(() => {})}
                  className="text-rose-400 font-medium pl-2"
                >
                  Sign Out
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBuildModal();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg shadow-md"
            >
              Build My Website Now
            </button>

            {/* Admin button ONLY shown for vyroniqai640@gmail.com */}
            {isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-purple-300 bg-purple-950/50 border border-purple-500/40 rounded-lg flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Request Portal</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
