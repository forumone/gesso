import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './block.twig';
import data from './block.yml';
import './block.scss';

const settings = {
  title: 'Components/Block',
  decorators: [withGlobalWrapper],
};

const Block = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Block.args = { ...data };

export default settings;
export { Block };
