import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './external-link.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './external-link.yml';
import './external-link.es6';

const settings = {
  title: 'Components/External Link',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'url',
        'text',
        'modifier_classes',
      ],
    },
  },
};

const ExternalLink = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { ExternalLink };
