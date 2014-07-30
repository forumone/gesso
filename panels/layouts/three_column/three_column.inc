<?php
/**
 * Implements hook_panels_layouts().
 */
function gesso_three_column_panels_layouts() {
  $items['three_column'] = array(
    'title' => t('Three column'),
    'category' => t('Responsive'),
    'icon' => 'three_column.png',
    'theme' => 'three_column',
    'admin css' => '../../../css/panels-admin/three-column.css',
    'regions' => array(
      'preface' => t('Preface'),
      'first' => t('First'),
      'second' => t('Second'),
      'third' => t('Third'),
    ),
  );

  return $items;
}
