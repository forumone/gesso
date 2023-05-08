import parse from 'html-react-parser';

import twigTemplate from './file.twig';
import data from './file.yml';
import globalData from '../../00-config/storybook.global-data.yml';
import './file.scss';

const settings = {
  title: 'Components/File',
  argTypes: {
    icon_name: {
      options: [
        'download',
        'file',
      ],
      control: { type: 'select' },
    },
    file_mime: {
      options: [
        'application/pdf',
        'application/xml',
        'text/csv',
        'text/plain',
      ],
      control: { type: 'select' },
    },
  },
  parameters: {
    controls: {
      include: [
        'modifier_classes',
        'icon_name',
        'file_name',
        'file_mime',
        'file_size',
      ]
    }
  }
};

const File = args => (
  parse(twigTemplate({
    ...args,
  }))
);
File.args = { ...globalData, ...data };

export default settings;
export { File };
