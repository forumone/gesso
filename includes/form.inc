<?php

/**
 * @file
 * Form template functions.
 */

/**
 * Implements template_preprocess_input().
 */
function gesso_preprocess_input(&$vars) {
  $vars['required'] = isset($vars['element']['#required']) ? $vars['element']['#required'] : NULL;
  $vars['type'] = isset($vars['element']['#attributes']['type']) ? $vars['element']['#attributes']['type'] : NULL;
  $vars['dropbutton'] = isset($vars['element']['#dropbutton']) ? $vars['element']['#dropbutton'] : NULL;
}

/**
 * Implements template_preprocess_fieldset().
 */
function gesso_preprocess_fieldset(&$vars) {
  $vars['type'] = isset($vars['element']['#type']) ? $vars['element']['#type'] : NULL;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $form_id = $variables['element']['#form_id'];
  $suggestions[] = 'form__' . $form_id;

  // A list of form IDs in which to use form--inline.html.twig instead of
  // form.html.twig.
  $inline_forms = [
    // 'example-form-id',
  ];
  if (isset($variables['element']['#id'])) {
    if (in_array($variables['element']['#id'], $inline_forms)) {
      $suggestions[] = 'form__inline';
    }
  }
}
