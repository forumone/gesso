import ReactDom from 'react-dom/client';
import React from 'react';
import ComponentJsx from './Component-jsx';

const root = ReactDom.createRoot(
  document.getElementById('root-ts') as HTMLElement
);

root.render(React.createElement(ComponentJsx));
