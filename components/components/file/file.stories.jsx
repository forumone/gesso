import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './file.twig';
import data from './file.yml';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import './file.source.scss';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../icon-link/icon-link.stories.jsx';
import componentInfo from './file.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/File',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
    icon_name: {
      options: ['download', 'file'],
      control: { type: 'select' },
    },
    file_mime: {
      options: ['application/pdf', 'application/xml', 'text/csv', 'text/plain'],
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
      ],
    },
  },
};

const File = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { File };
