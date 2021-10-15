import React from "react";
import parse from 'html-react-parser';

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
  parse(menuTwig(menuData))
);

const AccountMenu = () => (
  parse(menuTwig({
    ...menuData,
    ...accountMenuData,
  }))
);

const MainMenu = () => (
  parse(menuTwig({
    ...menuData,
    ...mainMenuData,
  }))
);

const FooterMenu = () => (
  parse(menuTwig({
    ...menuData,
    ...footerMenuData,
  }))
);

export default meta;
export { BasicMenu, AccountMenu, MainMenu, FooterMenu };
