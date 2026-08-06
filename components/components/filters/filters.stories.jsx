import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import filtersTemplate from './filters.twig';
import filterTemplate from '../filter/filter.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './filters.yml';
import './filters.source.scss';
// filter.twig includes gesso:icon and uses c-button classes.
import '../icon/icon.stories.jsx';
import '../button/button.stories.jsx';
import componentInfo from './filters.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Filters',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
  parameters: {
    controls: {
      include: ['modifier_classes', 'items'],
    },
  },
};

const Filters = {
  render: args => {
    const items = (args.filters_data || data.filters_data).map(item => {
      return {
        value: filterTemplate({ ...args, ...item }),
      };
    });

    return parse(
      filtersTemplate({
        items,
        ...args,
      })
    );
  },
  args: { ...globalData, ...data },
};

export default settings;
export { Filters };
