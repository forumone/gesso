import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from '../form-item/form-item.twig';
import inputTemplate from './form-item--input.twig';
import labelTemplate from '../form-item--label/form-item--label.twig';
import data from './form-item--radio.yml';
import '../form-item/form-item.source.scss';
import './form-item--radio.source.scss';

const settings = {
  title: 'Components/Form Item/Radio',
  decorators: [withGlobalWrapper],
};

const label = args => labelTemplate({ ...args });
const children = args => inputTemplate({ ...args });
const Radio = {
  render: args =>
    parse(
      twigTemplate({
        ...args,
        label: label(args),
        children: children(args),
      })
    ),
  args: { ...data },
};

export default settings;
export { Radio };
