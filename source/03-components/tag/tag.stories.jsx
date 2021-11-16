import parse from 'html-react-parser';

import twigTemplate from './tag.twig';
import data from './tag.yml';

const settings = {
  title: 'Components/Tag',
};

const Tag = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Tag.args = { ...data };

export default settings;
export { Tag };
