<?php

/**
 * @file
 * Gesso Twig extension for filtering of id names.
 */

/**
 * Passthrough for the D8 clean_id function.
 *
 * @param Twig_Environment $env
 *   Current Twig environment.
 * @param string $config
 *   Current configuration state.
 */
function add_clean_id_filter(Twig_Environment &$env, $config) {
  $env->addFilter(new Twig_SimpleFilter('clean_id', function ($string) {
    return $string;
  }));
}
