import React from "react";

import pageTitleTwig from "./page-title.twig";
import pageTitleData from "./page-title.yml";

export default {
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

const PageTitle = (args) => (
  <div
    dangerouslySetInnerHTML={{
      __html: pageTitleTwig({
        ...pageTitleData,
        ...args,
      }),
    }}
  />
);

export { PageTitle };
