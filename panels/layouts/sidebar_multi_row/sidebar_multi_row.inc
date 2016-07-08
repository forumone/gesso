<?php
/**
 * Implements hook_panels_layouts().
 */
function gesso_sidebar_multi_row_panels_layouts() {
  $items['sidebar_multi_row'] = array(
    'title' => t('Sidebar Multi-Row'),
    'category' => t('Gesso'),
    'icon' => 'sidebar_multi_row.png',
    'theme' => 'sidebar_multi_row',
    'admin css' => '../../../css/panels-admin/sidebar-multi-row.css',
    'regions' => array(
      'preface' => t('Preface'),
      'sidebar' => t('Sidebar'),
      'row-1' => t('Row 1'),
      'row-2-first' => t('Row 2 First'),
      'row-2-second' => t('Row 2 Second'),
      'row-2-third' => t('Row 2 Third'),
      'row-3-first' => t('Row 3 First'),
      'row-3-second' => t('Row 3 Second'),
      'row-3-third' => t('Row 3 Third'),
      'row-4-first' => t('Row 4 First'),
      'row-4-second' => t('Row 4 Second'),
      'row-4-third' => t('Row 4 Third'),
      'postscript' => t('Postscript'),
    ),
  );

  return $items;
}
