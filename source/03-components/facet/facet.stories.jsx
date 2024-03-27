import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './facet.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './facet.yml';
import './facet.scss';

const settings = {
  title: 'Components/Facets/Facet',
  decorators: [withGlobalWrapper],
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
