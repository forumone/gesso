import parse from 'html-react-parser';

import twigTemplate from './author.twig';
import data from './author.yml';

const settings = {
  title: 'Components/Author',
};

const Author = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Author.args = { ...data };

export default settings;
export { Author };
