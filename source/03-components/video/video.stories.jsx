import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './video.twig';
import data from './video.yml';

const settings = {
  title: 'Components/Video',
};

const Video = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Video.args = { ...data };

export default settings;
export { Video };
