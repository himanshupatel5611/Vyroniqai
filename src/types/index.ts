export interface WebsiteRequest {
  id: string;
  userId?: string;
  createdAt: string;
  status: 'new' | 'in_review' | 'in_development' | 'completed' | 'archived';
  businessName: string;
  category: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  websiteStyle: string;
  services: string;
  aboutBusiness: string;
  preferredColors: string[];
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    googleMaps?: string;
  };
  logoUrl?: string;
  photos?: string[];
  specialRequirements: string;
  selectedPlan: 'monthly' | 'yearly';
  internalNotes?: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  businessName: string;
  role: string;
  category: string;
  rating: number;
  quote: string;
  plan: '₹699/month' | '₹6,999/year';
  turnaround: string;
  avatar?: string;
  metrics?: string;
  createdAt: string;
  verified?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'admin' | 'client';
  createdAt: string;
  lastLoginAt?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Dining & Hospitality' | 'Healthcare & Wellness' | 'Retail & Commerce' | 'Professional Services';
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  features: string[];
  turnaroundDays: number;
  liveDemoUrl?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface PricingPlan {
  id: 'monthly' | 'yearly';
  name: string;
  price: number;
  period: string;
  billedNote: string;
  savingsBadge?: string;
  features: string[];
  popular?: boolean;
}
