import Twig from "twig";
import { resolve } from "path";
import twigDrupal from "twig-drupal-filters";

import "../dist/css/styles.css";

function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  return twig;
}

setupTwig(Twig);
