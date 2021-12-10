import parse from 'html-react-parser';

import twigTemplate from './wysiwyg.twig';
import data from './wysiwyg.yml';

const settings = {
  title: 'Components/WYSIWYG',
};

const WYSIWYG = args => (
  parse(
    twigTemplate({
      ...args,
    })
  )
);
WYSIWYG.args = { ...data };

export default settings;
export { WYSIWYG };
