import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import accordionTemplate from './accordion.twig';
import accordionItemTemplate from './accordion-item.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './accordion.yml';
import './accordion.scss';
import './accordion.es6';

const settings = {
  title: 'Components/Accordion',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['modifier_classes', 'allow_multiple'],
    },
  },
};

const Accordion = {
  render: args => {
    const accordionItems = (args.accordion_data || data.accordion_data)
      .map(item => accordionItemTemplate(item, args))
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

export default settings;
export { Accordion };
