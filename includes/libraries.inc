<?php

/**
 * @file
 * Library-related hook implementations.
 */

/**
 * Implements hook_library_info_build().
 */
function gesso_library_info_build() {
  $libraries = [];
  $active_theme = \Drupal::theme()->getActiveTheme()->getPath();
  if (file_exists($active_theme . '/js/dist/common.min.js')) {
    $libraries['common'] = [
      'js' => [
        'js/dist/common.min.js' => [],
      ],
    ];
  }
  return $libraries;
}
