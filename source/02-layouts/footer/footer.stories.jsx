import parse from 'html-react-parser';

import twigTemplate from './footer.twig';
import data from './footer.yml';

const settings = {
  title: 'Layouts/Footer',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Footer = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Footer.args = { ...data };

export default settings;
export { Footer };
