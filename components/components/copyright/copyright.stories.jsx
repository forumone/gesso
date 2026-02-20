import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './copyright.twig';
import globalData from '../../source/00-config/storybook.global-data.yml';
import componentInfo from './copyright.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Copyright',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
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
