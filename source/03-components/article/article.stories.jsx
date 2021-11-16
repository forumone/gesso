import parse from 'html-react-parser';

import twigTemplate from './article.twig';
import data from './article.yml';

const settings = {
  title: 'Components/Article',
};

const Article = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Article.args = { ...data };

export default settings;
export { Article };
