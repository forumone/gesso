<?php

namespace Drupal\gesso_helper\TwigExtension;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Gesso theme twig extension for converting a heading level to the next
 * level down.
 */
class SubheadingLevelTwigExtension extends AbstractExtension {
  /**
   * Provide helper name.
   */
  public function getName() {
    return 'gesso_helper_subheading_level';
  }

  /**
   * Add subheading_level Twig filter.
   */
  public function getFilters() {
    $filters = parent::getFilters();
    $filters[] = new TwigFilter('subheading_level', [$this, 'subheadingLevel']);
    return $filters;
  }

  public function subheadingLevel($level) {
    $level = strtolower($level);
    $matches = [];
    if (preg_match('/^h(\\d)$/', $level, $matches)) {
      // Don't go any lower than h6
      $newLevel = min($matches[1] + 1, 6);
      return "h$newLevel";
    }

    // If we got something other than a heading level, return the tag
    // converted to lower-case but otherwise unchanged.
    return $level;
  }
}
