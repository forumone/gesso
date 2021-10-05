import React from 'react';

import twigTemplate from './responsive-table.twig';
import data from './responsive-table.yml';

const settings = {
  title: 'Layouts/Responsive Table',
};

const ResponsiveTable = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
ResponsiveTable.args = { ...data };

export default settings;
export { ResponsiveTable };
