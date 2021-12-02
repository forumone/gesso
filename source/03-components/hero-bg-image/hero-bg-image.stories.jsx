import parse from 'html-react-parser';

import twigTemplate from './hero-bg-image.twig';
import data from './hero-bg-image.yml';
import './hero-bg-image.scss';

const settings = {
  title: 'Components/Hero/Hero with Background Image',
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
    modifier_classes: 'c-hero-bg-image--left',
  }))
);
Left.args = { ...data };

const Right = args => (
  parse(twigTemplate({
    ...args,
    modifier_classes: 'c-hero-bg-image--right',
  }))
);
Right.args = { ...data };

export default settings;
export { Default, Left, Right };
