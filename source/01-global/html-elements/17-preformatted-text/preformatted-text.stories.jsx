import parse from 'html-react-parser';

import twigTemplate from './preformatted-text.twig';

const settings = {
  title: 'Global/HTML Elements/Preformatted Text',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const PreformattedText = () => (
  parse(twigTemplate())
);

export default settings;
export { PreformattedText };
