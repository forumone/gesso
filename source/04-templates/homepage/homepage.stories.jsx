import parse from 'html-react-parser';

import twigTemplate from './homepage.twig';
import data from './homepage.yml';

const settings = {
  title: 'Templates/Homepage',
};

const Homepage = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Homepage.args = { ...data };

export default settings;
export { Homepage };
