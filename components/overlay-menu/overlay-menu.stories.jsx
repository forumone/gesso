import parse from 'html-react-parser';

import twigTemplate from './overlay-menu.twig';
import data from './overlay-menu.yml';
import './overlay-menu.source.scss';
import './overlay-menu.source.js';
import '../../source/03-components/hamburger-button/hamburger-button.scss';

const settings = {
  title: 'Components/Menu/Overlay Menu',
};

const OverlayMenu = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { OverlayMenu };
