import React from 'react';

import twigTemplate from './blockquote.twig';
import data from './blockquote.yml';

const settings = {
  title: 'Global/Blockquote',
};

const Blockquote = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...data
      }),
    }}
  />
);

export default settings;
export { Blockquote };
