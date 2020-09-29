<?php

/**
 * @file
 * Gesso Twig extension for translation of text.
 */

/**
 * Translate passthrough.
 *
 * @param Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_t_filter(Twig_Environment &$env, $config) {
  // Drupal translate filter.
  $env->addFilter(new Twig_SimpleFilter('t', function ($string) {
    return $string;
  }));
}
