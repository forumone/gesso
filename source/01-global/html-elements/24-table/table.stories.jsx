import React from 'react';

import twigTemplate from './table.twig';

const settings = {
  title: 'Global/Table',
};

const Table = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { Table };
