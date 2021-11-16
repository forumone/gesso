import parse from 'html-react-parser';

import twigTemplate from './horizontal-rule.twig';

const settings = {
  title: 'Global/HTML Elements/Horizontal Rule',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const HorizontalRule = () => (
  parse(twigTemplate())
);

export default settings;
export { HorizontalRule };
