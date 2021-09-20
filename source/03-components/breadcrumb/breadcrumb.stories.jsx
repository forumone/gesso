import React from 'react';

import breadcrumbTwig from './breadcrumb.twig';
import breadcrumbData from './breadcrumb.yml';

export default { title: 'Components/Breadcrumb' };

const Breadcrumb = () => (
  <div dangerouslySetInnerHTML={{ __html: breadcrumbTwig(breadcrumbData) }} />
);

export { Breadcrumb };
