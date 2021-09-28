import React from 'react';

import twigTemplate from './block.twig';
import data from './block.yml';

const settings = {
  title: 'Components/Block',
};

const Block = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Block.args = { ...data };

export default settings;
export { Block };
