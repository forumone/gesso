import parse from 'html-react-parser';

import twigTemplate from './region.twig';
import data from './region.yml';

const settings = {
  title: 'Layouts/Region',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const Region = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Region.args = { ...data };

export default settings;
export { Region };
