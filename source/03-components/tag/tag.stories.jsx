import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './tag.twig';
import data from './tag.yml';
import './tag.scss';

const settings = {
  title: 'Components/Tag',
  decorators: [withGlobalWrapper],
};

const Tag = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Tag.args = { ...data };

export default settings;
export { Tag };
