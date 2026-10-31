import React, { useState, useEffect } from 'react';
import { ArrowRight, FolderGit2, CheckCircle2, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Hero: React.FC = () => {
  const { openResumeModal } = usePortfolioData();
  const words = [
    'AI that ships to production.',
    '32-hour workflows → 10 minutes.',
    'RAG agents & LLM apps.',
    'MVP to production, end-to-end.',
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentFullWord = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullWord.substring(0, displayText.length + 1));
        setTypingSpeed(80);

        if (displayText === currentFullWord) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentFullWord.substring(0, displayText.length - 1));
        setTypingSpeed(40);

        if (displayText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <section
      id="home"
      aria-label="Introduction & Overview"
      className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-page-bg)',
      }}
    >
      {/* Modern Ambient Radial Glow Orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] rounded-full blur-[130px] pointer-events-none opacity-20 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, var(--color-primary) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Direct CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Value Proposition Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs border transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                borderColor: 'var(--color-primary-border)',
                color: 'var(--color-primary)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
              </span>
              <span>Available for AI/ML roles &amp; collaborations</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
              style={{ color: 'var(--color-heading-text)' }}
            >
              Hi, I'm <span style={{ color: 'var(--color-primary)' }}>{PERSONAL_INFO.name}</span>
              <span className="sr-only"> — AI/ML Engineer in Islamabad, Pakistan. </span>
              <br />
              <span
                className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold min-h-[64px] sm:min-h-[48px]"
                style={{ color: 'var(--color-primary)' }}
              >
                {displayText}
                <span
                  className="inline-block w-0.5 h-7 ml-1 animate-pulse align-middle"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl font-normal opacity-90" style={{ color: 'var(--color-body-text)' }}>
              AI/ML Engineer and CS undergraduate at Air University, Islamabad. I&apos;ve shipped real AI systems at the <strong className="font-semibold" style={{ color: 'var(--color-heading-text)' }}>Askari Bank AI Team</strong>, <strong className="font-semibold" style={{ color: 'var(--color-heading-text)' }}>INARA Technologies</strong> and <strong className="font-semibold" style={{ color: 'var(--color-heading-text)' }}>National CERT Pakistan</strong> — including a regulatory-monitoring pipeline that cut <strong className="font-semibold" style={{ color: 'var(--color-heading-text)' }}>32 hours of weekly manual work to ~10 minutes</strong> across 50,000+ documents. I work end-to-end — Python, LLMs, RAG, React and Flutter — from first prototype to production.
            </p>

            {/* Quick Skills Pills */}
            <div className="mt-5 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold mr-1 opacity-70" style={{ color: 'var(--color-body-text)' }}>Focus:</span>
              {['Generative AI & LLMs', 'RAG Pipelines & AI Agents', 'Python Automation', 'NLP & Machine Learning', 'React / Next.js', 'Flutter'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderColor: 'var(--color-border-subtle)',
                    color: 'var(--color-heading-text)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                id="hero-consultation-cta"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-slate-950 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-primary)',
                }}
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="hero-portfolio-cta"
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold border shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-heading-text)',
                }}
              >
                <FolderGit2 className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span>View Projects</span>
              </a>

              <button
                id="hero-resume-cta"
                type="button"
                onClick={openResumeModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold border shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  borderColor: 'var(--color-primary-border)',
                  color: 'var(--color-primary)',
                }}
              >
                <FileText className="w-4 h-4" />
                <span>View Résumé</span>
              </button>
            </div>

            {/* Credibility checkpoints */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-semibold">
              <div className="flex items-center gap-2" style={{ color: 'var(--color-body-text)' }}>
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                <span>32h manual flow cut to 10 mins</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'var(--color-body-text)' }}>
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                <span>3 AI/Security internships</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'var(--color-body-text)' }}>
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                <span>20+ projects delivered</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md group">
              <div
                className="relative rounded-3xl overflow-hidden p-3 border shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <img
                  src="/assets/ahmed-raza.webp"
                  alt="Portrait of Ahmed Raza, AI/ML Engineer based in Islamabad, Pakistan"
                  width={800}
                  height={800}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.01] transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('banner-01.png')) {
                      target.src = '/assets/banner-01.png';
                    }
                  }}
                />

                {/* Floating Metrics Badge on Image */}
                <div
                  className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-xl border shadow-xl flex items-center justify-between transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(18, 16, 14, 0.88)',
                    borderColor: 'var(--color-border-subtle)',
                  }}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
                      Production Impact
                    </span>
                    <span className="text-xs font-extrabold text-white">
                      32h manual flow &rarr; 10 mins
                    </span>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold border"
                    style={{
                      backgroundColor: 'var(--color-primary-light)',
                      borderColor: 'var(--color-primary-border)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    Askari Bank
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
