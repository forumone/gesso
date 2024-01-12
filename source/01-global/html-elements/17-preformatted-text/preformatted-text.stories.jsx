import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './preformatted-text.twig';

const settings = {
  title: 'Global/HTML Elements/Preformatted Text',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const PreformattedText = { render: () => parse(twigTemplate()) };

export default settings;
export { PreformattedText };
