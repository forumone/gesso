import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './block.twig';
import data from './block.yml';
import './block.source.scss';

const settings = {
  title: 'Components/Block',
  decorators: [withGlobalWrapper],
};

const Block = { render: args => parse(twigTemplate(args)), args: { ...data } };

export default settings;
export { Block };
