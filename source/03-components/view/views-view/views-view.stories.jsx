import React from 'react';

import twigTemplate from './views-view.twig';
import data from './views-view.yml';

const settings = {
  title: 'Components/Views/View',
};

const View = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
View.args = { ...data };

export default settings;
export { View };
