import React from "react";

import twigTemplate from './site-name.twig';
import data from './site-name.yml';

const settings = {
  title: 'Components/Site Name',
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

const SiteName = args => (
  <div
    dangerouslySetInnerHTML={{
      __html: twigTemplate({
        ...args,
      }),
    }}
  />
);
SiteName.args = { ...data };

export default settings;
export { SiteName };
