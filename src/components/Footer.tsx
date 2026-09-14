import React from 'react';
import { Lock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Footer: React.FC = () => {
  const { openAdmin } = usePortfolioData();

  return (
    <footer id="main-footer" className="bg-neutral-950 text-neutral-400 py-10 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full p-[2px] shadow-sm shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), #38bdf8)',
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
              <img
                src="/assets/banner-01.png"
                alt="Ahmed Raza"
                className="w-full h-full object-cover object-[50%_15%]"
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
          <div>
            <span className="font-bold text-sm text-white">Ahmed Raza</span>
            <p className="text-xs text-neutral-400">Full Stack Developer &amp; AI Solutions Engineer</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-neutral-400">
          <a href="#home" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#portfolio" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#resume" className="hover:text-white transition-colors">
            Experience
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span>&copy; {new Date().getFullYear()} Ahmed Raza. All rights reserved.</span>
          {/* Discreet admin lock button */}
          <button
            type="button"
            onClick={openAdmin}
            className="text-neutral-700 hover:text-neutral-400 p-1 rounded transition-colors cursor-pointer"
            title="Admin Dashboard (Ctrl+Shift+A)"
            aria-label="Admin Portal"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
