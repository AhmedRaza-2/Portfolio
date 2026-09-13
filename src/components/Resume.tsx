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
import { usePortfolioData } from '../context/PortfolioDataContext';

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
      aria-label="Professional Experience, Education and Credentials"
      className="py-16 sm:py-20 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-page-bg)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Quick Action CTAs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div>
            <span
              className="text-xs sm:text-sm font-bold uppercase tracking-widest block mb-1"
              style={{ color: 'var(--color-primary)' }}
            >
              Proven Track Record
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--color-heading-text)' }}
            >
              Experience &amp; Qualifications
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl">
              Production AI deployments at Askari Bank, RAG chatbot engineering at INARA Tech, and continuous open-source contributions.
            </p>
          </div>

          {/* Quick Resume Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openResumeModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <Eye className="w-4 h-4" />
              <span>View Full CV</span>
            </button>

            <button
              type="button"
              onClick={openResumeModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-border-subtle)',
                color: 'var(--color-heading-text)',
              }}
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Compact Highlights Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          <div
            className="p-3.5 rounded-xl border flex items-center gap-3 transition-colors"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
              }}
            >
              500+
            </div>
            <div>
              <p className="text-[11px] text-neutral-400 font-medium">GitHub Activity</p>
              <p className="text-xs sm:text-sm font-bold" style={{ color: 'var(--color-heading-text)' }}>Contributions</p>
            </div>
          </div>

          <div
            className="p-3.5 rounded-xl border flex items-center gap-3 transition-colors"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
              }}
            >
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-neutral-400 font-medium">AI Hackathon</p>
              <p className="text-xs sm:text-sm font-bold" style={{ color: 'var(--color-heading-text)' }}>Vyrothon '26 Finalist</p>
            </div>
          </div>

          <div
            className="p-3.5 rounded-xl border flex items-center gap-3"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-neutral-400 font-medium">Production Internships</p>
              <p className="text-xs sm:text-sm font-bold" style={{ color: 'var(--color-heading-text)' }}>Askari Bank &amp; CERT</p>
            </div>
          </div>

          <div
            className="p-3.5 rounded-xl border flex items-center gap-3"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-neutral-400 font-medium">Credentials</p>
              <p className="text-xs sm:text-sm font-bold" style={{ color: 'var(--color-heading-text)' }}>IBM &amp; Microsoft AI</p>
            </div>
          </div>
        </div>

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
        {activeTab === 'experience' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experience.map((item) => (
              <article
                key={item.id}
                className="p-6 rounded-2xl border flex flex-col justify-between transition-all hover:border-neutral-600"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--color-heading-text)' }}>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                        {item.organization}
                      </p>
                    </div>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-1.5 border-t pt-3" style={{ borderColor: 'var(--color-border-subtle)' }}>
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-xs text-neutral-400 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--color-primary)' }} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item) => (
              <article
                key={item.id}
                className="p-6 rounded-2xl border flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--color-heading-text)' }}>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                        {item.organization}
                      </p>
                    </div>
                    {item.grade && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderColor: 'var(--color-primary-border)' }}>
                        {item.grade}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-1.5 border-t pt-3" style={{ borderColor: 'var(--color-border-subtle)' }}>
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-xs text-neutral-400 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'var(--color-primary)' }} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

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
