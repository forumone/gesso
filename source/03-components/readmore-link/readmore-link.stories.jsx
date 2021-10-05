import React from 'react';

import twigTemplate from './readmore-link.twig';
import data from './readmore-link.yml';

const settings = {
  title: 'Components/Read More Link',
};

const ReadMoreLink = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
ReadMoreLink.args = { ...data };

export default settings;
export { ReadMoreLink };
