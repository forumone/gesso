import React from 'react';

import twigTemplate from './views-view.twig';
import data from './views-view.yml';
import pagerTemplate from '../../pager/pager.twig';
import pagerData from '../../pager/pager.yml';

const settings = {
  title: 'Components/Views/View',
};

const View = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        pager: pagerTemplate(pagerData),
      }),
    }}
  />
);
View.args = { ...data };

export default settings;
export { View };
