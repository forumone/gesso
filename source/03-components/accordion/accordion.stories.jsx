import React from 'react';
import parse from 'html-react-parser';

import accordionTemplate from './accordion.twig';
import accordionItemTemplate from '../accordion-item/accordion-item.twig';
import data from './accordion.yml';
import './accordion.es6';

const accordionData = data.accordions;
const accordions = accordionData.map(item => accordionItemTemplate(item)).join('');

const settings = {
  title: 'Components/Accordion'
};

const Accordion = args => (
  parse(accordionTemplate({
    accordion_items: accordions,
    ...args,
  }))
);
Accordion.args = { ...data };

export default settings;
export { Accordion };
