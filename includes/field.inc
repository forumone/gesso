<?php

/**
 * @file
 * Field template functions.
 */

/**
 * Implements hook_theme_suggestions_field_alter().
 */
function gesso_theme_suggestions_field_alter(array &$suggestions, array $variables) {
  $suggestions[] = 'field__node__' . $variables['element']['#field_name'] . '__' . $variables['element']['#bundle'] . '__' . $variables['element']['#view_mode'];
}
