<?php

/**
 * @file
 * Gesso theme twig extension for creating a unique ID.
 */
namespace Drupal\gesso_helper\TwigExtension;

use Drupal\Component\Utility\Html;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

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
