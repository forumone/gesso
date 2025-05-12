import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import { Homepage as Template } from '../04-templates/homepage/homepage.stories.jsx';
import { Default as HeroBgImage } from '../03-components/hero-bg-image/hero-bg-image.stories.jsx';
import { Default as Card } from '../03-components/card/card.stories.jsx';

export default {
  title: 'Pages/Homepage',
  parameters: {
    controls: {
      include: ['is_published', 'show_admin_info'],
    },
  },
};

// You can override the default arguments, as done here, to demo different
// cards. See the Landing Page story for an example of a loop using the same
// card args.
const homepageGridContent = [
  Card.render({
    ...Card.args,
    title: 'It’s Only a Model',
    img_large_4x3: {
      src: 'https://picsum.photos/id/1040/768/576',
      alt: 'Sample photo 1040',
      height: '576',
      width: '768',
      responsive: {
        1: {
          src: 'https://picsum.photos/id/1040/288/216',
          width: '288',
        },
        2: {
          src: 'https://picsum.photos/id/1040/384/288',
          width: '384',
        },
        3: {
          src: 'https://picsum.photos/id/1040/576/432',
          width: '576',
        },
        4: {
          src: 'https://picsum.photos/id/1040/1152/864',
          width: '1152',
        },
        5: {
          src: 'https://picsum.photos/id/1040/1536/1152',
          width: '1536',
        },
        6: {
          src: 'https://picsum.photos/id/1040/2304/1728',
          width: '2304',
        },
      },
    },
  }),
  Card.render({
    ...Card.args,
    title: 'Let Us Ride to Camelot',
    img_large_4x3: {
      src: 'https://picsum.photos/id/419/768/576',
      alt: 'Sample photo 419',
      height: '576',
      width: '768',
      responsive: {
        1: {
          src: 'https://picsum.photos/id/419/288/216',
          width: '288',
        },
        2: {
          src: 'https://picsum.photos/id/419/384/288',
          width: '384',
        },
        3: {
          src: 'https://picsum.photos/id/419/576/432',
          width: '576',
        },
        4: {
          src: 'https://picsum.photos/id/419/1152/864',
          width: '1152',
        },
        5: {
          src: 'https://picsum.photos/id/419/1536/1152',
          width: '1536',
        },
        6: {
          src: 'https://picsum.photos/id/419/2304/1728',
          width: '2304',
        },
      },
    },
    card_content:
      '<p>Well, we did do the nose. I don’t want to talk to you no more, you ' +
      'empty-headed animal food trough water!</p>',
  }),
  Card.render({
    ...Card.args,
    title: 'What a Strange Person',
    img_large_4x3: {
      src: 'https://picsum.photos/id/1025/768/576',
      alt: 'Sample photo 1040',
      height: '576',
      width: '768',
      responsive: {
        1: {
          src: 'https://picsum.photos/id/1025/288/216',
          width: '288',
        },
        2: {
          src: 'https://picsum.photos/id/1025/384/288',
          width: '384',
        },
        3: {
          src: 'https://picsum.photos/id/1025/576/432',
          width: '576',
        },
        4: {
          src: 'https://picsum.photos/id/1025/1152/864',
          width: '1152',
        },
        5: {
          src: 'https://picsum.photos/id/1025/1536/1152',
          width: '1536',
        },
        6: {
          src: 'https://picsum.photos/id/1025/2304/1728',
          width: '2304',
        },
      },
    },
  }),
  Card.render({
    ...Card.args,
    title: 'The Knights Who Say Ni',
    img_large_4x3: {
      src: 'https://picsum.photos/id/560/768/576',
      alt: 'Sample photo 560',
      height: '576',
      width: '768',
      responsive: {
        1: {
          src: 'https://picsum.photos/id/560/288/216',
          width: '288',
        },
        2: {
          src: 'https://picsum.photos/id/560/384/288',
          width: '384',
        },
        3: {
          src: 'https://picsum.photos/id/560/576/432',
          width: '576',
        },
        4: {
          src: 'https://picsum.photos/id/560/1152/864',
          width: '1152',
        },
        5: {
          src: 'https://picsum.photos/id/560/1536/1152',
          width: '1536',
        },
        6: {
          src: 'https://picsum.photos/id/560/2304/1728',
          width: '2304',
        },
      },
    },
  }),
];

const homepageContent = args =>
  ReactDOMServer.renderToStaticMarkup(
    Template.render({
      ...args,
      admin_info: Template.args.admin_info,
      homepage_hero: ReactDOMServer.renderToStaticMarkup(
        HeroBgImage.render({
          ...HeroBgImage.args,
          img_hero: {
            src: 'https://picsum.photos/id/11/1600/800',
            alt: 'Sample photo 11',
            height: '800',
            width: '1600',
          },
        })
      ),
      homepage_grid_content: ReactDOMServer.renderToStaticMarkup(
        homepageGridContent.map(card => card)
      ),
      homepage_grid_title: 'You Don’t Vote For Kings',
    })
  );


const Homepage = {
  render: args => <PageWrapper isHomepage>{parse(homepageContent(args))}</PageWrapper>,
  args: { ...globalData },
};

export { Homepage };
