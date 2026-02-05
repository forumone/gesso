import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './views-view.twig';
import data from './views-view.yml';
import { Default as Pager } from '../../pager/pager.stories';

const settings = {
  title: 'Components/Views/View',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      exclude: ['pager'],
    },
  },
};

const View = args => parse(twigTemplate(args));
View.args = {
  ...data,
  pager: ReactDOMServer.renderToStaticMarkup(Pager.render(Pager.args)),
};

export default settings;
export { View };
