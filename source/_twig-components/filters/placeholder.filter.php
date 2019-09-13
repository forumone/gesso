<?php

/**
 * @file
 * Creates an "placeholder" filter for Pattern Lab.
 */

/**
 * Creates an "placeholder" filter for Pattern Lab.
 */
function add_placeholder_filter(\Twig_Environment &$env, $config) {
  $env->addFilter(new \Twig_SimpleFilter('placeholder', function ($string) {
    return $string;
  }));
}
