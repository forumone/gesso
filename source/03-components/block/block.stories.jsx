import parse from 'html-react-parser';

import twigTemplate from './block.twig';
import data from './block.yml';

const settings = {
  title: 'Components/Block',
};

const Block = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Block.args = { ...data };

export default settings;
export { Block };
