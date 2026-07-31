<?php

/**
 * @file
 * Library-related hook implementations.
 */

/**
 * Implements hook_library_info_alter().
 */
function gesso_library_info_alter(array &$libraries, string $extension): void {
  if ($extension !== 'gesso') {
    return;
  }

  // Stop Webpack/Terser output from passing through Drupal JS aggregation.
  foreach ($libraries as &$library) {
    if (empty($library['js'])) {
      continue;
    }
    foreach ($library['js'] as $path => &$options) {
      if (!is_string($path) || !str_starts_with($path, 'dist/js/')) {
        continue;
      }
      $options['preprocess'] = FALSE;
    }
  }
}

/**
 * Implements hook_element_info_alter().
 */
function gesso_element_info_alter(array &$types): void {
  if (isset($types['gesso_icon_link'])) {
    $types['gesso_icon_link']['#attached']['library'][] = 'gesso/icon_link';
  }
}
