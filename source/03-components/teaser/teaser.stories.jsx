import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './teaser.twig';
import data from './teaser.yml';
import './teaser.scss';

const settings = {
  title: 'Components/Teaser',
  decorators: [withGlobalWrapper],
};

const Teaser = { render: args => parse(twigTemplate(args)), args: { ...data } };

export default settings;
export { Teaser };
