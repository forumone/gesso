import parse from 'html-react-parser';

import twigTemplate from './overlay-menu.twig';
import data from './overlay-menu.yml';
import './overlay-menu.scss';
import './overlay-menu.es6';
import '../hamburger-button/hamburger-button.scss';

const settings = {
  title: 'Components/Menu/Overlay Menu',
};

const OverlayMenu = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
OverlayMenu.args = { ...data };

export default settings;
export { OverlayMenu };
