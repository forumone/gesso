import parse from 'html-react-parser';

import twigTemplate from './tag-list.twig';
import data from './tag-list.yml';
import './tag-list.scss';
// Importing Tag to ensure its assets gets loaded in Storybook when this
// story is referenced since Drupal loads them as a library.
import { Tag } from '../tag/tag.stories.jsx';

const settings = {
  title: 'Components/Tag List',
};

const TagList = args => (
  parse(twigTemplate({
    ...args,
  }))
);
TagList.args = { ...data };

export default settings;
export { TagList };
