<?php

/**
 * @file
 * Gesso Twig extension to allow a path function for Drupal in Twig.
 */

/**
 * Accepts a string and returns that string as a path.
 *
 * @param Twig_Environment $env
 *   Current state of Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_path_function(Twig_Environment &$env, $config) {
  $env->addFunction(new Twig_SimpleFunction('path', function ($string) {
    if ($string === '<front>') {
      return '/';
    }
    else {
      return $string;
    }
  }));
}
