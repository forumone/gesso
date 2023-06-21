import parse from 'html-react-parser';

import accordionTemplate from './accordion.twig';
import accordionItemTemplate from './accordion-item.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './accordion.yml';
import './accordion.scss';
import './accordion.es6';

const settings = {
  title: 'Components/Accordion',
  parameters: {
    controls: {
      include: [
        'modifier_classes',
        'allow_multiple',
      ],
    }
  },
};

const Accordion = args => {
  const accordionItems = (args.accordion_data || data.accordion_data).map(item => accordionItemTemplate(item, args)).join('');

  return (
    parse(accordionTemplate({
      accordion_items: accordionItems,
      ...args,
    }))
  );
}
Accordion.args = { ...globalData, ...data };

export default settings;
export { Accordion };
