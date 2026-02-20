import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './site-name.twig';
import globalData from '../../source/00-config/storybook.global-data.yml';
import componentInfo from './site-name.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Site Name',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
  parameters: {
    controls: {
      include: ['site_name', 'url', 'modifier_classes'],
    },
    docs: {
      description: {
        component: 'The site title, displayed prominently in the header.',
      },
    },
  },
};

const SiteName = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { SiteName };
