<?php

/**
 * @file
 * Form-related hook implementations.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @param array $suggestions
 *   Theme suggestions.
 * @param array $variables
 *   Variables that get passed along to the template file.
 */
function gesso_theme_suggestions_container_alter(array &$suggestions, array $variables) {
  // Add container parents as a template suggestions.
  if (isset($variables['element']['#array_parents'])) {
    $parents = [];

    foreach ($variables['element']['#array_parents'] as $key => $value) {
      if (is_string($value)) {
        $parents[] = $value;
        $suggestions[] = 'container__' . implode('__', $parents);
      }
    }
  }

  // Add Views-related template suggestions.
  if (isset($variables['element']['#type']) && $variables['element']['#type'] !== 'container') {
    $suggestions[] = 'container__' . $variables['element']['#type'];

    if (isset($variables['element']['#name'])) {
      $suggestions[] = 'container__' . $variables['element']['#type'] . '__' . $variables['element']['#name'];
    }
  }
}
