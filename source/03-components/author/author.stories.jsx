import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './author.twig';
import data from './author.yml';

const settings = {
  title: 'Components/Author',
  decorators: [withGlobalWrapper],
};

const Author = { render: args => parse(twigTemplate(args)), args: { ...data } };

export default settings;
export { Author };
