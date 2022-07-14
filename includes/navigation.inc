<?php

/**
 * @file
 * Navigation-related hook implementations.
 */

/**
 * Implements hook_preprocess_breadcrumb().
 */
function gesso_preprocess_breadcrumb(array &$variables) {
  if ($variables['breadcrumb']) {
    /** @var \Drupal\Core\Render\Renderer $renderer */
    $renderer = \Drupal::service('renderer');
    $variables['include_current_page']
      = theme_get_setting('include_current_page_in_breadcrumb', 'gesso') ?? TRUE;
    $themeConfig = \Drupal::config('gesso.settings');
    $renderer->addCacheableDependency($variables, $themeConfig);

    if ($variables['include_current_page']) {
      $request = \Drupal::request();
      $route_match = \Drupal::routeMatch();
      $variables['#cache']['contexts'][] = 'route';
      $page_title = \Drupal::service('title_resolver')->getTitle($request, $route_match->getRouteObject());

      if (!empty($page_title)) {
        $variables['page_title'] = $page_title;
        $variables['breadcrumb'][] = [
          'text' => $page_title,
        ];
      }
    }
  }
}

/**
 * Implements hook_preprocess_menu().
 */
function gesso_preprocess_menu(array &$variables) {
  $current_path = \Drupal::request()->getRequestUri();
  foreach ($variables['items'] as $key => $item) {
    if ($item['url']->toString() == $current_path) {
      $variables['items'][$key]['is_active'] = TRUE;
    }
  }
}
