import React, { createContext, useContext, useEffect } from 'react';
import { ThemeId, ThemeConfig, THEMES } from '../types/theme';

interface ThemeContextType {
  theme: ThemeConfig;
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = THEMES.tealDark;
  const themeId: ThemeId = 'tealDark';

  const setThemeId = () => {
    // Locked to Oceanic Teal Nocturne
  };

  useEffect(() => {
    const root = document.documentElement;
    const colors = theme.colors;

    // Apply CSS variables to root
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-hover', colors.primaryHover);
    root.style.setProperty('--color-primary-light', colors.primaryLight);
    root.style.setProperty('--color-primary-border', colors.primaryBorder);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-accent-glow', colors.accentGlow);
    root.style.setProperty('--color-page-bg', colors.pageBg);
    root.style.setProperty('--color-subtle-bg', colors.subtleBg);
    root.style.setProperty('--color-card-bg', colors.cardBg);
    root.style.setProperty('--color-heading-text', colors.headingText);
    root.style.setProperty('--color-body-text', colors.bodyText);
    root.style.setProperty('--color-border-subtle', colors.borderSubtle);
    root.style.setProperty('--color-gradient-from', colors.gradientFrom);
    root.style.setProperty('--color-gradient-to', colors.gradientTo);

    document.body.style.backgroundColor = colors.pageBg;
    document.body.style.color = colors.bodyText;

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', colors.pageBg);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeId,
        setThemeId,
        availableThemes: [theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
