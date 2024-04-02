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
  if (file_exists($active_theme . '/dist/js/common.js')) {
    $libraries['common'] = [
      'js' => [
        'dist/js/common.js' => [],
      ],
    ];
  }
  return $libraries;
}

/**
 * Implements hook_element_info_alter().
 */
function gesso_element_info_alter(array &$types) {
  if (isset($types['gesso_icon_link'])) {
    $types['gesso_icon_link']['#attached']['library'][] = 'gesso/icon_link';
  }
}
