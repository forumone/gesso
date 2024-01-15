import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './ordered-list.twig';

const settings = {
  title: 'Global/HTML Elements/Ordered List',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const OrderedList = { render: () => parse(twigTemplate()) };

export default settings;
export { OrderedList };
