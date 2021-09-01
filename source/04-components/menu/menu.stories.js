import React from "react";

import "./menu.scss";
import "./mobile-menu.es6";
import "./primary-menu.es6";

import menuTwig from "./menu.twig";
import menuData from "./menu.yml";
import accountMenuData from "./menu--account.yml";
import mainMenuData from "./menu--main.yml";
import footerMenuData from "./menu--footer.yml";

const meta = {
  title: "Components/Menu",
};

const BasicMenu = () => (
  <div dangerouslySetInnerHTML={{ __html: menuTwig(menuData) }} />
);

const AccountMenu = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: menuTwig({
        ...menuData,
        ...accountMenuData,
      }),
    }}
  />
);

const MainMenu = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: menuTwig({
        ...menuData,
        ...mainMenuData,
      }),
    }}
  />
);

const FooterMenu = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: menuTwig({
        ...menuData,
        ...footerMenuData,
      }),
    }}
  />
);

export default meta;
export { BasicMenu, AccountMenu, MainMenu, FooterMenu };
