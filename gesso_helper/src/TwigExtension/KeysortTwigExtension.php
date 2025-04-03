<?php

namespace Drupal\gesso_helper\TwigExtension;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Gesso theme twig extension for sorting by key.
 */
class KeysortTwigExtension extends AbstractExtension {

  /**
   * Provide helper name.
   */
  public function getName(): string {
    return 'gesso_helper_keysort';
  }

  /**
   * Add keysort Twig filter.
   */
  public function getFilters(): array {
    $filters = parent::getFilters();
    $filters[] = new TwigFilter('keysort', [$this, 'keysort']);
    return $filters;
  }

  /**
   * Sort array by keys.
   */
  public function keysort(array $array): array {
    ksort($array);
    return $array;
  }

}
