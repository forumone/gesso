import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './details.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './details.yml';
import './details.scss';

const settings = {
  title: 'Components/Details',
  decorators: [withGlobalWrapper],
};

const Details = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData, ...data },
};

export default settings;
export { Details };
