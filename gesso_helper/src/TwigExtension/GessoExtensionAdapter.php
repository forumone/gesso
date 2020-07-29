<?php

namespace Drupal\gesso_helper\TwigExtension;

/**
 * Load custom twig functions from Pattern Lab.
 */
class GessoExtensionAdapter extends \Twig_Extension {

  /**
   * GessoExtensionAdapter constructor.
   */
  public function __construct() {
    GessoExtensionLoader::init();
  }

  /**
   * Simple getter.
   */
  public function getFunctions() {
    return GessoExtensionLoader::getFunctions();
  }

  public function getFilters() {
    return GessoExtensionLoader::getFilters();
  }

}
