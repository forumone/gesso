import parse from 'html-react-parser';

import twigTemplate from './nav.twig';
import data from './nav.yml';

const settings = {
  title: 'Layouts/Nav',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Nav = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Nav.args = { ...data };

export default settings;
export { Nav };
