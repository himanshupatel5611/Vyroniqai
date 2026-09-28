import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/mockData.ts';

interface ContactSectionProps {
  onOpenBuildModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBuildModal }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 6000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative border-t border-white/[0.06] bg-[#07080e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 tracking-wider uppercase mb-3">
            <span>Direct Inquiries</span>
            <span>·</span>
            <span>Always Responsive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
            Have questions before starting? Let's talk.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Our team is available every business day to review your business requirements, discuss custom integrations, or explain our maintenance guarantees.
          </p>
        </div>

        {/* 2-Column: Quick Contact + FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details & Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Connect Cards */}
            <div className="space-y-3">
              <a 
                href="https://wa.me/919406756996?text=Hi%20VYRONIQ.AI%20Team%2C%20I%20am%20interested%20in%20building%20a%20website%20for%20my%20business."
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-[#0e121a] border border-emerald-500/30 hover:border-emerald-500/60 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct WhatsApp Chat</div>
                    <div className="text-sm font-bold text-white">+91 94067 56996</div>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-medium">Chat Now →</span>
              </a>

              <a 
                href="tel:9406906918"
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Phone Support</div>
                    <div className="text-sm font-bold text-white">+91 94069 06918</div>
                  </div>
                </div>
                <span className="text-xs text-purple-400 font-medium">Call Us →</span>
              </a>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Official Email & Location</div>
                    <div className="text-sm font-bold text-white">vyroniqai640@gmail.com</div>
                    <div className="text-xs text-slate-400 mt-0.5">Sehore, Madhya Pradesh, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct inquiry form */}
            <div className="rounded-2xl bg-[#0b0d18] border border-white/[0.08] p-6">
              <h3 className="text-base font-bold text-white mb-1">Send a Message</h3>
              <p className="text-xs text-slate-400 mb-4">We typically respond within 2 business hours.</p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">Message Dispatched!</div>
                  <p className="text-xs text-slate-300">
                    Thank you. A member of the VYRONIQ.AI team will connect with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@business.com"
                        className="w-full px-3 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WA</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98..."
                        className="w-full px-3 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">How can we help?</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your business or questions..."
                      className="w-full px-3 py-2 text-xs bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:brightness-110 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Frequently Asked Questions (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white font-display">Common Questions</h3>
              <button
                onClick={onOpenBuildModal}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
              >
                Skip to Build Form →
              </button>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-white/[0.08] bg-[#0b0d18] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-semibold text-slate-200">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-purple-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.04] pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
