import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './pager.twig';
import data from './pager.yml';

const settings = {
  title: 'Components/Pager/Default',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

export default settings;
export { Default };
