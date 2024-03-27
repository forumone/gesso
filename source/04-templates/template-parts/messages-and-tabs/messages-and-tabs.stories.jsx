import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../../.storybook/decorators';
import twigTemplate from './messages-and-tabs.twig';
import globalData from '../../../00-config/storybook.global-data.yml';
import { Base as LocalTasks } from '../../../03-components/button-group/button-group.stories.jsx';
import { Default as StatusMessage } from '../../../03-components/message/message.stories.jsx';

const settings = {
  title: 'Templates/Template Sections/Messages and Tabs',
  decorators: [withGlobalWrapper],
  parameters: {
    controls: {
      include: [
        'is_published',
        'show_admin_info',
      ],
    },
  },
};

const MessagesandTabs = {
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
    is_published: false,
    show_admin_info: true,
  },
};

export default settings;
export { MessagesandTabs };
