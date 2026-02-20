import parse from 'html-react-parser';

import twigTemplate from './tabs.twig';
import data from './tabs.yml';
import './tabs.source.ts';
import './tabs.source.scss';

const settings = {
  title: 'Components/Tabs',
  argTypes: {
    display: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

const Tabs = args =>
  parse(
    twigTemplate({
      ...args,
    }),
    twigTemplate({
      ...args,
    })
  );
Tabs.args = { ...data };

export default settings;
export { Tabs };
