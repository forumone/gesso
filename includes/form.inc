<?php

/**
 * @file
 * Form-related hook implementations.
 */


/**
 * Implements hook_form_alter().
 */
function gesso_form_alter(&$form, &$form_state, $form_id) {
  // Replace button classes with c-button.
  if (isset($form['actions']['delete']['#attributes']['class'])) {
    $form['actions']['delete']['#attributes']['class'] = preg_replace('/^button/', 'c-button', $form['actions']['delete']['#attributes']['class']);
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_input(array &$variables) {
  $variables['is_required'] = isset($variables['element']['#required']) ? $variables['element']['#required'] : NULL;
  $variables['type'] = isset($variables['element']['#attributes']['type']) ? $variables['element']['#attributes']['type'] : NULL;
  $variables['dropbutton'] = isset($variables['element']['#dropbutton']) ? $variables['element']['#dropbutton'] : NULL;

  // Replace button classes with c-button.
  if (isset($variables['attributes']['class'])) {
    $variables['attributes']['class'] = preg_replace('/^button/', 'c-button', $variables['attributes']['class']);
  }

  if (!empty($variables['element']['#description']) && !empty($variables['element']['#id'])) {
    $description_id = $variables['element']['#id'] . '-description';
    $variables['described_by'] = $description_id;
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_field_multiple_value_form(&$variables) {
  // Make disabled variable available to the template.
  $variables['disabled'] = !empty($variables['element']['#disabled']);

  if ($variables['multiple']) {
    // Make add more button smaller.
    if (!empty($variables['button'])) {
      $variables['button']['#attributes']['class'][] = 'c-button--small';
    }
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_fieldset(array &$variables) {
  $variables['type'] = isset($variables['element']['#type']) ? $variables['element']['#type'] : 'fieldset';
  $variables['is_disabled'] = isset($variables['element']['#disabled']) ? $variables['element']['#disabled'] : NULL;
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_form_element(array &$variables) {
  $variables['is_required'] = isset($variables['element']['#required']) ? $variables['element']['#required'] : NULL;
  if (!empty($variables['description']['content']) && !empty($variables['element']['#id'])) {
    $variables['description']['attributes']['id'] = $variables['element']['#id'] . '-description';
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_select(array &$variables) {
  if (!empty($variables['element']['#description']) && !empty($variables['element']['#id'])) {
    $description_id = $variables['element']['#id'] . '-description';
    $variables['described_by'] = $description_id;
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_textarea(array &$variables) {
  if (!empty($variables['element']['#description']) && !empty($variables['element']['#id'])) {
    $description_id = $variables['element']['#id'] . '-description';
    $variables['described_by'] = $description_id;
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_container_alter(array &$suggestions, array $variables) {
  $array_parents = isset($variables['element']['#array_parents']) ? $variables['element']['#array_parents'] : NULL;

  // Add parents as template suggestions.
  if (isset($array_parents)) {
    $ancestors = [];

    foreach ($array_parents as $value) {
      if (is_string($value)) {
        $ancestors[] = $value;
        $suggestions[] = 'container__' . implode('__', $ancestors);
      }
    }
  }

  // Add Views-related template suggestions.
  if (isset($variables['element']['#type']) && $variables['element']['#type'] !== 'container') {
    $suggestions[] = 'container__' . $variables['element']['#type'];

    if (isset($variables['element']['#name'])) {
      $suggestions[] = 'container__' . $variables['element']['#type'] . '__' . $variables['element']['#name'];
    }
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  if (isset($variables['element']['#form_id'])) {
    $suggestions[] = 'form__' . $variables['element']['#form_id'];
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_form_element_alter(array &$suggestions, array $variables) {
  $id = isset($variables['element']['#id']) ? $variables['element']['#id'] : NULL;
  $type = isset($variables['element']['#type']) ? $variables['element']['#type'] : NULL;

  if (isset($type)) {
    $suggestions[] = 'form_element__' . $type;
  }

  if (isset($id)) {
    $suggestions[] = 'form_element__' . $id;
  }
}

/**
 * Implements hook_preprocess_links__HOOK().
 */
function gesso_preprocess_links__dropbutton(array &$vars) {
  foreach($vars['links'] as $key => $link) {
    if (!empty($link['link'])) {
      if (empty($link['link']['#options']['attributes'])) {
        $link['link']['#options']['attributes'] = [];
      }
      if (empty($link['link']['#options']['attributes']['class'])) {
        $link['link']['#options']['attributes']['class'] = [];
      }
      $link['link']['#options']['attributes']['class'][] = 'c-button';
      $link['link']['#options']['attributes']['class'][] = 'c-dropbutton__button';
      $vars['links'][$key] = $link;
    }
  }
}
