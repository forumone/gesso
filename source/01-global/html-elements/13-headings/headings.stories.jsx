import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './headings.twig';

const settings = {
  title: 'Global/HTML Elements/Headings',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Headings = { render: () => parse(twigTemplate()) };

export default settings;
export { Headings };
