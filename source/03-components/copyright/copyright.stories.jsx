import parse from 'html-react-parser';

import twigTemplate from './copyright.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Components/Copyright',
  parameters: {
    controls: {
      include: ['year', 'site_name', 'modifier_classes']
    }
  }
};

const Copyright = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Copyright.args = { ...globalData };

export default settings;
export { Copyright };
