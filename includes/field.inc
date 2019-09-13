<?php

/**
 * @file
 * Field template functions.
 */

/**
 * Implements theme_preprocess_menu_local_tasks()
 *
 * @param array $suggestions
 *   Theme hook suggestions.
 * @param array $variables
 *   Theming array.
 */
function gesso_theme_suggestions_field_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'field__node__' . $variables['element']['#field_name'] . '__' . $variables['element']['#bundle'] . '__' . $variables['element']['#view_mode'];
}
