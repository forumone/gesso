import React from 'react';

import twigTemplate from './file.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/File',
  parameters: {
    controls: {
      include: ['file', 'modifier_classes']
    }
  }
};

const File = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
File.args = { ...globalData };

export default settings;
export { File };
