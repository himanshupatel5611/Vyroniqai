import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  MessageSquare, 
  ShieldCheck, 
  Printer,
  Copy,
  CheckCircle2,
  Building,
  Phone,
  Palette,
  FileText
} from 'lucide-react';
import { WebsiteRequest } from '../types/index.ts';
import { storageService } from '../services/storage.ts';
import { firestoreService } from '../services/firestoreService.ts';
import { useAuth } from '../contexts/AuthContext.tsx';
import { VYRONIQ_LOGO_IMAGE } from '../data/mockData.ts';

interface BuildWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: 'monthly' | 'yearly';
  initialStyle?: string;
  initialCategory?: string;
  onRequestCreated: (newRequest: WebsiteRequest) => void;
  onNavigateToAdmin?: () => void;
}

const CATEGORY_OPTIONS = [
  'Dining & Hospitality (Cafe, Restaurant, Bakery)',
  'Healthcare & Wellness (Clinic, Dental, Physio)',
  'Retail & E-Commerce (Boutique, Jewelry, Fashion)',
  'Professional Services (Legal, CA, Consulting, Agency)',
  'Salons, Beauty & Spa',
  'Real Estate & Construction',
  'Fitness & Sports Gyms',
  'Automotive & Repair Services',
  'Other Small Business'
];

const STYLE_OPTIONS = [
  {
    id: 'Modern Futuristic',
    name: 'Modern Futuristic',
    desc: 'Obsidian dark aesthetic, metallic blue/purple accents, sleek tech feel',
    accent: 'from-blue-500 to-purple-500'
  },
  {
    id: 'Clean Minimalist',
    name: 'Clean Minimalist',
    desc: 'Spacious airy layouts, razor-sharp typography, ultra-modern monochrome',
    accent: 'from-slate-300 to-slate-500'
  },
  {
    id: 'Warm Artisanal',
    name: 'Warm Artisanal',
    desc: 'Rich charcoal or earthy dark tones, cozy serif touches, authentic vibe',
    accent: 'from-amber-500 to-rose-500'
  },
  {
    id: 'Bold Corporate',
    name: 'Bold Corporate',
    desc: 'Authoritative deep navy/slate, high trust markers, executive look',
    accent: 'from-blue-600 to-cyan-500'
  }
];

const COLOR_PRESETS = [
  { name: 'Obsidian & Electric Violet', colors: ['#07080e', '#3b82f6', '#8b5cf6'] },
  { name: 'Titanium & Cobalt', colors: ['#0b1120', '#2563eb', '#06b6d4'] },
  { name: 'Midnight & Emerald Glow', colors: ['#061a14', '#10b981', '#34d399'] },
  { name: 'Dark Amber & Gold', colors: ['#140f09', '#d97706', '#f59e0b'] },
  { name: 'Deep Crimson & Charcoal', colors: ['#170b0f', '#e11d48', '#f43f5e'] }
];

