<?php

/**
 * @file
 * Creates an "safe_join" filter for Pattern Lab.
 */

/**
 * Creates an "safe_join" filter for Pattern Lab.
 */
function add_safe_join_filter(\Twig_Environment &$env, $config) {
  // Drupal Safe Join filter.
  $env->addFilter(new \Twig_SimpleFilter('safe_join', function ($string) {
    return $string;
  }));
}
