import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './pager.twig';
import miniTwigTemplate from '../pager-mini/pager-mini.twig';
import data from './pager.yml';
import miniData from '../pager-mini/pager-mini.yml';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import './pager.source.scss';
import '../pager-mini/pager-mini.source.scss';
import componentInfo from './pager.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Pager',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
  parameters: {
    controls: {
      include: [
        'modifier_classes',
        'heading',
        'current',
        'ellipses',
        'pager_items',
      ],
    },
  },
};

const Default = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

const Mini = {
  render: args => parse(miniTwigTemplate(args)),
  args: { ...globalData, ...miniData },
};

export default settings;
export { Default, Mini };
