<?php

namespace Drupal\gesso_helper\TwigExtension;

/**
 * Load custom twig functions from Pattern Lab.
 */
class GessoExtensionLoader {

  /**
   * Storage of all objects from loaded files.
   *
   * @var array
   */
  static private $objects = [];

  /**
   * Load all objects only once.
   */
  public static function init() {
    if (!self::$objects) {
      static::loadAll();
    }
  }

  /**
   * Provide a getter for the objects array variable.
   */
  public static function get() {
    return !empty(self::$objects) ? self::$objects : [];
  }

  /**
   * Load all php functions from the themes' directory.
   */
  protected static function loadAll() {
    $theme = \Drupal::config('system.theme')->get('default');
    $themeLocation = drupal_get_path('theme', $theme);
    $themePath = DRUPAL_ROOT . '/' . $themeLocation . '/';
    $fullPath = $themePath . 'source/_twig-components/functions/';
    static::load($fullPath . 'add_attributes.function.drupal.php');
  }

  /**
   * Load functions from a file.
   *
   * @param string $file
   *   File path.
   */
  protected static function load($file) {
    include $file;
    self::$objects[] = $function;
  }

}
