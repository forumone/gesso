import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './copyright.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Copyright',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['year', 'site_name', 'modifier_classes'],
    },
  },
};

const Copyright = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { Copyright };
