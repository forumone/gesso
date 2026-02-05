import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './rss-feed.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './rss-feed.yml';
import './rss-feed.scss';
// Importing IconLink to ensure its CSS/JS gets loaded in Storybook when this
// story is referenced.
import { IconLink } from '../icon-link/icon-link.stories.jsx';

const settings = {
  title: 'Components/RSS Feed',
  decorators: [withGlobalWrapper],
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
