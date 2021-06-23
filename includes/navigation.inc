<?php

/**
 * @file
 * Navigation-specific theming alterations.
 */

use Drupal\Component\Utility\Html;

/**
 * Implements theme_preprocess_menu_local_tasks()
 *
 * @param array $variables
 *   Variables that get passed along to the theming template.
 */
function gesso_preprocess_menu_local_tasks(array &$variables) {
  foreach (['primary', 'secondary'] as $type) {
    $tabs = [];

    // Sort the tabs by #weight.
    uasort($variables[$type], [
      'Drupal\Component\Utility\SortArray',
      'sortByWeightProperty',
    ]);

    foreach (array_keys($variables[$type]) as $key) {
      // Add the tab to a new array.
      $tabs[$key] = [
        'active' => $variables[$type][$key]['#active'],
        'url' => $variables[$type][$key]['#link']['url']->toString(),
        'text' => Html::escape($variables[$type][$key]['#link']['title']),
      ];

      // Check if the tab should be shown by rendering the original.
      $link = \Drupal::service('renderer')->render($variables[$type][$key]);
      if (!$link) {
        unset($tabs[$key]);
      }
    }

    // Overwrite the original tabs data.
    $variables[$type] = $tabs;
  }
}
