<?php

/**
 * @file
 * Twig Gesso extension for safe_join function.
 */

/**
 * Provides the ability to join elements of an array with a separator.
 *
 * @param Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_safe_join_filter(Twig_Environment &$env, $config) {
  // Drupal Safe Join filter.
  $env->addFilter(new Twig_SimpleFilter('safe_join', function ($string) {
    return $string;
  }));
}
