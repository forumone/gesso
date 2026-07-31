import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../source/00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import { LandingPage as Template } from '../components/templates/landing-page/landing-page.stories.jsx';
import { Default as Card } from '../components/components/card/card.stories.jsx';
import { View } from '../components/components/views-view/views-view.stories.jsx';
import { Unformatted } from '../components/components/views-view-unformatted/views-view-unformatted.stories.jsx';
import { ThreeColumn } from '../components/layouts/grid/grid.stories.jsx';

export default {
  title: 'Pages/Landing Page',
  parameters: {
    controls: {
      include: ['is_published', 'show_admin_info'],
    },
  },
};

// You can create a loop to quickly add multiple instances of the same story.
// See the Homepage story for an example of overriding the args for each example.
const rowsContent = [];
for (let i = 1; i <= 12; i += 1) {
  rowsContent.push(Card.render(Card.args));
}

const viewsContent = ReactDOMServer.renderToStaticMarkup(
  Unformatted.render({
    ...Unformatted.args,
    has_constrain: false,
    rows: rowsContent.map(row => ({
      content: ReactDOMServer.renderToStaticMarkup(row),
    })),
  })
);

const gridContent = ReactDOMServer.renderToStaticMarkup(
  ThreeColumn.render({
    ...ThreeColumn.args,
    grid_content: viewsContent,
  })
);

const mainContent = View({
  ...View.args,
  rows: gridContent,
});

const landingPageContent = args =>
  ReactDOMServer.renderToStaticMarkup(
    Template.render({
      ...args,
      admin_info: Template.args.admin_info,
      page_title: 'Great Scott!',
      content: ReactDOMServer.renderToStaticMarkup(mainContent),
    })
  );

const LandingPage = {
  render: args => <PageWrapper>{parse(landingPageContent(args))}</PageWrapper>,
  args: { ...globalData },
};

export { LandingPage };
