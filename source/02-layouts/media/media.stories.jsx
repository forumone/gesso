import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './media.twig';
import data from './media.yml';
import { Ratio4x3 as SmallImage } from '../../01-global/images/small-image.stories.jsx';

const settings = {
  title: 'Layouts/Media',
  args: {
    is_reversed: false,
  },
};

const Media = {
  render: ({ is_reversed, modifier_classes, ...args }) =>
    parse(
      twigTemplate({
        modifier_classes: `${
          is_reversed ? 'l-media--reversed' : ''
        } ${modifier_classes}`.trim(),
        media: ReactDOMServer.renderToStaticMarkup(
          SmallImage.render({
            ...SmallImage.args,
            ...data,
          }),
        ),
        ...args,
      })
    ),
  args: { ...data },
};

export default settings;
export { Media };
