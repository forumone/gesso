<?php

/**
 * @file
 * Views-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK().
 *
 * @param array $variables
 *   Variables that get passed along to the template file.
 */
function gesso_preprocess_views_view(array &$variables) {
  $variables['path'] = $variables['view']->getRequest()->getPathInfo();
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @param array $suggestions
 *   Theme suggestions.
 * @param array $variables
 *   Variables that get passed along to the template file.
 */
function gesso_theme_suggestions_container_alter(array &$suggestions, array $variables) {
  // A list of view names in which to exclude the container markup.
  // Included views will use container--no-wrapper.html.twig
  // instead of container.html.twig.
  $exclude_views = [
    'taxonomy_term',
    // 'example_view_machine_name',
  ];
  if (isset($variables['element']['#name'])) {
    if (in_array($variables['element']['#name'], $exclude_views)) {
      $suggestions[] = 'container__no_wrapper';
    }
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @param array $suggestions
 *   Theme suggestions.
 * @param array $variables
 *   Variables that get passed along to the template file.
 */
function gesso_theme_suggestions_views_view_alter(array &$suggestions, array $variables) {
  $view = $variables['view'];
  $suggestions[] = 'views_view__' . $view->id();
  $suggestions[] = 'views_view__' . $view->current_display;
  $suggestions[] = 'views_view__' . $view->id() . '__' . $view->current_display;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @param array $suggestions
 *   Theme suggestions.
 * @param array $variables
 *   Variables that get passed along to the template file.
 */
function gesso_theme_suggestions_views_view_unformatted_alter(array &$suggestions, array $variables) {
  $view = $variables['view'];
  $suggestions[] = 'views_view_unformatted__' . $view->id();
  $suggestions[] = 'views_view_unformatted__' . $view->current_display;
  $suggestions[] = 'views_view_unformatted__' . $view->id() . '__' . $view->current_display;
}
