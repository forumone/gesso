<?php

/**
 * @file
 * Paragraph-related hook implementations.
 */

/**
 * Implements theme_preprocess_paragraph().
 */
function gesso_preprocess_paragraph(&$variables) {
  if (isset($variables['paragraph']->parent_field_name)) {
    $variables['parent_field'] = $variables['paragraph']->parent_field_name->value;
  }

  if ($variables['paragraph']->getParentEntity()) {
    $variables['parent_type'] = $variables['paragraph']->getParentEntity()->getEntityTypeId();
    $variables['parent_bundle'] = $variables['paragraph']->getParentEntity()->bundle();
  }
}
