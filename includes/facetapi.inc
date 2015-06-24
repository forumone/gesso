<?php
/**
 * @file
 * Facet API-related functions.
 */

/**
 * Implements hook_facetapi_accessible_markup.
 */
function gesso_facetapi_accessible_markup($vars) {
  $text = ($vars['active']) ? t('Remove filter for') : t('Apply filter for');
  // Add spaces before and after the text, since other content may be displayed
  // inline with this and we don't want the words to run together. However, the
  // spaces must be inside the <span> so as not to disrupt the layout for
  // sighted users.
  return '<span class="element-invisible"> ' . $text . ' </span>';
}

/**
 * Implements hook_facetapi_count.
 */
function gesso_facetapi_count($vars) {
  return '<span class="facet__count">(' . (int) $vars['count'] . '<span class="element-invisible"> ' . t('items') . '</span>)</span>';
}

/**
 * Implements hook_facetapi_link_active.
 */
function gesso_facetapi_link_active($vars) {
  // Builds accessible markup.
  $accessible_vars = array(
    'text' => $vars['text'],
    'active' => TRUE,
  );
  $accessible_markup = theme('facetapi_accessible_markup', $accessible_vars);

  // Sanitizes the link text if necessary.
  $sanitize = empty($vars['options']['html']);
  $link_text = ($sanitize) ? check_plain($vars['text']) : $vars['text'];

  $vars['text'] = $accessible_markup . $link_text;

  // Sets options to HTML since we already sanitized the link text.
  $vars['options']['html'] = TRUE;

  // Change link classes.
  $vars['options']['attributes']['class'] = array(
    'facet',
    'is-active',
  );

  return theme_link($vars);
}

/**
 * Implements hook_facetapi_link_inactive.
 */
function gesso_facetapi_link_inactive($vars) {
  // Builds accessible markup.
  $accessible_vars = array(
    'text' => $vars['text'],
    'active' => FALSE,
  );
  $accessible_markup = theme('facetapi_accessible_markup', $accessible_vars);

  // Sanitizes the link text if necessary.
  $sanitize = empty($vars['options']['html']);
  $vars['text'] = ($sanitize) ? check_plain($vars['text']) : $vars['text'];

  $vars['text'] = $accessible_markup . $vars['text'];

  // Adds count to link if one was passed.
  if (isset($vars['count'])) {
    $vars['text'] .= ' ' . theme('facetapi_count', $vars);
  }

  // Sets options to HTML since we already sanitized the link text.
  $vars['options']['html'] = TRUE;

  // Change link classes.
  $vars['options']['attributes']['class'] = array(
    'facet',
    'is-inactive',
  );

  return theme_link($vars);
}
