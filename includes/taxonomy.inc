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

  // Array of view modes to add regions to.
  $allowed_view_modes = ['full'];

  if (in_array($variables['view_mode'], $allowed_view_modes)) {
    // Array of regions to add to taxonomy term template.
    $allowed_regions = ['status'];
    _add_regions_to_template($allowed_regions, $variables);
  }
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
