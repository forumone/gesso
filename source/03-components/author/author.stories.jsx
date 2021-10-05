import React from 'react';

import twigTemplate from './author.twig';
import data from './author.yml';

const settings = {
  title: 'Components/Author',
};

const Author = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Author.args = { ...data };

export default settings;
export { Author };
