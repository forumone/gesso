import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {
  AccountMenu,
  MainMenu,
  FooterMenu,
} from '../../03-components/menu/menu.stories.jsx';
import { SiteName } from '../../03-components/site-name/site-name.stories.jsx';
import siteNameData from '../../00-config/storybook.global-data.yml';
import { Breadcrumb } from '../../03-components/breadcrumb/breadcrumb.stories.jsx';
import FooterTwig from '../../02-layouts/footer/footer.twig';
import { Copyright } from '../../03-components/copyright/copyright.stories.jsx';

const PageWrapper = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <div className="l-site-container">
      {AccountMenu(AccountMenu)}
      {SiteName(siteNameData)}
      {MainMenu()}
      {Breadcrumb(Breadcrumb.args)}
      {children}
      <div
        dangerouslySetInnerHTML={{
          __html: FooterTwig({
            footer_content: ReactDOMServer.renderToStaticMarkup(
              <>
                {FooterMenu()}
                {Copyright(Copyright.args)}
              </>
            ),
          }),
        }}
      />
    </div>
  );
};

export default PageWrapper;
