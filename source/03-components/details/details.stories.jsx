import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './details.twig';
import data from './details.yml';
import './details.scss';

const settings = {
  title: 'Components/Details',
  decorators: [withGlobalWrapper],
};

const Details = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Details.args = { ...data };

export default settings;
export { Details };
