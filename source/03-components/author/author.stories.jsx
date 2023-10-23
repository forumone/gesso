import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './author.twig';
import data from './author.yml';

const settings = {
  title: 'Components/Author',
  decorators: [withGlobalWrapper],
};

const Author = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Author.args = { ...data };

export default settings;
export { Author };
