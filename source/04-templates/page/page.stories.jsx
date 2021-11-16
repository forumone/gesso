import parse from 'html-react-parser';

import twigTemplate from './page.twig';
import data from './page.yml';

const settings = {
  title: 'Templates/Page',
};

const Page = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Page.args = { ...data };

export default settings;
export { Page };
