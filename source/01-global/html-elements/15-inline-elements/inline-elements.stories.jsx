import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './inline-elements.twig';

const settings = {
  title: 'Global/HTML Elements/Inline Elements',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const InlineElements = { render: () => parse(twigTemplate()) };

export default settings;
export { InlineElements };
