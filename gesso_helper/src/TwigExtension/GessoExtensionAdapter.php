<?php

namespace Drupal\gesso_helper\TwigExtension;

use Twig_Extension;

/**
 * Load custom twig functions from Pattern Lab.
 */
class GessoExtensionAdapter extends Twig_Extension {

  /**
   * GessoExtensionAdapter constructor.
   */
  public function __construct() {
    GessoExtensionLoader::init();
  }

  /**
   * Get all Twig functions.
   */
  public function getFunctions() {
    return GessoExtensionLoader::getFunctions();
  }

  /**
   * Get all Twig filters.
   */
  public function getFilters() {
    return GessoExtensionLoader::getFilters();
  }

}
