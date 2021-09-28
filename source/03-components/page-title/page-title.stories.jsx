import React from "react";

import twigTemplate from './page-title.twig';
import data from './page-title.yml';

const settings = {
  title: "Components/Page Title",
  argTypes: {
    page_title: {
      type: "string",
      description: "The page title or headline",
      table: {
        defaultValue: {
          summary: "Page Title",
        },
      },
    },
  },
};

const PageTitle = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
PageTitle.args = { ...data };

export default settings;
export { PageTitle };
