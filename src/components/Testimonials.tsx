import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { SectionHeader } from './ui/SectionHeader';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-title"
      className="py-20 sm:py-24 border-t"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="testimonial-title"
          title="What people say"
          description="From clients and colleagues I've worked with."
        />

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.id}
              className="mb-5 break-inside-avoid rounded-2xl border p-6"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-border-subtle)',
              }}
            >
              <blockquote className="text-[15px] leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                >
                  {t.avatarLetter}
                </span>
                <span>
                  <span className="block text-sm font-semibold" style={{ color: 'var(--color-heading-text)' }}>
                    {t.clientName}
                  </span>
                  <span className="block text-xs" style={{ color: 'var(--color-body-text)' }}>
                    {t.clientRole}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
