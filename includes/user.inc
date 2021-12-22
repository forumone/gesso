<?php

/**
 * @file
 * User-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_user(array &$variables) {
  $variables['display_name'] = $variables['user']->getDisplayName();
  $variables['view_mode'] = $variables['elements']['#view_mode'];

  // Array of view modes to add regions to.
  $allowed_view_modes = ['full'];

  if (in_array($variables['view_mode'], $allowed_view_modes)) {
    // Array of regions to add to user template.
    $allowed_regions = ['status'];
    _add_regions_to_template($allowed_regions, $variables);
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_user_alter(array &$suggestions, array $variables) {
  if (isset($variables['elements']['#view_mode'])) {
    $suggestions[] = 'user__' . $variables['elements']['#view_mode'];
  }
}
