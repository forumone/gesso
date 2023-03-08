import parse from 'html-react-parser';

import twigTemplate from './landing-page.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './landing-page.yml';

const settings = {
  title: 'Templates/Landing Page',
  parameters: {
    controls: {
      include: [
        'page_title',
        'show_admin_info',
        'content',
      ]
    }
  }
};

const LandingPage = args => (
  parse(twigTemplate(args))
);
LandingPage.args = { ...globalData, ...data };

export default settings;
export { LandingPage };
