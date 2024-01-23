import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './tag.twig';
import data from './tag.yml';
import './tag.scss';

const settings = {
  title: 'Components/Tag',
  decorators: [withGlobalWrapper],
};

const Tag = { render: args => parse(twigTemplate(args)), args: { ...data } };

export default settings;
export { Tag };
