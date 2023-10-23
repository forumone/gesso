<?php

/**
 * @file
 * File-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_file_link(array &$variables) {
  // Replace file classes with c-file.
  if (isset($variables['attributes']['class'])) {
    $variables['attributes']['class'] = preg_replace('/file/', 'c-file', $variables['attributes']['class']);
  }
}
