import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './form-item--radios.twig';
import data from './form-item--radios.yml';
import { Radio } from '../form-item--radio/form-item--radio.stories.jsx';
import fieldsetTwigTemplate from '../../fieldset/fieldset.twig';

const settings = {
  title: 'Components/Form Item/Radios',
  decorators: [withGlobalWrapper],
};

const radiosChildren = ReactDOMServer.renderToStaticMarkup(
  <>
    {Radio.render({
      ...Radio.args,
      title: 'Choice A',
      id: 'radio-1',
    })}
    {Radio.render({
      ...Radio.args,
      title: 'Choice B',
      id: 'radio-2',
    })}
    {Radio.render({
      ...Radio.args,
      title: 'Choice C',
      id: 'radio-3',
    })}
    {Radio.render({
      ...Radio.args,
      title: 'Choice D',
      id: 'radio-4',
    })}
    {Radio.render({
      ...Radio.args,
      title: 'Disabled Choice',
      is_disabled: true,
      id: 'radio-5',
    })}
  </>
);

const fieldsetChildren = twigTemplate({
  children: radiosChildren,
});

const Radios = {
  render: args =>
    parse(
      fieldsetTwigTemplate({
        ...args,
        modifier_classes: 'c-fieldset--radios',
        children: fieldsetChildren,
      })
    ),
  args: { ...data },
};

export default settings;
export { Radios };
