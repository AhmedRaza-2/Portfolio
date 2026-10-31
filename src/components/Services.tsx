import React from 'react';
import { Bot, Globe, Cpu, Smartphone, ShieldCheck, Database } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { SectionHeader } from './ui/SectionHeader';

const ICONS: Record<string, React.ElementType> = { Bot, Globe, Cpu, Smartphone, ShieldCheck, Database };

export const Services: React.FC = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="py-20 sm:py-24 border-t"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="services-title"
          title="What I work on"
          description="The areas I build in, across internships, university work and freelance projects."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.iconName] ?? Cpu;
            return (
              <div key={service.id}>
                <Icon className="h-5 w-5" style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold" style={{ color: 'var(--color-heading-text)' }}>
                  {service.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
                  {service.description}
                </p>
                <p className="mt-3 text-xs leading-relaxed opacity-70" style={{ color: 'var(--color-body-text)' }}>
                  {service.tags.join(', ')}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
