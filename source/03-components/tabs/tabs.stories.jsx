import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './tabs.twig';
import data from './tabs.yml';
import './tabs.es6';
import './tabs.scss';

const settings = {
  title: 'Components/Tabs',
  decorators: [withGlobalWrapper],
};

const Tabs = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Tabs.args = { ...data };

export default settings;
export { Tabs };
