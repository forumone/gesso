import React from "react";

import { siteName } from "../04-components/site-name/site-name.stories";
import siteNameData from "../04-components/site-name/site-name.yaml";
import { Breadcrumb } from "../04-components/breadcrumb/breadcrumb.stories";
import { AccountMenu, MainMenu } from "../04-components/menu/menu.stories";

export default {
  title: "Pages/Article",
};

const article = () => (
  <div>
    {AccountMenu()}
    {siteName(siteNameData)}
    {MainMenu()}
    {Breadcrumb()}
  </div>
);

export { article };
