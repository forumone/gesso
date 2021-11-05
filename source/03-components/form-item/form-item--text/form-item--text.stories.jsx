import React from 'react';
import parse from 'html-react-parser';

import twigTemplate from './form-item--text.twig';
import data from './form-item--text.yml';
import dateData from './form-item--date.yml';
import emailData from './form-item--email.yml';
import numberDecimalData from './form-item--number-decimal.yml';
import numberFloatData from './form-item--number-float.yml';
import numberIntegerData from './form-item--number-integer.yml';
import passwordData from './form-item--password.yml';
import searchData from './form-item--search.yml';
import timeData from './form-item--time.yml';

const settings = {
  title: 'Components/Form Item/Text',
};

const Text = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Text.args = { ...data };

const Date = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Date.args = { ...dateData };

const Email = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Email.args = { ...emailData };

const NumberDecimal = args => (
  parse(twigTemplate({
    ...args,
  }))
);
NumberDecimal.args = { ...numberDecimalData };

const NumberFloat = args => (
  parse(twigTemplate({
    ...args,
  }))
);
NumberFloat.args = { ...numberFloatData };

const NumberInteger = args => (
  parse(twigTemplate({
    ...args,
  }))
);
NumberInteger.args = { ...numberIntegerData };

const Password = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Password.args = { ...passwordData };

const Search = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Search.args = { ...searchData };

const Time = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Time.args = { ...timeData };

export default settings;
export { Text, Date, Email, NumberDecimal, NumberFloat, NumberInteger, Password, Search, Time };
