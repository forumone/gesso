<?php
/**
 * @file
 * List-related functions.
 */

/**
 * Returns HTML for a list or nested list of items.
 */
function gesso_item_list($vars) {
  $items = $vars['items'];
  $title = $vars['title'];
  $type = $vars['type'];
  $attributes = $vars['attributes'];

  // Change attributes for facetapi links.
  if (isset($attributes['class'][0]) && $attributes['class'][0] == 'facetapi-facetapi-links' && !empty($items)) {
    $attributes['class'][] = 'nav';
    $attributes['class'][] = 'nav--facets';

    // Change item classes.
    foreach ($items as $key => $item) {
      $items[$key]['class'] = array('nav__item');
    }
  }

  // Only output the list container and title if there are any list items.
  // Check to see whether the block title exists before adding a header.
  // Empty headers are not semantic and present accessibility challenges.
  $output = '';

  if (isset($title) && $title !== '') {
    $output .= '<h3>' . $title . '</h3>';
  }

  if (!empty($items)) {
    $output .= "<$type" . drupal_attributes($attributes) . '>';
    $num_items = count($items);
    $i = 0;
    foreach ($items as $item) {
      $attributes = array();
      $children = array();
      $data = '';
      $i++;
      if (is_array($item)) {
        foreach ($item as $key => $value) {
          if ($key == 'data') {
            $data = $value;
          }
          elseif ($key == 'children') {
            $children = $value;
          }
          else {
            $attributes[$key] = $value;
          }
        }
      }
      else {
        $data = $item;
      }

      if (count($children) > 0) {
        // Render nested list.
        $data .= theme_item_list(array(
          'items' => $children,
          'title' => NULL,
          'type' => $type,
          'attributes' => $attributes,
        ));
      }

      $output .= '<li' . drupal_attributes($attributes) . '>' . $data . "</li>\n";
    }

    $output .= "</$type>";
  }

  return $output;
}
