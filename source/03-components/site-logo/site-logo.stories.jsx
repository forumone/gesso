import parse from 'html-react-parser';

import twigTemplate from './site-logo.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Site Logo',
  parameters: {
    controls: {
      include: ['url', 'site_logo', 'modifier_classes']
    }
  }
};

const SiteLogo = args => (
  parse(twigTemplate({
    ...args,
  }))
);
SiteLogo.args = { ...globalData };

export default settings;
export { SiteLogo };
