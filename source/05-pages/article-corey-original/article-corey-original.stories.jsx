import React from 'react';

import twigTemplate from './article.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './article.yml';

const settings = {
  title: 'Pages/Corey Original/Article',
};

const ArticleCoreyOriginal = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
ArticleCoreyOriginal.args = { ...globalData, ...data };

export default settings;
export { ArticleCoreyOriginal };
