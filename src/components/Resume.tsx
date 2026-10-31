import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Download,
  Eye,
  FileText,
  Calendar,
  Building2,
  Trophy,
  ExternalLink,
} from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';
import type { TimelineItem } from '../types/portfolio';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { SectionHeader } from './ui/SectionHeader';

/** Vertical timeline: date on the left (desktop), a rail with dots, and the role on the right. */
const Timeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => (
  <ol className="relative max-w-4xl">
    {items.map((item, i) => {
      const isCurrent = /present/i.test(item.period);
      const isLast = i === items.length - 1;
      return (
        <li key={item.id} className="relative grid grid-cols-[20px_1fr] md:grid-cols-[180px_20px_1fr] gap-x-4 md:gap-x-6">
          {/* Date (desktop) */}
          <p
            className="hidden md:block pt-0.5 text-right text-sm"
            style={{ color: isCurrent ? 'var(--color-primary)' : 'var(--color-body-text)', opacity: isCurrent ? 1 : 0.75 }}
          >
            {item.period}
          </p>

          {/* Rail + dot */}
          <div className="relative flex justify-center" aria-hidden="true">
            {!isLast && (
              <span className="absolute top-3 bottom-0 w-px" style={{ backgroundColor: 'var(--color-border-subtle)' }} />
            )}
            <span
              className="relative mt-1.5 h-3 w-3 rounded-full border-2"
              style={{
                borderColor: 'var(--color-primary)',
                backgroundColor: isCurrent ? 'var(--color-primary)' : 'var(--color-page-bg)',
                boxShadow: isCurrent ? '0 0 0 4px var(--color-primary-light)' : undefined,
              }}
            />
          </div>

          {/* Content */}
          <div className={isLast ? 'pb-0' : 'pb-10'}>
            <h3 className="text-lg font-semibold leading-snug" style={{ color: 'var(--color-heading-text)' }}>
              {item.title}
            </h3>
            <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
              {item.organization}
            </p>
            <p className="md:hidden mt-1 text-xs" style={{ color: 'var(--color-body-text)', opacity: 0.75 }}>
              {item.period}
            </p>
            {item.bullets && item.bullets.length > 0 ? (
              <ul className="mt-3 space-y-1.5">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-2.5 text-[15px] leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
                {item.description}
                {item.grade ? ` ${item.grade}.` : ''}
              </p>
            )}
          </div>
        </li>
      );
    })}
  </ol>
);

export const Resume: React.FC = () => {
  const { experience, education, openResumeModal } = usePortfolioData();
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'skills' | 'certifications'>('experience');

  const tabs = [
    { id: 'experience' as const, label: 'Experience', icon: <Briefcase className="w-4 h-4" />, count: experience.length },
    { id: 'education' as const, label: 'Education', icon: <GraduationCap className="w-4 h-4" />, count: education.length },
    { id: 'skills' as const, label: 'Core Skills', icon: <Wrench className="w-4 h-4" /> },
    { id: 'certifications' as const, label: 'Certifications & Awards', icon: <Award className="w-4 h-4" />, count: CERTIFICATIONS.length },
  ];

  return (
    <section
      id="resume"
      aria-labelledby="resume-title"
      className="py-20 sm:py-24 border-t"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="resume-title"
          title="Experience"
          description="Work, education, skills and certifications."
          action={
            <button
              type="button"
              onClick={openResumeModal}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5"
              style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-heading-text)' }}
            >
              <FileText className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
              View résumé
            </button>
          }
        />

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl border max-w-fit" style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive ? 'text-white shadow-xs' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--color-heading-text)',
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Panes */}
        {/* Experience Tab */}
        {activeTab === 'experience' && <Timeline items={experience} />}

        {/* Education Tab */}
        {activeTab === 'education' && <Timeline items={education} />}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b" style={{ color: 'var(--color-heading-text)', borderColor: 'var(--color-border-subtle)' }}>
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                      style={{
                        backgroundColor: 'var(--color-subtle-bg)',
                        borderColor: 'var(--color-border-subtle)',
                        color: 'var(--color-heading-text)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <article
                key={cert.id}
                className="p-6 rounded-2xl border flex items-start gap-4"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: 'var(--color-primary-light)',
                    borderColor: 'var(--color-primary-border)',
                  }}
                >
                  <Award className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--color-heading-text)' }}>
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: 'var(--color-primary)' }}>
                    {cert.issuer} • <span className="text-neutral-400 font-normal">{cert.date}</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {cert.skills.map((sk) => (
                      <span key={sk} className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold mt-3 hover:underline"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
