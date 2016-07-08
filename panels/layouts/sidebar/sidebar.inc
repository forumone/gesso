<?php
/**
 * Implements hook_panels_layouts().
 */
function gesso_sidebar_panels_layouts() {
  $items['sidebar'] = array(
    'title' => t('Sidebar'),
    'category' => t('Gesso'),
    'icon' => 'sidebar.png',
    'theme' => 'sidebar',
    'admin css' => '../../../css/panels-admin/sidebar.css',
    'regions' => array(
      'preface' => t('Preface'),
      'main' => t('Main'),
      'sidebar' => t('Sidebar'),
    ),
  );

  return $items;
}
