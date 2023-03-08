import parse from 'html-react-parser';

import twigTemplate from './paragraph.twig';

const settings = {
  title: 'Global/HTML Elements/Paragraph',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Paragraph = () => (
  parse(twigTemplate())
);

export default settings;
export { Paragraph };
