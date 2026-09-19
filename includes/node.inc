<?php

/**
 * @file
 * Node-related hook implementations.
 */

/**
 * Implements hook_preprocess_node().
 *
 * @phpstan-param array<string, mixed> $variables
 *   The template variables.
 */
function gesso_preprocess_node(array &$variables): void {
  // Array of view modes to add regions to.
  $allowed_view_modes = ['full'];

  if (in_array($variables['view_mode'], $allowed_view_modes)) {
    // Array of regions to add to node template.
    $allowed_regions = ['status'];
    _gesso_add_regions_to_template($allowed_regions, $variables);
  }
}

/**
 * Custom function to add page regions to templates.
 *
 * @param array<int, string> $allowed_regions
 *   The regions allowed to be added to the template.
 * @param array<string, mixed> $variables
 *   The template variables.
 */
function _gesso_add_regions_to_template(array $allowed_regions, array &$variables): void {
  // Get active theme.
  $theme = \Drupal::theme()->getActiveTheme()->getName();

  // Get current theme regions. Theme::listAllRegions() was only added in
  // Drupal 11.4; gesso.info.yml still supports Drupal ^10.3 || ^11, so fall
  // back to the deprecated system_region_list() on cores where the
  // replacement doesn't exist yet.
  $theme_extension = \Drupal::service('theme_handler')->getTheme($theme);
  // @phpstan-ignore function.alreadyNarrowedType (PHPStan only sees the core version installed here, where listAllRegions() always exists; the guard is for sites on older, still-supported cores.)
  if (method_exists($theme_extension, 'listAllRegions')) {
    $available_regions = $theme_extension->listAllRegions();
  }
  else {
    // @phpstan-ignore function.deprecated (Required for Drupal < 11.4 compatibility, where Theme::listAllRegions() does not exist yet.)
    $available_regions = system_region_list($theme, 'REGIONS_ALL');
  }

  // Validate allowed regions with available regions.
  $regions = array_intersect(array_keys($available_regions), $allowed_regions);

  foreach ($regions as $key => $region) {
    // Load blocks from this region and sort them.
    $blocks = \Drupal::entityTypeManager()
      ->getStorage('block')
      ->loadByProperties(['theme' => $theme, 'region' => $region]);
    uasort($blocks, 'Drupal\block\Entity\Block::sort');

    // Build blocks and assign to template variable.
    $build = [];
    $builder = \Drupal::entityTypeManager()->getViewBuilder('block');
    foreach ($blocks as $key => $block) {
      if ($block->access('view')) {
        $build[$key] = $builder->view($block, 'block');
      }
    }
    $variables['region_' . $region] = $build;
  }
}
