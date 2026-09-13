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
            className="w-8 h-8 rounded-full p-0.5 shadow-sm"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <img
              src="/assets/logos-circle.png"
              alt="Ahmed Raza"
              className="w-full h-full object-cover rounded-full bg-neutral-900"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <span className="font-bold text-sm text-white">Ahmed Raza</span>
            <p className="text-xs text-neutral-500">Full Stack Developer &amp; AI Solutions Engineer</p>
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
