import parse from 'html-react-parser';

import twigTemplate from './details.twig';
import data from './details.yml';

const settings = {
  title: 'Components/Details',
};

const Details = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Details.args = { ...data };

export default settings;
export { Details };
