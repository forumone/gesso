<?php
/**
 * @file
 * Comments-related functions.
 */

/**
 * Implements hook_preprocess_comment_wrapper().
 */
function gesso_preprocess_comment_wrapper(&$vars) {
  // Add a HTML id so it can be used as an anchor target.
  $vars['attributes_array']['id'] = 'comments';

  // Add the component class.
  $vars['attributes_array']['class'][] = 'comments';

  // Add classes to subcomponents.
  $vars['title_attributes_array']['class'][] = 'comments__title';
  $vars['form_title_attributes_array']['class'][] = 'comments__title comments__title--form';
}

/**
 * Implements hook_process_comment_wrapper().
 */
function gesso_process_comment_wrapper(&$vars) {
  // Flatten the attributes array.
  $vars['form_title_attributes'] = drupal_attributes($vars['form_title_attributes_array']);
}

/**
 * Implements hook_preprocess_comment().
 */
function gesso_preprocess_comment(&$vars) {
  $comment = $vars['elements']['#comment'];

  // Fix original classes.
  $vars['classes_array'] = preg_replace('/^comment-(?!-)/', 'comment--', $vars['classes_array']);

  // Add original classes to attributes array.
  $vars['attributes_array']['class'] = $vars['classes_array'];

  // Set user picture.
  $vars['user_picture'] = theme_get_setting('toggle_comment_user_picture') ? theme('user_picture', array('account' => $comment)) : '';

  // Add sub component classes.
  $vars['title_attributes_array']['class'][] = 'comment__title';
  $vars['content_attributes_array']['class'][] = 'comment__content';
  $vars['content']['links']['#attributes']['class'][] = 'nav--comment';

  // Format created date.
  $vars['datetime'] = format_date($vars['comment']->created, 'custom', 'c');
  $vars['date'] = format_date($vars['comment']->created, 'custom', 'F j, Y g:i a');
  $vars['created'] = '<time class="comment__created" datetime="' . $vars['datetime'] . '">' . $vars['date'] . '</time>';

  // Fix permalink class.
  $vars['permalink'] = preg_replace('/"permalink"/', '"comment__permalink"', $vars['permalink']);
}
