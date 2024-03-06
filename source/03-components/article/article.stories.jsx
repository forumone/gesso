import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators';
import twigTemplate from './article.twig';
import globalData from '../../00-config/storybook.global-data.yml';
import data from './article.yml';
import { Base as LocalTasks } from '../button-group/button-group.stories.jsx';
import { Default as StatusMessage } from '../message/message.stories.jsx';
// Importing components to ensure their assets get loaded in Storybook when they
// get referenced since Drupal loads them as a library.
import { WYSIWYG } from '../wysiwyg/wysiwyg.stories.jsx';

const settings = {
  title: 'Components/Article',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'is_published',
        'title',
        'show_admin_info',
        'show_footer',
        'author_name',
        'date_format',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'content',
      ],
    },
  },
};

const Article = {
  render: args => parse(twigTemplate(args)),
  args: {
    ...globalData,
    admin_info: `
      <div>
        ${ReactDOMServer.renderToStaticMarkup(
          StatusMessage.render(StatusMessage.args)
        )}
        ${ReactDOMServer.renderToStaticMarkup(
          LocalTasks.render({
            ...LocalTasks.args,
            button_group_data: [
              { text: 'View', is_active: true },
              { text: 'Edit' },
              { text: 'Delete' },
              { text: 'Revisions' },
            ],
          })
        )}
      </div>
    `,
    ...data,
  },
};

export default settings;
export { Article };
