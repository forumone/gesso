import React from 'react';

import twigTemplate from './table-with-row-headers.twig';

const settings = {
  title: 'Global/HTML Elements/Table/Table with Row Headers',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const TableWithRowHeaders = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

TableWithRowHeaders.storyName = 'Table with Row Headers';


export default settings;
export { TableWithRowHeaders };
