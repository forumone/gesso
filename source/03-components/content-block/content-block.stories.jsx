import React from "react";

import contentBlockTwig from "./content-block.twig";
import contentBlockData from "./content-block.yaml";

export default {
  title: "Components/WYSIWYG content",
};

export const wysiwygContent = () => (
  <div
    dangerouslySetInnerHTML={{ __html: contentBlockTwig(contentBlockData) }}
  />
);
