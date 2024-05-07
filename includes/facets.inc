<?php

/**
 * @file
 * Facet template functions.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_facets_item_list(array &$variables) {
  foreach ($variables['items'] as &$item) {
    // Add class to facet links.
    $item['value']['#url']->setOption('attributes', [
      'class' => ['c-facet'],
      'rel' => 'no-follow',
    ]);

    // Add expanded facet item class.
    if ($item['attributes']->hasClass('facet-item--expanded')) {
      $item['attributes']->addClass('is-expanded');
    }

    // Remove unnecessary facet item classes.
    $item['attributes']->removeClass('facet-item', 'facet-item--expanded');
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_facets_summary_item_list(array &$variables) {
  // Add class to item links.
  foreach ($variables['items'] as $key => &$item) {
    $item['value']['#url']->setOption('attributes', [
      'class' => ['c-button', 'c-button--small'],
      'rel' => 'no-follow',
    ]);
  }
}
