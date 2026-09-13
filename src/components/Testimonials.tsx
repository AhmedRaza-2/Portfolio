import React, { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareCode } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Duplicated list for seamless infinite loop
  const infiniteTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  const scrollManual = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="testimonial"
      aria-label="Client Feedback & Endorsements"
      className="py-14 sm:py-18 transition-colors duration-300 border-t overflow-hidden relative"
      style={{
        backgroundColor: 'var(--color-page-bg)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border inline-block mb-2"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                borderColor: 'var(--color-primary-border)',
                color: 'var(--color-primary)',
              }}
            >
              Verified Client Feedback
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: 'var(--color-heading-text)' }}
            >
              What Clients &amp; Engineering Teams Say
            </h2>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-body-text)' }}>
              Feedback from long-term freelance contracts, enterprise automations, and production launches.
            </p>
          </div>

          {/* Controls & Hover Info */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-[11px] font-semibold text-neutral-400 hidden md:inline-flex items-center gap-1">
              <MessageSquareCode className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
              Auto-scrolling horizontally (Hover to pause)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollManual('left')}
                className="p-2 rounded-xl border transition-colors cursor-pointer hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-heading-text)',
                }}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollManual('right')}
                className="p-2 rounded-xl border transition-colors cursor-pointer hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-heading-text)',
                }}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Scroll Marquee Container */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto no-scrollbar relative"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Soft fade masks on left and right edges */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--color-page-bg), transparent)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, var(--color-page-bg), transparent)',
          }}
        />

        <div className="animate-infinite-scroll flex items-stretch gap-5 px-4 py-2">
          {infiniteTestimonials.map((testimonial, idx) => (
            <article
              key={`${testimonial.id}-${idx}`}
              className="w-[300px] sm:w-[360px] rounded-2xl p-5 sm:p-6 border shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shrink-0 select-none group"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderColor: 'var(--color-border-subtle)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-full text-slate-950 font-black flex items-center justify-center text-sm shadow-xs"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      {testimonial.avatarLetter}
                    </div>
                    <div>
                      <h3
                        className="text-xs sm:text-sm font-bold leading-tight"
                        style={{ color: 'var(--color-heading-text)' }}
                      >
                        {testimonial.clientName}
                      </h3>
                      <p
                        className="text-[11px] font-semibold"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {testimonial.clientRole}
                      </p>
                    </div>
                  </div>
                  <Quote className="w-4 h-4 text-neutral-500 opacity-50" />
                </div>

                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p
                  className="text-xs sm:text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--color-body-text)' }}
                >
                  "{testimonial.quote}"
                </p>
              </div>

              <div
                className="pt-3 border-t flex items-center justify-between"
                style={{ borderColor: 'var(--color-border-subtle)' }}
              >
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: 'var(--color-subtle-bg)',
                    borderColor: 'var(--color-border-subtle)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {testimonial.projectTag}
                </span>

                <span className="text-[10px] text-neutral-400">
                  {testimonial.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
