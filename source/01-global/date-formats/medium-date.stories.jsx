import parse from 'html-react-parser';

import twigTemplate from './medium-date.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Medium Date',
  parameters: {
    controls: {
      include: ['month', 'day', 'year']
    }
  }
};

const MediumDate = args => (
  parse(twigTemplate({
    ...args,
  }))
);
MediumDate.args = { ...globalData };

export default settings;
export { MediumDate };
