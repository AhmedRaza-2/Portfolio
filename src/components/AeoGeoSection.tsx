import React from 'react';
import { Plus } from 'lucide-react';
import { FAQ } from '../data/faq';
import { SectionHeader } from './ui/SectionHeader';

/** Visible FAQ: answers the questions recruiters and AI search engines ask. */
export const AeoGeoSection: React.FC = () => {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-20 sm:py-24 border-t"
      style={{ borderColor: 'var(--color-border-subtle)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader id="faq-title" title="Questions" />
        <div className="divide-y border-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
          {FAQ.map((item, i) => (
            <details
              key={item.question}
              open={i === 0}
              className="group py-5"
              style={{ borderColor: 'var(--color-border-subtle)' }}
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden"
                style={{ color: 'var(--color-heading-text)' }}
              >
                <h3>{item.question}</h3>
                <Plus
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-45"
                  style={{ color: 'var(--color-primary)' }}
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
