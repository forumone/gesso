import parse from 'html-react-parser';

import twigTemplate from './hero-inline-image.twig';
import data from './hero-inline-image.yml';
import './hero-inline-image.scss';

const settings = {
  title: 'Components/Hero/Hero with Inline Image',
};

const Default = args => (
  parse(twigTemplate({
    ...args,
  }))
);
Default.args = { ...data };

const Left = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-hero-inline-image--left',
  }))
);
Left.args = { ...data };

const Right = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-hero-inline-image--right',
  }))
);
Right.args = { ...data };

export default settings;
export { Default, Left, Right };
