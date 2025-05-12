import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import { LandingPage as Template } from '../04-templates/landing-page/landing-page.stories.jsx';
import { Default as Card } from '../03-components/card/card.stories.jsx';
import { View } from '../03-components/view/views-view/views-view.stories.jsx';
import { Unformatted } from '../03-components/view/views-view-unformatted/views-view-unformatted.stories';
import { ThreeColumn } from '../02-layouts/grid/grid.stories';

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
  const photoID = 26 + i;
  rowsContent.push(Card.render({
    ...Card.args,
    img_large_4x3: {
      src: `https://picsum.photos/id/${photoID}/768/576`,
      alt: `Sample photo ${photoID}`,
      height: '576',
      width: '768',
      responsive: {
        1: {
          src: `https://picsum.photos/id/${photoID}/288/216`,
          width: '288',
        },
        2: {
          src: `https://picsum.photos/id/${photoID}/384/288`,
          width: '384',
        },
        3: {
          src: `https://picsum.photos/id/${photoID}/576/432`,
          width: '576',
        },
        4: {
          src: `https://picsum.photos/id/${photoID}/1152/864`,
          width: '1152',
        },
        5: {
          src: `https://picsum.photos/id/${photoID}/1536/1152`,
          width: '1536',
        },
        6: {
          src: `https://picsum.photos/id/${photoID}/2304/1728`,
          width: '2304',
        },
      },
    },
  }));
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
