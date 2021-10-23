<?php

/**
 * @file
 * Navigation-related hook implementations.
 */

/**
 * Implements hook_preprocess_breadcrumb().
 */
function gesso_preprocess_breadcrumb(array &$variables) {
  $variables['include_current_page']
    = theme_get_setting('include_current_page_in_breadcrumb', 'gesso') ?? TRUE;

    if ($variables['include_current_page']) {
      $request = \Drupal::request();
      $route_match = \Drupal::routeMatch();
      $page_title = \Drupal::service('title_resolver')->getTitle($request, $route_match->getRouteObject());
      $variables['page_title'] = $page_title;
      $variables['breadcrumb'][] = array(
        'text' => $page_title,
      );
    }
}
