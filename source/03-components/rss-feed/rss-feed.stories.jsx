import parse from 'html-react-parser';

import twigTemplate from './rss-feed.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './rss-feed.yml';

const settings = {
  title: 'Components/RSS Feed',
};

const RSSFeed = args => (
  parse(twigTemplate({
    ...args,
  }))
);
RSSFeed.args = { ...globalData, ...data };

export default settings;
export { RSSFeed };
