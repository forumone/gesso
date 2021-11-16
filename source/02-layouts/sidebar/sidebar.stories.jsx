import parse from 'html-react-parser';

import twigTemplate from './sidebar.twig';
import data from './sidebar.yml';

const settings = {
  title: 'Layouts/Sidebar',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Sidebar = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Sidebar.args = { ...data };

export default settings;
export { Sidebar };
