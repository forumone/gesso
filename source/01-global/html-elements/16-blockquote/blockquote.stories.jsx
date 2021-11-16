import parse from 'html-react-parser';

import twigTemplate from './blockquote.twig';
import data from './blockquote.yml';

const settings = {
  title: 'Global/HTML Elements/Blockquote',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Blockquote = () => (
  parse(twigTemplate({
    ...data
  }))
);

export default settings;
export { Blockquote };
