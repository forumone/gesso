import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './blockquote.twig';
import data from './blockquote.yml';

const settings = {
  title: 'Global/HTML Elements/Blockquote',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Blockquote = { render: () => parse(twigTemplate(data)) };

export default settings;
export { Blockquote };
