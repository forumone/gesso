<?php

/**
 * @file
 * Library-related hook implementations.
 */

/**
 * Implements hook_library_info_alter().
 */
function gesso_library_info_alter(array &$libraries, string $extension): void {
  // Theme libs (gesso/*) and SDC libs (core/components.gesso--*) both ship
  // webpack/Terser bundles that must not pass through Drupal JS aggregation.
  if ($extension === 'gesso') {
    foreach ($libraries as &$library) {
      gesso_disable_library_js_preprocess($library, static function (string $path): bool {
        return str_starts_with($path, 'dist/js/')
          || str_starts_with($path, 'components/');
      });
    }
    unset($library);
    return;
  }

  if ($extension === 'core') {
    // SDC registers under core with IDs like components.gesso--accordion and
    // paths relative to core (../themes/gesso/components/...).
    foreach ($libraries as $library_id => &$library) {
      if (!str_starts_with((string) $library_id, 'components.gesso--')) {
        continue;
      }
      gesso_disable_library_js_preprocess($library, static fn(string $path): bool => TRUE);
    }
    unset($library);
  }
}

/**
 * Sets preprocess FALSE on matching JS assets in a single library definition.
 *
 * @param array $library
 *   A library definition (modified by reference).
 * @param callable(string): bool $path_matcher
 *   Return TRUE when the asset path should skip aggregation.
 */
function gesso_disable_library_js_preprocess(array &$library, callable $path_matcher): void {
  if (empty($library['js'])) {
    return;
  }
  foreach ($library['js'] as $path => &$options) {
    if (!is_string($path) || !$path_matcher($path)) {
      continue;
    }
    $options['preprocess'] = FALSE;
  }
  unset($options);
}

/**
 * Implements hook_element_info_alter().
 */
function gesso_element_info_alter(array &$types): void {
  if (isset($types['gesso_icon_link'])) {
    $types['gesso_icon_link']['#attached']['library'][] = 'core/components.gesso--icon-link';
  }
}
