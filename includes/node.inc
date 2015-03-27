<?php
/**
 * @file
 * Node-related functions.
 */

/**
 * Implements hook_preprocess_node().
 */
function gesso_preprocess_node(&$vars) {
  $only_use_smacss = theme_get_setting('only_use_smacss');
  $node_type_class = drupal_html_class($vars['node']->type);
  $view_mode_class = drupal_html_class($vars['view_mode']);

  // Remove some default node classes.
  if ($only_use_smacss) {
    $vars['classes_array'] = array_values(array_diff($vars['classes_array'], array(
      'node-' . $node_type_class,
      'node-' . $view_mode_class,
      'node-promoted',
      'node-sticky',
      'node-unpublished',
    )));
  }

  // Add default node attributes.
  $vars['classes_array'][] = 'node--' . $node_type_class;
  $vars['attributes_array']['role'][] = 'article';
  $vars['title_attributes_array']['class'][] = 'node__title';
  $vars['content_attributes_array']['class'][] = 'node__content';

  // Add default core attributes if wanted.
  if (!$only_use_smacss) {
    $vars['title_attributes_array']['class'][] = 'title node-title';
    $vars['content_attributes_array']['class'][] = 'content';
  }

  // Change attributes for view modes.
  if (isset($vars['view_mode'])) {
    $vars['classes_array'][] = 'node--' . $view_mode_class;
  }

  // Add promoted class.
  if ($vars['promote']) {
    $vars['classes_array'][] = 'is-promoted';
  }

  // Add sticky class.
  if ($vars['sticky']) {
    $vars['classes_array'][] = 'is-sticky';
  }

  // Create submitted info using time element.
  $vars['datetime'] = format_date($vars['created'], 'custom', 'c');
  $vars['date'] = format_date($vars['created'], 'custom', 'F j, Y');
  if (variable_get('node_submitted_' . $vars['node']->type, TRUE)) {
    $vars['submitted'] = t('!datetime by !username',
      array(
        '!datetime' => '<time class="node__date" datetime="' . $vars['datetime'] . '" pubdate="pubdate">' . $vars['date'] . '</time>',
        '!username' => $vars['name'],
      )
    );
  }
  else {
    $vars['submitted'] = '';
  }

  // Create unpublished variable and add unpublished class.
  $vars['unpublished'] = '';
  if (!$vars['status']) {
    $vars['unpublished'] = '<div class="node__unpublished">' . t('Unpublished') . '</div>';
    $vars['classes_array'][] = 'is-unpublished';
  }

  // Add classes array to attributes array.
  $vars['attributes_array']['class'] = $vars['classes_array'];

  // Add theme hook suggestions based on view mode.
  $vars['theme_hook_suggestions'][] = 'node__' . $vars['view_mode'];
  $vars['theme_hook_suggestions'][] = 'node__' . $vars['view_mode'] . '__' . $vars['type'];
}
