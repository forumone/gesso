<?php
/**
 * @file
 * Breadcrumb-related functions.
 */

/**
 * Returns HTML for the breadcrumb trail.
 */
function gesso_breadcrumb($vars) {
  if (!empty($vars['breadcrumb'])) {
    $output = '<nav class="breadcrumb" role="navigation">';
    $output .= '<h2 class="breadcrumb__title">' . t('You are here') . '</h2>';
    $output .= '<ol class="breadcrumb__list"><li class="breadcrumb__item">';
    $output .= implode('</li><li class="breadcrumb__item">', $vars['breadcrumb']);
    $output .= '</li></ol></nav>';

    return $output;
  }

  return '';
}
