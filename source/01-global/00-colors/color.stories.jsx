import parse from 'html-react-parser';

import twigTemplate from './color.twig';
import data from '../../00-config/config.design-tokens.yml';
import './color.scss';

const settings = {
  title: 'Global/Color Palette',
  argTypes: {
    gesso: {
      table: {
        disable: true
      }
    }
  }
};

const ColorPalette = args => (
  parse(twigTemplate({
    ...args,
  }))
);
ColorPalette.args = { ...data };

export default settings;
export { ColorPalette };
