export type ThemeId = 'tealDark';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  referenceName: string;
  badge: string;
  isDark: boolean;
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    primaryBorder: string;
    accent: string;
    accentGlow: string;
    pageBg: string;
    subtleBg: string;
    cardBg: string;
    headingText: string;
    bodyText: string;
    borderSubtle: string;
    gradientFrom: string;
    gradientTo: string;
  };
}

export const THEMES: Record<string, ThemeConfig> = {
  tealDark: {
    id: 'tealDark',
    name: 'Oceanic Teal Nocturne',
    subtitle: 'Deep Petrol Slate & Luminous Jade (#0e1e24 / #52ab98 / #c8d8e4)',
    referenceName: 'Oceanic Teal: Midnight Petrol & Luminous Seafoam',
    badge: 'Uploaded Palette',
    isDark: true,
    colors: {
      primary: '#52ab98', // Luminous Seafoam Mint (#52ab98 from swatch)
      primaryHover: '#429382',
      primaryLight: 'rgba(82, 171, 152, 0.18)',
      primaryBorder: 'rgba(82, 171, 152, 0.4)',
      accent: '#c8d8e4', // Pale Ice (#c8d8e4 from swatch)
      accentGlow: 'rgba(82, 171, 152, 0.3)',
      pageBg: '#0e1e24', // Deep Midnight Petrol Slate
      subtleBg: '#142830',
      cardBg: '#18333d', // Rich Dark Petrol Card
      headingText: '#ffffff', // Crisp White (#ffffff from swatch)
      bodyText: '#c8d8e4', // Mist Ice Body Text (#c8d8e4 from swatch)
      borderSubtle: '#264a56',
      gradientFrom: '#52ab98',
      gradientTo: '#2b6777',
    },
  },
};

// Aliases
THEMES.teal = THEMES.tealDark;
THEMES.amber = THEMES.tealDark;
THEMES.emerald = THEMES.tealDark;
THEMES.terracotta = THEMES.tealDark;
THEMES.crimson = THEMES.tealDark;
THEMES.sage = THEMES.tealDark;
THEMES.titanium = THEMES.tealDark;
