<?php

/**
 * @file
 * Library-related hook implementations.
 */

/**
 * Implements hook_library_info_alter().
 */
function gesso_library_info_alter(&$libraries, $extension) {
  $activeTheme = \Drupal::theme()->getActiveTheme();
  $activeThemePath = $activeTheme->getPath();

  if ($extension === $activeTheme->getName()
  && file_exists($activeThemePath . '/dist/js/common.js')) {
    $libraries['common'] = [
      'js' => [
        'dist/js/common.js' => [],
      ],
    ];

    $libraries['global']['dependencies'][] = $extension . '/common';
  }
}
