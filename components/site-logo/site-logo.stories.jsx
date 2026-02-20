import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './site-logo.twig';
import globalData from '../../source/00-config/storybook.global-data.yml';
import componentInfo from './site-logo.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Site Logo',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
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
