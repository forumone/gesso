import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './content-block.twig';
import data from './content-block.yml';

const settings = {
  title: 'Components/Content Block',
};

const ContentBlock = args => (
  parse(
    twigTemplate({
      ...args,
    })
  )
);
ContentBlock.args = { ...data };

export default settings;
export { ContentBlock };
