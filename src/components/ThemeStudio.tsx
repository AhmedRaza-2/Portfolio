import React, { useEffect, useRef } from 'react';
import { Palette, Check, Sparkles, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeId } from '../types/theme';

interface ThemeStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeStudio: React.FC<ThemeStudioProps> = ({ isOpen, onClose }) => {
  const { theme, themeId, setThemeId, availableThemes } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="theme-studio-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      aria-labelledby="theme-studio-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        id="theme-studio-modal"
        className="w-full max-w-xl rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: 'var(--color-card-bg)',
          borderColor: 'var(--color-border-subtle)',
          boxShadow: `0 25px 50px -12px ${theme.colors.primary}25`,
        }}
      >
        {/* Subtle Ambient Radial Glow inside modal */}
        <div
          className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-25 transition-colors duration-500"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b mb-6" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
              }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="theme-studio-title"
                  className="text-lg sm:text-xl font-extrabold tracking-tight"
                  style={{ color: 'var(--color-heading-text)' }}
                >
                  Color &amp; Theme Studio
                </h3>
                <span
                  className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border"
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    borderColor: 'var(--color-primary-border)',
                    color: 'var(--color-primary)',
                  }}
                >
                  Live Switch
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Curated bespoke palettes — designed to look handcrafted, warm, and distinctly non-generic.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close theme studio"
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-100 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[62vh] overflow-y-auto pr-1">
          {availableThemes.map((th) => {
            const isSelected = themeId === th.id;
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => {
                  setThemeId(th.id as ThemeId);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative group cursor-pointer ${
                  isSelected ? 'ring-2 shadow-lg scale-[1.02]' : 'hover:scale-[1.01] hover:border-neutral-600'
                }`}
                style={{
                  backgroundColor: th.colors.subtleBg,
                  borderColor: isSelected ? th.colors.primary : th.colors.borderSubtle,
                  boxShadow: isSelected ? `0 0 0 2px ${th.colors.primary}` : undefined,
                }}
              >
                {/* Active checkmark */}
                {isSelected && (
                  <div
                    className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: th.colors.primary }}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Color Swatch row */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span
                    className="w-6 h-6 rounded-full border border-black/10 shadow-xs shrink-0"
                    style={{ backgroundColor: th.colors.primary }}
                    title={`Primary: ${th.colors.primary}`}
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs shrink-0"
                    style={{ backgroundColor: th.colors.accent }}
                    title={`Accent: ${th.colors.accent}`}
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs shrink-0"
                    style={{ backgroundColor: th.colors.pageBg }}
                    title={`Background: ${th.colors.pageBg}`}
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs shrink-0"
                    style={{ backgroundColor: th.colors.cardBg }}
                    title={`Surface: ${th.colors.cardBg}`}
                  />
                  <span
                    className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 shadow-2xs"
                    style={{
                      backgroundColor: th.colors.cardBg,
                      borderColor: th.colors.borderSubtle,
                      color: th.colors.headingText,
                    }}
                  >
                    {th.isDark ? <Moon className="w-3 h-3 opacity-60" /> : <Sun className="w-3 h-3 opacity-80" />}
                    <span>{th.isDark ? 'Dark' : 'Light'}</span>
                  </span>
                </div>

                <div
                  className="font-bold text-sm flex items-center gap-1.5"
                  style={{ color: th.colors.headingText }}
                >
                  <span>{th.name}</span>
                </div>

                <p
                  className="text-xs mt-1 leading-snug"
                  style={{ color: th.colors.bodyText }}
                >
                  {th.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Footer tip */}
        <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs text-neutral-400" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
            <span>Changes persist automatically across sessions</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
