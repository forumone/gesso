<?php
/**
 * @file
 * Progress barrelated functions.
 */

/**
 * Returns HTML for a progress bar.
 */
function gesso_progress_bar($vars) {
  $output = '<div id="progress" class="progress">';
  $output .= '<div class="progress__track"><div class="progress__bar" style="width: ' . $vars['percent'] . '%"></div></div>';
  $output .= '<div class="progress__percentage">' . $vars['percent'] . '%</div>';
  $output .= '<div class="progress__description">' . $vars['message'] . '</div>';
  $output .= '</div>';

  return $output;
}
