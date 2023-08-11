import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './views-view.twig';
import data from './views-view.yml';
import pagerTemplate from '../../pager/pager.twig';
import pagerData from '../../pager/pager.yml';
import globalData from '../../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Views/View',
  decorators: [withGlobalWrapper],
};

const View = args =>
  parse(
    twigTemplate({
      ...args,
      pager: pagerTemplate({
        ...globalData,
        ...pagerData,
      }),
    })
  );
View.args = { ...data };

export default settings;
export { View };
