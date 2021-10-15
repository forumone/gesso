import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import {
  AccountMenu,
  MainMenu,
  FooterMenu,
} from '../../03-components/menu/menu.stories.jsx';
import { SiteName } from '../../03-components/site-name/site-name.stories.jsx';
import siteNameData from '../../00-config/storybook.global-data.yml';
import { Breadcrumb } from '../../03-components/breadcrumb/breadcrumb.stories.jsx';
import SkiplinksTwig from '../../03-components/skiplinks/skiplinks.twig';
import HeaderTwig from '../../02-layouts/header/header.twig';
import FooterTwig from '../../02-layouts/footer/footer.twig';
import RegionTwig from '../../02-layouts/region/region.twig';
import BreadcrumbTwig from '../../02-layouts/breadcrumb/breadcrumb.twig';
import ContentTwig from '../../02-layouts/content/content.twig';
import { Copyright } from '../../03-components/copyright/copyright.stories.jsx';

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
      <div className="l-site-container">
        {parse(
          HeaderTwig({
            has_constrain: true,
            header_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {AccountMenu(AccountMenu)}
                {SiteName(siteNameData)}
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
                {MainMenu()}
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
            footer_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {FooterMenu()}
                {Copyright(Copyright.args)}
              </>
            ),
          })
        )}
      </div>
    </>
  );
};

export default PageWrapper;
