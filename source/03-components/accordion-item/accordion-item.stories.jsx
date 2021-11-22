import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './accordion-item.twig';
import data from './accordion-item.yml';

const settings = {
  title: 'Components/Accordion Item'
};

const AccordionItem = args => (
  parse(twigTemplate({
    ...args,
  }))
);
AccordionItem.args = { ...data };

export default settings;
export { AccordionItem };
