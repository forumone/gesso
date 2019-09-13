<?php

namespace Drupal\gesso_helper\TwigExtension;

/**
 * Load custom twig functions from Pattern Lab.
 */
class GessoExtensionAdapter extends \Twig_Extension {

  /**
   * Constructor that calls the Loader initialization function.
   */
  public function __construct() {
    GessoExtensionLoader::init();
  }

  /**
   * Get the objects variable from GessoExtensionLoader.
   */
  public function getFunctions() {
    return GessoExtensionLoader::get();
  }

}
