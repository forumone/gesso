import parse from 'html-react-parser';

import twigTemplate from './inline-elements.twig';

const settings = {
  title: 'Global/HTML Elements/Inline Elements',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const InlineElements = () => (
  parse(twigTemplate())
);

export default settings;
export { InlineElements };
