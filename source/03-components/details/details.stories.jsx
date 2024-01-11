import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './details.twig';
import data from './details.yml';
import './details.scss';

const settings = {
  title: 'Components/Details',
  decorators: [withGlobalWrapper],
};

const Details = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Details };
