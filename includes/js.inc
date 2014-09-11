<?php
/**
 * @file
 * JS-related functions.
 */

/**
 * Implements hook_js_alter().
 */
function gesso_js_alter(&$javascript) {
  // Add <main> support for HTML5shiv.
  // @todo Remove this if using Modernizr v3 or later.
  if (module_exists('modernizr')) {
    $modernizr = drupal_js_defaults("window.html5.elements = 'main';window.html5.shivDocument(document);");
    $modernizr['force header'] = TRUE;
    $modernizr['type'] = 'inline';
    $javascript[] = $modernizr;
  }

  // Swap out collapse.js with our custom version.
  if (isset($javascript['misc/collapse.js'])) {
    $javascript['misc/collapse.js']['data'] = drupal_get_path('theme', $GLOBALS['theme_key']) . '/js/collapse.js';
  }

  // Swap out vertical-tabs.js with our custom version.
  if (isset($javascript['misc/vertical-tabs.js'])) {
    $javascript['misc/vertical-tabs.js']['data'] = drupal_get_path('theme', $GLOBALS['theme_key']) . '/js/vertical-tabs.js';
  }
}
