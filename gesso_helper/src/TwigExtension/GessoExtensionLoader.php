<?php

namespace Drupal\gesso_helper\TwigExtension;

/**
 * Load custom twig functions from Pattern Lab.
 */
class GessoExtensionLoader {

  /**
   * Holds all objects provided by all loaded files.
   *
   * @var array
   */
  static public $objects = [];

  /**
   * Calls loader for twig helpers.
   */
  public static function init() {
    if (!self::$objects) {
      static::loadAll();
    }
  }

  /**
   * Basic get method.
   */
  public static function get() {
    return !empty(self::$objects) ? self::$objects : [];
  }

  /**
   * Load all files and templates that extend twig within gesso.
   */
  protected static function loadAll() {
    $theme = \Drupal::config('system.theme')->get('default');
    $themeLocation = drupal_get_path('theme', $theme);
    $themePath = DRUPAL_ROOT . '/' . $themeLocation . '/';
    $fullPath = $themePath . 'source/_twig-components/functions/';
    if (is_dir($fullPath)) {
      static::load($fullPath . 'add_attributes.function.drupal.php');
    }
  }

  /**
   * Load a single twig dependency.
   *
   * @param string $file
   *   A path to a file include.
   */
  protected static function load($file) {
    if (file_exists($file)) {
      include $file;
      self::$objects[] = $function;
    }
  }

}
