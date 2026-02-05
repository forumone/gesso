import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import './dropbutton.es6';
import './dropbutton.scss';
import data from './dropbutton.yml';
import twigTemplate from './dropbutton.twig';

const settings = {
  title: 'Components/Dropbutton',
  decorators: [withGlobalWrapper],
};

const Dropbutton = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...data,
  },
};

export default settings;
export { Dropbutton };
