import React from 'react';

import twigTemplate from './thumbnail-image.twig';
import data from './thumbnail-image.yml';

const settings = {
  title: 'Global/Images/Thumbnail Image',
};

const ThumbnailImage = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
ThumbnailImage.args = { ...data };

export default settings;
export { ThumbnailImage };
