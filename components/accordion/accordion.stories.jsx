import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators';
import accordionTemplate from './accordion.twig';
import accordionItemTemplate from '../accordion-item/accordion-item.twig';
import globalData from '../../source/00-config/storybook.global-data.yml';
import data from './accordion.yml';
import './accordion.source.scss';
import './accordion--step-list.source.scss';
import './accordion.source.js';
import componentInfo from './accordion.component.yml';

const settings = {
  title: 'Components/Accordion',
  decorators: [withGlobalWrapper],
  tags: ['autodocs'],
  argTypes: {
    ...Object.fromEntries(
      Object.entries(componentInfo.props.properties).map(([key, p]) => {
        const argTypeConfig = {};
        if (p.title) {
          argTypeConfig.name = p.title;
        }
        if (p.type) {
          argTypeConfig.type = p.type;
        }
        if (p.description) {
          argTypeConfig.description = p.description;
        }
        argTypeConfig.table = {};
        argTypeConfig.table.category = 'props';
        if (typeof p.default !== 'undefined') {
          argTypeConfig.table.defaultValue = {
            summary: p.default,
          };
        }
        return [key, argTypeConfig];
      })
    ),
    ...Object.fromEntries(
      Object.entries(componentInfo.slots).map(([key, p]) => {
        const argTypeConfig = {};
        if (p.title) {
          argTypeConfig.name = p.title;
        }
        if (p.description) {
          argTypeConfig.description = p.description;
        }
        argTypeConfig.control = false;
        argTypeConfig.table = {};
        argTypeConfig.table.category = 'slots';
        return [key, argTypeConfig];
      })
    ),
  },
  parameters: {
    controls: {
      exclude: [...Object.keys(globalData), 'accordion_data'],
    },
  },
};

const Default = {
  render: args => {
    const accordionItems = (args.accordion_data || data.accordion_data)
      .map(item => accordionItemTemplate({ ...args, ...item }))
      .join('');

    return parse(
      accordionTemplate({
        accordion_items: accordionItems,
        ...args,
      })
    );
  },
  args: { ...globalData, ...data },
};

const StepList = {
  ...Default,
  args: {
    ...Default.args,
    is_step_list: true,
  },
};

export default settings;
export { Default, StepList };
