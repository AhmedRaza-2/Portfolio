import React from 'react';
import { X, ExternalLink, Layers, Sparkles, Check, Flame } from 'lucide-react';
import { Project } from '../types/portfolio';
import { getCustomProjectThumbnail } from './Portfolio';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="project-modal-container"
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 rounded-full">
              {project.category}
            </span>
            {project.featured && (
              <span
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  borderColor: 'var(--color-primary-border)',
                }}
              >
                <Sparkles className="w-3 h-3" />
                Featured Project
              </span>
            )}
            {project.metrics && (
              <span
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  borderColor: 'var(--color-primary-border)',
                }}
              >
                <Flame className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                {project.metrics}
              </span>
            )}
          </div>
          <button
            id="close-project-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors ml-auto cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {(() => {
            const customThumb = getCustomProjectThumbnail(project);
            return (
              <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative">
                <img
                  src={customThumb.src}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('tradeops-invoice.svg')) {
                      target.src = '/project-screenshots/tradeops-invoice.svg';
                    }
                  }}
                />
                {customThumb.badgeLabel && (
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide bg-neutral-950/90 text-neutral-200 border border-neutral-700/80 backdrop-blur-md shadow-md">
                      {customThumb.badgeLabel}
                    </span>
                  </div>
                )}
              </div>
            );
          })()}

          <div>
            <h3 className="text-2xl font-bold text-neutral-900">{project.title}</h3>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Detailed Resume Project Bullets */}
          {project.bullets && project.bullets.length > 0 && (
            <div
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                borderColor: 'var(--color-primary-border)',
              }}
            >
              <h4
                className="text-xs font-bold uppercase tracking-wider mb-2.5"
                style={{ color: 'var(--color-primary)' }}
              >
                Key Accomplishments & Architecture
              </h4>
              <ul className="space-y-2">
                {project.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5 mb-2">
              <Layers className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-800 rounded-md border border-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap gap-3 justify-end">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 shadow-xs transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-xs transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-primary)',
              }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
