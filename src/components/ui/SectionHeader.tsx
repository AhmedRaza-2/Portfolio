import React from 'react';

interface SectionHeaderProps {
  id?: string;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * Shared heading for every page section, so all sections share one
 * alignment, type scale and spacing.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ id, title, description, action }) => (
  <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="max-w-2xl">
      <h2
        id={id}
        className="text-3xl sm:text-4xl font-bold tracking-tight"
        style={{ color: 'var(--color-heading-text)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--color-body-text)' }}>
          {description}
        </p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
