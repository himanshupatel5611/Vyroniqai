import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Grid3X3, 
  SlidersHorizontal, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  X, 
  Send,
  Building,
  TrendingUp,
  Clock,
  LogIn
} from 'lucide-react';
import { Testimonial } from '../types/index.ts';
import { firestoreService } from '../services/firestoreService.ts';
import { TESTIMONIALS_DATA } from '../data/mockData.ts';
import { useAuth } from '../contexts/AuthContext.tsx';

interface TestimonialsSectionProps {
  onOpenBuildModal: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenBuildModal }) => {
  const { currentUser, signInWithGoogle } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [layoutMode, setLayoutMode] = useState<'carousel' | 'grid'>('carousel');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Review submission modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    clientName: '',
    businessName: '',
    role: '',
    category: 'Dining & Hospitality',
    rating: 5,
    quote: '',
    plan: '₹699/month' as '₹699/month' | '₹6,999/year',
    turnaround: '48 Hours',
    metrics: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Load testimonials from Firestore
  useEffect(() => {
    let mounted = true;
    firestoreService.getTestimonials().then((data) => {
      if (mounted && data.length > 0) {
        setTestimonials(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Filtered testimonials
  const filteredTestimonials = selectedCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Carousel controls
  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= filteredTestimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-play for carousel
  useEffect(() => {
    if (!isAutoPlay || layoutMode !== 'carousel' || filteredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, layoutMode, filteredTestimonials.length, currentIndex]);

  const categories = ['All', 'Dining & Hospitality', 'Healthcare & Wellness', 'Retail & Commerce', 'Professional Services'];

  // Handle new review submission to Firestore
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.clientName || !newReview.businessName || !newReview.quote) return;

    setIsSubmittingReview(true);
    try {
      const saved = await firestoreService.addTestimonial({
        clientName: newReview.clientName,
        businessName: newReview.businessName,
        role: newReview.role || 'Business Owner',
        category: newReview.category,
        rating: newReview.rating,
        quote: newReview.quote,
        plan: newReview.plan,
        turnaround: newReview.turnaround || '48 Hours',
        metrics: newReview.metrics || 'Verified Customer Review'
      });

      setTestimonials(prev => [saved, ...prev]);
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewSuccess(false);
        setIsReviewModalOpen(false);
        setNewReview({
          clientName: '',
          businessName: '',
          role: '',
          category: 'Dining & Hospitality',
          rating: 5,
          quote: '',
          plan: '₹699/month',
          turnaround: '48 Hours',
          metrics: ''
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to save testimonial:', err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 sm:py-28 relative border-t border-white/[0.06] bg-[#07080f] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-700/10 via-blue-700/10 to-indigo-700/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Success Stories</span>
              <span>·</span>
              <span>Verified Small Businesses</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
              Loved by 100+ small businesses across India.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              See why clinics, cafes, boutiques, and consultants choose VYRONIQ.AI for zero-hassle websites with maintenance included.
            </p>
          </div>

          {/* Action Row: Layout toggle + Add review button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Carousel / Grid View Toggle */}
            <div className="inline-flex items-center p-1 bg-white/[0.03] border border-white/10 rounded-xl backdrop-blur-md">
              <button
                onClick={() => setLayoutMode('carousel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  layoutMode === 'carousel'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Carousel View"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Carousel</span>
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>

            {/* Share Feedback Button */}
            <button
              onClick={() => {
                if (!currentUser) {
                  signInWithGoogle().catch(() => {});
                }
                setIsReviewModalOpen(true);
              }}
              className="px-3.5 py-2 text-xs font-semibold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-600/30 border border-purple-500/30 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Share Feedback</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white/10 text-white border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-white/[0.02] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= CAROUSEL LAYOUT ================= */}
        {layoutMode === 'carousel' && (
          <div className="relative">
            {filteredTestimonials.length === 0 ? (
              <div className="p-12 text-center text-slate-400 bg-white/[0.02] rounded-2xl border border-white/10">
                No reviews found for this category yet.
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e101f] to-[#090b14] border border-white/10 shadow-2xl p-6 sm:p-12">
                
                {/* Large Background Quote Symbol */}
                <Quote className="absolute top-6 right-8 w-24 h-24 text-purple-500/10 pointer-events-none" />

                <div className="max-w-4xl mx-auto">
                  
                  {/* Top Badge & Rating Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-white font-mono ml-1">5.0 / 5.0</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {filteredTestimonials[currentIndex].metrics && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{filteredTestimonials[currentIndex].metrics}</span>
                        </span>
                      )}

                      <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono">
                        {filteredTestimonials[currentIndex].plan}
                      </span>
                    </div>
                  </div>

                  {/* Main Quote Content */}
                  <blockquote className="text-lg sm:text-2xl font-normal text-slate-100 leading-relaxed font-sans mb-8">
                    "{filteredTestimonials[currentIndex].quote}"
                  </blockquote>

                  {/* Client Metadata & Business Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[1px] shrink-0">
                        <div className="w-full h-full bg-[#0d0f1e] rounded-[11px] flex items-center justify-center font-display font-bold text-white text-base">
                          {filteredTestimonials[currentIndex].clientName.charAt(0)}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">
                            {filteredTestimonials[currentIndex].clientName}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified Client</span>
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                          <span>{filteredTestimonials[currentIndex].role}</span>
                          <span>·</span>
                          <span className="text-purple-300 font-medium">{filteredTestimonials[currentIndex].businessName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Turnaround Pill */}
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>Live in {filteredTestimonials[currentIndex].turnaround}</span>
                      </span>
                    </div>
                  </div>

                </div>

                {/* Carousel Controls */}
                <div className="flex items-center justify-between mt-8 pt-4">
                  {/* Dots indicator */}
                  <div className="flex items-center gap-2">
                    {filteredTestimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === currentIndex
                            ? 'w-6 bg-gradient-to-r from-blue-500 to-purple-500'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Arrow Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ================= GRID LAYOUT ================= */}
        {layoutMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl bg-[#0b0d18] border border-white/[0.08] hover:border-purple-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20"
              >
                <div>
                  {/* Top rating and plan */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                      {item.plan}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div>
                  {/* Metric tag if available */}
                  {item.metrics && (
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-medium">
                        <TrendingUp className="w-3 h-3" />
                        <span>{item.metrics}</span>
                      </span>
                    </div>
                  )}

                  {/* Client Info */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[1px] shrink-0">
                      <div className="w-full h-full bg-[#0c0e18] rounded-[11px] flex items-center justify-center font-display font-bold text-white text-xs">
                        {item.clientName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{item.clientName}</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.role}, <span className="text-purple-300 font-medium">{item.businessName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner Trigger */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white font-display">
              Want your business featured here next week?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Join dozens of satisfied small business owners. Get your custom modern website built starting at ₹699/month.
            </p>
          </div>
          <button
            onClick={onOpenBuildModal}
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Build My Website</span>
          </button>
        </div>

      </div>

      {/* Share Feedback / Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-auto bg-[#0d0f1e] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/[0.04]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Client Voice</span>
              <h3 className="text-2xl font-bold text-white mt-1">Share Your Experience</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your review will be verified and saved directly to the VYRONIQ.AI network on Firestore.
              </p>
            </div>

            {/* Google Authentication Prompt if not signed in */}
            {!currentUser && (
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 mb-6 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">Signed-in Verification:</span> Sign in with Google to post your verified client review.
                </div>
                <button
                  type="button"
                  onClick={() => signInWithGoogle().catch(() => {})}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center gap-1.5 shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Google Sign In</span>
                </button>
              </div>
            )}

            {reviewSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Review Successfully Posted!</h4>
                <p className="text-xs text-slate-300">
                  Thank you! Your testimonial has been persisted to Firestore and added to the live showcase.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.clientName || currentUser?.displayName || ''}
                      onChange={e => setNewReview({ ...newReview, clientName: e.target.value })}
                      placeholder="e.g. Dr. Priya Ramesh"
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Business Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.businessName}
                      onChange={e => setNewReview({ ...newReview, businessName: e.target.value })}
                      placeholder="e.g. Apex Health Physio"
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Role / Title</label>
                    <input
                      type="text"
                      value={newReview.role}
                      onChange={e => setNewReview({ ...newReview, role: e.target.value })}
                      placeholder="e.g. Founder & Lead Specialist"
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Category</label>
                    <select
                      value={newReview.category}
                      onChange={e => setNewReview({ ...newReview, category: e.target.value })}
                      className="w-full px-3 py-2 bg-[#121422] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Dining & Hospitality">Dining & Hospitality</option>
                      <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                      <option value="Retail & Commerce">Retail & Commerce</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Beauty & Fitness">Beauty & Fitness</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Review / Quote *</label>
                  <textarea
                    rows={4}
                    required
                    value={newReview.quote}
                    onChange={e => setNewReview({ ...newReview, quote: e.target.value })}
                    placeholder="How did VYRONIQ.AI help your business? Mention the design, 48h turnaround, WhatsApp leads, or maintenance experience..."
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Plan Used</label>
                    <select
                      value={newReview.plan}
                      onChange={e => setNewReview({ ...newReview, plan: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#121422] border border-white/10 rounded-lg text-white"
                    >
                      <option value="₹699/month">₹699/month</option>
                      <option value="₹6,999/year">₹6,999/year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Highlight Metric (Optional)</label>
                    <input
                      type="text"
                      value={newReview.metrics}
                      onChange={e => setNewReview({ ...newReview, metrics: e.target.value })}
                      placeholder="e.g. +300% Inquiries or Saved ₹50,000"
                      className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingReview ? 'Persisting to Firestore...' : 'Publish Testimonial'}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
