import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './facet.twig';
import globalData from '../../source/00-config/storybook.global-data.yml';
import data from './facet.yml';
import './facet.source.scss';
import componentInfo from './facet.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Facets/Facet',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
  parameters: {
    controls: {
      include: [
        'modifier_classes',
        'is_active',
        'title',
        'show_count',
        'count',
      ],
    },
  },
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

const Secondary = {
  ...Default,
  args: {
    ...Default.args,
    modifier_classes: 'c-facet--secondary',
  },
};

export default settings;
export { Default, Secondary };
