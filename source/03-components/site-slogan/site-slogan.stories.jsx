import parse from 'html-react-parser';

import twigTemplate from './site-slogan.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Site Slogan',
  parameters: {
    controls: {
      include: ['url', 'site_slogan', 'modifier_classes']
    }
  }
};

const SiteSlogan = args => (
  parse(twigTemplate({
    ...args,
  }))
);
SiteSlogan.args = { ...globalData };

export default settings;
export { SiteSlogan };
