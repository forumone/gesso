<?php
/**
 * @file
 * Field collection-related functions.
 */

/**
 * Implements theme_field_collection_view().
 */
function gesso_field_collection_view($vars) {
  // Don't output wrapper markup.
  return $vars['element']['#children'];
}
