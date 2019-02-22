<?php

namespace Drupal\gesso_helper\TwigExtension;
/**
 * Load custom twig functions from Pattern Lab
 */
class GessoExtensionAdapter extends \Twig_Extension {

  public function __construct() {
    GessoExtensionLoader::init();
  }

  public function getFunctions() {
    return GessoExtensionLoader::get();
  }

}
