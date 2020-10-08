<?php

/**
 * @file
 * HTML template functions.
 */

/**
 * Implements hook_preprocess().
 */
function gesso_preprocess(&$vars) {
  $vars['gesso_image_path'] = '/' . $vars['directory'] . '/images';
}

/**
 * Implements hook_preprocess_html().
 */
function gesso_preprocess_html(&$vars, $hook) {
  // Add x-ua-compatible meta tag.
  $vars['page']['#attached']['html_head'][] = [
    [
      '#tag' => 'meta',
      '#attributes' => [
        'http-equiv' => 'x-ua-compatible',
        'content' => 'ie=edge',
      ],
    ],
    'x_ua_compatible',
  ];
}
