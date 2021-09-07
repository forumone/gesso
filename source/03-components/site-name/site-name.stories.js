import React from "react";

import siteNameTwig from "./site-name.twig";
import siteNameData from "./site-name.yaml";

export default {
  title: "Components/Site Name",
  argTypes: {
    url: {
      type: "string",
      description: "The URL of the site homepage",
      table: {
        defaultValue: {
          summary: "#",
        },
      },
    },
    site_name: {
      type: "string",
      description: "The site name or title",
      table: {
        defaultValue: {
          summary: "Site Title",
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: "The site title, displayed prominently in the header.",
      },
    },
  },
};

const siteName = (args) => (
  <div
    dangerouslySetInnerHTML={{
      __html: siteNameTwig({
        ...args,
      }),
    }}
  />
);
siteName.args = { ...siteNameData };
export { siteName };
