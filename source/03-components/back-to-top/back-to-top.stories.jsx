import parse from 'html-react-parser';

import twigTemplate from './back-to-top.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './back-to-top.yml';
import './back-to-top.scss';
import './back-to-top.es6';

const settings = {
  title: 'Components/Back To Top',
  parameters: {
    controls: {
      include: ['is_demo', 'text', 'top_element'],
    },
  },
};

const BackToTop = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
BackToTop.args = { ...globalData, ...data };

export default settings;
export { BackToTop };
