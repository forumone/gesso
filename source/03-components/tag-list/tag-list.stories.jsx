import parse from 'html-react-parser';

import twigTemplate from './tag-list.twig';
import data from './tag-list.yml';
import './tag-list.scss';

const settings = {
  title: 'Components/Tag List',
};

const TagList = args => (
  parse(twigTemplate({
    ...args,
  }))
);
TagList.args = { ...data };

export default settings;
export { TagList };
