import React from 'react';

import twigTemplate from './ordered-list.twig';

const settings = {
  title: 'Global/Ordered List',
};

const OrderedList = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { OrderedList };
