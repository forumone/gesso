import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './homepage.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './homepage.yml';

const settings = {
  title: 'Templates/Homepage',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'show_admin_info',
        'hero_image',
        'hero_title',
        'hero_summary',
        'hero_button_text',
        'homepage_grid_title',
        'homepage_grid_content',
      ],
    },
  },
};

const Homepage = args => parse(twigTemplate(args));
Homepage.args = { ...globalData, ...data };

export default settings;
export { Homepage };
