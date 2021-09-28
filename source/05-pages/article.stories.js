import React from "react";
import ReactDOMServer from "react-dom/server";

import { siteName } from "../03-components/site-name/site-name.stories";
import siteNameData from "../03-components/site-name/site-name.yml";
import { Breadcrumb } from "../03-components/breadcrumb/breadcrumb.stories";
import { AccountMenu, MainMenu } from "../03-components/menu/menu.stories";
import ArticleTwig from "../04-templates/article/article.twig";
import { wysiwygContent } from "../03-components/content-block/content-block.stories";

export default {
  title: "Pages/Article",
};

const articleContent = ArticleTwig({
  article_page_title: "Look, I Can Take You as Far as Anchorhead",
  has_footer: true,
  article_content: ReactDOMServer.renderToStaticMarkup(<>{wysiwygContent()}</>),
  article_date: "September 1, 2021",
  article_author: '<a href="#">Forum One</a>',
});

const Article = () => (
  <div>
    {AccountMenu()}
    {siteName(siteNameData)}
    {MainMenu()}
    {Breadcrumb()}
    <div dangerouslySetInnerHTML={{ __html: articleContent }} />
  </div>
);

export { Article };
