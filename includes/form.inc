<?php
/**
 * @file
 * Form-related functions.
 */

/**
 * Returns HTML for a form.
 */
function gesso_form($vars) {
  $element = $vars['element'];

  if (isset($element['#action'])) {
    $element['#attributes']['action'] = drupal_strip_dangerous_protocols($element['#action']);
  }

  element_set_attributes($element, array('method', 'id'));

  if (empty($element['#attributes']['accept-charset'])) {
    $element['#attributes']['accept-charset'] = "UTF-8";
  }

  return '<form' . drupal_attributes($element['#attributes']) . '>' . $element['#children'] . '</form>';
}

/**
 * Returns HTML for a form element.
 */
function gesso_form_element($vars) {
  $element = &$vars['element'];
  $element_type = !empty($element['#type']) ? $element['#type'] : '';
  $element_type_class = drupal_html_class($element_type);
  $element_name = !empty($element['#name']) ? $element['#name'] : '';
  $element_name_class = drupal_html_class($element_name);
  $only_use_smacss = theme_get_setting('only_use_smacss');

  // This function is invoked as theme wrapper, but the rendered form element
  // may not necessarily have been processed by form_builder().
  $element += array(
    '#title_display' => 'before',
  );

  // Add element #id for #type 'item'.
  if (isset($element['#markup']) && !empty($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }
  // Add element's #type and #name as class to aid with JS/CSS selectors.
  $attributes['class'] = array('form-item');
  if (!empty($element['#type'])) {
    $attributes['class'][] = 'form-item--' . $element_type_class;

    // Add default core class if wanted.
    if (!$only_use_smacss) {
      $attributes['class'][] = 'form-type-' . $element_type_class;
    }
  }
  if (!empty($element['#name']) && $element_type_class !== $element_name_class) {
    $attributes['class'][] = 'form-item--' . $element_name_class;

    // Add default core class if wanted.
    if (!$only_use_smacss) {
      $attributes['class'][] = 'form-item-' . $element_name_class;
    }
  }

  // Add date-related classes.
  if (isset($element['#theme']) && $element['#theme'] == 'date_select_element') {
    $attributes['class'][] = 'form-item--date-select';
  }

  // Add a class for disabled elements to facilitate cross-browser styling.
  if (!empty($element['#attributes']['disabled'])) {
    $attributes['class'][] = 'is-disabled';

    // Add default core class if wanted.
    if (!$only_use_smacss) {
      $attributes['class'][] = 'form-disabled';
    }
  }

  // Add class for required form items.
  if (isset($element['#required']) && $element['#required']) {
    $attributes['class'][] = 'is-required';
  }

  $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

  // If #title is not set, we don't display any label or required marker.
  if (!isset($element['#title'])) {
    $element['#title_display'] = 'none';
  }

  // Add prefix and suffix.
  if ($only_use_smacss) {
    $prefix = isset($element['#field_prefix']) ? '<span class="form-item__prefix">' . $element['#field_prefix'] . '</span> ' : '';
    $suffix = isset($element['#field_suffix']) ? ' <span class="form-item__suffix">' . $element['#field_suffix'] . '</span>' : '';
  }
  else {
    $prefix = isset($element['#field_prefix']) ? '<span class="form-item__prefix field-prefix">' . $element['#field_prefix'] . '</span> ' : '';
    $suffix = isset($element['#field_suffix']) ? ' <span class="form-item__suffix field-suffix">' . $element['#field_suffix'] . '</span>' : '';
  }

  switch ($element['#title_display']) {
    case 'before':
    case 'invisible':
      $output .= ' ' . theme('form_element_label', $vars);
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;

    case 'after':
      $output .= ' ' . $prefix . $element['#children'] . $suffix;
      $output .= ' ' . theme('form_element_label', $vars) . "\n";
      break;

    case 'none':
    case 'attribute':
      // Output no label and no required marker, only the children.
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;
  }

  if (!empty($element['#description'])) {
    if ($only_use_smacss) {
      $output .= '<div class="form-item__description">' . $element['#description'] . "</div>\n";
    }
    else {
      $output .= '<div class="form-item__description description">' . $element['#description'] . "</div>\n";
    }
  }

  $output .= "</div>\n";

  return $output;
}

/**
 * Returns HTML for a form element label and required marker.
 */
function gesso_form_element_label($vars) {
  $element = $vars['element'];

  // This is also used in the installer, pre-database setup.
  $t = get_t();

  // If title and required marker are both empty, output no label.
  if ((!isset($element['#title']) || $element['#title'] === '') && empty($element['#required'])) {
    return '';
  }

  // Don't output the label for certain types..
  if ($element['#type'] == 'radios' || $element['#type'] == 'checkboxes' || $element['#type'] == 'date') {
    return '';
  }

  // If the element is required, a required marker is appended to the label.
  $required = !empty($element['#required']) ? theme('form_required_marker', array('element' => $element)) : '';

  $title = filter_xss_admin($element['#title']);

  $attributes = array();

  // Add default label class.
  $attributes['class'][] = 'form-item__label';

  // Style the label as class option to display inline with the element.
  if (!theme_get_setting('only_use_smacss') && $element['#title_display'] == 'after') {
    $attributes['class'] = 'option';
  }

  // Show label only to screen readers to avoid disruption in visual flows.
  if ($element['#title_display'] == 'invisible') {
    $attributes['class'][] = 'element-invisible';
  }

  if (!empty($element['#id'])) {
    $attributes['for'] = $element['#id'];
  }

  // The leading whitespace helps visually separate fields from inline labels.
  return ' <label' . drupal_attributes($attributes) . '>' . $t('!title !required', array('!title' => $title, '!required' => $required)) . "</label>\n";
}

/**
 * Returns HTML for a marker for required form elements.
 */
function gesso_form_required_marker($vars) {
  // This is also used in the installer, pre-database setup.
  $t = get_t();
  $attributes = array('class' => array('form-item__required-marker'));

  // Add default class if wanted.
  if (!theme_get_setting('only_use_smacss')) {
    $attributes['class'][] = 'form-required';
  }

  return '<span' . drupal_attributes($attributes) . '><span class="element-invisible">' . $t('This field is required.') . '</span></span>';
}

/**
 * Returns HTML for a button form element.
 */
function gesso_button($vars) {
  $element = $vars['element'];
  $element['#attributes']['type'] = $element['#button_type'];
  element_set_attributes($element, array('id', 'name', 'value'));
  $only_use_smacss = theme_get_setting('only_use_smacss');

  // Add button classes.
  $element['#attributes']['class'][] = 'button';

  // Adjust classes for reset buttons.
  if (isset($element['#id']) && $element['#id'] == 'edit-reset') {
    $element['#attributes']['class'][] = 'button--reset';
  }
  else {
    $element['#attributes']['class'][] = 'button--' . drupal_html_class($element['#button_type']);
  }

  // Add default class if wanted.
  if (!$only_use_smacss) {
    $element['#attributes']['class'][] = 'form-' . $element['#button_type'];
  }

  if (!empty($element['#attributes']['disabled'])) {
    $element['#attributes']['class'][] = 'is-disabled';

    // Add default class if wanted.
    if (!$only_use_smacss) {
      $element['#attributes']['class'][] = 'form-button-disabled';
    }
  }

  return '<input' . drupal_attributes($element['#attributes']) . '>';
}

/**
 * Returns HTML for a checkbox form element.
 */
function gesso_checkbox($vars) {
  $element = $vars['element'];
  $element['#attributes']['type'] = 'checkbox';
  element_set_attributes($element, array(
    'id',
    'name',
    '#return_value' => 'value',
  ));

  // Unchecked checkbox has #value of integer 0.
  if (!empty($element['#checked'])) {
    $element['#attributes']['checked'] = 'checked';
  }
  _gesso_form_set_class($element, array('form-checkbox'));

  return '<input' . drupal_attributes($element['#attributes']) . '>';
}

/**
 * Returns HTML for a set of checkbox form elements.
 */
function gesso_checkboxes($vars) {
  $element = $vars['element'];
  $attributes = array();

  if (isset($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }

  $attributes['class'][] = 'form-item__fieldset';

  if (!empty($element['#attributes']['class'])) {
    $attributes['class'] = array_merge($attributes['class'], $element['#attributes']['class']);
  }

  if (isset($element['#attributes']['title'])) {
    $attributes['title'] = $element['#attributes']['title'];
  }

  // If the element is required, a required marker is appended to the label.
  $required = !empty($element['#required']) ? theme('form_required_marker', array('element' => $element)) : '';

  $legend = isset($element['#title']) ? '<legend class="form-item__legend">' . $element['#title'] . ' ' . $required . '</legend>' : '';

  return '<fieldset' . drupal_attributes($attributes) . '>' . $legend . (!empty($element['#children']) ? $element['#children'] : '') . '</fieldset>';
}

/**
 * Returns HTML to wrap child elements in a container.
 */
function gesso_container($vars) {
  $element = $vars['element'];

  // Special handling for form elements.
  if (isset($element['#array_parents'])) {
    // Assign an html ID.
    if (!isset($element['#attributes']['id'])) {
      $element['#attributes']['id'] = $element['#id'];
    }
  }

  // Add default class if wanted.
  if (!theme_get_setting('only_use_smacss')) {
    $element['#attributes']['class'][] = 'form-wrapper';
  }

  return '<div' . drupal_attributes($element['#attributes']) . '>' . $element['#children'] . '</div>';
}

/**
 * Returns HTML for a date selection form element.
 */
function gesso_date($vars) {
  $element = $vars['element'];

  $attributes = array();

  if (isset($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }

  if (!empty($element['#attributes']['class'])) {
    $attributes['class'] = (array) $element['#attributes']['class'];
  }

  $attributes['class'][] = 'form-item__fieldset';

  // If the element is required, a required marker is appended to the label.
  $required = !empty($element['#required']) ? theme('form_required_marker', array('element' => $element)) : '';

  $legend = isset($element['#title']) ? '<legend class="form-item__legend">' . $element['#title'] . ' ' . $required . '</legend>' : '';

  return '<fieldset' . drupal_attributes($attributes) . '>' . $legend . drupal_render_children($element) . '</fieldset>';
}

/**
 * Returns HTML for a fieldset form element and its children.
 */
function gesso_fieldset($vars) {
  $element = $vars['element'];
  element_set_attributes($element, array('id'));
  $only_use_smacss = theme_get_setting('only_use_smacss');

  if (isset($element['#attributes']['class'])) {
    if (!is_array($element['#attributes']['class'])) {
      $element['#attributes']['class'] = array($element['#attributes']['class']);
    }
  }
  else {
    $element['#attributes']['class'] = array();
  }

  // Remove default collapsible classes.
  if ($only_use_smacss) {
    $element['#attributes']['class'] = array_values(array_diff($element['#attributes']['class'], array(
      'collapsible',
      'collapsed',
    )));
  }

  // Add custom collapsible classes.
  if (isset($element['#collapsible']) && $element['#collapsible']) {
    $element['#attributes']['class'][] = 'fieldset--collapsible';
    $element['#attributes']['class'][] = 'js-collapsible';

    if ($element['#collapsed']) {
      $element['#attributes']['class'][] = 'is-collapsed';
    }
  }

  if ($only_use_smacss) {
    _gesso_form_set_class($element, array('fieldset'));
  }
  else {
    _form_set_class($element, array('fieldset', 'form-wrapper'));
  }


  $output = '<fieldset' . drupal_attributes($element['#attributes']) . '>';
  if (!empty($element['#title'])) {
    // Always wrap fieldset legends in a SPAN for CSS positioning.
    if ($only_use_smacss) {
      $output .= '<legend class="fieldset__legend"><span class="fieldset__legend-text">' . $element['#title'] . '</span></legend>';
    }
    else {
      $output .= '<legend class="fieldset__legend"><span class="fieldset__legend-text fieldset-legend">' . $element['#title'] . '</span></legend>';
    }
  }

  if ($only_use_smacss) {
    $output .= '<div class="fieldset__content">';
  }
  else {
    $output .= '<div class="fieldset__content fieldset-wrapper">';
  }

  if (!empty($element['#description'])) {
    if ($only_use_smacss) {
      $output .= '<div class="fieldset__description">' . $element['#description'] . '</div>';
    }
    else {
      $output .= '<div class="fieldset__description fieldset-description">' . $element['#description'] . '</div>';
    }
  }

  $output .= $element['#children'];

  if (isset($element['#value'])) {
    $output .= $element['#value'];
  }

  $output .= '</div>';
  $output .= "</fieldset>\n";

  return $output;
}

/**
 * Returns HTML for a file upload form element.
 */
function gesso_file($vars) {
  $element = $vars['element'];
  $element['#attributes']['type'] = 'file';
  element_set_attributes($element, array('id', 'name', 'size'));
  _gesso_form_set_class($element, array('form-file'));

  return '<input' . drupal_attributes($element['#attributes']) . '>';
}

/**
 * Returns HTML for an image button form element.
 */
function gesso_image_button($vars) {
  $element = $vars['element'];
  $element['#attributes']['type'] = 'image';
  element_set_attributes($element, array('id', 'name', 'value'));
  $only_use_smacss = theme_get_setting('only_use_smacss');

  $element['#attributes']['src'] = file_create_url($element['#src']);
  if (!empty($element['#title'])) {
    $element['#attributes']['alt'] = $element['#title'];
  }

  $element['#attributes']['class'][] = 'button';
  $element['#attributes']['class'][] = 'button--image';

  // Add default core class if wanted.
  if (!$only_use_smacss) {
    $element['#attributes']['class'][] = 'form-' . $element['#button_type'];
  }

  if (!empty($element['#attributes']['disabled'])) {
    $element['#attributes']['class'][] = 'is-disabled';

    // Add default core class if wanted.
    if (!$only_use_smacss) {
      $element['#attributes']['class'][] = 'form-button-disabled';
    }
  }

  return '<input' . drupal_attributes($element['#attributes']) . '>';
}

/**
 * Returns HTML for a password form element.
 */
function gesso_password($vars) {
  $element = $vars['element'];
  $element['#attributes']['type'] = 'password';
  $element['#attributes']['autocapitalize'] = 'off';
  $element['#attributes']['autocorrect'] = 'off';
  element_set_attributes($element, array('id', 'name', 'size', 'maxlength'));
  _gesso_form_set_class($element, array('form-text'));

  return '<input' . drupal_attributes($element['#attributes']) . '>';
}

/**
 * Returns HTML for a radio button form element.
 */
function gesso_radio($vars) {
  $element = $vars['element'];
  $element['#attributes']['type'] = 'radio';
  element_set_attributes($element, array(
    'id',
    'name',
    '#return_value' => 'value',
  ));

  if (isset($element['#return_value']) && $element['#value'] !== FALSE && $element['#value'] == $element['#return_value']) {
    $element['#attributes']['checked'] = 'checked';
  }
  _gesso_form_set_class($element, array('form-radio'));

  return '<input' . drupal_attributes($element['#attributes']) . '>';
}

/**
 * Returns HTML for a set of radio button form elements.
 */
function gesso_radios($vars) {
  $element = $vars['element'];
  $attributes = array();

  if (isset($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }

  $attributes['class'] = 'form-item__fieldset';

  if (!empty($element['#attributes']['class'])) {
    $attributes['class'] .= ' ' . implode(' ', $element['#attributes']['class']);
  }

  if (isset($element['#attributes']['title'])) {
    $attributes['title'] = $element['#attributes']['title'];
  }

  // If the element is required, a required marker is appended to the label.
  $required = !empty($element['#required']) ? theme('form_required_marker', array('element' => $element)) : '';

  $legend = isset($element['#title']) ? '<legend class="form-item__legend">' . $element['#title'] . ' ' . $required . '</legend>' : '';

  return '<fieldset' . drupal_attributes($attributes) . '>' . $legend . (!empty($element['#children']) ? $element['#children'] : '') . '</fieldset>';
}

/**
 * Returns HTML for a select form element.
 */
function gesso_select($vars) {
  $element = $vars['element'];
  element_set_attributes($element, array('id', 'name', 'size'));
  _gesso_form_set_class($element, array('form-select'));

  return '<select' . drupal_attributes($element['#attributes']) . '>' . form_select_options($element) . '</select>';
}

/**
 * Returns HTML for a table with radio buttons or checkboxes.
 */
function gesso_tableselect($vars) {
  $element = $vars['element'];
  $rows = array();
  $header = $element['#header'];
  if (!empty($element['#options'])) {
    // Generate a table row for each selectable item in #options.
    foreach (element_children($element) as $key) {
      $row = array();

      $row['data'] = array();
      if (isset($element['#options'][$key]['#attributes'])) {
        $row += $element['#options'][$key]['#attributes'];
      }
      // Render the checkbox / radio element.
      $row['data'][] = drupal_render($element[$key]);

      // As theme_table only maps header and row columns by order, create the
      // correct order by iterating over the header fields.
      foreach ($element['#header'] as $fieldname => $title) {
        $row['data'][] = $element['#options'][$key][$fieldname];
      }
      $rows[] = $row;
    }
    // Add an empty header or a "Select all" checkbox to provide room for the
    // checkboxes/radios in the first table column.
    if ($element['#js_select']) {
      // Add a "Select all" checkbox.
      drupal_add_js('misc/tableselect.js');
      array_unshift($header, array('class' => array('select-all')));
    }
    else {
      // Add an empty header when radio buttons are displayed or a "Select all"
      // checkbox is not desired.
      array_unshift($header, '');
    }
  }

  return theme('table', array(
    'header' => $header,
    'rows' => $rows,
    'empty' => $element['#empty'],
    'attributes' => $element['#attributes'],
  ));
}

/**
 * Returns HTML for a textarea form element.
 */
function gesso_textarea($vars) {
  $element = $vars['element'];
  element_set_attributes($element, array(
    'id',
    'name',
    'cols',
    'rows',
  ));
  _gesso_form_set_class($element, array('form-textarea'));

  return '<textarea' . drupal_attributes($element['#attributes']) . '>' . check_plain($element['#value']) . '</textarea>';
}

/**
 * Returns HTML for a textfield form element.
 */
function gesso_textfield($vars) {
  $element = $vars['element'];
  $element['#attributes']['type'] = 'text';
  $element['#attributes']['autocapitalize'] = 'off';
  $element['#attributes']['autocorrect'] = 'off';
  element_set_attributes($element, array(
    'id',
    'name',
    'value',
    'size',
    'maxlength',
  ));
  _gesso_form_set_class($element, array('form-text'));

  $extra = '';
  if ($element['#autocomplete_path'] && drupal_valid_path($element['#autocomplete_path'])) {
    drupal_add_library('system', 'drupal.autocomplete');
    $element['#attributes']['class'][] = 'form-autocomplete';

    $attributes = array();
    $attributes['type'] = 'hidden';
    $attributes['id'] = $element['#attributes']['id'] . '-autocomplete';
    $attributes['value'] = url($element['#autocomplete_path'], array('absolute' => TRUE));
    $attributes['disabled'] = 'disabled';
    $attributes['class'][] = 'autocomplete';
    $extra = '<input' . drupal_attributes($attributes) . '>';
  }

  $output = '<input' . drupal_attributes($element['#attributes']) . '>';

  return $output . $extra;
}

/**
 * Sets a form element's class attribute.
 *
 * Adds 'is-required' and 'is-error' classes as needed.
 *
 * @param array $element
 *   The form element.
 * @param array $class
 *   Array of new class names to be added.
 */
function _gesso_form_set_class(&$element, $class = array()) {
  $only_use_smacss = theme_get_setting('only_use_smacss');

  if (!empty($class)) {
    if (!isset($element['#attributes']['class'])) {
      $element['#attributes']['class'] = array();
    }
    $element['#attributes']['class'] = array_merge($element['#attributes']['class'], $class);
  }
  // This function is invoked from form element theme functions, but the
  // rendered form element may not necessarily have been processed by
  // form_builder().
  if (!empty($element['#required'])) {
    $element['#attributes']['class'][] = 'is-required';

    // Add default core class if wanted.
    if (!$only_use_smacss) {
      $element['#attributes']['class'][] = 'required';
    }
  }
  if (isset($element['#parents']) && form_get_error($element) !== NULL && !empty($element['#validated'])) {
    $element['#attributes']['class'][] = 'is-error';

    // Add default core class if wanted.
    if (!$only_use_smacss) {
      $element['#attributes']['class'][] = 'error';
    }
  }
}
