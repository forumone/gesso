// Used for to show simple demo content placeholders within style guide.

import React from 'react';

export default function ContentPlaceholder({ children }) {
  return (
    <div
      style={{
        background: '#333',
        border: '1px solid #fff',
        color: '#fff',
        padding: '1em',
      }}
    >
      {children}
    </div>
  );
}
