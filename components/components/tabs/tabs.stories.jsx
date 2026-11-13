import parse from 'html-react-parser';

import twigTemplate from './tabs.twig';
import data from './tabs.yml';
import './tabs.source.ts';
import './tabs.source.scss';
import componentInfo from './tabs.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const baseArgTypes = getArgTypesFromComponent(componentInfo);

const settings = {
  title: 'Components/Tabs',
  argTypes: {
    ...baseArgTypes,
    display: {
      ...baseArgTypes.display,
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
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
