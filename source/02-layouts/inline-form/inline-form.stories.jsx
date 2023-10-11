import React from 'react'
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import twigTemplate from './inline-form.twig';
import data from './inline-form.yml';
import ContentPlaceholder from '../../01-global/content-placeholder/content-placeholder';

const settings = {
  title: 'Layouts/Inline Form',
  decorators: [
    (Story, {args}) =>
      <Story args={{
        ...args,
        form_content: ReactDOMServer.renderToStaticMarkup(
          <>
            <ContentPlaceholder>Form Item 1</ContentPlaceholder>
            <ContentPlaceholder>Form Item 2</ContentPlaceholder>
            <ContentPlaceholder>Form Item 3</ContentPlaceholder>
            <ContentPlaceholder>Form Item 4</ContentPlaceholder>
          </>
        )
      }} />
  ],
};

const InlineForm = args =>
  parse(
    twigTemplate({
      ...args,
    })
  );
InlineForm.args = { ...data };

export default settings;
export { InlineForm };
