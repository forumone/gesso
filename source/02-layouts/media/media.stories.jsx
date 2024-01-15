import parse from 'html-react-parser';

import twigTemplate from './media.twig';
import data from './media.yml';

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
        ...args,
        modifier_classes: `${
          is_reversed ? 'l-media--reversed' : ''
        } ${modifier_classes}`.trim(),
      })
    ),
  args: { ...data },
};

export default settings;
export { Media };
