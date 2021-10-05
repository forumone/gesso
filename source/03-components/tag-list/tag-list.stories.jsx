import React from 'react';

import twigTemplate from './tag-list.twig';
import data from './tag-list.yml';

const settings = {
  title: 'Components/Tag List',
};

const TagList = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
TagList.args = { ...data };

export default settings;
export { TagList };
