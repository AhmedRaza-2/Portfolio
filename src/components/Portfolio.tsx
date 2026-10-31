import React, { useState, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { SectionHeader } from './ui/SectionHeader';

export interface CustomThumbnailInfo {
  src: string;
  badgeLabel?: string;
  badgeType?: 'invoice' | 'dashboard' | 'waveform' | 'security' | 'resume' | 'web' | 'chatbot' | 'bot' | 'charity';
}

export const getCustomProjectThumbnail = (project: Project): CustomThumbnailInfo => {
  const t = (project.title || '').toLowerCase();
  const id = (project.id || '').toLowerCase();

  // 1. Self-generated custom graphical diagrams based on project idea for specialized enterprise/banking workflows
  // TradeOps is checked first: its title also mentions "Askari Bank"
  if (id.includes('tradeops') || t.includes('tradeops') || t.includes('invoice')) {
    return {
      src: '/project-screenshots/tradeops-invoice.svg',
      badgeLabel: 'TradeOps Invoice Extraction',
      badgeType: 'invoice',
    };
  }
  if (id.includes('regulatory') || t.includes('regulatory')) {
    return {
      src: '/project-screenshots/regulatory-dashboard.svg',
      badgeLabel: 'Regulatory Scraping (Askari)',
      badgeType: 'dashboard',
    };
  }
  if (id.includes('voice-sentiment') || id.includes('sentiment') || t.includes('voice call sentiment') || t.includes('call tone')) {
    return {
      src: '/project-screenshots/voice-sentiment-waveform.svg',
      badgeLabel: 'Call Sentiment Analysis',
      badgeType: 'waveform',
    };
  }

  // 2. Real project screenshots for the rest of the projects
  if (id.includes('noble-islam') || t.includes('noble islam')) {
    return {
      src: '/project-screenshots/thenobleislam.webp',
      badgeLabel: 'The Noble Islam Live',
      badgeType: 'web',
    };
  }
  if (id.includes('noble') || t.includes('noble')) {
    return {
      src: '/project-screenshots/nobleplatforms.webp',
      badgeLabel: 'Noble Platforms Agency',
      badgeType: 'web',
    };
  }
  if (id.includes('resumify') || t.includes('resumify')) {
    return {
      src: '/project-screenshots/portfolio-02.webp',
      badgeLabel: 'ATS AI Resume Builder',
      badgeType: 'resume',
    };
  }
  if (id.includes('aegis') || t.includes('aegis') || t.includes('phishing')) {
    return {
      src: '/project-screenshots/portfolio-07.webp',
      badgeLabel: 'Outlook Phishing Classifier',
      badgeType: 'security',
    };
  }
  if (id.includes('aura') || t.includes('aura') || t.includes('inara') || t.includes('customer support')) {
    return {
      src: '/project-screenshots/portfolio-09.webp',
      badgeLabel: 'URL-to-Chatbot Generator',
      badgeType: 'chatbot',
    };
  }
  if (id.includes('file-encryption') || id.includes('encryption')) {
    return {
      src: '/project-screenshots/portfolio-06.webp',
      badgeLabel: 'National CERT Encryption',
      badgeType: 'security',
    };
  }
  if (id.includes('automation-bot') || id.includes('bot') || t.includes('automation bot') || t.includes('selenium')) {
    return {
      src: '/project-screenshots/portfolio-08.webp',
      badgeLabel: 'Selenium Automation Bot',
      badgeType: 'bot',
    };
  }
  if (id.includes('goodness') || t.includes('goodness') || t.includes('sout ul khair')) {
    return {
      src: '/project-screenshots/portfolio-01.webp',
      badgeLabel: 'Welfare Charity Platform',
      badgeType: 'charity',
    };
  }

  return {
    src: project.image || '/project-screenshots/thenobleislam.webp',
    badgeLabel: 'Client Deployment',
    badgeType: 'web',
  };
};

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// The strongest work leads; everything else goes in the compact list below.
const FEATURED_IDS = ['regulatory-monitoring', 'aura-ai', 'aegisone-phishing', 'the-noble-islam'];

const ProjectLinks: React.FC<{ project: Project }> = ({ project }) => (
  <div className="flex items-center gap-3">
    {project.githubUrl && (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-70"
        style={{ color: 'var(--color-body-text)' }}
        aria-label={`${project.title} source code on GitHub`}
      >
        <GithubIcon className="h-4 w-4" />
      </a>
    )}
    {project.liveUrl && (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-70"
        style={{ color: 'var(--color-body-text)' }}
        aria-label={`${project.title} live demo`}
      >
        <ExternalLink className="h-4 w-4" />
      </a>
    )}
  </div>
);

export const Portfolio: React.FC = () => {
  const { projects } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { featured, others } = useMemo(() => {
    const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
      (p): p is Project => Boolean(p)
    );
    const others = projects.filter((p) => !FEATURED_IDS.includes(p.id));
    return { featured, others };
  }, [projects]);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="portfolio-title"
          title="Projects"
          description="Selected work from my roles, internships and university."
        />

        {/* Featured: large image cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project) => {
            const thumb = getCustomProjectThumbnail(project);
            return (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl border transition-colors hover:border-[var(--color-primary-border)]"
                style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="block aspect-[16/9] overflow-hidden bg-neutral-950 text-left"
                  aria-label={`Open details for ${project.title}`}
                >
                  <img
                    src={thumb.src}
                    alt={`${project.title} — project by Ahmed Raza`}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={450}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </button>
                <div className="flex flex-1 flex-col p-6">
                  {project.metrics && (
                    <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                      {project.metrics}
                    </p>
                  )}
                  <h3 className="mt-2 text-xl font-semibold leading-snug" style={{ color: 'var(--color-heading-text)' }}>
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
                    {project.description}
                  </p>
                  <p className="mt-4 text-xs opacity-70" style={{ color: 'var(--color-body-text)' }}>
                    {project.techStack.slice(0, 5).join(' · ')}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      Read case study
                    </button>
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* More projects: compact list */}
        {others.length > 0 && (
          <>
            <h3 className="mt-16 mb-6 text-lg font-semibold" style={{ color: 'var(--color-heading-text)' }}>
              More projects
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((project) => (
                <li
                  key={project.id}
                  className="flex flex-col rounded-2xl border p-5 transition-colors hover:border-[var(--color-primary-border)]"
                  style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-left text-base font-semibold leading-snug hover:underline underline-offset-4"
                      style={{ color: 'var(--color-heading-text)' }}
                    >
                      {project.title}
                    </button>
                    <ProjectLinks project={project} />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
                    {project.description}
                  </p>
                  <p className="mt-auto pt-3 text-xs opacity-70" style={{ color: 'var(--color-body-text)' }}>
                    {project.techStack.slice(0, 4).join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
