import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './unordered-list.twig';

const settings = {
  title: 'Global/HTML Elements/Unordered List',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const UnorderedList = { render: () => parse(twigTemplate()) };

export default settings;
export { UnorderedList };
