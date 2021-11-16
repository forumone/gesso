import parse from 'html-react-parser';

import twigTemplate from './tabs.twig';
import data from './tabs.yml';

const settings = {
  title: 'Components/Tabs',
};

const Tabs = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Tabs.args = { ...data };

export default settings;
export { Tabs };
