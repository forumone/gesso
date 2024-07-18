import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './call-to-action.twig';
import data from './call-to-action.yml';
import './call-to-action.scss';

const settings = {
  title: 'Components/Call To Action',
  decorators: [withGlobalWrapper],
};

const CallToAction = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
CallToAction.args = { ...data };

export default settings;
export { CallToAction };
