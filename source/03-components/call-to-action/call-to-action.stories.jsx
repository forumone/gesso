import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './call-to-action.twig';
import data from './call-to-action.yml';
import './call-to-action.scss';
import { Ratio4x3 as LargeImage } from '../../01-global/images/large-image.stories.jsx';

const settings = {
  title: 'Components/Call To Action',
  decorators: [withGlobalWrapper],
};

const CallToAction = {
  render: args => parse(twigTemplate({
    media: ReactDOMServer.renderToStaticMarkup(
      LargeImage.render({
        ...LargeImage.args,
        ...args,
      }),
    ),
    ...args,
  })),
  args: { ...data },
};

export default settings;
export { CallToAction };
