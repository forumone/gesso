import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './views-view-unformatted.twig';
import data from './views-view-unformatted.yml';

const settings = {
  title: 'Components/Views/Unformatted',
  decorators: [withGlobalWrapper],
};

const Unformatted = {
  render: args => parse(twigTemplate(args)),
  args: { ...data },
};

export default settings;
export { Unformatted };
