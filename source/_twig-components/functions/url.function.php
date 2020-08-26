<?php

/**
 * @file
 * Gesso Twig extension for URL Handling.
 */

/**
 * Accepts a string and returns a Url.
 *
 * @param Twig_Environment $env
 *   The current twig environment.
 * @param string $config
 *   Current config.
 */
function add_url_function(Twig_Environment &$env, $config) {
  // See https://www.drupal.org/node/2486991.
  $env->addFunction(new Twig_SimpleFunction('url', function ($string) {
    return '#';
  }));
}
