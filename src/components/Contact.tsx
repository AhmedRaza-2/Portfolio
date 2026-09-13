import React, { useState } from 'react';
import { Mail, Send, Check, Copy, ExternalLink, Phone, MessageSquare, MapPin, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Project Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/923345216102?text=${encodeURIComponent(
    'Hello Ahmed, I reviewed your portfolio and would like to discuss a project / role opportunity.'
  )}`;

  return (
    <section
      id="contact"
      aria-label="Direct Contact & Inquiries"
      className="py-16 sm:py-20 transition-colors duration-300 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-page-bg)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span
            className="text-xs sm:text-sm font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border inline-block mb-3"
            style={{
              backgroundColor: 'var(--color-primary-light)',
              borderColor: 'var(--color-primary-border)',
              color: 'var(--color-primary)',
            }}
          >
            Free Consultation &amp; Live Demos
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-heading-text)' }}
          >
            Need an Upgrade or Looking to Save Time &amp; Money?
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
            Facing bottlenecks in your current workflow or ready to launch an MVP into high-scale production? Let's build your modern end-to-end solution. Reach out for a complimentary architecture review, timeline estimate, and live demo.
          </p>
        </div>

        {/* Unified Executive Contact Box */}
        <div
          className="rounded-3xl border shadow-xl p-6 sm:p-10 transition-all duration-300 max-w-5xl mx-auto"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderColor: 'var(--color-border-subtle)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left side: Direct Channels & Fast Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border-b pb-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <h3
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-heading-text)' }}
                >
                  Direct Communication
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Connect immediately through your preferred platform.
                </p>
              </div>

              {/* WhatsApp Work CTA (Prominent) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 block">
                      Instant Messaging
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Chat on WhatsApp (+92 334 5216102)
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* LinkedIn Work Profile */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 block">
                      Professional Network
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                      Connect on LinkedIn
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Email Direct & Copy */}
              <div
                className="p-4 rounded-xl border flex items-center justify-between gap-3"
                style={{
                  backgroundColor: 'var(--color-subtle-bg)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-lg text-white flex items-center justify-center shrink-0 shadow-xs"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-neutral-400 block">Direct Email</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-bold truncate block hover:underline"
                      style={{ color: 'var(--color-heading-text)' }}
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location & Status */}
              <div className="flex items-center justify-between text-xs text-neutral-400 px-1 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  Islamabad, PK (UTC+5)
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Open for Opportunities
                </span>
              </div>
            </div>

            {/* Right side: Compact Quick Message Composer (7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors focus:outline-none focus:ring-1"
                      style={{
                        backgroundColor: 'var(--color-subtle-bg)',
                        borderColor: 'var(--color-border-subtle)',
                        color: 'var(--color-heading-text)',
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-400 block mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors focus:outline-none focus:ring-1"
                      style={{
                        backgroundColor: 'var(--color-subtle-bg)',
                        borderColor: 'var(--color-border-subtle)',
                        color: 'var(--color-heading-text)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Automation Project / Full Stack Role"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: 'var(--color-subtle-bg)',
                      borderColor: 'var(--color-border-subtle)',
                      color: 'var(--color-heading-text)',
                    }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-400 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project scope, goals, or timeline..."
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors focus:outline-none focus:ring-1 resize-none"
                    style={{
                      backgroundColor: 'var(--color-subtle-bg)',
                      borderColor: 'var(--color-border-subtle)',
                      color: 'var(--color-heading-text)',
                    }}
                  />
                </div>

                <div className="flex items-center justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 transition-all shadow-md hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                    }}
                  >
                    {submitted ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Email Prepared!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
