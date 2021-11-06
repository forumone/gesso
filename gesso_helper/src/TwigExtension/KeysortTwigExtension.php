<?php

namespace Drupal\gesso_helper\TwigExtension;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Gesso theme twig extension for sorting by key.
 */
class KeysortTwigExtension extends AbstractExtension {

  /**
   * @inheritdoc
   */
  public function getName() {
    return 'gesso_helper_keysort';
  }

  /**
   *
   */
  public function getFilters() {
    $filters = parent::getFilters();
    $filters[] = new TwigFilter('keysort', [$this, 'keysort']);
    return $filters;
  }

  /**
   *
   */
  public function keysort($array) {
    ksort($array);
    return $array;
  }

}
