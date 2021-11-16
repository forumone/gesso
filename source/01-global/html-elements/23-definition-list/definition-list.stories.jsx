import parse from 'html-react-parser';

import twigTemplate from './definition-list.twig';

const settings = {
  title: 'Global/HTML Elements/Definition List',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const DefinitionList = () => (
  parse(twigTemplate())
);

export default settings;
export { DefinitionList };
