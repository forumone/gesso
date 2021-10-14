import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './content-block.twig';
import data from './content-block.yml';

const settings = {
  title: 'Components/WYSIWYG Content',
};

const WYSIWYGContent = args => (
  parse(
    twigTemplate({
      ...args,
    })
  )
);
WYSIWYGContent.args = { ...data };

export default settings;
export { WYSIWYGContent };
