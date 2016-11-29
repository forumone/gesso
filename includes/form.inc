<?php
/**
 * @file
 * Form template functions.
 */

/**
 * Implements template_preprocess_input().
 */
function gesso_preprocess_input(&$vars) {
  $vars['required'] = $vars['element']['#required'];
  $vars['type'] = isset($vars['element']['#attributes']['type']) ? $vars['element']['#attributes']['type'] : NULL;
}

/**
 * Implements template_preprocess_fieldset().
 */
function gesso_preprocess_fieldset(&$vars) {
  $vars['type'] = isset($vars['element']['#type']) ? $vars['element']['#type'] : NULL;
}
