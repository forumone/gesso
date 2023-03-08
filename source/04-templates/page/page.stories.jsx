import parse from 'html-react-parser';

import twigTemplate from './page.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './page.yml';

const settings = {
  title: 'Templates/Page',
  parameters: {
    controls: {
      include: [
        'title',
        'show_admin_info',
        'show_footer',
        'author_name',
        'date_format',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'content',
      ]
    }
  }
};

const Page = args => (
  parse(twigTemplate(args))
);
Page.args = { ...globalData, ...data };

export default settings;
export { Page };
