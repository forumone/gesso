import React from 'react';

import twigTemplate from './card.twig';
import data from './card.yml';

const settings = {
  title: 'Components/Card',
};

const Default = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
Default.args = { ...data };

const FeatureCard = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
        modifier_classes: 'card--feature',
      }),
    }}
  />
);
FeatureCard.args = { ...data };

export default settings;
export { Default, FeatureCard };
