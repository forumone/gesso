import React from "react";
import ReactDOMServer from "react-dom/server";

import { SiteName } from "../../03-components/site-name/site-name.stories";
import siteNameData from "../../00-config/storybook.global-data.yml";
import { Breadcrumb } from "../../03-components/breadcrumb/breadcrumb.stories";
import { AccountMenu, MainMenu } from "../../03-components/menu/menu.stories";
import ArticleTwig from "../../04-templates/article-kj-original/article-kj-original.twig";
import { wysiwygContent } from "../../03-components/content-block/content-block.stories";

export default {
  title: "Pages/Article KJ Original",
};

const articleContent = ArticleTwig({
  article_page_title: "Look, I Can Take You as Far as Anchorhead",
  has_footer: true,
  article_content: ReactDOMServer.renderToStaticMarkup(<>{wysiwygContent()}</>),
  article_date: "September 1, 2021",
  article_author: '<a href="#">Forum One</a>',
});

const ArticleKJOiriginal = () => (
  <div>
    {AccountMenu()}
    {SiteName(siteNameData)}
    {MainMenu()}
    {Breadcrumb()}
    <div dangerouslySetInnerHTML={{ __html: articleContent }} />
  </div>
);

export { ArticleKJOiriginal };
