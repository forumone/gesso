<?php

/**
 * @file
 * Creates an "formate_date" filter for Pattern Lab.
 */

/**
 * Creates an "formate_date" filter for Pattern Lab.
 */
function add_format_date_filter(\Twig_Environment &$env, $config) {
  $env->addFilter(new \Twig_SimpleFilter('format_date', function ($string) {
    return $string;
  }));
}
