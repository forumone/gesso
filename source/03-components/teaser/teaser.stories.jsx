import parse from 'html-react-parser';

import twigTemplate from './teaser.twig';
import data from './teaser.yml';

const settings = {
  title: 'Components/Teaser',
};

const Teaser = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Teaser.args = { ...data };

export default settings;
export { Teaser };
