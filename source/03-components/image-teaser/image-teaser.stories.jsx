import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './image-teaser.twig';
import data from './image-teaser.yml';
import './image-teaser.scss';
import { Ratio4x3 as SmallImage } from '../../01-global/images/small-image.stories.jsx';

const settings = {
  title: 'Components/Image Teaser',
  decorators: [withGlobalWrapper],
};

const ImageTeaser = {
  render: args => parse(twigTemplate({
    image: ReactDOMServer.renderToStaticMarkup(
      SmallImage.render({
        ...SmallImage.args,
        ...args,
      }),
    ),
    ...args,
  })),
  args: { ...data },
};

export default settings;
export { ImageTeaser };
