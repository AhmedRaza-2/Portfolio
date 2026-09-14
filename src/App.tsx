import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Resume } from './components/Resume';
import { Services } from './components/Services';
import { AeoGeoSection } from './components/AeoGeoSection';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SocialSidebar } from './components/SocialSidebar';
import { BackToTop } from './components/BackToTop';
import { AdminModal } from './components/AdminModal';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioDataProvider, usePortfolioData } from './context/PortfolioDataContext';
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext';

export const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { isResumeModalOpen, isAdminOpen } = usePortfolioData();
  const { stop, start } = useSmoothScroll();

  // Pause Lenis smooth scroll while a modal is displayed to prevent background page scrolling
  useEffect(() => {
    if (isResumeModalOpen || isAdminOpen) {
      stop();
    } else {
      start();
    }
  }, [isResumeModalOpen, isAdminOpen, stop, start]);

  useEffect(() => {
    const sections = ['home', 'portfolio', 'resume', 'services', 'faq', 'testimonial', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col font-sans antialiased text-neutral-100 bg-ambient-grid transition-colors duration-400 relative"
      style={{
        backgroundColor: 'var(--color-page-bg)',
        color: 'var(--color-body-text)',
      }}
    >
      {/* 1. Header Navigation */}
      <Header activeSection={activeSection} />

      {/* 2. Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero: Identity & Real Qualifications */}
        <Hero />

        {/* Projects: Direct Evidence & Deployments */}
        <Portfolio />

        {/* Experience & Education: Compact, Straightforward & ATS Verified */}
        <Resume />

        {/* Specialized Services: Scraping, Automation, AI Agents, Full Stack */}
        <Services />

        {/* AEO / GEO / Fact-sheet for High-Ranking Search & AI Grounding */}
        <AeoGeoSection />

        {/* Testimonials: Squeezed Horizontal Scroll Row */}
        <Testimonials />

        {/* Direct Contact: Unified Executive Card with Instant WhatsApp */}
        <Contact />
      </main>

      {/* Floating Utilities */}
      <SocialSidebar />
      <BackToTop />

      {/* Footer with Discreet Private Admin Portal Link */}
      <Footer />

      {/* Verified Resume Modal (ATS View & Print/Download PDF) */}
      <ResumeModal />

      {/* Private Password-Protected Dynamic Admin Panel */}
      <AdminModal />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PortfolioDataProvider>
      <SmoothScrollProvider>
        <AppContent />
      </SmoothScrollProvider>
    </PortfolioDataProvider>
  );
};

export default App;
