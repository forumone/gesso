import parse from 'html-react-parser';

import twigTemplate from './header.twig';
import data from './header.yml';

const settings = {
  title: 'Layouts/Header',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Header = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Header.args = { ...data };

export default settings;
export { Header };
