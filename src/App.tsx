import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { PortfolioSection } from './components/PortfolioSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { BuildWebsiteModal } from './components/BuildWebsiteModal.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { WebsiteRequest } from './types/index.ts';
import { storageService } from './services/storage.ts';
import { firestoreService } from './services/firestoreService.ts';
import { useAuth } from './contexts/AuthContext.tsx';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function App() {
  const { currentUser, isAdmin } = useAuth();
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<'monthly' | 'yearly'>('monthly');
  const [prefilledStyle, setPrefilledStyle] = useState<string | undefined>(undefined);
  const [prefilledCategory, setPrefilledCategory] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize requests from Firestore with local fallback
  useEffect(() => {
    let mounted = true;
    firestoreService.getWebsiteRequests(isAdmin, currentUser?.uid).then((data) => {
      if (mounted) {
        setRequests(data);
      }
    }).catch(() => {
      if (mounted) {
        setRequests(storageService.getRequests());
      }
    });

    return () => {
      mounted = false;
    };
  }, [isAdmin, currentUser]);

  const handleOpenBuildModal = (plan?: 'monthly' | 'yearly') => {
    if (plan) setSelectedPlanForModal(plan);
    setPrefilledStyle(undefined);
    setPrefilledCategory(undefined);
    setIsBuildModalOpen(true);
  };

  const handleOpenBuildWithStyle = (styleName: string, category: string) => {
    setPrefilledStyle(styleName);
    setPrefilledCategory(category);
    setIsBuildModalOpen(true);
  };

  const handleRequestCreated = (newReq: WebsiteRequest) => {
    setRequests(prev => [newReq, ...prev]);
    showToast(`Request ${newReq.id} recorded! Saved to Firestore & Admin portal.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#06070b] text-slate-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-white">
      
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm p-4 rounded-xl bg-[#0f1222] border border-purple-500/40 shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-200 font-medium">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Main View or Admin Portal */}
      {isAdminOpen ? (
        <AdminDashboard
          requests={requests}
          onUpdateRequest={(updated) => setRequests(updated)}
          onReturnToSite={() => setIsAdminOpen(false)}
          onOpenBuildModal={() => {
            setIsBuildModalOpen(true);
          }}
        />
      ) : (
        <>
          {/* Main Website Header */}
          <Navbar
            onOpenBuildModal={() => handleOpenBuildModal()}
            onOpenAdmin={() => setIsAdminOpen(true)}
            isAdminOpen={isAdminOpen}
          />

          <main className="flex-grow">
            {/* 1. Hero Section */}
            <Hero
              onOpenBuildModal={() => handleOpenBuildModal()}
              onExplorePortfolio={scrollToPortfolio}
            />

            {/* 2. Services Section */}
            <ServicesSection
              onOpenBuildModal={() => handleOpenBuildModal()}
            />

            {/* 3. Pricing Section */}
            <PricingSection
              onOpenBuildModal={(plan) => handleOpenBuildModal(plan)}
            />

            {/* 4. Portfolio Section */}
            <PortfolioSection
              onOpenBuildModalWithStyle={handleOpenBuildWithStyle}
            />

            {/* 5. Client Testimonials Section (Carousel & Grid with Firestore feedback) */}
            <TestimonialsSection
              onOpenBuildModal={() => handleOpenBuildModal()}
            />

            {/* 6. About Section */}
            <AboutSection
              onOpenBuildModal={() => handleOpenBuildModal()}
            />

            {/* 7. Contact & FAQ Section */}
            <ContactSection
              onOpenBuildModal={() => handleOpenBuildModal()}
            />
          </main>

          {/* Footer */}
          <Footer
            onOpenBuildModal={() => handleOpenBuildModal()}
            onOpenAdmin={() => setIsAdminOpen(true)}
            isAdminOpen={isAdminOpen}
          />

          {/* Floating WhatsApp Quick Action Button */}
          <aside
            aria-label="Direct Support Contacts"
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
          >
            <button
              onClick={() => handleOpenBuildModal()}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-purple-950/60 hover:brightness-110 active:scale-95 transition-all border border-blue-400/40 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Build My Website</span>
            </button>

            <a
              href="https://wa.me/919406756996?text=Hi%20VYRONIQ.AI%20Team%2C%20I%20would%20like%20to%20discuss%20building%20a%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all"
              title="Chat with us on WhatsApp (+91 94067 56996)"
            >
              <MessageSquare className="w-6 h-6 fill-current" />
            </a>
          </aside>
        </>
      )}

      {/* "Build My Website" Multi-Step Modal */}
      <BuildWebsiteModal
        isOpen={isBuildModalOpen}
        onClose={() => setIsBuildModalOpen(false)}
        initialPlan={selectedPlanForModal}
        initialStyle={prefilledStyle}
        initialCategory={prefilledCategory}
        onRequestCreated={handleRequestCreated}
        onNavigateToAdmin={() => {
          setIsAdminOpen(true);
        }}
      />

    </div>
  );
}
