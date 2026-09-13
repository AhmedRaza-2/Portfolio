import React from 'react';
import {
  Globe,
  Bot,
  Smartphone,
  ShieldCheck,
  Cpu,
  Database,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
} from 'lucide-react';

interface ServiceValueItem {
  id: string;
  title: string;
  valueProp: string;
  roiBadge: string;
  icon: React.ReactNode;
  tags: string[];
}

export const Services: React.FC = () => {
  const services: ServiceValueItem[] = [
    {
      id: 'automation',
      title: 'Workflow Automation & Web Scraping',
      valueProp: 'Automate heavy manual data harvesting, multi-site monitoring, and invoice extraction. Transforms multi-day repetitive procedures into instant background tasks.',
      roiBadge: 'Cuts 30+ hours/week of manual labor',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      tags: ['Python', 'Selenium', 'Document Parsing', 'SQL Ingestion'],
    },
    {
      id: 'mvp-prod',
      title: 'End-to-End MVP to Production Systems',
      valueProp: 'Full lifecycle architecture from wireframe to cloud deployment. Built cleanly with modern React, Next.js, and TypeScript for immediate customer onboarding.',
      roiBadge: 'Launch in weeks, not months',
      icon: <Globe className="w-5 h-5 text-sky-400" />,
      tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind'],
    },
    {
      id: 'ai-agents',
      title: 'Custom AI Agents & RAG Pipelines',
      valueProp: 'Ground your knowledge base into domain-specific AI bots. Instant website-to-support agents (Aura AI), document retrieval, and sentiment classification.',
      roiBadge: 'Automates 60%+ support inquiries',
      icon: <Bot className="w-5 h-5 text-teal-400" />,
      tags: ['LLMs', 'RAG', 'Vector Embeddings', 'NLP', 'APIs'],
    },
    {
      id: 'mobile-flutter',
      title: 'Cross-Platform Mobile Apps (Flutter)',
      valueProp: 'Single codebase targeting iOS and Android with 60fps native performance, offline synchronization, and frictionless API connectivity.',
      roiBadge: 'Saves 40%+ development cost vs dual-native',
      icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
      tags: ['Flutter', 'Dart', 'iOS & Android', 'State Management'],
    },
    {
      id: 'system-upgrade',
      title: 'Legacy System Upgrades & Database Optimization',
      valueProp: 'Refactor sluggish legacy code, eliminate technical bottlenecks, optimize SQL queries, and implement resilient REST APIs for smooth scaling.',
      roiBadge: 'Up to 5x query & API speedup',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      tags: ['PostgreSQL', 'SSMS', 'REST APIs', 'Indexing', 'Refactoring'],
    },
    {
      id: 'devsecops',
      title: 'Security Hardening & DevSecOps Tools',
      valueProp: 'Protect critical commercial data with cryptographic protocols (AES/RSA), automated phishing defenses for Outlook, and secure CI/CD practices.',
      roiBadge: 'Guaranteed compliance & zero leak record',
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      tags: ['AES / RSA / DES', 'Threat Defense', 'Secure SDLC'],
    },
  ];

  return (
    <section
      id="services"
      aria-label="Services & Client Value"
      className="py-16 sm:py-20 border-y transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-subtle-bg)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span
            className="text-xs sm:text-sm font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border inline-block mb-3"
            style={{
              backgroundColor: 'var(--color-primary-light)',
              borderColor: 'var(--color-primary-border)',
              color: 'var(--color-primary)',
            }}
          >
            Direct Commercial Value &amp; Freelance Delivery
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-heading-text)' }}
          >
            Modern Engineering That Saves Time &amp; Money
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
            Serving clients globally across long-term engagements, enterprise automations, and custom MVP launches. Every service focuses on measurable business outcomes, zero fluff, and production-ready code.
          </p>
        </div>

        {/* Freelance Credibility Highlights Strip */}
        <div
          className="rounded-2xl p-4 sm:p-6 mb-10 border shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 text-left"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderColor: 'var(--color-border-subtle)',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-xl shrink-0"
              style={{ backgroundColor: 'var(--color-primary-light)' }}
            >
              <Users className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <span className="text-sm sm:text-base font-black block text-white">Long-term Freelance</span>
              <span className="text-xs" style={{ color: 'var(--color-body-text)' }}>Trusted across multiple multi-month projects</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-xl shrink-0"
              style={{ backgroundColor: 'var(--color-primary-light)' }}
            >
              <Clock className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <span className="text-sm sm:text-base font-black block text-white">32h &rarr; 10 Mins</span>
              <span className="text-xs" style={{ color: 'var(--color-body-text)' }}>Proven automation efficiency record</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-xl shrink-0"
              style={{ backgroundColor: 'var(--color-primary-light)' }}
            >
              <DollarSign className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <span className="text-sm sm:text-base font-black block text-white">Cost-Saving ROI</span>
              <span className="text-xs" style={{ color: 'var(--color-body-text)' }}>Directly reduces recurring overhead</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-xl shrink-0"
              style={{ backgroundColor: 'var(--color-primary-light)' }}
            >
              <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <span className="text-sm sm:text-base font-black block text-white">MVP to Production</span>
              <span className="text-xs" style={{ color: 'var(--color-body-text)' }}>End-to-end execution without handoff delays</span>
            </div>
          </div>
        </div>

        {/* Compact, High-Density Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item) => (
            <article
              key={item.id}
              id={`service-card-${item.id}`}
              className="rounded-2xl p-5 sm:p-6 border shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-border-subtle)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: 'var(--color-primary-light)',
                      borderColor: 'var(--color-primary-border)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
                    style={{
                      backgroundColor: 'var(--color-primary-light)',
                      borderColor: 'var(--color-primary-border)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {item.roiBadge}
                  </span>
                </div>

                <h3
                  className="text-base sm:text-lg font-bold mb-2 leading-snug"
                  style={{ color: 'var(--color-heading-text)' }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-xs sm:text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--color-body-text)' }}
                >
                  {item.valueProp}
                </p>
              </div>

              <div>
                <div
                  className="flex flex-wrap gap-1.5 pt-3 border-t mb-4"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-semibold rounded-md border"
                      style={{
                        backgroundColor: 'var(--color-subtle-bg)',
                        color: 'var(--color-body-text)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-bold transition-all group-hover:translate-x-1 cursor-pointer"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <span>Free Demo &amp; Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
