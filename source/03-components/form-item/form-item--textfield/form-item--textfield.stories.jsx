import parse from 'html-react-parser';

import twigTemplate from './form-item--textfield.twig';
import inputTemplate from './_input.twig';
import labelTemplate from './_form-item-label.twig';
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
};

const Color = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Color.args = { ...colorData };

const Date = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Date.args = { ...dateData };

const Email = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Email.args = { ...emailData };

const File = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
File.args = { ...fileData };

const Month = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Month.args = { ...monthData };

const NumberDecimal = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
NumberDecimal.args = { ...numberDecimalData };

const NumberFloat = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
NumberFloat.args = { ...numberFloatData };

const NumberInteger = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
NumberInteger.args = { ...numberIntegerData };

const Password = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Password.args = { ...passwordData };

const Range = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Range.args = { ...rangeData };

const Search = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Search.args = { ...searchData };

const Telephone = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Telephone.args = { ...telData };

const textChildren = inputTemplate(textData);
const textLabel = labelTemplate(textData);
const Text = args =>
  parse(
    twigTemplate({
      ...args,
      label: textLabel,
      children: textChildren,
    })
  );
Text.args = { ...textData };

const Time = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Time.args = { ...timeData };

const URL = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
URL.args = { ...urlData };

const Week = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
Week.args = { ...weekData };

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
