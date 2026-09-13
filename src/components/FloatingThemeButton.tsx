import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeStudio } from './ThemeStudio';

export const FloatingThemeButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <>
      <aside
        id="floating-theme-switch-container"
        aria-label="Color Theme Switcher"
        className="fixed bottom-6 left-6 z-40"
      >
        <button
          type="button"
          id="floating-theme-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Customize page colors"
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          style={{
            backgroundColor: theme.isDark ? 'rgba(24, 21, 19, 0.9)' : 'rgba(255, 255, 255, 0.92)',
            borderColor: 'var(--color-border-subtle)',
          }}
          title="Play with colors & themes"
        >
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
          </div>
          <span
            className="text-xs font-bold tracking-wide"
            style={{ color: 'var(--color-heading-text)' }}
          >
            Colors
          </span>
          <Palette className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-colors" />
        </button>
      </aside>

      <ThemeStudio isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
