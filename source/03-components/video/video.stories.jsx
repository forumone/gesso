import React from 'react';

import twigTemplate from './video.twig';
import data from './video.yml';

const settings = {
  title: 'Components/Video',
};

const Video = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Video.args = { ...data };

export default settings;
export { Video };
