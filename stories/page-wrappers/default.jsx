import React from 'react';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

import globalData from '../../source/00-config/storybook.global-data.yml';
import RegionTwig from '../../components/layouts/region/region.twig';
import SkiplinksTwig from '../../components/components/skiplinks/skiplinks.twig';
import HeaderTwig from '../../components/layouts/header/header.twig';
import BreadcrumbTwig from '../../components/layouts/breadcrumb-wrapper/breadcrumb-wrapper.twig';
import ContentTwig from '../../components/layouts/content/content.twig';
import FooterTwig from '../../components/layouts/footer/footer.twig';
import { SiteName } from '../../components/components/site-name/site-name.stories.jsx';
import NavTwig from '../../components/layouts/nav/nav.twig';
import { AccountMenu } from '../../components/components/menu-account/menu-account.stories.jsx';
import { DropdownMenu } from '../../components/components/dropdown-menu/dropdown-menu.stories.jsx';
import { Breadcrumb } from '../../components/components/breadcrumb/breadcrumb.stories.jsx';
import { FooterMenu } from '../../components/components/menu-footer/menu-footer.stories.jsx';
import { Copyright } from '../../components/components/copyright/copyright.stories.jsx';
import { BackToTop } from '../../components/components/back-to-top/back-to-top.stories.jsx';
// Twig includes above don't attach SDC libraries — pull CSS directly.
import '../../components/components/skiplinks/skiplinks.source.scss';
import '../../components/layouts/footer/footer.source.scss';

const PageWrapper = props => {
  const { children, isHomepage } = props;
  if (isHomepage) {
    document.body.classList.add('front');
    document.body.classList.remove('not-front');
  } else {
    document.body.classList.add('not-front');
    document.body.classList.remove('front');
  }
  return (
    <>
      {parse(SkiplinksTwig())}
      <div className="l-site-container">
        {parse(
          HeaderTwig({
            has_constrain: true,
            header_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {parse(
                  NavTwig({
                    modifier_classes: 'l-nav--account',
                    label: 'User account menu',
                    nav_content: ReactDOMServer.renderToStaticMarkup(
                      <>{AccountMenu.render(AccountMenu.args)}</>
                    ),
                  })
                )}
                {SiteName.render(globalData)}
              </>
            ),
          })
        )}
        {parse(
          RegionTwig({
            region_name: 'navigation',
            has_constrain: true,
            region_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {parse(
                  NavTwig({
                    modifier_classes: 'l-nav--main',
                    label: 'Main navigation',
                    nav_content: ReactDOMServer.renderToStaticMarkup(
                      <>{DropdownMenu.render(DropdownMenu.args)}</>
                    ),
                  })
                )}
              </>
            ),
          })
        )}
        {parse(
          BreadcrumbTwig({
            has_constrain: false,
            breadcrumb_content: ReactDOMServer.renderToStaticMarkup(
              <>{Breadcrumb.render(Breadcrumb.args)}</>
            ),
          })
        )}
        <main id="main" className="c-main" role="main" tabIndex="-1">
          {parse(
            ContentTwig({
              has_constrain: true,
              content_content: ReactDOMServer.renderToStaticMarkup(
                <>{children}</>
              ),
            })
          )}
        </main>
        {parse(
          FooterTwig({
            has_constrain: true,
            footer_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {parse(
                  NavTwig({
                    modifier_classes: 'l-nav--footer',
                    label: 'Footer menu',
                    nav_content: ReactDOMServer.renderToStaticMarkup(
                      <>{FooterMenu.render(FooterMenu.args)}</>
                    ),
                  })
                )}
                {Copyright.render(Copyright.args)}
              </>
            ),
          })
        )}
      </div>
      {BackToTop.render({
        ...BackToTop.args,
        top_element: 'top',
      })}
    </>
  );
};

export default PageWrapper;
