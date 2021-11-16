import parse from 'html-react-parser';

import twigTemplate from './address.twig';

const settings = {
  title: 'Global/HTML Elements/Address',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const Address = () => (
  parse(twigTemplate())
);

export default settings;
export { Address };
