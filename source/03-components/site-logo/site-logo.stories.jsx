import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './site-logo.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Site Logo',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['url', 'site_logo', 'modifier_classes'],
    },
  },
};

const SiteLogo = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { SiteLogo };
