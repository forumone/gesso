import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import twigTemplate from '../04-templates/homepage/homepage.twig';
import { Default as HeroBgImage } from '../03-components/hero-bg-image/hero-bg-image.stories.jsx';
import { Default as Card } from '../03-components/card/card.stories.jsx';

export default {
  title: 'Pages/Homepage',
  parameters: {
    controls: {
      include: [
        'show_admin_info',
      ]
    }
  }
};

// You can override the default arguments, as done here, to demo different
// cards. See the Landing Page story for an example of a loop using the same
// card args.
const homepageGridContent = [
  Card({
    ...Card.args,
    title: 'It’s Only a Model',
    media: '<img src="https://picsum.photos/800/600?image=1069" alt="">',
  }),
  Card({
    ...Card.args,
    title: 'Let Us Ride to Camelot',
    media: '<img src="https://picsum.photos/800/600?image=1025" alt="">',
    card_content:
      '<p>Well, we did do the nose. I don’t want to talk to you no more, you ' +
      'empty-headed animal food trough water!</p>',
  }),
  Card({
    ...Card.args,
    title: 'What a Strange Person',
    media: '<img src="https://picsum.photos/800/600?image=1040" alt="">',
  }),
  Card({
    ...Card.args,
    title: 'The Knights Who Say Ni',
    media: '<img src="https://picsum.photos/800/600?image=870" alt="">',
  }),
];

const homepageContent = args => twigTemplate({
  ...args,
  homepage_hero: ReactDOMServer.renderToStaticMarkup(
    <>{HeroBgImage(HeroBgImage.args)}</>
  ),
  homepage_grid_content: ReactDOMServer.renderToStaticMarkup(
    <>{homepageGridContent.map(card => card)}</>
  ),
  homepage_grid_title: 'You Don’t Vote For Kings',
});

const Homepage = args => <PageWrapper>{parse(homepageContent(args))}</PageWrapper>;
Homepage.args = {
  ...globalData,
};

export { Homepage };
