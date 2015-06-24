<?php
/**
 * @file
 * Taxonomy-related functions.
 */

/**
 * Implements hook_preprocess_taxonomy_term().
 */
function gesso_preprocess_taxonomy_term(&$vars) {
  $only_use_smacss = theme_get_setting('only_use_smacss');

  // Add default taxonomy term attributes.
  $vars['attributes_array']['class'] = array(
    'taxonomy-term',
    'taxonomy-term--' . drupal_html_class($vars['vocabulary_machine_name']),
    'taxonomy-term--' . drupal_html_class($vars['view_mode']),
  );
  $vars['attributes_array']['role'][] = 'article';
  $vars['title_attributes_array']['class'][] = 'taxonomy-term__title';
  $vars['content_attributes_array']['class'][] = 'taxonomy-term__content';

  // Add default core attributes if wanted.
  if (!$only_use_smacss) {
    $vars['attributes_array']['class'][] = 'vocabulary-' . drupal_html_class($vars['vocabulary_machine_name']);
    $vars['content_attributes_array']['class'][] = 'content';
  }

  // Remove taxonomy description wrapper.
  if (isset($vars['content']['description'])) {
    unset($vars['content']['description']['#prefix']);
    unset($vars['content']['description']['#suffix']);
  }

  // Add theme hook suggestions based on view mode.
  $vars['theme_hook_suggestions'][] = 'taxonomy_term__' . $vars['view_mode'];
  $vars['theme_hook_suggestions'][] = 'taxonomy_term__' . $vars['view_mode'] . '__' . $vars['vocabulary_machine_name'];
}
