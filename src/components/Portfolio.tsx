import React, { useState, useMemo } from 'react';
import { ExternalLink, Search, Eye, Flame, MessageSquare, FileSpreadsheet, BarChart3, Activity, ShieldCheck, FileText, Globe, Bot, Cpu, Heart } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { usePortfolioData } from '../context/PortfolioDataContext';

export interface CustomThumbnailInfo {
  src: string;
  badgeLabel?: string;
  badgeType?: 'invoice' | 'dashboard' | 'waveform' | 'security' | 'resume' | 'web' | 'chatbot' | 'bot' | 'charity';
}

export const getCustomProjectThumbnail = (project: Project): CustomThumbnailInfo => {
  const t = (project.title || '').toLowerCase();
  const id = (project.id || '').toLowerCase();

  // 1. Self-generated custom graphical diagrams based on project idea for specialized enterprise/banking workflows
  if (id.includes('regulatory') || t.includes('regulatory') || t.includes('askari')) {
    return {
      src: '/project-screenshots/regulatory-dashboard.svg',
      badgeLabel: 'Regulatory Scraping (Askari)',
      badgeType: 'dashboard',
    };
  }
  if (id.includes('tradeops') || t.includes('tradeops') || t.includes('invoice')) {
    return {
      src: '/project-screenshots/tradeops-invoice.svg',
      badgeLabel: 'TradeOps Invoice Extraction',
      badgeType: 'invoice',
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
      src: '/project-screenshots/thenobleislam.png',
      badgeLabel: 'The Noble Islam Live',
      badgeType: 'web',
    };
  }
  if (id.includes('noble') || t.includes('noble')) {
    return {
      src: '/project-screenshots/nobleplatforms.png',
      badgeLabel: 'Noble Platforms Agency',
      badgeType: 'web',
    };
  }
  if (id.includes('resumify') || t.includes('resumify')) {
    return {
      src: '/project-screenshots/portfolio-02.jpg',
      badgeLabel: 'ATS AI Resume Builder',
      badgeType: 'resume',
    };
  }
  if (id.includes('aegis') || t.includes('aegis') || t.includes('phishing')) {
    return {
      src: '/project-screenshots/portfolio-07.png',
      badgeLabel: 'Outlook Phishing Classifier',
      badgeType: 'security',
    };
  }
  if (id.includes('aura') || t.includes('aura') || t.includes('inara') || t.includes('customer support')) {
    return {
      src: '/project-screenshots/portfolio-09.png',
      badgeLabel: 'URL-to-Chatbot Generator',
      badgeType: 'chatbot',
    };
  }
  if (id.includes('file-encryption') || id.includes('encryption')) {
    return {
      src: '/project-screenshots/portfolio-06.png',
      badgeLabel: 'National CERT Encryption',
      badgeType: 'security',
    };
  }
  if (id.includes('automation-bot') || id.includes('bot') || t.includes('automation bot') || t.includes('selenium')) {
    return {
      src: '/project-screenshots/portfolio-08.png',
      badgeLabel: 'Selenium Automation Bot',
      badgeType: 'bot',
    };
  }
  if (id.includes('goodness') || t.includes('goodness') || t.includes('sout ul khair')) {
    return {
      src: '/project-screenshots/portfolio-01.png',
      badgeLabel: 'Welfare Charity Platform',
      badgeType: 'charity',
    };
  }

  return {
    src: project.image || '/project-screenshots/thenobleislam.png',
    badgeLabel: 'Client Deployment',
    badgeType: 'web',
  };
};

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const Portfolio: React.FC = () => {
  const { projects } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'AI & ML', 'AI & Web', 'Enterprise Automation', 'Mobile Application', 'Web Development', 'Desktop & Tools'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' ||
        project.category === activeCategory ||
        (activeCategory === 'AI & ML' && (project.category === 'AI & Web' || project.category === 'Enterprise Automation'));

      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section
      id="portfolio"
      aria-label="Portfolio & Featured Projects"
      className="py-16 sm:py-20 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-page-bg)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span
            className="text-xs sm:text-sm font-bold uppercase tracking-widest"
            style={{ color: 'var(--color-primary)' }}
          >
            Production Engineering &amp; Client Deployments
          </span>
          <h2
            className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-heading-text)' }}
          >
            Featured Projects &amp; Systems
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Engineered for high reliability: Bank regulatory automation, AI knowledge systems, Flutter applications, and cybersecurity engines.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white shadow-xs font-bold'
                      : 'border opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-card-bg)',
                    borderColor: 'var(--color-border-subtle)',
                    color: isActive ? '#ffffff' : 'var(--color-heading-text)',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="portfolio-search-input"
              type="text"
              placeholder="Filter by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border focus:outline-none transition-colors"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-border-subtle)',
                color: 'var(--color-heading-text)',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl border border-dashed"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            <p className="text-neutral-400 font-medium text-sm">
              No projects found matching "{searchQuery}" in {activeCategory}.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-1.5 text-xs font-semibold cursor-pointer underline"
              style={{ color: 'var(--color-primary)' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const customThumb = getCustomProjectThumbnail(project);
              return (
                <article
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="group rounded-2xl border overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    borderColor: 'var(--color-border-subtle)',
                  }}
                >
                  {/* Project Thumbnail & Quick Action Overlay */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-neutral-950">
                    <img
                      src={customThumb.src}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('thenobleislam.png')) {
                          target.src = '/project-screenshots/thenobleislam.png';
                        }
                      }}
                    />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span
                        className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md shadow-xs border"
                        style={{
                          backgroundColor: 'var(--color-primary-light)',
                          color: 'var(--color-primary)',
                          borderColor: 'var(--color-primary-border)',
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Dynamic Custom Thumbnail Type Badge */}
                    {customThumb.badgeLabel && (
                      <div className="absolute bottom-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-neutral-950/90 text-neutral-200 border border-neutral-700/80 backdrop-blur-md shadow-sm">
                          {customThumb.badgeType === 'invoice' && <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />}
                          {customThumb.badgeType === 'dashboard' && <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />}
                          {customThumb.badgeType === 'waveform' && <Activity className="w-3.5 h-3.5 text-purple-400" />}
                          {customThumb.badgeType === 'security' && <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />}
                          {customThumb.badgeType === 'resume' && <FileText className="w-3.5 h-3.5 text-sky-400" />}
                          {customThumb.badgeType === 'web' && <Globe className="w-3.5 h-3.5 text-amber-400" />}
                          {customThumb.badgeType === 'chatbot' && <Bot className="w-3.5 h-3.5 text-violet-400" />}
                          {customThumb.badgeType === 'bot' && <Cpu className="w-3.5 h-3.5 text-blue-400" />}
                          {customThumb.badgeType === 'charity' && <Heart className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{customThumb.badgeLabel}</span>
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="px-3 py-2 rounded-lg text-xs font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Case Study</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
                          style={{
                            backgroundColor: 'var(--color-primary)',
                          }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Site</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>

                {/* Project Metadata & Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metrics Badge if present */}
                    {project.metrics && (
                      <div className="mb-2">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border"
                          style={{
                            backgroundColor: 'var(--color-primary-light)',
                            color: 'var(--color-primary)',
                            borderColor: 'var(--color-primary-border)',
                          }}
                        >
                          <Flame className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                          <span>{project.metrics}</span>
                        </span>
                      </div>
                    )}

                    <h3
                      className="text-base sm:text-lg font-bold mb-2 transition-colors leading-snug"
                      style={{ color: 'var(--color-heading-text)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Bottom Action Bar */}
                    <div
                      className="pt-3 border-t flex items-center justify-between"
                      style={{ borderColor: 'var(--color-border-subtle)' }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-bold transition-opacity hover:opacity-80 cursor-pointer flex items-center gap-1"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        <span>Full Breakdown</span>
                        <span>&rarr;</span>
                      </button>

                      <div className="flex items-center gap-3">
                        {/* Only render GitHub link if present */}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors"
                            aria-label={`${project.title} GitHub repository`}
                            title="View GitHub Repository"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:opacity-80"
                            style={{ color: 'var(--color-primary)' }}
                            aria-label={`${project.title} Live Demonstration`}
                            title="View Live Demonstration"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
