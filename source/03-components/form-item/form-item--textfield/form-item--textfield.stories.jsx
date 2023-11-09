import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from '../form-item.twig';
import inputTemplate from '../_input.twig';
import labelTemplate from '../_form-item-label.twig';
import colorData from './form-item--color.yml';
import dateData from './form-item--date.yml';
import emailData from './form-item--email.yml';
import fileData from './form-item--file.yml';
import monthData from './form-item--month.yml';
import numberDecimalData from './form-item--number-decimal.yml';
import numberFloatData from './form-item--number-float.yml';
import numberIntegerData from './form-item--number-integer.yml';
import passwordData from './form-item--password.yml';
import rangeData from '../form-item--range/form-item--range.yml';
import searchData from './form-item--search.yml';
import telData from './form-item--tel.yml';
import textData from './form-item--text.yml';
import timeData from './form-item--time.yml';
import urlData from './form-item--url.yml';
import weekData from './form-item--week.yml';

const settings = {
  title: 'Components/Form Item/Input',
  decorators: [withGlobalWrapper],
  argTypes: {
    label_display: {
      options: ['before', 'after', 'invisible', 'hidden'],
      control: { type: 'select' },
    },
    description_display: {
      options: ['before', 'after', 'invisible', 'hidden'],
      control: { type: 'select' },
    },
  },
};

const label = args => labelTemplate(args);
const children = args => inputTemplate(args);
const Text = {
  render: args =>
    parse(
      twigTemplate({
        ...args,
        label: label(args),
        children: children(args),
      })
    ),
  args: { ...textData },
};

const Color = {
  ...Text,
  args: { ...colorData },
};

const Date = {
  ...Text,
  args: { ...dateData },
};

const Email = {
  ...Text,
  args: { ...emailData },
};

const File = {
  ...Text,
  args: { ...fileData },
};

const Month = {
  ...Text,
  args: { ...monthData },
};

const NumberDecimal = {
  ...Text,
  args: { ...numberDecimalData },
};

const NumberFloat = {
  ...Text,
  args: { ...numberFloatData },
};

const NumberInteger = {
  ...Text,
  args: { ...numberIntegerData },
};

const Password = {
  ...Text,
  args: { ...passwordData },
};

const Range = {
  ...Text,
  args: { ...rangeData },
};

const Search = {
  ...Text,
  args: { ...searchData },
};

const Telephone = {
  ...Text,
  args: { ...telData },
};

const Time = {
  ...Text,
  args: { ...timeData },
};

const URL = {
  ...Text,
  args: { ...urlData },
};

const Week = {
  ...Text,
  args: { ...weekData },
};

export default settings;
export {
  Color,
  Date,
  Email,
  File,
  Month,
  NumberDecimal,
  NumberFloat,
  NumberInteger,
  Password,
  Range,
  Search,
  Telephone,
  Text,
  Time,
  URL,
  Week,
};
