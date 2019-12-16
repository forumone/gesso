<?php

/**
 * @file
 * Taxonomy-specific alterations for theming.
 */

/**
 * Implements theme_suggestions_taxonomy_term_alter().
 *
 * @param array $suggestions
 *   Theme suggestions.
 * @param array $variables
 *   Variables that get passed along to the template file.
 */
function gesso_theme_suggestions_taxonomy_term_alter(array &$suggestions, array $variables) {
  $bundle = $variables['elements']['name']['#bundle'];
  $view_mode = $variables['elements']['#view_mode'];
  $suggestions[] = 'taxonomy_term__' . $view_mode;
  $suggestions[] = 'taxonomy_term__' . $bundle . '__' . $view_mode;
}
