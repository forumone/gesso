import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './views-view.twig';
import data from './views-view.yml';
import pagerTemplate from '../../pager/pager.twig';
import pagerData from '../../pager/pager.yml';

const settings = {
  title: 'Components/Views/View',
};

const View = args => (
  parse(twigTemplate({
    ...args,
    pager: pagerTemplate(pagerData),
  }))
);
View.args = { ...data };

export default settings;
export { View };
