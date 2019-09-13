<?php

/**
 * @file
 * Creates an "clean_id" filter for Pattern Lab.
 */

/**
 * Creates an "clean_id" filter for Pattern Lab.
 */
function add_clean_id_filter(\Twig_Environment &$env, $config) {
  $env->addFilter(new \Twig_SimpleFilter('clean_id', function ($string) {
    return $string;
  }));
}
