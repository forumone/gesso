import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './tag-list.twig';
import data from './tag-list.yml';
import './tag-list.source.scss';
// Importing Tag to ensure its assets gets loaded in Storybook when this
// story is referenced since Drupal loads them as a library.
import '../../source/03-components/tag/tag.stories.jsx';
import componentInfo from './tag-list.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Tag List',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
};

const TagList = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { TagList };
