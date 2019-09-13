<?php

/**
 * @file
 * Creates an "url" function for Pattern Lab.
 */

/**
 * Add availability of url function to PatternLab.
 */
function add_url_function(\Twig_Environment &$env, $config) {
  // https://www.drupal.org/node/2486991
  $env->addFunction(new \Twig_SimpleFunction('url', function ($string) {
    return '#';
  }));
}
