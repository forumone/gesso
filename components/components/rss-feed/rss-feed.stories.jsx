import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../.storybook/decorators.jsx';
import twigTemplate from './rss-feed.twig';
import globalData from '../../source/00-config/storybook.global-data.yml';
import data from './rss-feed.yml';
import './rss-feed.source.scss';
// Importing IconLink to ensure its CSS/JS gets loaded in Storybook when this
// story is referenced.
import { IconLink } from '../../components/icon-link/icon-link.stories.jsx';
import componentInfo from './rss-feed.component.yml';
import getArgTypesFromComponent from '../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/RSS Feed',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
  parameters: {
    controls: {
      include: ['link_text'],
    },
  },
};

const RSSFeed = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { RSSFeed };
