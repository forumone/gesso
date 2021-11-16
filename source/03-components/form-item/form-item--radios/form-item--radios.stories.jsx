import parse from 'html-react-parser';

import twigTemplate from './form-item--radios.twig';
import data from './form-item--radios.yml';

const settings = {
  title: 'Components/Form Item/Radios',
};

const Radios = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Radios.args = { ...data };

export default settings;
export { Radios };
