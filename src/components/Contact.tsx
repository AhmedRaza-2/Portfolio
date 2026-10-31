import React, { useState } from 'react';
import { Mail, Check, Copy, MessageCircle, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SectionHeader } from './ui/SectionHeader';

const inputClass =
  'w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary-border)]';
const inputStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-subtle-bg)',
  borderColor: 'var(--color-border-subtle)',
  color: 'var(--color-heading-text)',
};

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Message from ${form.name} via ahmed-raza.dev`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const links = [
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'in/ahmed-r-43b6a1266', href: PERSONAL_INFO.linkedin },
    { icon: GithubIcon, label: 'GitHub', value: 'AhmedRaza-2', href: PERSONAL_INFO.github },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: PERSONAL_INFO.phone,
      href: 'https://wa.me/923345216102',
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-20 sm:py-24 border-t"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: how to reach me */}
          <div>
            <SectionHeader
              id="contact-title"
              title="Contact"
              description="Hiring for an AI/ML or software role, or have a project in mind? Email is the fastest way to reach me."
            />

            <div className="flex items-center gap-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold underline-offset-4 hover:underline break-all"
                style={{ color: 'var(--color-heading-text)' }}
              >
                <Mail className="h-5 w-5 shrink-0" style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                {PERSONAL_INFO.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
                className="rounded-lg p-2 transition-colors hover:bg-white/5"
                style={{ color: 'var(--color-body-text)' }}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <ul className="mt-6 space-y-3">
              {links.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-sm"
                    style={{ color: 'var(--color-body-text)' }}
                  >
                    <Icon className="h-4 w-4" style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                    <span className="w-20 opacity-70">{label}</span>
                    <span className="group-hover:underline underline-offset-4" style={{ color: 'var(--color-heading-text)' }}>
                      {value}
                    </span>
                  </a>
                </li>
              ))}
              <li className="inline-flex items-center gap-3 text-sm" style={{ color: 'var(--color-body-text)' }}>
                <MapPin className="h-4 w-4" style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                <span className="w-20 opacity-70">Location</span>
                <span style={{ color: 'var(--color-heading-text)' }}>Islamabad, Pakistan (UTC+5)</span>
              </li>
            </ul>
          </div>

          {/* Right: short form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:pt-2" aria-label="Send a message">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="mb-1.5 block text-sm" style={{ color: 'var(--color-body-text)' }}>Name</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm" style={{ color: 'var(--color-body-text)' }}>Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm" style={{ color: 'var(--color-body-text)' }}>Message</span>
              <textarea
                required
                name="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-full px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-page-bg)' }}
              >
                Send message
              </button>
              {sent && (
                <span className="text-sm" style={{ color: 'var(--color-body-text)' }} role="status">
                  Your email app should open with the message ready to send.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
