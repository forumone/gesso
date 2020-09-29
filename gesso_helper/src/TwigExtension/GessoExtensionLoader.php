<?php

namespace Drupal\gesso_helper\TwigExtension;

/**
 * Load custom twig functions and filters from Pattern Lab.
 */
class GessoExtensionLoader {

  /**
   * Set of Twig functions.
   *
   * @var array
   */
  public static $functions = [];

  /**
   * Set of Twig filters.
   *
   * @var array
   */
  public static $filters = [];

  /**
   * Calls loader for twig helpers.
   */
  public static function init() {
    if (!self::$functions) {
      static::loadAllFunctions();
    }
    if (!self::$filters) {
      static::loadAllFilters();
    }
  }

  /**
   * Get all Twig functions.
   */
  public static function getFunctions() {
    return !empty(self::$functions) ? self::$functions : [];
  }

  /**
   * Get all Twig filters.
   */
  public static function getFilters() {
    return !empty(self::$filters) ? self::$filters : [];
  }

  /**
   * Get path to the default theme.
   */
  protected static function getThemePath() {
    $theme = \Drupal::config('system.theme')->get('default');
    $themeLocation = drupal_get_path('theme', $theme);
    return DRUPAL_ROOT . '/' . $themeLocation . '/';
  }

  /**
   * Load all Twig functions provided by Pattern Lab.
   */
  protected static function loadAllFunctions() {
    $themePath = self::getThemePath();
    $fullPath = $themePath . 'source/_twig-components/functions/';
    if (is_dir($fullPath)) {
      static::load($fullPath . 'add_attributes.function.drupal.php', self::$functions);
    }
  }

  /**
   * Load all Twig filters provided by Pattern Lab.
   */
  protected static function loadAllFilters() {
    $themePath = self::getThemePath();
    $fullPath = $themePath . 'source/_twig-components/filters/';
    if (is_dir($fullPath)) {
      static::load($fullPath . 'unique_id.filter.drupal.php', self::$filters);
    }
  }

  /**
   * Load a single twig dependency.
   *
   * @param string $file
   *   A path to a file include.
   * @param array $collection
   *   Collection of Twig functions or filters.
   */
  protected static function load($file, array &$collection) {
    $function = NULL;
    if (file_exists($file)) {
      include $file;
      $collection[] = $function;
    }
  }

}
