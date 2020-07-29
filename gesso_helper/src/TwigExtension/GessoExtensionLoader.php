<?php

namespace Drupal\gesso_helper\TwigExtension;

/**
 * Load custom twig functions from Pattern Lab.
 */
class GessoExtensionLoader {

  static $functions = [];
  static $filters = [];

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
   * Basic get method.
   */
  public static function getFunctions() {
    return !empty(self::$functions) ? self::$functions : [];
  }

  static public function getFilters() {
    return !empty(self::$filters) ? self::$filters : [];
  }

  static protected function getThemePath() {
    $theme = \Drupal::config('system.theme')->get('default');
    $themeLocation = drupal_get_path('theme', $theme);
    return DRUPAL_ROOT . '/' . $themeLocation . '/';
  }

  static protected function loadAllFunctions() {
    $themePath = self::getThemePath();
    $fullPath = $themePath . 'source/_twig-components/functions/';
    if (is_dir($fullPath)) {
      static::load($fullPath . 'add_attributes.function.drupal.php', self::$functions);
    }
  }

  static protected function loadAllFilters() {
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
   */
  static protected function load($file, &$collection) {
    if (file_exists($file)) {
      include $file;
      $collection[] = $function;
    }
  }

}
