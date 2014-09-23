<?php
/**
 * @file
 * Field-related functions.
 */

/**
 * Implements hook_preprocess_field().
 */
function gesso_preprocess_field(&$vars) {
  $only_use_smacss = theme_get_setting('only_use_smacss');

  // Remove some default field classes.
  if ($only_use_smacss) {
    $vars['classes_array'] = array_values(array_diff($vars['classes_array'], array(
      'field-name-' . $vars['field_name_css'],
      'field-type-' . $vars['field_type_css'],
      'field-label-above',
      'field-label-hidden',
      'field-label-inline',
    )));
  }

  // Add new default field classes.
  $vars['classes_array'][] = 'field--' . str_replace('field-', '', $vars['field_name_css']);

  // Uncomment the following if you want a class for the field type.
  //$vars['classes_array'][] = 'field--' . $vars['field_type_css'];
}

/**
 * Returns HTML for the Display Suite minimal field style.
 */
function gesso_field__minimal($vars) {
  $only_use_smacss = theme_get_setting('only_use_smacss');
  $output = '';
  $config = $vars['ds-config'];
  $classes = isset($config['classes']) ? ' ' . $config['classes'] : '';
  $field_name_class = drupal_html_class($vars['element']['#field_name']);
  $field_label_class = '';

  // Add field label class.
  if ($vars['element']['#label_display'] == 'inline') {
    $field_label_class = ' field__label--inline';

    if (!$only_use_smacss) {
      $field_label_class .= ' label-inline';
    }
  }
  elseif (!$only_use_smacss) {
    $field_label_class .= ' label-above';
  }

  // Add default field class if wanted.
  if (!$only_use_smacss) {
    $classes .= ' field-name-' . $field_name_class;
  }

  // Add a simple wrapper.
  $output .= '<div class="field field--' . str_replace('field-', '', $field_name_class) . $classes . '">';

  // Render the label.
  if (!$vars['label_hidden']) {
    $output .= '<div class="field__label' . $field_label_class . '">' . $vars['label'];
    if (!isset($config['lb-col'])) {
      $output .= ':&nbsp;';
    }
    $output .= '</div>';
  }

  // Render the items.
  foreach ($vars['items'] as $delta => $item) {
    $output .= drupal_render($item);
  }
  $output .="</div>";

  return $output;
}

/**
 * Returns HTML for the Display Suite expert field style.
 */
function gesso_field__expert($vars) {
  $only_use_smacss = theme_get_setting('only_use_smacss');
  $output = '';

  $config = $vars['ds-config'];

  // Render the label if it's not hidden.
  if (!$vars['label_hidden']) {
    $label_wrapper = isset($config['lb-el']) ? $config['lb-el'] : 'div';
    $class = array('field__label field__label--' . $vars['element']['#label_display']);

    // Add original label class if wanted.
    if (!$only_use_smacss) {
      $class[] = 'label-' . $vars['element']['#label_display'];
    }

    if (!empty($config['lb-cl'])) $class[] = $config['lb-cl'];
    $class = !empty($class) ? ' class="' . implode(' ', $class) . '"' : '';
    $attributes = array();
    if (!empty($config['lb-at'])) $attributes[] = $config['lb-at'];
    if (!empty($config['lb-def-at'])) $attributes[] = $vars['title_attributes'];
    $attributes = (!empty($attributes)) ? ' ' . implode(' ', $attributes) : '';
    $output .= '<' . $label_wrapper . $class . $attributes . '>' . $vars['label'];
    if (!isset($config['lb-col'])) $output .= ':&nbsp;';
    $output .= '</' . $label_wrapper . '>';
  }

  // Field items wrapper
  if (isset($config['fis'])) {
    $class = (!empty($config['fis-cl'])) ? ' class="' . $config['fis-cl'] . '"' : '';
    $attributes = array();
    if (!empty($config['fis-at'])) $attributes[] = $config['fis-at'];
    if (!empty($config['fis-def-at'])) $attributes[] = $vars['content_attributes'];
    $attributes = (!empty($attributes)) ? ' ' . implode(' ', $attributes) : '';
    $output .= '<' . $config['fis-el'] . $class . $attributes . '>';
  }

  // Render items.
  foreach ($vars['items'] as $delta => $item) {
    // Field item wrapper.
    if (isset($config['fi'])) {
      $class = array();
      if (!empty($config['fi-odd-even'])) {
        $class[] = $delta % 2 ? 'odd' : 'even';
      }
      if (!empty($config['fi-cl'])) {
        $class[] = $config['fi-cl'];
      }
      $class = !empty($class) ? ' class="'. implode(' ', $class)  .'"' : '';
      $attributes = array();
      if (!empty($config['fi-at'])) {
        $attributes[] = token_replace($config['fi-at'], array($vars['element']['#entity_type'] => $vars['element']['#object']), array('clear' => TRUE));
      }
      if (!empty($config['fi-def-at'])) {
        $attributes[] = $vars['item_attributes'][$delta];
      }
      $attributes = (!empty($attributes)) ? ' ' . implode(' ', $attributes) : '';
      $output .= '<' . $config['fi-el'] . $class . $attributes .'>';
    }

    // Render field content.
    $output .= drupal_render($item);

    // Closing field item wrapper.
    if (isset($config['fi'])) {
      $output .= '</' . $config['fi-el'] . '>';
    }
  }

  // Closing field items wrapper.
  if (isset($config['fis'])) {
    $output .= '</' . $config['fis-el'] . '>';
  }

  // Outer wrapper.
  if (isset($config['ow'])) {
    $class = array();
    if (!empty($config['ow-cl'])) $class[] = $config['ow-cl'];
    if (!empty($config['ow-def-cl'])) $class[] = $vars['classes'];
    $class = (!empty($class)) ? ' class="' . implode(' ', $class) . '"' : '';
    $attributes = array();
    if (!empty($config['ow-at'])) $attributes[] = $config['ow-at'];
    if (!empty($config['ow-def-at'])) $attributes[] = $vars['attributes'];
    $attributes = (!empty($attributes)) ? ' ' . implode(' ', $attributes) : '';
    $output = '<' . $config['ow-el'] . $class . $attributes . '>' . $output . '</' . $config['ow-el'] . '>';
  }

  return $output;
}
