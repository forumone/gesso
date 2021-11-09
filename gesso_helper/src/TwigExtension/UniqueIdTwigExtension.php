<?php

namespace Drupal\gesso_helper\TwigExtension;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Gesso theme twig extension for creating a unique ID.
 */
class UniqueIdTwigExtension extends AbstractExtension {

  /**
   * @inheritdoc
   */
  public function getName() {
    return 'gesso_helper_unique_id';
  }

  /**
   * @inheritdoc
   */
  public function getFilters() {
    $filters = parent::getFilters();
    $filters[] = new TwigFilter('unique_id', '\Drupal\Component\Utility\Html::getUniqueId');
    return $filters;
  }

}
