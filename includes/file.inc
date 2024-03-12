<?php

/**
 * @file
 * File-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK().
 *  phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 *
 * @param array<array<string>> $variables
 *    The variables array (modify in place).
 *  phpcs:enable
 */
function gesso_preprocess_file_link(array &$variables) {
  /**
   * @var array<array<string>> $variables, the variables array (modify in place).
   */
  // Replace file classes with c-file.
  if (isset($variables['attributes']['class'])) {
    $variables['attributes']['class'] = preg_replace('/file/', 'c-file', $variables['attributes']['class']);
  }
}
