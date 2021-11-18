import parse from 'html-react-parser';

import twigTemplate from './form-item--select.twig';
import selectTemplate from './_select.twig';
import labelTemplate from '../_form-item-label.twig';
import data from './form-item--select.yml';
import withGroupsData from './form-item--select-with-groups.yml';

const settings = {
  title: 'Components/Form Item/Select',
};

const select = args => selectTemplate(args);
const label = args => labelTemplate(args);
const Default = args =>
  parse(
    twigTemplate({
      ...args,
      label: label(args),
      children: select(args),
    })
  );
Default.args = { ...data };

const WithGroups = args =>
  parse(
    twigTemplate({
      ...args,
      label: label(args),
      children: select(args),
    })
  );
WithGroups.args = { ...withGroupsData };

export default settings;
export { Default, WithGroups };
