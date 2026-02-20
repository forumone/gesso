import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './wysiwyg.twig';
import globalData from '../../source/00-config/storybook.global-data.yml';
import './wysiwyg.source';

const settings = {
  title: 'Components/WYSIWYG',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['content'],
    },
  },
};

const WYSIWYG = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { WYSIWYG };
