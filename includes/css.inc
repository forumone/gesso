<?php
/**
 * @file
 * CSS-related functions.
 */

// Hide styles.css from IE8 and below.
drupal_add_css(
  drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/styles.css',
  array(
    'group' => CSS_THEME,
    'browsers' => array('IE' => 'gte IE 9'),
  )
);

// Add non media-query stylesheet for IE8 and below.
drupal_add_css(
  drupal_get_path('theme', $GLOBALS['theme_key']) . '/css/no-mq.css',
  array(
    'group' => CSS_THEME,
    'browsers' => array('IE' => 'lt IE 9', '!IE' => FALSE),
  )
);

/**
 * Implements hook_css_alter().
 */
function gesso_css_alter(&$css) {
  $theme_path = drupal_get_path('theme', $GLOBALS['theme_key']);

  // Replace admin menu css.
  if (module_exists('admin_menu')) {
    $css_path = drupal_get_path('module', 'admin_menu') . '/admin_menu.css';
    if (isset($css[$css_path])) {
      $css[$css_path]['data'] = $theme_path . '/css/overrides/admin_menu.css';
    }
    $css_path = drupal_get_path('module', 'admin_menu') . '/admin_menu.uid1.css';
    if (isset($css[$css_path])) {
      $css[$css_path]['data'] = $theme_path . '/css/overrides/admin_menu.uid1.css';
    }
  }

  // Replace admin menu toolbar css.
  if (module_exists('admin_menu_toolbar')) {
    $css_path = drupal_get_path('module', 'admin_menu_toolbar') . '/admin_menu_toolbar.css';
    if (isset($css[$css_path])) {
      $css[$css_path]['data'] = $theme_path . '/css/overrides/admin_menu_toolbar.css';
    }
  }

  // Replace shortcut css.
  if (module_exists('shortcut')) {
    $css_path = drupal_get_path('module', 'shortcut') . '/shortcut.css';
    if (isset($css[$css_path])) {
      $css[$css_path]['data'] = $theme_path . '/css/overrides/shortcut.css';
    }
  }

  // Replace toolbar css.
  if (module_exists('toolbar')) {
    $css_path = drupal_get_path('module', 'toolbar') . '/toolbar.css';
    if (isset($css[$css_path])) {
      $css[$css_path]['data'] = $theme_path . '/css/overrides/toolbar.css';
    }
  }
}
