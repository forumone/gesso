import React from 'react';

import twigTemplate from './progress.twig';
import data from './progress.yml';

const settings = {
  title: 'Components/Progress',
};

const Progress = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Progress.args = { ...data };

export default settings;
export { Progress };
