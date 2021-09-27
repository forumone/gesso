import React from 'react';

import twigTemplate from './definition-list.twig';

const settings = {
  title: 'Global/Definition List',
};

const DefinitionList = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate(),
    }}
  />
);

export default settings;
export { DefinitionList };
