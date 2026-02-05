<?php

/**
 * @file
 * Paragraph-related hook implementations.
 */

/**
 * Implements theme_preprocess_paragraph().
 */
function gesso_preprocess_paragraph(array &$variables): void {
  $paragraph = $variables['paragraph'];

  $variables['paragraph_index'] = $paragraph->index;

  if (isset($paragraph->parent_field_name)) {
    $variables['parent_field'] = $paragraph->parent_field_name->value;
  }

  if ($paragraph->getParentEntity()) {
    $variables['parent_type'] = $paragraph->getParentEntity()->getEntityTypeId();
    $variables['parent_bundle'] = $paragraph->getParentEntity()->bundle();
  }
}
