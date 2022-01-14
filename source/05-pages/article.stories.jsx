import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../00-config/storybook.global-data.yml';
import PageWrapper from './page-wrappers/default.jsx';
import twigTemplate from '../04-templates/page/page.twig';
import { FigureRightAligned } from '../03-components/figure/figure.stories.jsx';

export default {
  title: 'Pages/Article',
  parameters: {
    controls: {
      include: [
        'show_admin_info',
      ]
    }
  }
};

// For an example of reusing the same content as the Article component,
// see Page page.
const articleDemoContent = `
  ${ReactDOMServer.renderToStaticMarkup(
    <>{FigureRightAligned(FigureRightAligned.args)}</>
  )}
  <p>You’re the Dread Pirate Roberts, admit it. How many do you think you could
  handle? You mean you wish to surrender to me? Very well, I accept. But how can
  you be sure? Will this do? You truly love each other and so you might have
  been truly happy. Not one couple in a century has that chance, no matter what
  the story books say. And so I think no man in a century will suffer as greatly
  as you will. You only think I guessed wrong! That’s what’s so funny! I
  switched glasses when your back was turned! Ha ha! You fool! You fell victim
  to one of the classic blunders - The most famous of which is “never get
  involved in a land war in Asia” - but only slightly less well-known is this:
  “Never go against a Sicilian when death is on the line!” Ha ha ha ha ha ha ha!
  Ha ha ha ha ha ha ha! Ha ha ha…</p>
  <p>They were both poisoned. I spent the last few years building up an immunity
  to iocane powder. Unless the enemy has studied his Agrippa… which I have.
  Move? You’re alive. If you want I can fly. You just shook your head… doesn’t
  that make you happy? Truly, you have a dizzying intellect. Probably he means
  no *harm*.</p>
  <p>Well, I’m not saying I’d like to build a summer home here, but the trees
  are actually quite lovely. And YOU: friendless, brainless, helpless, hopeless!
  Do you want me to send you back to where you were? Unemployed, in Greenland?
  No, there is too much. Let me sum up. Buttercup is marry Humperdinck in a
  little less than half an hour. So all we have to do is get in, break up the
  wedding, steal the princess, make our escape… after I kill Count Rugen. You
  seem a decent fellow… I hate to kill you. You seem a decent fellow… I hate to
  die. Naturally… but I find that Thibault cancels out Capa Ferro. Don’t you?
  </p>
`;

// For an example of customizing the content block on a demo page,
// see Page.
const articleContent = args => twigTemplate({
  ...args,
  title: 'As You Wish',
  show_footer: true,
  date_format: 'medium-date',
  year: {
    long: '1987',
  },
  month: {
    long: 'October',
  },
  day: {
    short: '9',
  },
  author_name: 'William Goldman',
  content: articleDemoContent,
});

const Article = args => <PageWrapper>{parse(articleContent(args))}</PageWrapper>;
Article.args = {
  ...globalData,
};

export { Article };
