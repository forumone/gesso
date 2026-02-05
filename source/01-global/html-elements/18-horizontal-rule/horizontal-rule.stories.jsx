import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './horizontal-rule.twig';

const settings = {
  title: 'Global/HTML Elements/Horizontal Rule',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const HorizontalRule = { render: () => parse(twigTemplate()) };

export default settings;
export { HorizontalRule };
