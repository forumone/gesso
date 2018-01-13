<?php

/**
 * Implements views_theme_suggestions_views_view().
 */
function views_theme_suggestions_views_view(array $variables) {
  $suggestions = [];
  $view = $variables['view'];
  
  $suggestions[] = 'views_view__' . $view->id();
  $suggestions[] = 'views_view__' . $view->current_display;
  $suggestions[] = 'views_view__' . $view->id() . '__' . $view->current_display;

  return $suggestions;
}

/**
 * Implements views_theme_suggestions_views_view_unformatted().
 */
function views_theme_suggestions_views_view_unformatted(array $variables) {
  $suggestions = [];
  $view = $variables['view'];

  $suggestions[] = 'views_view_unformatted__' . $view->id();
  $suggestions[] = 'views_view_unformatted__' . $view->current_display;
  $suggestions[] = 'views_view_unformatted__' . $view->id() . '__' . $view->current_display;
  
  return $suggestions;
}

/**
 * Implements preprocess_views_view().
 */
function gesso_preprocess_views_view(&$variables) {
  $variables['path'] = $variables['view']->getRequest()->getPathInfo();
}