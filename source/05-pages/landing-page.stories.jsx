import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import twigTemplate from '../04-templates/landing-page/landing-page.twig';
import { Default as Card } from '../03-components/card/card.stories.jsx';
import viewsTwigTemplate from '../03-components/view/views-view-unformatted/views-view-unformatted.twig';
import gridTwigTemplate from '../02-layouts/grid/grid.twig';
import { View } from '../03-components/view/views-view/views-view.stories.jsx';

export default {
  title: 'Pages/Landing Page',
  parameters: {
    controls: {
      include: [
        'show_admin_info',
      ]
    }
  }
};

// You can create a loop to quickly add multiple instances of the same story.
// See the Homepage story for an example of overriding the args for each example.
const rowsContent = [];
for (let i = 1; i <= 12; i += 1) {
  rowsContent.push(Card(Card.args));
}

const viewsContent = viewsTwigTemplate({
  has_wrapper: false,
  rows: rowsContent.map(row => ({
    content: ReactDOMServer.renderToStaticMarkup(<>{row}</>),
  })),
});

const gridContent = gridTwigTemplate({
  num_of_cols: 3,
  grid_content: viewsContent,
});

const mainContent = View({
  ...View.args,
  rows: gridContent,
});

const landingPageContent = args => twigTemplate({
  ...args,
  page_title: 'Great Scott!',
  content: ReactDOMServer.renderToStaticMarkup(mainContent),
});

const LandingPage = args => (
  <PageWrapper>{parse(landingPageContent(args))}</PageWrapper>
);
LandingPage.args = {
  ...globalData,
};

export { LandingPage };
