import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import type { Testimonial } from '../types/portfolio';
import { SectionHeader } from './ui/SectionHeader';

// One strong quote leads; four supporting quotes sit beside it.
const FEATURED_ID = 't-3';
const SUPPORTING_IDS = ['t-1', 't-2', 't-8', 't-4'];

const byId = (id: string) => TESTIMONIALS.find((t) => t.id === id);

const Person: React.FC<{ t: Testimonial }> = ({ t }) => (
  <figcaption className="flex items-center gap-3">
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
      style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
    >
      {t.avatarLetter}
    </span>
    <span className="text-sm">
      <span className="block font-semibold" style={{ color: 'var(--color-heading-text)' }}>
        {t.clientName}
      </span>
      <span className="block text-xs" style={{ color: 'var(--color-body-text)' }}>
        {t.clientRole}
      </span>
    </span>
  </figcaption>
);

export const Testimonials: React.FC = () => {
  const featured = byId(FEATURED_ID);
  const supporting = SUPPORTING_IDS.map(byId).filter((t): t is Testimonial => Boolean(t));
  if (!featured) return null;

  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-title"
      className="py-20 sm:py-24 border-t"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="testimonial-title" title="What people say" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured quote */}
          <figure
            className="lg:col-span-5 flex flex-col justify-center rounded-2xl border p-8"
            style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-primary-border)' }}
          >
            <div>
              <Quote className="h-8 w-8" style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <blockquote
                className="mt-6 text-xl sm:text-2xl font-medium leading-snug"
                style={{ color: 'var(--color-heading-text)' }}
              >
                {featured.quote}
              </blockquote>
            </div>
            <div className="mt-8">
              <Person t={featured} />
            </div>
          </figure>

          {/* Supporting quotes */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {supporting.map((t) => (
              <figure
                key={t.id}
                className="flex flex-col justify-between rounded-2xl border p-6"
                style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border-subtle)' }}
              >
                <blockquote className="text-[15px] leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
                  {t.quote}
                </blockquote>
                <div className="mt-5">
                  <Person t={t} />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
