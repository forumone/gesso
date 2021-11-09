<?php

/**
 * @file
 * Taxonomy-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_taxonomy_term(array &$variables) {
  $variables['term_name'] = $variables['term']->getName();
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_taxonomy_term_alter(array &$suggestions, array $variables) {
  $bundle = $variables['elements']['name']['#bundle'];
  $view_mode = $variables['elements']['#view_mode'];
  $suggestions[] = 'taxonomy_term__' . $view_mode;
  $suggestions[] = 'taxonomy_term__' . $bundle . '__' . $view_mode;
}
