import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './read-more-link.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './read-more-link.yml';
// Importing IconLink to ensure its assets gets loaded in Storybook when this
// story is referenced since Drupal loads them as a library.
import '../../components/icon-link/icon-link.stories.jsx';
import './read-more-link.source.scss';
import componentInfo from './read-more-link.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/Read More Link',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo, {
      hideArgs: globalData,
      hide: ['image_path'],
    }),
  },
};

const ReadMoreLink = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { ReadMoreLink };
