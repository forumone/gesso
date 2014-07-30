<?php
/**
 * @file
 * User-related functions.
 */

/**
 * Implements hook_preprocess_user_profile().
 */
function gesso_preprocess_user_profile(&$vars) {
  // Add attributes.
  $vars['attributes_array']['role'][] = 'article';
  $vars['attributes_array']['class'][] = 'user-profile';
}

/**
 * Implements hook_preprocess_user_profile_category().
 */
function gesso_preprocess_user_profile_category(&$vars) {
  // Add title & list classes.
  $vars['title_attributes_array']['class'][] = 'user-profile-category__title';
  $vars['attributes_array']['class'][] = 'user-profile-category__list';
}
