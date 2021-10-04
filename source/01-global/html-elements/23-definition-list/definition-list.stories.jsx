import React from 'react';

import twigTemplate from './definition-list.twig';

const settings = {
  title: 'Global/HTML Elements/Definition List',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
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
