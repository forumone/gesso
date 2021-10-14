import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './skiplinks.twig';
import data from './skiplinks.yml';

const settings = {
  title: 'Components/Skiplinks',
};

const Skiplinks = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Skiplinks.args = { ...data };

export default settings;
export { Skiplinks };
