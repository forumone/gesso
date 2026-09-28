import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './page-title.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import componentInfo from './page-title.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';
import './page-title.source.scss';

const settings = {
  title: 'Components/Page Title',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
  parameters: {
    controls: {
      include: ['page_title', 'modifier_classes'],
    },
  },
};

const PageTitle = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { PageTitle };
