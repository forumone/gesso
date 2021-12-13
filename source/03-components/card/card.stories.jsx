import parse from 'html-react-parser';

import twigTemplate from './card.twig';
import data from './card.yml';

const settings = {
  title: 'Components/Card',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

const FeatureCard = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-card--feature',
  }))
);
FeatureCard.args = { ...data };

export default settings;
export { Default, FeatureCard };
