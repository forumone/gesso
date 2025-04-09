// Used for to show simple demo content placeholders within style guide.

import React from 'react';

export default function ContentPlaceholder({ children }) {
  return (
    <div
      style={{
        background: 'var(--secondary-text-color)',
        border: '1px solid var(--background-color)',
        color: 'var(--background-color)',
        padding: '1em',
      }}
    >
      {children}
    </div>
  );
}
