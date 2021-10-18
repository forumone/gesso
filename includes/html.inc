<?php

/**
 * @file
 * HTML template functions.
 */

/**
 * Implements hook_preprocess().
 */
function gesso_preprocess(array &$variables) {
  if (!empty($variables['directory'])) {
    $variables['gesso_image_path'] = '/' . $variables['directory'] . '/images';
  }
}

/**
 * Implements hook_preprocess_html().
 */
function gesso_preprocess_html(array &$variables) {
  $variables['include_back_to_top']
    = theme_get_setting('include_back_to_top') ?? TRUE;
}

/**
 * Implements hook_page_attachments_alter().
 */
function gesso_page_attachments_alter(array &$attachments) {
  $include_back_to_top = theme_get_setting('include_back_to_top') ?? TRUE;
  if ($include_back_to_top) {
    $attachments['#attached']['drupalSettings']['gesso']['backToTopThreshold']
      = theme_get_setting('threshold');
    $attachments['#attached']['drupalSettings']['gesso']['backToTopSmoothScroll']
      = theme_get_setting('smooth_scroll');
  }
}
