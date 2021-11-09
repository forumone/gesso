<?php

/**
 * @file
 * Views-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_views_view(array &$variables) {
  $variables['path'] = $variables['view']->getRequest()->getPathInfo();
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_views_view_alter(array &$suggestions, array $variables) {
  $view = $variables['view'];
  $suggestions[] = 'views_view__' . $view->id();
  $suggestions[] = 'views_view__' . $view->current_display;
  $suggestions[] = 'views_view__' . $view->id() . '__' . $view->current_display;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_views_view_unformatted_alter(array &$suggestions, array $variables) {
  $view = $variables['view'];
  $suggestions[] = 'views_view_unformatted__' . $view->id();
  $suggestions[] = 'views_view_unformatted__' . $view->current_display;
  $suggestions[] = 'views_view_unformatted__' . $view->id() . '__' . $view->current_display;
}
