import parse from 'html-react-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import fieldsetTwigTemplate from '../../fieldset/fieldset.twig';
import twigTemplate from './form-item--checkboxes.twig';
import { Checkbox } from '../form-item--checkbox/form-item--checkbox.stories.jsx';
import data from './form-item--checkboxes.yml';

const settings = {
  title: 'Components/Form Item/Checkboxes',
};

const checkboxesChildren = ReactDOMServer.renderToStaticMarkup(
  <>
    {Checkbox({
      ...Checkbox.args,
      title: 'Choice A',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Choice B',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Choice C',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Choice D',
    })}
  </>
);

const fieldsetChildren = twigTemplate({
  children: checkboxesChildren,
});

const Checkboxes = args =>
  parse(
    fieldsetTwigTemplate({
      ...args,
      modifier_classes: 'fieldset--checkboxes',
      children: fieldsetChildren,
    })
  );
Checkboxes.args = { ...data };

export default settings;
export { Checkboxes };
