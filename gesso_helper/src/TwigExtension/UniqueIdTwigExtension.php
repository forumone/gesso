<?php

namespace Drupal\gesso_helper\TwigExtension;

use Drupal\Component\Utility\Crypt;
use Drupal\Component\Utility\Html;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Gesso theme twig extension for creating a unique ID.
 */
class UniqueIdTwigExtension extends AbstractExtension {

  /**
   * Provide helper name.
   */
  public function getName() {
    return 'gesso_helper_unique_id';
  }

  /**
   * Add unique_id Twig filter.
   */
  public function getFilters() {
    $filters = parent::getFilters();
    $filters[] = new TwigFilter('unique_id', [$this, 'uniqueId']);
    return $filters;
  }

  /**
   * Add random string to an ID.
   */
  public function uniqueId($id) {
    return Html::getId($id) . '--' . Crypt::randomBytesBase64(8);
  }

}
