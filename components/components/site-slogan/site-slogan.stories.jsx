import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './site-slogan.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import componentInfo from './site-slogan.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';
import './site-slogan.source.scss';

const settings = {
  title: 'Components/Site Slogan',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
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
