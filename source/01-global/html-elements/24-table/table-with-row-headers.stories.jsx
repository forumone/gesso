import React from 'react';

import twigTemplate from './table-with-row-headers.twig';

const settings = {
  title: 'Global/Table with Row Headers',
};

const TableWithRowHeaders = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { TableWithRowHeaders };
