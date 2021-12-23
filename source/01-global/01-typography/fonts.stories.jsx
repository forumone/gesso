import parse from 'html-react-parser';

import twigTemplate from './fonts.twig';
import data from '../../00-config/config.design-tokens.yml';
import './fonts.scss';

const settings = {
  title: 'Global/Typography/Fonts',
  argTypes: {
    gesso: {
      table: {
        disable: true
      }
    }
  }
};

const Fonts = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Fonts.args = { ...data };

export default settings;
export { Fonts };
