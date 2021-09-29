import React from 'react';

import twigTemplate from './views-view-unformatted.twig';
import data from './views-view-unformatted.yml';

const settings = {
  title: 'Components/Views/Unformatted',
};

const Unformatted = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Unformatted.args = { ...data };

export default settings;
export { Unformatted };
