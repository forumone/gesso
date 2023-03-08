import parse from 'html-react-parser';

import twigTemplate from './section.twig';
import data from './section.yml';

const settings = {
  title: 'Layouts/Section',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Section = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Section.args = { ...data };

export default settings;
export { Section };
