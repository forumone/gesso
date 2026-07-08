<?php

/**
 * @file
 * Field-related hook implementations.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function gesso_preprocess_field(array &$variables): void {
  // Add index to individual paragraphs.
  if (
    $variables['field_type'] == 'entity_reference_revisions' &&
    $variables['element']['#items']->getItemDefinition()->getSetting('target_type') == 'paragraph'
  ) {
    $delta = 0;
    foreach ($variables['items'] as $key => $item) {
      if (!empty($variables['items'][$key]['content']['#paragraph'])) {
        $variables['items'][$key]['content']['#paragraph']->index = $delta;
        $delta++;
      }
    }
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_field_alter(array &$suggestions, array $variables): void {
  $suggestions[] = 'field__' . $variables['element']['#entity_type'] . '__' . $variables['element']['#field_name'] . '__' . $variables['element']['#bundle'] . '__' . $variables['element']['#view_mode'];
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function gesso_theme_suggestions_gesso_icon_alter(array &$suggestions, array $variables): void {
  $suggestions[] = 'gesso_icon__custom';
}
