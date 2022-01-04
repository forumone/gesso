import parse from 'html-react-parser';

import twigTemplate from './fieldset.twig';
import data from './fieldset.yml';
import formItemData from './fieldset--form-item.yml';

const settings = {
  title: 'Components/Fieldset',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-fieldset--default',
  }))
);
Default.args = { ...data };

const Checkboxes = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-fieldset--checkboxes',
  }))
);
Checkboxes.args = { ...formItemData };

const Radios = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-fieldset--radios',
  }))
);
Radios.args = { ...formItemData };

export default settings;
export { Default, Checkboxes, Radios };
