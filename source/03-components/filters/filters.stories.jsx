import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import filtersTemplate from './filters.twig';
import filterTemplate from './filter.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './filters.yml';
import './filters.scss';

const settings = {
  title: 'Components/Filters',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['modifier_classes', 'items'],
    },
  },
};

const Filters = {
  render: args => {
    const items = (args.filters_data || data.filters_data)
      .map(item => {
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
