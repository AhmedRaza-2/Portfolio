import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openResumeModal } = usePortfolioData();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'PROJECTS', href: '#portfolio' },
    { label: 'EXPERIENCE', href: '#resume' },
    { label: 'SERVICES', href: '#services' },
    { label: 'FEEDBACK', href: '#testimonial' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      {/* 1. Ultra-Thin Fluid Scroll Progress Bar */}
      <div
        id="scroll-progress-bar"
        aria-hidden="true"
        className="fixed top-0 left-0 h-[2.5px] z-50 transition-all duration-150 ease-out pointer-events-none"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: 'var(--color-primary)',
          boxShadow: `0 0 10px var(--color-primary)`,
        }}
      />

      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          isScrolled
            ? 'py-2.5 backdrop-blur-xl shadow-lg border-b'
            : 'py-4 sm:py-5 bg-transparent'
        }`}
        style={{
          backgroundColor: isScrolled
            ? theme.isDark
              ? 'rgba(12, 10, 9, 0.86)'
              : 'rgba(250, 248, 245, 0.92)'
            : 'transparent',
          borderColor: isScrolled
            ? theme.isDark
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.08)'
            : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand / Identity */}
          <a
            id="header-brand"
            href="#home"
            className="flex items-center gap-3 group focus:outline-none rounded-2xl p-1 transition-all duration-200"
          >
            {/* Visual Avatar */}
            <div className="relative shrink-0">
              <div
                className="w-10 h-10 rounded-full p-[2px] shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary), #38bdf8, #818cf8)',
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src="/assets/banner-01.png"
                    alt="Ahmed Raza"
                    className="w-full h-full object-cover object-[50%_15%] group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div
                    className="w-full h-full hidden items-center justify-center font-bold text-xs tracking-wider text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    AR
                  </div>
                </div>
              </div>
            </div>

            {/* Typography & Identity */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-extrabold text-sm sm:text-[15px] tracking-tight transition-colors duration-200"
                  style={{ color: 'var(--color-heading-text)' }}
                >
                  Ahmed Raza
                </span>
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wide">
                <span
                  className="transition-colors duration-200"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Modern Systems
                </span>
                <span className="text-slate-500 dark:text-slate-400 opacity-70">•</span>
                <span
                  className="transition-colors duration-200"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Automation
                </span>
                <span className="text-slate-500 dark:text-slate-400 opacity-70">•</span>
                <span
                  className="transition-colors duration-200"
                  style={{ color: 'var(--color-primary)' }}
                >
                  AI
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Modern Centered Navigation Dock */}
          <nav
            id="desktop-nav"
            aria-label="Main Navigation"
            className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-full shadow-md border backdrop-blur-xl transition-all duration-300"
            style={{
              backgroundColor: 'rgba(14, 30, 36, 0.88)',
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  id={`nav-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  href={item.href}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-slate-900 font-bold shadow-xs'
                      : 'hover:text-white'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? '#0e1e24' : '#c8d8e4',
                  }}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Quick Resume Modal Trigger */}
            <button
              type="button"
              onClick={openResumeModal}
              className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer hover:bg-white/5"
              style={{ color: '#c8d8e4' }}
            >
              <FileText className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
              <span>RESUME</span>
            </button>

            {/* Contact / Consultation CTA */}
            <a
              id="nav-contact-btn"
              href="#contact"
              className="ml-1 inline-flex items-center gap-1 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer text-slate-950"
              style={{
                backgroundColor: 'var(--color-primary)',
              }}
            >
              <span>FREE CONSULTATION</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Medium Screen Nav Actions (visible between sm and lg) */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <a
              href="#contact"
              className="px-3 py-1.5 text-xs font-bold rounded-full text-slate-950 font-bold shadow-xs"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Free Consultation
            </a>

            <button
              type="button"
              onClick={openResumeModal}
              className="px-3 py-1.5 text-xs font-bold rounded-full border text-neutral-300 hover:text-white"
              style={{ borderColor: 'var(--color-border-subtle)' }}
            >
              Resume
            </button>

            <button
              id="mobile-menu-toggle-md"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Small Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="#contact"
              className="px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer text-slate-950"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Consult
            </a>

            <button
              type="button"
              onClick={openResumeModal}
              className="px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer border"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-border-subtle)',
                color: 'var(--color-heading-text)',
              }}
            >
              CV
            </button>

            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-drawer"
            className="lg:hidden border-b px-4 pt-3 pb-6 shadow-2xl backdrop-blur-2xl transition-all"
            style={{
              backgroundColor: 'rgba(14, 30, 36, 0.98)',
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  id={`mobile-nav-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-colors ${
                    activeSection === item.href.substring(1) ? 'text-slate-900 font-bold' : ''
                  }`}
                  style={{
                    backgroundColor: activeSection === item.href.substring(1) ? 'var(--color-primary)' : 'transparent',
                    color: activeSection === item.href.substring(1) ? '#0e1e24' : 'var(--color-heading-text)',
                  }}
                >
                  {item.label}
                </a>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openResumeModal();
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide uppercase border"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-heading-text)',
                }}
              >
                View &amp; Download Resume (PDF)
              </button>

              <a
                id="mobile-nav-contact"
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide uppercase text-slate-950 shadow-md"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                GET FREE CONSULTATION &amp; DEMOS
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

