import React from "react";

import breadcrumbTwig from "./breadcrumb.twig";
import breacrumbData from "./breadcrumb.yml";

export default { title: "Components/Breadcrumb" };

const Breadcrumb = () => (
  <div dangerouslySetInnerHTML={{ __html: breadcrumbTwig(breacrumbData) }} />
);

export { Breadcrumb };
