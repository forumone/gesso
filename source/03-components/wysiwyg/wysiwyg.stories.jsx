import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './wysiwyg.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/WYSIWYG',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['content'],
    },
  },
};

const WYSIWYG = args => parse(twigTemplate(args));
WYSIWYG.args = { ...globalData };

export default settings;
export { WYSIWYG };
