import parse from 'html-react-parser';

import twigTemplate from './form-item--checkboxes.twig';
import data from './form-item--checkboxes.yml';

const settings = {
  title: 'Components/Form Item/Checkboxes',
};

const Checkboxes = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Checkboxes.args = { ...data };

export default settings;
export { Checkboxes };
