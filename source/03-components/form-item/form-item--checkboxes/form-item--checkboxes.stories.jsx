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
      id: 'checkbox-1',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Choice B',
      id: 'checkbox-2',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Choice C',
      id: 'checkbox-3',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Choice D',
      id: 'checkbox-4',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Disabled Choice',
      is_disabled: true,
      id: 'checkbox-5',
    })}
    {Checkbox({
      ...Checkbox.args,
      title: 'Disabled Checked Choice',
      is_disabled: true,
      is_checked: true,
      id: 'checkbox-6',
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
      modifier_classes: 'c-fieldset--checkboxes',
      children: fieldsetChildren,
    })
  );
Checkboxes.args = { ...data };

export default settings;
export { Checkboxes };
