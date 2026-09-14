import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '../context/SmoothScrollContext';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.4 });
  };

  if (!visible) return null;

  return (
    <button
      id="back-to-top"
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none cursor-pointer"
      style={{
        backgroundColor: 'var(--color-primary)',
      }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
