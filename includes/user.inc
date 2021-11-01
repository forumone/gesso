<?php

/**
 * @file
 * User-related hook implementations.
 */

/**
 * Implements hook_preprocess_user().
 *
 * @param array $variables
 *   Variables that get passed along to the template file.
 */
function gesso_preprocess_user(&$variables) {
  $variables['display_name'] = $variables['user']->getDisplayName();
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @param array $suggestions
 *   Theme suggestions.
 * @param array $variables
 *   Variables that get passed along to the template file.
 */
function gesso_theme_suggestions_user_alter(array &$suggestions, array $variables) {
  if (isset($variables['elements']['#view_mode'])) {
    $suggestions[] = 'user__' . $variables['elements']['#view_mode'];
  }
}
