import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './homepage.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';
import { HeroImage } from '../../01-global/images/hero-image.stories.jsx';
import '../../03-components/hero-bg-image/hero-bg-image.scss';

const settings = {
  title: 'Templates/Homepage',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'is_published',
        'show_admin_info',
        'hero_image',
        'hero_title',
        'hero_summary',
        'hero_button_text',
        'homepage_grid_title',
        'homepage_grid_content',
      ],
    },
  },
};

const Homepage = args => parse(twigTemplate(args));
Homepage.args = {
  ...globalData,
  hero_image: ReactDOMServer.renderToStaticMarkup(HeroImage(HeroImage.args)),
  hero_title: 'Homepage Hero Title',
  hero_summary: '<p>Homepage Hero Summary Text.</p>',
  hero_button_text: 'Homepage Hero Button Text',
  hero_button_url: '#0',
  homepage_grid_title: 'Homepage Grid Area Title',
  homepage_grid_content: ReactDOMServer.renderToStaticMarkup(<>
    <ContentPlaceholder>Homepage Grid Content</ContentPlaceholder>
    <ContentPlaceholder>Homepage Grid Content</ContentPlaceholder>
  </>)
};

export default settings;
export { Homepage };
