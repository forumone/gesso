import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './hero-bg-image.twig';
import data from './hero-bg-image.yml';
import './hero-bg-image.scss';
import { HeroImage } from '../../01-global/images/hero-image.stories.jsx';

const settings = {
  title: 'Components/Hero/Hero with Background Image',
  decorators: [withGlobalWrapper],
};

const Default = {
  render: args => parse(twigTemplate({
    hero_image:ReactDOMServer.renderToStaticMarkup(
      HeroImage.render({
        ...HeroImage.args,
        ...args,
      }),
    ),
    ...args,
  })),
  args: { ...data },
};

const Left = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'has-content-left',
  },
};

const Right = {
  ...Default,
  args: {
    ...data,
    modifier_classes: 'has-content-right',
  },
};

export default settings;
export { Default, Left, Right };
