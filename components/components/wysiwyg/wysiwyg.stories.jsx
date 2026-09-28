import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import twigTemplate from './wysiwyg.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import './wysiwyg.source';
// WYSIWYG wraps bare <table> elements in l-responsive-table.
import '../../layouts/responsive-table/responsive-table.source.scss';
import componentInfo from './wysiwyg.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const settings = {
  title: 'Components/WYSIWYG',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...getArgTypesFromComponent(componentInfo),
  },
  parameters: {
    controls: {
      include: ['content'],
    },
  },
};

const WYSIWYG = {
  render: args => parse(twigTemplate(args)),
  args: { ...globalData },
};

export default settings;
export { WYSIWYG };
