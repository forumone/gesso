import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './address.twig';

const settings = {
  title: 'Global/HTML Elements/Address',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Address = { render: () => parse(twigTemplate()) };

export default settings;
export { Address };
