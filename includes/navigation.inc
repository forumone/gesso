<?php

/**
 * @file
 * Navigation-related hook implementations.
 */

use Drupal\Core\Render\Element;

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

/**
 * Implements hook_preprocess_menu_local_tasks().
 */
function gesso_preprocess_menu_local_tasks(&$variables) {
  foreach (Element::children($variables['primary']) as $key) {
    $variables['primary'][$key]['#level'] = 'primary';
  }

  foreach (Element::children($variables['secondary']) as $key) {
    $variables['secondary'][$key]['#level'] = 'secondary';
  }
}

/**
 * Implements hook_preprocess_menu_local_task().
 */
function gesso_preprocess_menu_local_task(array &$variables) {
  $variables['link']['#options']['attributes']['class'][] = 'c-button-group__link';
  $variables['link']['#options']['attributes']['class'][] = 'c-button';
  $variables['link']['#options']['attributes']['class'][] = 'c-button--base';

  if (isset($variables['element']['#level'])) {
    $variables['level'] = $variables['element']['#level'];

    // Additional class for secondary items.
    if ($variables['level'] == 'secondary') {
      $variables['link']['#options']['attributes']['class'][] = 'c-button--small';
    }
  }
}
