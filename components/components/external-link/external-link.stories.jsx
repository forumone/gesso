import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './external-link.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './external-link.yml';
import './external-link.source';
// The JS injects c-icon markup, so load the icon's assets, matching the
// core/components.gesso--icon dependency in external-link.component.yml.
import '../icon/icon.stories.jsx';
import componentInfo from './external-link.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/External Link',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo, {
      hideArgs: globalData,
      hide: ['is_demo'],
    }),
  },
};

const ExternalLink = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { ExternalLink };
