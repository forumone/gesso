<?php

/**
 * @file
 * Creates an "path" function for Pattern Lab.
 */

/**
 * Add availability of path function to PatternLab.
 */
function add_path_function(\Twig_Environment &$env, $config) {
  $env->addFunction(new \Twig_SimpleFunction('path', function ($string) {
    if ($string === '<front>') {
      return '/';
    }
    else {
      return $string;
    }
  }));
}
