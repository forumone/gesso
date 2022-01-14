<?php

/**
 * @file
 * Node-related hook implementations.
 */

/**
 * Implements hook_preprocess_node().
 */
function gesso_preprocess_node(&$variables) {
  // Array of view modes to add regions to.
  $allowed_view_modes = ['full'];

  if (in_array($variables['view_mode'], $allowed_view_modes)) {
    // Array of regions to add to node template.
    $allowed_regions = ['status'];
    _add_regions_to_template($allowed_regions, $variables);
  }
}

/**
* Custom function to add page regions to templates.
*/
function _add_regions_to_template($allowed_regions, &$variables) {
  // Get active theme.
  $theme = \Drupal::theme()->getActiveTheme()->getName();

  // Get current theme regions.
  $available_regions = system_region_list($theme, 'REGIONS_ALL');

  // Validate allowed regions with available regions.
  $regions = array_intersect(array_keys($available_regions), $allowed_regions);

  foreach ($regions as $key => $region) {
    // Load blocks from this region and sort them.
    $blocks = \Drupal::entityTypeManager()
      ->getStorage('block')
      ->loadByProperties(array('theme'  => $theme, 'region' => $region));
    uasort($blocks, 'Drupal\block\Entity\Block::sort');

    // Build blocks and assign to template variable.
    $build = array();
    $builder = \Drupal::entityTypeManager()->getViewBuilder('block');
    foreach ($blocks as $key => $block) {
      if ($block->access('view')) {
        $build[$key] = $builder->view($block, 'block');
      }
    }
    $variables['region_' . $region] = $build;
  }
}
