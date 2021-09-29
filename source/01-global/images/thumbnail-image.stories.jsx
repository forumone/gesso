import React from 'react';

import twigTemplate from './thumbnail-image.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Images/Thumbnail Image',
  parameters: {
    controls: {
      include: ['img_thumbnail', 'modifier_classes']
    }
  }
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
ThumbnailImage.args = { ...globalData };

export default settings;
export { ThumbnailImage };
