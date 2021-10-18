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
