import React from 'react';

import twigTemplate from './article.twig';
import data from './article.yml';

const settings = {
  title: 'Components/Article',
};

const Article = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Article.args = { ...data };

export default settings;
export { Article };
