import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--range.twig';
import data from './form-item--range.yml';

const settings = {
  title: 'Components/Form Item/Range',
};

const Range = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Range.args = { ...data };

export default settings;
export { Range };
