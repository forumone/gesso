import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './themes.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from '../../00-config/config.design-tokens.yml';
import './palette.scss';
import './themes.scss';
import { Default as Accordion } from '../../03-components/accordion/accordion.stories';
import {
  Primary as PrimaryButton,
  Secondary as SecondaryButton,
} from '../../03-components/button/button.stories';
import { FacetList } from '../../03-components/facet-list/facet-list.stories';
import { Text as FormItem } from '../../03-components/form-item/form-item--textfield/form-item--textfield.stories';
import { PageTitle } from '../../03-components/page-title/page-title.stories';
import { Default as Pager } from '../../03-components/pager/pager.stories';
import { TagList } from '../../03-components/tag-list/tag-list.stories';
import { WYSIWYG } from '../../03-components/wysiwyg/wysiwyg.stories';

const settings = {
  title: 'Global/Color',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: ['storybook'],
    },
  },
  argTypes: {
    gesso: {
      table: {
        disable: true,
      },
    },
    storybook: {
      table: {
        disable: true,
      },
    },
  },
};

const demoContent = `
  ${ReactDOMServer.renderToStaticMarkup(PageTitle.render(PageTitle.args))}
  ${ReactDOMServer.renderToStaticMarkup(TagList.render(TagList.args))}
  ${ReactDOMServer.renderToStaticMarkup(FormItem.render(FormItem.args))}

  <p>
    ${ReactDOMServer.renderToStaticMarkup(
      PrimaryButton.render({
        ...PrimaryButton.args,
        text: 'Primary Button',
      })
    )}
    ${ReactDOMServer.renderToStaticMarkup(
      PrimaryButton.render({
        ...PrimaryButton.args,
        is_button_tag: false,
        text: 'Primary Link Button',
      })
    )}
    ${ReactDOMServer.renderToStaticMarkup(
      PrimaryButton.render({
        ...PrimaryButton.args,
        is_disabled: true,
        text: 'Disabled Primary Button'
      })
    )}
  </p>

  <p>
    ${ReactDOMServer.renderToStaticMarkup(
      SecondaryButton.render({
        ...SecondaryButton.args,
        text: 'Secondary Button',
      })
    )}
    ${ReactDOMServer.renderToStaticMarkup(
      SecondaryButton.render({
        ...SecondaryButton.args,
        is_button_tag: false,
        text: 'Secondary Link Button',
      })
    )}
    ${ReactDOMServer.renderToStaticMarkup(
      SecondaryButton.render({
        ...SecondaryButton.args,
        is_disabled: true,
        text: 'Disabled Secondary Button'
      })
    )}
  </p>

  ${ReactDOMServer.renderToStaticMarkup(FacetList.render(FacetList.args))}
  ${ReactDOMServer.renderToStaticMarkup(Pager.render(Pager.args))}

  <hr>

  ${ReactDOMServer.renderToStaticMarkup(WYSIWYG.render(WYSIWYG.args))}
`;

const Themes = {
  render: args => parse(twigTemplate({
    ...args,
    demo_content: demoContent,
  })),
  args: { ...globalData, ...data },
};

export default settings;
export { Themes };
