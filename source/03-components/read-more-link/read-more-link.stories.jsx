import parse from 'html-react-parser';

import twigTemplate from './read-more-link.twig';
import data from './read-more-link.yml';
import './read-more-link.scss';

const settings = {
  title: 'Components/Read More Link',
};

const readMoreLink = args => (
  parse(twigTemplate({
    ...args,
  }))
);
readMoreLink.args = { ...data };

export default settings;
export { readMoreLink };
