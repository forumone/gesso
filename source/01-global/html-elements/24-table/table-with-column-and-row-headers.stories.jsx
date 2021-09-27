import React from 'react';

import twigTemplate from './table-with-column-and-row-headers.twig';

const settings = {
  title: 'Global/Table with Column and Row Headers',
};

const TableWithColumnAndRowHeaders = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { TableWithColumnAndRowHeaders };
