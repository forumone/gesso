<?php
/**
 * @file
 * Messages-related functions.
 */

/**
 * Returns HTML for status, error, and warning messages, grouped by type.
 */
function gesso_status_messages($vars) {
  $display = $vars['display'];
  $output = '';

  $status_heading = array(
    'status' => t('Status message'),
    'error' => t('Error message'),
    'warning' => t('Warning message'),
  );

  foreach (drupal_get_messages($display) as $type => $messages) {

    if (theme_get_setting('only_use_smacss')) {
      $output .= "<div class=\"messages messages--$type\" role=\"alertdialog\">\n";
    }
    else {
      $output .= "<div class=\"messages messages--$type $type\" role=\"alertdialog\">\n";
    }

    if (!empty($status_heading[$type])) {
      $output .= '<h2 class="element-invisible">' . $status_heading[$type] . "</h2>\n";
    }

    if (count($messages) > 1) {
      $output .= "<ul class=\"messages__list\">\n";

      foreach ($messages as $message) {
        $output .= '  <li class="messages__item">' . $message . "</li>\n";
      }

      $output .= "</ul>\n";
    }
    else {
      $output .= $messages[0];
    }

    $output .= "</div>\n";
  }

  return $output;
}