export const BuildWebsiteModal: React.FC<BuildWebsiteModalProps> = ({
  isOpen,
  onClose,
  initialPlan = 'monthly',
  initialStyle,
  initialCategory,
  onRequestCreated,
  onNavigateToAdmin
}) => {
  const [step, setStep] = useState<number>(1);
  const [copiedCode, setCopiedCode] = useState(false);

  // Form State
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState(initialCategory || CATEGORY_OPTIONS[0]);
  const [location, setLocation] = useState('');

  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [email, setEmail] = useState('');

  const [websiteStyle, setWebsiteStyle] = useState(initialStyle || 'Modern Futuristic');
  const [services, setServices] = useState('');
  const [selectedColorPreset, setSelectedColorPreset] = useState(COLOR_PRESETS[0].name);
  const [customColors, setCustomColors] = useState<string[]>(COLOR_PRESETS[0].colors);

  const [aboutBusiness, setAboutBusiness] = useState('');
  const [socialInstagram, setSocialInstagram] = useState('');
  const [socialFacebook, setSocialFacebook] = useState('');
  const [socialLinkedin, setSocialLinkedin] = useState('');
  const [socialMaps, setSocialMaps] = useState('');

  const [logoPreview, setLogoPreview] = useState<string>('');
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>(initialPlan);
  const [specialRequirements, setSpecialRequirements] = useState('');

  const [createdOrder, setCreatedOrder] = useState<WebsiteRequest | null>(null);

  const { currentUser, isAdmin } = useAuth();

  // Reset or preset on open
  useEffect(() => {
    if (initialPlan) setSelectedPlan(initialPlan);
    if (initialStyle) setWebsiteStyle(initialStyle);
    if (initialCategory) setCategory(initialCategory);
    if (currentUser?.email && !email) {
      setEmail(currentUser.email);
    }
  }, [initialPlan, initialStyle, initialCategory, isOpen, currentUser]);

  if (!isOpen) return null;

  // Handle logo file selection
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle sample photos
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).slice(0, 3).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreviews(prev => [...prev.slice(0, 3), reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!businessName.trim() || !location.trim())) return;
    if (step === 2 && (!phone.trim() || !email.trim())) return;
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveWhatsapp = sameAsPhone ? phone : (whatsapp || phone);

    const saved = await firestoreService.saveWebsiteRequest({
      businessName,
      category,
      phone,
      whatsapp: effectiveWhatsapp,
      email,
      location,
      websiteStyle,
      services: services.trim() || 'General products and services portfolio',
      aboutBusiness: aboutBusiness.trim() || 'Small business seeking a modern professional digital presence.',
      preferredColors: customColors,
      socialLinks: {
        instagram: socialInstagram,
        facebook: socialFacebook,
        linkedin: socialLinkedin,
        googleMaps: socialMaps
      },
      logoUrl: logoPreview || undefined,
      photos: photoPreviews.length > 0 ? photoPreviews : undefined,
      specialRequirements: specialRequirements.trim() || 'Standard responsive setup with maintenance included.',
      selectedPlan
    }, currentUser?.uid);

    setCreatedOrder(saved);
    onRequestCreated(saved);
    setStep(6); // Step 6 is the confirmation summary screen
  };

  const copyRefCode = () => {
    if (createdOrder) {
      navigator.clipboard.writeText(createdOrder.id);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const openWhatsAppConfirmation = () => {
    if (!createdOrder) return;
    const msg = encodeURIComponent(
      `Hello VYRONIQ.AI Team! I just submitted my website request.\n` +
      `• Order Ref: ${createdOrder.id}\n` +
      `• Business: ${createdOrder.businessName}\n` +
      `• Plan: ${createdOrder.selectedPlan === 'monthly' ? '₹699/month' : '₹6,999/year'}\n` +
      `• Style: ${createdOrder.websiteStyle}\n` +
      `Looking forward to receiving our 48h live preview!`
    );
    window.open(`https://wa.me/919406756996?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-[#0a0c16] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar with Official Logo */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0d0f1c] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-black border border-white/15 p-0.5 shrink-0">
              <img src={VYRONIQ_LOGO_IMAGE} alt="VYRONIQ Logo" className="w-full h-full object-cover rounded-[6px]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                <span>Build My Website</span>
                {step <= 5 && (
                  <span className="text-xs text-purple-400 font-mono font-normal">
                    Step {step} of 5
                  </span>
                )}
                {step === 6 && (
                  <span className="text-xs text-emerald-400 font-mono font-normal">
                    Step 6: We Handle Everything!
                  </span>
                )}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Only during steps 1 to 5) */}
        {step <= 5 && (
          <div className="w-full bg-white/[0.04] h-1 shrink-0">
            <div 
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* Form Body - Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
          
          {/* STEP 1: Business Identity & Category */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Step 1</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Tell us about your business</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  We customize the layout, typography, and sections specifically for your business domain.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Business Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={e => setBusinessName(e.target.value)}
                      placeholder="e.g. Blue Lotus Ayurvedic Clinic or The Roasted Bean Cafe"
                      className="w-full pl-10 pr-4 py-3 text-sm bg-white/[0.03] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Business Category <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#0e101d] border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0e101d] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Location / City <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Indiranagar, Bengaluru or Bandra West, Mumbai"
                    className="w-full px-4 py-3 text-sm bg-white/[0.03] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Used to optimize your Google Maps integration and local search ranking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Contact Channels */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Step 2</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Direct Contact & WhatsApp Setup</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  How your customers and the VYRONIQ.AI team will connect with you.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => {
                        setPhone(e.target.value);
                        if (sameAsPhone) setWhatsapp(e.target.value);
                      }}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 text-sm bg-white/[0.03] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Number for Instant Leads</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsPhone}
                        onChange={e => {
                          setSameAsPhone(e.target.checked);
                          if (e.target.checked) setWhatsapp(phone);
                        }}
                        className="rounded border-white/20 bg-white/5 text-purple-600 focus:ring-0"
                      />
                      <span>Same as phone</span>
                    </label>
                  </div>

                  {!sameAsPhone && (
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-sm bg-white/[0.03] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  )}
                  <p className="text-[11px] text-slate-400">
                    We embed a one-tap WhatsApp chat button directly on your website so customers can message you immediately.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contact@yourbusiness.com"
                    className="w-full px-4 py-3 text-sm bg-white/[0.03] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Your staging preview and updates will be dispatched to this email and WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Website Style & Products/Services */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Step 3</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Design Style & Offerings</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Choose your preferred aesthetic and list what you sell or offer.
                </p>
              </div>

              {/* Style selector tiles */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  Select Design Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STYLE_OPTIONS.map((style) => (
                    <button
                      type="button"
                      key={style.id}
                      onClick={() => setWebsiteStyle(style.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        websiteStyle === style.id
                          ? 'bg-[#15172b] border-purple-500 shadow-md ring-1 ring-purple-500/50'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white">{style.name}</span>
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${style.accent}`} />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{style.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Services or Products */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Services or Products Offered <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={services}
                  onChange={e => setServices(e.target.value)}
                  placeholder="e.g. Root canal therapy, Teeth whitening, Orthodontics, Dental implants, Routine checkups..."
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-white/[0.03] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all resize-none"
                />
              </div>

              {/* Preferred Colors */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-purple-400" />
                  <span>Preferred Color Accent Palette</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset.name}
                      onClick={() => {
                        setSelectedColorPreset(preset.name);
                        setCustomColors(preset.colors);
                      }}
                      className={`p-2.5 rounded-xl flex items-center justify-between border cursor-pointer ${
                        selectedColorPreset === preset.name
                          ? 'bg-purple-950/30 border-purple-500'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xs text-slate-300 font-medium truncate">{preset.name}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {preset.colors.map((c, i) => (
                          <div 
                            key={i} 
                            className="w-4 h-4 rounded-full border border-black/40" 
                            style={{ backgroundColor: c }} 
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Story, Uploads & Social Links */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Step 4</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Business Story & Visual Assets</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Upload your logo, store photos, or link your existing social media pages.
                </p>
              </div>

              {/* About description */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  About the Business
                </label>
                <textarea
                  rows={3}
                  value={aboutBusiness}
                  onChange={e => setAboutBusiness(e.target.value)}
                  placeholder="Share a short summary: what makes your business unique, your years of experience, or special customer promises..."
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-white/[0.03] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all resize-none"
                />
              </div>

              {/* Logo Upload Box */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  Upload Business Logo (Optional)
                </label>
                
                {logoPreview ? (
                  <div className="flex items-center gap-4 p-3 bg-white/[0.02] border border-white/10 rounded-xl">
                    <img 
                      src={logoPreview} 
                      alt="Uploaded Logo preview" 
                      className="w-16 h-16 object-contain bg-black/40 rounded-lg p-1 border border-white/10" 
                    />
                    <div className="flex-grow text-xs text-slate-300">
                      <div className="font-semibold text-white">Logo Uploaded</div>
                      <div className="text-[11px] text-slate-400">Will be featured in header and footer.</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLogoPreview('')}
                      className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/15 hover:border-purple-500/50 rounded-2xl bg-white/[0.01] hover:bg-purple-950/10 transition-colors cursor-pointer text-center">
                    <Upload className="w-6 h-6 text-purple-400 mb-2" />
                    <span className="text-xs font-medium text-slate-200">
                      Click to upload your logo (PNG, JPG, SVG)
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">
                      Don't have a logo yet? No problem—we will create a clean modern wordmark for you.
                    </span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload} 
                      className="hidden" 
                    />
                  </label>
                )}
              </div>

              {/* Photos upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  Store / Clinic / Product Photos (Optional, up to 3)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {photoPreviews.map((p, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/15 bg-black">
                      <img src={p} alt="Sample upload" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotoPreviews(photoPreviews.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 p-1 bg-black/70 rounded-full text-rose-400 hover:text-rose-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {photoPreviews.length < 3 && (
                    <label className="w-20 h-20 rounded-xl border border-dashed border-white/20 hover:border-purple-400 flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-white bg-white/[0.02]">
                      <ImageIcon className="w-5 h-5 mb-1" />
                      <span className="text-[9px]">Add Photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Social links */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-2">
                  Social Media & Maps Links (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="url"
                    value={socialInstagram}
                    onChange={e => setSocialInstagram(e.target.value)}
                    placeholder="Instagram URL (e.g. instagram.com/mybusiness)"
                    className="px-3 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="url"
                    value={socialMaps}
                    onChange={e => setSocialMaps(e.target.value)}
                    placeholder="Google Maps location link"
                    className="px-3 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="url"
                    value={socialFacebook}
                    onChange={e => setSocialFacebook(e.target.value)}
                    placeholder="Facebook Page URL"
                    className="px-3 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="url"
                    value={socialLinkedin}
                    onChange={e => setSocialLinkedin(e.target.value)}
                    placeholder="LinkedIn Profile / Company"
                    className="px-3 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: Plan Selection & Special Requirements */}
          {step === 5 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Step 5</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Choose Plan & Special Requirements</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Zero upfront payment required. Both plans include full maintenance.
                </p>
              </div>

              {/* Plan Choice Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Monthly */}
                <div
                  onClick={() => setSelectedPlan('monthly')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    selectedPlan === 'monthly'
                      ? 'bg-gradient-to-b from-[#141528] to-[#0d0f1b] border-purple-500 ring-2 ring-purple-500/40'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">Monthly Plan</span>
                    <input 
                      type="radio" 
                      name="planChoice" 
                      checked={selectedPlan === 'monthly'} 
                      readOnly 
                      className="text-purple-600"
                    />
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    ₹699 <span className="text-xs font-normal text-slate-400">/ month</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Website maintenance included. Cancel anytime without penalty.
                  </p>
                </div>

                {/* Yearly */}
                <div
                  onClick={() => setSelectedPlan('yearly')}
                  className={`relative p-5 rounded-2xl border transition-all cursor-pointer ${
                    selectedPlan === 'yearly'
                      ? 'bg-gradient-to-b from-[#18132c] to-[#0d0f1b] border-purple-500 ring-2 ring-purple-500/40'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded-full">
                    2 Months Free
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">Annual Plan</span>
                    <input 
                      type="radio" 
                      name="planChoice" 
                      checked={selectedPlan === 'yearly'} 
                      readOnly 
                      className="text-purple-600"
                    />
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    ₹6,999 <span className="text-xs font-normal text-slate-400">/ year</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    Includes domain setup assistance, priority revisions, and full year maintenance.
                  </p>
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Any Special Requirements or Custom Features?
                </label>
                <textarea
                  rows={3}
                  value={specialRequirements}
                  onChange={e => setSpecialRequirements(e.target.value)}
                  placeholder="e.g. Need online appointment booking for 2 doctors, downloadable PDF menu, WhatsApp ordering cart, bilingual support..."
                  className="w-full px-4 py-3 text-xs sm:text-sm bg-white/[0.03] border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all resize-none"
                />
              </div>

              {/* No fake payment notice */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Zero Upfront Charge Policy:</strong> You do not pay anything right now. Our engineering team reviews your questionnaire, prepares a live working prototype in 48 hours, and activates billing only when you are 100% satisfied.
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>Submit Website Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 6: Summary & Confirmation Screen */}
          {step === 6 && createdOrder && (
            <div className="space-y-6 text-center sm:text-left">
              
              {/* Success Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-purple-950/30 to-[#0e101f] border border-emerald-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Step 6: We Handle Everything For You!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Sit back & relax — zero technical effort needed from your side. Our engineering team in <strong className="text-white">Sehore, Madhya Pradesh</strong> is now building your complete website draft. We will connect your hosting, set up WhatsApp lead capture, and message you on WhatsApp (<strong className="text-emerald-400">+91 94067 56996</strong>) within 48 hours!
                </p>

                {/* Reference ID Pill with Copy */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs">
                  <span className="text-slate-400">Order Reference:</span>
                  <span className="font-mono font-bold text-purple-300 text-sm">{createdOrder.id}</span>
                  <button
                    onClick={copyRefCode}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copy code"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="p-5 rounded-2xl bg-[#0b0d18] border border-white/10 space-y-3 text-xs text-slate-300">
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Summary of Submitted Details</span>
                  <span className="text-purple-400 font-mono">
                    {new Date(createdOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-white/[0.06]">
                  <div>
                    <span className="text-slate-500">Business Name:</span>
                    <div className="font-semibold text-white">{createdOrder.businessName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Category:</span>
                    <div className="font-medium text-slate-200">{createdOrder.category}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Location:</span>
                    <div className="font-medium text-slate-200">{createdOrder.location}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Selected Plan:</span>
                    <div className="font-semibold text-emerald-400">
                      {createdOrder.selectedPlan === 'monthly' ? '₹699 / month' : '₹6,999 / year (Maintenance Included)'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-white/[0.06]">
                  <div>
                    <span className="text-slate-500">Phone & WhatsApp:</span>
                    <div className="text-slate-200 font-mono">{createdOrder.phone}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Email:</span>
                    <div className="text-slate-200">{createdOrder.email}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Aesthetic Style:</span>
                    <div className="text-purple-300 font-medium">{createdOrder.websiteStyle}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Products/Services:</span>
                    <div className="text-slate-300 truncate">{createdOrder.services}</div>
                  </div>
                </div>

                {createdOrder.specialRequirements && (
                  <div>
                    <span className="text-slate-500">Special Requirements:</span>
                    <div className="text-slate-300 italic">{createdOrder.specialRequirements}</div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={openWhatsAppConfirmation}
                  className="w-full sm:flex-1 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200" />
                  <span>Send Direct WhatsApp Confirmation</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto py-3 px-4 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Summary</span>
                </button>

                {isAdmin && onNavigateToAdmin && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToAdmin();
                    }}
                    className="w-full sm:w-auto py-3 px-4 text-xs font-semibold text-purple-300 hover:text-purple-200 bg-purple-500/10 border border-purple-500/30 rounded-xl transition-colors cursor-pointer"
                  >
                    View In Admin
                  </button>
                )}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Back to VYRONIQ.AI Homepage
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation (Step 1-4) */}
        {step < 5 && (
          <div className="px-6 py-4 border-t border-white/10 bg-[#0d0f1c] flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
