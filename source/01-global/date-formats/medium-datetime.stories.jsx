import parse from 'html-react-parser';

import twigTemplate from './medium-datetime.twig';
import globalData from '../../00-config/storybook.global-data.yml';

const settings = {
  title: 'Global/Date/Medium Datetime',
  parameters: {
    controls: {
      include: ['month', 'day', 'year', 'hour', 'minute']
    }
  }
};

const MediumDatetime = args => (
  parse(twigTemplate({
    ...args,
  }))
);
MediumDatetime.args = { ...globalData };

export default settings;
export { MediumDatetime };
