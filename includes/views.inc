<?php

/**
 * @file
 * Views-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK().
 *
 * @phpstan-param array<string, mixed> $variables
 *   The template variables.
 */
function gesso_preprocess_views_view(array &$variables): void {
  /** @var \Drupal\views\ViewExecutable $view */
  $view = $variables['view'];

  $variables['path'] = $view->getRequest()->getPathInfo();

  if (empty($variables['title']) && !empty($view->getTitle())) {
    $variables['title'] = [
      '#markup' => $view->getTitle(),
    ];
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @phpstan-param array<int, string> $suggestions
 *   The theme suggestions.
 * @phpstan-param array<string, mixed> $variables
 *   The template variables.
 */
function gesso_theme_suggestions_views_view_alter(array &$suggestions, array $variables): void {
  $view = $variables['view'];
  $suggestions[] = 'views_view__' . $view->id();
  $suggestions[] = 'views_view__' . $view->current_display;
  $suggestions[] = 'views_view__' . $view->id() . '__' . $view->current_display;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @phpstan-param array<int, string> $suggestions
 *   The theme suggestions.
 * @phpstan-param array<string, mixed> $variables
 *   The template variables.
 */
function gesso_theme_suggestions_views_view_unformatted_alter(array &$suggestions, array $variables): void {
  $view = $variables['view'];
  $suggestions[] = 'views_view_unformatted__' . $view->id();
  $suggestions[] = 'views_view_unformatted__' . $view->current_display;
  $suggestions[] = 'views_view_unformatted__' . $view->id() . '__' . $view->current_display;
}
