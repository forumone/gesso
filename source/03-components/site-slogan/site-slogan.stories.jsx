import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './site-slogan.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Site Slogan',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['url', 'site_slogan', 'modifier_classes'],
    },
  },
};

const SiteSlogan = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { SiteSlogan };
