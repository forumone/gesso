import parse from 'html-react-parser';

import twigTemplate from './article.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './article.yml';


const settings = {
  title: 'Components/Article',
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

const Article = args => (
  parse(twigTemplate(args))
);
Article.args = { ...globalData, ...data };

export default settings;
export { Article };
