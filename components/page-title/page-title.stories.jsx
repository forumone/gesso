import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './page-title.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Page Title',
  decorators: [withGlobalWrapper],
  argTypes: {
    page_title: {
      type: 'string',
      description: 'The page title or headline',
      table: {
        defaultValue: {
          summary: 'Page Title',
        },
      },
    },
  },
  parameters: {
    controls: {
      include: ['page_title', 'modifier_classes'],
    },
  },
};

const PageTitle = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { PageTitle };
