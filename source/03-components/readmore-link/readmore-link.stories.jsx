import parse from 'html-react-parser';

import twigTemplate from './readmore-link.twig';
import data from './readmore-link.yml';

const settings = {
  title: 'Components/Read More Link',
};

const ReadMoreLink = args => (
  parse(twigTemplate({
    ...args,
  }))
);
ReadMoreLink.args = { ...data };

export default settings;
export { ReadMoreLink };
