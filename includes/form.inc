<?php

/**
 * @file
 * Form-related hook implementations.
 */

/**
 * Implements hook_form_alter().
 *
 *  phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 *
 * @param array<array<array<array<array<string>>>>> $form
 *   The variables array (modify in place).
 * @param array<string> $form_state
 *   The variables array (modify in place).
 * @param array<string> $form_id
 *   The variables array (modify in place).
 * phpcs:enable
 */
function gesso_form_alter(&$form, &$form_state, $form_id): void {
  // Replace button classes with c-button.
  if (isset($form['actions']['delete']['#attributes']['class'])) {
    $form['actions']['delete']['#attributes']['class'] = preg_replace('/^button/', 'c-button', $form['actions']['delete']['#attributes']['class']);
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_input(array &$variables): void {
  $variables['is_required'] = $variables['element']['#required'] ?? NULL;
  $variables['type'] = $variables['element']['#attributes']['type'] ?? NULL;
  $variables['dropbutton'] = $variables['element']['#dropbutton'] ?? NULL;

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
 * phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 * Adds a class to the add more button for multiple-value fields.
 *
 * @param array<array<array<string, array<string>>>> $variables
 *   An associative array containing the variables for the field template.
 *   The specific variables for the multiple-value form are at:
 *   $variables['element']['#field_multiple_value_form'], which is an array.
 * phpcs:enable
 */
function gesso_preprocess_field_multiple_value_form(array &$variables): void {
  // Make disabled variable available to the template.
  $variables['disabled'] = !empty($variables['element']['#disabled']);

  if ($variables['multiple']) {
    // Make add more button smaller.
    /**
     * @var array<array<string, array<string>>> $variables ['element']['#field_multiple_value_form'], An associative array containing the variables for the multiple-value form.
     */
    if (!empty($variables['element']['#field_multiple_value_form']['add_button'])) {
      $variables['element']['#field_multiple_value_form']['add_button']['#attributes']['class'][] = 'c-button--small';
    }
  }
}

/**
 * Implements hook_preprocess_HOOK().
 *  phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 *
 * @param array<array<string>> $variables
 *   The variables array (modify in place)
 * phpcs:enable
 */
function gesso_preprocess_fieldset(array &$variables): void {
  $variables['type'] = $variables['element']['#type'] ?? 'fieldset';
  $variables['is_disabled'] = $variables['element']['#disabled'] ?? NULL;
}

/**
 * Implements hook_preprocess_HOOK().
 * phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 *
 * @param array<array<string>> $variables
 *   The variables array (modify in place)
 * phpcs:enable
 */
function gesso_preprocess_form_element(array &$variables): void {
  $variables['is_required'] = $variables['element']['#required'] ?? NULL;
  if (
    !empty($variables['description']['attributes'])
    && !empty($variables['element']['#id'])
  ) {
    $variables['description']['attributes']['id'] = $variables['element']['#id'] . '-description';
  }
}

/**
 * Implements hook_preprocess_HOOK().
 * phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 *
 * @param array<array<string>> $variables
 *   The variables array (modify in place)
 * phpcs:enable
 */
function gesso_preprocess_select(array &$variables): void {
  if (!empty($variables['element']['#description']) && !empty($variables['element']['#id'])) {
    $description_id = $variables['element']['#id'] . '-description';
    $variables['described_by'] = $description_id;
  }
}

/**
 * Implements hook_preprocess_HOOK().
 * phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 *
 * @param array<array<string>> $variables
 *   The variables array (modify in place)
 * phpcs:enable
 */
function gesso_preprocess_textarea(array &$variables): void {
  if (!empty($variables['element']['#description']) && !empty($variables['element']['#id'])) {
    $description_id = $variables['element']['#id'] . '-description';
    $variables['described_by'] = $description_id;
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_container_alter(array &$suggestions, array $variables) {
  $array_parents = $variables['element']['#array_parents'] ?? NULL;

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
 * phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 *
 * @param array<string> $suggestions
 *   The variables array (modify in place)
 * @param array<array<string>> $variables
 *   The variables array (modify in place)
 * phpcs:enable
 */
function gesso_theme_suggestions_form_alter(array &$suggestions, array $variables): void {
  if (isset($variables['element']['#form_id'])) {
    $suggestions[] = 'form__' . $variables['element']['#form_id'];
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 * phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 *
 * @param array<string> $suggestions
 *   The variables array (modify in place)
 * @param array<array<string>> $variables
 *   The variables array (modify in place)
 * phpcs:enable
 */
function gesso_theme_suggestions_form_element_alter(array &$suggestions, array $variables): void {

  $id = $variables['element']['#id'] ?? NULL;
  $type = $variables['element']['#type'] ?? NULL;

  if (isset($type)) {
    $suggestions[] = 'form_element__' . $type;
  }

  if (isset($id)) {
    $suggestions[] = 'form_element__' . $id;
  }
}

/**
 * Implements hook_preprocess_links__HOOK().
 * phpcs:disable Drupal.Commenting.HookComment.HookParamDoc
 *
 * @param array<array<string>> $vars
 *   The variables array (modify in place).
 *  phpcs:enable
 */
function gesso_preprocess_links__dropbutton(array &$vars): void {
  foreach ($vars['links'] as $key => $link) {
    /**
     * @var array<string,array<string, array<string, array<string>>>> $link, link variable.
     */
    if (!empty($link['link'])) {
      if (!empty($link['link']['#options'])) {
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
}
