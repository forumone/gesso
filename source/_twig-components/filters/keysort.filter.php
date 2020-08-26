<?php

/**
 * @file
 * Gesso Twig extension for keysort filter.
 */

/**
 * Sort array by key..
 *
 * @param Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_key_sort_filter(Twig_Environment &$env, $config) {
  $env->addFilter(new Twig_SimpleFilter('keysort', function ($array) {
    ksort($array);
    return $array;
  }));
}
