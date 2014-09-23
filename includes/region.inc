<?php
/**
 * @file
 * Region template functions.
 */

/**
 * Implements hook_preprocess_region().
 */
function gesso_preprocess_region(&$vars) {
  // Remove extraneous region class.
  array_shift($vars['classes_array']);

  switch ($vars['region']) {
    // Add layout-constrain class to certain regions.
    case 'utility':
    case 'header':
    case 'navigation':
    case 'preface':
    case 'content':
    case 'postscript':
    case 'footer':
      $vars['classes_array'][] = 'layout-constrain';
      break;

    // Remove classes for these regions.
    case 'page_top':
    case 'page_bottom':
      $vars['classes_array'] = array();
      break;
  }
}

/**
 * Implements hook_process_region().
 */
function gesso_process_region(&$vars) {
  // Only add wrapper div if there are classes.
  $vars['region_open'] = '';
  $vars['region_close'] = '';

  if ($vars['classes'] !== '') {
    $vars['region_open'] = '<div class="' . $vars['classes'] . '">';
    $vars['region_close'] = '</div>';
  }
}
