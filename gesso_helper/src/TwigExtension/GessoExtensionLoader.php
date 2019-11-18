<?php

namespace Drupal\gesso_helper\TwigExtension;

/**
 * Load custom twig functions from Pattern Lab
 */
class GessoExtensionLoader {

  static $objects = [];

  static public function init() {
    if (!self::$objects) {
      static::loadAll();
    }
  }

  static public function get() {
    return !empty(self::$objects) ? self::$objects : [];
  }

  static protected function loadAll() {
    $theme = \Drupal::config('system.theme')->get('default');
    $themeLocation = drupal_get_path('theme', $theme);
    $themePath = DRUPAL_ROOT . '/' . $themeLocation . '/';
    $fullPath = $themePath . 'source/_twig-components/functions/';
    if (is_dir($fullPath)) {
      static::load($fullPath . 'add_attributes.function.drupal.php');
    }
  }

  static protected function load($file) {
    if (file_exists($file)) {
      include $file;
      self::$objects[] = $function;
    }
  }

}
