import parse from 'html-react-parser';

import twigTemplate from './unordered-list.twig';

const settings = {
  title: 'Global/HTML Elements/Unordered List',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const UnorderedList = () => (
  parse(twigTemplate())
);

export default settings;
export { UnorderedList };
