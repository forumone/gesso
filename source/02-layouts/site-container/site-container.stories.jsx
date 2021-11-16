import parse from 'html-react-parser';

import twigTemplate from './site-container.twig';
import data from './site-container.yml';

const settings = {
  title: 'Layouts/Site Container',
  argTypes: {
    is_demo: {
      table: {
        disable: true
      }
    }
  },
};

const SiteContainer = args => (
  parse(twigTemplate({
    ...args,
  }))
);
SiteContainer.args = { ...data };

export default settings;
export { SiteContainer };
