<?php

/**
 * @file
 * Creates an "without" filter for Pattern Lab.
 */

/**
 * Creates an "without" filter for Pattern Lab.
 */
function add_without_filter(\Twig_Environment &$env, $config) {
  $env->addFilter(new Twig_SimpleFilter('without', function ($string) {
    return $string;
  }));
}
