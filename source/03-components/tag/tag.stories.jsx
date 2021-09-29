import React from 'react';

import twigTemplate from './tag.twig';
import data from './tag.yml';

const settings = {
  title: 'Components/Tag',
};

const Tag = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Tag.args = { ...data };

export default settings;
export { Tag };
