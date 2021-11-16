import parse from 'html-react-parser';

import twigTemplate from './media.twig';
import data from './media.yml';

const settings = {
  title: 'Layouts/Media',
};

const Media = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Media.args = { ...data };

export default settings;
export { Media };
