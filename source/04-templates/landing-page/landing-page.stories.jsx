import parse from 'html-react-parser';

import twigTemplate from './landing-page.twig';
import data from './landing-page.yml';

const settings = {
  title: 'Templates/Landing Page',
};

const LandingPage = args => (
  parse(twigTemplate({
    ...args,
  }))
);
LandingPage.args = { ...data };

export default settings;
export { LandingPage };
