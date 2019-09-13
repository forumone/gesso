<?php

/**
 * @file
 * Creates an "render" filter for Pattern Lab.
 */

/**
 * Creates an "render" filter for Pattern Lab.
 */
function add_render_filter(\Twig_Environment &$env, $config) {
  // Drupal Render filter.
  $env->addFilter(new \Twig_SimpleFilter('render', function ($string) {
    return $string;
  }));
}
