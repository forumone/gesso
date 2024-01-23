import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './paragraph.twig';

const settings = {
  title: 'Global/HTML Elements/Paragraph',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Paragraph = { render: () => parse(twigTemplate()) };

export default settings;
export { Paragraph };
