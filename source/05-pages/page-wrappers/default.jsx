import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../../00-config/storybook.global-data.yml';
import RegionTwig from '../../02-layouts/region/region.twig';
import SkiplinksTwig from '../../03-components/skiplinks/skiplinks.twig';
import HeaderTwig from '../../02-layouts/header/header.twig';
import BreadcrumbTwig from '../../02-layouts/breadcrumb/breadcrumb.twig';
import ContentTwig from '../../02-layouts/content/content.twig';
import FooterTwig from '../../02-layouts/footer/footer.twig';
import { SiteName } from '../../03-components/site-name/site-name.stories.jsx';
import { AccountMenu } from '../../03-components/menu/menu--account/menu--account.stories.jsx';
import { MainMenu } from '../../03-components/menu/menu--main/menu--main.stories.jsx';
import { Breadcrumb } from '../../03-components/breadcrumb/breadcrumb.stories.jsx';
import { FooterMenu } from '../../03-components/menu/menu--footer/menu--footer.stories.jsx';
import { Copyright } from '../../03-components/copyright/copyright.stories.jsx';
import { BackToTop } from '../../03-components/back-to-top/back-to-top.stories.jsx';

const PageWrapper = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <>
      {parse(
        SkiplinksTwig({
          modifier_classes: false
        })
      )}
      <div className="l-site-container" id="top">
        {parse(
          HeaderTwig({
            has_constrain: true,
            header_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {AccountMenu(AccountMenu.args)}
                {SiteName(globalData)}
              </>
            )
          })
        )}
        {parse(
          RegionTwig({
            region_name: 'navigation',
            has_constrain: true,
            region_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {MainMenu(MainMenu.args)}
              </>
            ),
          })
        )}
        {parse(
          BreadcrumbTwig({
            has_constrain: false,
            breadcrumb_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {Breadcrumb(Breadcrumb.args)}
              </>
            ),
          })
        )}
        <main id="main" className="main" role="main" tabIndex="-1">
          {parse(
            ContentTwig({
              has_constrain: true,
              content_content: ReactDOMServer.renderToStaticMarkup(
                <>
                  {children}
                </>
              ),
            })
          )}
        </main>
        {parse(
          FooterTwig({
            has_constrain: true,
            footer_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {FooterMenu(FooterMenu.args)}
                {Copyright(Copyright.args)}
              </>
            ),
          })
        )}
      </div>
      {BackToTop({
        ...BackToTop.args,
        top_element: 'top'
      })}
    </>
  );
};

export default PageWrapper;
