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
      if (!is_string($path)) {
        continue;
      }
      // Theme-built JS lives under dist/js/ or colocated with SDCs.
      if (
        str_starts_with($path, 'dist/js/')
        || str_starts_with($path, 'components/')
      ) {
        $options['preprocess'] = FALSE;
      }
    }
  }
}

/**
 * Implements hook_element_info_alter().
 */
function gesso_element_info_alter(array &$types): void {
  if (isset($types['gesso_icon_link'])) {
    $types['gesso_icon_link']['#attached']['library'][] = 'core/components.gesso--icon-link';
  }
}
