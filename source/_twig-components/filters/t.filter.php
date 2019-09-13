<?php

/**
 * @file
 * Creates an "t" filter for Pattern Lab.
 */

/**
 * Creates an "t" filter for Pattern Lab.
 */
function add_tfilter(\Twig_Environment &$env, $config) {
  // Drupal translate filter.
  $env->addFilter(new \Twig_SimpleFilter('t', function ($string) {
    return $string;
  }));
}
