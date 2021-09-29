import React from 'react';

import twigTemplate from './image-teaser.twig';
import data from './image-teaser.yml';

const settings = {
  title: 'Components/Image Teaser',
};

const ImageTeaser = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
ImageTeaser.args = { ...data };

export default settings;
export { ImageTeaser };
