import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './page.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import ContentPlaceholder from '../../../source/01-global/content-placeholder/content-placeholder';
import { MessagesandTabs } from '../messages-and-tabs/messages-and-tabs.stories.jsx';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import '../../components/article/article.stories.jsx';
import componentInfo from './page.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Templates/Page',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo, {
      hideArgs: globalData,
      hide: ['admin_info', 'rdf_metadata'],
    }),
  },
};

const Page = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...globalData,
    admin_info: MessagesandTabs.args.admin_info,
    title: 'Page Title',
    show_footer: true,
    content: ReactDOMServer.renderToStaticMarkup(
      <ContentPlaceholder>Page Content</ContentPlaceholder>
    ),
  },
};

export default settings;
export { Page };
