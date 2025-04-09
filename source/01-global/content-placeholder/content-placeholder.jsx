// Used for to show simple demo content placeholders within style guide.

import React from 'react';

export default function ContentPlaceholder({ children }) {
  return (
    <div
      style={{
        background: 'var(--gesso-text-secondary-color)',
        border: '1px solid var(--gesso-background-color)',
        color: 'var(--gesso-background-color)',
        padding: '1em',
      }}
    >
      {children}
    </div>
  );
}
