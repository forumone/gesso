import parse from 'html-react-parser';

import twigTemplate from './views-view-list.twig';
import data from './views-view-list.yml';

const settings = {
  title: 'Components/Views/List',
};

const List = args => (
  parse(twigTemplate({
    ...args,
  }))
);
List.args = { ...data };

export default settings;
export { List };
