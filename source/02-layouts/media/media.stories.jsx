import React from 'react';

import twigTemplate from './media.twig';
import data from './media.yml';

const settings = {
  title: 'Layouts/Media',
};

const Media = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Media.args = { ...data };

export default settings;
export { Media };
