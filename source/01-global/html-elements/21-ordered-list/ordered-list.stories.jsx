import parse from 'html-react-parser';

import twigTemplate from './ordered-list.twig';

const settings = {
  title: 'Global/HTML Elements/Ordered List',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const OrderedList = () => (
  parse(twigTemplate())
);

export default settings;
export { OrderedList };
